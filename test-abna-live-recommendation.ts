/**
 * Phase 6F: Live ABNA Recommendation & Customer Flow Validation Test Suite
 *
 * Validates:
 * 1. Candidate pool integrity (exactly 444 validated products, zero duplicates, zero review queue leakage).
 * 2. 10D vector mathematical boundedness ([0.0, 1.0]) for all 444 candidates.
 * 3. 6 realistic customer archetypes end-to-end:
 *    - Scenario A: Fresh / Citrus / Daily
 *    - Scenario B: Sweet / Gourmand / Night
 *    - Scenario C: Woody / Outdoor / Masculine
 *    - Scenario D: Floral / Romantic
 *    - Scenario E: Aquatic / Clean / Daily
 *    - Scenario F: Warm / Amber / Luxury
 * 4. Deterministic repeatability (50 consecutive executions per scenario with 0 variance).
 * 5. Review queue isolation (0 out of 53 review/incomplete products in any recommendation output).
 * 6. AI narrative layer compatibility and factual grounding against recommended product data.
 * 7. Zod schema validation for all recommendation outputs.
 * 8. Protection of 25-fragrance reference benchmark baseline.
 */

import { ABNA_RECOMMENDATION_DATASET } from "./src/data/abna-recommendation-adapter";
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
import { buildCustomerProfile } from "./src/data/customer-profile";
import { scoreAndRankFragrances } from "./src/data/scoring-engine";
import { FRAGRANCES } from "./src/data/fragrances";
import { formatRecommendationsWithNarratives } from "./src/data/recommendation-adapter";
import { buildAllFallbackNarratives } from "./src/data/narrative-service";
import { z } from "zod";
import type { QuizAnswers } from "./src/data/recommendation-types";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedCount++;
  }
}

const RecommendationSchema = z.object({
  rank: z.number(),
  name: z.string(),
  house: z.string(),
  category: z.string(),
  match_percent: z.number(),
  description: z.string(),
  story: z.string(),
  top_notes: z.array(z.string()),
  middle_notes: z.array(z.string()),
  base_notes: z.array(z.string()),
  why_match: z.string(),
  projection: z.string(),
  longevity: z.string(),
  mood_tags: z.array(z.string()),
  occasions: z.array(z.string()),
  aura: z.string(),
});

console.log("==================================================");
console.log("PHASE 6F: LIVE ABNA RECOMMENDATION VALIDATION");
console.log("==================================================");

// ----------------------------------------------------
// 1. Candidate Pool Size, ID Uniqueness, & Bounds
// ----------------------------------------------------
console.log("\n[1] Testing Candidate Pool Invariants...");
{
  assert(
    ABNA_RECOMMENDATION_DATASET.length === 444,
    `Candidate pool size is exactly 444 (got ${ABNA_RECOMMENDATION_DATASET.length})`,
  );

  const idSet = new Set<string>();
  let duplicates = 0;
  for (const item of ABNA_RECOMMENDATION_DATASET) {
    if (idSet.has(item.id)) duplicates++;
    idSet.add(item.id);
  }
  assert(idSet.size === 444, "All 444 candidate IDs are unique");
  assert(duplicates === 0, "Zero duplicate product IDs in candidate dataset");

  const dims = [
    "freshness",
    "sweetness",
    "warmth",
    "floral",
    "woody",
    "citrus",
    "spicy",
    "aquatic",
    "gourmand",
    "intensity",
  ] as const;

  let allBounded = true;
  for (const p of ABNA_RECOMMENDATION_DATASET) {
    for (const d of dims) {
      const v = p.features[d];
      if (typeof v !== "number" || isNaN(v) || v < 0.0 || v > 1.0) {
        allBounded = false;
        console.error(`Invalid dimension ${d}=${v} in product ${p.id}`);
      }
    }
  }
  assert(allBounded, "All 444 candidates have 10D feature vectors strictly in [0.0, 1.0]");
}

// ----------------------------------------------------
// 2. Review Queue Isolation Invariant
// ----------------------------------------------------
console.log("\n[2] Testing Review Queue Isolation Invariant...");
{
  const allReviewItems = [
    ...BATCH_01_REVIEW_QUEUE,
    ...BATCH_02_REVIEW_QUEUE,
    ...BATCH_03_REVIEW_QUEUE,
    ...BATCH_04_REVIEW_QUEUE,
    ...BATCH_05_REVIEW_QUEUE,
    ...BATCH_06_REVIEW_QUEUE,
    ...BATCH_07_REVIEW_QUEUE,
    ...BATCH_08_REVIEW_QUEUE,
  ];

  assert(allReviewItems.length === 53, `Total review items is 53 (got ${allReviewItems.length})`);
  const candidateIdSet = new Set(ABNA_RECOMMENDATION_DATASET.map((p) => p.id));
  let leakedCount = 0;

  for (const item of allReviewItems) {
    if (candidateIdSet.has(item.productId)) {
      leakedCount++;
      console.error(`LEAKAGE DETECTED: Review item ${item.productId} present in candidate pool!`);
    }
  }

  assert(
    leakedCount === 0,
    `Zero review queue items leaked into recommendation dataset (0 / ${allReviewItems.length})`,
  );
}

