/**
 * Phase 6H-2 — Demographic & Marketing Independence Non-Regression Test Suite
 *
 * Verifies with mathematical precision that customer personal / demographic / marketing fields
 * (gender, age_range, occupation, price_range) have ZERO influence on the recommendation engine,
 * ranking, scores, match percentages, or candidate pool invariants.
 */

import { buildCustomerProfile } from "./src/data/customer-profile";
import { scoreAndRankFragrances } from "./src/data/scoring-engine";
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
import { FRAGRANCES } from "./src/data/fragrances/fragrances";
import { QUIZ } from "./src/data/quiz";
import type { QuizAnswers } from "./src/data/recommendation-types";

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

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, description: string) {
  if (condition) {
    console.log(`  [PASS] ${description}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${description}`);
    failedCount++;
  }
}

console.log("==================================================");
console.log("PHASE 6H-2: DEMOGRAPHIC INDEPENDENCE TEST SUITE");
console.log("==================================================\n");

// 1. Test Quiz Structure (Exactly 9 Questions)
console.log("[1] Testing Quiz Question Count & Ordering...");
assert(QUIZ.length === 9, `Quiz contains exactly 9 questions (got ${QUIZ.length})`);
assert(QUIZ[0].id === "mood", "Q1 is mood (Recommendation)");
assert(QUIZ[1].id === "scent_family", "Q2 is scent_family (Recommendation)");
assert(QUIZ[2].id === "atmosphere", "Q3 is atmosphere (Recommendation)");
assert(QUIZ[3].id === "occasion", "Q4 is occasion (Recommendation)");
assert(QUIZ[4].id === "intensity", "Q5 is intensity (Recommendation)");
assert(QUIZ[5].id === "gender", "Q6 is gender (Analytics Only)");
assert(QUIZ[6].id === "age_range", "Q7 is age_range (Analytics Only)");
assert(QUIZ[7].id === "occupation", "Q8 is occupation (Analytics Only)");
assert(QUIZ[8].id === "price_range", "Q9 is price_range (Analytics Only)");

// 2. Base Olfactive Profiles for Testing
const olfactiveBase1: QuizAnswers = {
  mood: "radiant",
  scent_family: ["citrus"],
  atmosphere: "clean_morning",
  occasion: "daily",
  intensity: "seimbang",
};

const olfactiveBase2: QuizAnswers = {
  mood: "mysterious",
  scent_family: ["gourmand", "oriental"],
  atmosphere: "warm_night",
  occasion: "night",
  intensity: "semerbak",
};

const olfactiveBase3: QuizAnswers = {
  mood: "empowered",
  scent_family: ["woody"],
  atmosphere: "shady_forest",
  occasion: "outdoor",
  intensity: "semerbak",
};

// Helper to run recommendation and extract signature comparison payload
function runRec(answers: QuizAnswers) {
  const profile = buildCustomerProfile(answers);
  const result = scoreAndRankFragrances(profile, ABNA_RECOMMENDATION_DATASET, 3);
  return {
    featureVector: profile.features,
    recommendations: result.recommendations.map((r) => ({
      rank: r.rank,
      id: r.fragranceId,
      name: r.fragrance.name,
      score: r.score,
      matchPercent: r.matchPercent,
    })),
  };
}

// 3. Gender Independence Test
console.log("\n[2] Testing Gender Independence (Female vs Male vs Unisex vs Skip vs Undefined)...");
const baseRes1 = runRec(olfactiveBase1);
const femaleRes1 = runRec({ ...olfactiveBase1, gender: "female" });
const maleRes1 = runRec({ ...olfactiveBase1, gender: "male" });
const unisexRes1 = runRec({ ...olfactiveBase1, gender: "unisex" });
const skipRes1 = runRec({ ...olfactiveBase1, gender: "skip" });

assert(
  JSON.stringify(femaleRes1.recommendations) === JSON.stringify(baseRes1.recommendations),
  "Gender 'female' yields 100% identical recommendations to undefined",
);
assert(
  JSON.stringify(maleRes1.recommendations) === JSON.stringify(baseRes1.recommendations),
  "Gender 'male' yields 100% identical recommendations to undefined",
);
assert(
  JSON.stringify(unisexRes1.recommendations) === JSON.stringify(baseRes1.recommendations),
  "Gender 'unisex' yields 100% identical recommendations to undefined",
);
assert(
  JSON.stringify(skipRes1.recommendations) === JSON.stringify(baseRes1.recommendations),
  "Gender 'skip' yields 100% identical recommendations to undefined",
);
assert(
  JSON.stringify(femaleRes1.featureVector) === JSON.stringify(maleRes1.featureVector),
  "10D olfactive feature vector is byte-for-byte identical across gender values",
);

// 4. Age Range Independence Test
console.log(
  "\n[3] Testing Age Range Independence (under_18 vs 18_24 vs 25_34 vs 35_44 vs 45_plus vs skip)...",
);
const under18Res = runRec({ ...olfactiveBase1, age_range: "under_18" });
const age1824Res = runRec({ ...olfactiveBase1, age_range: "18_24" });
const age2534Res = runRec({ ...olfactiveBase1, age_range: "25_34" });
const age3544Res = runRec({ ...olfactiveBase1, age_range: "35_44" });
const age45PlusRes = runRec({ ...olfactiveBase1, age_range: "45_plus" });
const ageSkipRes = runRec({ ...olfactiveBase1, age_range: "skip" });

assert(
  JSON.stringify(under18Res.recommendations) === JSON.stringify(age45PlusRes.recommendations),
  "Age under_18 vs 45_plus yields 100% identical recommendations",
);
assert(
  JSON.stringify(age1824Res.recommendations) === JSON.stringify(age3544Res.recommendations),
  "Age 18_24 vs 35_44 yields 100% identical recommendations",
);
assert(
  JSON.stringify(age2534Res.recommendations) === JSON.stringify(ageSkipRes.recommendations),
  "Age 25_34 vs skip yields 100% identical recommendations",
);

