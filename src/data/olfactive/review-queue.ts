import type { OlfactiveReviewQueueItem, ReviewStatus } from "./types";

/**
 * In-memory / State store for human curation review queue.
 */
class OlfactiveReviewQueueStore {
  private items: Map<string, OlfactiveReviewQueueItem> = new Map();
  private rejectedCandidateKeys: Set<string> = new Set();

  /**
   * Adds or updates a candidate in the review queue.
   */
  public enqueue(item: OlfactiveReviewQueueItem): void {
    const candidateKey = `${item.abnaProductId}::${item.candidateSourceName}`;

    // If candidate was explicitly rejected before, reject automatically
    if (this.rejectedCandidateKeys.has(candidateKey)) {
      item.status = "rejected";
      item.notes = "Previously rejected by evaluator.";
    }

    this.items.set(item.reviewId, item);
  }

  /**
   * Approves a candidate match.
   */
  public approve(reviewId: string, reviewer: string): boolean {
    const item = this.items.get(reviewId);
    if (!item) return false;

    item.status = "approved";
    item.reviewedBy = reviewer;
    item.reviewedAt = new Date().toISOString();
    return true;
  }

  /**
   * Rejects a candidate match and marks the key so it never reappears as accepted.
   */
  public reject(reviewId: string, reviewer: string, reason?: string): boolean {
    const item = this.items.get(reviewId);
    if (!item) return false;

    item.status = "rejected";
    item.reviewedBy = reviewer;
    item.reviewedAt = new Date().toISOString();
    if (reason) item.notes = reason;

    const candidateKey = `${item.abnaProductId}::${item.candidateSourceName}`;
    this.rejectedCandidateKeys.add(candidateKey);
    return true;
  }

  /**
   * Gets all items matching a filter status.
   */
  public getByStatus(status: ReviewStatus): OlfactiveReviewQueueItem[] {
    return Array.from(this.items.values()).filter((it) => it.status === status);
  }

  /**
   * Returns full queue count.
   */
  public getStats(): { total: number; pending: number; approved: number; rejected: number } {
    const all = Array.from(this.items.values());
    return {
      total: all.length,
      pending: all.filter((i) => i.status === "pending").length,
      approved: all.filter((i) => i.status === "approved").length,
      rejected: all.filter((i) => i.status === "rejected").length,
    };
  }
}

export const REVIEW_QUEUE = new OlfactiveReviewQueueStore();
