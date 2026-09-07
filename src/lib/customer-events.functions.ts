/**
 * Phase DATA-05 — Client/Server Event Dispatcher
 *
 * Provides typed server function for persisting consultation events,
 * plus a safe, non-blocking, client-side dispatcher with in-memory deduplication.
 */

import { createServerFn } from "@tanstack/react-start";
import {
  ConsultationEventInputSchema,
  saveConsultationEvent,
  type ConsultationEventInput,
} from "./customer-events.repository";

// 1. Server Function for Consultation Event Persistence
export const trackConsultationEvent = createServerFn({ method: "POST" })
  .validator((data: unknown) => ConsultationEventInputSchema.parse(data))
  .handler(async ({ data }) => {
    return await saveConsultationEvent(data);
  });

// Client-side sent-event registry to prevent duplicates from React StrictMode & re-renders
const clientSentEvents = new Set<string>();

/**
 * Dispatches a consultation event from the client in a completely non-blocking,
 * failure-isolated manner.
 */
export function dispatchClientEvent(
  trackFn: (args: { data: ConsultationEventInput }) => Promise<unknown>,
  event: ConsultationEventInput,
): void {
  try {
    const dedupKey = `${event.sessionId}:${event.eventType}:${event.questionNumber ?? ""}`;
    if (clientSentEvents.has(dedupKey)) {
      return; // Deduplicate
    }
    clientSentEvents.add(dedupKey);

    // Asynchronous non-blocking fire-and-forget
    void trackFn({ data: event }).catch((err) => {
      // Safe silent warning, never breaks the user experience
      if (process.env.NODE_ENV !== "production") {
        console.warn("[EventDispatch] Non-critical background event dispatch notice:", err);
      }
    });
  } catch {
    // Fail-safe
  }
}

/**
 * Resets client-side sent events cache (useful on session restart or testing)
 */
export function resetClientEventRegistry(): void {
  clientSentEvents.clear();
}
