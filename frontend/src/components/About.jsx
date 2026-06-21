import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              About me
            </div>
          </div>

          <div className="md:col-span-9">
            <motion.h2
              {...fade(0)}
              className="font-display text-white tracking-[-0.035em] leading-[1.05] text-[clamp(2rem,4.4vw,3.2rem)] max-w-[18ch]"
              style={{ fontWeight: 800, fontFeatureSettings: '"ss01", "cv11"' }}
            >
              Building practical AI systems
              <br />
              and intelligent software.
            </motion.h2>

            <div
              className="mt-8 space-y-6"
              style={{ maxWidth: "600px" }}
            >
              <motion.p
                {...fade(0.06)}
                className="text-[16px] leading-[1.8] text-[#cbd5e1] tracking-[-0.005em]"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                I am a 4th-year B.Tech Computer Science (Artificial
                Intelligence) student focused on building practical machine
                learning systems, AI applications, and intelligent software
                products.
              </motion.p>

              <motion.p
                {...fade(0.12)}
                className="text-[16px] leading-[1.8] text-[#94a3b8] tracking-[-0.005em]"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                My work spans Retrieval-Augmented Generation (RAG), AI
                orchestration platforms, machine learning pipelines, and
                lightweight language model research. I enjoy transforming ideas
                into scalable software with clean architecture, strong
                engineering practices, and real-world usability.
              </motion.p>
            </div>

            <motion.div
              {...fade(0.2)}
              className="mt-10 flex items-start gap-10 sm:gap-14"
              data-testid="about-stats"
            >
              <div>
                <div
                  className="font-display text-white leading-none tracking-[-0.04em]"
                  style={{ fontWeight: 700, fontSize: "clamp(1.9rem, 3vw, 2.4rem)" }}
                >
                  5<span style={{ color: "#a78bfa" }}>+</span>
                </div>
                <div className="mt-2 text-[12px] text-[#94a3b8] tracking-[0.04em]">
                  Projects shipped
                </div>
              </div>

              <div
                aria-hidden
                className="self-stretch w-px"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(255,255,255,0.10), transparent)",
                }}
              />

              <div>
                <div
                  className="font-display text-white leading-none tracking-[-0.04em]"
                  style={{ fontWeight: 700, fontSize: "clamp(1.9rem, 3vw, 2.4rem)" }}
                >
                  3<span style={{ color: "#a78bfa" }}>+</span>
                </div>
                <div className="mt-2 text-[12px] text-[#94a3b8] tracking-[0.04em]">
                  Years building
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
