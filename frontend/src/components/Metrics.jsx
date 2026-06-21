import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const METRICS = [
  { value: "5+", label: "Projects Built" },
  { value: "🏆", label: "HackQuest Winner", isIcon: true },
  { value: "1", label: "NPTEL Certification" },
  { value: "3+", label: "Years Building Projects" },
];

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [val, setVal] = useState(0);
  const numeric = parseInt(String(to).replace(/[^0-9]/g, ""), 10);
  const suffix = String(to).replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    let raf;
    const start = performance.now();
    const dur = 1000;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * numeric));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  if (isNaN(numeric)) return <span ref={ref}>{to}</span>;
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  return (
    <section
      id="metrics"
      data-testid="metrics-section"
      className="relative py-10 sm:py-14"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="hidden md:block md:col-span-3" />
          <div className="md:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:gap-y-0 sm:gap-x-6">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  data-testid={`metric-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative ${
                    i > 0 ? "sm:pl-6 sm:border-l sm:border-white/[0.07]" : ""
                  }`}
                >
                  <div
                    className="font-display text-white leading-none tracking-[-0.04em]"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(2rem, 3.4vw, 2.6rem)",
                    }}
                  >
                    {m.isIcon ? (
                      <span
                        style={{
                          filter:
                            "drop-shadow(0 6px 14px rgba(255,180,80,0.35))",
                        }}
                      >
                        {m.value}
                      </span>
                    ) : (
                      <CountUp to={m.value} />
                    )}
                  </div>
                  <div className="mt-3 text-[12px] text-[#94a3b8] tracking-[0.04em] leading-snug">
                    {m.label}
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
