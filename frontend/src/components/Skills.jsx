import { motion } from "framer-motion";

const GROUPS = [
  {
    title: "Languages",
    items: ["Python", "C", "C++", "SQL", "Bash"],
  },
  {
    title: "AI",
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
  return (
    <motion.div
      data-testid={`skill-group-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl p-5 sm:p-6 transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
      }}
    >
      {/* hover spotlight glow */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(220px 160px at 50% 0%, rgba(139,92,246,0.18), transparent 70%)",
        }}
      />

      {/* border glow on hover */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 1px rgba(167,139,250,0.32), 0 20px 50px -22px rgba(79,70,229,0.45)",
        }}
      />

      {/* lift on hover */}
      <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {/* glowing indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <span
              className="block w-2 h-2 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1, #a78bfa)",
                boxShadow:
                  "0 0 14px rgba(167,139,250,0.85), 0 0 4px rgba(99,102,241,0.9)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-0 m-auto w-2 h-2 rounded-full animate-ping"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1, #a78bfa)",
                opacity: 0.35,
              }}
            />
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#a78bfa]">
            Stack · 0{index + 1}
          </span>
        </div>

        {/* Category title */}
        <h3 className="font-display text-[20px] sm:text-[22px] text-white tracking-[-0.02em] mt-4 leading-tight">
          {g.title}
        </h3>

        {/* divider */}
        <div
          className="mt-4 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(167,139,250,0.45), rgba(167,139,250,0.06) 60%, transparent)",
          }}
        />

        {/* elegant vertical skill list */}
        <ul className="mt-4 space-y-2">
          {g.items.map((skill, i) => (
            <li
              key={skill}
              className="flex items-baseline gap-3 text-[14px] text-[#cbd5e1] leading-snug transition-colors duration-300 hover:text-white"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#5e6776] tabular-nums w-4 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="tracking-[-0.005em]">{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
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
              className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">The </span>
              <span className="font-serif-italic text-grad-indigo">stack</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-4 text-[14.5px] leading-[1.7] text-[#94a3b8] max-w-xl"
            >
              Tools and technologies I reach for when building intelligent
              systems and shipping real products.
            </motion.p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {GROUPS.map((g, gi) => (
            <SkillCard key={g.title} g={g} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}
