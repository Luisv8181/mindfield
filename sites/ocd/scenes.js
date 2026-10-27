(U) => {
  const { N, R0, R1, R2, R3, G0, G1, G2, FX, FY, FZ, TAU, clamp, lerp, smooth, ctx } = U;
  const sin = Math.sin, cos = Math.cos, PI = Math.PI, exp = Math.exp, sqrt = Math.sqrt;
  const hk = pfx => (ctx.hotAmt > .04 && ctx.hotKey.startsWith(pfx)) ? ctx.hotKey.slice(pfx.length) : null;
  const ease = (cur, tgt, dt, rate = 4) => cur + (tgt - cur) * (1 - Math.exp(-dt * rate));
  const fr = x => x - Math.floor(x);
  const seg = (b, n, x1, y1, z1, x2, y2, z2) => { const o = n * 6; b[o] = x1; b[o + 1] = y1; b[o + 2] = z1; b[o + 3] = x2; b[o + 4] = y2; b[o + 5] = z2; return n + 1; };

  /* 0. an intrusion moving through an ordered lattice */
  const GW = 64, GH = 44, SP = .115;
  const s0 = {
    view: { rx: -.42, spin: 0 },
    lineCap: 420, lineOpacity: .75, lineColor: "#e5482e",
    amp: .22, fq: 6, jit: 0, stiff: 0, allow: 0, speed: 1,
    init() { this.hist = new Float32Array(420 * 2); this.hn = 0; this.ph = 0; },
    frame(t, c, dt) {
      const h = hk("home:");
      this.amp = ease(this.amp, h === "0" ? .48 : h === "4" ? 0 : h === "1" ? .06 : .22, dt, 3);
      this.fq = ease(this.fq, h === "3" ? 11 : 6, dt, 3);
      this.jit = ease(this.jit, h === "2" ? 1 : 0, dt, 4);
      this.allow = ease(this.allow, h === "4" ? 1 : 0, dt, 2);
      this.speed = ease(this.speed, h === "1" ? 3.2 : h === "4" ? .35 : 1, dt, 3);
      this.ph += dt * this.speed * (c.calm ? .25 : 1); this.t = t;
      const p = this.ph;
      this.px = 2.3 * sin(p * .31) + .5 * sin(p * 1.13); this.py = 1.5 * sin(p * .47 + 1) + .3 * cos(p * .9);
      const k = this.hn % 420; this.hist[k * 2] = this.px; this.hist[k * 2 + 1] = this.py; this.hn++;
    },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .986) {
        o.x = this.px + G0[i] * .07; o.y = this.py + G1[i] * .07; o.z = .08 + G2[i] * .03; o.c = 0; o.s = 1.5; return;
      }
      const g = i % (GW * GH), gx = (g % GW - GW / 2 + .5) * SP, gy = (Math.floor(g / GW) - GH / 2 + .5) * SP;
      const dx = gx - this.px, dy = gy - this.py, d = sqrt(dx * dx + dy * dy) + 1e-4;
      const w = this.amp * exp(-d * 1.25) * sin(d * this.fq - t * 4);
      let x = gx + dx / d * w * .35 + G0[i] * .01, y = gy + dy / d * w * .35 + G1[i] * .01;
      if (this.jit > .01) { const f = sin(t * 7 + R1[i] * 50) > 0 ? 1 : -1; x += f * this.jit * .03 * R2[i]; }
      o.x = x; o.y = y; o.z = w * .9;
      o.c = clamp(1 - Math.abs(w) * 1.6 * (1 - this.allow));
      o.s = .85 + Math.abs(w) * 1.3; o.a = .9;
    },
    lines(b) {
      let n = 0; const L = Math.min(this.hn, 420), fade = 1 - this.allow * .8;
      if (fade < .05) return 0;
      for (let j = 1; j < L; j++) {
        const a = (this.hn - j) % 420, p = (this.hn - j - 1) % 420;
        if (j % 1 === 0) n = seg(b, n, this.hist[a * 2], this.hist[a * 2 + 1], .08, this.hist[p * 2], this.hist[p * 2 + 1], .08);
      }
      return n;
    }
  };

  /* 1. seven themes, one loop shape */
  const RING = [[0, 0], [1.45, .85], [1.45, -.85], [0, -1.7], [-1.45, -.85], [-1.45, .85], [0, 1.7]];
  const wob = (k, a) => 1 + .14 * sin(a * (k + 2) + k) * (k % 2 ? 1 : -1);
  const s1 = {
    view: { rx: 0, spin: 0 },
    lineCap: 7 * 120, lineOpacity: .5,
    pen: 0,
    frame(t, c, dt) { this.pen = ease(this.pen, hk("themes:") !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const t = this.t, k = i % 7, r0 = RING[k];
      if (R3[i] < .12) {
        const a = t * (.8 + k * .07) + G0[i] * .12, r = .58 * wob(k, a) + G1[i] * .02;
        o.x = r0[0] + cos(a) * r; o.y = r0[1] + sin(a) * r; o.z = .05; o.c = 0; o.s = 1.25 + this.pen * .5; return;
      }
      const a = R1[i] * TAU, r = .58 * wob(k, a) + G0[i] * .035;
      o.x = r0[0] + cos(a) * r; o.y = r0[1] + sin(a) * r; o.z = G1[i] * .03; o.c = .95; o.a = .85; o.s = .85;
    },
    lines(b) {
      let n = 0; const S = 120;
      for (let k = 0; k < 7; k++) {
        const r0 = RING[k];
        for (let j = 0; j < S; j++) {
          const a1 = j / S * TAU, a2 = (j + 1) / S * TAU, q1 = .58 * wob(k, a1), q2 = .58 * wob(k, a2);
          n = seg(b, n, r0[0] + cos(a1) * q1, r0[1] + sin(a1) * q1, 0, r0[0] + cos(a2) * q2, r0[1] + sin(a2) * q2, 0);
        }
      }
      return n;
    }
  };

  /* 2. the cycle: each lap deepens the groove */
  const s2 = {
    view: { rx: -.25, spin: 0 },
    lineCap: 20 * 140, lineOpacity: .42,
    laps: 7, wob: 0, spd: .55, hi: -1, w: 0, relief: 0,
    frame(t, c, dt) {
      const h = hk("cycle:");
      this.laps = ease(this.laps, h === "cost" ? 19 : 7, dt, 1.6);
      this.wob = ease(this.wob, h === "mind" ? 1 : 0, dt, 4);
      this.spd = ease(this.spd, h === "behavior" ? 1.6 : .55, dt, 3);
      const node = h !== null && /^\d$/.test(h) ? +h : -1;
      if (node >= 0) this.hi = node;
      this.w = ease(this.w, node >= 0 ? 1 : 0, dt, 5);
      this.ph = (this.ph || 0) + dt * this.spd * (c.calm ? .25 : 1);
      const penA = -PI / 2 + this.ph;
      this.penA = penA;
      const rel = (fr((penA + PI / 2) / TAU) * 5) % 5;
      this.relief = ease(this.relief, rel > 3.8 && rel < 4.6 ? 1 : 0, dt, 6);
      this.t = t;
    },
    ring(a, lap) { const r = 2.2 + lap * .045 + sin(a * 3 + lap * 1.7) * .02 * (1 + lap * .3) + this.wob * sin(a * 9 + lap) * .12; return [cos(a) * r, sin(a) * r * .86]; },
    at(i, o) {
      const t = this.t;
      if (R3[i] < .1) {
        const a = this.penA + G0[i] * .06, p = this.ring(a, 0);
        o.x = p[0] + G1[i] * .05; o.y = p[1] + G2[i] * .05; o.z = .06; o.c = 0; o.s = 1.4; return;
      }
      if (R3[i] < .36) {
        const k = Math.floor(R2[i] * 5), a = -PI / 2 + k * TAU / 5, p = this.ring(a, 0);
        o.x = p[0] + G0[i] * .09; o.y = p[1] + G1[i] * .09; o.z = G2[i] * .04; o.c = .95; o.s = 1.05;
        if (k === 4) o.c = lerp(.95, .55, this.relief);
        if (this.w > .02) { if (k === this.hi) { o.h = this.w * .85; o.s = 1.35; } else o.a = 1 - this.w * .5; }
        return;
      }
      const a = R0[i] * TAU, lap = Math.floor(R1[i] * this.laps), p = this.ring(a, lap);
      o.x = p[0] + G0[i] * .012; o.y = p[1] + G1[i] * .012; o.z = G2[i] * .02; o.c = .82; o.a = .6; o.s = .7;
    },
    lines(b) {
      let n = 0; const S = 140, L = Math.round(this.laps);
      for (let lap = 0; lap < L; lap++) for (let j = 0; j < S; j++) {
        const a1 = j / S * TAU, a2 = (j + 1) / S * TAU, p = this.ring(a1, lap), q = this.ring(a2, lap);
        n = seg(b, n, p[0], p[1], 0, q[0], q[1], 0);
      }
      return n;
    }
  };

  /* 3. a calm surface with loops running inside */
  const NL = 24;
  const s3 = {
    view: { rx: .2, spin: .1 },
    lineCap: NL * 40, lineOpacity: .45, lineColor: "#e5482e",
    spd: 1, out: 0, avoid: 0, snap: 0, maybe: 0,
    init() { this.cen = []; for (let k = 0; k < NL; k++) { const r = 1.35 * Math.cbrt(U.rng()), i = Math.floor(U.rng() * N); this.cen.push([FX[i] * r, FY[i] * r, FZ[i] * r, .18 + U.rng() * .28]); } },
    frame(t, c, dt) {
      const h = hk("signs:");
      this.spd = ease(this.spd, h === "0" ? 2.8 : 1, dt, 3); this.out = ease(this.out, h === "1" ? 1 : 0, dt, 3);
      this.avoid = ease(this.avoid, h === "2" ? 1 : 0, dt, 3); this.snap = ease(this.snap, h === "3" ? 1 : 0, dt, 3);
      this.maybe = ease(this.maybe, h === "4" ? 1 : 0, dt, 4);
      this.ph = (this.ph || 0) + dt * this.spd * (c.calm ? .25 : 1); this.t = t;
    },
    loopPos(k, a) { const c = this.cen[k]; return [c[0] + cos(a) * c[3], c[1] + sin(a) * c[3], c[2] + sin(a * 2) * c[3] * .3]; },
    at(i, o) {
      const t = this.t;
      if (R3[i] < .3) {
        const k = i % NL, a = R1[i] * TAU + this.ph * (2 + (k % 3)), p = this.loopPos(k, a);
        let x = p[0], y = p[1], z = p[2];
        if (this.out > .01) { const s = 1 + this.out * 1.3 * (.5 + .5 * sin(t * 1.6 + k)); x *= s; y *= s; z *= s; }
        if (this.snap > .01) { const q = .32, sx = Math.round(x / q) * q, sy = Math.round(y / q) * q; const m = this.snap * (.5 + .5 * sin(t * 2.2 + k * .7)); x = lerp(x, sx, m); y = lerp(y, sy, m); }
        if (this.maybe > .01) { const f = sin(t * 5 + R2[i] * 30) > 0 ? 1 : 0; x += this.maybe * f * .25 * (R0[i] - .5); y += this.maybe * (1 - f) * .25 * (R2[i] - .5); }
        o.x = x; o.y = y; o.z = z; o.c = .04; o.s = 1.05; return;
      }
      const r = 2.3 + G0[i] * .015;
      let x = FX[i] * r, y = FY[i] * r, z = FZ[i] * r;
      if (this.avoid > .01) {
        const ang = Math.atan2(y, x), d = Math.abs(((ang - .6 + PI) % TAU + TAU) % TAU - PI);
        if (d < .7) { const push = this.avoid * (1 - d / .7) * 1.4; const m = sqrt(x * x + y * y) || 1; x += x / m * push; y += y / m * push; o.a = 1 - this.avoid * .7; }
      }
      o.x = x; o.y = y; o.z = z; o.c = .96; o.s = .8;
    },
    lines(b) {
      let n = 0; const S = 40;
      for (let k = 0; k < NL; k++) for (let j = 0; j < S; j++) {
        const p = this.loopPos(k, j / S * TAU), q = this.loopPos(k, (j + 1) / S * TAU);
        n = seg(b, n, p[0], p[1], p[2], q[0], q[1], q[2]);
      }
      return n;
    }
  };

  /* 4. exposure without the ritual: the curve comes down on its own */
  const X0 = -3.3, X1 = 3.3, YB = -1.8;
  const peaks = [3.4, 2.6, 1.85, 1.15];
  const erpY = x => {
    const u = (x - X0) / (X1 - X0) * 4, k = Math.min(3, Math.floor(u)), f = u - k, p = peaks[k];
    const rise = smooth(0, .16, f), fall = exp(-Math.max(0, f - .16) * 3.4);
    return YB + p * rise * fall;
  };
  const ritY = x => {
    const u = (x - X0) / (X1 - X0) * 9, f = fr(u);
    return YB + 3.3 * (f < .78 ? smooth(0, .78, f) : 1 - smooth(.78, .84, f));
  };
  const s4 = {
    view: { rx: 0, spin: 0 },
    lineCap: 2 * 260 + 8, lineOpacity: .7,
    hi: -1, w: 0, fadeR: 0,
    frame(t, c, dt) {
      const h = hk("erp:"); const m = h === null ? -1 : +h;
      if (m >= 0) this.hi = m; this.w = ease(this.w, m >= 0 ? 1 : 0, dt, 5);
      this.fadeR = ease(this.fadeR, m === 1 ? 1 : 0, dt, 3);
      this.cur = X0 + fr(t * .06) * (X1 - X0); this.t = t;
    },
    at(i, o) {
      const t = this.t;
      if (R3[i] < .3) {
        const x = X0 + R0[i] * (X1 - X0), y = ritY(x);
        o.x = x; o.y = y + G0[i] * .03; o.z = -.3; o.c = .05; o.s = .9; o.a = (1 - this.fadeR * .88) * .85; return;
      }
      if (R3[i] < .36) { o.x = this.cur + G0[i] * .01; o.y = YB + R0[i] * 3.7; o.z = 0; o.c = .6; o.a = .35; o.s = .6; return; }
      const x = X0 + R0[i] * (X1 - X0), y = erpY(x);
      const below = R1[i] < .45;
      o.x = x; o.y = below ? lerp(YB, y, R2[i]) : y + G0[i] * .025; o.z = G1[i] * .03;
      o.c = .98; o.s = below ? .55 : 1.05; o.a = below ? .35 : 1;
      if (this.w > .02) {
        const u = (x - X0) / (X1 - X0) * 4, f = u - Math.floor(u);
        const on = this.hi === 0 ? f < .18 : this.hi === 1 ? true : this.hi === 2 ? f > .18 : below;
        if (on && (!below || this.hi === 3)) o.h = this.w * .8;
      }
    },
    lines(b) {
      let n = 0; const S = 260;
      for (let j = 0; j < S; j++) { const x1 = X0 + j / S * (X1 - X0), x2 = X0 + (j + 1) / S * (X1 - X0); n = seg(b, n, x1, erpY(x1), 0, x2, erpY(x2), 0); }
      n = seg(b, n, X0 - .1, YB, 0, X1 + .1, YB, 0);
      n = seg(b, n, X0 - .1, YB, 0, X0 - .1, YB + 3.7, 0);
      return n;
    }
  };

  /* 5. the stereotype (a tidy grid) against the reality (many forms) */
  const FORM = [[-2.2, 1.4], [-.1, 1.7], [2.1, 1.3], [-2.3, -.4], [0, -.1], [2.2, -.6], [-1.1, -1.9], [1.2, -1.9]];
  const form = (k, i) => {
    const u = R1[i], v = R2[i], g0 = G0[i], g1 = G1[i];
    switch (k) {
      case 0: return [g0 * .35, g1 * .35];
      case 1: { const a = u * TAU * 3, r = .1 + u * .5; return [cos(a) * r, sin(a) * r]; }
      case 2: { const a = u * TAU, r = .5; return [cos(a) * r + (v < .5 ? -.25 : .25), sin(a) * r * .9]; }
      case 3: return [(u - .5) * 1.2, (Math.floor(v * 5) - 2) * .12 + sin(u * 20) * .08];
      case 4: { const a = u * TAU; return [cos(a) * .55 * (v < .5 ? 1 : .3), sin(a) * .55 * (v < .5 ? 1 : .3)]; }
      case 5: { const s = v < .5 ? -1 : 1; return [s * (.2 + u * .45), g1 * .25]; }
      case 6: return [(u - .5) * 1.1 + (Math.floor(u * 8) % 2 ? .08 : -.08), (v - .5) * .1 + (Math.floor(u * 8) % 2 ? .25 : -.25)];
      default: { const a = u * TAU * 2; return [cos(a) * .45 + g0 * .02, sin(a * 1.5) * .35 + g1 * .02]; }
    }
  };
  const CELL = .42, COLS = 9, ROWS = 7;
  const s5 = {
    view: { rx: 0, spin: 0 },
    lineCap: COLS * ROWS * 4, lineOpacity: .6,
    neat: 0,
    frame(t, c, dt) { this.neat = ease(this.neat, hk("myth:") !== null ? 1 : 0, dt, 2.6); this.t = t; },
    at(i, o) {
      const k = i % 8, f = form(k, i), c = FORM[k];
      const rx = c[0] + f[0], ry = c[1] + f[1];
      const cell = i % (COLS * ROWS), cx = (cell % COLS - (COLS - 1) / 2) * CELL, cy = (Math.floor(cell / COLS) - (ROWS - 1) / 2) * CELL;
      const nx = cx + (R1[i] - .5) * CELL * .55, ny = cy + (R2[i] - .5) * CELL * .55;
      o.x = lerp(rx, nx, this.neat); o.y = lerp(ry, ny, this.neat); o.z = G2[i] * .04 * (1 - this.neat);
      o.c = lerp(k % 3 === 0 ? .1 : .9, .97, this.neat); o.s = .95;
    },
    lines(b) {
      if (this.neat < .05) return 0;
      let n = 0; const h = CELL * .36, s = this.neat;
      for (let cell = 0; cell < COLS * ROWS; cell++) {
        const cx = (cell % COLS - (COLS - 1) / 2) * CELL, cy = (Math.floor(cell / COLS) - (ROWS - 1) / 2) * CELL, q = h * s;
        n = seg(b, n, cx - q, cy - q, 0, cx + q, cy - q, 0); n = seg(b, n, cx + q, cy - q, 0, cx + q, cy + q, 0);
        n = seg(b, n, cx + q, cy + q, 0, cx - q, cy + q, 0); n = seg(b, n, cx - q, cy + q, 0, cx - q, cy - q, 0);
      }
      return n;
    }
  };

  /* 6. the old loop, and a line that keeps going */
  const LP = 600;
  const path = u => {
    if (u < .18) { const a = u / .18 * TAU * 2.2, r = .55 - u * .6; return [-2.4 + cos(a) * r, .1 + sin(a) * r * .86]; }
    const v = (u - .18) / .82, x = -2.4 + .55 + v * 6.0;
    return [x, .1 + sin(v * 9) * .22 * (1 - v * .3) + sin(v * 23) * .05 + v * .5];
  };
  const s6 = {
    view: { rx: -.3, spin: 0 },
    lineCap: LP, lineOpacity: .8,
    frame(t) { this.t = t; this.tip = .18 + fr(t * .035) * .82; },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .993) { o.x = 1.2 + G0[i] * .05; o.y = 1.7 + G1[i] * .05; o.z = .05; o.c = 0; o.s = 1.1; return; }
      if (R3[i] < .32) {
        const u = R0[i] * this.tip, p = path(u);
        o.x = p[0] + G0[i] * .03; o.y = p[1] + G1[i] * .03; o.z = .02; o.c = u < .18 ? .5 : .98; o.s = u > this.tip - .01 ? 1.4 : 1;
        return;
      }
      const g = i % (GW * GH), gx = (g % GW - GW / 2 + .5) * SP * 1.05 + .5, gy = (Math.floor(g / GW) - GH / 2 + .5) * SP * 1.15;
      o.x = gx + sin(t * .3 + R1[i] * 20) * .01; o.y = gy; o.z = -.2; o.c = .85; o.a = .32; o.s = .65;
    },
    lines(b) {
      let n = 0;
      for (let j = 0; j < LP - 1; j++) {
        const u1 = j / LP * this.tip, u2 = (j + 1) / LP * this.tip, p = path(u1), q = path(u2);
        n = seg(b, n, p[0], p[1], .02, q[0], q[1], .02);
      }
      return n;
    }
  };

  return [s0, s1, s2, s3, s4, s5, s6];
}
