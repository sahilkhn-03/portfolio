import { motion } from "framer-motion";

const ITEMS = [
  {
    id: "hackquest",
    icon: "🏆",
    title: "HackQuest 2025 — Winner",
    sub: "Built a real-time public alert platform under 24 hours.",
    accent: "amber",
  },
  {
    id: "nptel",
    icon: "📜",
    title: "Machine Learning Using Python — NPTEL Certified",
    sub: "IIT-led online certification programme.",
    accent: "blue",
  },
  {
    id: "ship",
    icon: "💻",
    title: "Multiple AI / ML projects shipped",
    sub: "RAG agents, orchestration platforms, ML pipelines, SLM research.",
    accent: "azure",
  },
];

const accentMap = {
  amber: { bg: "rgba(255,180,80,0.10)", border: "rgba(255,180,80,0.26)", text: "#ffc879" },
  blue: { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.26)", text: "#93c5fd" },
  azure: { bg: "rgba(96,165,250,0.10)", border: "rgba(96,165,250,0.26)", text: "#bfdbfe" },
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      data-testid="achievements-section"
      className="relative py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Achievements
            </div>
          </div>
          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {ITEMS.map((a, i) => {
              const c = accentMap[a.accent];
              return (
                <motion.div
                  key={a.id}
                  data-testid={`achievement-${a.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="glass ring-edge rounded-2xl p-5 hover-lift relative overflow-hidden"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px]"
                    style={{
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div
                    className="font-display mt-4 text-[14.5px] leading-snug tracking-tight"
                    style={{ color: c.text }}
                  >
                    {a.title}
                  </div>
                  <div className="mt-1.5 text-[12.5px] text-[#9aa3b2] leading-relaxed">
                    {a.sub}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
