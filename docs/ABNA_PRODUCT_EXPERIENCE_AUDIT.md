# PHASE 4 — ABNA PRODUCT EXPERIENCE & QUIZ DESIGN AUDIT BLUEPRINT

## 1. In-Store Customer Journey Audit

```
[ In-Store Tablet Kiosk / Station ]
  │
  ▼
1. ATTRACT / IDLE SCREEN
   - Ambient luxury visual with prominent CTA: "Mulai Konsultasi Aroma Pribadimu"
   - Clear value prop: "Temukan 3 parfum ABNA terbaik untukmu dalam 60 detik"
  │
  ▼
2. DISCOVERY QUIZ (4–5 Fast, Sensory Steps)
   - High-contrast touch targets, self-explanatory imagery
   - Progress indicator (e.g. "Langkah 2 dari 5")
   - Total interaction time: ~45–60 seconds
  │
  ▼
3. INSTANT SCORING & ATMOSPHERIC REVEAL (2–3 Seconds)
   - Deterministic engine ranks instantly
   - Sensory atmospheric loader with tailored narrative rendering
  │
  ▼
4. TOP 3 RESULTS PRESENTATION
   - Primary Recommendation (#1 Signature Match) highlighted prominently
   - Secondary & Tertiary recommendations available for side-by-side comparison
   - Clear Match Percentage, Scent Family, Notes, and Olfactive Intensity
  │
  ▼
5. IN-STORE ACTION / CONVERSION
   - Primary CTA: "Coba Sample di Kasir / Konsultasikan dengan Beauty Advisor"
   - Secondary CTA: "Lihat Detail Varian & Catatan Aroma"
   - Digital handover option: "Kirim Hasil ke WhatsApp / Simpan Hasil"
  │
  ▼
6. AUTOMATIC RESET / PRIVACY
   - 45–60s inactivity warning popup with countdown
   - "Selesai / Pengunjung Baru" button for instant one-tap session purge
```

### In-Store Friction Points & Opportunities

- **Friction 1: Overly Abstract Terminology**: Customers unfamiliar with perfumery jargon (e.g., _sillage_, _chypre_, _aldehydes_) get confused if terms are unexplained.
  - _Opportunity_: Use sensory, intuitive Indonesian language alongside editorial terms (e.g., _"Jarak Pancaran Aroma"_, _"Daya Tahan"_).
- **Friction 2: Dead-End Results**: Merely displaying recommendations without a clear in-store next step leaves the customer wondering what to do.
  - _Opportunity_: Add a direct in-store call to action that bridges the digital kiosk with the physical store tester counter (e.g., _"Tunjukkan layar ini ke Beauty Advisor ABNA untuk mencoba sample tester"_).
- **Friction 3: Inactivity Leftovers**: A customer walks away leaving their results on screen, confusing the next customer.
  - _Opportunity_: Implement a 60-second idle reset timer with a 10-second countdown prompt.

---

## 2. Quiz Audit (Question-by-Question Analysis)

