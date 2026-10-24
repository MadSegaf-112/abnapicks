import { z } from "zod";
export const RecommendationSchema = z.object({
  id: z.string().optional(),
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

export function isDistinctAlternativeSet(
  initial: Recommendation[],
  next: Recommendation[],
): boolean {
  if (next.length !== 3) return false;
  const nameKey = (name: string) => name.trim().toLowerCase().replace(/\s+/g, " ");
  const ids = new Set(initial.flatMap((rec) => (rec.id ? [rec.id.trim().toLowerCase()] : [])));
  const names = new Set(initial.map((rec) => nameKey(rec.name)));
  for (const rec of next) {
    const id = rec.id?.trim().toLowerCase();
    const name = nameKey(rec.name);
    if ((id && ids.has(id)) || names.has(name)) return false;
    if (id) ids.add(id);
    names.add(name);
  }
  return true;
}
