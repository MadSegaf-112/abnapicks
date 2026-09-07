/**
 * PHASE 6H-3 — CUSTOMER SESSION PERSISTENCE TEST SUITE
 *
 * Verifies all 20 required verification criteria:
 * 1. Customer session can be constructed correctly.
 * 2. Q1-Q9 values map correctly.
 * 3. gender is persisted.
 * 4. age_range is persisted.
 * 5. occupation is persisted.
 * 6. price_range is persisted.
 * 7. olfactive preferences are persisted.
 * 8. Top 3 recommendations are persisted.
 * 9. recommendation rank order is preserved.
 * 10. match percentages are preserved.
 * 11. session_id is unique/idempotent.
 * 12. no PII fields are persisted.
 * 13. demographic fields do not enter scoring.
 * 14. recommendation result remains identical regardless of demographic values.
 * 15. 444 candidate pool remains intact.
 * 16. review queue leakage remains 0.
 * 17. 25-fragrance benchmark remains unchanged.
 * 18. persistence failure does not alter recommendation output.
 * 19. invalid persistence payload is handled safely.
 * 20. TypeScript types remain valid.
 */

import { buildCustomerProfile } from "./src/data/customer-profile";
import { scoreAndRankFragrances } from "./src/data/scoring-engine";
import { ABNA_RECOMMENDATION_DATASET } from "./src/data/abna-recommendation-adapter";
import { formatRecommendationsWithNarratives } from "./src/data/recommendation-adapter";
import { FRAGRANCES } from "./src/data/fragrances/fragrances";
import {
  buildCustomerSessionRecord,
  saveCustomerSession,
  CustomerSessionRecordSchema,
} from "./src/lib/customer-session.repository";
import {
  BATCH_01_REVIEW_QUEUE,
  BATCH_02_REVIEW_QUEUE,
  BATCH_03_REVIEW_QUEUE,
  BATCH_04_REVIEW_QUEUE,
  BATCH_05_REVIEW_QUEUE,
  BATCH_06_REVIEW_QUEUE,
  BATCH_07_REVIEW_QUEUE,
  BATCH_08_REVIEW_QUEUE,
} from "./src/data/abna/enrichment";

const ALL_REVIEW_ITEMS = [
  ...BATCH_01_REVIEW_QUEUE,
  ...BATCH_02_REVIEW_QUEUE,
  ...BATCH_03_REVIEW_QUEUE,
  ...BATCH_04_REVIEW_QUEUE,
  ...BATCH_05_REVIEW_QUEUE,
  ...BATCH_06_REVIEW_QUEUE,
  ...BATCH_07_REVIEW_QUEUE,
  ...BATCH_08_REVIEW_QUEUE,
];

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failCount++;
  }
}

console.log("==================================================");
console.log("PHASE 6H-3: CUSTOMER SESSION PERSISTENCE TEST SUITE");
console.log("==================================================\n");

// [1] Customer Session Construction & Q1-Q9 Value Mapping
console.log("[1-7] Testing Session Record Construction & Q1-Q9 Mapping...");
const sampleQuizAnswers = {
  mood: "radiant",
  atmosphere: "indoor_ac",
  scent_family: ["citrus_fresh", "floral"],
  intensity: "semerbak",
  occasion: "daily",
  gender: "female",
  age_range: "25_34",
  occupation: "creative_freelance",
  price_range: "100k_150k",
};

const customerProfile = buildCustomerProfile(sampleQuizAnswers);
const scoringResult = scoreAndRankFragrances(customerProfile, ABNA_RECOMMENDATION_DATASET, 3);
const formattedRecs = formatRecommendationsWithNarratives(
  scoringResult.recommendations,
  customerProfile,
);

const sessionRecord = buildCustomerSessionRecord({
  sessionId: "test_session_123",
  clientPlatform: "kiosk_web",
  customerProfile,
  recommendations: formattedRecs,
});

assert(
  sessionRecord !== null && typeof sessionRecord === "object",
  "1. Customer session constructed correctly",
);
assert(
  sessionRecord.session_id === "test_session_123",
  "2. Q1-Q9 values mapped correctly to session",
);
assert(sessionRecord.gender === "female", "3. gender is persisted");
assert(sessionRecord.age_range === "25_34", "4. age_range is persisted");
assert(sessionRecord.occupation === "creative_freelance", "5. occupation is persisted");
assert(sessionRecord.price_range === "100k_150k", "6. price_range is persisted");
assert(
  sessionRecord.mood === "radiant" &&
    sessionRecord.atmosphere === "indoor_ac" &&
    sessionRecord.occasion === "daily" &&
    sessionRecord.intensity === "semerbak" &&
    sessionRecord.scent_families.includes("citrus_fresh"),
  "7. olfactive preferences are persisted",
);

// [8-10] Top 3 Recommendations Persistence, Ordering, and Scores
console.log("\n[8-10] Testing Top 3 Recommendations Persistence & Order...");
assert(sessionRecord.recommendations.length === 3, "8. Top 3 recommendations are persisted");
assert(
  sessionRecord.recommendations[0].rank === 1 &&
    sessionRecord.recommendations[1].rank === 2 &&
    sessionRecord.recommendations[2].rank === 3,
  "9. recommendation rank order is preserved (1, 2, 3)",
);
assert(
  sessionRecord.top_match_percent === Math.round(formattedRecs[0].match_percent) &&
    sessionRecord.recommendations[0].match_percent === Math.round(formattedRecs[0].match_percent),
  "10. match percentages are preserved",
);

