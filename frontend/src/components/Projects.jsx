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
 * Service icons (circular nodes for production-style architecture diagrams)
 * ------------------------------------------------------------------------- */
const ICONS = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 20a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  question: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M21 12a8 8 0 11-3.4-6.55L21 4l-1 4-4 .5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 9a2.5 2.5 0 015 0c0 1.6-2.5 2-2.5 4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  knowledge: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M4 5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 3v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <rect x="3" y="6" width="14" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 10l4-2v8l-4-2v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 3v4h4M8 13h8M8 17h6M8 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  pdf: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <text x="8.5" y="17" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fontWeight="700" fill="currentColor">PDF</text>
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 2v4M12 2v4M15 2v4M9 18v4M12 18v4M15 18v4M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  llm: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M9 4a3 3 0 016 0v1a3 3 0 013 3v2a3 3 0 010 6v2a3 3 0 01-3 3 3 3 0 01-6 0 3 3 0 01-3-3v-2a3 3 0 010-6V8a3 3 0 013-3V4z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  response: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M21 12a8 8 0 11-3.4-6.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  vector: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <ellipse cx="12" cy="6" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  embed: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 7.5l3 3M16.5 7.5l-3 3M7.5 16.5l3-3M16.5 16.5l-3-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  retriever: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 14.5l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

