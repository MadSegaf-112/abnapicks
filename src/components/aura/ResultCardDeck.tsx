import { useMotionPreference } from "@/hooks/use-motion-preference";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import type { Recommendation } from "@/lib/recommendations.functions";
import { AbnaProductCard } from "./AbnaProductCard";

type Props = { recommendations: Recommendation[] };

// Entrance animation variants (used only on initial mount, not during scroll updates)
const deckContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const deckItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function StackCard({
  rec,
  index,
  count,
  progress,
  animated,
}: {
  rec: Recommendation;
  index: number;
  count: number;
  progress: MotionValue<number>;
  animated: boolean;
}) {
  const smoothProgress = useSpring(progress, { stiffness: 150, damping: 32, mass: 0.5 });
  const scale = useTransform(
    smoothProgress,
    [index / count, (index + 1) / count],
    [1, Math.max(0.88, 1 - (count - index - 1) * 0.035)],
  );
  const depth = useTransform(smoothProgress, [index / count, (index + 1) / count], [0, -1.4]);
  const shade = useTransform(smoothProgress, [index / count, (index + 1) / count], [0, 0.1]);
  const isLast = index === count - 1;
  const reduce = useMotionPreference();
  return (
    <motion.li
      className="abna-deck__item"
      data-primary={index === 0}
      style={{ "--card-index": index } as CSSProperties}
      variants={reduce ? undefined : deckItemVariants}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
    >
      <motion.div
        className="abna-deck__surface"
        style={{
          scale: animated && !isLast ? scale : 1,
          rotateX: animated && !isLast ? depth : 0,
          transformPerspective: 1600,
        }}
      >
        <motion.div
          className="abna-deck__depth"
          aria-hidden="true"
          style={{ opacity: animated && !isLast ? shade : 0 }}
        />
        <div className="abna-deck__card-heading">
          <span className="abna-deck__rank">{String(index + 1).padStart(2, "0")}</span>
          <span>{index === 0 ? "Pilihan utama untukmu" : "Pilihan alternatif"}</span>
          {index === 0 ? (
            <Sparkles size={18} aria-hidden="true" />
          ) : (
            <span className="abna-deck__edition">ABNA PICKS</span>
          )}
        </div>
        <AbnaProductCard rec={rec} isHero />
        <div className="abna-deck__card-footer">
          <span>{rec.projection && `Semerbak: ${rec.projection}`}</span>
          <span>{rec.longevity && `Ketahanan: ${rec.longevity}`}</span>
        </div>
      </motion.div>
    </motion.li>
  );
}

export function ResultCardDeck({ recommendations }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const reducedMotion = useMotionPreference();
  const [fitsViewport, setFitsViewport] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const animated = fitsViewport && !reducedMotion && recommendations.length > 1;

  useEffect(() => {
    const deck = ref.current;
    if (!deck) return;
    const surfaces = Array.from(deck.querySelectorAll<HTMLElement>(".abna-deck__surface"));
    // Tall content must remain in normal flow so no details become trapped under a card.
    const measure = () =>
      setFitsViewport(
        window.innerWidth > 900 &&
          surfaces.every(
            (surface, index) => surface.offsetHeight + 64 + index * 20 < window.innerHeight,
          ),
      );
    const observer = new ResizeObserver(measure);
    surfaces.forEach((surface) => observer.observe(surface));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [recommendations]);

  return (
    <div className="abna-discovery">
      <motion.header
        className="abna-discovery__heading"
        variants={headingVariants}
        initial={reducedMotion ? undefined : "hidden"}
        animate={reducedMotion ? { opacity: 1, y: 0 } : "visible"}
      >
        <div>
          <p className="abna-discovery__eyebrow">
            <span /> YOUR SCENT EDIT
          </p>
          <h2 tabIndex={-1} data-discovery-title>
            Selera kamu.
            <br />
            <em>Signature kamu.</em>
          </h2>
        </div>
        <div className="abna-discovery__intro">
          <p>
            {recommendations.length} pilihan aroma dari jawabanmu.
            <br />
            Kenali karakternya, temukan favoritmu.
          </p>
          <span>
            <ArrowDown size={16} aria-hidden="true" /> Gulir untuk jelajahi hasil
          </span>
        </div>
      </motion.header>
      <motion.ol
        ref={ref}
        className="abna-deck"
        data-stacked={animated}
        aria-label="Rekomendasi parfum berdasarkan urutan kecocokan"
        variants={reducedMotion ? undefined : deckContainerVariants}
        initial={reducedMotion ? undefined : "hidden"}
        animate={reducedMotion ? { opacity: 1, y: 0 } : "visible"}
      >
        {recommendations.map((rec, index) => (
          <StackCard
            key={`${rec.rank}-${rec.name}`}
            rec={rec}
            index={index}
            count={recommendations.length}
            progress={scrollYProgress}
            animated={animated}
          />
        ))}
      </motion.ol>
      <div className="abna-discovery__closing">
        <span>THE NEXT STEP</span>
        <h3>
          Aroma terbaik terasa <em>di kulitmu.</em>
        </h3>
        <p>Simpan pilihanmu, lalu coba parfum rekomendasi utama di store ABNA.</p>
      </div>
    </div>
  );
}
