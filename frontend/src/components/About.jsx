import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
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
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.85rem,4.2vw,2.9rem)] leading-[1.05] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">Building practical AI systems &amp; </span>
              <span className="font-serif-italic text-grad-blue">intelligent software</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-7 space-y-4 text-[15.5px] leading-[1.7] text-[#a8b0bf]"
            >
              <p>
                I am a{" "}
                <span className="text-white">
                  B.Tech Computer Science (Artificial Intelligence)
                </span>{" "}
                student focused on building practical machine learning systems,
                AI applications, and intelligent software products.
              </p>
              <p>
                My work includes{" "}
                <span className="text-[#93c5fd]">Retrieval-Augmented Generation (RAG)</span>,
                AI orchestration platforms, machine learning pipelines, and
                lightweight language model research. I enjoy transforming ideas
                into scalable software with clean architecture, strong
                engineering practices, and real-world usability.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
