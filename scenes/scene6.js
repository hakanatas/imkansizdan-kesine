/* SAHNE 6 — AKLINDA KALSIN (78–92 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); LI.fireworks(ctx, env, t); }
  LI.registerScene({ id: 6, start: 78, end: 92, name: 'Remember', nameTr: 'Aklında kalsın', concept: 'Every probability is between 0 and 1', conceptTr: 'Olasılık 0 ile 1 arasındadır', render });
})(window.LI = window.LI || {});
