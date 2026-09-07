import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Volume2 } from "lucide-react";
import type { Recommendation } from "@/lib/recommendations.functions";

export interface AbnaProductPresentationProps {
  rec: Recommendation;
  isHero?: boolean;
  onCobaTester?: () => void;
  isSpeaking?: boolean;
  // Optional catalog fields that only render when authoritative data is explicitly provided
  imageUrl?: string;
  variantName?: string;
  size?: string;
  priceFormatted?: string;
  availabilityStatus?: "in_stock" | "out_of_stock" | "ask_staff" | string;
}

export function AbnaProductCard({
  rec,
  isHero = false,
  onCobaTester,
  isSpeaking = false,
  imageUrl,
  variantName,
  size,
  priceFormatted,
  availabilityStatus,
}: AbnaProductPresentationProps) {
  // Authoritative identity & category
  const brandName = rec.house || "ABNA PARFUM";
  const displayTitle = variantName || rec.name;
  const subtitle = size ? `${rec.category} · ${size}` : rec.category;

  // Check existence of notes
  const hasTopNotes = Array.isArray(rec.top_notes) && rec.top_notes.length > 0;
  const hasMiddleNotes = Array.isArray(rec.middle_notes) && rec.middle_notes.length > 0;
  const hasBaseNotes = Array.isArray(rec.base_notes) && rec.base_notes.length > 0;
  const hasPyramid = hasTopNotes || hasMiddleNotes || hasBaseNotes;

  // Check existence of metrics
  const hasProjection = Boolean(rec.projection);
  const hasLongevity = Boolean(rec.longevity);
  const hasMetrics = hasProjection || hasLongevity;

  // Check existence of tags
  const tags = [...(rec.mood_tags || []), ...(rec.occasions || [])].filter(Boolean);
  const hasTags = tags.length > 0;

  // HERO CARD PRESENTATION (#1 SIGNATURE MATCH)
  if (isHero) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-[var(--sand-gold)]/30 bg-card p-0 shadow-[0_20px_48px_-12px_rgba(11,72,57,0.12)] transition-shadow duration-300 hover:shadow-[0_24px_56px_-12px_rgba(11,72,57,0.18)]"
      >
        {/* Editorial Top Masthead Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--sand-gold)]/25 bg-[#020806] px-6 py-4 text-[#fffcf5] sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sand-gold)] font-display text-[11px] font-bold text-[#020806]">
              01
            </span>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--sand-gold)]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#fffcf5] uppercase">
                01 — SIGNATURE MATCH
              </span>
            </div>
          </div>

          {/* Prominent Match Percentage */}
          {typeof rec.match_percent === "number" && (
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-black tracking-tight text-[var(--sand-gold)] sm:text-4xl">
                {rec.match_percent}%
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] text-[#fffcf5]/80 uppercase">
                COCOK
              </span>
            </div>
          )}
        </div>

        {/* Hero Body Grid (Asymmetric Editorial 7-col / 5-col split on Desktop) */}
        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-12 md:gap-10">
          {/* Left Column: Fragrance Title, Editorial Story, Why Match & Pyramid */}
          <div className="space-y-6 md:col-span-7">
            {/* Visual Anchor: Image or Luxury Editorial Placeholder */}
            {imageUrl ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--sand-gold)]/20 bg-muted">
                <img
                  src={imageUrl}
                  alt={displayTitle}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl border border-[var(--sand-gold)]/20 bg-gradient-to-br from-[#020806] via-[#07241c] to-[#020806] px-6 py-5 text-[#fffcf5] shadow-inner">
                {/* Subtle Luxury Watermark / Ambient glow */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[var(--sand-gold)]/10 blur-2xl" />
                <div className="relative flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--sand-gold)] uppercase">
                      ABNA SIGNATURE FORMULATION
                    </span>
                    <p className="font-serif text-sm italic text-[#fffcf5]/90">
                      {rec.category} · Curated Selection
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sand-gold)]/40 bg-[var(--sand-gold)]/10 font-serif text-sm font-semibold tracking-wider text-[var(--sand-gold)]">
                    A
                  </span>
                </div>
              </div>
            )}

            {/* Brand, Title & Category */}
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[var(--sand-deep)] uppercase">
                  {brandName}
                </p>
                {priceFormatted && (
                  <span className="rounded border border-[var(--sand-gold)]/30 bg-[var(--sand-gold)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--emerald-sig)]">
                    {priceFormatted}
                  </span>
                )}
              </div>
              <h3 className="font-display mt-1.5 text-3xl font-black tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[40px] leading-[1.05]">
                {displayTitle}
              </h3>
              {rec.category && (
                <p className="mt-1 font-serif text-base italic text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {/* Aura Tagline */}
            {rec.aura && (
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/35 bg-[var(--sand-gold)]/10 px-3.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sand-gold)]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--emerald-sig)] uppercase">
                  {rec.aura}
                </span>
              </div>
            )}

            {/* Editorial Story */}
            {rec.story && (
              <div className="border-l-2 border-[var(--sand-gold)]/60 pl-4 py-0.5">
                <p className="font-serif text-base italic leading-relaxed text-foreground/85 sm:text-lg">
                  “{rec.story}”
                </p>
              </div>
            )}

            {/* Why This Matches Section */}
            {rec.why_match && (
              <div className="relative overflow-hidden rounded-xl border border-[var(--sand-gold)]/35 bg-gradient-to-br from-[var(--sand-gold)]/10 via-[var(--sand-gold)]/5 to-transparent p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--emerald-sig)]" />
                  <p className="text-[11px] font-bold tracking-[0.22em] text-[var(--emerald-sig)] uppercase">
                    KENAPA COCOK BUAT KAMU
                  </p>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground/90 sm:text-[15px] font-normal">
                  {rec.why_match}
                </p>
              </div>
            )}

            {/* Olfactive Pyramid Redesign */}
            {hasPyramid && (
              <div className="space-y-3 rounded-xl border border-[var(--sand-gold)]/25 bg-[var(--ivory)]/60 p-5">
                <div className="flex items-center justify-between border-b border-[var(--sand-gold)]/20 pb-2">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
                    OLFACTIVE PYRAMID
                  </span>
                  <span className="font-serif text-xs italic text-muted-foreground">
                    Detail Catatan Aroma
                  </span>
                </div>
                <div className="space-y-2.5 pt-1">
                  {hasTopNotes && <EditorialPyramidTier tier="TOP" notes={rec.top_notes} />}
                  {hasMiddleNotes && <EditorialPyramidTier tier="HEART" notes={rec.middle_notes} />}
                  {hasBaseNotes && <EditorialPyramidTier tier="BASE" notes={rec.base_notes} />}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Performance, Occasions & Visual Guidance */}
          <div className="flex flex-col justify-between space-y-6 md:col-span-5 md:border-l md:border-[var(--sand-gold)]/20 md:pl-8">
            <div className="space-y-6">
              {/* Performance / Sillage & Longevity */}
              {hasMetrics && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
                    PERFORMANCE METRICS
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {hasProjection && (
                      <div className="rounded-xl border border-[var(--sand-gold)]/20 bg-background/80 p-3.5">
                        <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                          Semerbak
                        </p>
                        <p className="font-display mt-1 text-sm font-bold text-foreground sm:text-base">
                          {rec.projection}
                        </p>
                      </div>
                    )}
                    {hasLongevity && (
                      <div className="rounded-xl border border-[var(--sand-gold)]/20 bg-background/80 p-3.5">
                        <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                          Ketahanan
                        </p>
                        <p className="font-display mt-1 text-sm font-bold text-foreground sm:text-base">
                          {rec.longevity}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Character & Occasions */}
              {hasTags && (
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
                    KARAKTER & MOMEN
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-[var(--sand-gold)]/25 bg-background px-3 py-1 font-serif text-xs italic text-foreground shadow-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* In-Store Guidance Box / Tester Action (Visually Refined) */}
            <div className="rounded-xl border border-[var(--sand-gold)]/25 bg-[var(--ivory)]/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-[var(--sand-deep)] uppercase">
                  STORE TESTER STATUS
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[var(--emerald-sig)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-sig)]" />
                  Tersedia di Store
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Tunjukkan nama parfum ini kepada Beauty Advisor ABNA untuk mencoba aroma langsung di
                gerai.
              </p>

              {onCobaTester && (
                <motion.button
                  type="button"
                  onClick={onCobaTester}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  aria-label={`Minta tester untuk ${displayTitle}`}
                  className={`mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-center transition-all cursor-pointer ${
                    isSpeaking
                      ? "bg-[var(--terracotta)] text-white shadow-md ring-2 ring-[var(--sand-gold)]/40"
                      : "border border-[var(--sand-gold)]/40 bg-background text-foreground hover:bg-[var(--emerald-sig)] hover:text-white hover:border-[var(--emerald-sig)]"
                  }`}
                >
                  {isSpeaking ? (
                    <Volume2 className="h-4 w-4 text-[var(--sand-gold)] animate-pulse" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-[var(--sand-deep)]" />
                  )}
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    {isSpeaking ? "Memanggil Staff..." : "Tes Aroma Varian Ini"}
                  </span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // ALTERNATIVE CARD VIEW (#2 & #3)
  const altRankLabel =
    rec.rank === 2
      ? "02 — LEBIH FRESH"
      : rec.rank === 3
        ? "03 — LEBIH MANIS"
        : `0${rec.rank} — ALTERNATIF`;

  const altSubtitle =
    rec.rank === 2
      ? "Untuk kamu yang ingin karakter serupa, tapi dengan kesan yang lebih segar dan ringan."
      : rec.rank === 3
        ? "Untuk kamu yang ingin aroma lebih lembut, manis, dan nyaman dipakai."
        : rec.why_match;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--sand-gold)]/30 bg-card p-6 shadow-[0_12px_32px_-8px_rgba(11,72,57,0.08)] transition-all duration-300 hover:border-[var(--sand-gold)]/60 hover:shadow-[0_20px_44px_-10px_rgba(11,72,57,0.16)]"
    >
      <div className="space-y-4">
        {/* Render Image ONLY if authoritative URL exists */}
        {imageUrl && (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--sand-gold)]/20 bg-muted">
            <img
              src={imageUrl}
              alt={displayTitle}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* 1. Editorial Rank Header */}
        <div className="flex items-start justify-between border-b border-[var(--sand-gold)]/20 pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sand-gold)] font-display text-[10px] font-bold text-[#020806]">
                0{rec.rank}
              </span>
              <span className="text-[10px] font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase">
                {altRankLabel}
              </span>
            </div>
          </div>

          {/* Prominent Match Percentage */}
          {typeof rec.match_percent === "number" && (
            <div className="flex items-baseline gap-1 text-right">
              <span className="font-display text-2xl font-black tracking-tight text-[var(--sand-gold)] sm:text-3xl">
                {rec.match_percent}%
              </span>
              <span className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                COCOK
              </span>
            </div>
          )}
        </div>

        {/* 2. Fragrance Identity */}
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase">
              {brandName}
            </p>
            {priceFormatted && (
              <span className="rounded border border-[var(--sand-gold)]/25 bg-[var(--sand-gold)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--emerald-sig)]">
                {priceFormatted}
              </span>
            )}
          </div>
          <h4 className="font-display mt-1 text-xl font-black tracking-tight text-foreground sm:text-2xl">
            {displayTitle}
          </h4>
          {rec.category && (
            <p className="mt-0.5 font-serif text-sm italic text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* 3. Alternative Rationale */}
        <div className="border-l-2 border-[var(--sand-gold)]/50 pl-3 py-0.5">
          <p className="font-serif text-xs italic leading-relaxed text-foreground/80 sm:text-[13px]">
            “{altSubtitle}”
          </p>
        </div>

        {/* 4. Performance Information */}
        {hasMetrics && (
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-[var(--sand-gold)]/20 bg-[var(--ivory)]/40 p-2.5 text-xs">
            {hasProjection && (
              <div>
                <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
                  Semerbak:
                </span>
                <p className="font-display text-xs font-bold text-foreground sm:text-sm">
                  {rec.projection}
                </p>
              </div>
            )}
            {hasLongevity && (
              <div>
                <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
                  Ketahanan:
                </span>
                <p className="font-display text-xs font-bold text-foreground sm:text-sm">
                  {rec.longevity}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 5. Olfactive Notes Preview */}
        {hasTopNotes && (
          <div className="flex items-baseline gap-2 pt-1 text-xs">
            <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
              TOP:
            </span>
            <span className="font-serif text-xs italic text-foreground/85">
              {rec.top_notes.slice(0, 3).join(" · ")}
            </span>
          </div>
        )}
      </div>

      {/* 6. Store Tester Status Bar */}
      <div className="mt-5 border-t border-[var(--sand-gold)]/20 pt-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[var(--emerald-sig)] text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-sig)]" />
            Tersedia Tester di Store
          </span>
          <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            {rec.category}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function EditorialPyramidTier({
  tier,
  notes,
}: {
  tier: "TOP" | "HEART" | "BASE";
  notes: string[];
}) {
  if (!Array.isArray(notes) || notes.length === 0) return null;
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-14 shrink-0 font-sans text-[10px] font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase">
        {tier}
      </span>
      <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 font-serif text-sm italic text-foreground sm:text-[15px]">
        {notes.map((n, i) => (
          <span key={n}>
            {n}
            {i < notes.length - 1 && (
              <span className="text-[var(--sand-deep)]/60 font-sans"> ·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function NoteRow({ label, notes }: { label: string; notes: string[] }) {
  if (!Array.isArray(notes) || notes.length === 0) return null;
  return (
    <div className="flex items-baseline gap-3 text-xs">
      <span className="w-12 shrink-0 font-semibold tracking-wider text-[var(--sand-deep)] uppercase">
        {label}:
      </span>
      <div className="flex flex-wrap gap-1 font-serif text-sm italic text-foreground">
        {notes.map((n, i) => (
          <span key={n}>
            {n}
            {i < notes.length - 1 && <span className="text-muted-foreground font-sans"> ·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <p className="font-display mt-0.5 text-base tracking-tight text-foreground sm:text-lg">
        {value}
      </p>
    </div>
  );
}
