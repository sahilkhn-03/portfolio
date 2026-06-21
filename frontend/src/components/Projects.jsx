import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "hackquest25",
    no: "01",
    title: "HackQuest25",
    badge: "1st place · 24-hr hackathon",
    summary: "Intelligent public alert system — real-time, ML-driven safety",
    description:
      "Real-time emergency alert platform using ML-powered announcement detection, geofencing, WebSockets and haptic feedback to deliver location-aware public safety alerts.",
    tech: ["React", "Node.js", "Express", "Supabase", "WebSockets", "Firebase", "Google Cloud Run"],
    github: "https://github.com/sahilkhn-03/HackQuest25",
    highlights: [
      "Real-time emergency notifications",
      "ML-powered announcement detection",
      "Geofencing-based alert delivery",
      "WebSocket live communication",
      "Haptic feedback alerts",
      "Progressive Web App support",
      "QR onboarding workflow",
      "Cross-platform accessibility",
    ],
  },
  {
    id: "orchestratex",
    no: "02",
    title: "OrchestrateX",
    badge: "Multi-model LLM orchestration",
    summary: "Multi-Model AI orchestration platform",
    description:
      "Advanced orchestration system that dynamically selects the best LLM and improves quality through multi-model collaboration, critique, evaluation and refinement workflows.",
    tech: ["Python", "FastAPI", "LLMs", "AI Agents", "Prompt Engineering", "React"],
    github: "https://github.com/sahilkhn-03",
    highlights: [
      "Dynamic model selection",
      "Multi-model collaboration",
      "Critique-and-refinement loops",
      "Intelligent response evaluation",
      "Real-time orchestration engine",
      "Quality scoring workflows",
      "Agent-based reasoning pipelines",
      "Modern AI control dashboard",
    ],
  },
  {
    id: "rag-ai-agent",
    no: "03",
    title: "RAG AI Agent",
    badge: "Retrieval · Whisper · Embeddings",
    summary: "Educational video intelligence system",
    description:
      "Retrieval-Augmented Generation platform that converts educational video content into a searchable AI learning assistant with transcript extraction, semantic search and timestamp-aware responses.",
    tech: ["Python", "Flask", "React", "Whisper", "Sentence Transformers", "Scikit-Learn", "NumPy"],
    github: "https://github.com/sahilkhn-03",
    highlights: [
      "Whisper transcription pipeline",
      "Semantic search across transcripts",
      "Timestamp-aware retrieval",
      "Context-grounded responses",
      "Educational content indexing",
      "Instant question answering",
      "Vector embedding search",
      "Responsive AI interface",
    ],
  },
  {
    id: "slm-debug",
    no: "04",
    title: "Lightweight Code Debugging SLM",
    badge: "Distillation · efficient inference",
    summary: "Efficient code debugging & simplification system",
    description:
      "Research-focused lightweight language model with a BDH-inspired architecture for debugging, simplification, retrieval-grounded reasoning and reliability-aware code generation.",
    tech: ["Python", "PyTorch", "Transformers", "Knowledge Distillation", "RAG", "NLP"],
    github: "https://github.com/sahilkhn-03",
    highlights: [
      "Lightweight language model architecture",
      "Code debugging workflows",
      "Code simplification engine",
      "Retrieval-based intent grounding",
      "Multi-layer verification pipeline",
      "Reliability-focused generation",
      "Hallucination reduction techniques",
      "Efficient inference design",
    ],
  },
  {
    id: "phishing-ml",
    no: "05",
    title: "Network Security ML Pipeline",
    badge: "Production-grade ML pipeline",
    summary: "Phishing website detection system",
    description:
      "End-to-end machine learning pipeline for phishing website detection with automated ingestion, validation, transformation, experiment tracking, model management and API-based prediction.",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "FastAPI", "MLflow", "MongoDB"],
    github: "https://github.com/sahilkhn-03",
    highlights: [
      "Automated data ingestion",
      "Data validation workflows",
      "Feature engineering pipeline",
      "Experiment tracking",
      "Model version management",
      "Data drift monitoring",
      "API-based prediction service",
      "Production-oriented ML architecture",
    ],
  },
];

function ProjectRow({ p, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li
      data-testid={`project-card-${p.id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/[0.07] group"
    >
      <div className="py-7 sm:py-8 grid grid-cols-12 gap-4 sm:gap-8 items-start">
        <div className="col-span-2 sm:col-span-1 font-mono text-[11px] tracking-[0.18em] text-[#5e6776] pt-1.5">
          P · {p.no}
        </div>

        <div className="col-span-10 sm:col-span-8 md:col-span-9">
          <button
            data-testid={`project-expand-${p.id}`}
            onClick={() => setOpen((v) => !v)}
            className="text-left w-full"
          >
            <h3 className="font-display text-[clamp(1.4rem,2.6vw,1.95rem)] tracking-tight text-white leading-tight transition-colors group-hover:text-[#cfd6e2]">
              {p.title}
            </h3>
            {p.badge && (
              <div className="mt-1.5 text-[12px] font-mono tracking-[0.04em] text-[#7dafff]">
                {p.badge}
              </div>
            )}
            <div className="mt-2 text-[14.5px] text-[#9aa3b2] max-w-2xl">
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
            data-testid={`project-toggle-${p.id}`}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#4f8cff]/40 transition-all"
            style={{ color: "#7dafff" }}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 grid grid-cols-12 gap-4 sm:gap-8">
              <div className="hidden sm:block col-span-1" />
              <div className="col-span-12 sm:col-span-11">
                <p className="text-[14.5px] leading-[1.75] text-[#a8b0bf] max-w-2xl">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7dd3fc] mb-2.5">
                  Key Features
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13.5px] text-[#b3bccc] max-w-3xl">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-[#7dafff]" />
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
      className="relative py-28 sm:py-36"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
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
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">Things I've </span>
              <span className="font-serif-italic text-grad-blue">built</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>
          </div>
        </div>

        <ul className="mt-14 border-b border-white/[0.07]">
          {PROJECTS.map((p, i) => (
            <ProjectRow p={p} index={i} key={p.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
