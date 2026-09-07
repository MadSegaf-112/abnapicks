import { RAW_ABNA_PRODUCTS } from "./src/data/abna/raw";
import { ingestAbnaProducts } from "./src/data/abna/ingestion";
import {
  BATCH_02_ENRICHMENT_RECORDS,
  BATCH_02_REVIEW_QUEUE,
  BATCH_02_SUMMARY,
  ALL_ACTIVE_ENRICHMENT_RECORDS,
  PILOT_ENRICHMENT_RECORDS,
  BATCH_01_ENRICHMENT_RECORDS,
} from "./src/data/abna/enrichment";
import { generateDeterministicProductId } from "./src/data/abna/product-id";
import {
  normalizeBrand,
  normalizeCommercialGender,
  normalizePriceTier,
} from "./src/data/abna/normalization";
import {
  resolveCanonicalNote,
  resolveCanonicalAccord,
  deriveOlfactiveFeatures,
} from "./src/data/olfactive/dictionary";

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedTests++;
  }
}

console.log("==================================================");
console.log("PHASE 6C-3C: ABNA BATCH 02 ENRICHMENT TEST SUITE");
console.log("==================================================");

// ----------------------------------------------------
// TEST GROUP 1: Product Identity Matching & Deterministic IDs
// ----------------------------------------------------
console.log("\n[1] Testing Product Identity Matching & Deterministic IDs...");
{
  const dunhillLondonId = generateDeterministicProductId(
    "Dunhill London",
    "Alfred Dunhill",
    "EXCLUSIVE",
    56,
  );
  assert(
    dunhillLondonId === "abna_dunhill_london_alfred_dunhill_exclusive_56",
    `Deterministic ID match: ${dunhillLondonId}`,
  );

  const erosId = generateDeterministicProductId("Eros Man", "Versace", "EXCLUSIVE", 59);
  assert(erosId === "abna_eros_man_versace_exclusive_59", `Deterministic ID match: ${erosId}`);

  const baccaratId = generateDeterministicProductId(
    "Baccarat 540 Edp",
    "Maison Francis Kurkdjian",
    "VIP",
    100,
  );
  assert(
    baccaratId === "abna_baccarat_540_edp_maison_francis_kurkdjian_vip_100",
    `Deterministic ID match: ${baccaratId}`,
  );
}

// ----------------------------------------------------
// TEST GROUP 2: Brand & Commercial Normalization
// ----------------------------------------------------
console.log("\n[2] Testing Brand & Commercial Metadata Normalization...");
{
  const b1 = normalizeBrand("Avril");
  assert(b1 === "Avril Lavigne", `Brand 'Avril' -> ${b1}`);

  const b2 = normalizeBrand("Britney");
  assert(b2 === "Britney Spears", `Brand 'Britney' -> ${b2}`);

  const b3 = normalizeBrand("Jenifer Lopez");
  assert(b3 === "Jennifer Lopez", `Brand 'Jenifer Lopez' -> ${b3}`);

  const b4 = normalizeBrand("Gwen Stefany");
  assert(b4 === "Gwen Stefani", `Brand 'Gwen Stefany' -> ${b4}`);

  const b5 = normalizeBrand("Cladestine");
  assert(b5 === "Angel Heart", `Brand 'Cladestine' -> ${b5}`);

  const g1 = normalizeCommercialGender("Women", "Japanese Sakura");
  assert(g1.gender === "feminine", `Gender 'Women' -> ${g1.gender}`);

  const g2 = normalizeCommercialGender("Men", "Eros Man");
  assert(g2.gender === "masculine", `Gender 'Men' -> ${g2.gender}`);

  const g3 = normalizeCommercialGender("", "someday");
  assert(g3.gender === "feminine", `Blank gender for Someday -> ${g3.gender} (${g3.genderSource})`);

  const t1 = normalizePriceTier("EXCLUSIVE");
  assert(t1 === "EXCLUSIVE", `Price tier EXCLUSIVE -> ${t1}`);

  const t2 = normalizePriceTier("VIP");
  assert(t2 === "VIP", `Price tier VIP -> ${t2}`);
}

