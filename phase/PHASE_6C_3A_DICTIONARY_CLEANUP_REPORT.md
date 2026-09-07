# Phase 6C-3A — Controlled Olfactive Dictionary Cleanup Report

## 1. Executive Summary

Phase 6C-3A successfully resolves all unmapped olfactive terms identified during the Phase 6C-2 pilot ingestion. The controlled dictionary has been enriched with precise canonical definitions, controlled aliases, and explicit cross-category normalization logic.

Crucially:

- **Zero modification** to the live recommendation engine ([`src/data/scoring-engine.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/scoring-engine.ts)), quiz logic ([`src/data/quiz.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/quiz.ts)), or 25-fragrance benchmark catalog ([`src/data/fragrances/fragrances.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/fragrances/fragrances.ts)).
- **Zero modification** to customer quiz or UI components.
- **The 497 ABNA products remain completely decoupled from live recommendation queries**.
- **All 4 target unknown terms eliminated from the unknown queue** through deterministic canonical mapping.

---

## 2. Resolution for Target Unknown Terms

| Original Term     | Original Type | Resolution Strategy                   | Canonical Key   | Semantic Contribution Profile                                                               |
| :---------------- | :------------ | :------------------------------------ | :-------------- | :------------------------------------------------------------------------------------------ |
| **`Woody Notes`** | Note          | Canonical Generic Note                | `woody notes`   | `{ woody: 0.95, warmth: 0.35 }`                                                             |
| **`Amberwood`**   | Note          | Canonical Woody-Amber Note            | `amberwood`     | `{ woody: 0.85, warmth: 0.75, intensity: 0.45 }`                                            |
| **`Licorice`**    | Note          | Canonical Herbal Spice Note           | `licorice`      | `{ sweetness: 0.70, spicy: 0.65, warmth: 0.45, gourmand: 0.35 }`                            |
| **`coffee`**      | Accord        | Explicit Cross-Category Normalization | `coffee` (Note) | `{ gourmand: 0.90, warmth: 0.70, spicy: 0.30, intensity: 0.45 }` (via Accord Weight $0.35$) |

---

## 3. Detailed Architectural Decisions

### 3.1 Resolution of "Woody Notes"

- **Decision**: Added a controlled generic canonical note (`woody notes`) under the `"woody"` category with aliases (`woody note`, `woods`, `wood notes`, `precious woods`, `dry woods`).
- **Rationale**: Source formulations frequently list generic woods when the exact tree species is proprietary. Creating a generic wood entry avoids falsely attributing cedar, oud, or sandalwood nuances while accurately capturing timber and drydown warmth.

### 3.2 Resolution of "Amberwood"

- **Decision**: Added a dedicated canonical material (`amberwood`) under the `"woody"` category with aliases (`amber wood`, `amberwoods`, `bois d'ambre`, `ambery wood`).
- **Rationale**: Amberwood is chemically distinct from both Amber and Ambroxan. It provides an intense, diffusive ambery-woody structure. It was assigned strong woody ($0.85$), warmth ($0.75$), and intensity ($0.45$) contributions.

### 3.3 Resolution of "Licorice"

- **Decision**: Added canonical note (`licorice`) under `"spicy"` category with aliases (`liquorice`, `licorice accord`, `black licorice`, `reglisse`).
- **Rationale**: Licorice is a bittersweet, dark, anise-faceted herbal confectionery spice. It is modeled with primary sweetness ($0.70$), spicy warmth ($0.65$, $0.45$), and restrained gourmand presence ($0.35$) without equating it to heavy desserts like vanilla or caramel.

### 3.4 Explicit Cross-Category Resolution for "coffee"

- **Decision**: Implemented `EXPLICIT_CROSS_CATEGORY_ACCORD_TO_NOTE` in [`src/data/olfactive/dictionary/aliases.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/olfactive/dictionary/aliases.ts).
- **Rationale**: Prevents duplicating coffee as both an accord and a note. When `"coffee"` arrives in the accords list, the alias resolver explicitly tags it as `resolvedType: "cross_category_note"` with `canonicalTarget: "coffee"`. The derivation engine applies the standard accord weighting multiplier ($0.35$) against Coffee's canonical profile, ensuring auditable provenance and zero semantic distortion.

---

## 4. Pilot Catalog Re-Ingestion (Before vs After)

| Metric                                 | Before Phase 6C-3A (Phase 6C-2) | After Phase 6C-3A | Delta  |
| :------------------------------------- | :------------------------------ | :---------------- | :----- |
| **Total Products Parsed**              | 497                             | 497               | $0$    |
| **Products Normalized**                | 497                             | 497               | $0$    |
| **Enriched Pilot Products**            | 5                               | 5                 | $0$    |
| **Pilot Status: `validated`**          | 2                               | **5** ($100\%$)   | **+3** |
| **Pilot Status: `review_required`**    | 3                               | **0**             | **-3** |
| **Pilot Status: `incomplete`**         | 0                               | 0                 | $0$    |
| **Pilot High Confidence ($\ge 0.80$)** | 5                               | 5                 | $0$    |
| **Distinct Unknown Notes**             | 3                               | **0**             | **-3** |
| **Distinct Unknown Accords**           | 1                               | **0**             | **-1** |
| **Active Unknown Terms in Queue**      | 4                               | **0**             | **-4** |

---

## 5. Verification & Test Results

- **Olfactive Dictionary Test Suite ([`test-olfactive-dictionary.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/test-olfactive-dictionary.ts))**: **71 / 71 assertions passed**.
- **Batch Ingestion Test Suite ([`test-batch-ingestion.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/test-batch-ingestion.ts))**: **43 / 43 assertions passed**.
- **Phase 2 Recommendation Regression Test ([`test-recommendation.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/test-recommendation.ts))**: **6 / 6 scenarios passed**.
- **Phase 3 AI Narrative Regression Test ([`test-narrative.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/test-narrative.ts))**: **4 / 4 scenarios passed**.
- **ESLint**: **0 errors**.
- **Production Build (`bun run build`)**: **Success**.
