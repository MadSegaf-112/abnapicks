import {
  deriveOlfactiveFeatures,
  resolveCanonicalNote,
  resolveCanonicalAccord,
  UNKNOWN_TERM_STORE,
  CANONICAL_NOTES,
  CANONICAL_ACCORDS,
} from "./src/data/olfactive/dictionary";

console.log("==================================================");
console.log("PHASE 6C-1: OLFACTIVE DICTIONARY & 10D DERIVATION TESTS");
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
// Test 1: Dictionary Coverage & Alias Resolution
// -----------------------------------------------------------------
console.log("[1] Testing Alias Normalization & Resolution...");
const aliasCases = [
  { raw: "Bergamot Orange", expected: "bergamot" },
  { raw: "cedar", expected: "cedarwood" },
  { raw: "cedar wood", expected: "cedarwood" },
  { raw: "sea notes", expected: "marine notes" },
  { raw: "oceanic notes", expected: "marine notes" },
  { raw: "Vanilla Absolute", expected: "vanilla" },
  { raw: "black currant", expected: "blackcurrant" },
  { raw: "white musks", expected: "white musk" },
  { raw: "oudh", expected: "oud" },
  { raw: "tonka", expected: "tonka bean" },
];

for (const tc of aliasCases) {
  const res = resolveCanonicalNote(tc.raw);
  assert(
    res.canonicalKey === tc.expected,
    `Note alias "${tc.raw}" -> "${tc.expected}" (got "${res.canonicalKey}")`,
  );
}

const accordCases = [
  { raw: "marine", expected: "aquatic" },
  { raw: "white floral", expected: "floral" },
  { raw: "warm spices", expected: "warm spicy" },
  { raw: "vanillic", expected: "vanilla" },
];

for (const tc of accordCases) {
  const res = resolveCanonicalAccord(tc.raw);
  assert(
    res.canonicalKey === tc.expected,
    `Accord alias "${tc.raw}" -> "${tc.expected}" (got "${res.canonicalKey}")`,
  );
}

// -----------------------------------------------------------------
// Test A: CITRUS FRESH
// -----------------------------------------------------------------
console.log("\n[2] TEST A — CITRUS FRESH");
const testA = deriveOlfactiveFeatures({
  topNotes: ["bergamot", "lemon"],
  middleNotes: ["neroli"],
  accords: ["citrus", "fresh"],
});

console.log("Features A:", testA.features);
console.log("Metadata A:", {
  recognizedNotes: testA.metadata.recognizedNotes,
  recognizedAccords: testA.metadata.recognizedAccords,
  confidence: testA.metadata.confidence,
});

assert(
  testA.features.citrus >= 0.7,
  `TEST A: citrus should be high (>= 0.70, got ${testA.features.citrus})`,
);
assert(
  testA.features.freshness >= 0.7,
  `TEST A: freshness should be high (>= 0.70, got ${testA.features.freshness})`,
);
assert(
  testA.features.floral > 0.1 && testA.features.floral <= 0.65,
  `TEST A: floral should be low-to-moderate (got ${testA.features.floral})`,
);
assert(
  testA.metadata.confidence >= 0.8,
  `TEST A: confidence should be high (got ${testA.metadata.confidence})`,
);

// -----------------------------------------------------------------
// Test B: WOODY AMBER
// -----------------------------------------------------------------
console.log("\n[3] TEST B — WOODY AMBER");
const testB = deriveOlfactiveFeatures({
  topNotes: ["cardamom"],
  middleNotes: ["cedarwood"],
  baseNotes: ["amber", "sandalwood"],
  accords: ["woody", "warm spicy", "amber"],
});

console.log("Features B:", testB.features);
assert(
  testB.features.woody >= 0.7,
  `TEST B: woody should be high (>= 0.70, got ${testB.features.woody})`,
);
assert(
  testB.features.warmth >= 0.7,
  `TEST B: warmth should be high (>= 0.70, got ${testB.features.warmth})`,
);
assert(
  testB.features.spicy >= 0.4,
  `TEST B: spicy should be moderate-to-high (>= 0.40, got ${testB.features.spicy})`,
);

// -----------------------------------------------------------------
// Test C: FLORAL SWEET
// -----------------------------------------------------------------
console.log("\n[4] TEST C — FLORAL SWEET");
const testC = deriveOlfactiveFeatures({
  topNotes: ["pear"],
  middleNotes: ["jasmine", "rose"],
  baseNotes: ["vanilla", "musk"],
  accords: ["floral", "sweet"],
});