// 5. Occupation Independence Test
console.log("\n[4] Testing Occupation Independence across all 9 occupation options...");
const occupations = [
  "student",
  "corporate",
  "government",
  "entrepreneur",
  "creative_freelance",
  "health_educator",
  "homemaker",
  "other",
  "skip",
];

let allOccupationsIdentical = true;
for (const occ of occupations) {
  const occRes = runRec({ ...olfactiveBase2, occupation: occ });
  if (
    JSON.stringify(occRes.recommendations) !==
    JSON.stringify(runRec(olfactiveBase2).recommendations)
  ) {
    allOccupationsIdentical = false;
    break;
  }
}
assert(
  allOccupationsIdentical,
  "All 9 occupation options produce 100% identical recommendation results",
);

// 6. Price Range Independence Test
console.log("\n[5] Testing Price Range Independence across all 8 price/budget options...");
const priceRanges = [
  "under_50k",
  "50k_100k",
  "100k_150k",
  "150k_200k",
  "200k_300k",
  "above_300k",
  "depends_on_scent",
  "skip",
];

let allPricesIdentical = true;
for (const pr of priceRanges) {
  const priceRes = runRec({ ...olfactiveBase3, price_range: pr });
  if (
    JSON.stringify(priceRes.recommendations) !==
    JSON.stringify(runRec(olfactiveBase3).recommendations)
  ) {
    allPricesIdentical = false;
    break;
  }
}
assert(
  allPricesIdentical,
  "All 8 price/budget options produce 100% identical recommendation results",
);

// 7. Extreme Polar Demographic Profiles (Combined Independence Test)
console.log(
  "\n[6] Testing Extreme Polar Demographic Combinations with Identical Olfactive Baseline...",
);
const profileAlpha: QuizAnswers = {
  ...olfactiveBase2,
  gender: "female",
  age_range: "under_18",
  occupation: "student",
  price_range: "under_50k",
};

const profileBeta: QuizAnswers = {
  ...olfactiveBase2,
  gender: "male",
  age_range: "45_plus",
  occupation: "corporate",
  price_range: "above_300k",
};

const profileGamma: QuizAnswers = {
  ...olfactiveBase2,
  gender: "unisex",
  age_range: "25_34",
  occupation: "creative_freelance",
  price_range: "depends_on_scent",
};

const resAlpha = runRec(profileAlpha);
const resBeta = runRec(profileBeta);
const resGamma = runRec(profileGamma);

assert(
  JSON.stringify(resAlpha.recommendations) === JSON.stringify(resBeta.recommendations),
  "Profile Alpha (Female Teen Student Budget) === Profile Beta (Male Senior Executive Luxury)",
);
assert(
  JSON.stringify(resAlpha.recommendations) === JSON.stringify(resGamma.recommendations),
  "Profile Alpha === Profile Gamma (Unisex Millennial Creative Flexible)",
);
assert(
  resAlpha.recommendations.length === 3,
  `Recommendations returned 3 items strictly based on olfactive profile (Top: ${resAlpha.recommendations[0].name})`,
);

// 8. Core Invariants Verification
console.log("\n[7] Testing Core Dataset Invariants...");
assert(
  ABNA_RECOMMENDATION_DATASET.length === 444,
  `Candidate pool is strictly 444 active products (got ${ABNA_RECOMMENDATION_DATASET.length})`,
);
assert(
  ALL_REVIEW_ITEMS.length === 53,
  `Review queue is strictly 53 items (got ${ALL_REVIEW_ITEMS.length})`,
);

// Verify zero leakage from review queue
const candidateIds = new Set(ABNA_RECOMMENDATION_DATASET.map((c) => c.id));
let reviewLeaks = 0;
for (const item of ALL_REVIEW_ITEMS) {
  if (candidateIds.has(item.productId)) {
    reviewLeaks++;
  }
}
assert(reviewLeaks === 0, `Zero review queue leakage into candidate pool (leaks: ${reviewLeaks})`);

// 9. Benchmark Protection Verification
console.log("\n[8] Testing 25-Fragrance Reference Benchmark Protection...");
const benchProfileA = buildCustomerProfile({
  mood: "radiant",
  scent_family: ["citrus"],
  atmosphere: "curtains",
  occasion: "daily",
  intensity: 3,
  gender: "female",
  age_range: "18_24",
  occupation: "student",
  price_range: "under_50k",
});
const benchResA = scoreAndRankFragrances(benchProfileA, FRAGRANCES, 3);
assert(
  benchResA.recommendations[0].fragrance.name === "Neroli Portofino",
  "Benchmark Test A top match is Neroli Portofino",
);
assert(benchResA.recommendations[0].matchPercent === 89, "Benchmark Test A match percent is 89%");

const benchProfileB = buildCustomerProfile({
  mood: "mysterious",
  scent_family: ["gourmand"],
  atmosphere: "candlelight",
  occasion: "night",
  intensity: 5,
  gender: "male",
  age_range: "45_plus",
  occupation: "corporate",
  price_range: "above_300k",
});
const benchResB = scoreAndRankFragrances(benchProfileB, FRAGRANCES, 3);
assert(
  benchResB.recommendations[0].fragrance.name === "Grand Soir",
  "Benchmark Test B top match is Grand Soir",
);
assert(benchResB.recommendations[0].matchPercent === 95, "Benchmark Test B match percent is 95%");

console.log("\n==================================================");
console.log(`DEMOGRAPHIC INDEPENDENCE SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
