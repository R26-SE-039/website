"use client";

import { useEffect, useRef } from "react";

/**
 * Flow-line wave background (the "Waves" effect seen on product sites):
 * closely spaced vertical lines whose points drift with 3-D Perlin noise and
 * are pushed by the pointer with a spring, so the field bends and settles
 * around the cursor. Plain canvas, no dependency.
 *
 * CPU budget: the field is STATIC until the pointer moves. A frame loop runs
 * only while the pointer is active and for a short settle afterwards, then
 * stops completely. Canvas is drawn at device pixel ratio 1, the cursor force
 * is applied only to lines near the pointer, and points at rest skip physics.
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

const REST = 0.05; // below this displacement/velocity a point is considered at rest
const SETTLE_MS = 1500; // keep animating this long after the last pointer move

export default function WaveField({
  lineColor = "rgba(14, 24, 42, 0.09)",
  xGap = 14,
  yGap = 34,
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
    let width = 0;
    let height = 0;
    let lines: Point[][] = [];
    let raf = 0;
    let visible = true;
    let t = 0;
    let lastMove = -1e9;

    const mouse = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, vs: 0, a: 0, set: false };

    const build = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width; // DPR 1: hairlines do not need more and it quarters the fill cost
      canvas.height = height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      lines = [];
      const cols = Math.ceil(width / xGap) + 2;
      const rows = Math.ceil(height / yGap) + 2;
      for (let c = 0; c < cols; c++) {
        const pts: Point[] = [];
        for (let r = 0; r < rows; r++) {
          pts.push({ x: c * xGap - xGap, y: r * yGap - yGap, wx: 0, wy: 0, cx: 0, cy: 0, vx: 0, vy: 0 });
        }
        lines.push(pts);
      }
      applyNoise();
    };

    const applyNoise = () => {
      for (const pts of lines) {
        for (const p of pts) {
          const n = noise3(p.x * 0.002, p.y * 0.0015, t) * 12;
          p.wx = Math.cos(n) * ampX;
          p.wy = Math.sin(n) * ampY;
        }
      }
    };

    /** Cursor force (only lines near the pointer) + spring relaxation (only points not at rest). Returns true while anything is still moving. */
    const physics = (): boolean => {
      const l = Math.max(cursorRadius, mouse.vs);
      const reach = l + cursorMax;
      const fx = Math.cos(mouse.a) * l * mouse.vs * 0.00065;
      const fy = Math.sin(mouse.a) * l * mouse.vs * 0.00065;
      let active = false;
      for (const pts of lines) {
        const lineX = pts[0].x;
        const nearLine = Math.abs(lineX - mouse.sx) < reach;
        for (const p of pts) {
          if (nearLine && mouse.vs > 0.2) {
            const dx = p.x - mouse.sx;
            const dy = p.y - mouse.sy;
            const d = Math.hypot(dx, dy);
            if (d < l) {
              const s = 1 - d / l;
              const f = Math.cos(d * 0.001) * s;
              p.vx += fx * f;
              p.vy += fy * f;
            }
          }
          if (Math.abs(p.cx) < REST && Math.abs(p.cy) < REST && Math.abs(p.vx) < REST && Math.abs(p.vy) < REST) {
            p.cx = p.cy = p.vx = p.vy = 0;
            continue;
          }
          p.vx += -p.cx * 0.005; // tension
          p.vy += -p.cy * 0.005;
          p.vx *= 0.925; // friction
          p.vy *= 0.925;
          p.cx = Math.max(-cursorMax, Math.min(cursorMax, p.cx + p.vx * 2));
          p.cy = Math.max(-cursorMax, Math.min(cursorMax, p.cy + p.vy * 2));
          active = true;
        }
      }
      return active;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const pts of lines) {
        let qx = pts[0].x + pts[0].wx + pts[0].cx;
        let qy = pts[0].y + pts[0].wy + pts[0].cy;
        ctx.moveTo(qx, qy);
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const x = p.x + p.wx + p.cx;
          const y = p.y + p.wy + p.cy;
          ctx.quadraticCurveTo(qx, qy, (qx + x) / 2, (qy + y) / 2); // soft curve through midpoints
          qx = x;
          qy = y;
        }
      }
      ctx.stroke();
    };

    const tick = () => {
      raf = 0;
      if (!visible) return;
      t += speed;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.vs = Math.min(100, mouse.vs + (d - mouse.vs) * 0.1);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      if (d > 0.01) mouse.a = Math.atan2(dy, dx);
      applyNoise();
      const settling = physics();
      draw();
      const recent = performance.now() - lastMove < SETTLE_MS;
      if (recent || settling) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
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
      lastMove = performance.now();
      wake();
    };

    const onResize = () => {
      build();
      draw();
    };

    build();
    draw(); // static frame; nothing runs until the pointer moves
    window.addEventListener("resize", onResize);
    if (reduced) return () => window.removeEventListener("resize", onResize);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(host);
    host.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [lineColor, xGap, yGap, ampX, ampY, speed, cursorRadius, cursorMax]);

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full" />;
}
