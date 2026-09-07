import type {
  RawABNAProductRow,
  OfficialABNAProduct,
  AbnaGender,
  AbnaPriceTier,
  RawAbnaPriceTierString,
} from "./types";
import { generateDeterministicProductId } from "./product-id";

/**
 * Controlled Brand / Perfume House Canonical Dictionary.
 * Normalizes variations and misspellings in designer names without over-merging.
 */
export const CANONICAL_BRAND_MAP: Record<string, string> = {
  // Variations of Jo Malone
  Jomalone: "Jo Malone London",
  "Jo Malone": "Jo Malone London",
  "JO MALONE": "Jo Malone London",
  "Jo Malone London": "Jo Malone London",

  // Variations of Yves Saint Laurent
  YSL: "Yves Saint Laurent",
  "Yves Saint Laurent": "Yves Saint Laurent",
  "YVES SAINT LAURENT": "Yves Saint Laurent",

  // Variations of Bath & Body Works
  "Bath & Body Work": "Bath & Body Works",
  "Bath & Body Works": "Bath & Body Works",
  BBW: "Bath & Body Works",

  // Variations of Victoria's Secret
  "Victoria Secret": "Victoria's Secret",
  "Victoria's Secret": "Victoria's Secret",
  "VICTORIA SECRET": "Victoria's Secret",

  // Variations of Salvatore Ferragamo
  "Salvatore Feragamo": "Salvatore Ferragamo",
  "Salvatore Ferragamo": "Salvatore Ferragamo",

  // Variations of Maison Francis Kurkdjian
  "Maison Francis Kurkdjian": "Maison Francis Kurkdjian (MFK)",
  MFK: "Maison Francis Kurkdjian (MFK)",

  // Variations of Paco Rabanne
  "Paco Rabane": "Paco Rabanne",
  "Paco Rabanne": "Paco Rabanne",

  // Variations of Dunhill
  Dunhill: "Alfred Dunhill",
  "Alfred Dunhill": "Alfred Dunhill",

  // Standard established houses
  Lancome: "Lancôme",
  Lancôme: "Lancôme",
  "Parfums de Marly": "Parfums de Marly",
  "Tom Ford": "Tom Ford",
  Dior: "Dior",
  "Christian Dior": "Dior",
  Chanel: "Chanel",
  "Giorgio Armani": "Giorgio Armani",
  Armani: "Giorgio Armani",
  Creed: "Creed",
  "Le Labo": "Le Labo",
  Guzel: "Guzel (ABNA Signature)",
  Bvlgari: "Bvlgari",
  Bulgari: "Bvlgari",
  Gucci: "Gucci",
  Prada: "Prada",
  Versace: "Versace",
  Hermes: "Hermès",
  Hermès: "Hermès",
  Burberry: "Burberry",
  CalvinKlein: "Calvin Klein",
  "Calvin Klein": "Calvin Klein",
  CK: "Calvin Klein",
  Diptyque: "Diptyque",
  Byredo: "Byredo",
  Killian: "Kilian",
  Kilian: "Kilian",
  Montblanc: "Montblanc",
  "Mont Blanc": "Montblanc",
  Gissah: "Gissah",
  Rasasi: "Rasasi",
  Lattafa: "Lattafa",
  AlRehab: "Al Rehab",
  "Al Rehab": "Al Rehab",

  // Batch 01 additions & variations
  "Katty Pery": "Katy Perry",
  "Katy Perry": "Katy Perry",
  Escana: "Escada",
  Escada: "Escada",
  "D&G": "Dolce & Gabbana",
  "Dolce & Gabbana": "Dolce & Gabbana",
  "Dolce&Gabbana": "Dolce & Gabbana",
  "Anna Sui": "Anna Sui",
  Azzaro: "Azzaro",
  "Elizabeth Arden": "Elizabeth Arden",
  "Paris Hilton": "Paris Hilton",
  "The Body Shop": "The Body Shop",
  Zara: "Zara",
  "Ralph Lauren": "Ralph Lauren",
  "Antonio Banderas": "Antonio Banderas",
  "Hugo Boss": "Hugo Boss",
  Aigner: "Etienne Aigner",
  "Etienne Aigner": "Etienne Aigner",
  Davidoff: "Davidoff",
  Kenzo: "Kenzo",
  Guess: "Guess",
  Jaguar: "Jaguar",

  // Batch 02 additions & variations
  Avril: "Avril Lavigne",
  "Avril Lavigne": "Avril Lavigne",
  Britney: "Britney Spears",
  "Britney Spears": "Britney Spears",
  "Jenifer Lopez": "Jennifer Lopez",
  "Jennifer Lopez": "Jennifer Lopez",
  "Gwen Stefany": "Gwen Stefani",
  "Gwen Stefani": "Gwen Stefani",
  "Harajuku Lovers": "Harajuku Lovers",
  "Paul Smith": "Paul Smith",
  Cladestine: "Angel Heart",
  "Angel Heart": "Angel Heart",
  "Sarah Jessica Parker": "Sarah Jessica Parker",
  "Selena Gomez": "Selena Gomez",
  "Taylor Swift": "Taylor Swift",
  "Justin Bieber": "Justin Bieber",
  "Juicy Couture": "Juicy Couture",
  "One Direction": "One Direction",
  Lacoste: "Lacoste",
  Ariana: "Ariana Grande",
  "Ariana Grande": "Ariana Grande",

  // Batch 03 additions & variations
  Davidof: "Davidoff",
  "Carolina Herrera": "Carolina Herrera",
  "Nina Ricci": "Nina Ricci",
  "Jean Paul Gaultier": "Jean Paul Gaultier",
  Mugler: "Mugler",
  "Thierry Mugler": "Mugler",
  Chloe: "Chloé",
  Chloé: "Chloé",
  Coach: "Coach",
  Valentino: "Valentino",

  // Batch 04 additions & variations
  "Tiziana Terenzi": "Tiziana Terenzi",
  "Louis Vuitton": "Louis Vuitton",
  LV: "Louis Vuitton",
  "Elie Saab": "Elie Saab",
  Montale: "Montale",
  "By Killian": "Kilian",
  "Marc Jacobs": "Marc Jacobs",
  Xerjoff: "Xerjoff",

  // Batch 05 additions & variations
  "Maison Margiela": "Maison Margiela",
  "Maison Martin Margiela": "Maison Margiela",
  "Stephane Humbert Lucas 777": "Stéphane Humbert Lucas 777",
  "Stéphane Humbert Lucas 777": "Stéphane Humbert Lucas 777",
  "Giardini Di Toscana": "Giardini Di Toscana",
  Guerlain: "Guerlain",
  Clinique: "Clinique",
  Initio: "Initio Parfums Privés",
  "Initio Parfums Privés": "Initio Parfums Privés",
  "Christiano Ronaldo": "Cristiano Ronaldo",
  "Cristiano Ronaldo": "Cristiano Ronaldo",
  "Ahmed Al Maghribi": "Ahmed Al Maghribi",
  Axe: "Axe",
  Chacarel: "Cacharel",
  Cacharel: "Cacharel",
  Benneton: "Benetton",
  Benetton: "Benetton",
  Reef: "Reef Perfumes",
  "Este Lauder": "Estée Lauder",
  "Estée Lauder": "Estée Lauder",
  Nagita: "Slavina",
  Slavina: "Slavina",
  Tommy: "Tommy Hilfiger",
  "Tommy Hilfiger": "Tommy Hilfiger",

  // Batch 06 additions & variations
  "Brud Faberge": "Fabergé",
  Faberge: "Fabergé",
  Fabergé: "Fabergé",
  "Ajmal Wisal": "Ajmal",
  Ajmal: "Ajmal",
  "Golden Dust": "Sunnamusk",
  Sunnamusk: "Sunnamusk",
  Darj: "Rasasi",
  "Guy Laroche": "Guy Laroche",
  Nautica: "Nautica",
  Mykonos: "Mykonos",
  "Ex Nihilo": "Ex Nihilo",
  "Maison Crivelli": "Maison Crivelli",
  "Mercedes Benz": "Mercedes-Benz",
  "Mercedes-Benz": "Mercedes-Benz",
  BDK: "BDK Parfums",
  "BDK Parfums": "BDK Parfums",
  Mancera: "Mancera",
  "Clive Christian": "Clive Christian",
  "Victor Rolf": "Viktor&Rolf",
  "Viktor & Rolf": "Viktor&Rolf",
  "Viktor&Rolf": "Viktor&Rolf",
  "Arabian Oud": "Arabian Oud",
  Roja: "Roja Parfums",
  "Roja Dove": "Roja Parfums",
  "Roja Parfums": "Roja Parfums",
  Nishane: "Nishane",
  Moschino: "Moschino",
  Playboy: "Playboy",
  Elle: "Elle",
  Spring: "Spring",
  Prince: "Prince",
  "Fancy Bouquet": "Fancy Bouquet",

  // Batch 07 additions & variations
  Sospiro: "Sospiro",
  Armaf: "Armaf",
  "Frederic Malle": "Frédéric Malle",
  "Frédéric Malle": "Frédéric Malle",
  HMNS: "HMNS",
  "Memo Paris": "Memo Paris",
  Monaco: "Monaco",
  Xerjof: "Xerjoff",
  Kayali: "Kayali",

  // Batch 08 additions & variations
  "Laura Mercier": "Laura Mercier",
  Kajal: "Kajal",
  "Orto Parisi": "Orto Parisi",
  Amouage: "Amouage",
  Essential: "Essential Parfums",
  "Essential Parfums": "Essential Parfums",
};

