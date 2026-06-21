import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative flex items-center pt-28 pb-14 sm:pt-32 sm:pb-16 min-h-[78vh]"
    >
      <div className="aurora opacity-40" aria-hidden />

      <div className="w-full max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#93c5fd] flex items-center gap-2 mb-8"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#60a5fa] shadow-[0_0_12px_#60a5fa]" />
            Open to internships &amp; research collabs
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display leading-[0.86] tracking-[-0.045em] text-[clamp(4rem,14vw,10.5rem)]"
          >
            <span className="block">
              <span className="text-grad-primary">SAHIL</span>
              <span style={{ color: "#3b82f6" }}>.</span>
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-7 max-w-3xl">
            <div className="flex items-center gap-2.5 text-[15px] text-white font-medium tracking-tight">
              <span>AI Engineer</span>
              <span className="text-[#3a4150]">•</span>
              <span>Machine Learning Developer</span>
            </div>
            <div className="mt-1.5 text-[13px] text-[#7e8696] font-mono">
              India • Remote Friendly
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center gap-3"
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
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]"
          >
            <a
              data-testid="hero-github"
              href="https://github.com/sahilkhn-03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cfd6e2] hover:text-[#60a5fa] transition-colors"
            >
              GitHub
            </a>
            <span className="text-[#3a4150]">·</span>
            <a
              data-testid="hero-linkedin"
              href="https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cfd6e2] hover:text-[#60a5fa] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#3a4150]">·</span>
            <a
              data-testid="hero-email"
              href="mailto:sahilkhk001@gmail.com"
              className="text-[#cfd6e2] hover:text-[#60a5fa] transition-colors"
            >
              Email
            </a>
            <span className="text-[#3a4150]">·</span>
            <a
              data-testid="hero-resume"
              href="https://drive.google.com/file/d/1Ob0psVbcB7vpI9FqRpz79-qq8dzZT3og/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60a5fa] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>↓</span>
              <span>Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
