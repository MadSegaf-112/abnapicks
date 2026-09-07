import {
  ingestAbnaProducts,
  PILOT_ENRICHMENT_RECORDS,
  normalizeBrand,
  normalizeCommercialGender,
  normalizePriceTier,
  createDeterministicProductId,
  RAW_ABNA_PRODUCTS,
} from "./src/data/abna";

console.log("==================================================");
console.log("PHASE 6C-2: BATCH INGESTION & VALIDATION TEST SUITE");
console.log("==================================================\n");

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

// -----------------------------------------------------------------
// Test A: Commercial Normalization
// -----------------------------------------------------------------
console.log("[1] Testing Commercial Normalization...");
assert(normalizeBrand("Jomalone") === "Jo Malone London", 'Brand "Jomalone" -> "Jo Malone London"');
assert(normalizeBrand("YSL") === "Yves Saint Laurent", 'Brand "YSL" -> "Yves Saint Laurent"');
assert(
  normalizeBrand("Victoria Secret") === "Victoria's Secret",
  'Brand "Victoria Secret" -> "Victoria\'s Secret"',
);
assert(
  normalizeBrand("Bath & Body Work") === "Bath & Body Works",
  'Brand "Bath & Body Work" -> "Bath & Body Works"',
);

assert(
  normalizeCommercialGender("Women", "Secret Wish").gender === "feminine",
  'Gender "Women" -> feminine',
);
assert(
  normalizeCommercialGender("Men", "Sauvage").gender === "masculine",
  'Gender "Men" -> masculine',
);
assert(
  normalizeCommercialGender("Unisex", "Baccarat").gender === "unisex",
  'Gender "Unisex" -> unisex',
);
assert(
  normalizeCommercialGender("", "Pacific Chill").gender === "unisex",
  'Blank gender for "Pacific Chill" -> unisex (inferred)',
);
assert(
  normalizeCommercialGender("", "Red Vanilla").gender === "feminine",
  'Blank gender for "Red Vanilla" -> feminine (inferred)',
);

assert(normalizePriceTier("VIP") === "VIP", 'Price tier "VIP" -> VIP');
assert(normalizePriceTier("ELITE") === "ELITE", 'Price tier "ELITE" -> ELITE');
assert(normalizePriceTier("EXCLUSIVE") === "EXCLUSIVE", 'Price tier "EXCLUSIVE" -> EXCLUSIVE');
assert(normalizePriceTier("THE NATURE") === "THE_NATURE", 'Price tier "THE NATURE" -> THE_NATURE');
assert(
  normalizePriceTier("SPECIAL ONE") === "SPECIAL_ONE",
  'Price tier "SPECIAL ONE" -> SPECIAL_ONE',
);

// -----------------------------------------------------------------
// Test B: Stable Deterministic IDs
// -----------------------------------------------------------------
console.log("\n[2] Testing Stable Deterministic IDs...");
const id1 = createDeterministicProductId("Sauvage", "Dior", "EXCLUSIVE", 22);
const id2 = createDeterministicProductId("Sauvage", "Dior", "EXCLUSIVE", 22);
assert(id1 === id2, `Deterministic ID reproducibility: ${id1}`);
assert(id1.includes("sauvage") && id1.includes("dior"), `ID contains core slug parts: ${id1}`);

// -----------------------------------------------------------------
// Test C: Batch Ingestion Execution (Full 497 Products with Pilots)
// -----------------------------------------------------------------
console.log("\n[3] Testing Batch Ingestion (Full 497 Products)...");
const ingestionRun = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
  dryRun: true,
  enrichmentSource: PILOT_ENRICHMENT_RECORDS,
});

const { report, products } = ingestionRun;

assert(
  report.totalProductsParsed === 497,
  `Total products parsed is exactly 497 (got ${report.totalProductsParsed})`,
);
assert(
  report.productsSuccessfullyNormalized === 497,
  `Products normalized is 497 (got ${report.productsSuccessfullyNormalized})`,
);
assert(
  report.productsWithEnrichment === 5,
  `Enriched pilot products count is 5 (got ${report.productsWithEnrichment})`,
);
assert(
  report.productsWithoutEnrichment === 492,
  `Non-enriched products count is 492 (got ${report.productsWithoutEnrichment})`,
);
assert(
  report.validationErrorsCount === 0,
  `Zero validation errors across entire 497 catalog (got ${report.validationErrorsCount})`,
);

