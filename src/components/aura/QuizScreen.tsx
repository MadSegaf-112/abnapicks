import { useMotionPreference } from "@/hooks/use-motion-preference";
import { useState } from "react";
import { useIsPresent, motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { QuizStep, ImageOption } from "@/data/quiz";
import { MoodQuestion } from "./MoodQuestion";
import { PhotoChoices } from "./PhotoChoices";
import { EnergySlider } from "./EnergySlider";
import { PagedScentChoices } from "./PagedScentChoices";

type Props = {
  step: QuizStep;
  index: number;
  total: number;
  answer: unknown;
  allAnswers?: Record<string, unknown>;
  onAnswer: (value: unknown) => void;
  onCommit: (value: unknown, extra?: Record<string, unknown>) => void;
  onUpdateAnswer?: (key: string, value: unknown) => void;
  onBack: () => void;
  onNext: () => void;
  isLast: boolean;
};

function QuestionTitle({ step }: { step: QuizStep }) {
  switch (step.id) {
    case "scent_family":
      return (
        <>
          Aroma seperti apa yang
          <br />
          <em>paling kamu suka?</em>
        </>
      );
    case "occasion":
      return (
        <>
          Parfum ini paling sering
          <br />
          kamu <em>pakai untuk apa?</em>
        </>
      );
    case "intensity":
      return (
        <>
          Kamu suka parfum
          <br />
          yang <em>seberapa terasa?</em>
        </>
      );
    case "atmosphere":
      return (
        <>
          Suasana seperti apa yang
          <br />
          <em>paling kamu suka?</em>
        </>
      );
    case "age_range":
      return (
        <>
          Kamu masuk range
          <br />
          <em>usia yang mana?</em>
        </>
      );
    case "gender":
      return (
        <>
          Pilih <em>jenis kelamin</em> dan
          <br />
          <em>kategori parfum</em> yang kamu cari?
        </>
      );
    case "price_range":
      return (
        <>
          Untuk ukuran parfum <em className="abna-flow__blue">30ml</em>
          <br />
          kamu nyaman dengan range harga?
        </>
      );
    case "occupation":
      return (
        <>
          Apa aktivitas utama atau
          <br />
          <em>pekerjaanmu saat ini?</em>
        </>
      );
    default:
      return <>{step.title}</>;
  }
}

function AgeSelector({
  options,
  answer,
  onAnswer,
}: {
  options: ImageOption[];
  answer: unknown;
  onAnswer: (value: string) => void;
}) {
  const shouldReduceMotion = useMotionPreference();
  const selected = options.findIndex((option) => option.id === answer);
  const move = (direction: number) => {
    const next =
      selected < 0
        ? direction > 0
          ? 0
          : options.length - 1
        : (selected + direction + options.length) % options.length;
    if (options[next]) onAnswer(options[next].id);
  };

  const label =
    selected < 0
      ? "Pilih usia"
      : options[selected].label
          .replace(" tahun", "")
          .replace("Di bawah ", "< ")
          .replace(" ke atas", "+");

  return (
    <div className="abna-age">
      <motion.button
        type="button"
        onClick={() => move(-1)}
        aria-label="Kelompok usia sebelumnya"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
      >
        <ArrowLeft />
      </motion.button>
      <output aria-live="polite" className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={label}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: shouldReduceMotion ? 0.08 : 0.16 }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </output>
      <motion.button
        type="button"
        onClick={() => move(1)}
        aria-label="Kelompok usia berikutnya"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
      >
        <ArrowRight />
      </motion.button>
    </div>
  );
}

