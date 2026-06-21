import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "hackquest25",
    no: "01",
    title: "HackQuest25 — Public Alert System",
    badge: "Winner · HackQuest 2025",
    problem:
      "Public emergency announcements are often missed, delayed, or inaccessible.",
    solution:
      "Built a real-time emergency alert platform using ML-powered announcement detection, geofencing, WebSockets, and haptic notifications.",
    impact:
      "Delivered location-aware emergency alerts instantly across devices.",
    features: [
      "Real-time alerts",
      "Geofencing",
      "ML announcement detection",
      "WebSocket communication",
      "Haptic feedback",
    ],
    tech: ["Node.js", "Express", "Supabase", "WebSockets", "JavaScript"],
    github: "https://github.com/sahilkhn-03/HackQuest25",
  },
  {
    id: "orchestratex",
    no: "02",
    title: "OrchestrateX",
    badge: "Multi-model orchestration",
    problem:
      "Single LLM responses often lack quality and self-evaluation.",
    solution:
      "Built a multi-model AI orchestration platform that routes prompts through multiple models and improves responses using automated critique and refinement workflows.",
    impact:
      "Produced higher-quality AI responses through collaborative model evaluation.",
    features: [
      "Multi-model routing",
      "Critique & refinement loops",
      "Automated evaluation pipelines",
      "Quality scoring workflows",
      "Agent-based reasoning",
    ],
    tech: ["Python", "FastAPI", "LLMs", "AI Agents"],
    github: "https://github.com/sahilkhn-03/OrchestrateX",
  },
  {
    id: "rag-ai-agent",
    no: "03",
    title: "RAG AI Agent",
    badge: "Educational video intelligence",
    problem:
      "Educational video content is difficult to search and navigate.",
    solution:
      "Built a Retrieval-Augmented Generation system that transforms videos into an intelligent learning assistant using transcripts, embeddings, and semantic search.",
    impact:
      "Allows users to obtain precise answers with timestamp references.",
    features: [
      "Whisper transcript extraction",
      "Semantic search",
      "Timestamp-aware retrieval",
      "Embedding-based retrieval",
      "LLM-powered answers",
    ],
    tech: ["Python", "Flask", "React", "Whisper", "Sentence Transformers"],
    github: "https://github.com/sahilkhn-03/Rag-Ai-Agent",
  },
  {
    id: "slm-debug",
    no: "04",
    title: "Efficient Code Debugging & Simplification",
    badge: "Research · Lightweight LM",
    problem:
      "Large language models are expensive for narrow debugging tasks.",
    solution:
      "Research-oriented lightweight language model inspired by BDH architecture focused on debugging, simplification, retrieval grounding, and reliability.",
    impact:
      "Demonstrates efficient code-centric reasoning using compact architectures.",
    features: [
      "Lightweight architecture",
      "Code debugging workflows",
      "Code simplification",
      "Retrieval grounding",
      "Reliability verification",
    ],
    tech: ["Python", "PyTorch", "Transformers", "NLP", "Knowledge Distillation"],
    github: "https://github.com/sahilkhn-03/Mini-Project",
  },
  {
    id: "phishing-ml",
    no: "05",
    title: "Phishing Website Detection",
    badge: "End-to-end ML pipeline",
    problem: "Users struggle to identify malicious websites.",
    solution:
      "Built an end-to-end machine learning pipeline for phishing detection including preprocessing, validation, feature engineering, training, and deployment.",
    impact:
      "Automates detection of suspicious websites using ML workflows.",
    features: [
      "Automated data pipeline",
      "Validation workflows",
      "Feature engineering",
      "ML model training",
      "FastAPI deployment",
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "MongoDB", "FastAPI"],
    github: "https://github.com/sahilkhn-03/networksecurity",
  },
];

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-12 gap-3 items-baseline">
      <div className="col-span-12 sm:col-span-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa]">
        {label}
      </div>
      <div className="col-span-12 sm:col-span-10 text-[13.5px] leading-[1.7] text-[#cbd5e1]">
        {children}
      </div>
    </div>
  );
}

function ProjectRow({ p, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.li
      data-testid={`project-card-${p.id}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/[0.06] group relative"
    >
      {/* hover spotlight */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 220px at 80% 0%, rgba(139,92,246,0.10), transparent 60%)",
        }}
      />
      <div className="py-5 sm:py-6 relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10.5px] tracking-[0.18em] text-[#64748b] mb-1.5">
              P · {p.no}
            </div>
            <button
              data-testid={`project-expand-${p.id}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={`project-details-${p.id}`}
              className="text-left"
            >
              <h3 className="font-display text-[clamp(1.15rem,2.1vw,1.55rem)] tracking-tight text-white leading-tight transition-colors group-hover:text-[#e7e5f0]">
                {p.title}
              </h3>
              {p.badge && (
                <div className="mt-1 text-[11.5px] font-mono tracking-[0.04em] text-[#a78bfa]">
                  {p.badge}
                </div>
              )}
            </button>

            <div className="mt-3 space-y-1.5 max-w-3xl">
              <Row label="Problem">{p.problem}</Row>
              <Row label="Solution">{p.solution}</Row>
              <Row label="Impact">{p.impact}</Row>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            data-testid={`project-github-${p.id}`}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !py-1.5 !px-3 !text-[12px]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub
          </a>
          <button
            data-testid={`project-toggle-${p.id}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`project-details-${p.id}`}
            className="btn-ghost !py-1.5 !px-3 !text-[12px]"
          >
            {open ? "Hide details" : "Project Details"}
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              id={`project-details-${p.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5 max-w-3xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] mb-2">
                  Key Features
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-[#cbd5e1] mb-5">
                  {p.features.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-[#a78bfa]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748b] mb-2">
                  Tech
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Projects
            </div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">Things I've </span>
              <span className="font-serif-italic text-grad-indigo">built</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>
          </div>
        </div>

        <ul className="mt-8 border-b border-white/[0.06]">
          {PROJECTS.map((p, i) => (
            <ProjectRow p={p} index={i} key={p.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
