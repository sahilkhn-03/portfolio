import { motion } from "framer-motion";

const LINKS = [
  {
    id: "email",
    label: "Email",
    value: "sahilkhk001@gmail.com",
    href: "mailto:sahilkhk001@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/sahilkhn-03",
    href: "https://github.com/sahilkhn-03",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/sahil-",
    href: "https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3V9.5zM10 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.2c0-1.24-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76V21h-4V9.5z" />
      </svg>
    ),
  },
  {
    id: "resume",
    label: "Resume",
    value: "Download PDF",
    href: "https://drive.google.com/file/d/1Ob0psVbcB7vpI9FqRpz79-qq8dzZT3og/view?usp=drivesdk",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Contact
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
              <span className="text-grad-primary">Let's build </span>
              <span className="font-serif-italic text-grad-indigo">something</span>
              <span className="text-grad-primary">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-4 text-[14.5px] leading-[1.7] text-[#94a3b8] max-w-2xl"
            >
              Open to internships, collaborations, and research roles. The fastest way to reach me:
            </motion.p>

            <ul className="mt-6 divide-y divide-white/[0.06]">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    data-testid={`contact-${l.id}`}
                    href={l.href}
                    target={l.id === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 py-4 group hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          background: "rgba(139,92,246,0.08)",
                          border: "1px solid rgba(167,139,250,0.18)",
                          color: "#a78bfa",
                        }}
                      >
                        {l.icon}
                      </div>
                      <div>
                        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#64748b]">
                          {l.label}
                        </div>
                        <div className="mt-0.5 text-[15px] text-white tracking-tight">
                          {l.value}
                        </div>
                      </div>
                    </div>
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:border-[#8b5cf6]/40 group-hover:bg-[#8b5cf6]/[0.08] transition-all"
                      style={{ color: "#a78bfa" }}
                    >
                      <svg
                        width="13"
                        height="13"
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
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
