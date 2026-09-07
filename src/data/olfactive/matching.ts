import type { OfficialABNAProduct } from "../abna/types";
import { evaluateMatchConfidence } from "./confidence";
import type { OlfactiveMatchMetadata } from "./types";

export interface OlfactiveCandidateReference {
  candidateId: string;
  name: string;
  brand: string;
  fragranceFamily: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  accords: string[];
}

/**
 * Searches and ranks candidate matches for an official ABNA product.
 */
export function findBestOlfactiveMatch(
  product: OfficialABNAProduct,
  candidates: OlfactiveCandidateReference[],
): {
  bestMatch: OlfactiveCandidateReference | null;
  metadata: OlfactiveMatchMetadata;
} {
  let highestScore = 0;
  let bestCandidate: OlfactiveCandidateReference | null = null;
  let bestMethod: OlfactiveMatchMetadata["method"] = "unmatched";

  for (const c of candidates) {
    const { confidence, method } = evaluateMatchConfidence(
      product.name,
      product.normalizedDesigner,
      c.name,
      c.brand,
    );

    if (confidence > highestScore) {
      highestScore = confidence;
      bestCandidate = c;
      bestMethod = method;
    }
  }

  if (highestScore >= 0.7 && bestCandidate) {
    return {
      bestMatch: bestCandidate,
      metadata: {
        sourceName: bestCandidate.name,
        sourceBrand: bestCandidate.brand,
        method: bestMethod,
        confidence: highestScore,
        matchedAt: "2026-08-27T00:00:00Z",
      },
    };
  }

  return {
    bestMatch: null,
    metadata: {
      sourceName: null,
      sourceBrand: null,
      method: "unmatched",
      confidence: highestScore,
    },
  };
}