// ----------------------------------------------------
// 3. Six Real-World Customer Archetype Scenarios
// ----------------------------------------------------
console.log("\n[3] Testing Six Real-World Customer Archetypes...");

interface ArchetypeScenario {
  name: string;
  answers: QuizAnswers;
  expectedFeatures: (topFeatures: import("./src/data/fragrances/types").Fragrance) => boolean;
}

const scenarios: ArchetypeScenario[] = [
  {
    name: "SCENARIO A — Fresh / Citrus / Daily",
    answers: {
      mood: "radiant",
      atmosphere: "clean_morning",
      scent_family: ["citrus"],
      intensity: 2,
      occasion: "daily",
    },
    expectedFeatures: (top) => top.features.citrus >= 0.4 || top.features.freshness >= 0.4,
  },
  {
    name: "SCENARIO B — Sweet / Gourmand / Night",
    answers: {
      mood: "mysterious",
      atmosphere: "candlelight",
      scent_family: ["gourmand"],
      intensity: 5,
      occasion: "night",
    },
    expectedFeatures: (top) => top.features.gourmand >= 0.4 || top.features.warmth >= 0.4,
  },
  {
    name: "SCENARIO C — Woody / Outdoor / Masculine",
    answers: {
      mood: "empowered",
      atmosphere: "shady_forest",
      scent_family: ["woody"],
      intensity: 4,
      occasion: "outdoor",
    },
    expectedFeatures: (top) => top.features.woody >= 0.4,
  },
  {
    name: "SCENARIO D — Floral / Romantic",
    answers: {
      mood: "serene",
      atmosphere: "flower_garden",
      scent_family: ["floral"],
      intensity: 2,
      occasion: "romance",
    },
    expectedFeatures: (top) => top.features.floral >= 0.4,
  },
  {
    name: "SCENARIO E — Aquatic / Clean / Daily",
    answers: {
      mood: "serene",
      atmosphere: "rainy_city",
      scent_family: ["aquatic"],
      intensity: 3,
      occasion: "daily",
    },
    expectedFeatures: (top) => top.features.aquatic >= 0.4 || top.features.freshness >= 0.4,
  },
  {
    name: "SCENARIO F — Warm / Amber / Luxury",
    answers: {
      mood: "mysterious",
      atmosphere: "candlelight",
      scent_family: ["amber_spicy"],
      intensity: 5,
      occasion: "night",
    },
    expectedFeatures: (top) => top.features.warmth >= 0.4 || top.features.spicy >= 0.4,
  },
];

for (const sc of scenarios) {
  console.log(`\n  ▶ ${sc.name}`);
  const profile = buildCustomerProfile(sc.answers);
  const result = scoreAndRankFragrances(profile, ABNA_RECOMMENDATION_DATASET, 3);

  assert(result.recommendations.length === 3, "Returns exactly 3 recommendations");

  const rec1 = result.recommendations[0];
  const rec2 = result.recommendations[1];
  const rec3 = result.recommendations[2];

  assert(
    rec1.fragranceId !== rec2.fragranceId &&
      rec2.fragranceId !== rec3.fragranceId &&
      rec1.fragranceId !== rec3.fragranceId,
    "All 3 recommendation IDs are distinct",
  );

  assert(
    rec1.score >= rec2.score && rec2.score >= rec3.score,
    `Scores are sorted descending: ${rec1.score} >= ${rec2.score} >= ${rec3.score}`,
  );

  assert(
    rec1.matchPercent >= 60 && rec1.matchPercent <= 98,
    `Match percentage is realistically calibrated (got ${rec1.matchPercent}%)`,
  );

  assert(
    sc.expectedFeatures(rec1.fragrance),
    `Top match [${rec1.fragrance.name} by ${rec1.fragrance.brand}] aligns with expected archetype profile`,
  );

  console.log(
    `    #1: ${rec1.fragrance.name} (${rec1.fragrance.brand}) — Score: ${rec1.score} (${rec1.matchPercent}%)`,
  );
  console.log(
    `    #2: ${rec2.fragrance.name} (${rec2.fragrance.brand}) — Score: ${rec2.score} (${rec2.matchPercent}%)`,
  );
  console.log(
    `    #3: ${rec3.fragrance.name} (${rec3.fragrance.brand}) — Score: ${rec3.score} (${rec3.matchPercent}%)`,
  );
}

