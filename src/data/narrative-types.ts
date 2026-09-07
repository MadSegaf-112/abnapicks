/**
 * Phase 3 — AI Narrative Layer Types & Zod Schemas
 *
 * Strict contracts for Gemini narrative generation.
 * Gemini produces ONLY personalized editorial story, whyMatch, and aura tagline
 * for already-selected deterministic products.
 */

import { z } from "zod";
import type { CustomerPreferenceProfile, ScoredFragrance } from "./recommendation-types";

/**
 * Editorial narrative generated per product.
 */
export const ProductNarrativeSchema = z.object({
  fragranceId: z.string(),
  whyMatch: z.string().min(5).max(300),
  story: z.string().min(5).max(300),
  aura: z.string().min(2).max(60),
});

export type ProductNarrative = z.infer<typeof ProductNarrativeSchema>;

/**
 * Expected JSON payload returned from Gemini narrative generation.
 */
export const GeminiNarrativeResponseSchema = z.object({
  narratives: z.array(ProductNarrativeSchema),
});

export type GeminiNarrativeResponse = z.infer<typeof GeminiNarrativeResponseSchema>;

/**
 * Input structure passed to the narrative generator service.
 */
export interface NarrativeGenerationInput {
  customerProfile: CustomerPreferenceProfile;
  topProducts: ScoredFragrance[];
  apiKey?: string;
}
