import { motion } from "framer-motion";

const GROUPS = [
  {
    title: "Languages",
    items: [
      ["Python", "primary"],
      ["JavaScript", "apps"],
      ["C / C++", "systems"],
      ["SQL", "data"],
      ["Bash", "ops"],
    ],
  },
  {
    title: "AI · Agents",
    items: [
      ["LangChain", "orchestration"],
      ["OpenAI APIs", "reasoning"],
      ["PyTorch", "models"],
      ["Agentic RAG", "retrieval"],
      ["Whisper", "audio"],
    ],
  },
  {
    title: "Infra · Data",
    items: [
      ["FastAPI", "service"],
      ["Docker", "runtime"],
      ["MongoDB", "store"],
      ["PostgreSQL", "data"],
      ["Git / GitHub", "ops"],
    ],
  },
  {
    title: "ML · Research",
    items: [
      ["scikit-learn", "classical"],
      ["Transformers", "nlp"],
      ["MLflow", "tracking"],
      ["Knowledge Distillation", "research"],
      ["NumPy / Pandas", "compute"],
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-28 sm:py-36"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Skills
            </div>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">The </span>
              <span className="font-serif-italic text-grad-blue">stack</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {GROUPS.map((g, gi) => (
                <motion.div
                  key={g.title}
                  data-testid={`skill-group-${gi}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.65,
                    delay: gi * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="font-display text-[14px] text-white tracking-tight mb-5">
                    {g.title}
                  </div>
                  <ul className="space-y-2.5">
                    {g.items.map(([name, tag]) => (
                      <li
                        key={name}
                        className="flex items-baseline justify-between gap-3 group"
                      >
                        <span className="text-[14px] text-[#cfd6e2] group-hover:text-white transition-colors">
                          {name}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.14em] text-[#5e6776] uppercase">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
