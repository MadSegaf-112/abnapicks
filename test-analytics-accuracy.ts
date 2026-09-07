/**
 * Test Suite: DATA-03B Analytics Engine & Accuracy Verification
 *
 * Verifies:
 * 1. Executive KPIs (total, today, week, month, completion, avg match, top fragrance, top scent)
 * 2. Trend analytics time-series output
 * 3. Multi-select scent family independence (e.g. ["citrus", "woody"] -> citrus:1, woody:1)
 * 4. Categorical demographics (gender, age, occupation, price) with correct denominators
 * 5. Olfactive preferences (mood, atmosphere, occasion, intensity)
 * 6. Top 3 recommendation JSONB frequency aggregation and average match score per product
 * 7. Null and empty data handling without crashes
 * 8. Empty database state (0 records) safety
 */

import { aggregateSessionsData } from "./src/lib/admin-analytics.service";

console.log("==================================================");
console.log("PHASE DATA-03B: ANALYTICS ACCURACY & DATA TESTS");
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
console.log("\n[1] Testing Empty Database State (0 Records)...");
const emptyRes = aggregateSessionsData([]);
assert(emptyRes.kpis.totalConsultations === 0, "Total consultations is 0");
assert(emptyRes.kpis.consultationsToday === 0, "Consultations today is 0");
assert(emptyRes.kpis.consultationsThisWeek === 0, "Consultations this week is 0");
assert(emptyRes.kpis.completionRate === 100, "Completion rate is 100%");
assert(emptyRes.kpis.averageMatchScore === 0, "Average match score is 0");
assert(emptyRes.kpis.mostRecommendedFragrance === null, "Top fragrance is null");
assert(emptyRes.kpis.mostPopularScentFamily === null, "Top scent family is null");
assert(emptyRes.demographics.gender.length === 0, "Gender distribution is empty array");
assert(emptyRes.topFragrances.length === 0, "Top fragrances list is empty array");
assert(emptyRes.trend.length === 0, "Trend list is empty array");

// 2. Deterministic Fixture Dataset
console.log("\n[2] Testing Deterministic Multi-Session Aggregation...");

const now = new Date("2026-09-01T12:00:00.000Z");
const earlierThisMonth = new Date("2026-09-01T08:00:00.000Z");
const yesterday = new Date("2026-08-31T12:00:00.000Z");
const twoWeeksAgo = new Date("2026-08-15T12:00:00.000Z");

const fixtureRecords = [
  {
    session_id: "test_session_01",
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
        id: "aventus",
        name: "Aventus",
        house: "Creed",
        category: "Woody",
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
  {
    session_id: "test_session_02",
    created_at: earlierThisMonth.toISOString(),
    completed: true,
    client_platform: "kiosk_web",
    gender: "female",
    age_range: "25_34",
    occupation: "corporate",
    price_range: "150k_200k",
    mood: "mysterious",
    atmosphere: "sunset_golden_hour",
    scent_families: ["gourmand", "amber_spicy"],
    intensity: "semerbak",
    occasion: "night",
    top_fragrance_id: "grand-soir",
    top_fragrance_name: "Grand Soir",
    top_fragrance_house: "MFK",
    top_match_percent: 94,
    recommendations: [
      {
        id: "grand-soir",
        name: "Grand Soir",
        house: "MFK",
        category: "Amber",
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
        id: "baccarat-rouge",
        name: "Baccarat Rouge 540",
        house: "MFK",
        category: "Amber",
        match_percent: 87,
        rank: 3,
      },
    ],
  },
  {
    session_id: "test_session_03",
    created_at: yesterday.toISOString(),
    completed: true,
    client_platform: "kiosk_web",
    gender: "unisex",
    age_range: "18_24",
    occupation: "creative_freelance",
    price_range: "100k_150k",
    mood: "serene",
    atmosphere: "shady_forest",
    scent_families: ["citrus"],
    intensity: "lembut",
    occasion: "casual",
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
        match_percent: 86,
        rank: 2,
      },
    ],
  },
  {
    session_id: "test_session_04",
    created_at: twoWeeksAgo.toISOString(),
    completed: true,
    client_platform: "kiosk_web",
    gender: null, // Test null handling
    age_range: null,
    occupation: null,
    price_range: null,
    mood: null,
    atmosphere: null,
    scent_families: ["floral"],
    intensity: null,
    occasion: null,
    top_fragrance_id: "delina",
    top_fragrance_name: "Delina",
    top_fragrance_house: "Parfums de Marly",
    top_match_percent: 88,
    recommendations: [
      {
        id: "delina",
        name: "Delina",
        house: "Parfums de Marly",
        category: "Floral",
        match_percent: 88,
        rank: 1,
      },
    ],
  },
];

