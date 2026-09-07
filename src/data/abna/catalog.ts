import { RAW_ABNA_PRODUCTS } from "./raw";
import { normalizeABNAProduct } from "./normalization";
import { validateABNACatalog } from "./validation";
import type {
  OfficialABNAProduct,
  AbnaPriceTier,
  NormalizedGender,
  CatalogValidationReport,
} from "./types";

/**
 * Official Normalized ABNA Product Catalog.
 * Contains exactly 497 verified products extracted from reference/DATA PARFUM UNTUK WEBSITE 2026.xlsx.
 */
export const OFFICIAL_ABNA_CATALOG: OfficialABNAProduct[] =
  RAW_ABNA_PRODUCTS.map(normalizeABNAProduct);

/**
 * Validation summary report executed on module load.
 */
export const ABNA_CATALOG_VALIDATION_REPORT: CatalogValidationReport =
  validateABNACatalog(OFFICIAL_ABNA_CATALOG);

/**
 * Lookup product by deterministic ID.
 */
export function getABNAProductById(id: string): OfficialABNAProduct | undefined {
  return OFFICIAL_ABNA_CATALOG.find((p) => p.id === id);
}

/**
 * Lookup products by price tier.
 */
export function getABNAProductsByTier(tier: AbnaPriceTier): OfficialABNAProduct[] {
  return OFFICIAL_ABNA_CATALOG.filter((p) => p.tier === tier);
}

/**
 * Lookup products by gender category.
 */
export function getABNAProductsByGender(gender: NormalizedGender): OfficialABNAProduct[] {
  return OFFICIAL_ABNA_CATALOG.filter((p) => p.gender === gender);
}

/**
 * Filter products by 30ml retail price range.
 */
export function getABNAProductsBy30mlPriceRange(
  minPrice: number,
  maxPrice: number,
): OfficialABNAProduct[] {
  return OFFICIAL_ABNA_CATALOG.filter(
    (p) => p.prices.size30ml >= minPrice && p.prices.size30ml <= maxPrice,
  );
}

/**
 * Filter products by search keyword (name or designer).
 */
export function searchABNAProducts(query: string): OfficialABNAProduct[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return OFFICIAL_ABNA_CATALOG;
  return OFFICIAL_ABNA_CATALOG.filter(
    (p) =>
      p.name.toLowerCase().includes(cleanQuery) ||
      p.designer.toLowerCase().includes(cleanQuery) ||
      p.normalizedDesigner.toLowerCase().includes(cleanQuery),
  );
}
