import { useMotionPreference } from "@/hooks/use-motion-preference";
import { z } from "zod";
import { RecommendationSchema, isDistinctAlternativeSet } from "@/lib/recommendation-contract";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { QUIZ } from "@/data/quiz";
import { Header } from "@/components/aura/Header";
import { WelcomeScreen } from "@/components/aura/WelcomeScreen";
import { QuizScreen } from "@/components/aura/QuizScreen";
import { LoadingScreen } from "@/components/aura/LoadingScreen";
import { ResultsScreen } from "@/components/aura/ResultsScreen";
import { getRecommendations, type Recommendation } from "@/lib/recommendations.functions";
import {
  trackConsultationEvent,
  dispatchClientEvent,
  resetClientEventRegistry,
} from "@/lib/customer-events.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABNA PICKS · Cuma 1 Menit, Ketemu Parfum Andalanmu" },
      {
        name: "description",
        content:
          "Mulai konsultasi aroma singkat dan temukan parfum ABNA yang paling cocok dengan karakter, selera, dan kebutuhanmu.",
      },
      { property: "og:title", content: "ABNA PICKS · Konsultasi Parfum Singkat" },
      {
        property: "og:description",
        content:
          "Konsultasi aroma personal resmi di gerai ABNA Parfum. Bisa langsung coba tester di store.",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: AuraApp,
});

type Phase = "welcome" | "quiz" | "loading" | "results";

const INACTIVITY_TIMEOUT_MS = 120000; // 120 seconds idle reset for store kiosk
const SESSION_STORAGE_KEY = "abna_quiz_session";

interface SessionStoreData {
  sessionId: string;
  answers: Record<string, unknown>;
  initialRecommendations: Recommendation[] | null;
  initialRecommendationIds: string[];
  regeneratedRecommendations: Recommendation[] | null;
  regeneratedRecommendationIds: string[] | null;
  hasRegenerated: boolean;
  currentRecommendations: Recommendation[] | null;
  phase: Phase;
  savedAt?: number;
}

const StoredSessionSchema = z.object({
  sessionId: z.string().min(1),
  answers: z.record(z.unknown()),
  initialRecommendations: z.array(RecommendationSchema).min(1).max(3),
  initialRecommendationIds: z.array(z.string()),
  regeneratedRecommendations: z.array(RecommendationSchema).nullable(),
  regeneratedRecommendationIds: z.array(z.string()).nullable(),
  hasRegenerated: z.boolean(),
  currentRecommendations: z.array(RecommendationSchema).min(1).max(3),
  phase: z.literal("results"),
  savedAt: z.number().optional(),
});

