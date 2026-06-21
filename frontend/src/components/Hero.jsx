import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = ["S", "A", "H", "I", "L"];

/* -----------------------------------------------------------
 * SAHIL wordmark — staggered reveal + magnetic + glow + sweep
 * --------------------------------------------------------- */
function InteractiveName() {
  const letterRefs = useRef([]);

  useEffect(() => {
    let raf;
    let last = { x: -9999, y: -9999 };
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      const els = letterRefs.current;
      els.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = last.x - cx;
        const dy = last.y - cy;
        const dist = Math.hypot(dx, dy);
        const RAD = 240;
        if (dist > RAD) {
          el.style.transform = "translate3d(0,0,0)";
          el.style.filter = "drop-shadow(0 0 0 transparent)";
          return;
        }
        const t = 1 - dist / RAD;
        const strength = t * 10;
        const tx = -(dx / (dist || 1)) * strength;
        const ty = -(dy / (dist || 1)) * strength;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        el.style.filter = `drop-shadow(0 0 ${28 * t}px rgba(167,139,250,${0.55 * t}))`;
      });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h1
      data-testid="hero-name"
      aria-label="SAHIL"
      className="relative inline-flex select-none leading-[0.9] tracking-[-0.05em] font-display"
      style={{
        fontWeight: 900,
        fontSize: "clamp(4.2rem, 14vw, 10.5rem)",
      }}
    >
      {LETTERS.map((ch, i) => (
        <motion.span
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: 0.2 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hero-letter inline-block"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #f8fafc 0%, #d8d4ea 55%, #9a98b8 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
            willChange: "transform",
          }}
        >
          {ch}
        </motion.span>
      ))}

      {/* Animated gradient sweep / light reflection that drifts across the wordmark */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 48%, rgba(167,139,250,0.45) 52%, transparent 70%)",
          backgroundSize: "260% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          mixBlendMode: "screen",
          animation: "sahilSweep 8s ease-in-out infinite",
          opacity: 0.85,
        }}
      >
        {LETTERS.join("")}
      </span>

      <style>{`@keyframes sahilSweep {
        0% { background-position: 200% 0; }
        55% { background-position: -120% 0; }
        100% { background-position: -120% 0; }
      }`}</style>
    </h1>
  );
}

/* -----------------------------------------------------------
 * Magnetic button wrapper (subtle cursor pull)
 * --------------------------------------------------------- */
function Magnetic({ children, strength = 14 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = Math.max(r.width, 90);
    const dist = Math.min(1, Math.hypot(dx, dy) / max);
    const f = 1 - dist;
    el.style.transform = `translate3d(${(dx / max) * strength * f}px, ${
      (dy / max) * strength * f
    }px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </span>
  );
}

/* -----------------------------------------------------------
 * Animated mesh gradient layer (very slow, very subtle)
 * --------------------------------------------------------- */
function MeshLayer() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.22 }}
    >
      <motion.div
        className="absolute -top-40 -left-40 w-[40vw] h-[40vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.22), transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 30, -10, 0], y: [0, 20, -8, 0] }}
        transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[40vw] h-[40vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(139,92,246,0.18), transparent 65%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -20, 10, 0], y: [0, -10, 14, 0] }}
        transition={{ duration: 34, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

export default function Hero() {
  const [glow, setGlow] = useState({ x: 0, y: 0, on: false });

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative flex items-center pt-28 pb-14 sm:pt-32 sm:pb-16 min-h-[62vh] overflow-hidden"
      onMouseMove={(e) => setGlow({ x: e.clientX, y: e.clientY, on: true })}
      onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
    >
      {/* Layer 1: deep base background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "#07070a" }}
      />

      {/* Layer 2: subtle radial accent (replaces large fog) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(620px 320px at 28% 38%, rgba(99,102,241,0.10), transparent 70%)",
        }}
      />

      {/* Layer 3: very subtle animated mesh */}
      <MeshLayer />

      {/* Layer 4: muted aurora */}
      <div className="aurora" aria-hidden />

      {/* Layer 5: soft mouse spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: glow.on ? 1 : 0 }}
      >
        <div
          className="absolute w-[340px] h-[340px] rounded-full"
          style={{
            left: glow.x - 170,
            top: glow.y - 170,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.10), transparent 65%)",
            filter: "blur(30px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.24em] uppercase text-[#a78bfa] mb-9"
        >
          <span className="relative inline-flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[#a78bfa]" style={{ boxShadow: "0 0 12px #a78bfa" }} />
            <span className="absolute inset-0 rounded-full bg-[#a78bfa] animate-ping opacity-60" />
          </span>
          Open to Internships &amp; Research Collaborations
        </motion.div>

        <div className="relative">
          <InteractiveName />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-[13px] text-[#94a3b8] font-mono tracking-[0.04em]"
        >
          India • Remote Friendly
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex flex-wrap items-center gap-2.5"
        >
          <Magnetic>
            <a
              data-testid="hero-projects-cta"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              Explore Projects
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              data-testid="hero-resume"
              href="https://drive.google.com/file/d/1Ob0psVbcB7vpI9FqRpz79-qq8dzZT3og/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Resume
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              data-testid="hero-github"
              href="https://github.com/sahilkhn-03"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              data-testid="hero-linkedin"
              href="https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LinkedIn
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
