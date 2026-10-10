"use client";

import { useEffect, useRef } from "react";

/**
 * Flow-line wave background (the "Waves" effect seen on product sites):
 * closely spaced vertical lines whose points drift with 3-D Perlin noise and
 * are pushed by the pointer with a spring, so the field bends and settles
 * around the cursor. Plain canvas, no dependency.
 */

// ── compact classic Perlin noise (3-D) ───────────────────────────────────────
const PERM = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let seed = 1337;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + t * (b - a);
const grad = (h: number, x: number, y: number, z: number) => {
  const g = h & 15;
  const u = g < 8 ? x : y;
  const v = g < 4 ? y : g === 12 || g === 14 ? x : z;
  return ((g & 1) === 0 ? u : -u) + ((g & 2) === 0 ? v : -v);
};
function noise3(x: number, y: number, z: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  const u = fade(x);
  const v = fade(y);
  const w = fade(z);
  const A = PERM[X] + Y;
  const AA = PERM[A] + Z;
  const AB = PERM[A + 1] + Z;
  const B = PERM[X + 1] + Y;
  const BA = PERM[B] + Z;
  const BB = PERM[B + 1] + Z;
  return lerp(
    lerp(lerp(grad(PERM[AA], x, y, z), grad(PERM[BA], x - 1, y, z), u), lerp(grad(PERM[AB], x, y - 1, z), grad(PERM[BB], x - 1, y - 1, z), u), v),
    lerp(lerp(grad(PERM[AA + 1], x, y, z - 1), grad(PERM[BA + 1], x - 1, y, z - 1), u), lerp(grad(PERM[AB + 1], x, y - 1, z - 1), grad(PERM[BB + 1], x - 1, y - 1, z - 1), u), v),
    w,
  );
}

type Point = { x: number; y: number; wx: number; wy: number; cx: number; cy: number; vx: number; vy: number };

type Props = {
  lineColor?: string;
  xGap?: number; // px between vertical lines (small gap)
  yGap?: number; // px between points along a line
  ampX?: number;
  ampY?: number;
  speed?: number;
  cursorRadius?: number;
  cursorMax?: number;
};

export default function WaveField({
  lineColor = "rgba(14, 24, 42, 0.09)",
  xGap = 12,
  yGap = 32,
  ampX = 32,
  ampY = 16,
  speed = 0.012,
  cursorRadius = 190,
  cursorMax = 110,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.parentElement ?? canvas;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let lines: Point[][] = [];
    let raf = 0;
    let visible = true;
    let t = 0;

    const mouse = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false };

    const build = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = [];
      // One line per column, points running top to bottom.
      const cols = Math.ceil(width / xGap) + 2;
      const rows = Math.ceil(height / yGap) + 2;
      for (let c = 0; c < cols; c++) {
        const pts: Point[] = [];
        for (let r = 0; r < rows; r++) {
          pts.push({ x: c * xGap - xGap, y: r * yGap - yGap, wx: 0, wy: 0, cx: 0, cy: 0, vx: 0, vy: 0 });
        }
        lines.push(pts);
      }
    };

    const move = () => {
      for (const pts of lines) {
        for (const p of pts) {
          const n = noise3(p.x * 0.002, p.y * 0.0015, t) * 12;
          p.wx = Math.cos(n) * ampX;
          p.wy = Math.sin(n) * ampY;

          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const d = Math.hypot(dx, dy);
          const l = Math.max(cursorRadius, mouse.vs);
          if (d < l) {
            const s = 1 - d / l;
            const f = Math.cos(d * 0.001) * s;
            p.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }
          p.vx += (0 - p.cx) * 0.005; // tension
          p.vy += (0 - p.cy) * 0.005;
          p.vx *= 0.925; // friction
          p.vy *= 0.925;
          p.cx += p.vx * 2;
          p.cy += p.vy * 2;
          p.cx = Math.max(-cursorMax, Math.min(cursorMax, p.cx));
          p.cy = Math.max(-cursorMax, Math.min(cursorMax, p.cy));
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const pts of lines) {
        let first = true;
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const x = p.x + p.wx + p.cx;
          const y = p.y + p.wy + p.cy;
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            // smooth through the midpoint for a soft curve
            const q = pts[i - 1];
            const qx = q.x + q.wx + q.cx;
            const qy = q.y + q.wy + q.cy;
            ctx.quadraticCurveTo(qx, qy, (qx + x) / 2, (qy + y) / 2);
          }
        }
      }
      ctx.stroke();
    };

    const tick = () => {
      if (!visible) return;
      t += speed;
      // ease the smoothed cursor towards the real one and derive its speed and angle
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);
      move();
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    };

    build();
    if (reduced) {
      move();
      draw();
      window.addEventListener("resize", build);
      return () => window.removeEventListener("resize", build);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
      if (!visible) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(host);
    host.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", build);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", build);
    };
  }, [lineColor, xGap, yGap, ampX, ampY, speed, cursorRadius, cursorMax]);

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full" />;
}
