import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import type { QuizStep } from "@/data/quiz";
import { Polaroid } from "./Polaroid";
import { EnergySlider } from "./EnergySlider";

type Props = {
  step: QuizStep;
  index: number;
  total: number;
  answer: unknown;
  onAnswer: (v: unknown) => void;
  onBack: () => void;
  onNext: () => void;
  isLast: boolean;
};

function isCompleted(step: QuizStep, answer: unknown) {
  if (step.type === "slider") {
    return typeof answer === "number" && answer >= step.min && answer <= step.max;
  }
  if (step.type === "image-single") return typeof answer === "string" && answer.trim().length > 0;
  if (step.type === "image-multi") return Array.isArray(answer) && answer.length > 0;
  if (step.type === "text-single") {
    return typeof answer === "string" && answer.trim().length > 0;
  }
  return false;
}

export function QuizScreen({
  step,
  index,
  total,
  answer,
  onAnswer,
  onBack,
  onNext,
  isLast,
}: Props) {
  const [customOccupation, setCustomOccupation] = useState("");
  const isCustomOccupationSelected =
    step.id === "occupation" &&
    (answer === "other" ||
      (typeof answer === "string" &&
        "options" in step &&
        !step.options.some((o) => o.id === answer && o.id !== "other")));

  // Synchronize custom occupation text if answer is already a custom string
  useEffect(() => {
    if (step.id === "occupation" && "options" in step) {
      if (typeof answer === "string" && !step.options.some((o) => o.id === answer)) {
        setCustomOccupation(answer);
      } else if (answer === "other") {
        setCustomOccupation("");
      }
    }
  }, [step, answer]);

  const canNext = isCompleted(step, answer);

  // Derive step category name according to official ABNA Picks structure
  const STEP_CATEGORIES: Record<string, string> = {
    mood: "Karakter Aroma",
    scent_family: "Jenis Aroma Favorit",
    atmosphere: "Suasana Aroma",
    occasion: "Momen Pemakaian",
    intensity: "Intensitas Aroma",
    gender: "Profil Pembeli",
    age_range: "Range Usia",
    occupation: "Aktivitas Utama",
    price_range: "Range Harga Nyaman",
  };
  const categoryName = STEP_CATEGORIES[step.id] || "Preferensi";

  return (
    <section className="relative flex flex-1 flex-col px-4 pt-6 pb-36 sm:px-8 md:px-12 md:pt-8">
      {/* Visual Step Progress Area */}
      <div className="mx-auto w-full max-w-xl">
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          <span className="flex items-center gap-1.5 font-medium text-[var(--sand-deep)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--sand-deep)]" />
            <span>
              Pertanyaan {index + 1} dari {total} · {categoryName}
            </span>
          </span>
          <span className="font-mono text-[11px] font-bold text-foreground">
            {Math.round(((index + 1) / total) * 100)}%
          </span>
        </div>

        {/* Progress Bar with Sand Gold to Deep Emerald fill */}
        <div className="mt-2 h-1 w-full overflow-hidden rounded-none bg-border/70">
          <motion.div
            className="h-full rounded-none bg-gradient-to-r from-[var(--sand-gold)] to-[var(--emerald-sig)]"
            initial={false}
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question Header Block */}
      <motion.div
        key={step.id + "-title"}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-6 max-w-3xl text-center"
      >
        <p className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-[var(--sand-deep)] uppercase">
          <span>{step.kicker}</span>
        </p>

        <h2 className="font-display mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black tracking-[-0.035em] leading-[0.95] text-balance text-foreground">
          {step.title}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-balance font-body text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground font-normal">
          {step.subtitle}
        </p>
      </motion.div>

      {/* Interactive Options Presentation */}
      <div className="mt-8 flex-1 md:mt-10">
        {/* SLIDER TYPE (Question #5: Intensity) */}
        {step.type === "slider" && (
          <div className="mx-auto max-w-2xl py-4">
            <EnergySlider
              min={step.min}
              max={step.max}
              value={typeof answer === "number" ? answer : 3}
              onChange={(v) => onAnswer(v)}
              labels={step.labels}
              valueLabels={step.valueLabels}
            />
          </div>
        )}

        {/* IMAGE-SINGLE TYPE (Mood, Atmosphere, Occasion, Gender) */}
        {step.type === "image-single" && (
          <div
            className={`mx-auto grid grid-cols-2 gap-4 sm:gap-6 lg:gap-7 py-6 sm:py-8 ${
              step.options.length === 2
                ? "max-w-2xl md:grid-cols-2 lg:grid-cols-2"
                : step.options.length === 3
                  ? "max-w-4xl md:grid-cols-3 lg:grid-cols-3"
                  : step.options.length === 6
                    ? "max-w-5xl md:grid-cols-3 lg:grid-cols-3"
                    : "max-w-6xl md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {step.options.map((opt, i) => (
              <Polaroid
                key={opt.id}
                index={i}
                label={opt.label}
                caption={opt.caption}
                image={opt.image || ""}
                number={String(i + 1).padStart(2, "0")}
                selected={answer === opt.id}
                onClick={() => onAnswer(opt.id)}
              />
            ))}
          </div>
        )}

        {/* IMAGE-MULTI TYPE (Scent Family) */}
        {step.type === "image-multi" && (
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-6 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {step.options.map((opt, i) => {
              const arr = (answer as string[] | undefined) ?? [];
              const selected = arr.includes(opt.id);
              return (
                <Polaroid
                  key={opt.id}
                  index={i}
                  label={opt.label}
                  caption={opt.caption}
                  image={opt.image || ""}
                  number={String(i + 1).padStart(2, "0")}
                  selected={selected}
                  onClick={() =>
                    onAnswer(selected ? arr.filter((x) => x !== opt.id) : [...arr, opt.id])
                  }
                />
              );
            })}
          </div>
        )}

        {/* TEXT-SINGLE TYPE (Age Range, Occupation, Price Range) */}
        {step.type === "text-single" && (
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
              {step.options.map((opt, i) => {
                const isSelected =
                  step.id === "occupation" && opt.id === "other"
                    ? isCustomOccupationSelected
                    : answer === opt.id;

                const handleSelect = () => {
                  if (step.id === "occupation" && opt.id === "other") {
                    onAnswer(customOccupation.trim() || "other");
                  } else {
                    onAnswer(opt.id);
                  }
                };

                return (
                  <motion.button
                    key={opt.id}
                    type="button"
                    onClick={handleSelect}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.25 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`group relative flex min-h-[52px] items-center justify-between rounded-none p-4 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-2 border-[var(--emerald-sig)] bg-[#fcfaf5] ring-1 ring-[var(--emerald-sig)] shadow-md"
                        : "border border-border/90 bg-card shadow-xs hover:border-[var(--emerald-sig)]/60 hover:shadow-md hover:bg-[#fffcf5]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-none font-mono text-[10px] font-semibold tracking-wider ${
                          isSelected
                            ? "bg-[var(--emerald-sig)] text-white"
                            : "bg-muted/70 text-foreground"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-body text-xs sm:text-sm ${
                          isSelected
                            ? "font-semibold text-foreground"
                            : "font-medium text-foreground"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-none transition-all ${
                        isSelected
                          ? "bg-[var(--emerald-sig)] text-white shadow-xs"
                          : "border border-border/80 group-hover:border-foreground/40 text-transparent"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Custom Occupation Input Field when "Lainnya" is selected */}
            {step.id === "occupation" && (
              <AnimatePresence>
                {isCustomOccupationSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-2"
                  >
                    <div className="rounded-none border border-[var(--sand-gold)]/50 bg-[#fffcf5] p-4 shadow-sm">
                      <label
                        htmlFor="custom-occupation-input"
                        className="block text-[11px] font-bold tracking-[0.16em] text-[var(--sand-deep)] uppercase"
                      >
                        Masukkan Pekerjaan Kamu
                      </label>
                      <input
                        id="custom-occupation-input"
                        type="text"
                        value={customOccupation}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomOccupation(val);
                          onAnswer(val.trim() ? val : "other");
                        }}
                        placeholder="Contoh: Arsitek, Dokter, Freelancer, Seniman..."
                        autoFocus
                        className="mt-2 w-full rounded-none border border-border bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--emerald-sig)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-sig)]"
                      />
                      <p className="mt-1.5 text-[10px] text-muted-foreground">
                        Ketik nama pekerjaan/aktivitasmu untuk melanjutkan.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        )}
      </div>

      {/* Fixed Retail Footer Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/80 bg-background/95 px-4 py-3.5 backdrop-blur-md sm:px-8 md:px-12"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          {/* Back Action */}
          <button
            type="button"
            onClick={onBack}
            className="flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-none border border-border/80 px-4 py-2.5 text-xs font-semibold tracking-wider text-muted-foreground transition-all hover:bg-card hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            <span>KEMBALI</span>
          </button>

          {/* Central Touch Guidance Prompt */}
          <div className="hidden font-body text-xs font-medium text-muted-foreground sm:block">
            {step.type === "image-multi"
              ? "Pilih satu atau beberapa jenis aroma yang paling dekat dengan seleramu"
              : step.type === "slider"
                ? "Geser atau sentuh angka untuk memilih tingkat kekuatan aroma"
                : "Pilih opsi jawaban Anda untuk melanjutkan"}
          </div>

          {/* Next / Submit Action */}
          <motion.button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            whileHover={canNext ? { scale: 1.015 } : undefined}
            whileTap={canNext ? { scale: 0.985 } : undefined}
            className={`flex min-h-[48px] items-center justify-center gap-2.5 rounded-none px-7 py-3 text-xs font-semibold tracking-[0.14em] transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 ${
              isLast
                ? "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/25 hover:bg-[var(--emerald-deep)] sm:text-xs"
                : "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-sm shadow-[var(--emerald-sig)]/20 hover:bg-[var(--emerald-deep)] sm:text-xs"
            }`}
          >
            <span>{isLast ? "TEMUKAN PARFUMKU" : "SELANJUTNYA"}</span>
            {isLast ? (
              <Sparkles className="h-4 w-4 text-[var(--sand-gold)]" />
            ) : (
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            )}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
