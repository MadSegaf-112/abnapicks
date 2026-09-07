/**
 * Phase 6C-3D: ABNA Batch 03 Olfactive Enrichment Test Suite
 *
 * Validates:
 * 1. Exact product identity matching and deterministic ID generation for Batch 03 (Rows 107 to 157).
 * 2. Brand & commercial metadata normalization.
 * 3. Note and accord resolution against controlled olfactive dictionary.
 * 4. Zero unknown olfactive terms across enriched records.
 * 5. Complete mandatory provenance tracking with verified source URLs and high confidence.
 * 6. 10D feature vector derivation and mathematical boundary compliance ([0.0, 1.0]).
 * 7. Correct olfactive characteristic profiles for iconic fragrances (A*Men, Angel, Terre d'Hermes, Libre, Ultra Male).
 * 8. Review queue integrity for disambiguations (Blue Emotion Armani mismatch).
 * 9. Cumulative catalog ingestion with active enrichment (140 active enriched records: 5 pilot + 44 B01 + 42 B02 + 49 B03).
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
  BATCH_03_ENRICHMENT_RECORDS,
  BATCH_03_REVIEW_QUEUE,
  BATCH_03_SUMMARY,
  BATCH_01_ENRICHMENT_RECORDS,
  BATCH_02_ENRICHMENT_RECORDS,
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
console.log("PHASE 6C-3D: ABNA BATCH 03 ENRICHMENT TEST SUITE");
console.log("==================================================");

// ----------------------------------------------------
// 1. Product Identity Matching & Deterministic IDs
// ----------------------------------------------------
console.log("\n[1] Testing Product Identity Matching & Deterministic IDs...");
{
  const id1 = generateDeterministicProductId("Pour Homme Soir", "Bvlgari", "ELITE", 107);
  assert(id1 === "abna_pour_homme_soir_bvlgari_elite_107", `Deterministic ID match: ${id1}`);

  const id2 = generateDeterministicProductId("Coco Mademoiselle", "Chanel", "ELITE", 125);
  assert(id2 === "abna_coco_mademoiselle_chanel_elite_125", `Deterministic ID match: ${id2}`);

  const id3 = generateDeterministicProductId("Angel Woman", "Mugler", "ELITE", 135);
  assert(id3 === "abna_angel_woman_mugler_elite_135", `Deterministic ID match: ${id3}`);
}

// ----------------------------------------------------
// 2. Brand & Commercial Metadata Normalization
// ----------------------------------------------------
console.log("\n[2] Testing Brand & Commercial Metadata Normalization...");
{
  assert(normalizeBrand("Davidof") === "Davidoff", "Brand 'Davidof' -> Davidoff");
  assert(normalizeBrand("Chloe") === "Chloé", "Brand 'Chloe' -> Chloé");
  assert(normalizeBrand("Hermes") === "Hermès", "Brand 'Hermes' -> Hermès");
  assert(normalizeBrand("Mugler") === "Mugler", "Brand 'Mugler' -> Mugler");
  assert(
    normalizeBrand("Carolina Herrera") === "Carolina Herrera",
    "Brand 'Carolina Herrera' -> Carolina Herrera",
  );

  assert(
    normalizeCommercialGender("Men", "Run Wild").gender === "masculine",
    "Gender 'Men' -> masculine",
  );
  assert(
    normalizeCommercialGender("Women", "Chloe Edp").gender === "feminine",
    "Gender 'Women' -> feminine",
  );
  assert(normalizePriceTier("ELITE") === "ELITE", "Price tier ELITE -> ELITE");
}

// ----------------------------------------------------
// 3. Canonical Note & Accord Resolution
// ----------------------------------------------------
console.log("\n[3] Testing Canonical Note & Accord Resolution...");
{
  const n1 = resolveCanonicalNote("Darjeeling Tea");
  assert(n1.canonicalKey === "tea", "Note 'Darjeeling Tea' -> tea");

  const n2 = resolveCanonicalNote("Papyrus");
  assert(n2.canonicalKey === "papyrus", "Note 'Papyrus' -> papyrus");

  const n3 = resolveCanonicalNote("Vodka");
  assert(n3.canonicalKey === "rum", "Note 'Vodka' -> rum");

  const n4 = resolveCanonicalNote("Vanilla Caviar");
  assert(n4.canonicalKey === "vanilla", "Note 'Vanilla Caviar' -> vanilla");

  const n5 = resolveCanonicalNote("Aquozone");
  assert(n5.canonicalKey === "calone", "Note 'Aquozone' -> calone");

  const a1 = resolveCanonicalAccord("boozy");
  assert(a1.canonicalKey === "rum", "Accord 'boozy' -> rum (cross_category_note)");

  const a2 = resolveCanonicalAccord("cacao");
  assert(a2.canonicalKey === "cocoa", "Accord 'cacao' -> cocoa (cross_category_note)");

  const a3 = resolveCanonicalAccord("mineral");
  assert(
    a3.canonicalKey === "mineral notes",
    "Accord 'mineral' -> mineral notes (cross_category_note)",
  );
}

// ----------------------------------------------------
// 4. Batch 03 Scope & Status Partitioning
// ----------------------------------------------------
console.log("\n[4] Testing Batch 03 Scope & Status Partitioning...");
{
  assert(BATCH_03_SUMMARY.productsEvaluated === 50, "Batch 03 evaluated exactly 50 products");
  assert(BATCH_03_SUMMARY.enriched === 49, "Batch 03 enriched count is 49");
  assert(BATCH_03_SUMMARY.reviewRequired === 1, "Batch 03 review_required count is 1");
  assert(BATCH_03_SUMMARY.incomplete === 0, "Batch 03 incomplete count is 0");
  assert(BATCH_03_SUMMARY.notFound === 0, "Batch 03 not_found count is 0");
  assert(
    BATCH_03_ENRICHMENT_RECORDS.length === 49,
    "Batch 03 enrichment records array length is 49",
  );
  assert(PILOT_ENRICHMENT_RECORDS.length === 5, "Pilot records untouched with length 5");
  assert(BATCH_01_ENRICHMENT_RECORDS.length === 44, "Batch 01 records untouched with length 44");
  assert(BATCH_02_ENRICHMENT_RECORDS.length === 42, "Batch 02 records untouched with length 42");
  const batch03Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
  ];
  assert(
    batch03Active.length === 140,
    "Total active enrichment records for Batch 03 baseline is 140 (5 pilot + 44 B01 + 42 B02 + 49 B03)",
  );
}

// ----------------------------------------------------
// 5. Mandatory Provenance Tracking
// ----------------------------------------------------
console.log("\n[5] Testing Mandatory Provenance Coverage across Batch 03...");
{
  const allHaveProvenance = BATCH_03_ENRICHMENT_RECORDS.every(
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
    "All 49 Batch 03 enriched records contain complete verifiable provenance metadata",
  );
  assert(
    BATCH_03_SUMMARY.provenanceCompleteCount === 49,
    "Batch 03 provenance complete count is 49",
  );
}

// ----------------------------------------------------
// 6. 10D Vector Range Bounds Validation
// ----------------------------------------------------
console.log("\n[6] Testing 10D Derivation & Strict [0.0, 1.0] Range Validation...");
{
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  const b03Products = ingestion.products.filter((p) =>
    BATCH_03_ENRICHMENT_RECORDS.some((r) => r.productId === p.id),
  );

  assert(
    b03Products.length === 49,
    `Ingestion matched all 49 Batch 03 products (got ${b03Products.length})`,
  );

  const dimensions = [
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
  for (const p of b03Products) {
    const features = p.derived?.features || p.features;
    if (!features) {
      allBounded = false;
      break;
    }
    for (const d of dimensions) {
      const val = features[d];
      if (typeof val !== "number" || isNaN(val) || val < 0.0 || val > 1.0) {
        allBounded = false;
        console.error(`Out-of-bounds dimension ${d}=${val} for ${p.id}`);
      }
    }
  }

  assert(allBounded, "All 49 Batch 03 10D feature vectors are strictly bounded in [0.0, 1.0]");
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

  // A*Men (Angel Man Mugler)
  const amen = ingestion.products.find((p) => p.id === "abna_angel_man_mugler_elite_134");
  assert(amen !== undefined, "Angel Man record found in Batch 03");
  const amenFeatures = amen?.derived?.features || amen?.features;
  if (amenFeatures) {
    assert(amenFeatures.gourmand >= 0.8, `A*Men gourmand >= 0.80 (got ${amenFeatures.gourmand})`);
    assert(amenFeatures.warmth >= 0.8, `A*Men warmth >= 0.80 (got ${amenFeatures.warmth})`);
    assert(
      amenFeatures.sweetness >= 0.7,
      `A*Men sweetness >= 0.70 (got ${amenFeatures.sweetness})`,
    );
  }

  // Terre d'Hermes
  const tdh = ingestion.products.find((p) => p.id === "abna_terre_d_hermes_hermes_elite_130");
  assert(tdh !== undefined, "Terre d'Hermes record found in Batch 03");
  const tdhFeatures = tdh?.derived?.features || tdh?.features;
  if (tdhFeatures) {
    assert(tdhFeatures.citrus >= 0.7, `Terre d'Hermes citrus >= 0.70 (got ${tdhFeatures.citrus})`);
    assert(tdhFeatures.woody >= 0.7, `Terre d'Hermes woody >= 0.70 (got ${tdhFeatures.woody})`);
    assert(
      tdhFeatures.freshness >= 0.7,
      `Terre d'Hermes freshness >= 0.70 (got ${tdhFeatures.freshness})`,
    );
  }

  // Ultra Male
  const ultraMale = ingestion.products.find(
    (p) => p.id === "abna_ultra_male_jean_paul_gaultier_elite_144",
  );
  assert(ultraMale !== undefined, "Ultra Male record found in Batch 03");
  const umFeatures = ultraMale?.derived?.features || ultraMale?.features;
  if (umFeatures) {
    assert(
      umFeatures.sweetness >= 0.8,
      `Ultra Male sweetness >= 0.80 (got ${umFeatures.sweetness})`,
    );
    assert(umFeatures.gourmand >= 0.6, `Ultra Male gourmand >= 0.60 (got ${umFeatures.gourmand})`);
  }

  // Libre YSL
  const libre = ingestion.products.find((p) => p.id === "abna_libre_ysl_elite_139");
  assert(libre !== undefined, "Libre YSL record found in Batch 03");
  const libreFeatures = libre?.derived?.features || libre?.features;
  if (libreFeatures) {
    assert(libreFeatures.floral >= 0.7, `Libre floral >= 0.70 (got ${libreFeatures.floral})`);
    assert(
      libreFeatures.freshness >= 0.6,
      `Libre freshness >= 0.60 (got ${libreFeatures.freshness})`,
    );
  }
}

// ----------------------------------------------------
// 8. Human Review Queue Integrity
// ----------------------------------------------------
console.log("\n[8] Testing Human Review Queue Integrity...");
{
  assert(BATCH_03_REVIEW_QUEUE.length === 1, "Batch 03 review queue contains exactly 1 item");
  assert(BATCH_03_REVIEW_QUEUE[0].status === "review_required", "Item status is 'review_required'");
  assert(
    BATCH_03_REVIEW_QUEUE[0].productId === "abna_blue_emotion_giorgio_armani_elite_111",
    "Blue Emotion Armani mismatch review item found",
  );
  assert(BATCH_03_REVIEW_QUEUE[0].reason.length > 20, "Review item has clear explanatory reason");
}

// ----------------------------------------------------
// 9. Full Catalog Ingestion with Batch 01, 02, 03 Active Enrichment
// ----------------------------------------------------
console.log("\n[9] Testing Full Catalog Ingestion with Batch 01, 02, 03 Active Enrichment...");
{
  const batch03Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
  ];
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch03Active,
  });

  assert(ingestion.products.length === 497, "Total catalog parsed is 497");
  assert(
    ingestion.report.productsWithEnrichment === 140,
    "Total enriched products is 140 (5 pilot + 44 B01 + 42 B02 + 49 B03)",
  );
  assert(
    ingestion.report.statusBreakdown.validated === 140,
    "All 140 enriched products validated successfully (100%)",
  );
  assert(
    ingestion.report.statusBreakdown.notEnriched === 357,
    "Remaining unenriched products is 357 (497 - 140)",
  );
  assert(
    ingestion.report.validationErrorsCount === 0,
    "Zero validation errors across entire 497 catalog",
  );
  assert(
    ingestion.report.validationWarningsCount === 0,
    "Zero validation warnings across entire 497 catalog",
  );
  assert(
    ingestion.report.unknownTermsSummary.distinctUnknownNotes === 0,
    "Zero unknown notes in active enriched catalog",
  );
  assert(
    ingestion.report.unknownTermsSummary.distinctUnknownAccords === 0,
    "Zero unknown accords in active enriched catalog",
  );
}

// ----------------------------------------------------
// 10. Deterministic Repeatability Check
// ----------------------------------------------------
console.log("\n[10] Testing Deterministic Repeatability...");
{
  const batch03Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
  ];
  const run1 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch03Active,
  });
  const run2 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch03Active,
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
console.log(`BATCH 03 TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
