import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "5+", label: "AI / ML Projects", icon: null },
  { value: "🏆", label: "HackQuest 2025 Winner", icon: "trophy" },
  { value: "1", label: "NPTEL Certified (ML w/ Python)", icon: null },
  { value: "3+", label: "Years Building Projects", icon: null },
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

export default function Stats() {
  return (
    <section
      id="stats"
      data-testid="stats-section"
      className="relative py-10 sm:py-14"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass ring-edge rounded-2xl px-4 sm:px-8 py-5 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-2 relative overflow-hidden"
        >
          <div
            className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.18), transparent 65%)",
              filter: "blur(28px)",
            }}
          />
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              data-testid={`stat-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative z-10 px-3 sm:px-5 ${
                i < STATS.length - 1
                  ? "md:border-r md:border-white/[0.07]"
                  : ""
              }`}
            >
              <div className="font-display text-[clamp(1.7rem,3.4vw,2.2rem)] leading-none tracking-tight text-white">
                {s.icon === "trophy" ? (
                  <span style={{ filter: "drop-shadow(0 6px 14px rgba(255,180,80,0.4))" }}>
                    {s.value}
                  </span>
                ) : (
                  <CountUp to={s.value} />
                )}
              </div>
              <div className="mt-2 text-[12px] sm:text-[12.5px] text-[#a8b0bf] leading-tight">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
