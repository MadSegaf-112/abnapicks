import { RAW_ABNA_PRODUCTS } from "./src/data/abna/raw";
import { ingestAbnaProducts } from "./src/data/abna/ingestion";
import {
  PILOT_ENRICHMENT_RECORDS,
  BATCH_01_ENRICHMENT_RECORDS,
  ALL_ACTIVE_ENRICHMENT_RECORDS,
  BATCH_01_REVIEW_QUEUE,
  BATCH_01_SUMMARY,
} from "./src/data/abna/enrichment";
import {
  deriveOlfactiveFeatures,
  resolveCanonicalNote,
  resolveCanonicalAccord,
  resolveNoteList,
  resolveAccordList,
  normalizeOlfactiveTerm,
} from "./src/data/olfactive/dictionary";
import {
  normalizeBrand,
  normalizeCommercialGender,
  normalizePriceTier,
} from "./src/data/abna/normalization";
import { generateDeterministicProductId } from "./src/data/abna/product-id";
import { ABNA_ENRICHMENT_REVIEW_QUEUE } from "./src/data/abna/review/enrichment-review";

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failCount++;
  }
}

console.log("==================================================");
console.log("PHASE 6C-3B: ABNA BATCH 01 ENRICHMENT TEST SUITE");
console.log("==================================================");

// ----------------------------------------------------
// 1. Product Identity Matching & Deterministic IDs
// ----------------------------------------------------
console.log("\n[1] Testing Product Identity Matching & Deterministic IDs...");
{
  const id1 = generateDeterministicProductId("Secret Wish", "Anna Sui", "EXCLUSIVE", 4);
  assert(id1 === "abna_secret_wish_anna_sui_exclusive_4", `Deterministic ID match: ${id1}`);

  const id2 = generateDeterministicProductId("Cool Water Man", "Davidoff", "EXCLUSIVE", 6);
  assert(id2 === "abna_cool_water_man_davidoff_exclusive_6", `Deterministic ID match: ${id2}`);

  const id3 = generateDeterministicProductId("Aventus", "Creed", "EXCLUSIVE", 47);
  assert(id3 === "abna_aventus_creed_exclusive_47", `Deterministic ID match: ${id3}`);
}

// ----------------------------------------------------
// 2. Brand & Gender Normalization
// ----------------------------------------------------
console.log("\n[2] Testing Brand & Commercial Metadata Normalization...");
{
  assert(normalizeBrand("Katty Pery") === "Katy Perry", "Brand 'Katty Pery' -> Katy Perry");
  assert(normalizeBrand("Escana") === "Escada", "Brand 'Escana' -> Escada");
  assert(normalizeBrand("D&G") === "Dolce & Gabbana", "Brand 'D&G' -> Dolce & Gabbana");
  assert(
    normalizeBrand("Salvatore Feragamo") === "Salvatore Ferragamo",
    "Brand 'Salvatore Feragamo' -> Salvatore Ferragamo",
  );
  assert(normalizeBrand("Aigner") === "Etienne Aigner", "Brand 'Aigner' -> Etienne Aigner");

  const g1 = normalizeCommercialGender("Women", "Secret Wish");
  assert(
    g1.gender === "feminine" && g1.genderSource === "official",
    "Gender 'Women' -> feminine (official)",
  );

  const g2 = normalizeCommercialGender("Men", "Cool Water Man");
  assert(
    g2.gender === "masculine" && g2.genderSource === "official",
    "Gender 'Men' -> masculine (official)",
  );

  const g3 = normalizeCommercialGender("", "Red Vanilla");
  assert(
    g3.gender === "feminine" && g3.genderSource === "inferred_default",
    "Blank gender for Red Vanilla -> feminine (inferred_default)",
  );

  assert(normalizePriceTier("EXCLUSIVE") === "EXCLUSIVE", "Price tier EXCLUSIVE -> EXCLUSIVE");
  assert(normalizePriceTier("VIP") === "VIP", "Price tier VIP -> VIP");
  assert(normalizePriceTier("ELITE") === "ELITE", "Price tier ELITE -> ELITE");
}

