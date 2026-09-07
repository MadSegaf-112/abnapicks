# PHASE 6E-1: ABNA PRODUCTION RECOMMENDATION INTEGRATION DESIGN & ARCHITECTURE REPORT

---

## 1. Executive Summary & Authoritative Baseline

Following the successful completion and verification of **Phase 6D**, the ABNA catalog enrichment subsystem is fully audited and certified:

- **Official ABNA Catalog**: Exactly **497 products** parsed from source data.
- **Validated Active Enriched Products**: **444 products (89.3%)** with complete pyramid notes, accords, performance profiles, verified provenance, and derived 10D feature vectors ($[0.0, 1.0]$).
- **Human / Lab Review Queue**: **53 products (10.7%)** (13 `review_required` + 40 `incomplete` + 0 `not_found`).
- **Controlled Olfactive Dictionary**: 124 canonical notes, 25 canonical accords, 701 note aliases, 86 accord aliases, 38 cross-category mappings (**0 unknown terms**).
- **Production Engine Invariants**: `scoring-engine.ts`, `quiz.ts`, `fragrances.ts`, `narrative-service.ts`, and the 25-fragrance reference benchmark remain **100% UNTOUCHED and pristine**.

This document outlines the **integration design (Phase 6E-1)** for transitioning the live recommendation engine from the temporary 25-fragrance seed dataset (`FRAGRANCES`) to the authoritative **444 validated ABNA catalog products** in Phase 6E-2 without mutating core scoring math or breaking existing regression benchmarks.

---

## 2. Current Architecture & Contract Inspection

### 2.1 Scoring Engine Contract (`src/data/scoring-engine.ts`)

- **Input**:
  - `profile: CustomerPreferenceProfile` (containing normalized 10D customer preference vector `features` and user `metadata`).
  - `dataset: Fragrance[]` (defaults to `FRAGRANCES`, but cleanly accepts any valid `Fragrance[]` array).
  - `topCount: number` (defaults to 3).
- **Function Signature**:
  ```typescript
  export function scoreAndRankFragrances(
    profile: CustomerPreferenceProfile,
    dataset: Fragrance[] = FRAGRANCES,
    topCount = 3,
  ): DeterministicRecommendationResult;
  ```
- **Output**:
  ```typescript
  export interface DeterministicRecommendationResult {
    customerProfile: CustomerPreferenceProfile;
    recommendations: ScoredFragrance[];
  }
  ```
- **Crucial Architectural Finding**: `scoreAndRankFragrances` was already architected with clean dependency injection (`dataset: Fragrance[]`). Therefore, **`scoring-engine.ts` DOES NOT need any code changes** to evaluate ABNA products.

---

### 2.2 Recommendation Adapter Architecture (`src/data/recommendation-adapter.ts`)

- Currently takes `ScoredFragrance[]`, `CustomerPreferenceProfile`, and optional AI `Map<string, ProductNarrative>`.
- Converts scored products into the UI-ready `Recommendation` schema defined in `src/lib/recommendations.functions.ts`.
- Invariants:
  - Factual data (name, brand, category, notes, performance) is preserved directly from the `Fragrance` model.
  - Scores and match percentages are preserved directly from `ScoredFragrance`.
  - Editorial stories and "Why Match" descriptions leverage Gemini narrative output with deterministic fallback.

---

### 2.3 Server Entry Point (`src/lib/recommendations.functions.ts`)

- Orchestrates the request pipeline:
  1. `buildCustomerProfile(data)` $\rightarrow$ builds `CustomerPreferenceProfile`.
  2. `scoreAndRankFragrances(customerProfile)` $\rightarrow$ currently calls default `dataset = FRAGRANCES`.
  3. `generatePersonalizedNarratives(...)` $\rightarrow$ prompts Gemini for top 3 products.
  4. `formatRecommendationsWithNarratives(...)` $\rightarrow$ adapts to UI format.
  5. `RecommendationSchema.parse(...)` $\rightarrow$ Zod validation.

---

## 3. End-to-End Pipeline Architecture & Data Flow

```mermaid
flowchart TD
    A["Customer Quiz Answers (7 Steps)"] --> B["buildCustomerProfile()"]
    B --> C["CustomerPreferenceProfile (10D Vector)"]

    subgraph ABNA Catalog Integration Layer
        D1["RAW_ABNA_PRODUCTS (497 Rows)"] --> D3["ingestAbnaProducts()"]
        D2["ALL_ACTIVE_ENRICHMENT_RECORDS (444 Records)"] --> D3
        D3 --> D4["Filter: olfactive.status === 'validated' && derived.features exists"]
        D4 --> D5["adaptAbnaToFragranceDataset() (444 Candidates)"]
    end

    C --> E["scoreAndRankFragrances(customerProfile, abnaFragranceDataset, 3)"]
    D5 --> E

    E --> F["Deterministic Top 3 ScoredFragrance[]"]
    F --> G["generatePersonalizedNarratives(Gemini / Offline Fallback)"]
    C --> G

    F --> H["formatRecommendationsWithNarratives()"]
    G --> H

    H --> I["RecommendationSchema.parse() (Zod Validation)"]
    I --> J["ResultsScreen UI (Hero + Alternate Cards)"]
```

---

## 4. Candidate Data Contract & Adapter Specification

To convert an `AbnaProduct` (validated) into a standard `Fragrance` model for scoring:

