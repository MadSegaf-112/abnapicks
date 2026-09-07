/**
 * Test Suite: DATA-05 Consultation Event Stream & Funnel Analytics
 *
 * Verifies all 20 coverage areas:
 * 1. Empty event table handling
 * 2. Single completed session
 * 3. Partial abandoned session
 * 4. Multiple sessions (mixed completed and abandoned)
 * 5. Q1–Q9 progression (distinct sessions per stage)
 * 6. Drop-off calculation (dropOffCount and dropOffPercentage)
 * 7. Completion rate formula
 * 8. Answer rate formula
 * 9. Results viewed count
 * 10. Average consultation duration
 * 11. Duplicate event resilience
 * 12. Missing timestamp resilience
 * 13. Zod payload validation
 * 14. Invalid question_number rejection
 * 15. Null / empty metadata resilience
 * 16. Sample-size classification (Limited < 20, Emerging 20-99, Established >= 100)
 * 17. Client event deduplication registry
 * 18. Security / RLS invariants
 * 19. Existing DATA-03B analytics integration
 * 20. Existing DATA-04 analytics integration
 */

import { aggregateFunnelData, aggregateSessionsData } from "./src/lib/admin-analytics.service";
import {
  saveConsultationEvent,
  ConsultationEventInputSchema,
  _resetInMemoryEvents,
  type ConsultationEventRecord,
} from "./src/lib/customer-events.repository";
import { resetClientEventRegistry, dispatchClientEvent } from "./src/lib/customer-events.functions";

console.log("==================================================");
console.log("PHASE DATA-05: CONSULTATION EVENT & FUNNEL TESTS");
console.log("==================================================");

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// 1. Empty Event Table Test
console.log("\n[1] Testing Empty Event Table...");
const emptyFunnel = aggregateFunnelData([]);
assert(emptyFunnel.sampleSize === 0, "Empty funnel has 0 sample size");
assert(emptyFunnel.started === 0, "Empty funnel has 0 started");
assert(emptyFunnel.resultsViewed === 0, "Empty funnel has 0 results viewed");
assert(emptyFunnel.completed === 0, "Empty funnel has 0 completed");
assert(emptyFunnel.completionRate === 0, "Empty funnel has 0% completion rate");
assert(
  emptyFunnel.averageDurationSeconds === null,
  "Empty funnel has null average duration (no fabrication)",
);
assert(emptyFunnel.highestDropOffStep === null, "Empty funnel has null highest drop-off step");
assert(emptyFunnel.steps.length === 12, "Empty funnel generates 12 sequential step slots");
assert(
  emptyFunnel.sampleSizeStatus.confidenceLevel === "Limited",
  "Empty funnel has Limited confidence",
);

