import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const LETTERS = ["S", "A", "H", "I", "L"];

function InteractiveName() {
  const nameRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    const onMove = (e) => {
      const els = letterRefs.current;
      if (!els.length) return;
      els.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const RAD = 220;
        if (dist > RAD) {
          el.style.transform = "translate(0, 0)";
          el.style.filter = "drop-shadow(0 0 0 transparent)";
          return;
        }
        const strength = (1 - dist / RAD) * 16;
        const tx = -(dx / dist) * strength;
        const ty = -(dy / dist) * strength;
        const wave = Math.sin(performance.now() / 600 + cx * 0.03) * 2;
        const glow = (1 - dist / RAD) * 36;
        el.style.transform = `translate(${tx}px, ${ty + wave}px) scale(${1 + (1 - dist / RAD) * 0.04})`;
        el.style.filter = `drop-shadow(0 0 ${glow}px rgba(167, 139, 250, ${0.65 * (1 - dist / RAD)}))`;
      });
    };
    const onLeave = () => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "translate(0, 0)";
        el.style.filter = "drop-shadow(0 0 0 transparent)";
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <h1
      ref={nameRef}
      data-testid="hero-name"
      className="hero-name text-[clamp(4.2rem,15vw,11rem)]"
    >
      {LETTERS.map((ch, i) => (
        <span
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          className="hero-letter"
          aria-hidden={false}
        >
          {ch}
        </span>
      ))}
      <span className="hero-period">.</span>
    </h1>
  );
}

export default function Hero() {
  const [glow, setGlow] = useState({ x: 0, y: 0, on: false });

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative flex items-center pt-24 pb-12 sm:pt-28 sm:pb-14 min-h-[60vh] sm:min-h-[64vh]"
      onMouseMove={(e) =>
        setGlow({ x: e.clientX, y: e.clientY, on: true })
      }
      onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
    >
      <div className="aurora opacity-50" aria-hidden />

      <div className="w-full max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#a78bfa] flex items-center gap-2 mb-7"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_12px_#a78bfa]" />
            Open to internships &amp; research collabs
          </motion.div>

          <motion.div variants={item} className="relative">
            <InteractiveName />
          </motion.div>

          <motion.div variants={item} className="mt-6 max-w-3xl">
            <div className="flex items-center gap-2.5 text-[15px] text-white font-medium tracking-tight">
              <span>AI Engineer</span>
              <span className="text-[#4b5563]">•</span>
              <span>Machine Learning Developer</span>
            </div>
            <div className="mt-1.5 text-[12.5px] text-[#94a3b8] font-mono">
              India • Remote Friendly
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center gap-2.5"
          >
            <a
              data-testid="hero-projects-cta"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              Explore Projects
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              data-testid="hero-contact-cta"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-ghost"
            >
              Get In Touch
            </a>
            <a
              data-testid="hero-resume"
              href="https://drive.google.com/file/d/1Ob0psVbcB7vpI9FqRpz79-qq8dzZT3og/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Resume
            </a>
            <a
              data-testid="hero-github"
              href="https://github.com/sahilkhn-03"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </a>
            <a
              data-testid="hero-linkedin"
              href="https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3V9.5zM10 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.2c0-1.24-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76V21h-4V9.5z" />
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* hero-scoped soft glow following cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{ opacity: glow.on ? 1 : 0 }}
      >
        <div
          className="absolute w-[420px] h-[420px] rounded-full"
          style={{
            left: glow.x - 210,
            top: glow.y - 210,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.22), transparent 65%)",
            filter: "blur(30px)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </section>
  );
}
