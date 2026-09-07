# Phase 6C-1 — Controlled Olfactive Dictionary & 10D Feature Mapping

## 1. Executive Summary

Phase 6C-1 establishes the controlled, deterministic olfactive dictionary and transformation layer for AURA AI. This module acts as the scientific bridge between raw olfactive material specifications (notes and accords) and AURA AI's normalized 10-dimensional feature vector:

1. **`freshness`** — Crisp, sparkling, airy, clean energy
2. **`sweetness`** — Sugary, vanillic, candied, or dessert sweetness
3. **`warmth`** — Resinous, ambery, cozy, balsamic depth
4. **`floral`** — Rose, jasmine, white floral, or floral bouquet presence
5. **`woody`** — Cedar, sandalwood, oud, vetiver, or dry timber
6. **`citrus`** — Bergamot, lemon, grapefruit, mandarin zest
7. **`spicy`** — Cardamom, pepper, cinnamon, clove punch/warmth
8. **`aquatic`** — Marine, salty, ozonic, breezy water accords
9. **`gourmand`** — Vanilla, coffee, chocolate, tonka edible confection
10. **`intensity`** — Sillage, projection, concentration weight

All feature transformations are **deterministic, explainable, source-agnostic, auditable, and strictly bounded within `0.0 <= value <= 1.0`**.

---

## 2. Architecture Overview

The system strictly follows the separation of concerns:

```
+--------------------------------------------------------+
|                 RAW OLFACTIVE DATA                     |
|  (top, middle, base notes, accords, performance specs) |
+--------------------------------------------------------+
                           |
                           v
+--------------------------------------------------------+
|             ALIAS NORMALIZATION ENGINE                 |
|  - Case, punctuation, unicode normalization            |
|  - Reverse-index lookup to canonical key               |
|  - Segregates recognized terms from unknown terms      |
+--------------------------------------------------------+
                           |
                           v
+--------------------------------------------------------+
|          CONTROLLED OLFACTIVE DICTIONARIES             |
|  - CANONICAL_NOTES: Material semantic contributions    |
|  - CANONICAL_ACCORDS: Holistic modifier contributions  |
+--------------------------------------------------------+
                           |
                           v
+--------------------------------------------------------+
|               DERIVATION & AGGREGATION                 |
|  - Pyramid weighting (Top: 0.95, Mid: 1.00, Base: 1.05)|
|  - Accord modifier (Weight: 0.35)                      |
|  - Intensity derivation (Inferred / Verified / Hybrid) |
+--------------------------------------------------------+
                           |
                           v
+--------------------------------------------------------+
|            NON-LINEAR BOUNDED NORMALIZATION            |
|  - Soft exponential saturation: 1 - exp(-1.25 * x)     |
|  - Clamped strictly [0.0, 1.0] with 2-decimal rounding |
+--------------------------------------------------------+
                           |
                           v
+--------------------------------------------------------+
|           FINAL AUDITABLE DERIVATION RESULT            |
|  - 10D Feature Vector                                  |
|  - Derivation Metadata & Quality Confidence            |
|  - Unknown Term Store Registration                     |
+--------------------------------------------------------+
```

---

## 3. Directory Structure

```
src/data/olfactive/dictionary/
├── types.ts            # Type definitions, interfaces, and taxonomy categories
├── notes.ts            # Canonical note taxonomy and 10D contribution vectors
├── accords.ts          # Canonical accord taxonomy and 10D contribution vectors
├── aliases.ts          # String normalization, precomputed reverse lookup, alias matching
├── derivation.ts       # Deterministic derivation engine, pyramid weighting, confidence calculator
├── unknown-terms.ts    # Store and tracking queue for unmapped terms
└── index.ts            # Clean unified module exports
```

---

## 4. Dictionary Taxonomy & Coverage

### 4.1 Note Taxonomy Groups (70+ Canonical Materials)

- **Citrus**: Bergamot, Lemon, Lime, Mandarin, Orange, Grapefruit, Neroli, Petitgrain, Yuzu.
- **Floral**: Rose, Jasmine, Tuberose, Iris, Peony, Violet, Orange Blossom, Ylang-Ylang, Lily, Lily of the Valley, Gardenia, Magnolia, Freesia, Geranium, Osmanthus, Heliotrope.
- **Woody**: Cedarwood, Sandalwood, Vetiver, Patchouli, Oud, Guaiac Wood, Cashmere Wood, Birch, Oak, Cypress, Pine.
- **Fresh / Aromatic / Green**: Mint, Lavender, Rosemary, Sage, Basil, Green Notes, Aldehydes, Ozonic Notes, Clean Musk, Eucalyptus.
- **Spicy**: Cardamom, Black Pepper, Pink Pepper, Cinnamon, Clove, Saffron, Nutmeg, Ginger, Coriander, Star Anise.
- **Aquatic / Marine**: Marine Notes, Sea Salt, Calone, Water Notes, Mineral Notes, Driftwood, Seaweed.
- **Gourmand**: Vanilla, Caramel, Chocolate, Coffee, Praline, Cocoa, Almond, Coconut, Hazelnut, Honey, Milk, Marshmallow, Rum.
- **Warm / Amber / Resinous**: Amber, Benzoin, Labdanum, Incense, Myrrh, Tonka Bean, Tobacco, Balsamic Notes, Resins.
- **Musk / Ambery Materials**: White Musk, Musk, Ambroxan, Cashmeran, Leather.
- **Fruity**: Apple, Pear, Peach, Plum, Blackcurrant, Raspberry, Strawberry, Cherry, Pineapple, Mango.

