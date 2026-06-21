import { motion } from "framer-motion";

const EDU = [
  {
    title: "B.Tech in Computer Science & Engineering (AI)",
    place: "Specialization in Artificial Intelligence",
    sub: "4th Year · Current",
    years: "2022 – 2026",
  },
  {
    title: "NPTEL — Machine Learning with Python",
    place: "Certification · IIT-led online programme",
    sub: "Completed",
    years: "2024",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      data-testid="education-section"
      className="relative py-28 sm:py-36"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Education
            </div>
          </div>
          <div className="md:col-span-9">
            <ul className="space-y-5">
              {EDU.map((e, i) => (
                <motion.li
                  key={e.title}
                  data-testid={`edu-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="glass ring-edge rounded-2xl px-6 py-5 hover-lift"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <div>
                      <div className="font-display text-[17px] sm:text-[18px] text-white tracking-tight">
                        {e.title}
                      </div>
                      <div className="mt-1 text-[13px] text-[#a8b0bf]">
                        {e.place}
                      </div>
                    </div>
                    <div className="text-[12px] font-mono text-[#7dd3fc] tracking-[0.12em] shrink-0">
                      {e.years}
                    </div>
                  </div>
                  <div className="mt-2 text-[11.5px] font-mono uppercase tracking-[0.16em] text-[#5e6776]">
                    {e.sub}
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
