/**
 * Phase 1 — Feature Mapping Engine
 * Deterministic olfactive feature derivation from notes, accords, and performance specs.
 *
 * Rules:
 * 1. Accords carry heavy categorical weight (0.20 to 0.35 each).
 * 2. Notes carry positional weight (top notes contribute more to citrus/freshness; base notes contribute more to woody/warmth/gourmand).
 * 3. Base performance (sillage/longevity) contributes to intensity.
 * 4. All features are clamped and normalized strictly between 0.0 and 1.0.
 */

import type {
  FragranceFeatureVector,
  FragranceNotes,
  FragrancePerformance,
  RawFragranceInput,
} from "./types";

// Vocabulary mapping table for olfactive keywords to feature weights
const NOTE_KEYWORD_MAP: Record<string, Partial<FragranceFeatureVector>> = {
  // Freshness & Citrus
  bergamot: { citrus: 0.35, freshness: 0.3 },
  lemon: { citrus: 0.4, freshness: 0.35 },
  grapefruit: { citrus: 0.35, freshness: 0.3 },
  lime: { citrus: 0.35, freshness: 0.3 },
  mandarin: { citrus: 0.3, sweetness: 0.1, freshness: 0.25 },
  orange: { citrus: 0.3, sweetness: 0.15, freshness: 0.2 },
  neroli: { floral: 0.25, citrus: 0.25, freshness: 0.3 },
  "petit grain": { citrus: 0.25, freshness: 0.25, woody: 0.1 },
  mint: { freshness: 0.45 },
  eucalyptus: { freshness: 0.4, woody: 0.1 },
  aldehydes: { freshness: 0.35 },
  calone: { aquatic: 0.5, freshness: 0.35 },

  // Aquatic & Marine
  "sea salt": { aquatic: 0.5, freshness: 0.3 },
  "sea water": { aquatic: 0.5, freshness: 0.3 },
  "marine notes": { aquatic: 0.5, freshness: 0.35 },
  seaweed: { aquatic: 0.45, freshness: 0.2 },
  ozone: { aquatic: 0.4, freshness: 0.4 },
  ambroxan: { warmth: 0.25, aquatic: 0.2, freshness: 0.2, woody: 0.15, intensity: 0.2 },
  driftwood: { woody: 0.35, aquatic: 0.3 },

  // Floral
  rose: { floral: 0.45, sweetness: 0.1 },
  jasmine: { floral: 0.45, sweetness: 0.15, warmth: 0.1 },
  "orange blossom": { floral: 0.35, sweetness: 0.2, freshness: 0.15 },
  lavender: { floral: 0.3, freshness: 0.3, woody: 0.1 },
  iris: { floral: 0.35, warmth: 0.15, woody: 0.1 },
  orris: { floral: 0.3, warmth: 0.2, woody: 0.2 },
  tuberose: { floral: 0.5, sweetness: 0.2, warmth: 0.15 },
  ylang: { floral: 0.4, sweetness: 0.2, warmth: 0.1 },
  violet: { floral: 0.35, freshness: 0.15 },
  magnolia: { floral: 0.35, freshness: 0.2 },
  peony: { floral: 0.35, freshness: 0.25 },

  // Woody & Earthy
  cedar: { woody: 0.45, warmth: 0.15 },
  cedarwood: { woody: 0.45, warmth: 0.15 },
  sandalwood: { woody: 0.4, warmth: 0.3, sweetness: 0.1 },
  vetiver: { woody: 0.4, freshness: 0.2 },
  patchouli: { woody: 0.35, warmth: 0.3, sweetness: 0.1 },
  oud: { woody: 0.5, warmth: 0.35, spicy: 0.15, intensity: 0.35 },
  agarwood: { woody: 0.5, warmth: 0.35, spicy: 0.15, intensity: 0.35 },
  guaiac: { woody: 0.4, warmth: 0.25 },
  oakmoss: { woody: 0.35, freshness: 0.2, warmth: 0.15 },
  cypress: { woody: 0.35, freshness: 0.25 },
  pine: { woody: 0.4, freshness: 0.3 },
  birch: { woody: 0.4, warmth: 0.2 },

  // Warmth, Amber & Resins
  amber: { warmth: 0.5, sweetness: 0.2, intensity: 0.2 },
  amberwood: { warmth: 0.4, woody: 0.35, intensity: 0.25 },
  benzoin: { warmth: 0.45, sweetness: 0.3, gourmand: 0.2 },
  labdanum: { warmth: 0.45, sweetness: 0.15, intensity: 0.2 },
  myrrh: { warmth: 0.4, spicy: 0.15 },
  frankincense: { warmth: 0.35, spicy: 0.2, freshness: 0.15 },
  incense: { warmth: 0.4, spicy: 0.2, intensity: 0.25 },
  musk: { warmth: 0.3, freshness: 0.2 },
  "white musk": { freshness: 0.3, warmth: 0.2 },
  leather: { warmth: 0.4, woody: 0.2, intensity: 0.3 },
  tobacco: { warmth: 0.4, spicy: 0.25, sweetness: 0.2, gourmand: 0.15, intensity: 0.25 },

  // Spices
  cardamom: { spicy: 0.45, warmth: 0.2, freshness: 0.15 },
  "black pepper": { spicy: 0.45, freshness: 0.15, intensity: 0.15 },
  "pink pepper": { spicy: 0.35, freshness: 0.25, floral: 0.1 },
  cinnamon: { spicy: 0.5, warmth: 0.3, sweetness: 0.25 },
  clove: { spicy: 0.45, warmth: 0.25 },
  nutmeg: { spicy: 0.4, warmth: 0.25 },
  saffron: { spicy: 0.4, warmth: 0.35, intensity: 0.2 },
  ginger: { spicy: 0.35, freshness: 0.35, citrus: 0.15 },
  coriander: { spicy: 0.3, freshness: 0.3, citrus: 0.15 },
  star_anise: { spicy: 0.35, sweetness: 0.25 },

  // Sweetness & Gourmand
  vanilla: { sweetness: 0.5, gourmand: 0.45, warmth: 0.3 },
  tonka: { sweetness: 0.45, gourmand: 0.4, warmth: 0.3 },
  "tonka bean": { sweetness: 0.45, gourmand: 0.4, warmth: 0.3 },
  caramel: { sweetness: 0.55, gourmand: 0.55, warmth: 0.2 },
  chocolate: { sweetness: 0.45, gourmand: 0.5, warmth: 0.3 },
  cacao: { sweetness: 0.35, gourmand: 0.45, warmth: 0.3 },
  coffee: { gourmand: 0.5, warmth: 0.35, spicy: 0.15, intensity: 0.2 },
  honey: { sweetness: 0.5, gourmand: 0.4, warmth: 0.3 },
  praline: { sweetness: 0.5, gourmand: 0.5, warmth: 0.2 },
  almond: { sweetness: 0.35, gourmand: 0.4, warmth: 0.2 },
  coconut: { sweetness: 0.4, gourmand: 0.35, freshness: 0.15 },
  sugar: { sweetness: 0.5, gourmand: 0.35 },
  rum: { sweetness: 0.35, warmth: 0.4, gourmand: 0.35, intensity: 0.25 },
  cognac: { warmth: 0.4, sweetness: 0.3, gourmand: 0.3, intensity: 0.25 },
};

