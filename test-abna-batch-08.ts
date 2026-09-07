/**
 * Phase 6C-3I: ABNA Batch 08 Olfactive Enrichment Test Suite (Final Batch)
 *
 * Validates:
 * 1. Exact product identity matching and deterministic ID generation for Batch 08 (Rows 458 to 499, 42 products).
 * 2. Brand & commercial metadata normalization.
 * 3. Note and accord resolution against controlled olfactive dictionary.
 * 4. Zero unknown olfactive terms across enriched records.
 * 5. Complete mandatory provenance tracking with verified source URLs and high confidence.
 * 6. 10D feature vector derivation and mathematical boundary compliance ([0.0, 1.0]).
 * 7. Correct olfactive characteristic profiles for iconic fragrances (1 Million, Marbert Man, Ambre Vanille, Pegasus, Supreme Bouquet, Silver Mountain Water, Aican, The Most Wanted, Althair, Oud Wood, Stronger With You, Valaya, Imagination, Megamare, Roses Vanille, Tuxedo, Angels' Share, Tygar, Guidance 46, Bois Imperial, Hudson Valley, Imperial Valley).
 * 8. Review queue integrity (1 review_required, 7 incomplete, 0 not_found).
 * 9. Cumulative catalog ingestion with active enrichment (444 active enriched records: 5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06 + 98 B07 + 34 B08).
 * 10. Strict 100% deterministic repeatability and 100% full catalog evaluation (497 / 497).
 */

import { RAW_ABNA_PRODUCTS } from "./src/data/abna/raw";
import { ingestAbnaProducts } from "./src/data/abna/ingestion";
import {
  normalizeBrand,
  normalizeCommercialGender,
  normalizePriceTier,
} from "./src/data/abna/normalization";
import { generateDeterministicProductId } from "./src/data/abna/product-id";
import {
  BATCH_08_ENRICHMENT_RECORDS,
  BATCH_08_REVIEW_QUEUE,
  BATCH_08_SUMMARY,
  BATCH_07_ENRICHMENT_RECORDS,
  BATCH_06_ENRICHMENT_RECORDS,
  BATCH_05_ENRICHMENT_RECORDS,
  BATCH_04_ENRICHMENT_RECORDS,
  BATCH_03_ENRICHMENT_RECORDS,
  BATCH_02_ENRICHMENT_RECORDS,
  BATCH_01_ENRICHMENT_RECORDS,
  PILOT_ENRICHMENT_RECORDS,
  ALL_ACTIVE_ENRICHMENT_RECORDS,
} from "./src/data/abna/enrichment";
import {
  resolveCanonicalNote,
  resolveCanonicalAccord,
} from "./src/data/olfactive/dictionary/aliases";

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
console.log("PHASE 6C-3I: ABNA BATCH 08 ENRICHMENT TEST SUITE (FINAL)");
console.log("==================================================");

// ----------------------------------------------------
// 1. Identity Matching & Deterministic IDs
// ----------------------------------------------------
console.log("\n[1] Testing Product Identity Matching & Deterministic IDs...");
{
  const id1 = generateDeterministicProductId("Rain Tea", "Louis Vuitton", "THE NATURE", 458);
  assert(id1 === "abna_rain_tea_louis_vuitton_the_nature_458", `Deterministic ID match: ${id1}`);

  const id2 = generateDeterministicProductId("1 Million", "Paco Rabanne", "ELITE", 459);
  assert(id2 === "abna_1_million_paco_rabanne_elite_459", `Deterministic ID match: ${id2}`);

  const id3 = generateDeterministicProductId("Imagination", "Louis Vuitton", "ELITE", 484);
  assert(id3 === "abna_imagination_louis_vuitton_elite_484", `Deterministic ID match: ${id3}`);

  const id4 = generateDeterministicProductId("Imperial Valley", "Gissah", "THE NATURE", 499);
  assert(id4 === "abna_imperial_valley_gissah_the_nature_499", `Deterministic ID match: ${id4}`);
}

