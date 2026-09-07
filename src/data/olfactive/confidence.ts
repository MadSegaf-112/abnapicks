import type { MatchMethod } from "./types";

/**
 * Normalizes string for token-level matching.
 */
export function normalizeTokenString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Computes Levenshtein edit distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

/**
 * Calculates string similarity score between 0.0 and 1.0.
 */
export function calculateStringSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(s1, s2);
  return Math.max(0, (maxLen - dist) / maxLen);
}

/**
 * Evaluates match confidence between an ABNA product and an olfactive reference candidate.
 * Treats Name + Brand as the primary identity pair to prevent cross-brand false positives.
 * (e.g. Dior Sauvage will never be matched to Sauvage from another brand).
 */
export function evaluateMatchConfidence(
  targetName: string,
  targetBrand: string,
  candidateName: string,
  candidateBrand: string,
): { confidence: number; method: MatchMethod } {
  const rawTargetName = targetName.trim().toLowerCase();
  const rawCandidateName = candidateName.trim().toLowerCase();
  const rawTargetBrand = targetBrand.trim().toLowerCase();
  const rawCandidateBrand = candidateBrand.trim().toLowerCase();

  const normTargetName = normalizeTokenString(targetName);
  const normCandidateName = normalizeTokenString(candidateName);
  const normTargetBrand = normalizeTokenString(targetBrand);
  const normCandidateBrand = normalizeTokenString(candidateBrand);

  const brandSim = calculateStringSimilarity(normTargetBrand, normCandidateBrand);
  const isBrandExact =
    rawTargetBrand === rawCandidateBrand || normTargetBrand === normCandidateBrand;
  const isBrandCompatible =
    isBrandExact ||
    brandSim >= 0.75 ||
    normTargetBrand.includes(normCandidateBrand) ||
    normCandidateBrand.includes(normTargetBrand);

  // Cross-brand protection: If brands are completely different, reject immediately as unmatched
  if (!isBrandCompatible) {
    return { confidence: 0.0, method: "unmatched" };
  }

  // 1. Priority 1: Exact Brand + Exact Fragrance Name
  if (isBrandExact && rawTargetName === rawCandidateName) {
    return { confidence: 1.0, method: "exact" };
  }

  // 2. Priority 2: Normalized Exact Brand + Normalized Exact Fragrance Name
  if (isBrandExact && normTargetName === normCandidateName) {
    return { confidence: 0.96, method: "normalized-exact" };
  }

  // 3. Priority 3: High-Confidence Alias / Substring Match with Compatible Brand
  if (
    isBrandCompatible &&
    (normTargetName.includes(normCandidateName) || normCandidateName.includes(normTargetName))
  ) {
    const confidence = isBrandExact ? 0.92 : 0.85;
    return { confidence, method: "fuzzy" };
  }

  // 4. Priority 4: Fuzzy Levenshtein Match with Brand Weighting
  const nameSim = calculateStringSimilarity(normTargetName, normCandidateName);
  if (nameSim >= 0.8 && isBrandCompatible) {
    const combined = Number((nameSim * 0.7 + brandSim * 0.3).toFixed(2));
    if (combined >= 0.8) {
      return { confidence: combined, method: "fuzzy" };
    }
  }

  // 5. Default Unmatched / Requires Manual Review
  const fallbackScore = Number((nameSim * 0.6 + brandSim * 0.4).toFixed(2));
  return { confidence: Math.min(fallbackScore, 0.75), method: "unmatched" };
}
