import type { OlfactiveProfile } from "./types";
import { OLFACTIVE_DATA_PROVIDERS } from "./sources";

/**
 * Registry of verified olfactive profiles indexed by ABNA product ID.
 * All profiles must come from verified sources. Missing data remains marked as 'pending'.
 */
const VERIFIED_OLFACTIVE_PROFILES: Map<string, OlfactiveProfile> = new Map();

/**
 * Registers an approved olfactive profile.
 */
export function registerVerifiedOlfactiveProfile(profile: OlfactiveProfile): void {
  VERIFIED_OLFACTIVE_PROFILES.set(profile.productId, profile);
}

/**
 * Retrieves olfactive profile for a given product ID.
 * Returns an unassigned 'pending' profile if not yet enriched.
 */
export function getOlfactiveProfileForProduct(productId: string): OlfactiveProfile {
  const existing = VERIFIED_OLFACTIVE_PROFILES.get(productId);
  if (existing) {
    return existing;
  }

  // Source-agnostic unassigned placeholder (No hallucinated notes)
  return {
    productId,
    source: OLFACTIVE_DATA_PROVIDERS.PENDING_ENRICHMENT,
    matching: {
      sourceName: null,
      sourceBrand: null,
      method: "unmatched",
      confidence: 0,
    },
    fragranceFamily: null,
    notes: {
      top: [],
      middle: [],
      base: [],
    },
    accords: [],
    performance: {
      sillage: null,
      longevity: null,
    },
    enrichmentStatus: "pending",
  };
}

/**
 * Returns count of enriched vs pending profiles.
 */
export function getEnrichmentStats(): { verifiedCount: number } {
  return {
    verifiedCount: VERIFIED_OLFACTIVE_PROFILES.size,
  };
}