// ----------------------------------------------------
// 4. Deterministic Repeatability across 50 Runs per Scenario
// ----------------------------------------------------
console.log("\n[4] Testing Determinism (50 Consecutive Runs per Scenario)...");
{
  let allScenariosDeterministic = true;

  for (const sc of scenarios) {
    const profile = buildCustomerProfile(sc.answers);
    const initialJson = JSON.stringify(
      scoreAndRankFragrances(profile, ABNA_RECOMMENDATION_DATASET, 3),
    );

    for (let i = 0; i < 50; i++) {
      const currentJson = JSON.stringify(
        scoreAndRankFragrances(profile, ABNA_RECOMMENDATION_DATASET, 3),
      );
      if (currentJson !== initialJson) {
        allScenariosDeterministic = false;
        console.error(`Determinism variance detected in ${sc.name} at iteration ${i}`);
        break;
      }
    }
  }

  assert(
    allScenariosDeterministic,
    "100% Deterministic repeatability: Zero variance across 6 scenarios × 50 runs (300 executions)",
  );
}

// ----------------------------------------------------
// 5. Narrative Layer Compatibility & Schema Validation
// ----------------------------------------------------
console.log("\n[5] Testing Narrative Layer & Zod Schema Validation...");
{
  let allSchemasValid = true;

  for (const sc of scenarios) {
    const profile = buildCustomerProfile(sc.answers);
    const scoringResult = scoreAndRankFragrances(profile, ABNA_RECOMMENDATION_DATASET, 3);
    const fallbacks = buildAllFallbackNarratives(scoringResult.recommendations, profile);
    const formatted = formatRecommendationsWithNarratives(
      scoringResult.recommendations,
      profile,
      fallbacks,
    );

    const parseRes = z.array(RecommendationSchema).safeParse(formatted);
    if (!parseRes.success) {
      allSchemasValid = false;
      console.error(`Schema validation failed for ${sc.name}:`, parseRes.error);
    }

    // Verify factual alignment
    for (let i = 0; i < 3; i++) {
      const src = scoringResult.recommendations[i].fragrance;
      const adapted = formatted[i];
      assert(
        adapted.name === src.name && adapted.house === src.brand,
        `Factual alignment preserved: ${adapted.name} (${adapted.house})`,
      );
    }
  }

  assert(
    allSchemasValid,
    "All 6 archetype recommendations successfully passed Zod RecommendationSchema validation",
  );
}

// ----------------------------------------------------
// 6. Benchmark Dataset Protection (FRAGRANCES)
// ----------------------------------------------------
console.log("\n[6] Testing 25-Fragrance Reference Benchmark Protection...");
{
  const profileA = buildCustomerProfile({
    mood: "radiant",
    atmosphere: "curtains",
    scent_family: ["citrus"],
    intensity: 3,
    occasion: "daily",
  });
  const resA = scoreAndRankFragrances(profileA, FRAGRANCES, 3);
  assert(
    resA.recommendations[0].fragrance.name === "Neroli Portofino" &&
      resA.recommendations[0].matchPercent === 89,
    "Benchmark Test A (Neroli Portofino 89%) remains identical",
  );

  const profileB = buildCustomerProfile({
    mood: "mysterious",
    atmosphere: "candlelight",
    scent_family: ["gourmand"],
    intensity: 5,
    occasion: "night",
  });
  const resB = scoreAndRankFragrances(profileB, FRAGRANCES, 3);
  assert(
    resB.recommendations[0].fragrance.name === "Grand Soir" &&
      resB.recommendations[0].matchPercent === 95,
    "Benchmark Test B (Grand Soir 95%) remains identical",
  );

  const profileC = buildCustomerProfile({
    mood: "empowered",
    atmosphere: "forest",
    scent_family: ["woody"],
    intensity: 3,
    occasion: "outdoor",
  });
  const resC = scoreAndRankFragrances(profileC, FRAGRANCES, 3);
  assert(
    resC.recommendations[0].fragrance.name === "Encre Noire" &&
      resC.recommendations[0].matchPercent === 92,
    "Benchmark Test C (Encre Noire 92%) remains identical",
  );

  const profileD = buildCustomerProfile({
    mood: "radiant",
    atmosphere: "candlelight",
    scent_family: ["floral"],
    intensity: 2,
    occasion: "romance",
  });
  const resD = scoreAndRankFragrances(profileD, FRAGRANCES, 3);
  assert(
    resD.recommendations[0].fragrance.name === "Lazy Sunday Morning" &&
      resD.recommendations[0].matchPercent === 92,
    "Benchmark Test D (Lazy Sunday Morning 92%) remains identical",
  );
}

console.log("\n==================================================");
console.log(`PHASE 6F TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
