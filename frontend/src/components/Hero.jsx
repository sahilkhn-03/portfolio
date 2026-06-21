import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-32 pb-24"
    >
      <div className="aurora opacity-40" aria-hidden />

      <div className="w-full max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#7dd3fc] flex items-center gap-2 mb-10"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7dd3fc] shadow-[0_0_12px_#7dd3fc]" />
            Open to internships &amp; research collabs
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display leading-[0.86] tracking-[-0.04em] text-[clamp(3.6rem,13vw,10.5rem)]"
          >
            <span className="block text-grad-primary">SAHIL</span>
            <span className="block">
              <span className="text-grad-primary">KHAN</span>
              <span style={{ color: "#4f8cff" }}>.</span>
            </span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 text-[14px] text-[#cfd6e2]">
                <span className="font-mono text-[#5e6776]">—</span>
                <span className="text-white font-medium">AI Engineer</span>
              </div>
              <div className="mt-2 text-[13px] text-[#7e8696] font-mono">
                India · Remote-friendly
              </div>
            </div>

            <div className="md:col-span-7">
              <p className="text-[15.5px] leading-[1.75] text-[#a8b0bf] max-w-xl">
                CS &amp; AI student building intelligent systems at the
                intersection of{" "}
                <span className="text-white">retrieval-augmented generation</span>,{" "}
                <span className="text-white">AI orchestration</span>, and{" "}
                <span className="text-white">lightweight language models</span>.
                From agentic RAG pipelines to ML-powered alert systems — I build
                things that ship.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
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
              Explore Work
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
            <a
              data-testid="hero-contact-cta"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-ghost"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]"
          >
            <a
              data-testid="hero-github"
              href="https://github.com/sahilkhn-03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cfd6e2] hover:text-[#7dafff] transition-colors"
            >
              GitHub
            </a>
            <span className="text-[#3a4150]">·</span>
            <a
              data-testid="hero-linkedin"
              href="https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cfd6e2] hover:text-[#7dafff] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#3a4150]">·</span>
            <a
              data-testid="hero-email"
              href="mailto:sahilkhk001@gmail.com"
              className="text-[#cfd6e2] hover:text-[#7dafff] transition-colors"
            >
              Email
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-2 text-[12px] font-mono text-[#5e6776]"
          >
            <a
              data-testid="hero-resume"
              href="https://drive.google.com/file/d/1Ob0psVbcB7vpI9FqRpz79-qq8dzZT3og/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7dafff] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>↓</span>
              <span>Resume</span>
            </a>
            <span className="text-[#3a4150]">·</span>
            <span>Last updated Jun 2026</span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-3 gap-6 max-w-2xl"
          >
            {[
              ["4yrs", "Years building"],
              ["5+", "Projects"],
              ["1", "Hackathon win"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-tight text-white">
                  {v}
                </div>
                <div className="mt-2 text-[12px] text-[#7e8696] font-mono uppercase tracking-[0.14em]">
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
