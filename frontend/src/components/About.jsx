import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-28 sm:py-36"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              About me
            </div>
          </div>

          <div className="md:col-span-9 max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">
                Building practical AI systems &amp;{" "}
              </span>
              <span className="font-serif-italic text-grad-blue">
                intelligent software
              </span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-9 space-y-5 text-[16px] leading-[1.78] text-[#a8b0bf]"
            >
              <p>
                I am a{" "}
                <span className="text-white">
                  B.Tech Computer Science (Artificial Intelligence)
                </span>{" "}
                student focused on AI Engineering, Machine Learning, RAG
                systems, and modern software development. I enjoy turning ideas
                into production-ready applications by combining intelligent
                models with scalable backend systems and clean user experiences.
              </p>
              <p>
                Currently exploring{" "}
                <span className="text-[#7dd3fc]">AI orchestration</span>,{" "}
                <span className="text-[#a78bfa]">
                  lightweight language models
                </span>
                , and next-generation AI products.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]"
            >
              <a
                href="https://github.com/sahilkhn-03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7dafff] hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                GitHub
              </a>
              <span className="text-[#3a4150]">·</span>
              <a
                href="https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7dafff] hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
