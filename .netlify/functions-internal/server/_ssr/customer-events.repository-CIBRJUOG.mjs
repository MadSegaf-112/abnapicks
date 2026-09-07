import { g as getSupabaseServerClient } from "./supabase.server-B40vTsTo.mjs";
import { o as objectType, s as stringType, r as recordType, u as unknownType, n as numberType, e as enumType } from "../_libs/zod.mjs";
const CONSULTATION_EVENT_TYPES = [
  "consultation_started",
  "question_viewed",
  "question_answered",
  "results_viewed",
  "consultation_completed"
];
const ConsultationEventTypeSchema = enumType(CONSULTATION_EVENT_TYPES);
const ConsultationEventInputSchema = objectType({
  sessionId: stringType().min(1),
  eventType: ConsultationEventTypeSchema,
  questionNumber: numberType().int().min(1).max(9).nullable().optional(),
  stepId: stringType().nullable().optional(),
  clientPlatform: stringType().default("kiosk_web"),
  metadata: recordType(unknownType()).optional().default({}),
  createdAt: stringType().optional()
});
objectType({
  id: stringType().optional(),
  session_id: stringType().min(1),
  event_type: stringType(),
  question_number: numberType().int().nullable().optional(),
  step_id: stringType().nullable().optional(),
  client_platform: stringType().default("kiosk_web"),
  metadata: recordType(unknownType()).default({}),
  created_at: stringType()
});
const inMemoryEvents = [];
async function saveConsultationEvent(input) {
  const parseResult = ConsultationEventInputSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      success: false,
      error: `Validation failed: ${parseResult.error.message}`
    };
  }
  const validated = parseResult.data;
  const nowStr = validated.createdAt || (/* @__PURE__ */ new Date()).toISOString();
  const record = {
    session_id: validated.sessionId,
    event_type: validated.eventType,
    question_number: validated.questionNumber ?? null,
    step_id: validated.stepId ?? null,
    client_platform: validated.clientPlatform || "kiosk_web",
    metadata: validated.metadata || {},
    created_at: nowStr
  };
  const isDuplicate = inMemoryEvents.some(
    (e) => e.session_id === record.session_id && e.event_type === record.event_type && e.question_number === record.question_number
  );
  if (!isDuplicate) {
    inMemoryEvents.push(record);
  }
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("consultation_events").insert([record]);
      if (error) {
        console.warn("[ConsultationEvents] Supabase insert warning:", error.message);
      }
    } catch (err) {
      console.warn("[ConsultationEvents] Supabase unexpected error:", err);
    }
  }
  return { success: true };
}
async function getConsultationEvents(filters) {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      let query = supabase.from("consultation_events").select("*").order("created_at", { ascending: true });
      if (filters?.startDate) query = query.gte("created_at", filters.startDate);
      if (filters?.endDate) query = query.lte("created_at", filters.endDate);
      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch {
    }
  }
  let filtered = [...inMemoryEvents];
  if (filters?.startDate) {
    const startMs = new Date(filters.startDate).getTime();
    filtered = filtered.filter((e) => new Date(e.created_at).getTime() >= startMs);
  }
  if (filters?.endDate) {
    const endMs = new Date(filters.endDate).getTime();
    filtered = filtered.filter((e) => new Date(e.created_at).getTime() <= endMs);
  }
  return filtered;
}
async function deleteConsultationEventsBySessionId(sessionId) {
  for (let i = inMemoryEvents.length - 1; i >= 0; i--) {
    if (inMemoryEvents[i]?.session_id === sessionId) {
      inMemoryEvents.splice(i, 1);
    }
  }
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("consultation_events").delete().eq("session_id", sessionId);
      if (error) {
        console.warn("[ConsultationEvents] Event deletion warning:", error.message);
      }
    } catch (err) {
      console.warn("[ConsultationEvents] Unexpected event delete error:", err);
    }
  }
  return { success: true };
}
export {
  ConsultationEventInputSchema as C,
  deleteConsultationEventsBySessionId as d,
  getConsultationEvents as g,
  saveConsultationEvent as s
};
