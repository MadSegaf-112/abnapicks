/**
 * Phase 6C-3G: ABNA Batch 06 Olfactive Enrichment Test Suite
 *
 * Validates:
 * 1. Exact product identity matching and deterministic ID generation for Batch 06 (Rows 258 to 357).
 * 2. Brand & commercial metadata normalization.
 * 3. Note and accord resolution against controlled olfactive dictionary.
 * 4. Zero unknown olfactive terms across enriched records.
 * 5. Complete mandatory provenance tracking with verified source URLs and high confidence.
 * 6. 10D feature vector derivation and mathematical boundary compliance ([0.0, 1.0]).
 * 7. Correct olfactive characteristic profiles for iconic fragrances (Wisal, Drakkar Noir, Delina, Blue Talisman, Oud Maracuja, Black Opium, La Vie Est Belle, Baccarat Rouge 540, Tabac Rose, Red Tobacco, Black Orchid, Naxos, Jazz Club, Tobacco Vanille, Good Girl, Mon Paris).
 * 8. Review queue integrity (14 incomplete items, 0 review_required).
 * 9. Cumulative catalog ingestion with active enrichment (312 active enriched records: 5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06).
 * 10. Strict 100% deterministic repeatability.
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
  BATCH_06_ENRICHMENT_RECORDS,
  BATCH_06_REVIEW_QUEUE,
  BATCH_06_SUMMARY,
  BATCH_01_ENRICHMENT_RECORDS,
  BATCH_02_ENRICHMENT_RECORDS,
  BATCH_03_ENRICHMENT_RECORDS,
  BATCH_04_ENRICHMENT_RECORDS,
  BATCH_05_ENRICHMENT_RECORDS,
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
console.log("PHASE 6C-3G: ABNA BATCH 06 ENRICHMENT TEST SUITE");
console.log("==================================================");

// ----------------------------------------------------
// 1. Product Identity Matching & Deterministic IDs
// ----------------------------------------------------
console.log("\n[1] Testing Product Identity Matching & Deterministic IDs...");
{
  const id1 = generateDeterministicProductId("Ajmal Wisal", "Ajmal Wisal", "ELITE", 258);
  assert(id1 === "abna_ajmal_wisal_ajmal_wisal_elite_258", `Deterministic ID match: ${id1}`);

  const id2 = generateDeterministicProductId("Drakar Noir", "Guy Laroche", "ELITE", 262);
  assert(id2 === "abna_drakar_noir_guy_laroche_elite_262", `Deterministic ID match: ${id2}`);

  const id3 = generateDeterministicProductId("Delina", "Parfums de Marly", "ELITE", 285);
  assert(id3 === "abna_delina_parfums_de_marly_elite_285", `Deterministic ID match: ${id3}`);
}

// ----------------------------------------------------
// 2. Brand & Commercial Metadata Normalization
// ----------------------------------------------------
console.log("\n[2] Testing Brand & Commercial Metadata Normalization...");
{
  assert(normalizeBrand("Ajmal Wisal") === "Ajmal", "Brand 'Ajmal Wisal' -> Ajmal");
  assert(normalizeBrand("Golden Dust") === "Sunnamusk", "Brand 'Golden Dust' -> Sunnamusk");
  assert(normalizeBrand("Darj") === "Rasasi", "Brand 'Darj' -> Rasasi");
  assert(normalizeBrand("Guy Laroche") === "Guy Laroche", "Brand 'Guy Laroche' -> Guy Laroche");
  assert(normalizeBrand("Brud Faberge") === "Fabergé", "Brand 'Brud Faberge' -> Fabergé");
  assert(normalizeBrand("Gissah") === "Gissah", "Brand 'Gissah' -> Gissah");
  assert(normalizeBrand("Ex Nihilo") === "Ex Nihilo", "Brand 'Ex Nihilo' -> Ex Nihilo");
  assert(
    normalizeBrand("Maison Crivelli") === "Maison Crivelli",
    "Brand 'Maison Crivelli' -> Maison Crivelli",
  );
  assert(
    normalizeBrand("Mercedes Benz") === "Mercedes-Benz",
    "Brand 'Mercedes Benz' -> Mercedes-Benz",
  );
  assert(normalizeBrand("BDK") === "BDK Parfums", "Brand 'BDK' -> BDK Parfums");
  assert(normalizeBrand("Victor Rolf") === "Viktor&Rolf", "Brand 'Victor Rolf' -> Viktor&Rolf");
  assert(normalizeBrand("Roja") === "Roja Parfums", "Brand 'Roja' -> Roja Parfums");
  assert(normalizeBrand("Nishane") === "Nishane", "Brand 'Nishane' -> Nishane");
  assert(normalizeBrand("Arabian Oud") === "Arabian Oud", "Brand 'Arabian Oud' -> Arabian Oud");

  const gWomen = normalizeCommercialGender("Women", "Ajmal Wisal");
  assert(gWomen.gender === "feminine", "Gender 'Women' -> feminine");

  const gMen = normalizeCommercialGender("Men", "Drakar Noir");
  assert(gMen.gender === "masculine", "Gender 'Men' -> masculine");

  const gInferred = normalizeCommercialGender("", "Pacific Chill");
  assert(
    gInferred.gender === "unisex" && gInferred.genderSource === "inferred_default",
    "Inferred blank gender for Pacific Chill -> unisex (inferred_default)",
  );

  assert(normalizePriceTier("ELITE") === "ELITE", "Price tier ELITE -> ELITE");
  assert(
    normalizePriceTier("SPECIAL ONE") === "SPECIAL_ONE",
    "Price tier SPECIAL ONE -> SPECIAL_ONE",
  );
  assert(normalizePriceTier("THE NATURE") === "THE_NATURE", "Price tier THE NATURE -> THE_NATURE");
}

// ----------------------------------------------------
// 3. Canonical Note & Accord Resolution
// ----------------------------------------------------
console.log("\n[3] Testing Canonical Note & Accord Resolution...");
{
  assert(resolveCanonicalNote("Angelica").canonicalKey === "sage", "Note 'Angelica' -> sage");
  assert(resolveCanonicalNote("Davana").canonicalKey === "sage", "Note 'Davana' -> sage");
  assert(
    resolveCanonicalNote("Sand").canonicalKey === "mineral notes",
    "Note 'Sand' -> mineral notes",
  );
  assert(
    resolveCanonicalNote("Fruit Notes").canonicalKey === "fruity notes",
    "Note 'Fruit Notes' -> fruity notes",
  );
  assert(
    resolveCanonicalNote("Sorbet").canonicalKey === "fruity notes",
    "Note 'Sorbet' -> fruity notes",
  );
  assert(
    resolveCanonicalNote("Paprika").canonicalKey === "black pepper",
    "Note 'Paprika' -> black pepper",
  );
  assert(
    resolveCanonicalNote("Truffle").canonicalKey === "patchouli",
    "Note 'Truffle' -> patchouli",
  );
  assert(resolveCanonicalNote("Amaretto").canonicalKey === "almond", "Note 'Amaretto' -> almond");
  assert(
    resolveCanonicalNote("Speculoos").canonicalKey === "hazelnut",
    "Note 'Speculoos' -> hazelnut",
  );
  assert(resolveCanonicalNote("Wheat").canonicalKey === "hazelnut", "Note 'Wheat' -> hazelnut");
  assert(resolveCanonicalNote("Barley").canonicalKey === "hazelnut", "Note 'Barley' -> hazelnut");
  assert(resolveCanonicalNote("Bran").canonicalKey === "hazelnut", "Note 'Bran' -> hazelnut");
  assert(resolveCanonicalNote("Civet").canonicalKey === "musk", "Note 'Civet' -> musk");
  assert(resolveCanonicalNote("Sylkolide").canonicalKey === "musk", "Note 'Sylkolide' -> musk");
  assert(resolveCanonicalAccord("cacao").canonicalKey === "cocoa", "Accord 'cacao' -> cocoa");
}

// ----------------------------------------------------
// 4. Batch 06 Scope & Status Partitioning
// ----------------------------------------------------
console.log("\n[4] Testing Batch 06 Scope & Status Partitioning...");
{
  assert(BATCH_06_SUMMARY.productsEvaluated === 100, "Batch 06 evaluated exactly 100 products");
  assert(BATCH_06_SUMMARY.enriched === 86, "Batch 06 enriched count is 86");
  assert(BATCH_06_SUMMARY.reviewRequired === 0, "Batch 06 review_required count is 0");
  assert(BATCH_06_SUMMARY.incomplete === 14, "Batch 06 incomplete count is 14");
  assert(BATCH_06_SUMMARY.notFound === 0, "Batch 06 not_found count is 0");

  assert(
    BATCH_06_ENRICHMENT_RECORDS.length === 86,
    "Batch 06 enrichment records array length is 86",
  );
  assert(PILOT_ENRICHMENT_RECORDS.length === 5, "Pilot records untouched with length 5");
  assert(BATCH_01_ENRICHMENT_RECORDS.length === 44, "Batch 01 records untouched with length 44");
  assert(BATCH_02_ENRICHMENT_RECORDS.length === 42, "Batch 02 records untouched with length 42");
  assert(BATCH_03_ENRICHMENT_RECORDS.length === 49, "Batch 03 records untouched with length 49");
  assert(BATCH_04_ENRICHMENT_RECORDS.length === 40, "Batch 04 records untouched with length 40");
  assert(BATCH_05_ENRICHMENT_RECORDS.length === 46, "Batch 05 records untouched with length 46");

  const batch06Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
    ...BATCH_04_ENRICHMENT_RECORDS,
    ...BATCH_05_ENRICHMENT_RECORDS,
    ...BATCH_06_ENRICHMENT_RECORDS,
  ];
  const expectedTotalActive = 5 + 44 + 42 + 49 + 40 + 46 + 86; // 312
  assert(
    batch06Active.length === expectedTotalActive,
    `Total active enrichment records is ${expectedTotalActive} (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06)`,
  );
}

// ----------------------------------------------------
// 5. Mandatory Provenance Coverage
// ----------------------------------------------------
console.log("\n[5] Testing Mandatory Provenance Coverage across Batch 06...");
{
  const allHaveProvenance = BATCH_06_ENRICHMENT_RECORDS.every(
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
    "All 86 Batch 06 enriched records contain complete verifiable provenance metadata",
  );
  assert(
    BATCH_06_SUMMARY.provenanceCompleteCount === 86,
    "Batch 06 provenance complete count is 86",
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

  const b06Products = ingestion.products.filter((p) =>
    BATCH_06_ENRICHMENT_RECORDS.some((r) => r.productId === p.id),
  );

  assert(
    b06Products.length === 86,
    `Ingestion matched all 86 Batch 06 products (got ${b06Products.length})`,
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
  for (const product of b06Products) {
    const f = product.derived?.features;
    if (!f) {
      allBounded = false;
      break;
    }
    for (const dim of dimensions) {
      if (typeof f[dim] !== "number" || f[dim] < 0.0 || f[dim] > 1.0) {
        allBounded = false;
        console.error(`Out of bounds for ${product.id} on dimension ${dim}: ${f[dim]}`);
      }
    }
  }
  assert(allBounded, "All 86 Batch 06 10D feature vectors are strictly bounded in [0.0, 1.0]");
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

  // Drakkar Noir: High Freshness / Woody
  const drakkar = ingestion.products.find((p) => p.id === "abna_drakar_noir_guy_laroche_elite_262");
  assert(drakkar !== undefined, "Drakkar Noir record found in Batch 06");
  const drakkarFeatures = drakkar?.derived?.features;
  if (drakkarFeatures) {
    assert(
      drakkarFeatures.freshness >= 0.7,
      `Drakkar Noir freshness >= 0.70 (got ${drakkarFeatures.freshness})`,
    );
    assert(
      drakkarFeatures.woody >= 0.7,
      `Drakkar Noir woody >= 0.70 (got ${drakkarFeatures.woody})`,
    );
  }

  // Delina: High Floral / Rose / Freshness
  const delina = ingestion.products.find((p) => p.id === "abna_delina_parfums_de_marly_elite_285");
  assert(delina !== undefined, "Delina record found in Batch 06");
  const delinaFeatures = delina?.derived?.features;
  if (delinaFeatures) {
    assert(delinaFeatures.floral >= 0.7, `Delina floral >= 0.70 (got ${delinaFeatures.floral})`);
    assert(
      delinaFeatures.sweetness >= 0.6,
      `Delina sweetness >= 0.60 (got ${delinaFeatures.sweetness})`,
    );
  }

  // Red Tobacco: High Warmth / Woody / Spicy
  const redTobacco = ingestion.products.find(
    (p) => p.id === "abna_red_tobacco_mancera_special_one_318",
  );
  assert(redTobacco !== undefined, "Red Tobacco record found in Batch 06");
  const rtFeatures = redTobacco?.derived?.features;
  if (rtFeatures) {
    assert(rtFeatures.warmth >= 0.8, `Red Tobacco warmth >= 0.80 (got ${rtFeatures.warmth})`);
    assert(rtFeatures.woody >= 0.8, `Red Tobacco woody >= 0.80 (got ${rtFeatures.woody})`);
    assert(rtFeatures.spicy >= 0.7, `Red Tobacco spicy >= 0.70 (got ${rtFeatures.spicy})`);
  }

  // Naxos 1861: High Sweetness / Warmth / Freshness
  const naxos = ingestion.products.find((p) => p.id === "abna_naxos_1861_xerjoff_the_nature_331");
  assert(naxos !== undefined, "Naxos 1861 record found in Batch 06");
  const naxosFeatures = naxos?.derived?.features;
  if (naxosFeatures) {
    assert(
      naxosFeatures.sweetness >= 0.8,
      `Naxos sweetness >= 0.80 (got ${naxosFeatures.sweetness})`,
    );
    assert(naxosFeatures.warmth >= 0.75, `Naxos warmth >= 0.75 (got ${naxosFeatures.warmth})`);
  }

  // Tobacco Vanille: High Gourmand / Sweetness / Warmth
  const tv = ingestion.products.find((p) => p.id === "abna_tobacco_vanilla_tom_ford_exclusive_337");
  assert(tv !== undefined, "Tobacco Vanille record found in Batch 06");
  const tvFeatures = tv?.derived?.features;
  if (tvFeatures) {
    assert(
      tvFeatures.gourmand >= 0.7,
      `Tobacco Vanille gourmand >= 0.70 (got ${tvFeatures.gourmand})`,
    );
    assert(
      tvFeatures.sweetness >= 0.8,
      `Tobacco Vanille sweetness >= 0.80 (got ${tvFeatures.sweetness})`,
    );
    assert(tvFeatures.warmth >= 0.8, `Tobacco Vanille warmth >= 0.80 (got ${tvFeatures.warmth})`);
  }
}

// ----------------------------------------------------
// 8. Human Review Queue Integrity
// ----------------------------------------------------
console.log("\n[8] Testing Human Review Queue Integrity...");
{
  assert(
    BATCH_06_REVIEW_QUEUE.length === 14,
    `Batch 06 review queue contains exactly 14 items (got ${BATCH_06_REVIEW_QUEUE.length})`,
  );
  const incompleteItems = BATCH_06_REVIEW_QUEUE.filter((i) => i.status === "incomplete");
  const reviewRequiredItems = BATCH_06_REVIEW_QUEUE.filter((i) => i.status === "review_required");

  assert(incompleteItems.length === 14, "14 items with status 'incomplete'");
  assert(reviewRequiredItems.length === 0, "0 items with status 'review_required'");

  assert(
    BATCH_06_REVIEW_QUEUE.some((i) => i.productId === "abna_misik_putih_misik_putih_elite_260"),
    "Misik Putih item found",
  );
  assert(
    BATCH_06_REVIEW_QUEUE.some((i) => i.productId === "abna_es_teh_manis_guzel_vip_279"),
    "Es Teh Manis Guzel item found",
  );
  assert(
    BATCH_06_REVIEW_QUEUE.some((i) => i.productId === "abna_black_coffee_guzel_vip_345"),
    "Black Coffee Guzel item found",
  );
  assert(
    BATCH_06_REVIEW_QUEUE.some((i) => i.productId === "abna_pilot_garuda_guzel_vip_349"),
    "Pilot Garuda Guzel item found",
  );
}

// ----------------------------------------------------
// 9. Full Catalog Ingestion with Active Enrichment (312 products)
// ----------------------------------------------------
console.log("\n[9] Testing Full Catalog Ingestion with Active Enrichment (312 products)...");
{
  const batch06Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
    ...BATCH_04_ENRICHMENT_RECORDS,
    ...BATCH_05_ENRICHMENT_RECORDS,
    ...BATCH_06_ENRICHMENT_RECORDS,
  ];
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch06Active,
  });

  assert(
    ingestion.products.length === 497,
    `Total catalog parsed is 497 (got ${ingestion.products.length})`,
  );
  assert(
    ingestion.report.productsWithEnrichment === 312,
    `Total enriched products is 312 (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06) (got ${ingestion.report.productsWithEnrichment})`,
  );
  assert(
    ingestion.report.statusBreakdown.validated === 312,
    `All 312 enriched products validated successfully (100%) (got ${ingestion.report.statusBreakdown.validated})`,
  );
  assert(
    ingestion.report.statusBreakdown.notEnriched === 185,
    `Remaining unenriched products is 185 (497 - 312) (got ${ingestion.report.statusBreakdown.notEnriched})`,
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
console.log(`BATCH 06 TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
