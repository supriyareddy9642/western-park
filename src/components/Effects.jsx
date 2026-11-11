import { useEffect, useRef } from "react";
import { prefersReduced } from "../utils/gsapSetup";

/** Desktop cursor-following champagne light (hidden on touch / reduced motion). */
export function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReduced() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}

/** Subtle drifting gold particles on a canvas (skipped under reduced motion). */
export function GoldParticles({ density = 32 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let parts = [];
    let raf;
    let hidden = false;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    const seed = () => {
      parts = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        s: Math.random() * 0.28 + 0.05,
        o: Math.random() * 0.45 + 0.12,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    const onResize = () => {
      resize();
      seed();
    };
    const onVis = () => {
      hidden = document.hidden;
      if (!hidden) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      if (hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.s;
        p.tw += 0.02;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        const a = p.o * (0.55 + 0.45 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,213,124,${a.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    seed();
    tick();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density]);

  return <canvas className="gold-particles" ref={canvasRef} aria-hidden="true" />;
}
