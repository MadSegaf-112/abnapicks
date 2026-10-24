import { useMotionPreference } from "@/hooks/use-motion-preference";
import { ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { ImageOption } from "@/data/quiz";

type Props = {
  options: ImageOption[];
  answer: unknown;
  onAnswer: (value: string) => void;
  onBack: () => void;
  index: number;
  total: number;
  inert?: boolean;
};

export function MoodQuestion({ options, answer, onAnswer, onBack, index, total, inert }: Props) {
  const [pressed, setPressed] = useState<string | null>(null);
  const shouldReduceMotion = useMotionPreference();

  return (
    <section
      className="abna-mood abna-quiz-fit abna-quiz-classic"
      inert={inert}
      aria-labelledby="abna-mood-title"
    >
      <div className="abna-mood__heading">
        <p className="abna-mood__kicker">
          Kenali Karaktermu!{" "}
          <span>
            {index + 1} / {total}
          </span>
        </p>
        <h2 tabIndex={-1} id="abna-mood-title" className="abna-mood__title">
          Kamu ingin parfum
          <br />
          yang <em>memberi kesan apa?</em>
        </h2>
      </div>

      <div className="abna-mood__options" role="group" aria-label="Pilih satu karakter parfum">
        {options.map((option) => {
          const selected = answer === option.id || pressed === option.id;
          return (
            <motion.button
              key={option.id}
              type="button"
              className="abna-mood__option"
              aria-pressed={selected}
              onClick={() => {
                setPressed(option.id);
                onAnswer(option.id);
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -5, transition: { duration: 0.2 } }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <span className="abna-mood__photo">
                <img src={option.image} alt="" draggable={false} />
                <AnimatePresence>
                  {selected && (
                    <motion.span
                      className="abna-mood__check"
                      aria-hidden="true"
                      initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    >
                      <Check size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="abna-mood__label">{option.label}</span>
              <span className="abna-mood__caption">{option.caption}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="abna-mood__actions">
        <motion.button
          type="button"
          onClick={onBack}
          className="abna-mood__back"
          whileHover={shouldReduceMotion ? undefined : { x: -3 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Kembali</span>
        </motion.button>
        <span className="abna-quiz-hint">Ketuk pilihan untuk lanjut</span>
      </div>
    </section>
  );
}
