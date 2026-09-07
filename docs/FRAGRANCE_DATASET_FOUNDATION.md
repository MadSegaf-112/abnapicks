# PHASE 1 — FRAGRANCE DATASET FOUNDATION ARCHITECTURE & DOCUMENTATION

## 1. Executive Summary

Phase 1 establishes the deterministic data layer and olfactive feature model for the ABNA / AURA AI recommendation engine. It decouples the recommendation engine from raw upstream data sources, providing a normalized representation with mathematical guarantees ($0.0 \le \text{feature} \le 1.0$) across all dimensions.

---

## 2. Fragrance Data Architecture

```
Raw Fragrance Source (Temporary Seed / Future ABNA Catalog)
                      │
                      ▼
       [ Normalizer & Deterministic Pipeline ]
  (Accords + Note Hierarchy + Performance Mapping)
                      │
                      ▼
         [ Normalized Internal Fragrance ]
    - ID, Name, Brand, Gender, Family
    - Pyramidal Notes (Top, Heart, Base)
    - Accords
    - Performance & Commercial Metadata
    - 10D Derived Feature Vector [0.0 - 1.0]
                      │
                      ▼
 [ Recommendation Scoring Engine (Future Phase 2) ]
```

---

## 3. Raw Data vs. Derived Features Separation

### Raw Source Data (`RawFragranceInput`)

Contains empirical, human-readable facts about the fragrance:

- `id`, `name`, `brand`, `gender`, `fragranceFamily`
- `notes`: `{ top: string[], middle: string[], base: string[] }`
- `accords`: `string[]`
- `performance`: `{ longevity, sillage }`
- `catalog`: `{ price, currency, size, imageUrl, editorialStory, inStock }`

### Derived Features (`FragranceFeatureVector`)

Deterministic numerical attributes calculated algorithmically without LLM hallucination:

- `freshness`: $[0.0, 1.0]$
- `sweetness`: $[0.0, 1.0]$
- `warmth`: $[0.0, 1.0]$
- `floral`: $[0.0, 1.0]$
- `woody`: $[0.0, 1.0]$
- `citrus`: $[0.0, 1.0]$
- `spicy`: $[0.0, 1.0]$
- `aquatic`: $[0.0, 1.0]$
- `gourmand`: $[0.0, 1.0]$
- `intensity`: $[0.0, 1.0]$

---

## 4. Feature Definitions & Olfactive Significance

| Dimension       | Olfactive Significance                                                       | Note & Accord Triggers                                                      | Scale & Range   |
| :-------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :-------------- |
| **`freshness`** | Crisp, airy, clean, bright energy; essential for daytime & hot climate wear. | Bergamot, mint, calone, aldehydes, marine notes, green tea, ozonic notes.   | $0.0 \dots 1.0$ |
| **`sweetness`** | Sugary, vanillic, nectar, and dessert warmth.                                | Vanilla, tonka, caramel, honey, praline, ripe fruits.                       | $0.0 \dots 1.0$ |
| **`warmth`**    | Resinous, cozy, balsamic, and ambery depth.                                  | Amber, labdanum, benzoin, resins, musk, incense, leather, tobacco.          | $0.0 \dots 1.0$ |
| **`floral`**    | Petals, bouquets, powdery blossoms, and romantic facets.                     | Rose, jasmine, neroli, tuberose, iris, ylang-ylang, lily of the valley.     | $0.0 \dots 1.0$ |
| **`woody`**     | Timber, dry bark, rootiness, and earthiness.                                 | Cedarwood, sandalwood, vetiver, oud, patchouli, oakmoss, birch.             | $0.0 \dots 1.0$ |
| **`citrus`**    | Sharp, effervescent, sunlit rind and zest.                                   | Lemon, bergamot, mandarin, grapefruit, lime, orange blossom.                | $0.0 \dots 1.0$ |
| **`spicy`**     | Piquant kick, warm exotic spices, or cool tingling peppers.                  | Cardamom, black/pink pepper, cinnamon, clove, nutmeg, ginger, saffron.      | $0.0 \dots 1.0$ |
| **`aquatic`**   | Marine salt, open air, sea spray, and ozonic coastal notes.                  | Sea salt, marine accords, seaweed, calone, driftwood, ambergris.            | $0.0 \dots 1.0$ |
| **`gourmand`**  | Edible dessert luxury, confectionery richness, and roasted notes.            | Coffee, cocoa, praline, caramel, almond, vanilla, rum, cognac.              | $0.0 \dots 1.0$ |
| **`intensity`** | Concentration weight, sillage cloud, projection presence, and longevity.     | Performance metrics ("Beast", "Strong", "10h+"), oud, heavy ambers, resins. | $0.0 \dots 1.0$ |

---

## 5. Deterministic Feature Derivation Methodology

The mapping pipeline in [feature-mapping.ts](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/fragrances/feature-mapping.ts) processes inputs using positional olfactive weights:

1. **Accords (Weight: 1.0)**: High-level classification accords directly inject categorical baseline weights.
2. **Top Notes (Weight: 0.8)**: Prioritizes citrus, fresh spicy, and volatile aromatic compounds.
3. **Middle Notes (Weight: 0.85)**: Prioritizes floral hearts, gourmand layers, and core spices.
4. **Base Notes (Weight: 0.9)**: Prioritizes heavy woods, resins, amber, musk, and fixatives.
5. **Performance (Weight: 0.6 on Intensity)**: Translates longevity and sillage into an intensity baseline.
6. **Mathematical Normalization**:
   $$\text{Normalized Value} = 1 - e^{-1.5 \times \sum w_i}$$
   Clamped strictly into $[0.0, 1.0]$ with two decimal digits of precision.

---

## 6. Temporary Dataset Composition

The temporary dataset consists of **25 curated iconic benchmark fragrances** across designers and niche houses (Chanel, Dior, Tom Ford, Creed, Le Labo, Maison Margiela, Kilian, Frederic Malle, Diptyque, Parfums de Marly, Lalique, Nasomatto, Giorgio Armani).

Coverage includes:

- **Citrus/Fresh**: _Neroli Portofino_, _Grey Vetiver_, _Terre d'Hermès_
- **Aquatic/Marine**: _Acqua di Giò Profondo_, _Wood Sage & Sea Salt_
- **Woody/Oud**: _Santal 33_, _Encre Noire_, _Oud Wood_, _Black Afgano_
- **Floral/Powdery**: _Rose 31_, _Fleur de Peau_, _Soleil Blanc_, _Lazy Sunday Morning_
- **Warm/Amber**: _Grand Soir_, _Baccarat Rouge 540_, _Portrait of a Lady_
- **Gourmand/Spicy**: _Angels' Share_, _Tobacco Vanille_, _Black Opium_, _Herod_, _La Nuit de L'Homme_
- **Versatile/Signature**: _Bleu de Chanel_, _Sauvage EDP_, _Aventus_, _Philosykos_

---

## 7. Future ABNA Catalog Integration Strategy

When ABNA provides its commercial catalog:

1. Map ABNA catalog products into `RawFragranceInput` records (or provide an ABNA normalizer adapter).
2. Pass raw products through `normalizeFragrance()` or run pre-computed derivation.
3. The future scoring engine interacts purely with the `Fragrance` interface, requiring **zero code refactoring** when switching from proof-of-concept data to the real ABNA catalog.
