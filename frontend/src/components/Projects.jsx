import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "hackquest25",
    no: "01",
    title: "HackQuest25 — Public Alert System",
    badge: "HackQuest 2025 winning project",
    summary:
      "A real-time emergency alert platform using ML-powered announcement detection, geofencing, WebSockets, and haptic feedback to deliver location-aware public safety alerts.",
    tech: ["Node.js", "Express", "Supabase", "WebSockets", "JavaScript"],
    github: "https://github.com/sahilkhn-03/HackQuest25",
    highlights: [
      "Real-time alert delivery",
      "Geofencing support",
      "WebSocket communication",
      "ML announcement detection",
      "Haptic emergency notifications",
    ],
  },
  {
    id: "orchestratex",
    no: "02",
    title: "OrchestrateX",
    badge: "Multi-model AI orchestration",
    summary:
      "Advanced multi-model AI orchestration platform that routes prompts to the most suitable LLM and improves response quality through automated critique, evaluation, and refinement workflows.",
    tech: ["Python", "LLMs", "Prompt Engineering", "AI Agents"],
    github: "https://github.com/sahilkhn-03/OrchestrateX",
    highlights: [
      "Multi-model routing",
      "Response refinement",
      "Model collaboration",
      "Evaluation pipelines",
      "Intelligent orchestration",
    ],
  },
  {
    id: "rag-ai-agent",
    no: "03",
    title: "RAG AI Agent",
    badge: "Retrieval · Whisper · Embeddings",
    summary:
      "Retrieval-Augmented Generation platform that transforms educational video content into an intelligent learning assistant using semantic search, embeddings, transcript processing, and timestamp-aware responses.",
    tech: ["Python", "Flask", "React", "Whisper", "Sentence Transformers", "Scikit-Learn"],
    github: "https://github.com/sahilkhn-03/Rag-Ai-Agent",
    highlights: [
      "Whisper transcript extraction",
      "Semantic search",
      "Timestamp retrieval",
      "Embedding-based retrieval",
      "LLM-powered answers",
    ],
  },
  {
    id: "slm-debug",
    no: "04",
    title: "Efficient Code Debugging & Simplification",
    badge: "Research · Lightweight LM",
    summary:
      "Research-oriented lightweight language model project inspired by BDH architecture focused on code debugging, simplification, retrieval grounding, and reliability-focused generation.",
    tech: ["Python", "PyTorch", "Transformers", "NLP", "Knowledge Distillation"],
    github: "https://github.com/sahilkhn-03/Mini-Project",
    highlights: [
      "Lightweight architecture",
      "Code debugging",
      "Code simplification",
      "Retrieval grounding",
      "Reliability verification pipeline",
    ],
  },
  {
    id: "phishing-ml",
    no: "05",
    title: "Phishing Website Detection",
    badge: "End-to-end ML pipeline",
    summary:
      "End-to-end machine learning pipeline for phishing website detection using automated preprocessing, validation, feature engineering, model training, and deployment workflows.",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "MongoDB"],
    github: "https://github.com/sahilkhn-03/networksecurity",
    highlights: [
      "Automated data pipeline",
      "Validation workflows",
      "Feature engineering",
      "ML model training",
      "FastAPI deployment",
    ],
  },
];

function ProjectRow({ p, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li
      data-testid={`project-card-${p.id}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/[0.07] group"
    >
      <div className="py-5 sm:py-6 grid grid-cols-12 gap-3 sm:gap-6 items-start">
        <div className="col-span-2 sm:col-span-1 font-mono text-[11px] tracking-[0.18em] text-[#5e6776] pt-1">
          P · {p.no}
        </div>

        <div className="col-span-10 sm:col-span-8 md:col-span-9">
          <button
            data-testid={`project-expand-${p.id}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`project-details-${p.id}`}
            className="text-left w-full"
          >
            <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] tracking-tight text-white leading-tight transition-colors group-hover:text-[#cfd6e2]">
              {p.title}
            </h3>
            {p.badge && (
              <div className="mt-1 text-[11.5px] font-mono tracking-[0.04em] text-[#60a5fa]">
                {p.badge}
              </div>
            )}
            <div className="mt-1.5 text-[13.5px] text-[#9aa3b2] max-w-2xl leading-relaxed">
              {p.summary}
            </div>
          </button>
        </div>

        <div className="col-span-12 sm:col-span-3 md:col-span-2 flex sm:justify-end items-start gap-2">
          <a
            data-testid={`project-github-${p.id}`}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.title} on GitHub`}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-[#cfd6e2] hover:bg-white/[0.08] hover:border-white/25 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Collapse" : "Expand"}
            aria-expanded={open}
            aria-controls={`project-details-${p.id}`}
            data-testid={`project-toggle-${p.id}`}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#3b82f6]/40 transition-all"
            style={{ color: "#60a5fa" }}
          >
            <motion.svg
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          </button>
        </div>
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
            <div className="pb-6 grid grid-cols-12 gap-3 sm:gap-6">
              <div className="hidden sm:block col-span-1" />
              <div className="col-span-12 sm:col-span-11">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#60a5fa] mb-2">
                  Key Features
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-[#b3bccc] max-w-3xl">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-[#60a5fa]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-20 sm:py-24"
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
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.85rem,4.2vw,2.9rem)] leading-[1.05] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">Things I've </span>
              <span className="font-serif-italic text-grad-blue">built</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>
          </div>
        </div>

        <ul className="mt-10 border-b border-white/[0.07]">
          {PROJECTS.map((p, i) => (
            <ProjectRow p={p} index={i} key={p.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
