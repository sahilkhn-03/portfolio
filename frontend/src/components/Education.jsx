import { motion } from "framer-motion";

const ENTRIES = [
  {
    id: "btech",
    title: "B.Tech Computer Science (Artificial Intelligence)",
    place: "Adi Shankara Institute of Engineering and Technology",
    years: "2023 — 2027",
    note: "Current · 4th Year",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* AI / neural network glyph */}
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M7.5 7.2L10.5 10.8M16.5 7.2L13.5 10.8M10.5 13.2L7.5 16.8M13.5 13.2L16.5 16.8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "hse",
    title: "Higher Secondary Education",
    place: "RHSS Vadavucode · Bio-Maths",
    years: "2020 — 2022",
    note: "Completed",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* graduation cap glyph */}
        <path
          d="M3 10l9-5 9 5-9 5-9-5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7 12.5V17c1.6 1.5 3.4 2.3 5 2.3s3.4-.8 5-2.3v-4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M21 10v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

function EduCard({ e, i }) {
  return (
    <motion.div
      data-testid={`edu-${i}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl p-[1px] transition-transform duration-500 ease-out"
    >
      {/* gradient border */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 55%, rgba(167,139,250,0.32))",
        }}
      />
      <div
        className="relative rounded-[15px] p-6 sm:p-7 h-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,20,30,0.78) 0%, rgba(10,10,18,0.92) 100%)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          boxShadow:
            "0 30px 60px -28px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* hover spotlight */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(280px circle at 80% 0%, rgba(139,92,246,0.16), transparent 70%)",
          }}
        />
        {/* ambient bottom glow */}
        <span
          aria-hidden
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[75%] h-40 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(79,70,229,0.28), transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <div className="flex items-start justify-between gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(167,139,250,0.26)",
                color: "#a78bfa",
              }}
            >
              {e.icon}
            </div>
            <div
              className="text-[11px] font-mono tracking-[0.12em] shrink-0 px-2.5 py-1 rounded-full"
              style={{
                color: "#a78bfa",
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(167,139,250,0.22)",
              }}
            >
              {e.years}
            </div>
          </div>

          <h3
            className="font-display mt-6 text-white leading-[1.18] tracking-[-0.025em] text-[17.5px] sm:text-[19px]"
            style={{ fontWeight: 700 }}
          >
            {e.title}
          </h3>
          <div className="mt-2 text-[14px] text-[#94a3b8] leading-snug">
            {e.place}
          </div>
          <div className="mt-3 text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#64748b]">
            {e.note}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      data-testid="education-section"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-3">
            <div className="section-tag">
              <span className="dot" />
              Education
            </div>
          </div>

          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-white tracking-[-0.035em] leading-[1.04] text-[clamp(1.8rem,3.6vw,2.4rem)]"
              style={{ fontWeight: 800 }}
            >
              Education
            </motion.h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {ENTRIES.map((e, i) => (
                <EduCard key={e.id} e={e} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
