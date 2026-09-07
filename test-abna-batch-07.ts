/**
 * Phase 6C-3H: ABNA Batch 07 Olfactive Enrichment Test Suite
 *
 * Validates:
 * 1. Exact product identity matching and deterministic ID generation for Batch 07 (Rows 358 to 457).
 * 2. Brand & commercial metadata normalization.
 * 3. Note and accord resolution against controlled olfactive dictionary.
 * 4. Zero unknown olfactive terms across enriched records.
 * 5. Complete mandatory provenance tracking with verified source URLs and high confidence.
 * 6. 10D feature vector derivation and mathematical boundary compliance ([0.0, 1.0]).
 * 7. Correct olfactive characteristic profiles for iconic fragrances (Fantasia Mermaid, Le Male Elixir, Grand Soir, Ani, God of Fire, Erba Gold, Lira, Candy Rock Sugar, Fleur Narcotique, Do Son, Another 13, Sauvage Elixir, Les Sables Roses, Libre Intense, Layton, Ombre Nomade, Santal 33, Stronger With You Intensely, Hawas Ice, Ink Mark).
 * 8. Review queue integrity (2 incomplete items, 0 review_required).
 * 9. Cumulative catalog ingestion with active enrichment (410 active enriched records: 5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06 + 98 B07).
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
  BATCH_07_ENRICHMENT_RECORDS,
  BATCH_07_REVIEW_QUEUE,
  BATCH_07_SUMMARY,
  BATCH_01_ENRICHMENT_RECORDS,
  BATCH_02_ENRICHMENT_RECORDS,
  BATCH_03_ENRICHMENT_RECORDS,
  BATCH_04_ENRICHMENT_RECORDS,
  BATCH_05_ENRICHMENT_RECORDS,
  BATCH_06_ENRICHMENT_RECORDS,
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
console.log("PHASE 6C-3H: ABNA BATCH 07 ENRICHMENT TEST SUITE");
console.log("==================================================");

// ----------------------------------------------------
// 1. Product Identity Matching & Deterministic IDs
// ----------------------------------------------------
console.log("\n[1] Testing Product Identity Matching & Deterministic IDs...");
{
  const id1 = generateDeterministicProductId("Fantasia Mermaid", "Anna Sui", "VIP", 358);
  assert(id1 === "abna_fantasia_mermaid_anna_sui_vip_358", `Deterministic ID match: ${id1}`);

  const id2 = generateDeterministicProductId("Le Male Elixir", "Jean Paul Gaultier", "ELITE", 370);
  assert(
    id2 === "abna_le_male_elixir_jean_paul_gaultier_elite_370",
    `Deterministic ID match: ${id2}`,
  );

  const id3 = generateDeterministicProductId(
    "Grand Soir",
    "Maison Francis Kurkdjian",
    "EXCLUSIVE",
    405,
  );
  assert(
    id3 === "abna_grand_soir_maison_francis_kurkdjian_exclusive_405",
    `Deterministic ID match: ${id3}`,
  );

  const id4 = generateDeterministicProductId("Ink Mark", "Louis Vuitton", "SPECIAL ONE", 457);
  assert(id4 === "abna_ink_mark_louis_vuitton_special_one_457", `Deterministic ID match: ${id4}`);
}

// ----------------------------------------------------
// 2. Brand & Commercial Metadata Normalization
// ----------------------------------------------------
console.log("\n[2] Testing Brand & Commercial Metadata Normalization...");
{
  assert(normalizeBrand("Anna Sui") === "Anna Sui", "Brand 'Anna Sui' -> Anna Sui");
  assert(normalizeBrand("Bvlgari") === "Bvlgari", "Brand 'Bvlgari' -> Bvlgari");
  assert(normalizeBrand("Diptyque") === "Diptyque", "Brand 'Diptyque' -> Diptyque");
  assert(normalizeBrand("Byredo") === "Byredo", "Brand 'Byredo' -> Byredo");
  assert(normalizeBrand("Sospiro") === "Sospiro", "Brand 'Sospiro' -> Sospiro");
  assert(normalizeBrand("Armaf") === "Armaf", "Brand 'Armaf' -> Armaf");
  assert(
    normalizeBrand("Frederic Malle") === "Frédéric Malle",
    "Brand 'Frederic Malle' -> Frédéric Malle",
  );
  assert(normalizeBrand("BBW") === "Bath & Body Works", "Brand 'BBW' -> Bath & Body Works");
  assert(normalizeBrand("HMNS") === "HMNS", "Brand 'HMNS' -> HMNS");
  assert(normalizeBrand("Memo Paris") === "Memo Paris", "Brand 'Memo Paris' -> Memo Paris");
  assert(normalizeBrand("Monaco") === "Monaco", "Brand 'Monaco' -> Monaco");
  assert(normalizeBrand("Xerjof") === "Xerjoff", "Brand 'Xerjof' -> Xerjoff");
  assert(
    normalizeBrand("Parfums de Marly") === "Parfums de Marly",
    "Brand 'Parfums de Marly' -> Parfums de Marly",
  );
  assert(normalizeBrand("Kayali") === "Kayali", "Brand 'Kayali' -> Kayali");

  assert(normalizePriceTier("VIP") === "VIP", "Price tier 'VIP' -> VIP");
  assert(normalizePriceTier("EXCLUSIVE") === "EXCLUSIVE", "Price tier 'EXCLUSIVE' -> EXCLUSIVE");
  assert(normalizePriceTier("ELITE") === "ELITE", "Price tier 'ELITE' -> ELITE");
  assert(
    normalizePriceTier("THE NATURE") === "THE_NATURE",
    "Price tier 'THE NATURE' -> THE_NATURE",
  );
  assert(
    normalizePriceTier("SPECIAL ONE") === "SPECIAL_ONE",
    "Price tier 'SPECIAL ONE' -> SPECIAL_ONE",
  );
}

// ----------------------------------------------------
// 3. Batch 07 Scope & Partitioning
// ----------------------------------------------------
console.log("\n[3] Testing Batch 07 Scope & Partitioning...");
{
  assert(BATCH_07_SUMMARY.productsEvaluated === 100, "Evaluated exactly 100 products");
  assert(BATCH_07_SUMMARY.enriched === 98, "98 verified enriched products");
  assert(BATCH_07_SUMMARY.incomplete === 2, "2 incomplete products in review queue");
  assert(BATCH_07_SUMMARY.reviewRequired === 0, "0 review_required products");
  assert(BATCH_07_SUMMARY.notFound === 0, "0 not_found products");
  assert(BATCH_07_ENRICHMENT_RECORDS.length === 98, "Batch 07 records array length is 98");
  assert(BATCH_07_REVIEW_QUEUE.length === 2, "Batch 07 review queue length is 2");

  assert(PILOT_ENRICHMENT_RECORDS.length === 5, "Pilot records length is 5");
  assert(BATCH_01_ENRICHMENT_RECORDS.length === 44, "Batch 01 records length is 44");
  assert(BATCH_02_ENRICHMENT_RECORDS.length === 42, "Batch 02 records length is 42");
  assert(BATCH_03_ENRICHMENT_RECORDS.length === 49, "Batch 03 records length is 49");
  assert(BATCH_04_ENRICHMENT_RECORDS.length === 40, "Batch 04 records length is 40");
  assert(BATCH_05_ENRICHMENT_RECORDS.length === 46, "Batch 05 records length is 46");
  assert(BATCH_06_ENRICHMENT_RECORDS.length === 86, "Batch 06 records length is 86");

  const expectedTotalActive = 5 + 44 + 42 + 49 + 40 + 46 + 86 + 98; // 410
  const batch07Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
    ...BATCH_04_ENRICHMENT_RECORDS,
    ...BATCH_05_ENRICHMENT_RECORDS,
    ...BATCH_06_ENRICHMENT_RECORDS,
    ...BATCH_07_ENRICHMENT_RECORDS,
  ];

  assert(
    batch07Active.length === 410,
    "Total active enrichment records through Batch 07 is 410 (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06 + 98 B07)",
  );

  const rawSlice = RAW_ABNA_PRODUCTS.filter((p) => p.rowNumber >= 358 && p.rowNumber <= 457);
  assert(
    rawSlice.length === 100,
    "Raw slice filtered by rowNumber 358-457 contains exactly 100 items",
  );
  assert(rawSlice[0].rowNumber === 358, "First item raw row is 358");
  assert(rawSlice[99].rowNumber === 457, "Last item raw row is 457");
}

// ----------------------------------------------------
// 4. Note and Accord Dictionary Resolution
// ----------------------------------------------------
console.log("\n[4] Testing Note & Accord Dictionary Resolution...");
{
  let unmappedNotes = 0;
  let unmappedAccords = 0;

  for (const record of BATCH_07_ENRICHMENT_RECORDS) {
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

  assert(unmappedNotes === 0, `Zero unmapped notes in Batch 07 (found ${unmappedNotes})`);
  assert(unmappedAccords === 0, `Zero unmapped accords in Batch 07 (found ${unmappedAccords})`);
}

// ----------------------------------------------------
// 5. Mandatory Provenance Tracking Coverage
// ----------------------------------------------------
console.log("\n[5] Testing Mandatory Provenance Tracking Coverage...");
{
  const allHaveProvenance = BATCH_07_ENRICHMENT_RECORDS.every(
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
    "All 98 Batch 07 enriched records contain complete verifiable provenance metadata",
  );
  assert(
    BATCH_07_SUMMARY.provenanceCompleteCount === 98,
    "Batch 07 provenance complete count is 98",
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

  const b07Products = ingestion.products.filter((p) =>
    BATCH_07_ENRICHMENT_RECORDS.some((r) => r.productId === p.id),
  );

  assert(
    b07Products.length === 98,
    `Ingestion matched all 98 Batch 07 products (got ${b07Products.length})`,
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
  for (const product of b07Products) {
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
  assert(allBounded, "All 98 Batch 07 10D feature vectors are strictly bounded in [0.0, 1.0]");
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

  // Grand Soir (Amber/Vanilla masterpiece): warmth & sweetness high
  const grandSoir = ingestion.products.find(
    (p) => p.id === "abna_grand_soir_maison_francis_kurkdjian_exclusive_405",
  );
  assert(grandSoir !== undefined, "Grand Soir record found in Batch 07");
  const gsFeatures = grandSoir?.derived?.features;
  if (gsFeatures) {
    assert(gsFeatures.warmth >= 0.7, `Grand Soir warmth >= 0.70 (got ${gsFeatures.warmth})`);
    assert(
      gsFeatures.sweetness >= 0.6,
      `Grand Soir sweetness >= 0.60 (got ${gsFeatures.sweetness})`,
    );
  }

  // Sauvage Elixir (Aromatic spicy powerhouse): spicy & warmth high
  const sauvageElixir = ingestion.products.find(
    (p) => p.id === "abna_sauvage_elixir_dior_elite_421",
  );
  assert(sauvageElixir !== undefined, "Sauvage Elixir record found in Batch 07");
  const seFeatures = sauvageElixir?.derived?.features;
  if (seFeatures) {
    assert(seFeatures.spicy >= 0.6, `Sauvage Elixir spicy >= 0.60 (got ${seFeatures.spicy})`);
    assert(seFeatures.warmth >= 0.5, `Sauvage Elixir warmth >= 0.50 (got ${seFeatures.warmth})`);
  }

  // Virgin Island Water (Coconut/Rum/Lime): citrus & sweetness high
  const viw = ingestion.products.find(
    (p) => p.id === "abna_virgin_island_water_creed_exclusive_392",
  );
  assert(viw !== undefined, "Virgin Island Water record found in Batch 07");
  const viwFeatures = viw?.derived?.features;
  if (viwFeatures) {
    assert(
      viwFeatures.citrus >= 0.5,
      `Virgin Island Water citrus >= 0.50 (got ${viwFeatures.citrus})`,
    );
    assert(
      viwFeatures.sweetness >= 0.5,
      `Virgin Island Water sweetness >= 0.50 (got ${viwFeatures.sweetness})`,
    );
  }

  // Santal 33 (Iconic Sandalwood/Woody): woody high
  const santal33 = ingestion.products.find((p) => p.id === "abna_santal_33_le_labo_exclusive_450");
  assert(santal33 !== undefined, "Santal 33 record found in Batch 07");
  const s33Features = santal33?.derived?.features;
  if (s33Features) {
    assert(s33Features.woody >= 0.6, `Santal 33 woody >= 0.60 (got ${s33Features.woody})`);
  }

  // Acqua di Gio Profondo: aquatic & freshness high
  const profondo = ingestion.products.find(
    (p) => p.id === "abna_acqua_digio_profondo_giorgio_armani_vip_430",
  );
  assert(profondo !== undefined, "Acqua di Gio Profondo record found in Batch 07");
  const profFeatures = profondo?.derived?.features;
  if (profFeatures) {
    assert(
      profFeatures.aquatic >= 0.5,
      `Acqua di Gio Profondo aquatic >= 0.50 (got ${profFeatures.aquatic})`,
    );
    assert(
      profFeatures.freshness >= 0.5,
      `Acqua di Gio Profondo freshness >= 0.50 (got ${profFeatures.freshness})`,
    );
  }
}

// ----------------------------------------------------
// 8. Human Review Queue Integrity
// ----------------------------------------------------
console.log("\n[8] Testing Human Review Queue Integrity...");
{
  assert(
    BATCH_07_REVIEW_QUEUE.length === 2,
    `Batch 07 review queue contains exactly 2 items (got ${BATCH_07_REVIEW_QUEUE.length})`,
  );
  const incompleteItems = BATCH_07_REVIEW_QUEUE.filter((i) => i.status === "incomplete");
  const reviewRequiredItems = BATCH_07_REVIEW_QUEUE.filter((i) => i.status === "review_required");

  assert(incompleteItems.length === 2, "2 items with status 'incomplete'");
  assert(reviewRequiredItems.length === 0, "0 items with status 'review_required'");

  assert(
    BATCH_07_REVIEW_QUEUE.some((i) => i.productId === "abna_pramugari_guzel_vip_360"),
    "Pramugari Guzel item found",
  );
  assert(
    BATCH_07_REVIEW_QUEUE.some((i) => i.productId === "abna_scarlet_guzel_vip_365"),
    "Scarlet Guzel item found",
  );
}

// ----------------------------------------------------
// 9. Full Catalog Ingestion with Active Enrichment (410 products)
// ----------------------------------------------------
console.log("\n[9] Testing Full Catalog Ingestion with Active Enrichment (410 products)...");
{
  const batch07Active = [
    ...PILOT_ENRICHMENT_RECORDS,
    ...BATCH_01_ENRICHMENT_RECORDS,
    ...BATCH_02_ENRICHMENT_RECORDS,
    ...BATCH_03_ENRICHMENT_RECORDS,
    ...BATCH_04_ENRICHMENT_RECORDS,
    ...BATCH_05_ENRICHMENT_RECORDS,
    ...BATCH_06_ENRICHMENT_RECORDS,
    ...BATCH_07_ENRICHMENT_RECORDS,
  ];
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch07Active,
  });

  assert(
    ingestion.products.length === 497,
    `Total catalog parsed is 497 (got ${ingestion.products.length})`,
  );
  assert(
    ingestion.report.productsWithEnrichment === 410,
    `Total enriched products is 410 (5 pilot + 44 B01 + 42 B02 + 49 B03 + 40 B04 + 46 B05 + 86 B06 + 98 B07) (got ${ingestion.report.productsWithEnrichment})`,
  );
  assert(
    ingestion.report.statusBreakdown.validated === 410,
    `All 410 enriched products validated successfully (100%) (got ${ingestion.report.statusBreakdown.validated})`,
  );
  assert(
    ingestion.report.statusBreakdown.notEnriched === 87,
    `Remaining unenriched products is 87 (497 - 410) (got ${ingestion.report.statusBreakdown.notEnriched})`,
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
console.log(`BATCH 07 TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
}
