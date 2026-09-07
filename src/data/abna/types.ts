import type { FragranceFeatureVector } from "../fragrances/types";
import type { OlfactiveDerivationMetadata } from "../olfactive/dictionary/types";

/**
 * Normalized Commercial Gender strictly resolved to masculine | feminine | unisex.
 */
export type AbnaGender = "masculine" | "feminine" | "unisex";
export type NormalizedGender = AbnaGender;

/**
 * Commercial Price Tier Enums matching ABNA Brand Architecture.
 */
export type AbnaPriceTier = "VIP" | "ELITE" | "EXCLUSIVE" | "THE_NATURE" | "SPECIAL_ONE";

/**
 * Raw price tier string from Excel before normalization.
 */
export type RawAbnaPriceTierString =
  "VIP" | "ELITE" | "EXCLUSIVE" | "THE NATURE" | "SPECIAL ONE" | string;

export interface RawABNAProductRow {
  rowNumber: number;
  namaParfum: string;
  designer: string;
  kategoriGender: string;
  hargaPerML: number;
  kode: string;
  kategoriHarga: string;
  kodeLengkap?: string;
  persentaseBibit: number;
  persentaseDiskon: number;
  harga10ML: number;
  harga30ML: number;
  harga50ML: number;
  harga100ML: number;
  stockQty: number;
}

export interface OfficialABNABottlePrices {
  size10ml: number;
  size30ml: number;
  size50ml: number;
  size100ml: number;
}

/**
 * Backward-compatible OfficialABNAProduct interface.
 */
export interface OfficialABNAProduct {
  id: string; // Deterministic ID, e.g. "abna_omnia_amethyste_bvlgari_exclusive_2"
  rawRowNumber: number;
  name: string; // Trimmed official name
  designer: string; // Original designer name from Excel
  normalizedDesigner: string; // Canonical house name
  gender: NormalizedGender;
  pricePerMl: number;
  internalCode: string;
  fullCode?: string;
  tier: AbnaPriceTier;
  seedPercentage: number;
  discountPercentage: number;
  prices: OfficialABNABottlePrices;
  stockQty: number;
  inStock: boolean;
  normalizedAt: string;
}

export interface CatalogValidationReport {
  totalRawRows: number;
  totalNormalizedProducts: number;
  hasDuplicateIds: boolean;
  duplicateIds: string[];
  missingFieldErrors: number;
  invalidPriceErrors: number;
  tierBreakdown: Record<AbnaPriceTier, number>;
  genderBreakdown: Record<NormalizedGender, number>;
  isValid: boolean;
}

/**
 * Olfactive Enrichment Lifecycle Status.
 */
export type AbnaOlfactiveStatus = "not_enriched" | "incomplete" | "review_required" | "validated";

/**
 * Enrichment Source Provenance Verification Status.
 */
export type OlfactiveVerificationStatus = "unverified" | "review_required" | "verified";

/**
 * Source metadata mandatory for every olfactive enrichment record.
 */
export interface AbnaOlfactiveSourceInfo {
  provider: string; // e.g., "Fragrantica", "ABNA Official Lab Formula", "Licensed Supplier Sheet"
  source?: string; // Canonical source name
  sourceUrl?: string; // Verified direct external reference URL
  sourceType?: string; // "external_reference" | "official_lab_formula" | "licensed_supplier_sheet"
  retrievedAt?: string;
  matchingMethod?: string; // "exact_brand_and_name_match" | "normalized_alias_match" | "variant_flanker_match" | "manual_curation"
  confidence?: number; // 0.0 to 1.0 scale
  notesVerified?: boolean;
  reviewer?: string;
  reference?: string;
  verificationStatus: OlfactiveVerificationStatus;
}

/**
 * Pyramid notes structure for enrichment input.
 */
export interface AbnaOlfactiveNotes {
  top: string[];
  middle: string[];
  base: string[];
}

/**
 * Raw input format for olfactive enrichment records (source-agnostic).
 */
export interface AbnaOlfactiveEnrichmentRecord {
  productId: string; // References AbnaProduct.id
  notes?: AbnaOlfactiveNotes;
  accords?: string[];
  fragranceFamily?: string[];
  performance?: {
    sillage?: string | null;
    longevity?: string | null;
  };
  editorialStory?: string;
  source: AbnaOlfactiveSourceInfo;
}

/**
 * Canonical ABNA Product Master Record (Clean Separation of Commercial, Enriched, and Derived layers).
 */
export interface AbnaProduct {
  id: string; // Deterministic ID, e.g. "abna_dior_sauvage_exclusive_22"
  rawRowNumber: number; // Source Excel row number (1-indexed)

