/**
 * Phase 1 — Fragrance Dataset Foundation
 * Normalized schema and types for Raw Fragrance Data, Derived Features, and Catalog Metadata.
 */

/**
 * Normalized 10-dimensional olfactive feature vector.
 * Every dimension is scaled strictly between 0.0 (minimal/absent) and 1.0 (dominant).
 */
export interface FragranceFeatureVector {
  freshness: number; // Crisp, airy, clean, bright energy
  sweetness: number; // Sugary, vanillic, candied, or dessert warmth
  warmth: number; // Resinous, ambery, cozy, balsamic depth
  floral: number; // Rose, jasmine, white floral, or bouquet presence
  woody: number; // Cedar, sandalwood, oud, vetiver, or dry timber
  citrus: number; // Bergamot, lemon, grapefruit, mandarin zest
  spicy: number; // Cardamom, pepper, cinnamon, clove warmth/punch
  aquatic: number; // Marine, salty, ozonic, breezy water accords
  gourmand: number; // Vanilla, coffee, chocolate, tonka edible notes
  intensity: number; // Sillage, projection, concentration weight
}

export type FeatureKey = keyof FragranceFeatureVector;

/**
 * Olfactive pyramid notes structure.
 */
export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

/**
 * Performance metrics for the fragrance.
 */
export interface FragrancePerformance {
  longevity: "4-6h" | "6-8h" | "8-10h" | "10h+" | string;
  sillage: "Intimate" | "Moderate" | "Strong" | "Beast";
}

/**
 * Commercial catalog data.
 * Compatible with temporary proof-of-concept items and future ABNA catalog products.
 */
export interface FragranceCatalogInfo {
  price?: number;
  currency?: string;
  size?: string;
  inStock?: boolean;
  productUrl?: string;
  imageUrl: string;
  editorialStory?: string;
}

/**
 * Primary Normalized Fragrance Model.
 * This represents the single source of truth consumed by internal systems.
 */
export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  gender: "unisex" | "masculine" | "feminine";
  fragranceFamily: string; // e.g. "Woody Spicy", "Citrus Aromatic", "Floral Amber"
  notes: FragranceNotes;
  accords: string[];
  description: string;
  performance: FragrancePerformance;
  catalog: FragranceCatalogInfo;
  features: FragranceFeatureVector;
  occasions?: string[];
  timeOfDay?: "day" | "night" | "anytime";
  seasons?: string[];
}

/**
 * Raw input definition before automated feature derivation.
 */
export interface RawFragranceInput {
  id: string;
  name: string;
  brand: string;
  gender: "unisex" | "masculine" | "feminine";
  fragranceFamily: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  accords: string[];
  description: string;
  performance: FragrancePerformance;
  catalog: FragranceCatalogInfo;
  // Optional explicit overrides if perfumer validation calibrates a specific feature
  featureOverrides?: Partial<FragranceFeatureVector>;
}

/**
 * Validation summary report interface for datasets.
 */
export interface DatasetValidationReport {
  totalRecords: number;
  featureDimensions: string[];
  minFeatureValue: number;
  maxFeatureValue: number;
  hasDuplicateIds: boolean;
  duplicateIds: string[];
  missingRequiredFields: number;
  invalidNumericValues: number;
  isValid: boolean;
}
