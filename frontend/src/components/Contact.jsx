import { motion } from "framer-motion";

const cards = [
  {
    id: "email",
    label: "Email",
    value: "sahilkhk001@gmail.com",
    href: "mailto:sahilkhk001@gmail.com",
    accent: "blue",
    cta: "Send mail",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M4 7l8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/sahilkhn-03",
    href: "https://github.com/sahilkhn-03",
    accent: "violet",
    cta: "Visit profile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/sahil-",
    href: "https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/",
    accent: "ice",
    cta: "Connect",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3V9.5zM10 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.2c0-1.24-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76V21h-4V9.5z" />
      </svg>
    ),
  },
];

const accentMap = {
  blue: { color: "#7dafff", soft: "rgba(79,140,255,0.16)", border: "rgba(79,140,255,0.3)" },
  violet: { color: "#a78bfa", soft: "rgba(167,139,250,0.14)", border: "rgba(167,139,250,0.28)" },
  ice: { color: "#7dd3fc", soft: "rgba(125,211,252,0.14)", border: "rgba(125,211,252,0.28)" },
};

export default function Contact() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-32 sm:py-40"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="section-tag">
              <span className="dot" />
              Contact
            </div>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.04] tracking-tight">
              <span className="text-grad-primary">Let's build </span>
              <span className="font-serif-italic text-grad-blue">something</span>
              <span className="text-grad-primary">.</span>
            </h2>
          </div>
          <p className="text-[13.5px] text-[#7e8696] max-w-sm">
            Open to internships, research collaborations and AI engineering
            roles. Pick a channel — I respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((c, i) => {
            const a = accentMap[c.accent];
            return (
              <motion.a
                data-testid={`contact-card-${c.id}`}
                key={c.id}
                href={c.href}
                target={c.id === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass hover-lift ring-edge rounded-2xl p-6 relative overflow-hidden group"
              >
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${a.soft}, transparent 65%)`,
                    filter: "blur(26px)",
                  }}
                />
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: a.soft,
                      border: `1px solid ${a.border}`,
                      color: a.color,
                      boxShadow: `0 10px 24px -12px ${a.soft}`,
                    }}
                  >
                    {c.icon}
                  </div>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:bg-white/10 transition-all"
                    style={{ color: a.color }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7e8696]">
                    {c.label}
                  </div>
                  <div className="mt-1.5 font-display text-[17px] tracking-tight text-white truncate">
                    {c.value}
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between">
                  <span
                    className="text-[12.5px] font-medium"
                    style={{ color: a.color }}
                  >
                    {c.cta}
                  </span>
                  <span className="font-mono text-[10px] text-[#5e6776] tracking-[0.18em]">
                    one click
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