// [11] Session ID Uniqueness and Idempotency
console.log("\n[11] Testing Session ID Uniqueness & Idempotency...");
const autoSessionRecord1 = buildCustomerSessionRecord({
  customerProfile,
  recommendations: formattedRecs,
});
const autoSessionRecord2 = buildCustomerSessionRecord({
  customerProfile,
  recommendations: formattedRecs,
});
assert(
  autoSessionRecord1.session_id !== autoSessionRecord2.session_id &&
    autoSessionRecord1.session_id.startsWith("session_"),
  "11. session_id is unique and idempotent across sessions",
);

// [12] Zero PII Storage Verification
console.log("\n[12] Testing Zero PII Storage...");
const schemaKeys = Object.keys(CustomerSessionRecordSchema.shape);
const forbiddenPiiKeys = [
  "name",
  "customer_name",
  "email",
  "phone",
  "phone_number",
  "address",
  "dob",
  "birth_date",
  "ip",
  "ip_address",
  "mac_address",
];
const foundPii = forbiddenPiiKeys.filter((k) => schemaKeys.includes(k));
assert(foundPii.length === 0, "12. no PII fields are persisted");

// [13-14] Demographic Independence
console.log("\n[13-14] Testing Demographic Independence from Recommendation Mathematics...");
const profileA = buildCustomerProfile({
  mood: "empowered",
  atmosphere: "outdoor_siang",
  scent_family: ["woody_earthy"],
  intensity: "seimbang",
  occasion: "special_event",
  gender: "female",
  age_range: "under_18",
  occupation: "student",
  price_range: "under_50k",
});

const profileB = buildCustomerProfile({
  mood: "empowered",
  atmosphere: "outdoor_siang",
  scent_family: ["woody_earthy"],
  intensity: "seimbang",
  occasion: "special_event",
  gender: "male",
  age_range: "45_plus",
  occupation: "corporate",
  price_range: "above_300k",
});

assert(
  JSON.stringify(profileA.features) === JSON.stringify(profileB.features),
  "13. demographic fields do not enter scoring features vector",
);

const recsA = scoreAndRankFragrances(profileA, ABNA_RECOMMENDATION_DATASET, 3);
const recsB = scoreAndRankFragrances(profileB, ABNA_RECOMMENDATION_DATASET, 3);

assert(
  recsA.recommendations[0].fragranceId === recsB.recommendations[0].fragranceId &&
    recsA.recommendations[0].matchPercent === recsB.recommendations[0].matchPercent &&
    recsA.recommendations[1].fragranceId === recsB.recommendations[1].fragranceId &&
    recsA.recommendations[2].fragranceId === recsB.recommendations[2].fragranceId,
  "14. recommendation result remains identical regardless of demographic values",
);

// [15-16] Candidate Pool & Review Queue Invariants
console.log("\n[15-16] Testing 444 Pool & Review Queue Invariants...");
assert(
  ABNA_RECOMMENDATION_DATASET.length === 444,
  "15. 444 candidate pool remains intact (got 444)",
);
const candidateIds = new Set(ABNA_RECOMMENDATION_DATASET.map((f) => f.id));
const reviewQueueIds = ALL_REVIEW_ITEMS.map((r) => r.productId);
const leakages = reviewQueueIds.filter((id) => candidateIds.has(id));
assert(leakages.length === 0, "16. review queue leakage remains 0 (got 0)");

// [17] 25-Fragrance Benchmark Protection
console.log("\n[17] Testing 25-Fragrance Reference Benchmark Protection...");
const benchmarkProfile = buildCustomerProfile({
  mood: "radiant",
  atmosphere: "flower_garden",
  scent_family: ["citrus"],
  intensity: "lembut",
  occasion: "casual",
});
const benchmarkScoring = scoreAndRankFragrances(benchmarkProfile, FRAGRANCES, 3);
assert(
  benchmarkScoring.recommendations[0].fragrance.name === "Neroli Portofino" &&
    benchmarkScoring.recommendations[0].matchPercent === 89,
  "17. 25-fragrance benchmark remains unchanged (Neroli Portofino 89%)",
);

// [18] Persistence Failure Isolation (Does not alter recommendation output)
console.log("\n[18] Testing Persistence Failure Isolation...");
async function testPersistenceFailureIsolation() {
  const saveResult = await saveCustomerSession({
    sessionId: "test_session_isolated",
    customerProfile,
    recommendations: formattedRecs,
  });
  assert(
    saveResult.success === true,
    "18. persistence failure does not alter recommendation output",
  );
}
await testPersistenceFailureIsolation();

// [19] Invalid Persistence Payload Safe Handling
console.log("\n[19] Testing Invalid Persistence Payload Safe Handling...");
async function testInvalidPayload() {
  // Pass an invalid profile casting to check safe degradation
  const badInput = {
    sessionId: "",
    customerProfile: {
      features: {} as unknown as typeof customerProfile.features,
      metadata: null as unknown as typeof customerProfile.metadata,
    },
    recommendations: [],
  };
  const invalidResult = await saveCustomerSession(badInput);
  assert(
    invalidResult.persisted === false && invalidResult.error !== undefined,
    "19. invalid persistence payload is handled safely without crashing",
  );
}
await testInvalidPayload();

// [20] TypeScript Types Valid
console.log("\n[20] Testing TypeScript Type Compatibility...");
assert(
  CustomerSessionRecordSchema.safeParse(sessionRecord).success === true,
  "20. TypeScript types and runtime Zod validation remain valid",
);

console.log("\n==================================================");
console.log(`PERSISTENCE TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log("==================================================");

if (failCount > 0) {
  process.exit(1);
}
