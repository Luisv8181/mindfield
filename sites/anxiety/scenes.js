(U) => {
  const { N, R0, R1, R2, R3, G0, G1, G2, FX, FY, FZ, TAU, clamp, lerp, smooth, ctx } = U;
  const sin = Math.sin, cos = Math.cos, PI = Math.PI, sqrt = Math.sqrt;
  const hk = pfx => (ctx.hotAmt > .04 && ctx.hotKey.startsWith(pfx)) ? ctx.hotKey.slice(pfx.length) : null;
  const ease = (cur, tgt, dt, rate = 4) => cur + (tgt - cur) * (1 - Math.exp(-dt * rate));
  const seg = (b, n, x1, y1, z1, x2, y2, z2) => { const o = n * 6; b[o] = x1; b[o + 1] = y1; b[o + 2] = z1; b[o + 3] = x2; b[o + 4] = y2; b[o + 5] = z2; return n + 1; };

  /* 0. the alarm: a buzzing cloud */
  const s0 = {
    view: { rx: .1, spin: .1 },
    lineCap: 120, lineOpacity: .35, lineColor: "#d9431c",
    amp: .55, sp: 1, cold: 0,
    frame(t, c, dt) {
      const h = hk("sig:");
      this.amp = ease(this.amp, h === "0" ? 1.0 : h === "3" ? .12 : .55, dt, 3);
      this.sp = ease(this.sp, h === "0" ? 2 : 1, dt, 3);
      this.cold = ease(this.cold, h === "3" ? 1 : 0, dt, 3);
      this.ph = (this.ph || 0) + dt * this.sp * (c.calm ? .25 : 1); this.t = t;
    },
    at(i, o) {
      const p = this.ph, r = 3.9 * Math.cbrt(R0[i]);
      o.x = FX[i] * r * 1.15 + sin(p * 1.3 + R1[i] * 40) * this.amp * .5;
      o.y = FY[i] * r * .9 + sin(p * 1.1 + R2[i] * 40) * this.amp * .5;
      o.z = FZ[i] * r + sin(p * 1.7 + R3[i] * 40) * this.amp * .5;
      o.c = lerp(R3[i] < .35 ? .05 : .85, .95, this.cold); o.s = .9;
    },
    lines(b) {
      let n = 0; const p = this.ph;
      for (let k = 0; k < 120; k++) {
        const a = k * 2.399, r = 1.2 + (k % 7) * .4, x = cos(a + p * .2) * r, y = sin(a * 1.3 + p * .15) * r * .7;
        const l = .25 * this.amp + .05;
        n = seg(b, n, x, y, 0, x + cos(a * 3 + p * 2) * l, y + sin(a * 3 + p * 2) * l, 0);
      }
      return n;
    }
  };

  /* 1. the loop */
  const s1 = {
    view: { rx: -.2, spin: 0 },
    lineCap: 3 * 120, lineOpacity: .45,
    hi: -1, w: 0,
    frame(t, c, dt) { const h = hk("loop:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.ph = (this.ph || 0) + dt * .35 * (c.calm ? .25 : 1); },
    at(i, o) {
      const node = R3[i] < .38 ? Math.floor(R2[i] * 4) : -1;
      const a = node >= 0 ? -PI / 2 + node * TAU / 4 + this.ph + G0[i] * .15 : R0[i] * TAU;
      const r = 2.5 + G1[i] * (node >= 0 ? .14 : .05);
      o.x = cos(a) * r; o.y = sin(a) * r * .85; o.z = G2[i] * .06;
      o.c = node >= 0 ? (node === 2 ? .05 : .95) : .8; o.a = node >= 0 ? 1 : .55; o.s = node >= 0 ? 1.1 : .75;
      if (this.w > .02 && node >= 0) { if (node === this.hi) { o.h = this.w * .8; o.s = 1.45; } else o.a = 1 - this.w * .5; }
    },
    lines(b) {
      let n = 0;
      for (let k = 0; k < 3; k++) for (let j = 0; j < 120; j++) {
        const r = 2.5 + (k - 1) * .05, a1 = j / 120 * TAU, a2 = (j + 1) / 120 * TAU;
        n = seg(b, n, cos(a1) * r, sin(a1) * r * .85, 0, cos(a2) * r, sin(a2) * r * .85, 0);
      }
      return n;
    }
  };

  /* 2. a figure with the places anxiety can show up */
  const SPOT = [[0, 2.4, 0, .8, 0], [0, 1.85, .1, .5, 0], [0, 1.15, .2, .85, 0], [.3, 1.0, .2, .4, 0], [0, -.1, .2, .7, 0], [1.0, 1.45, 0, .75, 1], [.38, -1.5, 0, .95, 1], [.4, -2.8, 0, .65, 1]];
  const s2 = {
    view: { rx: 0, spin: 0 },
    hi: -1, w: 0,
    init() {
      this.p = new Float32Array(N * 3);
      const cap = (a, b, r) => { const t = U.rng(), u = U.rng() * 2 - 1, q = U.rng() * TAU, s = sqrt(1 - u * u), k = r * (.85 + .15 * U.rng()); return [a[0] + (b[0] - a[0]) * t + s * cos(q) * k, a[1] + (b[1] - a[1]) * t + u * k, (s * sin(q)) * k * .8]; };
      const ell = (c, rx, ry, rz) => { const u = U.rng() * 2 - 1, q = U.rng() * TAU, s = sqrt(1 - u * u); return [c[0] + s * cos(q) * rx, c[1] + u * ry, s * sin(q) * rz]; };
      for (let i = 0; i < N; i++) {
        const r = R0[i], side = R1[i] < .5 ? -1 : 1;
        const q = r < .09 ? ell([0, 2.4], .5, .58, .5) : r < .12 ? cap([0, 1.75, 0], [0, 2.0, 0], .18) : r < .48 ? ell([0, .55], .82, 1.25, .42)
          : r < .64 ? cap([side * .95, 1.5, 0], [side * 1.3, -.7, 0], .17) : cap([side * .36, -.6, 0], [side * .42, -2.9, 0], .26);
        this.p.set(q, i * 3);
      }
    },
    frame(t, c, dt) { const h = hk("body:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const x = this.p[i * 3], y = this.p[i * 3 + 1], z = this.p[i * 3 + 2];
      o.x = x + sin(this.t * 2 + R2[i] * 40) * .01; o.y = y; o.z = z; o.c = .9; o.s = .9;
      if (this.w > .02) {
        const s = SPOT[this.hi], qx = s[4] ? Math.abs(x) : x, d = sqrt((qx - s[0]) ** 2 + (y - s[1]) ** 2 + (z - s[2]) ** 2);
        const hot = 1 - smooth(s[3] * .6, s[3], d);
        o.h = hot * this.w; o.s = .9 + hot * .5 * this.w; if (hot < .1) o.a = 1 - this.w * .4;
      }
    }
  };

  /* 3. four layers, settling */
  const s3 = {
    view: { rx: .26, spin: .08 },
    lineCap: 4 * 96, lineOpacity: .35,
    hi: -1, w: 0,
    frame(t, c, dt) { const h = hk("seq:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const layer = Math.floor(R0[i] * 4), step = 3 - layer, ra = 2.3 * sqrt(R1[i]), a = R2[i] * TAU;
      const jit = .03 + .2 * (1 - step / 3), t = this.t;
      o.x = cos(a) * ra + sin(t * 1.3 + R3[i] * 40) * jit; o.y = -1.5 + layer + sin(t * 1.1 + R1[i] * 40) * jit; o.z = sin(a) * ra + sin(t * 1.7 + R2[i] * 40) * jit;
      o.c = step === 0 ? .2 : .9; o.s = .9;
      if (this.w > .02) { if (step === this.hi) { o.h = this.w * .75; o.s = 1.2; } else o.a = 1 - this.w * .5; }
    },
    lines(b) {
      let n = 0;
      for (let l = 0; l < 4; l++) for (let j = 0; j < 96; j++) {
        const a1 = j / 96 * TAU, a2 = (j + 1) / 96 * TAU, y = -1.5 + l;
        n = seg(b, n, cos(a1) * 2.35, y, sin(a1) * 2.35, cos(a2) * 2.35, y, sin(a2) * 2.35);
      }
      return n;
    }
  };

  /* 4. the breathing sphere */
  const s4 = {
    view: { rx: .15, spin: .06 },
    lineCap: 8 * 72, lineOpacity: .35,
    frame(t, c) { this.sc = c.pace.scale * (1 + .02 * sin(t * .9)); this.t = t; },
    at(i, o) {
      const r = 2.1 * this.sc * (.97 + .06 * R0[i]);
      o.x = FX[i] * r; o.y = FY[i] * r; o.z = FZ[i] * r; o.c = .92; o.s = .9;
    },
    lines(b) {
      let n = 0; const R = 2.1 * this.sc;
      for (let k = 1; k < 9; k++) { const lat = -PI / 2 + k * PI / 9, y = sin(lat) * R, rr = cos(lat) * R;
        for (let j = 0; j < 72; j++) { const a1 = j / 72 * TAU, a2 = (j + 1) / 72 * TAU; n = seg(b, n, cos(a1) * rr, y, sin(a1) * rr, cos(a2) * rr, y, sin(a2) * rr); } }
      return n;
    }
  };

  return [s0, s1, s2, s3, s4];
}
