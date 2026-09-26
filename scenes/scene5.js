/* SAHNE 5 — GÜNLÜK OLAYLAR (62–78 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 62, end: 78, name: 'Everyday events', nameTr: 'Günlük olaylar', concept: 'Dice, coin, sunrise', conceptTr: 'Zar, yazı tura, güneş', render });
})(window.LI = window.LI || {});
