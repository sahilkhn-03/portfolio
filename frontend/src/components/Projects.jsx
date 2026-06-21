import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "hackquest25",
    no: "01",
    title: "HackQuest25",
    summary:
      "Hackathon-winning collaborative platform with a modern interface, scalable architecture and seamless UX.",
    tech: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
    github: "https://github.com/sahilkhn-03/HackQuest25",
    accent: "blue",
    award: "Winner · HackQuest 2025",
    highlights: [
      "Modern responsive design system",
      "Interactive, intuitive user experience",
      "Scalable full-stack architecture",
      "Clean, modular and maintainable codebase",
      "Optimized for performance and usability",
    ],
  },
  {
    id: "rag-ai-agent",
    no: "02",
    title: "RAG AI Agent",
    summary:
      "Production-grade Retrieval-Augmented Generation agent for grounded answers over private documents.",
    tech: ["Python", "LangChain", "FAISS", "FastAPI", "OpenAI"],
    github: "https://github.com/sahilkhn-03",
    accent: "violet",
    highlights: [
      "Document ingestion + chunking pipeline",
      "Hybrid vector + keyword retrieval",
      "Streaming token responses with citations",
      "Configurable LLM backends (OpenAI / local)",
    ],
  },
  {
    id: "orchestrate",
    no: "03",
    title: "Orchestrate",
    summary:
      "Lightweight AI orchestration platform to chain prompts, tools and agents into reliable workflows.",
    tech: ["Python", "FastAPI", "Pydantic", "Redis", "React"],
    github: "https://github.com/sahilkhn-03",
    accent: "ice",
    highlights: [
      "Declarative agent + tool graph",
      "Retry, timeout and observability built-in",
      "Pluggable model providers",
      "Real-time run inspection UI",
    ],
  },
  {
    id: "slm-mini",
    no: "04",
    title: "SLM — Small Language Model",
    summary:
      "Mini-project on training and evaluating a compact transformer for resource-constrained inference.",
    tech: ["Python", "PyTorch", "HuggingFace", "Datasets"],
    github: "https://github.com/sahilkhn-03",
    accent: "violet",
    highlights: [
      "Tokenizer + dataset preparation",
      "Tiny transformer from scratch",
      "Training loop with eval + checkpoints",
      "Benchmark vs baseline models",
    ],
  },
  {
    id: "network-security",
    no: "05",
    title: "Network Security",
    summary:
      "ML-driven network intrusion analysis project — detecting anomalies in traffic data.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/sahilkhn-03",
    accent: "blue",
    highlights: [
      "Feature engineering on network traffic",
      "Anomaly detection model training",
      "Evaluation with precision/recall",
      "Reproducible experiment notebooks",
    ],
  },
];

const accentMap = {
  blue: { glow: "rgba(79,140,255,0.5)", text: "#7dafff" },
  ice: { glow: "rgba(125,211,252,0.45)", text: "#7dd3fc" },
  violet: { glow: "rgba(167,139,250,0.5)", text: "#a78bfa" },
};

function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false);
  const accent = accentMap[p.accent];

  return (
    <motion.article
      data-testid={`project-card-${p.id}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="glass hover-lift ring-edge rounded-2xl p-5 sm:p-6 relative overflow-hidden group"
    >
      {/* Accent glow */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent.glow}, transparent 65%)`,
          filter: "blur(28px)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#5e6776]">
              {p.no}
            </span>
            {p.award && (
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,206,107,0.08)",
                  color: "#ffce6b",
                  border: "1px solid rgba(255,206,107,0.22)",
                }}
              >
                ★ {p.award}
              </span>
            )}
          </div>

          <h3
            className="font-display mt-3 text-[20px] sm:text-[22px] leading-tight text-white tracking-tight"
            style={{ color: "#fff" }}
          >
            {p.title}
          </h3>
          <p className="mt-2 text-[13.5px] text-[#9aa3b2] leading-relaxed max-w-xl">
            {p.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <a
            data-testid={`project-github-${p.id}`}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all"
            aria-label={`${p.title} on GitHub`}
            title="Open GitHub"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#cfd6e2" }}>
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Expand button */}
      <div className="relative z-10 mt-4 flex items-center justify-between">
        <button
          data-testid={`project-expand-${p.id}`}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-[12px] font-medium text-[#cfd6e2] hover:text-white transition-colors"
        >
          <span style={{ color: accent.text }}>
            {open ? "Hide details" : "Read more"}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: accent.text }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </button>

        <div className="divider-line flex-1 mx-4 opacity-60" />
        <span className="font-mono text-[10px] text-[#5e6776] tracking-[0.18em]">
          AI / ML
        </span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="expand-content relative z-10"
          >
            <div className="pt-5 mt-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7dd3fc] mb-2.5">
                Highlights
              </div>
              <ul className="space-y-1.5 text-[13px] text-[#b3bccc]">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: accent.text }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-32 sm:py-40"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="section-tag">
              <span className="dot" />
              Selected work
            </div>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight">
              <span className="text-grad-primary">Things I've </span>
              <span className="font-serif-italic text-grad-blue">built</span>
              <span className="text-grad-primary">.</span>
            </h2>
          </div>
          <div className="text-[13px] text-[#7e8696] max-w-sm">
            A focused set of recent AI / ML projects — from RAG systems to small
            language models and orchestration tooling.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard p={p} index={i} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
