import type { OlfactiveSourceInfo } from "./types";

/**
 * Registry of authorized, source-agnostic olfactive data providers.
 * Strictly avoids automated web scraping or unauthorized data collection.
 */
export const OLFACTIVE_DATA_PROVIDERS: Record<string, OlfactiveSourceInfo> = {
  ABNA_INTERNAL_LAB: {
    provider: "ABNA Internal Fragrance Lab",
    providerProductId: null,
    sourceType: "official",
    licensed: true,
    verifiedAt: "2026-08-27T00:00:00Z",
  },
  PERFUMER_TECHNICAL_SHEET: {
    provider: "Authorized Perfumer Formula Sheet",
    providerProductId: null,
    sourceType: "official",
    licensed: true,
    verifiedAt: "2026-08-27T00:00:00Z",
  },
  MANUAL_CURATION_AUDIT: {
    provider: "ABNA Retail Senior Evaluator Team",
    providerProductId: null,
    sourceType: "manual",
    licensed: true,
    verifiedAt: "2026-08-27T00:00:00Z",
  },
  PENDING_ENRICHMENT: {
    provider: "Unassigned Provider (Pending Enrichment)",
    providerProductId: null,
    sourceType: "pending",
    licensed: false,
  },
};
