import { motion } from "framer-motion";

const ACHIEVEMENTS = [
  {
    id: "hackquest",
    icon: "🏆",
    title: "HackQuest 2025 Winner",
    sub: "Built a real-time public alert platform under 24 hours.",
  },
  {
    id: "nptel",
    icon: "📜",
    title: "Machine Learning Using Python — NPTEL Certified",
    sub: "IIT-led online certification programme.",
  },
  {
    id: "ship",
    icon: "💻",
    title: "Built and deployed multiple AI / ML systems and full-stack software projects",
    sub: "RAG agents, orchestration platforms, ML pipelines, SLM research.",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      data-testid="achievements-section"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Achievements
            </div>
          </div>

          <div className="md:col-span-9">
            <ul className="space-y-4 sm:space-y-5">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.li
                  key={a.id}
                  data-testid={`achievement-${a.id}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-start gap-4 pb-4 sm:pb-5 border-b border-white/[0.06] last:border-b-0 last:pb-0"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[16px] transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(139,92,246,0.08)",
                      border: "1px solid rgba(167,139,250,0.18)",
                    }}
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[15px] sm:text-[15.5px] text-white tracking-tight leading-snug">
                      {a.title}
                    </div>
                    <div className="mt-1 text-[13px] text-[#94a3b8] leading-relaxed">
                      {a.sub}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
