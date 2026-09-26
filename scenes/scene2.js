/* SAHNE 2 — KESİN VE İMKÂNSIZ (10–26 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 2, start: 10, end: 26, name: 'Certain and impossible', nameTr: 'Kesin ve imkânsız', concept: 'All amber: 1 · no amber: 0', conceptTr: 'Hepsi amber: 1 · hiç amber yok: 0', render });
})(window.LI = window.LI || {});