| Step                 | Current Question                                                                               | Business & Olfactive Signal                                                                     | Audit & Customer Reality                                                                                                              | Recommendation                                                                                               |
| :------------------- | :--------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------- |
| **Q1: Mood**         | _"How do you want to feel today?"_ (Mysterious, Radiant, Serene, Empowered)                    | Emotional modifier ($15\text{--}20\%$ weight on warmth, freshness, citrus, woody).              | Highly engaging, easy to understand. Helps establish emotional resonance immediately.                                                 | **RETAIN with bilingual clarity** (_"Bagaimana Anda ingin tampil hari ini?"_).                               |
| **Q2: Atmosphere**   | _"Which atmosphere feels like home?"_ (Rainy Streets, Soft Sunlight, Forest Mist, Candlelight) | Environmental/contextual modifier ($10\text{--}15\%$ weight on aquatic, floral, woody, warmth). | Visually captivating, but slightly poetic/abstract for fast retail shoppers.                                                          | **REVISE to Sensory Vibe / Suasana Harian** (_"Suasana atau karakter aroma yang paling membuatmu nyaman?"_). |
| **Q3: Scent Family** | _"Which families speak to you?"_ (Floral, Woody, Citrus, Oriental, Aquatic, Gourmand)          | **PRIMARY Olfactive Signal ($50\text{--}60\%$ weight)**. Multi-select.                          | Crucial for genuine fragrance accuracy. Customers may need descriptive cues (e.g., Citrus = Segar & Buah, Gourmand = Manis & Vanila). | **RETAIN as PRIMARY DRIVER**. Keep multi-select with clear tactile pills & note previews.                    |
| **Q4: Intensity**    | _"How loud should your aura be?"_ (1=Whisper to 5=Beast Mode)                                  | Direct constraint on projection and concentration preference.                                   | Sliders can sometimes feel fiddly on standing kiosks if touch points are too small.                                                   | **RETAIN with enlarged touch steps** (1=Intim / Lembut $\to$ 3=Seimbang $\to$ 5=Tegas & Semerbak).           |
| **Q5: Occasion**     | _"Where will this scent live?"_ (Daily Ritual, After Dark, Romance, Open Air)                  | Contextual modifier ($10\text{--}15\%$ on freshness vs. warmth/intensity).                      | Directly addresses customer's purchasing intent (Work/Office, Evening/Event, Casual/Daily).                                           | **RETAIN**. Very practical for retail conversion.                                                            |

---

## 3. Quiz Length Optimization

- **Target Question Count**: **4 to 5 Questions**.
- **Average Time to Complete**: **45–60 seconds**.
- **Tradeoff Analysis**:
  - Less than 3 questions: Sacrifices olfactive granularity and makes recommendations feel generic.
  - More than 5 questions: Leads to customer drop-off and queue bottlenecks at the store kiosk.
  - **Verdict**: 5 focused questions (Mood $\to$ Scent Family $\to$ Atmosphere $\to$ Occasion $\to$ Intensity) is the optimal balance between high precision and zero customer fatigue.

---

## 4. Results Experience Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    ABNA SCENT FINDER                       │
│             Hasil Kurasi Aroma Personal Anda               │
├────────────────────────────────────────────────────────────┤
│ [№ 01 SIGNATURE MATCH]                                     │
│  ABNA PARFUM — ROYALE NOIR (95% Match)                     │
│  Amber Spicy · Eau de Parfum                               │
│                                                            │
│  [ Bottle Image ]       [ Olfactive Notes Pyramid ]        │
│                         - Atas: Bergamot, Pink Pepper      │
│                         - Tengah: Cardamom, Amber          │
│                         - Dasar: Bourbon Vanilla, Cedar    │
│                                                            │
│  "Mengapa Cocok Untukmu" (Gemini Personalized Narrative)   │
│  Daya Tahan: 8-10 Jam | Proyeksi: Tegas & Semerbak        │
│  Harga: Rp 349.000 (50ml) | Status: Tersedia di Toko       │
│                                                            │
│  [ PRIMARY CTA: COBA TESTER DI TOKO ]                      │
├────────────────────────────────────────────────────────────┤
│ [№ 02 ALTERNATIVE MATCH]     │ [№ 03 COMPLEMENTARY MATCH]  │
│  ABNA PARFUM — VELVET OUD    │  ABNA PARFUM — AQUA TERRA   │
│  92% Match · Rp 329.000      │  89% Match · Rp 299.000     │
└────────────────────────────────────────────────────────────┘
```

### Categorization of Results Information:

- **MUST HAVE**:
  1. Product Name & Brand (ABNA Parfum)
  2. Match Percentage (e.g., 95%)
  3. Product Bottle Image
  4. Notes Pyramid (Top, Middle, Base)
  5. Scent Family & Performance (Longevity & Projection)
  6. Personalized "Why It Matches" Explanation
  7. Clear In-Store Call-to-Action
- **SHOULD HAVE**:
  1. Retail Price & Bottle Size (e.g., Rp 350.000 / 50ml)
  2. Stock Availability Badge (e.g., _"Tersedia di Toko Ini"_)
  3. Short Editorial Atmosphere Story
  4. Comparison capability between Top 3 picks
- **NICE TO HAVE**:
  1. QR code / WhatsApp button to send results to the customer's phone
  2. Fragrance layering / pairing suggestions
- **REMOVE / HIDE**:
  - Overly technical vector mathematics
  - Raw JSON models or developer debug tags

---

## 5. In-Store Business Call-to-Action (CTA)

### Recommended Primary CTA:

> **"Coba Tester Aroma Ini" / "Konsultasikan dengan Beauty Advisor"**
> _Subtext: "Tunjukkan nomor rekomendasi ini kepada staff ABNA untuk mencoba sampel fisik langsung."_

### Recommended Secondary Actions:

1. **"Bandingkan 3 Rekomendasi"** (Side-by-side olfactive view).
2. **"Kirim Hasil ke WhatsApp / Simpan"** (Enables customer retention and retargeting).
3. **"Mulai Dari Awal"** (Clear session reset).

---

## 6. Store Device & Session Management Specification

1. **Inactivity Timeout**: If no screen touch occurs for **60 seconds**, show a 10-second modal _"Masih menjelajah aroma?"_. If no response, reset state cleanly to the Welcome screen.
2. **Session Isolation**: No customer profile data, quiz answers, or personalized recommendations persist in `localStorage` across sessions.
3. **One-Tap Reset**: A prominent _"Selesai / Pengunjung Baru"_ icon in the header allows staff or customers to immediately wipe the screen for the next user.
4. **Touchscreen Guardrails**: Minimized pinch-to-zoom interference, fixed viewport scale, and generous button tap targets ($\ge 48\text{px}$).

---

## 7. Brand Positioning Strategy

### Recommendation: **Hybrid Co-Branded Architecture**

- **Master Brand**: **ABNA PARFUM** (Primary prominence, typography, and authority).
- **Sub-Brand / Feature Engine**: **AURA AI — The Scent Oracle by ABNA**.
- **Rationale**:
  - ABNA is the retail fragrance brand that sells the physical product and earns customer loyalty.
  - "AURA AI" acts as the innovative, high-tech consultation experience inside the store.
  - Customers remember: _"Saya mencari aroma saya menggunakan AURA AI di toko ABNA Parfum."_

---

## 8. Information Architecture & Screen Flow

```
[ WELCOME / IDLE SCREEN ]
  │
  ▼
