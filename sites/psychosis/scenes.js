(U) => {
  const { N, R0, R1, R2, R3, G0, G1, G2, FX, FY, FZ, TAU, clamp, lerp, smooth, ctx, rng, text } = U;
  const sin = Math.sin, cos = Math.cos, PI = Math.PI;
  const hk = pfx => (ctx.hotAmt > .04 && ctx.hotKey.startsWith(pfx)) ? ctx.hotKey.slice(pfx.length) : null;
  const ease = (cur, tgt, dt, rate = 4) => cur + (tgt - cur) * (1 - Math.exp(-dt * rate));
  const seg = (b, n, x1, y1, z1, x2, y2, z2) => { const o = n * 6; b[o] = x1; b[o + 1] = y1; b[o + 2] = z1; b[o + 3] = x2; b[o + 4] = y2; b[o + 5] = z2; return n + 1; };
  const circle = (b, n, cx, cy, cz, r, S, plane = "xy", ry = 1) => {
    for (let j = 0; j < S; j++) {
      const a1 = j / S * TAU, a2 = (j + 1) / S * TAU;
      if (plane === "xz") n = seg(b, n, cx + cos(a1) * r, cy, cz + sin(a1) * r, cx + cos(a2) * r, cy, cz + sin(a2) * r);
      else n = seg(b, n, cx + cos(a1) * r, cy + sin(a1) * r * ry, cz, cx + cos(a2) * r, cy + sin(a2) * r * ry, cz);
    }
    return n;
  };

  /* 0. the filter, shattered */
  const s0 = {
    name: "The filter, shattered",
    caption: "A sphere of sensory input. It fractures into shards and knits back: the thalamic filter failing.",
    view: { rx: .18, spin: .12 },
    lineCap: 8 * 72 + 44, lineOpacity: .45,
    sh: 0, jit: 1, flare: 0,
    init() {
      const K = 44, seeds = [];
      for (let k = 0; k < K; k++) { const i = Math.floor((k + .5) / K * N); seeds.push([FX[i], FY[i], FZ[i]]); }
      this.shard = new Uint8Array(N);
      for (let i = 0; i < N; i++) {
        let best = 0, bd = 9;
        for (let k = 0; k < K; k++) { const s = seeds[k], d = (FX[i] - s[0]) ** 2 + (FY[i] - s[1]) ** 2 + (FZ[i] - s[2]) ** 2; if (d < bd) { bd = d; best = k; } }
        this.shard[i] = best;
      }
      this.seeds = seeds;
      this.sv = seeds.map((s, k) => { const m = .4 + rng() * 1.2; return [s[0] * m + (rng() - .5) * .5, s[1] * m + (rng() - .5) * .5, s[2] * m + (rng() - .5) * .5, rng()]; });
    },
    frame(t, c, dt) {
      const h = hk("breach:");
      let tgt = Math.pow(.5 + .5 * sin(t * .42), 1.7);
      this.jit = ease(this.jit, h === "2" ? 3.4 : 1, dt, 5);
      this.flare = ease(this.flare, h === "1" ? 1 : 0, dt, 6);
      if (h === "0") tgt = 1.15;
      if (h === "3") tgt = 0;
      this.sh = ease(this.sh, tgt, dt, h ? 5 : 2.4); this.t = t;
      this.lineOpacity = .22 + .3 * (1 - this.sh);
    },
    lines(b) {
      let n = 0; const fade = 1 - this.sh;
      if (fade > .6) for (let r = 1; r < 9; r++) { const lat = -PI / 2 + r * PI / 9; n = circle(b, n, 0, sin(lat) * 2.5, 0, cos(lat) * 2.5 * (1 + this.sh * .08), 72, "xz"); }
      for (let k = 0; k < this.seeds.length; k++) {
        const s = this.seeds[k], v = this.sv[k];
        n = seg(b, n, s[0] * 2.5, s[1] * 2.5, s[2] * 2.5, s[0] * 2.5 + v[0] * this.sh * 1.7, s[1] * 2.5 + v[1] * this.sh * 1.7, s[2] * 2.5 + v[2] * this.sh * 1.7);
      }
      return n;
    },
    at(i, o) {
      const k = this.shard[i], sv = this.sv[k], sh = this.sh;
      const j = this.jit * (.025 + .07 * sh);
      o.x = FX[i] * 2.5 + sv[0] * sh * 1.7 + sin(this.t * 3 + R1[i] * 50) * j;
      o.y = FY[i] * 2.5 + sv[1] * sh * 1.7 + sin(this.t * 2.6 + R2[i] * 50) * j;
      o.z = FZ[i] * 2.5 + sv[2] * sh * 1.7 + sin(this.t * 3.4 + R3[i] * 50) * j;
      o.c = lerp(.93, .04, clamp(sh * .85 + sv[3] * .15 * sh));
      o.s = .9 + sh * .3;
      if (this.flare > .01 && sv[3] > .66) o.h = this.flare * .9;
    }
  };

  /* 1. additions and losses */
  const s1 = {
    name: "Additions and losses",
    caption: "Positive symptoms add a swarm around the mind. Negative symptoms flatten and dim it. Use the toggle.",
    view: { rx: .35, spin: .08 },
    lineCap: 12 * 96 + 72, lineOpacity: .2,
    wp: 1, flat: 0, bright: 0, mode: "all",
    frame(t, c, dt) {
      const h = hk("domain:"); const m = h || c.p.domain || "all";
      this.mode = m;
      this.wp = ease(this.wp, m === "negative" ? 0 : 1, dt, 2.4);
      this.flat = ease(this.flat, m === "negative" ? 1 : 0, dt, 2.4);
      this.bright = ease(this.bright, m === "positive" ? 1 : 0, dt, 3);
      this.t = t;
    },
    lines(b) {
      let n = circle(b, 0, 0, 0, 0, 2.1, 72, "xz");
      if (this.wp < .05) return n;
      for (let k = 0; k < 12; k++) {
        const r = lerp(2.1, 3.0 + k / 11 * 1.1, this.wp), tilt = .25 + (k * .37 % 1) * 1.25;
        for (let j = 0; j < 96; j++) {
          const a1 = j / 96 * TAU, a2 = (j + 1) / 96 * TAU;
          n = seg(b, n, cos(a1) * r, sin(a1) * r * sin(tilt), sin(a1) * r * cos(tilt), cos(a2) * r, sin(a2) * r * sin(tilt), sin(a2) * r * cos(tilt));
        }
      }
      return n;
    },
    at(i, o) {
      const t = this.t;
      const sw = R3[i] < .42;
      const bx = FX[i] * 2.1, by = FY[i] * 2.1 * (1 - .86 * this.flat), bz = FZ[i] * 2.1;
      if (!sw) {
        o.x = bx + sin(t * .8 + R1[i] * 40) * .03; o.y = by; o.z = bz + cos(t * .7 + R2[i] * 40) * .03;
        o.c = lerp(.9, .58, this.flat); o.a = lerp(1, .42, this.flat); o.s = lerp(1, .8, this.flat);
        if (this.mode === "negative") o.h = 0;
      } else {
        const a = R0[i] * TAU + t * (.3 + R1[i] * .5) * (this.wp > .1 ? 1 : .2), r = 3.0 + R2[i] * 1.1, tilt = .25 + R1[i] * 1.25;
        const ox = cos(a) * r, oy = sin(a) * r * sin(tilt), oz = sin(a) * r * cos(tilt);
        o.x = lerp(bx, ox, this.wp); o.y = lerp(by, oy, this.wp); o.z = lerp(bz, oz, this.wp);
        o.c = lerp(.62, .04 + R2[i] * .08, this.wp);
        o.a = lerp(.5, 1, this.wp); o.s = 1 + this.bright * .35;
        o.h = this.bright * .35 * this.wp;
      }
    }
  };

  /* 2. aberrant salience */
  const K2 = 6;
  const s2 = {
    name: "Aberrant salience",
    caption: "Random noise. Meaning gathers into clusters that flare, as though every coincidence were a message.",
    view: { rx: .1, spin: .06 },
    lineCap: 64, lineOpacity: .5,
    amp: .85, rate: .5, conv: 0, lock: 0,
    init() {
      this.base = new Float32Array(N * 3); this.hs = new Int8Array(N);
      for (let i = 0; i < N; i++) {
        const r = 3.6 * Math.cbrt(R0[i]);
        this.base[i * 3] = FX[i] * r * 1.2; this.base[i * 3 + 1] = FY[i] * r * .85; this.base[i * 3 + 2] = FZ[i] * r;
        this.hs[i] = R1[i] < .62 ? Math.floor(R2[i] * K2) : -1;
      }
      this.cx = new Float32Array(K2 * 3); this.I = new Float32Array(K2);
      this.seed = Array.from({ length: K2 }, () => [(rng() - .5) * 5, (rng() - .5) * 3.6, (rng() - .5) * 3]);
    },
    frame(t, c, dt) {
      const h = hk("sal:");
      this.amp = ease(this.amp, h === "volt" ? .12 : h === "spike" ? 1 : .85, dt, 4);
      this.rate = ease(this.rate, h === "spike" ? 2.2 : h === "volt" ? .3 : .5, dt, 3);
      this.conv = ease(this.conv, h === "theory" ? 1 : 0, dt, 2.5);
      this.lock = ease(this.lock, h === "loop" ? 1 : 0, dt, 3);
      this.t = t;
      for (let k = 0; k < K2; k++) {
        const p = .5 + .5 * sin(t * this.rate * (.6 + k * .17) + k * 2.1);
        const raw = Math.pow(p, 3);
        this.I[k] = this.amp * lerp(raw, 1, this.lock);
        const s = this.seed[k], ang = k / K2 * TAU + t * .25;
        this.cx[k * 3] = lerp(s[0] + sin(t * .3 + k) * .5, cos(ang) * 1.7, this.conv);
        this.cx[k * 3 + 1] = lerp(s[1] + cos(t * .27 + k) * .4, sin(ang) * 1.7, this.conv);
        this.cx[k * 3 + 2] = lerp(s[2], 0, this.conv);
        if (this.conv > .1) this.I[k] = Math.max(this.I[k], this.conv * .9);
      }
      let m = 0; for (let k = 0; k < K2; k++) m += this.I[k];
      this.lineOpacity = .15 + .6 * m / K2;
    },
    lines(b) {
      let n = 0; const c = this.cx;
      for (let k = 0; k < K2; k++) for (let j = k + 1; j < K2; j++) {
        if (this.conv < .5 && (j - k) % 2 === 0) continue;
        n = seg(b, n, c[k * 3], c[k * 3 + 1], c[k * 3 + 2], c[j * 3], c[j * 3 + 1], c[j * 3 + 2]);
      }
      return n;
    },
    at(i, o) {
      const t = this.t, b = this.base, k = this.hs[i];
      let x = b[i * 3] + sin(t * .3 + R0[i] * 30) * .12, y = b[i * 3 + 1] + cos(t * .27 + R1[i] * 30) * .12, z = b[i * 3 + 2];
      if (k < 0) { o.x = x; o.y = y; o.z = z; o.c = .8; o.a = .7; return; }
      const I = this.I[k] * .9, sp = lerp(.32, .12, this.conv);
      o.x = lerp(x, this.cx[k * 3] + G0[i] * sp, I); o.y = lerp(y, this.cx[k * 3 + 1] + G1[i] * sp, I); o.z = lerp(z, this.cx[k * 3 + 2] + G2[i] * sp, I);
      o.c = lerp(.8, .02, this.I[k]); o.s = 1 + this.I[k] * .7; o.a = .85;
    }
  };

  /* 3. the signal storm: top electric, middle fractured clock, bottom pool */
  const ZONE_OF = [0, 0, 0, 1, 0, 1, 2, 2];
  const s3 = {
    name: "The signal storm",
    caption: "Top: racing static and voices. Middle: the clock fractured by excess voltage. Bottom: dense gravity that will not move.",
    view: { rx: .05, spin: 0 },
    lineCap: 7 * 20 + 3 * 140, lineOpacity: .5,
    zone: -1, w: 0,
    init() { this.z = new Uint8Array(N); for (let i = 0; i < N; i++) this.z[i] = R0[i] < .42 ? 0 : R0[i] < .64 ? 1 : 2; },
    frame(t, c, dt) {
      const h = hk("storm:"); const tz = h === null ? -1 : ZONE_OF[+h];
      if (tz >= 0) this.zone = tz;
      this.w = ease(this.w, tz >= 0 ? 1 : 0, dt, 6); this.t = t;
    },
    lines(b, t) {
      let n = 0;
      for (let k = 0; k < 7; k++) for (let j = 0; j < 20; j++) {
        const a1 = (k + j / 20 * .72) / 7 * TAU, a2 = (k + (j + 1) / 20 * .72) / 7 * TAU, r = 1.45;
        n = seg(b, n, cos(a1) * r, -.05 + sin(a1) * r, 0, cos(a2) * r, -.05 + sin(a2) * r, 0);
      }
      for (let w = 0; w < 3; w++) for (let j = 0; j < 140; j++) {
        const x1 = -4.2 + j / 140 * 8.4, x2 = -4.2 + (j + 1) / 140 * 8.4, off = 2.3 + (w - 1) * .45, ph = w * 2.1;
        n = seg(b, n, x1, off + sin(x1 * 2.3 + t * 5 + ph) * .45, 0, x2, off + sin(x2 * 2.3 + t * 5 + ph) * .45, 0);
      }
      return n;
    },
    at(i, o) {
      const t = this.t, z = this.z[i];
      if (z === 0) {
        const x = (R1[i] - .5) * 8.4;
        o.x = x; o.y = 2.3 + (R2[i] - .5) * 1.5 + sin(x * 2.3 + t * 5 + R3[i] * 6) * .45 + sin(t * 9 + R0[i] * 90) * .06;
        o.z = G0[i] * .4; o.c = .03 + R3[i] * .1; o.s = 1.05;
      } else if (z === 1) {
        const a = R1[i] * TAU, seg = (a / TAU * 7) % 1, gap = seg > .72;
        let r = 1.45 + G0[i] * .04;
        if (gap) r += .5 + R2[i] * 1.1;
        o.x = cos(a) * r; o.y = -.05 + sin(a) * r; o.z = G1[i] * .08;
        o.c = gap ? .3 : .52; o.a = gap ? .4 + .5 * Math.abs(sin(t * 5 + R0[i] * 40)) : .95;
      } else {
        const d = (R1[i] + t * .05 * (.5 + R2[i])) % 1;
        const y = -1.5 - 1.9 * d;
        o.x = (R3[i] - .5) * 7 * (1 - .5 * d) + G0[i] * .05; o.y = y; o.z = G1[i] * .5;
        o.c = .88; o.a = .8; o.s = 1.2;
      }
      if (this.w > .02) {
        if (z === this.zone) { o.h = this.w * .75; o.s *= 1 + this.w * .3; } else o.a *= 1 - .6 * this.w;
      }
    }
  };

  /* 4. a calm core in a storm: support protocol */
  const s4 = {
    name: "A steady presence",
    caption: "The ordered core is the person. The cloud is the storm. Each rule changes how the cloud meets the core.",
    view: { rx: .15, spin: .1 },
    lineCap: 3 * 72 + 96, lineOpacity: .45,
    argue: 0, valid: 0, feel: 0, stim: 0, emerg: 0,
    frame(t, c, dt) {
      const h = hk("rule:");
      this.argue = ease(this.argue, h === "argue" ? 1 : 0, dt, 4); this.valid = ease(this.valid, h === "valid" ? 1 : 0, dt, 4);
      this.feel = ease(this.feel, h === "feel" ? 1 : 0, dt, 3); this.stim = ease(this.stim, h === "stim" ? 1 : 0, dt, 3);
      this.emerg = ease(this.emerg, h === "emerg" ? 1 : 0, dt, 5); this.t = t;
    },
    lines(b) {
      let n = circle(b, 0, 0, 0, 0, 1.15, 72); n = circle(b, n, 0, 0, 0, 1.15, 72, "xz");
      n = circle(b, n, 0, 0, 0, 1.15, 72, "xy", .35);
      if (this.feel > .05) n = circle(b, n, 0, 0, 0, 1.85, 96, "xz");
      return n;
    },
    at(i, o) {
      const t = this.t;
      if (R3[i] < .26) {
        const r = 1.0 + R0[i] * .22 * (1 + .2 * this.emerg * sin(t * 6));
        o.x = FX[i] * r; o.y = FY[i] * r; o.z = FZ[i] * r; o.c = .96; o.s = 1.05;
        o.h = this.feel * .45 + this.emerg * .5 * (.5 + .5 * sin(t * 6));
        return;
      }
      let r = 2.4 + R0[i] * 1.8;
      const wob = (.35 * (1 - .88 * this.stim));
      r *= 1 - .42 * this.argue * (.5 + .5 * sin(t * 8 + R1[i] * 6));
      let x = FX[i] * r + sin(t * 1.4 + R1[i] * 60) * wob, y = FY[i] * r * .9 + sin(t * 1.2 + R2[i] * 60) * wob, z = FZ[i] * r + sin(t * 1.6 + R0[i] * 60) * wob;
      if (this.feel > .01) {
        const a = R1[i] * TAU + t * .3, rr = 1.85 + G0[i] * .06;
        x = lerp(x, cos(a) * rr, this.feel); y = lerp(y, G1[i] * .08, this.feel); z = lerp(z, sin(a) * rr, this.feel);
      }
      o.x = x; o.y = y; o.z = z;
      o.c = lerp(.12, .78, this.feel) + this.valid * 0; o.s = 1 + this.valid * .6;
      o.a = lerp(.85, .35, this.stim);
      o.h = this.valid * .6;
    }
  };

  /* 5. four recovery rings */
  const s5 = {
    name: "Four pillars",
    caption: "Four rings settle around a calm centre: medication, therapy, sleep, and community.",
    view: { rx: .42, spin: 0 },
    lineCap: 4 * 128, lineOpacity: .4,
    hi: -1, w: 0,
    frame(t, c, dt) {
      const h = hk("pillar:");
      if (h !== null) this.hi = +h;
      this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t;
    },
    lines(b) {
      let n = 0;
      for (let k = 0; k < 4; k++) {
        const r = 1.45 + k * .62, tilt = .12 + k * .16;
        for (let j = 0; j < 128; j++) {
          const a1 = j / 128 * TAU, a2 = (j + 1) / 128 * TAU;
          n = seg(b, n, cos(a1) * r, sin(a1) * r * cos(tilt), sin(a1) * r * sin(tilt), cos(a2) * r, sin(a2) * r * cos(tilt), sin(a2) * r * sin(tilt));
        }
      }
      return n;
    },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .88) { const r = 1.0 * Math.cbrt(R0[i]); o.x = FX[i] * r; o.y = FY[i] * r; o.z = FZ[i] * r; o.c = .98; o.a = .9; return; }
      const k = Math.floor(R0[i] * 4), r = 1.45 + k * .62, dir = k % 2 ? -1 : 1;
      const a = R1[i] * TAU + t * (.22 + k * .06) * dir, tilt = .12 + k * .16;
      const px = cos(a) * r, py = sin(a) * r * cos(tilt), pz = sin(a) * r * sin(tilt);
      o.x = px + G0[i] * .045; o.y = py + G1[i] * .045; o.z = pz + G2[i] * .045;
      o.c = .55 + k * .12; o.s = 1;
      if (this.w > .02) { if (k === this.hi) { o.h = this.w * .8; o.s = 1.2; } else o.a = 1 - this.w * .6; }
    }
  };

  /* 6. five, four, three, two, one */
  const rows = [5, 4, 3, 2, 1]; const blobs = [];
  rows.forEach((n, r) => { for (let j = 0; j < n; j++) blobs.push({ x: (j - (n - 1) / 2) * 1.0, y: 2.1 - r * 1.05, row: r }); });
  const s6 = {
    name: "Five, four, three, two, one",
    caption: "Fifteen anchor points in a descending triangle: sights, touches, sounds, breaths, one truth. Vagus mode becomes a slow breathing sphere.",
    view: { rx: 0, spin: 0 },
    lineCap: 64, lineOpacity: .35,
    vag: 0,
    frame(t, c, dt) {
      this.vag = ease(this.vag, c.pace.mode === "vagus" ? 1 : 0, dt, 2.5);
      this.t = t; this.step = c.pace.running ? c.pace.step : -1; this.sc = c.pace.scale;
      this.hold = ease(this.hold || 0, c.pace.running ? 1 : 0, dt, 3);
      this.lineOpacity = .35 * (1 - this.vag);
    },
    lines(b) {
      if (this.vag > .9) return 0;
      let n = 0; const P = bl => [bl.x * 1.25, bl.y];
      for (let i = 0; i < blobs.length; i++) for (let j = i + 1; j < blobs.length; j++) {
        const a = blobs[i], c = blobs[j];
        const same = a.row === c.row && Math.abs(a.x - c.x) < 1.05, next = c.row === a.row + 1 && Math.abs(a.x - c.x) < .6;
        if (same || next) { const p = P(a), q = P(c); n = seg(b, n, p[0], p[1], 0, q[0], q[1], 0); }
      }
      return n;
    },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .93) { o.x = (R0[i] - .5) * 8; o.y = (R1[i] - .5) * 6; o.z = (R2[i] - .5) * 3; o.c = .6; o.a = .3; o.s = .7; return; }
      const b = blobs[Math.floor(R0[i] * 15) % 15];
      let x = b.x * 1.25 + G0[i] * .15, y = b.y + G1[i] * .15, z = G2[i] * .12;
      const rr = 1.9 * this.sc;
      const sx = FX[i] * rr, sy = FY[i] * rr, sz = FZ[i] * rr;
      o.x = lerp(x, sx, this.vag); o.y = lerp(y, sy, this.vag); o.z = lerp(z, sz, this.vag);
      o.c = .95; o.s = 1;
      if (this.vag < .5 && this.step >= 0) {
        if (b.row === this.step) { o.h = .85 * (.7 + .3 * sin(t * 4)); o.s = 1.25; } else { o.a = .38; }
      }
    }
  };

  /* 7. 988, formed from glyph pixels */
  const s7 = {
    name: "988",
    caption: "The lifeline, formed from the pixels of its own digits. Dial 988 in the USA and Canada.",
    view: { rx: 0, spin: 0 },
    init() { this.pts = text("988", { width: 6.4, px: 300, stride: 3 }); this.n = this.pts.length / 2; },
    frame(t) { this.t = t; },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .9) { o.x = (R0[i] - .5) * 9; o.y = (R1[i] - .5) * 5; o.z = (R2[i] - .5) * 2; o.c = .6; o.a = .22; o.s = .7; return; }
      const j = (i * 7919) % this.n;
      o.x = this.pts[j * 2] + G0[i] * .02 + sin(t * 1.2 + R1[i] * 40) * .012;
      o.y = this.pts[j * 2 + 1] + G1[i] * .02 + cos(t * 1.1 + R2[i] * 40) * .012;
      o.z = G2[i] * .06; o.c = .98; o.s = 1;
    }
  };

  return [s0, s1, s2, s3, s4, s5, s6, s7];
}
