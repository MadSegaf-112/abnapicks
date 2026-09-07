import type {
  OlfactiveDimension,
  OlfactiveDerivationInput,
  OlfactiveDerivationResult,
  OlfactiveDerivationMetadata,
  DimensionContributionDetail,
} from "./types";
import type { FragranceFeatureVector } from "../../fragrances/types";
import { CANONICAL_NOTES } from "./notes";
import { CANONICAL_ACCORDS } from "./accords";
import { resolveCanonicalNote, resolveCanonicalAccord } from "./aliases";

/**
 * Controlled Pyramid Weighting Constants
 * Top notes = 0.95 (opening sparkle)
 * Middle notes = 1.00 (heart anchor)
 * Base notes = 1.05 (drydown foundation)
 * Accords modifier = 0.35 (secondary modifier, does not dominate notes)
 */
export const DERIVATION_CONFIG = {
  WEIGHTS: {
    TOP_NOTES: 0.95,
    MIDDLE_NOTES: 1.0,
    BASE_NOTES: 1.05,
    ACCORDS: 0.35,
  },
  // Soft saturation compression factor for clamp & normalize: 1 - exp(-k * sum)
  COMPRESSION_FACTOR: 1.25,
  BASE_INTENSITY_INFERRED: 0.35,
} as const;