[ 5-STEP QUIZ FLOW ]
  ├── Step 1: Mood (Emotional Energy)
  ├── Step 2: Scent Family (Core Olfactive Territory)
  ├── Step 3: Atmosphere (Sensory Environment)
  ├── Step 4: Occasion (Theatre of Wear)
  └── Step 5: Intensity (Projection & Sillage)
  │
  ▼
[ PROCESSING & ATMOSPHERIC CURATION ] (2s transition)
  │
  ▼
[ RESULTS DASHBOARD ]
  ├── Hero Card: #1 Signature ABNA Fragrance (Detailed pyramid, AI story, Price, Tester CTA)
  ├── Secondary Cards: #2 and #3 Alternates (Quick compare)
  ├── Action Bar: "Coba Tester", "Kirim via WhatsApp", "Ulangi Tes"
  │
  ▼
[ DETAIL MODAL / DRAWER ] (Optional deep dive on specific variant notes & ingredients)
  │
  ▼
[ RESET / NEXT VISITOR ]
```

---

## 9. In-Store Device UX Principles

- **Touch Target Sizing**: Minimum $48 \times 48\text{px}$ touch zones; inputs and polaroid cards spaced to avoid accidental touches.
- **Viewing Distance**: Typography readable from 0.5m to 1.0m standing distance (Headings $\ge 24\text{px}$, Body $\ge 15\text{px}$).
- **Orientation Support**: Optimized for Portrait tablets (standard retail stand) while remaining fluid in Landscape.
- **Staff-Assisted Mode**: Easy navigation so a retail Beauty Advisor can guide the customer through the questions together.

---

## 10. Future ABNA Catalog Integration Strategy

When ABNA delivers its official product catalog:

1. Populate `RawFragranceInput[]` with ABNA variant names, notes, real bottle packshots, Indonesian pricing (IDR), and store availability.
2. The deterministic feature derivation engine automatically compiles their 10D profiles into `FRAGRANCES`.
3. The scoring engine and Gemini narrative layer will immediately serve ABNA products with **zero refactoring of recommendation logic**.
