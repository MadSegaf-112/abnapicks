import type {
  RawABNAProductRow,
  AbnaProduct,
  AbnaIngestionOptions,
  AbnaCatalogIngestionReport,
  AbnaProductValidationResult,
  AbnaPriceTier,
  AbnaGender,
} from "./types";
import { RAW_ABNA_PRODUCTS } from "./raw";
import { buildCanonicalAbnaProduct } from "./derived/features";
import { validateAbnaProduct } from "./validation/product-validator";
import { ABNA_UNKNOWN_TERMS } from "./review/unknown-terms";

/**
 * Batch Ingestion Pipeline for ABNA Products.
 * Transforms raw catalog rows + optional enrichment into validated Canonical Master Records.
 */
export function ingestAbnaProducts(
  rawRows: RawABNAProductRow[] = RAW_ABNA_PRODUCTS,
  options: AbnaIngestionOptions = {},
): {
  products: AbnaProduct[];
  report: AbnaCatalogIngestionReport;
} {
  const dryRun = options.dryRun ?? true;
  const batchSize = options.batchSize && options.batchSize > 0 ? options.batchSize : rawRows.length;
  const targetRows = rawRows.slice(0, batchSize);

  // Index enrichment records by productId
  const enrichmentMap = new Map<string, import("./types").AbnaOlfactiveEnrichmentRecord>();
  if (options.enrichmentSource) {
    for (const rec of options.enrichmentSource) {
      enrichmentMap.set(rec.productId, rec);
    }
  }

  // Reset or initialize unknown terms queue
  ABNA_UNKNOWN_TERMS.clear();

  const products: AbnaProduct[] = [];
  const validationResults: AbnaProductValidationResult[] = [];

  const tierBreakdown: Record<AbnaPriceTier, number> = {
    VIP: 0,
    ELITE: 0,
    EXCLUSIVE: 0,
    THE_NATURE: 0,
    SPECIAL_ONE: 0,
  };

  const genderBreakdown: Record<AbnaGender, number> = {
    feminine: 0,
    masculine: 0,
    unisex: 0,
  };

  const statusBreakdown = {
    validated: 0,
    reviewRequired: 0,
    incomplete: 0,
    notEnriched: 0,
  };

  const confidenceBreakdown = {
    high: 0,
    medium: 0,
    low: 0,
    uncalculated: 0,
  };

  let productsWithEnrichment = 0;
  let productsWithoutEnrichment = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const raw of targetRows) {
    // 1. Build initial product without enrichment to find ID
    const initial = buildCanonicalAbnaProduct(raw);
    const enrichment = enrichmentMap.get(initial.id);

    // 2. Build full canonical product with matched enrichment (if any)
    const canonicalProduct = enrichment ? buildCanonicalAbnaProduct(raw, enrichment) : initial;
    products.push(canonicalProduct);

    if (enrichment) {
      productsWithEnrichment++;
    } else {
      productsWithoutEnrichment++;
    }

    // 3. Track tier and gender breakdown
    tierBreakdown[canonicalProduct.catalog.tier]++;
    genderBreakdown[canonicalProduct.identity.gender]++;

    // 4. Track derived confidence
    if (canonicalProduct.derived) {
      if (canonicalProduct.derived.confidenceTier === "high") confidenceBreakdown.high++;
      else if (canonicalProduct.derived.confidenceTier === "medium") confidenceBreakdown.medium++;
      else if (canonicalProduct.derived.confidenceTier === "low") confidenceBreakdown.low++;

      // Register unknown terms if present
      if (
        canonicalProduct.derived.unknownNotes.length > 0 ||
        canonicalProduct.derived.unknownAccords.length > 0
      ) {
        ABNA_UNKNOWN_TERMS.registerUnknownTerms(
          canonicalProduct.id,
          canonicalProduct.derived.unknownNotes,
          canonicalProduct.derived.unknownAccords,
        );
      }
    } else {
      confidenceBreakdown.uncalculated++;
    }

    // 5. Run validation checks
    const valResult = validateAbnaProduct(canonicalProduct);
    validationResults.push(valResult);

    if (valResult.status === "validated") statusBreakdown.validated++;
    else if (valResult.status === "review_required") statusBreakdown.reviewRequired++;
    else if (valResult.status === "incomplete") statusBreakdown.incomplete++;
    else if (valResult.status === "not_enriched") statusBreakdown.notEnriched++;

    totalErrors += valResult.errors.length;
    totalWarnings += valResult.warnings.length;
  }

  const unknownSummary = ABNA_UNKNOWN_TERMS.getSummary();
  const unknownQueue = ABNA_UNKNOWN_TERMS.getAll();

  const report: AbnaCatalogIngestionReport = {
    timestamp: new Date().toISOString(),
    dryRun,
    totalProductsParsed: targetRows.length,
    productsSuccessfullyNormalized: products.length,
    productsWithEnrichment,
    productsWithoutEnrichment,
    statusBreakdown,
    confidenceBreakdown,
    tierBreakdown,
    genderBreakdown,
    unknownTermsSummary: unknownSummary,
    validationErrorsCount: totalErrors,
    validationWarningsCount: totalWarnings,
    productResults: validationResults,
    unknownTermsQueue: unknownQueue,
  };

  return {
    products,
    report,
  };
}
