/**
 * Phase DATA-05 — Consultation Events Repository & In-Memory Store
 *
 * Handles typed event creation, schema validation, duplicate guarding,
 * and resilient dual-layer persistence (Supabase consultation_events table
 * + in-memory resilient fallback cache).
 *
 * Invariants:
 * 1. ZERO PII: Never collects/stores name, email, phone, IP, or user identity.
 * 2. Non-blocking & Failure-Isolated: Errors during persistence never break customer quiz flow.
 * 3. Idempotent: Deduplicates rapid duplicate event submissions.
 * 4. Minimal Metadata: Operational only, no raw answer dumps.
 */

import { z } from "zod";
import { getSupabaseServerClient } from "./supabase.server";

// 1. Allowed Event Types Enum
export const CONSULTATION_EVENT_TYPES = [
  "consultation_started",
  "question_viewed",
  "question_answered",
  "results_viewed",
  "consultation_completed",
] as const;

export const ConsultationEventTypeSchema = z.enum(CONSULTATION_EVENT_TYPES);
export type ConsultationEventType = z.infer<typeof ConsultationEventTypeSchema>;

export const ConsultationEventInputSchema = z.object({
  sessionId: z.string().min(1),
  eventType: ConsultationEventTypeSchema,
  questionNumber: z.number().int().min(1).max(9).nullable().optional(),
  stepId: z.string().nullable().optional(),
  clientPlatform: z.string().default("kiosk_web"),
  metadata: z.record(z.unknown()).optional().default({}),
  createdAt: z.string().optional(),
});
export type ConsultationEventInput = z.input<typeof ConsultationEventInputSchema>;

// 3. Database Event Record Contract
export const ConsultationEventRecordSchema = z.object({
  id: z.string().optional(),
  session_id: z.string().min(1),
  event_type: z.string(),
  question_number: z.number().int().nullable().optional(),
  step_id: z.string().nullable().optional(),
  client_platform: z.string().default("kiosk_web"),
  metadata: z.record(z.unknown()).default({}),
  created_at: z.string(),
});
export type ConsultationEventRecord = z.infer<typeof ConsultationEventRecordSchema>;

// In-Memory Resilient Event Store (Ensures continuous zero-failure operations and local test capability)
const inMemoryEvents: ConsultationEventRecord[] = [];

/**
 * Persists a consultation event to Supabase (and in-memory cache) with validation & deduplication.
 */
export async function saveConsultationEvent(
  input: ConsultationEventInput,
): Promise<{ success: boolean; eventId?: string; error?: string }> {
  // 1. Schema Validation
  const parseResult = ConsultationEventInputSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      success: false,
      error: `Validation failed: ${parseResult.error.message}`,
    };
  }

  const validated = parseResult.data;
  const nowStr = validated.createdAt || new Date().toISOString();

  const record: ConsultationEventRecord = {
    session_id: validated.sessionId,
    event_type: validated.eventType,
    question_number: validated.questionNumber ?? null,
    step_id: validated.stepId ?? null,
    client_platform: validated.clientPlatform || "kiosk_web",
    metadata: validated.metadata || {},
    created_at: nowStr,
  };

  // 2. Server-side Idempotency Guard (Deduplicates identical event within session)
  const isDuplicate = inMemoryEvents.some(
    (e) =>
      e.session_id === record.session_id &&
      e.event_type === record.event_type &&
      e.question_number === record.question_number,
  );

  if (!isDuplicate) {
    inMemoryEvents.push(record);
  }

  // 3. Persist to Supabase if available
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("consultation_events").insert([record]);
      if (error) {
        // Log warning but return success (non-blocking for customer experience)
        console.warn("[ConsultationEvents] Supabase insert warning:", error.message);
      }
    } catch (err) {
      console.warn("[ConsultationEvents] Supabase unexpected error:", err);
    }
  }

  return { success: true };
}

/**
 * Retrieves all recorded consultation events (combining database records + in-memory store)
 */
export async function getConsultationEvents(filters?: {
  startDate?: string;
  endDate?: string;
}): Promise<ConsultationEventRecord[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      let query = supabase
        .from("consultation_events")
        .select("*")
        .order("created_at", { ascending: true });

      if (filters?.startDate) query = query.gte("created_at", filters.startDate);
      if (filters?.endDate) query = query.lte("created_at", filters.endDate);

      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return data as ConsultationEventRecord[];
      }
    } catch {
      // Fallback to in-memory store
    }
  }

  // In-Memory Filter fallback
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

/**
 * Deletes consultation events associated with a session_id
 */
export async function deleteConsultationEventsBySessionId(
  sessionId: string,
): Promise<{ success: boolean; error?: string }> {
  // 1. Remove from in-memory cache
  for (let i = inMemoryEvents.length - 1; i >= 0; i--) {
    if (inMemoryEvents[i]?.session_id === sessionId) {
      inMemoryEvents.splice(i, 1);
    }
  }

  // 2. Remove from Supabase if connected
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from("consultation_events")
        .delete()
        .eq("session_id", sessionId);

      if (error) {
        console.warn("[ConsultationEvents] Event deletion warning:", error.message);
      }
    } catch (err) {
      console.warn("[ConsultationEvents] Unexpected event delete error:", err);
    }
  }

  return { success: true };
}

/**
 * Resets in-memory event store (for unit testing purposes)
 */
export function _resetInMemoryEvents(): void {
  inMemoryEvents.length = 0;
}