/**
 * Audit Map for the 10 Excel items where Kategori Gender was blank in source.
 * Inferred based on verified commercial identity while flagging genderSource as "inferred_default".
 */
export const BLANK_GENDER_AUDIT_MAP: Record<string, AbnaGender> = {
  "red vanilla": "feminine",
  someday: "feminine",
  pink: "feminine",
  "love misteriosa": "feminine",
  "pacific chill": "unisex",
  penthouse: "unisex",
  "ambre levant": "unisex",
  ehass: "unisex",
  "silver mountain water": "unisex",
  aican: "unisex",
};

/**
 * Normalizes raw designer string into canonical brand name.
 */
export function normalizeBrand(raw: string): string {
  if (!raw) return "ABNA Signature";
  const trimmed = raw.trim();
  return CANONICAL_BRAND_MAP[trimmed] || trimmed || "ABNA Signature";
}

/**
 * Alias for normalizeBrand to support legacy imports.
 */
export function normalizeDesigner(raw: string): string {
  return normalizeBrand(raw);
}

/**
 * Normalizes raw gender into standard AbnaGender union.
 * Returns the resolved gender and metadata provenance flag.
 */
export function normalizeCommercialGender(
  rawGender: string | null | undefined,
  productName: string,
): { gender: AbnaGender; genderSource: "official" | "inferred_default" } {
  if (!rawGender || typeof rawGender !== "string" || !rawGender.trim()) {
    const cleanName = productName.trim().toLowerCase();
    if (cleanName in BLANK_GENDER_AUDIT_MAP) {
      return {
        gender: BLANK_GENDER_AUDIT_MAP[cleanName],
        genderSource: "inferred_default",
      };
    }
    return {
      gender: "unisex",
      genderSource: "inferred_default",
    };
  }

  const trimmed = rawGender.trim().toLowerCase();

  if (
    trimmed === "women" ||
    trimmed === "woman" ||
    trimmed === "female" ||
    trimmed === "feminine" ||
    trimmed === "w"
  ) {
    return { gender: "feminine", genderSource: "official" };
  }

  if (
    trimmed === "men" ||
    trimmed === "man" ||
    trimmed === "male" ||
    trimmed === "masculine" ||
    trimmed === "m"
  ) {
    return { gender: "masculine", genderSource: "official" };
  }

  if (trimmed === "unisex" || trimmed === "universal" || trimmed === "u" || trimmed === "all") {
    return { gender: "unisex", genderSource: "official" };
  }

  // Fallback
  return { gender: "unisex", genderSource: "inferred_default" };
}

