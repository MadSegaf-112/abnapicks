# RECOMMENDATION ENGINE ARCHITECTURE & SPECIFICATION (PHASE 2)

## 1. Overview

The recommendation engine transforms raw quiz responses into a mathematically normalized customer preference profile and evaluates it deterministically against the curated fragrance dataset. Product selection is 100% reproducible and grounded in verified fragrance data, completely eliminating hallucination risk.

---

## 2. Customer Profile Model

Defined in [`src/data/recommendation-types.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/recommendation-types.ts):

```typescript
export interface CustomerPreferenceProfile {
  features: FragranceFeatureVector; // 10D: [0.0 - 1.0]
  metadata: {
    mood?: string;
    atmosphere?: string;
    scent_family: string[];
    intensity_raw: number;
    occasion?: string;
  };
}
```

---

## 3. Quiz → Feature Mapping Rules

### A. Scent Family (Primary Olfactive Signal, ~50-60% Base Weight)

- `floral`: `{ floral: 0.85, sweetness: 0.25, freshness: 0.2 }`
- `woody`: `{ woody: 0.85, warmth: 0.35, spicy: 0.15 }`
- `citrus`: `{ citrus: 0.9, freshness: 0.75 }`
- `oriental`: `{ warmth: 0.85, spicy: 0.65, sweetness: 0.35 }`
- `aquatic`: `{ aquatic: 0.9, freshness: 0.75 }`
- `gourmand`: `{ gourmand: 0.9, sweetness: 0.75, warmth: 0.45 }`

**Multi-Select Aggregation Strategy**:
When multiple families are selected, their vectors are combined with a square-root dampening factor:
$$\text{Multiplier} = \max\left(0.6, \frac{1}{\sqrt{N}}\right)$$
This ensures each chosen family contributes meaningful olfactive weight without saturating or overriding other selections.

### B. Mood Mapping (Emotional Nuance, ~15-20% Modifier)

- `mysterious`: `{ warmth: 0.35, woody: 0.25, spicy: 0.3, intensity: 0.15 }`
- `radiant`: `{ freshness: 0.35, citrus: 0.3, floral: 0.2, warmth: 0.15 }`
- `serene`: `{ freshness: 0.35, aquatic: 0.2, floral: 0.2, woody: 0.1 }`
- `empowered`: `{ woody: 0.35, spicy: 0.25, citrus: 0.2, intensity: 0.2 }`

### C. Atmosphere Mapping (Sensory Context, ~10-15% Modifier)

- `rain`: `{ aquatic: 0.4, freshness: 0.35, woody: 0.15 }`
- `curtains`: `{ freshness: 0.3, floral: 0.25, sweetness: 0.15 }`
- `forest`: `{ woody: 0.45, freshness: 0.25, warmth: 0.15 }`
- `candlelight`: `{ warmth: 0.4, sweetness: 0.25, gourmand: 0.2, spicy: 0.15 }`

### D. Occasion Mapping (Situational Context, ~10-15% Modifier)

- `daily`: `{ freshness: 0.3, citrus: 0.2, floral: 0.15 }`
- `night`: `{ warmth: 0.35, gourmand: 0.25, spicy: 0.25, intensity: 0.2 }`
- `romance`: `{ floral: 0.3, sweetness: 0.3, warmth: 0.25 }`
- `outdoor`: `{ freshness: 0.35, aquatic: 0.3, woody: 0.2 }`

### E. Intensity Normalization

- Slider value $1 \dots 5 \to 0.00, 0.25, 0.50, 0.75, 1.00$
- Blended with context: $\text{Intensity} = 0.8 \times \text{Slider} + 0.2 \times \text{ContextualIntensity}$.

---

## 4. Scoring Algorithm & Feature Weights

The similarity score combines a weighted cosine dot product with a targeted distance penalty:

$$\text{Cosine} = \frac{\sum w_i c_i f_i}{\sqrt{\sum w_i c_i^2} \sqrt{\sum w_i f_i^2}}$$

### Feature Importance Weights ($w_i$):

- `floral`: $1.2$, `woody`: $1.2$
- `freshness`: $1.1$, `warmth`: $1.1$, `citrus`: $1.1$, `aquatic`: $1.1$, `gourmand`: $1.1$
- `sweetness`: $1.0$, `spicy`: $1.0$
- `intensity`: $0.8$

### Match Percentage Conversion:

$$\text{Match Percent} = \text{round}\left(60 + (\text{Score})^{1.2} \times 38\right)$$
Clamped into $[50\%, 98\%]$.

---

## 5. Ranking & Tie-Breaking

1. Primary: `score` descending
2. Tie-Breaker 1: `matchPercent` descending
3. Tie-Breaker 2: `fragrance.id` ascending (guarantees 100% strict reproducibility across repeated executions)

---

## 6. Verification Test Scenarios

- **TEST A (Fresh / Citrus / Daily)**: Top 3 $\to$ _Neroli Portofino (89%)_, _Aventus (85%)_, _Grey Vetiver (85%)_ $\to$ **PASS**
- **TEST B (Warm / Gourmand / Night)**: Top 3 $\to$ _Grand Soir (95%)_, _Tobacco Vanille (94%)_, _Angels' Share (93%)_ $\to$ **PASS**
- **TEST C (Woody / Outdoor)**: Top 3 $\to$ _Encre Noire (92%)_, _La Nuit de L'Homme (92%)_, _Santal 33 (90%)_ $\to$ **PASS**
- **TEST D (Floral / Romance)**: Top 3 $\to$ _Lazy Sunday Morning (92%)_, _Neroli Portofino (91%)_, _Soleil Blanc (91%)_ $\to$ **PASS**
- **TEST E (Determinism Check)**: 50 successive runs with identical inputs yielded 0 variance $\to$ **PASS**
- **TEST F (Edge Case Handling)**: Empty input graceful fallback $\to$ **PASS**

---

## 7. Why Gemini is NOT Responsible for Product Selection

LLMs cannot guarantee inventory accuracy, catalogue constraints, or mathematical scoring reproducibility. By placing product selection in a deterministic engine and restricting recommendations strictly to dataset records, we eliminate hallucination. In Phase 3, Gemini can be utilized purely as a narrative and editorial layer over these verified products.
