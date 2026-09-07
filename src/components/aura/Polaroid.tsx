import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

type Props = {
  index: number;
  label: string;
  caption?: string;
  image: string;
  number?: string;
  selected: boolean;
  onClick: () => void;
};

// Exact organic editorial tilts and vertical offsets from quizscreen-reference.png
const TILTS = [-3.5, 1.8, -1.8, 3.5, -2.5, 2.0, -3.0];
const OFFSETS_Y = [18, -14, 28, -8, 20, -10, 24];

export function Polaroid({ index, label, caption, image, selected, onClick }: Props) {
  const tilt = TILTS[index % TILTS.length];
  const offsetY = OFFSETS_Y[index % OFFSETS_Y.length];
  const catalogNumber = String(index + 1).padStart(3, "0");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: offsetY + 16, rotate: tilt }}
      animate={{ opacity: 1, y: selected ? 0 : offsetY, rotate: selected ? 0 : tilt }}
      transition={{
        duration: 0.45,
        delay: 0.04 + index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: offsetY - 16,
        rotate: 0,
        scale: 1.025,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.985 }}
      style={{ transformOrigin: "center" }}
      className={`group relative flex w-full flex-col overflow-hidden rounded-none bg-white p-2.5 sm:p-3 pb-5 sm:pb-6 text-left transition-all duration-300 cursor-pointer ${
        selected
          ? "border-2 border-[var(--emerald-sig)] ring-2 ring-[var(--emerald-sig)]/20 shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
          : "border border-black/[0.04] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_8px_10px_-6px_rgba(0,0,0,0.06)] hover:border-[var(--emerald-sig)]/60 hover:shadow-[0_22px_45px_rgba(0,0,0,0.18)]"
      }`}
    >
      {/* 1. PHOTOGRAPH FRAME (PORTRAIT 3:4) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none bg-[#181818]">
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-102"
        />

        {/* Subtle physical photo paper boundary */}
        <div className="pointer-events-none absolute inset-0 border border-black/5" />

        {/* Selected Check Badge (Only shown when selected) */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-none bg-[var(--emerald-sig)] text-[#fffcf5] shadow-xs"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </motion.div>
        )}
      </div>

      {/* 2. WHITE PAPER SECTION (TALLER BOTTOM CHIN) */}
      <div className="flex flex-1 flex-col justify-between pt-3 sm:pt-3.5 px-0.5 sm:px-1">
        <div>
          {/* Title Row + Catalog Number */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-sm sm:text-base md:text-[17px] font-black tracking-tight text-[#0a0a0a] uppercase leading-none">
              {label}
            </h3>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[var(--sand-deep)] shrink-0">
              {catalogNumber}
            </span>
          </div>

          {/* Supporting Editorial Caption */}
          {caption && (
            <p className="mt-2 font-body text-[11px] sm:text-xs leading-relaxed text-muted-foreground break-words">
              {caption}
            </p>
          )}
        </div>

        {/* Active Selection Stamp */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-none border-l-2 border-[var(--emerald-sig)] bg-[var(--sand-gold)]/15 px-2 py-0.5"
          >
            <Sparkles className="h-2.5 w-2.5 text-[var(--emerald-sig)]" />
            <span className="font-body text-[9px] sm:text-[9.5px] font-bold tracking-widest text-[var(--emerald-sig)] uppercase">
              Pilihanmu
            </span>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
