/**
 * Phase 2 — Recommendation Engine Types
 *
 * Defines the Customer Preference Profile, Quiz Answer structure,
 * Scoring configurations, and Recommendation Result models.
 */

import type { Fragrance, FragranceFeatureVector } from "./fragrances/types";

export type PerfumeTypePreference = "masculine" | "feminine" | "unisex" | string;

/**
 * Raw quiz answers received from user input.
 */
export interface QuizAnswers {
  mood?: "mysterious" | "radiant" | "serene" | "empowered" | string;
  atmosphere?: string;
  scent_family?: string[];
  intensity?: "lembut" | "seimbang" | "semerbak" | number | string;
  occasion?: string;
  gender?: string; // Customer demographic gender (analytics only)
  perfume_type?: PerfumeTypePreference; // Perfume candidate eligibility filter (Masculine / Feminine / Unisex)
  age_range?: string;
  occupation?: string;
  price_range?: string;
}

/**
 * Normalized Customer Preference Profile.
 * Contains a 10-dimensional feature vector matching the Fragrance model,
 * along with raw answer metadata for traceability and debugging.
 */
export interface CustomerPreferenceProfile {
  features: FragranceFeatureVector;
  metadata: {
    mood?: string;
    atmosphere?: string;
    scent_family: string[];
    intensity_raw: number;
    occasion?: string;
    gender?: string;
    perfume_type?: string;
    age_range?: string;
    occupation?: string;
    price_range?: string;
  };
}

/**
 * Individual scored fragrance result.
 */
export interface ScoredFragrance {
  rank: number;
  fragranceId: string;
  score: number; // 0.0 to 1.0 (weighted similarity)
  matchPercent: number; // Integer percentage e.g. 92
  fragrance: Fragrance;
}

/**
 * Final recommendation payload produced by the deterministic engine.
 */
export interface DeterministicRecommendationResult {
  customerProfile: CustomerPreferenceProfile;
  recommendations: ScoredFragrance[];
}