/**
 * Legacy gender normalizer helper.
 */
export function normalizeGender(raw: string, productName: string): AbnaGender {
  return normalizeCommercialGender(raw, productName).gender;
}

/**
 * Normalizes raw price tier into standard AbnaPriceTier enum.
 */
export function normalizePriceTier(
  rawTier: RawAbnaPriceTierString | null | undefined,
): AbnaPriceTier {
  if (!rawTier || typeof rawTier !== "string") return "VIP";
  const upper = rawTier.trim().toUpperCase();

  if (upper === "VIP") return "VIP";
  if (upper === "ELITE") return "ELITE";
  if (upper === "EXCLUSIVE") return "EXCLUSIVE";
  if (upper === "THE NATURE" || upper === "THE_NATURE") return "THE_NATURE";
  if (upper === "SPECIAL ONE" || upper === "SPECIAL_ONE") return "SPECIAL_ONE";

  return "VIP"; // Safe fallback
}

/**
 * Helper to generate product ID using the standard deterministic generator.
 */
export function createDeterministicProductId(
  name: string,
  designer: string,
  tier: string,
  rowNumber: number,
): string {
  return generateDeterministicProductId(name, designer, tier, rowNumber);
}

/**
 * Normalizes a single raw ABNA Excel row into an OfficialABNAProduct entity (legacy compatibility).
 */
export function normalizeABNAProduct(raw: RawABNAProductRow): OfficialABNAProduct {
  const name = raw.namaParfum ? raw.namaParfum.trim() : "";
  const designer = raw.designer ? raw.designer.trim() : "";
  const normalizedDesigner = normalizeBrand(designer);
  const tier = normalizePriceTier(raw.kategoriHarga);
  const gender = normalizeGender(raw.kategoriGender, name);
  const id = generateDeterministicProductId(name, designer, tier, raw.rowNumber);

  return {
    id,
    rawRowNumber: raw.rowNumber,
    name,
    designer,
    normalizedDesigner,
    gender,
    pricePerMl: Number(raw.hargaPerML) || 0,
    internalCode: raw.kode ? raw.kode.trim() : "",
    fullCode: raw.kodeLengkap ? raw.kodeLengkap.trim() : undefined,
    tier,
    seedPercentage: Number(raw.persentaseBibit) || 0.5,
    discountPercentage: Number(raw.persentaseDiskon) || 0,
    prices: {
      size10ml: Number(raw.harga10ML) || 0,
      size30ml: Number(raw.harga30ML) || 0,
      size50ml: Number(raw.harga50ML) || 0,
      size100ml: Number(raw.harga100ML) || 0,
    },
    stockQty: Number(raw.stockQty) || 0,
    inStock: (Number(raw.stockQty) || 0) > 0,
    normalizedAt: "2026-08-27T17:55:00Z",
  };
}