function OccupationChoices({
  options,
  answer,
  onAnswer,
}: {
  options: ImageOption[];
  answer: unknown;
  onAnswer: (value: string) => void;
}) {
  const shouldReduceMotion = useMotionPreference();
  const [custom, setCustom] = useState(
    () =>
      answer === "other" ||
      (typeof answer === "string" && !options.some((option) => option.id === answer)),
  );

  return (
    <div className="abna-occupation">
      <div className="abna-text-options">
        {options.map((option) => (
          <motion.button
            key={option.id}
            type="button"
            aria-pressed={option.id === "other" ? custom : answer === option.id}
            onClick={() => {
              setCustom(option.id === "other");
              onAnswer(option.id);
            }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {custom && (
          <motion.label
            className="abna-occupation__custom"
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.22 }}
          >
            Tuliskan pekerjaanmu
            <input
              type="text"
              value={typeof answer === "string" && answer !== "other" ? answer : ""}
              onChange={(event) => onAnswer(event.target.value || "other")}
              placeholder="Contoh: Fotografer"
            />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
}

export function QuizScreen({
  step,
  index,
  total,
  answer,
  allAnswers,
  onAnswer,
  onCommit,
  onUpdateAnswer,
  onBack,
  onNext,
  isLast,
}: Props) {
  const isPresent = useIsPresent();
  const shouldReduceMotion = useMotionPreference();

  if (step.id === "mood") {
    return (
      <MoodQuestion
        options={step.options}
        answer={answer}
        onAnswer={onCommit}
        onBack={onBack}
        index={index}
        total={total}
        inert={!isPresent}
      />
    );
  }

  const perfumeType = allAnswers?.perfume_type;

  const canNext = (() => {
    if (step.type === "slider") {
      return (
        typeof answer === "number" &&
        Number.isFinite(answer) &&
        answer >= step.min &&
        answer <= step.max
      );
    }

    if (step.type === "image-multi") {
      return (
        Array.isArray(answer) &&
        answer.some((id) => step.options.some((option) => option.id === id))
      );
    }

    if (step.id === "occupation") {
      return typeof answer === "string" && answer.trim().length > 0 && answer !== "other";
    }

    const validOption = step.options.some((option) => option.id === answer);

    if (step.id === "gender") {
      return validOption && ["masculine", "feminine", "unisex"].includes(String(perfumeType));
    }

    return validOption;
  })();

  const centered = ["intensity", "age_range", "gender", "occupation", "price_range"].includes(
    step.id,
  );

  return (
    <section
      className={`abna-flow abna-quiz-fit abna-quiz-classic abna-flow--${step.id}`}
      inert={!isPresent}
      aria-labelledby="abna-flow-title"
    >
      <div className={`abna-flow__heading ${centered ? "is-centered" : ""}`}>
        <p className="abna-flow__kicker">
          {step.kicker}{" "}
          <span>
            {index + 1} / {total}
          </span>
        </p>

        <h2 tabIndex={-1} id="abna-flow-title" className="abna-flow__title">
          <QuestionTitle step={step} />
        </h2>

        {(centered || step.type === "image-multi") && (
          <p
            className="abna-flow__description"
            aria-live={step.type === "image-multi" ? "polite" : undefined}
          >
            {step.type === "image-multi"
              ? Array.isArray(answer) && answer.length
                ? `${answer.length} aroma dipilih. Padukan lagi, atau lanjutkan.`
                : "Pilih minimal satu aroma. Kamu boleh memadukan beberapa."
              : step.subtitle}
          </p>
        )}

        <span className="sr-only">
          Pertanyaan {index + 1} dari {total}
        </span>
      </div>

      <div className="abna-flow__body">
        {step.id === "scent_family" && (
          <PagedScentChoices options={step.options} answer={answer} onAnswer={onAnswer} />
        )}

        {step.id === "occasion" && (
          <PhotoChoices
            options={step.options}
            answer={answer}
            layout="occasion"
            onAnswer={onCommit}
          />
        )}

        {step.id === "atmosphere" && (
          <PhotoChoices
            options={step.options}
            answer={answer}
            layout="atmosphere"
            onAnswer={onCommit}
          />
        )}

        {step.type === "slider" && (
          <EnergySlider
            min={step.min}
            max={step.max}
            value={typeof answer === "number" ? answer : Math.round((step.min + step.max) / 2)}
            labels={step.labels}
            valueLabels={step.valueLabels}
            onChange={onAnswer}
          />
        )}

        {step.id === "age_range" && (
          <AgeSelector options={step.options} answer={answer} onAnswer={onAnswer} />
        )}

        {step.id === "gender" && (
          <div className="abna-profile">
            <div className="abna-profile__genders">
              {[...step.options]
                .sort((a, b) => Number(b.id === "male") - Number(a.id === "male"))
                .map((option) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    className="abna-profile__gender"
                    aria-pressed={answer === option.id}
                    onClick={() => {
                      onAnswer(option.id);

                      if (perfumeType) onCommit(option.id, { perfume_type: perfumeType });
                    }}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <img src={option.image} alt="" />
                    <span>{option.label}</span>
                  </motion.button>
                ))}
            </div>

            <p className="abna-profile__hint">
              Pilih jenis kelamin dan kategori parfum yang kamu cari.
            </p>
            <div className="abna-profile__types" aria-label="Kategori parfum">
              {[
                { id: "masculine", label: "Masculine" },
                { id: "feminine", label: "Feminine" },
                { id: "unisex", label: "Unisex" },
              ].map((type) => (
                <motion.button
                  key={type.id}
                  type="button"
                  className={`abna-profile__type abna-profile__type--${type.id}`}
                  aria-pressed={perfumeType === type.id}
                  onClick={() => {
                    onUpdateAnswer?.("perfume_type", type.id);
                    if (step.options.some((option) => option.id === answer))
                      onCommit(answer, { perfume_type: type.id });
                  }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                >
                  {type.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {step.id === "occupation" && (
          <OccupationChoices
            options={step.options}
            answer={answer}
            onAnswer={(value) => {
              if (value !== "other" && step.options.some((option) => option.id === value))
                onCommit(value);
              else onAnswer(value);
            }}
          />
        )}

        {step.id === "price_range" && (
          <div className="abna-text-options abna-text-options--price">
            {step.options.map((option) => (
              <motion.button
                key={option.id}
                type="button"
                aria-pressed={answer === option.id}
                onClick={() => onCommit(option.id)}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="abna-flow__actions">
        <motion.button
          type="button"
          onClick={onBack}
          className="abna-flow__back"
          whileHover={shouldReduceMotion ? undefined : { x: -3 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          <ArrowLeft size={18} />
          Kembali
        </motion.button>

        {step.type === "slider" ||
        step.id === "age_range" ||
        step.type === "image-multi" ||
        (step.id === "occupation" &&
          typeof answer === "string" &&
          (answer === "other" || !step.options.some((option) => option.id === answer))) ? (
          <motion.button
            type="button"
            onClick={() => {
              if (step.type === "slider")
                onCommit(
                  typeof answer === "number" ? answer : Math.round((step.min + step.max) / 2),
                );
              else onNext();
            }}
            aria-label={
              step.type !== "slider" && !canNext
                ? "Pilih jawaban terlebih dahulu untuk melanjutkan"
                : undefined
            }
            disabled={step.type !== "slider" && !canNext}
            className="abna-flow__next"
            whileHover={
              shouldReduceMotion || (step.type !== "slider" && !canNext)
                ? undefined
                : { scale: 1.02 }
            }
            whileTap={
              shouldReduceMotion || (step.type !== "slider" && !canNext)
                ? undefined
                : { scale: 0.98 }
            }
          >
            Selanjutnya <ArrowRight size={16} />
          </motion.button>
        ) : (
          <span className="abna-quiz-hint">
            {step.id === "gender"
              ? "Lengkapi kedua pilihan untuk lanjut"
              : isLast
                ? "Ketuk pilihan untuk lihat hasil"
                : "Ketuk pilihan untuk lanjut"}
          </span>
        )}
      </div>
    </section>
  );
}
