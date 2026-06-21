export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative py-12 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(79,140,255,0.55), rgba(167,139,250,0.45))",
              boxShadow: "0 8px 18px -8px rgba(79,140,255,0.5)",
            }}
          >
            <span className="text-[11px] font-bold text-white">S</span>
          </span>
          <div>
            <div className="font-display text-[14px] text-white tracking-tight">
              Sahil
            </div>
            <div className="font-mono text-[10.5px] text-[#5e6776] tracking-[0.16em] uppercase">
              ai engineer · 2026
            </div>
          </div>
        </div>

        <div className="text-[12px] text-[#7e8696] font-mono">
          Designed & built with{" "}
          <span className="text-[#7dd3fc]">React</span> ·{" "}
          <span className="text-[#a78bfa]">Framer Motion</span> ·{" "}
          <span className="text-[#4f8cff]">Tailwind</span>
        </div>

        <div className="text-[12px] text-[#5e6776] font-mono">
          © {new Date().getFullYear()} · All rights reserved
        </div>
      </div>
    </footer>
  );
}
