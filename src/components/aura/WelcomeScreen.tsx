import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Play, Compass, Menu, X, Layers } from "lucide-react";
import { useState } from "react";
import abnaLogo from "@/assets/abnawhitelogo.png";
import hudVisual from "@/assets/imgbawah.jpeg";

type Props = {
  onBegin: () => void;
};

export function WelcomeScreen({ onBegin }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"about" | "how" | null>(null);

  return (
    <div className="relative flex min-h-svh h-svh w-screen flex-col justify-between overflow-hidden select-none bg-[#020806] text-[#fffcf5] p-0 md:p-3 lg:p-5 xl:p-6">
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC INSET VIEWPORT CANVAS (Desktop / Tablet Frame)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-1 h-full w-full flex-col justify-between overflow-y-auto lg:overflow-hidden scrollbar-hide rounded-none border-0 md:rounded-2xl lg:rounded-3xl md:border md:border-[var(--sand-gold)]/20 bg-[#030d0a] shadow-none md:shadow-2xl md:shadow-black/80">
        {/* ─────────────────────────────────────────────────────────────
            2. FULL-SCREEN CINEMATIC VIDEO BACKGROUND & LAYERED OVERLAYS
           ───────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="h-full w-full object-cover scale-105 opacity-80 transition-opacity duration-1000"
          >
            <source src="/video-background-landing.mp4" type="video/mp4" />
          </video>

          {/* Layer A: Deep Emerald Atmospheric Color Grade */}
          <div className="absolute inset-0 bg-[#07241c]/30 mix-blend-multiply" />

          {/* Layer B: Vertical Edge Vignettes for Header & Footer Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020806]/85 via-transparent to-[#020907]/90" />

          {/* Layer C: Asymmetric Left-Side Reading Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020806]/95 via-[#020806]/75 to-transparent lg:w-[62%]" />

          {/* Layer D: Subtle Warm Ambient Glow */}
          <div className="absolute -bottom-10 left-[15%] h-[380px] w-[380px] rounded-full bg-[var(--terracotta)]/10 blur-3xl pointer-events-none" />
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. HEADER / TOP NAVIGATION (Clean Luxury Editorial Navigation)
           ───────────────────────────────────────────────────────────── */}
        <header className="relative z-20 w-full px-6 pt-6 pb-4 sm:px-10 md:px-12 lg:px-14 xl:px-16">
          <div className="flex w-full items-center justify-between">
            {/* Left: Official Brand Logo & House Identity */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-col items-start gap-1"
            >
              <img
                src={abnaLogo}
                alt="ABNA Logo"
                className="h-7 w-auto object-contain sm:h-8 md:h-9 drop-shadow-md"
              />
              <span className="font-body text-[8.5px] font-semibold tracking-[0.2em] text-[var(--sand-deep)] uppercase sm:text-[9.5px]">
                ABNA PICKS · SCENT DISCOVERY
              </span>
            </motion.div>

            {/* Right: Clean Unboxed Editorial Navigation Links (Desktop & Tablet) */}
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="hidden items-center gap-8 md:flex"
            >
              <span className="font-body text-xs font-semibold tracking-wider text-[var(--sand-gold)] border-b-2 border-[var(--sand-gold)] pb-0.5">
                Beranda
              </span>
              <button
                type="button"
                onClick={() => setActiveModal("about")}
                className="font-body text-xs font-medium tracking-wider text-[#fffcf5]/75 transition-colors hover:text-[#fffcf5] cursor-pointer"
              >
                Tentang ABNA PICKS
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("how")}
                className="font-body text-xs font-medium tracking-wider text-[#fffcf5]/75 transition-colors hover:text-[#fffcf5] cursor-pointer"
              >
                Cara Kerja
              </button>

              {/* In-Store Discovery Badge */}
              <div className="flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/30 bg-[#061e17]/65 px-3.5 py-1.5 text-[10px] font-medium tracking-wider text-[var(--sand-gold)] backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-sig)] ring-2 ring-[var(--sand-gold)] animate-pulse" />
                <span>IN-STORE DISCOVERY</span>
              </div>
            </motion.nav>

            {/* Mobile Menu Toggle Button */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="flex items-center gap-3 md:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#061e17]/70 text-[#fffcf5] backdrop-blur-md cursor-pointer shadow-md"
                aria-label="Buka Menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────────────
            4. MAIN EDITORIAL COMPOSITION (Asymmetric Grid: 55-60% Left, 40-45% Right)
           ───────────────────────────────────────────────────────────── */}
        <main className="relative z-10 w-full flex-1 flex flex-col justify-end px-6 pt-4 pb-10 sm:px-10 md:px-12 lg:px-14 xl:px-16 lg:pb-14">
          <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
            {/* ──── LEFT EDITORIAL ZONE (Columns 1–7: ~58% width) ──── */}
            <div className="flex flex-col items-start lg:col-span-7 xl:col-span-7 max-w-2xl">
              {/* Minimal Editorial Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] text-[var(--sand-gold)] uppercase opacity-90"
              >
                ✦ ABNA PICKS · SCENT DISCOVERY
              </motion.div>

              {/* Master Editorial Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-left font-display font-black tracking-tight text-[#fffcf5] text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92]"
              >
                <span className="block">CUMA 1 MENIT</span>
                <span className="block">KETEMU</span>
                <span className="block">PARFUM ANDALANMU.</span>
              </motion.h1>

              {/* Supporting Value Proposition Copy */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-[500px] text-left font-body text-sm sm:text-base md:text-[17px] leading-[1.5] text-[#fffcf5]/85"
              >
                Mulai kosultasi aroma singkat dan temukan parfum <strong>ABNA</strong> yang paling
                cocok dengan karakter, selera, dan kebutuhanmu
              </motion.p>

              {/* Dual Call-to-Action Group */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                {/* Primary Action Button */}
                <motion.button
                  type="button"
                  onClick={onBegin}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.975 }}
                  className="group relative inline-flex h-[48px] sm:h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#fffcf5] px-7 sm:px-8 text-xs sm:text-sm font-semibold tracking-wide text-[#020806] shadow-xl shadow-black/40 transition-all hover:bg-white hover:shadow-2xl cursor-pointer"
                >
                  <span>Mulai Konsultasi</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[#020806] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </motion.button>

                {/* Secondary Action Button */}
                <motion.button
                  type="button"
                  onClick={() => setActiveModal("how")}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.975 }}
                  className="group inline-flex h-[48px] sm:h-[52px] items-center justify-center gap-2 rounded-full border border-white/20 bg-[#061e17]/50 px-6 sm:px-7 text-xs sm:text-sm font-medium tracking-wide text-[#fffcf5] backdrop-blur-md transition-all hover:border-[var(--sand-gold)]/50 hover:bg-[#061e17]/80 hover:text-[var(--sand-gold)] cursor-pointer"
                >
                  <span>Cara Kerja</span>
                  <Play className="h-3.5 w-3.5 fill-current opacity-75 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" />
                </motion.button>
              </motion.div>

              {/* Bottom Trust & Assurance Strip */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 sm:mt-7 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-[11px] sm:text-[12px] font-medium tracking-wide text-[#fffcf5]/70"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--sand-gold)]">✦</span>
                  <span>Personal Match</span>
                </div>
                <span className="hidden sm:inline text-white/20">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--sand-gold)]">★</span>
                  <span>Koleksi Aroma ABNA</span>
                </div>
                <span className="hidden sm:inline text-white/20">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--sand-gold)]">🏪</span>
                  <span>Coba Tester Langsung di Store</span>
                </div>
              </motion.div>
            </div>

            {/* ──── RIGHT VISUAL ZONE (Columns 8–12: Floating Olfactive Telemetry HUD) ──── */}
            <div className="flex justify-start lg:justify-end items-end lg:col-span-5 xl:col-span-5 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[380px] rounded-2xl border border-white/[0.12] bg-[#060f0c]/55 p-4 sm:p-5 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
              >
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--terracotta)] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--emerald-sig)] ring-1 ring-[var(--sand-gold)]/60" />
                    </span>
                    <span className="font-body text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#fffcf5]/85 uppercase">
                      YANG AKAN KAMU DAPATKAN
                    </span>
                  </div>
                  <span className="font-body text-[10px] sm:text-[11px] font-medium tracking-widest text-[#fffcf5]/60 uppercase">
                    ABNA · PICKS
                  </span>
                </div>

                {/* Fragrance Visual Area (16:9) */}
                <div className="relative mb-3.5 aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/40 border border-white/[0.08]">
                  <img
                    src={hudVisual}
                    alt="ABNA Olfactive Visual"
                    className="h-full w-full object-cover object-center brightness-95 contrast-105"
                    loading="eager"
                  />
                  {/* Cinematic dark overlay */}
                  <div className="absolute inset-0 bg-[#020806]/25" />
                  {/* Subtle bottom gradient for integration with HUD */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060f0c] via-transparent to-transparent opacity-85" />
                </div>

                {/* Telemetry Benefit Rows */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]">
                    <span className="font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80">
                      Rekomendasi parfum utama
                    </span>
                    <span className="text-[var(--sand-gold)] text-xs">✦</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]">
                    <span className="font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80">
                      Persentase Kecocokan
                    </span>
                    <span className="text-[var(--sand-gold)] text-xs">✦</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]">
                    <span className="font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80">
                      Alasan kecocokan
                    </span>
                    <span className="text-[var(--sand-gold)] text-xs">✦</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]">
                    <span className="font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80">
                      Pilihan alternatif
                    </span>
                    <span className="text-[var(--sand-gold)] text-xs">✦</span>
                  </div>
                </div>

                {/* Footer Summary */}
                <div className="mt-3.5 border-t border-white/[0.08] pt-2.5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-body text-xs font-semibold text-[#fffcf5]">
                      3 Kurasi Aroma Personal
                    </span>
                    <span className="font-body text-[10px] text-[#fffcf5]/60">
                      Disesuaikan dengan suasana & momenmu
                    </span>
                  </div>
                  <span className="font-body text-[9px] sm:text-[10px] font-semibold tracking-widest text-[var(--sand-gold)] uppercase">
                    ABNA PICKS
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. MOBILE NAVIGATION MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#04120e]/95 p-6 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-1">
                <img src={abnaLogo} alt="ABNA Logo" className="h-7 w-auto object-contain" />
                <span className="font-body text-[8.5px] font-semibold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
                  ABNA PICKS · SCENT DISCOVERY
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#fffcf5]"
                aria-label="Tutup Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="font-display text-2xl text-[var(--sand-gold)]"
              >
                Beranda
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveModal("about");
                }}
                className="font-display text-2xl text-[#fffcf5]/85 hover:text-[#fffcf5]"
              >
                Tentang ABNA PICKS
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveModal("how");
                }}
                className="font-display text-2xl text-[#fffcf5]/85 hover:text-[#fffcf5]"
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
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--emerald-sig)] py-4 text-xs font-semibold tracking-widest text-[#fffcf5]"
              >
                <span>MULAI KONSULTASI</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          6. ABOUT & HOW IT WORKS EDITORIAL MODALS
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
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl border border-[var(--sand-gold)]/30 bg-[#061f18] p-6 text-[#fffcf5] shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#fffcf5]/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {activeModal === "about" && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--sand-gold)]/15 px-3 py-1 text-[10px] font-semibold tracking-widest text-[var(--sand-gold)] uppercase">
                    <Compass className="h-3 w-3" />
                    <span>TENTANG ABNA PICKS</span>
                  </div>
                  <h3 className="font-display mt-3 text-2xl text-[#fffcf5]">
                    Oracle Olfaktif Pribadimu
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#fffcf5]/80">
                    ABNA PICKS adalah pengalaman konsultasi aroma digital resmi dari{" "}
                    <strong>ABNA Signature</strong>. Menggabungkan model profil olfaktif 10-dimensi
                    dengan kecerdasan naratif, ABNA PICKS menerjemahkan preferensi suasana,
                    karakter, dan momen menjadi 3 rekomendasi parfum terbaik.
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        onBegin();
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--emerald-sig)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[var(--emerald-deep)]"
                    >
                      <span>Mulai Sekarang</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeModal === "how" && (
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--sand-gold)]/15 px-3 py-1 text-[10px] font-semibold tracking-widest text-[var(--sand-gold)] uppercase">
                    <Layers className="h-3 w-3" />
                    <span>CARA KERJA</span>
                  </div>
                  <h3 className="font-display mt-3 text-2xl text-[#fffcf5]">7 Pertanyaan Ringan</h3>
                  <div className="mt-4 space-y-2 text-xs text-[#fffcf5]/85">
                    <div className="flex gap-3 rounded-lg bg-white/5 p-2">
                      <span className="font-mono font-bold text-[var(--sand-gold)]">01</span>
                      <span>
                        <strong>Karakter Aroma:</strong> Kesan diri yang ingin ditampilkan.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-2">
                      <span className="font-mono font-bold text-[var(--sand-gold)]">02</span>
                      <span>
                        <strong>Jenis Aroma Favorit:</strong> Keluarga aroma yang paling disukai.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-2">
                      <span className="font-mono font-bold text-[var(--sand-gold)]">03</span>
                      <span>
                        <strong>Suasana Aroma:</strong> Nuansa lingkungan yang terasa paling nyaman.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-2">
                      <span className="font-mono font-bold text-[var(--sand-gold)]">04</span>
                      <span>
                        <strong>Momen Pemakaian:</strong> Kebutuhan aktivitas pemakaian harian.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-2">
                      <span className="font-mono font-bold text-[var(--sand-gold)]">05</span>
                      <span>
                        <strong>Intensitas Aroma:</strong> Tingkat kekuatan pancaran wangi.
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-2">
                      <span className="font-mono font-bold text-[var(--sand-gold)]">06</span>
                      <span>
                        <strong>Range Usia:</strong> Segmentasi preferensi usia (opsional).
                      </span>
                    </div>
                    <div className="flex gap-3 rounded-lg bg-white/5 p-2">
                      <span className="font-mono font-bold text-[var(--sand-gold)]">07</span>
                      <span>
                        <strong>Range Harga Nyaman:</strong> Kisaran budget nyaman 30ml (opsional).
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
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--emerald-sig)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[var(--emerald-deep)]"
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
