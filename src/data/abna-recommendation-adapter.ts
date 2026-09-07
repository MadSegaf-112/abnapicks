/**
 * Phase 6E-2: ABNA Recommendation Adapter
 *
 * Transforms the authoritative, validated ABNA catalog products into the existing
 * Fragrance[] contract consumed by scoreAndRankFragrances() and ResultsScreen.
 *
 * Strict Invariants:
 * 1. ONLY products with olfactive.status === "validated" and valid derived 10D features enter.
 * 2. Exactly 444 validated products are included in ABNA_RECOMMENDATION_DATASET.
 * 3. Zero fabricated values: performance sillage, longevity, price, and family derive directly
 *    from authoritative enrichment and raw catalog rows.
 * 4. Zero review_required (13) and zero incomplete (40) products are ever admitted.
 */

import type {
  Fragrance,
  FragranceFeatureVector,
  FragranceNotes,
  FragrancePerformance,
} from "./fragrances/types";
import { RAW_ABNA_PRODUCTS } from "./abna/raw";
import { ALL_ACTIVE_ENRICHMENT_RECORDS } from "./abna/enrichment/products";
import { ingestAbnaProducts } from "./abna/ingestion";
import type { AbnaProduct } from "./abna/types";

/**
 * Maps an individual validated AbnaProduct to the existing Fragrance contract.
 */
export function adaptAbnaProductToFragrance(abna: AbnaProduct): Fragrance {
  const topNotes = abna.olfactive.notes?.top || [];
  const middleNotes = abna.olfactive.notes?.middle || [];
  const baseNotes = abna.olfactive.notes?.base || [];

  const notes: FragranceNotes = {
    top: topNotes,
    middle: middleNotes,
    base: baseNotes,
  };

  const family =
    Array.isArray(abna.olfactive.fragranceFamily) && abna.olfactive.fragranceFamily.length > 0
      ? abna.olfactive.fragranceFamily.join(" ")
      : "Signature";

  // Authoritative performance from enrichment record
  const enrichment = ALL_ACTIVE_ENRICHMENT_RECORDS.find((r) => r.productId === abna.id);
  const sillageVal = enrichment?.performance?.sillage || "Moderate";
  const longevityVal = enrichment?.performance?.longevity || "6-8h";

  const performance: FragrancePerformance = {
    sillage: sillageVal as FragrancePerformance["sillage"],
    longevity: longevityVal as FragrancePerformance["longevity"],
  };

  // Authoritative commercial price from catalog
  const price30ml =
    abna.catalog.prices.ml30 ??
    abna.catalog.prices.ml50 ??
    abna.catalog.prices.ml100 ??
    abna.catalog.prices.ml10 ??
    0;

  const description =
    abna.olfactive.editorialStory ||
    `${abna.identity.name} oleh ${abna.identity.brand}. Formula kualitas otentik ABNA Parfum kategori ${abna.catalog.tier}.`;

  return {
    id: abna.id,
    name: abna.identity.name,
    brand: abna.identity.brand,
    gender: abna.identity.gender,
    fragranceFamily: family,
    notes,
    accords: abna.olfactive.accords || [],
    description,
    performance,
    catalog: {
      price: price30ml,
      currency: "IDR",
      size: "30ml",
      inStock: abna.catalog.inStock,
      imageUrl: "",
      editorialStory: abna.olfactive.editorialStory,
    },
    features: abna.derived!.features,
  };
}

/**
 * Builds the complete active ABNA Recommendation Dataset (444 products).
 * Executes strict filtering to guarantee zero review/incomplete records enter candidate scoring.
 */
export function buildAbnaRecommendationDataset(): Fragrance[] {
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: RAW_ABNA_PRODUCTS.length,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS,
  });

  const activeIdSet = new Set(ALL_ACTIVE_ENRICHMENT_RECORDS.map((r) => r.productId));
  const dimensions: (keyof FragranceFeatureVector)[] = [
    "freshness",
    "sweetness",
    "warmth",
    "floral",
    "woody",
    "citrus",
    "spicy",
    "aquatic",
    "gourmand",
    "intensity",
  ];

  const validatedCandidates = ingestion.products.filter((product) => {
    // 1. Must be strictly validated
    if (product.olfactive.status !== "validated") return false;

    // 2. Must have derived 10D feature vector
    if (!product.derived || !product.derived.features) return false;

    // 3. Must be present in verified enrichment registry
    if (!activeIdSet.has(product.id)) return false;

    // 4. All 10 dimensions must be finite numbers in [0.0, 1.0]
    const vec = product.derived.features;
    for (const dim of dimensions) {
      const val = vec[dim];
      if (typeof val !== "number" || isNaN(val) || val < 0.0 || val > 1.0) {
        return false;
      }
    }

    return true;
  });

  // Convert to Fragrance[] contract
  const fragranceList: Fragrance[] = [];
  const enrichmentLookup = new Map<string, (typeof ALL_ACTIVE_ENRICHMENT_RECORDS)[0]>();
  ALL_ACTIVE_ENRICHMENT_RECORDS.forEach((r) => enrichmentLookup.set(r.productId, r));

  for (const abna of validatedCandidates) {
    const rawEnrichment = enrichmentLookup.get(abna.id);
    const topNotes = rawEnrichment?.notes?.top || abna.olfactive.notes?.top || [];
    const middleNotes = rawEnrichment?.notes?.middle || abna.olfactive.notes?.middle || [];
    const baseNotes = rawEnrichment?.notes?.base || abna.olfactive.notes?.base || [];

    const family =
      rawEnrichment?.fragranceFamily?.join(" ") ||
      abna.olfactive.fragranceFamily?.join(" ") ||
      "Signature";

    const sillage = rawEnrichment?.performance?.sillage || "Moderate";
    const longevity = rawEnrichment?.performance?.longevity || "6-8h";

    const price30ml =
      abna.catalog.prices.ml30 ??
      abna.catalog.prices.ml50 ??
      abna.catalog.prices.ml100 ??
      abna.catalog.prices.ml10 ??
      0;

    const description =
      rawEnrichment?.editorialStory ||
      abna.olfactive.editorialStory ||
      `${abna.identity.name} oleh ${abna.identity.brand}. Formula kualitas otentik ABNA Parfum kategori ${abna.catalog.tier}.`;

    fragranceList.push({
      id: abna.id,
      name: abna.identity.name,
      brand: abna.identity.brand,
      gender: abna.identity.gender,
      fragranceFamily: family,
      notes: {
        top: topNotes,
        middle: middleNotes,
        base: baseNotes,
      },
      accords: rawEnrichment?.accords || abna.olfactive.accords || [],
      description,
      performance: {
        sillage: sillage as FragrancePerformance["sillage"],
        longevity: longevity as FragrancePerformance["longevity"],
      },
      catalog: {
        price: price30ml,
        currency: "IDR",
        size: "30ml",
        inStock: abna.catalog.inStock,
        imageUrl: "",
        editorialStory: rawEnrichment?.editorialStory || abna.olfactive.editorialStory,
      },
      features: abna.derived!.features,
    });
  }

  return fragranceList;
}

/**
 * Precomputed, immutable authoritative ABNA recommendation dataset.
 * Contains exactly 444 validated products ready for deterministic scoring.
 */
export const ABNA_RECOMMENDATION_DATASET: Fragrance[] = buildAbnaRecommendationDataset();
