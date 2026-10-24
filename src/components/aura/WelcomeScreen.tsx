import { useMotionPreference } from "@/hooks/use-motion-preference";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, Compass, Menu, X, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import whiteLogo from "@/assets/abnawhitelogo.png";

type Props = {
  onBegin: () => void;
};

export function WelcomeScreen({ onBegin }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"about" | "how" | null>(null);
  const shouldReduceMotion = useMotionPreference();
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobileMenuOpen && !activeModal) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() =>
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus(),
    );
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveModal(null);
        setMobileMenuOpen(false);
      }
      if (event.key !== "Tab") return;
      const items = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], [tabindex='0']",
        ) || [],
      );
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, [mobileMenuOpen, activeModal]);

  const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative flex min-h-svh w-full flex-col select-none bg-[#1d3552] text-[#fffcf6]">
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND GRADIENT IMAGE (Page 1 in abnapicks-newUI.pdf)
         ───────────────────────────────────────────────────────────── */}
      <div className="abna-home-background" aria-hidden="true">
        <div className="abna-home-background__color" />

        <motion.img
          src="/assets-new/Botol Siluet@4x.png"
          alt=""
          className="abna-home-background__bottle"
          draggable={false}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -10, 0],
                  opacity: [0.36, 0.46, 0.36],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TOP NAVIGATION (Home, About, Cara Kerja)
         ───────────────────────────────────────────────────────────── */}
      <header className="abna-home-header" inert={mobileMenuOpen || Boolean(activeModal)}>
        <img src={whiteLogo} alt="ABNA Parfumatique" className="abna-home-logo" />

        <nav className="abna-home-nav" aria-label="Navigasi utama">
          <button type="button" aria-current="page" onClick={() => setActiveModal(null)}>
            Home
          </button>
          <button type="button" onClick={() => setActiveModal("about")}>
            About
          </button>
          <button type="button" onClick={() => setActiveModal("how")}>
            Cara Kerja
          </button>
        </nav>

        <motion.button
          type="button"
          onClick={onBegin}
          className="abna-home-cta"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          <span>Mulai Konsultasi</span>
          <ArrowRight size={20} aria-hidden="true" />
        </motion.button>

        <button
          type="button"
          className="abna-home-menu"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Buka menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="abna-mobile-menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. CENTER HERO EDITORIAL CONTENT (Page 1)
         ───────────────────────────────────────────────────────────── */}
      <motion.section
        inert={mobileMenuOpen || Boolean(activeModal)}
        className="abna-home-hero"
        aria-labelledby="abna-home-title"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="abna-home-labels" variants={heroItemVariants}>
          <span>Abna Picks</span>
          <span>Scent Discovery</span>
        </motion.div>

        <motion.h1 id="abna-home-title" className="abna-home-title" variants={heroItemVariants}>
          <span className="abna-home-title__accent">1 Menit</span>

          <span>Ketemu Parfum</span>

          <span>Andalanmu.</span>
        </motion.h1>

        <motion.p className="abna-home-description" variants={heroItemVariants}>
          Mulai konsultasi aroma singkat dan temukan parfum
          <br className="abna-home-description__break" /> Abna yang paling cocok dengan karakter,
          selera, dan kebutuhanmu.
        </motion.p>

        <motion.button
          type="button"
          onClick={onBegin}
          className="abna-home-start"
          variants={heroItemVariants}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          Mulai Konsultasi <ArrowRight size={18} aria-hidden="true" />
        </motion.button>
        <motion.p className="abna-home-promise" variants={heroItemVariants}>
          9 pertanyaan <span aria-hidden="true">·</span> 3 pilihan aroma{" "}
          <span aria-hidden="true">·</span> Sepenuhnya tentang kamu
        </motion.p>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. MOBILE NAVIGATION MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu utama"
            id="abna-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#1d3552]/95 p-6 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-display italic text-xl text-[#fffcf6]">Abna Picks</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#fffcf6]"
                aria-label="Tutup Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-6 text-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl text-[#c6af89]"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveModal("about");
                }}
                className="font-display text-2xl text-[#fffcf6]/85 hover:text-[#fffcf6]"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveModal("how");
                }}
                className="font-display text-2xl text-[#fffcf6]/85 hover:text-[#fffcf6]"
              >
                Cara Kerja
              </button>
            </nav>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBegin();
                }}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#3a5b7d] py-4 text-xs font-semibold tracking-widest text-[#fffcf6]"
              >
                <span>MULAI KONSULTASI</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          5. ABOUT & HOW IT WORKS MODALS
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={activeModal === "about" ? "Tentang ABNA PICKS" : "Cara kerja"}
              initial={{ scale: shouldReduceMotion ? 1 : 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: shouldReduceMotion ? 1 : 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-[#c6af89]/30 bg-[#243f5f] p-6 text-[#fffcf6] shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup informasi"
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#fffcf6]/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {activeModal === "about" && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#c6af89]/20 px-3 py-1 text-[11px] font-semibold tracking-widest text-[#c6af89] uppercase">
                    <Compass className="h-3.5 w-3.5" />
                    <span>TENTANG ABNA PICKS</span>
                  </div>
                  <h3 className="font-display mt-3 text-2xl text-[#fffcf6]">
                    Konsultasi Aroma Singkat ABNA
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#fffcf6]/80 font-body">
                    ABNA PICKS adalah pengalaman konsultasi aroma digital resmi dari{" "}
                    <strong>ABNA Signature</strong>. Menghubungkan preferensi karakter, aroma
                    favorit, suasana, intensitas, dan momen pemakaianmu menjadi 3 rekomendasi parfum
                    terbaik dari koleksi ABNA.
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        onBegin();
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#3a5b7d] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#2c4763]"
                    >
                      <span>Mulai Sekarang</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeModal === "how" && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#c6af89]/20 px-3 py-1 text-[11px] font-semibold tracking-widest text-[#c6af89] uppercase">
                    <Layers className="h-3.5 w-3.5" />
                    <span>CARA KERJA</span>
                  </div>
                  <h3 className="font-display mt-3 text-2xl text-[#fffcf6]">Cukup 1 Menit</h3>
                  <div className="mt-4 space-y-2 text-xs text-[#fffcf6]/85 font-body">
                    <div className="flex gap-3 rounded-xl bg-white/5 p-2.5">
                      <span className="font-mono font-bold text-[#c6af89]">01</span>
                      <span>
                        <strong>Kesan Karakter:</strong> Nuansa diri yang ingin ditampilkan.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-xl bg-white/5 p-2.5">
                      <span className="font-mono font-bold text-[#c6af89]">02</span>
                      <span>
                        <strong>Aroma Favorit:</strong> Floral, Woody, Citrus, Spicy, dll.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-xl bg-white/5 p-2.5">
                      <span className="font-mono font-bold text-[#c6af89]">03</span>
                      <span>
                        <strong>Momen Pemakaian:</strong> Harian, pesta, kerja, dll.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-xl bg-white/5 p-2.5">
                      <span className="font-mono font-bold text-[#c6af89]">04</span>
                      <span>
                        <strong>Intensitas Aroma:</strong> Kekuatan pancaran wangi yang diinginkan.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-xl bg-white/5 p-2.5">
                      <span className="font-mono font-bold text-[#c6af89]">05</span>
                      <span>
                        <strong>Suasana:</strong> Nuansa lingkungan yang membuatmu nyaman.
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        onBegin();
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#3a5b7d] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#2c4763]"
                    >
                      <span>Mulai Konsultasi</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
