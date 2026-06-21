import { useState } from "react";
import { motion } from "framer-motion";

const ENTRIES = [
  {
    id: "email",
    label: "Email",
    value: "sahilkhk001@gmail.com",
    href: "mailto:sahilkhk001@gmail.com",
    copyable: true,
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
    copyable: true,
    copyValue: "https://github.com/sahilkhn-03",
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
    copyable: true,
    copyValue: "https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/",
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
    copyable: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ContactRow({ e, index }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(e.copyValue || e.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  return (
    <motion.div
      data-testid={`contact-${e.id}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(20,20,30,0.55) 0%, rgba(10,10,18,0.7) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow:
          "0 20px 50px -28px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* hover spotlight */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(360px 140px at 100% 50%, rgba(167,139,250,0.16), transparent 70%)",
        }}
      />
      {/* hover border glow */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(167,139,250,0.32), 0 18px 40px -22px rgba(79,70,229,0.38)",
        }}
      />

      <div className="relative flex items-center justify-between gap-4 px-5 sm:px-6 py-5">
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors"
            style={{
              background: "rgba(139,92,246,0.10)",
              border: "1px solid rgba(167,139,250,0.22)",
              color: "#a78bfa",
            }}
          >
            {e.icon}
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#7e8696]">
              {e.label}
            </div>
            <div className="mt-1 text-[15.5px] text-white tracking-[-0.005em] truncate">
              {e.value}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {e.copyable && (
            <button
              data-testid={`contact-copy-${e.id}`}
              onClick={onCopy}
              aria-label={`Copy ${e.label}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#cbd5e1] border transition-all"
              style={{
                background: copied
                  ? "rgba(167,139,250,0.18)"
                  : "rgba(255,255,255,0.03)",
                borderColor: copied
                  ? "rgba(167,139,250,0.5)"
                  : "rgba(255,255,255,0.08)",
                color: copied ? "#ffffff" : undefined,
              }}
            >
              {copied ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="9"
                      y="9"
                      width="11"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M5 15V6a2 2 0 012-2h9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
          <a
            data-testid={`contact-open-${e.id}`}
            href={e.href}
            target={e.id === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all"
            style={{
              background: "rgba(79,70,229,0.16)",
              borderColor: "rgba(99,102,241,0.42)",
              color: "#cdcafa",
            }}
          >
            Open
            <svg
              width="11"
              height="11"
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
          </a>
        </div>
      </div>
    </motion.div>
  );
}

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
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-white tracking-[-0.035em] leading-[1.04] text-[clamp(2rem,4.4vw,3rem)] max-w-[18ch]"
              style={{ fontWeight: 800 }}
            >
              Let's Build What's Next.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mt-5 text-[15px] leading-[1.7] text-[#94a3b8] max-w-2xl"
            >
              Open to internships, collaborations, and research roles. Pick a
              channel — I respond within 24 hours.
            </motion.p>

            <div className="mt-8 space-y-3">
              {ENTRIES.map((e, i) => (
                <ContactRow key={e.id} e={e} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
