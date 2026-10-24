import { useMotionPreference } from "@/hooks/use-motion-preference";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { Recommendation } from "@/lib/recommendations.functions";
import { ResultCardDeck } from "./ResultCardDeck";
import { Download, MessageCircle, RotateCcw, RefreshCw, Check } from "lucide-react";

type Props = {
  recommendations: Recommendation[];
  onRestart: () => void;
  onRegenerate?: () => Promise<void> | void;
  isRegenerating?: boolean;
  hasRegenerated?: boolean;
  regenerationMessage?: string | null;
};

export function ResultsScreen({
  recommendations,
  onRestart,
  onRegenerate,
  isRegenerating = false,
  hasRegenerated = false,
  regenerationMessage = null,
}: Props) {
  const resultRef = useRef<HTMLElement>(null);
  const downloadLock = useRef(false);
  useEffect(() => {
    resultRef.current
      ?.querySelector<HTMLElement>("[data-discovery-title]")
      ?.focus({ preventScroll: true });
  }, []);
  const [downloading, setDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const shouldReduceMotion = useMotionPreference();

  const hero = recommendations[0];
  const alternates = recommendations.slice(1);

  const handleRegenerateClick = () => {
    if (isRegenerating || hasRegenerated || !onRegenerate) return;
    onRegenerate();
  };

  // Direct WhatsApp share for customer retention
  const handleWhatsAppShare = () => {
    if (!hero) return;
    const summary = `Halo ABNA Parfum, saya baru saja konsultasi di ABNA Picks.\n\n*Hasil Rekomendasi Saya:*\n01. *${hero.name}* (${hero.house}) — ${hero.match_percent}% Cocok\nKarakter: ${hero.category}\nSemerbak: ${hero.projection} | Ketahanan: ${hero.longevity}\n\nSaya ingin mencoba tester varian ini di store.`;
    const encoded = encodeURIComponent(summary);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadImage = async () => {
    if (!hero || downloadLock.current) return;
    downloadLock.current = true;
    setDownloading(true);
    setDownloadStatus(null);
    try {
      await document.fonts.ready;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas tidak tersedia");
      const font = getComputedStyle(document.querySelector(".abna-ui") || document.body).fontFamily;
      const sections = [
        { title: hero.house, text: hero.name, size: 64 },
        {
          title: "KARAKTER",
          text: [hero.category, hero.aura].filter(Boolean).join(" · "),
          size: 28,
        },
        { title: "KENAPA COCOK?", text: hero.why_match, size: 30 },
        { title: "TOP NOTES", text: hero.top_notes.join(", ") || "Belum tersedia", size: 28 },
        { title: "HEART NOTES", text: hero.middle_notes.join(", ") || "Belum tersedia", size: 28 },
        { title: "BASE NOTES", text: hero.base_notes.join(", ") || "Belum tersedia", size: 28 },
        ...alternates.map((rec) => ({
          title: `ALTERNATIF ${rec.rank}`,
          text: `${rec.name} (${rec.house}) · ${rec.match_percent}% cocok`,
          size: 28,
        })),
      ].map((section) => {
        ctx.font = `${section.size}px ${font}`;
        const lines = wrapLines(ctx, section.text, 1640);
        return { ...section, lines, height: 70 + lines.length * section.size * 1.4 };
      });
      canvas.width = 1920;
      canvas.height = Math.ceil(
        Math.max(1080, 420 + sections.reduce((sum, section) => sum + section.height, 0)),
      );
      ctx.fillStyle = "#fffcf6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f0eeeb";
      roundRect(ctx, 80, 160, 1760, canvas.height - 250, 40);
      ctx.fill();
      ctx.fillStyle = "#3a5b7d";
      ctx.font = `bold 42px ${font}`;
      ctx.fillText("ABNA PICKS · HASIL KONSULTASI", 140, 105);
      ctx.font = `bold 48px ${font}`;
      ctx.fillText(`${hero.match_percent}% cocok`, 140, 240);
      let y = 315;
      for (const section of sections) {
        ctx.fillStyle = "#3a5b7d";
        ctx.font = `bold 22px ${font}`;
        ctx.fillText(section.title, 140, y);
        y += 42;
        ctx.fillStyle = "#1c2732";
        ctx.font = `${section.size}px ${font}`;
        for (const line of section.lines) {
          ctx.fillText(line, 140, y);
          y += section.size * 1.4;
        }
        y += 28;
      }
      ctx.fillStyle = "#3a5b7d";
      ctx.font = `24px ${font}`;
      ctx.fillText(
        "Tunjukkan hasil ini ke Beauty Advisor ABNA untuk mencoba tester di store.",
        140,
        canvas.height - 40,
      );
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (value) => (value ? resolve(value) : reject(new Error("PNG gagal dibuat"))),
          "image/png",
        );
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `ABNA-Picks-${hero.name.replace(/[^a-z0-9_-]+/gi, "_")}.png`;
      link.href = url;
      link.click();
      setDownloadStatus("Hasil siap disimpan. Cek unduhan di perangkatmu.");
      window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error("Gagal mengunduh hasil:", error);
      setDownloadStatus("Gambar belum berhasil dibuat. Silakan coba lagi.");
    } finally {
      downloadLock.current = false;
      setDownloading(false);
    }
  };

  const btnVariants = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.04, transition: { duration: 0.15 } },
        whileTap: { scale: 0.96, transition: { duration: 0.1 } },
      };

  const containerVariants: Variants = shouldReduceMotion
    ? {}
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
      };

  const itemVariants: Variants = shouldReduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
      };

  return (
    <section ref={resultRef} className="abna-results">
      {hero ? (
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={recommendations[0]?.name ?? "deck"}
                initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResultCardDeck recommendations={recommendations} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <p className="abna-results__regenerate-note" id="regenerate-guidance">
            {hasRegenerated
              ? "Kesempatan alternatif sudah digunakan. Simpan pilihanmu atau mulai perjalanan baru."
              : "Belum menemukan yang pas? Jelajahi 3 alternatif satu kali dalam sesi ini."}
          </p>
          <motion.div className="abna-results__actions" variants={itemVariants}>
            <motion.button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              {...btnVariants}
            >
              <Download size={18} aria-hidden="true" />
              {downloading ? "Menyiapkan..." : "Download Hasil"}
            </motion.button>

            <motion.button type="button" onClick={handleWhatsAppShare} {...btnVariants}>
              <MessageCircle size={18} aria-hidden="true" />
              Bagikan ke WhatsApp
            </motion.button>

            {hasRegenerated ? (
              <button type="button" disabled className="is-primary" aria-disabled="true">
                <Check size={18} aria-hidden="true" />
                Rekomendasi Diperbarui
              </button>
            ) : (
              <motion.button
                type="button"
                onClick={handleRegenerateClick}
                aria-describedby="regenerate-guidance"
                aria-busy={isRegenerating}
                disabled={isRegenerating || !onRegenerate}
                className="is-primary"
                {...btnVariants}
              >
                <RefreshCw
                  size={18}
                  className={isRegenerating ? "animate-spin" : ""}
                  aria-hidden="true"
                />
                {isRegenerating ? "Menyiapkan rekomendasi alternatif..." : "Coba Rekomendasi Lain"}
              </motion.button>
            )}

            <motion.button
              type="button"
              onClick={onRestart}
              className="is-restart"
              {...btnVariants}
            >
              <RotateCcw size={18} aria-hidden="true" />
              Mulai Ulang
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {(regenerationMessage || downloadStatus) && (
              <motion.p
                key={regenerationMessage ?? downloadStatus ?? "status"}
                className="abna-results__status"
                role="status"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {downloadStatus || regenerationMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="abna-results__empty">
          <h2>Rekomendasi belum tersedia</h2>
          <p>Silakan mulai konsultasi kembali.</p>
          <button type="button" onClick={onRestart}>
            Mulai Ulang
          </button>
        </div>
      )}
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

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = "";
      for (const char of word) {
        if (line && ctx.measureText(line + char).width > maxWidth) {
          lines.push(line);
          line = "";
        }
        line += char;
      }
    }
    lines.push(line);
  }
  return lines;
}
