/* SAHNE 1 — NE KADAR OLASI? (0–10 s)  Nokta and a bag of balls.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut, outBack, outCubic, hump } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink, A = LI.Ang;
  const HOW = ['hiçbiri amber değil', '4 toptan 1’i amber', '4 toptan 2’si amber', '4 toptan 3’ü amber', '4 toptan 4’ü de amber'];

  function intro(ctx, env, t) {
    const L = KD.L(env), f = F(), i = seg(t, 3.4, 4.2) * (1 - seg(t, 9.6, 10.4)); if (i <= 0) return;
    f.bag(ctx, L.B.x, L.B.y, L.B.s, 2, i, seg(t, 3.4, 4.4), (k) => seg(t, 4.4 + k * 0.2, 4.8 + k * 0.2));
    f.T(ctx, 'Ne kadar olası?', L.Q.x, L.Q.y[1], Object.assign({ size: env.V ? 70 : 84, alpha: i, p: seg(t, 5.4, 6.8) }, f.AMB));
  }

  /** the question that stays on screen while the bags come */
  function question(ctx, env, t) {
    const L = KD.L(env), f = F(), a = seg(t, 10.6, 11.2) * (1 - seg(t, 61.4, 62.0)); if (a <= 0) return;
    const y = env.V ? -710 : -420;
    f.T(ctx, 'Bakmadan bir top çek: amber gelir mi?', env.V ? 0 : L.Q.x - 80, y, { size: env.V ? 44 : 54, alpha: a, p: seg(t, 10.6, 12.0), halo: true });
  }

  /** the probability line with its end labels, pins and daily events */
  function spectrum(ctx, env, t) {
    const L = KD.L(env), S = L.SP, f = F(), a = seg(t, 10.8, 11.4) * (1 - seg(t, 90.4, 91.4)); if (a <= 0) return;
    Ink.path(ctx, [[S.x0 - 20, S.y], [S.x1 + 20, S.y]], { w: 7, p: seg(t, 10.8, 12.2), alpha: a, seed: 300, taper: [0.05, 0.05] });
    // amber gradient stripe: from impossible to certain
    const gs = seg(t, 12.0, 13.0) * a;
    if (gs > 0) { const g = ctx.createLinearGradient(S.x0, 0, S.x1, 0); g.addColorStop(0, `rgba(${LI.AMBER_RGB},0)`); g.addColorStop(1, `rgba(${LI.AMBER_RGB},${0.55 * gs})`); ctx.fillStyle = g; ctx.fillRect(S.x0, S.y - 9, S.x1 - S.x0, 18); }
    // end ticks are always there; the rest appear with their bag
    const shown = (n) => (n === 0 || n === 4) ? seg(t, 12.2, 12.8) : 0;
    [0, 1, 2, 3, 4].forEach((n) => {
      const b = f.BAGS.find((x) => x.n === n), T = f.bagT(b), land = seg(t, T.fly + 0.9, T.fly + 1.3);
      const k = Math.max(shown(n) * (n === 4 ? 1 : 1), land) * a, x = f.px(L, n / 4);
      if (k <= 0) return;
      Ink.path(ctx, [[x, S.y - 18], [x, S.y + 18]], { w: 5, alpha: k, seed: 310 + n, taper: [0, 0] });
      f.T(ctx, f.NUM[n], x, S.numY, { size: S.ns, alpha: k });
      const wa = (n === 0 || n === 4) ? Math.max(seg(t, 12.6, 13.2) * 0.9, land) : land;
      f.T(ctx, f.SHORT[n], x, S.wordY, Object.assign({ size: S.ws, alpha: wa * a }, land > 0 ? f.AMB : {}));
    });
  }

  /** each bag: appears big, gets explained, then flies down onto the line */
  function bags(ctx, env, t) {
    const L = KD.L(env), S = L.SP, f = F();
    const fadeMini = 1 - seg(t, 61.8, 62.6) * 0.8;
    f.BAGS.forEach((b) => {
      const T = f.bagT(b); if (t < b.t0) return;
      const fly = inOut(seg(t, T.fly, T.fly + 1.2));
      const x = lerp(L.B.x, f.px(L, b.n / 4), fly), y = lerp(L.B.y, S.bagY, fly) - 120 * Math.sin(Math.PI * fly);
      const sc = lerp(L.B.s, L.B.m, fly), a = seg(t, b.t0, b.t0 + 0.5) * (fly >= 1 ? fadeMini : 1) * (1 - seg(t, 90.4, 91.4));
      f.bag(ctx, x, y, sc, b.n, a, seg(t, b.t0, b.t0 + 0.9), (k) => seg(t, b.t0 + 0.8 + k * 0.18, b.t0 + 1.2 + k * 0.18));
      // explanation lines
      const la = 1 - seg(t, T.end - 0.5, T.end);
      if (la > 0) {
        const Q = L.Q, sz = Q.size;
        if (t > T.l0) f.T(ctx, HOW[b.n], Q.x, Q.y[0], { size: sz, alpha: la, p: seg(t, T.l0, T.l0 + 1.0), halo: true });
        if (t > T.l1) f.T(ctx, f.FRAC[b.n], Q.x, Q.y[1], { size: sz, alpha: la, p: seg(t, T.l1, T.l1 + 1.0), halo: true });
        if (t > T.l2) f.T(ctx, f.WORD[b.n], Q.x, Q.y[2], Object.assign({ size: sz + 10, alpha: la * outBack(seg(t, T.l2, T.l2 + 0.5)), halo: true }, f.AMB));
      }
    });
  }

  /** everyday events land on the line too (62.6–78 s) */
  function daily(ctx, env, t) {
    const L = KD.L(env), S = L.SP, f = F(); if (t < 62.6) return;
    const out = 1 - seg(t, 77.4, 78.0);
    f.DAILY.forEach((d, k) => {
      const a = seg(t, d.t0, d.t0 + 0.5); if (a <= 0) return;
      const fly = inOut(seg(t, d.t0 + 2.2, d.t0 + 3.4));
      const tx = f.px(L, d.v), ty = S.bagY - 10 - (env.V ? 30 + k * 58 : 0);
      const align = d.v === 0 ? 'left' : d.v === 1 ? 'right' : 'center';
      const x1 = d.v === 0 ? tx - 40 : d.v === 1 ? tx + 40 : tx;
      const x0 = env.V ? 0 : L.Q.x, y0 = S.chipY[1];
      const x = lerp(x0, x1, fly), y = lerp(y0, ty, fly) - 80 * Math.sin(Math.PI * fly);
      const al = fly < 0.5 ? 'center' : align;
      f.T(ctx, d.s, x, y, Object.assign({ size: lerp(S.cs + 8, S.cs, fly), alpha: a * (fly >= 1 ? out * 0.95 + 0.05 * 0 : 1), halo: true, align: al }, fly >= 1 ? f.AMB : {}));
      if (fly > 0 && fly < 1) Ink.dot(ctx, lerp(x0, tx, fly), lerp(y0, S.y, fly), 6, { color: LI.AMBER_RGB, bleed: 0, seed: 400 + k });
      if (fly >= 1) Ink.dot(ctx, tx, S.y, 11 * outBack(seg(t, d.t0 + 3.4, d.t0 + 3.8)), { color: LI.AMBER_RGB, bleed: 0.3, seed: 410 + k });
    });
  }

  /** the rule to remember (78–92 s) */
  function rule(ctx, env, t) {
    const L = KD.L(env), R = L.ST, f = F(); if (t < 78.2) return;
    const lines = env.V ? [['Olasılık', 0], ['0 ile 1 arasındadır', 0], ['0 ve 1 de dâhil', 1]] : [['Her olayın olasılığı', 0], ['0 ile 1 arasındadır', 0], ['0 ve 1 de dâhil', 1]];
    lines.forEach(([s, amb], k) => f.T(ctx, s, R.x, R.y[k], Object.assign({ size: R.s[k], p: seg(t, 78.4 + k * 1.3, 79.8 + k * 1.3), halo: true }, amb ? f.AMB : {})));
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { intro(ctx, env, t); question(ctx, env, t); spectrum(ctx, env, t); bags(ctx, env, t); daily(ctx, env, t); rule(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'How likely?', nameTr: 'Ne kadar olası?', concept: 'A bag of four balls', conceptTr: 'Dört toplu bir torba', render });
})(window.LI = window.LI || {});
