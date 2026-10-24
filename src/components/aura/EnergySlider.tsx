import { useMotionPreference } from "@/hooks/use-motion-preference";
import { motion, AnimatePresence } from "framer-motion";

export type EnergySliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  labels: string[];
  valueLabels: string[];
};

const DETAILS = [
  {
    subtitle: "Lembut & Personal",
    description: "Aroma terasa dekat dan tidak terlalu mencolok.",
  },
  {
    subtitle: "Halus & Nyaman",
    description: "Aroma ringan untuk menemani aktivitas sehari-hari.",
  },
  {
    subtitle: "Seimbang & Serbaguna",
    description: "Keseimbangan aroma untuk aktivitas harian, kantor, dan pertemuan.",
  },
  {
    subtitle: "Tegas & Berkarakter",
    description: "Aroma lebih terasa dan meninggalkan kesan yang kuat.",
  },
  {
    subtitle: "Semerbak & Menonjol",
    description: "Untuk kamu yang menyukai kehadiran aroma lebih intens.",
  },
];

export function EnergySlider({
  min,
  max,
  value,
  onChange,
  labels,
  valueLabels,
}: EnergySliderProps) {
  const shouldReduceMotion = useMotionPreference();
  const safeValue = Math.min(max, Math.max(min, value));
  const index = safeValue - min;
  const detail = DETAILS[index] ?? DETAILS[2];
  const title = valueLabels[index] ?? `Level ${safeValue}`;
  const position = max === min ? 0 : ((safeValue - min) / (max - min)) * 100;

  return (
    <div className="abna-energy">
      <div className="abna-energy__panel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeValue}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -5 }}
            transition={{ duration: shouldReduceMotion ? 0.08 : 0.16 }}
          >
            <h3>{title}</h3>
            <p className="abna-energy__subtitle">{detail.subtitle}</p>
            <p className="abna-energy__description">{detail.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="abna-energy__control">
        <div className="abna-energy__labels">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="abna-energy__range">
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={safeValue}
            aria-label="Intensitas aroma"
            aria-valuetext={`Level ${safeValue}: ${title}`}
            onChange={(event) => onChange(Number(event.target.value))}
          />

          <div className="abna-energy__thumb-label" aria-hidden="true">
            <span
              style={{
                left: `${position}%`,
                transition: "none",
              }}
            >
              Lv {safeValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnergySlider;
