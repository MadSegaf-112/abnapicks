import { CANONICAL_NOTES } from "./notes";
import { CANONICAL_ACCORDS } from "./accords";

/**
 * Explicit Cross-Category Normalization Mapping.
 * Maps input accords that correspond strictly to canonical notes without inventing generic accords.
 */
export const EXPLICIT_CROSS_CATEGORY_ACCORD_TO_NOTE: Record<string, string> = {
  coffee: "coffee",
  espresso: "coffee",
  cappuccino: "coffee",
  rose: "rose",
  violet: "violet",
  lavender: "lavender",
  coconut: "coconut",
  honey: "honey",
  cherry: "cherry",
  oud: "oud",
  patchouli: "patchouli",
  ozonic: "ozonic notes",
  champagne: "aldehydes",
  chocolate: "chocolate",
  "white chocolate": "chocolate",
  caramel: "caramel",
  lactonic: "milk",
  boozy: "rum",
  cacao: "cocoa",
  anise: "star anise",
  tuberose: "tuberose",
  hazelnut: "hazelnut",
  mineral: "mineral notes",
  berry: "raspberry",
  cinnamon: "cinnamon",
  iris: "iris",
  "sour cherry": "cherry",
  conifer: "pine",
  almond: "almond",
  rum: "rum",
  tobacco: "tobacco",
  leather: "leather",
  metallic: "mineral notes",
  strawberry: "strawberry",
  mossy: "oakmoss",
  "dark chocolate": "chocolate",
  aldehydic: "aldehydes",
  animalic: "musk",
};

/**
 * Normalizes an arbitrary text string for olfactive term lookup.
 * - Lowercase
 * - Normalizes unicode / accents
 * - Strips punctuation / non-alphanumerics (replaces with spaces)
 * - Trims extra whitespace
 */
