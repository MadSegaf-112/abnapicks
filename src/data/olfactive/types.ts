/**
 * Phase 6B-2 — Source-Agnostic Olfactive Enrichment & Matching Types
 * Enforces strict separation between Commercial Catalog Data and Olfactive Formula Data.
 */

export type EnrichmentSourceType = "official" | "licensed" | "manual" | "pending" | "unknown";

export type MatchMethod = "exact" | "normalized-exact" | "fuzzy" | "manual" | "unmatched";

export type EnrichmentStatus = "pending" | "matched" | "review-required" | "unmatched";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface OlfactiveSourceInfo {
  provider: string; // e.g. "ABNA Internal Formula Lab", "Authorized Perfumer Sheet"
  providerProductId: string | null;
  sourceType: EnrichmentSourceType;
  licensed: boolean;
  verifiedAt?: string;
}

export interface OlfactiveMatchMetadata {
  sourceName: string | null;
  sourceBrand: string | null;
  method: MatchMethod;
  confidence: number; // 0.0 to 1.0 scale
  matchedAt?: string;
}

export interface OlfactiveNotesComposition {
  top: string[];
  middle: string[];
  base: string[];
}

export interface OlfactivePerformanceMetadata {
  sillage: string | null;
  longevity: string | null;
}

/**
 * Standardized Olfactive Profile Model
 */
export interface OlfactiveProfile {
  productId: string; // References OfficialABNAProduct.id
  source: OlfactiveSourceInfo;
  matching: OlfactiveMatchMetadata;
  fragranceFamily: string | null;
  notes: OlfactiveNotesComposition;
  accords: string[];
  performance: OlfactivePerformanceMetadata;
  editorialStory?: string;
  enrichmentStatus: EnrichmentStatus;
}

/**
 * Review Queue Entry for Curation & Quality Assurance
 */
export interface OlfactiveReviewQueueItem {
  reviewId: string;
  abnaProductId: string;
  abnaProductName: string;
  abnaBrand: string;
  candidateSourceName: string | null;
  candidateSourceBrand: string | null;
  matchConfidence: number;
  matchMethod: MatchMethod;
  reasonForReview: string;
  status: ReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
}

/**
 * Production Fragrance Contract ready for recommendation consumption once verified.
 */
export interface ProductionFragranceMergeResult {
  success: boolean;
  fragrance?: import("../fragrances/types").Fragrance;
  rejectionReason?: string;
}