// ----------------------------------------------------
// 2. Brand & Commercial Normalization
// ----------------------------------------------------
console.log("\n[2] Testing Brand & Commercial Metadata Normalization...");
{
  assert(normalizeBrand("Paco Rabanne") === "Paco Rabanne", "Brand 'Paco Rabanne' -> Paco Rabanne");
  assert(normalizeBrand("Marbet Man") === "Marbet Man", "Brand 'Marbet Man' -> Marbet Man");
  assert(
    normalizeBrand("Laura Mercier") === "Laura Mercier",
    "Brand 'Laura Mercier' -> Laura Mercier",
  );
  assert(normalizeBrand("Kajal") === "Kajal", "Brand 'Kajal' -> Kajal");
  assert(normalizeBrand("Orto Parisi") === "Orto Parisi", "Brand 'Orto Parisi' -> Orto Parisi");
  assert(normalizeBrand("Amouage") === "Amouage", "Brand 'Amouage' -> Amouage");
  assert(
    normalizeBrand("Essential") === "Essential Parfums",
    "Brand 'Essential' -> Essential Parfums",
  );
  assert(normalizeBrand("Arabian Oud") === "Arabian Oud", "Brand 'Arabian Oud' -> Arabian Oud");
  assert(normalizePriceTier("ELITE") === "ELITE", "Price tier 'ELITE' -> ELITE");
  assert(
    normalizePriceTier("SPECIAL ONE") === "SPECIAL_ONE",
    "Price tier 'SPECIAL ONE' -> SPECIAL_ONE",
  );
  assert(
    normalizePriceTier("THE NATURE") === "THE_NATURE",
    "Price tier 'THE NATURE' -> THE_NATURE",
  );
}

// ----------------------------------------------------
// 3. Batch 08 Scope & Status Partitioning
// ----------------------------------------------------
console.log("\n[3] Testing Batch 08 Scope & Partitioning...");
{
  const evaluatedCount = BATCH_08_ENRICHMENT_RECORDS.length + BATCH_08_REVIEW_QUEUE.length;
  assert(evaluatedCount === 42, "Evaluated exactly 42 products in Batch 08");
  assert(BATCH_08_ENRICHMENT_RECORDS.length === 34, "34 verified enriched products");
  assert(
    BATCH_08_REVIEW_QUEUE.filter((i) => i.status === "incomplete").length === 7,
    "7 incomplete products in review queue",
  );
  assert(
    BATCH_08_REVIEW_QUEUE.filter((i) => i.status === "review_required").length === 1,
    "1 review_required product",
  );
  assert(
    BATCH_08_REVIEW_QUEUE.filter((i) => i.status === "not_found").length === 0,
    "0 not_found products",
  );

  assert(BATCH_08_ENRICHMENT_RECORDS.length === 34, "Batch 08 records array length is 34");
  assert(BATCH_08_REVIEW_QUEUE.length === 8, "Batch 08 review queue length is 8");

  // Verify full cumulative breakdown across all batches
  assert(PILOT_ENRICHMENT_RECORDS.length === 5, "Pilot records length is 5");
  assert(BATCH_01_ENRICHMENT_RECORDS.length === 44, "Batch 01 records length is 44");
  assert(BATCH_02_ENRICHMENT_RECORDS.length === 42, "Batch 02 records length is 42");
  assert(BATCH_03_ENRICHMENT_RECORDS.length === 49, "Batch 03 records length is 49");
  assert(BATCH_04_ENRICHMENT_RECORDS.length === 40, "Batch 04 records length is 40");
  assert(BATCH_05_ENRICHMENT_RECORDS.length === 46, "Batch 05 records length is 46");
  assert(BATCH_06_ENRICHMENT_RECORDS.length === 86, "Batch 06 records length is 86");
  assert(BATCH_07_ENRICHMENT_RECORDS.length === 98, "Batch 07 records length is 98");
  assert(BATCH_08_ENRICHMENT_RECORDS.length === 34, "Batch 08 records length is 34");

  const totalActive = 5 + 44 + 42 + 49 + 40 + 46 + 86 + 98 + 34;
  assert(
    ALL_ACTIVE_ENRICHMENT_RECORDS.length === totalActive,
    `Total active enrichment records is ${totalActive} (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06 + 98 B07 + 34 B08)`,
  );

  const rawTail = RAW_ABNA_PRODUCTS.slice(455);
  assert(rawTail.length === 42, "Raw tail slice contains exactly 42 items");
  assert(rawTail[0].rowNumber === 458, "First item raw row is 458");
  assert(rawTail[rawTail.length - 1].rowNumber === 499, "Last item raw row is 499");
}

// ----------------------------------------------------
// 4. Note & Accord Dictionary Resolution
// ----------------------------------------------------
console.log("\n[4] Testing Note & Accord Dictionary Resolution...");
{
  let unmappedNotes = 0;
  let unmappedAccords = 0;

  for (const record of BATCH_08_ENRICHMENT_RECORDS) {
    const allNotes = [
      ...(record.notes.top || []),
      ...(record.notes.middle || []),
      ...(record.notes.base || []),
    ];

    for (const note of allNotes) {
      const res = resolveCanonicalNote(note);
      if (!res.canonicalKey) {
        console.error(`  [UNKNOWN NOTE] ${note} in ${record.productId}`);
        unmappedNotes++;
      }
    }

    for (const accord of record.accords || []) {
      const res = resolveCanonicalAccord(accord);
      if (!res.canonicalKey) {
        console.error(`  [UNKNOWN ACCORD] ${accord} in ${record.productId}`);
        unmappedAccords++;
      }
    }
  }

  assert(unmappedNotes === 0, `Zero unmapped notes in Batch 08 (found ${unmappedNotes})`);
  assert(unmappedAccords === 0, `Zero unmapped accords in Batch 08 (found ${unmappedAccords})`);
}

