import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCcw, MessageSquare, Download, Sparkles, Volume2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Recommendation } from "@/lib/recommendations.functions";
import { AbnaProductCard } from "./AbnaProductCard";

type Props = {
  recommendations: Recommendation[];
  onRestart: () => void;
};

export function ResultsScreen({ recommendations, onRestart }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string | null>(null);
  const voiceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hero = recommendations[0];
  const alternates = recommendations.slice(1);

  // Clean up any active speech synthesis and timers on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
    };
  }, []);

  // Primary Action: AURA AI Voice Request for Top #1 Fragrance Tester
  const handleCobaTester = useCallback(() => {
    if (!hero) return;

    const fragranceName = hero.name;
    const speechText = `Aku ingin mencoba atau mencium aroma ${fragranceName}.`;

    // 1. Immediate tactile and visual feedback
    setIsSpeaking(true);
    setVoiceStatus(`Meminta tester untuk: ${fragranceName}`);

    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current);
    }

    // 2. Web Speech API Execution with native Indonesian voice
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        // Cancel any active audio so repeated clicks restart smoothly without overlap
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = "id-ID";
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Pick Indonesian voice if available on system
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(
          (v) =>
            v.lang === "id-ID" ||
            v.lang.startsWith("id") ||
            v.name.toLowerCase().includes("indonesia"),
        );
        if (idVoice) {
          utterance.voice = idVoice;
        }

        utterance.onend = () => {
          setIsSpeaking(false);
          voiceTimeoutRef.current = setTimeout(() => {
            setVoiceStatus(null);
          }, 2500);
        };

        utterance.onerror = (e) => {
          console.warn("[AURA AI Voice] Speech synthesis ended or cancelled:", e);
          setIsSpeaking(false);
          voiceTimeoutRef.current = setTimeout(() => {
            setVoiceStatus(null);
          }, 2000);
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("[AURA AI Voice] Speech synthesis unavailable or threw error:", err);
        setIsSpeaking(false);
        voiceTimeoutRef.current = setTimeout(() => {
          setVoiceStatus(null);
        }, 3000);
      }
    } else {
      // Graceful fallback if Web Speech is not supported
      console.warn("[AURA AI Voice] Web Speech API is not supported in this browser.");
      voiceTimeoutRef.current = setTimeout(() => {
        setIsSpeaking(false);
        voiceTimeoutRef.current = setTimeout(() => {
          setVoiceStatus(null);
        }, 2000);
      }, 1500);
    }
  }, [hero]);

  // Direct WhatsApp share for customer retention
  const handleWhatsAppShare = () => {
    if (!hero) return;
    const summary = `Halo ABNA Parfum, saya baru saja konsultasi di ABNA Picks.\n\n*Hasil Rekomendasi Saya:*\n01. *${hero.name}* (${hero.house}) — ${hero.match_percent}% Cocok\nKarakter: ${hero.category}\nSemerbak: ${hero.projection} | Ketahanan: ${hero.longevity}\n\nSaya ingin mencoba tester varian ini di store.`;
    const encoded = encodeURIComponent(summary);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  // High-Resolution Canvas Card Downloader (Zero-dependency, works directly in any browser/mobile)
  const handleDownloadImage = async () => {
    if (!hero || downloading) return;
    setDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1440;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Background Gradient (Luxury Emerald to Deep Onyx)
      const grad = ctx.createLinearGradient(0, 0, 0, 1440);
      grad.addColorStop(0, "#030d0a");
      grad.addColorStop(0.5, "#07241c");
      grad.addColorStop(1, "#020a07");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1440);

      // Outer border in Sand Gold
      ctx.strokeStyle = "rgba(217, 180, 110, 0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, 1020, 1380);

      // Header Brand
      ctx.fillStyle = "#fffcf5";
      ctx.font = "bold 38px serif";
      ctx.textAlign = "center";
      ctx.fillText("ABNA SIGNATURE", 540, 100);

      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 18px sans-serif";
      ctx.letterSpacing = "6px";
      ctx.fillText("ABNA PICKS · HASIL KONSULTASI", 540, 140);

      // Hero Card Container
      ctx.fillStyle = "rgba(6, 31, 24, 0.85)";
      ctx.strokeStyle = "rgba(217, 180, 110, 0.6)";
      ctx.lineWidth = 2;
      roundRect(ctx, 60, 180, 960, 800, 24);
      ctx.fill();
      ctx.stroke();

      // Top Tag
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("01 - PILIHAN UTAMA KAMU", 100, 240);

      // Match %
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 64px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${hero.match_percent}%`, 980, 260);

      ctx.fillStyle = "rgba(255, 252, 245, 0.7)";
      ctx.font = "14px sans-serif";
      ctx.fillText("Kecocokan", 980, 285);

      // Fragrance Name
      ctx.fillStyle = "#fffcf5";
      ctx.font = "bold 56px serif";
      ctx.textAlign = "left";
      ctx.fillText(hero.name, 100, 320);

      // Category & Aura
      ctx.fillStyle = "#d9b46e";
      ctx.font = "italic 24px serif";
      ctx.fillText(`${hero.category} · ${hero.aura || "Signature Match"}`, 100, 365);

      // Kenapa Cocok Buat Kamu
      ctx.fillStyle = "rgba(217, 180, 110, 0.15)";
      ctx.strokeStyle = "rgba(217, 180, 110, 0.3)";
      ctx.lineWidth = 1;
      roundRect(ctx, 100, 400, 880, 170, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("KENAPA COCOK BUAT KAMU", 125, 435);

      ctx.fillStyle = "#fffcf5";
      ctx.font = "20px sans-serif";
      wrapText(ctx, hero.why_match, 125, 475, 830, 30);

      // Detail Aroma Notes
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("DETAIL AROMA", 100, 620);

      ctx.fillStyle = "#fffcf5";
      ctx.font = "18px sans-serif";
      ctx.fillText(`• Awal: ${hero.top_notes.join(", ")}`, 100, 660);
      ctx.fillText(`• Tengah: ${hero.middle_notes.join(", ")}`, 100, 700);
      ctx.fillText(`• Akhir: ${hero.base_notes.join(", ")}`, 100, 740);

      // Semerbak & Ketahanan
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(`Semerbak: ${hero.projection}   |   Ketahanan: ${hero.longevity}`, 100, 800);

      ctx.font = "16px sans-serif";
      ctx.fillStyle = "rgba(255, 252, 245, 0.8)";
      ctx.fillText(`Tags: ${(hero.mood_tags || []).join(", ")}`, 100, 840);

      // Alternatives Box
      if (alternates.length > 0) {
        ctx.fillStyle = "rgba(255, 252, 245, 0.05)";
        ctx.strokeStyle = "rgba(255, 252, 245, 0.15)";
        roundRect(ctx, 60, 1010, 960, 240, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#d9b46e";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("PILIHAN ALTERNATIF DI STORE", 100, 1055);

        alternates.forEach((alt, idx) => {
          const y = 1105 + idx * 60;
          ctx.fillStyle = "#fffcf5";
          ctx.font = "bold 22px serif";
          ctx.fillText(`0${alt.rank}. ${alt.name}`, 100, y);

          ctx.fillStyle = "rgba(255, 252, 245, 0.7)";
          ctx.font = "16px sans-serif";
          ctx.fillText(`(${alt.category} · ${alt.match_percent}% Cocok)`, 380, y);
        });
      }

      // Footer Store Callout
      ctx.fillStyle = "#d9b46e";
      ctx.font = "italic 20px serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Tunjukkan kartu ini ke Beauty Advisor ABNA untuk mencoba tester langsung di store.",
        540,
        1330,
      );

      // Trigger download
      const link = document.createElement("a");
      link.download = `ABNA-Picks-${hero.name.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Gagal mendownload hasil rekomendasi:", e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="relative flex flex-1 flex-col px-4 pt-6 pb-36 sm:px-8 md:px-12 md:pt-10">
      {/* 1. Results Editorial Masthead */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        {/* Editorial Kicker */}
        <p className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[var(--sand-deep)] uppercase">
          <Sparkles className="h-3.5 w-3.5 text-[var(--sand-gold)]" />
          <span>HASIL ABNA PICKS</span>
        </p>

        {/* High-Contrast Editorial Heading */}
        <h2 className="font-display mt-3 text-3xl font-black tracking-[-0.035em] leading-[0.95] text-balance text-foreground sm:text-4xl md:text-5xl lg:text-[48px]">
          Aroma Ini Dibuat untuk Seleramu
        </h2>

        {/* Supporting Context */}
        <p className="mx-auto mt-3 max-w-xl text-balance font-body text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground font-normal">
          Dari jawabanmu, kami pilihkan parfum yang paling dekat dengan karakter, selera, dan momen
          pemakaianmu. Coba hirup pelan, lalu rasakan kesan pertamanya.
        </p>
      </motion.div>

      {/* 2. Main Content Flow: Hero Card (#1) + Side-by-Side Alternates (#2 & #3) */}
      <div className="mx-auto mt-8 w-full max-w-5xl space-y-10 sm:space-y-12 md:mt-10">
        {/* HERO #1 RECOMMENDATION CARD */}
        {hero && (
          <AbnaProductCard
            rec={hero}
            isHero={true}
            onCobaTester={handleCobaTester}
            isSpeaking={isSpeaking}
          />
        )}

        {/* ALTERNATIVES SECTION (#2 & #3) */}
        {alternates.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--sand-gold)]/20 pb-2">
              <span className="h-2 w-2 rounded-full bg-[var(--sand-gold)]" />
              <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase">
                Pilihan Alternatif Karakter Serupa
              </h4>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {alternates.map((rec) => (
                <AbnaProductCard key={rec.rank} rec={rec} isHero={false} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. UNIFIED RETAIL CONVERSION BAR (3-Tier Hierarchy) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-16"
      >
        {/* Voice Active Status Feedback (Live Notification Region) */}
        <div aria-live="polite" className="h-6 flex items-center justify-center">
          <AnimatePresence>
            {voiceStatus && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/40 bg-[var(--sand-gold)]/20 px-4 py-1 text-xs font-semibold text-[var(--sand-deep)] shadow-xs"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--terracotta)] animate-ping" />
                <span>{voiceStatus}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TIER 1: DOMINANT PRIMARY CONVERSION (Coba Tester di Store) */}
        <motion.button
          type="button"
          onClick={handleCobaTester}
          whileHover={{ scale: 1.015, y: -2 }}
          whileTap={{ scale: 0.985 }}
          aria-label={`Coba tester di store untuk ${hero?.name || "parfum utama"}`}
          className={`group relative flex min-h-[54px] w-full flex-col items-center justify-center gap-1 rounded-2xl px-8 py-3.5 text-center transition-all duration-300 cursor-pointer shadow-md ${
            isSpeaking
              ? "bg-[var(--terracotta)] text-white shadow-xl shadow-[var(--terracotta)]/30 ring-2 ring-[var(--sand-gold)]"
              : "bg-[var(--emerald-sig)] text-white shadow-lg shadow-[var(--emerald-sig)]/25 hover:bg-[var(--emerald-deep)] hover:shadow-xl hover:shadow-[var(--emerald-sig)]/35"
          }`}
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase">
            {isSpeaking ? (
              <Volume2 className="h-4 w-4 text-[var(--sand-gold)] animate-pulse" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-[var(--sand-gold)]" />
            )}
            <span>{isSpeaking ? "MEMANGGIL BEAUTY ADVISOR..." : "Coba Tester di Store"}</span>
          </div>
          <span className="text-[11px] text-white/85">
            {isSpeaking
              ? `Menyuarakannya ke store: “${hero?.name}”`
              : "Tunjukkan hasil ini ke Beauty Advisor ABNA"}
          </span>
        </motion.button>

        {/* TIER 2: SECONDARY UTILITY ACTIONS (Download & WhatsApp Side-by-Side) */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Download Canvas Card */}
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex min-h-[50px] w-full flex-col items-center justify-center gap-0.5 rounded-xl border border-[var(--sand-gold)]/35 bg-card/80 px-4 py-2.5 text-center text-foreground shadow-xs transition-all hover:bg-[var(--ivory)] hover:border-[var(--sand-gold)]/60 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground">
              <Download className="h-3.5 w-3.5 text-[var(--sand-deep)]" />
              <span>{downloading ? "Menyiapkan Gambar..." : "Download Hasil"}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Simpan hasil rekomendasi sebagai gambar
            </span>
          </button>

          {/* WhatsApp Direct Share */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex min-h-[50px] w-full flex-col items-center justify-center gap-0.5 rounded-xl border border-[var(--sand-gold)]/35 bg-card/80 px-4 py-2.5 text-center text-foreground shadow-xs transition-all hover:bg-[var(--ivory)] hover:border-[var(--sand-gold)]/60 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground">
              <MessageSquare className="h-3.5 w-3.5 text-[var(--sand-deep)]" />
              <span>Kirim ke WhatsApp</span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Simpan ke WhatsApp agar mudah dibuka
            </span>
          </button>
        </div>

        {/* TIER 3: REFINED GHOST SESSION NAVIGATION */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="group flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground transition-all hover:text-foreground cursor-pointer"
          >
            <RotateCcw
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-90 text-[var(--sand-deep)]"
              strokeWidth={2}
            />
            <span className="uppercase">MULAI KONSULTASI BARU</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// Canvas Helper Functions
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
