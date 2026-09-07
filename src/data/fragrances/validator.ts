/**
 * Phase 1 — Dataset Validation Utility
 * Validates integrity, checks numeric ranges [0.0, 1.0], detects duplicate keys or missing properties.
 */

import type { Fragrance, DatasetValidationReport } from "./types";
import { FRAGRANCES } from "./fragrances";

export function validateFragranceDataset(
  dataset: Fragrance[] = FRAGRANCES,
): DatasetValidationReport {
  const seenIds = new Set<string>();
  const duplicateIds: string[] = [];
  let minVal = 1.0;
  let maxVal = 0.0;
  let missingRequiredFields = 0;
  let invalidNumericValues = 0;

  const featureKeys = [
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
  ] as const;

  for (const item of dataset) {
    // 1. Check ID uniqueness
    if (seenIds.has(item.id)) {
      duplicateIds.push(item.id);
    } else {
      seenIds.add(item.id);
    }

    // 2. Check required string & object fields
    if (
      !item.id ||
      !item.name ||
      !item.brand ||
      !item.gender ||
      !item.fragranceFamily ||
      !item.notes?.top ||
      !item.notes?.middle ||
      !item.notes?.base ||
      !item.accords ||
      !item.catalog?.imageUrl
    ) {
      missingRequiredFields++;
    }

    // 3. Check features vector constraints
    for (const key of featureKeys) {
      const val = item.features[key];
      if (typeof val !== "number" || isNaN(val) || val < 0.0 || val > 1.0) {
        invalidNumericValues++;
      } else {
        if (val < minVal) minVal = val;
        if (val > maxVal) maxVal = val;
      }
    }
  }

  const isValid =
    duplicateIds.length === 0 &&
    missingRequiredFields === 0 &&
    invalidNumericValues === 0 &&
    minVal >= 0.0 &&
    maxVal <= 1.0;

  return {
    totalRecords: dataset.length,
    featureDimensions: [...featureKeys],
    minFeatureValue: Number(minVal.toFixed(2)),
    maxFeatureValue: Number(maxVal.toFixed(2)),
    hasDuplicateIds: duplicateIds.length > 0,
    duplicateIds,
    missingRequiredFields,
    invalidNumericValues,
    isValid,
  };
}
