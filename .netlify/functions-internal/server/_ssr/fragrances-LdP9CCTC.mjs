const NOTE_KEYWORD_MAP = {
  // Freshness & Citrus
  bergamot: { citrus: 0.35, freshness: 0.3 },
  lemon: { citrus: 0.4, freshness: 0.35 },
  grapefruit: { citrus: 0.35, freshness: 0.3 },
  lime: { citrus: 0.35, freshness: 0.3 },
  mandarin: { citrus: 0.3, sweetness: 0.1, freshness: 0.25 },
  orange: { citrus: 0.3, sweetness: 0.15, freshness: 0.2 },
  neroli: { floral: 0.25, citrus: 0.25, freshness: 0.3 },
  "petit grain": { citrus: 0.25, freshness: 0.25, woody: 0.1 },
  mint: { freshness: 0.45 },
  eucalyptus: { freshness: 0.4, woody: 0.1 },
  aldehydes: { freshness: 0.35 },
  calone: { aquatic: 0.5, freshness: 0.35 },
  // Aquatic & Marine
  "sea salt": { aquatic: 0.5, freshness: 0.3 },
  "sea water": { aquatic: 0.5, freshness: 0.3 },
  "marine notes": { aquatic: 0.5, freshness: 0.35 },
  seaweed: { aquatic: 0.45, freshness: 0.2 },
  ozone: { aquatic: 0.4, freshness: 0.4 },
  ambroxan: { warmth: 0.25, aquatic: 0.2, freshness: 0.2, woody: 0.15, intensity: 0.2 },
  driftwood: { woody: 0.35, aquatic: 0.3 },
  // Floral
  rose: { floral: 0.45, sweetness: 0.1 },
  jasmine: { floral: 0.45, sweetness: 0.15, warmth: 0.1 },
  "orange blossom": { floral: 0.35, sweetness: 0.2, freshness: 0.15 },
  lavender: { floral: 0.3, freshness: 0.3, woody: 0.1 },
  iris: { floral: 0.35, warmth: 0.15, woody: 0.1 },
  orris: { floral: 0.3, warmth: 0.2, woody: 0.2 },
  tuberose: { floral: 0.5, sweetness: 0.2, warmth: 0.15 },
  ylang: { floral: 0.4, sweetness: 0.2, warmth: 0.1 },
  violet: { floral: 0.35, freshness: 0.15 },
  magnolia: { floral: 0.35, freshness: 0.2 },
  peony: { floral: 0.35, freshness: 0.25 },
  // Woody & Earthy
  cedar: { woody: 0.45, warmth: 0.15 },
  cedarwood: { woody: 0.45, warmth: 0.15 },
  sandalwood: { woody: 0.4, warmth: 0.3, sweetness: 0.1 },
  vetiver: { woody: 0.4, freshness: 0.2 },
  patchouli: { woody: 0.35, warmth: 0.3, sweetness: 0.1 },
  oud: { woody: 0.5, warmth: 0.35, spicy: 0.15, intensity: 0.35 },
  agarwood: { woody: 0.5, warmth: 0.35, spicy: 0.15, intensity: 0.35 },
  guaiac: { woody: 0.4, warmth: 0.25 },
  oakmoss: { woody: 0.35, freshness: 0.2, warmth: 0.15 },
  cypress: { woody: 0.35, freshness: 0.25 },
  pine: { woody: 0.4, freshness: 0.3 },
  birch: { woody: 0.4, warmth: 0.2 },
  // Warmth, Amber & Resins
  amber: { warmth: 0.5, sweetness: 0.2, intensity: 0.2 },
  amberwood: { warmth: 0.4, woody: 0.35, intensity: 0.25 },
  benzoin: { warmth: 0.45, sweetness: 0.3, gourmand: 0.2 },
  labdanum: { warmth: 0.45, sweetness: 0.15, intensity: 0.2 },
  myrrh: { warmth: 0.4, spicy: 0.15 },
  frankincense: { warmth: 0.35, spicy: 0.2, freshness: 0.15 },
  incense: { warmth: 0.4, spicy: 0.2, intensity: 0.25 },
  musk: { warmth: 0.3, freshness: 0.2 },
  "white musk": { freshness: 0.3, warmth: 0.2 },
  leather: { warmth: 0.4, woody: 0.2, intensity: 0.3 },
  tobacco: { warmth: 0.4, spicy: 0.25, sweetness: 0.2, gourmand: 0.15, intensity: 0.25 },
  // Spices
  cardamom: { spicy: 0.45, warmth: 0.2, freshness: 0.15 },
  "black pepper": { spicy: 0.45, freshness: 0.15, intensity: 0.15 },
  "pink pepper": { spicy: 0.35, freshness: 0.25, floral: 0.1 },
  cinnamon: { spicy: 0.5, warmth: 0.3, sweetness: 0.25 },
  clove: { spicy: 0.45, warmth: 0.25 },
  nutmeg: { spicy: 0.4, warmth: 0.25 },
  saffron: { spicy: 0.4, warmth: 0.35, intensity: 0.2 },
  ginger: { spicy: 0.35, freshness: 0.35, citrus: 0.15 },
  coriander: { spicy: 0.3, freshness: 0.3, citrus: 0.15 },
  star_anise: { spicy: 0.35, sweetness: 0.25 },
  // Sweetness & Gourmand
  vanilla: { sweetness: 0.5, gourmand: 0.45, warmth: 0.3 },
  tonka: { sweetness: 0.45, gourmand: 0.4, warmth: 0.3 },
  "tonka bean": { sweetness: 0.45, gourmand: 0.4, warmth: 0.3 },
  caramel: { sweetness: 0.55, gourmand: 0.55, warmth: 0.2 },
  chocolate: { sweetness: 0.45, gourmand: 0.5, warmth: 0.3 },
  cacao: { sweetness: 0.35, gourmand: 0.45, warmth: 0.3 },
  coffee: { gourmand: 0.5, warmth: 0.35, spicy: 0.15, intensity: 0.2 },
  honey: { sweetness: 0.5, gourmand: 0.4, warmth: 0.3 },
  praline: { sweetness: 0.5, gourmand: 0.5, warmth: 0.2 },
  almond: { sweetness: 0.35, gourmand: 0.4, warmth: 0.2 },
  coconut: { sweetness: 0.4, gourmand: 0.35, freshness: 0.15 },
  sugar: { sweetness: 0.5, gourmand: 0.35 },
  rum: { sweetness: 0.35, warmth: 0.4, gourmand: 0.35, intensity: 0.25 },
  cognac: { warmth: 0.4, sweetness: 0.3, gourmand: 0.3, intensity: 0.25 }
};
const ACCORD_KEYWORD_MAP = {
  citrus: { citrus: 0.4, freshness: 0.35 },
  fresh: { freshness: 0.4 },
  "fresh spicy": { freshness: 0.3, spicy: 0.35 },
  "warm spicy": { warmth: 0.35, spicy: 0.4 },
  woody: { woody: 0.45 },
  aromatic: { freshness: 0.35, woody: 0.15 },
  floral: { floral: 0.45 },
  "white floral": { floral: 0.45, sweetness: 0.15 },
  sweet: { sweetness: 0.45, gourmand: 0.2 },
  amber: { warmth: 0.45, sweetness: 0.15 },
  marine: { aquatic: 0.5, freshness: 0.35 },
  aquatic: { aquatic: 0.5, freshness: 0.35 },
  salty: { aquatic: 0.4, freshness: 0.25 },
  vanilla: { sweetness: 0.45, gourmand: 0.45, warmth: 0.25 },
  gourmand: { gourmand: 0.5, sweetness: 0.4 },
  earthy: { woody: 0.3, warmth: 0.2 },
  smoky: { warmth: 0.35, woody: 0.25, intensity: 0.25 },
  leather: { warmth: 0.35, intensity: 0.3 },
  powdery: { floral: 0.2, sweetness: 0.2, warmth: 0.2 },
  musky: { warmth: 0.3, freshness: 0.15 },
  green: { freshness: 0.35, woody: 0.15 },
  fruity: { sweetness: 0.3, freshness: 0.25, citrus: 0.15 },
  balsamic: { warmth: 0.35, sweetness: 0.2 }
};
function matchKeywordMap(text, map) {
  const normalized = text.toLowerCase();
  const matches = [];
  for (const [key, vector] of Object.entries(map)) {
    if (normalized.includes(key)) {
      matches.push(vector);
    }
  }
  return matches;
}
function deriveIntensityFromPerformance(perf) {
  let score = 0.4;
  if (perf.sillage === "Beast") score += 0.45;
  else if (perf.sillage === "Strong") score += 0.3;
  else if (perf.sillage === "Moderate") score += 0.15;
  else if (perf.sillage === "Intimate") score -= 0.1;
  if (perf.longevity === "10h+") score += 0.15;
  else if (perf.longevity === "8-10h") score += 0.1;
  else if (perf.longevity === "6-8h") score += 0.05;
  return Math.min(1, Math.max(0.1, score));
}
function deriveFragranceFeatures(input) {
  const accumulated = {
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
  const applyVector = (vec, multiplier = 1) => {
    for (const [k, val] of Object.entries(vec)) {
      if (typeof val === "number") {
        accumulated[k] += val * multiplier;
      }
    }
  };
  for (const accord of input.accords) {
    const matches = matchKeywordMap(accord, ACCORD_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 1);
    }
  }
  for (const note of input.notes.top) {
    const matches = matchKeywordMap(note, NOTE_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 0.8);
    }
  }
  for (const note of input.notes.middle) {
    const matches = matchKeywordMap(note, NOTE_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 0.85);
    }
  }
  for (const note of input.notes.base) {
    const matches = matchKeywordMap(note, NOTE_KEYWORD_MAP);
    for (const m of matches) {
      applyVector(m, 0.9);
    }
  }
  const perfIntensity = deriveIntensityFromPerformance(input.performance);
  accumulated.intensity = accumulated.intensity * 0.4 + perfIntensity * 0.6;
  const result = {
    freshness: clampAndNormalize(accumulated.freshness),
    sweetness: clampAndNormalize(accumulated.sweetness),
    warmth: clampAndNormalize(accumulated.warmth),
    floral: clampAndNormalize(accumulated.floral),
    woody: clampAndNormalize(accumulated.woody),
    citrus: clampAndNormalize(accumulated.citrus),
    spicy: clampAndNormalize(accumulated.spicy),
    aquatic: clampAndNormalize(accumulated.aquatic),
    gourmand: clampAndNormalize(accumulated.gourmand),
    intensity: clampAndNormalize(accumulated.intensity)
  };
  if (input.featureOverrides) {
    for (const [k, val] of Object.entries(input.featureOverrides)) {
      if (typeof val === "number") {
        result[k] = Math.min(1, Math.max(0, Number(val.toFixed(2))));
      }
    }
  }
  return result;
}
function clampAndNormalize(val) {
  if (val <= 0) return 0;
  const normalized = 1 - Math.exp(-val * 1.5);
  return Number(Math.min(1, Math.max(0, normalized)).toFixed(2));
}
function normalizeFragrance(raw) {
  const derivedFeatures = deriveFragranceFeatures({
    notes: raw.notes,
    accords: raw.accords,
    performance: raw.performance,
    featureOverrides: raw.featureOverrides
  });
  return {
    id: raw.id,
    name: raw.name,
    brand: raw.brand,
    gender: raw.gender,
    fragranceFamily: raw.fragranceFamily,
    notes: raw.notes,
    accords: raw.accords,
    description: raw.description,
    performance: raw.performance,
    catalog: raw.catalog,
    features: derivedFeatures
  };
}
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
const RAW_FRAGRANCES = [
  // 1. Fresh / Citrus Reference
  {
    id: "frag_bleu_de_chanel",
    name: "Bleu de Chanel",
    brand: "Chanel",
    gender: "masculine",
    fragranceFamily: "Woody Aromatic",
    notes: {
      top: ["grapefruit", "lemon", "mint", "pink pepper", "bergamot", "aldehydes"],
      middle: ["ginger", "nutmeg", "jasmine", "melon"],
      base: ["incense", "amber", "cedar", "sandalwood", "patchouli", "labdanum", "amberwood"]
    },
    accords: ["citrus", "warm spicy", "woody", "aromatic", "amber", "fresh spicy"],
    description: "A timeless woody aromatic profile that transitions from sharp zest into deep incense and amber.",
    performance: { longevity: "8-10h", sillage: "Strong" },
    catalog: {
      price: 165,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1594035910387-fea47794261f"),
      editorialStory: "Midnight confidence etched in blue glass and citrus sparks."
    }
  },
  // 2. Pure Citrus / Neroli
  {
    id: "frag_neroli_portofino",
    name: "Neroli Portofino",
    brand: "Tom Ford",
    gender: "unisex",
    fragranceFamily: "Citrus Aromatic",
    notes: {
      top: ["bergamot", "mandarin", "lemon", "bitter orange", "lavender", "rosemary", "myrtle"],
      middle: ["african orange flower", "neroli", "jasmine", "pitosporum"],
      base: ["amber", "angelica", "ambrette"]
    },
    accords: ["citrus", "white floral", "fresh spicy", "aromatic", "floral"],
    description: "A crisp Italian Riviera morning captured in sparkling neroli and sea breeze.",
    performance: { longevity: "4-6h", sillage: "Moderate" },
    catalog: {
      price: 295,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1547514701-42782101795e"),
      editorialStory: "Sun-drenched sea foam touching golden citrus blossoms."
    }
  },
  // 3. Crisp Aquatic
  {
    id: "frag_acqua_di_gio_profondo",
    name: "Acqua di Giò Profondo",
    brand: "Giorgio Armani",
    gender: "masculine",
    fragranceFamily: "Aromatic Aquatic",
    notes: {
      top: ["marine notes", "aquatic", "green mandarin", "bergamot"],
      middle: ["rosemary", "lavender", "cypress", "lentisque"],
      base: ["mineral notes", "musk", "patchouli", "amber"]
    },
    accords: ["marine", "aromatic", "citrus", "fresh spicy", "salty", "woody"],
    description: "An intense dive into oceanic depth with bracing sea minerals and fresh aromatics.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 145,
      currency: "USD",
      size: "75ml",
      inStock: true,
      imageUrl: img("photo-1505118380757-91f5f5632de0"),
      editorialStory: "The silence of descending fifty fathoms into turquoise stillness."
    }
  },
  // 4. Salty Marine & Sage
  {
    id: "frag_wood_sage_sea_salt",
    name: "Wood Sage & Sea Salt",
    brand: "Jo Malone London",
    gender: "unisex",
    fragranceFamily: "Aromatic",
    notes: {
      top: ["ambrette seeds", "sea salt"],
      middle: ["sea salt", "sage", "mineral notes"],
      base: ["red algae", "grapefruit", "driftwood"]
    },
    accords: ["salty", "aromatic", "marine", "herbal", "musky"],
    description: "Windswept cliffs and sea spray mingled with mineral earth and woody sage.",
    performance: { longevity: "4-6h", sillage: "Intimate" },
    catalog: {
      price: 165,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1502082553048-f009c37129b9"),
      editorialStory: "A solitary walk on windswept British shores with waves breaking against stone."
    }
  },
  // 5. Bright Green Citrus
  {
    id: "frag_terre_d_hermes",
    name: "Terre d'Hermès",
    brand: "Hermès",
    gender: "masculine",
    fragranceFamily: "Woody Spicy",
    notes: {
      top: ["orange", "grapefruit"],
      middle: ["pepper", "pelargonium", "flint"],
      base: ["vetiver", "cedar", "patchouli", "benzoin"]
    },
    accords: ["citrus", "woody", "fresh spicy", "aromatic", "earthy"],
    description: "The dialogue between man and raw earth — bitter citrus over flint and dry cedarwood.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 152,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1487958449943-2429e8be8625"),
      editorialStory: "Standing tall upon mineral soil beneath the blinding midday sun."
    }
  },
  // 6. Signature Dry Cedar / Woody
  {
    id: "frag_santal_33",
    name: "Santal 33",
    brand: "Le Labo",
    gender: "unisex",
    fragranceFamily: "Woody Aromatic",
    notes: {
      top: ["violet", "cardamom"],
      middle: ["iris", "papyrus", "ambroxan"],
      base: ["cedarwood", "leather", "sandalwood"]
    },
    accords: ["woody", "powdery", "leather", "warm spicy", "violet"],
    description: "An intoxicating aura of smoky sandalwood, dry cardamom, and crackling campfires.",
    performance: { longevity: "10h+", sillage: "Strong" },
    catalog: {
      price: 320,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1448375240586-882707db888b"),
      editorialStory: "An open plain under a desert night, where cedar smoke and leather linger forever."
    }
  },
  // 7. Smoky Forest / Cypress
  {
    id: "frag_encre_noire",
    name: "Encre Noire",
    brand: "Lalique",
    gender: "masculine",
    fragranceFamily: "Woody Aromatic",
    notes: {
      top: ["cypress"],
      middle: ["vetiver", "bourbon vetiver", "haitian vetiver"],
      base: ["cashmere wood", "musk"]
    },
    accords: ["woody", "aromatic", "earthy", "smoky"],
    description: "An ode to dark ink and wet vetiver roots in an ancient autumn forest.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 95,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1493514789931-586cb221d7a7"),
      editorialStory: "Black ink poured slowly across moss-covered stones in twilight rain."
    }
  },
  // 8. Creamy Sandalwood / Fig
  {
    id: "frag_philosykos",
    name: "Philosykos",
    brand: "Diptyque",
    gender: "unisex",
    fragranceFamily: "Aromatic Green",
    notes: {
      top: ["fig leaf", "fig"],
      middle: ["green notes", "coconut"],
      base: ["fig tree", "woody", "cedar"]
    },
    accords: ["green", "woody", "sweet", "fresh", "fruity"],
    description: "A sunny memory of Greek summers — green leaves, milky fig sap, and white cedarwood.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 195,
      currency: "USD",
      size: "75ml",
      inStock: true,
      imageUrl: img("photo-1501426026826-31c667bdf23d"),
      editorialStory: "Warm afternoon shadows cast beneath wild fig orchards on Mount Pelion."
    }
  },
  // 9. Modern Ambroxan / Fresh Spicy
  {
    id: "frag_sauvage_edp",
    name: "Sauvage Eau de Parfum",
    brand: "Dior",
    gender: "masculine",
    fragranceFamily: "Oriental Fougere",
    notes: {
      top: ["bergamot"],
      middle: ["sichuan pepper", "lavender", "star anise", "nutmeg"],
      base: ["ambroxan", "vanilla"]
    },
    accords: ["fresh spicy", "citrus", "amber", "aromatic", "vanilla", "warm spicy"],
    description: "Radiant bergamot enveloped in smoky vanilla absolute and raw ambroxan vibration.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 160,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1519681393784-d120267933ba"),
      editorialStory: "The magical twilight hour across the desert, when coolness meets ancient heat."
    }
  },
  // 10. Opulent Amber / Spicy
  {
    id: "frag_grand_soir",
    name: "Grand Soir",
    brand: "Maison Francis Kurkdjian",
    gender: "unisex",
    fragranceFamily: "Amber",
    notes: {
      top: ["labdanum"],
      middle: ["benzoin", "tonka bean"],
      base: ["vanilla", "amber"]
    },
    accords: ["amber", "vanilla", "warm spicy", "balsamic", "sweet", "powdery"],
    description: "Dressing in one's finest attire to experience the luminous, gilded night of Paris.",
    performance: { longevity: "10h+", sillage: "Strong" },
    catalog: {
      price: 240,
      currency: "USD",
      size: "70ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory: "Golden chandeliers glowing over velvet ballrooms under starry Parisian skies."
    }
  },
  // 11. Boozy Warm Gourmand
  {
    id: "frag_angels_share",
    name: "Angels' Share",
    brand: "Kilian Paris",
    gender: "unisex",
    fragranceFamily: "Amber Vanilla",
    notes: {
      top: ["cognac"],
      middle: ["cinnamon", "tonka bean", "oak"],
      base: ["praline", "vanilla", "sandalwood"]
    },
    accords: ["warm spicy", "sweet", "vanilla", "woody", "cinnamon"],
    description: "A decadent heritage elixir blending oak-barrel cognac, spicy cinnamon, and praline warmth.",
    performance: { longevity: "10h+", sillage: "Strong" },
    catalog: {
      price: 255,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1488477181946-6428a0291777"),
      editorialStory: "The secret evaporation rising from ancient liquor cellars into quiet midnight air."
    }
  },
  // 12. Tobacco & Sweet Vanilla
  {
    id: "frag_tobacco_vanille",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    gender: "unisex",
    fragranceFamily: "Amber Spicy",
    notes: {
      top: ["tobacco leaf", "spicy notes"],
      middle: ["vanilla", "cacao", "tonka bean", "tobacco blossom"],
      base: ["dried fruits", "woody notes"]
    },
    accords: ["vanilla", "sweet", "tobacco", "warm spicy", "fruity", "cacao"],
    description: "An opulent, warm gentleman’s club atmosphere enriched with creamy tonka and aromatic spice.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 295,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory: "Dark mahogany tables, crackling cigars, and honeyed bourbon by the fireplace."
    }
  },
  // 13. Rich Gourmand / Coffee & Vanilla
  {
    id: "frag_black_opium",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    gender: "feminine",
    fragranceFamily: "Amber Vanilla",
    notes: {
      top: ["pear", "pink pepper", "orange blossom"],
      middle: ["coffee", "jasmine", "bitter almond", "licorice"],
      base: ["vanilla", "patchouli", "cedar", "cashmere wood"]
    },
    accords: ["vanilla", "coffee", "sweet", "warm spicy", "white floral"],
    description: "An electric shot of black espresso meeting creamy white flowers and hypnotic vanilla.",
    performance: { longevity: "8-10h", sillage: "Strong" },
    catalog: {
      price: 155,
      currency: "USD",
      size: "90ml",
      inStock: true,
      imageUrl: img("photo-1502720433255-614171a1835e"),
      editorialStory: "Neon lights reflecting off wet city pavements at 2 a.m. with high-voltage allure."
    }
  },
  // 14. Luxurious Saffron & Amberwood
  {
    id: "frag_baccarat_rouge_540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    gender: "unisex",
    fragranceFamily: "Amber Floral",
    notes: {
      top: ["saffron", "jasmine"],
      middle: ["amberwood", "ambergris"],
      base: ["fir resin", "cedar"]
    },
    accords: ["amber", "woody", "warm spicy", "fresh spicy", "metallic"],
    description: "A radiant, aerial alchemy where crystalline saffron and amberwood float like sheer silk.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 325,
      currency: "USD",
      size: "70ml",
      inStock: true,
      imageUrl: img("photo-1519681393784-d120267933ba"),
      editorialStory: "Molten scarlet crystal cooling slowly in the breeze of pure luxury."
    }
  },
  // 15. Romantic Rose & Spiced Patchouli
  {
    id: "frag_portrait_of_a_lady",
    name: "Portrait of a Lady",
    brand: "Frederic Malle",
    gender: "unisex",
    fragranceFamily: "Amber Floral",
    notes: {
      top: ["rose", "clove", "raspberry", "black currant", "cinnamon"],
      middle: ["patchouli", "incense", "sandalwood"],
      base: ["musk", "benzoin", "amber"]
    },
    accords: ["warm spicy", "rose", "woody", "patchouli", "amber", "fruity"],
    description: "An extravagant dosage of Turkish rose wrapped in smoldering frankincense and rich patchouli.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 410,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1490750967868-88aa4486c946"),
      editorialStory: "A dramatic grand opera entrance where petals cascade over dark velvet capes."
    }
  },
  // 16. Pure Rose / Fresh Floral
  {
    id: "frag_rose_31",
    name: "Rose 31",
    brand: "Le Labo",
    gender: "unisex",
    fragranceFamily: "Floral Woody Musk",
    notes: {
      top: ["rose", "cumin"],
      middle: ["rose", "vetiver", "cedar"],
      base: ["musk", "guaiac wood", "agarwood", "labdanum"]
    },
    accords: ["woody", "rose", "warm spicy", "fresh spicy", "musky"],
    description: "A delightfully ambiguous rose transformed by warm cumin, cedar, and deep guaiac wood.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 320,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1490750967868-88aa4486c946"),
      editorialStory: "The feminine Grasse rose given an unapologetically dark, masculine edge."
    }
  },
  // 17. Delicate White Floral / Orange Blossom
  {
    id: "frag_fleur_de_peau",
    name: "Fleur de Peau",
    brand: "Diptyque",
    gender: "unisex",
    fragranceFamily: "Floral Aldehyde",
    notes: {
      top: ["aldehydes", "pink pepper", "angelica", "bergamot"],
      middle: ["iris", "turkish rose"],
      base: ["musk", "ambrette", "carrot seeds", "amberwood", "sandalwood", "leather"]
    },
    accords: ["musky", "powdery", "iris", "aldehydic", "floral", "fresh spicy"],
    description: "A tribute to mythical love — soft cotton musks, powdery iris, and warm skin intimacy.",
    performance: { longevity: "8-10h", sillage: "Intimate" },
    catalog: {
      price: 195,
      currency: "USD",
      size: "75ml",
      inStock: true,
      imageUrl: img("photo-1502720433255-614171a1835e"),
      editorialStory: "The quiet tactile intimacy of bare skin against morning linen sheets."
    }
  },
  // 18. Regal Smoky Oud & Cardamom
  {
    id: "frag_oud_wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    gender: "unisex",
    fragranceFamily: "Amber Woody",
    notes: {
      top: ["cardamom", "black pepper", "rosewood"],
      middle: ["oud", "sandalwood", "vetiver"],
      base: ["tonka bean", "vanilla", "amber"]
    },
    accords: ["woody", "oud", "warm spicy", "aromatic", "vanilla"],
    description: "Rare and smoky oud wood mingled with exotic rosewood, cardamom, and sensual amber.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 295,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1448375240586-882707db888b"),
      editorialStory: "Incense-filled temples high in Bhutan where sacred woods burn through the fog."
    }
  },
  // 19. Dark Resinous Oud
  {
    id: "frag_black_afgano",
    name: "Black Afgano",
    brand: "Nasomatto",
    gender: "unisex",
    fragranceFamily: "Woody Aromatic",
    notes: {
      top: ["cannabis", "green notes"],
      middle: ["resins", "woody notes", "tobacco", "coffee"],
      base: ["agarwood", "incense"]
    },
    accords: ["amber", "smoky", "woody", "oud", "balsamic", "warm spicy"],
    description: "A hypnotic and dense journey into deep resins, dark roasted coffee, and burning oud.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 185,
      currency: "USD",
      size: "30ml",
      inStock: true,
      imageUrl: img("photo-1502720433255-614171a1835e"),
      editorialStory: "An enigmatic spell brewed from nocturnal herbs and smoldering resins."
    }
  },
  // 20. Crisp Sparkling Green Vetiver
  {
    id: "frag_grey_vetiver",
    name: "Grey Vetiver",
    brand: "Tom Ford",
    gender: "masculine",
    fragranceFamily: "Woody Spicy",
    notes: {
      top: ["grapefruit", "orange blossom", "sage"],
      middle: ["nutmeg", "orris root", "pimento"],
      base: ["vetiver", "woody notes", "oakmoss", "amber"]
    },
    accords: ["citrus", "woody", "earthy", "aromatic", "fresh spicy"],
    description: "The essence of sartorial elegance — sparkling citrus opening into cool, tailored vetiver.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 195,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1487958449943-2429e8be8625"),
      editorialStory: "A bespoke grey wool suit moving effortlessly through glass executive corridors."
    }
  },
  // 21. Sweet Solar White Floral
  {
    id: "frag_soleil_blanc",
    name: "Soleil Blanc",
    brand: "Tom Ford",
    gender: "unisex",
    fragranceFamily: "Amber Floral",
    notes: {
      top: ["pistachio", "bergamot", "cardamom", "pink pepper"],
      middle: ["tuberose", "ylang-ylang", "jasmine"],
      base: ["coconut", "amber", "tonka bean", "benzoin"]
    },
    accords: ["coconut", "white floral", "sweet", "amber", "yellow floral"],
    description: "An uninhibited solar floral amber that exudes warm island breezes and sultry coconut milk.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 295,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1519681393784-d120267933ba"),
      editorialStory: "Sun-drenched private islands where golden tanning oil glistens on warm skin."
    }
  },
  // 22. Spicy Cardamom Seduction
  {
    id: "frag_la_nuit_de_l_homme",
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    gender: "masculine",
    fragranceFamily: "Woody Spicy",
    notes: {
      top: ["cardamom"],
      middle: ["lavender", "virginia cedar", "bergamot"],
      base: ["vetiver", "caraway"]
    },
    accords: ["warm spicy", "aromatic", "woody", "lavender", "fresh spicy"],
    description: "A dark, magnetic veil of explosive cardamom contrast with elegant cedar and coumarin.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 135,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory: "A whispered invitation under dimly lit speakeasy lanterns."
    }
  },
  // 23. Bright Fruity Amber / Pineapple
  {
    id: "frag_aventus",
    name: "Aventus",
    brand: "Creed",
    gender: "masculine",
    fragranceFamily: "Chypre Fruity",
    notes: {
      top: ["bergamot", "black currant", "apple", "lemon", "pink pepper"],
      middle: ["pineapple", "patchouli", "moroccan jasmine"],
      base: ["birch", "musk", "oakmoss", "ambroxan", "cedarwood"]
    },
    accords: ["fruity", "woody", "smoky", "citrus", "leather", "mossy"],
    description: "Sensual, audacious, and contemporary — tart blackcurrant and smoked birch triumphing.",
    performance: { longevity: "8-10h", sillage: "Strong" },
    catalog: {
      price: 495,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1487958449943-2429e8be8625"),
      editorialStory: "The resolute gaze of a conquering emperor riding toward victory at dawn."
    }
  },
  // 24. Clean White Musk & Cotton
  {
    id: "frag_lazy_sunday_morning",
    name: "Lazy Sunday Morning",
    brand: "Maison Margiela",
    gender: "unisex",
    fragranceFamily: "Floral Woody Musk",
    notes: {
      top: ["aldehydes", "lily of the valley", "pear"],
      middle: ["rose", "iris", "orange blossom"],
      base: ["white musk", "ambrette", "indonesian patchouli leaf"]
    },
    accords: ["musky", "fresh", "floral", "powdery", "clean"],
    description: "Silky white cotton sheets warmed by gentle morning sunlight on a slow Sunday.",
    performance: { longevity: "6-8h", sillage: "Intimate" },
    catalog: {
      price: 160,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1501426026826-31c667bdf23d"),
      editorialStory: "Waking up with no alarms, wrapped in freshly laundered sheets as soft daylight filters in."
    }
  },
  // 25. Warm Spicy Cinnamon & Amber
  {
    id: "frag_herod",
    name: "Herod",
    brand: "Parfums de Marly",
    gender: "unisex",
    fragranceFamily: "Woody Spicy",
    notes: {
      top: ["cinnamon", "pepper"],
      middle: ["tobacco leaf", "incense", "osmanthus", "labdanum"],
      base: ["vanilla", "iso e super", "cedar", "musk", "cypriol", "vetiver"]
    },
    accords: ["tobacco", "vanilla", "warm spicy", "sweet", "cinnamon", "woody"],
    description: "A regal smoke of French pipe tobacco saturated with warm Bourbon vanilla and cinnamon bark.",
    performance: { longevity: "10h+", sillage: "Strong" },
    catalog: {
      price: 360,
      currency: "USD",
      size: "125ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory: "The private library of Versailles, steeped in ancient parchment and pipe tobacco."
    }
  }
];
const FRAGRANCES = RAW_FRAGRANCES.map(normalizeFragrance);
export {
  FRAGRANCES as F,
  RAW_FRAGRANCES as R
};
