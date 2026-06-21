import { motion } from "framer-motion";

const ENTRIES = [
  {
    id: "btech",
    title: "B.Tech Computer Science (Artificial Intelligence)",
    place: "Adi Shankara Institute of Engineering and Technology",
    note: "Current · 4th Year",
    years: "2023 – 2027",
  },
  {
    id: "hse",
    title: "Higher Secondary Education",
    place: "RHSS Vadavucode · Bio-Maths",
    note: "Completed",
    years: "2020 – 2022",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      data-testid="education-section"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Education
            </div>
          </div>

          <div className="md:col-span-9 relative">
            {/* vertical timeline line */}
            <div
              className="absolute left-[7px] top-1.5 bottom-1.5 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(180deg, rgba(167,139,250,0.45), rgba(167,139,250,0.05))",
              }}
              aria-hidden
            />

            <ul className="space-y-7 sm:pl-8">
              {ENTRIES.map((e, i) => (
                <motion.li
                  key={e.id}
                  data-testid={`edu-${i}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* timeline dot */}
                  <span
                    aria-hidden
                    className="hidden sm:block absolute -left-[33px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#09090b]"
                    style={{
                      background:
                        "linear-gradient(135deg, #6366f1, #a78bfa)",
                      boxShadow:
                        "0 0 16px rgba(139,92,246,0.55), 0 0 0 1px rgba(167,139,250,0.4)",
                    }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5">
                    <div className="font-display text-[15.5px] sm:text-[17px] text-white tracking-tight leading-snug">
                      {e.title}
                    </div>
                    <div
                      className="text-[11.5px] font-mono tracking-[0.12em] shrink-0"
                      style={{ color: "#a78bfa" }}
                    >
                      {e.years}
                    </div>
                  </div>
                  <div className="mt-1 text-[13px] text-[#94a3b8]">
                    {e.place}
                  </div>
                  <div className="mt-1 text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#64748b]">
                    {e.note}
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
