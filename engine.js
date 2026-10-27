/* Shared engine. Inlined into each page by build.mjs.
   Globals provided by the build: SITE (json), THREE (module), makeScenes (fn from the site's scenes.js). */

async function boot(THREE, SITE, makeScenes) {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const sections = $$(".chapter");
  const navLinks = $$(".bar nav a[data-i]");

  /* in-page links scroll with script, so they also work where the page is loaded without a real URL */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const el = document.getElementById(a.getAttribute("href").slice(1)); if (!el) return;
    e.preventDefault(); el.scrollIntoView({ behavior: ctx.calm ? "auto" : "smooth" });
  });

  /* ---------- shared state ---------- */
  const ctx = {
    t: 0, p: {}, hotKey: "", hotAmt: 0, calm: matchMedia("(prefers-reduced-motion: reduce)").matches,
    pace: { mode: "", step: -1, running: false, scale: 1, target: 1, k: 0 }
  };

  /* ---------- toggles ---------- */
  const motionToggle = $("#motionToggle");
  function syncMotion() {
    motionToggle.setAttribute("aria-pressed", String(ctx.calm));
    motionToggle.textContent = ctx.calm ? "Calm motion on" : "Calm motion";
    document.body.classList.toggle("calm", ctx.calm);
  }
  motionToggle.addEventListener("click", () => { ctx.calm = !ctx.calm; syncMotion(); blip(520, .02, .04, "triangle"); });
  syncMotion();

  let soundOn = false, audioCtx = null;
  const soundToggle = $("#soundToggle");
  const ac = () => { if (!audioCtx) { const A = window.AudioContext || window.webkitAudioContext; if (A) audioCtx = new A(); } return audioCtx; };
  function blip(freq = 520, attack = .01, release = .05, type = "sine") {
    if (!soundOn) return;
    const c = ac(); if (!c) return;
    const now = c.currentTime, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(.0001, now);
    g.gain.exponentialRampToValueAtTime(.05, now + attack);
    g.gain.exponentialRampToValueAtTime(.0001, now + attack + release);
    o.connect(g).connect(c.destination); o.start(now); o.stop(now + attack + release + .02);
  }
  soundToggle.addEventListener("click", async () => {
    soundOn = !soundOn;
    soundToggle.setAttribute("aria-pressed", String(soundOn));
    soundToggle.textContent = soundOn ? "Sound on" : "Sound off";
    const c = ac(); if (c && c.state === "suspended") await c.resume();
    blip(soundOn ? 720 : 360, .02, .06, "triangle");
  });

  /* ---------- params (segmented controls) ---------- */
  $$("[data-param]").forEach(btn => {
    const key = btn.dataset.param, val = btn.dataset.value;
    if (btn.classList.contains("on")) ctx.p[key] = val;
    btn.addEventListener("click", () => {
      ctx.p[key] = val;
      $$(`[data-param="${key}"]`).forEach(b => { const on = b === btn; b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); });
      blip(580, .01, .04, "triangle");
    });
  });

  /* ---------- hover / focus targets ---------- */
  let hotTarget = 0;
  $$("[data-hot]").forEach(el => {
    const key = el.dataset.hot;
    const on = () => { ctx.hotKey = key; hotTarget = 1; el.classList.add("on"); blip(520 + (key.length % 7) * 30, .01, .03, "triangle"); };
    const off = () => { hotTarget = 0; el.classList.remove("on"); };
    el.addEventListener("pointerenter", on);
    el.addEventListener("focusin", on);
    el.addEventListener("pointerleave", off);
    el.addEventListener("focusout", off);
  });

  /* ---------- pacer ---------- */
  const pc = SITE.pacers;
  if (pc) {
    const btn = $("#paceBtn"), phaseEl = $("#phase"), textEl = $("#paceText");
    let timer = null, idx = 0;
    const mode = () => pc.modes.find(m => m.id === ctx.pace.mode);
    ctx.pace.mode = pc.modes[0].id;
    function reset() {
      ctx.pace.running = false; ctx.pace.step = -1; ctx.pace.target = 1; clearTimeout(timer);
      const m = mode(); btn.textContent = m.button; phaseEl.textContent = "Ready"; textEl.textContent = m.idle;
    }
    function step() {
      const m = mode(), p = m.phases[idx];
      ctx.pace.step = idx; ctx.pace.target = p.scale;
      phaseEl.textContent = p.name; textEl.textContent = p.text; blip(p.f, .02, .08, "sine");
      timer = setTimeout(() => { idx = (idx + 1) % m.phases.length; if (ctx.pace.running) step(); }, p.ms);
    }
    btn.addEventListener("click", () => {
      ctx.pace.running = !ctx.pace.running; clearTimeout(timer);
      if (ctx.pace.running) { btn.textContent = "Stop"; idx = 0; step(); } else reset();
    });
    $$("[data-pmode]").forEach(b => b.addEventListener("click", () => {
      ctx.pace.mode = b.dataset.pmode;
      $$("[data-pmode]").forEach(x => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", String(on)); });
      reset(); blip(580, .01, .04, "triangle");
    }));
    reset();
  }

  /* ---------- scroll ---------- */
  const progress = $("#progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  };
  addEventListener("scroll", updateProgress, { passive: true }); updateProgress();

  function targetState() {
    const vc = scrollY + innerHeight * .5;
    const mids = sections.map(s => s.offsetTop + s.offsetHeight / 2);
    if (vc <= mids[0]) return 0;
    if (vc >= mids[mids.length - 1]) return sections.length - 1;
    let i = 0;
    while (i < mids.length - 1 && vc > mids[i + 1]) i++;
    const f = (vc - mids[i]) / (mids[i + 1] - mids[i]);
    const e = clamp((f - .3) / .4);
    return i + e * e * (3 - 2 * e);
  }

  const hudName = $("#hudName"), hudText = $("#hudText"), hud = $(".hud");
  let hudIdx = -1, scenes = [];
  function syncNav(tgt) {
    const ni = clamp(Math.round(tgt), 0, sections.length - 1);
    navLinks.forEach(a => a.classList.toggle("active", Number(a.dataset.i) === ni));
    if (hud && ni !== hudIdx && scenes[ni]) {
      hudIdx = ni; hud.classList.add("swap");
      setTimeout(() => { hudName.textContent = scenes[ni].name; hudText.textContent = scenes[ni].caption; hud.classList.remove("swap"); }, 180);
    }
  }

  /* ---------- WebGL ---------- */
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: $("#field"), antialias: true, alpha: true }); }
  catch (e) { document.body.classList.add("no-gl"); }
  if (!renderer) {
    addEventListener("scroll", () => syncNav(targetState()), { passive: true });
    return;
  }

  try { await Promise.race([document.fonts.load(SITE.fontLoad), new Promise(r => setTimeout(r, 1500))]); } catch (e) {}

  const N = matchMedia("(max-width:899px)").matches ? Math.round((SITE.count || 8000) * .6) : (SITE.count || 8000);
  const R0 = new Float32Array(N), R1 = new Float32Array(N), R2 = new Float32Array(N), R3 = new Float32Array(N);
  const G0 = new Float32Array(N), G1 = new Float32Array(N), G2 = new Float32Array(N);
  const FX = new Float32Array(N), FY = new Float32Array(N), FZ = new Float32Array(N);
  let seed = SITE.seed || 1337;
  const rng = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const gauss = () => (rng() + rng() + rng() + rng() - 2) * 1.2;
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    R0[i] = rng(); R1[i] = rng(); R2[i] = rng(); R3[i] = rng();
    G0[i] = gauss(); G1[i] = gauss(); G2[i] = gauss();
    const y = 1 - (i + .5) / N * 2, r = Math.sqrt(1 - y * y), a = i * GA;
    FX[i] = Math.cos(a) * r; FY[i] = y; FZ[i] = Math.sin(a) * r;
  }

  /* text -> point targets, sampled from real glyph pixels */
  const textCache = {};
  function text(str, { width = 7, px = 260, weight = 800, stride = 3 } = {}) {
    const key = str + width + px;
    if (textCache[key]) return textCache[key];
    const c = document.createElement("canvas"), g = c.getContext("2d");
    g.font = `${weight} ${px}px ${SITE.displayFont}`;
    const w = Math.ceil(g.measureText(str).width) + 40, h = Math.ceil(px * 1.3);
    c.width = w; c.height = h;
    g.font = `${weight} ${px}px ${SITE.displayFont}`; g.textBaseline = "middle"; g.fillStyle = "#fff";
    g.fillText(str, 20, h / 2);
    const d = g.getImageData(0, 0, w, h).data, xs = [], ys = [];
    for (let y = 0; y < h; y += stride) for (let x = 0; x < w; x += stride) if (d[(y * w + x) * 4 + 3] > 128) { xs.push(x); ys.push(y); }
    const k = width / w, out = new Float32Array(xs.length * 2);
    for (let i = 0; i < xs.length; i++) { out[i * 2] = (xs[i] - w / 2) * k; out[i * 2 + 1] = -(ys[i] - h / 2) * k; }
    return (textCache[key] = out);
  }

  const U = { N, THREE, ctx, R0, R1, R2, R3, G0, G1, G2, FX, FY, FZ, rng, gauss, clamp, lerp, smooth, text, TAU: Math.PI * 2 };
  scenes = makeScenes(U);
  if (scenes.length !== sections.length) console.warn("scene/chapter count mismatch", scenes.length, sections.length);
  scenes.forEach(s => s.init && s.init(U));

  /* palette */
  const hex = h => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
  const ramp = SITE.palette.ramp.map(hex), hotCol = hex(SITE.palette.hot);
  const rgb = [0, 0, 0];
  function pal(c) {
    const x = clamp(c) * (ramp.length - 1), i = Math.min(ramp.length - 2, Math.floor(x)), f = x - i, a = ramp[i], b = ramp[i + 1];
    rgb[0] = a[0] + (b[0] - a[0]) * f; rgb[1] = a[1] + (b[1] - a[1]) * f; rgb[2] = a[2] + (b[2] - a[2]) * f;
  }

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
  camera.position.set(0, 0, 12.4);
  const group = new THREE.Group(); scene.add(group);

  const geo = new THREE.BufferGeometry();
  const posA = new Float32Array(N * 3), colA = new Float32Array(N * 3), sizA = new Float32Array(N), alpA = new Float32Array(N);
  geo.setAttribute("position", new THREE.BufferAttribute(posA, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute("aCol", new THREE.BufferAttribute(colA, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizA, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute("aAlpha", new THREE.BufferAttribute(alpA, 1).setUsage(THREE.DynamicDrawUsage));
  const uni = { uPR: { value: renderer.getPixelRatio() } };
  const mat = new THREE.ShaderMaterial({
    uniforms: uni, transparent: true, depthWrite: false,
    vertexShader: `
      attribute vec3 aCol; attribute float aSize; attribute float aAlpha;
      uniform float uPR; varying vec3 vCol; varying float vA;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = max(1.0, aSize * uPR * (10.0 / -mv.z));
        float depth = clamp((-mv.z - 7.0) / 9.0, 0.0, 1.0);
        vCol = aCol; vA = aAlpha * (1.0 - 0.55 * depth);
      }`,
    fragmentShader: `
      varying vec3 vCol; varying float vA;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(vCol, vA * (1.0 - smoothstep(0.38, 0.5, d)));
      }`
  });
  const points = new THREE.Points(geo, mat); points.frustumCulled = false; group.add(points);

  /* optional hairline layer per scene: scene.lines(buf, t, ctx) writes segment endpoints and returns the count */
  scenes.forEach(s => {
    if (!s.lines) return;
    s._la = new Float32Array((s.lineCap || 1000) * 6);
    s._lg = new THREE.BufferGeometry();
    s._lg.setAttribute("position", new THREE.BufferAttribute(s._la, 3).setUsage(THREE.DynamicDrawUsage));
    s._lo = new THREE.LineSegments(s._lg, new THREE.LineBasicMaterial({ color: s.lineColor || SITE.palette.line || "#888888", transparent: true, opacity: 0, depthWrite: false }));
    s._lo.frustumCulled = false; s._lo.visible = false; group.add(s._lo);
  });
  function drawLines(S, w) {
    if (!S._lo || w < .01) return;
    const n = Math.min(S.lineCap || 1000, S.lines(S._la, ctx.t, ctx) | 0);
    S._lg.setDrawRange(0, n * 2); S._lg.attributes.position.needsUpdate = true;
    S._lo.material.opacity = w * (S.lineOpacity ?? .55); S._lo.visible = n > 0;
  }

  let baseX = 0, baseS = 1, halfW = 1, halfH = 1;
  function resize() {
    const w = innerWidth, h = innerHeight, a = w / h;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); uni.uPR.value = renderer.getPixelRatio();
    camera.aspect = a; camera.updateProjectionMatrix();
    baseS = Math.min(1, Math.max(.5, a * .85));
    baseX = a > 1.1 ? 3.3 * baseS : 0;
    group.scale.setScalar(baseS);
    halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z; halfW = halfH * a;
  }
  addEventListener("resize", resize); resize();

  let pnx = 0, pny = 0, px = 0, py = 0, pActive = 0, pTarget = 0;
  addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    pnx = e.clientX / innerWidth * 2 - 1; pny = -(e.clientY / innerHeight * 2 - 1); pTarget = 1;
  });
  addEventListener("pointerleave", () => { pTarget = 0; });
  document.addEventListener("pointerleave", () => { pTarget = 0; });

  const oa = { x: 0, y: 0, z: 0, c: .5, s: 1, a: 1, h: 0 }, ob = { x: 0, y: 0, z: 0, c: .5, s: 1, a: 1, h: 0 };
  const BASE = SITE.size || 2.7;
  let state = targetState(), motion = 1, t = 0, spin = 0, vrx = 0, vry = 0, vsp = .1, tx = 0, ty = 0;
  const clock = new THREE.Clock();
  const wrap = a => { a = (a + Math.PI) % (Math.PI * 2); if (a < 0) a += Math.PI * 2; return a - Math.PI; };
  const reset = o => { o.x = o.y = o.z = 0; o.c = .5; o.s = 1; o.a = 1; o.h = 0; };

  function frame() {
    const dt = Math.min(clock.getDelta(), .05);
    const tgt = targetState();
    state += (tgt - state) * (1 - Math.exp(-dt * (ctx.calm ? 3 : 5)));
    motion += ((ctx.calm ? .25 : 1) - motion) * (1 - Math.exp(-dt * 3));
    t += dt * motion; ctx.t = t;
    ctx.hotAmt += (hotTarget - ctx.hotAmt) * (1 - Math.exp(-dt * 9));
    ctx.pace.scale += (ctx.pace.target - ctx.pace.scale) * (1 - Math.exp(-dt * 1.4));
    ctx.pace.k += ((ctx.pace.running ? 1 : 0) - ctx.pace.k) * (1 - Math.exp(-dt * 3));
    pActive += (pTarget - pActive) * (1 - Math.exp(-dt * 4));
    px += (pnx - px) * .25; py += (pny - py) * .25;

    const s = clamp(state, 0, scenes.length - 1), i0 = Math.floor(s), i1 = Math.min(i0 + 1, scenes.length - 1);
    let f = s - i0; f = f * f * (3 - 2 * f); if (i0 === i1) f = 0;
    const A = scenes[i0], B = scenes[i1];
    A.frame && A.frame(t, ctx, dt);
    if (f > .0005 && B !== A) B.frame && B.frame(t, ctx, dt);

    const va = A.view || {}, vb = B.view || {};
    const tvx = lerp(va.rx || 0, vb.rx || 0, f), tvy = lerp(va.ry || 0, vb.ry || 0, f), tsp = lerp(va.spin ?? .1, vb.spin ?? .1, f);
    vrx += (tvx - vrx) * (1 - Math.exp(-dt * 3)); vry += (tvy - vry) * (1 - Math.exp(-dt * 3)); vsp += (tsp - vsp) * (1 - Math.exp(-dt * 3));
    spin += dt * vsp * motion;

    const doPush = !ctx.calm && pActive > .02;
    const lx = (px * halfW - baseX) / baseS, ly = (py * halfH) / baseS, R = 1.25, R2q = R * R, push = .5 * pActive;
    const mixing = f > .0005 && B !== A;

    for (let i = 0; i < N; i++) {
      reset(oa); A.at(i, oa);
      let x = oa.x, y = oa.y, z = oa.z, c = oa.c, sz = oa.s, al = oa.a, h = oa.h;
      if (mixing) {
        reset(ob); B.at(i, ob);
        x += (ob.x - x) * f; y += (ob.y - y) * f; z += (ob.z - z) * f; c += (ob.c - c) * f;
        sz += (ob.s - sz) * f; al += (ob.a - al) * f; h += (ob.h - h) * f;
      }
      if (doPush) {
        const dx = x - lx, dy = y - ly, d2 = dx * dx + dy * dy;
        if (d2 < R2q && d2 > 1e-6) { const d = Math.sqrt(d2), k = (1 - d / R) * (1 - d / R) * push; x += dx / d * k; y += dy / d * k; }
      }
      const o3 = i * 3; posA[o3] = x; posA[o3 + 1] = y; posA[o3 + 2] = z;
      pal(c); const hh = clamp(h);
      colA[o3] = rgb[0] + (hotCol[0] - rgb[0]) * hh; colA[o3 + 1] = rgb[1] + (hotCol[1] - rgb[1]) * hh; colA[o3 + 2] = rgb[2] + (hotCol[2] - rgb[2]) * hh;
      sizA[i] = BASE * sz * (1 + hh * .9); alpA[i] = clamp(al + hh * .35);
    }
    geo.attributes.position.needsUpdate = true; geo.attributes.aCol.needsUpdate = true;
    geo.attributes.aSize.needsUpdate = true; geo.attributes.aAlpha.needsUpdate = true;
    for (const S of scenes) if (S._lo) S._lo.visible = false;
    drawLines(A, mixing ? 1 - f : 1); if (mixing) drawLines(B, f);

    tx += ((ctx.calm ? 0 : pny * .1) - tx) * .05; ty += ((ctx.calm ? 0 : pnx * .16) - ty) * .05;
    group.rotation.x = vrx + tx; group.rotation.y = vry + (vsp > .001 ? wrap(spin) * .35 : 0) + ty;
    group.position.x = baseX;

    syncNav(tgt);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  syncNav(targetState());
  requestAnimationFrame(frame);
}
