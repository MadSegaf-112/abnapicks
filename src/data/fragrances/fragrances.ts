/**
 * Phase 1 — Temporary Seed Fragrance Dataset (Proof of Concept)
 *
 * 25 well-known reference fragrances representing the full olfactive spectrum:
 * - Fresh, Citrus, Aquatic
 * - Floral, Powdery, Rose
 * - Woody, Cedar, Sandalwood, Vetiver, Oud
 * - Warm, Amber, Resin, Tobacco, Leather
 * - Gourmand, Vanilla, Tonka, Coffee
 * - Light to Beast Mode projection
 *
 * All records use real, verifiable perfume compositions and are converted through
 * the deterministic feature normalization engine.
 */

import type { RawFragranceInput } from "./types";
import { normalizeFragrance } from "./feature-mapping";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const RAW_FRAGRANCES: RawFragranceInput[] = [
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
      base: ["incense", "amber", "cedar", "sandalwood", "patchouli", "labdanum", "amberwood"],
    },
    accords: ["citrus", "warm spicy", "woody", "aromatic", "amber", "fresh spicy"],
    description:
      "A timeless woody aromatic profile that transitions from sharp zest into deep incense and amber.",
    performance: { longevity: "8-10h", sillage: "Strong" },
    catalog: {
      price: 165,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1594035910387-fea47794261f"),
      editorialStory: "Midnight confidence etched in blue glass and citrus sparks.",
    },
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
      base: ["amber", "angelica", "ambrette"],
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
      editorialStory: "Sun-drenched sea foam touching golden citrus blossoms.",
    },
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
      base: ["mineral notes", "musk", "patchouli", "amber"],
    },
    accords: ["marine", "aromatic", "citrus", "fresh spicy", "salty", "woody"],
    description:
      "An intense dive into oceanic depth with bracing sea minerals and fresh aromatics.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 145,
      currency: "USD",
      size: "75ml",
      inStock: true,
      imageUrl: img("photo-1505118380757-91f5f5632de0"),
      editorialStory: "The silence of descending fifty fathoms into turquoise stillness.",
    },
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
      base: ["red algae", "grapefruit", "driftwood"],
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
      editorialStory:
        "A solitary walk on windswept British shores with waves breaking against stone.",
    },
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
      base: ["vetiver", "cedar", "patchouli", "benzoin"],
    },
    accords: ["citrus", "woody", "fresh spicy", "aromatic", "earthy"],
    description:
      "The dialogue between man and raw earth — bitter citrus over flint and dry cedarwood.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 152,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1487958449943-2429e8be8625"),
      editorialStory: "Standing tall upon mineral soil beneath the blinding midday sun.",
    },
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
      base: ["cedarwood", "leather", "sandalwood"],
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
      editorialStory:
        "An open plain under a desert night, where cedar smoke and leather linger forever.",
    },
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
      base: ["cashmere wood", "musk"],
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
      editorialStory: "Black ink poured slowly across moss-covered stones in twilight rain.",
    },
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
      base: ["fig tree", "woody", "cedar"],
    },
    accords: ["green", "woody", "sweet", "fresh", "fruity"],
    description:
      "A sunny memory of Greek summers — green leaves, milky fig sap, and white cedarwood.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 195,
      currency: "USD",
      size: "75ml",
      inStock: true,
      imageUrl: img("photo-1501426026826-31c667bdf23d"),
      editorialStory: "Warm afternoon shadows cast beneath wild fig orchards on Mount Pelion.",
    },
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
      base: ["ambroxan", "vanilla"],
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
      editorialStory:
        "The magical twilight hour across the desert, when coolness meets ancient heat.",
    },
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
      base: ["vanilla", "amber"],
    },
    accords: ["amber", "vanilla", "warm spicy", "balsamic", "sweet", "powdery"],
    description:
      "Dressing in one's finest attire to experience the luminous, gilded night of Paris.",
    performance: { longevity: "10h+", sillage: "Strong" },
    catalog: {
      price: 240,
      currency: "USD",
      size: "70ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory:
        "Golden chandeliers glowing over velvet ballrooms under starry Parisian skies.",
    },
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
      base: ["praline", "vanilla", "sandalwood"],
    },
    accords: ["warm spicy", "sweet", "vanilla", "woody", "cinnamon"],
    description:
      "A decadent heritage elixir blending oak-barrel cognac, spicy cinnamon, and praline warmth.",
    performance: { longevity: "10h+", sillage: "Strong" },
    catalog: {
      price: 255,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1488477181946-6428a0291777"),
      editorialStory:
        "The secret evaporation rising from ancient liquor cellars into quiet midnight air.",
    },
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
      base: ["dried fruits", "woody notes"],
    },
    accords: ["vanilla", "sweet", "tobacco", "warm spicy", "fruity", "cacao"],
    description:
      "An opulent, warm gentleman’s club atmosphere enriched with creamy tonka and aromatic spice.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 295,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory:
        "Dark mahogany tables, crackling cigars, and honeyed bourbon by the fireplace.",
    },
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
      base: ["vanilla", "patchouli", "cedar", "cashmere wood"],
    },
    accords: ["vanilla", "coffee", "sweet", "warm spicy", "white floral"],
    description:
      "An electric shot of black espresso meeting creamy white flowers and hypnotic vanilla.",
    performance: { longevity: "8-10h", sillage: "Strong" },
    catalog: {
      price: 155,
      currency: "USD",
      size: "90ml",
      inStock: true,
      imageUrl: img("photo-1502720433255-614171a1835e"),
      editorialStory:
        "Neon lights reflecting off wet city pavements at 2 a.m. with high-voltage allure.",
    },
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
      base: ["fir resin", "cedar"],
    },
    accords: ["amber", "woody", "warm spicy", "fresh spicy", "metallic"],
    description:
      "A radiant, aerial alchemy where crystalline saffron and amberwood float like sheer silk.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 325,
      currency: "USD",
      size: "70ml",
      inStock: true,
      imageUrl: img("photo-1519681393784-d120267933ba"),
      editorialStory: "Molten scarlet crystal cooling slowly in the breeze of pure luxury.",
    },
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
      base: ["musk", "benzoin", "amber"],
    },
    accords: ["warm spicy", "rose", "woody", "patchouli", "amber", "fruity"],
    description:
      "An extravagant dosage of Turkish rose wrapped in smoldering frankincense and rich patchouli.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 410,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1490750967868-88aa4486c946"),
      editorialStory:
        "A dramatic grand opera entrance where petals cascade over dark velvet capes.",
    },
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
      base: ["musk", "guaiac wood", "agarwood", "labdanum"],
    },
    accords: ["woody", "rose", "warm spicy", "fresh spicy", "musky"],
    description:
      "A delightfully ambiguous rose transformed by warm cumin, cedar, and deep guaiac wood.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 320,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1490750967868-88aa4486c946"),
      editorialStory: "The feminine Grasse rose given an unapologetically dark, masculine edge.",
    },
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
      base: ["musk", "ambrette", "carrot seeds", "amberwood", "sandalwood", "leather"],
    },
    accords: ["musky", "powdery", "iris", "aldehydic", "floral", "fresh spicy"],
    description:
      "A tribute to mythical love — soft cotton musks, powdery iris, and warm skin intimacy.",
    performance: { longevity: "8-10h", sillage: "Intimate" },
    catalog: {
      price: 195,
      currency: "USD",
      size: "75ml",
      inStock: true,
      imageUrl: img("photo-1502720433255-614171a1835e"),
      editorialStory: "The quiet tactile intimacy of bare skin against morning linen sheets.",
    },
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
      base: ["tonka bean", "vanilla", "amber"],
    },
    accords: ["woody", "oud", "warm spicy", "aromatic", "vanilla"],
    description:
      "Rare and smoky oud wood mingled with exotic rosewood, cardamom, and sensual amber.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 295,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1448375240586-882707db888b"),
      editorialStory:
        "Incense-filled temples high in Bhutan where sacred woods burn through the fog.",
    },
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
      base: ["agarwood", "incense"],
    },
    accords: ["amber", "smoky", "woody", "oud", "balsamic", "warm spicy"],
    description:
      "A hypnotic and dense journey into deep resins, dark roasted coffee, and burning oud.",
    performance: { longevity: "10h+", sillage: "Beast" },
    catalog: {
      price: 185,
      currency: "USD",
      size: "30ml",
      inStock: true,
      imageUrl: img("photo-1502720433255-614171a1835e"),
      editorialStory: "An enigmatic spell brewed from nocturnal herbs and smoldering resins.",
    },
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
      base: ["vetiver", "woody notes", "oakmoss", "amber"],
    },
    accords: ["citrus", "woody", "earthy", "aromatic", "fresh spicy"],
    description:
      "The essence of sartorial elegance — sparkling citrus opening into cool, tailored vetiver.",
    performance: { longevity: "8-10h", sillage: "Moderate" },
    catalog: {
      price: 195,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1487958449943-2429e8be8625"),
      editorialStory:
        "A bespoke grey wool suit moving effortlessly through glass executive corridors.",
    },
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
      base: ["coconut", "amber", "tonka bean", "benzoin"],
    },
    accords: ["coconut", "white floral", "sweet", "amber", "yellow floral"],
    description:
      "An uninhibited solar floral amber that exudes warm island breezes and sultry coconut milk.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 295,
      currency: "USD",
      size: "50ml",
      inStock: true,
      imageUrl: img("photo-1519681393784-d120267933ba"),
      editorialStory:
        "Sun-drenched private islands where golden tanning oil glistens on warm skin.",
    },
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
      base: ["vetiver", "caraway"],
    },
    accords: ["warm spicy", "aromatic", "woody", "lavender", "fresh spicy"],
    description:
      "A dark, magnetic veil of explosive cardamom contrast with elegant cedar and coumarin.",
    performance: { longevity: "6-8h", sillage: "Moderate" },
    catalog: {
      price: 135,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory: "A whispered invitation under dimly lit speakeasy lanterns.",
    },
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
      base: ["birch", "musk", "oakmoss", "ambroxan", "cedarwood"],
    },
    accords: ["fruity", "woody", "smoky", "citrus", "leather", "mossy"],
    description:
      "Sensual, audacious, and contemporary — tart blackcurrant and smoked birch triumphing.",
    performance: { longevity: "8-10h", sillage: "Strong" },
    catalog: {
      price: 495,
      currency: "USD",
      size: "100ml",
      inStock: true,
      imageUrl: img("photo-1487958449943-2429e8be8625"),
      editorialStory: "The resolute gaze of a conquering emperor riding toward victory at dawn.",
    },
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
      base: ["white musk", "ambrette", "indonesian patchouli leaf"],
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
      editorialStory:
        "Waking up with no alarms, wrapped in freshly laundered sheets as soft daylight filters in.",
    },
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
      base: ["vanilla", "iso e super", "cedar", "musk", "cypriol", "vetiver"],
    },
    accords: ["tobacco", "vanilla", "warm spicy", "sweet", "cinnamon", "woody"],
    description:
      "A regal smoke of French pipe tobacco saturated with warm Bourbon vanilla and cinnamon bark.",
    performance: { longevity: "10h+", sillage: "Strong" },
    catalog: {
      price: 360,
      currency: "USD",
      size: "125ml",
      inStock: true,
      imageUrl: img("photo-1519677100203-a0e668c92439"),
      editorialStory:
        "The private library of Versailles, steeped in ancient parchment and pipe tobacco.",
    },
  },
];

/**
 * The normalized internal fragrance collection ready for scoring consumption.
 */
export const FRAGRANCES = RAW_FRAGRANCES.map(normalizeFragrance);