  identity: {
    name: string; // Clean trimmed official commercial name
    brand: string; // Normalized standard perfume house / brand
    rawBrand: string; // Exact designer string as written in Excel
    code: string | null; // Internal product code from Excel (e.g. "B", "Z")
    fullCode?: string | null;
    gender: AbnaGender;
    rawGender: string; // Original gender string
    genderSource: "official" | "inferred_default";
  };

  catalog: {
    tier: AbnaPriceTier;
    rawTier: RawAbnaPriceTierString;
    pricePerMl: number;
    prices: {
      ml10: number | null;
      ml30: number | null;
      ml50: number | null;
      ml100: number | null;
    };
    stockQty: number;
    inStock: boolean;
    concentrationPercent: number | null; // Persentase bibit (0.0 to 1.0)
    discountPercent: number;
  };

  olfactive: {
    status: AbnaOlfactiveStatus;
    notes?: AbnaOlfactiveNotes;
    accords?: string[];
    fragranceFamily?: string[];
    editorialStory?: string;
    source?: AbnaOlfactiveSourceInfo;
  };

  derived?: {
    features: FragranceFeatureVector;
    confidence: number;
    confidenceTier: "high" | "medium" | "low";
    unknownNotes: string[];
    unknownAccords: string[];
    metadata: OlfactiveDerivationMetadata;
  };
}

/**
 * Detailed Validation Result for an individual ABNA Product.
 */
export interface AbnaProductValidationResult {
  productId: string;
  productName: string;
  brand: string;
  rawRowNumber: number;
  valid: boolean;
  status: AbnaOlfactiveStatus;
  checks: {
    commercial: boolean;
    pricesValid: boolean;
    notesPresent: boolean;
    accordsPresent: boolean;
    featuresInRange: boolean;
    confidenceAcceptable: boolean;
    unknownTermsPresent: boolean;
  };
  warnings: string[];
  errors: string[];
}

/**
 * Unknown Olfactive Term Review Item tracked across catalog ingestion.
 */
export interface AbnaUnknownTermItem {
  term: string;
  normalizedTerm: string;
  type: "note" | "accord";
  products: string[]; // List of product IDs containing this unknown term
  occurrences: number;
  status: "pending_review" | "auto_resolved" | "reviewed" | "resolved" | "mapped" | "ignored";
  suggestedMapping?: string;
  resolutionMethod?:
    "canonical_alias" | "canonical_note" | "cross_category_note" | "manual_mapping";
  canonicalTarget?: string;
  resolvedAt?: string;
  notes?: string;
}

/**
 * Ingestion Options for Batch Processing.
 */
export interface AbnaIngestionOptions {
  batchSize?: number; // Slice size for dry-run inspection (e.g. 25, 50, 100, 497)
  dryRun?: boolean; // Default true, ensures zero mutation of production models
  strictValidation?: boolean; // When true, warnings are escalated to review-required
  enrichmentSource?: AbnaOlfactiveEnrichmentRecord[];
}

/**
 * Comprehensive Catalog Ingestion & Diagnostic Report.
 */
export interface AbnaCatalogIngestionReport {
  timestamp: string;
  dryRun: boolean;
  totalProductsParsed: number;
  productsSuccessfullyNormalized: number;
  productsWithEnrichment: number;
  productsWithoutEnrichment: number;
  statusBreakdown: {
    validated: number;
    reviewRequired: number;
    incomplete: number;
    notEnriched: number;
  };
  confidenceBreakdown: {
    high: number;
    medium: number;
    low: number;
    uncalculated: number;
  };
  tierBreakdown: Record<AbnaPriceTier, number>;
  genderBreakdown: Record<AbnaGender, number>;
  unknownTermsSummary: {
    totalUnknownNotes: number;
    totalUnknownAccords: number;
    distinctUnknownNotes: number;
    distinctUnknownAccords: number;
  };
  validationErrorsCount: number;
  validationWarningsCount: number;
  productResults: AbnaProductValidationResult[];
  unknownTermsQueue: AbnaUnknownTermItem[];
}

/**
 * Human Curation Queue Item for items needing verification or missing data.
 */
export interface AbnaEnrichmentReviewItem {
  productId: string;
  productName: string;
  brand: string;
  rawRowNumber: number;
  reason: string;
  attemptedSource: string;
  candidateSource?: string | null;
  missingInformation: string[];
  timestamp: string;
  status: "review_required" | "not_found" | "incomplete";
}

/**
 * Batch Enrichment Output Summary
 */
export interface AbnaBatchEnrichmentSummary {
  batchId: string;
  productsEvaluated: number;
  enriched: number;
  reviewRequired: number;
  notFound: number;
  incomplete: number;
  validVectorsCount: number;
  invalidVectorsCount: number;
  provenanceCompleteCount: number;
  provenanceMissingCount: number;
  reviewQueue: AbnaEnrichmentReviewItem[];
}
