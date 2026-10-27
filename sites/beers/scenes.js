(U) => {
  const { N, R0, R1, R2, R3, G0, G1, G2, FX, FY, FZ, TAU, clamp, lerp, smooth, ctx } = U;
  const sin = Math.sin, cos = Math.cos, PI = Math.PI, sqrt = Math.sqrt;
  const hk = pfx => (ctx.hotAmt > .04 && ctx.hotKey.startsWith(pfx)) ? ctx.hotKey.slice(pfx.length) : null;
  const ease = (cur, tgt, dt, rate = 4) => cur + (tgt - cur) * (1 - Math.exp(-dt * rate));
  const fr = x => x - Math.floor(x);
  const seg = (b, n, x1, y1, z1, x2, y2, z2) => { const o = n * 6; b[o] = x1; b[o + 1] = y1; b[o + 2] = z1; b[o + 3] = x2; b[o + 4] = y2; b[o + 5] = z2; return n + 1; };
  const circle = (b, n, cx, cy, r, S) => { for (let j = 0; j < S; j++) { const a1 = j / S * TAU, a2 = (j + 1) / S * TAU; n = seg(b, n, cx + cos(a1) * r, cy + sin(a1) * r, 0, cx + cos(a2) * r, cy + sin(a2) * r, 0); } return n; };
  const disk = i => { const r = sqrt(R1[i]), a = R2[i] * TAU; return [cos(a) * r, sin(a) * r]; };

  /* 0. scattered points gathering into one mind */
  const s0 = {
    view: { rx: .12, spin: .06 },
    lineCap: 96, lineOpacity: .3,
    frame(t) { this.t = t; this.g = .78 + .22 * smooth(0, 1, .5 + .5 * sin(t * .35)); },
    at(i, o) {
      const lost = R3[i] > .965, r = 2.35;
      const sx = FX[i] * r, sy = FY[i] * r, sz = FZ[i] * r;
      const wx = FX[i] * 4.6 + G0[i] * .8, wy = FY[i] * 3.6 + G1[i] * .8, wz = FZ[i] * 3 + G2[i] * .8;
      const g = lost ? .15 : this.g;
      o.x = lerp(wx, sx, g); o.y = lerp(wy, sy, g); o.z = lerp(wz, sz, g);
      o.c = lost ? .05 : .95; o.s = lost ? 1.2 : .9;
    },
    lines(b) { return circle(b, 0, 0, 0, 2.38, 96); }
  };

  /* 1. a civil war inside a circle: ordered Reason against turbulent Unreason */
  const s1 = {
    view: { rx: 0, spin: 0 },
    lineCap: 96 + 64, lineOpacity: .5,
    bias: 0,
    frame(t, c, dt) {
      const h = hk("war:");
      this.bias = ease(this.bias, h === "unreason" ? -1.5 : h === "reason" ? 1.7 : 0, dt, 2);
      this.t = t;
    },
    front(y) { return .35 * sin(this.t * .55) + .5 * sin(y * 1.6 + this.t * .9) * .5 - this.bias; },
    at(i, o) {
      const d = disk(i), R = 2.6, x0 = d[0] * R, y0 = d[1] * R * .92;
      const reason = x0 > this.front(y0);
      if (reason) {
        const q = .17, gx = Math.round(x0 / q) * q, gy = Math.round(y0 / q) * q;
        o.x = gx + G0[i] * .012; o.y = gy + G1[i] * .012; o.z = G2[i] * .02; o.c = .97; o.s = .95;
      } else {
        const t = this.t;
        o.x = x0 + sin(t * 2.1 + R0[i] * 30 + y0) * .16; o.y = y0 + cos(t * 1.8 + R3[i] * 30 + x0) * .16; o.z = G2[i] * .3;
        o.c = .03; o.s = 1;
      }
    },
    lines(b) {
      let n = circle(b, 0, 0, 0, 2.66, 96);
      for (let j = 0; j < 64; j++) { const y1 = -2.4 + j / 64 * 4.8, y2 = -2.4 + (j + 1) / 64 * 4.8; n = seg(b, n, this.front(y1), y1, 0, this.front(y2), y2, 0); }
      return n;
    }
  };

  /* 2. one story, told outward to thousands */
  const s2 = {
    view: { rx: .1, spin: 0 },
    lineCap: 48, lineOpacity: .25,
    frame(t) { this.t = t; },
    at(i, o) {
      const t = this.t;
      if (R3[i] < .08) { o.x = G0[i] * .12; o.y = G1[i] * .12; o.z = G2[i] * .12; o.c = .97; o.s = 1.2; return; }
      const ray = Math.floor(R0[i] * 48), a = ray / 48 * TAU + G0[i] * .02, d = fr(R1[i] + t * .08), r = .2 + d * 4.4;
      o.x = cos(a) * r; o.y = sin(a) * r * .8; o.z = G1[i] * .1;
      o.c = .9; o.a = 1 - d * .75; o.s = 1 - d * .4;
    },
    lines(b) { let n = 0; for (let k = 0; k < 48; k++) { const a = k / 48 * TAU; n = seg(b, n, cos(a) * .25, sin(a) * .2, 0, cos(a) * 4.6, sin(a) * 3.7, 0); } return n; }
  };

  /* 3. eighty groups, one of them affected: 1 in 80 */
  const COLS = 10, ROWS = 8, SPX = .62, SPY = .62, HIT = 33;
  const cell = k => [(k % COLS - (COLS - 1) / 2) * SPX, ((ROWS - 1) / 2 - Math.floor(k / COLS)) * SPY];
  const s3 = {
    view: { rx: 0, spin: 0 },
    hi: -1, w: 0,
    frame(t, c, dt) { const h = hk("scale:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const k = i % 80, c = cell(k);
      if (k === HIT) {
        const sub = Math.floor(R0[i] * 6), a = (sub - 1) / 5 * TAU;
        const cx = sub === 0 ? 0 : cos(a) * .19, cy = sub === 0 ? 0 : sin(a) * .19;
        o.x = c[0] + cx + G0[i] * .04; o.y = c[1] + cy + G1[i] * .04; o.z = .05; o.c = .03; o.s = 1.1;
        if (this.w > .02) {
          const on = this.hi === 2 || (this.hi === 0 && sub === 0) || (this.hi === 1 && sub > 0);
          if (on) { o.h = this.w * .9; o.s = 1.4; } else if (this.hi !== 3) o.a = 1 - this.w * .5;
        }
        return;
      }
      const d = disk(i);
      o.x = c[0] + d[0] * .2; o.y = c[1] + d[1] * .2; o.z = G2[i] * .03; o.c = .9; o.s = .8;
      if (this.w > .02) {
        if (this.hi === 3) { o.a = .55 + .45 * (.5 + .5 * sin(this.t * 2 + k)); }
        else o.a = 1 - this.w * .55;
      }
    }
  };

  /* 4. five diseases at five stages: conquered, doomed, confined, partly controlled, unknown */
  const DC = [[-2.5, 1.35], [0, 1.35], [2.5, 1.35], [-1.3, -1.35], [1.5, -1.35]];
  const s4 = {
    view: { rx: 0, spin: 0 },
    lineCap: 4 + 64, lineOpacity: .5,
    hi: -1, w: 0,
    frame(t, c, dt) { const h = hk("dis:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const k = i % 5, c = DC[k], d = disk(i), t = this.t;
      let x, y, a = 1, col = .95, s = .85;
      if (k === 0) { x = d[0] * .08; y = d[1] * .08; s = .9; }
      else if (k === 1) { const sc = .3 + .25 * (.5 + .5 * sin(t * .8)); x = d[0] * sc; y = d[1] * sc; a = .85; }
      else if (k === 2) { x = (R1[i] - .5) * 1.1; y = (R2[i] - .5) * 1.1; x += sin(t + R0[i] * 20) * .04; }
      else if (k === 3) { if (R3[i] < .5) { const q = .14; x = Math.round(d[0] * .75 / q) * q; y = Math.round(d[1] * .75 / q) * q; } else { x = d[0] * .85 + sin(t * 1.4 + R0[i] * 40) * .1; y = d[1] * .85 + cos(t * 1.2 + R3[i] * 40) * .1; } }
      else { x = d[0] * 1.15 + sin(t * 1.6 + R0[i] * 40) * .18; y = d[1] * 1.0 + cos(t * 1.3 + R3[i] * 40) * .18; col = .03; s = 1; }
      o.x = c[0] + x; o.y = c[1] + y; o.z = G2[i] * .05; o.c = col; o.a = a; o.s = s;
      if (this.w > .02) { if (k === this.hi) { o.h = this.w * .8; o.s = s * 1.3; } else o.a = a * (1 - this.w * .55); }
    },
    lines(b) {
      let n = 0; const c = DC[2], h = .62;
      n = seg(b, n, c[0] - h, c[1] - h, 0, c[0] + h, c[1] - h, 0); n = seg(b, n, c[0] + h, c[1] - h, 0, c[0] + h, c[1] + h, 0);
      n = seg(b, n, c[0] + h, c[1] + h, 0, c[0] - h, c[1] + h, 0); n = seg(b, n, c[0] - h, c[1] + h, 0, c[0] - h, c[1] - h, 0);
      return circle(b, n, DC[0][0], DC[0][1], .34, 64);
    }
  };

  /* 5. three aims: the dark dissolving, a society forming, model institutions */
  const AC = [[-2.05, 0], [.35, 0], [2.65, 0]];
  const NODES = Array.from({ length: 9 }, (_, k) => k === 0 ? [0, 0] : [cos(k / 8 * TAU) * 1.0, sin(k / 8 * TAU) * 1.0]);
  const s5 = {
    view: { rx: 0, spin: 0 },
    lineCap: 8 + 16, lineOpacity: .45,
    hi: -1, w: 0,
    frame(t, c, dt) { const h = hk("aim:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 4); this.t = t; this.lit = .5 + .5 * sin(t * .5); },
    at(i, o) {
      const k = i % 3, c = AC[k], t = this.t;
      let x, y, col = .95;
      if (k === 0) {
        const lit = this.hi === 0 ? this.w : this.lit * .7;
        const a = R1[i] * TAU, spike = 1 + .55 * Math.pow(Math.abs(sin(a * 5 + R0[i])), 6);
        const rr = (.4 + .6 * sqrt(R2[i])) * lerp(spike, 1, lit);
        x = cos(a) * rr; y = sin(a) * rr; col = lerp(.03, .95, lit);
      } else if (k === 1) {
        const nd = Math.floor(R0[i] * 9), p = NODES[nd];
        if (R3[i] < .3 && nd > 0) { const u = R2[i]; x = lerp(0, p[0], u); y = lerp(0, p[1], u); col = .6; }
        else { x = p[0] + G0[i] * .07; y = p[1] + G1[i] * .07; }
      } else {
        const gx = Math.floor(R1[i] * 5), gy = Math.floor(R2[i] * 5);
        x = (gx - 2) * .38 + (R0[i] - .5) * .2; y = (gy - 2) * .38 + (R3[i] - .5) * .2;
      }
      o.x = c[0] + x; o.y = c[1] + y; o.z = G2[i] * .04; o.c = col; o.s = .85;
      if (this.w > .02) { if (k === this.hi) { o.s = 1.15; o.h = this.w * .25; } else o.a = 1 - this.w * .6; }
    },
    lines(b) {
      let n = 0; const c = AC[1];
      for (let k = 1; k < 9; k++) { const p = NODES[k], q = NODES[k % 8 + 1]; n = seg(b, n, c[0] + p[0], c[1] + p[1], 0, c[0] + q[0], c[1] + q[1], 0); }
      const g = AC[2];
      for (let j = 0; j <= 5; j++) { const v = (j - 2.5) * .38; n = seg(b, n, g[0] - .95, g[1] + v, 0, g[0] + .95, g[1] + v, 0); n = seg(b, n, g[0] + v, g[1] - .95, 0, g[0] + v, g[1] + .95, 0); }
      return n;
    }
  };

  /* 6. a book, a state society, a national movement branching into the states */
  const T0 = [-2.9, 0], T1 = [-1.1, 0], T2 = [.7, 0];
  const STATES = Array.from({ length: 24 }, (_, k) => { const a = (k / 23 - .5) * PI * .9; return [T2[0] + cos(a) * 2.5, sin(a) * 2.5]; });
  const s6 = {
    view: { rx: 0, spin: 0 },
    lineCap: 2 + 24, lineOpacity: .4,
    hi: -1, w: 0,
    frame(t, c, dt) { const h = hk("after:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const r = R3[i];
      let x, y, grp;
      if (r < .14) { x = T0[0] + G0[i] * .12; y = T0[1] + G1[i] * .16; grp = 0; }
      else if (r < .28) { x = T1[0] + G0[i] * .12; y = T1[1] + G1[i] * .12; grp = 1; }
      else if (r < .42) { x = T2[0] + G0[i] * .14; y = T2[1] + G1[i] * .14; grp = 2; }
      else { const s = STATES[Math.floor(R0[i] * 24)], settled = R2[i] < .55, g = settled ? 1 : fr(this.t * .12 + R1[i]); x = lerp(T2[0], s[0], g) + G0[i] * (settled ? .07 : .02); y = lerp(T2[1], s[1], g) + G1[i] * (settled ? .07 : .02); grp = 2; o.a = settled ? .9 : .5; o.s = settled ? .9 : .6; }
      o.x = x; o.y = y; o.z = G2[i] * .04; o.c = grp === 0 ? .03 : .95; if (r < .42) o.s = .9;
      if (this.w > .02) { if (grp === this.hi) { o.h = this.w * .8; o.s = 1.2; } else o.a = (o.a || 1) * (1 - this.w * .55); }
    },
    lines(b) {
      let n = seg(b, 0, T0[0], T0[1], 0, T1[0], T1[1], 0); n = seg(b, n, T1[0], T1[1], 0, T2[0], T2[1], 0);
      for (const s of STATES) n = seg(b, n, T2[0], T2[1], 0, s[0], s[1], 0);
      return n;
    }
  };

  return [s0, s1, s2, s3, s4, s5, s6];
}