export function normalizeOlfactiveTerm(term: string): string {
  if (!term) return "";
  return term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Precomputed reverse lookup map: normalized alias/name -> canonical note key.
 */
const NOTE_ALIAS_INDEX: Map<string, string> = new Map();

/**
 * Precomputed reverse lookup map: normalized alias/name -> canonical accord key.
 */
const ACCORD_ALIAS_INDEX: Map<string, string> = new Map();

// Initialize Note Index
for (const [canonicalKey, noteDef] of Object.entries(CANONICAL_NOTES)) {
  const normCanonical = normalizeOlfactiveTerm(noteDef.canonicalName);
  NOTE_ALIAS_INDEX.set(normCanonical, canonicalKey);

  for (const alias of noteDef.aliases) {
    const normAlias = normalizeOlfactiveTerm(alias);
    if (normAlias) {
      NOTE_ALIAS_INDEX.set(normAlias, canonicalKey);
    }
  }
}

// Initialize Accord Index
for (const [canonicalKey, accordDef] of Object.entries(CANONICAL_ACCORDS)) {
  const normCanonical = normalizeOlfactiveTerm(accordDef.canonicalName);
  ACCORD_ALIAS_INDEX.set(normCanonical, canonicalKey);

  for (const alias of accordDef.aliases) {
    const normAlias = normalizeOlfactiveTerm(alias);
    if (normAlias) {
      ACCORD_ALIAS_INDEX.set(normAlias, canonicalKey);
    }
  }
}

/**
 * Resolves a raw note string to its canonical note key.
 * Returns null if the note cannot be deterministically matched.
 */
export function resolveCanonicalNote(rawNote: string): {
  canonicalKey: string | null;
  normalizedTerm: string;
} {
  const normalizedTerm = normalizeOlfactiveTerm(rawNote);
  if (!normalizedTerm) {
    return { canonicalKey: null, normalizedTerm: "" };
  }

  // 1. Direct match on precomputed alias index
  const directMatch = NOTE_ALIAS_INDEX.get(normalizedTerm);
  if (directMatch) {
    return { canonicalKey: directMatch, normalizedTerm };
  }

  // 2. Exact word boundaries / compound prefix check (e.g. "pure bergamot", "cedarwood atlas")
  for (const [alias, canonicalKey] of NOTE_ALIAS_INDEX.entries()) {
    if (alias.length >= 4) {
      // Avoid short false substrings
      const regex = new RegExp(`(^|\\s)${alias}(\\s|$)`, "i");
      if (regex.test(normalizedTerm)) {
        return { canonicalKey, normalizedTerm };
      }
    }
  }

  return { canonicalKey: null, normalizedTerm };
}

/**
 * Resolves a raw accord string to its canonical accord key OR cross-category canonical note key.
 * Preserves provenance and resolution type.
 */
export function resolveCanonicalAccord(rawAccord: string): {
  canonicalKey: string | null;
  normalizedTerm: string;
  resolvedType: "accord" | "cross_category_note" | "unknown";
} {
  const normalizedTerm = normalizeOlfactiveTerm(rawAccord);
  if (!normalizedTerm) {
    return { canonicalKey: null, normalizedTerm: "", resolvedType: "unknown" };
  }

  // 1. Direct match on precomputed accord alias index
  const directMatch = ACCORD_ALIAS_INDEX.get(normalizedTerm);
  if (directMatch) {
    return { canonicalKey: directMatch, normalizedTerm, resolvedType: "accord" };
  }

  // 2. Exact word boundaries check in accord index
  for (const [alias, canonicalKey] of ACCORD_ALIAS_INDEX.entries()) {
    if (alias.length >= 4) {
      const regex = new RegExp(`(^|\\s)${alias}(\\s|$)`, "i");
      if (regex.test(normalizedTerm)) {
        return { canonicalKey, normalizedTerm, resolvedType: "accord" };
      }
    }
  }

  // 3. Explicit Cross-Category Normalization (e.g., incoming accord "coffee" -> canonical note "coffee")
  const crossCategoryTarget = EXPLICIT_CROSS_CATEGORY_ACCORD_TO_NOTE[normalizedTerm];
  if (crossCategoryTarget && CANONICAL_NOTES[crossCategoryTarget]) {
    return {
      canonicalKey: crossCategoryTarget,
      normalizedTerm,
      resolvedType: "cross_category_note",
    };
  }

  return { canonicalKey: null, normalizedTerm, resolvedType: "unknown" };
}

/**
 * Batch resolves note list, partitioning into recognized canonical keys and unknown raw terms.
 */
export function resolveNoteList(notes: string[] = []): {
  recognized: Array<{ raw: string; canonicalKey: string }>;
  unknown: string[];
} {
  const recognized: Array<{ raw: string; canonicalKey: string }> = [];
  const unknown: string[] = [];

  for (const note of notes) {
    if (!note || typeof note !== "string") continue;
    const { canonicalKey, normalizedTerm } = resolveCanonicalNote(note);
    if (canonicalKey) {
      recognized.push({ raw: note, canonicalKey });
    } else if (normalizedTerm) {
      unknown.push(note.trim());
    }
  }

  return { recognized, unknown };
}

/**
 * Batch resolves accord list, partitioning into recognized canonical keys and unknown raw terms.
 */
export function resolveAccordList(accords: string[] = []): {
  recognized: Array<{
    raw: string;
    canonicalKey: string;
    resolvedType: "accord" | "cross_category_note";
  }>;
  unknown: string[];
} {
  const recognized: Array<{
    raw: string;
    canonicalKey: string;
    resolvedType: "accord" | "cross_category_note";
  }> = [];
  const unknown: string[] = [];

  for (const accord of accords) {
    if (!accord || typeof accord !== "string") continue;
    const { canonicalKey, normalizedTerm, resolvedType } = resolveCanonicalAccord(accord);
    if (canonicalKey && resolvedType !== "unknown") {
      recognized.push({ raw: accord, canonicalKey, resolvedType });
    } else if (normalizedTerm) {
      unknown.push(accord.trim());
    }
  }

  return { recognized, unknown };
}
