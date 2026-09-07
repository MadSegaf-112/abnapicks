import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
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
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no",
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

const INACTIVITY_TIMEOUT_MS = 60000; // 60 seconds idle reset for store kiosk

function AuraApp() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [sessionId, setSessionId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showIdleWarning, setShowIdleWarning] = useState(false);

  const fetchRecs = useServerFn(getRecommendations);
  const trackEventFn = useServerFn(trackConsultationEvent);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = QUIZ.length;
  const currentStep = QUIZ[stepIdx];

  const headerStep = phase === "welcome" ? 0 : phase === "quiz" ? stepIdx + 1 : total;

  const handleRestart = useCallback(() => {
    resetClientEventRegistry();
    setAnswers({});
    setSessionId("");
    setRecommendations(null);
    setStepIdx(0);
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

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("pointerdown", handleUserTouch);
      window.removeEventListener("touchstart", handleUserTouch);
      window.removeEventListener("click", handleUserTouch);
    };
  }, [resetIdleTimer]);

  const handleBegin = useCallback(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSessionId);
    setPhase("quiz");
    setStepIdx(0);
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

  const submit = useCallback(async () => {
    setPhase("loading");
    setError(null);
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
        age_range: answers.age_range as string | undefined,
        occupation: answers.occupation as string | undefined,
        price_range: answers.price_range as string | undefined,
      };
      const res = await fetchRecs({ data });
      setRecommendations(res.recommendations);
      setPhase("results");

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
      console.error(e);
      setError(e instanceof Error ? e.message : "Terjadi kendala dalam kurasi aroma.");
      setPhase("quiz");
    }
  }, [answers, sessionId, fetchRecs, trackEventFn]);

  const handleNext = useCallback(() => {
    resetIdleTimer();
    if (stepIdx < total - 1) setStepIdx((s) => s + 1);
    else submit();
  }, [stepIdx, total, submit, resetIdleTimer]);

  const handleBack = useCallback(() => {
    resetIdleTimer();
    if (stepIdx > 0) setStepIdx((s) => s - 1);
    else setPhase("welcome");
  }, [stepIdx, resetIdleTimer]);

  const handleClose = useCallback(() => {
    handleRestart();
  }, [handleRestart]);

  return (
    <div
      className={`grain relative flex min-h-svh flex-col select-none touch-manipulation ${phase === "welcome" ? "bg-[#020806]" : "ivory-bg"}`}
    >
      {phase !== "welcome" && (
        <Header step={headerStep} total={total} onClose={handleClose} showStep={phase === "quiz"} />
      )}

      <main className="relative flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {phase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="flex flex-1 flex-col"
            >
              <WelcomeScreen onBegin={handleBegin} />
            </motion.div>
          )}

          {phase === "quiz" && (
            <motion.div
              key={"quiz-" + stepIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col"
            >
              <QuizScreen
                step={currentStep}
                index={stepIdx}
                total={total}
                answer={answers[currentStep.id]}
                onAnswer={handleAnswer}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-1 flex-col"
            >
              <ResultsScreen recommendations={recommendations} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-3 text-sm font-semibold text-destructive backdrop-blur-md">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