// ----------------------------------------------------
// TEST GROUP 3: Canonical Note & Accord Resolution
// ----------------------------------------------------
console.log("\n[3] Testing Canonical Note & Accord Resolution...");
{
  const n1 = resolveCanonicalNote("Cherry Blossom");
  assert(n1.canonicalKey === "floral notes", `Note 'Cherry Blossom' -> ${n1.canonicalKey}`);

  const n2 = resolveCanonicalNote("Hinoki Wood");
  assert(n2.canonicalKey === "cedarwood", `Note 'Hinoki Wood' -> ${n2.canonicalKey}`);

  const n3 = resolveCanonicalNote("Pomegranate");
  assert(n3.canonicalKey === "pomegranate", `Note 'Pomegranate' -> ${n3.canonicalKey}`);

  const n4 = resolveCanonicalNote("Dark Chocolate");
  assert(n4.canonicalKey === "chocolate", `Note 'Dark Chocolate' -> ${n4.canonicalKey}`);

  const n5 = resolveCanonicalNote("Bamboo");
  assert(n5.canonicalKey === "bamboo", `Note 'Bamboo' -> ${n5.canonicalKey}`);

  const a1 = resolveCanonicalAccord("chocolate");
  assert(
    a1.canonicalKey === "chocolate",
    `Accord 'chocolate' -> ${a1.canonicalKey} (cross_category_note)`,
  );

  const a2 = resolveCanonicalAccord("caramel");
  assert(
    a2.canonicalKey === "caramel",
    `Accord 'caramel' -> ${a2.canonicalKey} (cross_category_note)`,
  );

  const a3 = resolveCanonicalAccord("lactonic");
  assert(
    a3.canonicalKey === "milk",
    `Accord 'lactonic' -> ${a3.canonicalKey} (cross_category_note)`,
  );
}

// ----------------------------------------------------
// TEST GROUP 4: Batch 02 Scope & Status Partitioning
// ----------------------------------------------------
console.log("\n[4] Testing Batch 02 Scope & Status Partitioning...");
{
  assert(BATCH_02_SUMMARY.productsEvaluated === 50, `Batch 02 evaluated exactly 50 products`);
  assert(BATCH_02_SUMMARY.enriched === 42, `Batch 02 enriched count is 42`);
  assert(BATCH_02_SUMMARY.reviewRequired === 4, `Batch 02 review_required count is 4`);
  assert(
    BATCH_02_SUMMARY.incomplete === 4,
    `Batch 02 incomplete count is 4 (Guzel signature blends)`,
  );
  assert(BATCH_02_SUMMARY.notFound === 0, `Batch 02 not_found count is 0`);
  assert(
    BATCH_02_ENRICHMENT_RECORDS.length === 42,
    `Batch 02 enrichment records array length is 42`,
  );
  assert(PILOT_ENRICHMENT_RECORDS.length === 5, `Pilot records untouched with length 5`);
  assert(BATCH_01_ENRICHMENT_RECORDS.length === 44, `Batch 01 records untouched with length 44`);
  const batch02Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
  ];
  assert(
    batch02Active.length === 91,
    `Total active enrichment records for Batch 02 baseline is 91 (5 pilot + 44 Batch 01 + 42 Batch 02)`,
  );
}

// ----------------------------------------------------
// TEST GROUP 5: Mandatory Provenance Coverage
// ----------------------------------------------------
console.log("\n[5] Testing Mandatory Provenance Coverage across Batch 02...");
{
  let allHaveProvenance = true;
  for (const record of BATCH_02_ENRICHMENT_RECORDS) {
    if (
      !record.source ||
      !record.source.provider ||
      !record.source.sourceType ||
      !record.source.retrievedAt ||
      !record.source.verificationStatus ||
      typeof record.source.confidence !== "number"
    ) {
      allHaveProvenance = false;
      console.error(`Missing provenance in: ${record.productId}`);
    }
  }
  assert(
    allHaveProvenance,
    `All 42 Batch 02 enriched records contain complete verifiable provenance metadata`,
  );
  assert(
    BATCH_02_SUMMARY.provenanceCompleteCount === 42,
    `Batch 02 provenance complete count is 42`,
  );
}