### 4.2 Cross-Dimensional Semantic Contributions

Fragrance materials are multi-faceted. Semantic contributions accurately reflect their multi-dimensional nature rather than boxing them into a single category. For example:

- **Bergamot**: `{ citrus: 0.95, freshness: 0.75, floral: 0.10 }`
- **Neroli**: `{ citrus: 0.65, floral: 0.75, freshness: 0.70 }`
- **Vanilla**: `{ sweetness: 0.85, gourmand: 0.95, warmth: 0.60 }`
- **Oud**: `{ woody: 1.00, warmth: 0.80, spicy: 0.35, intensity: 0.70 }`
- **Ambroxan**: `{ warmth: 0.60, aquatic: 0.45, freshness: 0.40, woody: 0.35, intensity: 0.45 }`

---

## 5. Alias Strategy

To support varied naming conventions across sources:

- **String Normalization**: Strips accents (`NFD`), lowercase, normalizes whitespace and punctuation.
- **Precomputed Reverse Indices**:
  - `NOTE_ALIAS_INDEX`: Maps canonical names and all registered aliases to canonical note keys.
  - `ACCORD_ALIAS_INDEX`: Maps canonical accords and aliases to canonical accord keys.
- **Sub-word / Word Boundary Fallback**: Matches terms with qualifying prefixes/suffixes (e.g., `"Calabrian Bergamot"` -> `bergamot`, `"Madagascar Vanilla"` -> `vanilla`).

---

## 6. Accord Strategy & Hierarchy

Accords are overarching olfactive themes that modify the profile rather than defining it alone:

- **Notes = Primary Signal**: Weighted by pyramid position (0.95 - 1.05).
- **Accords = Secondary Modifier**: Weighted at `0.35`. Accords enrich holistic characteristics without masking note-specific nuances.

---

## 7. Pyramid Weighting & Derivation Formula

$$\text{RawSum}(d) = \sum_{n \in \text{top}} w_{\text{top}} \cdot C_n(d) + \sum_{n \in \text{mid}} w_{\text{mid}} \cdot C_n(d) + \sum_{n \in \text{base}} w_{\text{base}} \cdot C_n(d) + \sum_{a \in \text{accords}} w_{\text{accord}} \cdot C_a(d)$$

Where:

- $w_{\text{top}} = 0.95$
- $w_{\text{mid}} = 1.00$
- $w_{\text{base}} = 1.05$
- $w_{\text{accord}} = 0.35$

### Normalization & Saturation

Features are normalized using bounded soft exponential saturation:
$$\text{Feature}(d) = \min\left(1.0, \max\left(0.0, 1 - e^{-1.25 \cdot \text{RawSum}(d)}\right)\right)$$

---

## 8. Intensity Handling & Architecture

Intensity is handled via a dedicated multi-mode pipeline:

- **`inferred`**: Derived from heavy notes (oud, amber, resins, leather, saffron) plus baseline.
- **`verified`**: Explicit perfumer measurement override (if available).
- **`hybrid`**: Combines note accumulation (40%) with performance specs (longevity and sillage) (60%).

---

## 9. Confidence Scoring & Review Queue

Confidence measures data completeness and reliability:

- High confidence ($\ge 0.80$): Complete pyramid and high note recognition.
- Medium confidence ($0.50 \le c < 0.80$): Adequate recognition with some unknown notes.
- Low confidence ($< 0.50$): Few recognized notes or missing pyramid.

### Unknown Term Tracking

Unknown notes and accords are **never silently discarded**. They are captured in `UNKNOWN_TERM_STORE` with:

- Raw & normalized term strings
- Occurrences count and timestamp tracking
- Associated ABNA Product IDs
- Review status (`pending`, `reviewed`, `mapped`, `ignored`)

---

## 10. Test Verification Results

All 50 unit and integration assertions pass:

1. **Alias Normalization**: 14/14 cases resolved to canonical dictionary keys.
2. **TEST A (Citrus Fresh)**: `citrus: 0.97`, `freshness: 0.97`, `floral: 0.65`.
3. **TEST B (Woody Amber)**: `woody: 0.96`, `warmth: 0.98`, `spicy: 0.78`.
4. **TEST C (Floral Sweet)**: `floral: 0.96`, `sweetness: 0.97`, `warmth: 0.86`.
5. **TEST D (Gourmand)**: `gourmand: 1.00`, `sweetness: 0.99`, `warmth: 0.97`.
6. **TEST E (Aquatic)**: `aquatic: 0.93`, `freshness: 0.97`, `citrus: 0.68`.
7. **Determinism & Range**: $100\%$ identical output on identical inputs; all values strictly bounded in $[0.0, 1.0]$.
8. **Unknown Term Tracking**: Unrecognized terms flagged and queued correctly.
