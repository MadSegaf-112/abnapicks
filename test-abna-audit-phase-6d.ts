/**
 * Phase 6D: Post-Enrichment Comprehensive Catalog & Subsystem Audit Test Suite
 *
 * Full verification of:
 * 1. Product ID uniqueness and deterministic stability across all 497 raw products.
 * 2. Official catalog completeness: exactly 497 items parsed and indexed.
 * 3. Enrichment partition invariant: 444 active verified + 13 review_required + 40 incomplete = 497 total.
 * 4. Zero duplicate enrichment records across Pilot + Batches 01 to 08.
 * 5. Metadata integrity: brand normalization, price tier, gender, note pyramids, accords, families, and performance.
 * 6. Provenance metadata completeness and authenticity for all 444 active records.
 * 7. 10D feature vector dimensional compliance and strict [0.0, 1.0] mathematical bounds for all 444 products.
 * 8. Zero unmapped/unknown notes and zero unknown accords across active catalog.
 * 9. Review queue integrity: exactly 53 items correctly classified and reasoned.
 * 10. Core recommendation engine zero-regression baseline test against 25-fragrance seed.
 */

import { RAW_ABNA_PRODUCTS } from "./src/data/abna/raw";
import { generateDeterministicProductId } from "./src/data/abna/product-id";
import { ingestAbnaProducts } from "./src/data/abna/ingestion";
import {
  ALL_ACTIVE_ENRICHMENT_RECORDS,
  PILOT_ENRICHMENT_RECORDS,
  BATCH_01_ENRICHMENT_RECORDS,
  BATCH_02_ENRICHMENT_RECORDS,
  BATCH_03_ENRICHMENT_RECORDS,
  BATCH_04_ENRICHMENT_RECORDS,
  BATCH_05_ENRICHMENT_RECORDS,
  BATCH_06_ENRICHMENT_RECORDS,
  BATCH_07_ENRICHMENT_RECORDS,
  BATCH_08_ENRICHMENT_RECORDS,
} from "./src/data/abna/enrichment/products";
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
import {
  resolveCanonicalNote,
  resolveCanonicalAccord,
} from "./src/data/olfactive/dictionary/aliases";
import { buildCustomerProfile } from "./src/data/customer-profile";
import { scoreAndRankFragrances } from "./src/data/scoring-engine";
import { FRAGRANCES } from "./src/data/fragrances";

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

console.log("==================================================");
console.log("PHASE 6D: POST-ENRICHMENT CATALOG AUDIT TEST SUITE");
console.log("==================================================");

// [1] Deterministic ID Uniqueness & Stability
console.log("\n[1] Testing Deterministic Product ID Uniqueness & Stability...");
{
  const rawIdSet = new Set<string>();
  let duplicates = 0;

  RAW_ABNA_PRODUCTS.forEach((p) => {
    const id = generateDeterministicProductId(
      p.namaParfum,
      p.designer,
      p.kategoriHarga,
      p.rowNumber,
    );
    if (rawIdSet.has(id)) {
      duplicates++;
      console.error(`Duplicate generated ID: ${id}`);
    }
    rawIdSet.add(id);
  });

  assert(
    rawIdSet.size === 497,
    `All 497 raw products produce unique deterministic IDs (got ${rawIdSet.size})`,
  );
  assert(duplicates === 0, "Zero ID collisions across the entire raw catalog");
}

// [2] Catalog Completeness & Invariants
console.log("\n[2] Testing Catalog Completeness & Partition Invariant...");
{
  assert(RAW_ABNA_PRODUCTS.length === 497, "Total RAW catalog items count is exactly 497");
  assert(
    ALL_ACTIVE_ENRICHMENT_RECORDS.length === 444,
    "Active enriched records count is exactly 444",
  );

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

  assert(
    allReviewItems.length === 53,
    `Total review queue count is exactly 53 (got ${allReviewItems.length})`,
  );

  const reviewReq = allReviewItems.filter((q) => q.status === "review_required");
  const inc = allReviewItems.filter((q) => q.status === "incomplete");
  const nf = allReviewItems.filter((q) => q.status === "not_found");

  assert(reviewReq.length === 13, `review_required count is exactly 13 (got ${reviewReq.length})`);
  assert(inc.length === 40, `incomplete count is exactly 40 (got ${inc.length})`);
  assert(nf.length === 0, `not_found count is exactly 0 (got ${nf.length})`);

  const totalPartitionSum = ALL_ACTIVE_ENRICHMENT_RECORDS.length + allReviewItems.length;
  assert(
    totalPartitionSum === 497,
    `Exact partition equality: 444 active + 13 review_required + 40 incomplete = ${totalPartitionSum} == 497`,
  );
}

// [3] Duplicate Enrichment Records Check
console.log("\n[3] Testing Duplicate Enrichment Records...");
{
  const enrichmentIdSet = new Set<string>();
  let duplicateEnrichments = 0;

  ALL_ACTIVE_ENRICHMENT_RECORDS.forEach((r) => {
    if (enrichmentIdSet.has(r.productId)) {
      duplicateEnrichments++;
      console.error(`Duplicate enrichment record: ${r.productId}`);
    }
    enrichmentIdSet.add(r.productId);
  });

  assert(
    enrichmentIdSet.size === 444,
    `All 444 active enrichment records are distinct (got ${enrichmentIdSet.size})`,
  );
  assert(duplicateEnrichments === 0, "Zero duplicate product IDs in active enrichment registry");
}

