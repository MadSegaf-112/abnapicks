import type { AbnaOlfactiveEnrichmentRecord } from "../types";

/**
 * Curated reference enrichment records for pilot testing & validation.
 * In Phase 6C-2, these sample formula records test the pipeline integration against exact Excel rows:
 * - Row 3: Omnia Amethyste (Bvlgari, EXCLUSIVE) -> abna_omnia_amethyste_bvlgari_exclusive_3
 * - Row 39: Bleu (Chanel, ELITE) -> abna_bleu_chanel_elite_39
 * - Row 41: Baccarat 540 Edp (MFK, ELITE) -> abna_baccarat_540_edp_maison_francis_kurkdjian_elite_41
 * - Row 106: Black Opium Floral Shock (YSL, VIP) -> abna_black_opium_floral_shock_ysl_vip_106
 * - Row 147: Sauvage (Dior, ELITE) -> abna_sauvage_dior_elite_147
 */
export const PILOT_ENRICHMENT_RECORDS: AbnaOlfactiveEnrichmentRecord[] = [
  {
    productId: "abna_sauvage_dior_elite_147",
    notes: {
      top: ["Calabrian Bergamot", "Pepper"],
      middle: ["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Geranium"],
      base: ["Ambroxan", "Cedarwood", "Labdanum"],
    },
    accords: ["fresh spicy", "amber", "citrus", "aromatic", "woody"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "A radically fresh composition, dictated by a name that has the ring of a manifesto.",
    source: {
      provider: "ABNA Internal Quality Lab (Formula Reference)",
      reference: "ABNA-REF-2026-SAUVAGE",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified",
    },
  },
  {
    productId: "abna_omnia_amethyste_bvlgari_exclusive_3",
    notes: {
      top: ["Pink Grapefruit", "Green Notes"],
      middle: ["Iris", "Bulgarian Rose"],
      base: ["Heliotrope", "Woody Notes"],
    },
    accords: ["floral", "powdery", "woody", "fresh"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory: "An elegant, powdery floral tribute to noble amethyst hues.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-OMNIA",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified",
    },
  },
  {
    productId: "abna_bleu_chanel_elite_39",
    notes: {
      top: ["Grapefruit", "Lemon", "Mint", "Pink Pepper"],
      middle: ["Ginger", "Nutmeg", "Jasmine"],
      base: [
        "Incense",
        "Vetiver",
        "Cedarwood",
        "Sandalwood",
        "Patchouli",
        "Labdanum",
        "White Musk",
      ],
    },
    accords: ["citrus", "woody", "warm spicy", "aromatic", "fresh"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "A tribute to masculine freedom in an aromatic-woody fragrance with a captivating trail.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-BLEU",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified",
    },
  },
  {
    productId: "abna_baccarat_540_edp_maison_francis_kurkdjian_elite_41",
    notes: {
      top: ["Saffron", "Jasmine"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedarwood"],
    },
    accords: ["amber", "woody", "warm spicy", "sweet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Beast",
      longevity: "10h+",
    },
    editorialStory:
      "Luminous and sophisticated, Baccarat Rouge 540 lays on the skin like an amber, floral and woody breeze.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-BR540",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified",
    },
  },
  {
    productId: "abna_black_opium_floral_shock_ysl_vip_106",
    notes: {
      top: ["Pear", "Pink Pepper", "Orange Blossom"],
      middle: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cedarwood", "Cashmere Wood"],
    },
    accords: ["vanilla", "coffee", "sweet", "warm spicy", "floral"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory: "A seductive gourmand addiction of black coffee and sensual vanilla.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-BOPIUM",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified",
    },
  },
];

export { BATCH_01_ENRICHMENT_RECORDS, BATCH_01_REVIEW_QUEUE, BATCH_01_SUMMARY } from "./batch-01";
export { BATCH_02_ENRICHMENT_RECORDS, BATCH_02_REVIEW_QUEUE, BATCH_02_SUMMARY } from "./batch-02";
export { BATCH_03_ENRICHMENT_RECORDS, BATCH_03_REVIEW_QUEUE, BATCH_03_SUMMARY } from "./batch-03";
export { BATCH_04_ENRICHMENT_RECORDS, BATCH_04_REVIEW_QUEUE, BATCH_04_SUMMARY } from "./batch-04";
export { BATCH_05_ENRICHMENT_RECORDS, BATCH_05_REVIEW_QUEUE, BATCH_05_SUMMARY } from "./batch-05";
export { BATCH_06_ENRICHMENT_RECORDS, BATCH_06_REVIEW_QUEUE, BATCH_06_SUMMARY } from "./batch-06";
export { BATCH_07_ENRICHMENT_RECORDS, BATCH_07_REVIEW_QUEUE, BATCH_07_SUMMARY } from "./batch-07";
export { BATCH_08_ENRICHMENT_RECORDS, BATCH_08_REVIEW_QUEUE, BATCH_08_SUMMARY } from "./batch-08";
import { BATCH_01_ENRICHMENT_RECORDS } from "./batch-01";
import { BATCH_02_ENRICHMENT_RECORDS } from "./batch-02";
import { BATCH_03_ENRICHMENT_RECORDS } from "./batch-03";
import { BATCH_04_ENRICHMENT_RECORDS } from "./batch-04";
import { BATCH_05_ENRICHMENT_RECORDS } from "./batch-05";
import { BATCH_06_ENRICHMENT_RECORDS } from "./batch-06";
import { BATCH_07_ENRICHMENT_RECORDS } from "./batch-07";
import { BATCH_08_ENRICHMENT_RECORDS } from "./batch-08";

/**
 * Combined active enrichment records (5 Pilots + Batch 01 + Batch 02 + Batch 03 + Batch 04 + Batch 05 + Batch 06 + Batch 07 + Batch 08 verified).
 */
export const ALL_ACTIVE_ENRICHMENT_RECORDS: AbnaOlfactiveEnrichmentRecord[] = [
  ...PILOT_ENRICHMENT_RECORDS,
  ...BATCH_01_ENRICHMENT_RECORDS,
  ...BATCH_02_ENRICHMENT_RECORDS,
  ...BATCH_03_ENRICHMENT_RECORDS,
  ...BATCH_04_ENRICHMENT_RECORDS,
  ...BATCH_05_ENRICHMENT_RECORDS,
  ...BATCH_06_ENRICHMENT_RECORDS,
  ...BATCH_07_ENRICHMENT_RECORDS,
  ...BATCH_08_ENRICHMENT_RECORDS,
];