// ----------------------------------------------------
// 5. Mandatory Provenance Tracking Coverage
// ----------------------------------------------------
console.log("\n[5] Testing Mandatory Provenance Tracking Coverage...");
{
  const allHaveProvenance = BATCH_08_ENRICHMENT_RECORDS.every(
    (record) =>
      record.source &&
      record.source.provider &&
      record.source.sourceUrl &&
      record.source.sourceUrl.startsWith("https://www.fragrantica.com/perfume/") &&
      record.source.confidence >= 0.9 &&
      record.source.notesVerified === true &&
      record.source.verificationStatus === "verified",
  );
  assert(
    allHaveProvenance,
    "All 34 Batch 08 enriched records contain complete verifiable provenance metadata",
  );
  assert(
    BATCH_08_SUMMARY.provenanceCompleteCount === 34,
    "Batch 08 provenance complete count is 34",
  );
}

// ----------------------------------------------------
// 6. Ingestion & 10D Derivation Range Validation
// ----------------------------------------------------
console.log("\n[6] Testing 10D Derivation & Strict [0.0, 1.0] Range Validation...");
{
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  const b08Products = ingestion.products.filter((p) =>
    BATCH_08_ENRICHMENT_RECORDS.some((r) => r.productId === p.id),
  );

  assert(
    b08Products.length === 34,
    `Ingestion matched all 34 Batch 08 products (got ${b08Products.length})`,
  );

  const dimensions = [
    "freshness",
    "warmth",
    "sweetness",
    "woody",
    "floral",
    "spicy",
    "citrus",
    "aquatic",
    "gourmand",
    "intensity",
  ] as const;

  let allBounded = true;
  for (const product of b08Products) {
    if (!product.derived?.features) {
      allBounded = false;
      break;
    }
    for (const dim of dimensions) {
      const val = product.derived.features[dim];
      if (typeof val !== "number" || val < 0.0 || val > 1.0 || isNaN(val)) {
        console.error(`Invalid dimension ${dim} = ${val} for product ${product.id}`);
        allBounded = false;
      }
    }
  }

  assert(allBounded, "All 34 Batch 08 10D feature vectors are strictly bounded in [0.0, 1.0]");
}

// ----------------------------------------------------
// 7. Olfactive Characteristic Profiles
// ----------------------------------------------------
console.log("\n[7] Testing Olfactive Characteristic Profiles...");
{
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  const million = ingestion.products.find((p) => p.id === "abna_1_million_paco_rabanne_elite_459");
  assert(!!million, "1 Million record found in Batch 08");
  if (million?.derived?.features) {
    const f = million.derived.features;
    assert(f.spicy >= 0.5, `1 Million spicy >= 0.50 (got ${f.spicy})`);
    assert(f.warmth >= 0.6, `1 Million warmth >= 0.60 (got ${f.warmth})`);
  }

  const imagination = ingestion.products.find(
    (p) => p.id === "abna_imagination_louis_vuitton_elite_484",
  );
  assert(!!imagination, "Imagination record found in Batch 08");
  if (imagination?.derived?.features) {
    const f = imagination.derived.features;
    assert(f.citrus >= 0.7, `Imagination citrus >= 0.70 (got ${f.citrus})`);
    assert(f.freshness >= 0.7, `Imagination freshness >= 0.70 (got ${f.freshness})`);
  }

  const megamare = ingestion.products.find((p) => p.id === "abna_megamare_orto_parisi_elite_485");
  assert(!!megamare, "Megamare record found in Batch 08");
  if (megamare?.derived?.features) {
    const f = megamare.derived.features;
    assert(f.aquatic >= 0.7, `Megamare aquatic >= 0.70 (got ${f.aquatic})`);
    assert(f.freshness >= 0.6, `Megamare freshness >= 0.60 (got ${f.freshness})`);
  }

  const angelsShare = ingestion.products.find(
    (p) => p.id === "abna_angel_share_by_killian_exclusive_490",
  );
  assert(!!angelsShare, "Angels' Share record found in Batch 08");
  if (angelsShare?.derived?.features) {
    const f = angelsShare.derived.features;
    assert(f.gourmand >= 0.6, `Angels' Share gourmand >= 0.60 (got ${f.gourmand})`);
    assert(f.warmth >= 0.7, `Angels' Share warmth >= 0.70 (got ${f.warmth})`);
  }

  const tux = ingestion.products.find((p) => p.id === "abna_tuxedo_ysl_exclusive_487");
  assert(!!tux, "Tuxedo record found in Batch 08");
  if (tux?.derived?.features) {
    const f = tux.derived.features;
    assert(f.woody >= 0.5, `Tuxedo woody >= 0.50 (got ${f.woody})`);
    assert(f.spicy >= 0.5, `Tuxedo spicy >= 0.50 (got ${f.spicy})`);
  }
}