function AuraApp() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [sessionId, setSessionId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [initialRecommendations, setInitialRecommendations] = useState<Recommendation[] | null>(
    null,
  );
  const [initialRecommendationIds, setInitialRecommendationIds] = useState<string[]>([]);
  const [regeneratedRecommendations, setRegeneratedRecommendations] = useState<
    Recommendation[] | null
  >(null);
  const [regeneratedRecommendationIds, setRegeneratedRecommendationIds] = useState<string[]>([]);
  const [hasRegenerated, setHasRegenerated] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenerationMessage, setRegenerationMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showIdleWarning, setShowIdleWarning] = useState(false);

  const shouldReduceMotion = useMotionPreference();
  const fetchRecs = useServerFn(getRecommendations);
  const trackEventFn = useServerFn(trackConsultationEvent);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRegeneratingRef = useRef(false);
  const requestEpochRef = useRef(0);
  const isSubmittingRef = useRef(false);
  const navigationLockRef = useRef(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const hasRegeneratedRef = useRef(false);

  const total = QUIZ.length;
  const currentStep = QUIZ[stepIdx];

  const headerStep = phase === "welcome" ? 0 : phase === "quiz" ? stepIdx + 1 : total;

  const committedStepRef = useRef<string | null>(null);

  // Restore active session from sessionStorage if remounting in results phase
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = StoredSessionSchema.parse(JSON.parse(saved));
        if (parsed.savedAt && Date.now() - parsed.savedAt > INACTIVITY_TIMEOUT_MS) {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
          return;
        }
        if (
          parsed.hasRegenerated &&
          !isDistinctAlternativeSet(parsed.initialRecommendations, parsed.currentRecommendations)
        ) {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
          return;
        }
        if (parsed.sessionId && parsed.phase === "results" && parsed.currentRecommendations) {
          setSessionId(parsed.sessionId);
          setAnswers(parsed.answers || {});
          setInitialRecommendations(parsed.initialRecommendations);
          setInitialRecommendationIds(parsed.initialRecommendationIds || []);
          setRegeneratedRecommendations(parsed.regeneratedRecommendations);
          setRegeneratedRecommendationIds(parsed.regeneratedRecommendationIds || []);
          setHasRegenerated(Boolean(parsed.hasRegenerated));
          hasRegeneratedRef.current = Boolean(parsed.hasRegenerated);
          setRecommendations(parsed.currentRecommendations);
          if (parsed.hasRegenerated) {
            setRegenerationMessage("Ini tiga pilihan alternatif berdasarkan preferensi awalmu.");
          }
          setPhase("results");
        }
      }
    } catch (e) {
      console.warn("[AuraApp] Failed to restore session from sessionStorage:", e);
    }
  }, []);

  const handleRestart = useCallback(() => {
    requestEpochRef.current += 1;
    isSubmittingRef.current = false;
    navigationLockRef.current = false;
    committedStepRef.current = null;
    isRegeneratingRef.current = false;
    hasRegeneratedRef.current = false;
    resetClientEventRegistry();
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      /* Storage unavailable: keep the active in-memory session. */
    }
    setAnswers({});
    setSessionId("");
    setRecommendations(null);
    setInitialRecommendations(null);
    setInitialRecommendationIds([]);
    setRegeneratedRecommendations(null);
    setRegeneratedRecommendationIds([]);
    setHasRegenerated(false);
    setIsRegenerating(false);
    setRegenerationMessage(null);
    setStepIdx(0);
    setDirection(1);
    setError(null);
    setShowIdleWarning(false);
    setPhase("welcome");
  }, []);

  // In-Store Kiosk Inactivity Reset Management
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (phase !== "welcome") {
      idleTimerRef.current = setTimeout(() => {
        handleRestart();
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, [phase, handleRestart]);

  useEffect(() => {
    const handleUserTouch = () => resetIdleTimer();
    window.addEventListener("pointerdown", handleUserTouch);
    window.addEventListener("touchstart", handleUserTouch);
    window.addEventListener("click", handleUserTouch);
    window.addEventListener("keydown", handleUserTouch);
    window.addEventListener("scroll", handleUserTouch, { passive: true });

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("pointerdown", handleUserTouch);
      window.removeEventListener("touchstart", handleUserTouch);
      window.removeEventListener("click", handleUserTouch);
      window.removeEventListener("keydown", handleUserTouch);
      window.removeEventListener("scroll", handleUserTouch);
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [phase, stepIdx]);

  const handleBegin = useCallback(() => {
    requestEpochRef.current += 1;
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSessionId);
    setPhase("quiz");
    setStepIdx(0);
    setDirection(1);
    resetIdleTimer();

    // Event 1: consultation_started
    dispatchClientEvent(trackEventFn, {
      sessionId: newSessionId,
      eventType: "consultation_started",
      clientPlatform: "kiosk_web",
    });

    // Event 2: question_viewed (Q1)
    dispatchClientEvent(trackEventFn, {
      sessionId: newSessionId,
      eventType: "question_viewed",
      questionNumber: 1,
      stepId: QUIZ[0]?.id || "mood",
      clientPlatform: "kiosk_web",
    });
  }, [trackEventFn, resetIdleTimer]);

  // Track question_viewed whenever step index changes during quiz phase
  useEffect(() => {
    if (phase === "quiz" && sessionId && currentStep) {
      dispatchClientEvent(trackEventFn, {
        sessionId,
        eventType: "question_viewed",
        questionNumber: stepIdx + 1,
        stepId: currentStep.id,
        clientPlatform: "kiosk_web",
      });
    }
  }, [phase, stepIdx, sessionId, currentStep, trackEventFn]);

  const handleAnswer = useCallback(
    (v: unknown) => {
      setAnswers((a) => ({ ...a, [currentStep.id]: v }));
      resetIdleTimer();

      // Event: question_answered
      if (sessionId) {
        dispatchClientEvent(trackEventFn, {
          sessionId,
          eventType: "question_answered",
          questionNumber: stepIdx + 1,
          stepId: currentStep.id,
          clientPlatform: "kiosk_web",
        });
      }
    },
    [currentStep.id, stepIdx, sessionId, trackEventFn, resetIdleTimer],
  );

  const handleDirectAnswer = useCallback(
    (key: string, v: unknown) => {
      setAnswers((a) => ({ ...a, [key]: v }));
      resetIdleTimer();
    },
    [resetIdleTimer],
  );

  const submit = useCallback(
    async (submittedAnswers = answers) => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;
      const epoch = requestEpochRef.current;
      setPhase("loading");
      setError(null);
      setRegenerationMessage(null);
      try {
        const data = {
          sessionId: sessionId || undefined,
          clientPlatform: "kiosk_web",
          mood: submittedAnswers.mood as string | undefined,
          atmosphere: submittedAnswers.atmosphere as string | undefined,
          scent_family: submittedAnswers.scent_family as string[] | undefined,
          intensity: submittedAnswers.intensity as string | number | undefined,
          occasion: submittedAnswers.occasion as string | undefined,
          gender: submittedAnswers.gender as string | undefined,
          perfume_type: submittedAnswers.perfume_type as string | undefined,
          age_range: submittedAnswers.age_range as string | undefined,
          occupation: submittedAnswers.occupation as string | undefined,
          price_range: submittedAnswers.price_range as string | undefined,
        };
        const res = await fetchRecs({ data });
        if (epoch !== requestEpochRef.current) return;
        const recs = z.array(RecommendationSchema).min(1).max(3).parse(res.recommendations);
        const initialIds = recs.map(
          (r) => r.id || r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        );

        setInitialRecommendations(recs);
        setInitialRecommendationIds(initialIds);
        setRegeneratedRecommendations(null);
        setRegeneratedRecommendationIds([]);
        setHasRegenerated(false);
        hasRegeneratedRef.current = false;
        setRecommendations(recs);
        setPhase("results");

        try {
          if (typeof window !== "undefined") {
            const storeData: SessionStoreData = {
              sessionId,
              answers: submittedAnswers,
              initialRecommendations: recs,
              initialRecommendationIds: initialIds,
              regeneratedRecommendations: null,
              regeneratedRecommendationIds: null,
              hasRegenerated: false,
              currentRecommendations: recs,
              phase: "results",
              savedAt: Date.now(),
            };
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storeData));
          }
        } catch {
          /* Storage unavailable: keep the active in-memory session. */
        }

        // Event: results_viewed & consultation_completed
        if (sessionId) {
          dispatchClientEvent(trackEventFn, {
            sessionId,
            eventType: "results_viewed",
            clientPlatform: "kiosk_web",
          });
          dispatchClientEvent(trackEventFn, {
            sessionId,
            eventType: "consultation_completed",
            clientPlatform: "kiosk_web",
          });
        }
      } catch (e) {
        if (epoch !== requestEpochRef.current) return;
        console.error(e);
        setError(e instanceof Error ? e.message : "Terjadi kendala dalam kurasi aroma.");
        committedStepRef.current = null;
        setPhase("quiz");
      } finally {
        if (epoch === requestEpochRef.current) isSubmittingRef.current = false;
      }
    },
    [answers, sessionId, fetchRecs, trackEventFn],
  );

  const handleRegenerate = useCallback(async () => {
    // 1. Guard against duplicate clicks or already completed regeneration
    if (isRegeneratingRef.current || hasRegeneratedRef.current || hasRegenerated) {
      return;
    }

    if (!recommendations || recommendations.length === 0) {
      return;
    }

    // Capture initial recommendation identifiers
    const idsToExclude =
      initialRecommendationIds.length > 0
        ? initialRecommendationIds
        : recommendations.map((r) => r.id || r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    const namesToExclude = (initialRecommendations || recommendations).map((r) => r.name);

    const epoch = requestEpochRef.current;
    isRegeneratingRef.current = true;
    setIsRegenerating(true);
    setRegenerationMessage("Menyiapkan tiga rekomendasi alternatif...");
    setError(null);
    resetIdleTimer();

    try {
      const data = {
        sessionId: sessionId || undefined,
        clientPlatform: "kiosk_web",
        mood: answers.mood as string | undefined,
        atmosphere: answers.atmosphere as string | undefined,
        scent_family: answers.scent_family as string[] | undefined,
        intensity: answers.intensity as string | number | undefined,
        occasion: answers.occasion as string | undefined,
        gender: answers.gender as string | undefined,
        perfume_type: answers.perfume_type as string | undefined,
        age_range: answers.age_range as string | undefined,
        occupation: answers.occupation as string | undefined,
        price_range: answers.price_range as string | undefined,
        excludeFragranceIds: idsToExclude,
        excludePerfumeNames: namesToExclude,
        isRegeneration: true,
      };

      const res = await fetchRecs({ data });
      if (epoch !== requestEpochRef.current) return;

      // Handle insufficient alternatives: fewer than 3 eligible distinct recommendations
      if (res.insufficientAlternatives || !res.recommendations || res.recommendations.length < 3) {
        setRegenerationMessage(
          "Pilihan alternatif belum mencukupi. Rekomendasi awalmu tetap tersimpan.",
        );
        // Do NOT mark regeneration as completed! Initial recommendations are preserved safely.
        return;
      }

      // Defensive validation: ensure zero overlap between initial recommendations and regenerated recommendations
      const initialIdSet = new Set(idsToExclude.map((id) => id.toLowerCase()));
      const initialNameSet = new Set(
        namesToExclude.map((n) => n.trim().toLowerCase().replace(/\s+/g, " ")),
      );

      const hasOverlap = res.recommendations.some((rec) => {
        const recId = (rec.id || rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")).toLowerCase();
        const recName = rec.name.trim().toLowerCase().replace(/\s+/g, " ");
        return initialIdSet.has(recId) || initialNameSet.has(recName);
      });

      if (
        hasOverlap ||
        !isDistinctAlternativeSet(initialRecommendations || recommendations, res.recommendations)
      ) {
        console.warn(
          "[Regeneration] Overlap detected with initial recommendations. Aborting regeneration.",
        );
        setRegenerationMessage(
          "Pilihan alternatif belum mencukupi. Rekomendasi awalmu tetap tersimpan.",
        );
        return;
      }

      // Success: Apply new Top 3 distinct recommendations
      const newRecs = res.recommendations;
      const newIds = newRecs.map((r) => r.id || r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));

      setRegeneratedRecommendations(newRecs);
      setRegeneratedRecommendationIds(newIds);
      setRecommendations(newRecs);
      setHasRegenerated(true);
      hasRegeneratedRef.current = true;
      setRegenerationMessage("Ini tiga pilihan alternatif berdasarkan preferensi awalmu.");

      try {
        if (typeof window !== "undefined") {
          const storeData: SessionStoreData = {
            sessionId,
            answers,
            initialRecommendations,
            initialRecommendationIds: idsToExclude,
            regeneratedRecommendations: newRecs,
            regeneratedRecommendationIds: newIds,
            hasRegenerated: true,
            currentRecommendations: newRecs,
            phase: "results",
            savedAt: Date.now(),
          };
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storeData));
        }
      } catch {
        /* Storage unavailable: keep the active in-memory session. */
      }
    } catch (err) {
      if (epoch !== requestEpochRef.current) return;
      console.error("[Regeneration error]:", err);
      setRegenerationMessage(
        "Belum berhasil memuat alternatif. Silakan coba lagi; rekomendasi awal tetap tersimpan.",
      );
    } finally {
      if (epoch === requestEpochRef.current) {
        isRegeneratingRef.current = false;
        setIsRegenerating(false);
        resetIdleTimer();
      }
    }
  }, [
    hasRegenerated,
    recommendations,
    initialRecommendationIds,
    initialRecommendations,
    sessionId,
    answers,
    fetchRecs,
    resetIdleTimer,
  ]);

  const handleCommitAnswer = useCallback(
    (value: unknown, extra: Record<string, unknown> = {}) => {
      // Ignore repeated taps while the previous question is leaving the screen.
      if (navigationLockRef.current || committedStepRef.current === currentStep.id) return;
      navigationLockRef.current = true;
      committedStepRef.current = currentStep.id;
      setDirection(1);
      handleAnswer(value);
      setAnswers((previous) => ({ ...previous, ...extra, [currentStep.id]: value }));
      if (stepIdx === total - 1) {
        void submit({ ...answers, ...extra, [currentStep.id]: value });
      } else {
        setStepIdx((previous) => previous + 1);
      }
    },
    [handleAnswer, currentStep.id, stepIdx, total, submit, answers],
  );

  const handleNext = useCallback(() => {
    if (navigationLockRef.current) return;
    navigationLockRef.current = true;
    committedStepRef.current = null;
    resetIdleTimer();
    setDirection(1);
    if (stepIdx < total - 1) setStepIdx((s) => s + 1);
    else submit();
  }, [stepIdx, total, submit, resetIdleTimer]);

  const handleBack = useCallback(() => {
    if (navigationLockRef.current) return;
    navigationLockRef.current = true;
    committedStepRef.current = null;
    resetIdleTimer();
    setDirection(-1);
    if (stepIdx > 0) setStepIdx((s) => s - 1);
    else setPhase("welcome");
  }, [stepIdx, resetIdleTimer]);

  const handleClose = useCallback(() => {
    handleRestart();
  }, [handleRestart]);

  useEffect(() => {
    const header = headerRef.current;
    const measure = () =>
      appRef.current?.style.setProperty("--quiz-header-height", `${header?.offsetHeight || 0}px`);
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    measure();
    return () => observer.disconnect();
  }, [phase]);

  useEffect(
    () => () => {
      requestEpochRef.current += 1;
    },
    [],
  );

  // Directional question transition variants
  const questionVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 26 : -26,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.996,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -22 : 22,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.996,
      transition: {
        duration: shouldReduceMotion ? 0.08 : 0.22,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <div
      ref={appRef}
      className="abna-ui relative flex min-h-svh flex-col select-none touch-manipulation"
    >
      {(phase === "quiz" || phase === "loading") && (
        <div ref={headerRef}>
          <Header
            step={headerStep}
            total={total}
            category={currentStep?.kicker}
            onClose={handleClose}
            showStep={phase === "quiz"}
          />
        </div>
      )}

      <main className="relative flex flex-1 flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          {phase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col"
            >
              <WelcomeScreen onBegin={handleBegin} />
            </motion.div>
          )}

          {phase === "quiz" && (
            <motion.div
              onAnimationComplete={(definition) => {
                if (definition === "center") {
                  navigationLockRef.current = false;
                  appRef.current
                    ?.querySelector<HTMLElement>(".abna-quiz-fit h2")
                    ?.focus({ preventScroll: true });
                }
              }}
              key={"quiz-" + stepIdx}
              custom={direction}
              variants={questionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-1 flex-col"
            >
              <QuizScreen
                step={currentStep}
                index={stepIdx}
                total={total}
                answer={answers[currentStep.id]}
                allAnswers={answers}
                onAnswer={handleAnswer}
                onCommit={handleCommitAnswer}
                onUpdateAnswer={handleDirectAnswer}
                onBack={handleBack}
                onNext={handleNext}
                isLast={stepIdx === total - 1}
              />
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col"
            >
              <LoadingScreen />
            </motion.div>
          )}

          {phase === "results" && recommendations && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col"
            >
              <ResultsScreen
                recommendations={recommendations}
                onRestart={handleRestart}
                onRegenerate={handleRegenerate}
                isRegenerating={isRegenerating}
                hasRegenerated={hasRegenerated}
                regenerationMessage={regenerationMessage}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div
            role="alert"
            className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-3 text-sm font-semibold text-destructive backdrop-blur-md"
          >
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