// -----------------------------------------------------------------
// Test D: Olfactive Merging & 10D Feature Range
// -----------------------------------------------------------------
console.log("\n[4] Testing Olfactive Merging & 10D Derivation on Enriched Products...");
const sauvage = products.find((p) => p.id === "abna_sauvage_dior_elite_147");
assert(sauvage !== undefined, "Sauvage product found in catalog");
assert(
  sauvage?.olfactive.status === "validated",
  `Sauvage status is validated (got ${sauvage?.olfactive.status})`,
);
assert(sauvage?.derived !== undefined, "Sauvage derived feature vector exists");

if (sauvage?.derived) {
  const feat = sauvage.derived.features;
  console.log("  Sauvage 10D Features:", feat);
  assert(feat.spicy >= 0.7, `Sauvage spicy is high (got ${feat.spicy})`);
  assert(feat.citrus >= 0.7, `Sauvage citrus is high (got ${feat.citrus})`);
  assert(feat.freshness >= 0.7, `Sauvage freshness is high (got ${feat.freshness})`);
  assert(
    sauvage.derived.confidence >= 0.8,
    `Sauvage derivation confidence is high (got ${sauvage.derived.confidence})`,
  );

  for (const [dim, val] of Object.entries(feat)) {
    assert(
      typeof val === "number" && !isNaN(val) && val >= 0.0 && val <= 1.0,
      `Dimension ${dim} = ${val} bounded [0.0, 1.0]`,
    );
  }
}

// -----------------------------------------------------------------
// Test E: Unknown Terms Capturing
// -----------------------------------------------------------------
console.log("\n[5] Testing Unknown Terms Isolation...");
const testWithUnknowns = ingestAbnaProducts(RAW_ABNA_PRODUCTS.slice(0, 1), {
  dryRun: true,
  enrichmentSource: [
    {
      productId: "abna_omnia_amethyste_bvlgari_exclusive_3",
      notes: {
        top: ["Solar Flare Note", "Bergamot"],
        middle: ["Mystic Starlight Petals"],
        base: ["Vibranium Wood", "Cedarwood"],
      },
      accords: ["Cyberpunk Hologram", "citrus"],
      source: {
        provider: "Test Source",
        verificationStatus: "unverified",
      },
    },
  ],
});

const unknownSummary = testWithUnknowns.report.unknownTermsSummary;
assert(
  unknownSummary.distinctUnknownNotes === 3,
  `Identified 3 distinct unknown notes (got ${unknownSummary.distinctUnknownNotes})`,
);
assert(
  unknownSummary.distinctUnknownAccords === 1,
  `Identified 1 distinct unknown accord (got ${unknownSummary.distinctUnknownAccords})`,
);
assert(
  testWithUnknowns.report.statusBreakdown.reviewRequired === 1 ||
    testWithUnknowns.report.statusBreakdown.incomplete === 1,
  "Product with unknown terms flagged for review",
);

// -----------------------------------------------------------------
// Test F: Determinism & Non-Destructive Ingestion
// -----------------------------------------------------------------
console.log("\n[6] Testing Deterministic Reproducibility...");
const runA = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
  dryRun: true,
  enrichmentSource: PILOT_ENRICHMENT_RECORDS,
});
const runB = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
  dryRun: true,
  enrichmentSource: PILOT_ENRICHMENT_RECORDS,
});
assert(
  JSON.stringify(runA.report.statusBreakdown) === JSON.stringify(runB.report.statusBreakdown),
  "Consecutive ingestion runs produce exact matching status breakdown",
);
assert(
  JSON.stringify(runA.products.map((p) => p.id)) === JSON.stringify(runB.products.map((p) => p.id)),
  "Deterministic product IDs match 100% across runs",
);

console.log("\n==================================================");
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================\n");

if (failed > 0) {
  process.exit(1);
}