// ----------------------------------------------------
// TEST GROUP 6: 10D Derivation & Range Validation
// ----------------------------------------------------
console.log("\n[6] Testing 10D Derivation & Strict [0.0, 1.0] Range Validation...");
{
  let allVectorsValid = true;
  for (const record of BATCH_02_ENRICHMENT_RECORDS) {
    const derived = deriveOlfactiveFeatures({
      topNotes: record.notes?.top || [],
      middleNotes: record.notes?.middle || [],
      baseNotes: record.notes?.base || [],
      accords: record.accords || [],
      performance: record.performance,
    });
    for (const [dim, val] of Object.entries(derived.features)) {
      if (typeof val !== "number" || isNaN(val) || val < 0.0 || val > 1.0) {
        allVectorsValid = false;
        console.error(`Invalid 10D value for ${record.productId} at ${dim}: ${val}`);
      }
    }
  }
  assert(allVectorsValid, `All 42 Batch 02 10D feature vectors are strictly bounded in [0.0, 1.0]`);
}

// ----------------------------------------------------
// TEST GROUP 7: Olfactive Profile Semantic Signatures
// ----------------------------------------------------
console.log("\n[7] Testing Olfactive Characteristic Profiles...");
{
  // Eros Man
  const erosRecord = BATCH_02_ENRICHMENT_RECORDS.find(
    (r) => r.productId === "abna_eros_man_versace_exclusive_59",
  );
  assert(erosRecord !== undefined, "Eros Man record found in Batch 02");
  if (erosRecord) {
    const p = deriveOlfactiveFeatures({
      topNotes: erosRecord.notes?.top || [],
      middleNotes: erosRecord.notes?.middle || [],
      baseNotes: erosRecord.notes?.base || [],
      accords: erosRecord.accords || [],
      performance: erosRecord.performance,
    });
    assert(p.features.freshness >= 0.7, `Eros freshness >= 0.70 (got ${p.features.freshness})`);
    assert(p.features.sweetness >= 0.6, `Eros sweetness >= 0.60 (got ${p.features.sweetness})`);
    assert(
      erosRecord.source.confidence >= 0.95,
      `Eros confidence >= 0.95 (got ${erosRecord.source.confidence})`,
    );
  }

  // Baccarat Rouge 540 Edp
  const baccaratRecord = BATCH_02_ENRICHMENT_RECORDS.find(
    (r) => r.productId === "abna_baccarat_540_edp_maison_francis_kurkdjian_vip_100",
  );
  assert(baccaratRecord !== undefined, "Baccarat 540 record found in Batch 02");
  if (baccaratRecord) {
    const p = deriveOlfactiveFeatures({
      topNotes: baccaratRecord.notes?.top || [],
      middleNotes: baccaratRecord.notes?.middle || [],
      baseNotes: baccaratRecord.notes?.base || [],
      accords: baccaratRecord.accords || [],
      performance: baccaratRecord.performance,
    });
    assert(p.features.woody >= 0.6, `Baccarat 540 woody >= 0.60 (got ${p.features.woody})`);
    assert(p.features.warmth >= 0.6, `Baccarat 540 warmth >= 0.60 (got ${p.features.warmth})`);
    assert(p.features.spicy >= 0.5, `Baccarat 540 spicy >= 0.50 (got ${p.features.spicy})`);
  }

  // Light Blue D&G
  const lightBlueRecord = BATCH_02_ENRICHMENT_RECORDS.find(
    (r) => r.productId === "abna_light_blue_d_g_vip_67",
  );
  assert(lightBlueRecord !== undefined, "Light Blue record found in Batch 02");
  if (lightBlueRecord) {
    const p = deriveOlfactiveFeatures({
      topNotes: lightBlueRecord.notes?.top || [],
      middleNotes: lightBlueRecord.notes?.middle || [],
      baseNotes: lightBlueRecord.notes?.base || [],
      accords: lightBlueRecord.accords || [],
      performance: lightBlueRecord.performance,
    });
    assert(p.features.citrus >= 0.7, `Light Blue citrus >= 0.70 (got ${p.features.citrus})`);
    assert(
      p.features.freshness >= 0.7,
      `Light Blue freshness >= 0.70 (got ${p.features.freshness})`,
    );
  }

  // Choco Musk Al Rehab
  const chocoRecord = BATCH_02_ENRICHMENT_RECORDS.find(
    (r) => r.productId === "abna_choco_musk_al_rehab_vip_70",
  );
  assert(chocoRecord !== undefined, "Choco Musk record found in Batch 02");
  if (chocoRecord) {
    const p = deriveOlfactiveFeatures({
      topNotes: chocoRecord.notes?.top || [],
      middleNotes: chocoRecord.notes?.middle || [],
      baseNotes: chocoRecord.notes?.base || [],
      accords: chocoRecord.accords || [],
      performance: chocoRecord.performance,
    });
    assert(p.features.gourmand >= 0.8, `Choco Musk gourmand >= 0.80 (got ${p.features.gourmand})`);
    assert(
      p.features.sweetness >= 0.8,
      `Choco Musk sweetness >= 0.80 (got ${p.features.sweetness})`,
    );
  }
}

