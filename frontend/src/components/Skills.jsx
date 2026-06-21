import { motion } from "framer-motion";

const GROUPS = [
  {
    title: "Languages",
    items: ["Python", "C", "SQL", "Bash"],
  },
  {
    title: "Machine Learning",
    items: ["PyTorch", "Machine Learning", "Prompt Engineering", "LangChain", "Claude APIs"],
  },
  {
    title: "Backend",
    items: ["FastAPI", "Flask", "MongoDB", "PostgreSQL", "Docker", "Git", "GitHub"],
  },
  {
    title: "Cloud",
    items: ["Google Cloud", "Vercel", "REST APIs"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
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
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.85rem,4.2vw,2.9rem)] leading-[1.05] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">The </span>
              <span className="font-serif-italic text-grad-blue">stack</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <div className="mt-9 space-y-7">
              {GROUPS.map((g, gi) => (
                <motion.div
                  key={g.title}
                  data-testid={`skill-group-${gi}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.55,
                    delay: gi * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start"
                >
                  <div className="sm:col-span-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#7e8696] pt-1.5">
                    {g.title}
                  </div>
                  <div className="sm:col-span-9 flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-[12.5px] font-medium text-[#e7ecf3] bg-white/[0.04] border border-white/[0.08] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/[0.08] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
