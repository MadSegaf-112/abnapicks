import type { FragranceFeatureVector } from "../../fragrances/types";

/**
 * 10-dimensional olfactive feature vector dimension keys.
 */
export type OlfactiveDimension =
  | "freshness"
  | "sweetness"
  | "warmth"
  | "floral"
  | "woody"
  | "citrus"
  | "spicy"
  | "aquatic"
  | "gourmand"
  | "intensity";

/**
 * Partial contribution of an olfactive note or accord to the 10 dimensions.
 * Values are bounded between 0.0 and 1.0.
 */
export type OlfactiveContribution = Partial<Record<OlfactiveDimension, number>>;

/**
 * Taxonomic categories for canonical fragrance materials.
 */
export type NoteCategory =
  | "citrus"
  | "floral"
  | "woody"
  | "fresh_aromatic"
  | "spicy"
  | "aquatic_marine"
  | "gourmand"
  | "warm_amber_resinous"
  | "musk_ambery"
  | "fruity"
  | "green_herbal"
  | "earthy_mossy"
  | "leather_animalic"
  | "synthetic_abstract";

/**
 * Canonical entry in the Olfactive Note Dictionary.
 */
export interface OlfactiveNoteDefinition {
  id: string;
  canonicalName: string;
  aliases: string[];
  category: NoteCategory;
  contributions: OlfactiveContribution;
  description?: string;
}

/**
 * Canonical entry in the Olfactive Accord Dictionary.
 */
export interface OlfactiveAccordDefinition {
  id: string;
  canonicalName: string;
  aliases: string[];
  contributions: OlfactiveContribution;
  description?: string;
}

/**
 * Input for deriving olfactive features.
 */
export interface OlfactiveDerivationInput {
  topNotes?: string[];
  middleNotes?: string[];
  baseNotes?: string[];
  accords?: string[];
  performance?: {
    sillage?: string | null;
    longevity?: string | null;
  };
  intensityOverride?: number;
  intensitySource?: "inferred" | "verified" | "hybrid";
}

/**
 * Explainability breakdown per dimension for auditable derivation.
 */
export interface DimensionContributionDetail {
  dimension: OlfactiveDimension;
  rawValue: number;
  normalizedValue: number;
  contributingNotes: Array<{
    name: string;
    position: "top" | "middle" | "base" | "general";
    contribution: number;
    weight: number;
  }>;
  contributingAccords: Array<{
    name: string;
    contribution: number;
    weight: number;
  }>;
}

/**
 * Derivation audit & quality metadata.
 */
export interface OlfactiveDerivationMetadata {
  recognizedNotes: string[];
  recognizedAccords: string[];
  unknownNotes: string[];
  unknownAccords: string[];
  noteCoverage: number; // recognizedNotes / totalNotes (0.0 to 1.0)
  accordCoverage: number; // recognizedAccords / totalAccords (0.0 to 1.0)
  confidence: number; // 0.0 to 1.0 overall data confidence
  confidenceTier: "high" | "medium" | "low";
  intensitySource: "inferred" | "verified" | "hybrid";
  dimensionBreakdown?: Partial<Record<OlfactiveDimension, DimensionContributionDetail>>;
}

/**
 * Complete result of the 10D feature derivation process.
 */
export interface OlfactiveDerivationResult {
  features: FragranceFeatureVector;
  metadata: OlfactiveDerivationMetadata;
}

/**
 * Unknown olfactive term entry for review queue tracking.
 */
export interface UnknownOlfactiveTerm {
  rawTerm: string;
  normalizedTerm: string;
  type: "note" | "accord";
  productIds: string[];
  occurrences: number;
  firstSeenAt: string;
  lastSeenAt: string;
  status:
    "pending" | "pending_review" | "auto_resolved" | "reviewed" | "resolved" | "mapped" | "ignored";
  suggestedMapping?: string;
  resolutionMethod?:
    "canonical_alias" | "canonical_note" | "cross_category_note" | "manual_mapping";
  canonicalTarget?: string;
  resolvedAt?: string;
  notes?: string;
}
