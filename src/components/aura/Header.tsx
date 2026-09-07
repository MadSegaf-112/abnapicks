import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";

type Props = {
  step: number; // 0 = welcome, 1..N = quiz, N+1 = loading, N+2 = results
  total: number;
  onClose?: () => void;
  showStep?: boolean;
};

export function Header({ step, total, onClose, showStep = true }: Props) {
  const progress = Math.min(100, Math.max(0, (step / total) * 100));
  const stepLabel =
    step <= 0
      ? null
      : step > total
        ? `Pertanyaan ${total} / ${total}`
        : `Pertanyaan ${step} / ${total}`;

  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between px-4 pt-5 pb-4 sm:px-8 md:px-12 md:pt-7">
        {/* ABNA Signature × ABNA PICKS Header */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
                ABNA
              </span>
              <span className="font-serif text-sm font-normal italic tracking-widest text-[var(--emerald-sig)] sm:text-base">
                Signature
              </span>
            </div>
            <span className="font-body text-[10px] font-semibold tracking-[0.18em] text-[var(--sand-deep)] uppercase">
              ABNA PICKS · Konsultasi Aroma
            </span>
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {showStep && stepLabel && (
            <motion.span
              key={stepLabel}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-none border border-border/90 bg-card px-3 py-1 font-body text-[11px] font-semibold tracking-wider text-muted-foreground shadow-xs"
            >
              {stepLabel}
            </motion.span>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-none border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground shadow-xs transition-all hover:bg-muted hover:text-foreground cursor-pointer"
              aria-label="Selesai atau Bersihkan Sesi"
            >
              <span className="hidden sm:inline-block mr-1.5 text-[11px] uppercase tracking-wider">
                Selesai
              </span>
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Progress Line */}
      <div className="h-[2px] w-full bg-border/40">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--sand-gold)] to-[var(--emerald-sig)]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </header>
  );
}
