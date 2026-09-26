/* Shared layout + Nokta helpers for "İmkânsızdan Kesine". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          B: { x: 0, y: -500, r: 30, s: 1.6, m: 0.5 },
          Q: { x: 0, y: [-300, -222, -144], size: 50 },
          SP: { x0: -420, x1: 420, y: 40, bagY: -48, numY: 94, wordY: 148, ns: 40, ws: 36, chipY: [-300, -230, -160], cs: 36 },
          ST: { x: 0, y: [-560, -470, -380], s: [60, 60, 50] },
          nx: -360, gy: 560, s: 1.15 }
        : {
          B: { x: -210, y: -175, r: 34, s: 1.9, m: 0.62 },
          Q: { x: 470, y: [-280, -185, -90], size: 60 },
          SP: { x0: -520, x1: 720, y: 180, bagY: 80, numY: 234, wordY: 290, ns: 48, ws: 44, chipY: [-300, -200, -140], cs: 46 },
          ST: { x: 90, y: [-330, -230, -140], s: [76, 76, 58] },
          nx: -790, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
