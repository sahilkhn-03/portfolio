import { motion } from "framer-motion";

/* ---------------------------------------------------------------------------
 * Architecture primitives — pure SVG / CSS, no images
 * ------------------------------------------------------------------------- */

function Node({ label, intent = "default", emphasis = false }) {
  const palette = {
    default: { bg: "rgba(20,20,30,0.86)", border: "rgba(255,255,255,0.10)" },
    primary: { bg: "rgba(79,70,229,0.18)", border: "rgba(99,102,241,0.45)" },
    accent: { bg: "rgba(167,139,250,0.14)", border: "rgba(167,139,250,0.42)" },
  };
  const p = palette[intent] || palette.default;
  return (
    <div
      className={`relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12.5px] font-medium tracking-[-0.005em] text-white whitespace-nowrap ${
        emphasis ? "shadow-[0_0_24px_-4px_rgba(167,139,250,0.55)]" : ""
      }`}
      style={{
        background: p.bg,
        border: `1px solid ${p.border}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{
          background:
            intent === "primary" || emphasis ? "#a78bfa" : "rgba(255,255,255,0.5)",
          boxShadow:
            intent === "primary" || emphasis
              ? "0 0 8px rgba(167,139,250,0.9)"
              : "none",
        }}
      />
      <span>{label}</span>
    </div>
  );
}

/** Animated vertical arrow between flow nodes with a violet traveling dot. */
function FlowArrow() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden>
      <svg width="24" height="26" viewBox="0 0 24 26" className="overflow-visible">
        <defs>
          <linearGradient id="fa-line" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0)" />
            <stop offset="50%" stopColor="rgba(167,139,250,0.55)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0)" />
          </linearGradient>
        </defs>
        <line x1="12" y1="0" x2="12" y2="26" stroke="url(#fa-line)" strokeWidth="1.4" />
        <path d="M8 19 L12 24 L16 19" stroke="rgba(167,139,250,0.6)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="2.4" fill="#a78bfa">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M12,-2 L12,24" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function FlowDiagram({ nodes }) {
  return (
    <div className="relative w-full max-w-md mx-auto py-2">
      <div className="flex flex-col items-center">
        {nodes.map((n, i) => (
          <div key={`${n}-${i}`} className="w-full flex flex-col items-center">
            <Node label={n} intent={i === 0 || i === nodes.length - 1 ? "primary" : "default"} />
            {i < nodes.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hub-and-spoke radial diagram. Center node + spokes positioned around. */
function HubDiagram({ center, spokes, layers = [] }) {
  // canonical positions for up to 5 spokes around the center
  const layouts = {
    4: [
      { left: "8%", top: "6%" },
      { right: "8%", top: "6%" },
      { left: "8%", bottom: "30%" },
      { right: "8%", bottom: "30%" },
    ],
    5: [
      { left: "50%", top: "0%", translate: "-50%, 0" },
      { left: "6%", top: "22%" },
      { right: "6%", top: "22%" },
      { left: "16%", bottom: "30%" },
      { right: "16%", bottom: "30%" },
    ],
  };
  const positions = layouts[spokes.length] || layouts[4];

  return (
    <div className="relative w-full max-w-md mx-auto h-[360px] sm:h-[400px]">
      {/* SVG lines from center to each spoke */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hub-line" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0.55)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.05)" />
          </linearGradient>
        </defs>
        {positions.map((_, i) => {
          // Approximate end points (matches CSS percentages roughly)
          const endPoints = {
            5: [
              [200, 30],
              [40, 110],
              [360, 110],
              [80, 320],
              [320, 320],
            ],
            4: [
              [60, 50],
              [340, 50],
              [60, 300],
              [340, 300],
            ],
          };
          const [ex, ey] = (endPoints[spokes.length] || endPoints[4])[i];
          return (
            <line
              key={i}
              x1="200"
              y1="185"
              x2={ex}
              y2={ey}
              stroke="url(#hub-line)"
              strokeWidth="1"
              strokeDasharray="3 5"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-16"
                dur="2.6s"
                repeatCount="indefinite"
                begin={`${i * 0.18}s`}
              />
            </line>
          );
        })}
      </svg>

      {/* center node */}
      <div
        className="absolute"
        style={{ left: "50%", top: "44%", transform: "translate(-50%, -50%)" }}
      >
        <Node label={center} intent="primary" emphasis />
      </div>

      {/* pulse ring on center */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: "50%", top: "44%", transform: "translate(-50%, -50%)" }}
      >
        <span
          className="block rounded-full"
          style={{
            width: 96,
            height: 96,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.28), transparent 65%)",
            filter: "blur(14px)",
            animation: "pulseRing 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* spokes */}
      {spokes.map((s, i) => {
        const pos = positions[i] || {};
        const baseTransform = pos.translate ? `translate(${pos.translate})` : "";
        return (
          <div
            key={s}
            className="absolute"
            style={{
              left: pos.left,
              right: pos.right,
              top: pos.top,
              bottom: pos.bottom,
              transform: baseTransform,
            }}
          >
            <Node label={s} intent="accent" />
          </div>
        );
      })}

      {/* bottom layer stack */}
      {layers.length > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-1.5"
          style={{ width: "100%" }}
        >
          {layers.map((l) => (
            <Node key={l} label={l} />
          ))}
        </div>
      )}

      <style>{`@keyframes pulseRing { 0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1) } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.18) } }`}</style>
    </div>
  );
}

function Architecture({ arch }) {
  return (
    <div className="relative rounded-2xl p-5 sm:p-6 overflow-hidden"
         style={{
           background: "linear-gradient(180deg, rgba(20,20,30,0.55) 0%, rgba(10,10,18,0.7) 100%)",
           border: "1px solid rgba(255,255,255,0.07)",
           boxShadow: "0 30px 60px -28px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
         }}>
      {/* ambient glow */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(79,70,229,0.18), transparent 70%), radial-gradient(50% 50% at 50% 100%, rgba(167,139,250,0.16), transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#a78bfa] mb-4">
          Architecture
        </div>
        {arch.type === "flow" ? (
          <FlowDiagram nodes={arch.nodes} />
        ) : (
          <HubDiagram {...arch} />
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Project data
 * ------------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "rag-ai-agent",
    no: "01",
    name: "RAG AI Agent",
    tagline: "AI-powered learning assistant built from educational video content.",
    problem:
      "Students waste time searching through long educational videos and transcripts.",
    solution:
      "Transform video content into an intelligent retrieval system capable of semantic search, timestamp retrieval, and contextual answers.",
    highlights: [
      "Whisper transcript extraction",
      "Embedding generation",
      "Vector retrieval",
      "Semantic search",
      "Timestamp-aware responses",
      "LLM answer generation",
    ],
    github: "https://github.com/sahilkhn-03/Rag-Ai-Agent",
    live: "https://github.com/sahilkhn-03/Rag-Ai-Agent",
    arch: {
      type: "flow",
      nodes: [
        "Video",
        "Whisper",
        "Transcript Processing",
        "Embeddings",
        "Vector Search",
        "Retriever",
        "LLM",
        "Response",
      ],
    },
  },
  {
    id: "orchestratex",
    no: "02",
    name: "OrchestrateX",
    tagline: "Multi-model AI orchestration platform.",
    problem:
      "Different models excel at different tasks, causing inconsistent output quality.",
    solution:
      "Route requests through multiple models and refine outputs using automated evaluation pipelines.",
    highlights: [
      "Multi-model routing",
      "Automated critique",
      "Response refinement",
      "Evaluation pipelines",
      "Intelligent orchestration",
    ],
    github: "https://github.com/sahilkhn-03/OrchestrateX",
    live: "https://github.com/sahilkhn-03/OrchestrateX",
    arch: {
      type: "hub",
      center: "Orchestrator",
      spokes: ["GPT", "Claude", "Gemini", "DeepSeek"],
      layers: ["Evaluation Layer", "Refinement Layer"],
    },
  },
  {
    id: "hackquest25",
    no: "03",
    name: "HackQuest25 — International Hackathon Award Winner",
    tagline: "Award-winning real-time public safety alert platform.",
    problem:
      "Critical emergency announcements often fail to reach nearby people instantly.",
    solution:
      "Location-aware emergency delivery system using geofencing, ML-powered announcement detection, and real-time notifications.",
    highlights: [
      "Geofencing",
      "WebSocket communication",
      "Real-time alerts",
      "ML announcement detection",
      "Emergency notification engine",
      "International hackathon award-winning solution",
    ],
    github: "https://github.com/sahilkhn-03/HackQuest25",
    live: "https://github.com/sahilkhn-03/HackQuest25",
    badge: "Winner · HackQuest 2025",
    arch: {
      type: "hub",
      center: "Alert Engine",
      spokes: ["Users", "Geo Zones", "Emergency Services", "Notification Layer", "ML Detection"],
    },
  },
  {
    id: "phishing-ml",
    no: "04",
    name: "Phishing Website Detection",
    tagline: "Machine learning powered phishing detection platform.",
    problem:
      "Users struggle to identify malicious websites before interaction.",
    solution:
      "Automated machine learning pipeline that validates data, engineers features, trains models, and serves predictions.",
    highlights: [
      "Data validation",
      "Feature engineering",
      "Model training",
      "Prediction pipeline",
      "Deployment workflow",
    ],
    github: "https://github.com/sahilkhn-03/networksecurity",
    live: "https://github.com/sahilkhn-03/networksecurity",
    arch: {
      type: "flow",
      nodes: [
        "Raw Data",
        "Validation",
        "Feature Engineering",
        "Training",
        "Prediction",
        "Deployment",
      ],
    },
  },
  {
    id: "slm-edge",
    no: "05",
    name: "Lightweight Edge SLM",
    tagline: "Research-driven lightweight language model for edge environments.",
    problem:
      "Large language models require significant compute and memory resources.",
    solution:
      "Design a compact language model architecture focused on efficient inference, code reasoning, retrieval grounding, and reliability.",
    highlights: [
      "Lightweight architecture",
      "Retrieval grounding",
      "Efficient inference",
      "Code understanding",
      "Reliability verification",
    ],
    github: "https://github.com/sahilkhn-03/Mini-Project",
    arch: {
      type: "flow",
      nodes: [
        "Input",
        "Retriever",
        "SLM Core",
        "Reasoning Layer",
        "Verification Layer",
        "Output",
      ],
    },
  },
];

/* ---------------------------------------------------------------------------
 * Showcase row
 * ------------------------------------------------------------------------- */

function ShowcaseLink({ href, primary, label, testId }) {
  if (!href) return null;
  return (
    <a
      data-testid={testId}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={primary ? "btn-primary !py-2 !px-3.5 !text-[12.5px]" : "btn-ghost !py-2 !px-3.5 !text-[12.5px]"}
    >
      {label}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function ProjectShowcase({ p, index }) {
  const reverse = index % 2 === 1;

  const text = (
    <div className="lg:w-1/2">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#a78bfa]">
          P · {p.no}
        </div>
        <h3 className="font-display mt-3 text-white tracking-[-0.025em] leading-[1.1] text-[clamp(1.5rem,2.5vw,1.95rem)]" style={{ fontWeight: 700 }}>
          {p.name}
        </h3>
        {p.badge && (
          <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.06em] uppercase px-2 py-0.5 rounded-full"
               style={{ background: "rgba(255,206,107,0.08)", color: "#ffce6b", border: "1px solid rgba(255,206,107,0.22)" }}>
            ★ {p.badge}
          </div>
        )}
        <p className="mt-3 text-[15px] leading-[1.65] text-[#cbd5e1] max-w-xl">
          {p.tagline}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-xl"
      >
        <div className="sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] pt-0.5">Problem</div>
        <div className="sm:col-span-9 text-[14px] leading-[1.7] text-[#cbd5e1]">{p.problem}</div>

        <div className="sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] pt-0.5">Solution</div>
        <div className="sm:col-span-9 text-[14px] leading-[1.7] text-[#cbd5e1]">{p.solution}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="mt-6 max-w-xl"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] mb-2">
          Engineering Highlights
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 text-[13.5px] text-[#cbd5e1]">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-[#a78bfa]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.22 }}
        className="mt-7 flex flex-wrap items-center gap-2"
      >
        {p.live && (
          <ShowcaseLink
            href={p.live}
            primary
            label="Visit Live"
            testId={`project-live-${p.id}`}
          />
        )}
        <ShowcaseLink
          href={p.github}
          primary={!p.live}
          label="GitHub"
          testId={`project-github-${p.id}`}
        />
      </motion.div>
    </div>
  );

  const diagram = (
    <div className="lg:w-1/2 w-full">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <Architecture arch={p.arch} />
      </motion.div>
    </div>
  );

  return (
    <article
      data-testid={`project-card-${p.id}`}
      className="relative py-16 sm:py-20"
    >
      {/* divider between projects */}
      {index > 0 && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />
      )}

      <div
        className={`flex flex-col gap-10 lg:gap-14 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-start`}
      >
        {text}
        {diagram}
      </div>
    </article>
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
              className="font-display text-white tracking-[-0.035em] leading-[1.04] text-[clamp(2rem,4.4vw,3.2rem)] max-w-[16ch]"
              style={{ fontWeight: 800 }}
            >
              Selected engineering case studies.
            </motion.h2>
          </div>
        </div>

        <div className="mt-6">
          {PROJECTS.map((p, i) => (
            <ProjectShowcase p={p} index={i} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
