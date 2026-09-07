import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildCustomerProfile } from "@/data/customer-profile";
import { scoreAndRankFragrances } from "@/data/scoring-engine";
import { ABNA_RECOMMENDATION_DATASET } from "@/data/abna-recommendation-adapter";
import { generatePersonalizedNarratives } from "@/data/narrative-service";
import { formatRecommendationsWithNarratives } from "@/data/recommendation-adapter";
import { getServerConfig } from "./config.server";
import { saveCustomerSession } from "./customer-session.repository";

const AnswerSchema = z.object({
  sessionId: z.string().optional(),
  clientPlatform: z.string().optional(),
  mood: z.string().optional(),
  atmosphere: z.string().optional(),
  scent_family: z.array(z.string()).optional(),
  intensity: z.union([z.number(), z.string()]).optional(),
  occasion: z.string().optional(),
  gender: z.string().optional(),
  age_range: z.string().optional(),
  occupation: z.string().optional(),
  price_range: z.string().optional(),
});

const RecommendationSchema = z.object({
  rank: z.number(),
  name: z.string(),
  house: z.string(),
  category: z.string(),
  match_percent: z.number(),
  description: z.string(),
  story: z.string(),
  top_notes: z.array(z.string()),
  middle_notes: z.array(z.string()),
  base_notes: z.array(z.string()),
  why_match: z.string(),
  projection: z.string(),
  longevity: z.string(),
  mood_tags: z.array(z.string()),
  occasions: z.array(z.string()),
  aura: z.string(),
});

export type Recommendation = z.infer<typeof RecommendationSchema>;

export const getRecommendations = createServerFn({ method: "POST" })
  .validator((data: unknown) => AnswerSchema.parse(data))
  .handler(async ({ data }) => {
    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      console.log(
        "[Runtime Diagnostic 1] >>> getRecommendations() triggered by client. SessionId:",
        data.sessionId || "(auto-assign)",
      );
    }

    // 1. Build normalized Customer Preference Profile deterministically from quiz answers
    // Note: Demographics (gender, age_range, occupation, price_range) are attached to metadata only
    const customerProfile = buildCustomerProfile({
      mood: data.mood,
      atmosphere: data.atmosphere,
      scent_family: data.scent_family,
      intensity: data.intensity,
      occasion: data.occasion,
      gender: data.gender,
      age_range: data.age_range,
      occupation: data.occupation,
      price_range: data.price_range,
    });

    // 2. Run deterministic scoring engine against authoritative ABNA fragrance dataset (444 validated products)
    const scoringResult = scoreAndRankFragrances(customerProfile, ABNA_RECOMMENDATION_DATASET, 3);

    // 3. Generate personalized editorial narrative with Gemini (or fallback safely)
    const config = getServerConfig();
    const apiKey = config.lovableApiKey || process.env.LOVABLE_API_KEY;
    const narratives = await generatePersonalizedNarratives({
      customerProfile,
      topProducts: scoringResult.recommendations,
      apiKey,
    });

    // 4. Adapt deterministic recommendations + editorial narratives for UI consumption
    const formattedRecs = formatRecommendationsWithNarratives(
      scoringResult.recommendations,
      customerProfile,
      narratives,
    );

    // 5. Enforce strict Zod schema validation
    const validatedRecs = z.array(RecommendationSchema).parse(formattedRecs);
    if (isDev) {
      console.log(
        `[Runtime Diagnostic 2] Recommendations generated successfully. Count: ${validatedRecs.length}, Top Recommendation: "${validatedRecs[0]?.name}" (${validatedRecs[0]?.house})`,
      );
      console.log("[Runtime Diagnostic 3] Invoking saveCustomerSession()...");
    }

    // 6. Asynchronously persist completed consultation session for Admin Analytics
    // Protected by failure-isolation: persistence failure does NOT interrupt recommendation delivery
    try {
      const saveRes = await saveCustomerSession({
        sessionId: data.sessionId,
        clientPlatform: data.clientPlatform || "kiosk_web",
        customerProfile,
        recommendations: validatedRecs,
      });
      if (isDev) {
        console.log("[Runtime Diagnostic 4] saveCustomerSession() completed with result:", saveRes);
      }
    } catch (persistErr) {
      // Safe logging without throwing or breaking customer flow
      console.warn("[RecommendationsHandler] Session persistence failed safely:", persistErr);
    }

    return {
      recommendations: validatedRecs,
      customerProfile,
    };
  });