// ----------------------------------------------------
// TEST GROUP 8: Review Queue Verification
// ----------------------------------------------------
console.log("\n[8] Testing Human Review Queue Integrity...");
{
  assert(BATCH_02_REVIEW_QUEUE.length === 8, `Batch 02 review queue contains exactly 8 items`);
  const reviewRequiredItems = BATCH_02_REVIEW_QUEUE.filter((i) => i.status === "review_required");
  const incompleteItems = BATCH_02_REVIEW_QUEUE.filter((i) => i.status === "incomplete");
  assert(reviewRequiredItems.length === 4, `4 items with status 'review_required'`);
  assert(incompleteItems.length === 4, `4 items with status 'incomplete'`);

  const passportItem = BATCH_02_REVIEW_QUEUE.find(
    (i) => i.productId === "abna_passport_paris_hilton_vip_68",
  );
  assert(passportItem !== undefined, "Passport Paris Hilton review item found");
  assert(
    passportItem?.reason.includes("Ambiguous") === true,
    "Passport item has clear disambiguation reason",
  );
}

// ----------------------------------------------------
// TEST GROUP 9: Full Catalog Ingestion with Batch 01 & 02 Active Enrichment
// ----------------------------------------------------
console.log("\n[9] Testing Full Catalog Ingestion with Batch 01 & 02 Active Enrichment...");
{
  const batch02Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
  ];
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch02Active,
  });

  assert(ingestion.products.length === 497, "Total catalog parsed is 497");
  assert(
    ingestion.report.productsWithEnrichment === 91,
    "Total enriched products is 91 (5 pilot + 44 Batch 01 + 42 Batch 02)",
  );
  assert(
    ingestion.report.statusBreakdown.validated === 91,
    "All 91 enriched products validated successfully (100%)",
  );
  assert(
    ingestion.report.statusBreakdown.notEnriched === 406,
    "Remaining unenriched products is 406 (497 - 91)",
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
// TEST GROUP 10: Deterministic Ingestion
// ----------------------------------------------------
console.log("\n[10] Testing Deterministic Repeatability...");
{
  const batch02Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
  ];
  const run1 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch02Active,
  });
  const run2 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch02Active,
  });

  assert(
    run1.report.productsWithEnrichment === run2.report.productsWithEnrichment &&
      run1.report.statusBreakdown.notEnriched === run2.report.statusBreakdown.notEnriched,
    "Consecutive ingestion runs yield identical status breakdown",
  );

  let vectorsIdentical = true;
  for (let i = 0; i < run1.report.productsWithEnrichment; i++) {
    const p1 = run1.products[i];
    const p2 = run2.products[i];
    if (JSON.stringify(p1.olfactiveProfile) !== JSON.stringify(p2.olfactiveProfile)) {
      vectorsIdentical = false;
      break;
    }
  }
  assert(
    vectorsIdentical,
    "Derived 10D feature vectors are 100% byte-for-byte identical across runs",
  );
}

console.log("\n==================================================");
console.log(`BATCH 02 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log("==================================================");

if (failedTests > 0) {
  process.exit(1);
}
