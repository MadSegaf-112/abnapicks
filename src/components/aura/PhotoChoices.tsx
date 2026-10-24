import { useMotionPreference } from "@/hooks/use-motion-preference";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import type { ImageOption } from "@/data/quiz";

type Props = {
  options: ImageOption[];
  answer: unknown;
  multiple?: boolean;
  layout: "carousel" | "scent" | "occasion" | "atmosphere";
  onAnswer: (value: string | string[]) => void;
};

export function PhotoChoices({ options, answer, multiple = false, layout, onAnswer }: Props) {
  const isPresent = useIsPresent();
  const [pressed, setPressed] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const shouldReduceMotion = useMotionPreference();

  const selectedIds = Array.isArray(answer)
    ? answer.filter((value): value is string => typeof value === "string")
    : [];

  const updateControls = () => {
    const track = trackRef.current;
    if (!track) return;

    setCanPrevious(track.scrollLeft > 2);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  };

  useEffect(() => {
    if (layout !== "carousel") return;

    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    updateControls();

    return () => observer.disconnect();
  }, [layout, options.length]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <div inert={!isPresent} className={`abna-choices abna-choices--${layout}`}>
      {layout === "carousel" && (
        <div className="abna-choices__controls">
          <span>Pilih satu atau beberapa aroma</span>

          <div>
            <motion.button
              type="button"
              aria-label="Aroma sebelumnya"
              disabled={!canPrevious}
              onClick={() => move(-1)}
              whileHover={shouldReduceMotion || !canPrevious ? undefined : { scale: 1.08 }}
              whileTap={shouldReduceMotion || !canPrevious ? undefined : { scale: 0.92 }}
            >
              <ArrowLeft size={22} />
            </motion.button>

            <motion.button
              type="button"
              aria-label="Aroma berikutnya"
              disabled={!canNext}
              onClick={() => move(1)}
              whileHover={shouldReduceMotion || !canNext ? undefined : { scale: 1.08 }}
              whileTap={shouldReduceMotion || !canNext ? undefined : { scale: 0.92 }}
            >
              <ArrowRight size={22} />
            </motion.button>
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        className="abna-choices__track"
        onScroll={layout === "carousel" ? updateControls : undefined}
        role="group"
        aria-label={multiple ? "Pilihan aroma" : "Pilih satu jawaban"}
      >
        {options.map((option) => {
          const selected = multiple
            ? selectedIds.includes(option.id)
            : answer === option.id || pressed === option.id;

          const select = () => {
            if (!multiple) {
              setPressed(option.id);
              onAnswer(option.id);
              return;
            }

            onAnswer(
              selected ? selectedIds.filter((id) => id !== option.id) : [...selectedIds, option.id],
            );
          };

          return (
            <motion.button
              key={option.id}
              type="button"
              className="abna-choice"
              aria-pressed={selected}
              onClick={select}
              whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <span className="abna-choice__photo">
                <img src={option.image} alt="" loading="lazy" draggable={false} />

                <AnimatePresence>
                  {selected && (
                    <motion.span
                      className="abna-choice__check"
                      aria-hidden="true"
                      initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    >
                      <Check size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>

              <span className="abna-choice__copy">
                <span className="abna-choice__label">{option.label}</span>
                <span className="abna-choice__caption">{option.caption}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
