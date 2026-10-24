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

export interface ScoringOptions {
  excludeIds?: (string | undefined)[];
  excludeNames?: (string | undefined)[];
}

/**
 * Primary deterministic recommendation scoring engine.
 * Takes a CustomerPreferenceProfile and evaluates against the fragrance catalog.
 */
export function scoreAndRankFragrances(
  profile: CustomerPreferenceProfile,
  dataset: Fragrance[] = FRAGRANCES,
  topCount = 3,
  options?: ScoringOptions,
): DeterministicRecommendationResult {
  // 1. Safety check for empty dataset
  if (!dataset || dataset.length === 0) {
    return {
      customerProfile: profile,
      recommendations: [],
    };
  }

  // Build exclusion sets for fast lookup and case-insensitive/normalized matching
  const excludedIdSet = new Set(
    (options?.excludeIds || [])
      .filter((id): id is string => typeof id === "string" && id.trim().length > 0)
      .map((id) => id.trim().toLowerCase()),
  );
  const excludedNameSet = new Set(
    (options?.excludeNames || [])
      .filter((name): name is string => typeof name === "string" && name.trim().length > 0)
      .map((name) => name.trim().toLowerCase().replace(/\s+/g, " ")),
  );
  const hasExclusions = excludedIdSet.size > 0 || excludedNameSet.size > 0;

  // 2. Candidate Eligibility Filtering by Perfume Type Preference
  // Strict matching: Masculine -> masculine only, Feminine -> feminine only, Unisex -> unisex only
  let candidatePool = dataset;
  const requestedPerfumeType = profile.metadata.perfume_type?.toLowerCase().trim();

  if (
    requestedPerfumeType === "masculine" ||
    requestedPerfumeType === "feminine" ||
    requestedPerfumeType === "unisex"
  ) {
    const filtered = dataset.filter(
      (item) => item.gender?.toLowerCase().trim() === requestedPerfumeType,
    );

    if (filtered.length >= topCount) {
      candidatePool = filtered;
    } else if (filtered.length > 0) {
      // Defensive safety: If fewer than topCount are eligible, safely log and use available matches
      console.warn(
        `[ScoringEngine] Insufficient candidate pool (${filtered.length} found) for perfume_type="${requestedPerfumeType}". Using available candidates.`,
      );
      candidatePool = filtered;
    } else if (!hasExclusions) {
      // Defensive safety: Zero candidates matched perfume_type, fall back to full catalog only if no exclusions active
      console.warn(
        `[ScoringEngine] Zero candidates matched perfume_type="${requestedPerfumeType}". Falling back to full catalog.`,
      );
      candidatePool = dataset;
    } else {
      candidatePool = [];
    }
  }

  // Apply candidate-level exclusion filter before scoring and rank selection
  if (hasExclusions) {
    candidatePool = candidatePool.filter((item) => {
      const idMatch = excludedIdSet.has(item.id.toLowerCase());
      const nameMatch = excludedNameSet.has(
        item.name.trim().toLowerCase().replace(/\s+/g, " "),
      );
      return !idMatch && !nameMatch;
    });
  }

  // 3. Score every fragrance in the candidate pool using existing 10D scoring
  const scoredList: { fragrance: Fragrance; score: number; matchPercent: number }[] =
    candidatePool.map((item) => {
      const score = calculateFeatureSimilarity(profile.features, item.features);
      const matchPercent = scoreToMatchPercent(score);
      return {
        fragrance: item,
        score: Number(score.toFixed(4)),
        matchPercent,
      };
    });

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

  // 4. Extract Top N items with unique normalized perfume names and assign explicit 1-indexed ranks
  const seenNames = new Set<string>();
  const uniqueRanked: typeof scoredList = [];

  for (const item of scoredList) {
    const normalizedName = item.fragrance.name.trim().toLowerCase().replace(/\s+/g, " ");

    if (hasExclusions) {
      if (
        excludedIdSet.has(item.fragrance.id.toLowerCase()) ||
        excludedNameSet.has(normalizedName)
      ) {
        continue;
      }
    }

    if (seenNames.has(normalizedName)) {
      continue;
    }

    seenNames.add(normalizedName);
    uniqueRanked.push(item);

    if (uniqueRanked.length === topCount) {
      break;
    }
  }

  const recommendations: ScoredFragrance[] = uniqueRanked.map((item, index) => ({
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
