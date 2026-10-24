import { useMotionPreference } from "@/hooks/use-motion-preference";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const STAGES = [
  "Menyiapkan rekomendasi sesuai jawabanmu...",
  "Masih merangkai pilihan aroma. Terima kasih sudah menunggu...",
];

export function LoadingScreen() {
  const [stage, setStage] = useState(0);
  const shouldReduceMotion = useMotionPreference();

  useEffect(() => {
    const timer = window.setTimeout(() => setStage(1), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      className="abna-loading"
      role="status"
      aria-live="polite"
      tabIndex={-1}
      aria-label="Sedang menyiapkan rekomendasi"
    >
      <div className="relative flex h-44 w-44 items-center justify-center" aria-hidden="true">
        {/* Concentric subtle formulation rings */}
        <motion.div
          className="absolute inset-4 rounded-full border border-[#3a5b7d]/20"
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 20, repeat: Infinity, ease: "linear" }
          }
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-[#c6af89]/40"
          animate={shouldReduceMotion ? undefined : { rotate: -360 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: "linear" }
          }
        />

        {/* Ambient formulation glow */}
        <motion.div
          className="absolute h-36 w-36 rounded-full bg-[#c6af89]/15 blur-xl pointer-events-none"
          animate={
            shouldReduceMotion ? undefined : { scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.6, 0.3] }
          }
          transition={
            shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Center Bottle Silhouette Asset */}
        <motion.div
          className="relative h-28 w-20 flex items-center justify-center"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.025, 1] }}
          transition={
            shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <img
            src="/assets-new/Botol Siluet@4x.png"
            alt="ABNA Bottle Silhouette"
            className="h-full w-full object-contain"
          />
        </motion.div>
      </div>
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.45 }}
        className="mt-8 max-w-lg"
      >
        <p className="font-heading text-xs font-bold tracking-widest text-[#c6af89] uppercase">
          SEBENTAR YA
        </p>
        <h2 className="font-heading mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#3a5b7d]">
          Kami Lagi Pilihkan Parfum Buat Kamu
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-body text-[#555555]">
          Jawabanmu sedang dicocokkan dengan aroma yang paling pas dari koleksi ABNA.
        </p>
      </motion.div>

      {/* Activity labels describe the process; they are not measured progress. */}
      <div className="mt-6 min-h-[36px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
            transition={{ duration: shouldReduceMotion ? 0.08 : 0.22 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#f2eee9] px-5 py-2 shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-[#3a5b7d] animate-pulse" />
            <span className="font-heading text-xs font-semibold text-[#3a5b7d]">
              {STAGES[stage]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
