import type {
  OfficialABNAProduct,
  CatalogValidationReport,
  AbnaPriceTier,
  NormalizedGender,
} from "./types";

export function validateABNACatalog(products: OfficialABNAProduct[]): CatalogValidationReport {
  const idSet = new Set<string>();
  const duplicateIds: string[] = [];
  let missingFieldErrors = 0;
  let invalidPriceErrors = 0;

  const tierBreakdown: Record<AbnaPriceTier, number> = {
    VIP: 0,
    ELITE: 0,
    EXCLUSIVE: 0,
    THE_NATURE: 0,
    SPECIAL_ONE: 0,
  };

  const genderBreakdown: Record<NormalizedGender, number> = {
    feminine: 0,
    masculine: 0,
    unisex: 0,
  };

  for (const p of products) {
    // 1. Check ID uniqueness
    if (idSet.has(p.id)) {
      duplicateIds.push(p.id);
    } else {
      idSet.add(p.id);
    }

    // 2. Check required fields
    if (!p.name || !p.designer || !p.gender || !p.tier) {
      missingFieldErrors++;
    }

    // 3. Check price validity
    if (p.prices.size30ml <= 0 || p.pricePerMl <= 0) {
      invalidPriceErrors++;
    }

    // 4. Record breakdowns
    if (p.tier in tierBreakdown) {
      tierBreakdown[p.tier]++;
    }
    if (p.gender in genderBreakdown) {
      genderBreakdown[p.gender]++;
    }
  }

  const isValid =
    duplicateIds.length === 0 &&
    missingFieldErrors === 0 &&
    invalidPriceErrors === 0 &&
    products.length === 497;

  return {
    totalRawRows: products.length,
    totalNormalizedProducts: products.length,
    hasDuplicateIds: duplicateIds.length > 0,
    duplicateIds,
    missingFieldErrors,
    invalidPriceErrors,
    tierBreakdown,
    genderBreakdown,
    isValid,
  };
}
