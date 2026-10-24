/**
 * Phase 2 — Customer Profile Mapper
 *
 * Deterministically translates raw quiz answers into a normalized 10-dimensional
 * CustomerPreferenceProfile vector.
 *
 * Design Principles:
 * 1. Scent Family is the PRIMARY olfactive driver (weight: ~50-60%).
 *    - Multi-select choices are aggregated via normalized sum so all selections contribute.
 * 2. Mood acts as an emotional bias modifier (weight: ~15-20%).
 * 3. Atmosphere provides environmental nuance (weight: ~10-15%).
 * 4. Occasion provides situational wear preference (weight: ~10-15%).
 * 5. Intensity maps directly and linearly to [0.0, 1.0].
 * 6. Mathematical guarantee: All features are clamped strictly in [0.0, 1.0].
 */

import type { FragranceFeatureVector } from "./fragrances/types";
import type { CustomerPreferenceProfile, QuizAnswers } from "./recommendation-types";

// Base vector with all zeroes
const createEmptyVector = (): FragranceFeatureVector => ({
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
});

// Scent Family Primary Vectors
const SCENT_FAMILY_MAP: Record<string, Partial<FragranceFeatureVector>> = {
  floral: { floral: 0.85, sweetness: 0.25, freshness: 0.2 },
  woody: { woody: 0.85, warmth: 0.35, spicy: 0.15 },
  citrus: { citrus: 0.9, freshness: 0.75 },
  oriental: { warmth: 0.85, spicy: 0.65, sweetness: 0.35 },
  amber_spicy: { warmth: 0.85, spicy: 0.65, sweetness: 0.35 },
  aquatic: { aquatic: 0.9, freshness: 0.75 },
  gourmand: { gourmand: 0.9, sweetness: 0.75, warmth: 0.45 },
  musky_powdery: { freshness: 0.35, floral: 0.25, sweetness: 0.2, warmth: 0.25 },
};

// Mood Modifier Vectors (refining layer)
const MOOD_MAP: Record<string, Partial<FragranceFeatureVector>> = {
  mysterious: { warmth: 0.35, woody: 0.25, spicy: 0.3, intensity: 0.15 },
  radiant: { freshness: 0.35, citrus: 0.3, floral: 0.2, warmth: 0.15 },
  serene: { freshness: 0.35, aquatic: 0.2, floral: 0.2, woody: 0.1 },
  empowered: { woody: 0.35, spicy: 0.25, citrus: 0.2, intensity: 0.2 },
};

// Atmosphere Modifier Vectors (environmental context)
const ATMOSPHERE_MAP: Record<string, Partial<FragranceFeatureVector>> = {
  // New 6 Atmosphere Options
  clean_morning: { freshness: 0.45, aquatic: 0.3, floral: 0.15 },
  rainy_city: { aquatic: 0.45, freshness: 0.35, woody: 0.2 },
  flower_garden: { floral: 0.45, sweetness: 0.3, freshness: 0.2 },
  shady_forest: { woody: 0.45, freshness: 0.3, warmth: 0.15 },
  warm_night: { warmth: 0.45, sweetness: 0.3, gourmand: 0.25, spicy: 0.2 },
  luxury_room: { woody: 0.35, warmth: 0.35, spicy: 0.25, intensity: 0.2 },

  // Backwards compatibility for legacy atmosphere IDs
  rain: { aquatic: 0.4, freshness: 0.35, woody: 0.15 },
  curtains: { freshness: 0.3, floral: 0.25, sweetness: 0.15 },
  forest: { woody: 0.45, freshness: 0.25, warmth: 0.15 },
  candlelight: { warmth: 0.4, sweetness: 0.25, gourmand: 0.2, spicy: 0.15 },
};

// Occasion Modifier Vectors (theatre of wear)
const OCCASION_MAP: Record<string, Partial<FragranceFeatureVector>> = {
  daily: { freshness: 0.3, citrus: 0.2, floral: 0.15 },
  casual: { freshness: 0.35, citrus: 0.25, sweetness: 0.15 },
  romance: { floral: 0.35, sweetness: 0.3, warmth: 0.25 },
  night: { warmth: 0.35, gourmand: 0.25, spicy: 0.25, intensity: 0.2 },
  outdoor: { freshness: 0.35, aquatic: 0.35, woody: 0.2 },
  family: { freshness: 0.25, floral: 0.25, woody: 0.25, warmth: 0.2 },
};

// Intensity helper to normalize numeric or single-select string value
export function parseRawIntensity(val: unknown): number {
  if (typeof val === "number") return Math.max(1, Math.min(5, val));
  if (typeof val === "string") {
    const s = val.toLowerCase().trim();
    if (s === "lembut") return 1;
    if (s === "seimbang") return 3;
    if (s === "semerbak") return 5;
    const n = Number.parseInt(s, 10);
    if (!Number.isNaN(n)) return Math.max(1, Math.min(5, n));
  }
  return 3;
}

