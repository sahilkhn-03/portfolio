import { motion } from "framer-motion";

const ITEMS = [
  {
    id: "hackquest",
    icon: "🏆",
    title: "HackQuest 2025 Winner",
    desc: "Built an award-winning real-time public safety alert platform during a competitive hackathon.",
  },
  {
    id: "nptel",
    icon: "📜",
    title: "Machine Learning Using Python — NPTEL Certified",
    desc: "Successfully completed NPTEL certification in Machine Learning Using Python.",
  },
  {
    id: "ship",
    icon: "💻",
    title: "Built Multiple AI & Machine Learning Systems",
    desc: "Developed RAG systems, orchestration platforms, machine learning pipelines, and intelligent software products.",
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
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-white tracking-[-0.035em] leading-[1.04] text-[clamp(1.8rem,3.6vw,2.4rem)]"
              style={{ fontWeight: 800 }}
            >
              Achievements
            </motion.h2>

            <ul className="mt-10 space-y-7 sm:space-y-8">
              {ITEMS.map((a, i) => (
                <motion.li
                  key={a.id}
                  data-testid={`achievement-${a.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-6 sm:pl-7"
                >
                  {/* glowing indicator */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 inline-flex"
                  >
                    <span
                      className="block w-2.5 h-2.5 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, #ffffff 0%, #a78bfa 35%, #4f46e5 100%)",
                        boxShadow:
                          "0 0 18px rgba(167,139,250,0.95), 0 0 4px rgba(99,102,241,0.95)",
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

                  <div className="flex items-baseline gap-3">
                    <span className="text-[18px] leading-none">{a.icon}</span>
                    <h3
                      className="font-display text-white leading-snug tracking-[-0.02em] text-[16.5px] sm:text-[18px]"
                      style={{ fontWeight: 700 }}
                    >
                      {a.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.7] text-[#94a3b8] max-w-2xl">
                    {a.desc}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
