import { useMotionPreference } from "@/hooks/use-motion-preference";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

type Props = {
  step: number;
  total: number;
  category?: string;
  onClose?: () => void;
  showStep?: boolean;
};
export function Header({ step, total, category, onClose, showStep = true }: Props) {
  const reduce = useMotionPreference();
  const progress = Math.min(100, Math.max(0, (step / Math.max(1, total)) * 100));
  const chapter = step <= 2 ? 0 : step <= 5 ? 1 : 2;
  const chapters = ["Karakter", "Selera", "Signature"];
  return (
    <header className="abna-journey-header">
      <div className="abna-journey-header__top">
        <div className="abna-journey-header__brand">
          <span>Abna Picks</span>
          <small>
            {showStep ? "Temukan aroma yang terasa seperti kamu" : "Merangkai pilihanmu"}
          </small>
        </div>
        <div className="abna-journey-header__actions">
          {showStep && (
            <span className="abna-journey__count">
              <strong>{String(step).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
            </span>
          )}
          {onClose && (
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Kembali ke Halaman Awal"
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
            >
              <X size={18} aria-hidden="true" />
            </motion.button>
          )}
        </div>
      </div>
      {showStep && (
        <ol className="abna-journey" aria-label="Perjalanan aroma">
          {chapters.map((label, index) => (
            <li
              key={label}
              data-state={index < chapter ? "complete" : index === chapter ? "current" : "upcoming"}
              aria-current={index === chapter ? "step" : undefined}
            >
              <span className="abna-journey__number" aria-hidden="true">
                {index < chapter ? <Check size={11} /> : `0${index + 1}`}
              </span>
              <span>{label}</span>
              <span className="abna-journey__line" aria-hidden="true" />
            </li>
          ))}
        </ol>
      )}
      <div
        className="abna-journey__progress"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Kemajuan konsultasi"
        aria-valuetext={
          showStep
            ? `Pertanyaan ${step} dari ${total}: ${category || chapters[chapter]}`
            : "Menyiapkan hasil"
        }
      >
        <motion.div
          initial={false}
          style={{ transformOrigin: "left" }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </header>
  );
}
