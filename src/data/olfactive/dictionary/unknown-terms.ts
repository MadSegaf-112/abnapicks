import type { UnknownOlfactiveTerm } from "./types";
import { normalizeOlfactiveTerm } from "./aliases";

/**
 * In-memory Store & Collector for Unknown Olfactive Terms (Notes / Accords).
 * Integrates seamlessly with the human curation & QA workflow.
 */
class UnknownOlfactiveTermStore {
  private terms: Map<string, UnknownOlfactiveTerm> = new Map();

  /**
   * Generates a unique key for a term by type and normalized string.
   */
  private makeKey(type: "note" | "accord", term: string): string {
    return `${type}::${normalizeOlfactiveTerm(term)}`;
  }

  /**
   * Tracks an unknown term found during enrichment/derivation.
   */
  public trackUnknownTerm(rawTerm: string, type: "note" | "accord", productId?: string): void {
    if (!rawTerm || typeof rawTerm !== "string") return;
    const normalizedTerm = normalizeOlfactiveTerm(rawTerm);
    if (!normalizedTerm) return;

    const key = this.makeKey(type, normalizedTerm);
    const existing = this.terms.get(key);
    const now = new Date().toISOString();

    if (existing) {
      existing.occurrences += 1;
      existing.lastSeenAt = now;
      if (productId && !existing.productIds.includes(productId)) {
        existing.productIds.push(productId);
      }
    } else {
      this.terms.set(key, {
        rawTerm: rawTerm.trim(),
        normalizedTerm,
        type,
        productIds: productId ? [productId] : [],
        occurrences: 1,
        firstSeenAt: now,
        lastSeenAt: now,
        status: "pending_review",
      });
    }
  }

  /**
   * Batch tracks multiple unknown notes or accords for a product.
   */
  public trackBatch(unknownNotes: string[], unknownAccords: string[], productId?: string): void {
    for (const note of unknownNotes) {
      this.trackUnknownTerm(note, "note", productId);
    }
    for (const accord of unknownAccords) {
      this.trackUnknownTerm(accord, "accord", productId);
    }
  }

  /**
   * Returns all recorded unknown terms, optionally filtered by status.
   */
  public getTerms(status?: UnknownOlfactiveTerm["status"]): UnknownOlfactiveTerm[] {
    const list = Array.from(this.terms.values());
    if (status) {
      return list.filter((t) => t.status === status);
    }
    return list;
  }

  /**
   * Updates status / mapping of an unknown term upon human review or automated resolution.
   */
  public resolveTerm(
    type: "note" | "accord",
    term: string,
    resolution: {
      status: "auto_resolved" | "reviewed" | "resolved" | "mapped" | "ignored";
      resolutionMethod:
        "canonical_alias" | "canonical_note" | "cross_category_note" | "manual_mapping";
      canonicalTarget: string;
      notes?: string;
    },
  ): boolean {
    const key = this.makeKey(type, term);
    const existing = this.terms.get(key);
    if (!existing) return false;

    existing.status = resolution.status;
    existing.resolutionMethod = resolution.resolutionMethod;
    existing.canonicalTarget = resolution.canonicalTarget;
    existing.resolvedAt = new Date().toISOString();
    if (resolution.notes !== undefined) {
      existing.notes = resolution.notes;
    }
    return true;
  }

  /**
   * Updates status / mapping of an unknown term upon human review (backward compatibility).
   */
  public reviewTerm(
    type: "note" | "accord",
    term: string,
    update: {
      status: UnknownOlfactiveTerm["status"];
      suggestedMapping?: string;
      notes?: string;
    },
  ): boolean {
    const key = this.makeKey(type, term);
    const existing = this.terms.get(key);
    if (!existing) return false;

    existing.status = update.status;
    if (update.suggestedMapping !== undefined) {
      existing.suggestedMapping = update.suggestedMapping;
    }
    if (update.notes !== undefined) {
      existing.notes = update.notes;
    }
    return true;
  }

  /**
   * Summary stats for monitoring.
   */
  public getStats(): {
    total: number;
    notesCount: number;
    accordsCount: number;
    pendingCount: number;
    resolvedCount: number;
  } {
    const all = Array.from(this.terms.values());
    return {
      total: all.length,
      notesCount: all.filter((t) => t.type === "note").length,
      accordsCount: all.filter((t) => t.type === "accord").length,
      pendingCount: all.filter((t) => t.status === "pending" || t.status === "pending_review")
        .length,
      resolvedCount: all.filter((t) => t.status !== "pending" && t.status !== "pending_review")
        .length,
    };
  }

  /**
   * Clears the store (used primarily for test isolation).
   */
  public clear(): void {
    this.terms.clear();
  }
}

export const UNKNOWN_TERM_STORE = new UnknownOlfactiveTermStore();
