(U) => {
  const { N, R0, R1, R2, R3, G0, G1, G2, FX, FY, FZ, TAU, clamp, lerp, smooth, ctx, rng } = U;
  const sin = Math.sin, cos = Math.cos, PI = Math.PI;
  const hk = pfx => (ctx.hotAmt > .04 && ctx.hotKey.startsWith(pfx)) ? ctx.hotKey.slice(pfx.length) : null;
  const ease = (cur, tgt, dt, rate = 4) => cur + (tgt - cur) * (1 - Math.exp(-dt * rate));
  const fr = x => x - Math.floor(x);
  const seg = (b, n, x1, y1, z1, x2, y2, z2) => { const o = n * 6; b[o] = x1; b[o + 1] = y1; b[o + 2] = z1; b[o + 3] = x2; b[o + 4] = y2; b[o + 5] = z2; return n + 1; };
  const circle = (b, n, cx, cy, r, S, ry = 1) => { for (let j = 0; j < S; j++) { const a1 = j / S * TAU, a2 = (j + 1) / S * TAU; n = seg(b, n, cx + cos(a1) * r, cy + sin(a1) * r * ry, 0, cx + cos(a2) * r, cy + sin(a2) * r * ry, 0); } return n; };

  /* 0. five parts of a life */
  const CL = [[-2.3, 1.5, .1], [1.7, 2.1, .3], [-.1, -.2, .5], [2.5, -1.1, .62], [-1.7, -2.1, .96]];
  const s0 = {
    name: "Five parts of a life",
    caption: "Thoughts, feelings, control, identity, and recovery: five parts of one life, held together. Nothing here is a body.",
    view: { rx: .1, spin: .05 },
    lineCap: 5 + 5 * 56, lineOpacity: .4,
    hi: -1, w: 0,
    lines(b) {
      let n = 0;
      for (let k = 0; k < 5; k++) { const a = CL[k], c = CL[(k + 1) % 5]; n = seg(b, n, a[0], a[1], 0, c[0], c[1], 0); }
      for (let k = 0; k < 5; k++) n = circle(b, n, CL[k][0], CL[k][1], .92 * (1 + .05 * sin(this.t * .6 + k)), 56);
      return n;
    },
    frame(t, c, dt) { const h = hk("home:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .84) {
        const k = Math.floor(R1[i] * 5), a = CL[k], b = CL[(k + 1) % 5], u = fr(R2[i] + t * .03 * (1 + R0[i]));
        o.x = lerp(a[0], b[0], u) + G0[i] * .04; o.y = lerp(a[1], b[1], u) + G1[i] * .04; o.z = G2[i] * .05; o.c = .5; o.a = .42; o.s = .7; return;
      }
      const k = Math.floor(R0[i] * 5), cl = CL[k], r = .85 * Math.cbrt(R1[i]);
      const br = 1 + .05 * sin(t * .6 + k);
      o.x = cl[0] + FX[i] * r * br + sin(t * .5 + R2[i] * 40) * .03; o.y = cl[1] + FY[i] * r * br; o.z = FZ[i] * r * br;
      o.c = cl[2];
      if (this.w > .02) { if (k === this.hi) { o.h = this.w * .5; o.s = 1.15; } else o.a = 1 - this.w * .55; }
    }
  };

  /* 1. eight different forms, equal weight */
  const SP = [[-2.6, 1.55], [-.9, 1.55], [.9, 1.55], [2.6, 1.55], [-2.6, -1.55], [-.9, -1.55], [.9, -1.55], [2.6, -1.55]];
  const shape = (k, u, v, g0, g1, t) => {
    switch (k) {
      case 0: { const a = u * TAU + t * .15; return [cos(a) * .72 + g0 * .02, sin(a) * .72 + g1 * .02]; }
      case 1: { const r = .72 * Math.sqrt(u), a = v * TAU; return [cos(a) * r, sin(a) * r]; }
      case 2: { const e = Math.floor(u * 3), f = fr(u * 3), A = [90, 210, 330].map(d => (d + t * 4) * PI / 180); const a = A[e], b = A[(e + 1) % 3]; return [lerp(cos(a), cos(b), f) * .8 + g0 * .02, lerp(sin(a), sin(b), f) * .8 + g1 * .02]; }
      case 3: return [(u - .5) * 1.6, (v - .5) * .3];
      case 4: return [g0 * .38, g1 * .38];
      case 5: { const th = u * 3.3 * PI, r = .06 + th * .075, a = th + t * .2; return [cos(a) * r, sin(a) * r]; }
      case 6: { const a = (u - .5) * TAU * .68 + PI, r = .75 + (v - .5) * .12; return [cos(a) * r + .2, sin(a) * r]; }
      default: { const i = Math.floor(u * 5), j = Math.floor(v * 5); return [(i - 2) * .34 + g0 * .02, (j - 2) * .34 + g1 * .02]; }
    }
  };
  const s1 = {
    name: "Not one single picture",
    caption: "Eight different forms. Every one is drawn with the same number of points and the same brightness: same seriousness.",
    view: { rx: 0, spin: 0 },
    pulse: 0,
    frame(t, c, dt) { this.pulse = ease(this.pulse, hk("types:") !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const k = Math.floor(R0[i] * 8), uu = fr(R1[i] * 7.31 + k * .37), vv = R2[i];
      const p = shape(k, R1[i], vv, G0[i], G1[i], this.t), c = SP[k];
      o.x = c[0] + p[0]; o.y = c[1] + p[1]; o.z = G2[i] * .05; o.c = .5; o.a = .95; o.s = 1;
      o.h = this.pulse * .3 * (.5 + .5 * sin(this.t * 3));
    }
  };

  /* 2. the loop: distress, rules, behavior, relief, shame */
  const s2 = {
    name: "The loop",
    caption: "Five steps travelling one ring. Relief arrives, and so does shame, and the ring begins again.",
    view: { rx: .15, spin: 0 },
    lineCap: 3 * 120, lineOpacity: .45,
    spd: .35, open: 0, hi: -1, w: 0,
    lines(b) {
      let n = 0; const R = lerp(2.3, 2.9, this.open);
      for (let k = 0; k < 3; k++) n = circle(b, n, 0, 0, R + (k - 1) * lerp(.03, .16, this.open), 120, .85);
      return n;
    },
    frame(t, c, dt) {
      const h = hk("loop:");
      this.open = ease(this.open, h === "goal" ? 1 : 0, dt, 2.4);
      this.spd = ease(this.spd, h === "goal" ? .1 : .35, dt, 3);
      if (h !== null && h !== "goal") this.hi = +h;
      this.w = ease(this.w, (h !== null && h !== "goal") ? 1 : 0, dt, 5);
      this.ph = (this.ph || 0) + dt * this.spd * (c.calm ? .25 : 1); this.t = t;
    },
    at(i, o) {
      const open = this.open, R = lerp(2.3, 2.9, open);
      const node = R3[i] < .4 ? Math.floor(R2[i] * 5) : -1;
      let a;
      if (node >= 0) a = -PI / 2 + node * TAU / 5 + this.ph + G0[i] * .16;
      else a = R0[i] * TAU;
      const r = R + G1[i] * lerp(.05, .2, open) + (node >= 0 ? G2[i] * .1 : 0);
      o.x = cos(a) * r; o.y = sin(a) * r * .85; o.z = G2[i] * .08;
      o.c = lerp(node >= 0 ? .12 + node * .06 : .38, .92, open); o.a = node >= 0 ? 1 : .7; o.s = node >= 0 ? 1.1 : .85;
      if (node === 3) o.c = lerp(.7, .92, open);
      if (this.w > .02 && node >= 0) { if (node === this.hi) { o.h = this.w * .7; o.s = 1.4; } else o.a = 1 - this.w * .5; }
    }
  };

  /* 3. what is taking over */
  const s3 = {
    name: "What is taking over",
    caption: "The dense mass is the disorder. The scattered points are the rest of a life: school, work, friends, family. Watch the space narrow.",
    view: { rx: .1, spin: .06 },
    lineCap: 2 * 96, lineOpacity: .45,
    grow: .3,
    lines(b) { const g = this.grow; let n = circle(b, 0, 0, 0, .55 + 1.55 * g, 96); return circle(b, n, 0, 0, 3.0 * (1 - .28 * g), 96, .9); },
    frame(t, c, dt) { const h = hk("q:"); this.grow = ease(this.grow, h === null ? .3 : (+h + 1) / 4 * .95, dt, 2.4); this.t = t; },
    at(i, o) {
      const t = this.t, g = this.grow;
      if (R3[i] < .36) {
        const r = (.55 + 1.55 * g) * Math.cbrt(R0[i]);
        o.x = FX[i] * r + sin(t * 2 + R1[i] * 60) * .05; o.y = FY[i] * r; o.z = FZ[i] * r;
        o.c = .08 + R2[i] * .08; o.s = 1.05; o.a = 1; return;
      }
      const r = (3.0 + R0[i] * 1.6) * (1 - .28 * g);
      o.x = FX[i] * r + sin(t * .4 + R1[i] * 30) * .06; o.y = FY[i] * r * .9; o.z = FZ[i] * r;
      o.c = .62 + R2[i] * .3; o.a = 1 - .5 * g; o.s = 1 - .2 * g;
    }
  };

  /* 4. four strands, one rope */
  const s4 = {
    name: "Four strands, one rope",
    caption: "Therapy, medical care, nutrition support, and community, twisting into one rope that can carry weight.",
    view: { rx: 0, spin: 0 },
    lineCap: 4 * 160, lineOpacity: .5,
    hi: -1, w: 0,
    lines(b) {
      let n = 0; const t = this.t;
      for (let k = 0; k < 4; k++) for (let j = 0; j < 160; j++) {
        const y1 = -3.1 + j / 160 * 6.2, y2 = -3.1 + (j + 1) / 160 * 6.2, a1 = y1 * 1.15 + k * TAU / 4 + t * .22, a2 = y2 * 1.15 + k * TAU / 4 + t * .22;
        n = seg(b, n, cos(a1) * .85, y1, sin(a1) * .85, cos(a2) * .85, y2, sin(a2) * .85);
      }
      return n;
    },
    frame(t, c, dt) { const h = hk("path:"); if (h !== null) this.hi = +h; this.w = ease(this.w, h !== null ? 1 : 0, dt, 5); this.t = t; },
    at(i, o) {
      const t = this.t;
      if (R3[i] > .92) { o.x = G0[i] * .12; o.y = (R1[i] - .5) * 6.2; o.z = G1[i] * .12; o.c = .95; o.a = .6; o.s = .8; return; }
      const k = Math.floor(R0[i] * 4), y = (R1[i] - .5) * 6.2;
      const a = y * 1.15 + k * TAU / 4 + t * .22, r = .85 + G0[i] * .04;
      o.x = cos(a) * r; o.y = y; o.z = sin(a) * r;
      o.c = .25 + k * .22; o.s = 1;
      if (this.w > .02) { if (k === this.hi) { o.h = this.w * .55; o.s = 1.2; } else o.a = 1 - this.w * .5; }
    }
  };

  /* 5. a loop that opens into a larger spiral */
  const s5 = {
    name: "A life larger than the disorder",
    caption: "The tight loop opens into a widening spiral. Progress is uneven, so the line wavers, but it keeps growing outward.",
    view: { rx: .18, spin: .04 },
    lineCap: 3 * 300, lineOpacity: .45,
    frame(t) { this.t = t; },
    lines(b) {
      let n = 0; const t = this.t, M = 7 * PI;
      for (let arm = 0; arm < 3; arm++) for (let j = 0; j < 300; j++) {
        const P = th => { const r = .28 + th * .19 + sin(th * 1.3 + t * .4) * .13, a = th + arm * TAU / 3 + t * .1; return [cos(a) * r, sin(a) * r * .88, sin(th * .5) * .2]; };
        const p = P(j / 300 * M), q = P((j + 1) / 300 * M);
        n = seg(b, n, p[0], p[1], p[2], q[0], q[1], q[2]);
      }
      return n;
    },
    at(i, o) {
      const t = this.t, arm = Math.floor(R2[i] * 3), th = R1[i] * 7 * PI;
      const r = .28 + th * .19 + sin(th * 1.3 + t * .4) * .13 + G0[i] * .05;
      const a = th + arm * TAU / 3 + t * .1;
      o.x = cos(a) * r; o.y = sin(a) * r * .88; o.z = G1[i] * .1 + sin(th * .5) * .2;
      o.c = clamp(.1 + .9 * (th / (7 * PI)) + G2[i] * .02); o.s = .9 + (th / (7 * PI)) * .35;
    }
  };

  return [s0, s1, s2, s3, s4, s5];
}
