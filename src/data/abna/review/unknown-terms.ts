import type { AbnaUnknownTermItem } from "../types";
import { normalizeOlfactiveTerm } from "../../olfactive/dictionary/aliases";

/**
 * Catalog Unknown Olfactive Term Collector.
 * Aggregates unknown terms across all ingested ABNA products for human QA.
 */
class AbnaUnknownTermRegistry {
  private items: Map<string, AbnaUnknownTermItem> = new Map();

  private getKey(term: string, type: "note" | "accord"): string {
    return `${type}::${normalizeOlfactiveTerm(term)}`;
  }

  /**
   * Records occurrences of unknown notes/accords for a product.
   */
  public registerUnknownTerms(
    productId: string,
    unknownNotes: string[],
    unknownAccords: string[],
  ): void {
    for (const note of unknownNotes) {
      if (!note) continue;
      const normalized = normalizeOlfactiveTerm(note);
      const key = this.getKey(note, "note");
      const existing = this.items.get(key);

      if (existing) {
        existing.occurrences++;
        if (!existing.products.includes(productId)) {
          existing.products.push(productId);
        }
      } else {
        this.items.set(key, {
          term: note.trim(),
          normalizedTerm: normalized,
          type: "note",
          products: [productId],
          occurrences: 1,
          status: "pending_review",
        });
      }
    }

    for (const accord of unknownAccords) {
      if (!accord) continue;
      const normalized = normalizeOlfactiveTerm(accord);
      const key = this.getKey(accord, "accord");
      const existing = this.items.get(key);

      if (existing) {
        existing.occurrences++;
        if (!existing.products.includes(productId)) {
          existing.products.push(productId);
        }
      } else {
        this.items.set(key, {
          term: accord.trim(),
          normalizedTerm: normalized,
          type: "accord",
          products: [productId],
          occurrences: 1,
          status: "pending_review",
        });
      }
    }
  }

  /**
   * Returns all recorded unknown items.
   */
  public getAll(): AbnaUnknownTermItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Returns summary counts.
   */
  public getSummary(): {
    totalUnknownNotes: number;
    totalUnknownAccords: number;
    distinctUnknownNotes: number;
    distinctUnknownAccords: number;
  } {
    const list = this.getAll();
    const notes = list.filter((i) => i.type === "note");
    const accords = list.filter((i) => i.type === "accord");

    const totalNotesCount = notes.reduce((acc, curr) => acc + curr.occurrences, 0);
    const totalAccordsCount = accords.reduce((acc, curr) => acc + curr.occurrences, 0);

    return {
      totalUnknownNotes: totalNotesCount,
      totalUnknownAccords: totalAccordsCount,
      distinctUnknownNotes: notes.length,
      distinctUnknownAccords: accords.length,
    };
  }

  /**
   * Resolves an unknown term entry with full provenance.
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
    const key = this.getKey(term, type);
    const existing = this.items.get(key);
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
   * Clears registry for isolated batch runs.
   */
  public clear(): void {
    this.items.clear();
  }
}

export const ABNA_UNKNOWN_TERMS = new AbnaUnknownTermRegistry();