// ----------------------------------------------------
// 3. Canonical Note & Accord Resolution
// ----------------------------------------------------
console.log("\n[3] Testing Canonical Note & Accord Resolution...");
{
  const n1 = resolveCanonicalNote("Calabrian Bergamot");
  assert(n1.canonicalKey === "bergamot", "Note 'Calabrian Bergamot' -> bergamot");

  const n2 = resolveCanonicalNote("White Cedar Extract");
  assert(n2.canonicalKey === "cedarwood", "Note 'White Cedar Extract' -> cedarwood");

  const n3 = resolveCanonicalNote("Damask Rose");
  assert(n3.canonicalKey === "rose", "Note 'Damask Rose' -> rose");

  const n4 = resolveCanonicalNote("Siam Benzoin");
  assert(n4.canonicalKey === "benzoin", "Note 'Siam Benzoin' -> benzoin");

  const n5 = resolveCanonicalNote("Matcha Tea");
  assert(n5.canonicalKey === "tea", "Note 'Matcha Tea' -> tea");

  const n6 = resolveCanonicalNote("Oakmoss");
  assert(n6.canonicalKey === "oakmoss", "Note 'Oakmoss' -> oakmoss");

  const a1 = resolveCanonicalAccord("tropical");
  assert(
    a1.canonicalKey === "tropical" && a1.resolvedType === "accord",
    "Accord 'tropical' -> tropical (accord)",
  );

  const a2 = resolveCanonicalAccord("rose");
  assert(
    a2.canonicalKey === "rose" && a2.resolvedType === "cross_category_note",
    "Accord 'rose' -> rose (cross_category_note)",
  );

  const a3 = resolveCanonicalAccord("champagne");
  assert(
    a3.canonicalKey === "aldehydes" && a3.resolvedType === "cross_category_note",
    "Accord 'champagne' -> aldehydes (cross_category_note)",
  );
}

// ----------------------------------------------------
// 4. Batch 01 Scope & Partitioning
// ----------------------------------------------------
console.log("\n[4] Testing Batch 01 Scope & Status Partitioning...");
{
  assert(BATCH_01_SUMMARY.productsEvaluated === 50, "Batch 01 evaluated exactly 50 products");
  assert(BATCH_01_SUMMARY.enriched === 44, "Batch 01 enriched count is 44");
  assert(BATCH_01_SUMMARY.reviewRequired === 1, "Batch 01 review_required count is 1 (Aigner XXX)");
  assert(
    BATCH_01_SUMMARY.incomplete === 5,
    "Batch 01 incomplete count is 5 (Guzel/Kasturi Korma internal blends)",
  );
  assert(BATCH_01_SUMMARY.notFound === 0, "Batch 01 not_found count is 0");
  assert(
    BATCH_01_ENRICHMENT_RECORDS.length === 44,
    "Batch 01 enrichment records array length is 44",
  );
  assert(PILOT_ENRICHMENT_RECORDS.length === 5, "Pilot records untouched with length 5");
  const batch01Active = [...PILOT_ENRICHMENT_RECORDS, ...BATCH_01_ENRICHMENT_RECORDS];
  assert(
    batch01Active.length === 49,
    "Total active enrichment records for Batch 01 baseline is 49 (5 pilot + 44 Batch 01)",
  );
}

// ----------------------------------------------------
// 5. Mandatory Provenance Validation
// ----------------------------------------------------
console.log("\n[5] Testing Mandatory Provenance Coverage across Batch 01...");
{
  let allProvenanceValid = true;
  for (const rec of BATCH_01_ENRICHMENT_RECORDS) {
    if (
      !rec.source.provider ||
      !rec.source.source ||
      !rec.source.sourceUrl ||
      !rec.source.sourceType ||
      !rec.source.retrievedAt ||
      !rec.source.matchingMethod ||
      typeof rec.source.confidence !== "number" ||
      rec.source.notesVerified !== true
    ) {
      allProvenanceValid = false;
      console.error(`Invalid provenance for record: ${rec.productId}`);
    }
  }
  assert(
    allProvenanceValid,
    "All 44 Batch 01 enriched records contain complete verifiable provenance metadata",
  );
  assert(
    BATCH_01_SUMMARY.provenanceCompleteCount === 44,
    "Batch 01 provenance complete count is 44",
  );
}

