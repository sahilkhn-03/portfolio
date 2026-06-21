import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium tracking-[-0.005em] text-white whitespace-nowrap ${
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
    <div className="flex justify-center" aria-hidden>
      <svg width="20" height="14" viewBox="0 0 20 14" className="overflow-visible">
        <defs>
          <linearGradient id="fa-line" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0)" />
            <stop offset="50%" stopColor="rgba(167,139,250,0.55)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0)" />
          </linearGradient>
        </defs>
        <line x1="10" y1="0" x2="10" y2="14" stroke="url(#fa-line)" strokeWidth="1.3" />
        <path d="M7 9 L10 13 L13 9" stroke="rgba(167,139,250,0.6)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="2" fill="#a78bfa">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M10,-2 L10,13" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function FlowDiagram({ nodes }) {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-1">
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
function HubDiagram({ center, spokes, layers = [], compact = false }) {
  // canonical positions for up to 5 spokes around the center
  const layouts = {
    4: [
      { left: "8%", top: "6%" },
      { right: "8%", top: "6%" },
      { left: "8%", bottom: "30%" },
      { right: "8%", bottom: "30%" },
    ],
    5: compact
      ? [
          { left: "50%", top: "0%", translate: "-50%, 0" },
          { left: "4%", top: "32%" },
          { right: "4%", top: "32%" },
          { left: "12%", bottom: "8%" },
          { right: "12%", bottom: "8%" },
        ]
      : [
          { left: "50%", top: "0%", translate: "-50%, 0" },
          { left: "6%", top: "22%" },
          { right: "6%", top: "22%" },
          { left: "16%", bottom: "30%" },
          { right: "16%", bottom: "30%" },
        ],
  };
  const positions = layouts[spokes.length] || layouts[4];
  const heightClass = compact ? "h-[240px] sm:h-[260px]" : "h-[360px] sm:h-[400px]";

  return (
    <div className={`relative w-full max-w-md mx-auto ${heightClass}`}>
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
          const endPoints = {
            5: compact
              ? [
                  [200, 20],
                  [30, 150],
                  [370, 150],
                  [70, 360],
                  [330, 360],
                ]
              : [
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
              y1={compact ? "210" : "185"}
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
        style={{ left: "50%", top: compact ? "52%" : "44%", transform: "translate(-50%, -50%)" }}
      >
        <Node label={center} intent="primary" emphasis />
      </div>

      {/* pulse ring on center */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: "50%", top: compact ? "52%" : "44%", transform: "translate(-50%, -50%)" }}
      >
        <span
          className="block rounded-full"
          style={{
            width: 80,
            height: 80,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.22), transparent 65%)",
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
    <div className="relative rounded-2xl p-4 sm:p-5 overflow-hidden"
         style={{
           background: "linear-gradient(180deg, rgba(20,20,30,0.55) 0%, rgba(10,10,18,0.7) 100%)",
           border: "1px solid rgba(255,255,255,0.07)",
           boxShadow: "0 20px 40px -28px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
         }}>
      {/* ambient glow */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(79,70,229,0.10), transparent 70%), radial-gradient(50% 50% at 50% 100%, rgba(167,139,250,0.08), transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#a78bfa] mb-1">
          {arch.title || "Architecture"}
        </div>
        {arch.subtitle && (
          <div className="text-[11.5px] text-[#94a3b8] leading-snug mb-3 max-w-[34ch]">
            {arch.subtitle}
          </div>
        )}
        {arch.type === "network" ? (
          <NetworkDiagram arch={arch} />
        ) : arch.type === "flow" ? (
          <FlowDiagram nodes={arch.nodes} />
        ) : (
          <HubDiagram {...arch} />
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Network diagram — modules orbiting a knowledge engine, animated flows
 * ------------------------------------------------------------------------- */

function NetworkDiagram({ arch }) {
  const [active, setActive] = useState(null);
  const nodes = arch.nodes;
  const edges = arch.edges;

  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const isEdgeActive = (e) => active && (e[0] === active || e[1] === active);

  const activeNode = active ? nodeById[active] : null;

  return (
    <div className="relative w-full max-w-md mx-auto h-[360px] sm:h-[380px]">
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="net-line" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0.55)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.08)" />
          </linearGradient>
        </defs>
        {edges.map(([fromId, toId], i) => {
          const a = nodeById[fromId];
          const b = nodeById[toId];
          if (!a || !b) return null;
          const activeE = isEdgeActive([fromId, toId]);
          const pathId = `nedge-${fromId}-${toId}`;
          // gentle curve via control point offset perpendicular to the segment
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const cx = mx + (-dy / len) * 14;
          const cy = my + (dx / len) * 14;
          const d = `M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`;
          return (
            <g key={i}>
              <path
                id={pathId}
                d={d}
                stroke={activeE ? "rgba(167,139,250,0.95)" : "url(#net-line)"}
                strokeWidth={activeE ? 1.4 : 0.9}
                strokeDasharray={activeE ? "0" : "3 5"}
                fill="none"
                style={{ transition: "stroke 0.25s ease, stroke-width 0.25s ease" }}
              >
                {!activeE && (
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-16"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.18}s`}
                  />
                )}
              </path>
              <circle r="1.8" fill="#a78bfa" opacity={activeE ? 1 : 0.85}>
                <animateMotion dur={`${3 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 2}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur={`${3 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 2}s`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* center pulse */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <span
          className="block rounded-full"
          style={{
            width: 84,
            height: 84,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.18), transparent 65%)",
            filter: "blur(10px)",
            animation: "pulseRing 3.4s ease-in-out infinite",
          }}
        />
      </div>

      {/* nodes */}
      {nodes.map((n) => {
        const isActive = active === n.id;
        const intent = n.center ? "primary" : "default";
        return (
          <button
            key={n.id}
            type="button"
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            className="absolute group focus:outline-none"
            style={{
              left: `${(n.x / 400) * 100}%`,
              top: `${(n.y / 400) * 100}%`,
              transform: "translate(-50%, -50%)",
              transition: "filter 0.25s ease",
              filter: isActive ? "drop-shadow(0 0 10px rgba(167,139,250,0.45))" : "none",
            }}
          >
            <Node
              label={n.label}
              intent={n.center ? "primary" : isActive ? "accent" : intent}
              emphasis={n.center || isActive}
            />
          </button>
        );
      })}

      {/* hover tooltip */}
      {activeNode?.desc && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            left: `${(activeNode.x / 400) * 100}%`,
            top: `${(activeNode.y / 400) * 100 + 6}%`,
            transform: "translate(-50%, 0)",
          }}
        >
          <div
            className="mt-2 px-2.5 py-1.5 rounded-md text-[10.5px] leading-snug max-w-[180px] text-center text-[#cbd5e1]"
            style={{
              background: "rgba(20,18,38,0.92)",
              border: "1px solid rgba(167,139,250,0.32)",
              boxShadow: "0 8px 22px -10px rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            {activeNode.desc}
          </div>
        </div>
      )}

      <style>{`@keyframes pulseRing { 0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1) } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.18) } }`}</style>
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
      type: "network",
      title: "RAG Knowledge Pipeline",
      subtitle:
        "Retrieval-Augmented Generation system for educational content search and question answering.",
      nodes: [
        // Center
        { id: "engine", label: "Knowledge Engine", x: 200, y: 200, center: true, desc: "Central orchestrator coordinating ingestion, retrieval and generation." },
        // Left column — ingestion
        { id: "video", label: "Video Sources", x: 60, y: 80, desc: "Educational video inputs ingested into the pipeline." },
        { id: "whisper", label: "Whisper STT", x: 50, y: 200, desc: "Speech-to-text transcription with Whisper." },
        { id: "transcript", label: "Transcript Processing", x: 70, y: 320, desc: "Cleans, chunks and timestamps transcripts." },
        // Top row — embedding + storage
        { id: "embed", label: "Embedding Service", x: 150, y: 50, desc: "Generates dense vector embeddings for each chunk." },
        { id: "vector", label: "Vector Database", x: 260, y: 50, desc: "Stores embeddings for fast similarity search." },
        // Right column — retrieval
        { id: "retriever", label: "Retriever", x: 340, y: 140, desc: "Performs semantic + timestamp-aware retrieval." },
        { id: "context", label: "Context Builder", x: 350, y: 260, desc: "Assembles top-k chunks into prompt context." },
        // Bottom row — generation
        { id: "llm", label: "LLM", x: 150, y: 360, desc: "Reasoning model grounded on retrieved context." },
        { id: "response", label: "Response Generator", x: 260, y: 360, desc: "Formats final answer with citations + timestamps." },
      ],
      edges: [
        // ingestion → engine
        ["video", "whisper"],
        ["whisper", "transcript"],
        ["transcript", "engine"],
        // engine → indexing
        ["engine", "embed"],
        ["embed", "vector"],
        ["vector", "engine"],
        // engine → retrieval
        ["engine", "retriever"],
        ["retriever", "context"],
        ["context", "engine"],
        // engine → generation
        ["engine", "llm"],
        ["llm", "response"],
        ["response", "engine"],
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
      compact: true,
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
  const [open, setOpen] = useState(false);
  const reverse = index % 2 === 1;

  const text = (
    <div className="lg:w-1/2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-xl"
      >
        <div className="sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] pt-0.5">Problem</div>
        <div className="sm:col-span-9 text-[14px] leading-[1.7] text-[#cbd5e1]">{p.problem}</div>

        <div className="sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] pt-0.5">Solution</div>
        <div className="sm:col-span-9 text-[14px] leading-[1.7] text-[#cbd5e1]">{p.solution}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14 }}
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
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <Architecture arch={p.arch} />
      </motion.div>
    </div>
  );

  return (
    <article
      data-testid={`project-card-${p.id}`}
      className="relative border-t border-white/[0.07] first:border-t-0"
    >
      {/* Collapsed header — always visible, click toggles */}
      <button
        data-testid={`project-toggle-${p.id}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`project-details-${p.id}`}
        className="w-full text-left py-6 sm:py-7 group transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#a78bfa]">
              P · {p.no}
            </div>
            <h3
              className="font-display mt-2 text-white tracking-[-0.025em] leading-[1.1] text-[clamp(1.4rem,2.4vw,1.85rem)] transition-colors group-hover:text-[#e7e5f0]"
              style={{ fontWeight: 700 }}
            >
              {p.name}
            </h3>
            {p.badge && (
              <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.06em] uppercase px-2 py-0.5 rounded-full"
                   style={{ background: "rgba(255,206,107,0.08)", color: "#ffce6b", border: "1px solid rgba(255,206,107,0.22)" }}>
                ★ {p.badge}
              </div>
            )}
            <p className="mt-2.5 text-[14.5px] leading-[1.65] text-[#94a3b8] max-w-xl">
              {p.tagline}
            </p>
          </div>

          {/* Chevron toggle */}
          <span
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all"
            style={{
              borderColor: open ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.10)",
              background: open ? "rgba(167,139,250,0.10)" : "rgba(255,255,255,0.03)",
              color: "#a78bfa",
            }}
          >
            <motion.svg
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          </span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={`project-details-${p.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className={`pb-10 sm:pb-14 flex flex-col gap-10 lg:gap-14 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-start`}
            >
              {text}
              {diagram}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
              className="font-display text-white tracking-[-0.035em] leading-[1.04] text-[clamp(2rem,4.4vw,3.2rem)]"
              style={{ fontWeight: 800 }}
            >
              Projects
            </motion.h2>
          </div>
        </div>

        <div className="mt-10 border-b border-white/[0.07]">
          {PROJECTS.map((p, i) => (
            <ProjectShowcase p={p} index={i} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
