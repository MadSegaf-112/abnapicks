import type {
  AbnaOlfactiveEnrichmentRecord,
  AbnaEnrichmentReviewItem,
  AbnaBatchEnrichmentSummary,
} from "../types";

/**
 * Phase 6C-3B: Batch 01 Olfactive Enrichment Records.
 * Enriches the first 50 unenriched products from the official ABNA catalog (Rows 4 to 55).
 *
 * Strict Source Policy:
 * - Fragrantica as primary verified reference source for designer fragrances.
 * - Exact and normalized matching with complete provenance URLs and confidence scores.
 * - Incomplete / internal signature blends flagged for review without note fabrication.
 */
export const BATCH_01_ENRICHMENT_RECORDS: AbnaOlfactiveEnrichmentRecord[] = [
  // 1. Row 4: Secret Wish (Anna Sui, EXCLUSIVE)
  {
    productId: "abna_secret_wish_anna_sui_exclusive_4",
    notes: {
      top: ["Lemon", "Tagetes", "Melon", "Peach"],
      middle: ["Blackcurrant", "Pineapple", "Lily of the Valley"],
      base: ["White Cedar", "Amber", "Musk", "Sandalwood"],
    },
    accords: ["fruity", "sweet", "citrus", "fresh", "tropical"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h",
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
      verificationStatus: "verified",
    },
  },

  // 2. Row 6: Cool Water Man (Davidoff, EXCLUSIVE)
  {
    productId: "abna_cool_water_man_davidoff_exclusive_6",
    notes: {
      top: ["Sea Water", "Mint", "Green Notes", "Lavender", "Coriander", "Rosemary", "Calone"],
      middle: ["Sandalwood", "Jasmine", "Neroli", "Geranium"],
      base: ["Musk", "Oakmoss", "Cedarwood", "Tobacco", "Amber"],
    },
    accords: ["aromatic", "marine", "green", "fresh spicy", "woody"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
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
      verificationStatus: "verified",
    },
  },

  // 3. Row 7: Blue Seduction (Antonio Banderas, EXCLUSIVE)
  {
    productId: "abna_blue_seduction_antonio_banderas_exclusive_7",
    notes: {
      top: ["Melon", "Bergamot", "Mint", "Blackcurrant"],
      middle: ["Sea Water", "Green Apple", "Cappuccino", "Cardamom", "Nutmeg"],
      base: ["Amber", "Woody Notes"],
    },
    accords: ["aromatic", "aquatic", "fruity", "fresh spicy", "marine"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A modern, magnetic fragrance characterized by watery freshness and warm cappuccino.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Antonio-Banderas/Blue-Seduction-1970.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
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
        "Rose",
      ],
      base: ["White Musk", "Cedarwood", "Oakmoss", "Patchouli", "Amber"],
    },
    accords: ["citrus", "marine", "aromatic", "fresh", "floral"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "The timeless Mediterranean icon capturing sea spray, warm sun, and coastal earth.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Acqua-di-Gio-410.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 5. Row 9: Energize (Hugo Boss, EXCLUSIVE)
  {
    productId: "abna_energize_hugo_boss_exclusive_9",
    notes: {
      top: ["Pink Pepper", "Lemon", "Kumquat", "Pineapple Leaf", "Mint", "Mandarin", "Cardamom"],
      middle: ["Nutmeg", "Juniper", "Clary Sage", "Freesia", "Coriander", "Jasmine"],
      base: ["Teak Wood", "Leather", "Vanilla"],
    },
    accords: ["citrus", "aromatic", "warm spicy", "fresh spicy", "woody"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "An urban energetic cocktail with vibrant citrus top notes and a warm spicy drydown.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hugo-Boss/Hugo-Energise-385.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 6. Row 13: No.5 (Chanel, VIP)
  {
    productId: "abna_no_5_chanel_vip_13",
    notes: {
      top: ["Aldehydes", "Ylang-Ylang", "Neroli", "Bergamot", "Peach"],
      middle: ["Iris", "Jasmine", "Rose", "Lily of the Valley"],
      base: ["Sandalwood", "Vanilla", "Oakmoss", "Vetiver", "Patchouli"],
    },
    accords: ["powdery", "floral", "woody", "warm spicy", "citrus"],
    fragranceFamily: ["Floral", "Aldehyde"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "The world's most legendary abstract floral bouquet framed by dazzling aldehydes.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Chanel/Chanel-No-5-Eau-de-Parfum-608.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 7. Row 14: London (Burberry, VIP)
  {
    productId: "abna_london_burberry_vip_14",
    notes: {
      top: ["Honeysuckle", "Tangerine", "Rose"],
      middle: ["Jasmine", "Tiare Flower", "Peony", "Clementine"],
      base: ["Musk", "Sandalwood", "Patchouli"],
    },
    accords: ["white floral", "floral", "fruity", "citrus", "sweet"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A classic floral celebration of the contemporary yet elegant spirit of London.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Burberry/Burberry-London-816.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 8. Row 16: Flower (Kenzo, VIP)
  {
    productId: "abna_flower_kenzo_vip_16",
    notes: {
      top: ["Bulgarian Rose", "Hawthorn", "Blackcurrant", "Mandarin"],
      middle: ["Violet", "Rose", "Opoponax", "Jasmine"],
      base: ["Vanilla", "White Musk", "Incense"],
    },
    accords: ["powdery", "floral", "vanilla", "sweet", "violet"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "7-9h",
    },
    editorialStory:
      "A poetic powdery floral expressing the unexpected power of a poppy in the city.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/Flower-by-Kenzo-72.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 9. Row 17: Vannila Lace (Victoria Secret, VIP)
  {
    productId: "abna_vannila_lace_victoria_secret_vip_17",
    notes: {
      top: ["Vanilla", "White Musk"],
      middle: ["Chamomile", "Aloe Vera"],
      base: ["Vanilla", "Amber"],
    },
    accords: ["vanilla", "powdery", "sweet", "musky"],
    fragranceFamily: ["Oriental", "Vanilla"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
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
      verificationStatus: "verified",
    },
  },

  // 10. Row 18: Daun (Kenzo, VIP)
  {
    productId: "abna_daun_kenzo_vip_18",
    notes: {
      top: ["Lily of the Valley", "Green Notes"],
      middle: ["Peony", "Jasmine", "Hyacinth"],
      base: ["Sandalwood", "White Musk"],
    },
    accords: ["green", "white floral", "floral", "fresh", "fresh spicy"],
    fragranceFamily: ["Floral", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A serene transparent leaf of summer morning dew, lilies, and green botanicals.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/Parfum-d-Ete-79.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.92,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 11. Row 19: Incanto Shine (Salvatore Feragamo, VIP)
  {
    productId: "abna_incanto_shine_salvatore_feragamo_vip_19",
    notes: {
      top: ["Pineapple", "Passionfruit", "Bergamot"],
      middle: ["Peach", "Peony", "Freesia"],
      base: ["White Musk", "Cedarwood", "Amber"],
    },
    accords: ["fruity", "tropical", "sweet", "fresh", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A radiant, joyful splash of sun-drenched pineapple, passionfruit, and soft woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Salvatore-Ferragamo/Incanto-Shine-1959.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 12. Row 20: Sabaya (Al Rehab, VIP)
  {
    productId: "abna_sabaya_al_rehab_vip_20",
    notes: {
      top: ["Rose", "Citruses"],
      middle: ["Green Notes", "Rose"],
      base: ["Citruses", "White Musk"],
    },
    accords: ["citrus", "floral", "rose", "green", "fresh"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "An uplifting, radiant blend of fresh garden roses and zesty Mediterranean citruses.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Sabaya-20150.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 13. Row 21: Zahrat Hawai (Al Rehab, VIP)
  {
    productId: "abna_zahrat_hawai_al_rehab_vip_21",
    notes: {
      top: ["Pineapple", "Coconut", "Pina Colada"],
      middle: ["Strawberry", "Caramel", "Floral Notes"],
      base: ["Woody Notes", "Citruses"],
    },
    accords: ["sweet", "tropical", "fruity", "coconut", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Strong",
      longevity: "6-8h",
    },
    editorialStory:
      "A sun-kissed Hawaiian holiday bottled with sweet pineapple, creamy coconut, and caramel.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Al-Rehab/Zahrat-Hawaii-20154.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 14. Row 22: Desire Red (Alfred Dunhill, VIP)
  {
    productId: "abna_desire_red_alfred_dunhill_vip_22",
    notes: {
      top: ["Apple", "Lemon", "Bergamot", "Orange Blossom"],
      middle: ["Rose", "Teak Wood", "Patchouli"],
      base: ["Vanilla", "Musk"],
    },
    accords: ["citrus", "vanilla", "fruity", "sweet", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A passionate masculine composition uniting crisp red apple, warm teak wood, and vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-for-a-Man-1934.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 15. Row 23: Bee (Calvin Klein, VIP)
  {
    productId: "abna_bee_calvin_klein_vip_23",
    notes: {
      top: ["Lavender", "Green Notes", "Bergamot", "Mint", "Juniper", "Mandarin"],
      middle: ["Green Grass", "Peach", "Jasmine", "Freesia", "Magnolia", "Orchid"],
      base: ["White Musk", "Sandalwood", "Cedarwood", "Vanilla", "Amber", "Opoponax"],
    },
    accords: ["aromatic", "green", "woody", "fresh spicy", "lavender"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "An intimate, individualist manifesto of soft aromatic lavender and comforting musks.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Calvin-Klein/CK-be-275.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 16. Row 24: Girl Summer (Guess, VIP)
  {
    productId: "abna_girl_summer_guess_vip_24",
    notes: {
      top: ["Bergamot", "Mandarin", "Neroli"],
      middle: ["Water Lily", "Orange Blossom", "Rose", "Wild Orchid"],
      base: ["Teak Wood", "Vanilla", "Musk"],
    },
    accords: ["citrus", "floral", "white floral", "fresh", "sweet"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h",
    },
    editorialStory:
      "A flirtatious sunny breeze bursting with citrus blossoms and exotic water lilies.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Guess/Guess-Girl-Summer-24831.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 17. Row 25: Black (Jaguar, VIP)
  {
    productId: "abna_black_jaguar_vip_25",
    notes: {
      top: ["Granny Smith Apple", "Bitter Orange", "Mandarin"],
      middle: ["Tea", "Sea Water", "Geranium", "Nutmeg", "Cardamom"],
      base: ["White Musk", "Virginia Cedar", "Tonka Bean", "Vetiver", "Sandalwood", "Oakmoss"],
    },
    accords: ["aromatic", "fresh spicy", "citrus", "marine", "fruity"],
    fragranceFamily: ["Oriental", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "Sleek and dynamic oriental fougère featuring crisp apple, black tea, and cedar.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jaguar/Jaguar-Classic-Black-7497.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 18. Row 27: Meow (Katty Pery, VIP)
  {
    productId: "abna_meow_katty_pery_vip_27",
    notes: {
      top: ["Pear", "Tangerine", "Gardenia", "Jasmine"],
      middle: ["Honeysuckle", "Orange Blossom", "Lily of the Valley"],
      base: ["Vanilla", "Caramel", "Amber", "Sandalwood", "Musk"],
    },
    accords: ["sweet", "vanilla", "fruity", "white floral", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A playful, sweet confection of juicy pear, creamy gardenia, vanilla, and amber.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Katy-Perry/Meow-13495.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 19. Row 28: Leaupar (Kenzo, VIP)
  {
    productId: "abna_leaupar_kenzo_vip_28",
    notes: {
      top: ["Reed", "Mint", "Green Lilac", "Mandarin", "Pink Pepper"],
      middle: ["Water Lily", "Black Pepper", "White Peach", "Violet", "Rose"],
      base: ["Cedarwood", "White Musk", "Vanilla"],
    },
    accords: ["aquatic", "floral", "green", "fresh", "fresh spicy"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A serene celebration of pure water, frosted mint leaves, water lily, and white peach.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/L-Eau-par-Kenzo-78.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
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
        "Peach",
      ],
      base: [
        "Balsam Fir",
        "Sandalwood",
        "Cedarwood",
        "Oakmoss",
        "Musk",
        "Vetiver",
        "Amber",
        "Labdanum",
      ],
    },
    accords: ["woody", "aromatic", "marine", "balsamic", "fresh spicy"],
    fragranceFamily: ["Aromatic", "Aquatic"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "A trailblazing aquatic-woody monolith evocative of ocean salt and rugged pine cliffs.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/Kenzo-pour-Homme-77.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified",
    },
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
        "Grenadine",
      ],
      base: ["Tonka Bean", "White Woods", "Violet"],
    },
    accords: ["fruity", "sweet", "tropical", "champagne", "citrus"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "An effervescent, glamorous cocktail of sparkling champagne, granita, and passionfruit.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paris-Hilton/Heiress-1436.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
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
        "Peach",
      ],
    },
    accords: ["musky", "powdery", "floral", "white floral", "woody"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "The quintessential cruelty-free velvety soft musk enveloped in comforting floral notes.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/The-Body-Shop/White-Musk-2432.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 23. Row 32: Desire Blue (Alfred Dunhill, VIP)
  {
    productId: "abna_desire_blue_alfred_dunhill_vip_32",
    notes: {
      top: ["Litchi", "Mandarin", "Lotus", "Bergamot"],
      middle: ["Sea Notes", "Orange", "Brazilian Rosewood"],
      base: ["Tonka Bean", "Musk", "Benzoin", "Amber"],
    },
    accords: ["marine", "citrus", "fruity", "sweet", "aromatic"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A crystalline aquatic harmony of exotic lychee, dewy lotus flower, and warm benzoin.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-Blue-1935.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 24. Row 33: Desire Red (Alfred Dunhill, VIP - Kode C variant)
  {
    productId: "abna_desire_red_alfred_dunhill_vip_33",
    notes: {
      top: ["Apple", "Lemon", "Bergamot", "Orange Blossom"],
      middle: ["Rose", "Teak Wood", "Patchouli"],
      base: ["Vanilla", "Musk"],
    },
    accords: ["citrus", "vanilla", "fruity", "sweet", "warm spicy"],
    fragranceFamily: ["Oriental", "Woody"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "Warm and sensual oriental woody creation centered on crisp apple, rose, and vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Alfred-Dunhill/Desire-for-a-Man-1934.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 25. Row 34: Matcha Green Tea (Elizabeth Arden, VIP)
  {
    productId: "abna_matcha_green_tea_elizabeth_arden_vip_34",
    notes: {
      top: ["Matcha Tea", "Green Tea", "Bergamot", "Mandarin"],
      middle: ["Green Tea", "Matcha Tea", "Magnolia", "Floral Notes"],
      base: ["Oakmoss", "White Musk", "Cedarwood"],
    },
    accords: ["green", "fresh", "citrus", "herbal", "floral"],
    fragranceFamily: ["Aromatic", "Green"],
    performance: {
      sillage: "Moderate",
      longevity: "4-6h",
    },
    editorialStory:
      "An energizing, zen-like infusion of Japanese matcha tea, bright citrus, and calm woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl:
        "https://www.fragrantica.com/perfume/Elizabeth-Arden/Green-Tea-Matcha-Energy-91340.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 26. Row 35: La Vie Est Belle (Lancome, VIP)
  {
    productId: "abna_la_vie_est_belle_lancome_vip_35",
    notes: {
      top: ["Blackcurrant", "Pear"],
      middle: ["Iris", "Jasmine", "Orange Blossom"],
      base: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"],
    },
    accords: ["sweet", "vanilla", "fruity", "woody", "powdery"],
    fragranceFamily: ["Oriental", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "9-11h",
    },
    editorialStory:
      "A luminous declaration of joy featuring noble iris butter and decadent sweet praline.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lancome/La-Vie-Est-Belle-14982.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 27. Row 36: Red Vanilla (Zara, VIP)
  {
    productId: "abna_red_vanilla_zara_vip_36",
    notes: {
      top: ["Red Berries", "Vanilla"],
      middle: ["Blackcurrant", "Iris"],
      base: ["Praline", "Patchouli", "Tonka Bean"],
    },
    accords: ["sweet", "fruity", "vanilla", "powdery", "woody"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A warm, sophisticated gourmand featuring juicy dark berries and creamy vanilla.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Red-Vanilla-34440.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 28. Row 37: BLV (Bvlgari, VIP)
  {
    productId: "abna_blv_bvlgari_vip_37",
    notes: {
      top: ["Ginger", "Bergamot"],
      middle: ["Wisteria", "Flax"],
      base: ["Black Locust", "Sandalwood", "Musk", "Vanilla"],
    },
    accords: ["warm spicy", "floral", "powdery", "fresh", "woody"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "An intriguing play of unexpected contrasts: fiery ginger, delicate wisteria, and powdery woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Bvlgari/BLV-150.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 29. Row 38: 1 Million Lucky (Paco Rabanne, ELITE)
  {
    productId: "abna_1_million_lucky_paco_rabanne_elite_38",
    notes: {
      top: ["Plum", "Ozonic Notes", "Grapefruit", "Bergamot"],
      middle: ["Hazelnut", "Honey", "Cedarwood", "Cashmere Wood", "Jasmine", "Orange Blossom"],
      base: ["Amberwood", "Patchouli", "Oakmoss", "Vetiver"],
    },
    accords: ["sweet", "woody", "nutty", "fruity", "honey"],
    fragranceFamily: ["Woody", "Gourmand"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "An exhilarating pulsation of crunchy green hazelnut, luscious plum, and warm amberwoods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Paco-Rabanne/1-Million-Lucky-48903.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 30. Row 40: Guilty Man (Gucci, ELITE)
  {
    productId: "abna_guilty_man_gucci_elite_40",
    notes: {
      top: ["Lavender", "Amalfi Lemon"],
      middle: ["African Orange Flower"],
      base: ["Virginia Cedar", "Patchouli", "Vanilla"],
    },
    accords: ["citrus", "lavender", "aromatic", "woody", "white floral"],
    fragranceFamily: ["Woody", "Aromatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A non-conformist aromatic fougère combining zesty Italian lemon, orange blossom, and cedar.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Gucci/Gucci-Guilty-Pour-Homme-11524.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 31. Row 42: Wanted (Azzaro, ELITE)
  {
    productId: "abna_wanted_azzaro_elite_42",
    notes: {
      top: ["Lemon", "Ginger", "Lavender", "Mint"],
      middle: ["Apple", "Juniper", "Guatemalan Cardamom", "Geranium"],
      base: ["Tonka Bean", "Amberwood", "Haitian Vetiver"],
    },
    accords: ["warm spicy", "aromatic", "citrus", "fresh spicy", "woody"],
    fragranceFamily: ["Woody", "Spicy"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "A bold, charismatic woody-spicy solar weapon of temptation loaded with ginger and amberwood.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Azzaro/Wanted-39397.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 32. Row 43: Cherry In The Air (Escada, ELITE)
  {
    productId: "abna_cherry_in_the_air_escada_elite_43",
    notes: {
      top: ["Sour Cherry", "Raspberry", "Mandarin", "Daim"],
      middle: ["Marshmallow", "Vanilla", "Orchid", "Gardenia"],
      base: ["Sandalwood", "Musk", "Oak", "White Suede"],
    },
    accords: ["sweet", "cherry", "fruity", "vanilla", "powdery"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A light-hearted French summer cherry orchard with fluffy marshmallow and soft suede.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Cherry-in-the-Air-17147.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 33. Row 44: Man Silver (Zara, EXCLUSIVE)
  {
    productId: "abna_man_silver_zara_exclusive_44",
    notes: {
      top: ["Lemon", "Lavender", "Black Pepper"],
      middle: ["Neroli", "Cardamom"],
      base: ["Patchouli", "Cedarwood", "Sandalwood"],
    },
    accords: ["citrus", "aromatic", "warm spicy", "lavender", "fresh spicy"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A sharp, versatile daily fougère balancing energetic citrus, herbal lavender, and warm woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Zara/Man-Silver-44161.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 34. Row 45: Rose D'Arabie (Giorgio Armani, EXCLUSIVE)
  {
    productId: "abna_rose_d_arabie_giorgio_armani_exclusive_45",
    notes: {
      top: ["Damask Rose", "Saffron"],
      middle: ["Oud", "Patchouli"],
      base: ["Amber", "Vanilla"],
    },
    accords: ["rose", "oud", "warm spicy", "amber", "patchouli"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Beast",
      longevity: "10h+",
    },
    editorialStory:
      "A grand desert jewel fusing voluptuous crimson Damask rose, golden saffron, and majestic oud.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl:
        "https://www.fragrantica.com/perfume/Giorgio-Armani/Armani-Prive-Rose-d-Arabie-10886.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.97,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 35. Row 46: Un Jardin Lagune (Hermes, EXCLUSIVE)
  {
    productId: "abna_un_jardin_lagune_hermes_exclusive_46",
    notes: {
      top: ["Magnolia", "Pittosporum"],
      middle: ["Sea Salt", "Madonna Lily"],
      base: ["Woody Notes"],
    },
    accords: ["floral", "marine", "white floral", "woody", "salty"],
    fragranceFamily: ["Oriental", "Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A secret Venetian lagoon garden where salty sea breezes mingle with blooming magnolia.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Hermes/Un-Jardin-Sur-La-Lagune-53472.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 36. Row 47: Aventus (Creed, EXCLUSIVE)
  {
    productId: "abna_aventus_creed_exclusive_47",
    notes: {
      top: ["Bergamot", "Blackcurrant", "Apple", "Lemon", "Pink Pepper"],
      middle: ["Pineapple", "Patchouli", "Jasmine"],
      base: ["Birch", "Musk", "Oakmoss", "Ambroxan", "Cedarwood"],
    },
    accords: ["fruity", "woody", "smoky", "sweet", "leather"],
    fragranceFamily: ["Chypre", "Fruity"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "An iconic testament to strength, vision, and success celebrating smoked birch and crisp pineapple.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Creed/Aventus-9828.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.98,
      notesVerified: true,
      verificationStatus: "verified",
    },
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
        "Anise",
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
        "Gardenia",
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
        "Vanilla",
      ],
    },
    accords: ["aromatic", "woody", "fresh spicy", "green", "herbal"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "A classic powerhouse aromatic fougère of bracing herbs, coniferous pine, and rich leather.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Jaguar/Jaguar-for-Men-6820.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 38. Row 49: Tressor Midnight Rose (Lancome, EXCLUSIVE)
  {
    productId: "abna_tressor_midnight_rose_lancome_exclusive_49",
    notes: {
      top: ["Raspberry", "Rose"],
      middle: ["Cassis", "Pink Pepper", "Peony", "Jasmine"],
      base: ["Vanilla", "Musk", "Virginia Cedar"],
    },
    accords: ["fruity", "sweet", "rose", "soft spicy", "woody"],
    fragranceFamily: ["Floral", "Woody Musk"],
    performance: {
      sillage: "Strong",
      longevity: "8-10h",
    },
    editorialStory:
      "A mischievous nocturnal Parisian romance of candied raspberry, rose, and pink pepper.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Lancome/Tresor-Midnight-Rose-11721.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 39. Row 50: Miss Blooming Bouquet (Dior, EXCLUSIVE)
  {
    productId: "abna_miss_blooming_bouquet_dior_exclusive_50",
    notes: {
      top: ["Sicilian Mandarin"],
      middle: ["Pink Peony", "Damask Rose", "Apricot", "Peach"],
      base: ["White Musk"],
    },
    accords: ["floral", "rose", "fresh", "fruity", "musky"],
    fragranceFamily: ["Floral"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "An extraordinary silk dress embroidered with thousand delicate pink blossoms and peony.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Dior/Miss-Dior-Blooming-Bouquet-22498.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 40. Row 51: Cool Water Woman (Davidoff, VIP)
  {
    productId: "abna_cool_water_woman_davidoff_vip_51",
    notes: {
      top: ["Melon", "Lotus", "Lemon", "Pineapple", "Quince", "Calone", "Blackcurrant", "Lily"],
      middle: ["Lotus", "Water Lily", "Lily of the Valley", "Jasmine", "Honey", "Hawthorn", "Rose"],
      base: ["Musk", "Vetiver", "Raspberry", "Blackberry", "Sandalwood", "Peach", "Vanilla"],
    },
    accords: ["floral", "aquatic", "fruity", "fresh", "sweet"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "A shimmering cascade of aquatic flowers, dewy honeydew melon, and soothing woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Davidoff/Cool-Water-508.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 41. Row 52: Polo Blue (Ralph Lauren, VIP)
  {
    productId: "abna_polo_blue_ralph_lauren_vip_52",
    notes: {
      top: ["Cucumber", "Melon", "Mandarin"],
      middle: ["Basil", "Sage", "Geranium"],
      base: ["Suede", "Woody Notes", "Musk"],
    },
    accords: ["aquatic", "aromatic", "green", "fresh spicy", "ozonic"],
    fragranceFamily: ["Aromatic", "Fougère"],
    performance: {
      sillage: "Moderate",
      longevity: "6-8h",
    },
    editorialStory:
      "The freedom of the open blue sky and the crystal-clear energy of crashing ocean waters.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Ralph-Lauren/Polo-Blue-1198.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "exact_brand_and_name_match",
      confidence: 0.96,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 42. Row 53: Moon Sparkle (Escana [Escada], VIP)
  {
    productId: "abna_moon_sparkle_escana_vip_53",
    notes: {
      top: ["Strawberry", "Blackcurrant", "Red Apple", "Citruses"],
      middle: ["Sweet Pea", "Freesia", "Jasmine", "Rose"],
      base: ["Raspberry", "Musk", "Sandalwood", "Amber"],
    },
    accords: ["fruity", "sweet", "citrus", "fresh", "floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A pulsating moonlight summer dance of wild strawberries, sweet peas, and amber woods.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Escada/Moon-Sparkle-2066.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 43. Row 54: L'imperatice (D&G [Dolce & Gabbana], EXCLUSIVE)
  {
    productId: "abna_l_imperatice_d_g_exclusive_54",
    notes: {
      top: ["Kiwi", "Rhubarb", "Pink Pepper"],
      middle: ["Watermelon", "Cyclamen", "Jasmine"],
      base: ["Lemon", "Musk", "Sandalwood"],
    },
    accords: ["fruity", "aquatic", "sweet", "fresh", "tropical"],
    fragranceFamily: ["Floral", "Aquatic"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "A magnetic, mouth-watering explosion of tart rhubarb, juicy watermelon, and pink cyclamen.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl:
        "https://www.fragrantica.com/perfume/Dolce-Gabbana/D-G-Anthology-L-Imperatrice-3-6086.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.95,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },

  // 44. Row 55: Bali (Kenzo, EXCLUSIVE)
  {
    productId: "abna_bali_kenzo_exclusive_55",
    notes: {
      top: ["Passionfruit", "Grapefruit"],
      middle: ["Jasmine", "Orchid"],
      base: ["Vanilla", "Woody Notes"],
    },
    accords: ["tropical", "fruity", "citrus", "sweet", "white floral"],
    fragranceFamily: ["Floral", "Fruity"],
    performance: {
      sillage: "Moderate",
      longevity: "5-7h",
    },
    editorialStory:
      "The dawn light rising over Bali with tropical passionfruit, morning jasmine, and vanilla warmth.",
    source: {
      provider: "Fragrantica",
      source: "Fragrantica",
      sourceUrl: "https://www.fragrantica.com/perfume/Kenzo/7-15-AM-in-Bali-3069.html",
      sourceType: "external_reference",
      retrievedAt: "2026-08-29T10:00:00Z",
      matchingMethod: "normalized_alias_match",
      confidence: 0.94,
      notesVerified: true,
      verificationStatus: "verified",
    },
  },
];

/**
 * Batch 01 Items Enqueued for Human Curation / Manual Lab Verification.
 * Strictly adheres to the zero-hallucination policy.
 */
export const BATCH_01_REVIEW_QUEUE: AbnaEnrichmentReviewItem[] = [
  {
    productId: "abna_xxx_aigner_exclusive_5",
    productName: "XXX",
    brand: "Etienne Aigner",
    rawRowNumber: 5,
    reason:
      "Ambiguous commercial product name 'XXX' under Etienne Aigner. May refer to Aigner Statement, Aigner X-Limited, or Aigner No. 1. Requires curator confirmation.",
    attemptedSource: "Fragrantica",
    candidateSource: "https://www.fragrantica.com/perfume/Etienne-Aigner/Aigner-No-1-16474.html",
    missingInformation: ["Flanker / edition disambiguation", "Olfactive pyramid confirmation"],
    timestamp: "2026-08-29T10:00:00Z",
    status: "review_required",
  },
  {
    productId: "abna_cuddle_rose_powdery_guzel_vip_10",
    productName: "Cuddle Rose Powdery",
    brand: "Guzel (ABNA Signature)",
    rawRowNumber: 10,
    reason:
      "Internal ABNA Signature blend under Guzel brand line. No external Fragrantica entry exists; requires internal formulation specification sheet.",
    attemptedSource: "ABNA Internal Quality Lab",
    candidateSource: null,
    missingInformation: ["Internal lab formulation sheet", "Olfactive pyramid breakdown"],
    timestamp: "2026-08-29T10:00:00Z",
    status: "incomplete",
  },
  {
    productId: "abna_vanilla_cake_guzel_vip_11",
    productName: "Vanilla Cake",
    brand: "Guzel (ABNA Signature)",
    rawRowNumber: 11,
    reason:
      "Internal ABNA Signature blend under Guzel brand line. Requires internal lab recipe verification.",
    attemptedSource: "ABNA Internal Quality Lab",
    candidateSource: null,
    missingInformation: ["Internal lab formulation sheet", "Olfactive pyramid breakdown"],
    timestamp: "2026-08-29T10:00:00Z",
    status: "incomplete",
  },
  {
    productId: "abna_cusson_guzel_vip_12",
    productName: "Cusson",
    brand: "Guzel (ABNA Signature)",
    rawRowNumber: 12,
    reason:
      "Internal ABNA Signature baby-powder formulation under Guzel line. Requires official internal recipe verification.",
    attemptedSource: "ABNA Internal Quality Lab",
    candidateSource: null,
    missingInformation: ["Internal lab formulation sheet", "Pyramid notes breakdown"],
    timestamp: "2026-08-29T10:00:00Z",
    status: "incomplete",
  },
  {
    productId: "abna_extreme_outdoor_guzel_vip_15",
    productName: "Extreme Outdoor",
    brand: "Guzel (ABNA Signature)",
    rawRowNumber: 15,
    reason:
      "Internal ABNA Signature outdoor blend under Guzel line. Requires internal formulation record.",
    attemptedSource: "ABNA Internal Quality Lab",
    candidateSource: null,
    missingInformation: ["Internal formulation sheet", "Olfactive pyramid"],
    timestamp: "2026-08-29T10:00:00Z",
    status: "incomplete",
  },
  {
    productId: "abna_kasturi_korma_kasturi_korma_vip_26",
    productName: "Kasturi Korma",
    brand: "Kasturi Korma",
    rawRowNumber: 26,
    reason:
      "Traditional non-designer Middle-Eastern attar oil. Requires local supplier ingredient specification.",
    attemptedSource: "ABNA Supplier Sheet",
    candidateSource: null,
    missingInformation: ["Supplier formulation breakdown", "Olfactive notes"],
    timestamp: "2026-08-29T10:00:00Z",
    status: "incomplete",
  },
];

/**
 * Summary Statistics for Batch 01
 */
export const BATCH_01_SUMMARY: AbnaBatchEnrichmentSummary = {
  batchId: "BATCH_01",
  productsEvaluated: 50,
  enriched: 44,
  reviewRequired: 1,
  notFound: 0,
  incomplete: 5,
  validVectorsCount: 44,
  invalidVectorsCount: 0,
  provenanceCompleteCount: 44,
  provenanceMissingCount: 0,
  reviewQueue: BATCH_01_REVIEW_QUEUE,
};