console.log("Features C:", testC.features);
assert(
  testC.features.floral >= 0.7,
  `TEST C: floral should be high (>= 0.70, got ${testC.features.floral})`,
);
assert(
  testC.features.sweetness >= 0.5,
  `TEST C: sweetness should be moderate-high (>= 0.50, got ${testC.features.sweetness})`,
);
assert(
  testC.features.warmth >= 0.35,
  `TEST C: warmth should be moderate (>= 0.35, got ${testC.features.warmth})`,
);

// -----------------------------------------------------------------
// Test D: GOURMAND
// -----------------------------------------------------------------
console.log("\n[5] TEST D — GOURMAND");
const testD = deriveOlfactiveFeatures({
  topNotes: ["coffee"],
  middleNotes: ["caramel"],
  baseNotes: ["vanilla", "tonka bean"],
  accords: ["gourmand", "sweet", "vanilla"],
});

console.log("Features D:", testD.features);
assert(
  testD.features.gourmand >= 0.8,
  `TEST D: gourmand should be very high (>= 0.80, got ${testD.features.gourmand})`,
);
assert(
  testD.features.sweetness >= 0.75,
  `TEST D: sweetness should be high (>= 0.75, got ${testD.features.sweetness})`,
);
assert(
  testD.features.warmth >= 0.65,
  `TEST D: warmth should be high (>= 0.65, got ${testD.features.warmth})`,
);

// -----------------------------------------------------------------
// Test E: AQUATIC
// -----------------------------------------------------------------
console.log("\n[6] TEST E — AQUATIC");
const testE = deriveOlfactiveFeatures({
  topNotes: ["marine notes", "bergamot"],
  middleNotes: ["aquatic notes"],
  baseNotes: ["musk"],
  accords: ["aquatic", "fresh"],
});

console.log("Features E:", testE.features);
assert(
  testE.features.aquatic >= 0.75,
  `TEST E: aquatic should be very high (>= 0.75, got ${testE.features.aquatic})`,
);
assert(
  testE.features.freshness >= 0.7,
  `TEST E: freshness should be high (>= 0.70, got ${testE.features.freshness})`,
);
assert(
  testE.features.citrus >= 0.35,
  `TEST E: citrus should be moderate (>= 0.35, got ${testE.features.citrus})`,
);

// -----------------------------------------------------------------
// Test 7: Determinism & Bounds (0.0 <= value <= 1.0)
// -----------------------------------------------------------------
console.log("\n[7] Testing Determinism and Bounded Range...");
const run1 = deriveOlfactiveFeatures({
  topNotes: ["bergamot", "lemon", "apple", "mint"],
  middleNotes: ["rose", "jasmine", "lavender", "cinnamon"],
  baseNotes: ["oud", "amber", "vanilla", "patchouli", "sandalwood", "leather"],
  accords: ["fresh", "woody", "floral", "oriental spicy", "gourmand"],
});

const run2 = deriveOlfactiveFeatures({
  topNotes: ["bergamot", "lemon", "apple", "mint"],
  middleNotes: ["rose", "jasmine", "lavender", "cinnamon"],
  baseNotes: ["oud", "amber", "vanilla", "patchouli", "sandalwood", "leather"],
  accords: ["fresh", "woody", "floral", "oriental spicy", "gourmand"],
});

assert(
  JSON.stringify(run1) === JSON.stringify(run2),
  "Identical inputs produce exact identical output (Deterministic)",
);

for (const [dim, val] of Object.entries(run1.features)) {
  assert(val >= 0.0 && val <= 1.0, `Dimension ${dim} = ${val} is strictly bounded [0.0, 1.0]`);
}

// -----------------------------------------------------------------
// Test 8: Unknown Notes Tracking & Review Store
// -----------------------------------------------------------------
console.log("\n[8] Testing Unknown Notes Capturing...");
const testUnknown = deriveOlfactiveFeatures({
  topNotes: ["coca cola", "bergamot"],
  middleNotes: ["mysterious lunar flower"],
  baseNotes: ["unobtanium wood", "cedarwood"],
  accords: ["sparkling alien vibe"],
});

assert(
  testUnknown.metadata.unknownNotes.includes("coca cola"),
  'Unknown notes contains "coca cola"',
);
assert(
  testUnknown.metadata.unknownNotes.includes("mysterious lunar flower"),
  'Unknown notes contains "mysterious lunar flower"',
);
assert(
  testUnknown.metadata.unknownNotes.includes("unobtanium wood"),
  'Unknown notes contains "unobtanium wood"',
);
assert(
  testUnknown.metadata.unknownAccords.includes("sparkling alien vibe"),
  'Unknown accords contains "sparkling alien vibe"',
);
assert(
  testUnknown.metadata.recognizedNotes.includes("bergamot"),
  'Recognized notes contains "bergamot"',
);
assert(
  testUnknown.metadata.recognizedNotes.includes("cedarwood"),
  'Recognized notes contains "cedarwood"',
);
assert(
  testUnknown.metadata.confidence < 0.7,
  `Confidence lowered due to unknown notes (got ${testUnknown.metadata.confidence})`,
);

