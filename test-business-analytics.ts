/**
 * Test Suite: DATA-04 Business Analytics & Customer Intelligence
 *
 * Verifies:
 * 1. Customer Segmentation (Age x Occupation, Dominants, Match Averages)
 * 2. Cross-Analysis (Age x Scent, Occupation x Budget, Mood x Scent, Occasion x Scent, Budget x Fragrance)
 * 3. Fragrance Performance Intelligence (rank1Count, rank2Count, rank3Count, rank1Percentage, min/max match)
 * 4. Segment-Level Fragrance Performance
 * 5. Recommendation Quality Analysis (Highest Performing, Most Frequent, Best Balanced, Scent/Budget Averages)
 * 6. Deterministic Business Insight Engine (Scent preference, Segment, Fragrance, Budget, Quality)
 * 7. Sample Size Awareness & Confidence Levels ("Limited" for N < 20)
 * 8. Null / Skip Demographics Graceful Handling
 * 9. Empty Database (0 records) Safety
 */

import { aggregateSessionsData } from "./src/lib/admin-analytics.service";

console.log("==================================================");
console.log("PHASE DATA-04: ADVANCED BUSINESS INTELLIGENCE TESTS");
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

// 1. Empty State Test
console.log("\n[1] Testing Empty Database Intelligence Output (0 Records)...");
const emptyRes = aggregateSessionsData([]);
assert(emptyRes.intelligence !== undefined, "Intelligence payload exists for empty dataset");
assert(emptyRes.intelligence?.snapshot.length === 7, "Snapshot contains 7 dimension slots");
assert(emptyRes.intelligence?.segments.length === 0, "Zero segments for empty database");
assert(
  emptyRes.intelligence?.crossAnalysis.ageByScent.length === 0,
  "Zero cross-analysis for empty database",
);
assert(emptyRes.intelligence?.insights.length === 0, "Zero insights for empty database");
assert(
  emptyRes.intelligence?.sampleSizeStatus.confidenceLevel === "Limited",
  "Empty state has Limited confidence",
);

// 2. Deterministic Intelligence Fixture
console.log("\n[2] Testing Multi-Session Customer Intelligence Aggregation...");

const now = new Date("2026-09-01T12:00:00.000Z");

const fixtureRecords = [
  // Customer A: 18-24 Student, Budget 100k-150k, Radiant, Citrus, Daily -> Symphony (90%)
  {
    session_id: "int_session_01",
    created_at: now.toISOString(),
    completed: true,
    client_platform: "kiosk_web",
    gender: "male",
    age_range: "18_24",
    occupation: "student",
    price_range: "100k_150k",
    mood: "radiant",
    atmosphere: "clean_morning",
    scent_families: ["citrus"],
    intensity: "seimbang",
    occasion: "daily",
    top_fragrance_id: "symphony",
    top_fragrance_name: "Symphony",
    top_fragrance_house: "Louis Vuitton",
    top_match_percent: 90,
    recommendations: [
      {
        id: "symphony",
        name: "Symphony",
        house: "Louis Vuitton",
        category: "Citrus",
        match_percent: 90,
        rank: 1,
      },
      {
        id: "sabaya",
        name: "Sabaya",
        house: "Al Rehab",
        category: "Floral",
        match_percent: 88,
        rank: 2,
      },
      {
        id: "petit-matin",
        name: "Petit Matin",
        house: "MFK",
        category: "Citrus Aromatic",
        match_percent: 88,
        rank: 3,
      },
    ],
  },
  // Customer B: 25-34 Corporate, Budget 150k-200k, Serene, Floral, Romance -> Delina (94%)
  {
    session_id: "int_session_02",
    created_at: now.toISOString(),
    completed: true,
    client_platform: "kiosk_web",
    gender: "female",
    age_range: "25_34",
    occupation: "corporate",
    price_range: "150k_200k",
    mood: "serene",
    atmosphere: "flower_garden",
    scent_families: ["floral"],
    intensity: "semerbak",
    occasion: "romance",
    top_fragrance_id: "delina",
    top_fragrance_name: "Delina",
    top_fragrance_house: "Parfums de Marly",
    top_match_percent: 94,
    recommendations: [
      {
        id: "delina",
        name: "Delina",
        house: "Parfums de Marly",
        category: "Floral",
        match_percent: 94,
        rank: 1,
      },
      {
        id: "symphony",
        name: "Symphony",
        house: "Louis Vuitton",
        category: "Citrus",
        match_percent: 88,
        rank: 2,
      },
      {
        id: "grand-soir",
        name: "Grand Soir",
        house: "MFK",
        category: "Amber",
        match_percent: 86,
        rank: 3,
      },
    ],
  },
  // Customer C: 18-24 Student, Budget 100k-150k, Radiant, Citrus + Woody, Daily -> Symphony (92%)
  {
    session_id: "int_session_03",
    created_at: now.toISOString(),
    completed: true,
    client_platform: "kiosk_web",
    gender: "male",
    age_range: "18_24",
    occupation: "student",
    price_range: "100k_150k",
    mood: "radiant",
    atmosphere: "clean_morning",
    scent_families: ["citrus", "woody"],
    intensity: "seimbang",
    occasion: "daily",
    top_fragrance_id: "symphony",
    top_fragrance_name: "Symphony",
    top_fragrance_house: "Louis Vuitton",
    top_match_percent: 92,
    recommendations: [
      {
        id: "symphony",
        name: "Symphony",
        house: "Louis Vuitton",
        category: "Citrus",
        match_percent: 92,
        rank: 1,
      },
      {
        id: "aventus",
        name: "Aventus",
        house: "Creed",
        category: "Woody",
        match_percent: 89,
        rank: 2,
      },
    ],
  },
  // Customer D: Null demographics probe
  {
    session_id: "int_session_04",
    created_at: now.toISOString(),
    completed: true,
    client_platform: "kiosk_web",
    gender: null,
    age_range: null,
    occupation: null,
    price_range: null,
    mood: null,
    atmosphere: null,
    scent_families: ["woody"],
    intensity: null,
    occasion: null,
    top_fragrance_id: "aventus",
    top_fragrance_name: "Aventus",
    top_fragrance_house: "Creed",
    top_match_percent: 86,
    recommendations: [
      {
        id: "aventus",
        name: "Aventus",
        house: "Creed",
        category: "Woody",
        match_percent: 86,
        rank: 1,
      },
    ],
  },
];

