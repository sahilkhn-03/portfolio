import { motion } from "framer-motion";

const cards = [
  {
    id: "github",
    label: "Code on",
    value: "GitHub",
    href: "https://github.com/sahilkhn-03",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "Connect on",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/sahil-%E3%85%A4-3552b3290/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3V9.5zM10 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.2c0-1.24-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76V21h-4V9.5z" />
      </svg>
    ),
  },
];

const lines = [
  { user: "sahil@nodes", path: "~/portfolio", cmd: "cat currently_building" },
  { output: "→ multi-model AI orchestration · OrchestrateX" },
  { output: "→ RAG agent for educational video intelligence" },
  { user: "sahil@nodes", path: "~/portfolio", cmd: "cat interests --deep" },
  { output: "→ retrieval-augmented generation · agentic systems" },
  { output: "→ lightweight LMs · how AI ships to production" },
  { user: "sahil@nodes", path: "~/portfolio", cmd: "_", cursor: true },
];

export default function Contact() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-28 sm:py-36"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Contact
            </div>
          </div>

          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2rem,4.8vw,3.6rem)] leading-[1.04] tracking-[-0.025em]"
            >
              <span className="text-grad-primary">Let's build </span>
              <span className="font-serif-italic text-grad-blue">something</span>
              <span className="text-grad-primary"> great.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-7 text-[16px] leading-[1.75] text-[#a8b0bf] max-w-2xl"
            >
              Open to internships, collaborations, and research. If you have an
              interesting problem — let's talk.
            </motion.p>

            <div className="mt-3 text-[13px] text-[#7e8696] font-mono">
              India · Remote-friendly
            </div>

            {/* Terminal block */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              data-testid="terminal-block"
              className="mt-10 glass ring-edge rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.015]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="font-mono text-[11px] text-[#7e8696] tracking-[0.06em]">
                  ~/sahil · zsh
                </div>
                <div className="w-10" />
              </div>
              <div className="p-5 font-mono text-[13px] leading-[1.75]">
                {lines.map((l, i) =>
                  l.cmd ? (
                    <div key={i} className="text-[#cfd6e2]">
                      <span className="text-[#7dafff]">{l.user}</span>
                      <span className="text-[#5e6776]">:</span>
                      <span className="text-[#a78bfa]">{l.path}</span>
                      <span className="text-[#5e6776]"> $ </span>
                      <span>{l.cmd}</span>
                      {l.cursor && (
                        <span className="inline-block w-2 h-[1.05em] align-[-2px] ml-1 bg-[#7dafff] animate-pulse" />
                      )}
                    </div>
                  ) : (
                    <div key={i} className="text-[#9aa3b2] pl-1">
                      {l.output}
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 text-[14px] text-[#a8b0bf]"
            >
              Email me at{" "}
              <a
                data-testid="contact-email"
                href="mailto:sahilkhk001@gmail.com"
                className="text-[#7dafff] hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                sahilkhk001@gmail.com
              </a>
            </motion.div>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((c, i) => (
                <motion.a
                  key={c.id}
                  data-testid={`contact-card-${c.id}`}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.25 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="glass hover-lift ring-edge rounded-2xl p-5 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(79,140,255,0.10)",
                        border: "1px solid rgba(79,140,255,0.22)",
                        color: "#7dafff",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7e8696]">
                        {c.label}
                      </div>
                      <div className="font-display text-[17px] text-white tracking-tight mt-0.5">
                        {c.value}
                      </div>
                    </div>
                  </div>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:bg-white/10 transition-all"
                    style={{ color: "#7dafff" }}
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
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