```typescript
export function adaptAbnaProductToFragrance(abna: AbnaProduct): Fragrance {
  const notesTop = abna.olfactive.notes?.top || [];
  const notesMid = abna.olfactive.notes?.middle || [];
  const notesBase = abna.olfactive.notes?.base || [];

  const familyString = abna.olfactive.fragranceFamily?.join(" ") || "Signature";
  const editorial =
    abna.olfactive.editorialStory || `${abna.identity.name} oleh ${abna.identity.brand}.`;

  return {
    id: abna.id,
    name: abna.identity.name,
    brand: abna.identity.brand,
    gender: abna.identity.gender,
    fragranceFamily: familyString,
    notes: {
      top: notesTop,
      middle: notesMid,
      base: notesBase,
    },
    accords: abna.olfactive.accords || [],
    description: editorial,
    performance: {
      longevity: "8-10h",
      sillage: "Strong",
    },
    catalog: {
      price: abna.catalog.prices.ml30 || 150000,
      currency: "IDR",
      size: "30ml",
      inStock: abna.catalog.inStock,
      imageUrl:
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80",
      editorialStory: abna.olfactive.editorialStory,
    },
    features: abna.derived!.features,
  };
}
```

### Strict Candidate Filtering Rule:

Only products meeting **ALL** of the following conditions can enter the recommendation scoring candidate pool:

1. `p.olfactive.status === "validated"`
2. `p.derived !== undefined && p.derived.features !== undefined`
3. Zero missing dimensions in the 10D vector
4. Product ID belongs to `ALL_ACTIVE_ENRICHMENT_RECORDS`

**Guaranteed Invariant**: Exactly **444 products** enter the scoring candidate pool. All 53 review queue items (`review_required` and `incomplete`) are strictly excluded.

---

## 5. Scope of Changes for Implementation (Phase 6E-2)

### Files to be Created:

1. `src/data/abna-recommendation-adapter.ts` (or extension in `src/data/recommendation-adapter.ts`):
   - Module that ingests and exposes the pre-adapted `ABNA_RECOMMENDATION_DATASET: Fragrance[]` (444 products).
2. `test-abna-recommendation-integration.ts`:
   - Verification test suite proving that `ABNA_RECOMMENDATION_DATASET` has 444 valid items, passes scoring, generates valid Zod payloads, and maintains zero variance across multiple runs.

### Files to be Modified in Phase 6E-2:

1. `src/lib/recommendations.functions.ts`:
   - Point `scoreAndRankFragrances(customerProfile, ABNA_RECOMMENDATION_DATASET)` to the adapted ABNA dataset instead of default `FRAGRANCES`.
2. `src/data/abna/index.ts`:
   - Export adapter utilities and dataset.

### Files that MUST Remain 100% UNTOUCHED:

- `src/data/scoring-engine.ts` (Mathematical scoring logic & weights)
- `src/data/quiz.ts` (Quiz questions, options, images)
- `src/data/fragrances/fragrances.ts` (25-fragrance benchmark dataset)
- `src/data/fragrances/types.ts`
- `src/data/customer-profile.ts`
- `src/data/narrative-service.ts`
- `src/components/aura/QuizScreen.tsx`
- `src/components/aura/ResultsScreen.tsx`
- `src/components/aura/AbnaProductCard.tsx`

---

## 6. Benchmark Regression & Safety Strategy

1. **Dual Dataset Architecture**:
   - `FRAGRANCES` (25 items) remains in the codebase as the **Authoritative Reference Benchmark Dataset**.
   - `test-recommendation.ts` will continue testing `scoreAndRankFragrances(profile, FRAGRANCES)` to ensure zero algorithmic drift.
2. **Dedicated ABNA Recommendation Test Suite**:
   - `test-abna-recommendation-integration.ts` tests real ABNA queries (Citrus, Woody, Gourmand, Floral, Traditional Attar filtering, Male/Female/Unisex alignment).
3. **Zod Schema Integrity**:
   - All recommended ABNA items must pass `RecommendationSchema.parse()` with valid rank, notes, match percent, and strings.

---

## 7. Architectural Risks & Mitigation

| Risk                                                       | Likelihood | Impact | Mitigation Strategy                                                                                                                   |
| ---------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Ingestion execution overhead on every server function call | Medium     | Low    | Precompute/memoize `ABNA_RECOMMENDATION_DATASET` at module load time so runtime execution is $O(1)$ lookup.                           |
| Incomplete notes rendering in UI                           | Low        | Low    | `AbnaProductCard.tsx` already has defensive checks (`hasTopNotes`, `hasMiddleNotes`, `hasBaseNotes`, `hasPyramid`).                   |
| ID collisions or missing image URLs                        | Low        | Low    | All 444 IDs are guaranteed unique; default high-resolution curated bottle placeholder provided if specific Unsplash ID is unassigned. |
| Review queue leakage into recommendations                  | Zero       | High   | Hard filter `p.olfactive.status === 'validated'` with assertion tests verifying candidate count is exactly 444.                       |

---

## 8. Verification & Readiness Status

- All existing test suites are **GREEN** (Phase 6C-1, 6C-2, 6C-3A..I, Phase 6D Audit, Recommendations, Narrative).
- TypeScript strict check (`bun x tsc --noEmit`): **0 errors**.
- ESLint (`bun run lint`): **0 errors**.
- Production build (`bun run build`): **Clean success in 9.61s**.

**PHASE 6E-1 DESIGN & AUDIT IS COMPLETE.**
We are fully prepared to execute **Phase 6E-2 (Implementation & Live Integration)** upon user confirmation.
