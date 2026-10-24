import { useMotionPreference } from "@/hooks/use-motion-preference";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { ImageOption } from "@/data/quiz";
import { PhotoChoices } from "./PhotoChoices";

export function PagedScentChoices({
  options,
  answer,
  onAnswer,
}: {
  options: ImageOption[];
  answer: unknown;
  onAnswer: (value: string | string[]) => void;
}) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [perPage, setPerPage] = useState(4);
  const shouldReduceMotion = useMotionPreference();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setPerPage(media.matches ? 2 : 4);
      setPage(0);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const pages = Math.max(1, Math.ceil(options.length / perPage));
  const current = Math.min(page, pages - 1);

  const handlePrev = () => {
    if (current > 0) {
      setDirection(-1);
      setPage(current - 1);
    }
  };

  const handleNext = () => {
    if (current < pages - 1) {
      setDirection(1);
      setPage(current + 1);
    }
  };

  const pageVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.12 : 0.24,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -24 : 24,
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.16,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <div className="abna-scent-pages">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          className="abna-scent-page"
          key={current}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <PhotoChoices
            options={options.slice(current * perPage, (current + 1) * perPage)}
            answer={answer}
            multiple
            layout="scent"
            onAnswer={onAnswer}
          />
        </motion.div>
      </AnimatePresence>

      <nav className="abna-scent-pages__navigation" aria-label="Halaman pilihan aroma">
        <motion.button
          type="button"
          aria-label="Aroma sebelumnya"
          disabled={current === 0}
          onClick={handlePrev}
          whileHover={shouldReduceMotion || current === 0 ? undefined : { scale: 1.08 }}
          whileTap={shouldReduceMotion || current === 0 ? undefined : { scale: 0.92 }}
        >
          <ArrowLeft size={20} />
        </motion.button>

        <span aria-live="polite">
          {current + 1} / {pages}
        </span>

        <motion.button
          type="button"
          aria-label="Aroma berikutnya"
          disabled={current === pages - 1}
          onClick={handleNext}
          whileHover={shouldReduceMotion || current === pages - 1 ? undefined : { scale: 1.08 }}
          whileTap={shouldReduceMotion || current === pages - 1 ? undefined : { scale: 0.92 }}
        >
          <ArrowRight size={20} />
        </motion.button>
      </nav>
    </div>
  );
}