// Linear Intensity Mapping (1-5 to 0.0-1.0)
export function mapIntensityToFeature(intensity = 3): number {
  const clamped = Math.max(1, Math.min(5, intensity));
  // 1 -> 0.0, 2 -> 0.25, 3 -> 0.50, 4 -> 0.75, 5 -> 1.00
  return Number(((clamped - 1) / 4).toFixed(2));
}

/**
 * Builds a deterministic CustomerPreferenceProfile from user quiz answers.
 */
export function buildCustomerProfile(answers: QuizAnswers): CustomerPreferenceProfile {
  const accumulated = createEmptyVector();

  const addVector = (vec: Partial<FragranceFeatureVector>, weight = 1.0) => {
    for (const [key, val] of Object.entries(vec) as [keyof FragranceFeatureVector, number][]) {
      if (typeof val === "number") {
        accumulated[key] += val * weight;
      }
    }
  };

  // 1. Process Scent Families (Primary Signal)
  const families = answers.scent_family ?? [];
  if (families.length > 0) {
    // Multi-select normalization: each selected family contributes equally
    const familyMultiplier =
      families.length === 1 ? 1.0 : Math.max(0.6, 1.0 / Math.sqrt(families.length));
    for (const fam of families) {
      const normalizedFam = fam.toLowerCase().trim();
      const mapped = SCENT_FAMILY_MAP[normalizedFam];
      if (mapped) {
        addVector(mapped, familyMultiplier);
      }
    }
  } else {
    // Graceful fallback if scent_family was skipped: neutral baseline
    addVector({ freshness: 0.2, warmth: 0.2, woody: 0.2, floral: 0.2 }, 0.5);
  }

  // 2. Process Mood (Emotional bias modifier)
  if (answers.mood) {
    const mapped = MOOD_MAP[answers.mood.toLowerCase().trim()];
    if (mapped) addVector(mapped, 0.5);
  }

  // 3. Process Atmosphere (Sensory environment)
  if (answers.atmosphere) {
    const mapped = ATMOSPHERE_MAP[answers.atmosphere.toLowerCase().trim()];
    if (mapped) addVector(mapped, 0.4);
  }

  // 4. Process Occasion (Context of wear)
  if (answers.occasion) {
    const mapped = OCCASION_MAP[answers.occasion.toLowerCase().trim()];
    if (mapped) addVector(mapped, 0.4);
  }

  // 5. Direct Intensity Assignment (Primary direct constraint)
  const rawIntensity = parseRawIntensity(answers.intensity);
  const intensityValue = mapIntensityToFeature(rawIntensity);

  // Blend intensity: 80% direct slider preference + 20% accumulated contextual weight
  accumulated.intensity = intensityValue * 0.8 + Math.min(1.0, accumulated.intensity) * 0.2;

  // 6. Non-linear Softening & Clamping into strict [0.0, 1.0] range
  const finalFeatures: FragranceFeatureVector = {
    freshness: clampAndNormalize(accumulated.freshness),
    sweetness: clampAndNormalize(accumulated.sweetness),
    warmth: clampAndNormalize(accumulated.warmth),
    floral: clampAndNormalize(accumulated.floral),
    woody: clampAndNormalize(accumulated.woody),
    citrus: clampAndNormalize(accumulated.citrus),
    spicy: clampAndNormalize(accumulated.spicy),
    aquatic: clampAndNormalize(accumulated.aquatic),
    gourmand: clampAndNormalize(accumulated.gourmand),
    intensity: Number(Math.min(1.0, Math.max(0.0, accumulated.intensity)).toFixed(2)),
  };

  return {
    features: finalFeatures,
    metadata: {
      mood: answers.mood,
      atmosphere: answers.atmosphere,
      scent_family: families,
      intensity_raw: rawIntensity,
      occasion: answers.occasion,
      gender: answers.gender,
      perfume_type: answers.perfume_type,
      age_range: answers.age_range,
      occupation: answers.occupation,
      price_range: answers.price_range,
    },
  };
}

/**
 * Normalizes an raw accumulated feature sum to a 0.0 - 1.0 scale with 2-decimal precision.
 */
function clampAndNormalize(val: number): number {
  if (val <= 0) return 0.0;
  // Non-linear softening so high accumulations cap gracefully at 1.0
  const normalized = 1 - Math.exp(-val * 1.4);
  return Number(Math.min(1.0, Math.max(0.0, normalized)).toFixed(2));
}
