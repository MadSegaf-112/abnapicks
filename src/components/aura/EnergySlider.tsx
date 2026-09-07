import { motion } from "framer-motion";
import { useState } from "react";
import { Flame, Sparkles } from "lucide-react";

export type EnergySliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  labels: string[]; // [left, center, right]
  valueLabels: string[]; // indexed by value
};

export function EnergySlider({
  min,
  max,
  value,
  onChange,
  labels,
  valueLabels,
}: EnergySliderProps) {
  const [hover, setHover] = useState(false);
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  // ABNA Signature descriptive sensory copy for each level
  const LEVEL_DESCRIPTIONS: Record<number, { subtitle: string; nuance: string }> = {
    1: {
      subtitle: "Lembut & Intim",
      nuance:
        "Aroma bisikan halus yang hanya tercium saat berada sangat dekat. Sangat personal, elegan, dan menenangkan.",
    },
    2: {
      subtitle: "Halus & Personal",
      nuance:
        "Aroma yang nyaman menemani rutinitas harian dengan kehadiran yang santun dan tidak mencolok.",
    },
    3: {
      subtitle: "Seimbang & Serbaguna",
      nuance:
        "Keseimbangan ideal antara kesegaran dan daya tahan. Sempurna untuk aktivitas kantor, harian, dan pertemuan.",
    },
    4: {
      subtitle: "Tegas & Berkarakter",
      nuance: "Meninggalkan jejak aroma (sillage) yang memikat dan berkesan saat Anda melintas.",
    },
    5: {
      subtitle: "Semerbak & Kuat",
      nuance:
        "Karakter mewah dan semerbak yang percaya diri, langsung mengisi ruangan dan bertahan sepanjang hari hingga malam.",
    },
  };

  const currentLevel = LEVEL_DESCRIPTIONS[value] || {
    subtitle: valueLabels[value] || `Level ${value}`,
    nuance: "Tingkat kekuatan aroma yang disesuaikan dengan preferensimu.",
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-2">
      {/* Dynamic current value hero box */}
      <motion.div
        key={value}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 text-center shadow-card sm:p-8"
      >
        {/* Subtle background corner glow */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--emerald-sig)]/5 blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/40 bg-[var(--sand-gold)]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
          <Sparkles className="h-3 w-3" />
          <span>Tingkat Pancaran & Kekuatan Aroma</span>
        </div>

        <div className="font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {valueLabels[value]?.toUpperCase() || `LEVEL ${value}`}
        </div>

        <div className="font-serif mt-1 text-lg font-normal italic text-[var(--emerald-sig)] sm:text-xl">
          {currentLevel.subtitle}
        </div>

        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {currentLevel.nuance}
        </p>
      </motion.div>

      {/* Discrete Touch Step Selector Buttons (Min 52px height for kiosk ergonomics) */}
      <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-3">
        {Array.from({ length: max - min + 1 }).map((_, i) => {
          const stepVal = min + i;
          const isSelected = stepVal === value;
          return (
            <button
              key={stepVal}
              type="button"
              onClick={() => onChange(stepVal)}
              className={`flex min-h-[56px] min-w-[48px] flex-col items-center justify-center rounded-xl border p-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[var(--emerald-sig)] bg-[var(--emerald-sig)] text-white shadow-md ring-2 ring-[var(--emerald-sig)]/30"
                  : "border-border bg-card text-foreground hover:border-[var(--emerald-sig)]/40 hover:bg-muted/40"
              }`}
            >
              <span className="font-display text-lg sm:text-xl">{stepVal}</span>
              <span
                className={`text-[9px] font-medium tracking-tight line-clamp-1 ${
                  isSelected ? "text-white/90 font-semibold" : "text-muted-foreground"
                }`}
              >
                {stepVal === 1
                  ? "Intim"
                  : stepVal === 3
                    ? "Seimbang"
                    : stepVal === 5
                      ? "Semerbak"
                      : `Lv ${stepVal}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Continuous Slider Track & Thumb Controls */}
      <div className="mt-8 px-2">
        <div className="relative flex items-center py-6">
          {/* Base track */}
          <div className="relative h-2.5 w-full rounded-full bg-border/80">
            {/* Active filled gradient track (Sand Gold to Deep Emerald) */}
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[var(--sand-gold)] via-[var(--emerald-sig)] to-[var(--emerald-deep)]"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* Step notch dots */}
            {Array.from({ length: max - min + 1 }).map((_, i) => {
              const notchPct = (i / (max - min)) * 100;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 h-3.5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card border border-border/80 shadow-2xs"
                  style={{ left: `${notchPct}%` }}
                />
              );
            })}

            {/* Physical tactile thumb */}
            <motion.div
              className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--emerald-sig)] shadow-md ring-2 ring-[var(--emerald-sig)]/20"
              style={{ left: `${pct}%` }}
              animate={{ scale: hover ? 1.2 : 1 }}
              transition={{ duration: 0.15 }}
            />
          </div>

          {/* Interactive Native Range Input (Accessible 48px touch overlay) */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
            aria-label="Tingkat Pancaran dan Kekuatan Aroma"
            className="absolute inset-0 h-full w-full min-h-[48px] cursor-pointer opacity-0"
          />
        </div>

        {/* Sensory anchor labels below track */}
        <div className="mt-1 flex justify-between text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          <span>{labels[0]} (Intim)</span>
          <span>{labels[1]}</span>
          <span>{labels[2]} (Semerbak)</span>
        </div>
      </div>
    </div>
  );
}

export default EnergySlider;
