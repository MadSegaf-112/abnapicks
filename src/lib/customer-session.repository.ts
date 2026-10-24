/**
 * Phase 6H-3 — Customer Session Repository & Persistence Layer
 *
 * Handles data mapping, validation, and storage of customer consultation sessions.
 *
 * Invariants:
 * 1. Zero PII: Does NOT collect or store name, email, phone, address, or IP.
 * 2. Demographic Isolation: Demographics are strictly stored for analytics and have
 *    zero impact on recommendation ranking.
 * 3. Failure-Isolated: Errors during persistence are captured safely and NEVER throw
 *    to break the customer recommendation experience.
 * 4. Idempotent: Deduplication using session_id.
 */

import { z } from "zod";
import type { CustomerPreferenceProfile } from "@/data/recommendation-types";
import type { Recommendation } from "./recommendations.functions";
import { getSupabaseServerClient } from "./supabase.server";

// 1. Zod Schema for Validating Structured Recommendation Items in Session
export const PersistedRecommendationItemSchema = z.object({
  rank: z.number().int().min(1),
  id: z.string(),
  name: z.string(),
  house: z.string(),
  category: z.string(),
  match_percent: z.number().int().min(0).max(100),
  description: z.string().optional(),
  why_match: z.string().optional(),
  aura: z.string().optional(),
});

export type PersistedRecommendationItem = z.infer<typeof PersistedRecommendationItemSchema>;

// 2. Customer Session Record Contract (Exact Database Row Shape)
export const CustomerSessionRecordSchema = z.object({
  session_id: z.string().min(1),
  completed: z.boolean().default(true),
  client_platform: z.string().default("kiosk_web"),

  // Demographics / Marketing Analytics
  gender: z.string().nullable().optional(),
  age_range: z.string().nullable().optional(),
  occupation: z.string().nullable().optional(),
  price_range: z.string().nullable().optional(),

  // Olfactive Preferences
  mood: z.string().nullable().optional(),
  atmosphere: z.string().nullable().optional(),
  scent_families: z.array(z.string()).default([]),
  intensity: z.string().nullable().optional(),
  occasion: z.string().nullable().optional(),

  // Recommendation Outputs
  recommendations: z.array(PersistedRecommendationItemSchema),
  top_fragrance_id: z.string(),
  top_fragrance_name: z.string(),
  top_fragrance_house: z.string(),
  top_match_percent: z.number().int(),
});

export type CustomerSessionRecord = z.infer<typeof CustomerSessionRecordSchema>;

export interface SaveSessionInput {
  sessionId?: string;
  customerProfile: CustomerPreferenceProfile;
  recommendations: Recommendation[];
  clientPlatform?: string;
}

export interface SaveSessionResult {
  success: boolean;
  sessionId: string;
  persisted: boolean;
  error?: string;
}

/**
 * Builds a validated, privacy-safe CustomerSessionRecord from recommendation inputs and outputs.
 */
export function buildCustomerSessionRecord(input: SaveSessionInput): CustomerSessionRecord {
  const meta = input.customerProfile.metadata;
  const topRec = input.recommendations[0];

  // Map recommendations to persisted format
  const persistedRecs: PersistedRecommendationItem[] = input.recommendations.map((rec) => ({
    rank: rec.rank,
    id: rec.id || rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: rec.name,
    house: rec.house,
    category: rec.category,
    match_percent: Math.round(rec.match_percent),
    description: rec.description,
    why_match: rec.why_match,
    aura: rec.aura,
  }));

  // Generate deterministic/unique session_id if not supplied
  const sessionId =
    input.sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Map intensity string safely
  const intensityMap: Record<number, string> = {
    1: "lembut",
    2: "lembut",
    3: "seimbang",
    4: "semerbak",
    5: "semerbak",
  };
  const intensityStr =
    typeof meta.intensity_raw === "number"
      ? intensityMap[meta.intensity_raw] || String(meta.intensity_raw)
      : undefined;

  const rawRecord = {
    session_id: sessionId,
    completed: true,
    client_platform: input.clientPlatform || "kiosk_web",
    gender: meta.gender || null,
    age_range: meta.age_range || null,
    occupation: meta.occupation || null,
    price_range: meta.price_range || null,
    mood: meta.mood || null,
    atmosphere: meta.atmosphere || null,
    scent_families: meta.scent_family || [],
    intensity: intensityStr || null,
    occasion: meta.occasion || null,
    recommendations: persistedRecs,
    top_fragrance_id: topRec
      ? topRec.id || topRec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "unknown",
    top_fragrance_name: topRec ? topRec.name : "Unknown",
    top_fragrance_house: topRec ? topRec.house : "Unknown",
    top_match_percent: topRec ? Math.round(topRec.match_percent) : 0,
  };

  return CustomerSessionRecordSchema.parse(rawRecord);
}

/**
 * Persists a completed customer session to the database.
 * If Supabase is unconfigured or encounters an error, safely logs and returns failure
 * without throwing, guaranteeing that recommendation delivery to the customer is never interrupted.
 */
export async function saveCustomerSession(input: SaveSessionInput): Promise<SaveSessionResult> {
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    console.log(
      "[Persistence Diagnostic] >>> saveCustomerSession entered. Input SessionId:",
      input.sessionId,
    );
  }

  let record: CustomerSessionRecord;
  try {
    record = buildCustomerSessionRecord(input);
    if (isDev) {
      console.log(
        "[Persistence Diagnostic] Record successfully constructed. Session ID:",
        record.session_id,
      );
    }
  } catch (parseError) {
    const msg = parseError instanceof Error ? parseError.message : "Schema validation failed";
    console.warn("[CustomerSessionRepository] Failed to build session record:", msg);
    return {
      success: false,
      sessionId: input.sessionId || "unknown",
      persisted: false,
      error: `Validation error: ${msg}`,
    };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    if (isDev) {
      console.warn(
        "[Persistence Diagnostic] Supabase client is NULL. Check SUPABASE_URL or API keys in environment.",
      );
    }
    // Graceful degradation when database credentials are not configured yet
    return {
      success: true,
      sessionId: record.session_id,
      persisted: false,
      error: "Supabase client not configured (SUPABASE_URL or keys missing)",
    };
  }

  try {
    if (isDev) {
      console.log("[Persistence Diagnostic] Executing upsert into table 'customer_sessions'...");
    }
    // Upsert with onConflict on session_id for idempotency
    const { error } = await supabase
      .from("customer_sessions")
      .upsert(record, { onConflict: "session_id" });

    if (error) {
      console.warn(
        "[CustomerSessionRepository] Database insert warning:",
        error.message,
        error.code,
        error.details,
      );
      return {
        success: true,
        sessionId: record.session_id,
        persisted: false,
        error: error.message,
      };
    }

    if (isDev) {
      console.log(
        "[Persistence Diagnostic] >>> SUCCESS: Row successfully persisted to Supabase customer_sessions table! Session ID:",
        record.session_id,
      );
    }

    return {
      success: true,
      sessionId: record.session_id,
      persisted: true,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown database error";
    console.warn("[CustomerSessionRepository] Unexpected persistence error:", errorMsg);
    return {
      success: true,
      sessionId: record.session_id,
      persisted: false,
      error: errorMsg,
    };
  }
}
