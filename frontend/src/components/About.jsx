import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "5+", label: "AI / ML Projects", sub: "shipped & in production-research" },
  { value: "1", label: "Hackathon Win", sub: "HackQuest 2025 — winner" },
  { value: "1", label: "NPTEL Certification", sub: "Machine Learning with Python" },
  { value: "4th", label: "Year B.Tech AI", sub: "Computer Science · Artificial Intelligence" },
];

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [val, setVal] = useState(0);
  const numeric = parseInt(String(to).replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = String(to).replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1100;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * numeric));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-32 sm:py-40"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="section-tag mb-10"
        >
          <span className="dot" />
          About
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: Stats */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  data-testid={`about-stat-${i}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="glass hover-lift ring-edge rounded-2xl p-5 relative overflow-hidden"
                >
                  <div
                    className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-30"
                    style={{
                      background:
                        i % 2 === 0
                          ? "radial-gradient(circle, rgba(79,140,255,0.55), transparent 70%)"
                          : "radial-gradient(circle, rgba(167,139,250,0.5), transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="font-display text-[clamp(1.9rem,4vw,2.6rem)] leading-none tracking-tight text-white">
                      {/[0-9]/.test(s.value) ? <CountUp to={s.value} /> : s.value}
                    </div>
                    <div className="mt-3 text-[13px] text-white/85 font-medium">
                      {s.label}
                    </div>
                    <div className="mt-1 text-[11px] text-[#7e8696] leading-relaxed">
                      {s.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trophy callout */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-3 glass ring-edge rounded-2xl p-5 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,206,107,0.18), rgba(255,150,80,0.12))",
                  border: "1px solid rgba(255,206,107,0.28)",
                  boxShadow:
                    "0 10px 24px -10px rgba(255,170,80,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 21h8M12 17v4M7 4h10v3a5 5 0 11-10 0V4zM7 4H4v2a3 3 0 003 3M17 4h3v2a3 3 0 01-3 3"
                    stroke="#ffce6b"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[13px] text-white font-medium">
                  HackQuest 2025 — Winner
                </div>
                <div className="text-[11px] text-[#7e8696] mt-0.5">
                  Built a collaborative full-stack solution under 48 hours.
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Narrative */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight"
            >
              <span className="text-grad-primary">
                Building intelligent software and
              </span>{" "}
              <span className="font-serif-italic text-grad-blue">
                AI applications
              </span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 space-y-5 text-[16px] leading-[1.75] text-[#a8b0bf] max-w-2xl"
            >
              <p>
                I am a{" "}
                <span className="text-white">
                  Computer Science (Artificial Intelligence)
                </span>{" "}
                student focused on building practical machine learning systems,
                AI applications, and intelligent software products.
              </p>
              <p>
                My work spans{" "}
                <span className="text-[#7dd3fc]">
                  Retrieval-Augmented Generation
                </span>{" "}
                systems, AI orchestration platforms, machine learning pipelines,
                and{" "}
                <span className="text-[#a78bfa]">
                  lightweight language model
                </span>{" "}
                research.
              </p>
            </motion.div>

            {/* Quick facts list */}
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-[#8b93a3] max-w-xl"
            >
              {[
                ["Focus", "RAG · Orchestration · SLM"],
                ["Now", "Building open-source AI tools"],
                ["Base", "India · Remote-friendly"],
                ["Open to", "Internships & research roles"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5e6776] w-14 shrink-0">
                    {k}
                  </span>
                  <span className="text-white/85">{v}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
