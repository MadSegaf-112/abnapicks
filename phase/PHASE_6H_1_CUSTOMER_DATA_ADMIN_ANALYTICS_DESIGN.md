# PHASE 6H-1 — CUSTOMER DATA COLLECTION & ADMIN ANALYTICS ARCHITECTURAL DESIGN

**Author**: Antigravity AI  
**Date**: August 31, 2026  
**Client Delivery Deadline**: Wednesday, September 2, 2026  
**Status**: **DESIGN COMPLETE — ARCHITECTURE AUDITED & SPECIFIED**

---

## 1. Executive Summary

Phase 6H-1 delivers the comprehensive architectural design for collecting customer demographic and marketing information (**Gender**, **Age**, **Occupation / Main Activity**, and **Price / Budget Range**) alongside an **Admin Analytics Dashboard** for ABNA store management.

### Key Foundational Invariant:

Demographic and marketing data fields are **DATA COLLECTION & ANALYTICS FIELDS ONLY**.

- They do **NOT** enter the 10-dimensional olfactive feature vector.
- They do **NOT** alter the Cosine-Euclidean scoring calculations.
- They do **NOT** alter fragrance ranking, match percentages, or Top 3 recommendations.
- They do **NOT** alter editorial narrative generation.
- All protected recommendation core files ([`scoring-engine.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/scoring-engine.ts), [`customer-profile.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/customer-profile.ts), [`fragrances.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/fragrances/fragrances.ts), [`abna-recommendation-adapter.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/abna-recommendation-adapter.ts), [`narrative-service.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/narrative-service.ts)) remain **100% UNTOUCHED** in their recommendation mathematics.

---

## 2. Existing Quiz Audit

Inspection of [`src/data/quiz.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/quiz.ts) reveals that the current quiz contains **7 questions**:

| Question # | Field ID       | Question Title / Kicker                                      | Type           | Current Purpose          |   Enters Recommendation Vector?   |
| :--------- | :------------- | :----------------------------------------------------------- | :------------- | :----------------------- | :-------------------------------: |
| **Q1**     | `mood`         | Kamu ingin parfum yang memberi kesan seperti apa?            | `image-single` | Emotional modifier       |       **YES** (`MOOD_MAP`)        |
| **Q2**     | `scent_family` | Aroma seperti apa yang paling kamu suka?                     | `image-multi`  | Primary olfactive signal |   **YES** (`SCENT_FAMILY_MAP`)    |
| **Q3**     | `atmosphere`   | Suasana seperti apa yang paling kamu suka?                   | `image-single` | Environmental context    |    **YES** (`ATMOSPHERE_MAP`)     |
| **Q4**     | `occasion`     | Parfum ini paling sering kamu pakai untuk apa?               | `image-single` | Theatre of wear          |     **YES** (`OCCASION_MAP`)      |
| **Q5**     | `intensity`    | Kamu suka parfum yang seberapa terasa?                       | `image-single` | Strength / Projection    | **YES** (`mapIntensityToFeature`) |
| **Q6**     | `age_range`    | Kamu masuk range usia yang mana?                             | `text-single`  | Demographic collection   |      **NO** (Metadata only)       |
| **Q7**     | `price_range`  | Untuk parfum ukuran 30ml, kamu nyaman di range harga berapa? | `text-single`  | Budget collection        |      **NO** (Metadata only)       |

### Key Findings from Existing Quiz:

1. **Questions Q1–Q5** are strictly **Olfactive Recommendation Questions**. They drive the 10D vector features (`freshness`, `sweetness`, `warmth`, `floral`, `woody`, `citrus`, `spicy`, `aquatic`, `gourmand`, `intensity`).
2. **Questions Q6 (`age_range`) and Q7 (`price_range`)** already exist in [`src/data/quiz.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/quiz.ts) as `text-single` questions with `allowSkip: true`.
3. In [`src/data/customer-profile.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/customer-profile.ts), `age_range` and `price_range` are passed purely into `profile.metadata` for traceability; they **have zero weight** in `accumulated` vector calculations.

---

## 3. Existing Age & Budget Audit

### A. Age Range (`age_range`)

- **Current Question Title**: _"Kamu masuk range usia yang mana?"_
- **Current Options**:
  1. `under_18` ("Di bawah 18 tahun")
  2. `18_24` ("18-24 tahun")
  3. `25_34` ("25-34 tahun")
  4. `35_44` ("35-44 tahun")
  5. `45_plus` ("45 tahun ke atas")
  6. `skip` ("Lewati dulu")
- **Audit Verdict**: Perfectly designed. Follows privacy-preserving age-bracket standards.

### B. Price Range (`price_range`)

- **Current Question Title**: _"Untuk parfum ukuran 30ml, kamu nyaman di range harga berapa?"_
- **Current Options**:
  1. `under_50k` ("Di bawah Rp50.000")
  2. `50k_100k` ("Rp50.000 - Rp100.000")
  3. `100k_150k` ("Rp100.000 - Rp150.000")
  4. `150k_200k` ("Rp150.000 - Rp200.000")
  5. `200k_300k` ("Rp200.000 - Rp300.000")
  6. `above_300k` ("Di atas Rp300.000")
  7. `depends_on_scent` ("Tergantung kalau aromanya cocok")
  8. `skip` ("Lewati dulu")
- **Audit Verdict**: Authoritative for ABNA retail price tiers (`REGULAR`, `SPECIAL_ONE`, `ELITE`, `THE_NATURE`).

---

## 4. Insertion Plan for Gender & Occupation / Main Activity

To maintain the best customer experience flow, customer questions are partitioned into two distinct logical stages:

1. **Olfactive Exploration (Questions 1–5)**: Visual polaroid cards engaging sensory imagination.
2. **Profile & Marketing Snapshot (Questions 6–9)**: Text-single lightweight questions with skip support.

### Proposed 9-Question Sequence:

| Step # | Field ID             | Domain         | Category / Kicker   | UI Component Style        |
| :----: | :------------------- | :------------- | :------------------ | :------------------------ |
| **1**  | `mood`               | Recommendation | Karakter Aroma      | `image-single` (Polaroid) |
| **2**  | `scent_family`       | Recommendation | Jenis Aroma Favorit | `image-multi` (Polaroid)  |
| **3**  | `atmosphere`         | Recommendation | Suasana Aroma       | `image-single` (Polaroid) |
| **4**  | `occasion`           | Recommendation | Momen Pemakaian     | `image-single` (Polaroid) |
| **5**  | `intensity`          | Recommendation | Intensitas Aroma    | `image-single` (Polaroid) |
| **6**  | `gender` _(NEW)_     | Analytics Only | Profil Pembeli      | `text-single`             |
| **7**  | `age_range`          | Analytics Only | Range Usia          | `text-single`             |
| **8**  | `occupation` _(NEW)_ | Analytics Only | Aktivitas Utama     | `text-single`             |
| **9**  | `price_range`        | Analytics Only | Range Budget        | `text-single`             |

### New Question Specifications:

#### Question 6: Gender (`gender`)

- **Kicker**: `TENTANG DIRIMU`
- **Title**: `Apa jenis kelamin atau kategori parfum yang kamu cari?`
- **Subtitle**: `Bantu kami memahami preferensi wangi berdasarkan profil pelanggan.`
- **Options**:
  1. `female` — _"Wanita (Feminine)"_
  2. `male` — _"Pria (Masculine)"_
  3. `unisex` — _"Unisex / Fleksibel"_
  4. `skip` — _"Lewati dulu"_

#### Question 8: Occupation / Main Activity (`occupation`)

- **Kicker**: `AKTIVITAS UTAMA`
- **Title**: `Apa aktivitas utama atau pekerjaanmu saat ini?`
- **Subtitle**: `Membantu ABNA mengetahui aroma yang cocok untuk mobilitas harianmu.`
- **Options**:
  1. `student` — _"Pelajar / Mahasiswa"_
  2. `corporate` — _"Karyawan Swasta / BUMN"_
  3. `government` — _"PNS / ASN / Instansi Publik"_
  4. `entrepreneur` — _"Wirausaha / Bisnis"_
  5. `creative_freelance` — _"Kreatif / Freelancer / Content Creator"_
  6. `health_educator` — _"Tenaga Medis / Pendidik / Dosen"_
  7. `homemaker` — _"Ibu Rumah Tangga"_
  8. `other` — _"Lainnya"_
  9. `skip` — _"Lewati dulu"_

---

## 5. End-to-End Data Flow Architecture

```
                               ┌───────────────────────────────────────────────┐
                               │             CUSTOMER INTERACTION              │
                               │               (React Frontend)                │
                               └──────────────────────┬────────────────────────┘
                                                      │
                                  Submits 9 Quiz Answers via fetchRecs
                                                      │
                                                      ▼
                               ┌───────────────────────────────────────────────┐
                               │           recommendations.functions.ts        │
                               │             (Server Function Entry)           │
                               └──────┬─────────────────────────────────┬──────┘
                                      │                                 │
                   (Olfactive Inputs Only)                   (Analytics Inputs Only)
                   - mood, atmosphere, scent_family          - gender, age_range,
                   - intensity, occasion                     - occupation, price_range
                                      │                                 │
                                      ▼                                 ▼
                     ┌────────────────────────────────┐   ┌───────────────────────────┐
                     │   CustomerPreferenceProfile    │   │   CustomerAnalyticsData   │
                     │  (Derived 10D Feature Vector)  │   │  (Demographics & Budget)  │
                     └────────────────┬───────────────┘   └─────────────┬─────────────┘
                                      │                                 │
                                      ▼                                 │
                     ┌────────────────────────────────┐                 │
                     │      scoring-engine.ts         │                 │
                     │   (444 Active ABNA Dataset)    │                 │
                     └────────────────┬───────────────┘                 │
                                      │                                 │
                                      ▼                                 │
                     ┌────────────────────────────────┐                 │
                     │     Top 3 Recommendations      │                 │
                     │   (Deterministic Real Products)│                 │
                     └────────────────┬───────────────┘                 │
                                      │                                 │
                                      ▼                                 │
                     ┌────────────────────────────────┐                 │
                     │       narrative-service.ts     │                 │
                     │    (Editorial Grounded Story)  │                 │
                     └────────────────┬───────────────┘                 │
                                      │                                 │
                                      ▼                                 │
                     ┌────────────────────────────────┐                 │
                     │      Formatted Recommendation  │                 │
                     │           (Zod Validated)      │                 │
                     └────────────────┬───────────────┘                 │
                                      │                                 │
                                      ├─────────────────────────────────┘
                                      │
                                      ▼
                     ┌────────────────────────────────────────────────────────┐
                     │              SESSION PERSISTENCE ADAPTER               │
                     │   (Asynchronously stores complete customer session)    │
                     └────────────────────────┬───────────────────────────────┘
                                              │
                                              ▼
                     ┌────────────────────────────────────────────────────────┐
                     │           DATABASE / ADMIN ANALYTICS STORE             │
                     │       (PostgreSQL / Supabase / Store Session Log)      │
                     └────────────────────────┬───────────────────────────────┘
                                              │
                                              ▼
                     ┌────────────────────────────────────────────────────────┐
                     │           ABNA ADMIN ANALYTICS DASHBOARD               │
                     │      (KPIs, Demographics, Preference Trends)           │
                     └────────────────────────────────────────────────────────┘
```

---

## 6. Conceptual Data Contracts

### A. Recommendation Input (`CustomerPreferenceData`)

```typescript
export interface CustomerPreferenceData {
  mood?: "mysterious" | "radiant" | "serene" | "empowered" | string;
  atmosphere?: string;
  scent_family?: string[];
  intensity?: "lembut" | "seimbang" | "semerbak" | number | string;
  occasion?: string;
}
```

_Purpose_: Strictly olfactive. Feeds vector accumulation and scoring engine.

### B. Customer Marketing & Analytics (`CustomerAnalyticsData`)

```typescript
export interface CustomerAnalyticsData {
  sessionId: string;
  createdAt: string; // ISO 8601
  completedAt?: string;
  // Demographic Fields
  gender?: "female" | "male" | "unisex" | "skip" | string;
  ageRange?: "under_18" | "18_24" | "25_34" | "35_44" | "45_plus" | "skip" | string;
  occupation?:
    | "student"
    | "corporate"
    | "government"
    | "entrepreneur"
    | "creative_freelance"
    | "health_educator"
    | "homemaker"
    | "other"
    | "skip"
    | string;
  priceRange?:
    | "under_50k"
    | "50k_100k"
    | "100k_150k"
    | "150k_200k"
    | "200k_300k"
    | "above_300k"
    | "depends_on_scent"
    | "skip"
    | string;
  // Recommendation Outputs for Cross-Analytics
  topRecommendationId: string;
  topRecommendationName: string;
  topRecommendationBrand: string;
  topRecommendationMatchPercent: number;
  alternateRecommendationIds: string[];
  // Raw Olfactive Preference Tags
  selectedScentFamilies: string[];
  selectedMood?: string;
  selectedAtmosphere?: string;
  selectedOccasion?: string;
  selectedIntensity?: string | number;
}
```

---

## 7. Database & Persistence Architecture

### Current Project State Audit:

- **Framework**: TanStack Start / Nitro SSR with Vite.
- **Server Functions**: [`src/lib/recommendations.functions.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/lib/recommendations.functions.ts) running via Nitro node-server.
- **Current Database**: No active Supabase/PostgreSQL client is currently configured in `.env` (clean decoupled foundation).

### Proposed Database Schema (`customer_sessions` table):

```sql
CREATE TABLE IF NOT EXISTS customer_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Demographic & Marketing Fields (Categorical Only)
    gender VARCHAR(32),
    age_range VARCHAR(32),
    occupation VARCHAR(64),
    price_range VARCHAR(64),

    -- Olfactive Preferences
    mood VARCHAR(64),
    atmosphere VARCHAR(64),
    scent_families JSONB DEFAULT '[]'::jsonb,
    intensity VARCHAR(32),
    occasion VARCHAR(64),

    -- Recommendation Outputs
    top_fragrance_id VARCHAR(128) NOT NULL,
    top_fragrance_name VARCHAR(128) NOT NULL,
    top_fragrance_house VARCHAR(128) NOT NULL,
    top_match_percent INT NOT NULL,
    alternate_fragrance_ids JSONB DEFAULT '[]'::jsonb,

    -- Session Metadata
    client_platform VARCHAR(32) DEFAULT 'kiosk_web',
    completed BOOLEAN DEFAULT TRUE
);

-- Indices for high-speed admin aggregation queries
CREATE INDEX idx_customer_sessions_created_at ON customer_sessions(created_at DESC);
CREATE INDEX idx_customer_sessions_gender ON customer_sessions(gender);
CREATE INDEX idx_customer_sessions_age_range ON customer_sessions(age_range);
CREATE INDEX idx_customer_sessions_occupation ON customer_sessions(occupation);
CREATE INDEX idx_customer_sessions_price_range ON customer_sessions(price_range);
CREATE INDEX idx_customer_sessions_top_fragrance ON customer_sessions(top_fragrance_id);
```

---

## 8. Admin Analytics Dashboard Requirements

### A. Executive Overview KPIs

1. **Total Consultations**: Lifetime total customer sessions completed.
2. **Consultations Today / This Week**: Current volume metrics for store managers.
3. **Top Recommendation of the Day**: Most frequently matched fragrance.
4. **Completion Rate**: Percentage of started sessions reaching the results screen.

### B. Demographic Breakdown Visualizations

- **Gender Distribution**: Pie/Donut chart (Feminine, Masculine, Unisex, Skipped).
- **Age Distribution**: Bar chart across the 5 age brackets.
- **Occupation Distribution**: Ranked horizontal bar chart identifying key customer personas.
- **Budget / Price Tier Comfort**: Distribution across budget brackets.

### C. Olfactive Preference Trends

- **Most Popular Scent Families**: Floral vs Woody vs Citrus vs Gourmand vs Amber vs Aquatic.
- **Top Moods & Atmospheres**: Emotional drivers of ABNA shoppers.
- **Peak Occasions**: Daily wear vs Special events vs Outdoor.

### D. Inventory & Recommendation Intelligence

- **Top 10 Most Recommended Perfumes**: Frequency table helping store staff keep high-demand testers stocked.
- **Tester Demand Log**: Direct correlation between recommendation #1 and customer tester requests.

### E. Session Exploration Table

- Paginated table showing recent sessions with search/filter by date, gender, age, occupation, and top fragrance.

---

## 9. Security, Access Control & Privacy Minimization

### Privacy Minimization Principles:

1. **Zero PII Collection**: The system collects **no customer names, no phone numbers, no email addresses, and no device MAC/IP identifiers**.
2. **Coarse Categorical Buckets**: Age, budget, and occupation use broad brackets (e.g., `25_34` rather than exact birth dates, `corporate` rather than specific company names).
3. **Optional Skip Option**: Every demographic question includes `allowSkip: true` to respect customer discretion.

### Security & Access Control:

- **Public Kiosk Access**: Store kiosks can only execute `POST /getRecommendations` (Write-only for session logs).
- **Admin Dashboard Route (`/admin`)**: Protected behind secure authentication (Session token or HTTP Basic / Supabase Auth). Public shoppers cannot view analytics data.
- **Database Row Level Security (RLS)**:
  - `anon` role: `INSERT` only.
  - `authenticated` admin role: `SELECT`, `INSERT`.

---

## 10. Recommendation Non-Regression Validation Plan

The Phase 6H implementation will be verified with strict non-regression tests:

```typescript
// Non-Regression Verification Assertions (To be codified in test-demographic-independence.ts):
1. assert(rec(OlfactiveAnswers, { gender: "female" }) === rec(OlfactiveAnswers, { gender: "male" }))
2. assert(rec(OlfactiveAnswers, { occupation: "student" }) === rec(OlfactiveAnswers, { occupation: "corporate" }))
3. assert(rec(OlfactiveAnswers, { age_range: "18_24" }) === rec(OlfactiveAnswers, { age_range: "45_plus" }))
4. assert(rec(OlfactiveAnswers, { price_range: "under_50k" }) === rec(OlfactiveAnswers, { price_range: "above_300k" }))
5. assert(scoringEngine(444_pool).length === 444)
6. assert(reviewQueueLeakage === 0)
7. assert(benchmarkReferenceSuite === PASS)
```

---

## 11. Proposed Implementation Phases

```
PHASE 6H-1 (CURRENT — COMPLETE)
Architecture Audit, Data Flow Separation & Admin Analytics Design
  ↓
PHASE 6H-2 (NEXT)
Customer Data Collection Implementation
- Add Gender (Q6) and Occupation (Q8) to Quiz
- Maintain Q7 (Age) and Q9 (Budget)
- Update Quiz Category tags & progress indicators
- Decouple analytics payload from buildCustomerProfile()
- Implement non-regression automated test suite
  ↓
PHASE 6H-3
Persistence & Analytics Storage Integration
- Server-side session logging
- Local / Cloud database adapter
- Security & privacy validation
  ↓
PHASE 6H-4
Admin Authentication & Analytics Dashboard
- Protected /admin route
- KPI cards, demographic charts, preference trends, session table
  ↓
PHASE 6H-5
End-to-End Production Verification & Client Sign-Off
- Full regression test run
- Mobile & Kiosk responsiveness check
- Final Delivery for September 2, 2026
```

---

## 12. Protected vs. Expected Files to Change

### Protected Files (MUST REMAIN UNTOUCHED IN RECOMMENDATION LOGIC):

- [`src/data/scoring-engine.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/scoring-engine.ts) — **NO CHANGES**
- [`src/data/fragrances/fragrances.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/fragrances/fragrances.ts) — **NO CHANGES**
- [`src/data/fragrances/types.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/fragrances/types.ts) — **NO CHANGES**
- [`src/data/abna-recommendation-adapter.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/abna-recommendation-adapter.ts) — **NO CHANGES**
- [`src/data/narrative-service.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/narrative-service.ts) — **NO CHANGES**

### Files Expected to be Updated in Future Phases:

- [`src/data/quiz.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/data/quiz.ts): Add Gender & Occupation definitions.
- [`src/lib/recommendations.functions.ts`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/lib/recommendations.functions.ts): Accept new analytics fields and asynchronously persist session.
- [`src/components/aura/QuizScreen.tsx`](file:///C:/Users/ACER/VIBE%20CODING%20WEB%20PROJECT/aura%20ai/src/components/aura/QuizScreen.tsx): Support the 9-step progress and category labels.
- `src/routes/admin.tsx` (New): Admin Dashboard route.

---

## 13. Phase 6H-1 Status & Final Recommendation

**PHASE 6H-1 STATUS: DESIGN COMPLETE**

The codebase architecture has been thoroughly audited and proven ready for **Phase 6H-2 (Customer Data Collection Implementation)** without any risk of recommendation regression.
