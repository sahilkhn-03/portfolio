import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      data-testid="glass-nav"
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(880px,calc(100%-24px))]"
    >
      <div
        className="relative rounded-full px-2 py-1.5 flex items-center justify-between transition-shadow duration-500"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,18,38,0.72) 0%, rgba(12,12,22,0.55) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          boxShadow: scrolled
            ? "0 24px 60px -24px rgba(0,0,0,0.7), 0 10px 28px -14px rgba(79,70,229,0.28), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 14px 40px -22px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* subtle gradient border ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none opacity-80"
          style={{
            padding: 1,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 50%, rgba(167,139,250,0.18))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* edge highlight */}
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />

        {/* Monogram */}
        <button
          data-testid="nav-logo"
          onClick={() => go("home")}
          aria-label="Home"
          className="relative ml-1 w-9 h-9 rounded-full flex items-center justify-center group"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(167,139,250,0.35), rgba(79,70,229,0.18) 60%, rgba(20,18,38,0.6))",
            border: "1px solid rgba(167,139,250,0.32)",
            boxShadow:
              "0 8px 22px -6px rgba(79,70,229,0.55), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -3px 6px rgba(0,0,0,0.4)",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow:
                "0 0 18px rgba(167,139,250,0.6), 0 0 0 1px rgba(167,139,250,0.4)",
            }}
          />
          <span
            className="font-display text-white text-[12.5px] leading-none tracking-[-0.02em]"
            style={{
              fontWeight: 700,
              textShadow: "0 1px 0 rgba(0,0,0,0.4)",
            }}
          >
            S
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className={`nav-link ${active === l.id ? "active" : ""}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <a
          data-testid="nav-resume-btn"
          href="https://drive.google.com/file/d/1Ob0psVbcB7vpI9FqRpz79-qq8dzZT3og/view?usp=drivesdk"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !py-1.5 !px-3.5 !text-[12px] mr-0.5"
        >
          Resume
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
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
    </motion.header>
  );
}
