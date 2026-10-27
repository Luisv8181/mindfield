(U) => {
  const { N, R0, R1, R2, R3, G0, G1, G2, FX, FY, FZ, TAU, clamp, lerp, smooth, ctx, rng, text } = U;
  const sin = Math.sin, cos = Math.cos, PI = Math.PI;
  const hk = pfx => (ctx.hotAmt > .04 && ctx.hotKey.startsWith(pfx)) ? ctx.hotKey.slice(pfx.length) : null;
  const ease = (cur, tgt, dt, rate = 4) => cur + (tgt - cur) * (1 - Math.exp(-dt * rate));
  const colY = y => clamp(.5 + y / 6.6);
  /* mood profile: one lobe up (share = duty), one lobe down */
  const prof = (p, hi, lo, duty) => p < duty ? hi * sin(PI * p / duty) : lo * sin(PI * (p - duty) / (1 - duty));
  const fr = x => x - Math.floor(x);
  const XW = 7.8;
  const seg = (b, n, x1, y1, z1, x2, y2, z2) => { const o = n * 6; b[o] = x1; b[o + 1] = y1; b[o + 2] = z1; b[o + 3] = x2; b[o + 4] = y2; b[o + 5] = z2; return n + 1; };
  const poly = (b, n, f, x0, x1, S, z = 0) => { for (let j = 0; j < S; j++) { const a = x0 + (x1 - x0) * j / S, c = x0 + (x1 - x0) * (j + 1) / S; n = seg(b, n, a, f(a), z, c, f(c), z); } return n; };
  const circle = (b, n, cx, cy, r, S) => { for (let j = 0; j < S; j++) { const a1 = j / S * TAU, a2 = (j + 1) / S * TAU; n = seg(b, n, cx + cos(a1) * r, cy + sin(a1) * r, 0, cx + cos(a2) * r, cy + sin(a2) * r, 0); } return n; };
  const ticks = (b, n, cx, cy, r, len) => { for (let k = 0; k < 24; k++) { const a = k / 24 * TAU, l = k % 6 === 0 ? len * 2 : len; n = seg(b, n, cx + cos(a) * r, cy + sin(a) * r, 0, cx + cos(a) * (r + l), cy + sin(a) * (r + l), 0); } return n; };

  /* 0. the poles */
  const s0 = {
    name: "The poles",
    caption: "Mood plotted over time. Height sets color: amber at the ceiling, indigo at the floor.",
    view: { rx: .06, spin: 0 },
    lineCap: 260, lineOpacity: .7,
    hi: 2.6, lo: -2.6, fq: .115, chaos: 0, mode: -1, w: 0,
    y(x) { const t = this.t; return prof(fr(x * this.fq - t * .05), this.hi, this.lo, .5) + this.chaos * (sin(x * 7 + t * 9) * .9 + sin(x * 13 - t * 7) * .6); },
    lines(b) { let n = poly(b, 0, x => this.y(x), -XW / 2, XW / 2, 240); n = seg(b, n, -XW / 2, 3.15, -.4, XW / 2, 3.15, -.4); return seg(b, n, -XW / 2, -3.15, -.4, XW / 2, -3.15, -.4); },
    frame(t, c, dt) {
      const h = hk("pole:"); const m = h === null ? -1 : +h;
      this.hi = ease(this.hi, m === 0 ? 3.15 : m === 3 ? .45 : 2.6, dt, 3);
      this.lo = ease(this.lo, m === 1 ? -3.15 : m === 3 ? -.45 : -2.6, dt, 3);
      this.fq = ease(this.fq, m === 0 ? .17 : m === 1 ? .07 : .115, dt, 3);
      this.chaos = ease(this.chaos, m === 2 ? 1 : 0, dt, 4);
      this.mode = m; this.w = ease(this.w, m >= 0 ? 1 : 0, dt, 5); this.t = t;
    },
    at(i, o) {
      const t = this.t;
      if (R3[i] < .1) { const up = R2[i] < .5; o.x = (R0[i] - .5) * XW; o.y = (up ? 3.15 : -3.15) + G0[i] * .03; o.z = -.4; o.c = colY(o.y); o.a = .55; o.s = .8; return; }
      const x = (R0[i] - .5) * XW;
      const p = fr(x * this.fq - t * .05 + R1[i] * .0);
      let y = prof(p, this.hi, this.lo, .5);
      y += this.chaos * (sin(x * 7 + t * 9) * .9 + sin(x * 13 - t * 7) * .6) + G0[i] * .06 + sin(t * 8 + R2[i] * 80) * this.chaos * .1;
      o.x = x; o.y = y; o.z = G1[i] * .3; o.c = colY(y);
      if (this.w > .02) {
        if (this.mode === 0 && y > .4) o.h = this.w * .55;
        if (this.mode === 1 && y < -.4) o.h = this.w * .55;
        if (this.mode === 2) o.h = this.w * .35 * (.5 + .5 * sin(x * 7 + t * 9));
      }
    }
  };

  /* 1. Type I against Type II */
  const s1 = {
    name: "Type I and Type II",
    caption: "Two profiles over the same time. Type I reaches a full manic ceiling. Type II spends most of its time deep below the line.",
    view: { rx: .06, spin: 0 },
    lineCap: 480, lineOpacity: .6,
    aA: 1, aB: 1,
    lines(b) {
      const t = this.t; let n = 0;
      if (this.aA > .3) n = poly(b, n, x => prof(fr(x * .115 - t * .05), 3.0, -2.0, .5), -XW / 2, XW / 2, 240, .2);
      if (this.aB > .3) n = poly(b, n, x => prof(fr(fr(x * .115 - t * .05) + .12), 1.0, -2.8, .18), -XW / 2, XW / 2, 240, -.5);
      return n;
    },
    frame(t, c, dt) {
      const h = hk("type:"); const m = h || c.p.type || "all";
      this.aA = ease(this.aA, m === "type2" ? .09 : 1, dt, 3); this.aB = ease(this.aB, m === "type1" ? .09 : 1, dt, 3);
      this.t = t; this.m = m;
    },
    at(i, o) {
      const t = this.t, x = (R0[i] - .5) * XW, A = R3[i] < .5;
      const p = fr(x * .115 - t * .05);
      const y = A ? prof(p, 3.0, -2.0, .5) : prof(fr(p + .12), 1.0, -2.8, .18);
      o.x = x; o.y = y + G0[i] * .05; o.z = (A ? .2 : -.5) + G1[i] * .25; o.c = colY(y);
      o.a = A ? this.aA : this.aB; o.s = A ? 1 : .95;
    }
  };

  /* 2. ascent, collision, crash */
  const s2 = {
    name: "Ascent, collision, crash",
    caption: "Read left to right as time. A climbing eruption, a jagged collision, then a long drain downward.",
    view: { rx: .06, spin: 0 },
    lineCap: 400, lineOpacity: .55,
    tier: -1, w: 0, speed: 1,
    y(x) {
      const t = this.t, u = (x + XW / 2) / XW;
      const wa = 1 - smooth(.3, .38, u), wd = smooth(.6, .68, u), wc = 1 - wa - wd, ph = u / .34;
      const ya = .3 + 2.5 * Math.pow(clamp(ph), 1.4) * (.55 + .45 * sin(x * (2 + 3 * ph) - this.ph * 2.2));
      const yc = 2.6 * sin(x * 9 + t * 10) * (.8 + .2 * sin(t * 13)) * (.6 + .4 * sin(x * 3 + t * 6));
      const q = clamp((u - .64) / .36), yd = lerp(.9, -2.9, smooth(0, 1, q)) + sin(x * 1.5 - this.ph * .6) * .45 * (1 - q);
      return ya * wa + yc * wc + yd * wd;
    },
    lines(b) { return poly(b, 0, x => this.y(x), -XW / 2, XW / 2, 400); },
    frame(t, c, dt) {
      const h = hk("tier:"); const m = h === null ? -1 : +h;
      if (m >= 0) this.tier = m;
      this.w = ease(this.w, m >= 0 ? 1 : 0, dt, 5);
      this.speed = ease(this.speed, m === 3 ? 2.6 : 1, dt, 3);
      this.ph = (this.ph || 0) + dt * this.speed * (c.calm ? .25 : 1); this.t = t;
    },
    at(i, o) {
      const t = this.t, x = (R0[i] - .5) * XW, u = (x + XW / 2) / XW;
      const wa = 1 - smooth(.3, .38, u), wd = smooth(.6, .68, u), wc = 1 - wa - wd;
      const ph = u / .34;
      const ya = .3 + 2.5 * Math.pow(clamp(ph), 1.4) * (.55 + .45 * sin(x * (2 + 3 * ph) - this.ph * 2.2));
      const yc = 2.6 * sin(x * 9 + t * 10 + R1[i] * .6) * (.8 + .2 * sin(t * 13 + R0[i] * 20)) * (.6 + .4 * sin(x * 3 + t * 6));
      const q = clamp((u - .64) / .36);
      const yd = lerp(.9, -2.9, smooth(0, 1, q)) + sin(x * 1.5 - this.ph * .6) * .45 * (1 - q);
      const y = ya * wa + yc * wc + yd * wd + G0[i] * .05;
      o.x = x; o.y = y; o.z = G1[i] * .3; o.c = colY(y);
      const zone = u < .34 ? 0 : u < .64 ? 1 : 2;
      if (this.w > .02) {
        const on = this.tier === 3 || zone === this.tier;
        if (on) o.h = this.w * (this.tier === 1 ? .6 : .45); else o.a = 1 - this.w * .55;
      }
    }
  };

  /* 3. somatic signals: a ribbon and a clock */
  const s3 = {
    name: "Somatic signals",
    caption: "The ribbon is mood and energy. The ring is the body clock. Each symptom bends one or the other.",
    view: { rx: .06, spin: 0 },
    lineCap: 300, lineOpacity: .55,
    fq: 1, amp: 1, sink: 0, desat: 0, jit: 0, brk: 0, rhot: 0, sz: 1,
    lines(b) {
      const t = this.t;
      let n = poly(b, 0, x => prof(fr(x * .115 * this.fq - t * .05), 2.4 * this.amp, -2.4 * this.amp, .5) + this.sink, -XW / 2, XW / 2, 220, 1.5);
      if (this.brk < .3) { n = circle(b, n, 0, 0, 1.2, 48); n = ticks(b, n, 0, 0, 1.2, .1); }
      return n;
    },
    frame(t, c, dt) {
      const h = hk("soma:"); const m = h === null ? -1 : +h;
      this.fq = ease(this.fq, m === 0 ? 3 : m === 2 ? 2 : m === 4 ? .35 : 1, dt, 3);
      this.amp = ease(this.amp, m === 2 ? 1.45 : m === 4 ? .35 : 1, dt, 3);
      this.sink = ease(this.sink, m === 4 ? -1.9 : 0, dt, 3);
      this.desat = ease(this.desat, m === 5 ? 1 : 0, dt, 3);
      this.jit = ease(this.jit, m === 6 ? 1 : 0, dt, 5);
      this.brk = ease(this.brk, m === 3 ? 1 : 0, dt, 4);
      this.rhot = ease(this.rhot, m === 1 ? 1 : 0, dt, 4);
      this.sz = ease(this.sz, m === 7 ? 1.7 : m === 5 ? .65 : 1, dt, 4);
      this.t = t; this.m = m;
    },
    at(i, o) {
      const t = this.t;
      if (R3[i] < .3) {
        const k = Math.floor(R1[i] * 24), a = k / 24 * TAU + G0[i] * .02;
        let r = 1.2 + G1[i] * .035 + ((k % 6 === 0) ? R2[i] * .22 : 0);
        const br = this.brk * (sin(k * 12.9 + 1.3) * .5 + .5) * 1.2;
        r += br * (R2[i] - .2);
        const aa = a + this.brk * sin(k * 7.1) * .35;
        const flick = this.rhot * (.5 + .5 * sin(t * 9 + k));
        o.x = cos(aa) * r; o.y = sin(aa) * r; o.z = G2[i] * .05;
        o.c = .5; o.a = .95; o.h = this.rhot * .55 * flick + this.brk * .3; o.s = this.sz;
        return;
      }
      const x = (R0[i] - .5) * XW;
      const p = fr(x * .115 * this.fq - t * .05);
      let y = prof(p, 2.4 * this.amp, -2.4 * this.amp, .5) + this.sink * (R3[i] < .6 ? 1 : 1);
      y += this.jit * sin(t * 30 + R2[i] * 90) * .3 + G0[i] * .06;
      o.x = x; o.y = y; o.z = G1[i] * .3 + 1.5;
      o.c = lerp(colY(y), .5, this.desat); o.s = this.sz; o.a = lerp(1, .55, this.desat);
      if (this.m === 7) o.h = .18;
    }
  };

  /* 4. the mixed collision */
  const s4 = {
    name: "The mixed collision",
    caption: "A fast manic wave and a heavy depressive wave in one body. Coral marks where they collide.",
    view: { rx: .06, spin: 0 },
    lineCap: 440, lineOpacity: .5,
    agit: .35, calm: 0, pace: 0,
    lines(b) {
      const t = this.t, amp = 1 - .7 * this.calm;
      let n = poly(b, 0, x => 2.1 * amp * sin(x * 2.4 + t * 5.2), -XW / 2, XW / 2, 220);
      return poly(b, n, x => -1.7 + .5 * sin(x * .8 - t * .4) + this.calm * 1.5, -XW / 2, XW / 2, 220);
    },
    frame(t, c, dt) {
      const h = hk("mix:");
      this.agit = ease(this.agit, h === "0" ? 1 : h === "1" ? .06 : .35, dt, 3);
      this.calm = ease(this.calm, h === "1" ? 1 : 0, dt, 3);
      this.pace = ease(this.pace, h === "0" ? 1 : 0, dt, 3); this.t = t;
    },
    at(i, o) {
      const t = this.t, x0 = (R0[i] - .5) * XW, A = R3[i] < .5;
      const amp = 1 - .7 * this.calm;
      const x = x0 + this.pace * sin(t * 5 + R1[i] * 6) * .5;
      const yA = 2.1 * amp * sin(x * 2.4 + t * 5.2);
      const yB = -1.7 + .5 * sin(x * .8 - t * .4) + this.calm * 1.5;
      const y = (A ? yA : yB) + sin(t * 24 + R2[i] * 90) * .12 * this.agit + G0[i] * .05;
      o.x = x; o.y = y; o.z = G1[i] * .3; o.c = colY(y);
      const d = Math.abs(yA - yB);
      if (d < .55) o.h = (1 - d / .55) * .7 * (1 - .8 * this.calm);
    }
  };

  /* 5. four biological motifs */
  const CEN = [[-1.9, 1.55], [1.95, 1.55], [-1.9, -1.55], [1.95, -1.55]];
  const s5 = {
    name: "The biological engine",
    caption: "A clock, a dopamine pulse, a membrane with ion channels, and a mitochondrion that swells and shrinks.",
    view: { rx: .04, spin: 0 },
    lineCap: 48 + 24 + 4 + 64 + 2, lineOpacity: .5,
    hi: -1, w: 0,
    lines(b) {
      const t = this.t; let n = circle(b, 0, CEN[0][0], CEN[0][1], 1.15, 48);
      n = ticks(b, n, CEN[0][0], CEN[0][1], 1.15, .1);
      const cx = CEN[2][0], cy = CEN[2][1], gaps = [-.75, 0, .75], xs = [-1.7, ...gaps.flatMap(g => [g - .2, g + .2]), 1.7];
      for (let j = 0; j < xs.length; j += 2) n = seg(b, n, cx + xs[j], cy, 0, cx + xs[j + 1], cy, 0);
      const m = 1 + .42 * sin(t * .7), ex = CEN[3][0], ey = CEN[3][1];
      for (let j = 0; j < 64; j++) { const a1 = j / 64 * TAU, a2 = (j + 1) / 64 * TAU; n = seg(b, n, ex + cos(a1) * 1.3 * m, ey + sin(a1) * .72 * m, 0, ex + cos(a2) * 1.3 * m, ey + sin(a2) * .72 * m, 0); }
      return n;
    },
    frame(t, c, dt) { const h = hk("bio:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const t = this.t, q = Math.floor(R0[i] * 4), cx = CEN[q][0], cy = CEN[q][1];
      if (q === 0) {
        const k = Math.floor(R1[i] * 24), a = k / 24 * TAU;
        if (R2[i] < .16) { const th = t * .5, l = R1[i] * 1.0; o.x = cx + cos(th) * l; o.y = cy + sin(th) * l; o.c = .7; }
        else { const r = 1.15 + G0[i] * .03 + ((k % 6 === 0) ? R2[i] * .2 : 0); o.x = cx + cos(a) * r; o.y = cy + sin(a) * r; o.c = .5; }
        o.z = G1[i] * .04;
      } else if (q === 1) {
        const ph = fr(t * .35 + R1[i]), r = ph * 1.45, a = R2[i] * TAU;
        o.x = cx + cos(a) * r; o.y = cy + sin(a) * r; o.z = G0[i] * .05; o.c = .96; o.a = 1 - ph; o.s = 1 + (1 - ph) * .5;
      } else if (q === 2) {
        const gaps = [-.75, 0, .75];
        if (R1[i] < .5) {
          let x = (R2[i] - .5) * 3.4; for (const g of gaps) if (Math.abs(x - g) < .2) x += (x > g ? .2 : -.2);
          o.x = cx + x; o.y = cy + G0[i] * .03; o.c = .5; o.a = .9;
        } else {
          const j = Math.floor(R2[i] * 3), d = fr(t * .22 + R3[i]);
          o.x = cx + gaps[j] + G0[i] * .09 * (1 - Math.abs(d - .5) * 1.2); o.y = cy + 1.15 - d * 2.3; o.c = .22; o.s = .9;
        }
        o.z = G1[i] * .05;
      } else {
        const m = 1 + .42 * sin(t * .7), r = Math.sqrt(R1[i]), a = R2[i] * TAU;
        o.x = cx + cos(a) * r * 1.3 * m; o.y = cy + sin(a) * r * .72 * m; o.z = G0[i] * .06;
        o.c = clamp(.5 + .45 * sin(t * .7) + G1[i] * .03); o.s = .9 + .2 * m;
      }
      if (this.w > .02) { if (q === this.hi) { o.h = this.w * .5; o.s *= 1.15; } else o.a *= 1 - this.w * .6; }
    }
  };

  /* 6. the 24h ring and the breathing sphere */
  const s6 = {
    name: "The 24 hour anchor",
    caption: "A day as a ring, with a calm wave through it. Pacing lights each quarter. Down-shift mode becomes a breathing sphere.",
    view: { rx: .05, spin: 0 },
    lineCap: 96 + 24 + 160, lineOpacity: .5,
    sph: 0,
    lines(b) {
      if (this.sph > .6) return 0;
      const t = this.t; let n = circle(b, 0, 0, 0, 2.2, 96); n = ticks(b, n, 0, 0, 2.2, .13);
      return poly(b, n, x => sin(x * 2.2 - t * .8) * .35, -1.9, 1.9, 160);
    },
    frame(t, c, dt) {
      this.sph = ease(this.sph, c.pace.mode === "surge" ? 1 : 0, dt, 2.5);
      this.t = t; this.step = c.pace.running ? c.pace.step : -1; this.sc = c.pace.scale;
    },
    at(i, o) {
      const t = this.t;
      let x, y, z = G2[i] * .05, c, h = 0, a = 1, s = 1;
      if (R3[i] < .66) {
        const k = Math.floor(R1[i] * 24), ang = k / 24 * TAU - PI / 2 + G0[i] * .018;
        const r = 2.2 + G1[i] * .035 + ((k % 6 === 0) ? R2[i] * .26 : 0);
        x = cos(ang) * r; y = -sin(ang) * r; c = .5 + .45 * sin(ang + PI / 2) * 0;
        const quarter = Math.floor(k / 6);
        c = quarter === 0 ? .9 : quarter === 1 ? .78 : quarter === 2 ? .35 : .12;
        if (this.step >= 0 && this.sph < .5) { if (quarter === this.step) { h = .6; s = 1.2; } else a = .4; }
      } else {
        x = (R0[i] - .5) * 3.8; y = sin(x * 2.2 - t * .8) * .35 + G0[i] * .03; c = .5;
      }
      const rr = 1.9 * this.sc, sx = FX[i] * rr, sy = FY[i] * rr, sz = FZ[i] * rr;
      o.x = lerp(x, sx, this.sph); o.y = lerp(y, sy, this.sph); o.z = lerp(z, sz, this.sph);
      o.c = lerp(c, .5, this.sph); o.h = h; o.a = a; o.s = s;
    }
  };

  /* 7. 988 */
  const s7 = {
    name: "988",
    caption: "The lifeline, formed from the pixels of its own digits. Dial 988 in the USA and Canada.",
    view: { rx: 0, spin: 0 },
    init() { this.pts = text("988", { width: 6.4, px: 300, stride: 3 }); this.n = this.pts.length / 2; },
    frame(t) { this.t = t; },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .9) { o.x = (R0[i] - .5) * 9; o.y = (R1[i] - .5) * 5; o.z = (R2[i] - .5) * 2; o.c = .5; o.a = .22; o.s = .7; return; }
      const j = (i * 7919) % this.n;
      const y = this.pts[j * 2 + 1];
      o.x = this.pts[j * 2] + G0[i] * .02 + sin(t * 1.2 + R1[i] * 40) * .012;
      o.y = y + G1[i] * .02 + cos(t * 1.1 + R2[i] * 40) * .012;
      o.z = G2[i] * .06; o.c = .86; o.s = 1;
    }
  };

  return [s0, s1, s2, s3, s4, s5, s6, s7];
}
