import { useRef } from "react";
import { motion } from "framer-motion";

const GROUPS = [
  {
    title: "Languages",
    items: ["Python", "C", "C++", "SQL", "Bash"],
  },
  {
    title: "AI Engineering",
    items: ["PyTorch", "LangChain", "Claude APIs", "RAG Systems", "AI Agents"],
  },
  {
    title: "Infrastructure",
    items: ["FastAPI", "Docker", "MongoDB", "Git", "GitHub"],
  },
  {
    title: "Data Science",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Scikit-Learn",
      "Pandas",
    ],
  },
];

function SkillCard({ g, index }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -3.5;
    const ry = (px - 0.5) * 3.5;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <motion.div
      ref={ref}
      data-testid={`skill-group-${index}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative rounded-[20px] p-[1px] transition-transform duration-500 ease-out"
      style={{
        transform:
          "perspective(1200px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* outer soft gradient border that brightens on hover */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500 opacity-70 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 0%, rgba(167,139,250,0.55), rgba(79,70,229,0.28) 30%, rgba(255,255,255,0.04) 55%, rgba(79,70,229,0.22) 80%, rgba(167,139,250,0.55))",
        }}
      />

      <div
        className="relative rounded-[19px] p-6 sm:p-7 h-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,20,30,0.78) 0%, rgba(10,10,18,0.92) 100%)",
          backdropFilter: "blur(22px) saturate(160%)",
          WebkitBackdropFilter: "blur(22px) saturate(160%)",
          boxShadow:
            "0 30px 60px -28px rgba(0,0,0,0.7), 0 14px 28px -18px rgba(79,70,229,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* glass reflection sheen */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[55%] rounded-t-[19px] pointer-events-none opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 40%, transparent 100%)",
          }}
        />

        {/* cursor-follow spotlight */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[19px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(167,139,250,0.22), transparent 55%)",
          }}
        />

        {/* internal bottom glow */}
        <span
          aria-hidden
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80%] h-40 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(79,70,229,0.32), transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        {/* lift on hover */}
        <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
          {/* indicator + label row */}
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex">
              <span
                className="block w-2.5 h-2.5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, #ffffff 0%, #a78bfa 35%, #4f46e5 100%)",
                  boxShadow:
                    "0 0 16px rgba(167,139,250,0.95), 0 0 4px rgba(99,102,241,0.95)",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full animate-ping"
                style={{
                  background:
                    "radial-gradient(circle, rgba(167,139,250,0.7), transparent 70%)",
                  opacity: 0.5,
                }}
              />
            </span>
          </div>

          {/* category title */}
          <h3 className="font-display mt-6 text-[26px] sm:text-[28px] text-white leading-[1.05] tracking-[-0.03em]">
            {g.title}
          </h3>

          {/* soft divider */}
          <div
            className="mt-5 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(167,139,250,0.45), rgba(167,139,250,0.05) 60%, transparent)",
            }}
          />

          {/* elegant skill list */}
          <ul className="mt-5 space-y-2.5">
            {g.items.map((skill) => (
              <li
                key={skill}
                className="text-[15px] leading-snug tracking-[-0.005em] text-[#c7c4d8] transition-all duration-300 hover:text-white hover:translate-x-1"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Subtle neural-network background — SVG of connected nodes, slowly drifting.
 */
function NeuralBackground() {
  const NODES = [
    { x: 80, y: 60 },
    { x: 200, y: 30 },
    { x: 320, y: 80 },
    { x: 460, y: 50 },
    { x: 600, y: 100 },
    { x: 130, y: 180 },
    { x: 280, y: 200 },
    { x: 430, y: 170 },
    { x: 560, y: 220 },
    { x: 70, y: 310 },
    { x: 230, y: 320 },
    { x: 380, y: 290 },
    { x: 520, y: 340 },
    { x: 680, y: 300 },
    { x: 760, y: 200 },
  ];
  const LINES = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 14],
    [0, 5], [1, 5], [2, 6], [2, 7], [3, 7],
    [4, 8], [5, 9], [5, 10], [6, 10], [7, 11],
    [8, 12], [8, 13], [9, 10], [10, 11], [11, 12],
    [12, 13], [13, 14], [6, 11], [7, 8],
  ];
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.45 }}
    >
      <defs>
        <radialGradient id="nn-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nn-line" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(167,139,250,0)" />
          <stop offset="50%" stopColor="rgba(167,139,250,0.45)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0)" />
        </linearGradient>
      </defs>

      <g>
        {LINES.map(([a, b], i) => {
          const A = NODES[a];
          const B = NODES[b];
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#nn-line)"
              strokeWidth="0.7"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.25;0.85;0.25"
                dur={`${5 + (i % 5)}s`}
                repeatCount="indefinite"
                begin={`${(i % 5) * 0.4}s`}
              />
            </line>
          );
        })}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="9"
              fill="url(#nn-node)"
              opacity="0.55"
            >
              <animate
                attributeName="r"
                values="8;12;8"
                dur={`${4 + (i % 4)}s`}
                repeatCount="indefinite"
                begin={`${(i % 4) * 0.3}s`}
              />
            </circle>
            <circle
              cx={n.x}
              cy={n.y}
              r="1.6"
              fill="#e9e5fa"
              opacity="0.9"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-20 sm:py-24 overflow-hidden"
    >
      {/* ambient: aurora behind cards */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-20 h-[520px] pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 60% at 20% 50%, rgba(79,70,229,0.30), transparent 70%), radial-gradient(40% 60% at 80% 30%, rgba(139,92,246,0.28), transparent 70%), radial-gradient(35% 50% at 50% 90%, rgba(167,139,250,0.22), transparent 70%)",
          filter: "blur(60px) saturate(150%)",
          opacity: 0.7,
        }}
      />

      {/* ambient: neural network field, soft + slow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.55 }}
      >
        <NeuralBackground />
      </div>

      {/* ambient: floating soft blur orbs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        className="absolute -left-12 top-1/3 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.32), transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        className="absolute -right-10 bottom-10 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.28), transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Skills
            </div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.06] tracking-[-0.03em] text-white"
            >
              The Stack
            </motion.h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {GROUPS.map((g, gi) => (
            <SkillCard key={g.title} g={g} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}
