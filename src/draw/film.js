/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   Five bags of four balls (0 to 4 amber). The event is always the same:
   draw one ball without looking and get amber. Each bag lands on the
   probability line from 0 (impossible) to 1 (certain).
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  /** the bags: n amber balls out of 4; t0 = when the bag appears; st = step between lines */
  const BAGS = [
    { n: 4, t0: 11.0, st: 1.9 },
    { n: 0, t0: 19.4, st: 1.7 },
    { n: 2, t0: 27.2, st: 3.4 },
    { n: 1, t0: 44.6, st: 1.9 },
    { n: 3, t0: 53.2, st: 1.9 },
  ];
  const WORD = ['imkânsız', 'düşük olasılık', 'yarı yarıya', 'yüksek olasılık', 'kesin'];
  const SHORT = ['imkânsız', 'düşük', 'yarı yarıya', 'yüksek', 'kesin'];
  const NUM = ['0', '1/4', '1/2', '3/4', '1'];
  const FRAC = ['4’te 0 = 0', '4’te 1 = 1/4', '4’te 2 = 2/4 = 1/2', '4’te 3 = 3/4', '4’te 4 = 1'];
  /** timeline of a bag: lines at t0+1.8, +st, +2st; flies to the line after the verdict */
  const bagT = (b) => { const l0 = b.t0 + 1.8; return { l0, l1: l0 + b.st, l2: l0 + 2 * b.st, fly: l0 + 2 * b.st + 1.4, end: l0 + 2 * b.st + 2.6 }; };
  const DAILY = [
    { s: 'zar atınca 7 gelmesi', v: 0, t0: 63.0 },
    { s: 'yazı turada tura gelmesi', v: 0.5, t0: 67.4 },
    { s: 'yarın güneşin doğması', v: 1, t0: 71.8 },
  ];
  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };

  /** x position of probability v on the line */
  const px = (L, v) => lerp(L.SP.x0, L.SP.x1, v);

  /** a sack at (x, y) with scale s holding 4 balls (n amber); k: 0..1 appear; balls(i) → 0..1 */
  function bag(ctx, x, y, s, n, a, k, balls) {
    if (a <= 0 || k <= 0) return;
    const w = 150 * s, h = 150 * s, top = y - h * 0.55;
    const P = [[x - w * 0.34, top], [x - w * 0.52, y + h * 0.05], [x - w * 0.46, y + h * 0.42], [x, y + h * 0.5], [x + w * 0.46, y + h * 0.42], [x + w * 0.52, y + h * 0.05], [x + w * 0.34, top]];
    ctx.fillStyle = `rgba(${LI.PAPER_RGB},${0.9 * a})`;
    ctx.beginPath(); P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill();
    Ink.path(ctx, P, { w: 6 * Math.max(0.5, s), p: k, alpha: a, seed: 210, taper: [0.2, 0.2], wob: 0.15 });
    Ink.path(ctx, [[x - w * 0.36, top - 4], [x + w * 0.36, top - 4]], { w: 5 * Math.max(0.5, s), p: k, alpha: a, seed: 211, taper: [0.1, 0.1] });
    const r = 22 * s;
    [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(([dx, dy], i) => {
      const g = balls ? balls(i) : 1; if (g <= 0) return;
      const cx = x + dx * r * 2.3, cy = y + h * 0.12 + dy * r * 2.3, rr = r * outBack(clamp(g));
      ctx.fillStyle = i < n ? `rgba(${LI.AMBER_RGB},${0.95 * a})` : `rgba(${LI.INK_RGB},${0.85 * a})`;
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.8 * a})`; ctx.lineWidth = 2.5 * Math.max(0.5, s); ctx.stroke();
    });
  }

  /** a hand-drawn check mark at (x, y) */
  function tick(ctx, x, y, p, a = 1) {
    if (p <= 0 || a <= 0) return;
    Ink.path(ctx, [[x, y], [x + 12, y + 14], [x + 38, y - 20]], { w: 7, p, alpha: a, color: LI.AMBER_RGB, seed: 401, taper: [0.05, 0.3] });
  }
  /** text width in the brush font */
  function width(ctx, s, size) { ctx.save(); ctx.font = `${size}px "LI Brush", "Comic Sans MS", cursive`; const w = ctx.measureText(s).width; ctx.restore(); return w; }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [L.B.x, L.B.y]);
    if (t > 60 && t < 78) KD.look(p, [L.SP.x1 - 200, L.SP.chipY[1]]);
    if (t > 78) KD.look(p, [L.ST.x, L.ST.y[0]]);
    BAGS.forEach((b) => { const T = bagT(b); if (t > T.fly - 0.2 && t < T.fly + 1.4) KD.look(p, [lerp(L.SP.x0, L.SP.x1, b.n / 4), L.SP.y]); });
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    BAGS.forEach((b) => { const T = bagT(b); pointing(T.fly - 0.2, T.fly + 1.2); });
    DAILY.forEach((d) => pointing(d.t0 + 2.2, d.t0 + 3.6));
    const think = seg(t, 12.6, 13.0) * (1 - seg(t, 14.4, 14.7)) + seg(t, 28.8, 29.2) * (1 - seg(t, 31.4, 31.7)) + seg(t, 63.6, 64.0) * (1 - seg(t, 65.0, 65.3));
    if (think > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.5 * think; p.mouth = 0; p.lookY -= 0.3; }
    if (t > 25.0 && t < 26.4) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(16.4, 18.0); joy(40.2, 41.8); joy(75.2, 76.8);
    if (t > 84.0) {
      const j = (t - 84.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 21.0, 21.15), hump(t, 34.0, 34.15), hump(t, 47.0, 47.15), hump(t, 58.0, 58.15), hump(t, 70.0, 70.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { BAGS, WORD, SHORT, NUM, FRAC, bagT, DAILY, px, bag, T, AMB, tick, width, nokta, base };
})(window.LI = window.LI || {});