// ----------------------------------------------------
// 6. 10D Derivation & Range Validation
// ----------------------------------------------------
console.log("\n[6] Testing 10D Derivation & Strict [0.0, 1.0] Range Validation...");
{
  let allBounded = true;
  for (const rec of BATCH_01_ENRICHMENT_RECORDS) {
    const result = deriveOlfactiveFeatures({
      topNotes: rec.notes?.top || [],
      middleNotes: rec.notes?.middle || [],
      baseNotes: rec.notes?.base || [],
      accords: rec.accords || [],
      performance: rec.performance,
    });

    for (const [dim, val] of Object.entries(result.features)) {
      if (typeof val !== "number" || isNaN(val) || val < 0.0 || val > 1.0) {
        allBounded = false;
        console.error(`Dimension '${dim}' out of bounds for ${rec.productId}: ${val}`);
      }
    }
  }
  assert(allBounded, "All 44 Batch 01 10D feature vectors are strictly bounded in [0.0, 1.0]");
}

// ----------------------------------------------------
// 7. Olfactive Quality Profiles for Key Fragrances
// ----------------------------------------------------
console.log("\n[7] Testing Olfactive Characteristic Profiles...");
{
  // Aventus: Chypre Fruity (Fruity, Woody, Smoky)
  const aventusRec = BATCH_01_ENRICHMENT_RECORDS.find(
    (r) => r.productId === "abna_aventus_creed_exclusive_47",
  );
  assert(aventusRec !== undefined, "Aventus record found in Batch 01");
  if (aventusRec) {
    const aventusDeriv = deriveOlfactiveFeatures({
      topNotes: aventusRec.notes?.top || [],
      middleNotes: aventusRec.notes?.middle || [],
      baseNotes: aventusRec.notes?.base || [],
      accords: aventusRec.accords || [],
    });
    assert(
      aventusDeriv.features.woody >= 0.7,
      `Aventus woody >= 0.70 (got ${aventusDeriv.features.woody})`,
    );
    assert(
      aventusDeriv.features.freshness >= 0.7,
      `Aventus freshness >= 0.70 (got ${aventusDeriv.features.freshness})`,
    );
    assert(
      aventusDeriv.metadata.confidence >= 0.9,
      `Aventus confidence >= 0.90 (got ${aventusDeriv.metadata.confidence})`,
    );
  }

  // Rose d'Arabie: Oriental Floral (Rose, Oud, Warmth)
  const roseArabieRec = BATCH_01_ENRICHMENT_RECORDS.find(
    (r) => r.productId === "abna_rose_d_arabie_giorgio_armani_exclusive_45",
  );
  assert(roseArabieRec !== undefined, "Rose d'Arabie record found in Batch 01");
  if (roseArabieRec) {
    const roseDeriv = deriveOlfactiveFeatures({
      topNotes: roseArabieRec.notes?.top || [],
      middleNotes: roseArabieRec.notes?.middle || [],
      baseNotes: roseArabieRec.notes?.base || [],
      accords: roseArabieRec.accords || [],
    });
    assert(
      roseDeriv.features.floral >= 0.7,
      `Rose d'Arabie floral >= 0.70 (got ${roseDeriv.features.floral})`,
    );
    assert(
      roseDeriv.features.warmth >= 0.7,
      `Rose d'Arabie warmth >= 0.70 (got ${roseDeriv.features.warmth})`,
    );
    assert(
      roseDeriv.features.woody >= 0.6,
      `Rose d'Arabie woody >= 0.60 (got ${roseDeriv.features.woody})`,
    );
  }

  // Cool Water Man: Aromatic Aquatic
  const coolWaterRec = BATCH_01_ENRICHMENT_RECORDS.find(
    (r) => r.productId === "abna_cool_water_man_davidoff_exclusive_6",
  );
  assert(coolWaterRec !== undefined, "Cool Water Man record found in Batch 01");
  if (coolWaterRec) {
    const cwDeriv = deriveOlfactiveFeatures({
      topNotes: coolWaterRec.notes?.top || [],
      middleNotes: coolWaterRec.notes?.middle || [],
      baseNotes: coolWaterRec.notes?.base || [],
      accords: coolWaterRec.accords || [],
    });
    assert(
      cwDeriv.features.aquatic >= 0.7,
      `Cool Water aquatic >= 0.70 (got ${cwDeriv.features.aquatic})`,
    );
    assert(
      cwDeriv.features.freshness >= 0.8,
      `Cool Water freshness >= 0.80 (got ${cwDeriv.features.freshness})`,
    );
  }
}

