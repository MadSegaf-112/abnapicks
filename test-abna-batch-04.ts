/**
 * Phase 6C-3E: ABNA Batch 04 Olfactive Enrichment Test Suite
 *
 * Validates:
 * 1. Exact product identity matching and deterministic ID generation for Batch 04 (Rows 158 to 207).
 * 2. Brand & commercial metadata normalization.
 * 3. Note and accord resolution against controlled olfactive dictionary.
 * 4. Zero unknown olfactive terms across enriched records.
 * 5. Complete mandatory provenance tracking with verified source URLs and high confidence.
 * 6. 10D feature vector derivation and mathematical boundary compliance ([0.0, 1.0]).
 * 7. Correct olfactive characteristic profiles for iconic fragrances (Rush, Herod, Delox, Khamrah Qahwa, Aventus, Ombre Nomade, Alien, Erba Pura, Man In Black, Arabians Tonka, Angels' Share, CK One).
 * 8. Review queue integrity (3 review_required + 7 incomplete items).
 * 9. Cumulative catalog ingestion with active enrichment (180 active enriched records: 5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04).
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
  BATCH_04_ENRICHMENT_RECORDS,
  BATCH_04_REVIEW_QUEUE,
  BATCH_04_SUMMARY,
  BATCH_01_ENRICHMENT_RECORDS,
  BATCH_02_ENRICHMENT_RECORDS,
  BATCH_03_ENRICHMENT_RECORDS,
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
console.log("PHASE 6C-3E: ABNA BATCH 04 ENRICHMENT TEST SUITE");
console.log("==================================================");

// ----------------------------------------------------
// 1. Product Identity Matching & Deterministic IDs
// ----------------------------------------------------
console.log("\n[1] Testing Product Identity Matching & Deterministic IDs...");
{
  const id1 = generateDeterministicProductId("Rush", "Gucci", "EXCLUSIVE", 158);
  assert(id1 === "abna_rush_gucci_exclusive_158", `Deterministic ID match: ${id1}`);

  const id2 = generateDeterministicProductId("Herod", "Parfums de Marly", "SPECIAL ONE", 163);
  assert(id2 === "abna_herod_parfums_de_marly_special_one_163", `Deterministic ID match: ${id2}`);

  const id3 = generateDeterministicProductId("Ombre Nomade", "Louis Vuitton", "SPECIAL ONE", 168);
  assert(
    id3 === "abna_ombre_nomade_louis_vuitton_special_one_168",
    `Deterministic ID match: ${id3}`,
  );
}

// ----------------------------------------------------
// 2. Brand & Commercial Metadata Normalization
// ----------------------------------------------------
console.log("\n[2] Testing Brand & Commercial Metadata Normalization...");
{
  assert(
    normalizeBrand("Tiziana Terenzi") === "Tiziana Terenzi",
    "Brand 'Tiziana Terenzi' -> Tiziana Terenzi",
  );
  assert(
    normalizeBrand("Louis Vuitton") === "Louis Vuitton",
    "Brand 'Louis Vuitton' -> Louis Vuitton",
  );
  assert(normalizeBrand("LV") === "Louis Vuitton", "Brand 'LV' -> Louis Vuitton");
  assert(normalizeBrand("Elie Saab") === "Elie Saab", "Brand 'Elie Saab' -> Elie Saab");
  assert(normalizeBrand("Montale") === "Montale", "Brand 'Montale' -> Montale");
  assert(normalizeBrand("By Killian") === "Kilian", "Brand 'By Killian' -> Kilian");
  assert(normalizeBrand("Marc Jacobs") === "Marc Jacobs", "Brand 'Marc Jacobs' -> Marc Jacobs");
  assert(normalizeBrand("Xerjoff") === "Xerjoff", "Brand 'Xerjoff' -> Xerjoff");

  assert(
    normalizeCommercialGender("Women", "Rush").gender === "feminine",
    "Gender 'Women' -> feminine",
  );
  assert(
    normalizeCommercialGender("Men", "Herod").gender === "masculine",
    "Gender 'Men' -> masculine",
  );
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
  const n1 = resolveCanonicalNote("Chestnut");
  assert(n1.canonicalKey === "hazelnut", "Note 'Chestnut' -> hazelnut");

  const n2 = resolveCanonicalNote("Iso E Super");
  assert(n2.canonicalKey === "woody notes", "Note 'Iso E Super' -> woody notes");

  const n3 = resolveCanonicalNote("Smoke");
  assert(n3.canonicalKey === "incense", "Note 'Smoke' -> incense");

  const n4 = resolveCanonicalNote("Cumin");
  assert(n4.canonicalKey === "cinnamon", "Note 'Cumin' -> cinnamon");

  const n5 = resolveCanonicalNote("Cognac");
  assert(n5.canonicalKey === "rum", "Note 'Cognac' -> rum");

  const n6 = resolveCanonicalNote("Stephanotis");
  assert(n6.canonicalKey === "floral notes", "Note 'Stephanotis' -> floral notes");

  const n7 = resolveCanonicalNote("Ambrette");
  assert(n7.canonicalKey === "musk", "Note 'Ambrette' -> musk");

  const n8 = resolveCanonicalNote("Guava");
  assert(n8.canonicalKey === "fruity notes", "Note 'Guava' -> fruity notes");

  const a1 = resolveCanonicalAccord("sour cherry");
  assert(a1.canonicalKey === "cherry", "Accord 'sour cherry' -> cherry");

  const a2 = resolveCanonicalAccord("conifer");
  assert(a2.canonicalKey === "pine", "Accord 'conifer' -> pine");

  const a3 = resolveCanonicalAccord("almond");
  assert(a3.canonicalKey === "almond", "Accord 'almond' -> almond");
}

// ----------------------------------------------------
// 4. Batch 04 Scope & Status Partitioning
// ----------------------------------------------------
console.log("\n[4] Testing Batch 04 Scope & Status Partitioning...");
{
  assert(BATCH_04_SUMMARY.productsEvaluated === 50, "Batch 04 evaluated exactly 50 products");
  assert(BATCH_04_SUMMARY.enriched === 40, "Batch 04 enriched count is 40");
  assert(BATCH_04_SUMMARY.reviewRequired === 3, "Batch 04 review_required count is 3");
  assert(BATCH_04_SUMMARY.incomplete === 7, "Batch 04 incomplete count is 7");
  assert(BATCH_04_SUMMARY.notFound === 0, "Batch 04 not_found count is 0");
  assert(
    BATCH_04_ENRICHMENT_RECORDS.length === 40,
    "Batch 04 enrichment records array length is 40",
  );
  assert(PILOT_ENRICHMENT_RECORDS.length === 5, "Pilot records untouched with length 5");
  assert(BATCH_01_ENRICHMENT_RECORDS.length === 44, "Batch 01 records untouched with length 44");
  assert(BATCH_03_ENRICHMENT_RECORDS.length === 49, "Batch 03 records untouched with length 49");
  const batch04Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
    ...BATCH_04_ENRICHMENT_RECORDS,
  ];
  assert(
    batch04Active.length === 180,
    "Total active enrichment records for Batch 04 baseline is 180 (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04)",
  );
}

// ----------------------------------------------------
// 5. Mandatory Provenance Tracking
// ----------------------------------------------------
console.log("\n[5] Testing Mandatory Provenance Coverage across Batch 04...");
{
  const allHaveProvenance = BATCH_04_ENRICHMENT_RECORDS.every(
    (record) =>
      record.source &&
      record.source.provider &&
      record.source.sourceUrl &&
      record.source.sourceUrl.startsWith("https://www.fragrantica.com/perfume/") &&
      record.source.confidence >= 0.95 &&
      record.source.notesVerified === true &&
      record.source.verificationStatus === "verified",
  );
  assert(
    allHaveProvenance,
    "All 40 Batch 04 enriched records contain complete verifiable provenance metadata",
  );
  assert(
    BATCH_04_SUMMARY.provenanceCompleteCount === 40,
    "Batch 04 provenance complete count is 40",
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

  const b04Products = ingestion.products.filter((p) =>
    BATCH_04_ENRICHMENT_RECORDS.some((r) => r.productId === p.id),
  );

  assert(
    b04Products.length === 40,
    `Ingestion matched all 40 Batch 04 products (got ${b04Products.length})`,
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
  for (const p of b04Products) {
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

  assert(allBounded, "All 40 Batch 04 10D feature vectors are strictly bounded in [0.0, 1.0]");
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

  // Herod (Parfums de Marly)
  const herod = ingestion.products.find(
    (p) => p.id === "abna_herod_parfums_de_marly_special_one_163",
  );
  assert(herod !== undefined, "Herod record found in Batch 04");
  const herodFeatures = herod?.derived?.features || herod?.features;
  if (herodFeatures) {
    assert(herodFeatures.warmth >= 0.8, `Herod warmth >= 0.80 (got ${herodFeatures.warmth})`);
    assert(herodFeatures.spicy >= 0.7, `Herod spicy >= 0.70 (got ${herodFeatures.spicy})`);
    assert(herodFeatures.woody >= 0.7, `Herod woody >= 0.70 (got ${herodFeatures.woody})`);
  }

  // Ombre Nomade (Louis Vuitton)
  const ombreNomade = ingestion.products.find(
    (p) => p.id === "abna_ombre_nomade_louis_vuitton_special_one_168",
  );
  assert(ombreNomade !== undefined, "Ombre Nomade record found in Batch 04");
  const onFeatures = ombreNomade?.derived?.features || ombreNomade?.features;
  if (onFeatures) {
    assert(onFeatures.woody >= 0.8, `Ombre Nomade woody >= 0.80 (got ${onFeatures.woody})`);
    assert(onFeatures.warmth >= 0.8, `Ombre Nomade warmth >= 0.80 (got ${onFeatures.warmth})`);
    assert(
      onFeatures.intensity >= 0.7,
      `Ombre Nomade intensity >= 0.70 (got ${onFeatures.intensity})`,
    );
  }

  // Alien (Mugler)
  const alien = ingestion.products.find((p) => p.id === "abna_alien_mugler_the_nature_179");
  assert(alien !== undefined, "Alien record found in Batch 04");
  const alienFeatures = alien?.derived?.features || alien?.features;
  if (alienFeatures) {
    assert(alienFeatures.floral >= 0.8, `Alien floral >= 0.80 (got ${alienFeatures.floral})`);
    assert(alienFeatures.warmth >= 0.7, `Alien warmth >= 0.70 (got ${alienFeatures.warmth})`);
  }

  // CK One (Calvin Klein)
  const ckOne = ingestion.products.find((p) => p.id === "abna_one_calvin_klein_vip_193");
  assert(ckOne !== undefined, "CK One record found in Batch 04");
  const ckOneFeatures = ckOne?.derived?.features || ckOne?.features;
  if (ckOneFeatures) {
    assert(ckOneFeatures.citrus >= 0.7, `CK One citrus >= 0.70 (got ${ckOneFeatures.citrus})`);
    assert(
      ckOneFeatures.freshness >= 0.8,
      `CK One freshness >= 0.80 (got ${ckOneFeatures.freshness})`,
    );
  }
}

// ----------------------------------------------------
// 8. Human Review Queue Integrity
// ----------------------------------------------------
console.log("\n[8] Testing Human Review Queue Integrity...");
{
  assert(BATCH_04_REVIEW_QUEUE.length === 10, "Batch 04 review queue contains exactly 10 items");
  const reviewRequiredItems = BATCH_04_REVIEW_QUEUE.filter((i) => i.status === "review_required");
  const incompleteItems = BATCH_04_REVIEW_QUEUE.filter((i) => i.status === "incomplete");
  assert(reviewRequiredItems.length === 3, "3 items with status 'review_required'");
  assert(incompleteItems.length === 7, "7 items with status 'incomplete'");

  const inLeather = BATCH_04_REVIEW_QUEUE.find(
    (i) => i.productId === "abna_in_leather_giorgio_armani_the_nature_171",
  );
  assert(inLeather !== undefined, "In Leather Armani mismatch review item found");

  const gaharu = BATCH_04_REVIEW_QUEUE.find(
    (i) => i.productId === "abna_gaharu_gaharu_special_one_205",
  );
  assert(gaharu !== undefined, "Gaharu single-origin oil incomplete item found");
}

// ----------------------------------------------------
// 9. Full Catalog Ingestion with Active Enrichment
// ----------------------------------------------------
console.log("\n[9] Testing Full Catalog Ingestion with Active Enrichment (180 products)...");
{
  const batch04Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
    ...BATCH_04_ENRICHMENT_RECORDS,
  ];
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch04Active,
  });

  assert(ingestion.products.length === 497, "Total catalog parsed is 497");
  assert(
    ingestion.report.productsWithEnrichment === 180,
    "Total enriched products is 180 (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04)",
  );
  assert(
    ingestion.report.statusBreakdown.validated === 180,
    "All 180 enriched products validated successfully (100%)",
  );
  assert(
    ingestion.report.statusBreakdown.notEnriched === 317,
    "Remaining unenriched products is 317 (497 - 180)",
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
  const batch04Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
    ...BATCH_04_ENRICHMENT_RECORDS,
  ];
  const run1 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch04Active,
  });
  const run2 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch04Active,
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
console.log(`BATCH 04 TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