// Accord keyword mappings (accords carry strong holistic weights)
const ACCORD_KEYWORD_MAP: Record<string, Partial<FragranceFeatureVector>> = {
  citrus: { citrus: 0.4, freshness: 0.35 },
  fresh: { freshness: 0.4 },
  "fresh spicy": { freshness: 0.3, spicy: 0.35 },
  "warm spicy": { warmth: 0.35, spicy: 0.4 },
  woody: { woody: 0.45 },
  aromatic: { freshness: 0.35, woody: 0.15 },
  floral: { floral: 0.45 },
  "white floral": { floral: 0.45, sweetness: 0.15 },
  sweet: { sweetness: 0.45, gourmand: 0.2 },
  amber: { warmth: 0.45, sweetness: 0.15 },
  marine: { aquatic: 0.5, freshness: 0.35 },
  aquatic: { aquatic: 0.5, freshness: 0.35 },
  salty: { aquatic: 0.4, freshness: 0.25 },
  vanilla: { sweetness: 0.45, gourmand: 0.45, warmth: 0.25 },
  gourmand: { gourmand: 0.5, sweetness: 0.4 },
  earthy: { woody: 0.3, warmth: 0.2 },
  smoky: { warmth: 0.35, woody: 0.25, intensity: 0.25 },
  leather: { warmth: 0.35, intensity: 0.3 },
  powdery: { floral: 0.2, sweetness: 0.2, warmth: 0.2 },
  musky: { warmth: 0.3, freshness: 0.15 },
  green: { freshness: 0.35, woody: 0.15 },
  fruity: { sweetness: 0.3, freshness: 0.25, citrus: 0.15 },
  balsamic: { warmth: 0.35, sweetness: 0.2 },
};

function matchKeywordMap(
  text: string,
  map: Record<string, Partial<FragranceFeatureVector>>,
): Partial<FragranceFeatureVector>[] {
  const normalized = text.toLowerCase();
  const matches: Partial<FragranceFeatureVector>[] = [];
  for (const [key, vector] of Object.entries(map)) {
    if (normalized.includes(key)) {
      matches.push(vector);
    }
  }
  return matches;
}

/**
 * Calculates base intensity contribution from performance metrics
 */
