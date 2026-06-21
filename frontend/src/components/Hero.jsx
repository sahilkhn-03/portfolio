import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-32 pb-20"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.div variants={item} className="section-tag">
            <span className="dot" />
            Available · AI Engineer · India
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display mt-7 text-[clamp(2.4rem,7vw,5.6rem)] leading-[0.98] tracking-tight max-w-5xl"
          >
            <span className="text-grad-primary">Building intelligent</span>
            <br />
            <span className="text-grad-primary">software & </span>
            <span className="font-serif-italic text-[1.02em] text-grad-blue">
              AI applications
            </span>
            <span className="text-grad-primary">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-[17px] leading-relaxed text-[#9aa3b2]"
          >
            I'm <span className="text-white">Sahil</span> — a 4th-year B.Tech AI student
            shipping production-grade ML systems, RAG pipelines, AI orchestration
            platforms and lightweight language model research.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
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
              View Projects
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
              Get in touch
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
          </motion.div>

          {/* Tech rail */}
          <motion.div
            variants={item}
            className="mt-16 w-full flex flex-wrap items-center gap-x-7 gap-y-3 text-[#5e6776] font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            <span className="text-[#7dd3fc]/70">/ stack</span>
            <span>Python</span>
            <span>·</span>
            <span>PyTorch</span>
            <span>·</span>
            <span>LangChain</span>
            <span>·</span>
            <span>FastAPI</span>
            <span>·</span>
            <span>React</span>
            <span>·</span>
            <span>Postgres</span>
            <span>·</span>
            <span>Docker</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
