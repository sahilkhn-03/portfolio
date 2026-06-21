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
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(960px,calc(100%-24px))]"
    >
      <div
        className={`glass-strong rounded-full px-3 py-2 flex items-center justify-between transition-shadow duration-500 ${
          scrolled ? "shadow-2xl" : ""
        }`}
        style={{
          boxShadow: scrolled
            ? "0 20px 50px -20px rgba(0,0,0,0.6), 0 8px 22px -10px rgba(59,130,246,0.22)"
            : "0 10px 30px -20px rgba(0,0,0,0.4)",
        }}
      >
        <button
          data-testid="nav-logo"
          onClick={() => go("home")}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-white/5 transition"
        >
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.7), rgba(96,165,250,0.5))",
              boxShadow: "0 6px 14px -4px rgba(59,130,246,0.6)",
            }}
          >
            <span className="text-[11px] font-bold text-white">S</span>
          </span>
          <span className="font-display text-[14px] tracking-tight text-white">
            Sahil
          </span>
          <span className="hidden md:inline font-mono text-[10px] text-[#93c5fd]/80 ml-1">
            ai · eng
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
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
          className="btn-primary !py-2 !px-4 !text-[12.5px]"
        >
          Resume
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