const res = aggregateSessionsData(fixtureRecords, now);

// 3. Customer Snapshot Testing
console.log("\n[3] Testing Customer Persona Snapshot...");
const ageSnap = res.intelligence?.snapshot.find((s) => s.dimension === "age");
assert(ageSnap?.value === "18–24 tahun", `Dominant age is 18–24 tahun (got ${ageSnap?.value})`);
assert(ageSnap?.count === 2, `18–24 count is 2 (got ${ageSnap?.count})`);

const occSnap = res.intelligence?.snapshot.find((s) => s.dimension === "occupation");
assert(
  occSnap?.value === "Pelajar / Mahasiswa",
  `Dominant occupation is Student (got ${occSnap?.value})`,
);

// 4. Practical Segmentation Testing
console.log("\n[4] Testing Practical Customer Segmentation (Age x Occupation)...");
assert(
  res.intelligence !== undefined && res.intelligence.segments.length >= 2,
  "At least 2 segments identified",
);
const studentSeg = res.intelligence?.segments.find((s) => s.segmentKey === "18_24__student");
assert(studentSeg !== undefined, "18_24__student segment created");
assert(studentSeg?.count === 2, `Student segment count is 2 (got ${studentSeg?.count})`);
assert(
  studentSeg?.percentage === 50,
  `Student segment percentage is 50% of 4 sessions (got ${studentSeg?.percentage}%)`,
);
assert(
  studentSeg?.topFragrance === "Symphony",
  `Top fragrance for student segment is Symphony (got ${studentSeg?.topFragrance})`,
);
assert(
  studentSeg?.averageMatchScore === 91,
  `Student average match score is 91% (got ${studentSeg?.averageMatchScore}%)`,
);

// 5. Cross-Analysis Engine Testing
console.log("\n[5] Testing Cross-Analysis Matrices...");
// Age x Scent Family (18_24: citrus count = 2, woody count = 1)
const age1824Cross = res.intelligence?.crossAnalysis.ageByScent.find(
  (c) => c.primaryKey === "18_24",
);
assert(age1824Cross !== undefined, "Age 18_24 cross analysis row exists");
const citrusIn1824 = age1824Cross?.distribution.find((d) => d.key === "citrus");
assert(citrusIn1824?.count === 2, `Citrus in 18-24 count is 2 (got ${citrusIn1824?.count})`);