UNKNOWN_TERM_STORE.trackBatch(
  testUnknown.metadata.unknownNotes,
  testUnknown.metadata.unknownAccords,
  "ABNA-SAMPLE-001",
);

const pendingTerms = UNKNOWN_TERM_STORE.getTerms("pending_review");
assert(
  pendingTerms.length === 4,
  `Unknown term store enqueued 4 pending terms (got ${pendingTerms.length})`,
);
const cocaColaTerm = pendingTerms.find((t) => t.normalizedTerm === "coca cola");
assert(
  cocaColaTerm !== undefined && cocaColaTerm.occurrences === 1,
  "coca cola tracked correctly in store",
);

// -----------------------------------------------------------------
// Test 9: Phase 6C-3A Specific Material & Cross-Category Tests
// -----------------------------------------------------------------
console.log("\n[9] Testing Phase 6C-3A Material & Cross-Category Resolutions...");

// A. Woody Notes
const woodyNotesTest = deriveOlfactiveFeatures({
  topNotes: ["bergamot"],
  middleNotes: ["Woody Notes"],
  baseNotes: ["musk"],
});
assert(
  !woodyNotesTest.metadata.unknownNotes.includes("Woody Notes"),
  '"Woody Notes" is no longer unknown',
);
assert(
  woodyNotesTest.metadata.recognizedNotes.includes("woody notes"),
  '"Woody Notes" recognized as canonical "woody notes"',
);
assert(
  woodyNotesTest.features.woody >= 0.65,
  `"Woody Notes" imparts strong woody character (>= 0.65, got ${woodyNotesTest.features.woody})`,
);

// B. Amberwood
const amberwoodTest = deriveOlfactiveFeatures({
  topNotes: ["bergamot"],
  middleNotes: ["Amberwood"],
  baseNotes: ["white musk"],
});
assert(
  !amberwoodTest.metadata.unknownNotes.includes("Amberwood"),
  '"Amberwood" is no longer unknown',
);
assert(
  amberwoodTest.features.woody >= 0.55 && amberwoodTest.features.warmth >= 0.5,
  `Amberwood imparts woody & warmth (woody: ${amberwoodTest.features.woody}, warmth: ${amberwoodTest.features.warmth})`,
);
for (const [k, v] of Object.entries(amberwoodTest.features)) {
  assert(v >= 0.0 && v <= 1.0, `Amberwood feature ${k} = ${v} bounded [0,1]`);
}

// C. Licorice
const licoriceTest = deriveOlfactiveFeatures({
  topNotes: ["Licorice"],
  middleNotes: ["lavender"],
  baseNotes: ["cedarwood"],
});
assert(!licoriceTest.metadata.unknownNotes.includes("Licorice"), '"Licorice" is no longer unknown');
assert(
  licoriceTest.features.sweetness >= 0.45 && licoriceTest.features.spicy >= 0.45,
  `Licorice has controlled sweetness & spicy (sweetness: ${licoriceTest.features.sweetness}, spicy: ${licoriceTest.features.spicy})`,
);

// D. Coffee Cross-Category Resolution from Accords
const coffeeAccordTest = deriveOlfactiveFeatures({
  topNotes: ["bergamot"],
  middleNotes: ["jasmine"],
  baseNotes: ["vanilla"],
  accords: ["coffee", "sweet"],
});
assert(
  !coffeeAccordTest.metadata.unknownAccords.includes("coffee"),
  'Accord "coffee" is no longer unknown',
);
assert(
  coffeeAccordTest.metadata.recognizedAccords.some((a) => a.includes("coffee")),
  'Accord "coffee" recognized via cross-category resolution',
);
assert(
  coffeeAccordTest.features.gourmand >= 0.65,
  `Coffee accord contributes to gourmand (got ${coffeeAccordTest.features.gourmand})`,
);

// E. Deterministic Identical Check
const rerunA = deriveOlfactiveFeatures({
  topNotes: ["Licorice", "Amberwood"],
  middleNotes: ["Woody Notes"],
  accords: ["coffee"],
});
const rerunB = deriveOlfactiveFeatures({
  topNotes: ["Licorice", "Amberwood"],
  middleNotes: ["Woody Notes"],
  accords: ["coffee"],
});
assert(
  JSON.stringify(rerunA) === JSON.stringify(rerunB),
  "Phase 6C-3A derivation produces 100% deterministic identical outputs",
);

console.log("\n==================================================");
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================\n");

if (failed > 0) {
  process.exit(1);
}
