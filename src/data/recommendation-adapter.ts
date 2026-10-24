/**
 * Phase 3 — Recommendation Adapter
 *
 * Merges deterministic Top 3 recommendations, customer profile, and AI narrative
 * into the UI-compatible Recommendation format expected by ResultsScreen.
 *
 * Invariants:
 * 1. Factual fields (name, brand, category, notes, performance) ALWAYS come from dataset.
 * 2. Match percentages ALWAYS come from deterministic scoring engine.
 * 3. Story, whyMatch, and aura use validated Gemini narrative, or graceful deterministic fallbacks.
 */

import type { Recommendation } from "@/lib/recommendations.functions";
import type { ProductNarrative } from "./narrative-types";
import type { CustomerPreferenceProfile, ScoredFragrance } from "./recommendation-types";

export function formatRecommendationsWithNarratives(
  scored: ScoredFragrance[],
  profile: CustomerPreferenceProfile,
  narratives?: Map<string, ProductNarrative>,
): Recommendation[] {
  return scored.map((item) => {
    const f = item.fragrance;
    const moodTag = profile.metadata.mood || "mysterious";
    const occasionTag = profile.metadata.occasion || "daily";

    // Retrieve narrative for this product if available
    const productNarrative = narratives?.get(item.fragranceId);

    const whyMatch =
      productNarrative?.whyMatch ||
      `Cocok dengan preferensi aroma ${profile.metadata.scent_family.join(", ") || "pribadimu"} pada intensitas ${f.performance.sillage} untuk momen ${occasionTag}.`;

    const story = productNarrative?.story || f.catalog.editorialStory || f.description;

    const aura =
      productNarrative?.aura ||
      `${profile.metadata.mood ? profile.metadata.mood.toUpperCase() : "SIGNATURE"} · ${f.fragranceFamily.toUpperCase()}`;

    return {
      id: f.id,
      rank: item.rank,
      name: f.name,
      house: f.brand,
      category: f.fragranceFamily,
      match_percent: item.matchPercent, // Authoritative deterministic score
      description: f.description, // Authoritative factual description
      story,
      top_notes: f.notes.top.slice(0, 3), // Authoritative notes
      middle_notes: f.notes.middle.slice(0, 3),
      base_notes: f.notes.base.slice(0, 3),
      why_match: whyMatch,
      projection: f.performance.sillage, // Authoritative performance
      longevity: f.performance.longevity,
      mood_tags: [moodTag, ...f.accords.slice(0, 2)],
      occasions: [occasionTag, "Signature", "Editorial"],
      aura,
    };
  });
}