// Occupation x Budget (student: 100k_150k count = 2)
const studentBudgetCross = res.intelligence?.crossAnalysis.occupationByBudget.find(
  (c) => c.primaryKey === "student",
);
assert(studentBudgetCross !== undefined, "Student budget cross analysis row exists");
const b100k = studentBudgetCross?.distribution.find((d) => d.key === "100k_150k");
assert(b100k?.count === 2, `100k_150k budget in student count is 2 (got ${b100k?.count})`);

// Mood x Scent (radiant: citrus count = 2, woody count = 1)
const radiantCross = res.intelligence?.crossAnalysis.moodByScent.find(
  (c) => c.primaryKey === "radiant",
);
assert(radiantCross !== undefined, "Radiant mood cross analysis exists");

// Occasion x Scent (daily: citrus count = 2, woody count = 1)
const dailyCross = res.intelligence?.crossAnalysis.occasionByScent.find(
  (c) => c.primaryKey === "daily",
);
assert(dailyCross !== undefined, "Daily occasion cross analysis exists");

// 6. Fragrance Performance Intelligence
console.log("\n[6] Testing Fragrance Performance & Rank Distribution Intelligence...");
const symphFrag = res.topFragrances.find((f) => f.name === "Symphony");
assert(symphFrag !== undefined, "Symphony in top fragrance list");
assert(
  symphFrag?.recommendationCount === 3,
  `Symphony recommended 3 times (got ${symphFrag?.recommendationCount})`,
);
assert(symphFrag?.rank1Count === 2, `Symphony rank 1 count is 2 (got ${symphFrag?.rank1Count})`);
assert(symphFrag?.rank2Count === 1, `Symphony rank 2 count is 1 (got ${symphFrag?.rank2Count})`);
assert(
  symphFrag?.rank1Percentage === 66.7,
  `Symphony rank 1 pct is 66.7% (got ${symphFrag?.rank1Percentage}%)`,
);
assert(
  symphFrag?.minMatchPercent === 88,
  `Symphony min match is 88% (got ${symphFrag?.minMatchPercent}%)`,
);
assert(
  symphFrag?.maxMatchPercent === 92,
  `Symphony max match is 92% (got ${symphFrag?.maxMatchPercent}%)`,
);

// 7. Recommendation Quality Analysis
console.log("\n[7] Testing Recommendation Quality Metrics...");
const qual = res.intelligence?.recommendationQuality;
assert(
  qual?.overallAverageMatch === 90.5,
  `Overall average match score is 90.5% (got ${qual?.overallAverageMatch}%)`,
);
assert(
  qual?.highestPerformingFragrance?.name === "Delina",
  `Highest match fragrance is Delina (got ${qual?.highestPerformingFragrance?.name})`,
);
assert(
  qual?.mostFrequentFragrance?.name === "Symphony",
  `Most frequent fragrance is Symphony (got ${qual?.mostFrequentFragrance?.name})`,
);
assert(
  qual?.bestBalancedFragrance?.name === "Symphony",
  `Best balanced performer is Symphony (got ${qual?.bestBalancedFragrance?.name})`,
);

// 8. Deterministic Business Insight Engine
console.log("\n[8] Testing Deterministic Business Insight Rules...");
const insights = res.intelligence?.insights || [];
assert(
  insights.length >= 3,
  `At least 3 deterministic insights generated (got ${insights.length})`,
);
const scentInsight = insights.find((i) => i.type === "scent_preference");
assert(
  scentInsight !== undefined && scentInsight.title.includes("Citrus"),
  "Citrus dominance insight generated",
);
const segInsight = insights.find((i) => i.type === "customer_segment");
assert(segInsight !== undefined, "Customer segment insight generated");

// 9. Sample Size Status & Confidence Level
console.log("\n[9] Testing Sample Size Status (N=4 Development Scale)...");
assert(res.intelligence?.sampleSizeStatus.totalSessions === 4, "Total sessions in status is 4");
assert(
  res.intelligence?.sampleSizeStatus.confidenceLevel === "Limited",
  "Confidence level is correctly labeled 'Limited'",
);
assert(
  res.intelligence?.sampleSizeStatus.disclaimer.includes("N=4"),
  "Disclaimer includes exact sample size N=4",
);

console.log("\n==================================================");
console.log(`DATA-04 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
}
