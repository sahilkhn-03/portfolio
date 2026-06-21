import { motion } from "framer-motion";

export default function Education() {
  return (
    <section
      id="education"
      data-testid="education-section"
      className="relative py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Education
            </div>
          </div>
          <div className="md:col-span-9">
            <motion.div
              data-testid="edu-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="glass ring-edge rounded-2xl p-6 hover-lift relative overflow-hidden max-w-3xl"
            >
              <div
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.18), transparent 65%)",
                  filter: "blur(26px)",
                }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(59,130,246,0.10)",
                      border: "1px solid rgba(59,130,246,0.24)",
                      color: "#93c5fd",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 10L12 4 2 10l10 6 10-6z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 12.5V17c2 2 4 3 6 3s4-1 6-3v-4.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-[17px] sm:text-[18px] text-white tracking-tight leading-tight">
                      B.Tech Computer Science (Artificial Intelligence)
                    </div>
                    <div className="mt-1.5 text-[13.5px] text-[#a8b0bf]">
                      Adi Shankara Institute of Engineering and Technology
                    </div>
                    <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[#5e6776]">
                      Current · Pursuing
                    </div>
                  </div>
                </div>
                <div
                  className="text-[12px] font-mono tracking-[0.12em] shrink-0 px-2.5 py-1 rounded-full"
                  style={{
                    color: "#93c5fd",
                    background: "rgba(96,165,250,0.08)",
                    border: "1px solid rgba(96,165,250,0.18)",
                  }}
                >
                  2023 – 2027
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
