"use client";

import { useEffect, useRef } from "react";

const DOT_SIZE = 8;
const LERP = 0.2;
const TRAIL_LENGTH = 14;
const TRAIL_COLOR = "153, 97, 199"; // --accent, #9961c7 as rgb (canvas can't read CSS vars per-frame)

/**
 * Custom cursor: a lerped dot plus a canvas-drawn trail sampled from the
 * dot's smoothed position (not raw mouse coords), so the trail reads as a
 * settling comet rather than a jittery line. Canvas avoids per-frame React
 * re-renders for the trail; the dot is a DOM node for crisp edges.
 */
export function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.body.classList.add("cursor-none-active");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const raw = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: raw.x, y: raw.y };
    const trail: { x: number; y: number }[] = [];
    let visible = false;

    const onMove = (e: PointerEvent) => {
      raw.x = e.clientX;
      raw.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.x = raw.x;
        pos.y = raw.y;
        dot.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let frame: number;
    const tick = () => {
      pos.x += (raw.x - pos.x) * LERP;
      pos.y += (raw.y - pos.y) * LERP;

      dot.style.transform = `translate3d(${pos.x - DOT_SIZE / 2}px, ${
        pos.y - DOT_SIZE / 2
      }px, 0)`;

      trail.push({ x: pos.x, y: pos.y });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (visible && trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1];
          const b = trail[i];
          const t = i / trail.length;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${TRAIL_COLOR}, ${t * 0.35})`;
          ctx.lineWidth = t * 1.5;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("cursor-none-active");
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "9999px",
          backgroundColor: "var(--foreground)",
          transition: "opacity 0.2s ease",
        }}
        aria-hidden="true"
      />
    </>
  );
}
