import type { AbnaProductValidationResult } from "../types";

export * from "./product-validator";

/**
 * Validates a collection of validation results and outputs summary diagnostic data.
 */
export function summarizeProductValidations(results: AbnaProductValidationResult[]): {
  total: number;
  validCount: number;
  invalidCount: number;
  statusCounts: {
    validated: number;
    reviewRequired: number;
    incomplete: number;
    notEnriched: number;
  };
  totalErrors: number;
  totalWarnings: number;
} {
  const statusCounts = {
    validated: 0,
    reviewRequired: 0,
    incomplete: 0,
    notEnriched: 0,
  };

  let totalErrors = 0;
  let totalWarnings = 0;
  let validCount = 0;
  let invalidCount = 0;

  for (const res of results) {
    if (res.valid) validCount++;
    else invalidCount++;

    if (res.status === "validated") statusCounts.validated++;
    else if (res.status === "review_required") statusCounts.reviewRequired++;
    else if (res.status === "incomplete") statusCounts.incomplete++;
    else if (res.status === "not_enriched") statusCounts.notEnriched++;

    totalErrors += res.errors.length;
    totalWarnings += res.warnings.length;
  }

  return {
    total: results.length,
    validCount,
    invalidCount,
    statusCounts,
    totalErrors,
    totalWarnings,
  };
}
