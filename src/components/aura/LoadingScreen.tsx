import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STAGES = [
  "Membaca selera wangimu...",
  "Mencocokkan dengan koleksi ABNA...",
  "Memilih rekomendasi terbaik...",
  "Hasilmu hampir siap...",
];

export function LoadingScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 2-3 second crisp retail curation pacing
    const t = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 750);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* ABNA Scent Emblem */}
      <div className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]">
        {/* Soft Glowing Gradient Orb */}
        <motion.div
          className="aura-orb absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Concentric Gold Rings */}
        <motion.div
          className="absolute inset-6 rounded-full border border-foreground/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-12 rounded-full border border-[var(--sand-gold)]/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Center ABNA Monogram */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl italic text-[var(--sand-gold)]">✦</span>
          <span className="mt-1 font-display text-sm tracking-[0.25em] text-foreground uppercase">
            ABNA
          </span>
        </div>
      </div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 max-w-lg"
      >
        <p className="text-[11px] font-semibold tracking-[0.25em] text-[var(--sand-deep)] uppercase">
          SEBENTAR YA
        </p>
        <h2 className="font-display mt-2 text-2xl tracking-tight text-foreground sm:text-3xl">
          Kami Lagi Pilihkan Parfum Buat Kamu
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
          Jawabanmu sedang dicocokkan dengan aroma yang paling pas dari koleksi ABNA.
        </p>
      </motion.div>

      {/* Dynamic Subtext */}
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--sand-gold)] animate-pulse" />
        <span className="text-xs font-medium tracking-wide text-foreground/80">
          {STAGES[stage]}
        </span>
      </motion.div>
    </section>
  );
}
