/* ════════════════════════════════════════════════════════════════════════════
   KANO.STUDIO — Hero canvas
   Organic iso-line mesh · 3 original parametric forms · slow morph
   ════════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const cv = document.getElementById('heroCanvas');
  if (!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let cx, W, H;
  let time = 1800;

  /* ── Organic protrusions ─────────────────────────────────────────────────────
     3 bump centres that drift across the surface driven by slow sine waves.
     Each centre pulses in amplitude independently — no timers, pure math.     */
  const BUMPS = [
    { fu: 0.11, fv: 0.07, fp: 0.0,         fa: 0.031 },
    { fu: 0.07, fv: 0.13, fp: Math.PI*0.7, fa: 0.019 },
    { fu: 0.05, fv: 0.09, fp: Math.PI*1.4, fa: 0.025 },
  ];

  function protrusion(u, v) {
    let push = 0;
    const t = time * 0.001;
    for (const b of BUMPS) {
      // Centre drifts slowly
      const u0 = 0.5 + 0.38 * Math.sin(t * b.fu + b.fp);
      const v0 = 0.5 + 0.32 * Math.cos(t * b.fv + b.fp * 0.6);
      // Amplitude breathes — peaks at ~110 px, troughs near 0
      const amp = 55 * (1 + Math.sin(t * b.fa * 6 + b.fp));
      // Narrow Gaussian footprint → sharp spike not broad swell
      const du  = Math.min(Math.abs(u - u0), 1 - Math.abs(u - u0));
      const dv  = Math.abs(v - v0);
      push += amp * Math.exp(-(du * du + dv * dv) / 0.0022);
    }
    return push;
  }

  const isDark = () => document.documentElement.dataset.theme === 'dark';
  const INK = () => isDark() ? '210,210,210' : '22,22,22';

  const N_H  = 72;   // horizontal iso-lines
  const N_V  = 26;   // vertical iso-lines
  const SEGS = 110;  // segments per line

  /* ── 3 original parametric surfaces ─────────────────────────────────────────
     All (u,v) ∈ [0,1]².  Units are canvas-pixels at scale 1.                  */

  const forms = [

    // ── Form 0: "Knot" ────────────────────────────────────────────────────────
    // Fat torus (r > R) — tube wider than ring radius, so no open hole.
    // Surface is rippled with interference folds, like a knotted thought.
    (u, v) => {
      const a = u * Math.PI * 2;
      const b = v * Math.PI * 2;
      const R = 72, r = 96;
      const ripple = 28 * Math.sin(3 * a - b) + 13 * Math.sin(6 * b + 0.8 * a);
      const rr = r + ripple;
      return {
        x: (R + rr * Math.cos(b)) * Math.cos(a),
        y: (R + rr * Math.cos(b)) * Math.sin(a),
        z: rr * Math.sin(b) + 22 * Math.sin(a * 2.5 - b),
      };
    },

    // ── Form 1: "Latent" ──────────────────────────────────────────────────────
    // Lumpy sphere — two harmonic modes only, never becomes a ring
    (u, v) => {
      const a = u * Math.PI * 2;
      const b = v * Math.PI;
      const r = 158
        + 44 * Math.sin(3 * b + 2 * a)
        + 22 * Math.cos(2 * b - 3 * a);
      return {
        x: r * Math.sin(b) * Math.cos(a),
        y: r * Math.sin(b) * Math.sin(a),
        z: r * Math.cos(b),
      };
    },

    // ── Form 2: "Helix" ───────────────────────────────────────────────────────
    // Torus whose tube corkscrews twice per revolution — iso-lines spiral
    // like a coil of wire, completely different character to the other two
    (u, v) => {
      const a = u * Math.PI * 2;
      const b = v * Math.PI * 2;
      const R = 95, r = 60;
      const phase = b + a * 2;   // tube makes 2 full twists as it orbits
      const rr = r + 18 * Math.sin(5 * b - a);
      return {
        x: (R + rr * Math.cos(phase)) * Math.cos(a),
        y: (R + rr * Math.cos(phase)) * Math.sin(a),
        z: rr * Math.sin(phase) + 24 * Math.sin(a * 2 - b),
      };
    },
  ];

  /* ── Interpolate between forms ───────────────────────────────────────────── */
  function getPoint(u, v) {
    const θ = time * 0.0016;
    const n = forms.length;
    const pts = forms.map(f => f(u, v));
    const w   = pts.map((_, k) => (1 + Math.cos(θ - k * Math.PI * 2 / n)) / n);
    const p   = {
      x: pts.reduce((s, p, k) => s + p.x * w[k], 0),
      y: pts.reduce((s, p, k) => s + p.y * w[k], 0),
      z: pts.reduce((s, p, k) => s + p.z * w[k], 0),
    };
    // Organic protrusion — outward along radial direction
    const push = protrusion(u, v);
    if (push > 0.5) {
      const len = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z) || 1;
      p.x += (p.x / len) * push;
      p.y += (p.y / len) * push;
      p.z += (p.z / len) * push;
    }
    return p;
  }

  /* ── Fixed view: isometric-style tilt, no rotation ──────────────────────── */
  function project(p) {
    // Tilt ~30° around X — enough to feel 3-D, not enough to hide the top
    const tX = 0.52, tZ = 0.18;
    const cX = Math.cos(tX), sX = Math.sin(tX);
    const cZ = Math.cos(tZ), sZ = Math.sin(tZ);
    // Rotate X then Z
    const ry  = p.y * cX - p.z * sX;
    const rz  = p.y * sX + p.z * cX;
    const rx2 = p.x * cZ - ry * sZ;
    const ry2 = p.x * sZ + ry * cZ;
    const scale = 1.45 + rz * 0.0004;
    return {
      sx: W * 0.80 + rx2 * scale,
      sy: H * 0.50 + ry2 * scale,
    };
  }

  /* ── Resize ──────────────────────────────────────────────────────────────── */
  function resize() {
    const r = cv.parentElement.getBoundingClientRect();
    W = Math.max(r.width,  300);
    H = Math.max(r.height, 300);
    cv.width  = W;
    cv.height = H;
  }

  /* ── Bursts ──────────────────────────────────────────────────────────────────
     Each burst = N parallel trails on adjacent iso-lines sharing one t.
     They sweep together, drawing a comb pattern across the form.
     { t, speed, lines:[{v, trail}] }                                          */
  const bursts    = [];
  const TRAIL_LEN = 44;

  function tickSparks() {
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      for (const ln of b.lines) {
        const pt = project(getPoint(b.t, ln.v));
        ln.trail.push({ sx: pt.sx, sy: pt.sy });
        if (ln.trail.length > TRAIL_LEN) ln.trail.shift();
      }
      b.t += b.speed;
      if (b.t > 1 || b.t < 0) bursts.splice(i, 1);
    }
    if (bursts.length < 5 && Math.random() < 0.018) {
      const v0    = 0.12 + Math.random() * 0.76;
      const count = 5 + Math.floor(Math.random() * 6);
      const gap   = 0.030 + Math.random() * 0.022;
      const lines = [];
      for (let k = 0; k < count; k++) {
        lines.push({ v: v0 + (k - (count - 1) / 2) * gap, trail: [] });
      }
      const dir = Math.random() < 0.5 ? 1 : -1;
      bursts.push({ t: dir > 0 ? 0 : 1, speed: (0.0010 + Math.random() * 0.0012) * dir, lines });
    }
  }

  function drawSparks() {
    const sparkR = isDark() ? '220,215,205' : '45,40,35';
    for (const b of bursts) {
      const progress = b.speed > 0 ? b.t : 1 - b.t;
      const env = Math.sin(progress * Math.PI);
      cx.save();
      cx.lineCap = 'round';
      for (const ln of b.lines) {
        for (let i = 1; i < ln.trail.length; i++) {
          const f = i / TRAIL_LEN;
          cx.globalAlpha = f * f * env * 0.65;
          cx.strokeStyle = `rgb(${sparkR})`;
          cx.lineWidth   = 1.1 * f;
          cx.beginPath();
          cx.moveTo(ln.trail[i - 1].sx, ln.trail[i - 1].sy);
          cx.lineTo(ln.trail[i].sx,     ln.trail[i].sy);
          cx.stroke();
        }
      }
      cx.restore();
    }
  }

  /* ── Draw ────────────────────────────────────────────────────────────────── */
  function draw() {
    cx.clearRect(0, 0, W, H);

    const ink = INK();
    cx.lineCap = 'round';

    // Horizontal iso-lines
    for (let hi = 0; hi < N_H; hi++) {
      const v = hi / (N_H - 1);
      cx.globalAlpha = 0.40;
      cx.strokeStyle = `rgb(${ink})`;
      cx.lineWidth   = 0.52;
      cx.beginPath();
      for (let si = 0; si <= SEGS; si++) {
        const pt = project(getPoint(si / SEGS, v));
        si === 0 ? cx.moveTo(pt.sx, pt.sy) : cx.lineTo(pt.sx, pt.sy);
      }
      cx.stroke();
    }

    // Vertical iso-lines — fewer, thinner
    for (let vi = 0; vi < N_V; vi++) {
      const u = vi / (N_V - 1);
      cx.globalAlpha = 0.22;
      cx.strokeStyle = `rgb(${ink})`;
      cx.lineWidth   = 0.36;
      cx.beginPath();
      for (let si = 0; si <= SEGS; si++) {
        const pt = project(getPoint(u, si / SEGS));
        si === 0 ? cx.moveTo(pt.sx, pt.sy) : cx.lineTo(pt.sx, pt.sy);
      }
      cx.stroke();
    }

    cx.globalAlpha = 1;
    tickSparks();
    drawSparks();

    time++;
  }

  /* ── Loop / Init ─────────────────────────────────────────────────────────── */
  function loop() { requestAnimationFrame(loop); draw(); }

  function init() {
    cx = cv.getContext('2d');
    resize();
    loop();
  }

  new ResizeObserver(resize).observe(cv.parentElement);

  init();
})();