function ServiceNode({ node, isActive }) {
  const primary = !!node.center;
  const size = primary ? "w-[52px] h-[52px]" : "w-[42px] h-[42px]";
  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <div
        className={`relative ${size} rounded-full flex items-center justify-center transition-all duration-300`}
        style={{
          background: primary
            ? "radial-gradient(circle at 30% 25%, rgba(167,139,250,0.35), rgba(79,70,229,0.16) 60%, rgba(20,18,38,0.85))"
            : "linear-gradient(180deg, rgba(20,20,30,0.92), rgba(10,10,18,0.92))",
          border: `1px solid ${
            primary
              ? "rgba(167,139,250,0.55)"
              : isActive
              ? "rgba(167,139,250,0.5)"
              : "rgba(255,255,255,0.10)"
          }`,
          color: primary || isActive ? "#cdcafa" : "#cbd5e1",
          boxShadow: primary
            ? "0 10px 26px -10px rgba(79,70,229,0.5), inset 0 1px 0 rgba(255,255,255,0.10)"
            : isActive
            ? "0 6px 18px -6px rgba(167,139,250,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 6px 14px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* primary outer pulse ring */}
        {primary && (
          <span
            aria-hidden
            className="absolute -inset-1.5 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.16), transparent 65%)",
              filter: "blur(6px)",
              animation: "pulseRing 3s ease-in-out infinite",
            }}
          />
        )}
        <span className="relative">{ICONS[node.icon] || ICONS.chip}</span>
      </div>
      <div
        className="text-[10px] sm:text-[10.5px] font-medium tracking-[-0.005em] text-white text-center whitespace-nowrap"
        style={{
          textShadow: "0 1px 0 rgba(0,0,0,0.4)",
        }}
      >
        {node.label}
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
    <div className="relative w-full max-w-md mx-auto h-[340px] sm:h-[360px]">
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="net-line" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0.5)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.06)" />
          </linearGradient>
        </defs>
        {edges.map(([fromId, toId], i) => {
          const a = nodeById[fromId];
          const b = nodeById[toId];
          if (!a || !b) return null;
          const activeE = isEdgeActive([fromId, toId]);
          const pathId = `nedge-${fromId}-${toId}`;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const cx = mx + (-dy / len) * 12;
          const cy = my + (dx / len) * 12;
          const d = `M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`;
          return (
            <g key={i}>
              <path
                id={pathId}
                d={d}
                stroke={activeE ? "rgba(167,139,250,0.95)" : "url(#net-line)"}
                strokeWidth={activeE ? 1.4 : 0.85}
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
                    begin={`${i * 0.17}s`}
                  />
                )}
              </path>
              <circle r="1.7" fill="#a78bfa" opacity={activeE ? 1 : 0.8}>
                <animateMotion dur={`${3 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 2}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur={`${3 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 2}s`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* nodes */}
      {nodes.map((n) => {
        const isActive = active === n.id;
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
              filter: isActive ? "drop-shadow(0 0 10px rgba(167,139,250,0.4))" : "none",
            }}
          >
            <ServiceNode node={n} isActive={isActive} />
          </button>
        );
      })}

      {/* hover tooltip */}
      {activeNode?.desc && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            left: `${(activeNode.x / 400) * 100}%`,
            top: `${(activeNode.y / 400) * 100 + 9}%`,
            transform: "translate(-50%, 0)",
          }}
        >
          <div
            className="mt-2 px-2.5 py-1.5 rounded-md text-[10.5px] leading-snug max-w-[200px] text-center text-[#cbd5e1]"
            style={{
              background: "rgba(20,18,38,0.94)",
              border: "1px solid rgba(167,139,250,0.32)",
              boxShadow: "0 10px 26px -12px rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            {activeNode.desc}
          </div>
        </div>
      )}

      <style>{`@keyframes pulseRing { 0%,100% { opacity: 0.5; transform: scale(1) } 50% { opacity: 1; transform: scale(1.18) } }`}</style>
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
    overview: {
      title: "Retrieval-Augmented Learning Platform",
      paragraphs: [
        "An AI-powered educational search system that transforms video lectures into a semantic knowledge layer. By combining Whisper transcription, vector retrieval, and LLM-based reasoning, the platform enables students to instantly locate concepts, explanations, and timestamps through natural language interaction.",
        "Built with a production-style RAG pipeline integrating transcript extraction, embedding generation, semantic retrieval, and contextual answer synthesis.",
      ],
    },
    arch: {
      type: "network",
      title: "Retrieval-Augmented Generation System",
      subtitle:
        "Semantic search and context-aware question answering over educational content.",
      nodes: [
        // Center
        { id: "engine", label: "RAG Engine", x: 200, y: 200, center: true, icon: "chip", desc: "Central orchestrator coordinating retrieval and generation." },
        // Left — user input
        { id: "user", label: "User", x: 50, y: 130, icon: "user", desc: "Sends questions to the assistant." },
        { id: "question", label: "Question", x: 50, y: 270, icon: "question", desc: "Natural-language query routed to the RAG engine." },
        // Top — knowledge ingestion
        { id: "kb", label: "Knowledge Base", x: 95, y: 50, icon: "knowledge", desc: "Aggregated educational corpus." },
        { id: "videos", label: "Course Videos", x: 175, y: 30, icon: "video", desc: "Lectures transcribed via Whisper STT." },
        { id: "docs", label: "Documents", x: 255, y: 30, icon: "document", desc: "Notes and reference material." },
        { id: "pdfs", label: "PDFs", x: 335, y: 50, icon: "pdf", desc: "Course PDFs parsed and indexed." },
        // Right — generation
        { id: "llm", label: "LLM", x: 360, y: 175, icon: "llm", desc: "Reasoning model grounded on retrieved context." },
        { id: "response", label: "Response", x: 360, y: 275, icon: "response", desc: "Final answer with citations and timestamps." },
        // Bottom — retrieval layer
        { id: "vector", label: "Vector DB", x: 130, y: 360, icon: "vector", desc: "Stores embeddings for fast similarity search." },
        { id: "embed", label: "Embeddings", x: 215, y: 380, icon: "embed", desc: "Dense vectors generated from each chunk." },
        { id: "retriever", label: "Retriever", x: 300, y: 360, icon: "retriever", desc: "Semantic + timestamp-aware retrieval." },
      ],
      edges: [
        // User flow
        ["user", "engine"],
        ["question", "engine"],
        // Sources feed knowledge base
        ["videos", "kb"],
        ["docs", "kb"],
        ["pdfs", "kb"],
        // Ingestion pipeline
        ["kb", "embed"],
        ["embed", "vector"],
        ["vector", "retriever"],
        // Retrieval → engine
        ["retriever", "engine"],
        // Generation
        ["engine", "llm"],
        ["llm", "response"],
        // Loop back to user
        ["response", "user"],
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

            {p.overview && (
              <div
                className="mt-5 rounded-2xl p-5 sm:p-5 max-w-xl relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,20,30,0.55) 0%, rgba(10,10,18,0.7) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 0% 0%, rgba(99,102,241,0.10), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#a78bfa] mb-2">
                    Overview
                  </div>
                  <div
                    className="font-display text-white tracking-[-0.02em] leading-[1.2] text-[16px] sm:text-[17px]"
                    style={{ fontWeight: 700 }}
                  >
                    {p.overview.title}
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {p.overview.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-[13.5px] leading-[1.7] text-[#cbd5e1]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
