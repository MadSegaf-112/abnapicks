import type { OfficialABNAProduct } from "../abna/types";
import type { OlfactiveProfile, ProductionFragranceMergeResult } from "./types";
import type { Fragrance, RawFragranceInput } from "../fragrances/types";
import { normalizeFragrance } from "../fragrances/feature-mapping";

/**
 * Validates and merges an OfficialABNAProduct with an approved OlfactiveProfile.
 * Strictly rejects any fragrance with missing olfactive data or pending review.
 */
export function mergeProductionFragrance(
  product: OfficialABNAProduct,
  olfactive: OlfactiveProfile,
): ProductionFragranceMergeResult {
  // 1. Validate Product Identity
  if (!product.id || !product.name || !product.designer) {
    return {
      success: false,
      rejectionReason: `Invalid product identity for row ${product.rawRowNumber}.`,
    };
  }

  // 2. Validate Enrichment Status
  if (olfactive.enrichmentStatus !== "matched") {
    return {
      success: false,
      rejectionReason: `Olfactive profile status is '${olfactive.enrichmentStatus}', requiring approval before production inclusion.`,
    };
  }

  // 3. Validate Olfactive Notes Composition
  const hasTop = Array.isArray(olfactive.notes.top) && olfactive.notes.top.length > 0;
  const hasMiddle = Array.isArray(olfactive.notes.middle) && olfactive.notes.middle.length > 0;
  const hasBase = Array.isArray(olfactive.notes.base) && olfactive.notes.base.length > 0;

  if (!hasTop && !hasMiddle && !hasBase) {
    return {
      success: false,
      rejectionReason: `Fragrance '${product.name}' has empty olfactive notes pyramid.`,
    };
  }

  // 4. Construct RawFragranceInput for 10D Vector Normalization
  const rawInput: RawFragranceInput = {
    id: product.id,
    name: product.name,
    brand: `ABNA Signature (${product.normalizedDesigner})`,
    gender: product.gender,
    fragranceFamily: olfactive.fragranceFamily || "Woody Floral",
    notes: {
      top: olfactive.notes.top,
      middle: olfactive.notes.middle,
      base: olfactive.notes.base,
    },
    accords: olfactive.accords.length > 0 ? olfactive.accords : ["fresh", "aromatic"],
    description: `Varian resmi ${product.name} dari koleksi ${product.tier} ABNA Signature.`,
    performance: {
      longevity:
        olfactive.performance.longevity || (product.seedPercentage >= 0.5 ? "8-10h" : "6-8h"),
      sillage:
        (olfactive.performance.sillage as "Intimate" | "Moderate" | "Strong" | "Beast") ||
        "Moderate",
    },
    catalog: {
      price: product.prices.size30ml,
      currency: "IDR",
      size: "30ml",
      inStock: product.inStock,
      imageUrl:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
      editorialStory:
        olfactive.editorialStory || `Karakter aroma memikat untuk varian ${product.name}.`,
    },
  };

  try {
    // 5. Generate 10D feature vector
    const normalizedFragrance: Fragrance = normalizeFragrance(rawInput);

    // 6. Validate 10D feature vector range
    const vector = normalizedFragrance.features;
    for (const [key, val] of Object.entries(vector)) {
      if (typeof val !== "number" || isNaN(val) || val < 0 || val > 1) {
        return {
          success: false,
          rejectionReason: `Invalid 10D feature value for '${key}': ${val}`,
        };
      }
    }

    return {
      success: true,
      fragrance: normalizedFragrance,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      rejectionReason: `Feature normalization error: ${message}`,
    };
  }
}
