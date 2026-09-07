/**
 * Phase 3 — AI Narrative Service (Gemini Integration)
 *
 * Responsibilities:
 * 1. Takes the deterministic Top 3 fragrances & customer profile.
 * 2. Prompts Gemini strictly for editorial narratives (whyMatch, story, aura).
 * 3. Enforces strict schema validation via Zod.
 * 4. Verifies ID alignment against authoritative deterministic products.
 * 5. Provides resilient, elegant fallbacks if Gemini is unreachable or returns invalid data.
 */

import {
  GeminiNarrativeResponseSchema,
  type NarrativeGenerationInput,
  type ProductNarrative,
} from "./narrative-types";
import type { CustomerPreferenceProfile, ScoredFragrance } from "./recommendation-types";

/**
 * Builds a deterministic factual fallback narrative for a single scored fragrance.
 */
export function buildFallbackNarrative(
  item: ScoredFragrance,
  profile: CustomerPreferenceProfile,
): ProductNarrative {
  const f = item.fragrance;
  const mood = profile.metadata.mood ? profile.metadata.mood.toLowerCase() : "elegance";
  const occasion = profile.metadata.occasion || "daily wear";
  const dominantFamilies = profile.metadata.scent_family.length
    ? profile.metadata.scent_family.join(", ")
    : f.fragranceFamily;

  return {
    fragranceId: f.id,
    whyMatch: `Harmonis sempurna dengan preferensi aroma ${dominantFamilies} dan intensitas ${f.performance.sillage} untuk suasana ${occasion}.`,
    story: f.catalog.editorialStory || f.description,
    aura: `${profile.metadata.mood ? profile.metadata.mood.toUpperCase() : "SIGNATURE"} · ${f.fragranceFamily.toUpperCase()}`,
  };
}

/**
 * Builds fallback narratives for all deterministic top products.
 */
export function buildAllFallbackNarratives(
  topProducts: ScoredFragrance[],
  profile: CustomerPreferenceProfile,
): Map<string, ProductNarrative> {
  const map = new Map<string, ProductNarrative>();
  for (const prod of topProducts) {
    map.set(prod.fragranceId, buildFallbackNarrative(prod, profile));
  }
  return map;
}

/**
 * Generates personalized editorial narratives for the deterministic Top 3 products.
 */
export async function generatePersonalizedNarratives(
  input: NarrativeGenerationInput,
): Promise<Map<string, ProductNarrative>> {
  const fallbackMap = buildAllFallbackNarratives(input.topProducts, input.customerProfile);

  // If no API key or empty products, immediately return authoritative fallbacks
  if (!input.apiKey || input.apiKey === "your_api_key_here" || !input.topProducts.length) {
    return fallbackMap;
  }

  const { customerProfile, topProducts, apiKey } = input;

  // Build the factual grounding context for the prompt
  const customerSummary = [
    customerProfile.metadata.mood && `Emotional Mood: ${customerProfile.metadata.mood}`,
    customerProfile.metadata.atmosphere && `Atmosphere: ${customerProfile.metadata.atmosphere}`,
    customerProfile.metadata.scent_family.length &&
      `Scent Families Loved: ${customerProfile.metadata.scent_family.join(", ")}`,
    `Desired Projection Intensity: ${customerProfile.metadata.intensity_raw}/5`,
    customerProfile.metadata.occasion && `Occasion: ${customerProfile.metadata.occasion}`,
  ]
    .filter(Boolean)
    .join("\n");

  const productContext = topProducts.map((p) => ({
    id: p.fragranceId,
    rank: p.rank,
    name: p.fragrance.name,
    brand: p.fragrance.brand,
    family: p.fragrance.fragranceFamily,
    match_percent: `${p.matchPercent}%`,
    notes_top: p.fragrance.notes.top.join(", "),
    notes_middle: p.fragrance.notes.middle.join(", "),
    notes_base: p.fragrance.notes.base.join(", "),
    accords: p.fragrance.accords.join(", "),
    sillage: p.fragrance.performance.sillage,
    longevity: p.fragrance.performance.longevity,
    editorial_essence: p.fragrance.catalog.editorialStory,
  }));

  const systemPrompt = `You are AURA AI — an elite scent consultant for the luxury fragrance house ABNA.
Your role is to write sophisticated, personal, sensory editorial storytelling for fragrance recommendations.

CRITICAL ARCHITECTURAL CONSTRAINTS:
1. The deterministic recommendation engine has ALREADY selected the products and calculated their match percentages.
2. DO NOT change the products, DO NOT change the ranking, and DO NOT alter any numerical match percentages.
3. DO NOT invent notes or products. Use ONLY the factual notes, accords, and details provided.
4. Output MUST strictly be a JSON object with a "narratives" array containing exactly the provided fragrance IDs.
5. Tone: editorial, evocative, sensory, Indonesian-friendly luxury consulting. Elegant — never corporate or generic.`;

  const userPrompt = `CUSTOMER PROFILE:
${customerSummary}

DETERMINISTIC AUTHORITATIVE PRODUCTS (Selected by Scoring Engine):
${JSON.stringify(productContext, null, 2)}

TASK:
For EACH of the ${topProducts.length} fragrances above, write:
- "fragranceId": exact matching id from the input
- "whyMatch": 1-2 personalized sentences explaining why this specific composition aligns with the customer's mood, occasion, and scent preferences (in Indonesian).
- "story": 1 evocative editorial sentence capturing the atmosphere of wearing this fragrance.
- "aura": A poetic 2-5 word identity tagline (e.g. "RADIANT SOLAR EMBRACE", "NOCTURNAL SMOKED VELVET").

Return ONLY valid JSON matching this exact structure:
{
  "narratives": [
    {
      "fragranceId": "...",
      "whyMatch": "...",
      "story": "...",
      "aura": "..."
    }
  ]
}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(
        `[AURA AI Narrative] Gateway responded with ${res.status}. Using deterministic fallbacks.`,
      );
      return fallbackMap;
    }

    const payload = await res.json();
    const content: string = payload.choices?.[0]?.message?.content ?? "{}";
    const cleaned = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    const validated = GeminiNarrativeResponseSchema.safeParse(parsed);
    if (!validated.success) {
      console.warn(
        "[AURA AI Narrative] Zod validation failed for Gemini response. Using fallback.",
        validated.error,
      );
      return fallbackMap;
    }

    // Merge validated narratives, verifying that returned fragranceId belongs to authoritative top products
    const authoritativeIds = new Set(topProducts.map((p) => p.fragranceId));
    const mergedMap = new Map<string, ProductNarrative>(fallbackMap);

    for (const narrative of validated.data.narratives) {
      if (authoritativeIds.has(narrative.fragranceId)) {
        mergedMap.set(narrative.fragranceId, narrative);
      }
    }

    return mergedMap;
  } catch (err) {
    console.warn(
      "[AURA AI Narrative] Error or timeout generating narratives. Falling back safely.",
      err,
    );
    return fallbackMap;
  }
}
