import { useMotionPreference } from "@/hooks/use-motion-preference";
import { AromaExplorer } from "./AromaExplorer";
import { motion } from "framer-motion";
import type { Recommendation } from "@/lib/recommendations.functions";

export interface AbnaProductPresentationProps {
  rec: Recommendation;
  isHero?: boolean;
  imageUrl?: string;
  variantName?: string;
  size?: string;
  priceFormatted?: string;
  availabilityStatus?: string;
}

function MatchGauge({ value }: { value: number }) {
  const shouldReduceMotion = useMotionPreference();
  const percent = Number.isFinite(value) ? Math.round(Math.min(100, Math.max(0, value))) : 0;

  return (
    <div className="abna-result-gauge">
      <svg viewBox="0 0 220 130" role="img" aria-label={`Kecocokan ${percent}%`}>
        <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="#cbd0d4" strokeWidth="22" />
        <motion.path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="#5b859f"
          strokeWidth="22"
          pathLength="100"
          initial={{ strokeDasharray: shouldReduceMotion ? `${percent} 100` : "0 100" }}
          animate={{ strokeDasharray: `${percent} 100` }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
        />
      </svg>

      <div aria-hidden="true">
        <span>cocok</span>
        <motion.strong
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : 0.2,
          }}
        >
          {percent}%
        </motion.strong>
      </div>
    </div>
  );
}

export function AbnaProductCard({
  rec,
  isHero = false,
  variantName,
  availabilityStatus,
}: AbnaProductPresentationProps) {
  const notesOverview = [...rec.top_notes.slice(0, 2), ...rec.middle_notes.slice(0, 1)].join(", ");

  const availability =
    availabilityStatus === "in_stock"
      ? "Tersedia di Store"
      : availabilityStatus === "out_of_stock"
        ? "Stok sedang habis"
        : "Cek ketersediaan di Store";

  return (
    <article className={`abna-result-card ${isHero ? "is-hero" : "is-alternative"}`}>
      <div className="abna-result-card__score">
        <MatchGauge value={rec.match_percent} />
      </div>

      <div className="abna-result-card__identity">
        <p>{rec.house}</p>
        <h3>{variantName || rec.name}</h3>
        <em>{notesOverview || rec.category}</em>
      </div>

      <div className="abna-result-card__tag">
        {Array.from(new Set([rec.aura, rec.category].filter(Boolean))).join(" · ")}
      </div>

      {isHero && (
        <>
          <div className="abna-result-card__brand">
            <strong>ABNA SIGNATURE FORMULATION</strong>
            <span>{rec.category} · Curated Selection</span>
          </div>

          <div className="abna-result-card__why">
            <h4>KENAPA COCOK?</h4>
            <p>{rec.why_match}</p>
          </div>
        </>
      )}

      <AromaExplorer rec={rec} />
      {(rec.story || rec.description) && (
        <details className="abna-aroma-story">
          <summary>
            Cerita di balik aroma <span aria-hidden="true">+</span>
          </summary>
          <p>{rec.story || rec.description}</p>
        </details>
      )}

      <p
        className="abna-result-card__availability"
        data-available={availabilityStatus === "in_stock"}
      >
        {availability}
      </p>
    </article>
  );
}
