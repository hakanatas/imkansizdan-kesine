/* SAHNE 3 — YARI YARIYA (26–44 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 26, end: 44, name: 'Even chance', nameTr: 'Yarı yarıya', concept: '2 out of 4 = 1/2', conceptTr: '4’te 2 = 1/2', render });
})(window.LI = window.LI || {});
