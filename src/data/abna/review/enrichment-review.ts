import type { AbnaEnrichmentReviewItem } from "../types";

/**
 * Registry and Store for Products requiring human curation / review.
 */
class AbnaEnrichmentReviewStore {
  private items: Map<string, AbnaEnrichmentReviewItem> = new Map();

  /**
   * Adds or updates a product in the review queue.
   */
  public enqueue(item: AbnaEnrichmentReviewItem): void {
    this.items.set(item.productId, item);
  }

  /**
   * Batch enqueues multiple review items.
   */
  public enqueueBatch(items: AbnaEnrichmentReviewItem[]): void {
    for (const item of items) {
      this.enqueue(item);
    }
  }

  /**
   * Retrieves all items in the review queue.
   */
  public getAll(): AbnaEnrichmentReviewItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Retrieves an item by its product ID.
   */
  public getByProductId(productId: string): AbnaEnrichmentReviewItem | undefined {
    return this.items.get(productId);
  }

  /**
   * Filters items by status.
   */
  public getByStatus(status: AbnaEnrichmentReviewItem["status"]): AbnaEnrichmentReviewItem[] {
    return Array.from(this.items.values()).filter((i) => i.status === status);
  }

  /**
   * Returns summary metrics.
   */
  public getStats(): {
    total: number;
    reviewRequired: number;
    notFound: number;
    incomplete: number;
  } {
    const list = this.getAll();
    return {
      total: list.length,
      reviewRequired: list.filter((i) => i.status === "review_required").length,
      notFound: list.filter((i) => i.status === "not_found").length,
      incomplete: list.filter((i) => i.status === "incomplete").length,
    };
  }

  /**
   * Clears the review queue.
   */
  public clear(): void {
    this.items.clear();
  }
}

export const ABNA_ENRICHMENT_REVIEW_QUEUE = new AbnaEnrichmentReviewStore();
