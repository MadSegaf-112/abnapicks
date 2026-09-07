import type { AbnaProduct, AbnaProductValidationResult } from "../types";

/**
 * Validates a single AbnaProduct across Commercial, Olfactive, 10D Features, and Confidence checks.
 */
export function validateAbnaProduct(product: AbnaProduct): AbnaProductValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Commercial Validation
  const hasValidIdentity =
    Boolean(product.id) &&
    Boolean(product.identity.name) &&
    Boolean(product.identity.brand) &&
    Boolean(product.identity.gender);

  if (!hasValidIdentity) {
    errors.push("Missing core commercial identity (id, name, brand, or gender).");
  }

  const pricesValid =
    product.catalog.pricePerMl > 0 &&
    (product.catalog.prices.ml30 === null || product.catalog.prices.ml30 > 0);

  if (!pricesValid) {
    warnings.push(`Suspicious pricing for product ${product.identity.name} (pricePerMl <= 0).`);
  }

  // 2. Olfactive Validation
  const hasNotes = Boolean(
    product.olfactive.notes &&
    (product.olfactive.notes.top.length > 0 ||
      product.olfactive.notes.middle.length > 0 ||
      product.olfactive.notes.base.length > 0),
  );

  const hasAccords = Boolean(product.olfactive.accords && product.olfactive.accords.length > 0);

  // 3. Feature Range Validation
  let featuresInRange = true;
  if (product.derived && product.derived.features) {
    for (const [key, value] of Object.entries(product.derived.features)) {
      if (
        typeof value !== "number" ||
        isNaN(value) ||
        !isFinite(value) ||
        value < 0.0 ||
        value > 1.0
      ) {
        featuresInRange = false;
        errors.push(`Feature '${key}' out of bounded range [0.0, 1.0]: ${value}`);
      }
    }
  }

  // 4. Confidence & Unknown Terms Validation
  let confidenceAcceptable = true;
  let unknownTermsPresent = false;

  if (product.derived) {
    confidenceAcceptable = product.derived.confidence >= 0.5;
    if (product.derived.confidence < 0.6) {
      warnings.push(`Low derivation confidence (${product.derived.confidence}).`);
    }

    if (product.derived.unknownNotes.length > 0 || product.derived.unknownAccords.length > 0) {
      unknownTermsPresent = true;
      warnings.push(
        `Contains unknown terms (Notes: ${product.derived.unknownNotes.length}, Accords: ${product.derived.unknownAccords.length}).`,
      );
    }
  }

  // Determine Overall Status
  let status = product.olfactive.status;
  if (!hasNotes && !hasAccords) {
    status = "not_enriched";
  } else if (!hasNotes || (product.derived && product.derived.confidence < 0.6)) {
    status = "incomplete";
  } else if (unknownTermsPresent || (product.derived && product.derived.confidence < 0.8)) {
    status = "review_required";
  } else if (hasNotes && featuresInRange && confidenceAcceptable && !unknownTermsPresent) {
    status = "validated";
  }

  const valid = errors.length === 0;

  return {
    productId: product.id,
    productName: product.identity.name,
    brand: product.identity.brand,
    rawRowNumber: product.rawRowNumber,
    valid,
    status,
    checks: {
      commercial: hasValidIdentity,
      pricesValid,
      notesPresent: hasNotes,
      accordsPresent: hasAccords,
      featuresInRange,
      confidenceAcceptable,
      unknownTermsPresent,
    },
    warnings,
    errors,
  };
}