function deriveIntensityFromPerformance(perf: FragrancePerformance): number {
  let score = 0.4; // baseline

  if (perf.sillage === "Beast") score += 0.45;
  else if (perf.sillage === "Strong") score += 0.3;
  else if (perf.sillage === "Moderate") score += 0.15;
  else if (perf.sillage === "Intimate") score -= 0.1;

  if (perf.longevity === "10h+") score += 0.15;
  else if (perf.longevity === "8-10h") score += 0.1;
  else if (perf.longevity === "6-8h") score += 0.05;

  return Math.min(1.0, Math.max(0.1, score));
}

/**
 * Deterministically derives the 10-dimensional feature vector for any fragrance.
 */
export function deriveFragranceFeatures(input: {
  notes: FragranceNotes;
  accords: string[];
  performance: FragrancePerformance;
  featureOverrides?: Partial<FragranceFeatureVector>;
}): FragranceFeatureVector {
  const accumulated: FragranceFeatureVector = {
    freshness: 0,
    sweetness: 0,
    warmth: 0,
    floral: 0,
    woody: 0,
    citrus: 0,
    spicy: 0,
    aquatic: 0,
    gourmand: 0,
    intensity: 0,
  };

  const applyVector = (vec: Partial<FragranceFeatureVector>, multiplier = 1) => {
    for (const [k, val] of Object.entries(vec) as [keyof FragranceFeatureVector, number][]) {
      if (typeof val === "number") {
        accumulated[k] += val * multiplier;
      }
    }
  };

  // 1. Process Accords (high categorical confidence)
  for (const accord of input.accords) {
    const matches = matchKeywordMap(accord, ACCORD_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 1.0);
    }
  }

  // 2. Process Top Notes (freshness & citrus emphasized)
  for (const note of input.notes.top) {
    const matches = matchKeywordMap(note, NOTE_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 0.8);
    }
  }

  // 3. Process Middle Notes (heart / floral / spicy emphasized)
  for (const note of input.notes.middle) {
    const matches = matchKeywordMap(note, NOTE_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 0.85);
    }
  }

  // 4. Process Base Notes (warmth / woody / gourmand emphasized)
  for (const note of input.notes.base) {
    const matches = matchKeywordMap(note, NOTE_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 0.9);
    }
  }

  // 5. Derive Intensity from performance + note heaviness
  const perfIntensity = deriveIntensityFromPerformance(input.performance);
  accumulated.intensity = accumulated.intensity * 0.4 + perfIntensity * 0.6;

  // 6. Normalize and clamp values between 0.0 and 1.0 (with smooth sigmoid-like compression for saturation)
  const result: FragranceFeatureVector = {
    freshness: clampAndNormalize(accumulated.freshness),
    sweetness: clampAndNormalize(accumulated.sweetness),
    warmth: clampAndNormalize(accumulated.warmth),
    floral: clampAndNormalize(accumulated.floral),
    woody: clampAndNormalize(accumulated.woody),
    citrus: clampAndNormalize(accumulated.citrus),
    spicy: clampAndNormalize(accumulated.spicy),
    aquatic: clampAndNormalize(accumulated.aquatic),
    gourmand: clampAndNormalize(accumulated.gourmand),
    intensity: clampAndNormalize(accumulated.intensity),
  };

  // 7. Apply optional perfumer explicit calibrated overrides if provided
  if (input.featureOverrides) {
    for (const [k, val] of Object.entries(input.featureOverrides) as [
      keyof FragranceFeatureVector,
      number,
    ][]) {
      if (typeof val === "number") {
        result[k] = Math.min(1.0, Math.max(0.0, Number(val.toFixed(2))));
      }
    }
  }

  return result;
}

/**
 * Normalizes an raw accumulated feature sum to a 0.0 - 1.0 scale with 2-decimal precision.
 */
function clampAndNormalize(val: number): number {
  if (val <= 0) return 0.0;
  // Non-linear softening so high accumulations cap gracefully at 1.0
  const normalized = 1 - Math.exp(-val * 1.5);
  return Number(Math.min(1.0, Math.max(0.0, normalized)).toFixed(2));
}

/**
 * Normalizes a raw fragrance record into the standard internal Fragrance model.
 */
export function normalizeFragrance(raw: RawFragranceInput): import("./types").Fragrance {
  const derivedFeatures = deriveFragranceFeatures({
    notes: raw.notes,
    accords: raw.accords,
    performance: raw.performance,
    featureOverrides: raw.featureOverrides,
  });

  return {
    id: raw.id,
    name: raw.name,
    brand: raw.brand,
    gender: raw.gender,
    fragranceFamily: raw.fragranceFamily,
    notes: raw.notes,
    accords: raw.accords,
    description: raw.description,
    performance: raw.performance,
    catalog: raw.catalog,
    features: derivedFeatures,
  };
}
