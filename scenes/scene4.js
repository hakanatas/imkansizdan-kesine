/* SAHNE 4 — DÜŞÜK VE YÜKSEK OLASILIK (44–62 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 44, end: 62, name: 'Less or more likely', nameTr: 'Düşük ve yüksek', concept: '1/4 and 3/4', conceptTr: '1/4 ve 3/4', render });
})(window.LI = window.LI || {});
