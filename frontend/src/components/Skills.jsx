import { motion } from "framer-motion";

const GROUPS = [
  { title: "Languages", items: ["Python", "C", "C++", "SQL", "Bash"] },
  { title: "AI / ML", items: ["PyTorch", "Machine Learning", "AI Agents", "LangChain", "Prompt Engineering", "Claude APIs"] },
  { title: "Backend", items: ["FastAPI", "Flask", "MongoDB", "Git", "GitHub"] },
  { title: "Cloud", items: ["Google Cloud", "REST APIs", "Vercel"] },
];

export default function Skills() {
  return (
    <section id="skills" data-testid="skills-section" className="relative py-16 sm:py-20">
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">The </span>
              <span className="font-serif-italic text-grad-indigo">stack</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <div className="mt-8 space-y-5">
              {GROUPS.map((g, gi) => (
                <motion.div
                  key={g.title}
                  data-testid={`skill-group-${gi}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.5, delay: gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start"
                >
                  <div className="sm:col-span-3 font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#94a3b8] pt-1.5">
                    {g.title}
                  </div>
                  <div className="sm:col-span-9 flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-[12.5px] font-medium text-[#e7e5f0] bg-white/[0.035] border border-white/[0.08] hover:border-[#8b5cf6]/45 hover:bg-[#8b5cf6]/[0.10] hover:text-white transition-colors"
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
