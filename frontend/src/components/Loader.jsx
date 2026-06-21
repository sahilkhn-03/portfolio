import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      data-testid="premium-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#0b1120" }}
    >
      <div className="absolute inset-0 bg-radial-glow opacity-50" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(96,165,250,0.14))",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 20px 50px -20px rgba(59,130,246,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="w-7 h-7 rounded-lg"
              style={{
                background:
                  "conic-gradient(from 0deg, #3b82f6, #60a5fa, #93c5fd, #3b82f6)",
                maskImage:
                  "radial-gradient(circle, transparent 36%, #000 38%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 36%, #000 38%)",
              }}
            />
          </div>
        </div>

        <div className="mt-6 font-mono text-[11px] tracking-[0.28em] uppercase text-[#93c5fd]">
          Initialising
        </div>
        <div className="mt-3 loader-bar" />
        <div className="mt-5 text-[12px] text-[#5e6776] font-mono">
          Sahil · AI Engineer Portfolio · v2026
        </div>
      </motion.div>
    </motion.div>
  );
}
