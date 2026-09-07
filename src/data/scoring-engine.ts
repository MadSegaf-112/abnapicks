/**
 * Phase 2 — Deterministic Scoring Engine
 *
 * Compares a CustomerPreferenceProfile against the dataset of Fragrances,
 * calculates weighted olfactive similarity, handles tie-breaking,
 * and returns ranked real products.
 *
 * Key guarantees:
 * 1. ZERO hallucination: Every recommendation is a real fragrance in FRAGRANCES.
 * 2. Deterministic & Reproducible: Same input + same dataset = exactly identical Top 3.
 * 3. Weighted Cosine-Euclidean Hybrid: Primary weight on dominant olfactive notes,
 *    controlled weight on projection/intensity.
 */

import type { Fragrance, FragranceFeatureVector } from "./fragrances/types";
import { FRAGRANCES } from "./fragrances";
import type {
  CustomerPreferenceProfile,
  DeterministicRecommendationResult,
  ScoredFragrance,
} from "./recommendation-types";

// Feature importance weights in similarity scoring
const FEATURE_IMPORTANCE_WEIGHTS: Record<keyof FragranceFeatureVector, number> = {
  // Core olfactive profiles carry highest importance
  freshness: 1.1,
  sweetness: 1.0,
  warmth: 1.1,
  floral: 1.2,
  woody: 1.2,
  citrus: 1.1,
  spicy: 1.0,
  aquatic: 1.1,
  gourmand: 1.1,
  // Intensity is a constraint/preference modifier
  intensity: 0.8,
};

/**
 * Computes the weighted cosine similarity between two 10D feature vectors.
 * Returns a value in [0.0, 1.0].
 */
export function calculateFeatureSimilarity(
  customerVec: FragranceFeatureVector,
  fragranceVec: FragranceFeatureVector,
): number {
  let dotProduct = 0;
  let customerNorm = 0;
  let fragranceNorm = 0;

  const keys = Object.keys(FEATURE_IMPORTANCE_WEIGHTS) as (keyof FragranceFeatureVector)[];

  for (const k of keys) {
    const w = FEATURE_IMPORTANCE_WEIGHTS[k];
    const cVal = customerVec[k];
    const fVal = fragranceVec[k];

    dotProduct += w * cVal * fVal;
    customerNorm += w * cVal * cVal;
    fragranceNorm += w * fVal * fVal;
  }

  if (customerNorm === 0 || fragranceNorm === 0) return 0.5; // Neutral baseline fallback

  const cosine = dotProduct / (Math.sqrt(customerNorm) * Math.sqrt(fragranceNorm));

  // Compute penalty for large absolute distance on dominant customer features
  let distancePenalty = 0;
  let totalWeights = 0;
  for (const k of keys) {
    const w = FEATURE_IMPORTANCE_WEIGHTS[k];
    const cVal = customerVec[k];
    const fVal = fragranceVec[k];
    if (cVal > 0.4) {
      // If customer has a strong preference, penalize divergence
      distancePenalty += w * Math.abs(cVal - fVal);
      totalWeights += w;
    }
  }

  const penaltyFactor = totalWeights > 0 ? (distancePenalty / totalWeights) * 0.15 : 0;
  const rawScore = cosine - penaltyFactor;

  // Clamp strictly between 0.0 and 1.0
  return Math.min(1.0, Math.max(0.0, rawScore));
}

/**
 * Maps raw similarity score [0.0 - 1.0] to a realistic, calibrated integer percentage [60 - 98%].
 */
export function scoreToMatchPercent(score: number): number {
  // Calibrate: baseline acceptable match starts around ~65%, high matches reach up to 98%
  const scaled = 60 + Math.pow(score, 1.2) * 38;
  return Math.min(98, Math.max(50, Math.round(scaled)));
}

/**
 * Primary deterministic recommendation scoring engine.
 * Takes a CustomerPreferenceProfile and evaluates against the fragrance catalog.
 */
export function scoreAndRankFragrances(
  profile: CustomerPreferenceProfile,
  dataset: Fragrance[] = FRAGRANCES,
  topCount = 3,
): DeterministicRecommendationResult {
  // 1. Safety check for empty dataset
  if (!dataset || dataset.length === 0) {
    return {
      customerProfile: profile,
      recommendations: [],
    };
  }

  // 2. Score every fragrance in the dataset
  const scoredList: { fragrance: Fragrance; score: number; matchPercent: number }[] = dataset.map(
    (item) => {
      const score = calculateFeatureSimilarity(profile.features, item.features);
      const matchPercent = scoreToMatchPercent(score);
      return {
        fragrance: item,
        score: Number(score.toFixed(4)),
        matchPercent,
      };
    },
  );

  // 3. Sort deterministically:
  // Primary: score descending
  // Tie-breaker 1: matchPercent descending
  // Tie-breaker 2: fragrance.id ascending (stable deterministic guarantee)
  scoredList.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.matchPercent !== a.matchPercent) {
      return b.matchPercent - a.matchPercent;
    }
    return a.fragrance.id.localeCompare(b.fragrance.id);
  });

  // 4. Extract Top N items and assign explicit 1-indexed ranks
  const topItems = scoredList.slice(0, topCount);
  const recommendations: ScoredFragrance[] = topItems.map((item, index) => ({
    rank: index + 1,
    fragranceId: item.fragrance.id,
    score: item.score,
    matchPercent: item.matchPercent,
    fragrance: item.fragrance,
  }));

  return {
    customerProfile: profile,
    recommendations,
  };
}