// ----------------------------------------------------
// 8. Human Review Queue Integrity
// ----------------------------------------------------
console.log("\n[8] Testing Human Review Queue Integrity...");
{
  assert(
    BATCH_08_REVIEW_QUEUE.length === 8,
    `Batch 08 review queue contains exactly 8 items (got ${BATCH_08_REVIEW_QUEUE.length})`,
  );
  const incompleteItems = BATCH_08_REVIEW_QUEUE.filter((i) => i.status === "incomplete");
  const reviewRequiredItems = BATCH_08_REVIEW_QUEUE.filter((i) => i.status === "review_required");

  assert(incompleteItems.length === 7, "7 items with status 'incomplete'");
  assert(reviewRequiredItems.length === 1, "1 item with status 'review_required'");

  assert(
    BATCH_08_REVIEW_QUEUE.some((i) => i.productId === "abna_silver_scent_california_exclusive_489"),
    "Silver Scent California item found in review_required",
  );
  assert(
    BATCH_08_REVIEW_QUEUE.some(
      (i) => i.productId === "abna_malaikat_subuh_malaikat_subuh_the_nature_472",
    ),
    "Malaikat Subuh item found in incomplete",
  );
}

// ----------------------------------------------------
// 9. Full Catalog Ingestion with Active Enrichment (444 products)
// ----------------------------------------------------
console.log("\n[9] Testing Full Catalog Ingestion with Final Active Enrichment (444 products)...");
{
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  assert(
    ingestion.products.length === 497,
    `Total catalog parsed is 497 (got ${ingestion.products.length})`,
  );
  assert(
    ingestion.report.productsWithEnrichment === 444,
    `Total enriched products is 444 (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06 + 98 B07 + 34 B08) (got ${ingestion.report.productsWithEnrichment})`,
  );
  assert(
    ingestion.report.statusBreakdown.validated === 444,
    `All 444 enriched products validated successfully (100%) (got ${ingestion.report.statusBreakdown.validated})`,
  );
  assert(
    ingestion.report.statusBreakdown.notEnriched === 53,
    `Remaining unenriched (review queue) products is 53 (497 - 444) (got ${ingestion.report.statusBreakdown.notEnriched})`,
  );
  assert(
    ingestion.report.validationErrorsCount === 0,
    `Zero validation errors across entire 497 catalog (got ${ingestion.report.validationErrorsCount})`,
  );
  assert(
    ingestion.report.validationWarningsCount === 0,
    `Zero validation warnings across entire 497 catalog (got ${ingestion.report.validationWarningsCount})`,
  );
  assert(
    ingestion.report.unknownTermsSummary.distinctUnknownNotes === 0,
    `Zero unknown notes in active enriched catalog (got ${ingestion.report.unknownTermsSummary.distinctUnknownNotes})`,
  );
  assert(
    ingestion.report.unknownTermsSummary.distinctUnknownAccords === 0,
    `Zero unknown accords in active enriched catalog (got ${ingestion.report.unknownTermsSummary.distinctUnknownAccords})`,
  );
}

// ----------------------------------------------------
// 10. Deterministic Repeatability Check
// ----------------------------------------------------
console.log("\n[10] Testing Deterministic Repeatability...");
{
  const run1 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });
  const run2 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  assert(
    JSON.stringify(run1.report.statusBreakdown) === JSON.stringify(run2.report.statusBreakdown),
    "Consecutive ingestion runs yield identical status breakdown",
  );

  const vectorsIdentical = run1.products.every((p1, idx) => {
    const p2 = run2.products[idx];
    return JSON.stringify(p1.derived?.features) === JSON.stringify(p2.derived?.features);
  });
  assert(
    vectorsIdentical,
    "Derived 10D feature vectors are 100% byte-for-byte identical across runs",
  );
}

console.log("\n==================================================");
console.log(`BATCH 08 TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