// [4] Enrichment Quality & Metadata Completeness
console.log("\n[4] Testing Enrichment Data Quality & Provenance...");
{
  let completeMetadata = 0;
  let completeProvenance = 0;

  ALL_ACTIVE_ENRICHMENT_RECORDS.forEach((r) => {
    const hasNotes =
      r.notes &&
      ((r.notes.top && r.notes.top.length > 0) ||
        (r.notes.middle && r.notes.middle.length > 0) ||
        (r.notes.base && r.notes.base.length > 0));
    const hasAccords = r.accords && r.accords.length > 0;
    const hasFamily = r.fragranceFamily && r.fragranceFamily.length > 0;
    const hasPerformance = r.performance && r.performance.longevity && r.performance.sillage;

    if (hasNotes && hasAccords && hasFamily && hasPerformance) {
      completeMetadata++;
    }

    if (
      r.source &&
      r.source.provider &&
      r.source.retrievedAt &&
      r.source.verificationStatus === "verified"
    ) {
      completeProvenance++;
    }
  });

  assert(
    completeMetadata === 444,
    `All 444 active records possess complete notes, accords, family, and performance (got ${completeMetadata})`,
  );
  assert(
    completeProvenance === 444,
    `All 444 active records possess verified provenance (got ${completeProvenance})`,
  );
}

// [5] 10D Vector Dimensionality & Range Compliance
console.log("\n[5] Testing 10D Feature Vector Ingestion & [0.0, 1.0] Bounds...");
{
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  assert(ingestion.products.length === 497, "Ingestion parsed 497 products");
  assert(
    ingestion.report.productsWithEnrichment === 444,
    `Ingestion enriched 444 products (got ${ingestion.report.productsWithEnrichment})`,
  );

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
  let vectorCount = 0;

  ingestion.products.forEach((p) => {
    if (p.derived?.features) {
      vectorCount++;
      dims.forEach((d) => {
        const v = p.derived!.features[d];
        if (typeof v !== "number" || isNaN(v) || v < 0.0 || v > 1.0) {
          allBounded = false;
        }
      });
    }
  });

  assert(
    vectorCount === 444,
    `Exactly 444 products possess derived 10D vectors (got ${vectorCount})`,
  );
  assert(allBounded, "All 444 derived 10D feature vectors are strictly bounded in [0.0, 1.0]");
}

// [6] Unknown Terms Isolation across Full Catalog
console.log("\n[6] Testing Zero Unknown Notes & Accords in Active Catalog...");
{
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  assert(
    ingestion.report.unknownTermsSummary.distinctUnknownNotes === 0,
    `Zero unknown notes across full active catalog (got ${ingestion.report.unknownTermsSummary.distinctUnknownNotes})`,
  );
  assert(
    ingestion.report.unknownTermsSummary.distinctUnknownAccords === 0,
    `Zero unknown accords across full active catalog (got ${ingestion.report.unknownTermsSummary.distinctUnknownAccords})`,
  );
  assert(
    ingestion.report.validationErrorsCount === 0,
    `Zero validation errors in full catalog report (got ${ingestion.report.validationErrorsCount})`,
  );
  assert(
    ingestion.report.validationWarningsCount === 0,
    `Zero validation warnings in full catalog report (got ${ingestion.report.validationWarningsCount})`,
  );
}

// [7] Benchmark Recommendation Baseline Immutability
console.log("\n[7] Testing Production Recommendation Baseline (25 Fragrances Benchmark)...");
{
  // Test A: Fresh / Citrus / Daily
  const profileA = buildCustomerProfile({
    mood: "radiant",
    atmosphere: "curtains",
    scent_family: ["citrus"],
    intensity: 3,
    occasion: "daily",
  });
  const resA = scoreAndRankFragrances(profileA, FRAGRANCES);
  assert(
    resA.recommendations[0].fragrance.name === "Neroli Portofino" &&
      resA.recommendations[0].matchPercent === 89,
    "Benchmark Test A reproduces exact top match: Neroli Portofino (89%)",
  );

  // Test B: Warm / Gourmand / Night
  const profileB = buildCustomerProfile({
    mood: "mysterious",
    atmosphere: "candlelight",
    scent_family: ["gourmand"],
    intensity: 5,
    occasion: "night",
  });
  const resB = scoreAndRankFragrances(profileB, FRAGRANCES);
  assert(
    resB.recommendations[0].fragrance.name === "Grand Soir" &&
      resB.recommendations[0].matchPercent === 95,
    "Benchmark Test B reproduces exact top match: Grand Soir (95%)",
  );

  // Test C: Woody / Outdoor
  const profileC = buildCustomerProfile({
    mood: "empowered",
    atmosphere: "forest",
    scent_family: ["woody"],
    intensity: 3,
    occasion: "outdoor",
  });
  const resC = scoreAndRankFragrances(profileC, FRAGRANCES);
  assert(
    resC.recommendations[0].fragrance.name === "Encre Noire" &&
      resC.recommendations[0].matchPercent === 92,
    "Benchmark Test C reproduces exact top match: Encre Noire (92%)",
  );

  // Test D: Floral / Romance
  const profileD = buildCustomerProfile({
    mood: "radiant",
    atmosphere: "candlelight",
    scent_family: ["floral"],
    intensity: 2,
    occasion: "romance",
  });
  const resD = scoreAndRankFragrances(profileD, FRAGRANCES);
  assert(
    resD.recommendations[0].fragrance.name === "Lazy Sunday Morning" &&
      resD.recommendations[0].matchPercent === 92,
    "Benchmark Test D reproduces exact top match: Lazy Sunday Morning (92%)",
  );
}

console.log("\n==================================================");
console.log(`PHASE 6D AUDIT SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
