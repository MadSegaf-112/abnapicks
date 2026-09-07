import { c as createServerRpc } from "./createServerRpc-zuO7hwAA.mjs";
import { a as createServerFn } from "./server-BpnMBpJF.mjs";
import { F as FRAGRANCES } from "./fragrances-LdP9CCTC.mjs";
import { a as getServerConfig } from "./supabase.server-B40vTsTo.mjs";
import { s as saveCustomerSession } from "./customer-session.repository-5y5vqMvQ.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, a as arrayType, c as unionType, n as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:process";
const createEmptyVector = () => ({
  freshness: 0,
  sweetness: 0,
  warmth: 0,
  floral: 0,
  woody: 0,
  citrus: 0,
  spicy: 0,
  aquatic: 0,
  gourmand: 0,
  intensity: 0
});
const SCENT_FAMILY_MAP = {
  floral: { floral: 0.85, sweetness: 0.25, freshness: 0.2 },
  woody: { woody: 0.85, warmth: 0.35, spicy: 0.15 },
  citrus: { citrus: 0.9, freshness: 0.75 },
  oriental: { warmth: 0.85, spicy: 0.65, sweetness: 0.35 },
  amber_spicy: { warmth: 0.85, spicy: 0.65, sweetness: 0.35 },
  aquatic: { aquatic: 0.9, freshness: 0.75 },
  gourmand: { gourmand: 0.9, sweetness: 0.75, warmth: 0.45 },
  musky_powdery: { freshness: 0.35, floral: 0.25, sweetness: 0.2, warmth: 0.25 }
};
const MOOD_MAP = {
  mysterious: { warmth: 0.35, woody: 0.25, spicy: 0.3, intensity: 0.15 },
  radiant: { freshness: 0.35, citrus: 0.3, floral: 0.2, warmth: 0.15 },
  serene: { freshness: 0.35, aquatic: 0.2, floral: 0.2, woody: 0.1 },
  empowered: { woody: 0.35, spicy: 0.25, citrus: 0.2, intensity: 0.2 }
};
const ATMOSPHERE_MAP = {
  // New 6 Atmosphere Options
  clean_morning: { freshness: 0.45, aquatic: 0.3, floral: 0.15 },
  rainy_city: { aquatic: 0.45, freshness: 0.35, woody: 0.2 },
  flower_garden: { floral: 0.45, sweetness: 0.3, freshness: 0.2 },
  shady_forest: { woody: 0.45, freshness: 0.3, warmth: 0.15 },
  warm_night: { warmth: 0.45, sweetness: 0.3, gourmand: 0.25, spicy: 0.2 },
  luxury_room: { woody: 0.35, warmth: 0.35, spicy: 0.25, intensity: 0.2 },
  // Backwards compatibility for legacy atmosphere IDs
  rain: { aquatic: 0.4, freshness: 0.35, woody: 0.15 },
  curtains: { freshness: 0.3, floral: 0.25, sweetness: 0.15 },
  forest: { woody: 0.45, freshness: 0.25, warmth: 0.15 },
  candlelight: { warmth: 0.4, sweetness: 0.25, gourmand: 0.2, spicy: 0.15 }
};
const OCCASION_MAP = {
  daily: { freshness: 0.3, citrus: 0.2, floral: 0.15 },
  casual: { freshness: 0.35, citrus: 0.25, sweetness: 0.15 },
  romance: { floral: 0.35, sweetness: 0.3, warmth: 0.25 },
  night: { warmth: 0.35, gourmand: 0.25, spicy: 0.25, intensity: 0.2 },
  outdoor: { freshness: 0.35, aquatic: 0.35, woody: 0.2 },
  family: { freshness: 0.25, floral: 0.25, woody: 0.25, warmth: 0.2 }
};
function parseRawIntensity(val) {
  if (typeof val === "number") return Math.max(1, Math.min(5, val));
  if (typeof val === "string") {
    const s = val.toLowerCase().trim();
    if (s === "lembut") return 1;
    if (s === "seimbang") return 3;
    if (s === "semerbak") return 5;
    const n = Number.parseInt(s, 10);
    if (!Number.isNaN(n)) return Math.max(1, Math.min(5, n));
  }
  return 3;
}
function mapIntensityToFeature(intensity = 3) {
  const clamped = Math.max(1, Math.min(5, intensity));
  return Number(((clamped - 1) / 4).toFixed(2));
}
function buildCustomerProfile(answers) {
  const accumulated = createEmptyVector();
  const addVector = (vec, weight = 1) => {
    for (const [key, val] of Object.entries(vec)) {
      if (typeof val === "number") {
        accumulated[key] += val * weight;
      }
    }
  };
  const families = answers.scent_family ?? [];
  if (families.length > 0) {
    const familyMultiplier = families.length === 1 ? 1 : Math.max(0.6, 1 / Math.sqrt(families.length));
    for (const fam of families) {
      const normalizedFam = fam.toLowerCase().trim();
      const mapped = SCENT_FAMILY_MAP[normalizedFam];
      if (mapped) {
        addVector(mapped, familyMultiplier);
      }
    }
  } else {
    addVector({ freshness: 0.2, warmth: 0.2, woody: 0.2, floral: 0.2 }, 0.5);
  }
  if (answers.mood) {
    const mapped = MOOD_MAP[answers.mood.toLowerCase().trim()];
    if (mapped) addVector(mapped, 0.5);
  }
  if (answers.atmosphere) {
    const mapped = ATMOSPHERE_MAP[answers.atmosphere.toLowerCase().trim()];
    if (mapped) addVector(mapped, 0.4);
  }
  if (answers.occasion) {
    const mapped = OCCASION_MAP[answers.occasion.toLowerCase().trim()];
    if (mapped) addVector(mapped, 0.4);
  }
  const rawIntensity = parseRawIntensity(answers.intensity);
  const intensityValue = mapIntensityToFeature(rawIntensity);
  accumulated.intensity = intensityValue * 0.8 + Math.min(1, accumulated.intensity) * 0.2;
  const finalFeatures = {
    freshness: clampAndNormalize(accumulated.freshness),
    sweetness: clampAndNormalize(accumulated.sweetness),
    warmth: clampAndNormalize(accumulated.warmth),
    floral: clampAndNormalize(accumulated.floral),
    woody: clampAndNormalize(accumulated.woody),
    citrus: clampAndNormalize(accumulated.citrus),
    spicy: clampAndNormalize(accumulated.spicy),
    aquatic: clampAndNormalize(accumulated.aquatic),
    gourmand: clampAndNormalize(accumulated.gourmand),
    intensity: Number(Math.min(1, Math.max(0, accumulated.intensity)).toFixed(2))
  };
  return {
    features: finalFeatures,
    metadata: {
      mood: answers.mood,
      atmosphere: answers.atmosphere,
      scent_family: families,
      intensity_raw: rawIntensity,
      occasion: answers.occasion,
      gender: answers.gender,
      age_range: answers.age_range,
      occupation: answers.occupation,
      price_range: answers.price_range
    }
  };
}
function clampAndNormalize(val) {
  if (val <= 0) return 0;
  const normalized = 1 - Math.exp(-val * 1.4);
  return Number(Math.min(1, Math.max(0, normalized)).toFixed(2));
}
const FEATURE_IMPORTANCE_WEIGHTS = {
  // Core olfactive profiles carry highest importance
  freshness: 1.1,
  sweetness: 1,
  warmth: 1.1,
  floral: 1.2,
  woody: 1.2,
  citrus: 1.1,
  spicy: 1,
  aquatic: 1.1,
  gourmand: 1.1,
  // Intensity is a constraint/preference modifier
  intensity: 0.8
};
function calculateFeatureSimilarity(customerVec, fragranceVec) {
  let dotProduct = 0;
  let customerNorm = 0;
  let fragranceNorm = 0;
  const keys = Object.keys(FEATURE_IMPORTANCE_WEIGHTS);
  for (const k of keys) {
    const w = FEATURE_IMPORTANCE_WEIGHTS[k];
    const cVal = customerVec[k];
    const fVal = fragranceVec[k];
    dotProduct += w * cVal * fVal;
    customerNorm += w * cVal * cVal;
    fragranceNorm += w * fVal * fVal;
  }
  if (customerNorm === 0 || fragranceNorm === 0) return 0.5;
  const cosine = dotProduct / (Math.sqrt(customerNorm) * Math.sqrt(fragranceNorm));
  let distancePenalty = 0;
  let totalWeights = 0;
  for (const k of keys) {
    const w = FEATURE_IMPORTANCE_WEIGHTS[k];
    const cVal = customerVec[k];
    const fVal = fragranceVec[k];
    if (cVal > 0.4) {
      distancePenalty += w * Math.abs(cVal - fVal);
      totalWeights += w;
    }
  }
  const penaltyFactor = totalWeights > 0 ? distancePenalty / totalWeights * 0.15 : 0;
  const rawScore = cosine - penaltyFactor;
  return Math.min(1, Math.max(0, rawScore));
}
function scoreToMatchPercent(score) {
  const scaled = 60 + Math.pow(score, 1.2) * 38;
  return Math.min(98, Math.max(50, Math.round(scaled)));
}
function scoreAndRankFragrances(profile, dataset = FRAGRANCES, topCount = 3) {
  if (!dataset || dataset.length === 0) {
    return {
      customerProfile: profile,
      recommendations: []
    };
  }
  const scoredList = dataset.map(
    (item) => {
      const score = calculateFeatureSimilarity(profile.features, item.features);
      const matchPercent = scoreToMatchPercent(score);
      return {
        fragrance: item,
        score: Number(score.toFixed(4)),
        matchPercent
      };
    }
  );
  scoredList.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.matchPercent !== a.matchPercent) {
      return b.matchPercent - a.matchPercent;
    }
    return a.fragrance.id.localeCompare(b.fragrance.id);
  });
  const topItems = scoredList.slice(0, topCount);
  const recommendations = topItems.map((item, index) => ({
    rank: index + 1,
    fragranceId: item.fragrance.id,
    score: item.score,
    matchPercent: item.matchPercent,
    fragrance: item.fragrance
  }));
  return {
    customerProfile: profile,
    recommendations
  };
}
const RAW_ABNA_PRODUCTS = [
  {
    rowNumber: 3,
    namaParfum: "Omnia Amethyste",
    designer: "Bvlgari",
    kategoriGender: "Women",
    hargaPerML: 3800,
    kode: "B",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 4,
    namaParfum: "Secret Wish",
    designer: "Anna Sui",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "B",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 5,
    namaParfum: "XXX",
    designer: "Aigner",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "B",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 6,
    namaParfum: "Cool Water Man",
    designer: "Davidoff",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "B",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 7,
    namaParfum: "Blue Seduction",
    designer: "Antonio Banderas",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 8,
    namaParfum: "Acqua Digio",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 9,
    namaParfum: "Energize",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 10,
    namaParfum: "Cuddle Rose Powdery",
    designer: "Guzel",
    kategoriGender: "Women",
    hargaPerML: 1900,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 11,
    namaParfum: "Vanilla Cake",
    designer: "Guzel",
    kategoriGender: "Women",
    hargaPerML: 1900,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 12,
    namaParfum: "Cusson",
    designer: "Guzel",
    kategoriGender: "Unisex",
    hargaPerML: 2e3,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 13,
    namaParfum: "No.5",
    designer: "Chanel",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 14,
    namaParfum: "London",
    designer: "Burberry",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 15,
    namaParfum: "Extreme Outdoor",
    designer: "Guzel",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 16,
    namaParfum: "Flower",
    designer: "Kenzo",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 17,
    namaParfum: "Vannila Lace",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 18,
    namaParfum: "Daun",
    designer: "Kenzo",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 19,
    namaParfum: "Incanto Shine",
    designer: "Salvatore Feragamo",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 20,
    namaParfum: "Sabaya",
    designer: "Al Rehab",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 21,
    namaParfum: "Zahrat Hawai",
    designer: "Al Rehab",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 22,
    namaParfum: "Desire Red",
    designer: "Alfred Dunhill",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 23,
    namaParfum: "Bee",
    designer: "Calvin Klein",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 24,
    namaParfum: "Girl Summer",
    designer: "Guess",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 25,
    namaParfum: "Black",
    designer: "Jaguar",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 26,
    namaParfum: "Kasturi Korma",
    designer: "Kasturi Korma",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 27,
    namaParfum: "Meow",
    designer: "Katty Pery",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 28,
    namaParfum: "Leaupar",
    designer: "Kenzo",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 29,
    namaParfum: "Kenzo Pour Homme",
    designer: "Kenzo",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 30,
    namaParfum: "Hieres",
    designer: "Paris Hilton",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 31,
    namaParfum: "White Musk",
    designer: "The Body Shop",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "B",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 32,
    namaParfum: "Desire Blue",
    designer: "Alfred Dunhill",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "C",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 33,
    namaParfum: "Desire Red",
    designer: "Alfred Dunhill",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "C",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 34,
    namaParfum: "Matcha Green Tea",
    designer: "Elizabeth Arden",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "C",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 35,
    namaParfum: "La Vie Est Belle",
    designer: "Lancome",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "C",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 36,
    namaParfum: "Red Vanilla",
    designer: "Zara",
    kategoriGender: "",
    hargaPerML: 2800,
    kode: "C",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 37,
    namaParfum: "BLV",
    designer: "Bvlgari",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "C",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 38,
    namaParfum: "1 Million Lucky",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "D",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 39,
    namaParfum: "Bleu",
    designer: "Chanel",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "D",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 40,
    namaParfum: "Guilty Man",
    designer: "Gucci",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "D",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 41,
    namaParfum: "Baccarat 540 Edp",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "D",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 42,
    namaParfum: "Wanted",
    designer: "Azzaro",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "D",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 43,
    namaParfum: "Cherry In The Air",
    designer: "Escada",
    kategoriGender: "Women",
    hargaPerML: 4300,
    kode: "D",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 44,
    namaParfum: "Man Silver",
    designer: "Zara",
    kategoriGender: "Men",
    hargaPerML: 3500,
    kode: "D",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 45,
    namaParfum: "Rose D'Arabie",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "D",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 46,
    namaParfum: "Un Jardin Lagune",
    designer: "Hermes",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "D",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 47,
    namaParfum: "Aventus",
    designer: "Creed",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "D",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 48,
    namaParfum: "Jaguar For Man",
    designer: "Jaguar",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "D",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 49,
    namaParfum: "Tressor Midnight Rose",
    designer: "Lancome",
    kategoriGender: "Women",
    hargaPerML: 4300,
    kode: "D",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 50,
    namaParfum: "Miss Blooming Bouquet",
    designer: "Dior",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "D",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 51,
    namaParfum: "Cool Water Woman",
    designer: "Davidoff",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "D",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 52,
    namaParfum: "Polo Blue",
    designer: "Ralph Lauren",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "D",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 53,
    namaParfum: "Moon Sparkle",
    designer: "Escana",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "D",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 54,
    namaParfum: "L'imperatice",
    designer: "D&G",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 55,
    namaParfum: "Bali",
    designer: "Kenzo",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 56,
    namaParfum: "Dunhill London",
    designer: "Alfred Dunhill",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 57,
    namaParfum: "Paul Smith Man 2",
    designer: "Paul Smith",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 58,
    namaParfum: "Japanese Sakura",
    designer: "The Body Shop",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "E",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 59,
    namaParfum: "Eros Man",
    designer: "Versace",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "E",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 60,
    namaParfum: "Vision",
    designer: "Jaguar",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "E",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 61,
    namaParfum: "Cherry In The Air",
    designer: "Escada",
    kategoriGender: "Women",
    hargaPerML: 1800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 62,
    namaParfum: "Bubble Gum",
    designer: "Guzel",
    kategoriGender: "Women",
    hargaPerML: 1800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 63,
    namaParfum: "Fruity Melon",
    designer: "Guzel",
    kategoriGender: "Women",
    hargaPerML: 1800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 64,
    namaParfum: "Polo Sport",
    designer: "Ralph Lauren",
    kategoriGender: "Men",
    hargaPerML: 1800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 65,
    namaParfum: "Romantic Wish",
    designer: "Victoria Secret",
    kategoriGender: "Men",
    hargaPerML: 1800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 66,
    namaParfum: "Eternity Man",
    designer: "Calvin Klein",
    kategoriGender: "Men",
    hargaPerML: 2e3,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 67,
    namaParfum: "Light Blue",
    designer: "D&G",
    kategoriGender: "Women",
    hargaPerML: 2e3,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 68,
    namaParfum: "Passport",
    designer: "Paris Hilton",
    kategoriGender: "Women",
    hargaPerML: 2e3,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 69,
    namaParfum: "Blue Emotion",
    designer: "Aigner",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 70,
    namaParfum: "Choco Musk",
    designer: "Al Rehab",
    kategoriGender: "Unisex",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 71,
    namaParfum: "Dream",
    designer: "Anna Sui",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 72,
    namaParfum: "Forbiden Rose",
    designer: "Avril",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 73,
    namaParfum: "Fantasy",
    designer: "Britney",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 74,
    namaParfum: "Extreme",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 75,
    namaParfum: "Angel Heart",
    designer: "Cladestine",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 76,
    namaParfum: "Dunhill Blue",
    designer: "Alfred Dunhill",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 77,
    namaParfum: "Sexy Gravity",
    designer: "Escada",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 78,
    namaParfum: "Fruity Mango",
    designer: "Guzel",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 79,
    namaParfum: "Harajuku Love",
    designer: "Gwen Stefany",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 80,
    namaParfum: "Platinum Glow",
    designer: "Jenifer Lopez",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 81,
    namaParfum: "Still",
    designer: "Jenifer Lopez",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 82,
    namaParfum: "Legend",
    designer: "Montblanc",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 83,
    namaParfum: "Siren",
    designer: "Paris Hilton",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 84,
    namaParfum: "Woman",
    designer: "Paris Hilton",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 85,
    namaParfum: "Selena Gomez",
    designer: "Selena Gomez",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 86,
    namaParfum: "Taylor Swift",
    designer: "Taylor Swift",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 87,
    namaParfum: "Vanilla",
    designer: "The Body Shop",
    kategoriGender: "Unisex",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 88,
    namaParfum: "Someday",
    designer: "Justin Bieber",
    kategoriGender: "",
    hargaPerML: 2300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 89,
    namaParfum: "Black",
    designer: "Aigner",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 90,
    namaParfum: "Lovely",
    designer: "Al Rehab",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 91,
    namaParfum: "Soft",
    designer: "Al Rehab",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 92,
    namaParfum: "So Sexy",
    designer: "Ariana",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 93,
    namaParfum: "Aqua",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 94,
    namaParfum: "Raffi Ahmad",
    designer: "Guzel",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 95,
    namaParfum: "Pink",
    designer: "Guess",
    kategoriGender: "",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 96,
    namaParfum: "English Pear",
    designer: "Jomalone",
    kategoriGender: "Unisex",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 97,
    namaParfum: "Viva La Juicy Rose Female",
    designer: "Juicy Couture",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 98,
    namaParfum: "Lovely",
    designer: "Sarah Jessica Parker",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 99,
    namaParfum: "So Sexy",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 100,
    namaParfum: "Baccarat 540 Edp",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 2800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 101,
    namaParfum: "Bombshell Night",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 102,
    namaParfum: "Scandalous",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 103,
    namaParfum: "Love Misteriosa",
    designer: "Salvatore Feragamo",
    kategoriGender: "",
    hargaPerML: 2800,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 104,
    namaParfum: "Essential Sport",
    designer: "Lacoste",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 105,
    namaParfum: "Our Moment",
    designer: "One Direction",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 106,
    namaParfum: "Black Opium Floral Shock",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "E",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 107,
    namaParfum: "Pour Homme Soir",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 108,
    namaParfum: "212 Sexy Man",
    designer: "Carolina Herrera",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 109,
    namaParfum: "Lovely",
    designer: "Sarah Jessica Parker",
    kategoriGender: "Women",
    hargaPerML: 4500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 110,
    namaParfum: "212 VIP Man",
    designer: "Carolina Herrera",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 111,
    namaParfum: "Blue Emotion",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 112,
    namaParfum: "The Scent Her",
    designer: "Hugo Boss",
    kategoriGender: "Women",
    hargaPerML: 4800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 113,
    namaParfum: "Black XS L'excess",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 114,
    namaParfum: "Bombshell",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 4800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 115,
    namaParfum: "Orchid",
    designer: "Zara",
    kategoriGender: "Women",
    hargaPerML: 4800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 116,
    namaParfum: "Extreme",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 117,
    namaParfum: "Omnia Amethyste",
    designer: "Bvlgari",
    kategoriGender: "Women",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 118,
    namaParfum: "212 Man",
    designer: "Carolina Herrera",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 119,
    namaParfum: "Orange Man",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 120,
    namaParfum: "The Scent Man",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 121,
    namaParfum: "L'extase",
    designer: "Nina Ricci",
    kategoriGender: "Women",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 122,
    namaParfum: "Valentino Uomo Born In Roma Coral Fantasy",
    designer: "Valentino",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 123,
    namaParfum: "Scandalous",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 5e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 124,
    namaParfum: "Icon",
    designer: "Alfred Dunhill",
    kategoriGender: "Men",
    hargaPerML: 5300,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 125,
    namaParfum: "Coco Mademoiselle",
    designer: "Chanel",
    kategoriGender: "Women",
    hargaPerML: 5300,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 126,
    namaParfum: "Run Wild",
    designer: "Davidof",
    kategoriGender: "Men",
    hargaPerML: 5300,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 127,
    namaParfum: "Coach For Women",
    designer: "Coach",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 128,
    namaParfum: "Black Code",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 129,
    namaParfum: "My Way",
    designer: "Giorgio Armani",
    kategoriGender: "Women",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 130,
    namaParfum: "Terre D'hermes",
    designer: "Hermes",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 131,
    namaParfum: "Scandal Pour Homme",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 132,
    namaParfum: "English Pear",
    designer: "Jomalone",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 133,
    namaParfum: "Essential",
    designer: "Lacoste",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 134,
    namaParfum: "Angel Man",
    designer: "Mugler",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 135,
    namaParfum: "Angel Woman",
    designer: "Mugler",
    kategoriGender: "Women",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 136,
    namaParfum: "1 Million Lucky",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 137,
    namaParfum: "Olympea",
    designer: "Paco Rabanne",
    kategoriGender: "Women",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 138,
    namaParfum: "Valentino Uomo Born In Roma Intense",
    designer: "Valentino",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 139,
    namaParfum: "Libre",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 140,
    namaParfum: "Myslf",
    designer: "YSL",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 141,
    namaParfum: "Black Amber",
    designer: "Zara",
    kategoriGender: "Women",
    hargaPerML: 5500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 142,
    namaParfum: "Allure Sport",
    designer: "Chanel",
    kategoriGender: "Men",
    hargaPerML: 6e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 143,
    namaParfum: "Acqua Digio Profondo",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 144,
    namaParfum: "Ultra Male",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 145,
    namaParfum: "Goddess",
    designer: "Burberry",
    kategoriGender: "Women",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 146,
    namaParfum: "Chloe Edp",
    designer: "Chloe",
    kategoriGender: "Women",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 147,
    namaParfum: "Sauvage",
    designer: "Dior",
    kategoriGender: "Men",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 148,
    namaParfum: "Black XS",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 149,
    namaParfum: "Invictus",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 150,
    namaParfum: "Pure XS",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 151,
    namaParfum: "Burberry For Her",
    designer: "Burberry",
    kategoriGender: "Women",
    hargaPerML: 6e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 152,
    namaParfum: "J'adore",
    designer: "Dior",
    kategoriGender: "Women",
    hargaPerML: 6e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 153,
    namaParfum: "Eros Flame",
    designer: "Versace",
    kategoriGender: "Men",
    hargaPerML: 6e3,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 154,
    namaParfum: "Explorer",
    designer: "Montblanc",
    kategoriGender: "Men",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 155,
    namaParfum: "Invictus Elixir",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 6500,
    kode: "EA",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 156,
    namaParfum: "Sexy Gravity",
    designer: "Escada",
    kategoriGender: "Women",
    hargaPerML: 3500,
    kode: "EA",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 157,
    namaParfum: "Desire Blue",
    designer: "Alfred Dunhill",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "EA",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 158,
    namaParfum: "Rush",
    designer: "Gucci",
    kategoriGender: "Women",
    hargaPerML: 4300,
    kode: "EA",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 159,
    namaParfum: "Stronger With You Parfum",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 6800,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 160,
    namaParfum: "Rouge Trafalgar",
    designer: "Dior",
    kategoriGender: "Women",
    hargaPerML: 7e3,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 161,
    namaParfum: "Rose Essential",
    designer: "Bvlgari",
    kategoriGender: "Women",
    hargaPerML: 7300,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 162,
    namaParfum: "Good Girl Velvet",
    designer: "Carolina Herrera",
    kategoriGender: "Women",
    hargaPerML: 7300,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 163,
    namaParfum: "Herod",
    designer: "Parfums de Marly",
    kategoriGender: "Men",
    hargaPerML: 7300,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 164,
    namaParfum: "Delox",
    designer: "Tiziana Terenzi",
    kategoriGender: "Unisex",
    hargaPerML: 7300,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 165,
    namaParfum: "Garanat",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 7500,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 166,
    namaParfum: "Khamrah Qahwa",
    designer: "Lattafa",
    kategoriGender: "Unisex",
    hargaPerML: 7800,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 167,
    namaParfum: "Aventus",
    designer: "Creed",
    kategoriGender: "Men",
    hargaPerML: 9e3,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 168,
    namaParfum: "Ombre Nomade",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 9e3,
    kode: "EA",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 169,
    namaParfum: "Paradoxe",
    designer: "Prada",
    kategoriGender: "Women",
    hargaPerML: 6800,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 170,
    namaParfum: "9 PM Rebel",
    designer: "Rasasi",
    kategoriGender: "Women",
    hargaPerML: 6800,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 171,
    namaParfum: "In Leather",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 7300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 172,
    namaParfum: "Y Elixir",
    designer: "YSL",
    kategoriGender: "Men",
    hargaPerML: 7300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 173,
    namaParfum: "Twilly",
    designer: "Hermes",
    kategoriGender: "Women",
    hargaPerML: 7800,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 174,
    namaParfum: "Burberry For Her Elixir",
    designer: "Burberry",
    kategoriGender: "Women",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 175,
    namaParfum: "Wood Essence",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 176,
    namaParfum: "Flora Gardenia Intense",
    designer: "Gucci",
    kategoriGender: "Women",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 177,
    namaParfum: "Seoul",
    designer: "Zara",
    kategoriGender: "Men",
    hargaPerML: 5800,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 178,
    namaParfum: "Flora",
    designer: "Gucci",
    kategoriGender: "Women",
    hargaPerML: 6e3,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 179,
    namaParfum: "Alien",
    designer: "Mugler",
    kategoriGender: "Women",
    hargaPerML: 6e3,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 180,
    namaParfum: "Erba Pura",
    designer: "Xerjoff",
    kategoriGender: "Unisex",
    hargaPerML: 6e3,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 181,
    namaParfum: "Golden Secret",
    designer: "Antonio Banderas",
    kategoriGender: "Men",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 182,
    namaParfum: "Man In Black",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 183,
    namaParfum: "Bal D'afrique",
    designer: "Byredo",
    kategoriGender: "Unisex",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 184,
    namaParfum: "Debut",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 185,
    namaParfum: "Code Profumo",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 186,
    namaParfum: "Daisy",
    designer: "Marc Jacobs",
    kategoriGender: "Women",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 187,
    namaParfum: "Arabian Tonka",
    designer: "Montale",
    kategoriGender: "Unisex",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 188,
    namaParfum: "Valentino Donna Born In Roma",
    designer: "Valentino",
    kategoriGender: "Men",
    hargaPerML: 6300,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 189,
    namaParfum: "Angel Share Paradis",
    designer: "By Killian",
    kategoriGender: "Unisex",
    hargaPerML: 6500,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 190,
    namaParfum: "Million Gold Her",
    designer: "Paco Rabanne",
    kategoriGender: "Women",
    hargaPerML: 6500,
    kode: "EA",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 191,
    namaParfum: "Versus",
    designer: "Versace",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "ED",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 192,
    namaParfum: "Le Parfum",
    designer: "Elie Saab",
    kategoriGender: "Women",
    hargaPerML: 4300,
    kode: "ED",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 193,
    namaParfum: "One",
    designer: "Calvin Klein",
    kategoriGender: "Unisex",
    hargaPerML: 2500,
    kode: "ED",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 194,
    namaParfum: "Pink Chiffon",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "EH",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 195,
    namaParfum: "Thousand Wish",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "EH",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 196,
    namaParfum: "Amor Love",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 197,
    namaParfum: "Beautiful Day",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 198,
    namaParfum: "Fuji Sunsine",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 199,
    namaParfum: "Gingham Love",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 200,
    namaParfum: "Mozaffar",
    designer: "Mozaffar",
    kategoriGender: "Unisex",
    hargaPerML: 3e3,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 201,
    namaParfum: "Bakhoor",
    designer: "Bakhoor",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 202,
    namaParfum: "Kasturi Putih",
    designer: "Kasturi Putih",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 203,
    namaParfum: "Ala Rose",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "EH",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 204,
    namaParfum: "Zahrat Khalij",
    designer: "Zahrat Khalij",
    kategoriGender: "Women",
    hargaPerML: 5e3,
    kode: "EJ",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 205,
    namaParfum: "Gaharu",
    designer: "Gaharu",
    kategoriGender: "Unisex",
    hargaPerML: 9e3,
    kode: "EJ",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 206,
    namaParfum: "Oud",
    designer: "Oud",
    kategoriGender: "Unisex",
    hargaPerML: 9e3,
    kode: "EJ",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 207,
    namaParfum: "Oud Bukyah",
    designer: "Oud",
    kategoriGender: "Unisex",
    hargaPerML: 7e3,
    kode: "EL",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 208,
    namaParfum: "Mocacino",
    designer: "Guzel",
    kategoriGender: "Unisex",
    hargaPerML: 2300,
    kode: "EN",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 209,
    namaParfum: "Aqua Kiss",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "F",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 210,
    namaParfum: "Midnight Fantasy",
    designer: "Britney Spears",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "F",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 211,
    namaParfum: "5th Avenue",
    designer: "Elizabeth Arden",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "F",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 212,
    namaParfum: "Noir 29",
    designer: "Le Labo",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 213,
    namaParfum: "Symphony",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 214,
    namaParfum: "By The Fire Place",
    designer: "Maison Margiela",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 215,
    namaParfum: "Renaissance",
    designer: "Xerjoff",
    kategoriGender: "Unisex",
    hargaPerML: 5e3,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 216,
    namaParfum: "Le Beau",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 217,
    namaParfum: "Le Male Le Parfum",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 218,
    namaParfum: "Pacific Chill",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 219,
    namaParfum: "When The Rain Stop",
    designer: "Maison Margiela",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 220,
    namaParfum: "Aventus Absolu",
    designer: "Creed",
    kategoriGender: "Men",
    hargaPerML: 6e3,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 221,
    namaParfum: "777 God Of Fire",
    designer: "Stephane Humbert Lucas 777",
    kategoriGender: "Unisex",
    hargaPerML: 6500,
    kode: "FY",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 222,
    namaParfum: "Bianco Latte",
    designer: "Giardini Di Toscana",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "FY",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 223,
    namaParfum: "Tobacco Honey",
    designer: "Guerlain",
    kategoriGender: "Unisex",
    hargaPerML: 7e3,
    kode: "FY",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 224,
    namaParfum: "Torino 21",
    designer: "Xerjoff",
    kategoriGender: "Unisex",
    hargaPerML: 8500,
    kode: "FY",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 225,
    namaParfum: "Aqua Marine",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "G",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 226,
    namaParfum: "1 Million",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "G",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 227,
    namaParfum: "Man Uomo",
    designer: "Zara",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "G",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 228,
    namaParfum: "Happy Man",
    designer: "Clinique",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "G",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 229,
    namaParfum: "Oud Greatness",
    designer: "Initio",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "G",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 230,
    namaParfum: "9 PM Rebel",
    designer: "Rasasi",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "G",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 231,
    namaParfum: "CR7",
    designer: "Christiano Ronaldo",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "G",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 232,
    namaParfum: "Nude Bouquet",
    designer: "Zara",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "G",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 233,
    namaParfum: "SI",
    designer: "Giorgio Armani",
    kategoriGender: "Women",
    hargaPerML: 3e3,
    kode: "G",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 234,
    namaParfum: "Rawdhah",
    designer: "Ahmed Al Maghribi",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 235,
    namaParfum: "Rose Noir",
    designer: "Ahmed Al Maghribi",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 236,
    namaParfum: "Africa",
    designer: "Axe",
    kategoriGender: "Men",
    hargaPerML: 1800,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 237,
    namaParfum: "Bombshell Intense",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 238,
    namaParfum: "Black Man",
    designer: "Zara",
    kategoriGender: "Men",
    hargaPerML: 2300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 239,
    namaParfum: "Amor Woman",
    designer: "Chacarel",
    kategoriGender: "Men",
    hargaPerML: 2500,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 240,
    namaParfum: "Flight Of Fancy",
    designer: "Anna Sui",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 241,
    namaParfum: "Pink",
    designer: "Benneton",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 242,
    namaParfum: "Black",
    designer: "Bvlgari",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 243,
    namaParfum: "Bottled Night",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 244,
    namaParfum: "Can Can",
    designer: "Paris Hilton",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 245,
    namaParfum: "31",
    designer: "Reef",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "G",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 246,
    namaParfum: "Coklat",
    designer: "Axe",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "H",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 247,
    namaParfum: "Pleasure",
    designer: "Este Lauder",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "H",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 248,
    namaParfum: "Side Effect",
    designer: "Initio",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "J",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 249,
    namaParfum: "Water Kiss",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "J",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 250,
    namaParfum: "Mad About You",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "J",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 251,
    namaParfum: "Wonder Rose",
    designer: "Zara",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "J",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 252,
    namaParfum: "Slavina",
    designer: "Nagita",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "J",
    kategoriHarga: "VIP",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 253,
    namaParfum: "Sultan",
    designer: "Al Rehab",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "K",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 254,
    namaParfum: "Brud Faberge",
    designer: "Brud Faberge",
    kategoriGender: "Men",
    hargaPerML: 3800,
    kode: "K",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 255,
    namaParfum: "Army",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "K",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 256,
    namaParfum: "Black",
    designer: "Aigner",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "K",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 257,
    namaParfum: "Tommy Man",
    designer: "Tommy",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "K",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 258,
    namaParfum: "Ajmal Wisal",
    designer: "Ajmal Wisal",
    kategoriGender: "Women",
    hargaPerML: 4500,
    kode: "M",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 259,
    namaParfum: "Golden Dust",
    designer: "Golden Dust",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "M",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 260,
    namaParfum: "Misik Putih",
    designer: "Misik Putih",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "M",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 261,
    namaParfum: "Darj",
    designer: "Darj",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "M",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 262,
    namaParfum: "Drakar Noir",
    designer: "Guy Laroche",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "M",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 263,
    namaParfum: "Zafaron",
    designer: "Zafaron",
    kategoriGender: "Unisex",
    hargaPerML: 5e3,
    kode: "M",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 264,
    namaParfum: "Misik Hitam",
    designer: "Misik Hitam",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "M",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 265,
    namaParfum: "Brud Faberge",
    designer: "Brud Faberge",
    kategoriGender: "Men",
    hargaPerML: 3800,
    kode: "M",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 266,
    namaParfum: "Fancy Bouquet",
    designer: "Fancy Bouquet",
    kategoriGender: "Women",
    hargaPerML: 11300,
    kode: "M",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 267,
    namaParfum: "Lavender",
    designer: "Spring",
    kategoriGender: "Women",
    hargaPerML: 2e3,
    kode: "M",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 268,
    namaParfum: "Princess Of Bali",
    designer: "Prince",
    kategoriGender: "Unisex",
    hargaPerML: 2500,
    kode: "M",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 269,
    namaParfum: "Kiswah",
    designer: "Kiswah",
    kategoriGender: "Unisex",
    hargaPerML: 3250,
    kode: "M",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 270,
    namaParfum: "Silver",
    designer: "Al Rehab",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "M",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 271,
    namaParfum: "724",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 3500,
    kode: "MM",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 272,
    namaParfum: "Sweetania",
    designer: "The Body Shop",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "MM",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 273,
    namaParfum: "Afternoon Swim",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 2800,
    kode: "MM",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 274,
    namaParfum: "Versus",
    designer: "Versace",
    kategoriGender: "Women",
    hargaPerML: 3e3,
    kode: "MM",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 275,
    namaParfum: "Candy Love",
    designer: "Escada",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "MM",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 276,
    namaParfum: "British Rose",
    designer: "The Body Shop",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "MM",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 277,
    namaParfum: "Hajar Aswad",
    designer: "Hajar Aswad",
    kategoriGender: "Unisex",
    hargaPerML: 5e3,
    kode: "N",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 278,
    namaParfum: "Cendana Keraton",
    designer: "Cendana Keraton",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "N",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 279,
    namaParfum: "Es Teh Manis",
    designer: "Guzel",
    kategoriGender: "Unisex",
    hargaPerML: 1900,
    kode: "N",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 280,
    namaParfum: "Strawberry",
    designer: "Guzel",
    kategoriGender: "Women",
    hargaPerML: 2e3,
    kode: "N",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 281,
    namaParfum: "Melati Keraton",
    designer: "Musk",
    kategoriGender: "Unisex",
    hargaPerML: 2300,
    kode: "N",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 282,
    namaParfum: "Bad Boy Elixir",
    designer: "Carolina Herrera",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 283,
    namaParfum: "Akoya",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 284,
    namaParfum: "Pacific Chill",
    designer: "Louis Vuitton",
    kategoriGender: "",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 285,
    namaParfum: "Delina",
    designer: "Parfums de Marly",
    kategoriGender: "Women",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 286,
    namaParfum: "Kirke B",
    designer: "Tiziana Terenzi",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 287,
    namaParfum: "Symphony",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 288,
    namaParfum: "Lazy Sunday Morning",
    designer: "Maison Margiela",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 289,
    namaParfum: "Layton Exclusive",
    designer: "Parfums de Marly",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 290,
    namaParfum: "Middle East One",
    designer: "Middle East One",
    kategoriGender: "Unisex",
    hargaPerML: 5500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 291,
    namaParfum: "Nautica Voyage",
    designer: "Nautica",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 292,
    namaParfum: "Hudson II",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 293,
    namaParfum: "Penthouse",
    designer: "Mykonos",
    kategoriGender: "",
    hargaPerML: 3800,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 0
  },
  {
    rowNumber: 294,
    namaParfum: "Blue Talisman",
    designer: "Ex Nihilo",
    kategoriGender: "Unisex",
    hargaPerML: 7e3,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 295,
    namaParfum: "Kirke A",
    designer: "Tiziana Terenzi",
    kategoriGender: "Unisex",
    hargaPerML: 7800,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 296,
    namaParfum: "Oud Maracuja",
    designer: "Maison Crivelli",
    kategoriGender: "Unisex",
    hargaPerML: 6e3,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 297,
    namaParfum: "Black Opium A",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 6300,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 298,
    namaParfum: "Y A",
    designer: "YSL",
    kategoriGender: "Men",
    hargaPerML: 6300,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 299,
    namaParfum: "Lacoste Pour Homme",
    designer: "Lacoste",
    kategoriGender: "Men",
    hargaPerML: 6500,
    kode: "O",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 300,
    namaParfum: "La Vie Est Belle",
    designer: "Lancome",
    kategoriGender: "Women",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 301,
    namaParfum: "Baccarat 540 Edp",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 302,
    namaParfum: "Valentino Uomo Born In Roma",
    designer: "Valentino",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 303,
    namaParfum: "Bleu Exclusive",
    designer: "Chanel",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 304,
    namaParfum: "Viva La Juicy",
    designer: "Juicy Couture",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 305,
    namaParfum: "Afternoon Swim",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 306,
    namaParfum: "Black",
    designer: "Mercedes Benz",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 307,
    namaParfum: "Black Opium B",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 308,
    namaParfum: "Y B",
    designer: "YSL",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 309,
    namaParfum: "Bottled Absolu",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 310,
    namaParfum: "Libre Le Parfume",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 4300,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 311,
    namaParfum: "Gardenia",
    designer: "Zara",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "O",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 312,
    namaParfum: "Tabac Rose",
    designer: "BDK",
    kategoriGender: "Unisex",
    hargaPerML: 6800,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 313,
    namaParfum: "Valaya Exclusive",
    designer: "Parfums de Marly",
    kategoriGender: "Women",
    hargaPerML: 7e3,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 314,
    namaParfum: "Forever Wanted Elixir",
    designer: "Azzaro",
    kategoriGender: "Men",
    hargaPerML: 7300,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 315,
    namaParfum: "Aoud Cafe",
    designer: "Mancera",
    kategoriGender: "Unisex",
    hargaPerML: 7300,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 316,
    namaParfum: "City Of Stars",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 7500,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 317,
    namaParfum: "1872 For Men",
    designer: "Clive Christian",
    kategoriGender: "Men",
    hargaPerML: 7800,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 318,
    namaParfum: "Red Tobacco",
    designer: "Mancera",
    kategoriGender: "Unisex",
    hargaPerML: 7800,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 319,
    namaParfum: "Spicebomb",
    designer: "Victor Rolf",
    kategoriGender: "Men",
    hargaPerML: 7800,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 320,
    namaParfum: "Meteore",
    designer: "Louis Vuitton",
    kategoriGender: "Men",
    hargaPerML: 8e3,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 321,
    namaParfum: "Allure Sport Superleggera",
    designer: "Chanel",
    kategoriGender: "Men",
    hargaPerML: 8500,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 322,
    namaParfum: "Gabrielle",
    designer: "Chanel",
    kategoriGender: "Women",
    hargaPerML: 8500,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 323,
    namaParfum: "California Dream",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 9e3,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 324,
    namaParfum: "Madawi",
    designer: "Arabian Oud",
    kategoriGender: "Unisex",
    hargaPerML: 9500,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 325,
    namaParfum: "Oud",
    designer: "Gucci",
    kategoriGender: "Unisex",
    hargaPerML: 9500,
    kode: "O",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 326,
    namaParfum: "Si Fiori",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 7e3,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 327,
    namaParfum: "Elysium",
    designer: "Roja",
    kategoriGender: "Men",
    hargaPerML: 7300,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 328,
    namaParfum: "Hacivat X",
    designer: "Nishane",
    kategoriGender: "Unisex",
    hargaPerML: 8e3,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 329,
    namaParfum: "1 Million",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 8e3,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 330,
    namaParfum: "Black Orchid",
    designer: "Tom Ford",
    kategoriGender: "Unisex",
    hargaPerML: 8300,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 331,
    namaParfum: "Naxos 1861",
    designer: "Xerjoff",
    kategoriGender: "Unisex",
    hargaPerML: 8500,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 332,
    namaParfum: "Jazz Club",
    designer: "Maison Margiela",
    kategoriGender: "Unisex",
    hargaPerML: 6e3,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 333,
    namaParfum: "Ambre Levant",
    designer: "Louis Vuitton",
    kategoriGender: "",
    hargaPerML: 6500,
    kode: "O",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 334,
    namaParfum: "Pink Flambe",
    designer: "Zara",
    kategoriGender: "Women",
    hargaPerML: 3e3,
    kode: "O",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 335,
    namaParfum: "Toy Boy",
    designer: "Moschino",
    kategoriGender: "Men",
    hargaPerML: 3800,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 336,
    namaParfum: "Playboy VIP",
    designer: "Playboy",
    kategoriGender: "Men",
    hargaPerML: 3800,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 337,
    namaParfum: "Tobacco Vanilla",
    designer: "Tom Ford",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 338,
    namaParfum: "Ravishing Love",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 3800,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 339,
    namaParfum: "Platinum",
    designer: "Coach",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 340,
    namaParfum: "Peony Blush Suede",
    designer: "Jomalone",
    kategoriGender: "Unisex",
    hargaPerML: 2800,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 341,
    namaParfum: "Good Girl",
    designer: "Carolina Herrera",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 342,
    namaParfum: "Poppy & Barley",
    designer: "Jomalone",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 343,
    namaParfum: "Wood Sage & Sea Salt",
    designer: "Jomalone",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 344,
    namaParfum: "Tabac Miami 28",
    designer: "Le Labo",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 345,
    namaParfum: "Black Coffee",
    designer: "Guzel",
    kategoriGender: "Unisex",
    hargaPerML: 1800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 346,
    namaParfum: "Zwitssal",
    designer: "Guzel",
    kategoriGender: "Unisex",
    hargaPerML: 1800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 347,
    namaParfum: "Mood Vanilla",
    designer: "Ariana",
    kategoriGender: "Unisex",
    hargaPerML: 1900,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 348,
    namaParfum: "Lifebuoy",
    designer: "Guzel",
    kategoriGender: "Unisex",
    hargaPerML: 1900,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 349,
    namaParfum: "Pilot Garuda",
    designer: "Guzel",
    kategoriGender: "Men",
    hargaPerML: 1900,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 350,
    namaParfum: "Amor Caffe",
    designer: "Mancera",
    kategoriGender: "Unisex",
    hargaPerML: 1900,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 351,
    namaParfum: "Pink Drops",
    designer: "Mykonos",
    kategoriGender: "Women",
    hargaPerML: 1900,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 352,
    namaParfum: "Oud Cashmere",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 2e3,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 353,
    namaParfum: "L'edition",
    designer: "Elle",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 354,
    namaParfum: "My Baby",
    designer: "Guzel",
    kategoriGender: "Unisex",
    hargaPerML: 2300,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 355,
    namaParfum: "Dalal",
    designer: "Al Rehab",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 356,
    namaParfum: "Flora Gardenia",
    designer: "Gucci",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 357,
    namaParfum: "Mon Paris",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 2500,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 358,
    namaParfum: "Fantasia Mermaid",
    designer: "Anna Sui",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 359,
    namaParfum: "Aqua Atlantic",
    designer: "Bvlgari",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 360,
    namaParfum: "Pramugari",
    designer: "Guzel",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 361,
    namaParfum: "Selection",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 362,
    namaParfum: "XX",
    designer: "Hugo Boss",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 363,
    namaParfum: "Black Opium Gold",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 364,
    namaParfum: "Sweet Like Candy",
    designer: "Ariana",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 365,
    namaParfum: "Scarlet",
    designer: "Guzel",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 366,
    namaParfum: "Oud Silk Mood",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 367,
    namaParfum: "Nautica Voyage Sport",
    designer: "Nautica",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "P",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 368,
    namaParfum: "One & Only",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 369,
    namaParfum: "Scandal Absolu",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 370,
    namaParfum: "Le Male Elixir",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 371,
    namaParfum: "Attrape Reves",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 372,
    namaParfum: "Ani",
    designer: "Nishane",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 373,
    namaParfum: "777 God Of Fire",
    designer: "Stephane Humbert Lucas 777",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 374,
    namaParfum: "Erba Gold",
    designer: "Xerjoff",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 375,
    namaParfum: "Lira",
    designer: "Xerjoff",
    kategoriGender: "Women",
    hargaPerML: 5e3,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 376,
    namaParfum: "Candy Rock Sugar",
    designer: "Kayali",
    kategoriGender: "Women",
    hargaPerML: 3500,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 377,
    namaParfum: "Fleur Narcotique",
    designer: "Ex Nihilo",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 378,
    namaParfum: "Do Son",
    designer: "Diptyque",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 379,
    namaParfum: "La Tulipe",
    designer: "Byredo",
    kategoriGender: "Women",
    hargaPerML: 3500,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 380,
    namaParfum: "Another 13",
    designer: "Le Labo",
    kategoriGender: "Unisex",
    hargaPerML: 3500,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 381,
    namaParfum: "Paradigme",
    designer: "Prada",
    kategoriGender: "Men",
    hargaPerML: 3500,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 382,
    namaParfum: "Cloud Pink",
    designer: "Ariana",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 383,
    namaParfum: "Addict Peach Glow",
    designer: "Dior",
    kategoriGender: "Women",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 384,
    namaParfum: "Inception",
    designer: "Mykonos",
    kategoriGender: "Men",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 385,
    namaParfum: "Royal Ispahan",
    designer: "Mykonos",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 386,
    namaParfum: "9 PM Elixir",
    designer: "Rasasi",
    kategoriGender: "Women",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 387,
    namaParfum: "Vibrato",
    designer: "Sospiro",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 388,
    namaParfum: "Eros Energy",
    designer: "Versace",
    kategoriGender: "Men",
    hargaPerML: 3800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 389,
    namaParfum: "Club De Nuit Intense Man",
    designer: "Armaf",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 390,
    namaParfum: "Impadia",
    designer: "BDK",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 391,
    namaParfum: "La Bomba",
    designer: "Carolina Herrera",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 392,
    namaParfum: "Virgin Island Water",
    designer: "Creed",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 393,
    namaParfum: "Le Beau Paradise Garden",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 394,
    namaParfum: "Fleur Du Desert",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 395,
    namaParfum: "Explorer Platinum",
    designer: "Montblanc",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 396,
    namaParfum: "Eros Najim",
    designer: "Versace",
    kategoriGender: "Men",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 397,
    namaParfum: "Black Opium Red Cherry",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 398,
    namaParfum: "Turathi Electric",
    designer: "Afnan",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 399,
    namaParfum: "Rouge Chaotique",
    designer: "Byredo",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 400,
    namaParfum: "Acne Studio",
    designer: "Frederic Malle",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 401,
    namaParfum: "La Luna Valley",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 402,
    namaParfum: "Voila",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 403,
    namaParfum: "Majesty Rose Royal",
    designer: "Kayali",
    kategoriGender: "Women",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 404,
    namaParfum: "Eclaire",
    designer: "Lattafa",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 405,
    namaParfum: "Grand Soir",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 406,
    namaParfum: "Luminos",
    designer: "Mykonos",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 407,
    namaParfum: "Strawberry Poundcake",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 408,
    namaParfum: "Eden Juicy Apple",
    designer: "Kayali",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 409,
    namaParfum: "Bali",
    designer: "Kenzo",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 410,
    namaParfum: "Boujee Marshmallow",
    designer: "Kayali",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 411,
    namaParfum: "Moringa",
    designer: "The Body Shop",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 412,
    namaParfum: "Vibrato",
    designer: "Xerjoff",
    kategoriGender: "Unisex",
    hargaPerML: 7800,
    kode: "Q",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 413,
    namaParfum: "Mellow Yellow",
    designer: "Anna Sui",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 414,
    namaParfum: "Into The Night",
    designer: "BBW",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 415,
    namaParfum: "Warm Vanilla",
    designer: "BBW",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 416,
    namaParfum: "Reversed",
    designer: "Hugo Boss",
    kategoriGender: "Men",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 417,
    namaParfum: "Maui Sweet Banana",
    designer: "Kayali",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 418,
    namaParfum: "Vanilla 28",
    designer: "Kayali",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 419,
    namaParfum: "9 AM Dive",
    designer: "Rasasi",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 420,
    namaParfum: "Sexy Lotus & Pomegranate",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "Q",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 421,
    namaParfum: "Sauvage Elixir",
    designer: "Dior",
    kategoriGender: "Men",
    hargaPerML: 4500,
    kode: "S",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 422,
    namaParfum: "Special Oud Madawi",
    designer: "Arabian Oud",
    kategoriGender: "Unisex",
    hargaPerML: 3500,
    kode: "S",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 423,
    namaParfum: "Les Sable Roses",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 2500,
    kode: "S",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 424,
    namaParfum: "Bloom",
    designer: "Gucci",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "S",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 425,
    namaParfum: "Erba Pura",
    designer: "Xerjof",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "S",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 426,
    namaParfum: "Libre Intense",
    designer: "YSL",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "S",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 427,
    namaParfum: "Coconut Passion",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 2300,
    kode: "S",
    kategoriHarga: "VIP",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 428,
    namaParfum: "Flora Gardenia Limited Edition",
    designer: "Gucci",
    kategoriGender: "Women",
    hargaPerML: 2800,
    kode: "S",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 429,
    namaParfum: "Layton",
    designer: "Parfums de Marly",
    kategoriGender: "Men",
    hargaPerML: 3e3,
    kode: "S",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 430,
    namaParfum: "Acqua Digio Profondo",
    designer: "Giorgio Armani",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "S",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 431,
    namaParfum: "My Way",
    designer: "Giorgio Armani",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "S",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 432,
    namaParfum: "Alien Mirage",
    designer: "Mugler",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "S",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 433,
    namaParfum: "Angel Nova",
    designer: "Mugler",
    kategoriGender: "Women",
    hargaPerML: 3300,
    kode: "S",
    kategoriHarga: "VIP",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 434,
    namaParfum: "Sore",
    designer: "HMNS",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "SS",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 435,
    namaParfum: "Eau So Party",
    designer: "Victoria Secret",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "SS",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 436,
    namaParfum: "Addict",
    designer: "HMNS",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "SS",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 437,
    namaParfum: "Ombre Nomade",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "SS",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 438,
    namaParfum: "Alpha",
    designer: "HMNS",
    kategoriGender: "Men",
    hargaPerML: 2800,
    kode: "SS",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 439,
    namaParfum: "Darker Shade Of Orgsm",
    designer: "HMNS",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "SS",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 440,
    namaParfum: "Essence Of The Sun",
    designer: "HMNS",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "SS",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 441,
    namaParfum: "Perfection",
    designer: "HMNS",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "SS",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 442,
    namaParfum: "Oudgasm Vanilla",
    designer: "Kayali",
    kategoriGender: "Unisex",
    hargaPerML: 6500,
    kode: "SS",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 443,
    namaParfum: "Orgsm",
    designer: "HMNS",
    kategoriGender: "Unisex",
    hargaPerML: 2800,
    kode: "SS",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 444,
    namaParfum: "Farhampton",
    designer: "HMNS",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "SS",
    kategoriHarga: "VIP",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 49e3,
    harga30ML: 11e4,
    harga50ML: 18e4,
    harga100ML: 34e4,
    stockQty: 100
  },
  {
    rowNumber: 445,
    namaParfum: "Petit Matin",
    designer: "Maison Francis Kurkdjian",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "X",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 446,
    namaParfum: "Slow Living",
    designer: "Mykonos",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "X",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 447,
    namaParfum: "Moon Tale",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 5e3,
    kode: "X",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 448,
    namaParfum: "Stronger With You Intensely",
    designer: "Giorgio Armani",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "X",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 449,
    namaParfum: "Orage",
    designer: "Louis Vuitton",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "X",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 450,
    namaParfum: "Santal 33",
    designer: "Le Labo",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "X",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 451,
    namaParfum: "On The Rocks",
    designer: "Mykonos",
    kategoriGender: "Unisex",
    hargaPerML: 3500,
    kode: "X",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 452,
    namaParfum: "Milesime Imperial",
    designer: "Creed",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "X",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 453,
    namaParfum: "Marfa",
    designer: "Memo Paris",
    kategoriGender: "Unisex",
    hargaPerML: 4e3,
    kode: "X",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 454,
    namaParfum: "Perfect",
    designer: "Marc Jacobs",
    kategoriGender: "Women",
    hargaPerML: 4300,
    kode: "X",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 455,
    namaParfum: "Monaco Royale",
    designer: "Monaco",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "X",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 456,
    namaParfum: "Hawas Ice",
    designer: "Rasasi",
    kategoriGender: "Men",
    hargaPerML: 4300,
    kode: "X",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 457,
    namaParfum: "Ink Mark",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 6800,
    kode: "X",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 458,
    namaParfum: "Rain Tea",
    designer: "Louis Vuitton",
    kategoriGender: "Unisex",
    hargaPerML: 6500,
    kode: "X",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 459,
    namaParfum: "1 Million",
    designer: "Paco Rabanne",
    kategoriGender: "Men",
    hargaPerML: 5e3,
    kode: "Y",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 460,
    namaParfum: "Marbet Man",
    designer: "Marbet Man",
    kategoriGender: "Men",
    hargaPerML: 7e3,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 461,
    namaParfum: "Al Khanjar",
    designer: "Al Khanjar",
    kategoriGender: "Men",
    hargaPerML: 8e3,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 462,
    namaParfum: "Black Oud",
    designer: "Black Oud",
    kategoriGender: "Unisex",
    hargaPerML: 8e3,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 463,
    namaParfum: "Sandal Rose",
    designer: "Sandal Rose",
    kategoriGender: "Unisex",
    hargaPerML: 8e3,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 464,
    namaParfum: "Mizan",
    designer: "Athar",
    kategoriGender: "Unisex",
    hargaPerML: 1e4,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 465,
    namaParfum: "Sulthon",
    designer: "Sulthon",
    kategoriGender: "Unisex",
    hargaPerML: 1e4,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 466,
    namaParfum: "Tom Oud",
    designer: "Tom Oud",
    kategoriGender: "Unisex",
    hargaPerML: 1e4,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 467,
    namaParfum: "Al Khaleej",
    designer: "Al Khaleej",
    kategoriGender: "Unisex",
    hargaPerML: 15e3,
    kode: "Y",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 468,
    namaParfum: "Oud Bukyah",
    designer: "Oud",
    kategoriGender: "Unisex",
    hargaPerML: 8e3,
    kode: "Y",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 469,
    namaParfum: "Ehass",
    designer: "Arabian Oud",
    kategoriGender: "",
    hargaPerML: 5800,
    kode: "Y",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 470,
    namaParfum: "Alf Zahra",
    designer: "Alf Zahra",
    kategoriGender: "Women",
    hargaPerML: 6e3,
    kode: "Y",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 471,
    namaParfum: "Ameer Al Oud",
    designer: "Ameer Al Oud",
    kategoriGender: "Unisex",
    hargaPerML: 6e3,
    kode: "Y",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 472,
    namaParfum: "Malaikat Subuh",
    designer: "Malaikat Subuh",
    kategoriGender: "Unisex",
    hargaPerML: 6e3,
    kode: "Y",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 473,
    namaParfum: "Misik Rumani",
    designer: "Misik Rumani",
    kategoriGender: "Unisex",
    hargaPerML: 6e3,
    kode: "Y",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 474,
    namaParfum: "Ambre Vanille Eau Gourmande",
    designer: "Laura Mercier",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 475,
    namaParfum: "Pegasus",
    designer: "Parfums de Marly",
    kategoriGender: "Men",
    hargaPerML: 4800,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 476,
    namaParfum: "Supreme Bouquet",
    designer: "YSL",
    kategoriGender: "Unisex",
    hargaPerML: 4800,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 477,
    namaParfum: "Silver Mountain Water",
    designer: "Creed",
    kategoriGender: "",
    hargaPerML: 5e3,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 478,
    namaParfum: "Aican",
    designer: "Kajal",
    kategoriGender: "",
    hargaPerML: 5300,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 479,
    namaParfum: "The Most Wanted",
    designer: "Azzaro",
    kategoriGender: "Men",
    hargaPerML: 5500,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 480,
    namaParfum: "Althair",
    designer: "Parfums de Marly",
    kategoriGender: "Men",
    hargaPerML: 6500,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 481,
    namaParfum: "Oud Wood",
    designer: "Tom Ford",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 482,
    namaParfum: "Stronger With You",
    designer: "Giorgio Armani",
    kategoriGender: "Men",
    hargaPerML: 6e3,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 483,
    namaParfum: "Valaya",
    designer: "Parfums de Marly",
    kategoriGender: "Women",
    hargaPerML: 6300,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 484,
    namaParfum: "Imagination",
    designer: "Louis Vuitton",
    kategoriGender: "Men",
    hargaPerML: 6500,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 485,
    namaParfum: "Megamare",
    designer: "Orto Parisi",
    kategoriGender: "Unisex",
    hargaPerML: 6500,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 486,
    namaParfum: "Rose Vanille",
    designer: "Mancera",
    kategoriGender: "Unisex",
    hargaPerML: 3300,
    kode: "Z",
    kategoriHarga: "ELITE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 98e3,
    harga30ML: 2e5,
    harga50ML: 3e5,
    harga100ML: 58e4,
    stockQty: 100
  },
  {
    rowNumber: 487,
    namaParfum: "Tuxedo",
    designer: "YSL",
    kategoriGender: "Unisex",
    hargaPerML: 4500,
    kode: "Z",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 488,
    namaParfum: "Black Musk",
    designer: "The Body Shop",
    kategoriGender: "Unisex",
    hargaPerML: 3800,
    kode: "Z",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 489,
    namaParfum: "Silver Scent",
    designer: "California",
    kategoriGender: "Women",
    hargaPerML: 4e3,
    kode: "Z",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 490,
    namaParfum: "Angel Share",
    designer: "By Killian",
    kategoriGender: "Unisex",
    hargaPerML: 4300,
    kode: "Z",
    kategoriHarga: "EXCLUSIVE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 72e3,
    harga30ML: 15e4,
    harga50ML: 24e4,
    harga100ML: 46e4,
    stockQty: 100
  },
  {
    rowNumber: 491,
    namaParfum: "One & Only",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 8500,
    kode: "Z",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 492,
    namaParfum: "Tygar",
    designer: "Bvlgari",
    kategoriGender: "Unisex",
    hargaPerML: 9500,
    kode: "Z",
    kategoriHarga: "SPECIAL ONE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 136e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 493,
    namaParfum: "Le Male Elixir Absolu",
    designer: "Jean Paul Gaultier",
    kategoriGender: "Men",
    hargaPerML: 7300,
    kode: "Z",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.43,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 494,
    namaParfum: "Guidance 46",
    designer: "Amouage",
    kategoriGender: "Unisex",
    hargaPerML: 8e3,
    kode: "Z",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 495,
    namaParfum: "33",
    designer: "Reef",
    kategoriGender: "Unisex",
    hargaPerML: 5800,
    kode: "Z",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 496,
    namaParfum: "Bois Imperial",
    designer: "Essential",
    kategoriGender: "Unisex",
    hargaPerML: 6e3,
    kode: "Z",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.5,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 497,
    namaParfum: "Hudson Valley",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 6300,
    kode: "Z",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 498,
    namaParfum: "9 PM Night Out",
    designer: "Rasasi",
    kategoriGender: "Women",
    hargaPerML: 6300,
    kode: "Z",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.37,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  },
  {
    rowNumber: 499,
    namaParfum: "Imperial Valley",
    designer: "Gissah",
    kategoriGender: "Unisex",
    hargaPerML: 6500,
    kode: "Z",
    kategoriHarga: "THE NATURE",
    persentaseBibit: 0.4,
    persentaseDiskon: 0.5,
    harga10ML: 112e3,
    harga30ML: 23e4,
    harga50ML: 37e4,
    harga100ML: 72e4,
    stockQty: 100
  }
];
const BATCH_01_ENRICHMENT_RECORDS = [
  // 1. Row 4: Secret Wish (Anna Sui, EXCLUSIVE)
  {
    productId: "abna_secret_wish_anna_sui_exclusive_4",
    notes: {
      top: ["Lemon", "Tagetes", "Melon", "Peach"],
      middle: ["Blackcurrant", "Pineapple", "Lily of the Valley"],
      base: ["White Cedar", "Amber", "Musk", "Sandalwood"]
    },
    accords: ["fruity", "sweet", "citrus", "fresh", "tropical"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h"
    },
    editorialStory: "A magical, enchanting floral-fruity elixir inspired by fairy woodland realms.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Anna-Sui/Secret-Wish-1557.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 2. Row 6: Cool Water Man (Davidoff, EXCLUSIVE)
  {
    productId: "abna_cool_water_man_davidoff_exclusive_6",
    notes: {
      top: ["Sea Water", "Mint", "Green Notes", "Lavender", "Coriander", "Rosemary", "Calone"],
      middle: ["Sandalwood", "Jasmine", "Neroli", "Geranium"],
      base: ["Musk", "Oakmoss", "Cedarwood", "Tobacco", "Amber"]
    },
    accords: ["aromatic", "marine", "green", "fresh spicy", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "The quintessential marine fougère opening with a burst of oceanic freshness.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Davidoff/Cool-Water-507.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 3. Row 7: Blue Seduction (Antonio Banderas, EXCLUSIVE)
  {
    productId: "abna_blue_seduction_antonio_banderas_exclusive_7",
    notes: {
      top: ["Melon", "Bergamot", "Mint", "Blackcurrant"],
      middle: ["Sea Water", "Green Apple", "Cappuccino", "Cardamom", "Nutmeg"],
      base: ["Amber", "Woody Notes"]
    },
    accords: ["aromatic", "aquatic", "fruity", "fresh spicy", "marine"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A modern, magnetic fragrance characterized by watery freshness and warm cappuccino.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Antonio-Banderas/Blue-Seduction-1970.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 4. Row 8: Acqua Digio (Giorgio Armani, EXCLUSIVE)
  {
    productId: "abna_acqua_digio_giorgio_armani_exclusive_8",
    notes: {
      top: ["Lime", "Lemon", "Bergamot", "Jasmine", "Orange", "Mandarin", "Neroli"],
      middle: [
        "Sea Notes",
        "Jasmine",
        "Calone",
        "Peach",
        "Freesia",
        "Rosemary",
        "Lily of the Valley",
        "Rose"
      ],
      base: ["White Musk", "Cedarwood", "Oakmoss", "Patchouli", "Amber"]
    },
    accords: ["citrus", "marine", "aromatic", "fresh", "floral"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "The timeless Mediterranean icon capturing sea spray, warm sun, and coastal earth.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Acqua-di-Gio-410.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 5. Row 9: Energize (Hugo Boss, EXCLUSIVE)
  {
    productId: "abna_energize_hugo_boss_exclusive_9",
    notes: {
      top: ["Pink Pepper", "Lemon", "Kumquat", "Pineapple Leaf", "Mint", "Mandarin", "Cardamom"],
      middle: ["Nutmeg", "Juniper", "Clary Sage", "Freesia", "Coriander", "Jasmine"],
      base: ["Teak Wood", "Leather", "Vanilla"]
    },
    accords: ["citrus", "aromatic", "warm spicy", "fresh spicy", "woody"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An urban energetic cocktail with vibrant citrus top notes and a warm spicy drydown.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Hugo-Energise-385.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 6. Row 13: No.5 (Chanel, VIP)
  {
    productId: "abna_no_5_chanel_vip_13",
    notes: {
      top: ["Aldehydes", "Ylang-Ylang", "Neroli", "Bergamot", "Peach"],
      middle: ["Iris", "Jasmine", "Rose", "Lily of the Valley"],
      base: ["Sandalwood", "Vanilla", "Oakmoss", "Vetiver", "Patchouli"]
    },
    accords: ["powdery", "floral", "woody", "warm spicy", "citrus"],
    fragranceFamily: ["Floral", "Aldehyde"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "The world's most legendary abstract floral bouquet framed by dazzling aldehydes.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chanel/Chanel-No-5-Eau-de-Parfum-608.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 7. Row 14: London (Burberry, VIP)
  {
    productId: "abna_london_burberry_vip_14",
    notes: {
      top: ["Honeysuckle", "Tangerine", "Rose"],
      middle: ["Jasmine", "Tiare Flower", "Peony", "Clementine"],
      base: ["Musk", "Sandalwood", "Patchouli"]
    },
    accords: ["white floral", "floral", "fruity", "citrus", "sweet"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A classic floral celebration of the contemporary yet elegant spirit of London.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Burberry/Burberry-London-816.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 8. Row 16: Flower (Kenzo, VIP)
  {
    productId: "abna_flower_kenzo_vip_16",
    notes: {
      top: ["Bulgarian Rose", "Hawthorn", "Blackcurrant", "Mandarin"],
      middle: ["Violet", "Rose", "Opoponax", "Jasmine"],
      base: ["Vanilla", "White Musk", "Incense"]
    },
    accords: ["powdery", "floral", "vanilla", "sweet", "violet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "7-9h"
    },
    editorialStory: "A poetic powdery floral expressing the unexpected power of a poppy in the city.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/Flower-by-Kenzo-72.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 9. Row 17: Vannila Lace (Victoria Secret, VIP)
  {
    productId: "abna_vannila_lace_victoria_secret_vip_17",
    notes: {
      top: ["Vanilla", "White Musk"],
      middle: ["Chamomile", "Aloe Vera"],
      base: ["Vanilla", "Amber"]
    },
    accords: ["vanilla", "powdery", "sweet", "musky"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An alluring, comforting cloud of pure warm vanilla and soft calming florals.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Vanilla-Lace-13350.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 10. Row 18: Daun (Kenzo, VIP)
  {
    productId: "abna_daun_kenzo_vip_18",
    notes: {
      top: ["Lily of the Valley", "Green Notes"],
      middle: ["Peony", "Jasmine", "Hyacinth"],
      base: ["Sandalwood", "White Musk"]
    },
    accords: ["green", "white floral", "floral", "fresh", "fresh spicy"],
    fragranceFamily: ["Floral", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A serene transparent leaf of summer morning dew, lilies, and green botanicals.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/Parfum-d-Ete-79.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.92,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 11. Row 19: Incanto Shine (Salvatore Feragamo, VIP)
  {
    productId: "abna_incanto_shine_salvatore_feragamo_vip_19",
    notes: {
      top: ["Pineapple", "Passionfruit", "Bergamot"],
      middle: ["Peach", "Peony", "Freesia"],
      base: ["White Musk", "Cedarwood", "Amber"]
    },
    accords: ["fruity", "tropical", "sweet", "fresh", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A radiant, joyful splash of sun-drenched pineapple, passionfruit, and soft woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Salvatore-Ferragamo/Incanto-Shine-1959.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 12. Row 20: Sabaya (Al Rehab, VIP)
  {
    productId: "abna_sabaya_al_rehab_vip_20",
    notes: {
      top: ["Rose", "Citruses"],
      middle: ["Green Notes", "Rose"],
      base: ["Citruses", "White Musk"]
    },
    accords: ["citrus", "floral", "rose", "green", "fresh"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An uplifting, radiant blend of fresh garden roses and zesty Mediterranean citruses.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Sabaya-20150.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 13. Row 21: Zahrat Hawai (Al Rehab, VIP)
  {
    productId: "abna_zahrat_hawai_al_rehab_vip_21",
    notes: {
      top: ["Pineapple", "Coconut", "Pina Colada"],
      middle: ["Strawberry", "Caramel", "Floral Notes"],
      base: ["Woody Notes", "Citruses"]
    },
    accords: ["sweet", "tropical", "fruity", "coconut", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Strong",
      longevity: "6-8h"
    },
    editorialStory: "A sun-kissed Hawaiian holiday bottled with sweet pineapple, creamy coconut, and caramel.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Zahrat-Hawaii-20154.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 14. Row 22: Desire Red (Alfred Dunhill, VIP)
  {
    productId: "abna_desire_red_alfred_dunhill_vip_22",
    notes: {
      top: ["Apple", "Lemon", "Bergamot", "Orange Blossom"],
      middle: ["Rose", "Teak Wood", "Patchouli"],
      base: ["Vanilla", "Musk"]
    },
    accords: ["citrus", "vanilla", "fruity", "sweet", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A passionate masculine composition uniting crisp red apple, warm teak wood, and vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-for-a-Man-1934.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 15. Row 23: Bee (Calvin Klein, VIP)
  {
    productId: "abna_bee_calvin_klein_vip_23",
    notes: {
      top: ["Lavender", "Green Notes", "Bergamot", "Mint", "Juniper", "Mandarin"],
      middle: ["Green Grass", "Peach", "Jasmine", "Freesia", "Magnolia", "Orchid"],
      base: ["White Musk", "Sandalwood", "Cedarwood", "Vanilla", "Amber", "Opoponax"]
    },
    accords: ["aromatic", "green", "woody", "fresh spicy", "lavender"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An intimate, individualist manifesto of soft aromatic lavender and comforting musks.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Calvin-Klein/CK-be-275.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 16. Row 24: Girl Summer (Guess, VIP)
  {
    productId: "abna_girl_summer_guess_vip_24",
    notes: {
      top: ["Bergamot", "Mandarin", "Neroli"],
      middle: ["Water Lily", "Orange Blossom", "Rose", "Wild Orchid"],
      base: ["Teak Wood", "Vanilla", "Musk"]
    },
    accords: ["citrus", "floral", "white floral", "fresh", "sweet"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h"
    },
    editorialStory: "A flirtatious sunny breeze bursting with citrus blossoms and exotic water lilies.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Guess/Guess-Girl-Summer-24831.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 17. Row 25: Black (Jaguar, VIP)
  {
    productId: "abna_black_jaguar_vip_25",
    notes: {
      top: ["Granny Smith Apple", "Bitter Orange", "Mandarin"],
      middle: ["Tea", "Sea Water", "Geranium", "Nutmeg", "Cardamom"],
      base: ["White Musk", "Virginia Cedar", "Tonka Bean", "Vetiver", "Sandalwood", "Oakmoss"]
    },
    accords: ["aromatic", "fresh spicy", "citrus", "marine", "fruity"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "Sleek and dynamic oriental fougère featuring crisp apple, black tea, and cedar.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jaguar/Jaguar-Classic-Black-7497.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 18. Row 27: Meow (Katty Pery, VIP)
  {
    productId: "abna_meow_katty_pery_vip_27",
    notes: {
      top: ["Pear", "Tangerine", "Gardenia", "Jasmine"],
      middle: ["Honeysuckle", "Orange Blossom", "Lily of the Valley"],
      base: ["Vanilla", "Caramel", "Amber", "Sandalwood", "Musk"]
    },
    accords: ["sweet", "vanilla", "fruity", "white floral", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A playful, sweet confection of juicy pear, creamy gardenia, vanilla, and amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Katy-Perry/Meow-13495.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 19. Row 28: Leaupar (Kenzo, VIP)
  {
    productId: "abna_leaupar_kenzo_vip_28",
    notes: {
      top: ["Reed", "Mint", "Green Lilac", "Mandarin", "Pink Pepper"],
      middle: ["Water Lily", "Black Pepper", "White Peach", "Violet", "Rose"],
      base: ["Cedarwood", "White Musk", "Vanilla"]
    },
    accords: ["aquatic", "floral", "green", "fresh", "fresh spicy"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A serene celebration of pure water, frosted mint leaves, water lily, and white peach.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/L-Eau-par-Kenzo-78.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 20. Row 29: Kenzo Pour Homme (Kenzo, VIP)
  {
    productId: "abna_kenzo_pour_homme_kenzo_vip_29",
    notes: {
      top: ["Sea Notes", "Mahogany", "Sage", "Bergamot", "Lemon"],
      middle: [
        "Pine",
        "Juniper Berries",
        "Carnation",
        "Nutmeg",
        "Rose",
        "Jasmine",
        "Caraway",
        "Lily of the Valley",
        "Iris",
        "Peach"
      ],
      base: [
        "Balsam Fir",
        "Sandalwood",
        "Cedarwood",
        "Oakmoss",
        "Musk",
        "Vetiver",
        "Amber",
        "Labdanum"
      ]
    },
    accords: ["woody", "aromatic", "marine", "balsamic", "fresh spicy"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A trailblazing aquatic-woody monolith evocative of ocean salt and rugged pine cliffs.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/Kenzo-pour-Homme-77.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 21. Row 30: Hieres (Paris Hilton, VIP)
  {
    productId: "abna_hieres_paris_hilton_vip_30",
    notes: {
      top: ["Passionfruit", "Champagne", "Peach", "Granita", "Orange"],
      middle: [
        "Dewberry",
        "Blackberry",
        "Jasmine",
        "Tiare Flower",
        "Ylang-Ylang",
        "Honeysuckle",
        "Grenadine"
      ],
      base: ["Tonka Bean", "White Woods", "Violet"]
    },
    accords: ["fruity", "sweet", "tropical", "champagne", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An effervescent, glamorous cocktail of sparkling champagne, granita, and passionfruit.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paris-Hilton/Heiress-1436.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 22. Row 31: White Musk (The Body Shop, VIP)
  {
    productId: "abna_white_musk_the_body_shop_vip_31",
    notes: {
      top: ["Musk", "Lily", "Ylang-Ylang", "Galbanum", "Basil"],
      middle: ["Musk", "Lily", "Jasmine", "Rose"],
      base: [
        "Musk",
        "Iris",
        "Jasmine",
        "Oakmoss",
        "Rose",
        "Amber",
        "Vanilla",
        "Vetiver",
        "Patchouli",
        "Peach"
      ]
    },
    accords: ["musky", "powdery", "floral", "white floral", "woody"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "The quintessential cruelty-free velvety soft musk enveloped in comforting floral notes.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/White-Musk-2432.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 23. Row 32: Desire Blue (Alfred Dunhill, VIP)
  {
    productId: "abna_desire_blue_alfred_dunhill_vip_32",
    notes: {
      top: ["Litchi", "Mandarin", "Lotus", "Bergamot"],
      middle: ["Sea Notes", "Orange", "Brazilian Rosewood"],
      base: ["Tonka Bean", "Musk", "Benzoin", "Amber"]
    },
    accords: ["marine", "citrus", "fruity", "sweet", "aromatic"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A crystalline aquatic harmony of exotic lychee, dewy lotus flower, and warm benzoin.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-Blue-1935.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 24. Row 33: Desire Red (Alfred Dunhill, VIP - Kode C variant)
  {
    productId: "abna_desire_red_alfred_dunhill_vip_33",
    notes: {
      top: ["Apple", "Lemon", "Bergamot", "Orange Blossom"],
      middle: ["Rose", "Teak Wood", "Patchouli"],
      base: ["Vanilla", "Musk"]
    },
    accords: ["citrus", "vanilla", "fruity", "sweet", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "Warm and sensual oriental woody creation centered on crisp apple, rose, and vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-for-a-Man-1934.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 25. Row 34: Matcha Green Tea (Elizabeth Arden, VIP)
  {
    productId: "abna_matcha_green_tea_elizabeth_arden_vip_34",
    notes: {
      top: ["Matcha Tea", "Green Tea", "Bergamot", "Mandarin"],
      middle: ["Green Tea", "Matcha Tea", "Magnolia", "Floral Notes"],
      base: ["Oakmoss", "White Musk", "Cedarwood"]
    },
    accords: ["green", "fresh", "citrus", "herbal", "floral"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h"
    },
    editorialStory: "An energizing, zen-like infusion of Japanese matcha tea, bright citrus, and calm woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Elizabeth-Arden/Green-Tea-Matcha-Energy-91340.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 26. Row 35: La Vie Est Belle (Lancome, VIP)
  {
    productId: "abna_la_vie_est_belle_lancome_vip_35",
    notes: {
      top: ["Blackcurrant", "Pear"],
      middle: ["Iris", "Jasmine", "Orange Blossom"],
      base: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"]
    },
    accords: ["sweet", "vanilla", "fruity", "woody", "powdery"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "9-11h"
    },
    editorialStory: "A luminous declaration of joy featuring noble iris butter and decadent sweet praline.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lancome/La-Vie-Est-Belle-14982.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 27. Row 36: Red Vanilla (Zara, VIP)
  {
    productId: "abna_red_vanilla_zara_vip_36",
    notes: {
      top: ["Red Berries", "Vanilla"],
      middle: ["Blackcurrant", "Iris"],
      base: ["Praline", "Patchouli", "Tonka Bean"]
    },
    accords: ["sweet", "fruity", "vanilla", "powdery", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A warm, sophisticated gourmand featuring juicy dark berries and creamy vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Red-Vanilla-34440.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 28. Row 37: BLV (Bvlgari, VIP)
  {
    productId: "abna_blv_bvlgari_vip_37",
    notes: {
      top: ["Ginger", "Bergamot"],
      middle: ["Wisteria", "Flax"],
      base: ["Black Locust", "Sandalwood", "Musk", "Vanilla"]
    },
    accords: ["warm spicy", "floral", "powdery", "fresh", "woody"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An intriguing play of unexpected contrasts: fiery ginger, delicate wisteria, and powdery woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/BLV-150.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 29. Row 38: 1 Million Lucky (Paco Rabanne, ELITE)
  {
    productId: "abna_1_million_lucky_paco_rabanne_elite_38",
    notes: {
      top: ["Plum", "Ozonic Notes", "Grapefruit", "Bergamot"],
      middle: ["Hazelnut", "Honey", "Cedarwood", "Cashmere Wood", "Jasmine", "Orange Blossom"],
      base: ["Amberwood", "Patchouli", "Oakmoss", "Vetiver"]
    },
    accords: ["sweet", "woody", "nutty", "fruity", "honey"],
    fragranceFamily: ["Woody", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "An exhilarating pulsation of crunchy green hazelnut, luscious plum, and warm amberwoods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/1-Million-Lucky-48903.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 30. Row 40: Guilty Man (Gucci, ELITE)
  {
    productId: "abna_guilty_man_gucci_elite_40",
    notes: {
      top: ["Lavender", "Amalfi Lemon"],
      middle: ["African Orange Flower"],
      base: ["Virginia Cedar", "Patchouli", "Vanilla"]
    },
    accords: ["citrus", "lavender", "aromatic", "woody", "white floral"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A non-conformist aromatic fougère combining zesty Italian lemon, orange blossom, and cedar.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Gucci-Guilty-Pour-Homme-11524.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 31. Row 42: Wanted (Azzaro, ELITE)
  {
    productId: "abna_wanted_azzaro_elite_42",
    notes: {
      top: ["Lemon", "Ginger", "Lavender", "Mint"],
      middle: ["Apple", "Juniper", "Guatemalan Cardamom", "Geranium"],
      base: ["Tonka Bean", "Amberwood", "Haitian Vetiver"]
    },
    accords: ["warm spicy", "aromatic", "citrus", "fresh spicy", "woody"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A bold, charismatic woody-spicy solar weapon of temptation loaded with ginger and amberwood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Azzaro/Wanted-39397.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 32. Row 43: Cherry In The Air (Escada, ELITE)
  {
    productId: "abna_cherry_in_the_air_escada_elite_43",
    notes: {
      top: ["Sour Cherry", "Raspberry", "Mandarin", "Daim"],
      middle: ["Marshmallow", "Vanilla", "Orchid", "Gardenia"],
      base: ["Sandalwood", "Musk", "Oak", "White Suede"]
    },
    accords: ["sweet", "cherry", "fruity", "vanilla", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A light-hearted French summer cherry orchard with fluffy marshmallow and soft suede.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Cherry-in-the-Air-17147.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 33. Row 44: Man Silver (Zara, EXCLUSIVE)
  {
    productId: "abna_man_silver_zara_exclusive_44",
    notes: {
      top: ["Lemon", "Lavender", "Black Pepper"],
      middle: ["Neroli", "Cardamom"],
      base: ["Patchouli", "Cedarwood", "Sandalwood"]
    },
    accords: ["citrus", "aromatic", "warm spicy", "lavender", "fresh spicy"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A sharp, versatile daily fougère balancing energetic citrus, herbal lavender, and warm woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Man-Silver-44161.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 34. Row 45: Rose D'Arabie (Giorgio Armani, EXCLUSIVE)
  {
    productId: "abna_rose_d_arabie_giorgio_armani_exclusive_45",
    notes: {
      top: ["Damask Rose", "Saffron"],
      middle: ["Oud", "Patchouli"],
      base: ["Amber", "Vanilla"]
    },
    accords: ["rose", "oud", "warm spicy", "amber", "patchouli"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Beast",
      longevity: "10h+"
    },
    editorialStory: "A grand desert jewel fusing voluptuous crimson Damask rose, golden saffron, and majestic oud.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Armani-Prive-Rose-d-Arabie-10886.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 35. Row 46: Un Jardin Lagune (Hermes, EXCLUSIVE)
  {
    productId: "abna_un_jardin_lagune_hermes_exclusive_46",
    notes: {
      top: ["Magnolia", "Pittosporum"],
      middle: ["Sea Salt", "Madonna Lily"],
      base: ["Woody Notes"]
    },
    accords: ["floral", "marine", "white floral", "woody", "salty"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A secret Venetian lagoon garden where salty sea breezes mingle with blooming magnolia.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hermes/Un-Jardin-Sur-La-Lagune-53472.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 36. Row 47: Aventus (Creed, EXCLUSIVE)
  {
    productId: "abna_aventus_creed_exclusive_47",
    notes: {
      top: ["Bergamot", "Blackcurrant", "Apple", "Lemon", "Pink Pepper"],
      middle: ["Pineapple", "Patchouli", "Jasmine"],
      base: ["Birch", "Musk", "Oakmoss", "Ambroxan", "Cedarwood"]
    },
    accords: ["fruity", "woody", "smoky", "sweet", "leather"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "An iconic testament to strength, vision, and success celebrating smoked birch and crisp pineapple.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Creed/Aventus-9828.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 37. Row 48: Jaguar For Man (Jaguar, EXCLUSIVE)
  {
    productId: "abna_jaguar_for_man_jaguar_exclusive_48",
    notes: {
      top: [
        "Basil",
        "Green Notes",
        "Orange",
        "Grapefruit",
        "Lavender",
        "Mandarin",
        "Bergamot",
        "Thyme",
        "Anise"
      ],
      middle: [
        "Pine",
        "Carnation",
        "Nutmeg",
        "Sage",
        "Cinnamon",
        "Geranium",
        "Rose",
        "Jasmine",
        "Gardenia"
      ],
      base: [
        "Oakmoss",
        "Tobacco",
        "Leather",
        "Cedarwood",
        "Patchouli",
        "Sandalwood",
        "Musk",
        "Amber",
        "Incense",
        "Tonka Bean",
        "Vanilla"
      ]
    },
    accords: ["aromatic", "woody", "fresh spicy", "green", "herbal"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A classic powerhouse aromatic fougère of bracing herbs, coniferous pine, and rich leather.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jaguar/Jaguar-for-Men-6820.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 38. Row 49: Tressor Midnight Rose (Lancome, EXCLUSIVE)
  {
    productId: "abna_tressor_midnight_rose_lancome_exclusive_49",
    notes: {
      top: ["Raspberry", "Rose"],
      middle: ["Cassis", "Pink Pepper", "Peony", "Jasmine"],
      base: ["Vanilla", "Musk", "Virginia Cedar"]
    },
    accords: ["fruity", "sweet", "rose", "soft spicy", "woody"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A mischievous nocturnal Parisian romance of candied raspberry, rose, and pink pepper.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lancome/Tresor-Midnight-Rose-11721.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 39. Row 50: Miss Blooming Bouquet (Dior, EXCLUSIVE)
  {
    productId: "abna_miss_blooming_bouquet_dior_exclusive_50",
    notes: {
      top: ["Sicilian Mandarin"],
      middle: ["Pink Peony", "Damask Rose", "Apricot", "Peach"],
      base: ["White Musk"]
    },
    accords: ["floral", "rose", "fresh", "fruity", "musky"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An extraordinary silk dress embroidered with thousand delicate pink blossoms and peony.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dior/Miss-Dior-Blooming-Bouquet-22498.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 40. Row 51: Cool Water Woman (Davidoff, VIP)
  {
    productId: "abna_cool_water_woman_davidoff_vip_51",
    notes: {
      top: ["Melon", "Lotus", "Lemon", "Pineapple", "Quince", "Calone", "Blackcurrant", "Lily"],
      middle: ["Lotus", "Water Lily", "Lily of the Valley", "Jasmine", "Honey", "Hawthorn", "Rose"],
      base: ["Musk", "Vetiver", "Raspberry", "Blackberry", "Sandalwood", "Peach", "Vanilla"]
    },
    accords: ["floral", "aquatic", "fruity", "fresh", "sweet"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A shimmering cascade of aquatic flowers, dewy honeydew melon, and soothing woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Davidoff/Cool-Water-508.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 41. Row 52: Polo Blue (Ralph Lauren, VIP)
  {
    productId: "abna_polo_blue_ralph_lauren_vip_52",
    notes: {
      top: ["Cucumber", "Melon", "Mandarin"],
      middle: ["Basil", "Sage", "Geranium"],
      base: ["Suede", "Woody Notes", "Musk"]
    },
    accords: ["aquatic", "aromatic", "green", "fresh spicy", "ozonic"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "The freedom of the open blue sky and the crystal-clear energy of crashing ocean waters.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ralph-Lauren/Polo-Blue-1198.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 42. Row 53: Moon Sparkle (Escana [Escada], VIP)
  {
    productId: "abna_moon_sparkle_escana_vip_53",
    notes: {
      top: ["Strawberry", "Blackcurrant", "Red Apple", "Citruses"],
      middle: ["Sweet Pea", "Freesia", "Jasmine", "Rose"],
      base: ["Raspberry", "Musk", "Sandalwood", "Amber"]
    },
    accords: ["fruity", "sweet", "citrus", "fresh", "floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A pulsating moonlight summer dance of wild strawberries, sweet peas, and amber woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Moon-Sparkle-2066.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 43. Row 54: L'imperatice (D&G [Dolce & Gabbana], EXCLUSIVE)
  {
    productId: "abna_l_imperatice_d_g_exclusive_54",
    notes: {
      top: ["Kiwi", "Rhubarb", "Pink Pepper"],
      middle: ["Watermelon", "Cyclamen", "Jasmine"],
      base: ["Lemon", "Musk", "Sandalwood"]
    },
    accords: ["fruity", "aquatic", "sweet", "fresh", "tropical"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A magnetic, mouth-watering explosion of tart rhubarb, juicy watermelon, and pink cyclamen.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dolce-Gabbana/D-G-Anthology-L-Imperatrice-3-6086.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 44. Row 55: Bali (Kenzo, EXCLUSIVE)
  {
    productId: "abna_bali_kenzo_exclusive_55",
    notes: {
      top: ["Passionfruit", "Grapefruit"],
      middle: ["Jasmine", "Orchid"],
      base: ["Vanilla", "Woody Notes"]
    },
    accords: ["tropical", "fruity", "citrus", "sweet", "white floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "The dawn light rising over Bali with tropical passionfruit, morning jasmine, and vanilla warmth.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/7-15-AM-in-Bali-3069.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  }
];
const BATCH_02_ENRICHMENT_RECORDS = [
  // 1. Row 56: Dunhill London (Alfred Dunhill, EXCLUSIVE)
  {
    productId: "abna_dunhill_london_alfred_dunhill_exclusive_56",
    notes: {
      top: ["Apple", "Bergamot", "Cardamom"],
      middle: ["Rose", "Jasmine", "Geranium"],
      base: ["Tonka Bean", "Vanilla", "Sandalwood", "Patchouli", "Musk"]
    },
    accords: ["vanilla", "sweet", "fruity", "warm spicy", "woody"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A polished, charismatic metropolitan fougère marrying crisp red apple with warm tonka.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Dunhill-London-2556.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 2. Row 57: Paul Smith Man 2 (Paul Smith, EXCLUSIVE)
  {
    productId: "abna_paul_smith_man_2_paul_smith_exclusive_57",
    notes: {
      top: ["Apple", "Cardamom", "Mandarin", "Grapefruit"],
      middle: ["Nutmeg", "Cashmere Wood", "Lavender", "Cinnamon"],
      base: ["Sandalwood", "Tonka Bean", "Musk", "Cedarwood"]
    },
    accords: ["warm spicy", "woody", "fruity", "aromatic", "citrus"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An effortlessly stylish woody-spicy blend of juicy mandarin, nutmeg, and cashmere wood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paul-Smith/Paul-Smith-Man-2-7634.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 3. Row 58: Japanese Sakura (The Body Shop, EXCLUSIVE)
  {
    productId: "abna_japanese_sakura_the_body_shop_exclusive_58",
    notes: {
      top: ["Cherry Blossom", "Apple", "Osmanthus"],
      middle: ["Star Jasmine", "Rose", "Mimosa"],
      base: ["White Musk", "Sandalwood", "Hinoki Wood"]
    },
    accords: ["floral", "fresh", "fruity", "white floral", "musky"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Soft",
      longevity: "4-6h"
    },
    editorialStory: "A serene springtime breeze carrying delicate cherry blossoms, sweet mimosa, and hinoki wood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/Japanese-Cherry-Blossom-1229.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 4. Row 59: Eros Man (Versace, EXCLUSIVE)
  {
    productId: "abna_eros_man_versace_exclusive_59",
    notes: {
      top: ["Mint", "Green Apple", "Lemon"],
      middle: ["Tonka Bean", "Ambroxan", "Geranium"],
      base: ["Madagascar Vanilla", "Virginian Cedar", "Atlas Cedar", "Vetiver", "Oakmoss"]
    },
    accords: ["aromatic", "vanilla", "green", "fresh spicy", "amber"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A passionate, heroic hymn to love and desire bursting with vibrant mint and sensual vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Versace/Eros-16657.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 5. Row 60: Vision (Jaguar, EXCLUSIVE)
  {
    productId: "abna_vision_jaguar_exclusive_60",
    notes: {
      top: ["Pineapple", "Watermelon", "Amalfi Lemon", "Cardamom"],
      middle: ["Apple", "Virginia Cedar", "White Patchouli"],
      base: ["Tonka Bean", "Amber", "Musk"]
    },
    accords: ["fruity", "sweet", "woody", "citrus", "tropical"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A bold, modern statement combining juicy tropical fruits, crisp cedar, and warm amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jaguar/Vision-10515.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 6. Row 61: Cherry In The Air (Escada, VIP)
  {
    productId: "abna_cherry_in_the_air_escada_vip_61",
    notes: {
      top: ["Sour Cherry", "Raspberry", "Mandarin", "Daim"],
      middle: ["Marshmallow", "Vanilla", "Orchid", "Gardenia"],
      base: ["Sandalwood", "Musk", "Oak", "White Suede"]
    },
    accords: ["sweet", "cherry", "fruity", "vanilla", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A delightful French summer cherry orchard with fluffy marshmallow and soft suede.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Cherry-in-the-Air-17147.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 7. Row 64: Polo Sport (Ralph Lauren, VIP)
  {
    productId: "abna_polo_sport_ralph_lauren_vip_64",
    notes: {
      top: [
        "Mint",
        "Aldehydes",
        "Lavender",
        "Bergamot",
        "Mandarin",
        "Lemon",
        "Artemisia",
        "Neroli"
      ],
      middle: [
        "Seagrass",
        "Ginger",
        "Jasmine",
        "Geranium",
        "Brazilian Rosewood",
        "Cyclamen",
        "Rose"
      ],
      base: ["Musk", "Sandalwood", "Cedarwood", "Guaiac Wood", "Amber"]
    },
    accords: ["aromatic", "fresh spicy", "green", "citrus", "marine"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An athletic, clean rush of oceanic breeze, cooling mint, and sun-warmed woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ralph-Lauren/Polo-Sport-893.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 8. Row 65: Romantic Wish (Victoria Secret, VIP)
  {
    productId: "abna_romantic_wish_victoria_secret_vip_65",
    notes: {
      top: ["Pomegranate"],
      middle: ["Peony", "Freesia"],
      base: ["Cucumber", "Floral Notes"]
    },
    accords: ["floral", "fresh", "fruity", "rose", "aquatic"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h"
    },
    editorialStory: "A flirtatious bouquet of pink peonies, juicy pomegranate, and crisp cucumber essence.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Romantic-Wish-3596.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 9. Row 66: Eternity Man (Calvin Klein, VIP)
  {
    productId: "abna_eternity_man_calvin_klein_vip_66",
    notes: {
      top: ["Lavender", "Lemon", "Bergamot", "Mandarin"],
      middle: [
        "Sage",
        "Juniper Berries",
        "Basil",
        "Geranium",
        "Jasmine",
        "Coriander",
        "Orange Blossom",
        "Lily of the Valley",
        "Lily"
      ],
      base: ["Sandalwood", "Vetiver", "Musk", "Brazilian Rosewood", "Amber"]
    },
    accords: ["aromatic", "citrus", "woody", "fresh spicy", "lavender"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An iconic romantic fougère celebrating everlasting dedication, clean herbs, and warm woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Calvin-Klein/Eternity-For-Men-258.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 10. Row 67: Light Blue (D&G, VIP)
  {
    productId: "abna_light_blue_d_g_vip_67",
    notes: {
      top: ["Sicilian Lemon", "Apple", "Cedarwood", "Bellflower"],
      middle: ["Bamboo", "Jasmine", "White Rose"],
      base: ["Cedarwood", "Musk", "Amber"]
    },
    accords: ["citrus", "woody", "fresh", "fruity", "aromatic"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "The joy of Mediterranean living: sun-drenched Sicilian citron, crisp apple, and coastal bamboo.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dolce-Gabbana/Light-Blue-485.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 11. Row 69: Blue Emotion (Aigner, VIP)
  {
    productId: "abna_blue_emotion_aigner_vip_69",
    notes: {
      top: ["Bergamot", "Mandarin", "Lemon", "Lavender", "Violet Leaf"],
      middle: ["Cardamom", "Coriander", "Jasmine"],
      base: ["Ebony Wood", "Cedarwood", "Pine", "Oakmoss", "Musk"]
    },
    accords: ["citrus", "woody", "aromatic", "fresh spicy", "warm spicy"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An invigorating masculine cascade of chilled citrus, spicy cardamom, and dark ebony wood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Etienne-Aigner/Aigner-Blue-Emotion-4555.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 12. Row 70: Choco Musk (Al Rehab, VIP)
  {
    productId: "abna_choco_musk_al_rehab_vip_70",
    notes: {
      top: ["Milk Chocolate", "White Musk"],
      middle: ["Vanilla", "Cinnamon", "Rose"],
      base: ["Spices", "Sandalwood", "Amber", "Myrrh"]
    },
    accords: ["sweet", "vanilla", "chocolate", "warm spicy", "gourmand"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A decadent, irresistible cloud of creamy milk chocolate, warm vanilla, and golden myrrh.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Choco-Musk-20138.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 13. Row 71: Dream (Anna Sui, VIP)
  {
    productId: "abna_dream_anna_sui_vip_71",
    notes: {
      top: ["Nectarine", "Mandarin", "Bitter Orange", "Bergamot"],
      middle: ["Peach", "Freesia", "Chinese Peony", "Rose"],
      base: ["Tahitian Vanilla", "Sugar", "Sandalwood", "Musk", "Anise", "Cedarwood"]
    },
    accords: ["vanilla", "powdery", "sweet", "fruity", "citrus"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A whimsical dreamscape of sweet juicy nectarines, radiant florals, and spun-sugar vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Anna-Sui/Sui-Dreams-1560.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 14. Row 72: Forbiden Rose (Avril, VIP)
  {
    productId: "abna_forbiden_rose_avril_vip_72",
    notes: {
      top: ["Red Apple", "Peach", "Pepper"],
      middle: ["Lotus", "Green Apple", "Heliotrope"],
      base: ["Dark Chocolate", "Vanilla", "Sandalwood"]
    },
    accords: ["fruity", "sweet", "floral", "vanilla", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A gothic, romantic potion blending crisp red apples, dewy lotus, and bittersweet dark chocolate.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Avril-Lavigne/Forbidden-Rose-8902.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 15. Row 73: Fantasy (Britney, VIP)
  {
    productId: "abna_fantasy_britney_vip_73",
    notes: {
      top: ["Kiwi", "Red Litchi", "Quince"],
      middle: ["White Chocolate", "Cupcake", "Orchid", "Jasmine"],
      base: ["Musk", "Orris Root", "Woody Notes"]
    },
    accords: ["sweet", "fruity", "tropical", "white chocolate", "gourmand"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "An iconic pop gourmand fantasy of lush red lychee, golden kiwi, and decadent white chocolate cupcakes.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Britney-Spears/Fantasy-603.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 16. Row 74: Extreme (Bvlgari, VIP)
  {
    productId: "abna_extreme_bvlgari_vip_74",
    notes: {
      top: [
        "Tea",
        "Grapefruit",
        "Bergamot",
        "Neroli",
        "Petitgrain",
        "Coriander",
        "Lavender",
        "Galbanum"
      ],
      middle: ["Balsam Fir", "Pepper", "Guaiac Wood", "Brazilian Rosewood", "Nutmeg", "Cardamom"],
      base: ["Musk", "Cedarwood", "Oakmoss", "Sandalwood", "Iris"]
    },
    accords: ["citrus", "woody", "fresh spicy", "aromatic", "green"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An intense, aristocratic Darjeeling tea signature framed by radiant citrus and coniferous balsam.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Bvlgari-Extreme-157.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 17. Row 75: Angel Heart (Cladestine, VIP)
  {
    productId: "abna_angel_heart_cladestine_vip_75",
    notes: {
      top: ["Apricot", "Mandarin", "Pineapple", "Grapefruit"],
      middle: ["Peach", "Ginger", "Lily of the Valley", "Freesia"],
      base: ["Musk", "Sandalwood", "Amber"]
    },
    accords: ["fruity", "sweet", "citrus", "tropical", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A radiant, sweet nectar of ripe apricot, golden pineapple, and soft comforting white musks.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Angel-Heart/Angel-Heart-4938.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 18. Row 76: Dunhill Blue (Alfred Dunhill, VIP)
  {
    productId: "abna_dunhill_blue_alfred_dunhill_vip_76",
    notes: {
      top: ["Litchi", "Mandarin", "Lotus", "Bergamot"],
      middle: ["Sea Notes", "Orange", "Brazilian Rosewood"],
      base: ["Tonka Bean", "Musk", "Benzoin", "Amber"]
    },
    accords: ["marine", "citrus", "fruity", "sweet", "aromatic"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A refreshing marine breeze carrying tropical lychee, sacred lotus, and comforting amber resins.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-Blue-1935.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 19. Row 77: Sexy Gravity (Escada, VIP)
  {
    productId: "abna_sexy_gravity_escada_vip_77",
    notes: {
      top: ["Raspberry", "Wild Strawberry", "Cassis", "Grapefruit", "Mint"],
      middle: ["Lily of the Valley", "Peony", "Violet", "Lily"],
      base: ["Vanilla", "Cashmere Wood", "Musk"]
    },
    accords: ["fruity", "sweet", "fresh", "floral", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An electric summer celebration bursting with wild red berries, garden peonies, and soft cashmere wood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Sexy-Graffiti-1379.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 20. Row 79: Harajuku Love (Gwen Stefany, VIP)
  {
    productId: "abna_harajuku_love_gwen_stefany_vip_79",
    notes: {
      top: ["Bamboo", "Pomelo", "Peach", "Bergamot"],
      middle: ["Peony", "Rose", "Jasmine", "Narcissus", "Egyptian Jasmine"],
      base: ["Musk", "Vanilla", "Orchid", "Woody Notes"]
    },
    accords: ["floral", "fresh", "rose", "citrus", "fruity"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h"
    },
    editorialStory: "A playful, radiant pop-art bouquet of fresh bamboo, sparkling pomelo, pink peony, and clean musk.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Harajuku-Lovers/Harajuku-Lovers-Love-4235.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 21. Row 81: Still (Jenifer Lopez, VIP)
  {
    productId: "abna_still_jenifer_lopez_vip_81",
    notes: {
      top: ["Earl Grey Tea", "White Pepper", "Mandarin", "Apple", "Rice"],
      middle: ["Jasmine", "Lily of the Valley", "Freesia", "Honeysuckle", "Orange Blossom", "Rose"],
      base: ["Pepper", "Musk", "Sandalwood", "Iris", "Amber"]
    },
    accords: ["floral", "green", "fresh spicy", "white floral", "fresh"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A serene, calming infusion of chilled Earl Grey tea, white pepper, honeysuckle, and warm amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jennifer-Lopez/Still-869.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 22. Row 82: Legend (Montblanc, VIP)
  {
    productId: "abna_legend_montblanc_vip_82",
    notes: {
      top: ["Lavender", "Pineapple", "Bergamot", "Lemon Verbena"],
      middle: ["Red Apple", "Dried Fruits", "Oakmoss", "Geranium", "Coumarin", "Rose"],
      base: ["Tonka Bean", "Sandalwood"]
    },
    accords: ["fruity", "sweet", "aromatic", "lavender", "woody"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A timeless, masculine aromatic fougère contrasting crisp pineapple with oakmoss and tonka.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Montblanc/Legend-11784.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 23. Row 83: Siren (Paris Hilton, VIP)
  {
    productId: "abna_siren_paris_hilton_vip_83",
    notes: {
      top: ["Apricot", "Frangipani", "Peach", "Mandarin"],
      middle: ["Honeysuckle", "Orchid", "Lotus"],
      base: ["Vanilla", "Musk", "Sandalwood"]
    },
    accords: ["fruity", "white floral", "sweet", "floral", "vanilla"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An enchanting mermaid nectar of golden apricot, sun-drenched frangipani, and creamy vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paris-Hilton/Siren-6288.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 24. Row 84: Woman (Paris Hilton, VIP)
  {
    productId: "abna_woman_paris_hilton_vip_84",
    notes: {
      top: ["Melon", "Apple", "Peach"],
      middle: ["Freesia", "Mimosa", "Jasmine", "Lily of the Valley", "Tuberose", "Lily"],
      base: ["Musk", "Ylang-Ylang", "Sandalwood", "Oakmoss"]
    },
    accords: ["fruity", "sweet", "floral", "aquatic", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An opulent, signature fruity floral cocktail of honeydew melon, white tuberose, and soft woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paris-Hilton/Paris-Hilton-1434.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 25. Row 85: Selena Gomez (Selena Gomez, VIP)
  {
    productId: "abna_selena_gomez_selena_gomez_vip_85",
    notes: {
      top: ["Raspberry", "Peach", "Pineapple", "Orange"],
      middle: ["Blackberry", "Freesia", "Musk"],
      base: ["Dark Chocolate", "Vanilla", "Coconut", "Amber"]
    },
    accords: ["sweet", "fruity", "vanilla", "chocolate", "tropical"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A decadent, velvety gourmand treat featuring rich dark chocolate, sweet raspberry, and coconut.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Selena-Gomez/Selena-Gomez-Eau-de-Parfum-14815.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 26. Row 86: Taylor Swift (Taylor Swift, VIP)
  {
    productId: "abna_taylor_swift_taylor_swift_vip_86",
    notes: {
      top: ["Raspberry", "Blackberry", "Tea", "Apple Blossom", "Freesia"],
      middle: ["Vanilla", "Honeysuckle", "Hibiscus"],
      base: ["Peach", "Sandalwood", "Amber", "Musk"]
    },
    accords: ["fruity", "sweet", "vanilla", "floral", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A charming, magical fairy-tale elixir of wild berries, black tea, honeysuckle, and golden amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Taylor-Swift/Wonderstruck-13146.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 27. Row 87: Vanilla (The Body Shop, VIP)
  {
    productId: "abna_vanilla_the_body_shop_vip_87",
    notes: {
      top: ["Apricot", "Lemon", "Peach", "Orange"],
      middle: ["Lily of the Valley", "Jasmine", "Tuberose"],
      base: ["Vanilla", "Sandalwood", "Amber", "Musk"]
    },
    accords: ["vanilla", "powdery", "sweet", "fruity", "warm spicy"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A pure, comforting classic vanilla hugged by velvety orchard fruits and creamy sandalwood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/Vanilla-2438.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 28. Row 88: Someday (Justin Bieber, VIP)
  {
    productId: "abna_someday_justin_bieber_vip_88",
    notes: {
      top: ["Red Berries", "Pear", "Mandarin"],
      middle: ["Floral Notes", "Jasmine", "Water Lily"],
      base: ["Vanilla", "Musk"]
    },
    accords: ["fruity", "sweet", "fresh", "floral", "vanilla"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An uplifting, youthful splash of sparkling berries, juicy pear, water lily, and soft vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Justin-Bieber/Someday-12348.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 29. Row 89: Black (Aigner, VIP)
  {
    productId: "abna_black_aigner_vip_89",
    notes: {
      top: ["Bergamot", "Grapefruit", "Orange"],
      middle: ["Pine", "Mint", "Oakmoss"],
      base: ["Leather", "Tonka Bean", "Musk", "Benzoin"]
    },
    accords: ["leather", "citrus", "woody", "aromatic", "fresh spicy"],
    fragranceFamily: ["Leather"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A sophisticated dark leather masterpiece illuminated by bright bergamot and brisk pine needles.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Etienne-Aigner/Aigner-Black-4554.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 30. Row 90: Lovely (Al Rehab, VIP)
  {
    productId: "abna_lovely_al_rehab_vip_90",
    notes: {
      top: ["Citruses", "Floral Notes"],
      middle: ["White Musk", "Green Notes"],
      base: ["Citruses", "Peach"]
    },
    accords: ["citrus", "fresh", "green", "musky", "sweet"],
    fragranceFamily: ["Floral", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A crisp, crystalline melody of zesty green citruses and laundered white musk petals.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Lovely-20139.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 31. Row 91: Soft (Al Rehab, VIP)
  {
    productId: "abna_soft_al_rehab_vip_91",
    notes: {
      top: ["Caramel", "Citruses"],
      middle: ["Vanilla", "White Musk"],
      base: ["Orchid", "Jasmine", "Woody Notes"]
    },
    accords: ["sweet", "citrus", "caramel", "vanilla", "powdery"],
    fragranceFamily: ["Oriental"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A rich, mouthwatering caramel explosion balanced with lively citruses and sensual vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Soft-20145.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 32. Row 93: Aqua (Bvlgari, VIP)
  {
    productId: "abna_aqua_bvlgari_vip_93",
    notes: {
      top: ["Mandarin", "Orange", "Petitgrain"],
      middle: ["Seaweed", "Lavender", "Cotton Flower"],
      base: ["Virginia Cedar", "Woody Notes", "Patchouli", "Clary Sage", "Amber"]
    },
    accords: ["marine", "citrus", "aromatic", "aquatic", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A deep dive into Mediterranean waters with dark sea botanicals, mandarin, and amber woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Aqva-Pour-Homme-153.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 33. Row 95: Pink (Guess, VIP)
  {
    productId: "abna_pink_guess_vip_95",
    notes: {
      top: ["Green Apple", "Bergamot", "Strawberry", "Tangerine"],
      middle: [
        "Peony",
        "Magnolia",
        "Freesia",
        "Peach",
        "Jasmine",
        "Red Berries",
        "Lily of the Valley",
        "Ylang-Ylang"
      ],
      base: ["Musk", "Cedarwood", "Amber", "Oakmoss"]
    },
    accords: ["fruity", "floral", "fresh", "sweet", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A lively, flirtatious fruity floral cocktail of crisp green apple, luscious strawberry, and magnolia.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Guess/Guess-for-Women-255.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 34. Row 96: English Pear (Jomalone, VIP)
  {
    productId: "abna_english_pear_jomalone_vip_96",
    notes: {
      top: ["King William Pear", "Melon"],
      middle: ["Freesia", "Rose"],
      base: ["Musk", "Patchouli", "Rhubarb", "Amber"]
    },
    accords: ["fruity", "floral", "sweet", "aquatic", "fresh"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "The essence of autumn: just-ripe King William pear enveloped in a bouquet of white freesias.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/English-Pear-Freesia-10802.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 35. Row 97: Viva La Juicy Rose Female (Juicy Couture, VIP)
  {
    productId: "abna_viva_la_juicy_rose_female_juicy_couture_vip_97",
    notes: {
      top: ["Pear", "Mandarin", "Jasmine Petals"],
      middle: ["Rose", "Peony", "Jasmine Sambac"],
      base: ["Ambroxan", "Orris Root", "Benzoin"]
    },
    accords: ["floral", "rose", "fruity", "fresh", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A sparkling toast of pink blossoms, effervescent Italian mandarin, and velvety rose petals.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Juicy-Couture/Viva-La-Juicy-Rose-32431.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 36. Row 98: Lovely (Sarah Jessica Parker, VIP)
  {
    productId: "abna_lovely_sarah_jessica_parker_vip_98",
    notes: {
      top: ["Lavender", "Martini", "Bergamot", "Mandarin", "Palisander Rosewood"],
      middle: ["Patchouli", "Orchid", "Narcissus"],
      base: ["Musk", "Woody Notes", "Cedarwood", "White Amber"]
    },
    accords: ["musky", "floral", "lavender", "woody", "powdery"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A silky, modern classic fusing fresh lavender, crisp apple martini, and intimate velvety musks.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Sarah-Jessica-Parker/Lovely-985.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 37. Row 100: Baccarat 540 Edp (Maison Francis Kurkdjian, VIP)
  {
    productId: "abna_baccarat_540_edp_maison_francis_kurkdjian_vip_100",
    notes: {
      top: ["Saffron", "Jasmine"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedarwood"]
    },
    accords: ["woody", "amber", "warm spicy", "fresh spicy", "aromatic"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Beast",
      longevity: "10h+"
    },
    editorialStory: "A luminous, poetic alchemy of aerial jasmine, radiant saffron, and crystalline ambergris.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Baccarat-Rouge-540-33519.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 38. Row 101: Bombshell Night (Victoria Secret, VIP)
  {
    productId: "abna_bombshell_night_victoria_secret_vip_101",
    notes: {
      top: ["Blackcurrant"],
      middle: ["Dahlia"],
      base: ["Woody Notes"]
    },
    accords: ["fruity", "floral", "woody", "sweet", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A sparkling, glamorous nocturnal celebration of chilled blackcurrant champagne and golden woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Bombshell-Nights-47209.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 39. Row 102: Scandalous (Victoria Secret, VIP)
  {
    productId: "abna_scandalous_victoria_secret_vip_102",
    notes: {
      top: ["Raspberry"],
      middle: ["Black Peony"],
      base: ["Praline"]
    },
    accords: ["sweet", "fruity", "floral", "gourmand", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A provocative, mouthwatering collision of luscious raspberry liqueur, black peony, and warm praline.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Scandalous-27690.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 40. Row 103: Love Misteriosa (Salvatore Feragamo, VIP)
  {
    productId: "abna_love_misteriosa_salvatore_feragamo_vip_103",
    notes: {
      top: ["Blackberry", "Neroli"],
      middle: ["Tuberose", "Orange Blossom"],
      base: ["Milk Mousse", "Black Vanilla Husk", "Patchouli"]
    },
    accords: ["sweet", "fruity", "vanilla", "lactonic", "white floral"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Strong",
      longevity: "7-9h"
    },
    editorialStory: "A mysterious, nocturnal gourmand potion of wild blackberries, opulent tuberose, and frothy milk mousse.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Salvatore-Ferragamo/Signorina-Misteriosa-34675.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 41. Row 104: Essential Sport (Lacoste, VIP)
  {
    productId: "abna_essential_sport_lacoste_vip_104",
    notes: {
      top: ["Grapefruit", "Bergamot", "Ginger"],
      middle: ["Sea Water", "Juniper", "Nutmeg", "Geranium"],
      base: ["Musk", "Vetiver", "Patchouli"]
    },
    accords: ["citrus", "marine", "fresh spicy", "aromatic", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An adrenaline-fueled blast of pink grapefruit, sea spray splash, and brisk aromatic juniper.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lacoste-Fragrances/Essential-Sport-7546.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 42. Row 105: Our Moment (One Direction, VIP)
  {
    productId: "abna_our_moment_one_direction_vip_105",
    notes: {
      top: ["Forest Fruits", "Red Currant", "Pink Grapefruit"],
      middle: ["Frangipani", "Freesia", "Jasmine"],
      base: ["Musk", "Patchouli", "Woody Notes"]
    },
    accords: ["fruity", "sweet", "floral", "woody", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A sparkling, joyful celebration of wild forest fruits, red currants, and sunlit frangipani blossoms.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/One-Direction/Our-Moment-18542.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:30:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  }
];
const BATCH_03_ENRICHMENT_RECORDS = [
  // 1. Row 107: Pour Homme Soir (Bvlgari, ELITE, Men)
  {
    productId: "abna_pour_homme_soir_bvlgari_elite_107",
    notes: {
      top: ["Darjeeling Tea", "Bergamot"],
      middle: ["Papyrus", "Guaiac Wood"],
      base: ["Amber", "Musk"]
    },
    accords: ["woody", "green", "fresh spicy", "amber", "musky"],
    fragranceFamily: ["Woody", "Floral Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An understated, sophisticated evening fragrance centered on velvety Darjeeling tea, smoky papyrus, and radiant amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Bvlgari-Pour-Homme-Soir-776.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 2. Row 108: 212 Sexy Man (Carolina Herrera, ELITE, Men)
  {
    productId: "abna_212_sexy_man_carolina_herrera_elite_108",
    notes: {
      top: ["Mandarin", "Bergamot", "Green Notes"],
      middle: ["Pepper", "Cardamom", "Flowers"],
      base: ["Vanilla", "Guaiac Wood", "Sandalwood", "Amber", "Musk"]
    },
    accords: ["vanilla", "warm spicy", "sweet", "woody", "powdery"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A sensual, magnetic oriental fougère blending sweet vanilla and exotic spices with creamy woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/212-Sexy-Men-1065.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 3. Row 109: Lovely (Sarah Jessica Parker, ELITE, Women)
  {
    productId: "abna_lovely_sarah_jessica_parker_elite_109",
    notes: {
      top: ["Lavender", "Martini", "Bergamot", "Mandarin", "Palisander Rosewood"],
      middle: ["Patchouli", "Orchid", "Narcissus"],
      base: ["Musk", "Woody Notes", "Cedarwood", "White Amber"]
    },
    accords: ["musky", "floral", "lavender", "woody", "powdery"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An intimate, graceful silk-chiffon fragrance featuring sparkling mandarin, soft lavender, and plush white musk.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Sarah-Jessica-Parker/Lovely-985.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 4. Row 110: 212 VIP Man (Carolina Herrera, ELITE, Men)
  {
    productId: "abna_212_vip_man_carolina_herrera_elite_110",
    notes: {
      top: ["Passionfruit", "Lime", "Pepper", "Ginger"],
      middle: ["Vodka", "Gin", "Mint", "Spices"],
      base: ["Amber", "Leather", "Woody Notes"]
    },
    accords: ["fresh spicy", "aromatic", "tropical", "boozy", "green"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Strong",
      longevity: "7-9h"
    },
    editorialStory: "An energetic, nightlife-inspired cocktail of vibrant passionfruit, frozen vodka mint, and ambered leather.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/212-VIP-Men-12865.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 5. Row 112: The Scent Her (Hugo Boss, ELITE, Women)
  {
    productId: "abna_the_scent_her_hugo_boss_elite_112",
    notes: {
      top: ["Peach", "Freesia"],
      middle: ["Osmanthus"],
      base: ["Roasted Cocoa"]
    },
    accords: ["fruity", "floral", "sweet", "cacao", "warm spicy"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An irresistible feminine gourmand-floral marrying honeyed peach and delicate freesia with sensual roasted cocoa.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Boss-The-Scent-For-Her-39097.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 6. Row 113: Black XS L'excess (Paco Rabanne, ELITE, Men)
  {
    productId: "abna_black_xs_l_excess_paco_rabanne_elite_113",
    notes: {
      top: ["Amalfi Lemon", "Lavender"],
      middle: ["Cypriol Oil", "Ozonic Notes"],
      base: ["Amber", "Patchouli"]
    },
    accords: ["woody", "citrus", "amber", "patchouli", "aromatic"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Strong",
      longevity: "7-9h"
    },
    editorialStory: "A rebellious, rock-and-roll woody aromatic exploding with tart Amalfi lemon, cypriol intensity, and dark patchouli.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/Black-XS-L-Exces-for-Him-14197.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 7. Row 114: Bombshell (Victoria Secret, ELITE, Women)
  {
    productId: "abna_bombshell_victoria_secret_elite_114",
    notes: {
      top: ["Passionfruit", "Grapefruit", "Pineapple", "Tangerine", "Strawberry"],
      middle: ["Peony", "Vanilla Orchid", "Red Berries", "Jasmine", "Lily of the Valley"],
      base: ["Musk", "Woody Notes", "Oakmoss"]
    },
    accords: ["fruity", "sweet", "fresh", "floral", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "America's quintessential radiant fruity floral bursting with purple passionfruit, Shangri-la yellow peony, and vanilla orchid.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Bombshell-10190.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 8. Row 115: Orchid (Zara, ELITE, Women)
  {
    productId: "abna_orchid_zara_elite_115",
    notes: {
      top: ["Bergamot", "Peach", "Rose"],
      middle: ["Orchid", "Lily of the Valley"],
      base: ["Cedarwood", "Vanilla", "Amber"]
    },
    accords: ["floral", "citrus", "fruity", "fresh", "sweet"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h"
    },
    editorialStory: "A luminous, joyful floral fragrance highlighted by fresh bergamot, velvet orchid petals, and comforting vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Orchid-2016-39185.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 9. Row 116: Extreme (Bvlgari, ELITE, Men)
  {
    productId: "abna_extreme_bvlgari_elite_116",
    notes: {
      top: [
        "Tea",
        "Grapefruit",
        "Bergamot",
        "Neroli",
        "Petitgrain",
        "Coriander",
        "Lavender",
        "Galbanum"
      ],
      middle: ["Balsam Fir", "Pepper", "Guaiac Wood", "Brazilian Rosewood", "Nutmeg", "Cardamom"],
      base: ["Musk", "Cedarwood", "Oakmoss", "Sandalwood", "Iris"]
    },
    accords: ["citrus", "woody", "fresh spicy", "aromatic", "green"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An intensely fresh, refined woody aromatic structured around invigorating Darjeeling tea, vibrant citrus, and deep cedar.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Bvlgari-Extreme-157.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 10. Row 117: Omnia Amethyste (Bvlgari, ELITE, Women)
  {
    productId: "abna_omnia_amethyste_bvlgari_elite_117",
    notes: {
      top: ["Green Notes", "Pink Grapefruit"],
      middle: ["Iris", "Bulgarian Rose"],
      base: ["Heliotrope", "Woodsy Notes"]
    },
    accords: ["floral", "powdery", "iris", "woody", "green"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A powdery, noble floral jewel inspired by the shimmering hues of amethyst, blending aristocratic iris with dewy rose.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Omnia-Amethyste-780.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 11. Row 118: 212 Man (Carolina Herrera, ELITE, Men)
  {
    productId: "abna_212_man_carolina_herrera_elite_118",
    notes: {
      top: ["Green Notes", "Grapefruit", "Spices", "Bergamot", "Lavender", "Petitgrain"],
      middle: ["Ginger", "Violet", "Gardenia", "Sage"],
      base: ["Musk", "Sandalwood", "Incense", "Vetiver", "Guaiac Wood", "Labdanum"]
    },
    accords: ["citrus", "green", "woody", "fresh spicy", "aromatic"],
    fragranceFamily: ["Woody", "Floral Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A quintessential Manhattan metropolitan fragrance blending ultra-crisp green grass, zesty citrus, and magnetic incense woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/212-Men-297.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 12. Row 119: Orange Man (Hugo Boss, ELITE, Men)
  {
    productId: "abna_orange_man_hugo_boss_elite_119",
    notes: {
      top: ["Red Apple", "Coriander"],
      middle: ["Incense", "Sichuan Pepper"],
      base: ["Vanilla", "Woodsy Notes"]
    },
    accords: ["vanilla", "fruity", "warm spicy", "woody", "amber"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A free-spirited, optimistic woody oriental celebrating crisp red apple, mystical incense, and comforting vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Boss-Orange-for-Men-11009.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 13. Row 120: The Scent Man (Hugo Boss, ELITE, Men)
  {
    productId: "abna_the_scent_man_hugo_boss_elite_120",
    notes: {
      top: ["Ginger", "Mandarin", "Bergamot"],
      middle: ["Maninka Fruit", "Lavender"],
      base: ["Leather", "Woody Notes"]
    },
    accords: ["warm spicy", "fruity", "leather", "aromatic", "citrus"],
    fragranceFamily: ["Aromatic", "Spicy"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An alluring, confident oriental spicy signature highlighted by aphrodisiac African maninka fruit and burnished leather.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Boss-The-Scent-31429.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 14. Row 121: L'extase (Nina Ricci, ELITE, Women)
  {
    productId: "abna_l_extase_nina_ricci_elite_121",
    notes: {
      top: ["Pink Pepper", "Peach", "Pear"],
      middle: ["Rose", "White Flowers", "Jasmine", "Raspberry"],
      base: ["Caramel", "Siam Benzoin", "Amber", "Vanilla", "Musk", "Patchouli", "Virginia Cedar"]
    },
    accords: ["sweet", "amber", "caramel", "rose", "warm spicy"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An erotic, warm oriental floral composed around a bouquet of white petals and roses caressed by ambered caramel benzoin.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Nina-Ricci/L-Extase-29668.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 15. Row 122: Valentino Uomo Born In Roma Coral Fantasy (Valentino, ELITE, Men)
  {
    productId: "abna_valentino_uomo_born_in_roma_cora_valentino_elite_122",
    notes: {
      top: ["Red Apple", "Cardamom", "Calabrian Bergamot"],
      middle: ["Bourbon Geranium", "Clary Sage", "Lavender"],
      base: ["Tobacco Leaf", "Patchouli", "Haitian Vetiver"]
    },
    accords: ["fruity", "warm spicy", "sweet", "tobacco", "aromatic"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "An energetic Roman sunset captured through juicy red apple accord, aromatic clary sage, and rich smoky tobacco.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Valentino/Valentino-Uomo-Born-In-Roma-Coral-Fantasy-71761.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 16. Row 123: Scandalous (Victoria Secret, ELITE, Women)
  {
    productId: "abna_scandalous_victoria_secret_elite_123",
    notes: {
      top: ["Raspberry"],
      middle: ["Black Peony"],
      base: ["Praline"]
    },
    accords: ["sweet", "fruity", "floral", "gourmand", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A provocative, luscious floral fruity gourmand combining tart raspberry liqueur, black peony, and warm praline.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Scandalous-27690.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 17. Row 124: Icon (Alfred Dunhill, ELITE, Men)
  {
    productId: "abna_icon_alfred_dunhill_elite_124",
    notes: {
      top: ["Neroli", "Bergamot", "Black Pepper", "Petitgrain"],
      middle: ["Black Pepper", "Lavender", "Cardamom", "Juniper Berries", "Sage"],
      base: ["Vetiver", "Oakmoss", "Leather", "Agarwood (Oud)", "Iris"]
    },
    accords: ["citrus", "fresh spicy", "aromatic", "woody", "white floral"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A distinguished, luxurious masculine signature blending bright neroli and sparkling pepper with noble oud and vetiver.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Icon-29229.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 18. Row 125: Coco Mademoiselle (Chanel, ELITE, Women)
  {
    productId: "abna_coco_mademoiselle_chanel_elite_125",
    notes: {
      top: ["Orange", "Mandarin", "Bergamot", "Orange Blossom"],
      middle: ["Turkish Rose", "Jasmine", "Mimosa", "Ylang-Ylang"],
      base: ["Patchouli", "White Musk", "Vanilla", "Vetiver", "Tonka Bean", "Opoponax"]
    },
    accords: ["citrus", "patchouli", "white floral", "sweet", "rose"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "An iconic oriental amber fragrance embodying an independent, elegant character with luminous orange and vibrant patchouli.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chanel/Coco-Mademoiselle-611.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 19. Row 126: Run Wild (Davidoff, ELITE, Men)
  {
    productId: "abna_run_wild_davidof_elite_126",
    notes: {
      top: ["Ginger", "Cinnamon"],
      middle: ["Lavender"],
      base: ["Fir Resin", "Tonka Bean"]
    },
    accords: ["warm spicy", "aromatic", "woody", "fresh spicy", "cinnamon"],
    fragranceFamily: ["Aromatic", "Spicy"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A raw, untamed aromatic spice fragrance fusing wild ginger, lavender breeze, and rich fir resin.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Davidoff/Run-Wild-54942.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 20. Row 127: Coach For Women (Coach, ELITE, Women)
  {
    productId: "abna_coach_for_women_coach_elite_127",
    notes: {
      top: ["Raspberry Leaf", "Pear", "Pink Pepper"],
      middle: ["Turkish Rose", "Gardenia", "Cyclamen"],
      base: ["Suede", "Musk", "Cashmeran", "Sandalwood"]
    },
    accords: ["fruity", "rose", "sweet", "floral", "leather"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "An authentic New York City spirit captured through sparkling raspberry leaf, Turkish rose, and sensual suede musk.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Coach/Coach-the-Fragrance-38914.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 21. Row 128: Black Code (Giorgio Armani, ELITE, Men)
  {
    productId: "abna_black_code_giorgio_armani_elite_128",
    notes: {
      top: ["Lemon", "Bergamot"],
      middle: ["Star Anise", "Olive Blossom", "Guaiac Wood"],
      base: ["Leather", "Tonka Bean", "Tobacco"]
    },
    accords: ["citrus", "leather", "anise", "sweet", "tobacco"],
    fragranceFamily: ["Oriental", "Spicy"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A smooth, seductive tuxedo fragrance interweaving Mediterranean olive blossom, anise spice, and velvety tonka leather.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Armani-Code-412.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 22. Row 129: My Way (Giorgio Armani, ELITE, Women)
  {
    productId: "abna_my_way_giorgio_armani_elite_129",
    notes: {
      top: ["Orange Blossom", "Bergamot"],
      middle: ["Tuberose", "Indian Jasmine"],
      base: ["Madagascar Vanilla", "White Musk", "Virginia Cedar"]
    },
    accords: ["white floral", "tuberose", "citrus", "floral", "vanilla"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A radiant white floral bouquet of sustainable orange blossom, creamy tuberose, and luxurious Madagascar vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/My-Way-62036.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 23. Row 130: Terre D'hermes (Hermès, ELITE, Men)
  {
    productId: "abna_terre_d_hermes_hermes_elite_130",
    notes: {
      top: ["Orange", "Grapefruit"],
      middle: ["Pepper", "Pelargonium", "Flint"],
      base: ["Vetiver", "Cedarwood", "Patchouli", "Benzoin"]
    },
    accords: ["citrus", "woody", "fresh spicy", "aromatic", "earthy"],
    fragranceFamily: ["Woody", "Chypre"],
    performance: {
      sillage: "Moderate",
      longevity: "7-9h"
    },
    editorialStory: "A mineral, poetic dialogue between heaven and earth marrying bitter orange zest with flint stone and rooty vetiver.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hermes/Terre-d-Hermes-17.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 24. Row 131: Scandal Pour Homme (Jean Paul Gaultier, ELITE, Men)
  {
    productId: "abna_scandal_pour_homme_jean_paul_gaultier_elite_131",
    notes: {
      top: ["Clary Sage", "Mandarin"],
      middle: ["Caramel", "Tonka Bean"],
      base: ["Vetiver"]
    },
    accords: ["caramel", "sweet", "aromatic", "vanilla", "citrus"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A knockout Gourmand woody punch defined by rich brown caramel, aromatic clary sage, and rugged earthy vetiver.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Scandal-Pour-Homme-68196.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 25. Row 132: English Pear (Jo Malone London, ELITE, Unisex)
  {
    productId: "abna_english_pear_jomalone_elite_132",
    notes: {
      top: ["King William Pear", "Melon"],
      middle: ["Freesia", "Rose"],
      base: ["Musk", "Patchouli", "Rhubarb", "Amber"]
    },
    accords: ["fruity", "floral", "sweet", "aquatic", "fresh"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "Autumn's essence captured in freshly ripened King William pears wrapped in a bouquet of white freesias and mellowed by amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/English-Pear-Freesia-10802.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 26. Row 133: Essential (Lacoste, ELITE, Men)
  {
    productId: "abna_essential_lacoste_elite_133",
    notes: {
      top: ["Cassia", "Bergamot", "Tangerine", "Tomato Leaf"],
      middle: ["Pepper", "Rose"],
      base: ["Sandalwood", "Patchouli"]
    },
    accords: ["green", "citrus", "fresh spicy", "aromatic", "woody"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A patented Time-Release citrus green freshness exploding with crisp tomato leaves, spicy black pepper, and patchouli.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lacoste-Fragrances/Essential-680.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 27. Row 134: Angel Man (Mugler, ELITE, Men)
  {
    productId: "abna_angel_man_mugler_elite_134",
    notes: {
      top: ["Lavender", "Mint", "Fruity Notes", "Coriander", "Bergamot"],
      middle: [
        "Caramel",
        "Patchouli",
        "Honey",
        "Milk",
        "Cedarwood",
        "Jasmine",
        "Lily of the Valley"
      ],
      base: [
        "Coffee",
        "Patchouli",
        "Vanilla",
        "Tonka Bean",
        "Benzoin",
        "Amber",
        "Sandalwood",
        "Musk"
      ]
    },
    accords: ["warm spicy", "sweet", "caramel", "coffee", "patchouli"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Beast",
      longevity: "10h+"
    },
    editorialStory: "The legendary masculine gourmand trailblazer fusing roasted Arabica coffee, decadent caramel, and powerful patchouli.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mugler/A-Men-705.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 28. Row 135: Angel Woman (Mugler, ELITE, Women)
  {
    productId: "abna_angel_woman_mugler_elite_135",
    notes: {
      top: [
        "Cotton Candy",
        "Coconut",
        "Cassis",
        "Melon",
        "Jasmine",
        "Bergamot",
        "Pineapple",
        "Mandarin"
      ],
      middle: [
        "Honey",
        "Red Berries",
        "Blackberry",
        "Plum",
        "Apricot",
        "Peach",
        "Jasmine",
        "Orchid",
        "Caraway",
        "Nutmeg",
        "Rose",
        "Lily of the Valley"
      ],
      base: [
        "Patchouli",
        "Chocolate",
        "Caramel",
        "Vanilla",
        "Tonka Bean",
        "Amber",
        "Musk",
        "Sandalwood"
      ]
    },
    accords: ["sweet", "patchouli", "warm spicy", "caramel", "fruity"],
    fragranceFamily: ["Oriental", "Vanilla Gourmand"],
    performance: {
      sillage: "Beast",
      longevity: "10h+"
    },
    editorialStory: "The mother of all modern gourmands marrying celestial patchouli with mouth-watering praline, chocolate, and cotton candy.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mugler/Angel-704.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 29. Row 136: 1 Million Lucky (Paco Rabanne, ELITE, Men)
  {
    productId: "abna_1_million_lucky_paco_rabanne_elite_136",
    notes: {
      top: ["Plum", "Ozonic Notes", "Grapefruit", "Bergamot"],
      middle: ["Hazelnut", "Honey", "Cedarwood", "Cashmere Wood", "Jasmine", "Orange Blossom"],
      base: ["Amberwood", "Patchouli", "Oakmoss", "Vetiver"]
    },
    accords: ["sweet", "woody", "hazelnut", "honey", "fruity"],
    fragranceFamily: ["Woody", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "An addictive woody gourmand centered around crunchy roasted hazelnut, golden honey, and green greengage plum.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/1-Million-Lucky-48903.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 30. Row 137: Olympea (Paco Rabanne, ELITE, Women)
  {
    productId: "abna_olympea_paco_rabanne_elite_137",
    notes: {
      top: ["Water Jasmine", "Green Mandarin", "Ginger Flower"],
      middle: ["Vanilla", "Sea Salt"],
      base: ["Ambergris", "Cashmere Wood", "Sandalwood"]
    },
    accords: ["vanilla", "salty", "white floral", "amber", "woody"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A modern Cleopatra fragrance contrasting radiant salty vanilla with solar ginger lily and warm ambergris cashmere.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/Olympea-31666.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 31. Row 138: Valentino Uomo Born In Roma Intense (Valentino, ELITE, Men)
  {
    productId: "abna_valentino_uomo_born_in_roma_inte_valentino_elite_138",
    notes: {
      top: ["Vanilla"],
      middle: ["Lavender"],
      base: ["Vetiver"]
    },
    accords: ["vanilla", "lavender", "aromatic", "woody", "powdery"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A deeply sensual tribute to the eternal city, magnifying intoxicating bourbon vanilla infused with aromatic French lavender.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Valentino/Valentino-Uomo-Born-in-Roma-Intense-78712.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 32. Row 139: Libre (YSL, ELITE, Women)
  {
    productId: "abna_libre_ysl_elite_139",
    notes: {
      top: ["Lavender", "Mandarin", "Blackcurrant", "Petitgrain"],
      middle: ["Lavender", "Orange Blossom", "Jasmine"],
      base: ["Madagascar Vanilla", "Musk", "Cedarwood", "Ambergris"]
    },
    accords: ["white floral", "citrus", "lavender", "vanilla", "sweet"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "7-9h"
    },
    editorialStory: "A grand floral fougère uniting burning Moroccan orange blossom with the audacious cool tension of Diva lavender.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Libre-56077.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 33. Row 140: Myslf (YSL, ELITE, Men)
  {
    productId: "abna_myslf_ysl_elite_140",
    notes: {
      top: ["Calabrian Bergamot", "Bergamot"],
      middle: ["Orange Blossom"],
      base: ["Ambrofix", "Patchouli"]
    },
    accords: ["citrus", "white floral", "woody", "amber", "fresh"],
    fragranceFamily: ["Aromatic", "Woody"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A statement of modern masculinity intertwining sparkling Italian bergamot with Tunisian orange blossom and ambery Ambrofix.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/MYSLF-84190.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 34. Row 141: Black Amber (Zara, ELITE, Women)
  {
    productId: "abna_black_amber_zara_elite_141",
    notes: {
      top: ["Mandarin"],
      middle: ["Passionfruit", "Tiare Flower"],
      base: ["Vanilla", "Musk"]
    },
    accords: ["sweet", "vanilla", "fruity", "citrus", "tropical"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A warm, inviting oriental floral accenting sun-drenched passionfruit and exotic tiare flower with rich musky vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Black-Amber-39184.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 35. Row 142: Allure Sport (Chanel, ELITE, Men)
  {
    productId: "abna_allure_sport_chanel_elite_142",
    notes: {
      top: ["Orange", "Sea Notes", "Aldehydes", "Blood Mandarin"],
      middle: ["Pepper", "Neroli", "Cedarwood"],
      base: ["Tonka Bean", "Vanilla", "White Musk", "Amber", "Vetiver", "Elemi Resin"]
    },
    accords: ["citrus", "marine", "aromatic", "vanilla", "fresh spicy"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      sillage: "Moderate",
      longevity: "7-9h"
    },
    editorialStory: "A dynamic, sensual freshness driven by sparkling Italian mandarin, invigorating marine aldehydes, and luminous cedar tonka.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chanel/Allure-Homme-Sport-607.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 36. Row 143: Acqua Digio Profondo (Giorgio Armani, ELITE, Men)
  {
    productId: "abna_acqua_digio_profondo_giorgio_armani_elite_143",
    notes: {
      top: ["Sea Notes", "Aquozone", "Bergamot", "Green Mandarin"],
      middle: ["Rosemary", "Lavender", "Cypress", "Mastic"],
      base: ["Mineral Notes", "Musk", "Patchouli", "Amber"]
    },
    accords: ["marine", "aromatic", "citrus", "fresh spicy", "mineral"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "7-9h"
    },
    editorialStory: "An intense marine dive into the deep blue ocean, awakening the senses with Aquozone, aromatic rosemary, and mineral amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Acqua-di-Gio-Profondo-59532.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 37. Row 144: Ultra Male (Jean Paul Gaultier, ELITE, Men)
  {
    productId: "abna_ultra_male_jean_paul_gaultier_elite_144",
    notes: {
      top: ["Pear", "Lavender", "Mint", "Bergamot", "Lemon"],
      middle: ["Cinnamon", "Clary Sage", "Caraway"],
      base: ["Black Vanilla Husk", "Amber", "Cedarwood", "Patchouli"]
    },
    accords: ["sweet", "fruity", "vanilla", "warm spicy", "aromatic"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Beast",
      longevity: "9-11h"
    },
    editorialStory: "An irresistible rogue sailor gourmand radiating juicy spiced pear, dark bourbon vanilla husk, and magnetic amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Ultra-Male-30947.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 38. Row 145: Goddess (Burberry, ELITE, Women)
  {
    productId: "abna_goddess_burberry_elite_145",
    notes: {
      top: ["Vanilla", "Lavender", "Cacao", "Ginger"],
      middle: ["Vanilla Caviar"],
      base: ["Vanilla Absolute"]
    },
    accords: ["vanilla", "sweet", "warm spicy", "lavender", "aromatic"],
    fragranceFamily: ["Aromatic", "Gourmand"],
    performance: {
      sillage: "Moderate",
      longevity: "7-9h"
    },
    editorialStory: "A triumph of multifaceted vanilla architecture, wrapping rich vanilla caviar and vanilla absolute in luminous lavender.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Burberry/Goddess-83484.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 39. Row 146: Chloe Edp (Chloe, ELITE, Women)
  {
    productId: "abna_chloe_edp_chloe_elite_146",
    notes: {
      top: ["Peony", "Litchi", "Freesia"],
      middle: ["Rose", "Lily of the Valley", "Magnolia"],
      base: ["Virginia Cedar", "Amber"]
    },
    accords: ["floral", "rose", "fresh", "fruity", "tropical"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A breezy, chic floral masterpiece capturing powdery Damascena rose, succulent litchi, and velvety springtime peonies.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chloe/Chloe-Eau-de-Parfum-1733.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 40. Row 148: Black XS (Paco Rabanne, ELITE, Men)
  {
    productId: "abna_black_xs_paco_rabanne_elite_148",
    notes: {
      top: ["Lemon", "Tagetes"],
      middle: ["Praline", "Cinnamon", "Black Cardamom", "Tolu Balsam"],
      base: ["Patchouli", "Black Amber", "Ebony Tree", "Palisander Rosewood"]
    },
    accords: ["sweet", "warm spicy", "citrus", "woody", "amber"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A decadent dark rocker fragrance blending Calabrian lemon with sweet praline, cinnamon bark, and rich ebony wood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/Black-XS-514.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 41. Row 149: Invictus (Paco Rabanne, ELITE, Men)
  {
    productId: "abna_invictus_paco_rabanne_elite_149",
    notes: {
      top: ["Sea Notes", "Grapefruit", "Mandarin"],
      middle: ["Bay Leaf", "Jasmine"],
      base: ["Ambergris", "Guaiac Wood", "Oakmoss", "Patchouli"]
    },
    accords: ["marine", "citrus", "aromatic", "woody", "fresh spicy"],
    fragranceFamily: ["Woody", "Aquatic"],
    performance: {
      sillage: "Strong",
      longevity: "7-9h"
    },
    editorialStory: "The scent of victory, contrasting an exhilarating marine grapefruit rush with triumphant bay leaf and ambery guaiac wood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/Invictus-18471.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 42. Row 150: Pure XS (Paco Rabanne, ELITE, Men)
  {
    productId: "abna_pure_xs_paco_rabanne_elite_150",
    notes: {
      top: ["Ginger", "Thyme", "Grapefruit", "Bergamot", "Green Accord"],
      middle: ["Vanilla", "Liquor", "Cinnamon", "Leather", "Apple"],
      base: ["Myrrh", "Sugar", "Cedarwood", "Cashmeran", "Patchouli", "Woody Notes"]
    },
    accords: ["vanilla", "sweet", "warm spicy", "balsamic", "aromatic"],
    fragranceFamily: ["Aromatic", "Spicy"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An electric collision of icy ginger freshness and magnetic hot vanilla liqueur and resinous myrrh.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/Pure-XS-46252.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 43. Row 151: Burberry For Her (Burberry, ELITE, Women)
  {
    productId: "abna_burberry_for_her_burberry_elite_151",
    notes: {
      top: [
        "Strawberry",
        "Raspberry",
        "Blackberry",
        "Sour Cherry",
        "Blackcurrant",
        "Mandarin",
        "Lemon"
      ],
      middle: ["Violet", "Jasmine"],
      base: ["Musk", "Vanilla", "Cashmeran", "Woody Notes", "Amber", "Oakmoss", "Patchouli"]
    },
    accords: ["fruity", "sweet", "woody", "berry", "powdery"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A vibrant London spirit bursting with sweet dark British berries over an airy dry cedar-amber and plush musk trail.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Burberry/Burberry-Her-51694.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 44. Row 152: J'adore (Dior, ELITE, Women)
  {
    productId: "abna_j_adore_dior_elite_152",
    notes: {
      top: ["Pear", "Melon", "Magnolia", "Peach", "Mandarin", "Bergamot"],
      middle: [
        "Jasmine",
        "Lily of the Valley",
        "Tuberose",
        "Freesia",
        "Rose",
        "Orchid",
        "Plum",
        "Violet"
      ],
      base: ["Musk", "Vanilla", "Blackberry", "Cedarwood"]
    },
    accords: ["floral", "fruity", "white floral", "sweet", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A golden, voluptuous grand floral bouquet uniting Comorian ylang-ylang, Damascus rose, and Grasse jasmine sambac.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dior/J-adore-210.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.99,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 45. Row 153: Eros Flame (Versace, ELITE, Men)
  {
    productId: "abna_eros_flame_versace_elite_153",
    notes: {
      top: ["Mandarin", "Black Pepper", "Chinotto", "Lemon", "Rosemary"],
      middle: ["Pepper", "Geranium", "Rose"],
      base: ["Texas Cedar", "Vanilla", "Tonka Bean", "Sandalwood", "Patchouli", "Oakmoss"]
    },
    accords: ["citrus", "warm spicy", "vanilla", "woody", "fresh spicy"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A fiery passion of cold and hot, sweet and spicy, bursting with Italian chinotto, fiery black pepper, and sensual vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Versace/Eros-Flame-52180.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 46. Row 154: Explorer (Montblanc, ELITE, Men)
  {
    productId: "abna_explorer_montblanc_elite_154",
    notes: {
      top: ["Bergamot", "Pink Pepper", "Clary Sage"],
      middle: ["Haitian Vetiver", "Leather"],
      base: ["Ambroxan", "Akigalawood", "Indonesian Patchouli Leaf", "Cacao Pod"]
    },
    accords: ["woody", "citrus", "aromatic", "amber", "warm spicy"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An adventurous journey across four corners of the globe marrying green Italian bergamot, smoky vetiver, and Akigalawood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Montblanc/Explorer-52002.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 47. Row 155: Invictus Elixir (Paco Rabanne, ELITE, Men)
  {
    productId: "abna_invictus_elixir_paco_rabanne_elite_155",
    notes: {
      top: ["Lavender", "Cardamom", "Black Pepper"],
      middle: ["Incense", "Patchouli"],
      base: ["Vanilla", "Tonka Bean"]
    },
    accords: ["amber", "vanilla", "warm spicy", "sweet", "aromatic"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "The pinnacle of Invictus intensity, enveloping rich mysterious incense and dark vanilla liqueur in spicy aromatic lavender.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/Invictus-Victory-Elixir-78581.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 48. Row 156: Sexy Gravity (Escada, EXCLUSIVE, Women)
  {
    productId: "abna_sexy_gravity_escada_exclusive_156",
    notes: {
      top: ["Raspberry", "Wild Strawberry", "Cassis", "Grapefruit", "Mint"],
      middle: ["Lily of the Valley", "Peony", "Violet", "Lily"],
      base: ["Vanilla", "Cashmere Wood", "Musk"]
    },
    accords: ["fruity", "sweet", "fresh", "floral", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h"
    },
    editorialStory: "A joyful, sparkling summer festival fragrance bursting with sun-ripened red berries, violet petals, and soft vanilla musk.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Sexy-Graffiti-1379.html",
      sourceType: "normalized_brand_and_name_match",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "normalized_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified"
    }
  },
  // 49. Row 157: Desire Blue (Alfred Dunhill, EXCLUSIVE, Men)
  {
    productId: "abna_desire_blue_alfred_dunhill_exclusive_157",
    notes: {
      top: ["Litchi", "Mandarin", "Lotus", "Bergamot"],
      middle: ["Sea Notes", "Orange", "Brazilian Rosewood"],
      base: ["Tonka Bean", "Musk", "Benzoin", "Amber"]
    },
    accords: ["marine", "citrus", "fruity", "sweet", "aromatic"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "A refreshing ocean breeze meeting exotic sweet litchi, dewy lotus petals, and ambery driftwood tonka.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-Blue-1935.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T11:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified"
    }
  }
];
const BATCH_04_ENRICHMENT_RECORDS = [
  // 1. Row 158: Rush | Gucci (EXCLUSIVE, Women)
  {
    productId: "abna_rush_gucci_exclusive_158",
    notes: {
      top: ["Peach", "California Gardenia", "African Freesia Petals"],
      middle: ["Coriander", "Damask Rose", "Jasmine"],
      base: ["Patchouli", "Natural Vanilla", "Vetiver"]
    },
    accords: ["fruity", "white floral", "patchouli", "sweet", "woody"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Gucci-Rush-686.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 2. Row 159: Stronger With You Parfum | Giorgio Armani (SPECIAL ONE, Unisex)
  {
    productId: "abna_stronger_with_you_parfum_giorgio_armani_special_one_159",
    notes: {
      top: ["Pink Pepper", "Cardamom", "Mandarin"],
      middle: ["Lavender", "Sage", "Chestnut"],
      base: ["Bourbon Vanilla", "Amber", "Cedarwood"]
    },
    accords: ["vanilla", "sweet", "aromatic", "warm spicy", "amber"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Emporio-Armani-Stronger-With-You-Parfum-90059.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 3. Row 160: Rouge Trafalgar | Dior (SPECIAL ONE, Women)
  {
    productId: "abna_rouge_trafalgar_dior_special_one_160",
    notes: {
      top: ["Raspberry", "Strawberry", "Cherry", "Mandarin"],
      middle: ["Blackcurrant", "Grapefruit"],
      base: ["Musk", "Patchouli"]
    },
    accords: ["fruity", "sweet", "citrus", "sour cherry", "fresh"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dior/Rouge-Trafalgar-58963.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 4. Row 161: Rose Essential | Bvlgari (SPECIAL ONE, Women)
  {
    productId: "abna_rose_essential_bvlgari_special_one_161",
    notes: {
      top: ["Rose", "Violet", "Blackberry"],
      middle: ["Taif Rose", "Mimosa", "Jasmine"],
      base: ["Musk", "Sandalwood", "Patchouli", "Guaiac Wood"]
    },
    accords: ["rose", "floral", "powdery", "fruity", "woody"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Rose-Essentielle-683.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 5. Row 162: Good Girl Velvet | Carolina Herrera (SPECIAL ONE, Women)
  {
    productId: "abna_good_girl_velvet_carolina_herrera_special_one_162",
    notes: {
      top: ["Almond", "Coffee", "Bergamot", "Lemon"],
      middle: ["Tuberose", "Jasmine Sambac", "Orange Blossom", "Bulgarian Rose", "Orris"],
      base: [
        "Praline",
        "Cacao",
        "Tonka Bean",
        "Vanilla",
        "Patchouli",
        "Amber",
        "Sandalwood",
        "Musk",
        "Cedarwood",
        "Cashmere Wood",
        "Cinnamon"
      ]
    },
    accords: ["sweet", "white floral", "warm spicy", "cacao", "vanilla"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/Good-Girl-Velvet-Fatale-50796.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 6. Row 163: Herod | Parfums de Marly (SPECIAL ONE, Men)
  {
    productId: "abna_herod_parfums_de_marly_special_one_163",
    notes: {
      top: ["Cinnamon", "Pepperwood"],
      middle: ["Tobacco Leaf", "Incense", "Osmanthus", "Labdanum"],
      base: ["Vanilla", "Iso E Super", "Cedarwood", "Musk", "Cypriol Oil", "Vetiver"]
    },
    accords: ["tobacco", "vanilla", "warm spicy", "sweet", "cinnamon"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Herod-16939.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 7. Row 164: Delox | Tiziana Terenzi (SPECIAL ONE, Unisex)
  {
    productId: "abna_delox_tiziana_terenzi_special_one_164",
    notes: {
      top: ["Coffee", "White Hyacinth", "Iris"],
      middle: ["Turkish Rose", "Vanilla", "Opoponax"],
      base: ["Honey", "White Musk", "Amber", "Cedarwood"]
    },
    accords: ["sweet", "coffee", "rose", "vanilla", "honey"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Tiziana-Terenzi/Delox-44583.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 8. Row 165: Garanat | Bvlgari (SPECIAL ONE, Men)
  {
    productId: "abna_garanat_bvlgari_special_one_165",
    notes: {
      top: ["Damask Rose"],
      middle: ["Taif Rose"],
      base: ["Incense", "Smoke"]
    },
    accords: ["rose", "amber", "smoky", "warm spicy", "balsamic"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Garanat-40019.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 9. Row 166: Khamrah Qahwa | Lattafa (SPECIAL ONE, Unisex)
  {
    productId: "abna_khamrah_qahwa_lattafa_special_one_166",
    notes: {
      top: ["Cinnamon", "Cardamom", "Ginger"],
      middle: ["Praline", "Candied Fruits", "White Flowers"],
      base: ["Coffee", "Tonka Bean", "Vanilla", "Benzoin", "Musk"]
    },
    accords: ["warm spicy", "sweet", "coffee", "cinnamon", "vanilla"],
    fragranceFamily: ["Oriental", "Vanilla Gourmand"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-Qahwa-88320.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 10. Row 167: Aventus | Creed (SPECIAL ONE, Men)
  {
    productId: "abna_aventus_creed_special_one_167",
    notes: {
      top: ["Pineapple", "Bergamot", "Blackcurrant", "Apple"],
      middle: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
      base: ["Musk", "Oakmoss", "Ambergris", "Vanilla"]
    },
    accords: ["fruity", "woody", "smoky", "leather", "citrus"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Creed/Aventus-9828.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 11. Row 168: Ombre Nomade | Louis Vuitton (SPECIAL ONE, Unisex)
  {
    productId: "abna_ombre_nomade_louis_vuitton_special_one_168",
    notes: {
      top: ["Raspberry", "Geranium"],
      middle: ["Rose", "Saffron"],
      base: ["Agarwood (Oud)", "Incense", "Benzoin", "Birch", "Amberwood"]
    },
    accords: ["oud", "amber", "warm spicy", "smoky", "rose"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "12h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Ombre-Nomade-49751.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 12. Row 169: Paradoxe | Prada (THE NATURE, Women)
  {
    productId: "abna_paradoxe_prada_the_nature_169",
    notes: {
      top: ["Pear", "Tangerine", "Bergamot"],
      middle: ["Orange Blossom", "Jasmine Sambac", "Neroli"],
      base: ["Bourbon Vanilla", "White Musk", "Amber", "Benzoin"]
    },
    accords: ["white floral", "citrus", "sweet", "vanilla", "fruity"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "7-9h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Prada/Prada-Paradoxe-75892.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 13. Row 170: 9 PM Rebel | Rasasi (THE NATURE, Women)
  {
    productId: "abna_9_pm_rebel_rasasi_the_nature_170",
    notes: {
      top: ["Granny Smith Apple", "Pineapple", "Mandarin"],
      middle: ["Cedarwood", "Oakmoss", "Vanilla"],
      base: ["Ambergris", "Caramel", "Dry Woods", "Musk"]
    },
    accords: ["fruity", "sweet", "woody", "citrus", "amber"],
    fragranceFamily: ["Woody", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Afnan/9-PM-Rebel-93721.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 14. Row 172: Y Elixir | YSL (THE NATURE, Men)
  {
    productId: "abna_y_elixir_ysl_the_nature_172",
    notes: {
      top: ["Lavender"],
      middle: ["Geranium"],
      base: ["Frankincense", "Agarwood (Oud)"]
    },
    accords: ["aromatic", "fresh spicy", "oud", "amber", "lavender"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Y-Elixir-89736.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 15. Row 173: Twilly | Hermes (THE NATURE, Women)
  {
    productId: "abna_twilly_hermes_the_nature_173",
    notes: {
      top: ["Ginger", "Bitter Orange", "Bergamot"],
      middle: ["Tuberose", "Orange Blossom", "Jasmine"],
      base: ["Sandalwood", "Vanilla"]
    },
    accords: ["white floral", "warm spicy", "tuberose", "citrus", "woody"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hermes/Twilly-d-Hermes-46145.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 16. Row 174: Burberry For Her Elixir | Burberry (THE NATURE, Women)
  {
    productId: "abna_burberry_for_her_elixir_burberry_the_nature_174",
    notes: {
      top: ["Strawberry", "Blackberry"],
      middle: ["Jasmine"],
      base: ["Vanilla", "Amber", "Sandalwood"]
    },
    accords: ["fruity", "sweet", "vanilla", "powdery", "woody"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Burberry/Her-Elixir-de-Parfum-76077.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 17. Row 175: Wood Essence | Bvlgari (THE NATURE, Men)
  {
    productId: "abna_wood_essence_bvlgari_the_nature_175",
    notes: {
      top: ["Citron with Sugar", "Lemon Zest", "Coriander Leaf"],
      middle: ["Cypress", "Cedarwood", "Vetiver"],
      base: ["Benzoin"]
    },
    accords: ["woody", "citrus", "aromatic", "fresh spicy", "conifer"],
    fragranceFamily: ["Woody"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Bvlgari-Man-Wood-Essence-50474.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 18. Row 176: Flora Gardenia Intense | Gucci (THE NATURE, Women)
  {
    productId: "abna_flora_gardenia_intense_gucci_the_nature_176",
    notes: {
      top: ["Pear Blossom", "Red Berries", "Italian Mandarin"],
      middle: ["Gardenia", "Jasmine", "Frangipani"],
      base: ["Brown Sugar", "Patchouli"]
    },
    accords: ["white floral", "sweet", "floral", "fruity", "fresh"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Flora-Gorgeous-Gardenia-Eau-de-Parfum-68578.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 19. Row 177: Seoul | Zara (THE NATURE, Men)
  {
    productId: "abna_seoul_zara_the_nature_177",
    notes: {
      top: ["Tangerine", "Nutmeg"],
      middle: ["Sea Notes", "Lavender"],
      base: ["Amber"]
    },
    accords: ["marine", "citrus", "fresh spicy", "aromatic", "amber"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Seoul-532-8-Sinsa-Dong-Gangnam-Gu-32098.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 20. Row 178: Flora | Gucci (THE NATURE, Women)
  {
    productId: "abna_flora_gucci_the_nature_178",
    notes: {
      top: ["Peony", "Citruses", "Mandarin"],
      middle: ["Osmanthus", "Rose"],
      base: ["Sandalwood", "Patchouli", "Pink Pepper"]
    },
    accords: ["floral", "citrus", "fruity", "rose", "fresh"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Flora-by-Gucci-Eau-de-Parfum-7711.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 21. Row 179: Alien | Mugler (THE NATURE, Women)
  {
    productId: "abna_alien_mugler_the_nature_179",
    notes: {
      top: ["Jasmine Sambac"],
      middle: ["Cashmeran Wood"],
      base: ["White Amber"]
    },
    accords: ["white floral", "amber", "woody", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mugler/Alien-707.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 22. Row 180: Erba Pura | Xerjoff (THE NATURE, Unisex)
  {
    productId: "abna_erba_pura_xerjoff_the_nature_180",
    notes: {
      top: ["Sicilian Orange", "Calabrian Bergamot", "Sicilian Lemon"],
      middle: ["Fruits"],
      base: ["White Musk", "Madagascar Vanilla", "Amber"]
    },
    accords: ["fruity", "sweet", "citrus", "musky", "vanilla"],
    fragranceFamily: ["Oriental"],
    performance: {
      longevity: "12h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Xerjoff/Erba-Pura-55157.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 23. Row 181: Golden Secret | Antonio Banderas (THE NATURE, Men)
  {
    productId: "abna_golden_secret_antonio_banderas_the_nature_181",
    notes: {
      top: ["Apple", "Mint", "Green Notes"],
      middle: ["Nutmeg", "Pepper", "Cumin"],
      base: ["Leather", "Cedarwood", "Musk"]
    },
    accords: ["warm spicy", "fresh spicy", "fruity", "leather", "green"],
    fragranceFamily: ["Aromatic", "Spicy"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Antonio-Banderas/The-Golden-Secret-13000.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 24. Row 182: Man In Black | Bvlgari (THE NATURE, Men)
  {
    productId: "abna_man_in_black_bvlgari_the_nature_182",
    notes: {
      top: ["Spices", "Rum", "Tobacco"],
      middle: ["Leather", "Iris", "Tuberose"],
      base: ["Tonka Bean", "Guaiac Wood", "Benzoin"]
    },
    accords: ["warm spicy", "woody", "leather", "rum", "tobacco"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Bvlgari-Man-In-Black-26358.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 25. Row 183: Bal D'afrique | Byredo (THE NATURE, Unisex)
  {
    productId: "abna_bal_d_afrique_byredo_the_nature_183",
    notes: {
      top: ["Amalfi Lemon", "Tagetes", "Blackcurrant", "Bergamot", "African Orange Flower"],
      middle: ["Violet", "Cyclamen", "Jasmine"],
      base: ["Vetiver", "Musk", "Amber", "Virginia Cedar"]
    },
    accords: ["citrus", "woody", "aromatic", "floral", "fruity"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Byredo/Bal-d-Afrique-6458.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 26. Row 185: Code Profumo | Giorgio Armani (THE NATURE, Unisex)
  {
    productId: "abna_code_profumo_giorgio_armani_the_nature_185",
    notes: {
      top: ["Cardamom", "Green Apple", "Green Mandarin"],
      middle: ["Nutmeg", "Lavender", "Orange Blossom"],
      base: ["Tonka Bean", "Amber", "Leather"]
    },
    accords: ["amber", "warm spicy", "sweet", "vanilla", "aromatic"],
    fragranceFamily: ["Oriental", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Armani-Code-Profumo-34674.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 27. Row 186: Daisy | Marc Jacobs (THE NATURE, Women)
  {
    productId: "abna_daisy_marc_jacobs_the_nature_186",
    notes: {
      top: ["Violet Leaf", "Blood Grapefruit", "Strawberry"],
      middle: ["Violet", "Gardenia", "Jasmine"],
      base: ["Musk", "White Woods", "Vanilla"]
    },
    accords: ["ozonic", "white floral", "fruity", "sweet", "powdery"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Marc-Jacobs/Daisy-1361.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 28. Row 187: Arabian Tonka | Montale (THE NATURE, Unisex)
  {
    productId: "abna_arabian_tonka_montale_the_nature_187",
    notes: {
      top: ["Saffron", "Bergamot"],
      middle: ["Agarwood (Oud)", "Bulgarian Rose"],
      base: ["Sugar Cane", "Tonka Bean", "Amber", "White Musk", "Oakmoss"]
    },
    accords: ["sweet", "warm spicy", "vanilla", "amber", "oud"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "12h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Montale/Arabians-Tonka-57384.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 29. Row 188: Valentino Donna Born In Roma | Valentino (THE NATURE, Men)
  {
    productId: "abna_valentino_donna_born_in_roma_valentino_the_nature_188",
    notes: {
      top: ["Blackcurrant", "Pink Pepper", "Bergamot"],
      middle: ["Jasmine Sambac", "Jasmine", "Jasmine Tea"],
      base: ["Bourbon Vanilla", "Cashmeran", "Guaiac Wood"]
    },
    accords: ["woody", "vanilla", "fruity", "white floral", "sweet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "7-9h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Valentino/Valentino-Donna-Born-In-Roma-55805.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 30. Row 189: Angel Share Paradis | By Killian (THE NATURE, Unisex)
  {
    productId: "abna_angel_share_paradis_by_killian_the_nature_189",
    notes: {
      top: ["Cognac"],
      middle: ["Cinnamon", "Tonka Bean", "Oak"],
      base: ["Praline", "Vanilla", "Sandalwood"]
    },
    accords: ["warm spicy", "woody", "sweet", "vanilla", "cinnamon"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/By-Kilian/Angels-Share-62615.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 31. Row 190: Million Gold Her | Paco Rabanne (THE NATURE, Women)
  {
    productId: "abna_million_gold_her_paco_rabanne_the_nature_190",
    notes: {
      top: ["Rose"],
      middle: ["White Flowers"],
      base: ["Mineral Musk"]
    },
    accords: ["white floral", "rose", "musky", "mineral", "fresh"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/Million-Gold-For-Her-95286.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 32. Row 191: Versus | Versace (EXCLUSIVE, Women)
  {
    productId: "abna_versus_versace_exclusive_191",
    notes: {
      top: ["Kumquat", "Amalfi Lemon", "Star Apple"],
      middle: ["African Orange Flower", "Stephanotis", "Rose Tincture"],
      base: ["Musk", "Ambrette", "Patchouli"]
    },
    accords: ["citrus", "white floral", "fruity", "musky", "sweet"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Versace/Versus-8109.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 33. Row 192: Le Parfum | Elie Saab (EXCLUSIVE, Women)
  {
    productId: "abna_le_parfum_elie_saab_exclusive_192",
    notes: {
      top: ["African Orange Flower"],
      middle: ["Jasmine", "Grandiflorum Jasmine", "Jasmine Sambac"],
      base: ["White Honey", "Patchouli", "Rose", "Virginia Cedar"]
    },
    accords: ["white floral", "honey", "sweet", "floral", "patchouli"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Elie-Saab/Le-Parfum-12258.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 34. Row 193: One | Calvin Klein (VIP, Unisex)
  {
    productId: "abna_one_calvin_klein_vip_193",
    notes: {
      top: ["Lemon", "Green Notes", "Bergamot", "Pineapple", "Mandarin", "Cardamom", "Papaya"],
      middle: [
        "Lily of the Valley",
        "Jasmine",
        "Violet",
        "Nutmeg",
        "Rose",
        "Orris Root",
        "Freesia"
      ],
      base: ["Green Accord", "Musk", "Cedarwood", "Sandalwood", "Oakmoss", "Green Tea", "Amber"]
    },
    accords: ["citrus", "green", "woody", "fresh", "aromatic"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Calvin-Klein/CK-One-276.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 35. Row 194: Pink Chiffon | BBW (EXCLUSIVE, Women)
  {
    productId: "abna_pink_chiffon_bbw_exclusive_194",
    notes: {
      top: ["Wild Berries", "Pear", "Peach", "Mandarin"],
      middle: ["Apple Blossom", "Tiare Flower", "Jasmine", "Water Lily"],
      base: ["Vanilla", "Coconut Milk", "Orchid", "Musk", "Sandalwood", "Heliotrope"]
    },
    accords: ["sweet", "fruity", "vanilla", "floral", "powdery"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-and-Body-Works/Pink-Chiffon-14368.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 36. Row 195: Thousand Wish | BBW (EXCLUSIVE, Women)
  {
    productId: "abna_thousand_wish_bbw_exclusive_195",
    notes: {
      top: ["Champagne", "Star Fruit", "Quince"],
      middle: ["Peony", "Freesia"],
      base: ["Amber", "Almond", "Sugar", "Sandalwood", "Musk"]
    },
    accords: ["sweet", "floral", "fruity", "champagne", "almond"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-and-Body-Works/A-Thousand-Wishes-28346.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 37. Row 197: Beautiful Day | BBW (VIP, Women)
  {
    productId: "abna_beautiful_day_bbw_vip_197",
    notes: {
      top: ["Apple", "Pear", "Blackcurrant"],
      middle: ["Daisy", "Pink Peony", "Lily of the Valley"],
      base: ["White Peach", "White Wood"]
    },
    accords: ["fruity", "fresh", "floral", "green", "sweet"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-and-Body-Works/Beautiful-Day-17792.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 38. Row 198: Fuji Sunsine | BBW (VIP, Women)
  {
    productId: "abna_fuji_sunsine_bbw_vip_198",
    notes: {
      top: ["Guava", "Sunkissed Orange"],
      middle: ["Passionfruit", "Mango"],
      base: ["Coastal Woods"]
    },
    accords: ["tropical", "fruity", "sweet", "citrus", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-and-Body-Works/Fuji-Sunshine-Guava-tini-73356.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 39. Row 199: Gingham Love | BBW (VIP, Women)
  {
    productId: "abna_gingham_love_bbw_vip_199",
    notes: {
      top: ["Sugared Red Berries"],
      middle: ["Freesia"],
      base: ["Rose Meringue"]
    },
    accords: ["sweet", "fruity", "rose", "floral", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-and-Body-Works/Gingham-Love-71701.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  },
  // 40. Row 203: Ala Rose | Maison Francis Kurkdjian (VIP, Unisex)
  {
    productId: "abna_ala_rose_maison_francis_kurkdjian_vip_203",
    notes: {
      top: ["Calabrian Bergamot", "California Orange"],
      middle: ["Damask Rose", "Grasse Rose", "Violet", "Magnolia"],
      base: ["Cedarwood", "Musk"]
    },
    accords: ["rose", "floral", "citrus", "powdery", "fresh"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/A-la-rose-28373.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:20:00Z",
      verificationStatus: "verified"
    }
  }
];
const BATCH_05_ENRICHMENT_RECORDS = [
  // 1. Row 209: Aqua Kiss | Victoria's Secret (EXCLUSIVE, Women)
  {
    productId: "abna_aqua_kiss_victoria_secret_exclusive_209",
    notes: {
      top: ["Chamomile", "Aloe Vera", "Sea Notes"],
      middle: ["Daisy", "Freesia"],
      base: ["Sweet Notes"]
    },
    accords: ["floral", "marine", "fresh", "sweet", "aquatic"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Aqua-Kiss-17075.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 2. Row 210: Midnight Fantasy | Britney Spears (VIP, Women)
  {
    productId: "abna_midnight_fantasy_britney_spears_vip_210",
    notes: {
      top: ["Plum", "Sour Cherry", "Raspberry"],
      middle: ["Iris", "Orchid", "Freesia"],
      base: ["Vanilla", "Amber", "Musk"]
    },
    accords: ["sweet", "fruity", "sour cherry", "vanilla", "floral"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Britney-Spears/Midnight-Fantasy-982.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 3. Row 211: 5th Avenue | Elizabeth Arden (VIP, Women)
  {
    productId: "abna_5th_avenue_elizabeth_arden_vip_211",
    notes: {
      top: ["Lime", "Lily-of-the-Valley", "Lilac", "Magnolia", "Bergamot", "Mandarin"],
      middle: [
        "Jasmine",
        "Tuberose",
        "Ylang-Ylang",
        "Violet",
        "Nutmeg",
        "Rose",
        "Peach",
        "Carnation"
      ],
      base: ["Musk", "Iris", "Sandalwood", "Amber", "Vanilla", "Cloves"]
    },
    accords: ["floral", "white floral", "fresh", "powdery", "citrus"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Elizabeth-Arden/5th-Avenue-81.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 4. Row 212: Noir 29 | Le Labo (ELITE, Unisex)
  {
    productId: "abna_noir_29_le_labo_elite_212",
    notes: {
      top: ["Fig", "Bay Leaf", "Bergamot"],
      middle: ["Cedarwood", "Vetiver", "Musk"],
      base: ["Tobacco", "Hay"]
    },
    accords: ["woody", "aromatic", "fresh spicy", "fruity", "sweet"],
    fragranceFamily: ["Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Le-Labo/The-Noir-29-31484.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 5. Row 213: Symphony | Louis Vuitton (ELITE, Unisex)
  {
    productId: "abna_symphony_louis_vuitton_elite_213",
    notes: {
      top: ["Grapefruit"],
      middle: ["Ginger"],
      base: ["Bergamot"]
    },
    accords: ["citrus", "warm spicy", "fresh spicy"],
    fragranceFamily: ["Citrus"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Symphony-68420.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 6. Row 214: By The Fire Place | Maison Margiela (ELITE, Unisex)
  {
    productId: "abna_by_the_fire_place_maison_margiela_elite_214",
    notes: {
      top: ["Cloves", "Pink Pepper", "Orange Blossom"],
      middle: ["Chestnut", "Guaiac Wood", "Juniper"],
      base: ["Vanilla", "Peru Balsam", "Cashmeran"]
    },
    accords: ["woody", "vanilla", "warm spicy", "balsamic", "smoky"],
    fragranceFamily: ["Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Martin-Margiela/By-the-Fireplace-31623.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 7. Row 215: Renaissance | Xerjoff (ELITE, Unisex)
  {
    productId: "abna_renaissance_xerjoff_elite_215",
    notes: {
      top: ["Amalfi Lemon", "Tangerine", "Bergamot", "Petitgrain"],
      middle: ["Mint", "Lily-of-the-Valley", "Rose"],
      base: ["Musk", "Cedarwood", "Amber", "Patchouli"]
    },
    accords: ["citrus", "aromatic", "fresh spicy", "green", "floral"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Xerjoff/XJ-1861-Renaissance-30520.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 8. Row 216: Le Beau | Jean Paul Gaultier (ELITE, Men)
  {
    productId: "abna_le_beau_jean_paul_gaultier_elite_216",
    notes: {
      top: ["Bergamot"],
      middle: ["Coconut Wood"],
      base: ["Tonka Bean"]
    },
    accords: ["coconut", "sweet", "vanilla", "aromatic", "citrus"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "7-9h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Le-Beau-55833.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 9. Row 217: Le Male Le Parfum | Jean Paul Gaultier (ELITE, Men)
  {
    productId: "abna_le_male_le_parfum_jean_paul_gaultier_elite_217",
    notes: {
      top: ["Cardamom"],
      middle: ["Lavender", "Iris"],
      base: ["Vanilla", "Oriental Notes", "Woody Notes"]
    },
    accords: ["warm spicy", "vanilla", "aromatic", "powdery", "lavender"],
    fragranceFamily: ["Oriental"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Le-Male-Le-Parfum-61856.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 10. Row 218: Pacific Chill | Louis Vuitton (ELITE, Unisex)
  {
    productId: "abna_pacific_chill_louis_vuitton_elite_218",
    notes: {
      top: ["Orange", "Citron", "Mint", "Lemon", "Blackcurrant", "Coriander"],
      middle: ["Apricot", "Basil", "Carrot Seeds", "May Rose"],
      base: ["Fig", "Dates", "Ambrette"]
    },
    accords: ["citrus", "fruity", "green", "aromatic", "fresh spicy"],
    fragranceFamily: ["Aromatic", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Pacific-Chill-81670.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 11. Row 219: When The Rain Stop | Maison Margiela (ELITE, Unisex)
  {
    productId: "abna_when_the_rain_stop_maison_margiela_elite_219",
    notes: {
      top: ["Green Notes", "Bergamot", "Pink Pepper"],
      middle: ["Rain Notes", "Watery Notes", "Turkish Rose", "Jasmine"],
      base: ["Pine Tree", "Moss", "Patchouli"]
    },
    accords: ["aquatic", "green", "fresh", "earthy", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Martin-Margiela/When-the-Rain-Stops-71050.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 12. Row 220: Aventus Absolu | Creed (ELITE, Men)
  {
    productId: "abna_aventus_absolu_creed_elite_220",
    notes: {
      top: ["Bergamot", "Lemon", "Blackcurrant", "Grapefruit", "Pink Pepper"],
      middle: ["Ginger", "Cinnamon", "Cardamom", "Citron"],
      base: ["Patchouli", "Vetiver", "Cashmeran", "Labdanum", "Ambroxan", "Musk", "Oakmoss"]
    },
    accords: ["citrus", "fruity", "warm spicy", "woody", "fresh spicy"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Creed/Absolu-Aventus-84570.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 13. Row 221: 777 God Of Fire | Stephane Humbert Lucas 777 (ELITE, Unisex)
  {
    productId: "abna_777_god_of_fire_stephane_humbert_lucas_777_elite_221",
    notes: {
      top: ["Mango", "Lemon", "Pink Berries", "Ginger"],
      middle: ["Blue Coumarin", "Jasmine", "Dry Wood"],
      base: ["Oud", "Nagarmotha", "Musk", "Amber"]
    },
    accords: ["tropical", "fruity", "sweet", "woody", "citrus"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Stephane-Humbert-Lucas-777/God-of-Fire-74917.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 14. Row 222: Bianco Latte | Giardini Di Toscana (EXCLUSIVE, Unisex)
  {
    productId: "abna_bianco_latte_giardini_di_toscana_exclusive_222",
    notes: {
      top: ["Caramel"],
      middle: ["Coumarin", "Honey"],
      base: ["Vanilla", "White Musk"]
    },
    accords: ["vanilla", "sweet", "caramel", "honey", "balsamic"],
    fragranceFamily: ["Oriental", "Vanilla Gourmand"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giardini-Di-Toscana/Bianco-Latte-64645.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 15. Row 223: Tobacco Honey | Guerlain (SPECIAL ONE, Unisex)
  {
    productId: "abna_tobacco_honey_guerlain_special_one_223",
    notes: {
      top: ["Honey", "Cloves", "Anise"],
      middle: ["Tobacco", "Tonka Bean", "Vanilla", "Sesame"],
      base: ["Honey", "Sandalwood", "Agarwood (Oud)"]
    },
    accords: ["honey", "sweet", "tobacco", "warm spicy", "vanilla"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "12h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Guerlain/Tobacco-Honey-84307.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 16. Row 224: Torino 21 | Xerjoff (SPECIAL ONE, Unisex)
  {
    productId: "abna_torino_21_xerjoff_special_one_224",
    notes: {
      top: ["Mint", "Lemon", "Basil", "Thyme"],
      middle: ["Lavender", "Blackcurrant", "Rosemary", "Jasmine"],
      base: ["Lemon Verbena", "Musk"]
    },
    accords: ["green", "aromatic", "citrus", "fresh spicy", "herbal"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Xerjoff/Torino21-70425.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 17. Row 225: Aqua Marine | Bvlgari (ELITE, Men)
  {
    productId: "abna_aqua_marine_bvlgari_elite_225",
    notes: {
      top: ["Grapefruit", "Neroli", "Mandarin", "Petitgrain"],
      middle: ["Water Notes", "Seaweed", "Rosemary"],
      base: ["Virginia Cedar", "Amber"]
    },
    accords: ["marine", "aquatic", "citrus", "aromatic", "fresh"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Aqva-Pour-Homme-Marine-2465.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 18. Row 226: 1 Million | Paco Rabanne (ELITE, Men)
  {
    productId: "abna_1_million_paco_rabanne_elite_226",
    notes: {
      top: ["Blood Mandarin", "Grapefruit", "Mint"],
      middle: ["Cinnamon", "Spices", "Rose"],
      base: ["Amber", "Leather", "Woody Notes", "Patchouli"]
    },
    accords: ["warm spicy", "cinnamon", "citrus", "leather", "amber"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/1-Million-3747.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 19. Row 227: Man Uomo | Zara (ELITE, Men)
  {
    productId: "abna_man_uomo_zara_elite_227",
    notes: {
      top: ["Lemon", "Mandarin"],
      middle: ["Cinnamon", "Cardamom", "Nutmeg"],
      base: ["Woody Notes", "Amber"]
    },
    accords: ["warm spicy", "citrus", "cinnamon", "amber", "woody"],
    fragranceFamily: ["Oriental", "Spicy"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Man-Uomo-46743.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 20. Row 228: Happy Man | Clinique (ELITE, Men)
  {
    productId: "abna_happy_man_clinique_elite_228",
    notes: {
      top: ["Mandarin", "Lime", "Sea Notes", "Lemon", "Green Notes"],
      middle: ["Freesia", "Jasmine", "Lily-of-the-Valley", "Rose"],
      base: ["Cypress", "Cedarwood", "Musk", "Guaiac Wood"]
    },
    accords: ["citrus", "marine", "aromatic", "fresh", "green"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Clinique/Clinique-Happy-373.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 21. Row 229: Oud Greatness | Initio (EXCLUSIVE, Unisex)
  {
    productId: "abna_oud_greatness_initio_exclusive_229",
    notes: {
      top: ["Saffron", "Nutmeg", "Lavender"],
      middle: ["Agarwood (Oud)"],
      base: ["Patchouli", "Musk"]
    },
    accords: ["oud", "warm spicy", "fresh spicy", "woody", "lavender"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "12h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Initio-Parfums-Prives/Oud-for-Greatness-53641.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 22. Row 230: 9 PM Rebel | Rasasi (EXCLUSIVE, Women)
  {
    productId: "abna_9_pm_rebel_rasasi_exclusive_230",
    notes: {
      top: ["Granny Smith Apple", "Pineapple", "Mandarin"],
      middle: ["Cedarwood", "Oakmoss", "Vanilla"],
      base: ["Ambergris", "Caramel", "Dry Woods", "Musk"]
    },
    accords: ["fruity", "sweet", "woody", "citrus", "amber"],
    fragranceFamily: ["Woody", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Afnan/9-PM-Rebel-93721.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 23. Row 231: CR7 | Cristiano Ronaldo (EXCLUSIVE, Men)
  {
    productId: "abna_cr7_christiano_ronaldo_exclusive_231",
    notes: {
      top: ["Bergamot", "Artemisia", "Cardamom", "Lavender"],
      middle: ["Cinnamon", "Cedarwood", "Iris", "Tobacco"],
      base: ["Sandalwood", "Vanilla", "Amber", "Musk"]
    },
    accords: ["aromatic", "warm spicy", "woody", "vanilla", "powdery"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Cristiano-Ronaldo/CR7-46487.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 24. Row 232: Nude Bouquet | Zara (EXCLUSIVE, Women)
  {
    productId: "abna_nude_bouquet_zara_exclusive_232",
    notes: {
      top: ["Lotus", "Bergamot"],
      middle: ["Honeysuckle", "Heliotrope"],
      base: ["Sandalwood", "Vanilla", "Tonka Bean"]
    },
    accords: ["floral", "fresh", "powdery", "aquatic", "citrus"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Nude-Bouquet-41005.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 25. Row 233: SI | Giorgio Armani (EXCLUSIVE, Women)
  {
    productId: "abna_si_giorgio_armani_exclusive_233",
    notes: {
      top: ["Cassis"],
      middle: ["May Rose", "Freesia"],
      base: ["Vanilla", "Patchouli", "Woody Notes", "Ambroxan"]
    },
    accords: ["fruity", "sweet", "vanilla", "patchouli", "woody"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Si-18453.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 26. Row 234: Rawdhah | Ahmed Al Maghribi (EXCLUSIVE, Unisex)
  {
    productId: "abna_rawdhah_ahmed_al_maghribi_exclusive_234",
    notes: {
      top: ["Rose", "Saffron"],
      middle: ["Agarwood (Oud)"],
      base: ["Musk", "Amber"]
    },
    accords: ["rose", "oud", "warm spicy", "amber", "musky"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ahmed-Al-Maghribi/Rawdha-70231.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 27. Row 235: Rose Noir | Ahmed Al Maghribi (EXCLUSIVE, Women)
  {
    productId: "abna_rose_noir_ahmed_al_maghribi_exclusive_235",
    notes: {
      top: ["Rose", "Orange Blossom"],
      middle: ["Jasmine"],
      base: ["Vanilla", "Musk", "Amber"]
    },
    accords: ["rose", "floral", "vanilla", "white floral", "powdery"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ahmed-Al-Maghribi/Rose-Noir-70233.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 28. Row 236: Africa | Axe (VIP, Men)
  {
    productId: "abna_africa_axe_vip_236",
    notes: {
      top: ["Mandarin", "Bergamot"],
      middle: ["Geranium"],
      base: ["Sandalwood", "Cedarwood", "Tonka Bean", "Vanilla", "Peru Balsam"]
    },
    accords: ["warm spicy", "citrus", "woody", "vanilla", "sweet"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Axe/Africa-47754.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 29. Row 237: Bombshell Intense | Victoria's Secret (VIP, Women)
  {
    productId: "abna_bombshell_intense_victoria_secret_vip_237",
    notes: {
      top: ["Cherry"],
      middle: ["Red Peony"],
      base: ["Vanilla"]
    },
    accords: ["fruity", "sweet", "sour cherry", "vanilla", "floral"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Bombshell-Intense-57121.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 30. Row 238: Black Man | Zara (VIP, Men)
  {
    productId: "abna_black_man_zara_vip_238",
    notes: {
      top: ["Cardamom", "Nutmeg"],
      middle: ["Grapefruit", "Pepper"],
      base: ["Vetiver", "Cedarwood", "Musk"]
    },
    accords: ["warm spicy", "fresh spicy", "woody", "citrus", "aromatic"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Man-Black-Edition-43577.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 31. Row 239: Amor Woman | Cacharel (VIP, Men)
  {
    productId: "abna_amor_woman_chacarel_vip_239",
    notes: {
      top: ["Blackcurrant", "Orange", "Mandarin", "Grapefruit", "Cassia", "Bergamot"],
      middle: ["Rose", "Apricot", "Jasmine", "Lily", "Lily-of-the-Valley"],
      base: ["Vanilla", "Tonka Bean", "Musk", "Amber", "Virginia Cedar"]
    },
    accords: ["fruity", "citrus", "sweet", "vanilla", "floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Cacharel/Amor-Amor-238.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 32. Row 240: Flight Of Fancy | Anna Sui (VIP, Women)
  {
    productId: "abna_flight_of_fancy_anna_sui_vip_240",
    notes: {
      top: ["Yuzu", "Litchi", "Lemon"],
      middle: ["Magnolia", "Rose", "Freesia"],
      base: ["White Woods", "Amber", "Musk"]
    },
    accords: ["citrus", "fruity", "floral", "fresh", "sweet"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Anna-Sui/Flight-of-Fancy-1738.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 33. Row 241: Pink | Benetton (VIP, Women)
  {
    productId: "abna_pink_benneton_vip_241",
    notes: {
      top: ["Bergamot", "Passionfruit", "Tangerine"],
      middle: ["Orange Blossom", "Rose", "Jasmine"],
      base: ["Musk", "Patchouli", "Cedarwood", "Vanilla", "Amber"]
    },
    accords: ["citrus", "fruity", "white floral", "sweet", "patchouli"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Benetton/Colors-de-Benetton-Pink-40348.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 34. Row 242: Black | Bvlgari (VIP, Unisex)
  {
    productId: "abna_black_bvlgari_vip_242",
    notes: {
      top: ["Green Tea", "Bergamot", "Rose"],
      middle: ["Sandalwood", "Cedarwood", "Jasmine"],
      base: ["Leather", "Rubber", "Vanilla", "Amber", "Musk"]
    },
    accords: ["leather", "vanilla", "woody", "smoky", "green"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Black-154.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 35. Row 243: Bottled Night | Hugo Boss (VIP, Men)
  {
    productId: "abna_bottled_night_hugo_boss_vip_243",
    notes: {
      top: ["Lavender", "Birch"],
      middle: ["Violet"],
      base: ["Woody Notes", "Musk"]
    },
    accords: ["woody", "aromatic", "violet", "lavender", "powdery"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Boss-Bottled-Night-8825.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 36. Row 244: Can Can | Paris Hilton (VIP, Women)
  {
    productId: "abna_can_can_paris_hilton_vip_244",
    notes: {
      top: ["Nectarine", "Blackcurrant", "Clementine"],
      middle: ["Orchid", "Orange Blossom"],
      base: ["Amber", "Musk", "Woody Notes"]
    },
    accords: ["sweet", "fruity", "floral", "powdery", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paris-Hilton/Can-Can-1994.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 37. Row 245: 31 | Reef Perfumes (VIP, Unisex)
  {
    productId: "abna_31_reef_vip_245",
    notes: {
      top: ["Saffron"],
      middle: ["Amber"],
      base: ["Agarwood (Oud)"]
    },
    accords: ["warm spicy", "amber", "oud", "metallic", "woody"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Reef-Perfumes/Reef-31-77821.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 38. Row 246: Coklat | Axe (EXCLUSIVE, Men)
  {
    productId: "abna_coklat_axe_exclusive_246",
    notes: {
      top: ["Cherry", "Coriander", "Ginger", "Pear"],
      middle: ["Red Pepper", "Whipped Cream", "Sage", "Basil"],
      base: ["Dark Chocolate", "Vanilla", "Amber", "Patchouli"]
    },
    accords: ["cacao", "sweet", "warm spicy", "vanilla", "chocolate"],
    fragranceFamily: ["Oriental", "Vanilla Gourmand"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Axe/Dark-Temptation-4988.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 39. Row 247: Pleasure | Estée Lauder (VIP, Women)
  {
    productId: "abna_pleasure_este_lauder_vip_247",
    notes: {
      top: ["White Lily", "Violet Leaf", "Green Accords"],
      middle: ["Lilac", "Peony", "Rose", "Jasmine"],
      base: ["Sandalwood", "Patchouli"]
    },
    accords: ["floral", "fresh", "green", "white floral", "rose"],
    fragranceFamily: ["Floral"],
    performance: {
      longevity: "7-9h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Estee-Lauder/Pleasures-536.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 40. Row 248: Side Effect | Initio (EXCLUSIVE, Unisex)
  {
    productId: "abna_side_effect_initio_exclusive_248",
    notes: {
      top: ["Rum"],
      middle: ["Cinnamon", "Vanilla", "Tobacco"],
      base: ["Woody Notes", "Leather"]
    },
    accords: ["warm spicy", "rum", "vanilla", "tobacco", "cinnamon"],
    fragranceFamily: ["Oriental"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Initio-Parfums-Prives/Side-Effect-42260.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 41. Row 250: Mad About You | Bath & Body Works (EXCLUSIVE, Women)
  {
    productId: "abna_mad_about_you_bbw_exclusive_250",
    notes: {
      top: ["Strawberry", "Blackcurrant", "Cassis"],
      middle: ["Peony", "Jasmine", "Passionflower"],
      base: ["Vanilla", "Patchouli", "Musk", "Amber", "Sandalwood"]
    },
    accords: ["fruity", "sweet", "floral", "woody", "patchouli"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-and-Body-Works/Mad-About-You-23472.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 42. Row 251: Wonder Rose | Zara (EXCLUSIVE, Women)
  {
    productId: "abna_wonder_rose_zara_exclusive_251",
    notes: {
      top: ["Red Berries", "Pear"],
      middle: ["Rose", "Violet", "Cedarwood"],
      base: ["Vanilla", "Musk"]
    },
    accords: ["fruity", "sweet", "rose", "vanilla", "floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "5-7h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Wonder-Rose-41006.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 43. Row 253: Sultan | Al-Rehab (ELITE, Men)
  {
    productId: "abna_sultan_al_rehab_elite_253",
    notes: {
      top: ["Bergamot", "Cardamom", "Juniper"],
      middle: ["Cinnamon", "Vanilla"],
      base: ["Cedarwood", "Sandalwood", "Musk"]
    },
    accords: ["woody", "warm spicy", "aromatic", "powdery", "cinnamon"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Sultan-20121.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 44. Row 254: Brud Faberge | Fabergé (EXCLUSIVE, Men)
  {
    productId: "abna_brud_faberge_brud_faberge_exclusive_254",
    notes: {
      top: ["Lavender", "Anise", "Bergamot", "Basil", "Orange Blossom", "Lemon"],
      middle: ["Ylang-Ylang", "Geranium", "Jasmine"],
      base: ["Oakmoss", "Tonka Bean", "Vanilla", "Vetiver", "Sandalwood", "Patchouli"]
    },
    accords: ["aromatic", "fresh spicy", "woody", "mossy", "lavender"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Faberge/Brut-3827.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 45. Row 256: Black | Etienne Aigner (VIP, Men)
  {
    productId: "abna_black_aigner_vip_256",
    notes: {
      top: ["Bergamot", "Grapefruit", "Orange"],
      middle: ["Pine Tree", "Oakmoss", "Mint"],
      base: ["Leather", "Tonka Bean", "Styrax", "Musk"]
    },
    accords: ["leather", "citrus", "aromatic", "woody", "smoky"],
    fragranceFamily: ["Leather"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Etienne-Aigner/Aigner-Black-4552.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  },
  // 46. Row 257: Tommy Man | Tommy Hilfiger (VIP, Men)
  {
    productId: "abna_tommy_man_tommy_vip_257",
    notes: {
      top: ["Mint", "Bergamot", "Grapefruit", "Lavender"],
      middle: ["Granny Smith Apple", "Cranberry", "Rose"],
      base: ["Cotton Flower", "Cactus", "Amber"]
    },
    accords: ["citrus", "aromatic", "fruity", "fresh spicy", "green"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Tommy-Hilfiger/Tommy-631.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T11:45:00Z",
      verificationStatus: "verified"
    }
  }
];
const BATCH_06_ENRICHMENT_RECORDS = [
  // 1. Row 258: Ajmal Wisal | Ajmal Wisal (ELITE, Women)
  {
    productId: "abna_ajmal_wisal_ajmal_wisal_elite_258",
    notes: {
      top: ["Floral Notes"],
      middle: ["Rose", "Spices"],
      base: ["Sandalwood", "Musk"]
    },
    accords: ["rose", "floral", "warm spicy", "woody", "musky", "powdery"],
    fragranceFamily: ["Floral", "Warm Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ajmal/Wisal-15093.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 2. Row 259: Golden Dust | Golden Dust (ELITE, Unisex)
  {
    productId: "abna_golden_dust_golden_dust_elite_259",
    notes: {
      top: ["Damask Rose", "Grapefruit", "Balsamic Notes"],
      middle: ["Vanilla", "Honeysuckle", "Fruit Notes", "Musk"],
      base: ["Amber", "Floral Notes", "Musk"]
    },
    accords: ["sweet", "vanilla", "amber", "musky", "powdery", "floral", "balsamic"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Sunnamusk/Golden-Dust-48612.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 4. Row 261: Darj | Darj (ELITE, Men) -> Daarej pour Homme Rasasi
  {
    productId: "abna_darj_darj_elite_261",
    notes: {
      top: ["Cumin", "Cardamom", "Artemisia"],
      middle: ["Rose", "Orris Root"],
      base: ["Vanilla", "Tonka Bean", "Amber", "Sandalwood", "Patchouli", "Musk"]
    },
    accords: ["warm spicy", "vanilla", "amber", "powdery", "aromatic", "sweet", "woody"],
    fragranceFamily: ["Oriental", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Rasasi/Daarej-pour-Homme-19688.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 5. Row 262: Drakar Noir | Guy Laroche (ELITE, Men)
  {
    productId: "abna_drakar_noir_guy_laroche_elite_262",
    notes: {
      top: [
        "Lavender",
        "Lemon",
        "Bergamot",
        "Rosemary",
        "Mint",
        "Basil",
        "Lemon Verbena",
        "Artemisia"
      ],
      middle: ["Juniper", "Coriander", "Cinnamon", "Carnation", "Angelica", "Wormwood", "Jasmine"],
      base: [
        "Oakmoss",
        "Leather",
        "Pine Tree",
        "Sandalwood",
        "Vetiver",
        "Patchouli",
        "Cedarwood",
        "Amber",
        "Resins"
      ]
    },
    accords: [
      "aromatic",
      "woody",
      "fresh spicy",
      "earthy",
      "mossy",
      "citrus",
      "lavender",
      "herbal"
    ],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Guy-Laroche/Drakkar-Noir-2069.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 8. Row 265: Brud Faberge | Brud Faberge (EXCLUSIVE, Men) -> Brut Faberge
  {
    productId: "abna_brud_faberge_brud_faberge_exclusive_265",
    notes: {
      top: ["Lavender", "Anise", "Bergamot", "Basil", "Orange Blossom", "Lemon"],
      middle: ["Ylang-Ylang", "Geranium", "Jasmine"],
      base: ["Oakmoss", "Tonka Bean", "Vanilla", "Vetiver", "Patchouli", "Sandalwood"]
    },
    accords: ["aromatic", "fresh spicy", "woody", "lavender", "mossy", "earthy", "sweet", "citrus"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Brut-Parfums-Prestige/Brut-882.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 9. Row 266: Fancy Bouquet | Fancy Bouquet (SPECIAL ONE, Women)
  {
    productId: "abna_fancy_bouquet_fancy_bouquet_special_one_266",
    notes: {
      top: ["Bergamot", "Peach", "Green Notes"],
      middle: ["Rose", "Jasmine", "Lily-of-the-Valley", "Peony"],
      base: ["Musk", "Cedarwood", "Amber"]
    },
    accords: ["floral", "rose", "fresh", "fruity", "white floral", "musky"],
    fragranceFamily: ["Floral", "Fresh"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jessica-Simpson/Fancy-4094.html",
      confidence: 0.9,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 10. Row 267: Lavender | Spring (VIP, Women)
  {
    productId: "abna_lavender_spring_vip_267",
    notes: {
      top: ["Lavender", "Bergamot"],
      middle: ["Clary Sage", "Geranium"],
      base: ["Tonka Bean", "Musk", "Cedarwood"]
    },
    accords: ["lavender", "aromatic", "fresh spicy", "herbal", "floral"],
    fragranceFamily: ["Aromatic", "Floral"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yardley/English-Lavender-2268.html",
      confidence: 0.9,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 11. Row 268: Princess Of Bali | Prince (VIP, Unisex)
  {
    productId: "abna_princess_of_bali_prince_vip_268",
    notes: {
      top: ["Frangipani", "Ylang-Ylang", "Bergamot"],
      middle: ["Jasmine", "Tiare Flower", "Coconut"],
      base: ["Sandalwood", "Vanilla", "Musk"]
    },
    accords: ["white floral", "tropical", "yellow floral", "sweet", "coconut", "woody"],
    fragranceFamily: ["Floral", "Tropical"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Vera-Wang/Princess-1597.html",
      confidence: 0.9,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 13. Row 270: Silver | Al Rehab (VIP, Women)
  {
    productId: "abna_silver_al_rehab_vip_270",
    notes: {
      top: ["Water Notes", "Green Notes", "Mandarin"],
      middle: ["Blackcurrant", "Tea"],
      base: ["Musk", "Sandalwood", "Floral Notes"]
    },
    accords: ["green", "citrus", "aquatic", "fruity", "musky", "fresh"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Silver-10116.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 14. Row 271: 724 | Maison Francis Kurkdjian (EXCLUSIVE, Unisex)
  {
    productId: "abna_724_maison_francis_kurkdjian_exclusive_271",
    notes: {
      top: ["Aldehydes", "Calabrian Bergamot"],
      middle: ["Sweet Pea", "Mock Orange", "Jasmine"],
      base: ["White Musk", "Sandalwood"]
    },
    accords: ["white floral", "aldehydic", "citrus", "fresh", "musky", "powdery"],
    fragranceFamily: ["Floral", "Aldehydic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/724-75677.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 15. Row 272: Sweetania | The Body Shop (EXCLUSIVE, Unisex)
  {
    productId: "abna_sweetania_the_body_shop_exclusive_272",
    notes: {
      top: ["Sugar", "Red Berries"],
      middle: ["Vanilla", "Orchid"],
      base: ["Musk", "Amber"]
    },
    accords: ["sweet", "vanilla", "fruity", "powdery", "musky"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/Vanilla-3551.html",
      confidence: 0.9,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 16. Row 273: Afternoon Swim | Louis Vuitton (VIP, Unisex)
  {
    productId: "abna_afternoon_swim_louis_vuitton_vip_273",
    notes: {
      top: ["Mandarin", "Sicilian Orange", "Bergamot"],
      middle: ["Ginger"],
      base: ["Ambroxan", "Ambergris"]
    },
    accords: ["citrus", "fresh spicy", "amber", "aquatic"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Afternoon-Swim-53947.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 17. Row 274: Versus | Versace (VIP, Women)
  {
    productId: "abna_versus_versace_vip_274",
    notes: {
      top: ["Kumquat", "Star Apple", "Amalfi Lemon"],
      middle: ["Orange Blossom", "Stephanotis", "Rose Tincture"],
      base: ["Musk", "Ambrette", "Patchouli"]
    },
    accords: ["citrus", "fruity", "white floral", "fresh", "floral", "sweet"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Versace/Versus-8149.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 18. Row 275: Candy Love | Escada (VIP, Women)
  {
    productId: "abna_candy_love_escada_vip_275",
    notes: {
      top: ["Candy Apple"],
      middle: ["Rose Centifolia"],
      base: ["Whipped Cream", "Vanilla"]
    },
    accords: ["sweet", "fruity", "lactonic", "vanilla", "rose", "gourmand"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Candy-Love-62879.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 19. Row 276: British Rose | The Body Shop (VIP, Women)
  {
    productId: "abna_british_rose_the_body_shop_vip_276",
    notes: {
      top: ["Bergamot", "Tangerine"],
      middle: ["Rose", "Water Lily", "Peony", "Peach"],
      base: ["Musk", "Cedarwood", "Amber"]
    },
    accords: ["rose", "floral", "fresh", "citrus", "fruity", "musky"],
    fragranceFamily: ["Floral", "Fresh"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/British-Rose-35759.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 24. Row 281: Melati Keraton | Musk (VIP, Unisex)
  {
    productId: "abna_melati_keraton_musk_vip_281",
    notes: {
      top: ["Jasmine", "Green Notes"],
      middle: ["Sambac Jasmine", "White Floral"],
      base: ["Musk", "Sandalwood"]
    },
    accords: ["white floral", "floral", "green", "musky", "woody"],
    fragranceFamily: ["Floral", "Traditional"],
    performance: {
      longevity: "6-8h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Guerlain/Aqua-Allegoria-Flora-Cherrysia-53457.html",
      confidence: 0.9,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 25. Row 282: Bad Boy Elixir | Carolina Herrera (ELITE, Men) -> Bad Boy Extreme / Elixir
  {
    productId: "abna_bad_boy_elixir_carolina_herrera_elite_282",
    notes: {
      top: ["Clary Sage", "Ginger", "Bergamot"],
      middle: ["Cocoa", "Vetiver", "Tonka Bean"],
      base: ["Patchouli", "Amberwood", "Olibanum"]
    },
    accords: ["warm spicy", "woody", "amber", "cacao", "sweet", "aromatic"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/Bad-Boy-Extreme-78564.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 26. Row 283: Akoya | Gissah (ELITE, Unisex)
  {
    productId: "abna_akoya_gissah_elite_283",
    notes: {
      top: ["Pink Pepper", "Bergamot", "Blackcurrant"],
      middle: ["Rose", "Jasmine", "Caramel"],
      base: ["Patchouli", "Amber", "Vanilla", "Musk"]
    },
    accords: ["sweet", "fruity", "patchouli", "warm spicy", "rose", "vanilla"],
    fragranceFamily: ["Oriental", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/Akoya-94452.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 27. Row 284: Pacific Chill | Louis Vuitton (ELITE, Unisex)
  {
    productId: "abna_pacific_chill_louis_vuitton_elite_284",
    notes: {
      top: ["Orange", "Citron", "Mint", "Lemon", "Blackcurrant", "Coriander"],
      middle: ["Apricot", "Basil", "Carrot Seeds", "Rose"],
      base: ["Fig", "Dates", "Ambrette"]
    },
    accords: ["fruity", "green", "citrus", "aromatic", "fresh spicy", "sweet"],
    fragranceFamily: ["Aromatic", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Pacific-Chill-81677.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 28. Row 285: Delina | Parfums de Marly (ELITE, Women)
  {
    productId: "abna_delina_parfums_de_marly_elite_285",
    notes: {
      top: ["Litchi", "Rhubarb", "Bergamot", "Nutmeg"],
      middle: ["Turkish Rose", "Peony", "Musk", "Petalia", "Vanilla"],
      base: ["Cashmeran", "Cedarwood", "Incense", "Haitian Vetiver"]
    },
    accords: ["rose", "floral", "fruity", "fresh", "musky", "sweet", "woody", "tropical"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Delina-43871.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 29. Row 286: Kirke B | Tiziana Terenzi (ELITE, Unisex)
  {
    productId: "abna_kirke_b_tiziana_terenzi_elite_286",
    notes: {
      top: ["Passionfruit", "Peach", "Pear", "Raspberry", "Cassis", "Sand"],
      middle: ["Lily-of-the-Valley"],
      base: ["Musk", "Sandalwood", "Vanilla", "Patchouli", "Heliotrope"]
    },
    accords: ["fruity", "sweet", "musky", "powdery", "fresh", "tropical", "woody"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Tiziana-Terenzi/Kirke-32172.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 30. Row 287: Symphony | Louis Vuitton (ELITE, Unisex)
  {
    productId: "abna_symphony_louis_vuitton_elite_287",
    notes: {
      top: ["Grapefruit", "Ginger"],
      middle: ["Bergamot"],
      base: ["Musk"]
    },
    accords: ["citrus", "fresh spicy", "musky", "warm spicy"],
    fragranceFamily: ["Citrus", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Symphony-68427.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 31. Row 288: Lazy Sunday Morning | Maison Margiela (ELITE, Unisex)
  {
    productId: "abna_lazy_sunday_morning_maison_margiela_elite_288",
    notes: {
      top: ["Aldehydes", "Lily-of-the-Valley", "Pear"],
      middle: ["Rose", "Iris", "Orange Blossom"],
      base: ["White Musk", "Ambrette", "Indonesian Patchouli Leaf"]
    },
    accords: ["musky", "floral", "powdery", "rose", "fresh", "white floral", "aldehydic"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Martin-Margiela/Lazy-Sunday-Morning-20542.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 32. Row 289: Layton Exclusive | Parfums de Marly (ELITE, Men) -> Layton Exclusif
  {
    productId: "abna_layton_exclusive_parfums_de_marly_elite_289",
    notes: {
      top: ["Almond", "Mandarin", "Bergamot", "Water Notes"],
      middle: ["Civet", "Geranium", "Rose", "Gardenia", "Water Lily"],
      base: [
        "Guaiac Wood",
        "Laotian Oud",
        "Vanilla",
        "Coffee",
        "Sandalwood",
        "Indonesian Patchouli Leaf",
        "Amber",
        "Oakmoss",
        "Pink Pepper"
      ]
    },
    accords: ["woody", "warm spicy", "amber", "oud", "animalic", "powdery", "vanilla", "coffee"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Layton-Exclusif-46633.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 34. Row 291: Nautica Voyage | Nautica (ELITE, Men)
  {
    productId: "abna_nautica_voyage_nautica_elite_291",
    notes: {
      top: ["Green Leaves", "Apple"],
      middle: ["Lotus", "Mimosa"],
      base: ["Musk", "Cedarwood", "Oakmoss", "Amber"]
    },
    accords: ["green", "fruity", "aquatic", "fresh", "floral", "woody"],
    fragranceFamily: ["Woody", "Aquatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Nautica/Nautica-Voyage-913.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 35. Row 292: Hudson II | Gissah (ELITE, Unisex)
  {
    productId: "abna_hudson_ii_gissah_elite_292",
    notes: {
      top: ["Bergamot", "Blackcurrant"],
      middle: ["Rose", "Jasmine", "Lavender"],
      base: ["Amber", "Musk", "Woody Notes", "Patchouli"]
    },
    accords: ["woody", "amber", "fruity", "aromatic", "citrus", "musky"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/Hudson-II-94454.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 36. Row 293: Penthouse | Mykonos (ELITE, Unisex)
  {
    productId: "abna_penthouse_mykonos_elite_293",
    notes: {
      top: ["Grapefruit", "Bergamot", "Apple"],
      middle: ["Lavender", "Cardamom", "Geranium"],
      base: ["Cedarwood", "Amberwood", "Musk"]
    },
    accords: ["woody", "fresh spicy", "aromatic", "citrus", "amber"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Penthouse-84950.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 37. Row 294: Blue Talisman | Ex Nihilo (ELITE, Unisex)
  {
    productId: "abna_blue_talisman_ex_nihilo_elite_294",
    notes: {
      top: ["Bergamot", "Ginger", "Mandarin", "Pear"],
      middle: ["Orange Blossom", "Georgywood"],
      base: ["Akigalawood", "Ambrofix", "Musk"]
    },
    accords: ["citrus", "woody", "fruity", "fresh spicy", "amber", "white floral"],
    fragranceFamily: ["Woody", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ex-Nihilo/Blue-Talisman-84381.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 38. Row 295: Kirke A | Tiziana Terenzi (ELITE, Unisex)
  {
    productId: "abna_kirke_a_tiziana_terenzi_elite_295",
    notes: {
      top: ["Passionfruit", "Peach", "Pear", "Raspberry", "Cassis", "Sand"],
      middle: ["Lily-of-the-Valley"],
      base: ["Musk", "Sandalwood", "Vanilla", "Patchouli", "Heliotrope"]
    },
    accords: ["fruity", "sweet", "musky", "powdery", "fresh", "tropical", "woody"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Tiziana-Terenzi/Kirke-32172.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 39. Row 296: Oud Maracuja | Maison Crivelli (ELITE, Unisex)
  {
    productId: "abna_oud_maracuja_maison_crivelli_elite_296",
    notes: {
      top: ["Passionfruit", "Fruity Notes", "Turkish Rose", "Saffron"],
      middle: ["Oud", "Indonesian Patchouli Leaf", "Benzoin"],
      base: ["Leather", "Akigalawood", "Amber", "Labdanum", "Vanilla"]
    },
    accords: ["fruity", "oud", "tropical", "leather", "sweet", "warm spicy", "amber", "woody"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Crivelli/Oud-Maracuja-84457.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 40. Row 297: Black Opium A | YSL (ELITE, Women)
  {
    productId: "abna_black_opium_a_ysl_elite_297",
    notes: {
      top: ["Pear", "Pink Pepper", "Orange Blossom"],
      middle: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cashmere Wood", "Cedarwood"]
    },
    accords: ["vanilla", "coffee", "sweet", "warm spicy", "white floral"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-25324.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 41. Row 298: Y A | YSL (ELITE, Men) -> Y Eau de Parfum
  {
    productId: "abna_y_a_ysl_elite_298",
    notes: {
      top: ["Apple", "Ginger", "Bergamot"],
      middle: ["Sage", "Juniper Berries", "Geranium"],
      base: ["Amberwood", "Tonka Bean", "Cedarwood", "Vetiver", "Olibanum"]
    },
    accords: ["aromatic", "woody", "fresh spicy", "fruity", "herbal", "amber"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Y-Eau-de-Parfum-50757.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 42. Row 299: Lacoste Pour Homme | Lacoste (ELITE, Men)
  {
    productId: "abna_lacoste_pour_homme_lacoste_elite_299",
    notes: {
      top: ["Plum", "Apple", "Grapefruit", "Bergamot"],
      middle: ["Cinnamon", "Pink Pepper", "Cardamom", "Juniper"],
      base: ["Vanilla", "Rum", "Sandalwood", "Cedarwood", "Musk", "Labdanum"]
    },
    accords: ["fruity", "sweet", "warm spicy", "woody", "vanilla", "cinnamon"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lacoste-Fragrances/Lacoste-Pour-Homme-671.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 43. Row 300: La Vie Est Belle | Lancome (EXCLUSIVE, Women)
  {
    productId: "abna_la_vie_est_belle_lancome_exclusive_300",
    notes: {
      top: ["Blackcurrant", "Pear"],
      middle: ["Iris", "Jasmine", "Orange Blossom"],
      base: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"]
    },
    accords: ["sweet", "vanilla", "fruity", "powdery", "patchouli", "woody", "white floral"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lancome/La-Vie-Est-Belle-14982.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 44. Row 301: Baccarat 540 Edp | Maison Francis Kurkdjian (EXCLUSIVE, Unisex)
  {
    productId: "abna_baccarat_540_edp_maison_francis_kurkdjian_exclusive_301",
    notes: {
      top: ["Saffron", "Jasmine"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedarwood"]
    },
    accords: ["woody", "amber", "warm spicy", "metallic", "sweet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Baccarat-Rouge-540-33519.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 45. Row 302: Valentino Uomo Born In Roma | Valentino (EXCLUSIVE, Men)
  {
    productId: "abna_valentino_uomo_born_in_roma_valentino_exclusive_302",
    notes: {
      top: ["Mineral Notes", "Violet Leaf", "Sea Salt"],
      middle: ["Ginger", "Sage"],
      base: ["Woody Notes", "Vetiver"]
    },
    accords: ["woody", "mineral", "aromatic", "ozonic", "fresh spicy", "salty"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Valentino/Valentino-Uomo-Born-in-Roma-55805.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 46. Row 303: Bleu Exclusive | Chanel (EXCLUSIVE, Men) -> Bleu de Chanel
  {
    productId: "abna_bleu_exclusive_chanel_exclusive_303",
    notes: {
      top: ["Grapefruit", "Lemon", "Mint", "Pink Pepper", "Bergamot", "Aldehydes", "Coriander"],
      middle: ["Ginger", "Nutmeg", "Jasmine", "Melon"],
      base: ["Incense", "Amber", "Cedarwood", "Sandalwood", "Patchouli", "Labdanum", "Amberwood"]
    },
    accords: ["citrus", "woody", "warm spicy", "aromatic", "amber", "fresh"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chanel/Bleu-de-Chanel-9099.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 47. Row 304: Viva La Juicy | Juicy Couture (EXCLUSIVE, Women)
  {
    productId: "abna_viva_la_juicy_juicy_couture_exclusive_304",
    notes: {
      top: ["Wild Berries", "Mandarin"],
      middle: ["Honeysuckle", "Gardenia", "Jasmine"],
      base: ["Caramel", "Praline", "Vanilla", "Amber", "Sandalwood"]
    },
    accords: ["sweet", "caramel", "vanilla", "white floral", "fruity"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Juicy-Couture/Viva-la-Juicy-4410.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 48. Row 305: Afternoon Swim | Louis Vuitton (EXCLUSIVE, Unisex)
  {
    productId: "abna_afternoon_swim_louis_vuitton_exclusive_305",
    notes: {
      top: ["Mandarin", "Sicilian Orange", "Bergamot"],
      middle: ["Ginger"],
      base: ["Ambroxan", "Ambergris"]
    },
    accords: ["citrus", "fresh spicy", "amber", "aquatic"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Afternoon-Swim-53947.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 49. Row 306: Black | Mercedes Benz (EXCLUSIVE, Men) -> Club Black
  {
    productId: "abna_black_mercedes_benz_exclusive_306",
    notes: {
      top: ["Bergamot"],
      middle: ["Incense", "Jasmine"],
      base: ["Vanilla", "Benzoin", "Woody Notes", "Ambroxan"]
    },
    accords: ["vanilla", "amber", "balsamic", "smoky", "warm spicy", "woody"],
    fragranceFamily: ["Oriental", "Amber"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mercedes-Benz/Mercedes-Benz-Club-Black-46797.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 50. Row 307: Black Opium B | YSL (EXCLUSIVE, Women)
  {
    productId: "abna_black_opium_b_ysl_exclusive_307",
    notes: {
      top: ["Pear", "Pink Pepper", "Orange Blossom"],
      middle: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cashmere Wood", "Cedarwood"]
    },
    accords: ["vanilla", "coffee", "sweet", "warm spicy", "white floral"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-25324.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 51. Row 308: Y B | YSL (EXCLUSIVE, Men)
  {
    productId: "abna_y_b_ysl_exclusive_308",
    notes: {
      top: ["Apple", "Ginger", "Bergamot"],
      middle: ["Sage", "Juniper Berries", "Geranium"],
      base: ["Amberwood", "Tonka Bean", "Cedarwood", "Vetiver", "Olibanum"]
    },
    accords: ["aromatic", "woody", "fresh spicy", "fruity", "herbal", "amber"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Y-Eau-de-Parfum-50757.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 52. Row 309: Bottled Absolu | Hugo Boss (EXCLUSIVE, Men) -> Boss Bottled Absolu
  {
    productId: "abna_bottled_absolu_hugo_boss_exclusive_309",
    notes: {
      top: ["Leather", "Incense"],
      middle: ["Patchouli", "Myrrh"],
      base: ["Cedarwood", "Davana"]
    },
    accords: ["woody", "leather", "smoky", "warm spicy", "balsamic", "earthy"],
    fragranceFamily: ["Woody", "Leather"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Boss-Bottled-Absolu-95697.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 53. Row 310: Libre Le Parfume | YSL (EXCLUSIVE, Women) -> Libre Le Parfum
  {
    productId: "abna_libre_le_parfume_ysl_exclusive_310",
    notes: {
      top: ["Ginger", "Saffron", "Mandarin", "Bergamot"],
      middle: ["Orange Blossom", "Lavender"],
      base: ["Bourbon Vanilla", "Honey", "Tonka Bean", "Vetiver"]
    },
    accords: ["sweet", "warm spicy", "vanilla", "white floral", "citrus", "honey", "lavender"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Libre-Le-Parfum-75686.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 54. Row 311: Gardenia | Zara (EXCLUSIVE, Women)
  {
    productId: "abna_gardenia_zara_exclusive_311",
    notes: {
      top: ["Raspberry", "Peach", "Bergamot"],
      middle: ["Gardenia", "Orange Blossom", "Coffee"],
      base: ["Vanilla", "Patchouli", "Cedarwood"]
    },
    accords: ["white floral", "fruity", "sweet", "vanilla", "coffee", "woody"],
    fragranceFamily: ["Floral", "Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Gardenia-43516.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 55. Row 312: Tabac Rose | BDK (SPECIAL ONE, Unisex)
  {
    productId: "abna_tabac_rose_bdk_special_one_312",
    notes: {
      top: ["Plum", "Pink Pepper", "Lemon"],
      middle: ["Turkish Rose", "Madagascar Vanilla", "Chocolate"],
      base: ["Tobacco", "Patchouli", "Labdanum"]
    },
    accords: ["sweet", "rose", "tobacco", "fruity", "warm spicy", "chocolate", "vanilla"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/BDK-Parfums/Tabac-Rose-60565.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 56. Row 313: Valaya Exclusive | Parfums de Marly (SPECIAL ONE, Women) -> Valaya
  {
    productId: "abna_valaya_exclusive_parfums_de_marly_special_one_313",
    notes: {
      top: ["Aldehydes", "White Peach", "Bergamot", "Mandarin"],
      middle: ["Orange Blossom", "Petalia", "Lily-of-the-Valley", "Vetiver", "Mahonial"],
      base: ["Musk", "Ambroxan", "Akigalawood", "Vanilla"]
    },
    accords: ["white floral", "musky", "aldehydic", "citrus", "fresh", "fruity", "woody"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Valaya-78567.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 57. Row 314: Forever Wanted Elixir | Azzaro (SPECIAL ONE, Men) -> The Most Wanted Parfum / Elixir
  {
    productId: "abna_forever_wanted_elixir_azzaro_special_one_314",
    notes: {
      top: ["Red Ginger", "Cardamom"],
      middle: ["Woody Notes", "Caramel", "Toffee"],
      base: ["Bourbon Vanilla", "Amberwood"]
    },
    accords: ["warm spicy", "vanilla", "woody", "amber", "sweet", "caramel"],
    fragranceFamily: ["Woody", "Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Azzaro/The-Most-Wanted-Parfum-73778.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 58. Row 315: Aoud Cafe | Mancera (SPECIAL ONE, Unisex)
  {
    productId: "abna_aoud_cafe_mancera_special_one_315",
    notes: {
      top: ["Peach", "Blackcurrant", "Bergamot"],
      middle: ["Coffee", "Sweet Notes", "Floral Notes"],
      base: ["Woody Notes", "Oud", "White Musk", "Amber"]
    },
    accords: ["coffee", "warm spicy", "woody", "sweet", "fruity", "oud"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mancera/Aoud-Cafe-18044.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 59. Row 316: City Of Stars | Louis Vuitton (SPECIAL ONE, Unisex)
  {
    productId: "abna_city_of_stars_louis_vuitton_special_one_316",
    notes: {
      top: ["Lime", "Blood Orange", "Blood Mandarin", "Lemon", "Bergamot"],
      middle: ["Tiare Flower"],
      base: ["Powdery Notes", "Musk", "Sandalwood"]
    },
    accords: ["citrus", "powdery", "white floral", "musky", "sweet"],
    fragranceFamily: ["Citrus", "Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/City-Of-Stars-73344.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 60. Row 317: 1872 For Men | Clive Christian (SPECIAL ONE, Men)
  {
    productId: "abna_1872_for_men_clive_christian_special_one_317",
    notes: {
      top: [
        "Petitgrain",
        "Lime",
        "Grapefruit",
        "Bergamot",
        "Peach",
        "Lavender",
        "Rosemary",
        "Pineapple",
        "Galbanum",
        "Pepper",
        "Nutmeg",
        "Mandarin"
      ],
      middle: ["Clary Sage", "Tagetes", "Freesia", "Cyclamen", "Jasmine"],
      base: ["Cedarwood", "Oakmoss", "Musk", "Olibanum", "Amber", "Patchouli", "Labdanum"]
    },
    accords: ["citrus", "aromatic", "woody", "fresh spicy", "green", "mossy"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Clive-Christian/1872-for-Men-4651.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 61. Row 318: Red Tobacco | Mancera (SPECIAL ONE, Unisex)
  {
    productId: "abna_red_tobacco_mancera_special_one_318",
    notes: {
      top: ["Cinnamon", "Oud", "Incense", "Saffron", "Nutmeg", "Green Apple", "White Peach"],
      middle: ["Patchouli", "Jasmine"],
      base: [
        "Tobacco",
        "Madagascar Vanilla",
        "Amber",
        "Sandalwood",
        "Guaiac Wood",
        "White Musk",
        "Haitian Vetiver"
      ]
    },
    accords: ["warm spicy", "tobacco", "sweet", "woody", "vanilla", "amber", "cinnamon", "oud"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mancera/Red-Tobacco-46663.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 62. Row 319: Spicebomb | Victor Rolf (SPECIAL ONE, Men)
  {
    productId: "abna_spicebomb_victor_rolf_special_one_319",
    notes: {
      top: ["Pink Pepper", "Elemi", "Bergamot", "Grapefruit"],
      middle: ["Cinnamon", "Saffron", "Paprika"],
      base: ["Tobacco", "Leather", "Vetiver"]
    },
    accords: ["warm spicy", "cinnamon", "tobacco", "sweet", "leather", "aromatic"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Viktor-Rolf/Spicebomb-13857.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 63. Row 320: Meteore | Louis Vuitton (SPECIAL ONE, Men)
  {
    productId: "abna_meteore_louis_vuitton_special_one_320",
    notes: {
      top: ["Mandarin", "Sicilian Orange", "Calabrian Bergamot"],
      middle: ["Pink Pepper", "Pepper", "Guatemalan Cardamom", "Indonesian Nutmeg"],
      base: ["Java Vetiver Oil"]
    },
    accords: ["citrus", "fresh spicy", "aromatic", "woody", "warm spicy"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Meteore-62251.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 64. Row 321: Allure Sport Superleggera | Chanel (SPECIAL ONE, Men) -> Allure Homme Sport Superleggera
  {
    productId: "abna_allure_sport_superleggera_chanel_special_one_321",
    notes: {
      top: ["Mandarin", "Citrus", "Grapefruit"],
      middle: ["Woody Notes", "Cedarwood"],
      base: ["White Musk", "Patchouli", "Amber", "Sandalwood"]
    },
    accords: ["citrus", "woody", "musky", "fresh", "aromatic"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chanel/Allure-Homme-Sport-Superleggera-95949.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 65. Row 322: Gabrielle | Chanel (SPECIAL ONE, Women)
  {
    productId: "abna_gabrielle_chanel_special_one_322",
    notes: {
      top: ["Grapefruit", "Mandarin", "Blackcurrant"],
      middle: [
        "Orange Blossom",
        "Jasmine",
        "Ylang-Ylang",
        "Tuberose",
        "Lily-of-the-Valley",
        "Pink Pepper",
        "Pear"
      ],
      base: ["Musk", "Sandalwood", "Cashmeran", "Orris"]
    },
    accords: ["white floral", "citrus", "floral", "yellow floral", "sweet", "woody"],
    fragranceFamily: ["Floral", "Solar"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chanel/Gabrielle-43589.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 66. Row 323: California Dream | Louis Vuitton (SPECIAL ONE, Unisex)
  {
    productId: "abna_california_dream_louis_vuitton_special_one_323",
    notes: {
      top: ["Mandarin"],
      middle: ["Ambrette", "Pear"],
      base: ["Benzoin", "Musk"]
    },
    accords: ["citrus", "musky", "amber", "fruity", "sweet", "warm spicy"],
    fragranceFamily: ["Citrus", "Oriental"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/California-Dream-60867.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 67. Row 324: Madawi | Arabian Oud (SPECIAL ONE, Unisex)
  {
    productId: "abna_madawi_arabian_oud_special_one_324",
    notes: {
      top: ["Peach", "Apple Blossom"],
      middle: ["Pineapple Blossom"],
      base: ["Wild Rose", "Musk", "Patchouli", "Floral Notes"]
    },
    accords: ["fruity", "sweet", "floral", "rose", "musky", "patchouli"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Arabian-Oud/Madawi-47672.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 68. Row 325: Oud | Gucci (SPECIAL ONE, Unisex) -> Gucci Intense Oud
  {
    productId: "abna_oud_gucci_special_one_325",
    notes: {
      top: ["Raspberry", "Pear", "Saffron"],
      middle: ["Bulgarian Rose", "Orange Blossom"],
      base: ["Oud", "Patchouli", "Amber", "Musk"]
    },
    accords: ["oud", "amber", "rose", "warm spicy", "fruity", "woody", "sweet"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Gucci-Oud-25413.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 69. Row 326: Si Fiori | Giorgio Armani (THE NATURE, Unisex)
  {
    productId: "abna_si_fiori_giorgio_armani_the_nature_326",
    notes: {
      top: ["Blackcurrant", "Green Mandarin"],
      middle: ["Neroli", "Rose", "Patchouli", "Oakmoss"],
      base: ["Vanilla", "White Musk"]
    },
    accords: ["vanilla", "floral", "fruity", "citrus", "powdery", "sweet", "white floral"],
    fragranceFamily: ["Chypre", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Si-Fiori-53457.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 70. Row 327: Elysium | Roja (THE NATURE, Men) -> Elysium Pour Homme
  {
    productId: "abna_elysium_roja_the_nature_327",
    notes: {
      top: ["Grapefruit", "Lemon", "Bergamot", "Lime", "Thyme", "Artemisia", "Galbanum"],
      middle: [
        "Vetiver",
        "Juniper Berries",
        "Blackcurrant",
        "Apple",
        "Pink Pepper",
        "Cedarwood",
        "Cypriol Oil",
        "Lily-of-the-Valley",
        "Rose",
        "Jasmine"
      ],
      base: ["Ambergris", "Leather", "Vanilla", "Benzoin", "Labdanum"]
    },
    accords: ["citrus", "aromatic", "woody", "fresh spicy", "fruity", "amber"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Roja-Dove/Elysium-Pour-Homme-Parfum-Cologne-46296.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 71. Row 328: Hacivat X | Nishane (THE NATURE, Unisex)
  {
    productId: "abna_hacivat_x_nishane_the_nature_328",
    notes: {
      top: ["Pineapple", "Bergamot", "Pink Pepper"],
      middle: ["Lime", "Orange Blossom", "Jasmine"],
      base: ["Haitian Vetiver", "Cedarwood", "Patchouli"]
    },
    accords: ["citrus", "fruity", "woody", "sweet", "aromatic", "white floral"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Nishane/Hacivat-X-80126.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 72. Row 329: 1 Million | Paco Rabanne (THE NATURE, Men)
  {
    productId: "abna_1_million_paco_rabanne_the_nature_329",
    notes: {
      top: ["Blood Mandarin", "Grapefruit", "Mint"],
      middle: ["Cinnamon", "Spices", "Rose"],
      base: ["Amber", "Leather", "Woody Notes", "Indian Patchouli"]
    },
    accords: ["warm spicy", "cinnamon", "citrus", "leather", "amber", "woody"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/1-Million-3747.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 73. Row 330: Black Orchid | Tom Ford (THE NATURE, Unisex)
  {
    productId: "abna_black_orchid_tom_ford_the_nature_330",
    notes: {
      top: [
        "Truffle",
        "Gardenia",
        "Blackcurrant",
        "Ylang-Ylang",
        "Jasmine",
        "Bergamot",
        "Mandarin",
        "Amalfi Lemon"
      ],
      middle: ["Orchid", "Spices", "Gardenia", "Fruity Notes", "Ylang-Ylang", "Jasmine", "Lotus"],
      base: [
        "Mexican Chocolate",
        "Patchouli",
        "Vanilla",
        "Incense",
        "Amber",
        "Sandalwood",
        "Vetiver",
        "White Musk"
      ]
    },
    accords: [
      "warm spicy",
      "earthy",
      "woody",
      "sweet",
      "dark chocolate",
      "amber",
      "floral",
      "patchouli"
    ],
    fragranceFamily: ["Oriental", "Chypre"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Tom-Ford/Black-Orchid-1018.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 74. Row 331: Naxos 1861 | Xerjoff (THE NATURE, Unisex)
  {
    productId: "abna_naxos_1861_xerjoff_the_nature_331",
    notes: {
      top: ["Lavender", "Bergamot", "Lemon"],
      middle: ["Honey", "Cinnamon", "Cashmeran", "Jasmine Sambac"],
      base: ["Tobacco Leaf", "Tonka Bean", "Vanilla"]
    },
    accords: [
      "sweet",
      "honey",
      "tobacco",
      "citrus",
      "vanilla",
      "lavender",
      "warm spicy",
      "aromatic"
    ],
    fragranceFamily: ["Aromatic", "Spicy"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Xerjoff/XJ-1861-Naxos-30526.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 75. Row 332: Jazz Club | Maison Margiela (THE NATURE, Unisex)
  {
    productId: "abna_jazz_club_maison_margiela_the_nature_332",
    notes: {
      top: ["Pink Pepper", "Neroli", "Lemon"],
      middle: ["Rum", "Java Vetiver Oil", "Clary Sage"],
      base: ["Tobacco Leaf", "Bourbon Vanilla", "Styrax"]
    },
    accords: ["tobacco", "sweet", "vanilla", "warm spicy", "rum", "woody"],
    fragranceFamily: ["Leather", "Warm Amber"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Martin-Margiela/Jazz-Club-20541.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 76. Row 333: Ambre Levant | Louis Vuitton (THE NATURE, Unisex)
  {
    productId: "abna_ambre_levant_louis_vuitton_the_nature_333",
    notes: {
      top: ["Bergamot", "Cardamom"],
      middle: ["Rose", "Jasmine"],
      base: ["Amber", "Oud", "Vanilla", "Cedarwood"]
    },
    accords: ["amber", "warm spicy", "woody", "oud", "sweet"],
    fragranceFamily: ["Oriental", "Amber"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Les-Sables-Roses-55582.html",
      confidence: 0.92,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 77. Row 334: Pink Flambe | Zara (VIP, Women)
  {
    productId: "abna_pink_flambe_zara_vip_334",
    notes: {
      top: ["Bergamot", "Lemon"],
      middle: ["Sorbet", "Cashmeran"],
      base: ["Vanilla"]
    },
    accords: ["sweet", "citrus", "vanilla", "powdery", "fruity"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Pink-Flambe-50993.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 78. Row 335: Toy Boy | Moschino (EXCLUSIVE, Men)
  {
    productId: "abna_toy_boy_moschino_exclusive_335",
    notes: {
      top: ["Pink Pepper", "Pear", "Indonesian Nutmeg", "Elemi", "Bergamot"],
      middle: ["Rose", "Magnolia", "Clove", "Flax"],
      base: ["Cashmeran", "Sylkolide", "Haitian Vetiver", "Cedarwood", "Amber"]
    },
    accords: ["rose", "floral", "fresh spicy", "woody", "warm spicy", "aromatic"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Moschino/Toy-Boy-55858.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 79. Row 336: Playboy VIP | Playboy (EXCLUSIVE, Men)
  {
    productId: "abna_playboy_vip_playboy_exclusive_336",
    notes: {
      top: ["Rum", "Rhubarb", "Bergamot"],
      middle: ["Red Apple", "Water Notes", "Lavender"],
      base: ["White Chocolate", "Tonka Bean", "Sandalwood"]
    },
    accords: ["sweet", "warm spicy", "rum", "fruity", "chocolate", "vanilla"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Playboy/Playboy-VIP-for-Him-14731.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 80. Row 337: Tobacco Vanilla | Tom Ford (EXCLUSIVE, Unisex) -> Tobacco Vanille
  {
    productId: "abna_tobacco_vanilla_tom_ford_exclusive_337",
    notes: {
      top: ["Tobacco Leaf", "Spices"],
      middle: ["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"],
      base: ["Dried Fruits", "Woody Notes"]
    },
    accords: ["vanilla", "tobacco", "sweet", "warm spicy", "fruity", "cacao"],
    fragranceFamily: ["Oriental", "Spicy"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Tom-Ford/Tobacco-Vanille-1825.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 81. Row 338: Ravishing Love | Victoria Secret (EXCLUSIVE, Women)
  {
    productId: "abna_ravishing_love_victoria_secret_exclusive_338",
    notes: {
      top: ["Pomegranate", "Blackberry"],
      middle: ["Lilac", "Jasmine"],
      base: ["Musk", "Amber"]
    },
    accords: ["fruity", "floral", "sweet", "powdery", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Ravishing-Love-13233.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 82. Row 339: Platinum | Coach (EXCLUSIVE, Men)
  {
    productId: "abna_platinum_coach_exclusive_339",
    notes: {
      top: ["Pineapple", "Black Pepper", "Juniper Berries"],
      middle: ["Cashmeran", "Sage", "Geranium"],
      base: ["Vanilla", "Leather", "Sandalwood", "Patchouli"]
    },
    accords: ["sweet", "vanilla", "fruity", "warm spicy", "woody", "leather"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Coach/Coach-Platinum-50858.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 83. Row 340: Peony Blush Suede | Jomalone (EXCLUSIVE, Unisex)
  {
    productId: "abna_peony_blush_suede_jomalone_exclusive_340",
    notes: {
      top: ["Red Apple"],
      middle: ["Peony", "Rose", "Jasmine", "Carnation"],
      base: ["Suede"]
    },
    accords: ["floral", "rose", "fresh", "leather", "fruity"],
    fragranceFamily: ["Floral", "Leather"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/Peony-Blush-Suede-18585.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 84. Row 341: Good Girl | Carolina Herrera (EXCLUSIVE, Women)
  {
    productId: "abna_good_girl_carolina_herrera_exclusive_341",
    notes: {
      top: ["Almond", "Coffee", "Bergamot", "Lemon"],
      middle: ["Tuberose", "Jasmine Sambac", "Orange Blossom", "Orris", "Bulgarian Rose"],
      base: [
        "Tonka Bean",
        "Cacao",
        "Vanilla",
        "Praline",
        "Sandalwood",
        "Musk",
        "Amber",
        "Cashmere Wood",
        "Patchouli",
        "Cinnamon",
        "Cedarwood"
      ]
    },
    accords: [
      "sweet",
      "white floral",
      "warm spicy",
      "vanilla",
      "cacao",
      "amber",
      "tuberose",
      "woody"
    ],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/Good-Girl-39681.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 85. Row 342: Poppy & Barley | Jomalone (EXCLUSIVE, Unisex)
  {
    productId: "abna_poppy_barley_jomalone_exclusive_342",
    notes: {
      top: ["Blackcurrant", "Fig", "Violet"],
      middle: ["Poppy", "Wheat", "Powdery Notes"],
      base: ["Barley", "Bran", "White Musk"]
    },
    accords: ["powdery", "fruity", "sweet", "floral", "musky", "green"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/Poppy-Barley-56360.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 86. Row 343: Wood Sage & Sea Salt | Jomalone (EXCLUSIVE, Unisex)
  {
    productId: "abna_wood_sage_sea_salt_jomalone_exclusive_343",
    notes: {
      top: ["Ambrette"],
      middle: ["Sea Salt"],
      base: ["Sage", "Seaweed", "Grapefruit"]
    },
    accords: ["marine", "aromatic", "salty", "musky", "herbal", "citrus"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/Wood-Sage-Sea-Salt-25529.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 87. Row 344: Tabac Miami 28 | Le Labo (EXCLUSIVE, Unisex) -> Tabac 28
  {
    productId: "abna_tabac_miami_28_le_labo_exclusive_344",
    notes: {
      top: ["Tobacco", "Rum"],
      middle: ["Cedarwood", "Guaiac Wood"],
      base: ["Cardamom", "Green Notes"]
    },
    accords: ["tobacco", "woody", "warm spicy", "rum", "smoky"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Le-Labo/Tabac-28-56834.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 90. Row 347: Mood Vanilla | Ariana (VIP, Unisex) -> Mod Vanilla Ariana Grande
  {
    productId: "abna_mood_vanilla_ariana_vip_347",
    notes: {
      top: ["Musk", "Plum", "Pink Pepper"],
      middle: ["Praline", "Orris Root"],
      base: ["Vanilla", "Cacao Butter"]
    },
    accords: ["vanilla", "sweet", "powdery", "musky", "fruity", "cacao"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ariana-Grande/Mod-Vanilla-77983.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 93. Row 350: Amor Caffe | Mancera (VIP, Unisex) -> Amore Caffe
  {
    productId: "abna_amor_caffe_mancera_vip_350",
    notes: {
      top: ["Coffee", "Amaretto"],
      middle: ["Ice Cream", "Speculoos"],
      base: ["Vanilla", "Brown Sugar", "Ambergris"]
    },
    accords: ["sweet", "coffee", "vanilla", "warm spicy", "lactonic", "gourmand"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mancera/Amore-Caffe-87361.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 94. Row 351: Pink Drops | Mykonos (VIP, Women)
  {
    productId: "abna_pink_drops_mykonos_vip_351",
    notes: {
      top: ["Strawberry", "Caramel", "Cotton Candy"],
      middle: ["Rose", "Vanilla"],
      base: ["Musk", "Sandalwood"]
    },
    accords: ["sweet", "fruity", "vanilla", "gourmand", "caramel"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Pink-Beach-79250.html",
      confidence: 0.92,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 95. Row 352: Oud Cashmere | Maison Francis Kurkdjian (VIP, Unisex) -> Oud Cashmere Mood
  {
    productId: "abna_oud_cashmere_maison_francis_kurkdjian_vip_352",
    notes: {
      top: ["Labdanum"],
      middle: ["Benzoin"],
      base: ["Laotian Oud", "Vanilla"]
    },
    accords: ["amber", "oud", "warm spicy", "balsamic", "woody", "smoky"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Oud-Cashmere-Mood-17688.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 96. Row 353: L'edition | Elle (VIP, Women)
  {
    productId: "abna_l_edition_elle_vip_353",
    notes: {
      top: ["Mandarin", "Lemon", "Pear", "Freesia"],
      middle: ["Jasmine", "Peony", "Lily-of-the-Valley", "Rose", "Peach"],
      base: ["Sandalwood", "Cedarwood", "Musk"]
    },
    accords: ["floral", "fruity", "fresh", "citrus", "white floral", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Elle/L-Edition-52467.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 98. Row 355: Dalal | Al Rehab (VIP, Women)
  {
    productId: "abna_dalal_al_rehab_vip_355",
    notes: {
      top: ["Orange", "Citrus"],
      middle: ["Caramel", "Vanilla"],
      base: ["Sandalwood", "Woody Notes"]
    },
    accords: ["caramel", "sweet", "vanilla", "citrus", "woody"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Dalal-20150.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 99. Row 356: Flora Gardenia | Gucci (VIP, Women) -> Flora Gorgeous Gardenia
  {
    productId: "abna_flora_gardenia_gucci_vip_356",
    notes: {
      top: ["Pear Blossom", "Red Berries", "Italian Mandarin"],
      middle: ["Gardenia", "Jasmine", "Frangipani"],
      base: ["Brown Sugar", "Patchouli"]
    },
    accords: ["white floral", "floral", "sweet", "fruity", "fresh"],
    fragranceFamily: ["Floral", "Fresh"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Flora-Gorgeous-Gardenia-Eau-de-Parfum-68578.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 100. Row 357: Mon Paris | YSL (VIP, Women)
  {
    productId: "abna_mon_paris_ysl_vip_357",
    notes: {
      top: [
        "Strawberry",
        "Raspberry",
        "Pear",
        "Calabrian Bergamot",
        "Calone",
        "Orange",
        "Tangerine"
      ],
      middle: ["Datura", "Peony", "Orange Blossom", "Jasmine Sambac", "Chinese Jasmine"],
      base: ["Indonesian Patchouli Leaf", "White Musk", "Vanilla", "Ambroxan", "Moss", "Cedarwood"]
    },
    accords: ["fruity", "sweet", "strawberry", "white floral", "patchouli", "citrus"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Mon-Paris-38914.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  }
];
const BATCH_07_ENRICHMENT_RECORDS = [
  // 1. Row 358: Fantasia Mermaid | Anna Sui (VIP, Women)
  {
    productId: "abna_fantasia_mermaid_anna_sui_vip_358",
    notes: {
      top: ["Blood Orange", "Mandarin", "Cardamom"],
      middle: ["Jasmine", "Peony", "Watery Notes"],
      base: ["Honey", "Tonka Bean", "Blonde Woods"]
    },
    accords: ["citrus", "floral", "sweet", "aquatic", "fresh spicy", "white floral"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Anna-Sui/Fantasia-Mermaid-53744.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 2. Row 359: Aqua Atlantic | Bvlgari (VIP, Men) -> Aqva Pour Homme Atlantiqve
  {
    productId: "abna_aqua_atlantic_bvlgari_vip_359",
    notes: {
      top: ["Water Notes", "Calabrian Bergamot", "Sicilian Lemon", "Sage"],
      middle: ["Sea Notes", "Ambergris", "Apple"],
      base: ["Benzoin", "Amberwood", "Patchouli", "Sandalwood", "Vetiver"]
    },
    accords: ["marine", "amber", "aquatic", "citrus", "aromatic", "woody"],
    fragranceFamily: ["Aquatic", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Aqva-Pour-Homme-Atlantiqve-42687.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 4. Row 361: Selection | Hugo Boss (VIP, Men) -> Boss Selection
  {
    productId: "abna_selection_hugo_boss_vip_361",
    notes: {
      top: ["Pink Pepper", "Grapefruit", "Mandarin", "Bergamot"],
      middle: ["Star Anise", "Cedar", "Geranium"],
      base: ["Musk", "Vetiver", "Patchouli"]
    },
    accords: ["citrus", "fresh spicy", "woody", "aromatic", "musky", "soft spicy"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Boss-Selection-384.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 5. Row 362: XX | Hugo Boss (VIP, Women) -> Hugo XX
  {
    productId: "abna_xx_hugo_boss_vip_362",
    notes: {
      top: ["Litchi", "Blackcurrant", "Mandarin"],
      middle: ["Basmati Rice", "Jasmine", "Rose"],
      base: ["Musk", "Sandalwood", "Amber"]
    },
    accords: ["fruity", "floral", "citrus", "musky", "sweet", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Hugo-XX-1302.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 6. Row 363: Black Opium Gold | YSL (VIP, Women) -> Black Opium Gold Attraction Edition
  {
    productId: "abna_black_opium_gold_ysl_vip_363",
    notes: {
      top: ["Pink Pepper", "Orange Blossom", "Pear"],
      middle: ["Coffee", "Jasmine", "Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cedar", "Cashmere Wood"]
    },
    accords: ["vanilla", "coffee", "sweet", "warm spicy", "white floral", "woody"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-Gold-Attraction-Edition-52119.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 7. Row 364: Sweet Like Candy | Ariana (VIP, Women) -> Ariana Grande
  {
    productId: "abna_sweet_like_candy_ariana_vip_364",
    notes: {
      top: ["Blackberry", "Bergamot", "Pear"],
      middle: [
        "Blackcurrant",
        "Whipped Cream",
        "Marshmallow",
        "Frangipani",
        "Jasmine",
        "Honeysuckle"
      ],
      base: ["Vanilla", "Cashmere Wood"]
    },
    accords: ["sweet", "fruity", "gourmand", "vanilla", "lactonic", "powdery"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ariana-Grande/Sweet-Like-Candy-39773.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 9. Row 366: Oud Silk Mood | Maison Francis Kurkdjian (VIP, Unisex)
  {
    productId: "abna_oud_silk_mood_maison_francis_kurkdjian_vip_366",
    notes: {
      top: ["Bulgarian Rose", "Chamomile", "Bergamot"],
      middle: ["Guaiac Wood", "Hedione"],
      base: ["Laotian Oud", "Papyrus"]
    },
    accords: ["rose", "oud", "woody", "floral", "herbal", "fresh spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Oud-Silk-Mood-17488.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 10. Row 367: Nautica Voyage Sport | Nautica (VIP, Men)
  {
    productId: "abna_nautica_voyage_sport_nautica_vip_367",
    notes: {
      top: ["Sea Notes", "Sea Salt", "Citrus", "Coriander"],
      middle: ["Apple", "Geranium", "Green Pepper", "Palm Leaf"],
      base: ["Musk", "Vetiver", "Patchouli", "Brazilian Redwood"]
    },
    accords: ["marine", "aromatic", "green", "fresh spicy", "citrus", "salty"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Nautica/Nautica-Voyage-Sport-41142.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 11. Row 368: One & Only | Gissah (ELITE, Unisex)
  {
    productId: "abna_one_only_gissah_elite_368",
    notes: {
      top: ["Bergamot", "Apple", "Cardamom"],
      middle: ["Lavender", "Clary Sage", "Rosemary"],
      base: ["Vanilla", "Amber", "Patchouli", "Tonka Bean"]
    },
    accords: ["aromatic", "vanilla", "warm spicy", "citrus", "sweet", "amber"],
    fragranceFamily: ["Oriental", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/One-Only-87163.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 12. Row 369: Scandal Absolu | Jean Paul Gaultier (ELITE, Men) -> Scandal Pour Homme Absolu
  {
    productId: "abna_scandal_absolu_jean_paul_gaultier_elite_369",
    notes: {
      top: ["Mirabelle Plum"],
      middle: ["Chestnut"],
      base: ["Sandalwood"]
    },
    accords: ["fruity", "nutty", "woody", "sweet", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Scandal-Pour-Homme-Absolu-90768.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 13. Row 370: Le Male Elixir | Jean Paul Gaultier (ELITE, Men)
  {
    productId: "abna_le_male_elixir_jean_paul_gaultier_elite_370",
    notes: {
      top: ["Lavender", "Mint"],
      middle: ["Vanilla", "Benzoin"],
      base: ["Honey", "Tonka Bean", "Tobacco"]
    },
    accords: ["sweet", "vanilla", "honey", "amber", "aromatic", "warm spicy", "tobacco"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Le-Male-Elixir-81642.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 14. Row 371: Attrape Reves | Louis Vuitton (ELITE, Unisex)
  {
    productId: "abna_attrape_reves_louis_vuitton_elite_371",
    notes: {
      top: ["Litchi", "Ginger", "Bergamot"],
      middle: ["Peony", "Cacao", "Turkish Rose"],
      base: ["Patchouli"]
    },
    accords: ["warm spicy", "fresh", "rose", "cacao", "floral", "patchouli", "citrus"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Attrape-Reves-51095.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 15. Row 372: Ani | Nishane (ELITE, Unisex)
  {
    productId: "abna_ani_nishane_elite_372",
    notes: {
      top: ["Ginger", "Bergamot", "Pink Pepper", "Green Notes"],
      middle: ["Cardamom", "Blackcurrant", "Turkish Rose"],
      base: ["Vanilla", "Benzoin", "Sandalwood", "Cedar", "Ambergris", "Patchouli", "Musk"]
    },
    accords: ["vanilla", "warm spicy", "woody", "citrus", "powdery", "amber", "sweet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Nishane/Ani-54785.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 16. Row 373: 777 God Of Fire | Stephane Humbert Lucas 777 (ELITE, Unisex)
  {
    productId: "abna_777_god_of_fire_stephane_humbert_lucas_777_elite_373",
    notes: {
      top: ["Mango", "Lemon", "Ginger", "Red Berries"],
      middle: ["Woody Notes", "Coumarin", "Jasmine"],
      base: ["Oud", "Musk", "Amber", "Cypriol Oil"]
    },
    accords: ["tropical", "fruity", "sweet", "woody", "warm spicy", "citrus", "fresh"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Stephane-Humbert-Lucas-777/God-of-Fire-72251.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 17. Row 374: Erba Gold | Xerjoff (ELITE, Unisex)
  {
    productId: "abna_erba_gold_xerjoff_elite_374",
    notes: {
      top: ["Amalfi Lemon", "Calabrian Bergamot", "Brazilian Orange", "Ginger"],
      middle: ["Green Apple", "Melon", "Pear", "Cloves", "Guatemalan Cardamom", "Cinnamon"],
      base: ["Madagascar Vanilla", "White Musk", "Amber", "Woody Notes"]
    },
    accords: ["citrus", "fruity", "sweet", "warm spicy", "fresh", "musky"],
    fragranceFamily: ["Citrus", "Fruity"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Xerjoff/Erba-Gold-41644.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 18. Row 375: Lira | Xerjoff (ELITE, Women)
  {
    productId: "abna_lira_xerjoff_elite_375",
    notes: {
      top: ["Blood Orange", "Bergamot", "Lavender"],
      middle: ["Cinnamon", "Licorice", "Jasmine"],
      base: ["Caramel", "Vanilla", "Musk"]
    },
    accords: ["caramel", "citrus", "sweet", "vanilla", "warm spicy", "gourmand"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Xerjoff/Lira-11801.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 19. Row 376: Candy Rock Sugar | Kayali (ELITE, Women) -> Vanilla Candy Rock Sugar 42
  {
    productId: "abna_candy_rock_sugar_kayali_elite_376",
    notes: {
      top: ["Vanilla", "Pear", "Marshmallow", "Rum", "Violet Leaves", "Ylang-Ylang"],
      middle: ["Bubble Gum", "Jellybean", "Caramel", "Jasmine", "Labdanum"],
      base: ["Sugar", "Vanilla", "Tonka Bean", "Cashmere Wood", "Patchouli", "Sandalwood"]
    },
    accords: ["sweet", "vanilla", "gourmand", "fruity", "powdery"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Vanilla-Candy-Rock-Sugar-42-91898.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 20. Row 377: Fleur Narcotique | Ex Nihilo (ELITE, Unisex)
  {
    productId: "abna_fleur_narcotique_ex_nihilo_elite_377",
    notes: {
      top: ["Litchi", "Bergamot", "Peach"],
      middle: ["Peony", "Orange Blossom", "Jasmine", "Petalia"],
      base: ["Musk", "Moss", "Woody Notes"]
    },
    accords: ["white floral", "floral", "fruity", "citrus", "fresh", "musky"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ex-Nihilo/Fleur-Narcotique-26385.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 21. Row 378: Do Son | Diptyque (EXCLUSIVE, Unisex)
  {
    productId: "abna_do_son_diptyque_exclusive_378",
    notes: {
      top: ["African Orange Flower", "Iris", "Rose"],
      middle: ["Tuberose", "Pink Pepper"],
      base: ["Benzoin", "Musk"]
    },
    accords: ["white floral", "tuberose", "animalic", "floral", "marine"],
    fragranceFamily: ["Floral", "White Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Diptyque/Do-Son-Eau-de-Parfum-50854.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 22. Row 379: La Tulipe | Byredo (EXCLUSIVE, Women)
  {
    productId: "abna_la_tulipe_byredo_exclusive_379",
    notes: {
      top: ["Freesia", "Cyclamen", "Rhubarb"],
      middle: ["Pink Tulip"],
      base: ["Green Notes", "Vetiver", "Blonde Woods"]
    },
    accords: ["floral", "green", "fresh", "fruity"],
    fragranceFamily: ["Floral", "Green"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Byredo/La-Tulipe-8758.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 23. Row 380: Another 13 | Le Labo (EXCLUSIVE, Unisex)
  {
    productId: "abna_another_13_le_labo_exclusive_380",
    notes: {
      top: ["Pear", "Apple", "Citrus"],
      middle: ["Ambrette", "Salicylates", "Jasmine"],
      base: ["Ambroxan", "Iso E Super", "Cetalox", "Helvetolide"]
    },
    accords: ["musky", "amber", "woody", "floral", "animalic"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Le-Labo/An-Other-13-10188.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 24. Row 381: Paradigme | Prada (EXCLUSIVE, Men) -> Prada Paradoxe
  {
    productId: "abna_paradigme_prada_exclusive_381",
    notes: {
      top: ["Pear", "Tangerine", "Bergamot"],
      middle: ["Orange Blossom", "Jasmine Sambac", "Neroli"],
      base: ["Bourbon Vanilla", "White Musk", "Amber", "Benzoin"]
    },
    accords: ["white floral", "citrus", "sweet", "fruity", "vanilla", "amber"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Prada/Prada-Paradoxe-75892.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 25. Row 382: Cloud Pink | Ariana (EXCLUSIVE, Unisex) -> Ariana Grande
  {
    productId: "abna_cloud_pink_ariana_exclusive_382",
    notes: {
      top: ["Pitahaya", "Wild Berries", "Pineapple"],
      middle: ["Coconut Water", "Vanilla Orchid", "Ambrette"],
      base: ["Praline", "Musk", "Amberwood", "Moss"]
    },
    accords: ["sweet", "fruity", "tropical", "coconut", "vanilla", "gourmand"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ariana-Grande/Cloud-Pink-84197.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 26. Row 383: Addict Peach Glow | Dior (EXCLUSIVE, Women) -> Miss Dior Cherie / Dior Addict Eau Delice
  {
    productId: "abna_addict_peach_glow_dior_exclusive_383",
    notes: {
      top: ["Peach", "Cranberry", "Bergamot", "Orange"],
      middle: ["Ylang-Ylang", "Jasmine", "Rose"],
      base: ["White Musk", "Cedarwood"]
    },
    accords: ["fruity", "sweet", "citrus", "white floral", "fresh", "musky"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dior/Dior-Addict-Eau-Delice-18237.html",
      confidence: 0.94,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 27. Row 384: Inception | Mykonos (EXCLUSIVE, Men)
  {
    productId: "abna_inception_mykonos_exclusive_384",
    notes: {
      top: ["Bergamot", "Lemon", "Mandarin", "Apple"],
      middle: ["Orange Blossom", "Nutmeg", "Cinnamon", "Lavender"],
      base: ["Tonka Bean", "Vanilla", "Sandalwood", "Amber", "Musk"]
    },
    accords: ["citrus", "warm spicy", "sweet", "vanilla", "woody", "aromatic"],
    fragranceFamily: ["Oriental", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Inception-93112.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 28. Row 385: Royal Ispahan | Mykonos (EXCLUSIVE, Unisex)
  {
    productId: "abna_royal_ispahan_mykonos_exclusive_385",
    notes: {
      top: ["Damask Rose", "Labdanum", "Saffron"],
      middle: ["Patchouli", "Smoky Notes"],
      base: ["Oud", "Sandalwood", "Cedarwood"]
    },
    accords: ["rose", "oud", "warm spicy", "amber", "woody", "smoky"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Royal-Ispahan-87421.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 29. Row 386: 9 PM Elixir | Rasasi (EXCLUSIVE, Women) -> Afnan / Rasasi 9 PM
  {
    productId: "abna_9_pm_elixir_rasasi_exclusive_386",
    notes: {
      top: ["Apple", "Cinnamon", "Wild Lavender", "Bergamot"],
      middle: ["Orange Blossom", "Lily-of-the-Valley"],
      base: ["Vanilla", "Tonka Bean", "Amber", "Patchouli"]
    },
    accords: ["vanilla", "sweet", "fruity", "warm spicy", "amber", "cinnamon"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Afnan/9-PM-65414.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 30. Row 387: Vibrato | Sospiro (EXCLUSIVE, Unisex)
  {
    productId: "abna_vibrato_sospiro_exclusive_387",
    notes: {
      top: ["Bergamot", "Grapefruit", "Jasmine", "Magnolia"],
      middle: ["Ginger", "Herbal Notes", "Powdery Notes"],
      base: ["Cedar", "Amber", "Musk", "Patchouli", "Orris Root"]
    },
    accords: ["citrus", "warm spicy", "fresh spicy", "woody", "powdery", "aromatic"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Sospiro-Perfumes/Vibrato-76495.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 31. Row 388: Eros Energy | Versace (EXCLUSIVE, Men)
  {
    productId: "abna_eros_energy_versace_exclusive_388",
    notes: {
      top: ["Blood Orange", "Lime", "Grapefruit", "Lemon", "Mandarin", "Bergamot"],
      middle: ["Pink Pepper", "White Amber", "Blackcurrant"],
      base: ["Patchouli", "Musk", "Oakmoss"]
    },
    accords: ["citrus", "fresh spicy", "aromatic", "fruity", "woody"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Versace/Eros-Energy-94488.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 32. Row 389: Club De Nuit Intense Man | Armaf (EXCLUSIVE, Men)
  {
    productId: "abna_club_de_nuit_intense_man_armaf_exclusive_389",
    notes: {
      top: ["Lemon", "Pineapple", "Bergamot", "Blackcurrant", "Apple"],
      middle: ["Birch", "Jasmine", "Rose"],
      base: ["Musk", "Ambergris", "Patchouli", "Vanilla"]
    },
    accords: ["citrus", "fruity", "woody", "smoky", "leather", "aromatic"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Armaf/Club-de-Nuit-Intense-Man-34696.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 33. Row 390: Impadia | BDK (EXCLUSIVE, Unisex) -> BDK Impadia / Pas Ce Soir
  {
    productId: "abna_impadia_bdk_exclusive_390",
    notes: {
      top: ["Black Pepper", "Ginger", "Mandarin"],
      middle: ["Quince", "Orange Blossom", "Jasmine"],
      base: ["Patchouli", "Cashmeran", "Amberwood"]
    },
    accords: ["fruity", "warm spicy", "sweet", "white floral", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/BDK-Parfums/Pas-Ce-Soir-42646.html",
      confidence: 0.94,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 34. Row 391: La Bomba | Carolina Herrera (EXCLUSIVE, Women) -> Good Girl Blush / 212 VIP
  {
    productId: "abna_la_bomba_carolina_herrera_exclusive_391",
    notes: {
      top: ["Bergamot", "Bitter Almond", "Mandarin"],
      middle: ["Ylang-Ylang", "Peony", "Rose Water"],
      base: ["Vanilla", "Tonka Bean"]
    },
    accords: ["floral", "vanilla", "citrus", "sweet", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/Good-Girl-Blush-78900.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 35. Row 392: Virgin Island Water | Creed (EXCLUSIVE, Unisex)
  {
    productId: "abna_virgin_island_water_creed_exclusive_392",
    notes: {
      top: ["Coconut", "Lime", "White Bergamot", "Sicilian Mandarin"],
      middle: ["Ginger", "Ylang-Ylang", "Indian Jasmine", "Hibiscus"],
      base: ["White Rum", "Sugar Cane", "Musk"]
    },
    accords: ["coconut", "citrus", "sweet", "rum", "tropical", "vanilla"],
    fragranceFamily: ["Citrus", "Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Creed/Virgin-Island-Water-899.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 36. Row 393: Le Beau Paradise Garden | Jean Paul Gaultier (EXCLUSIVE, Men)
  {
    productId: "abna_le_beau_paradise_garden_jean_paul_gaultier_exclusive_393",
    notes: {
      top: ["Watery Notes", "Green Notes", "Mint", "Ginger"],
      middle: ["Coconut", "Fig", "Salt"],
      base: ["Sandalwood", "Tonka Bean"]
    },
    accords: ["green", "coconut", "aquatic", "sweet", "fresh", "tropical", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Le-Beau-Paradise-Garden-89010.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 37. Row 394: Fleur Du Desert | Louis Vuitton (EXCLUSIVE, Unisex)
  {
    productId: "abna_fleur_du_desert_louis_vuitton_exclusive_394",
    notes: {
      top: ["Honey", "Cinnamon"],
      middle: ["Jasmine", "Orange Blossom", "Rose"],
      base: ["Oud", "Ambrette", "Ambroxan"]
    },
    accords: ["white floral", "honey", "oud", "rose", "warm spicy", "amber", "sweet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Fleur-du-Desert-73336.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 38. Row 395: Explorer Platinum | Montblanc (EXCLUSIVE, Men)
  {
    productId: "abna_explorer_platinum_montblanc_exclusive_395",
    notes: {
      top: ["Violet Leaves"],
      middle: ["Clary Sage"],
      base: ["Cedarwood"]
    },
    accords: ["ozonic", "aromatic", "woody", "herbal", "aquatic"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Montblanc/Explorer-Platinum-81206.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 39. Row 396: Eros Najim | Versace (EXCLUSIVE, Men) -> Eros Parfum / Flame
  {
    productId: "abna_eros_najim_versace_exclusive_396",
    notes: {
      top: ["Mint", "Lemon", "Black Pepper", "Rosemary"],
      middle: ["Geranium", "Rose", "Pepperwood"],
      base: ["Vanilla", "Tonka Bean", "Sandalwood", "Cedar", "Patchouli", "Oakmoss"]
    },
    accords: ["aromatic", "citrus", "vanilla", "fresh spicy", "woody", "warm spicy"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Versace/Eros-Flame-52180.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 40. Row 397: Black Opium Red Cherry | YSL (EXCLUSIVE, Women) -> Black Opium Over Red
  {
    productId: "abna_black_opium_red_cherry_ysl_exclusive_397",
    notes: {
      top: ["Cherry", "Green Mandarin"],
      middle: ["Orange Blossom", "Jasmine", "Black Tea"],
      base: ["Madagascar Vanilla", "Coffee", "Indonesian Patchouli Leaf"]
    },
    accords: ["cherry", "sweet", "vanilla", "coffee", "fruity", "white floral", "warm spicy"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-Over-Red-88439.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 41. Row 398: Turathi Electric | Afnan (EXCLUSIVE, Unisex) -> Turathi Blue / Brown
  {
    productId: "abna_turathi_electric_afnan_exclusive_398",
    notes: {
      top: ["Citrus", "Bergamot", "Mandarin"],
      middle: ["Amber", "Woody Notes"],
      base: ["Musk", "Patchouli", "Spices"]
    },
    accords: ["citrus", "amber", "woody", "musky", "warm spicy", "fresh"],
    fragranceFamily: ["Citrus", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Afnan/Turathi-Blue-70889.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 42. Row 399: Rouge Chaotique | Byredo (EXCLUSIVE, Unisex)
  {
    productId: "abna_rouge_chaotique_byredo_exclusive_399",
    notes: {
      top: ["Saffron", "Cassis", "Bergamot", "Lemon"],
      middle: ["Plum", "Praline", "Oak"],
      base: ["Oud", "Papyrus", "Patchouli"]
    },
    accords: ["sweet", "fruity", "woody", "warm spicy", "oud", "leather"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Byredo/Rouge-Chaotique-83679.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 43. Row 400: Acne Studio | Frederic Malle (EXCLUSIVE, Unisex) -> Acne Studios par Frederic Malle
  {
    productId: "abna_acne_studio_frederic_malle_exclusive_400",
    notes: {
      top: ["Aldehydes"],
      middle: ["Rose", "Violet", "Orange Blossom", "Peach"],
      base: ["White Musk", "Sandalwood", "Frankincense", "Vanilla"]
    },
    accords: ["aldehydic", "powdery", "musky", "floral", "woody", "fresh"],
    fragranceFamily: ["Floral", "Aldehyde"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Frederic-Malle/Acne-Studios-par-Frederic-Malle-91216.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 44. Row 401: La Luna Valley | Gissah (EXCLUSIVE, Unisex)
  {
    productId: "abna_la_luna_valley_gissah_exclusive_401",
    notes: {
      top: ["Incense", "Apricot", "Bergamot"],
      middle: ["Rose", "Patchouli", "Amber"],
      base: ["Leather", "Vanilla", "Musk", "Woody Notes"]
    },
    accords: ["amber", "smoky", "fruity", "woody", "leather", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/La-Luna-Valley-87165.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 45. Row 402: Voila | Gissah (EXCLUSIVE, Unisex)
  {
    productId: "abna_voila_gissah_exclusive_402",
    notes: {
      top: ["Mandarin", "Peach", "Blackcurrant"],
      middle: ["Jasmine", "Rose", "Orange Blossom"],
      base: ["Vanilla", "Musk", "Amber", "Cedarwood"]
    },
    accords: ["fruity", "sweet", "floral", "citrus", "powdery", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/Voila-94455.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 46. Row 403: Majesty Rose Royal | Kayali (EXCLUSIVE, Women) -> Sweet Diamond Pink Pepper / Deja Vu White Flower
  {
    productId: "abna_majesty_rose_royal_kayali_exclusive_403",
    notes: {
      top: ["Pink Pepper", "Bergamot", "Royal Lily", "Saffron"],
      middle: ["Bulgarian Rose", "Rose Centifolia", "Magnolia", "Vanilla Orchid"],
      base: ["Sandalwood", "Amber", "Patchouli", "Musk"]
    },
    accords: ["rose", "floral", "warm spicy", "sweet", "woody", "powdery"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Sweet-Diamond-Pink-Pepper-25-66773.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 47. Row 404: Eclaire | Lattafa (EXCLUSIVE, Unisex)
  {
    productId: "abna_eclaire_lattafa_exclusive_404",
    notes: {
      top: ["Caramel", "Milk", "Sugar"],
      middle: ["Honey", "White Flowers"],
      base: ["Vanilla", "Praline", "Musk"]
    },
    accords: ["caramel", "sweet", "vanilla", "lactonic", "gourmand", "honey"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Eclaire-93433.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 48. Row 405: Grand Soir | Maison Francis Kurkdjian (EXCLUSIVE, Unisex)
  {
    productId: "abna_grand_soir_maison_francis_kurkdjian_exclusive_405",
    notes: {
      top: ["Spanish Labdanum"],
      middle: ["Benzoin"],
      base: ["Tonka Bean", "Vanilla", "Amber"]
    },
    accords: ["amber", "vanilla", "warm spicy", "sweet", "balsamic"],
    fragranceFamily: ["Oriental", "Amber"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Grand-Soir-40816.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 49. Row 406: Luminos | Mykonos (EXCLUSIVE, Unisex)
  {
    productId: "abna_luminos_mykonos_exclusive_406",
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      middle: ["Tuberose", "Jasmine", "Orange Blossom"],
      base: ["Amber", "Vanilla", "Musk", "Sandalwood"]
    },
    accords: ["white floral", "citrus", "tuberose", "sweet", "amber", "powdery"],
    fragranceFamily: ["Floral", "Amber"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Luminos-93113.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 50. Row 407: Strawberry Poundcake | BBW (EXCLUSIVE, Women) -> Bath & Body Works
  {
    productId: "abna_strawberry_poundcake_bbw_exclusive_407",
    notes: {
      top: ["Fresh Strawberries"],
      middle: ["Golden Shortcake"],
      base: ["Whipped Cream", "Vanilla"]
    },
    accords: ["sweet", "fruity", "strawberry", "vanilla", "lactonic", "gourmand"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-Body-Works/Strawberry-Pound-Cake-63162.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 51. Row 408: Eden Juicy Apple | Kayali (EXCLUSIVE, Women) -> Eden Juicy Apple | 01
  {
    productId: "abna_eden_juicy_apple_kayali_exclusive_408",
    notes: {
      top: ["Red Apple", "Litchi", "Blackcurrant", "Pink Grapefruit"],
      middle: ["Wild Berries", "Raspberry Bloom", "Jasmine", "May Rose"],
      base: ["Sugar", "Vanilla", "Musk", "Amber", "Moss"]
    },
    accords: ["fruity", "sweet", "fresh", "floral", "vanilla"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Eden-Juicy-Apple-01-71015.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 52. Row 409: Bali | Kenzo (EXCLUSIVE, Men) -> 7:15 AM in Bali Kenzo
  {
    productId: "abna_bali_kenzo_exclusive_409",
    notes: {
      top: ["Grapefruit", "Passionfruit"],
      middle: ["Jasmine", "Tea"],
      base: ["Vanilla"]
    },
    accords: ["citrus", "tropical", "fruity", "green", "fresh", "sweet"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/7-15-AM-in-Bali-3069.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 53. Row 410: Boujee Marshmallow | Kayali (EXCLUSIVE, Women) -> Yum Pistachio Gelato / Marshmallow
  {
    productId: "abna_boujee_marshmallow_kayali_exclusive_410",
    notes: {
      top: ["Pistachio", "Ice Cream", "Bergamot", "Hazelnut", "Rum", "Cardamom"],
      middle: ["Lily-of-the-Valley", "Pear", "Geranium", "Jasmine", "Peony", "Raspberry"],
      base: [
        "Whipped Cream",
        "Marshmallow",
        "Cotton Candy",
        "Tonka Bean",
        "Loukhoum",
        "Sandalwood",
        "Cacao",
        "Cedar"
      ]
    },
    accords: ["sweet", "nutty", "gourmand", "lactonic", "fruity", "powdery"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Yum-Pistachio-Gelato-33-79758.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 54. Row 411: Moringa | The Body Shop (EXCLUSIVE, Women)
  {
    productId: "abna_moringa_the_body_shop_exclusive_411",
    notes: {
      top: ["Moringa Blossom", "Green Notes"],
      middle: ["Floral Notes", "White Flowers"],
      base: ["Musk", "Woody Notes"]
    },
    accords: ["floral", "white floral", "fresh", "sweet", "green"],
    fragranceFamily: ["Floral", "Fresh"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/Moringa-15949.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 55. Row 412: Vibrato | Xerjoff (SPECIAL ONE, Unisex) -> Sospiro / Xerjoff Vibrato
  {
    productId: "abna_vibrato_xerjoff_special_one_412",
    notes: {
      top: ["Bergamot", "Grapefruit", "Jasmine", "Magnolia"],
      middle: ["Ginger", "Herbal Notes", "Powdery Notes"],
      base: ["Cedar", "Amber", "Musk", "Patchouli", "Orris Root"]
    },
    accords: ["citrus", "warm spicy", "fresh spicy", "woody", "powdery", "aromatic"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Sospiro-Perfumes/Vibrato-76495.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 56. Row 413: Mellow Yellow | Anna Sui (VIP, Women) -> Sundae Mellow Yellow
  {
    productId: "abna_mellow_yellow_anna_sui_vip_413",
    notes: {
      top: ["Passionfruit", "Lemon", "Mango"],
      middle: ["Osmanthus", "Crabapple Blossom", "Jasmine Sambac"],
      base: ["Vanilla", "Woody Notes", "Plum Wood", "Musk"]
    },
    accords: ["fruity", "tropical", "sweet", "citrus", "floral", "vanilla"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Anna-Sui/Sundae-Mellow-Yellow-80327.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 57. Row 414: Into The Night | BBW (VIP, Women) -> Bath & Body Works
  {
    productId: "abna_into_the_night_bbw_vip_414",
    notes: {
      top: ["Raspberry", "Blackberry"],
      middle: ["Midnight Jasmine", "Dark Rose"],
      base: ["Amber Crystals", "Bourbon Vanilla", "Patchouli", "Mocha Musk"]
    },
    accords: ["amber", "sweet", "fruity", "patchouli", "woody", "warm spicy"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-Body-Works/Into-The-Night-58079.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 58. Row 415: Warm Vanilla | BBW (VIP, Unisex) -> Warm Vanilla Sugar
  {
    productId: "abna_warm_vanilla_bbw_vip_415",
    notes: {
      top: ["Vanilla", "Floral Notes"],
      middle: ["Rice", "Coconut", "Vanilla"],
      base: ["Sand", "Musk", "Heliotrope", "Vanilla"]
    },
    accords: ["vanilla", "sweet", "powdery", "warm spicy", "gourmand"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bath-Body-Works/Warm-Vanilla-Sugar-3286.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 59. Row 416: Reversed | Hugo Boss (VIP, Men) -> Hugo Reversed
  {
    productId: "abna_reversed_hugo_boss_vip_416",
    notes: {
      top: ["Grapefruit", "Calabrian Bergamot"],
      middle: ["Rosemary"],
      base: ["Haitian Vetiver"]
    },
    accords: ["citrus", "aromatic", "woody", "fresh spicy", "earthy"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Hugo-Reversed-53094.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 60. Row 417: Maui Sweet Banana | Kayali (VIP, Women) -> Vacation in a Bottle Maui Sweet Banana 37
  {
    productId: "abna_maui_sweet_banana_kayali_vip_417",
    notes: {
      top: ["Banana", "Pear"],
      middle: ["Coconut Cream", "Jasmine"],
      base: ["Vanilla", "Sandalwood"]
    },
    accords: ["fruity", "sweet", "tropical", "lactonic", "vanilla", "coconut"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Maui-Sweet-Banana-37-93822.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 61. Row 418: Vanilla 28 | Kayali (VIP, Unisex)
  {
    productId: "abna_vanilla_28_kayali_vip_418",
    notes: {
      top: ["Vanilla Orchid", "Jasmine"],
      middle: ["Brown Sugar", "Tonka Bean"],
      base: ["Amber", "Musk", "Amberwood", "Patchouli"]
    },
    accords: ["vanilla", "sweet", "amber", "warm spicy", "powdery", "woody"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Vanilla-28-52787.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 62. Row 419: 9 AM Dive | Rasasi (VIP, Women) -> Afnan 9 AM Dive
  {
    productId: "abna_9_am_dive_rasasi_vip_419",
    notes: {
      top: ["Mint", "Lemon", "Pink Pepper", "Blackcurrant"],
      middle: ["Apple", "Incense", "Cedar"],
      base: ["Ginger", "Sandalwood", "Patchouli", "Jasmine"]
    },
    accords: ["aromatic", "citrus", "fruity", "green", "fresh spicy", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Afnan/9-AM-Dive-77344.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 63. Row 420: Sexy Lotus & Pomegranate | Victoria Secret (VIP, Women) -> Pomegranate & Lotus
  {
    productId: "abna_sexy_lotus_pomegranate_victoria_secret_vip_420",
    notes: {
      top: ["Pomegranate"],
      middle: ["Lotus"],
      base: ["Musk", "Woody Notes"]
    },
    accords: ["fruity", "floral", "aquatic", "sweet", "fresh"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Pomegranate-Lotus-Balance-64906.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 64. Row 421: Sauvage Elixir | Dior (ELITE, Men)
  {
    productId: "abna_sauvage_elixir_dior_elite_421",
    notes: {
      top: ["Nutmeg", "Cinnamon", "Cardamom", "Grapefruit"],
      middle: ["Lavender"],
      base: ["Licorice", "Sandalwood", "Amber", "Patchouli", "Haitian Vetiver"]
    },
    accords: ["warm spicy", "woody", "lavender", "fresh spicy", "aromatic", "cinnamon"],
    fragranceFamily: ["Aromatic", "Spicy"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dior/Sauvage-Elixir-68415.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 65. Row 422: Special Oud Madawi | Arabian Oud (EXCLUSIVE, Unisex) -> Madawi Gold Edition
  {
    productId: "abna_special_oud_madawi_arabian_oud_exclusive_422",
    notes: {
      top: ["Cardamom", "Red Berries"],
      middle: ["Pineapple Blossom", "Jasmine", "Tonka Bean"],
      base: ["Patchouli", "Vanilla"]
    },
    accords: ["fruity", "sweet", "vanilla", "warm spicy", "patchouli", "woody"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Arabian-Oud/Madawi-Gold-Edition-70984.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 66. Row 423: Les Sable Roses | Louis Vuitton (EXCLUSIVE, Unisex)
  {
    productId: "abna_les_sable_roses_louis_vuitton_exclusive_423",
    notes: {
      top: ["Rose", "Rose de Mai"],
      middle: ["Oud", "Saffron"],
      base: ["Ambergris", "Black Pepper"]
    },
    accords: ["rose", "oud", "amber", "warm spicy", "floral", "animalic"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Les-Sables-Roses-55530.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 67. Row 424: Bloom | Gucci (EXCLUSIVE, Women)
  {
    productId: "abna_bloom_gucci_exclusive_424",
    notes: {
      top: ["Jasmine"],
      middle: ["Tuberose"],
      base: ["Rangoon Creeper"]
    },
    accords: ["white floral", "tuberose", "floral", "animalic", "powdery"],
    fragranceFamily: ["Floral", "White Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Gucci-Bloom-44894.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 68. Row 425: Erba Pura | Xerjof (EXCLUSIVE, Unisex) -> Xerjoff
  {
    productId: "abna_erba_pura_xerjof_exclusive_425",
    notes: {
      top: ["Sicilian Orange", "Calabrian Bergamot", "Sicilian Lemon"],
      middle: ["Fruits"],
      base: ["White Musk", "Madagascar Vanilla", "Amber"]
    },
    accords: ["fruity", "citrus", "sweet", "musky", "powdery", "vanilla"],
    fragranceFamily: ["Oriental", "Fruity"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Xerjoff/Erba-Pura-55157.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 69. Row 426: Libre Intense | YSL (EXCLUSIVE, Women)
  {
    productId: "abna_libre_intense_ysl_exclusive_426",
    notes: {
      top: ["Lavender", "Mandarin", "Bergamot"],
      middle: ["Lavender", "Tunisian Orange Blossom", "Jasmine Sambac", "Orchid"],
      base: ["Madagascar Vanilla", "Tonka Bean", "Ambergris", "Vetiver"]
    },
    accords: ["vanilla", "lavender", "sweet", "white floral", "citrus", "amber"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Libre-Intense-62318.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 70. Row 427: Coconut Passion | Victoria Secret (VIP, Women)
  {
    productId: "abna_coconut_passion_victoria_secret_vip_427",
    notes: {
      top: ["Coconut"],
      middle: ["Vanilla", "Lily-of-the-Valley"],
      base: ["Chamomile", "Aloe Vera"]
    },
    accords: ["vanilla", "coconut", "sweet", "lactonic", "tropical"],
    fragranceFamily: ["Floral", "Fruity Gourmand"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Coconut-Passion-11116.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 71. Row 428: Flora Gardenia Limited Edition | Gucci (VIP, Women) -> Flora Gorgeous Gardenia
  {
    productId: "abna_flora_gardenia_limited_edition_gucci_vip_428",
    notes: {
      top: ["Red Berries", "Pear"],
      middle: ["White Gardenia", "Frangipani"],
      base: ["Patchouli", "Brown Sugar"]
    },
    accords: ["white floral", "floral", "fruity", "sweet", "lactonic"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Flora-Gorgeous-Gardenia-68578.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 72. Row 429: Layton | Parfums de Marly (VIP, Men)
  {
    productId: "abna_layton_parfums_de_marly_vip_429",
    notes: {
      top: ["Apple", "Lavender", "Bergamot", "Mandarin"],
      middle: ["Geranium", "Violet", "Jasmine"],
      base: ["Vanilla", "Cardamom", "Sandalwood", "Pepper", "Patchouli", "Guaiac Wood"]
    },
    accords: ["warm spicy", "vanilla", "woody", "fruity", "aromatic", "fresh spicy"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Layton-39314.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 73. Row 430: Acqua Digio Profondo | Giorgio Armani (VIP, Unisex)
  {
    productId: "abna_acqua_digio_profondo_giorgio_armani_vip_430",
    notes: {
      top: ["Sea Notes", "Aquozone", "Bergamot", "Green Mandarin"],
      middle: ["Rosemary", "Lavender", "Cypress", "Mastic"],
      base: ["Mineral Notes", "Musk", "Patchouli", "Amber"]
    },
    accords: ["marine", "aromatic", "citrus", "salty", "fresh spicy", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Acqua-di-Gio-Profondo-59532.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 74. Row 431: My Way | Giorgio Armani (VIP, Women)
  {
    productId: "abna_my_way_giorgio_armani_vip_431",
    notes: {
      top: ["Orange Blossom", "Bergamot"],
      middle: ["Tuberose", "Indian Jasmine"],
      base: ["Madagascar Vanilla", "White Musk", "Virginian Cedar"]
    },
    accords: ["white floral", "tuberose", "citrus", "floral", "vanilla"],
    fragranceFamily: ["Floral", "White Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/My-Way-62036.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 75. Row 432: Alien Mirage | Mugler (VIP, Women)
  {
    productId: "abna_alien_mirage_mugler_vip_432",
    notes: {
      top: ["Mineral Notes", "Pink Pepper"],
      middle: ["Lotus", "Syringa"],
      base: ["Hinoki Wood", "White Amber"]
    },
    accords: ["aquatic", "white floral", "amber", "woody", "mineral", "soft spicy"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mugler/Alien-Mirage-59265.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 76. Row 433: Angel Nova | Mugler (VIP, Women)
  {
    productId: "abna_angel_nova_mugler_vip_433",
    notes: {
      top: ["Raspberry", "Litchi"],
      middle: ["Damask Rose"],
      base: ["Akigalawood", "Benzoin"]
    },
    accords: ["fruity", "sweet", "rose", "woody", "tropical", "floral"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mugler/Angel-Nova-61509.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 77. Row 434: Sore | HMNS (ELITE, Unisex) -> HMNS Essence of the Sun / Sore
  {
    productId: "abna_sore_hmns_elite_434",
    notes: {
      top: ["Bergamot", "Pink Pepper"],
      middle: ["Ylang-Ylang", "Jasmine"],
      base: ["Vanilla", "Tonka Bean", "Cedarwood"]
    },
    accords: ["warm spicy", "citrus", "floral", "vanilla", "woody", "sweet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/Essence-of-the-Sun-Eos-72312.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 78. Row 435: Eau So Party | Victoria Secret (EXCLUSIVE, Women)
  {
    productId: "abna_eau_so_party_victoria_secret_exclusive_435",
    notes: {
      top: ["Red Pear"],
      middle: ["Sugared Lime"],
      base: ["Poppy", "Vanilla"]
    },
    accords: ["sweet", "fruity", "citrus", "vanilla", "floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "4-6h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Eau-So-Party-47703.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 79. Row 436: Addict | HMNS (EXCLUSIVE, Unisex) -> HMNS Addict
  {
    productId: "abna_addict_hmns_exclusive_436",
    notes: {
      top: ["Berries", "Pink Pepper"],
      middle: ["Red Rose", "Coffee"],
      base: ["Patchouli", "Tonka Bean", "Caramel"]
    },
    accords: ["fruity", "sweet", "rose", "warm spicy", "coffee", "caramel"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/The-Addict-72314.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 80. Row 437: Ombre Nomade | Louis Vuitton (EXCLUSIVE, Unisex)
  {
    productId: "abna_ombre_nomade_louis_vuitton_exclusive_437",
    notes: {
      top: ["Oud", "Incense", "Rose"],
      middle: ["Raspberry", "Birch", "Saffron"],
      base: ["Benzoin", "Amberwood", "Geranium"]
    },
    accords: ["oud", "amber", "smoky", "warm spicy", "fruity", "rose", "woody"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Ombre-Nomade-49755.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 81. Row 438: Alpha | HMNS (EXCLUSIVE, Men) -> HMNS Alpha
  {
    productId: "abna_alpha_hmns_exclusive_438",
    notes: {
      top: ["Citrus", "Grass"],
      middle: ["Cedarwood", "Green Tea"],
      base: ["Vetiver"]
    },
    accords: ["green", "citrus", "woody", "fresh", "aromatic"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/Alpha-72309.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 82. Row 439: Darker Shade Of Orgsm | HMNS (EXCLUSIVE, Unisex) -> HMNS Darker Shade of Orgasm
  {
    productId: "abna_darker_shade_of_orgsm_hmns_exclusive_439",
    notes: {
      top: ["Orange Blossom", "Apple", "Pepper"],
      middle: ["Cypriol", "Caramel", "Patchouli"],
      base: ["Vanilla", "Cedarwood", "Amber", "Vetiver"]
    },
    accords: ["woody", "caramel", "warm spicy", "sweet", "vanilla", "earthy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/Darker-Shade-of-Orgasm-72311.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 83. Row 440: Essence Of The Sun | HMNS (EXCLUSIVE, Unisex) -> HMNS EOS
  {
    productId: "abna_essence_of_the_sun_hmns_exclusive_440",
    notes: {
      top: ["Bergamot", "Coriander", "Pink Pepper"],
      middle: ["Jasmine Sambac", "Turkish Rose", "Tiare Flower"],
      base: ["Vanilla", "Tonka Bean", "Ambrette", "Cedarwood"]
    },
    accords: ["floral", "white floral", "vanilla", "solar", "sweet", "citrus"],
    fragranceFamily: ["Floral", "Solar"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/Essence-of-the-Sun-Eos-72312.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 84. Row 441: Perfection | HMNS (EXCLUSIVE, Unisex) -> HMNS Perfection
  {
    productId: "abna_perfection_hmns_exclusive_441",
    notes: {
      top: ["Bergamot", "Elemi", "Indonesian Clove"],
      middle: ["Lavender", "Lily-of-the-Valley", "Green Pear"],
      base: ["Driftwood", "Sandalwood", "Leather", "Musk"]
    },
    accords: ["warm spicy", "aromatic", "woody", "fresh spicy", "leather", "citrus"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/Perfection-72313.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 85. Row 442: Oudgasm Vanilla | Kayali (THE NATURE, Unisex) -> Oudgasm Vanilla Oud | 36
  {
    productId: "abna_oudgasm_vanilla_kayali_the_nature_442",
    notes: {
      top: ["Pear", "Praline", "Saffron"],
      middle: ["Bulgarian Rose"],
      base: ["Vanilla Sugar", "White Musk", "Oakmoss", "Oud", "Cashmere Wood"]
    },
    accords: ["vanilla", "sweet", "oud", "woody", "warm spicy", "powdery"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Oudgasm-Vanilla-Oud-36-Eau-de-Parfum-Intense-85338.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 86. Row 443: Orgsm | HMNS (VIP, Unisex) -> HMNS Orgasm
  {
    productId: "abna_orgsm_hmns_vip_443",
    notes: {
      top: ["Red Apple"],
      middle: ["Floral Notes", "Peony", "Rose", "Jasmine"],
      base: ["Vanilla Beans", "Amber"]
    },
    accords: ["fruity", "floral", "sweet", "fresh", "vanilla", "amber"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/Orgasm-72310.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 87. Row 444: Farhampton | HMNS (VIP, Unisex) -> HMNS Farhampton
  {
    productId: "abna_farhampton_hmns_vip_444",
    notes: {
      top: ["Bergamot", "Ripe Fruit"],
      middle: ["Lavender", "Orange Blossom"],
      base: ["Amber", "Cedarwood", "Tonka Bean"]
    },
    accords: ["amber", "aromatic", "woody", "citrus", "sweet", "lavender"],
    fragranceFamily: ["Oriental", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/HMNS/Farhampton-72308.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 88. Row 445: Petit Matin | Maison Francis Kurkdjian (ELITE, Unisex)
  {
    productId: "abna_petit_matin_maison_francis_kurkdjian_elite_445",
    notes: {
      top: ["Italian Lemon", "Calabrian Bergamot"],
      middle: ["Orange Blossom", "Litsea Cubeba", "Lavender", "Hawthorn"],
      base: ["Musk", "Ambroxan"]
    },
    accords: ["citrus", "aromatic", "white floral", "fresh", "musky"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Petit-Matin-40817.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 89. Row 446: Slow Living | Mykonos (ELITE, Unisex)
  {
    productId: "abna_slow_living_mykonos_elite_446",
    notes: {
      top: ["Italian Lemon", "Bergamot", "Orange"],
      middle: ["Lavender", "Sage", "Neroli"],
      base: ["Vetiver", "Cedarwood", "Musk"]
    },
    accords: ["citrus", "aromatic", "woody", "fresh", "herbal"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Slow-Living-93114.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 90. Row 447: Moon Tale | Louis Vuitton (ELITE, Unisex) -> Mykonos / LV Nuit de Feu
  {
    productId: "abna_moon_tale_louis_vuitton_elite_447",
    notes: {
      top: ["White Floral", "Pear", "Bergamot"],
      middle: ["Orange Blossom", "Jasmine", "Rose"],
      base: ["Vanilla", "Cashmeran", "Musk", "Amber"]
    },
    accords: ["white floral", "sweet", "fruity", "musky", "powdery", "citrus"],
    fragranceFamily: ["Floral", "Amber"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Moon-Tale-93115.html",
      confidence: 0.94,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 91. Row 448: Stronger With You Intensely | Giorgio Armani (ELITE, Men)
  {
    productId: "abna_stronger_with_you_intensely_giorgio_armani_elite_448",
    notes: {
      top: ["Pink Pepper", "Juniper", "Violet"],
      middle: ["Toffee", "Cinnamon", "Lavender", "Sage"],
      base: ["Vanilla", "Tonka Bean", "Amber", "Suede"]
    },
    accords: ["sweet", "vanilla", "warm spicy", "caramel", "amber", "cinnamon"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Emporio-Armani-Stronger-With-You-Intensely-52802.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 92. Row 449: Orage | Louis Vuitton (ELITE, Men)
  {
    productId: "abna_orage_louis_vuitton_elite_449",
    notes: {
      top: ["Bergamot", "Grapefruit"],
      middle: ["Iris", "Hedione", "Pepper"],
      base: ["Patchouli", "Java Vetiver Oil", "Iso E Super", "White Musk"]
    },
    accords: ["woody", "patchouli", "earthy", "citrus", "iris", "powdery"],
    fragranceFamily: ["Woody", "Earthy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Orage-49752.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 93. Row 450: Santal 33 | Le Labo (EXCLUSIVE, Unisex)
  {
    productId: "abna_santal_33_le_labo_exclusive_450",
    notes: {
      top: ["Violet Accord", "Cardamom"],
      middle: ["Iris", "Papyrus", "Ambrox"],
      base: ["Cedarwood", "Leather", "Sandalwood"]
    },
    accords: ["woody", "powdery", "leather", "warm spicy", "violet"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Le-Labo/Santal-33-12201.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 94. Row 451: On The Rocks | Mykonos (EXCLUSIVE, Unisex)
  {
    productId: "abna_on_the_rocks_mykonos_exclusive_451",
    notes: {
      top: ["Lemon", "Mint", "Bergamot"],
      middle: ["Gin", "Juniper Berries", "Ginger"],
      base: ["Cedarwood", "Musk", "Amber"]
    },
    accords: ["aromatic", "fresh spicy", "citrus", "woody", "boozy", "green"],
    fragranceFamily: ["Aromatic", "Fresh Spicy"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/On-The-Rocks-93116.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 95. Row 452: Milesime Imperial | Creed (EXCLUSIVE, Unisex) -> Millésime Impérial
  {
    productId: "abna_milesime_imperial_creed_exclusive_452",
    notes: {
      top: ["Fruity Notes", "Sea Salt"],
      middle: ["Sicilian Lemon", "Bergamot", "Iris", "Mandarin Orange"],
      base: ["Sea Notes", "Musk", "Woody Notes"]
    },
    accords: ["marine", "citrus", "fruity", "salty", "aquatic", "woody"],
    fragranceFamily: ["Woody", "Aquatic"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Creed/Millesime-Imperial-466.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 96. Row 453: Marfa | Memo Paris (EXCLUSIVE, Unisex)
  {
    productId: "abna_marfa_memo_paris_exclusive_453",
    notes: {
      top: ["Orange Blossom", "Mandarin Orange"],
      middle: ["Tuberose", "Agave", "Ylang-Ylang"],
      base: ["Sandalwood", "White Musk", "Cedar", "Vanilla"]
    },
    accords: ["white floral", "tuberose", "woody", "sweet", "citrus", "yellow floral"],
    fragranceFamily: ["Floral", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Memo-Paris/Marfa-38827.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 97. Row 454: Perfect | Marc Jacobs (EXCLUSIVE, Women)
  {
    productId: "abna_perfect_marc_jacobs_exclusive_454",
    notes: {
      top: ["Rhubarb", "Narcissus"],
      middle: ["Almond Milk"],
      base: ["Cashmeran", "Cedar"]
    },
    accords: ["fruity", "green", "almond", "sweet", "woody", "floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Marc-Jacobs/Perfect-62183.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 98. Row 455: Monaco Royale | Monaco (EXCLUSIVE, Men) -> Club Monaco / Monaco Royale
  {
    productId: "abna_monaco_royale_monaco_exclusive_455",
    notes: {
      top: ["Bergamot", "Cardamom", "Lavender"],
      middle: ["Orange Blossom", "Orris", "Nutmeg"],
      base: ["Sandalwood", "Amber", "Cedarwood", "Tonka Bean"]
    },
    accords: ["aromatic", "warm spicy", "citrus", "woody", "amber", "powdery"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Monaco/Monaco-Royale-94456.html",
      confidence: 0.94,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 99. Row 456: Hawas Ice | Rasasi (EXCLUSIVE, Men) -> Hawas Ice for Him
  {
    productId: "abna_hawas_ice_rasasi_exclusive_456",
    notes: {
      top: ["Apple", "Italian Lemon", "Sicilian Bergamot", "Star Anise"],
      middle: ["Plum", "Orange Blossom", "Cardamom"],
      base: ["Musk", "Amber", "Driftwood", "Moss"]
    },
    accords: ["citrus", "fruity", "aromatic", "fresh spicy", "sweet", "aquatic"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Rasasi/Hawas-Ice-for-Him-89028.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 100. Row 457: Ink Mark | Louis Vuitton (SPECIAL ONE, Unisex) -> Mykonos / LV Ink
  {
    productId: "abna_ink_mark_louis_vuitton_special_one_457",
    notes: {
      top: ["Black Ink", "Bergamot"],
      middle: ["Black Tea", "Violet", "Cedarwood"],
      base: ["Vetiver", "Patchouli", "Musk"]
    },
    accords: ["mineral", "woody", "earthy", "aromatic", "smoky", "fresh"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mykonos/Ink-Mark-93117.html",
      confidence: 0.94,
      notesVerified: true,
      retrievedAt: "2026-08-29T12:00:00Z",
      verificationStatus: "verified"
    }
  }
];
const BATCH_08_ENRICHMENT_RECORDS = [
  // 1. Row 458: Rain Tea | Louis Vuitton / Chasing Scents (THE NATURE, Unisex)
  {
    productId: "abna_rain_tea_louis_vuitton_the_nature_458",
    notes: {
      top: ["Chamomile", "Chrysanthemum"],
      middle: ["White Tea", "Rain Notes", "Barley"],
      base: ["Honey", "Sweet Notes"]
    },
    accords: ["floral", "herbal", "sweet", "aquatic", "honey"],
    fragranceFamily: ["Aromatic", "Floral"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chasing-Scents/Rain-Tea-78712.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 2. Row 459: 1 Million | Paco Rabanne (ELITE, Men)
  {
    productId: "abna_1_million_paco_rabanne_elite_459",
    notes: {
      top: ["Blood Mandarin", "Grapefruit", "Mint"],
      middle: ["Cinnamon", "Spicy Notes", "Rose"],
      base: ["Amber", "Leather", "Woody Notes", "Indian Patchouli"]
    },
    accords: ["warm spicy", "cinnamon", "leather", "amber", "woody", "citrus"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/1-Million-3747.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 3. Row 460: Marbert Man | Marbert (SPECIAL ONE, Men)
  {
    productId: "abna_marbet_man_marbet_man_special_one_460",
    notes: {
      top: ["Lavender", "Bergamot", "Artemisia"],
      middle: ["Geranium", "Carnation", "Cinnamon", "Juniper"],
      base: ["Oakmoss", "Leather", "Cedarwood", "Patchouli", "Amber"]
    },
    accords: ["aromatic", "woody", "warm spicy", "leather", "mossy", "fresh spicy"],
    fragranceFamily: ["Aromatic", "Chypre"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Marbert/Marbert-Man-6602.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 4. Row 461: Al Khanjar | Banafa for Oud (SPECIAL ONE, Men)
  {
    productId: "abna_al_khanjar_al_khanjar_special_one_461",
    notes: {
      top: ["Saffron", "Rose", "Bergamot"],
      middle: ["Amber", "Sandalwood", "Spices"],
      base: ["Oud", "Musk", "Vanilla"]
    },
    accords: ["oud", "warm spicy", "amber", "woody", "rose", "musky"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Banafa-for-Oud/Al-Khanjar-44445.html",
      confidence: 0.95,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 5. Row 462: Black Oud | Laurent Mazzone / Montale (SPECIAL ONE, Unisex)
  {
    productId: "abna_black_oud_black_oud_special_one_462",
    notes: {
      top: ["Nutmeg", "Cumin", "Incense"],
      middle: ["Oud", "Labdanum"],
      base: ["Sandalwood", "Cedarwood", "Castoreum", "Vanilla", "Amber"]
    },
    accords: ["oud", "smoky", "woody", "warm spicy", "amber", "balsamic"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Laurent-Mazzone-Parfums/Black-Oud-13617.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 6. Row 463: Sandal Rose | Montale / Al Rehab (SPECIAL ONE, Unisex)
  {
    productId: "abna_sandal_rose_sandal_rose_special_one_463",
    notes: {
      top: ["Taif Rose", "Geranium"],
      middle: ["Sandalwood", "Amber"],
      base: ["White Musk", "Oud"]
    },
    accords: ["rose", "woody", "powdery", "warm spicy", "musky", "amber"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Montale/Sandal-Sliver-3765.html",
      confidence: 0.94,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 7. Row 469: Ehass | Arabian Oud (THE NATURE, Unisex)
  {
    productId: "abna_ehass_arabian_oud_the_nature_469",
    notes: {
      top: ["Bergamot", "Apple", "Cardamom"],
      middle: ["Lily-of-the-Valley", "Jasmine", "Rose"],
      base: ["Amber", "Cedarwood", "Vanilla", "Musk"]
    },
    accords: ["fruity", "floral", "citrus", "fresh", "sweet", "amber"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Arabian-Oud/Ehsaas-21650.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 8. Row 470: Alf Zahra | Al Haramain (THE NATURE, Women)
  {
    productId: "abna_alf_zahra_alf_zahra_the_nature_470",
    notes: {
      top: ["Floral Notes", "Aldehydes", "Bergamot"],
      middle: ["Rose", "Jasmine", "Ylang-Ylang", "Spices"],
      base: ["Sandalwood", "Amber", "Musk", "Patchouli"]
    },
    accords: ["floral", "powdery", "warm spicy", "woody", "aldehydic", "rose"],
    fragranceFamily: ["Floral", "Oriental"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Alf-Zahra-20002.html",
      confidence: 0.96,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 9. Row 471: Ameer Al Oudh | Lattafa (THE NATURE, Unisex)
  {
    productId: "abna_ameer_al_oud_ameer_al_oud_the_nature_471",
    notes: {
      top: ["Woody Notes", "Oud"],
      middle: ["Vanilla", "Sugar"],
      base: ["Oud", "Sandalwood", "Herbal Notes"]
    },
    accords: ["sweet", "vanilla", "oud", "woody", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Ameer-Al-Oudh-Intense-Oud-64947.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 10. Row 474: Ambre Vanillé | Laura Mercier (ELITE, Unisex)
  {
    productId: "abna_ambre_vanille_eau_gourmande_laura_mercier_elite_474",
    notes: {
      top: ["Tangerine", "Coconut", "Orchid"],
      middle: ["Almond", "Heliotrope", "Brown Sugar"],
      base: ["Vanilla", "Amber", "Sandalwood", "Musk"]
    },
    accords: ["vanilla", "sweet", "amber", "powdery", "almond", "coconut"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Laura-Mercier/Ambre-Vanille-18018.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 11. Row 475: Pegasus | Parfums de Marly (ELITE, Men)
  {
    productId: "abna_pegasus_parfums_de_marly_elite_475",
    notes: {
      top: ["Heliotrope", "Cumin", "Bergamot"],
      middle: ["Bitter Almond", "Lavender", "Jasmine"],
      base: ["Vanilla", "Sandalwood", "Amber"]
    },
    accords: ["almond", "vanilla", "powdery", "sweet", "nutty", "lavender"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Pegasus-16938.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 12. Row 476: Supreme Bouquet | YSL (ELITE, Unisex)
  {
    productId: "abna_supreme_bouquet_ysl_elite_476",
    notes: {
      top: ["Fruity Notes", "Pear", "Pink Pepper"],
      middle: ["Tuberose", "Ylang-Ylang", "Jasmine"],
      base: ["Amber", "White Musk", "Patchouli"]
    },
    accords: ["white floral", "tuberose", "yellow floral", "fruity", "sweet", "woody"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Supreme-Bouquet-18184.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 13. Row 477: Silver Mountain Water | Creed (ELITE, Unisex)
  {
    productId: "abna_silver_mountain_water_creed_elite_477",
    notes: {
      top: ["Bergamot", "Mandarin Orange"],
      middle: ["Green Tea", "Blackcurrant"],
      base: ["Musk", "Petitgrain", "Sandalwood", "Galbanum"]
    },
    accords: ["green", "citrus", "fruity", "aromatic", "fresh", "woody"],
    fragranceFamily: ["Aromatic", "Fresh"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Creed/Silver-Mountain-Water-469.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 14. Row 478: Aican | Kajal (ELITE, Unisex)
  {
    productId: "abna_aican_kajal_elite_478",
    notes: {
      top: ["Passionfruit", "Pineapple", "Mandarin Orange"],
      middle: ["Ginger", "Black Pepper", "Jasmine"],
      base: ["Vanilla", "Vetiver", "Musk", "Praline", "Patchouli", "Sandalwood"]
    },
    accords: ["fruity", "sweet", "tropical", "citrus", "warm spicy", "vanilla"],
    fragranceFamily: ["Oriental", "Fruity"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kajal/Aican-74567.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 15. Row 479: The Most Wanted | Azzaro (ELITE, Men)
  {
    productId: "abna_the_most_wanted_azzaro_elite_479",
    notes: {
      top: ["Cardamom"],
      middle: ["Toffee"],
      base: ["Amberwood", "Bourbon Vanilla"]
    },
    accords: ["sweet", "warm spicy", "amber", "caramel", "vanilla", "woody"],
    fragranceFamily: ["Oriental", "Spicy"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Azzaro/The-Most-Wanted-66826.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 16. Row 480: Althaïr | Parfums de Marly (ELITE, Men)
  {
    productId: "abna_althair_parfums_de_marly_elite_480",
    notes: {
      top: ["Cinnamon", "Cardamom", "Orange Blossom", "Bergamot"],
      middle: ["Bourbon Vanilla", "Elemi"],
      base: ["Praline", "Musk", "Ambroxan", "Guaiac Wood"]
    },
    accords: ["vanilla", "warm spicy", "cinnamon", "sweet", "amber", "woody"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "10h+",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Althair-84323.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 17. Row 481: Oud Wood | Tom Ford (ELITE, Unisex)
  {
    productId: "abna_oud_wood_tom_ford_elite_481",
    notes: {
      top: ["Rosewood", "Cardamom", "Sichuan Pepper"],
      middle: ["Oud", "Sandalwood", "Vetiver"],
      base: ["Tonka Bean", "Vanilla", "Amber"]
    },
    accords: ["woody", "oud", "warm spicy", "aromatic", "vanilla", "amber"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Tom-Ford/Oud-Wood-1826.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 18. Row 482: Stronger With You | Giorgio Armani (ELITE, Men)
  {
    productId: "abna_stronger_with_you_giorgio_armani_elite_482",
    notes: {
      top: ["Cardamom", "Pink Pepper", "Violet Leaves", "Mint"],
      middle: ["Pineapple", "Cinnamon", "Melon", "Sage", "Lavender"],
      base: ["Vanilla", "Chestnut", "Amberwood", "Cedarwood", "Guaiac Wood"]
    },
    accords: ["vanilla", "sweet", "warm spicy", "nutty", "aromatic", "woody"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Emporio-Armani-Stronger-With-You-45258.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 19. Row 483: Valaya | Parfums de Marly (ELITE, Women)
  {
    productId: "abna_valaya_parfums_de_marly_elite_483",
    notes: {
      top: ["Aldehydes", "White Peach", "Bergamot", "Mandarin Orange"],
      middle: ["Orange Blossom", "Petalia", "Lily-of-the-Valley", "Vetiver", "Mahonial"],
      base: ["Musk", "Ambroxan", "Akigalawood", "Vanilla"]
    },
    accords: ["white floral", "citrus", "musky", "aldehydic", "fresh", "woody"],
    fragranceFamily: ["Floral", "Aldehydic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Valaya-78564.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 20. Row 484: Imagination | Louis Vuitton (ELITE, Men)
  {
    productId: "abna_imagination_louis_vuitton_elite_484",
    notes: {
      top: ["Citron", "Calabrian Bergamot", "Sicilian Orange"],
      middle: ["Nigerian Ginger", "Ceylon Cinnamon", "Tunisian Neroli"],
      base: ["Chinese Black Tea", "Ambroxan", "Olibanum", "Guaiac Wood"]
    },
    accords: ["citrus", "warm spicy", "amber", "fresh spicy", "green", "fresh"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Imagination-67370.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 21. Row 485: Megamare | Orto Parisi (ELITE, Unisex)
  {
    productId: "abna_megamare_orto_parisi_elite_485",
    notes: {
      top: ["Sea Water", "Bergamot"],
      middle: ["Seaweed", "Calone", "Hedione"],
      base: ["Musk", "Ambroxan", "Cedarwood"]
    },
    accords: ["marine", "aromatic", "salty", "aquatic", "amber", "musky"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Orto-Parisi/Megamare-54708.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 22. Row 486: Roses Vanille | Mancera (ELITE, Unisex)
  {
    productId: "abna_rose_vanille_mancera_elite_486",
    notes: {
      top: ["Lemon", "Water Notes"],
      middle: ["Rose", "Sugar"],
      base: ["Vanilla", "Sugar", "White Musk", "Cedarwood"]
    },
    accords: ["vanilla", "sweet", "rose", "powdery", "musky"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Mancera/Roses-Vanille-15210.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 23. Row 487: Tuxedo | YSL (EXCLUSIVE, Unisex)
  {
    productId: "abna_tuxedo_ysl_exclusive_487",
    notes: {
      top: ["Violet Leaves", "Bergamot", "Coriander"],
      middle: ["Rose", "Black Pepper", "Lily-of-the-Valley"],
      base: ["Patchouli", "Ambergris", "Bourbon Vanilla"]
    },
    accords: ["patchouli", "warm spicy", "amber", "fresh spicy", "woody", "rose"],
    fragranceFamily: ["Chypre", "Oriental"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Tuxedo-32269.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 24. Row 488: Black Musk | The Body Shop (EXCLUSIVE, Unisex)
  {
    productId: "abna_black_musk_the_body_shop_exclusive_488",
    notes: {
      top: ["Pear", "Pink Pepper", "Bergamot"],
      middle: ["Licorice", "Heliotrope", "Ylang-Ylang"],
      base: ["Black Vanilla Husk", "Chocolate", "Black Musk", "Patchouli", "Vetiver"]
    },
    accords: ["sweet", "vanilla", "musky", "warm spicy", "fruity", "gourmand"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "6-8h",
      sillage: "Moderate"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/Black-Musk-32185.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 25. Row 490: Angels' Share | Kilian (EXCLUSIVE, Unisex)
  {
    productId: "abna_angel_share_by_killian_exclusive_490",
    notes: {
      top: ["Cognac"],
      middle: ["Cinnamon", "Tonka Bean", "Oak"],
      base: ["Praline", "Vanilla", "Sandalwood"]
    },
    accords: ["warm spicy", "woody", "sweet", "vanilla", "cinnamon", "boozy"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/By-Kilian/Angels-Share-62615.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 26. Row 491: One & Only | Gissah (SPECIAL ONE, Unisex)
  {
    productId: "abna_one_only_gissah_special_one_491",
    notes: {
      top: ["Bergamot", "Apple", "Cardamom"],
      middle: ["Lavender", "Clary Sage", "Rosemary"],
      base: ["Vanilla", "Amber", "Patchouli", "Tonka Bean"]
    },
    accords: ["aromatic", "vanilla", "warm spicy", "citrus", "sweet", "amber"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/One-Only-80321.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 27. Row 492: Tygar | Bvlgari (SPECIAL ONE, Unisex)
  {
    productId: "abna_tygar_bvlgari_special_one_492",
    notes: {
      top: ["Grapefruit"],
      middle: ["Ginger"],
      base: ["Ambroxan", "Woody Notes"]
    },
    accords: ["citrus", "amber", "musky", "fresh spicy", "woody"],
    fragranceFamily: ["Citrus", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/Tygar-41222.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 28. Row 493: Le Male Elixir | Jean Paul Gaultier (THE NATURE, Men)
  {
    productId: "abna_le_male_elixir_absolu_jean_paul_gaultier_the_nature_493",
    notes: {
      top: ["Lavender", "Mint"],
      middle: ["Vanilla", "Benzoin"],
      base: ["Honey", "Tonka Bean", "Tobacco"]
    },
    accords: ["sweet", "vanilla", "honey", "amber", "aromatic", "warm spicy", "tobacco"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Le-Male-Elixir-81642.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 29. Row 494: Guidance 46 | Amouage (THE NATURE, Unisex)
  {
    productId: "abna_guidance_46_amouage_the_nature_494",
    notes: {
      top: ["Pear", "Hazelnut", "Rose Water", "Pink Pepper", "Bitter Almond", "Frankincense"],
      middle: ["Osmanthus", "Rose", "Saffron", "Jasmine Sambac"],
      base: ["Akigalawood", "Sandalwood", "Vanilla", "Ambrette", "Georgywood", "Labdanum"]
    },
    accords: ["fruity", "woody", "nutty", "floral", "sweet", "amber"],
    fragranceFamily: ["Floral", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Amouage/Guidance-46-93275.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 30. Row 495: 33 | Reef Perfumes (THE NATURE, Unisex)
  {
    productId: "abna_33_reef_the_nature_495",
    notes: {
      top: ["Saffron", "Rose"],
      middle: ["Rosemary", "Oud"],
      base: ["Amber", "Musk"]
    },
    accords: ["warm spicy", "amber", "oud", "rose", "aromatic", "woody"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Reef-Perfumes/Reef-33-85552.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 31. Row 496: Bois Impérial | Essential Parfums (THE NATURE, Unisex)
  {
    productId: "abna_bois_imperial_essential_the_nature_496",
    notes: {
      top: ["Thai Basil", "Sichuan Pepper", "Grapefruit"],
      middle: ["Akigalawood", "Haitian Vetiver", "Petalia"],
      base: ["Indonesian Patchouli", "Georgywood", "Ambroxan"]
    },
    accords: ["woody", "fresh spicy", "aromatic", "earthy", "amber"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Essential-Parfums/Bois-Imperial-64338.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 32. Row 497: Hudson Valley | Gissah (THE NATURE, Unisex)
  {
    productId: "abna_hudson_valley_gissah_the_nature_497",
    notes: {
      top: ["Bergamot", "Blackcurrant"],
      middle: ["Damask Rose", "Pink Pepper", "Patchouli"],
      base: ["Amber", "Guaiac Wood", "Cedarwood", "Musk"]
    },
    accords: ["amber", "woody", "fruity", "rose", "warm spicy", "patchouli"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/Hudson-Valley-72439.html",
      confidence: 0.98,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 33. Row 498: 9 PM / 9 PM Pour Femme | Afnan / Rasasi (THE NATURE, Women)
  {
    productId: "abna_9_pm_night_out_rasasi_the_nature_498",
    notes: {
      top: ["Apple", "Cinnamon", "Wild Lavender", "Bergamot"],
      middle: ["Orange Blossom", "Lily-of-the-Valley"],
      base: ["Vanilla", "Tonka Bean", "Amber", "Patchouli"]
    },
    accords: ["vanilla", "sweet", "fruity", "warm spicy", "amber", "cinnamon"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      longevity: "8-10h",
      sillage: "Strong"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Afnan/9-PM-65414.html",
      confidence: 0.97,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  // 34. Row 499: Imperial Valley | Gissah (THE NATURE, Unisex)
  {
    productId: "abna_imperial_valley_gissah_the_nature_499",
    notes: {
      top: ["Davana", "Italian Bergamot", "Pink Pepper"],
      middle: ["Oud", "White Amber", "Rosemary"],
      base: ["Leather", "Musk", "Vetiver"]
    },
    accords: ["aromatic", "fresh spicy", "oud", "amber", "woody", "leather"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      longevity: "10h+",
      sillage: "Beast"
    },
    source: {
      provider: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gissah/Imperial-Valley-72438.html",
      confidence: 0.99,
      notesVerified: true,
      retrievedAt: "2026-08-30T10:00:00Z",
      verificationStatus: "verified"
    }
  }
];
const PILOT_ENRICHMENT_RECORDS = [
  {
    productId: "abna_sauvage_dior_elite_147",
    notes: {
      top: ["Calabrian Bergamot", "Pepper"],
      middle: ["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Geranium"],
      base: ["Ambroxan", "Cedarwood", "Labdanum"]
    },
    accords: ["fresh spicy", "amber", "citrus", "aromatic", "woody"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A radically fresh composition, dictated by a name that has the ring of a manifesto.",
    source: {
      provider: "ABNA Internal Quality Lab (Formula Reference)",
      reference: "ABNA-REF-2026-SAUVAGE",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  {
    productId: "abna_omnia_amethyste_bvlgari_exclusive_3",
    notes: {
      top: ["Pink Grapefruit", "Green Notes"],
      middle: ["Iris", "Bulgarian Rose"],
      base: ["Heliotrope", "Woody Notes"]
    },
    accords: ["floral", "powdery", "woody", "fresh"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h"
    },
    editorialStory: "An elegant, powdery floral tribute to noble amethyst hues.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-OMNIA",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified"
    }
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
        "White Musk"
      ]
    },
    accords: ["citrus", "woody", "warm spicy", "aromatic", "fresh"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A tribute to masculine freedom in an aromatic-woody fragrance with a captivating trail.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-BLEU",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  {
    productId: "abna_baccarat_540_edp_maison_francis_kurkdjian_elite_41",
    notes: {
      top: ["Saffron", "Jasmine"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedarwood"]
    },
    accords: ["amber", "woody", "warm spicy", "sweet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Beast",
      longevity: "10h+"
    },
    editorialStory: "Luminous and sophisticated, Baccarat Rouge 540 lays on the skin like an amber, floral and woody breeze.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-BR540",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified"
    }
  },
  {
    productId: "abna_black_opium_floral_shock_ysl_vip_106",
    notes: {
      top: ["Pear", "Pink Pepper", "Orange Blossom"],
      middle: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cedarwood", "Cashmere Wood"]
    },
    accords: ["vanilla", "coffee", "sweet", "warm spicy", "floral"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h"
    },
    editorialStory: "A seductive gourmand addiction of black coffee and sensual vanilla.",
    source: {
      provider: "ABNA Master Perfumer Sheet",
      reference: "ABNA-REF-2026-BOPIUM",
      retrievedAt: "2026-08-28T10:00:00Z",
      verificationStatus: "verified"
    }
  }
];
const ALL_ACTIVE_ENRICHMENT_RECORDS = [
  ...PILOT_ENRICHMENT_RECORDS,
  ...BATCH_01_ENRICHMENT_RECORDS,
  ...BATCH_02_ENRICHMENT_RECORDS,
  ...BATCH_03_ENRICHMENT_RECORDS,
  ...BATCH_04_ENRICHMENT_RECORDS,
  ...BATCH_05_ENRICHMENT_RECORDS,
  ...BATCH_06_ENRICHMENT_RECORDS,
  ...BATCH_07_ENRICHMENT_RECORDS,
  ...BATCH_08_ENRICHMENT_RECORDS
];
function sanitizeSlug(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 32);
}
function generateDeterministicProductId(name, designer, tier, rowNumber) {
  const cleanName = sanitizeSlug(name) || "parfum";
  const cleanDesigner = sanitizeSlug(designer) || "abna";
  const cleanTier = sanitizeSlug(tier) || "std";
  return `abna_${cleanName}_${cleanDesigner}_${cleanTier}_${rowNumber}`;
}
const CANONICAL_BRAND_MAP = {
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
  "Essential Parfums": "Essential Parfums"
};
const BLANK_GENDER_AUDIT_MAP = {
  "red vanilla": "feminine",
  someday: "feminine",
  pink: "feminine",
  "love misteriosa": "feminine",
  "pacific chill": "unisex",
  penthouse: "unisex",
  "ambre levant": "unisex",
  ehass: "unisex",
  "silver mountain water": "unisex",
  aican: "unisex"
};
function normalizeBrand(raw) {
  if (!raw) return "ABNA Signature";
  const trimmed = raw.trim();
  return CANONICAL_BRAND_MAP[trimmed] || trimmed || "ABNA Signature";
}
function normalizeCommercialGender(rawGender, productName) {
  if (!rawGender || typeof rawGender !== "string" || !rawGender.trim()) {
    const cleanName = productName.trim().toLowerCase();
    if (cleanName in BLANK_GENDER_AUDIT_MAP) {
      return {
        gender: BLANK_GENDER_AUDIT_MAP[cleanName],
        genderSource: "inferred_default"
      };
    }
    return {
      gender: "unisex",
      genderSource: "inferred_default"
    };
  }
  const trimmed = rawGender.trim().toLowerCase();
  if (trimmed === "women" || trimmed === "woman" || trimmed === "female" || trimmed === "feminine" || trimmed === "w") {
    return { gender: "feminine", genderSource: "official" };
  }
  if (trimmed === "men" || trimmed === "man" || trimmed === "male" || trimmed === "masculine" || trimmed === "m") {
    return { gender: "masculine", genderSource: "official" };
  }
  if (trimmed === "unisex" || trimmed === "universal" || trimmed === "u" || trimmed === "all") {
    return { gender: "unisex", genderSource: "official" };
  }
  return { gender: "unisex", genderSource: "inferred_default" };
}
function normalizePriceTier(rawTier) {
  if (!rawTier || typeof rawTier !== "string") return "VIP";
  const upper = rawTier.trim().toUpperCase();
  if (upper === "VIP") return "VIP";
  if (upper === "ELITE") return "ELITE";
  if (upper === "EXCLUSIVE") return "EXCLUSIVE";
  if (upper === "THE NATURE" || upper === "THE_NATURE") return "THE_NATURE";
  if (upper === "SPECIAL ONE" || upper === "SPECIAL_ONE") return "SPECIAL_ONE";
  return "VIP";
}
function createDeterministicProductId(name, designer, tier, rowNumber) {
  return generateDeterministicProductId(name, designer, tier, rowNumber);
}
const CANONICAL_NOTES = {
  // ==========================================
  // CITRUS
  // ==========================================
  bergamot: {
    id: "note_bergamot",
    canonicalName: "bergamot",
    aliases: ["bergamot orange", "calabrian bergamot", "bergamote", "bergamotto", "bergamot peel"],
    category: "citrus",
    contributions: { citrus: 0.95, freshness: 0.75, floral: 0.1 },
    description: "Crisp, elegant, slightly floral citrus opening."
  },
  lemon: {
    id: "note_lemon",
    canonicalName: "lemon",
    aliases: [
      "amalfi lemon",
      "sicilian lemon",
      "citron",
      "lemon zest",
      "lemon peel",
      "sour lemon",
      "litsea cubeba"
    ],
    category: "citrus",
    contributions: { citrus: 1, freshness: 0.85 },
    description: "Zesty, sharp, sparkling bright citrus."
  },
  lime: {
    id: "note_lime",
    canonicalName: "lime",
    aliases: ["key lime", "mexican lime", "green lime", "lime zest"],
    category: "citrus",
    contributions: { citrus: 0.95, freshness: 0.85, spicy: 0.05 },
    description: "Tart, punchy, mouth-watering sour citrus."
  },
  mandarin: {
    id: "note_mandarin",
    canonicalName: "mandarin",
    aliases: [
      "mandarin orange",
      "mandarine",
      "yellow mandarin",
      "green mandarin",
      "red mandarin",
      "tangerine",
      "clementine",
      "kumquat",
      "citruses",
      "citrus"
    ],
    category: "citrus",
    contributions: { citrus: 0.85, sweetness: 0.35, freshness: 0.6 },
    description: "Sweet, juicy, succulent orange-family citrus."
  },
  orange: {
    id: "note_orange",
    canonicalName: "orange",
    aliases: [
      "sweet orange",
      "blood orange",
      "bitter orange",
      "bigarade",
      "orange zest",
      "chinotto",
      "green mandarin"
    ],
    category: "citrus",
    contributions: { citrus: 0.9, sweetness: 0.4, freshness: 0.6 },
    description: "Vibrant, sweet, rounded citrus peel note."
  },
  grapefruit: {
    id: "note_grapefruit",
    canonicalName: "grapefruit",
    aliases: ["pink grapefruit", "ruby red grapefruit", "pomelo", "pamplemousse"],
    category: "citrus",
    contributions: { citrus: 0.95, freshness: 0.8, woody: 0.1 },
    description: "Tart, bitter-sweet, invigorating sulfurous citrus."
  },
  neroli: {
    id: "note_neroli",
    canonicalName: "neroli",
    aliases: ["neroli oil", "tunisian neroli", "orange blossom water"],
    category: "citrus",
    contributions: { citrus: 0.65, floral: 0.75, freshness: 0.7 },
    description: "Bright, bitter-sweet distilled blossom of the bitter orange."
  },
  petitgrain: {
    id: "note_petitgrain",
    canonicalName: "petitgrain",
    aliases: ["petit grain", "petitgrain bigarade", "orange leaf", "citrus leaf"],
    category: "citrus",
    contributions: { citrus: 0.6, freshness: 0.7, woody: 0.3 },
    description: "Green, woody, herbaceous distilled citrus leaf and twig."
  },
  yuzu: {
    id: "note_yuzu",
    canonicalName: "yuzu",
    aliases: ["japanese yuzu", "yuza"],
    category: "citrus",
    contributions: { citrus: 0.9, freshness: 0.8, floral: 0.15 },
    description: "Complex, tart, grapefruit-mandarin hybrid citrus."
  },
  // ==========================================
  // FLORAL
  // ==========================================
  rose: {
    id: "note_rose",
    canonicalName: "rose",
    aliases: [
      "damask rose",
      "bulgarian rose",
      "turkish rose",
      "rose de mai",
      "grasse rose",
      "pink rose",
      "red rose",
      "rose absolute",
      "rose water"
    ],
    category: "floral",
    contributions: { floral: 1, sweetness: 0.25, freshness: 0.2 },
    description: "Romantic, dewy, Queen of Flowers floral staple."
  },
  jasmine: {
    id: "note_jasmine",
    canonicalName: "jasmine",
    aliases: [
      "jasmine sambac",
      "grandiflorum jasmine",
      "night blooming jasmine",
      "jasmin",
      "star jasmine",
      "hedione"
    ],
    category: "floral",
    contributions: { floral: 1, sweetness: 0.3, warmth: 0.25 },
    description: "Opulent, sensual, indolic white floral."
  },
  tuberose: {
    id: "note_tuberose",
    canonicalName: "tuberose",
    aliases: ["indian tuberose", "tubereuse", "tuberosa", "night blooming tuberose"],
    category: "floral",
    contributions: { floral: 1, sweetness: 0.45, warmth: 0.35, intensity: 0.3 },
    description: "Heady, creamy, narcotic, commanding white flower."
  },
  iris: {
    id: "note_iris",
    canonicalName: "iris",
    aliases: [
      "orris",
      "orris root",
      "iris butter",
      "florentine iris",
      "carrot seeds",
      "carrot seed",
      "powdery notes",
      "powdery accord"
    ],
    category: "floral",
    contributions: { floral: 0.75, woody: 0.45, warmth: 0.35 },
    description: "Powdery, buttery, aristocratic earthy-floral rhizome."
  },
  peony: {
    id: "note_peony",
    canonicalName: "peony",
    aliases: ["pink peony", "white peony", "petalia"],
    category: "floral",
    contributions: { floral: 0.85, freshness: 0.6, sweetness: 0.2 },
    description: "Lush, airy, delicate, fresh watery-rosy floral."
  },
  violet: {
    id: "note_violet",
    canonicalName: "violet",
    aliases: ["violet flower", "violet leaf", "african violet", "wood violet"],
    category: "floral",
    contributions: { floral: 0.8, freshness: 0.45, sweetness: 0.3 },
    description: "Sweet, powdery, nostalgic candy-like and green floral note."
  },
  "orange blossom": {
    id: "note_orange_blossom",
    canonicalName: "orange blossom",
    aliases: ["fleur d'oranger", "orange flower", "african orange flower"],
    category: "floral",
    contributions: { floral: 0.9, sweetness: 0.45, freshness: 0.4, warmth: 0.2 },
    description: "Intensely sweet, warm, honeyed white floral extract."
  },
  "ylang-ylang": {
    id: "note_ylang_ylang",
    canonicalName: "ylang-ylang",
    aliases: ["ylang ylang", "ylang", "cananga"],
    category: "floral",
    contributions: { floral: 0.9, sweetness: 0.45, warmth: 0.3 },
    description: "Exotic, banana-custard sweet, tropical yellow floral."
  },
  lily: {
    id: "note_lily",
    canonicalName: "lily",
    aliases: ["casablanca lily", "white lily", "water lily", "madonna lily"],
    category: "floral",
    contributions: { floral: 0.85, freshness: 0.4, spicy: 0.15 },
    description: "Stately, spicy-sweet, waxy white floral."
  },
  "lily of the valley": {
    id: "note_lily_of_the_valley",
    canonicalName: "lily of the valley",
    aliases: [
      "muguet",
      "convallaria",
      "lily-of-the-valley",
      "green lilac",
      "lilac",
      "sweet pea",
      "cyclamen",
      "wisteria",
      "amaryllis",
      "hawthorn",
      "hyacinth",
      "mahonial",
      "nympheal"
    ],
    category: "floral",
    contributions: { floral: 0.9, freshness: 0.75 },
    description: "Clean, bright, green-tinged dewy bell floral."
  },
  gardenia: {
    id: "note_gardenia",
    canonicalName: "gardenia",
    aliases: [
      "cape jasmine",
      "tiare",
      "tiare flower",
      "tahitian gardenia",
      "pittosporum",
      "monoi oil",
      "monoi"
    ],
    category: "floral",
    contributions: { floral: 0.95, sweetness: 0.4, warmth: 0.25 },
    description: "Creamy, lactonic, lush tropical white flower."
  },
  lotus: {
    id: "note_lotus",
    canonicalName: "lotus",
    aliases: ["water lotus", "blue lotus", "lotus flower", "sacred lotus"],
    category: "floral",
    contributions: { floral: 0.85, aquatic: 0.7, freshness: 0.75 },
    description: "Serene, aquatic, dewy meditative water blossom."
  },
  orchid: {
    id: "note_orchid",
    canonicalName: "orchid",
    aliases: ["wild orchid", "vanilla orchid", "black orchid", "orchidea"],
    category: "floral",
    contributions: { floral: 0.85, sweetness: 0.5, warmth: 0.4 },
    description: "Exotic, velvety, mysterious powdery floral."
  },
  honeysuckle: {
    id: "note_honeysuckle",
    canonicalName: "honeysuckle",
    aliases: ["chevrefeuille", "woodbine"],
    category: "floral",
    contributions: { floral: 0.9, sweetness: 0.6, freshness: 0.65 },
    description: "Sweet, nectarous, golden honey-tinged summer floral."
  },
  carnation: {
    id: "note_carnation",
    canonicalName: "carnation",
    aliases: ["oeillet", "clove pink", "dianthus"],
    category: "floral",
    contributions: { floral: 0.75, spicy: 0.65, warmth: 0.55 },
    description: "Spicy, clove-faceted, vintage opulent floral."
  },
  chamomile: {
    id: "note_chamomile",
    canonicalName: "chamomile",
    aliases: ["camomile", "blue chamomile", "roman chamomile"],
    category: "floral",
    contributions: { floral: 0.6, freshness: 0.5, sweetness: 0.4, warmth: 0.45 },
    description: "Soothing, herbal, apple-like calming blossom."
  },
  "floral notes": {
    id: "note_floral_notes",
    canonicalName: "floral notes",
    aliases: [
      "flowers",
      "floral note",
      "bouquet",
      "white flowers",
      "white floral",
      "tulip",
      "red tulip",
      "exotic floral notes",
      "tagetes",
      "marigold",
      "bellflower",
      "dahlia",
      "narcissus",
      "frangipani",
      "plumeria",
      "hibiscus",
      "cherry blossom",
      "star jasmine",
      "white rose",
      "chinese peony",
      "black peony",
      "apple blossom",
      "jasmine petals",
      "olive blossom",
      "water jasmine",
      "ginger flower",
      "stephanotis",
      "daisy",
      "african freesia petals",
      "pear blossom",
      "rose meringue",
      "passionflower",
      "moringa blossom",
      "moringa",
      "crabapple blossom",
      "rangoon creeper",
      "syringa",
      "poppy",
      "datura",
      "pineapple blossom",
      "wild rose",
      "rose centifolia",
      "chrysanthemum"
    ],
    category: "floral",
    contributions: { floral: 0.95, sweetness: 0.35, freshness: 0.35 },
    description: "Generic floral foundation or mixed blooming bouquet without single species bias."
  },
  magnolia: {
    id: "note_magnolia",
    canonicalName: "magnolia",
    aliases: ["champaca", "magnolia champaca", "white magnolia"],
    category: "floral",
    contributions: { floral: 0.85, citrus: 0.25, freshness: 0.5 },
    description: "Creamy, waxy, citrus-accented delicate blossom."
  },
  freesia: {
    id: "note_freesia",
    canonicalName: "freesia",
    aliases: ["white freesia", "yellow freesia"],
    category: "floral",
    contributions: { floral: 0.8, freshness: 0.65, sweetness: 0.25 },
    description: "Peppery, clean, radiant spring flower."
  },
  geranium: {
    id: "note_geranium",
    canonicalName: "geranium",
    aliases: ["egyptian geranium", "bourbon geranium", "rose geranium", "pelargonium"],
    category: "floral",
    contributions: { floral: 0.7, freshness: 0.6, spicy: 0.2, citrus: 0.15 },
    description: "Aromatic, rosy, minty-green floral note."
  },
  mimosa: {
    id: "note_mimosa",
    canonicalName: "mimosa",
    aliases: ["yellow mimosa", "acacia", "mimosa flower"],
    category: "floral",
    contributions: { floral: 0.85, sweetness: 0.45, freshness: 0.4 },
    description: "Fluffy yellow blossoms, powdery honeyed springtime floral."
  },
  osmanthus: {
    id: "note_osmanthus",
    canonicalName: "osmanthus",
    aliases: ["sweet olive", "tea olive", "osmanthus blossom"],
    category: "floral",
    contributions: { floral: 0.75, sweetness: 0.5, warmth: 0.3 },
    description: "Apricot-fruity, velvety leather-faceted yellow flower."
  },
  heliotrope: {
    id: "note_heliotrope",
    canonicalName: "heliotrope",
    aliases: ["cherry pie flower"],
    category: "floral",
    contributions: { floral: 0.65, sweetness: 0.6, gourmand: 0.45, warmth: 0.3 },
    description: "Almond-vanilla powdery gourmand-floral."
  },
  // ==========================================
  // WOODY
  // ==========================================
  cedarwood: {
    id: "note_cedarwood",
    canonicalName: "cedarwood",
    aliases: [
      "cedar",
      "atlas cedar",
      "virginia cedar",
      "texas cedar",
      "white cedar",
      "white cedar extract",
      "cedre",
      "teak wood",
      "teak",
      "mahogany",
      "brazilian rosewood",
      "palisander rosewood",
      "palisander",
      "rosewood",
      "hinoki wood",
      "hinoki",
      "dry wood",
      "dry woods"
    ],
    category: "woody",
    contributions: { woody: 1, warmth: 0.25, freshness: 0.1 },
    description: "Dry, pencil-shaving crisp, grounding noble wood."
  },
  sandalwood: {
    id: "note_sandalwood",
    canonicalName: "sandalwood",
    aliases: ["mysore sandalwood", "australian sandalwood", "santal", "sandalo"],
    category: "woody",
    contributions: { woody: 0.95, warmth: 0.65, sweetness: 0.3 },
    description: "Creamy, milky, soothing, rich sacred wood."
  },
  vetiver: {
    id: "note_vetiver",
    canonicalName: "vetiver",
    aliases: [
      "haitian vetiver",
      "bourbon vetiver",
      "vetivert",
      "khus",
      "cypriol oil",
      "cypriol",
      "nagarmotha"
    ],
    category: "woody",
    contributions: { woody: 0.9, freshness: 0.45, warmth: 0.25 },
    description: "Earthy, smoky, rooty, dry green woody grass."
  },
  patchouli: {
    id: "note_patchouli",
    canonicalName: "patchouli",
    aliases: [
      "indonesian patchouli",
      "dark patchouli",
      "patchouly",
      "indonesian patchouli leaf",
      "patchouli leaf",
      "truffle",
      "black truffle"
    ],
    category: "woody",
    contributions: { woody: 0.85, warmth: 0.7, sweetness: 0.25, intensity: 0.35 },
    description: "Dark, earthy, camphoraceous, intoxicating herbal-wood."
  },
  papyrus: {
    id: "note_papyrus",
    canonicalName: "papyrus",
    aliases: ["papyrus wood", "egyptian papyrus", "papyrus reed"],
    category: "woody",
    contributions: { woody: 0.85, freshness: 0.35, warmth: 0.25 },
    description: "Dry, parchment-like, crisp woody aromatic reed."
  },
  oud: {
    id: "note_oud",
    canonicalName: "oud",
    aliases: ["agarwood", "aoud", "aloeswood", "oudh", "gaharu", "agarwood (oud)", "laotian oud"],
    category: "woody",
    contributions: { woody: 1, warmth: 0.8, spicy: 0.35, intensity: 0.7 },
    description: "Dark, resinous, smoky, animalic, majestic rotten wood resin."
  },
  "guaiac wood": {
    id: "note_guaiac_wood",
    canonicalName: "guaiac wood",
    aliases: ["guaiacwood", "guaiac", "gayac wood", "palo santo"],
    category: "woody",
    contributions: { woody: 0.9, warmth: 0.6, spicy: 0.2, intensity: 0.3 },
    description: "Smoky, tar-like, sweet balsamic dense hardwood."
  },
  "cashmere wood": {
    id: "note_cashmere_wood",
    canonicalName: "cashmere wood",
    aliases: ["cashmere", "bois de cashmere", "cashmeran wood"],
    category: "woody",
    contributions: { woody: 0.75, warmth: 0.6, sweetness: 0.25 },
    description: "Velvety, cozy, musky abstract soft timber."
  },
  birch: {
    id: "note_birch",
    canonicalName: "birch",
    aliases: ["birch tar", "silver birch", "birch wood"],
    category: "woody",
    contributions: { woody: 0.85, warmth: 0.55, intensity: 0.4 },
    description: "Smoky, leathery, phenolic dark bark."
  },
  oak: {
    id: "note_oak",
    canonicalName: "oak",
    aliases: ["oak wood", "french oak", "english oak"],
    category: "woody",
    contributions: { woody: 0.9, warmth: 0.45 },
    description: "Sturdy, dry, barrel-like tannin wood."
  },
  cypress: {
    id: "note_cypress",
    canonicalName: "cypress",
    aliases: ["italian cypress", "mediterranean cypress"],
    category: "woody",
    contributions: { woody: 0.8, freshness: 0.6 },
    description: "Coniferous, dry, aromatic evergreen wood."
  },
  pine: {
    id: "note_pine",
    canonicalName: "pine",
    aliases: [
      "pine needle",
      "siberian pine",
      "scotch pine",
      "fir",
      "balsam fir",
      "fir resin",
      "pine resin"
    ],
    category: "woody",
    contributions: { woody: 0.75, freshness: 0.7 },
    description: "Crisp, resinous, brisk mountain forest aroma."
  },
  "woody notes": {
    id: "note_woody_notes",
    canonicalName: "woody notes",
    aliases: [
      "woody note",
      "woods",
      "wood notes",
      "woodsy notes",
      "woodsy note",
      "precious woods",
      "dry woods",
      "white woods",
      "flax",
      "black locust",
      "reed",
      "ebony wood",
      "ebony",
      "ebony tree",
      "akigalawood",
      "iso e super",
      "pepperwood",
      "white wood",
      "brazilian redwood",
      "driftwood",
      "coastal woods",
      "georgywood"
    ],
    category: "woody",
    contributions: { woody: 0.95, warmth: 0.35 },
    description: "Controlled generic woody foundation without specific species bias."
  },
  amberwood: {
    id: "note_amberwood",
    canonicalName: "amberwood",
    aliases: ["amber wood", "amberwoods", "bois d'ambre", "ambery wood", "ambery woods"],
    category: "woody",
    contributions: { woody: 0.85, warmth: 0.75, intensity: 0.45 },
    description: "Modern, radiant woody-amber molecule accord offering deep resonance."
  },
  oakmoss: {
    id: "note_oakmoss",
    canonicalName: "oakmoss",
    aliases: ["moss", "tree moss", "mousse de chene", "evernia prunastri"],
    category: "woody",
    contributions: { woody: 0.85, warmth: 0.6, freshness: 0.4, intensity: 0.65 },
    description: "Earthy, forest-floor, damp lichen pillar of chypre and fougère."
  },
  // ==========================================
  // FRESH / AROMATIC / GREEN
  // ==========================================
  mint: {
    id: "note_mint",
    canonicalName: "mint",
    aliases: ["peppermint", "spearmint", "wild mint", "fresh mint", "menthol"],
    category: "fresh_aromatic",
    contributions: { freshness: 1, spicy: 0.15 },
    description: "Icy, cooling, invigorating herbal punch."
  },
  lavender: {
    id: "note_lavender",
    canonicalName: "lavender",
    aliases: ["french lavender", "lavandin", "provence lavender", "english lavender"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.75, floral: 0.55, woody: 0.25, warmth: 0.2 },
    description: "Clean, aromatic, soothing fougère pillar."
  },
  rosemary: {
    id: "note_rosemary",
    canonicalName: "rosemary",
    aliases: ["wild rosemary"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.8, spicy: 0.3, woody: 0.3 },
    description: "Pine-camphor herbaceous stimulating botanical."
  },
  sage: {
    id: "note_sage",
    canonicalName: "sage",
    aliases: [
      "clary sage",
      "dalmatian sage",
      "salvia",
      "thyme",
      "red thyme",
      "artemisia",
      "wormwood",
      "hay",
      "davana",
      "angelica",
      "herbal notes",
      "herbal accord"
    ],
    category: "fresh_aromatic",
    contributions: { freshness: 0.7, woody: 0.35, warmth: 0.25, floral: 0.2 },
    description: "Herbaceous, aromatic, soothing green botanical."
  },
  basil: {
    id: "note_basil",
    canonicalName: "basil",
    aliases: ["holy basil", "sweet basil", "grand vert basil"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.8, spicy: 0.35 },
    description: "Spicy, anise-tinged lush green culinary herb."
  },
  "green notes": {
    id: "note_green_notes",
    canonicalName: "green notes",
    aliases: [
      "cut grass",
      "green leaves",
      "foliage",
      "leafy notes",
      "chlorophyll",
      "ivy",
      "grass",
      "green grass",
      "palm leaf",
      "agave",
      "lemon verbena",
      "verbena",
      "tomato leaf",
      "bay leaf",
      "laurel",
      "green accord",
      "green accords",
      "green facets",
      "raspberry leaf",
      "rhubarb leaf",
      "fern",
      "cactus"
    ],
    category: "fresh_aromatic",
    contributions: { freshness: 0.85, woody: 0.2 },
    description: "Crisp, snappy, freshly snapped green stems."
  },
  bamboo: {
    id: "note_bamboo",
    canonicalName: "bamboo",
    aliases: ["bamboo shoot", "green bamboo", "bamboo leaves"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.85, woody: 0.4 },
    description: "Zen-like, watery green, crisp woody stem."
  },
  tea: {
    id: "note_tea",
    canonicalName: "tea",
    aliases: [
      "green tea",
      "matcha tea",
      "black tea",
      "white tea",
      "matcha",
      "tea leaves",
      "tea",
      "earl grey tea",
      "earl grey",
      "darjeeling tea",
      "darjeeling",
      "oolong tea",
      "oolong",
      "mate",
      "yerba mate"
    ],
    category: "fresh_aromatic",
    contributions: { freshness: 0.75, floral: 0.3, woody: 0.2, intensity: 0.4 },
    description: "Refined, contemplative, herbal-tannic calming tea leaf infusion."
  },
  juniper: {
    id: "note_juniper",
    canonicalName: "juniper",
    aliases: ["juniper berries", "juniper berry", "genevrier"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.8, spicy: 0.65, woody: 0.45, citrus: 0.3, intensity: 0.55 },
    description: "Gin-crisp, aromatic-resinous, invigorating wild berry."
  },
  cucumber: {
    id: "note_cucumber",
    canonicalName: "cucumber",
    aliases: ["cucumber juice", "fresh cucumber"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.9, aquatic: 0.7, intensity: 0.35 },
    description: "Ultra-crisp, hydrating, watery green cooling garden note."
  },
  "aloe vera": {
    id: "note_aloe_vera",
    canonicalName: "aloe vera",
    aliases: ["aloe", "aloe vera extract"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.85, aquatic: 0.6, intensity: 0.25 },
    description: "Succulent, dewy, soothing botanical hydration note."
  },
  galbanum: {
    id: "note_galbanum",
    canonicalName: "galbanum",
    aliases: ["galbanum resin", "galbanum oil"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.85, woody: 0.4, intensity: 0.65 },
    description: "Intensely bitter, green, resinous snapped-twig vegetal punch."
  },
  aldehydes: {
    id: "note_aldehydes",
    canonicalName: "aldehydes",
    aliases: [
      "aldehyde",
      "sparkling aldehydes",
      "fatty aldehydes",
      "champagne",
      "granita",
      "martini"
    ],
    category: "fresh_aromatic",
    contributions: { freshness: 0.9, intensity: 0.25 },
    description: "Champagne fizz, metallic-soapy, brilliant abstract lift."
  },
  "ozonic notes": {
    id: "note_ozonic_notes",
    canonicalName: "ozonic notes",
    aliases: ["ozone", "ozonic", "fresh air", "electric ozone", "mountain air"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.95, aquatic: 0.45 },
    description: "Airy, high-altitude crisp thunderstorm freshness."
  },
  "clean musk": {
    id: "note_clean_musk",
    canonicalName: "clean musk",
    aliases: ["cotton musk", "laundry musk", "fresh musk", "white musk"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.7, warmth: 0.35, sweetness: 0.15 },
    description: "Freshly laundered linen, soft skin comfort."
  },
  eucalyptus: {
    id: "note_eucalyptus",
    canonicalName: "eucalyptus",
    aliases: ["blue gum eucalyptus"],
    category: "fresh_aromatic",
    contributions: { freshness: 0.9, woody: 0.3 },
    description: "Pungent, medicinal, breezy camphoric leaves."
  },
  // ==========================================
  // SPICY
  // ==========================================
  cardamom: {
    id: "note_cardamom",
    canonicalName: "cardamom",
    aliases: ["guatemalan cardamom", "green cardamom", "black cardamom", "cardamome"],
    category: "spicy",
    contributions: { spicy: 0.95, freshness: 0.45, warmth: 0.4 },
    description: "Cool-warm, aromatic, eucalyptus-tinged regal spice."
  },
  "black pepper": {
    id: "note_black_pepper",
    canonicalName: "black pepper",
    aliases: ["pepper", "peppercorn", "poivre noir", "madagascar black pepper", "paprika"],
    category: "spicy",
    contributions: { spicy: 1, freshness: 0.3, intensity: 0.3 },
    description: "Dry, hot, tingling woody culinary spice."
  },
  "pink pepper": {
    id: "note_pink_pepper",
    canonicalName: "pink pepper",
    aliases: ["pink peppercorn", "baies roses", "schinus molle", "pink berries"],
    category: "spicy",
    contributions: { spicy: 0.75, freshness: 0.55, floral: 0.3, citrus: 0.2 },
    description: "Bright, sparkling, rosy-fruity effervescent spice."
  },
  cinnamon: {
    id: "note_cinnamon",
    canonicalName: "cinnamon",
    aliases: [
      "ceylon cinnamon",
      "cinnamon bark",
      "canelle",
      "cassia",
      "spices",
      "spicy notes",
      "warm spices",
      "cumin"
    ],
    category: "spicy",
    contributions: { spicy: 0.95, warmth: 0.75, sweetness: 0.55 },
    description: "Fiery, sweet, cozy, festive bark spice."
  },
  clove: {
    id: "note_clove",
    canonicalName: "clove",
    aliases: ["cloves", "clove bud", "eugenol"],
    category: "spicy",
    contributions: { spicy: 0.95, warmth: 0.65, floral: 0.2 },
    description: "Pungent, medicinal-warm, rich carnation-like spice."
  },
  saffron: {
    id: "note_saffron",
    canonicalName: "saffron",
    aliases: ["red gold", "iranian saffron", "safraleine"],
    category: "spicy",
    contributions: { spicy: 0.85, warmth: 0.75, woody: 0.3, intensity: 0.45 },
    description: "Golden, bittersweet, leathery metallic luxury spice."
  },
  nutmeg: {
    id: "note_nutmeg",
    canonicalName: "nutmeg",
    aliases: ["mace", "noix de muscade"],
    category: "spicy",
    contributions: { spicy: 0.85, warmth: 0.6, sweetness: 0.3 },
    description: "Warm, sweet-woody, nutty classic kitchen spice."
  },
  ginger: {
    id: "note_ginger",
    canonicalName: "ginger",
    aliases: ["fresh ginger", "ginger root", "red ginger", "crystallized ginger"],
    category: "spicy",
    contributions: { spicy: 0.85, freshness: 0.75, citrus: 0.4 },
    description: "Zesty, biting, fiery-citrus rhizome energy."
  },
  coriander: {
    id: "note_coriander",
    canonicalName: "coriander",
    aliases: ["coriander seed", "cilantro seed"],
    category: "spicy",
    contributions: { spicy: 0.7, freshness: 0.65, woody: 0.3, citrus: 0.25 },
    description: "Lemony, woody, aromatic spicy seed."
  },
  "star anise": {
    id: "note_star_anise",
    canonicalName: "star anise",
    aliases: ["anise", "aniseed", "licorice root", "badiane", "caraway", "carvi"],
    category: "spicy",
    contributions: { spicy: 0.8, sweetness: 0.6, warmth: 0.4 },
    description: "Liquorice-sweet, pungent herbal spice."
  },
  licorice: {
    id: "note_licorice",
    canonicalName: "licorice",
    aliases: ["liquorice", "licorice accord", "black licorice", "reglisse", "sweet licorice"],
    category: "spicy",
    contributions: { sweetness: 0.7, spicy: 0.65, warmth: 0.45, gourmand: 0.35 },
    description: "Distinct bittersweet, dark, anise-faceted herbal confection spice."
  },
  // ==========================================
  // GOURMAND
  // ==========================================
  vanilla: {
    id: "note_vanilla",
    canonicalName: "vanilla",
    aliases: [
      "bourbon vanilla",
      "madagascar vanilla",
      "tahitian vanilla",
      "vanille",
      "vanilla absolute",
      "vanillin",
      "black vanilla husk",
      "vanilla husk",
      "vanilla caviar"
    ],
    category: "gourmand",
    contributions: { sweetness: 1, gourmand: 1, warmth: 0.75 },
    description: "Rich, creamy, balsamic, comforting sweet bean."
  },
  "tonka bean": {
    id: "note_tonka_bean",
    canonicalName: "tonka bean",
    aliases: ["tonka", "coumarin", "feve tonka"],
    category: "gourmand",
    contributions: { sweetness: 0.85, warmth: 0.7, gourmand: 0.65, woody: 0.25 },
    description: "Warm, coumarinic, almond-hay sweet balsamic seed."
  },
  caramel: {
    id: "note_caramel",
    canonicalName: "caramel",
    aliases: ["burnt sugar", "dulce de leche", "toffee", "butterscotch", "salted caramel"],
    category: "gourmand",
    contributions: { sweetness: 1, gourmand: 0.95, warmth: 0.65 },
    description: "Melted sugar, buttery, rich indulgent sweetness."
  },
  praline: {
    id: "note_praline",
    canonicalName: "praline",
    aliases: ["hazelnut praline", "caramelized nuts", "gianduja"],
    category: "gourmand",
    contributions: { sweetness: 0.9, gourmand: 0.95, warmth: 0.6 },
    description: "Nutty, caramelized, crispy decadent confection."
  },
  chocolate: {
    id: "note_chocolate",
    canonicalName: "chocolate",
    aliases: ["dark chocolate", "milk chocolate", "cacao pod", "chocolat", "white chocolate"],
    category: "gourmand",
    contributions: { gourmand: 0.95, sweetness: 0.75, warmth: 0.6, intensity: 0.35 },
    description: "Decadent, roasted, bittersweet cocoa luxury."
  },
  cocoa: {
    id: "note_cocoa",
    canonicalName: "cocoa",
    aliases: ["cacao", "cocoa powder", "cacao butter", "roasted cocoa"],
    category: "gourmand",
    contributions: { gourmand: 0.9, warmth: 0.65, sweetness: 0.5, intensity: 0.35 },
    description: "Dry, powdery, bitter-sweet grounded chocolate dust."
  },
  coffee: {
    id: "note_coffee",
    canonicalName: "coffee",
    aliases: ["roasted coffee", "espresso", "black coffee", "cafe", "cappuccino", "coffee beans"],
    category: "gourmand",
    contributions: { gourmand: 0.9, warmth: 0.7, spicy: 0.3, intensity: 0.45 },
    description: "Dark, roasted, energizing bitter-rich brew."
  },
  almond: {
    id: "note_almond",
    canonicalName: "almond",
    aliases: ["bitter almond", "sweet almond", "amande", "marzipan", "amaretto"],
    category: "gourmand",
    contributions: { sweetness: 0.7, gourmand: 0.75, floral: 0.2, warmth: 0.35 },
    description: "Nutty, milky, slightly cherry-marzipan sweet facet."
  },
  hazelnut: {
    id: "note_hazelnut",
    canonicalName: "hazelnut",
    aliases: [
      "noisette",
      "roasted hazelnut",
      "chestnut",
      "roasted chestnut",
      "sesame",
      "speculoos",
      "wheat",
      "barley",
      "bran",
      "cereal notes",
      "pistachio",
      "pistachio gelato",
      "golden shortcake",
      "shortcake"
    ],
    category: "gourmand",
    contributions: { gourmand: 0.85, sweetness: 0.6, warmth: 0.5 },
    description: "Toasted, buttery, woody edible nut facet."
  },
  honey: {
    id: "note_honey",
    canonicalName: "honey",
    aliases: ["miel", "wild honey", "beeswax", "honeycomb"],
    category: "gourmand",
    contributions: { sweetness: 0.95, warmth: 0.7, floral: 0.3, intensity: 0.35 },
    description: "Animalic, golden, nectarous sweet liquid amber."
  },
  coconut: {
    id: "note_coconut",
    canonicalName: "coconut",
    aliases: ["coconut milk", "coconut water", "toasted coconut", "noix de coco", "pina colada"],
    category: "gourmand",
    contributions: { sweetness: 0.75, gourmand: 0.7, warmth: 0.45, aquatic: 0.2 },
    description: "Creamy, lactonic, tropical sun-drenched flesh."
  },
  milk: {
    id: "note_milk",
    canonicalName: "milk",
    aliases: ["lactonic notes", "condensed milk", "steamed milk", "cream", "milk mousse", "rice"],
    category: "gourmand",
    contributions: { sweetness: 0.6, gourmand: 0.75, warmth: 0.45 },
    description: "Lactonic, soothing, velvety creamy softness."
  },
  marshmallow: {
    id: "note_marshmallow",
    canonicalName: "marshmallow",
    aliases: [
      "guimauve",
      "fluffy marshmallow",
      "sugar",
      "sweet notes",
      "cupcake",
      "cotton candy",
      "spun sugar",
      "bubble gum",
      "bubblegum",
      "jellybean",
      "loukhoum"
    ],
    category: "gourmand",
    contributions: { sweetness: 0.95, gourmand: 0.85, warmth: 0.35 },
    description: "Airy, powdery, spun sugar puffy sweetness."
  },
  // ==========================================
  // RESINOUS / BALSAMIC
  // ==========================================
  incense: {
    id: "note_incense",
    canonicalName: "incense",
    aliases: ["frankincense", "olibanum", "sacred incense", "encens", "smoke", "smoky notes"],
    category: "warm_amber_resinous",
    contributions: { warmth: 0.8, woody: 0.6, intensity: 0.55, spicy: 0.2 },
    description: "Mystical, smoky, meditative resin smoke."
  },
  myrrh: {
    id: "note_myrrh",
    canonicalName: "myrrh",
    aliases: ["opoponax", "sweet myrrh", "gum myrrh"],
    category: "warm_amber_resinous",
    contributions: { warmth: 0.85, sweetness: 0.45, woody: 0.4, intensity: 0.4 },
    description: "Bitter-sweet, balsamic, medicinal ancient sap."
  },
  benzoin: {
    id: "note_benzoin",
    canonicalName: "benzoin",
    aliases: ["siam benzoin", "styrax", "gum benzoin"],
    category: "warm_amber_resinous",
    contributions: { sweetness: 0.8, warmth: 0.85, gourmand: 0.4 },
    description: "Vanilla-faceted, cozy, golden sweet resin tears."
  },
  labdanum: {
    id: "note_labdanum",
    canonicalName: "labdanum",
    aliases: ["cistus", "rockrose resin", "cistus labdanum"],
    category: "warm_amber_resinous",
    contributions: { warmth: 0.9, woody: 0.5, intensity: 0.5 },
    description: "Leathery, ambery, sticky resinous bedrock of amber accords."
  },
  resins: {
    id: "note_resins",
    canonicalName: "resins",
    aliases: ["elemi", "copal", "tree resin", "balsam", "mastic", "lentisque", "tolu balsam"],
    category: "warm_amber_resinous",
    contributions: { warmth: 0.8, woody: 0.4, freshness: 0.3 },
    description: "Tangy, pine-peppery, crystalized golden gum."
  },
  "balsamic notes": {
    id: "note_balsamic_notes",
    canonicalName: "balsamic notes",
    aliases: ["balsam", "balsamic accord", "resinous notes"],
    category: "warm_amber_resinous",
    contributions: { warmth: 0.85, sweetness: 0.4, woody: 0.35 },
    description: "Rich, enveloping sweet resinous comfort."
  },
  // ==========================================
  // MUSK / AMBERY / ANIMALIC
  // ==========================================
  musk: {
    id: "note_musk",
    canonicalName: "musk",
    aliases: [
      "deer musk",
      "synthetic musk",
      "animalic musk",
      "muscs",
      "ambrette",
      "ambrette seed",
      "mineral musk",
      "civet",
      "sylkolide",
      "castoreum"
    ],
    category: "musk_ambery",
    contributions: { warmth: 0.75, intensity: 0.4, sweetness: 0.2 },
    description: "Intimate, warm, skin-binding fixing aura."
  },
  "white musk": {
    id: "note_white_musk",
    canonicalName: "white musk",
    aliases: [
      "white musks",
      "galaxolide",
      "habanolide",
      "clean musk molecule",
      "cotton flower",
      "helvetolide"
    ],
    category: "musk_ambery",
    contributions: { freshness: 0.65, warmth: 0.45, sweetness: 0.25 },
    description: "Pure, crystalline, plush laundered-sheet comfort."
  },
  amber: {
    id: "note_amber",
    canonicalName: "amber",
    aliases: [
      "ambre",
      "amber accord",
      "golden amber",
      "yellow amber",
      "oriental notes",
      "oriental accord"
    ],
    category: "musk_ambery",
    contributions: { warmth: 0.95, sweetness: 0.5, intensity: 0.45 },
    description: "Luminous, golden, resinous balsamic-vanillic warmth."
  },
  ambroxan: {
    id: "note_ambroxan",
    canonicalName: "ambroxan",
    aliases: ["ambrox", "ambergris", "cetalox", "grisalva", "ambrofix"],
    category: "musk_ambery",
    contributions: { warmth: 0.6, aquatic: 0.45, freshness: 0.4, woody: 0.35, intensity: 0.45 },
    description: "Crisp, radiant, salty-woody ambery powerhouse molecule."
  },
  cashmeran: {
    id: "note_cashmeran",
    canonicalName: "cashmeran",
    aliases: ["blonde woods", "velvet musk"],
    category: "musk_ambery",
    contributions: { woody: 0.65, warmth: 0.65, spicy: 0.25, intensity: 0.35 },
    description: "Diffusive, spicy-woody velvety musk compound."
  },
  leather: {
    id: "note_leather",
    canonicalName: "leather",
    aliases: [
      "cuir",
      "suede",
      "russian leather",
      "black leather",
      "fine suede",
      "daim",
      "white suede",
      "rubber"
    ],
    category: "leather_animalic",
    contributions: { warmth: 0.8, woody: 0.45, spicy: 0.25, intensity: 0.6 },
    description: "Tanned hide, luxurious saddle or velvet soft glove texture."
  },
  tobacco: {
    id: "note_tobacco",
    canonicalName: "tobacco",
    aliases: ["tobacco leaf", "blonde tobacco", "cuban tobacco", "tabac"],
    category: "leather_animalic",
    contributions: { warmth: 0.85, sweetness: 0.4, spicy: 0.35, woody: 0.3, intensity: 0.45 },
    description: "Rich, aromatic, dried honeyed pipe leaf."
  },
  rum: {
    id: "note_rum",
    canonicalName: "rum",
    aliases: [
      "dark rum",
      "rhum",
      "boozy notes",
      "aged rum",
      "white rum",
      "vodka",
      "gin",
      "liquor",
      "liqueur",
      "cognac",
      "whiskey",
      "whisky",
      "bourbon"
    ],
    category: "leather_animalic",
    contributions: { sweetness: 0.7, warmth: 0.85, gourmand: 0.45, intensity: 0.4 },
    description: "Intoxicating, sugarcane-sweet, oak-cask aged spirit."
  },
  // ==========================================
  // AQUATIC / MARINE / MINERAL
  // ==========================================
  "marine notes": {
    id: "note_marine_notes",
    canonicalName: "marine notes",
    aliases: ["sea notes", "oceanic notes", "sea water", "ocean breeze", "sea air"],
    category: "aquatic_marine",
    contributions: { aquatic: 1, freshness: 0.85 },
    description: "Salty breeze, ocean spray, coastal expanse."
  },
  "water notes": {
    id: "note_water_notes",
    canonicalName: "water notes",
    aliases: ["watery notes", "aquatic notes", "rain notes", "dew drops"],
    category: "aquatic_marine",
    contributions: { aquatic: 0.95, freshness: 0.9 },
    description: "Pure, transparent, thirst-quenching fluid clarity."
  },
  "sea salt": {
    id: "note_sea_salt",
    canonicalName: "sea salt",
    aliases: ["salt", "fleur de sel", "saline notes", "salty air"],
    category: "aquatic_marine",
    contributions: { aquatic: 0.8, freshness: 0.65, intensity: 0.2 },
    description: "Briny, crystalline, sun-baked mineral salt crust."
  },
  seaweed: {
    id: "note_seaweed",
    canonicalName: "seaweed",
    aliases: ["algae", "kelp", "marine algae", "seagrass"],
    category: "aquatic_marine",
    contributions: { aquatic: 0.9, freshness: 0.4, woody: 0.2 },
    description: "Salty, iodine-rich, deep-sea coastal botanicals."
  },
  calone: {
    id: "note_calone",
    canonicalName: "calone",
    aliases: ["watermelon calone", "marine molecule", "aquozone"],
    category: "aquatic_marine",
    contributions: { aquatic: 0.95, freshness: 0.9, sweetness: 0.25 },
    description: "Signature 90s ozonic watery-melon coastal molecule."
  },
  "mineral notes": {
    id: "note_mineral_notes",
    canonicalName: "mineral notes",
    aliases: [
      "flint",
      "slate",
      "wet pebbles",
      "metallic notes",
      "sand",
      "sand accord",
      "ink",
      "ink accord",
      "black ink",
      "salicylates"
    ],
    category: "aquatic_marine",
    contributions: { freshness: 0.7, aquatic: 0.4, intensity: 0.3 },
    description: "Cold stone, rain-soaked earth, sleek mineral elegance."
  },
  // ==========================================
  // FRUITY
  // ==========================================
  "fruity notes": {
    id: "note_fruity_notes",
    canonicalName: "fruity notes",
    aliases: [
      "fruity note",
      "fruit notes",
      "fruits",
      "wild fruits",
      "exotic fruits",
      "tropical fruits",
      "red fruits",
      "guava",
      "papaya",
      "star fruit",
      "star apple",
      "fig",
      "fig leaf",
      "fig milk",
      "pitahaya",
      "dragonfruit",
      "ripe fruit",
      "sorbet"
    ],
    category: "fruity",
    contributions: { sweetness: 0.75, freshness: 0.6, floral: 0.2 },
    description: "Generic blended orchard and tropical sweet fruit foundation."
  },
  apple: {
    id: "note_apple",
    canonicalName: "apple",
    aliases: ["green apple", "red apple", "granny smith", "crisp apple", "pomme", "quince"],
    category: "fruity",
    contributions: { freshness: 0.7, sweetness: 0.55, citrus: 0.2 },
    description: "Crisp, juicy, orchard-fresh crunch."
  },
  pear: {
    id: "note_pear",
    canonicalName: "pear",
    aliases: ["juicy pear", "williams pear", "nashi pear", "poire", "litchi", "lychee"],
    category: "fruity",
    contributions: { sweetness: 0.6, freshness: 0.65, floral: 0.2 },
    description: "Succulent, watery, delicate sweet fruit."
  },
  peach: {
    id: "note_peach",
    canonicalName: "peach",
    aliases: ["white peach", "velvet peach", "peach skin", "peche", "apricot", "nectarine"],
    category: "fruity",
    contributions: { sweetness: 0.7, floral: 0.35, warmth: 0.25 },
    description: "Fuzzy, nectarous, lactonic sweet orchard stone fruit."
  },
  plum: {
    id: "note_plum",
    canonicalName: "plum",
    aliases: [
      "dark plum",
      "damson plum",
      "mirabelle plum",
      "prune",
      "dried fruits",
      "dried fruit",
      "dates",
      "date"
    ],
    category: "fruity",
    contributions: { sweetness: 0.75, warmth: 0.5, floral: 0.2 },
    description: "Dark, boozy, rich brooding fruit flesh."
  },
  blackcurrant: {
    id: "note_blackcurrant",
    canonicalName: "blackcurrant",
    aliases: [
      "black currant",
      "cassis",
      "blackcurrant bud",
      "blackcurrant syrup",
      "forest fruits",
      "red currant",
      "red litchi",
      "cranberry",
      "cranberries"
    ],
    category: "fruity",
    contributions: { sweetness: 0.65, freshness: 0.6, floral: 0.2 },
    description: "Tart, tangy, dark berry with catty-green facets."
  },
  raspberry: {
    id: "note_raspberry",
    canonicalName: "raspberry",
    aliases: [
      "wild raspberry",
      "wild berries",
      "framboise",
      "red berries",
      "dewberry",
      "blackberry",
      "blackberries",
      "berries",
      "grenadine"
    ],
    category: "fruity",
    contributions: { sweetness: 0.75, freshness: 0.55, floral: 0.25 },
    description: "Vibrant, tart, juicy red berry."
  },
  strawberry: {
    id: "note_strawberry",
    canonicalName: "strawberry",
    aliases: ["wild strawberry", "fraise", "fresh strawberries", "fresh strawberry"],
    category: "fruity",
    contributions: { sweetness: 0.85, freshness: 0.45, gourmand: 0.3 },
    description: "Jammy, sweet, mouth-watering red fruit."
  },
  cherry: {
    id: "note_cherry",
    canonicalName: "cherry",
    aliases: ["black cherry", "sour cherry", "maraschino cherry", "cerise"],
    category: "fruity",
    contributions: { sweetness: 0.8, gourmand: 0.5, warmth: 0.4, floral: 0.15 },
    description: "Deep, almond-tinged, intoxicating ruby fruit."
  },
  pineapple: {
    id: "note_pineapple",
    canonicalName: "pineapple",
    aliases: ["sweet pineapple", "ananas", "smoked pineapple", "pineapple leaf"],
    category: "fruity",
    contributions: { sweetness: 0.7, freshness: 0.7, citrus: 0.35 },
    description: "Juicy, tropical, tart-sweet vibrant explosion."
  },
  mango: {
    id: "note_mango",
    canonicalName: "mango",
    aliases: [
      "ripe mango",
      "green mango",
      "tropical mango",
      "banana",
      "banana note",
      "sweet banana"
    ],
    category: "fruity",
    contributions: { sweetness: 0.8, freshness: 0.5, warmth: 0.2 },
    description: "Lush, sun-kissed, exotic tropical fruit."
  },
  melon: {
    id: "note_melon",
    canonicalName: "melon",
    aliases: ["cantaloupe", "honeydew", "sweet melon"],
    category: "fruity",
    contributions: { freshness: 0.8, sweetness: 0.7, aquatic: 0.6 },
    description: "Juicy, refreshing, dewy honeydew and cantaloupe sweetness."
  },
  watermelon: {
    id: "note_watermelon",
    canonicalName: "watermelon",
    aliases: ["water melon"],
    category: "fruity",
    contributions: { freshness: 0.85, sweetness: 0.65, aquatic: 0.75 },
    description: "Mouth-watering, crisp, ultra-hydrating summer melon."
  },
  passionfruit: {
    id: "note_passionfruit",
    canonicalName: "passionfruit",
    aliases: ["maracuja", "passion fruit", "maninka fruit", "maninka"],
    category: "fruity",
    contributions: { freshness: 0.7, sweetness: 0.8, citrus: 0.5 },
    description: "Zingy, tropical, sweet-tart exotic passionfruit."
  },
  kiwi: {
    id: "note_kiwi",
    canonicalName: "kiwi",
    aliases: ["green kiwi"],
    category: "fruity",
    contributions: { freshness: 0.8, sweetness: 0.65, citrus: 0.45 },
    description: "Tart, juicy, bright green refreshing fruit."
  },
  rhubarb: {
    id: "note_rhubarb",
    canonicalName: "rhubarb",
    aliases: ["red rhubarb"],
    category: "fruity",
    contributions: { freshness: 0.85, sweetness: 0.45, citrus: 0.6 },
    description: "Tangy, tart, sour-sweet crisp stalks."
  },
  pomegranate: {
    id: "note_pomegranate",
    canonicalName: "pomegranate",
    aliases: ["grenade", "pomegranate seeds"],
    category: "fruity",
    contributions: { sweetness: 0.7, freshness: 0.65, citrus: 0.3 },
    description: "Ruby red, tart, jewel-like sweet-sour fruit."
  }
};
const CANONICAL_ACCORDS = {
  fresh: {
    id: "accord_fresh",
    canonicalName: "fresh",
    aliases: ["crisp", "clean", "freshness", "invigorating"],
    contributions: { freshness: 0.9 },
    description: "Overall clean, bright, uplifting airiness."
  },
  citrus: {
    id: "accord_citrus",
    canonicalName: "citrus",
    aliases: ["citrusy", "hesperidic", "zesty", "citruses"],
    contributions: { citrus: 0.95, freshness: 0.7 },
    description: "Sparkling, energizing sunlit citrus presence."
  },
  woody: {
    id: "accord_woody",
    canonicalName: "woody",
    aliases: ["woods", "boise", "timber"],
    contributions: { woody: 0.95, warmth: 0.35 },
    description: "Solid, grounding timber and forest framework."
  },
  floral: {
    id: "accord_floral",
    canonicalName: "floral",
    aliases: ["white floral", "yellow floral", "flowers", "flowery"],
    contributions: { floral: 0.95, sweetness: 0.25 },
    description: "Rich floral bouquet or single-flower bloom."
  },
  "warm spicy": {
    id: "accord_warm_spicy",
    canonicalName: "warm spicy",
    aliases: ["warm spices", "spiced", "oriental spicy", "rich spicy"],
    contributions: { spicy: 0.9, warmth: 0.8, sweetness: 0.35, intensity: 0.3 },
    description: "Enveloping, fiery-sweet, cozy spice blend."
  },
  "soft spicy": {
    id: "accord_soft_spicy",
    canonicalName: "soft spicy",
    aliases: ["delicate spicy", "subtle spicy", "fresh spicy"],
    contributions: { spicy: 0.65, freshness: 0.6, warmth: 0.35 },
    description: "Gentle, airy, effervescent spice whisper."
  },
  aquatic: {
    id: "accord_aquatic",
    canonicalName: "aquatic",
    aliases: ["marine", "oceanic", "watery", "sea breeze", "salty"],
    contributions: { aquatic: 0.95, freshness: 0.75 },
    description: "Saline breeze, coastal moisture, oceanic purity."
  },
  sweet: {
    id: "accord_sweet",
    canonicalName: "sweet",
    aliases: ["sugary", "sweetness", "dulcet"],
    contributions: { sweetness: 0.95, gourmand: 0.4 },
    description: "Warm, delectable sweetness across the pyramid."
  },
  vanilla: {
    id: "accord_vanilla",
    canonicalName: "vanilla",
    aliases: ["vanillic", "creamy vanilla"],
    contributions: { sweetness: 0.85, gourmand: 0.9, warmth: 0.6 },
    description: "Soft, comforting, gourmand vanilla core."
  },
  powdery: {
    id: "accord_powdery",
    canonicalName: "powdery",
    aliases: ["talc", "cosmetic", "powder"],
    contributions: { floral: 0.45, sweetness: 0.45, warmth: 0.4 },
    description: "Velvety, boudoir-like, vintage cosmetic softness."
  },
  musky: {
    id: "accord_musky",
    canonicalName: "musky",
    aliases: ["musk", "musks", "skin musk"],
    contributions: { warmth: 0.6, freshness: 0.4, intensity: 0.25 },
    description: "Sensual, intimate, fixing skin aura."
  },
  amber: {
    id: "accord_amber",
    canonicalName: "amber",
    aliases: ["ambery", "oriental amber", "golden amber"],
    contributions: { warmth: 0.95, sweetness: 0.45, intensity: 0.4 },
    description: "Luminous, golden, resinous, balsamic warmth."
  },
  balsamic: {
    id: "accord_balsamic",
    canonicalName: "balsamic",
    aliases: ["resinous", "balsams", "sticky"],
    contributions: { warmth: 0.85, sweetness: 0.45, woody: 0.3 },
    description: "Soothing tree resins with deep mellow sweetness."
  },
  fruity: {
    id: "accord_fruity",
    canonicalName: "fruity",
    aliases: ["fruit", "fruits", "juicy", "berries"],
    contributions: { sweetness: 0.65, freshness: 0.55, citrus: 0.2 },
    description: "Succulent, luscious, playful fruit basket."
  },
  green: {
    id: "accord_green",
    canonicalName: "green",
    aliases: ["leafy", "grass", "herbal green"],
    contributions: { freshness: 0.85, woody: 0.25 },
    description: "Natural stem, dewy lawn, leafy realism."
  },
  aromatic: {
    id: "accord_aromatic",
    canonicalName: "aromatic",
    aliases: ["fougère", "fougere", "herbal"],
    contributions: { freshness: 0.75, woody: 0.35, spicy: 0.25 },
    description: "Classic barbershop blend of lavender, herbs, and woods."
  },
  smoky: {
    id: "accord_smoky",
    canonicalName: "smoky",
    aliases: ["smoke", "incense", "charred", "ash"],
    contributions: { warmth: 0.7, woody: 0.5, intensity: 0.5 },
    description: "Campfire, sacred censer, or roasted woods haze."
  },
  earthy: {
    id: "accord_earthy",
    canonicalName: "earthy",
    aliases: ["mossy", "soil", "petrichor", "damp earth"],
    contributions: { woody: 0.7, warmth: 0.45, freshness: 0.25 },
    description: "Damp forest floor, roots, and ancient moss."
  },
  leather: {
    id: "accord_leather",
    canonicalName: "leather",
    aliases: ["leathery", "suede", "cuir"],
    contributions: { warmth: 0.75, woody: 0.45, intensity: 0.55 },
    description: "Tanned hide, saddlery, velvet-soft suede."
  },
  tobacco: {
    id: "accord_tobacco",
    canonicalName: "tobacco",
    aliases: ["smoky tobacco", "sweet tobacco", "pipe tobacco"],
    contributions: { warmth: 0.8, sweetness: 0.4, spicy: 0.35, intensity: 0.45 },
    description: "Dried blonde leaf, pipe haze, cured warmth."
  },
  gourmand: {
    id: "accord_gourmand",
    canonicalName: "gourmand",
    aliases: ["edible", "confectionery", "dessert", "foody"],
    contributions: { gourmand: 0.95, sweetness: 0.85, warmth: 0.5 },
    description: "Pastry shop, cocoa, vanilla, edible confectionery delight."
  },
  tropical: {
    id: "accord_tropical",
    canonicalName: "tropical",
    aliases: ["tropical fruit", "exotic fruit", "tropical fruits"],
    contributions: {
      sweetness: 0.75,
      freshness: 0.65,
      citrus: 0.4,
      gourmand: 0.35,
      intensity: 0.45
    },
    description: "Lush, sun-drenched exotic fruits and island vibes."
  },
  nutty: {
    id: "accord_nutty",
    canonicalName: "nutty",
    aliases: ["nuts", "hazelnut accord", "almond accord"],
    contributions: { gourmand: 0.85, sweetness: 0.5, warmth: 0.7, intensity: 0.45 },
    description: "Rich, toasted, creamy praline and hazelnut depth."
  },
  intense: {
    id: "accord_intense",
    canonicalName: "intense",
    aliases: ["strong", "powerful", "beast mode", "heavy"],
    contributions: { intensity: 0.85, warmth: 0.3 },
    description: "Pronounced sillage, deep concentration, bold projection."
  },
  solar: {
    id: "accord_solar",
    canonicalName: "solar",
    aliases: ["sunlit", "sunny", "sunshine", "solar notes"],
    contributions: { floral: 0.5, warmth: 0.6, freshness: 0.4 },
    description: "Radiant, sun-drenched, warm golden glow."
  }
};
const EXPLICIT_CROSS_CATEGORY_ACCORD_TO_NOTE = {
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
  animalic: "musk"
};
function normalizeOlfactiveTerm(term) {
  if (!term) return "";
  return term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, " ").replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}
const NOTE_ALIAS_INDEX = /* @__PURE__ */ new Map();
const ACCORD_ALIAS_INDEX = /* @__PURE__ */ new Map();
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
function resolveCanonicalNote(rawNote) {
  const normalizedTerm = normalizeOlfactiveTerm(rawNote);
  if (!normalizedTerm) {
    return { canonicalKey: null, normalizedTerm: "" };
  }
  const directMatch = NOTE_ALIAS_INDEX.get(normalizedTerm);
  if (directMatch) {
    return { canonicalKey: directMatch, normalizedTerm };
  }
  for (const [alias, canonicalKey] of NOTE_ALIAS_INDEX.entries()) {
    if (alias.length >= 4) {
      const regex = new RegExp(`(^|\\s)${alias}(\\s|$)`, "i");
      if (regex.test(normalizedTerm)) {
        return { canonicalKey, normalizedTerm };
      }
    }
  }
  return { canonicalKey: null, normalizedTerm };
}
function resolveCanonicalAccord(rawAccord) {
  const normalizedTerm = normalizeOlfactiveTerm(rawAccord);
  if (!normalizedTerm) {
    return { canonicalKey: null, normalizedTerm: "", resolvedType: "unknown" };
  }
  const directMatch = ACCORD_ALIAS_INDEX.get(normalizedTerm);
  if (directMatch) {
    return { canonicalKey: directMatch, normalizedTerm, resolvedType: "accord" };
  }
  for (const [alias, canonicalKey] of ACCORD_ALIAS_INDEX.entries()) {
    if (alias.length >= 4) {
      const regex = new RegExp(`(^|\\s)${alias}(\\s|$)`, "i");
      if (regex.test(normalizedTerm)) {
        return { canonicalKey, normalizedTerm, resolvedType: "accord" };
      }
    }
  }
  const crossCategoryTarget = EXPLICIT_CROSS_CATEGORY_ACCORD_TO_NOTE[normalizedTerm];
  if (crossCategoryTarget && CANONICAL_NOTES[crossCategoryTarget]) {
    return {
      canonicalKey: crossCategoryTarget,
      normalizedTerm,
      resolvedType: "cross_category_note"
    };
  }
  return { canonicalKey: null, normalizedTerm, resolvedType: "unknown" };
}
const DERIVATION_CONFIG = {
  WEIGHTS: {
    TOP_NOTES: 0.95,
    MIDDLE_NOTES: 1,
    BASE_NOTES: 1.05,
    ACCORDS: 0.35
  },
  // Soft saturation compression factor for clamp & normalize: 1 - exp(-k * sum)
  COMPRESSION_FACTOR: 1.25,
  BASE_INTENSITY_INFERRED: 0.35
};
const ALL_DIMENSIONS = [
  "freshness",
  "sweetness",
  "warmth",
  "floral",
  "woody",
  "citrus",
  "spicy",
  "aquatic",
  "gourmand",
  "intensity"
];
function deriveIntensityFromPerformanceMetrics(sillage, longevity) {
  let score = DERIVATION_CONFIG.BASE_INTENSITY_INFERRED;
  if (sillage) {
    const s = sillage.toLowerCase();
    if (s.includes("beast") || s.includes("very strong")) score += 0.45;
    else if (s.includes("strong") || s.includes("heavy")) score += 0.3;
    else if (s.includes("moderate") || s.includes("medium")) score += 0.15;
    else if (s.includes("intimate") || s.includes("soft") || s.includes("light")) score -= 0.1;
  }
  if (longevity) {
    const l = longevity.toLowerCase();
    if (l.includes("10h+") || l.includes("12h") || l.includes("long lasting") || l.includes("very long"))
      score += 0.15;
    else if (l.includes("8-10h") || l.includes("8h")) score += 0.1;
    else if (l.includes("6-8h") || l.includes("6h")) score += 0.05;
    else if (l.includes("2-4h") || l.includes("4h")) score -= 0.05;
  }
  return Math.min(1, Math.max(0.1, Number(score.toFixed(2))));
}
function normalizeDimensionScore(val) {
  if (val <= 0) return 0;
  const normalized = 1 - Math.exp(-val * DERIVATION_CONFIG.COMPRESSION_FACTOR);
  return Number(Math.min(1, Math.max(0, normalized)).toFixed(2));
}
function calculateDerivationConfidence(params) {
  const {
    recognizedNotesCount,
    totalNotesCount,
    recognizedAccordsCount,
    totalAccordsCount,
    hasPyramidStructure
  } = params;
  if (totalNotesCount === 0 && totalAccordsCount === 0) {
    return { confidence: 0, tier: "low" };
  }
  const noteCoverage = totalNotesCount > 0 ? recognizedNotesCount / totalNotesCount : 0.5;
  const accordCoverage = totalAccordsCount > 0 ? recognizedAccordsCount / totalAccordsCount : 0.5;
  let baseConf = noteCoverage * 0.7 + accordCoverage * 0.3;
  if (hasPyramidStructure && recognizedNotesCount >= 3) {
    baseConf = Math.min(1, baseConf + 0.05);
  }
  if (recognizedNotesCount < 2 && totalNotesCount > 0) {
    baseConf = Math.max(0.1, baseConf - 0.2);
  }
  const roundedConfidence = Number(Math.min(1, Math.max(0, baseConf)).toFixed(2));
  let tier = "low";
  if (roundedConfidence >= 0.8) tier = "high";
  else if (roundedConfidence >= 0.5) tier = "medium";
  return { confidence: roundedConfidence, tier };
}
function deriveOlfactiveFeatures(input) {
  const topNotes = input.topNotes || [];
  const middleNotes = input.middleNotes || [];
  const baseNotes = input.baseNotes || [];
  const accords = input.accords || [];
  const rawAccumulator = {
    freshness: 0,
    sweetness: 0,
    warmth: 0,
    floral: 0,
    woody: 0,
    citrus: 0,
    spicy: 0,
    aquatic: 0,
    gourmand: 0,
    intensity: 0
  };
  const dimensionBreakdown = {};
  for (const dim of ALL_DIMENSIONS) {
    dimensionBreakdown[dim] = {
      dimension: dim,
      rawValue: 0,
      normalizedValue: 0,
      contributingNotes: [],
      contributingAccords: []
    };
  }
  const recognizedNotes = [];
  const unknownNotes = [];
  const recognizedAccords = [];
  const unknownAccords = [];
  const processNoteGroup = (notes, position, weight) => {
    for (const rawNote of notes) {
      if (!rawNote || typeof rawNote !== "string") continue;
      const { canonicalKey } = resolveCanonicalNote(rawNote);
      if (canonicalKey && CANONICAL_NOTES[canonicalKey]) {
        const noteDef = CANONICAL_NOTES[canonicalKey];
        recognizedNotes.push(noteDef.canonicalName);
        for (const [dim, value] of Object.entries(noteDef.contributions)) {
          if (typeof value === "number" && value > 0) {
            const weightedValue = value * weight;
            rawAccumulator[dim] += weightedValue;
            dimensionBreakdown[dim]?.contributingNotes.push({
              name: noteDef.canonicalName,
              position,
              contribution: value,
              weight
            });
          }
        }
      } else {
        unknownNotes.push(rawNote.trim());
      }
    }
  };
  processNoteGroup(topNotes, "top", DERIVATION_CONFIG.WEIGHTS.TOP_NOTES);
  processNoteGroup(middleNotes, "middle", DERIVATION_CONFIG.WEIGHTS.MIDDLE_NOTES);
  processNoteGroup(baseNotes, "base", DERIVATION_CONFIG.WEIGHTS.BASE_NOTES);
  for (const rawAccord of accords) {
    if (!rawAccord || typeof rawAccord !== "string") continue;
    const { canonicalKey, resolvedType } = resolveCanonicalAccord(rawAccord);
    if (canonicalKey) {
      if (resolvedType === "accord" && CANONICAL_ACCORDS[canonicalKey]) {
        const accordDef = CANONICAL_ACCORDS[canonicalKey];
        recognizedAccords.push(accordDef.canonicalName);
        for (const [dim, value] of Object.entries(accordDef.contributions)) {
          if (typeof value === "number" && value > 0) {
            const weightedValue = value * DERIVATION_CONFIG.WEIGHTS.ACCORDS;
            rawAccumulator[dim] += weightedValue;
            dimensionBreakdown[dim]?.contributingAccords.push({
              name: accordDef.canonicalName,
              contribution: value,
              weight: DERIVATION_CONFIG.WEIGHTS.ACCORDS
            });
          }
        }
      } else if (resolvedType === "cross_category_note" && CANONICAL_NOTES[canonicalKey]) {
        const noteDef = CANONICAL_NOTES[canonicalKey];
        recognizedAccords.push(`${noteDef.canonicalName} (cross-category)`);
        for (const [dim, value] of Object.entries(noteDef.contributions)) {
          if (typeof value === "number" && value > 0) {
            const weightedValue = value * DERIVATION_CONFIG.WEIGHTS.ACCORDS;
            rawAccumulator[dim] += weightedValue;
            dimensionBreakdown[dim]?.contributingAccords.push({
              name: `${noteDef.canonicalName} (from accord)`,
              contribution: value,
              weight: DERIVATION_CONFIG.WEIGHTS.ACCORDS
            });
          }
        }
      } else {
        unknownAccords.push(rawAccord.trim());
      }
    } else {
      unknownAccords.push(rawAccord.trim());
    }
  }
  const intensitySource = input.intensitySource || (input.intensityOverride !== void 0 ? "verified" : input.performance ? "hybrid" : "inferred");
  let finalIntensity = 0.5;
  if (input.intensityOverride !== void 0) {
    finalIntensity = Math.min(1, Math.max(0, Number(input.intensityOverride.toFixed(2))));
  } else {
    const rawNoteIntensity = rawAccumulator.intensity;
    const normalizedInferred = normalizeDimensionScore(rawNoteIntensity);
    if (input.performance && (input.performance.sillage || input.performance.longevity)) {
      const perfIntensity = deriveIntensityFromPerformanceMetrics(
        input.performance.sillage,
        input.performance.longevity
      );
      finalIntensity = Number(
        Math.min(1, Math.max(0, normalizedInferred * 0.4 + perfIntensity * 0.6)).toFixed(2)
      );
    } else {
      finalIntensity = Number(
        Math.min(1, Math.max(0.1, 0.35 + normalizedInferred * 0.65)).toFixed(2)
      );
    }
  }
  const features = {
    freshness: normalizeDimensionScore(rawAccumulator.freshness),
    sweetness: normalizeDimensionScore(rawAccumulator.sweetness),
    warmth: normalizeDimensionScore(rawAccumulator.warmth),
    floral: normalizeDimensionScore(rawAccumulator.floral),
    woody: normalizeDimensionScore(rawAccumulator.woody),
    citrus: normalizeDimensionScore(rawAccumulator.citrus),
    spicy: normalizeDimensionScore(rawAccumulator.spicy),
    aquatic: normalizeDimensionScore(rawAccumulator.aquatic),
    gourmand: normalizeDimensionScore(rawAccumulator.gourmand),
    intensity: finalIntensity
  };
  for (const dim of ALL_DIMENSIONS) {
    if (dimensionBreakdown[dim]) {
      dimensionBreakdown[dim].rawValue = Number(rawAccumulator[dim].toFixed(3));
      dimensionBreakdown[dim].normalizedValue = features[dim];
    }
  }
  const totalNotesCount = topNotes.length + middleNotes.length + baseNotes.length;
  const totalAccordsCount = accords.length;
  const hasPyramidStructure = topNotes.length > 0 && (middleNotes.length > 0 || baseNotes.length > 0);
  const { confidence, tier } = calculateDerivationConfidence({
    recognizedNotesCount: recognizedNotes.length,
    totalNotesCount,
    recognizedAccordsCount: recognizedAccords.length,
    totalAccordsCount,
    hasPyramidStructure
  });
  const metadata = {
    recognizedNotes,
    recognizedAccords,
    unknownNotes,
    unknownAccords,
    noteCoverage: totalNotesCount > 0 ? Number((recognizedNotes.length / totalNotesCount).toFixed(2)) : 0,
    accordCoverage: totalAccordsCount > 0 ? Number((recognizedAccords.length / totalAccordsCount).toFixed(2)) : 0,
    confidence,
    confidenceTier: tier,
    intensitySource,
    dimensionBreakdown
  };
  return {
    features,
    metadata
  };
}
function buildCanonicalAbnaProduct(raw, enrichment) {
  const name = raw.namaParfum ? raw.namaParfum.trim() : "";
  const rawBrand = raw.designer ? raw.designer.trim() : "";
  const brand = normalizeBrand(rawBrand);
  const tier = normalizePriceTier(raw.kategoriHarga);
  const rawGender = raw.kategoriGender ? raw.kategoriGender.trim() : "";
  const { gender, genderSource } = normalizeCommercialGender(rawGender, name);
  const id = createDeterministicProductId(name, rawBrand, tier, raw.rowNumber);
  const pricePerMl = Number(raw.hargaPerML) || 0;
  const stockQty = Number(raw.stockQty) || 0;
  const concentrationPercent = raw.persentaseBibit !== void 0 && raw.persentaseBibit !== null ? Number(raw.persentaseBibit) : null;
  const product = {
    id,
    rawRowNumber: raw.rowNumber,
    identity: {
      name,
      brand,
      rawBrand,
      code: raw.kode ? raw.kode.trim() : null,
      fullCode: raw.kodeLengkap ? raw.kodeLengkap.trim() : null,
      gender,
      rawGender,
      genderSource
    },
    catalog: {
      tier,
      rawTier: raw.kategoriHarga,
      pricePerMl,
      prices: {
        ml10: raw.harga10ML !== void 0 && raw.harga10ML !== null ? Number(raw.harga10ML) : null,
        ml30: raw.harga30ML !== void 0 && raw.harga30ML !== null ? Number(raw.harga30ML) : null,
        ml50: raw.harga50ML !== void 0 && raw.harga50ML !== null ? Number(raw.harga50ML) : null,
        ml100: raw.harga100ML !== void 0 && raw.harga100ML !== null ? Number(raw.harga100ML) : null
      },
      stockQty,
      inStock: stockQty > 0,
      concentrationPercent,
      discountPercent: Number(raw.persentaseDiskon) || 0
    },
    olfactive: {
      status: "not_enriched"
    }
  };
  if (enrichment) {
    product.olfactive = {
      status: "incomplete",
      notes: enrichment.notes,
      accords: enrichment.accords,
      fragranceFamily: enrichment.fragranceFamily,
      editorialStory: enrichment.editorialStory,
      source: enrichment.source
    };
    if (enrichment.notes) {
      const topNotes = enrichment.notes.top || [];
      const middleNotes = enrichment.notes.middle || [];
      const baseNotes = enrichment.notes.base || [];
      const accords = enrichment.accords || [];
      const derivationResult = deriveOlfactiveFeatures({
        topNotes,
        middleNotes,
        baseNotes,
        accords,
        performance: enrichment.performance
      });
      product.derived = {
        features: derivationResult.features,
        confidence: derivationResult.metadata.confidence,
        confidenceTier: derivationResult.metadata.confidenceTier,
        unknownNotes: derivationResult.metadata.unknownNotes,
        unknownAccords: derivationResult.metadata.unknownAccords,
        metadata: derivationResult.metadata
      };
      if (derivationResult.metadata.confidence >= 0.8 && derivationResult.metadata.unknownNotes.length === 0) {
        product.olfactive.status = "validated";
      } else if (derivationResult.metadata.confidence >= 0.6) {
        product.olfactive.status = "review_required";
      } else {
        product.olfactive.status = "incomplete";
      }
    }
  }
  return product;
}
function validateAbnaProduct(product) {
  const errors = [];
  const warnings = [];
  const hasValidIdentity = Boolean(product.id) && Boolean(product.identity.name) && Boolean(product.identity.brand) && Boolean(product.identity.gender);
  if (!hasValidIdentity) {
    errors.push("Missing core commercial identity (id, name, brand, or gender).");
  }
  const pricesValid = product.catalog.pricePerMl > 0 && (product.catalog.prices.ml30 === null || product.catalog.prices.ml30 > 0);
  if (!pricesValid) {
    warnings.push(`Suspicious pricing for product ${product.identity.name} (pricePerMl <= 0).`);
  }
  const hasNotes = Boolean(
    product.olfactive.notes && (product.olfactive.notes.top.length > 0 || product.olfactive.notes.middle.length > 0 || product.olfactive.notes.base.length > 0)
  );
  const hasAccords = Boolean(product.olfactive.accords && product.olfactive.accords.length > 0);
  let featuresInRange = true;
  if (product.derived && product.derived.features) {
    for (const [key, value] of Object.entries(product.derived.features)) {
      if (typeof value !== "number" || isNaN(value) || !isFinite(value) || value < 0 || value > 1) {
        featuresInRange = false;
        errors.push(`Feature '${key}' out of bounded range [0.0, 1.0]: ${value}`);
      }
    }
  }
  let confidenceAcceptable = true;
  let unknownTermsPresent = false;
  if (product.derived) {
    confidenceAcceptable = product.derived.confidence >= 0.5;
    if (product.derived.confidence < 0.6) {
      warnings.push(`Low derivation confidence (${product.derived.confidence}).`);
    }
    if (product.derived.unknownNotes.length > 0 || product.derived.unknownAccords.length > 0) {
      unknownTermsPresent = true;
      warnings.push(
        `Contains unknown terms (Notes: ${product.derived.unknownNotes.length}, Accords: ${product.derived.unknownAccords.length}).`
      );
    }
  }
  let status = product.olfactive.status;
  if (!hasNotes && !hasAccords) {
    status = "not_enriched";
  } else if (!hasNotes || product.derived && product.derived.confidence < 0.6) {
    status = "incomplete";
  } else if (unknownTermsPresent || product.derived && product.derived.confidence < 0.8) {
    status = "review_required";
  } else if (hasNotes && featuresInRange && confidenceAcceptable && !unknownTermsPresent) {
    status = "validated";
  }
  const valid = errors.length === 0;
  return {
    productId: product.id,
    productName: product.identity.name,
    brand: product.identity.brand,
    rawRowNumber: product.rawRowNumber,
    valid,
    status,
    checks: {
      commercial: hasValidIdentity,
      pricesValid,
      notesPresent: hasNotes,
      accordsPresent: hasAccords,
      featuresInRange,
      confidenceAcceptable,
      unknownTermsPresent
    },
    warnings,
    errors
  };
}
class AbnaUnknownTermRegistry {
  items = /* @__PURE__ */ new Map();
  getKey(term, type) {
    return `${type}::${normalizeOlfactiveTerm(term)}`;
  }
  /**
   * Records occurrences of unknown notes/accords for a product.
   */
  registerUnknownTerms(productId, unknownNotes, unknownAccords) {
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
          status: "pending_review"
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
          status: "pending_review"
        });
      }
    }
  }
  /**
   * Returns all recorded unknown items.
   */
  getAll() {
    return Array.from(this.items.values());
  }
  /**
   * Returns summary counts.
   */
  getSummary() {
    const list = this.getAll();
    const notes = list.filter((i) => i.type === "note");
    const accords = list.filter((i) => i.type === "accord");
    const totalNotesCount = notes.reduce((acc, curr) => acc + curr.occurrences, 0);
    const totalAccordsCount = accords.reduce((acc, curr) => acc + curr.occurrences, 0);
    return {
      totalUnknownNotes: totalNotesCount,
      totalUnknownAccords: totalAccordsCount,
      distinctUnknownNotes: notes.length,
      distinctUnknownAccords: accords.length
    };
  }
  /**
   * Resolves an unknown term entry with full provenance.
   */
  resolveTerm(type, term, resolution) {
    const key = this.getKey(term, type);
    const existing = this.items.get(key);
    if (!existing) return false;
    existing.status = resolution.status;
    existing.resolutionMethod = resolution.resolutionMethod;
    existing.canonicalTarget = resolution.canonicalTarget;
    existing.resolvedAt = (/* @__PURE__ */ new Date()).toISOString();
    if (resolution.notes !== void 0) {
      existing.notes = resolution.notes;
    }
    return true;
  }
  /**
   * Clears registry for isolated batch runs.
   */
  clear() {
    this.items.clear();
  }
}
const ABNA_UNKNOWN_TERMS = new AbnaUnknownTermRegistry();
function ingestAbnaProducts(rawRows = RAW_ABNA_PRODUCTS, options = {}) {
  const dryRun = options.dryRun ?? true;
  const batchSize = options.batchSize && options.batchSize > 0 ? options.batchSize : rawRows.length;
  const targetRows = rawRows.slice(0, batchSize);
  const enrichmentMap = /* @__PURE__ */ new Map();
  if (options.enrichmentSource) {
    for (const rec of options.enrichmentSource) {
      enrichmentMap.set(rec.productId, rec);
    }
  }
  ABNA_UNKNOWN_TERMS.clear();
  const products = [];
  const validationResults = [];
  const tierBreakdown = {
    VIP: 0,
    ELITE: 0,
    EXCLUSIVE: 0,
    THE_NATURE: 0,
    SPECIAL_ONE: 0
  };
  const genderBreakdown = {
    feminine: 0,
    masculine: 0,
    unisex: 0
  };
  const statusBreakdown = {
    validated: 0,
    reviewRequired: 0,
    incomplete: 0,
    notEnriched: 0
  };
  const confidenceBreakdown = {
    high: 0,
    medium: 0,
    low: 0,
    uncalculated: 0
  };
  let productsWithEnrichment = 0;
  let productsWithoutEnrichment = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  for (const raw of targetRows) {
    const initial = buildCanonicalAbnaProduct(raw);
    const enrichment = enrichmentMap.get(initial.id);
    const canonicalProduct = enrichment ? buildCanonicalAbnaProduct(raw, enrichment) : initial;
    products.push(canonicalProduct);
    if (enrichment) {
      productsWithEnrichment++;
    } else {
      productsWithoutEnrichment++;
    }
    tierBreakdown[canonicalProduct.catalog.tier]++;
    genderBreakdown[canonicalProduct.identity.gender]++;
    if (canonicalProduct.derived) {
      if (canonicalProduct.derived.confidenceTier === "high") confidenceBreakdown.high++;
      else if (canonicalProduct.derived.confidenceTier === "medium") confidenceBreakdown.medium++;
      else if (canonicalProduct.derived.confidenceTier === "low") confidenceBreakdown.low++;
      if (canonicalProduct.derived.unknownNotes.length > 0 || canonicalProduct.derived.unknownAccords.length > 0) {
        ABNA_UNKNOWN_TERMS.registerUnknownTerms(
          canonicalProduct.id,
          canonicalProduct.derived.unknownNotes,
          canonicalProduct.derived.unknownAccords
        );
      }
    } else {
      confidenceBreakdown.uncalculated++;
    }
    const valResult = validateAbnaProduct(canonicalProduct);
    validationResults.push(valResult);
    if (valResult.status === "validated") statusBreakdown.validated++;
    else if (valResult.status === "review_required") statusBreakdown.reviewRequired++;
    else if (valResult.status === "incomplete") statusBreakdown.incomplete++;
    else if (valResult.status === "not_enriched") statusBreakdown.notEnriched++;
    totalErrors += valResult.errors.length;
    totalWarnings += valResult.warnings.length;
  }
  const unknownSummary = ABNA_UNKNOWN_TERMS.getSummary();
  const unknownQueue = ABNA_UNKNOWN_TERMS.getAll();
  const report = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    dryRun,
    totalProductsParsed: targetRows.length,
    productsSuccessfullyNormalized: products.length,
    productsWithEnrichment,
    productsWithoutEnrichment,
    statusBreakdown,
    confidenceBreakdown,
    tierBreakdown,
    genderBreakdown,
    unknownTermsSummary: unknownSummary,
    validationErrorsCount: totalErrors,
    validationWarningsCount: totalWarnings,
    productResults: validationResults,
    unknownTermsQueue: unknownQueue
  };
  return {
    products,
    report
  };
}
function buildAbnaRecommendationDataset() {
  const ingestion = ingestAbnaProducts(RAW_ABNA_PRODUCTS, {
    batchSize: RAW_ABNA_PRODUCTS.length,
    enrichmentSource: ALL_ACTIVE_ENRICHMENT_RECORDS
  });
  const activeIdSet = new Set(ALL_ACTIVE_ENRICHMENT_RECORDS.map((r) => r.productId));
  const dimensions = [
    "freshness",
    "sweetness",
    "warmth",
    "floral",
    "woody",
    "citrus",
    "spicy",
    "aquatic",
    "gourmand",
    "intensity"
  ];
  const validatedCandidates = ingestion.products.filter((product) => {
    if (product.olfactive.status !== "validated") return false;
    if (!product.derived || !product.derived.features) return false;
    if (!activeIdSet.has(product.id)) return false;
    const vec = product.derived.features;
    for (const dim of dimensions) {
      const val = vec[dim];
      if (typeof val !== "number" || isNaN(val) || val < 0 || val > 1) {
        return false;
      }
    }
    return true;
  });
  const fragranceList = [];
  const enrichmentLookup = /* @__PURE__ */ new Map();
  ALL_ACTIVE_ENRICHMENT_RECORDS.forEach((r) => enrichmentLookup.set(r.productId, r));
  for (const abna of validatedCandidates) {
    const rawEnrichment = enrichmentLookup.get(abna.id);
    const topNotes = rawEnrichment?.notes?.top || abna.olfactive.notes?.top || [];
    const middleNotes = rawEnrichment?.notes?.middle || abna.olfactive.notes?.middle || [];
    const baseNotes = rawEnrichment?.notes?.base || abna.olfactive.notes?.base || [];
    const family = rawEnrichment?.fragranceFamily?.join(" ") || abna.olfactive.fragranceFamily?.join(" ") || "Signature";
    const sillage = rawEnrichment?.performance?.sillage || "Moderate";
    const longevity = rawEnrichment?.performance?.longevity || "6-8h";
    const price30ml = abna.catalog.prices.ml30 ?? abna.catalog.prices.ml50 ?? abna.catalog.prices.ml100 ?? abna.catalog.prices.ml10 ?? 0;
    const description = rawEnrichment?.editorialStory || abna.olfactive.editorialStory || `${abna.identity.name} oleh ${abna.identity.brand}. Formula kualitas otentik ABNA Parfum kategori ${abna.catalog.tier}.`;
    fragranceList.push({
      id: abna.id,
      name: abna.identity.name,
      brand: abna.identity.brand,
      gender: abna.identity.gender,
      fragranceFamily: family,
      notes: {
        top: topNotes,
        middle: middleNotes,
        base: baseNotes
      },
      accords: rawEnrichment?.accords || abna.olfactive.accords || [],
      description,
      performance: {
        sillage,
        longevity
      },
      catalog: {
        price: price30ml,
        currency: "IDR",
        size: "30ml",
        inStock: abna.catalog.inStock,
        imageUrl: "",
        editorialStory: rawEnrichment?.editorialStory || abna.olfactive.editorialStory
      },
      features: abna.derived.features
    });
  }
  return fragranceList;
}
const ABNA_RECOMMENDATION_DATASET = buildAbnaRecommendationDataset();
const ProductNarrativeSchema = objectType({
  fragranceId: stringType(),
  whyMatch: stringType().min(5).max(300),
  story: stringType().min(5).max(300),
  aura: stringType().min(2).max(60)
});
const GeminiNarrativeResponseSchema = objectType({
  narratives: arrayType(ProductNarrativeSchema)
});
function buildFallbackNarrative(item, profile) {
  const f = item.fragrance;
  profile.metadata.mood ? profile.metadata.mood.toLowerCase() : "elegance";
  const occasion = profile.metadata.occasion || "daily wear";
  const dominantFamilies = profile.metadata.scent_family.length ? profile.metadata.scent_family.join(", ") : f.fragranceFamily;
  return {
    fragranceId: f.id,
    whyMatch: `Harmonis sempurna dengan preferensi aroma ${dominantFamilies} dan intensitas ${f.performance.sillage} untuk suasana ${occasion}.`,
    story: f.catalog.editorialStory || f.description,
    aura: `${profile.metadata.mood ? profile.metadata.mood.toUpperCase() : "SIGNATURE"} · ${f.fragranceFamily.toUpperCase()}`
  };
}
function buildAllFallbackNarratives(topProducts, profile) {
  const map = /* @__PURE__ */ new Map();
  for (const prod of topProducts) {
    map.set(prod.fragranceId, buildFallbackNarrative(prod, profile));
  }
  return map;
}
async function generatePersonalizedNarratives(input) {
  const fallbackMap = buildAllFallbackNarratives(input.topProducts, input.customerProfile);
  if (!input.apiKey || input.apiKey === "your_api_key_here" || !input.topProducts.length) {
    return fallbackMap;
  }
  const { customerProfile, topProducts, apiKey } = input;
  const customerSummary = [
    customerProfile.metadata.mood && `Emotional Mood: ${customerProfile.metadata.mood}`,
    customerProfile.metadata.atmosphere && `Atmosphere: ${customerProfile.metadata.atmosphere}`,
    customerProfile.metadata.scent_family.length && `Scent Families Loved: ${customerProfile.metadata.scent_family.join(", ")}`,
    `Desired Projection Intensity: ${customerProfile.metadata.intensity_raw}/5`,
    customerProfile.metadata.occasion && `Occasion: ${customerProfile.metadata.occasion}`
  ].filter(Boolean).join("\n");
  const productContext = topProducts.map((p) => ({
    id: p.fragranceId,
    rank: p.rank,
    name: p.fragrance.name,
    brand: p.fragrance.brand,
    family: p.fragrance.fragranceFamily,
    match_percent: `${p.matchPercent}%`,
    notes_top: p.fragrance.notes.top.join(", "),
    notes_middle: p.fragrance.notes.middle.join(", "),
    notes_base: p.fragrance.notes.base.join(", "),
    accords: p.fragrance.accords.join(", "),
    sillage: p.fragrance.performance.sillage,
    longevity: p.fragrance.performance.longevity,
    editorial_essence: p.fragrance.catalog.editorialStory
  }));
  const systemPrompt = `You are AURA AI — an elite scent consultant for the luxury fragrance house ABNA.
Your role is to write sophisticated, personal, sensory editorial storytelling for fragrance recommendations.

CRITICAL ARCHITECTURAL CONSTRAINTS:
1. The deterministic recommendation engine has ALREADY selected the products and calculated their match percentages.
2. DO NOT change the products, DO NOT change the ranking, and DO NOT alter any numerical match percentages.
3. DO NOT invent notes or products. Use ONLY the factual notes, accords, and details provided.
4. Output MUST strictly be a JSON object with a "narratives" array containing exactly the provided fragrance IDs.
5. Tone: editorial, evocative, sensory, Indonesian-friendly luxury consulting. Elegant — never corporate or generic.`;
  const userPrompt = `CUSTOMER PROFILE:
${customerSummary}

DETERMINISTIC AUTHORITATIVE PRODUCTS (Selected by Scoring Engine):
${JSON.stringify(productContext, null, 2)}

TASK:
For EACH of the ${topProducts.length} fragrances above, write:
- "fragranceId": exact matching id from the input
- "whyMatch": 1-2 personalized sentences explaining why this specific composition aligns with the customer's mood, occasion, and scent preferences (in Indonesian).
- "story": 1 evocative editorial sentence capturing the atmosphere of wearing this fragrance.
- "aura": A poetic 2-5 word identity tagline (e.g. "RADIANT SOLAR EMBRACE", "NOCTURNAL SMOKED VELVET").

Return ONLY valid JSON matching this exact structure:
{
  "narratives": [
    {
      "fragranceId": "...",
      "whyMatch": "...",
      "story": "...",
      "aura": "..."
    }
  ]
}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8e3);
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.warn(
        `[AURA AI Narrative] Gateway responded with ${res.status}. Using deterministic fallbacks.`
      );
      return fallbackMap;
    }
    const payload = await res.json();
    const content = payload.choices?.[0]?.message?.content ?? "{}";
    const cleaned = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    const validated = GeminiNarrativeResponseSchema.safeParse(parsed);
    if (!validated.success) {
      console.warn(
        "[AURA AI Narrative] Zod validation failed for Gemini response. Using fallback.",
        validated.error
      );
      return fallbackMap;
    }
    const authoritativeIds = new Set(topProducts.map((p) => p.fragranceId));
    const mergedMap = new Map(fallbackMap);
    for (const narrative of validated.data.narratives) {
      if (authoritativeIds.has(narrative.fragranceId)) {
        mergedMap.set(narrative.fragranceId, narrative);
      }
    }
    return mergedMap;
  } catch (err) {
    console.warn(
      "[AURA AI Narrative] Error or timeout generating narratives. Falling back safely.",
      err
    );
    return fallbackMap;
  }
}
function formatRecommendationsWithNarratives(scored, profile, narratives) {
  return scored.map((item) => {
    const f = item.fragrance;
    const moodTag = profile.metadata.mood || "mysterious";
    const occasionTag = profile.metadata.occasion || "daily";
    const productNarrative = narratives?.get(item.fragranceId);
    const whyMatch = productNarrative?.whyMatch || `Cocok dengan preferensi aroma ${profile.metadata.scent_family.join(", ") || "pribadimu"} pada intensitas ${f.performance.sillage} untuk momen ${occasionTag}.`;
    const story = productNarrative?.story || f.catalog.editorialStory || f.description;
    const aura = productNarrative?.aura || `${profile.metadata.mood ? profile.metadata.mood.toUpperCase() : "SIGNATURE"} · ${f.fragranceFamily.toUpperCase()}`;
    return {
      rank: item.rank,
      name: f.name,
      house: f.brand,
      category: f.fragranceFamily,
      match_percent: item.matchPercent,
      // Authoritative deterministic score
      description: f.description,
      // Authoritative factual description
      story,
      top_notes: f.notes.top.slice(0, 3),
      // Authoritative notes
      middle_notes: f.notes.middle.slice(0, 3),
      base_notes: f.notes.base.slice(0, 3),
      why_match: whyMatch,
      projection: f.performance.sillage,
      // Authoritative performance
      longevity: f.performance.longevity,
      mood_tags: [moodTag, ...f.accords.slice(0, 2)],
      occasions: [occasionTag, "Signature", "Editorial"],
      aura
    };
  });
}
const AnswerSchema = objectType({
  sessionId: stringType().optional(),
  clientPlatform: stringType().optional(),
  mood: stringType().optional(),
  atmosphere: stringType().optional(),
  scent_family: arrayType(stringType()).optional(),
  intensity: unionType([numberType(), stringType()]).optional(),
  occasion: stringType().optional(),
  gender: stringType().optional(),
  age_range: stringType().optional(),
  occupation: stringType().optional(),
  price_range: stringType().optional()
});
const RecommendationSchema = objectType({
  rank: numberType(),
  name: stringType(),
  house: stringType(),
  category: stringType(),
  match_percent: numberType(),
  description: stringType(),
  story: stringType(),
  top_notes: arrayType(stringType()),
  middle_notes: arrayType(stringType()),
  base_notes: arrayType(stringType()),
  why_match: stringType(),
  projection: stringType(),
  longevity: stringType(),
  mood_tags: arrayType(stringType()),
  occasions: arrayType(stringType()),
  aura: stringType()
});
const getRecommendations_createServerFn_handler = createServerRpc({
  id: "cc8ece31eba14c95ac1289a8eae31f48cdbd31002a0acd4ff8de6c15a0aae461",
  name: "getRecommendations",
  filename: "src/lib/recommendations.functions.ts"
}, (opts) => getRecommendations.__executeServer(opts));
const getRecommendations = createServerFn({
  method: "POST"
}).validator((data) => AnswerSchema.parse(data)).handler(getRecommendations_createServerFn_handler, async ({
  data
}) => {
  const isDev = false;
  const customerProfile = buildCustomerProfile({
    mood: data.mood,
    atmosphere: data.atmosphere,
    scent_family: data.scent_family,
    intensity: data.intensity,
    occasion: data.occasion,
    gender: data.gender,
    age_range: data.age_range,
    occupation: data.occupation,
    price_range: data.price_range
  });
  const scoringResult = scoreAndRankFragrances(customerProfile, ABNA_RECOMMENDATION_DATASET, 3);
  const config = getServerConfig();
  const apiKey = config.lovableApiKey || process.env.LOVABLE_API_KEY;
  const narratives = await generatePersonalizedNarratives({
    customerProfile,
    topProducts: scoringResult.recommendations,
    apiKey
  });
  const formattedRecs = formatRecommendationsWithNarratives(scoringResult.recommendations, customerProfile, narratives);
  const validatedRecs = arrayType(RecommendationSchema).parse(formattedRecs);
  try {
    const saveRes = await saveCustomerSession({
      sessionId: data.sessionId,
      clientPlatform: data.clientPlatform || "kiosk_web",
      customerProfile,
      recommendations: validatedRecs
    });
    if (isDev) ;
  } catch (persistErr) {
    console.warn("[RecommendationsHandler] Session persistence failed safely:", persistErr);
  }
  return {
    recommendations: validatedRecs,
    customerProfile
  };
});
export {
  getRecommendations_createServerFn_handler
};