const ALL_DIMENSIONS: OlfactiveDimension[] = [
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

/**
 * Calculates base intensity contribution from performance metrics if available.
 */
export function deriveIntensityFromPerformanceMetrics(
  sillage?: string | null,
  longevity?: string | null,
): number {
  let score = DERIVATION_CONFIG.BASE_INTENSITY_INFERRED;

  if (sillage) {
    const s = sillage.toLowerCase();
    if (s.includes("beast") || s.includes("very strong")) score += 0.45;
    else if (s.includes("strong") || s.includes("heavy")) score += 0.3;
    else if (s.includes("moderate") || s.includes("medium")) score += 0.15;
    else if (s.includes("intimate") || s.includes("soft") || s.includes("light")) score -= 0.1;
  }

  if (longevity) {
    const l = longevity.toLowerCase();
    if (
      l.includes("10h+") ||
      l.includes("12h") ||
      l.includes("long lasting") ||
      l.includes("very long")
    )
      score += 0.15;
    else if (l.includes("8-10h") || l.includes("8h")) score += 0.1;
    else if (l.includes("6-8h") || l.includes("6h")) score += 0.05;
    else if (l.includes("2-4h") || l.includes("4h")) score -= 0.05;
  }

  return Math.min(1.0, Math.max(0.1, Number(score.toFixed(2))));
}

/**
 * Normalizes raw accumulated sum into a bounded 0.0 - 1.0 score with non-linear saturation.
 */
export function normalizeDimensionScore(val: number): number {
  if (val <= 0) return 0.0;
  // Bounded saturation curve: 1 - exp(-k * x)
  const normalized = 1 - Math.exp(-val * DERIVATION_CONFIG.COMPRESSION_FACTOR);
  return Number(Math.min(1.0, Math.max(0.0, normalized)).toFixed(2));
}

/**
 * Computes Derivation Confidence based on note/accord recognition and completeness.
 */
export function calculateDerivationConfidence(params: {
  recognizedNotesCount: number;
  totalNotesCount: number;
  recognizedAccordsCount: number;
  totalAccordsCount: number;
  hasPyramidStructure: boolean;
}): { confidence: number; tier: "high" | "medium" | "low" } {
  const {
    recognizedNotesCount,
    totalNotesCount,
    recognizedAccordsCount,
    totalAccordsCount,
    hasPyramidStructure,
  } = params;

  if (totalNotesCount === 0 && totalAccordsCount === 0) {
    return { confidence: 0.0, tier: "low" };
  }

  const noteCoverage = totalNotesCount > 0 ? recognizedNotesCount / totalNotesCount : 0.5;
  const accordCoverage = totalAccordsCount > 0 ? recognizedAccordsCount / totalAccordsCount : 0.5;

  let baseConf = noteCoverage * 0.7 + accordCoverage * 0.3;

  // Bonus for structured pyramid with good note count
  if (hasPyramidStructure && recognizedNotesCount >= 3) {
    baseConf = Math.min(1.0, baseConf + 0.05);
  }

  // Penalty if very few notes are recognized
  if (recognizedNotesCount < 2 && totalNotesCount > 0) {
    baseConf = Math.max(0.1, baseConf - 0.2);
  }

  const roundedConfidence = Number(Math.min(1.0, Math.max(0.0, baseConf)).toFixed(2));

  let tier: "high" | "medium" | "low" = "low";
  if (roundedConfidence >= 0.8) tier = "high";
  else if (roundedConfidence >= 0.5) tier = "medium";

  return { confidence: roundedConfidence, tier };
}

/**
 * Deterministically derives the 10-dimensional feature vector and audit metadata from raw olfactive input.
 */
export function deriveOlfactiveFeatures(
  input: OlfactiveDerivationInput,
): OlfactiveDerivationResult {
  const topNotes = input.topNotes || [];
  const middleNotes = input.middleNotes || [];
  const baseNotes = input.baseNotes || [];
  const accords = input.accords || [];

  const rawAccumulator: Record<OlfactiveDimension, number> = {
    freshness: 0,
    sweetness: 0,
    warmth: 0,
    floral: 0,
    woody: 0,
    citrus: 0,
    spicy: 0,
    aquatic: 0,
    gourmand: 0,
    intensity: 0,
  };

  const dimensionBreakdown: Partial<Record<OlfactiveDimension, DimensionContributionDetail>> = {};
  for (const dim of ALL_DIMENSIONS) {
    dimensionBreakdown[dim] = {
      dimension: dim,
      rawValue: 0,
      normalizedValue: 0,
      contributingNotes: [],
      contributingAccords: [],
    };
  }

  const recognizedNotes: string[] = [];
  const unknownNotes: string[] = [];
  const recognizedAccords: string[] = [];
  const unknownAccords: string[] = [];

  // Helper to process note groups with respective pyramid weighting
  const processNoteGroup = (
    notes: string[],
    position: "top" | "middle" | "base",
    weight: number,
  ) => {
    for (const rawNote of notes) {
      if (!rawNote || typeof rawNote !== "string") continue;
      const { canonicalKey } = resolveCanonicalNote(rawNote);

      if (canonicalKey && CANONICAL_NOTES[canonicalKey]) {
        const noteDef = CANONICAL_NOTES[canonicalKey];
        recognizedNotes.push(noteDef.canonicalName);

        for (const [dim, value] of Object.entries(noteDef.contributions) as [
          OlfactiveDimension,
          number,
        ][]) {
          if (typeof value === "number" && value > 0) {
            const weightedValue = value * weight;
            rawAccumulator[dim] += weightedValue;

            dimensionBreakdown[dim]?.contributingNotes.push({
              name: noteDef.canonicalName,
              position,
              contribution: value,
              weight,
            });
          }
        }
      } else {
        unknownNotes.push(rawNote.trim());
      }
    }
  };

  // 1. Process Pyramid Notes with controlled weights
  processNoteGroup(topNotes, "top", DERIVATION_CONFIG.WEIGHTS.TOP_NOTES);
  processNoteGroup(middleNotes, "middle", DERIVATION_CONFIG.WEIGHTS.MIDDLE_NOTES);
  processNoteGroup(baseNotes, "base", DERIVATION_CONFIG.WEIGHTS.BASE_NOTES);

  // 2. Process Accords as secondary controlled modifier
  for (const rawAccord of accords) {
    if (!rawAccord || typeof rawAccord !== "string") continue;
    const { canonicalKey, resolvedType } = resolveCanonicalAccord(rawAccord);

    if (canonicalKey) {
      if (resolvedType === "accord" && CANONICAL_ACCORDS[canonicalKey]) {
        const accordDef = CANONICAL_ACCORDS[canonicalKey];
        recognizedAccords.push(accordDef.canonicalName);

        for (const [dim, value] of Object.entries(accordDef.contributions) as [
          OlfactiveDimension,
          number,
        ][]) {
          if (typeof value === "number" && value > 0) {
            const weightedValue = value * DERIVATION_CONFIG.WEIGHTS.ACCORDS;
            rawAccumulator[dim] += weightedValue;

            dimensionBreakdown[dim]?.contributingAccords.push({
              name: accordDef.canonicalName,
              contribution: value,
              weight: DERIVATION_CONFIG.WEIGHTS.ACCORDS,
            });
          }
        }
      } else if (resolvedType === "cross_category_note" && CANONICAL_NOTES[canonicalKey]) {
        const noteDef = CANONICAL_NOTES[canonicalKey];
        recognizedAccords.push(`${noteDef.canonicalName} (cross-category)`);

        for (const [dim, value] of Object.entries(noteDef.contributions) as [
          OlfactiveDimension,
          number,
        ][]) {
          if (typeof value === "number" && value > 0) {
            const weightedValue = value * DERIVATION_CONFIG.WEIGHTS.ACCORDS;
            rawAccumulator[dim] += weightedValue;

            dimensionBreakdown[dim]?.contributingAccords.push({
              name: `${noteDef.canonicalName} (from accord)`,
              contribution: value,
              weight: DERIVATION_CONFIG.WEIGHTS.ACCORDS,
            });
          }
        }
      } else {
        unknownAccords.push(rawAccord.trim());
      }
    } else {
      unknownAccords.push(rawAccord.trim());
    }
  }

  // 3. Handle Intensity Dimension (Inferred / Verified / Hybrid)
  const intensitySource =
    input.intensitySource ||
    (input.intensityOverride !== undefined
      ? "verified"
      : input.performance
        ? "hybrid"
        : "inferred");
  let finalIntensity = 0.5;

  if (input.intensityOverride !== undefined) {
    finalIntensity = Math.min(1.0, Math.max(0.0, Number(input.intensityOverride.toFixed(2))));
  } else {
    const rawNoteIntensity = rawAccumulator.intensity;
    const normalizedInferred = normalizeDimensionScore(rawNoteIntensity);

    if (input.performance && (input.performance.sillage || input.performance.longevity)) {
      const perfIntensity = deriveIntensityFromPerformanceMetrics(
        input.performance.sillage,
        input.performance.longevity,
      );
      // Hybrid: 40% inferred from heavy notes/accords + 60% from performance specs
      finalIntensity = Number(
        Math.min(1.0, Math.max(0.0, normalizedInferred * 0.4 + perfIntensity * 0.6)).toFixed(2),
      );
    } else {
      // Inferred baseline plus note intensity
      finalIntensity = Number(
        Math.min(1.0, Math.max(0.1, 0.35 + normalizedInferred * 0.65)).toFixed(2),
      );
    }
  }

  // 4. Normalize and clamp all dimensions
  const features: FragranceFeatureVector = {
    freshness: normalizeDimensionScore(rawAccumulator.freshness),
    sweetness: normalizeDimensionScore(rawAccumulator.sweetness),
    warmth: normalizeDimensionScore(rawAccumulator.warmth),
    floral: normalizeDimensionScore(rawAccumulator.floral),
    woody: normalizeDimensionScore(rawAccumulator.woody),
    citrus: normalizeDimensionScore(rawAccumulator.citrus),
    spicy: normalizeDimensionScore(rawAccumulator.spicy),
    aquatic: normalizeDimensionScore(rawAccumulator.aquatic),
    gourmand: normalizeDimensionScore(rawAccumulator.gourmand),
    intensity: finalIntensity,
  };

  // Update breakdown records with raw and normalized numbers
  for (const dim of ALL_DIMENSIONS) {
    if (dimensionBreakdown[dim]) {
      dimensionBreakdown[dim]!.rawValue = Number(rawAccumulator[dim].toFixed(3));
      dimensionBreakdown[dim]!.normalizedValue = features[dim];
    }
  }

  // 5. Compute metadata and confidence
  const totalNotesCount = topNotes.length + middleNotes.length + baseNotes.length;
  const totalAccordsCount = accords.length;
  const hasPyramidStructure =
    topNotes.length > 0 && (middleNotes.length > 0 || baseNotes.length > 0);

  const { confidence, tier } = calculateDerivationConfidence({
    recognizedNotesCount: recognizedNotes.length,
    totalNotesCount,
    recognizedAccordsCount: recognizedAccords.length,
    totalAccordsCount,
    hasPyramidStructure,
  });

  const metadata: OlfactiveDerivationMetadata = {
    recognizedNotes,
    recognizedAccords,
    unknownNotes,
    unknownAccords,
    noteCoverage:
      totalNotesCount > 0 ? Number((recognizedNotes.length / totalNotesCount).toFixed(2)) : 0,
    accordCoverage:
      totalAccordsCount > 0 ? Number((recognizedAccords.length / totalAccordsCount).toFixed(2)) : 0,
    confidence,
    confidenceTier: tier,
    intensitySource,
    dimensionBreakdown,
  };

  return {
    features,
    metadata,
  };
}