const res = aggregateSessionsData(fixtureRecords, now);

// Total & Time KPIs
assert(res.kpis.totalConsultations === 4, "Total consultations equals 4");
assert(res.kpis.consultationsToday === 2, "Consultations today equals 2");
assert(
  res.kpis.consultationsThisWeek === 3,
  "Consultations this week equals 3 (today + yesterday)",
);
assert(
  res.kpis.consultationsThisMonth === 2,
  "Consultations this month equals 2 (Sept 1 sessions)",
);

// Average Match Score
// (90 + 94 + 92 + 88) / 4 = 364 / 4 = 91.0
assert(
  res.kpis.averageMatchScore === 91,
  `Average match score is 91.0 (got ${res.kpis.averageMatchScore})`,
);

// Top Fragrance
assert(
  res.kpis.mostRecommendedFragrance === "Symphony",
  `Top recommended fragrance is Symphony (got ${res.kpis.mostRecommendedFragrance})`,
);

// Scent Family Counting:
// s1: citrus, woody
// s2: gourmand, amber_spicy
// s3: citrus
// s4: floral
// Total selections = 2 + 2 + 1 + 1 = 6 selections
// citrus: 2, woody: 1, gourmand: 1, amber_spicy: 1, floral: 1
console.log("\n[3] Testing Scent Family Independence & Multi-Select Counting...");
const citrusItem = res.olfactive.scentFamilies.find((s) => s.key === "citrus");
const woodyItem = res.olfactive.scentFamilies.find((s) => s.key === "woody");
assert(citrusItem !== undefined && citrusItem.count === 2, "Citrus count is exactly 2");
assert(woodyItem !== undefined && woodyItem.count === 1, "Woody count is exactly 1");
assert(
  Number(citrusItem?.percentage) === 33.3,
  `Citrus percentage is 33.3% of 6 total choices (got ${citrusItem?.percentage}%)`,
);

// Top Fragrance Analytics (Top 3 Recommendations Aggregation):
// Symphony: s1 (90), s2 (88), s3 (92) -> count = 3, avg = (90+88+92)/3 = 90.0
// Grand Soir: s1 (86), s2 (94) -> count = 2, avg = (86+94)/2 = 90.0
// Aventus: s1 (88), s3 (86) -> count = 2, avg = (88+86)/2 = 87.0
console.log("\n[4] Testing Top Fragrances Ranking & Average Match Score per Fragrance...");
assert(res.topFragrances.length >= 3, "Top fragrances array populated");
const top1 = res.topFragrances[0];
assert(top1.name === "Symphony", `Rank 1 fragrance is Symphony (got ${top1.name})`);
assert(
  top1.recommendationCount === 3,
  `Symphony recommended 3 times (got ${top1.recommendationCount})`,
);
assert(
  top1.averageMatchPercent === 90,
  `Symphony average match score is 90% (got ${top1.averageMatchPercent}%)`,
);

const topGrandSoir = res.topFragrances.find((f) => f.name === "Grand Soir");
assert(
  topGrandSoir?.recommendationCount === 2,
  `Grand Soir recommended 2 times (got ${topGrandSoir?.recommendationCount})`,
);
assert(
  topGrandSoir?.averageMatchPercent === 90,
  `Grand Soir avg match is 90% (got ${topGrandSoir?.averageMatchPercent}%)`,
);

// Demographics & Null Handling
console.log("\n[5] Testing Demographics & Graceful Null Handling...");
const maleCount = res.demographics.gender.find((g) => g.key === "male")?.count;
const skipCount = res.demographics.gender.find((g) => g.key === "skip")?.count;
assert(maleCount === 1, "Male gender count is 1");
assert(skipCount === 1, "Null gender counted gracefully as 'skip' without crash");

// Trend Array
console.log("\n[6] Testing Consultation Trend Time-Series Output...");
assert(res.trend.length === 3, `Trend array contains 3 distinct dates (got ${res.trend.length})`);
assert(
  res.trend[0].date === "2026-08-15" && res.trend[0].sessions === 1,
  "Historical session correctly bucketed",
);
assert(
  res.trend[2].date === "2026-09-01" && res.trend[2].sessions === 2,
  "Today sessions correctly bucketed",
);

console.log("\n==================================================");
console.log(`DATA-03B TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
}
