import { useEffect, useRef } from "react";

/**
 * Background: animated grid + particles + mouse-follow spotlight.
 * Performance-conscious canvas particles + CSS layers.
 */
export default function Background() {
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.min(70, Math.floor((w * h) / 24000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() > 0.6 ? "violet" : Math.random() > 0.4 ? "ice" : "blue",
        alpha: Math.random() * 0.5 + 0.3,
      }));
    };

    const onMouse = (e) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    const colorOf = (hue) => {
      if (hue === "violet") return "167, 139, 250";
      if (hue === "ice") return "125, 211, 252";
      return "79, 140, 255";
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.12;
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${
          mouseRef.current.x - 240
        }px, ${mouseRef.current.y - 240}px, 0)`;
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = p.alpha;
        if (dist < 140) alpha = Math.min(1, alpha + (1 - dist / 140) * 0.7);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${colorOf(p.hue)}, ${alpha})`;
        ctx.shadowColor = `rgba(${colorOf(p.hue)}, ${alpha * 0.7})`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Solid base + radial glow */}
      <div className="fixed inset-0 -z-30" style={{ background: "#080b14" }} />
      <div className="fixed inset-0 -z-20 bg-radial-glow" />
      <div className="fixed inset-0 -z-20 bg-grid" />
      <div className="fixed inset-0 -z-10 noise pointer-events-none" />

      {/* canvas particles */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      {/* mouse spotlight */}
      <div ref={spotlightRef} className="spotlight" aria-hidden />
    </>
  );
}