// ----------------------------------------------------
// 8. Human Review Queue Validation
// ----------------------------------------------------
console.log("\n[8] Testing Human Review Queue Integrity...");
{
  ABNA_ENRICHMENT_REVIEW_QUEUE.clear();
  ABNA_ENRICHMENT_REVIEW_QUEUE.enqueueBatch(BATCH_01_REVIEW_QUEUE);

  assert(
    ABNA_ENRICHMENT_REVIEW_QUEUE.getAll().length === 6,
    "Review queue contains exactly 6 items",
  );
  assert(
    ABNA_ENRICHMENT_REVIEW_QUEUE.getByStatus("review_required").length === 1,
    "1 item with status 'review_required'",
  );
  assert(
    ABNA_ENRICHMENT_REVIEW_QUEUE.getByStatus("incomplete").length === 5,
    "5 items with status 'incomplete'",
  );

  const aignerItem = ABNA_ENRICHMENT_REVIEW_QUEUE.getByProductId("abna_xxx_aigner_exclusive_5");
  assert(aignerItem !== undefined, "Aigner XXX review item found");
  assert(Boolean(aignerItem?.reason), "Aigner review item has clear reason");
  assert(Boolean(aignerItem?.attemptedSource), "Aigner review item has attemptedSource recorded");
}

// ----------------------------------------------------
// 9. Full Catalog Ingestion with Active Enrichment
// ----------------------------------------------------
console.log("\n[9] Testing Full Catalog Ingestion with Batch 01 Active Enrichment...");
{
  const batch01Active = [...PILOT_ENRICHMENT_RECORDS, ...BATCH_01_ENRICHMENT_RECORDS];
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch01Active,
  });

  assert(ingestion.products.length === 497, "Total catalog parsed is 497");
  assert(
    ingestion.report.productsWithEnrichment === 49,
    "Total enriched products is 49 (5 pilot + 44 Batch 01)",
  );
  assert(
    ingestion.report.statusBreakdown.validated === 49,
    "All 49 enriched products validated successfully (100%)",
  );
  assert(
    ingestion.report.statusBreakdown.notEnriched === 448,
    "Remaining unenriched products is 448",
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
// 10. Deterministic Repeatability
// ----------------------------------------------------
console.log("\n[10] Testing Deterministic Repeatability...");
{
  const batch01Active = [...PILOT_ENRICHMENT_RECORDS, ...BATCH_01_ENRICHMENT_RECORDS];
  const run1 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch01Active,
  });
  const run2 = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: 497,
    enrichmentSource: batch01Active,
  });

  assert(
    JSON.stringify(run1.report.statusBreakdown) === JSON.stringify(run2.report.statusBreakdown),
    "Consecutive ingestion runs yield identical status breakdown",
  );
  assert(
    JSON.stringify(run1.products.map((p) => p.derived?.features)) ===
      JSON.stringify(run2.products.map((p) => p.derived?.features)),
    "Derived 10D feature vectors are 100% byte-for-byte identical across runs",
  );
}

console.log("\n==================================================");
console.log(`BATCH 01 TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log("==================================================");

if (failCount > 0) {
  process.exit(1);
}
