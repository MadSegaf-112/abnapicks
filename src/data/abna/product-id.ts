/**
 * Deterministic Product ID Generator for Official ABNA Catalog
 * Formats: abna_<clean_name>_<clean_designer>_<clean_tier>_<row_number>
 * Ensures stable, reproducible IDs across imports and prevents collision.
 */

function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "_") // Replace non-alphanumeric with underscore
    .replace(/^_+|_+$/g, "") // Trim leading/trailing underscores
    .slice(0, 32); // Reasonable length limit
}

export function generateDeterministicProductId(
  name: string,
  designer: string,
  tier: string,
  rowNumber: number,
): string {
  const cleanName = sanitizeSlug(name) || "parfum";
  const cleanDesigner = sanitizeSlug(designer) || "abna";
  const cleanTier = sanitizeSlug(tier) || "std";
  return `abna_${cleanName}_${cleanDesigner}_${cleanTier}_${rowNumber}`;
}
