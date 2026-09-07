import { g as getSupabaseServerClient } from "./supabase.server-B40vTsTo.mjs";
import { o as objectType, n as numberType, s as stringType, a as arrayType, b as booleanType } from "../_libs/zod.mjs";
const PersistedRecommendationItemSchema = objectType({
  rank: numberType().int().min(1),
  id: stringType(),
  name: stringType(),
  house: stringType(),
  category: stringType(),
  match_percent: numberType().int().min(0).max(100),
  description: stringType().optional(),
  why_match: stringType().optional(),
  aura: stringType().optional()
});
const CustomerSessionRecordSchema = objectType({
  session_id: stringType().min(1),
  completed: booleanType().default(true),
  client_platform: stringType().default("kiosk_web"),
  // Demographics / Marketing Analytics
  gender: stringType().nullable().optional(),
  age_range: stringType().nullable().optional(),
  occupation: stringType().nullable().optional(),
  price_range: stringType().nullable().optional(),
  // Olfactive Preferences
  mood: stringType().nullable().optional(),
  atmosphere: stringType().nullable().optional(),
  scent_families: arrayType(stringType()).default([]),
  intensity: stringType().nullable().optional(),
  occasion: stringType().nullable().optional(),
  // Recommendation Outputs
  recommendations: arrayType(PersistedRecommendationItemSchema),
  top_fragrance_id: stringType(),
  top_fragrance_name: stringType(),
  top_fragrance_house: stringType(),
  top_match_percent: numberType().int()
});
function buildCustomerSessionRecord(input) {
  const meta = input.customerProfile.metadata;
  const topRec = input.recommendations[0];
  const persistedRecs = input.recommendations.map((rec) => ({
    rank: rec.rank,
    id: rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: rec.name,
    house: rec.house,
    category: rec.category,
    match_percent: Math.round(rec.match_percent),
    description: rec.description,
    why_match: rec.why_match,
    aura: rec.aura
  }));
  const sessionId = input.sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const intensityMap = {
    1: "lembut",
    2: "lembut",
    3: "seimbang",
    4: "semerbak",
    5: "semerbak"
  };
  const intensityStr = typeof meta.intensity_raw === "number" ? intensityMap[meta.intensity_raw] || String(meta.intensity_raw) : void 0;
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
    top_fragrance_id: topRec ? topRec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "unknown",
    top_fragrance_name: topRec ? topRec.name : "Unknown",
    top_fragrance_house: topRec ? topRec.house : "Unknown",
    top_match_percent: topRec ? Math.round(topRec.match_percent) : 0
  };
  return CustomerSessionRecordSchema.parse(rawRecord);
}
async function saveCustomerSession(input) {
  const isDev = false;
  let record;
  try {
    record = buildCustomerSessionRecord(input);
    if (isDev) ;
  } catch (parseError) {
    const msg = parseError instanceof Error ? parseError.message : "Schema validation failed";
    console.warn("[CustomerSessionRepository] Failed to build session record:", msg);
    return {
      success: false,
      sessionId: input.sessionId || "unknown",
      persisted: false,
      error: `Validation error: ${msg}`
    };
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      success: true,
      sessionId: record.session_id,
      persisted: false,
      error: "Supabase client not configured (SUPABASE_URL or keys missing)"
    };
  }
  try {
    if (isDev) ;
    const { error } = await supabase.from("customer_sessions").upsert(record, { onConflict: "session_id" });
    if (error) {
      console.warn(
        "[CustomerSessionRepository] Database insert warning:",
        error.message,
        error.code,
        error.details
      );
      return {
        success: true,
        sessionId: record.session_id,
        persisted: false,
        error: error.message
      };
    }
    if (isDev) ;
    return {
      success: true,
      sessionId: record.session_id,
      persisted: true
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown database error";
    console.warn("[CustomerSessionRepository] Unexpected persistence error:", errorMsg);
    return {
      success: true,
      sessionId: record.session_id,
      persisted: false,
      error: errorMsg
    };
  }
}
export {
  CustomerSessionRecordSchema as C,
  saveCustomerSession as s
};
