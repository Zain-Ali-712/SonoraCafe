"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; tw: number; hue: number };

const COUNT = 650;
const TINTS = ["255,255,255", "214,226,255", "255,240,214", "190,205,255"];

/**
 * A slow 3D starfield: stars live in depth and drift toward the viewer, with perspective,
 * twinkle and a little mouse parallax. Renders only while on screen; a still sky for reduced motion.
 */
export function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: (Math.random() * 2 - 1) * 1.6,
      y: (Math.random() * 2 - 1) * 1.6,
      z: Math.random() * 0.95 + 0.05,
      tw: Math.random() * Math.PI * 2,
      hue: Math.floor(Math.random() * TINTS.length),
    }));
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let visible = false;
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (dt: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2 + mx * 40;
      const cy = h / 2 + my * 30;
      const f = Math.max(w, h) * 0.55;
      for (const s of stars) {
        if (!reduce) {
          s.z -= dt * 0.012; // very slow drift toward the viewer
          if (s.z <= 0.05) {
            s.z = 1;
            s.x = (Math.random() * 2 - 1) * 1.6;
            s.y = (Math.random() * 2 - 1) * 1.6;
          }
        }
        const px = cx + (s.x / s.z) * f * 0.35;
        const py = cy + (s.y / s.z) * f * 0.35;
        if (px < -10 || px > w + 10 || py < -10 || py > h + 10) continue;
        const depth = 1 - s.z; // 0 far → 1 near
        const r = 0.45 + depth * depth * 2.2;
        const tw = reduce ? 0.85 : 0.6 + 0.4 * Math.sin(t * 0.0016 + s.tw);
        const a = Math.min(1, (0.38 + depth * 0.85) * tw);
        ctx.fillStyle = `rgba(${TINTS[s.hue]},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
        if (r > 1.6) {
          // soft halo on the nearest stars
          ctx.fillStyle = `rgba(${TINTS[s.hue]},${(a * 0.12).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!visible) return;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      draw(dt, t);
    };

    resize();
    draw(0, 0);
    const ro = new ResizeObserver(() => {
      resize();
      draw(0, performance.now());
    });
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