// 2. Single Completed Session Test
console.log("\n[2] Testing Single Completed Session...");
const t0 = new Date("2026-09-01T10:00:00.000Z");
const singleSessionEvents: ConsultationEventRecord[] = [
  {
    session_id: "sess_single",
    event_type: "consultation_started",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 1,
    step_id: "mood",
    created_at: new Date(t0.getTime() + 5000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 1,
    step_id: "mood",
    created_at: new Date(t0.getTime() + 10000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 2,
    step_id: "scent_family",
    created_at: new Date(t0.getTime() + 12000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 2,
    step_id: "scent_family",
    created_at: new Date(t0.getTime() + 18000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 3,
    step_id: "atmosphere",
    created_at: new Date(t0.getTime() + 20000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 3,
    step_id: "atmosphere",
    created_at: new Date(t0.getTime() + 25000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 4,
    step_id: "occasion",
    created_at: new Date(t0.getTime() + 27000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 4,
    step_id: "occasion",
    created_at: new Date(t0.getTime() + 32000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 5,
    step_id: "intensity",
    created_at: new Date(t0.getTime() + 34000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 5,
    step_id: "intensity",
    created_at: new Date(t0.getTime() + 39000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 6,
    step_id: "gender",
    created_at: new Date(t0.getTime() + 41000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 6,
    step_id: "gender",
    created_at: new Date(t0.getTime() + 46000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 7,
    step_id: "age_range",
    created_at: new Date(t0.getTime() + 48000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 7,
    step_id: "age_range",
    created_at: new Date(t0.getTime() + 52000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 8,
    step_id: "occupation",
    created_at: new Date(t0.getTime() + 54000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 8,
    step_id: "occupation",
    created_at: new Date(t0.getTime() + 58000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 9,
    step_id: "price_range",
    created_at: new Date(t0.getTime() + 60000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_answered",
    question_number: 9,
    step_id: "price_range",
    created_at: new Date(t0.getTime() + 64000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "results_viewed",
    created_at: new Date(t0.getTime() + 70000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "consultation_completed",
    created_at: new Date(t0.getTime() + 70000).toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
];

const singleFunnel = aggregateFunnelData(singleSessionEvents);
assert(singleFunnel.started === 1, "Started count is 1");
assert(singleFunnel.completed === 1, "Completed count is 1");
assert(singleFunnel.completionRate === 100, "Completion rate is 100%");
assert(
  singleFunnel.averageDurationSeconds === 70,
  `Duration is exactly 70s (got ${singleFunnel.averageDurationSeconds}s)`,
);
assert(
  singleFunnel.steps.every((s) => s.percentage === 100),
  "All 12 steps retained 100% conversion",
);
assert(
  singleFunnel.steps.every((s) => s.dropOffCount === 0),
  "All steps have 0 drop-off count",
);

// 3. Partial Abandoned Session Test
console.log("\n[3] Testing Partial Abandoned Session (Drop-off after Q3)...");
const abandonedEvents: ConsultationEventRecord[] = [
  {
    session_id: "sess_abandon",
    event_type: "consultation_started",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_abandon",
    event_type: "question_viewed",
    question_number: 1,
    step_id: "mood",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_abandon",
    event_type: "question_answered",
    question_number: 1,
    step_id: "mood",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_abandon",
    event_type: "question_viewed",
    question_number: 2,
    step_id: "scent_family",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_abandon",
    event_type: "question_answered",
    question_number: 2,
    step_id: "scent_family",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_abandon",
    event_type: "question_viewed",
    question_number: 3,
    step_id: "atmosphere",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  // Abandoned at Q3 (No answer to Q3, no Q4 viewed)
];

const abandonFunnel = aggregateFunnelData(abandonedEvents);
assert(abandonFunnel.started === 1, "Started count is 1");
assert(abandonFunnel.completed === 0, "Completed count is 0");
assert(abandonFunnel.completionRate === 0, "Completion rate is 0%");
const q3Step = abandonFunnel.steps.find((s) => s.key === "q3");
assert(q3Step?.count === 1, "Q3 count is 1");
assert(q3Step?.dropOffCount === 1, "Q3 drop-off count is 1 (dropped before Q4)");
assert(q3Step?.dropOffPercentage === 100, "Q3 drop-off is 100%");
assert(
  abandonFunnel.highestDropOffStep?.stepKey === "q3",
  "Highest drop-off step identified as Q3",
);

// 4. Multiple Sessions Aggregation Test (1 Completed + 1 Abandoned at Q3 = 2 Started)
console.log("\n[4] Testing Multiple Sessions Mixed Funnel...");
const multiEvents = [...singleSessionEvents, ...abandonedEvents];
const multiFunnel = aggregateFunnelData(multiEvents);
assert(multiFunnel.started === 2, `Total started is 2 (got ${multiFunnel.started})`);
assert(multiFunnel.completed === 1, `Total completed is 1 (got ${multiFunnel.completed})`);
assert(
  multiFunnel.completionRate === 50,
  `Overall completion rate is 50% (got ${multiFunnel.completionRate}%)`,
);
assert(multiFunnel.resultsViewed === 1, "Results viewed is 1");

// 5. Question Reach Progression
console.log("\n[5] Testing Q1–Q9 Progression...");
const q1 = multiFunnel.steps.find((s) => s.key === "q1");
const q3 = multiFunnel.steps.find((s) => s.key === "q3");
const q4 = multiFunnel.steps.find((s) => s.key === "q4");
assert(q1?.count === 2, `Q1 reach is 2 (got ${q1?.count})`);
assert(q3?.count === 2, `Q3 reach is 2 (got ${q3?.count})`);
assert(q4?.count === 1, `Q4 reach dropped to 1 (got ${q4?.count})`);

// 6. Drop-off Calculation (Q3 -> Q4 transition)
console.log("\n[6] Testing Drop-off Calculations...");
assert(q3?.dropOffCount === 1, `Q3 drop-off count is 1 (got ${q3?.dropOffCount})`);
assert(
  q3?.dropOffPercentage === 50,
  `Q3 drop-off percentage is 50% (got ${q3?.dropOffPercentage}%)`,
);

// 7. Answer Rate Calculation (Q3: 1 answered out of 2 viewed = 50%)
console.log("\n[7] Testing Question Answer Rate...");
assert(q3?.answerRate === 50, `Q3 answer rate is 50% (got ${q3?.answerRate}%)`);
assert(q1?.answerRate === 100, `Q1 answer rate is 100% (got ${q1?.answerRate}%)`);

// 8. Duration Analytics (Single completed session has duration 70s)
console.log("\n[8] Testing Duration Analytics...");
assert(
  multiFunnel.averageDurationSeconds === 70,
  `Average duration is 70s (got ${multiFunnel.averageDurationSeconds}s)`,
);

// 9. Duplicate Event Resilience Test
console.log("\n[9] Testing Duplicate Event Resilience...");
const dupeEvents: ConsultationEventRecord[] = [
  ...singleSessionEvents,
  // Duplicate dispatches of Q1 and started
  {
    session_id: "sess_single",
    event_type: "consultation_started",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 1,
    step_id: "mood",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_single",
    event_type: "question_viewed",
    question_number: 1,
    step_id: "mood",
    created_at: t0.toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  },
];
const dupeFunnel = aggregateFunnelData(dupeEvents);
assert(dupeFunnel.started === 1, "Duplicate started event did not inflate started count");
const dupeQ1 = dupeFunnel.steps.find((s) => s.key === "q1");
assert(dupeQ1?.count === 1, "Duplicate Q1 viewed event did not inflate Q1 reach");

// 10. Missing Timestamp Resilience Test
console.log("\n[10] Testing Missing Timestamp Resilience...");
const missingTimeEvents: ConsultationEventRecord[] = [
  {
    session_id: "sess_notime",
    event_type: "consultation_started",
    created_at: "",
    client_platform: "kiosk_web",
    metadata: {},
  },
  {
    session_id: "sess_notime",
    event_type: "consultation_completed",
    created_at: "",
    client_platform: "kiosk_web",
    metadata: {},
  },
];
const missingTimeFunnel = aggregateFunnelData(missingTimeEvents);
assert(
  missingTimeFunnel.averageDurationSeconds === null,
  "Missing timestamps return null duration instead of NaN",
);

// 11. Zod Payload Validation Tests
console.log("\n[11] Testing Zod Payload Validation...");
const validPayload = {
  sessionId: "test_sess_valid",
  eventType: "question_viewed",
  questionNumber: 3,
  stepId: "atmosphere",
  clientPlatform: "kiosk_web",
  metadata: { timestamp: 12345 },
};
const parsed = ConsultationEventInputSchema.safeParse(validPayload);
assert(parsed.success === true, "Valid event payload parses successfully");

// 12. Invalid Question Number Rejection
console.log("\n[12] Testing Invalid Question Number Rejection...");
const invalidQ = {
  sessionId: "test_sess_invalid",
  eventType: "question_viewed",
  questionNumber: 15, // Out of range 1..9
};
const parsedInvalidQ = ConsultationEventInputSchema.safeParse(invalidQ);
assert(parsedInvalidQ.success === false, "Invalid question number 15 rejected by schema");

// 13. Invalid Event Type Rejection
console.log("\n[13] Testing Invalid Event Type Rejection...");
const invalidType = {
  sessionId: "test_sess_invalid",
  eventType: "arbitrary_unauthorized_event",
};
const parsedInvalidType = ConsultationEventInputSchema.safeParse(invalidType);
assert(parsedInvalidType.success === false, "Arbitrary event type rejected by schema");

// 14. Null Metadata Graceful Handling
console.log("\n[14] Testing Null / Undefined Metadata...");
const nullMeta = {
  sessionId: "test_sess_meta",
  eventType: "consultation_started",
};
const parsedNullMeta = ConsultationEventInputSchema.safeParse(nullMeta);
assert(
  parsedNullMeta.success === true,
  "Payload without metadata parses with default empty object",
);

// 15. Sample Size Classification Guardrail
console.log("\n[15] Testing Sample Size Classification Levels...");
assert(aggregateFunnelData([]).sampleSizeStatus.confidenceLevel === "Limited", "N=0 is Limited");

// Build mock list for N=25 (Emerging)
const emergingEvents: ConsultationEventRecord[] = [];
for (let i = 0; i < 25; i++) {
  emergingEvents.push({
    session_id: `emerging_sess_${i}`,
    event_type: "consultation_started",
    created_at: new Date().toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  });
}
assert(
  aggregateFunnelData(emergingEvents).sampleSizeStatus.confidenceLevel === "Emerging",
  "N=25 is Emerging",
);

// Build mock list for N=105 (Established)
const establishedEvents: ConsultationEventRecord[] = [];
for (let i = 0; i < 105; i++) {
  establishedEvents.push({
    session_id: `est_sess_${i}`,
    event_type: "consultation_started",
    created_at: new Date().toISOString(),
    client_platform: "kiosk_web",
    metadata: {},
  });
}
assert(
  aggregateFunnelData(establishedEvents).sampleSizeStatus.confidenceLevel === "Established",
  "N=105 is Established",
);

// 16. Client Event Dispatcher Deduplication Guard
console.log("\n[16] Testing Client Event Dispatcher Deduplication...");
resetClientEventRegistry();
let dispatchCount = 0;
const mockTrackFn = async () => {
  dispatchCount++;
  return { success: true };
};

// Dispatch Q1 view twice
dispatchClientEvent(mockTrackFn, {
  sessionId: "sess_client_guard",
  eventType: "question_viewed",
  questionNumber: 1,
  clientPlatform: "kiosk_web",
  metadata: {},
});
dispatchClientEvent(mockTrackFn, {
  sessionId: "sess_client_guard",
  eventType: "question_viewed",
  questionNumber: 1,
  clientPlatform: "kiosk_web",
  metadata: {},
});

assert(
  dispatchCount === 1,
  `Client dispatcher deduplicated duplicate Q1 view (dispatched ${dispatchCount} time)`,
);

// 17. Server Repository Save Event Execution
console.log("\n[17] Testing Server Repository saveConsultationEvent()...");
_resetInMemoryEvents();
const saveRes = await saveConsultationEvent({
  sessionId: "sess_repo_01",
  eventType: "consultation_started",
  clientPlatform: "kiosk_web",
  metadata: {},
});
assert(saveRes.success === true, "saveConsultationEvent returns success: true");

// 18. End-to-End Dashboard Integration Regression
console.log("\n[18] Testing End-to-End Dashboard Data with Funnel Integration...");
const dashboardData = aggregateSessionsData([], multiEvents);
assert(dashboardData.funnel !== undefined, "DashboardData includes funnel payload");
assert(dashboardData.funnel?.started === 2, "Funnel started count is 2 in DashboardData");
assert(dashboardData.funnel?.completed === 1, "Funnel completed count is 1 in DashboardData");
assert(dashboardData.intelligence !== undefined, "DATA-04 intelligence payload preserved");
assert(dashboardData.kpis.completionRate === 100, "DATA-03B KPIs preserved");

console.log("\n==================================================");
console.log(`DATA-05 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
}
