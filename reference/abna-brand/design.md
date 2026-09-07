# AURA AI — Visual Design System

## Single Source of Truth for ABNA Signature × AURA AI Implementation

> **Document purpose:** This design system governs all visual implementation decisions for the AURA AI fragrance discovery experience. It bridges the official ABNA Signature brand identity with the unique product experience of AURA AI.
>
> **Source hierarchy:**
>
> 1. ABNA Signature Brand Guideline (official — overrides all)
> 2. Previous ABNA website (digital implementation reference — informs patterns)
> 3. This document (implementation specification — governs code)

---

## 1. Brand Personality

ABNA Signature is **not** a generic luxury brand. Its visual personality has specific character traits derived from the official guideline and previous digital presence:

### Core Character

| Trait                       | What it means for implementation                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Grounded sophistication** | Earthy, natural warmth — not cold, clinical luxury. Think aged leather and botanical gardens, not chrome and glass.                                                            |
| **Editorial confidence**    | Large, bold typography with considered negative space. The brand speaks with authority but never shouts. Headlines are statements, not decorations.                            |
| **Warm restraint**          | Rich, warm tones used sparingly against generous white/ivory space. The palette feels like natural materials — forest canopy, sand, terracotta — not synthetic metallics.      |
| **Tactile materiality**     | Surfaces should feel like they have physical weight: paper grain, matte finishes, natural shadows. Not flat digital, not glossy 3D.                                            |
| **Approachable prestige**   | Premium without intimidation. The brand guideline uses rounded grotesque fonts for its titles, not angular high-fashion serifs. This signals: "we are refined, but welcoming." |

### What ABNA Is NOT

- Not cold minimalism (it has warmth and texture)
- Not maximalist decoration (it has restraint and breathing room)
- Not tech-forward futurism (it is rooted in natural, sensory experience)
- Not generic luxury (it has a specific earthy, botanical, Indonesian identity)
- Not corporate (it is personal, sensory, editorial)

---

## 2. Color System

### 2.1 Primary Palette — ABNA Signature Official

Source: `ABNA-Signature-Brand-Guideline.pdf`, Pages 3–4.

| Role               | Color        | Hex       | Usage                                                                                                                                |
| ------------------ | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Signature Deep** | Deep Emerald | `#0b4839` | Primary brand color. Header bars, hero sections, high-emphasis surfaces, selected states, primary buttons when on light backgrounds. |
| **Signature Warm** | Sand Gold    | `#c4b392` | Secondary accent. Kicker labels, dividers, subtle highlights, metadata text, border accents, ornamental details.                     |
| **Canvas**         | Warm Ivory   | `#fffcf5` | Primary background. All main surfaces, card backgrounds, page canvas. Shared across both ABNA Parfum and ABNA Signature lines.       |
| **Accent**         | Terracotta   | `#cc6035` | Warm accent for CTAs, active navigation, badges, or emphasis moments. Use sparingly — it is an accent, not a fill.                   |

### 2.2 Extended Palette — ABNA Parfum Parent Brand Reference

Source: `ABNA-Signature-Brand-Guideline.pdf`, Pages 1–2.

| Color      | Hex       | Context                                                                                             |
| ---------- | --------- | --------------------------------------------------------------------------------------------------- |
| Steel Blue | `#2e5c80` | ABNA Parfum parent brand primary. May appear in shared brand elements (e.g., ABNA Parfum wordmark). |
| Light Blue | `#92c1d9` | ABNA Parfum secondary. Not used in ABNA Signature product UI.                                       |
| Muted Gold | `#d7c689` | ABNA Parfum gold. Reference only — ABNA Signature uses `#c4b392` instead.                           |
| Deep Gold  | `#d7ae5f` | ABNA Parfum deep gold variant.                                                                      |

### 2.3 AURA AI Functional Colors

These are implementation-specific colors that extend the ABNA Signature palette for AURA AI's product UI needs:

| Token                    | Role                    | Guideline                                                                                                                               |
| ------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `--background`           | Page canvas             | Warm ivory `#fffcf5` (matches ABNA official).                                                                                           |
| `--foreground` / `--ink` | Primary text            | Deep matte charcoal, near-black with warm undertone. Avoid pure `#000000`. Use something like `oklch(0.12–0.16, low chroma, warm hue)`. |
| `--card`                 | Card surfaces           | Very light warm white, slightly warmer than pure white. `oklch(0.99 0.006 80)` range.                                                   |
| `--primary`              | Primary action surfaces | Deep Emerald `#0b4839` for buttons and high-emphasis elements.                                                                          |
| `--accent` / `--gold`    | Warm accent             | Sand Gold `#c4b392` for editorial highlights, kicker text, borders, ornamental details.                                                 |
| `--accent-warm`          | CTA emphasis            | Terracotta `#cc6035` for primary call-to-action buttons and active states where warmth is needed.                                       |
| `--border`               | Subtle borders          | Warm gray, low contrast against ivory. `oklch(0.86 0.01 80)` range.                                                                     |
| `--muted`                | Secondary surfaces      | Light warm neutral fill for inactive states, tag backgrounds.                                                                           |
| `--muted-foreground`     | Secondary text          | Medium warm gray for metadata, captions, timestamps.                                                                                    |
| `--destructive`          | Error states            | Warm red/coral. Keep muted, not neon.                                                                                                   |

### 2.4 Color Usage Rules

**Gold / Sand (`#c4b392`) — When to use:**

- Kicker labels above headlines (e.g., "KARAKTER DIRI", "REKOMENDASI UTAMA")
- Thin decorative borders and dividers
- Ornamental symbols (✦, diamond separators)
- Progress bar accents
- Subtle highlight on selected-state borders
- Editorial serif italic accent text

**Gold / Sand — When NOT to use:**

- Full button fills (gold buttons look generic luxury — use Deep Emerald or Terracotta instead)
- Large background areas (overwhelming, loses impact)
- Body text (insufficient contrast on ivory)
- Every interactive element (dilutes its significance)

**Deep Emerald (`#0b4839`) — When to use:**

- Primary button backgrounds on ivory surfaces
- Hero header bars and result card header strips
- Strong emphasis text or badges
- Navigation active states

**Terracotta (`#cc6035`) — When to use:**

- Primary CTA buttons that need warm, inviting energy (e.g., "Beli Sekarang", "Coba Tester")
- Active navigation links
- Small badges and attention markers
- Use as a single accent moment per section, not repeated

**Ivory (`#fffcf5`) — Dominant surface:**

- The overwhelming majority of the interface should be ivory canvas
- Cards sit on ivory, and card interiors are slightly warmer white
- Text sits on ivory — never reverse to dark background for large body sections
- Dark surfaces (Deep Emerald headers, result card title bars) should be used as deliberate contrast moments, not as the default

---

## 3. Typography

### 3.1 Official ABNA Type Families

Source: Brand guideline specifies three type roles:

| Guideline Name           | Role                       | Closest Web Implementation                                                                                                                                                                                                                       |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Basis Grotesque**      | Clean sans-serif body text | **Inter** (current implementation). Basis Grotesque is a commercial font; Inter is the closest freely available geometric grotesque with similar proportions and optical sizing.                                                                 |
| **Futura / Barber Chop** | Bold display headlines     | **Archivo Black** (current implementation). Heavy geometric sans for high-impact titles. Futura Bold or Barber Chop are commercial; Archivo Black captures the same confident, rounded geometric weight seen in the brand guideline cover pages. |
| **PP Editorial**         | Editorial serif accent     | **Cormorant Garamond** (current implementation). PP Editorial is commercial; Cormorant Garamond provides the same high-contrast, refined editorial serif feel for italicized accent text, pull quotes, and narrative passages.                   |

### 3.2 Typography Hierarchy

| Level                | Font                       | Weight     | Size Range | Tracking             | Usage                                                                                                                                                  |
| -------------------- | -------------------------- | ---------- | ---------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Display / Hero**   | Archivo Black (display)    | 900        | 36–64px    | `-0.04em` tight      | Welcome screen headline, results screen title, match percentage. One per screen maximum.                                                               |
| **Section Title**    | Archivo Black (display)    | 900        | 24–32px    | `-0.03em` tight      | Quiz step titles, card section headers, "IDENTITAS AROMA ANDA".                                                                                        |
| **Kicker / Label**   | Inter (body)               | 500–600    | 11–13px    | `0.08–0.12em` wide   | Uppercase meta-labels above headlines: "OFFICIAL WEBSITE ABNAPARFUME", "KARAKTER DIRI", "01 REKOMENDASI UTAMA". Always uppercase, always tracked wide. |
| **Editorial Accent** | Cormorant Garamond (serif) | 400 italic | 18–28px    | `0em` normal         | Serif italic used mid-headline for contrast (e.g., "New _arrival_ for you"), narrative passages, pull quotes, AI-generated story text.                 |
| **Body**             | Inter (body)               | 400        | 15–17px    | `0em` normal         | Descriptions, explanations, option labels, general content.                                                                                            |
| **Body Emphasis**    | Inter (body)               | 600        | 15–17px    | `0em` normal         | Inline emphasis within body text, strong metadata.                                                                                                     |
| **Caption / Meta**   | Inter (body)               | 400–500    | 12–14px    | `0.02em` slight      | Price, longevity stats, note names, secondary information.                                                                                             |
| **Button Text**      | Inter (body)               | 600        | 14–16px    | `0.02–0.04em` slight | All button labels. Always Inter, never serif in buttons.                                                                                               |

### 3.3 Typography Pairing Rules

- **Never** use more than two type families in a single component.
- **Headlines** should pair display sans + serif italic for editorial contrast (e.g., bold Archivo "Aromamu Karaktermu" + italic Cormorant "Tampil Bersama Abnaparfum").
- **Body sections** should use only Inter. Do not mix serif into body copy.
- **Kicker → Title → Subtitle** vertical rhythm: small tracked uppercase kicker (Inter 500) → large bold title (Archivo Black) → descriptive body (Inter 400). This three-tier pattern is the dominant composition in the previous ABNA website.
- **Narrative text** (AI-generated stories, "Why it matches you") should use Cormorant Garamond italic to feel editorial and personal, distinct from functional UI text.

---

## 4. Layout and Composition

### 4.1 Spacing Philosophy

The ABNA brand guideline and previous website both demonstrate generous, editorial spacing. The interface should breathe.

| Principle                                | Implementation                                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Generous vertical rhythm**             | Section-to-section spacing: `64–96px`. Within-section component spacing: `24–40px`. The interface should never feel cramped.                                                                     |
| **Asymmetric editorial balance**         | Content does not need to be symmetrically centered. The previous website uses left-aligned text with right-placed imagery. Allow compositions to feel editorially weighted, not rigidly gridded. |
| **Clear visual hierarchy through space** | More important elements get more surrounding whitespace, not larger borders or louder colors.                                                                                                    |
| **Horizontal containment**               | Content max-width: `1200–1280px` centered. Quiz cards and result cards should not stretch full-width on desktop — they should feel like curated objects placed within generous ivory canvas.     |

### 4.2 Composition Principles

| Pattern                               | Guideline                                                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Hero sections**                     | Left text column + right image/product column. Text takes ~40–50% width. Image bleeds or floats with natural elements. Seen clearly in previous ABNA website hero. |
| **Card grids**                        | Even columns with consistent gutters (`16–24px`). Cards should be uniform height within a row.                                                                     |
| **Kicker → Title → Body → CTA**       | Standard content block pattern. Every major section should follow this vertical flow.                                                                              |
| **Single-screen focus**               | Each quiz step = one focused question on screen. No scrolling quiz lists. Each step feels like a magazine page.                                                    |
| **Result cards as editorial spreads** | The hero recommendation card should feel like a magazine feature spread, not a product listing. Secondary cards are compact comparison tiles.                      |

### 4.3 Responsive Behavior

- **Primary target**: In-store tablet kiosk (portrait orientation, touch-first).
- **Secondary target**: Desktop browser, mobile responsive.
- Desktop-first CSS approach, responsive down to tablet and mobile.
- Touch targets: minimum `48×48px` for all interactive elements.
- On narrow viewports, card grids collapse to single column. Maintain vertical spacing rhythm.

---

## 5. Components

### 5.1 Buttons

| Type                     | Background             | Text                | Border                          | Radius                       | Height    | Usage                                                                                                                 |
| ------------------------ | ---------------------- | ------------------- | ------------------------------- | ---------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| **Primary CTA**          | Deep Emerald `#0b4839` | White `#fffcf5`     | None                            | `8px` (rounded but not pill) | `48–52px` | Main actions: "Mulai Konsultasi", "Lihat Rekomendasi", "Coba Tester".                                                 |
| **Warm CTA**             | Terracotta `#cc6035`   | White `#fffcf5`     | None                            | `8px` to full pill           | `44–52px` | High-energy CTAs: "Beli Sekarang", "Lihat Semua". The previous ABNA website uses this for primary e-commerce actions. |
| **Secondary / Outlined** | Transparent            | Deep Emerald or Ink | `1px solid` ink or border color | `8px` to full pill           | `44–48px` | Secondary actions: "Jelajahi Koleksi", "Bandingkan", "Kembali".                                                       |
| **Ghost / Text**         | Transparent            | Muted foreground    | None                            | —                            | `auto`    | Tertiary actions, navigation, "Selesai".                                                                              |

**Button rules:**

- Never use gold/sand as a button fill color.
- Hover: subtle `scale(1.02)` + slight shadow lift. No color flash.
- Active/Tap: `scale(0.98)` press-in. Tactile, physical feedback.
- Icons in buttons: placed trailing (right side), small (`16–20px`), matching text color.
- The previous ABNA website demonstrates: filled primary with icon + outlined secondary with arrow. This dual-button pattern should be the standard for CTA pairs.

### 5.2 Quiz Option Cards (Polaroid Cards)

These are AURA AI's distinctive interaction element — the image-based selection cards in the quiz flow.

| Property            | Value                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Border radius**   | `12–16px` (softly rounded, not pill-shaped)                                                                            |
| **Border**          | `1px solid border` in default state. `2px solid` Deep Emerald or Sand Gold on selection.                               |
| **Shadow**          | Soft, warm, layered shadow. Not flat, not heavy drop-shadow. Current `--shadow-polaroid` system is correct.            |
| **Background**      | White/warm white card surface.                                                                                         |
| **Image**           | High-quality, cropped to fill, with subtle bottom vignette gradient for text legibility.                               |
| **Selection state** | Border thickens + accent color ring. Check badge appears (spring animation). Footer shows "Pilihan Anda" pill in gold. |
| **Hover state**     | Slight lift (`translateY(-2px)`) + shadow intensifies. Card tilt straightens.                                          |
| **Tilt**            | Subtle alternating rotations (`-1.5° to +1.5°`) — adds editorial magazine-clipping feel. AURA AI unique.               |

### 5.3 Recommendation Cards

| Element        | Hero Card (#1)                                                               | Alternative Cards (#2, #3)              |
| -------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| **Header bar** | Deep Emerald with gold kicker badge and large match percentage               | Compact, no header bar                  |
| **Layout**     | Two-column editorial spread (info left, metrics right)                       | Single-column compact tile              |
| **Typography** | Full hierarchy: kicker → product name → category → narrative → notes pyramid | Abbreviated: name → match % → top notes |
| **Border**     | `1px` subtle border with slight rounded corners (`12–16px`)                  | Same border treatment                   |
| **Shadow**     | Soft layered shadow, slightly heavier than quiz cards                        | Light shadow                            |
| **CTA**        | "COBA TESTER DI TOKO" primary button                                         | Implied — part of bottom action bar     |

### 5.4 Surfaces, Borders, Shadows, Radius

| Property              | Specification                                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Default radius**    | `8px` for buttons and inputs. `12–16px` for cards. `24px` maximum for hero cards. No higher — avoid bubble/pill shapes on containers.                     |
| **Borders**           | `1px solid` warm gray (`--border`). Borders should be visible but never dominant. They define edges, not attract attention.                               |
| **Shadows**           | Always warm-toned (use ink/charcoal with low opacity, not pure black). Multi-layered (ambient + direct) for depth. Never sharp single-layer drop shadows. |
| **Dividers**          | Thin `1px` lines in border color or sand gold `#c4b392`. Use sparingly to separate major sections, not between every element.                             |
| **Surface hierarchy** | Ivory canvas → White card → White with faint sand border. Maximum three surface levels. Do not stack more nested containers.                              |

### 5.5 Progress Indicator

- Thin top-of-screen progress bar that fills as quiz advances.
- Color: gradient from Sand Gold to Deep Emerald (or solid Sand Gold).
- Height: `2–3px`. Subtle but always visible.
- Smooth animated transitions between steps.

### 5.6 Form Elements

| Element    | Specification                                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Inputs** | Height `48px` minimum. Rounded `8px`. Border `1px solid --border`. Focus ring: `2px` Deep Emerald or Sand Gold.                        |
| **Slider** | Custom styled. Track: warm gray. Filled portion: Sand Gold gradient. Thumb: Deep Emerald with white ring. Step indicators: small dots. |
| **Labels** | Inter 500, `13–14px`, uppercase tracked kicker style above the input.                                                                  |

---

## 6. AURA AI Visual Translation

### 6.1 What Remains Uniquely AURA AI

These visual elements are part of the AURA AI product experience and should NOT be replaced with generic ABNA website patterns:

| Element                         | Description                                                    | Why it stays                                                                    |
| ------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Polaroid quiz cards**         | Tilted image cards with spring-animated selection              | Core interaction mechanic. Defines the tactile, discovery-first experience.     |
| **Atmospheric loading orb**     | Rotating concentric rings with glowing blur orb during scoring | Creates the "AI curation" moment. Bridges quiz completion → result reveal.      |
| **Film grain texture**          | Subtle SVG noise overlay on ivory canvas                       | Adds tactile materiality that aligns with ABNA's earthy, natural character.     |
| **Cinematic result reveal**     | Animated phased reveal of recommendation cards                 | Editorial storytelling moment. Makes results feel curated, not listed.          |
| **Narrative text blocks**       | AI-generated "Why it matches you" passages in serif italic     | Personal, editorial voice that elevates the experience beyond a product filter. |
| **Three-tier result hierarchy** | Hero card + two compact alternates                             | Focused decision architecture. Not a product grid — a curated recommendation.   |
| **5-step sensory quiz**         | Step-by-step immersive question flow                           | Product-defining interaction. Each step = one editorial page.                   |

### 6.2 How to Translate AURA AI into ABNA Signature Identity

| AURA AI Element        | ABNA Signature Translation                                                                                                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Color palette**      | Shift from generic navy/gold → ABNA Signature's Deep Emerald + Sand Gold + Ivory + Terracotta. The palette should feel like forest, sand, and fired clay — not banker's navy and jewelry gold. |
| **Button styling**     | Use Deep Emerald or Terracotta primary CTAs instead of matte black. Outlined secondary buttons. Matches the previous ABNA website's button vocabulary.                                         |
| **Kicker labels**      | Keep uppercase tracked labels, but in Sand Gold `#c4b392` or muted foreground — consistent with how the previous ABNA website uses small uppercase kickers above headlines.                    |
| **Header branding**    | "ABNA PARFUM" in display font + "✦ Scent Finder" in serif accent. Use Deep Emerald for the ABNA wordmark when on ivory.                                                                        |
| **Card header bars**   | Result card hero header: Deep Emerald background with Sand Gold badge text — replaces matte black to connect to ABNA Signature's primary identity color.                                       |
| **Loading screen**     | Orb and rings can use Deep Emerald + Sand Gold gradient instead of generic gold. The ABNA monogram emblem should be in brand-correct colors.                                                   |
| **Overall atmosphere** | The ivory canvas + emerald + sand + terracotta combination should create a warm, grounded, forest-and-earth atmosphere — distinctly ABNA Signature, not generic luxury.                        |

---

## 7. Do / Don't Rules

### ✅ DO

- **DO** use generous ivory whitespace as the primary visual element. Let the content breathe.
- **DO** pair bold geometric sans titles with italic serif accents for editorial contrast.
- **DO** use the three-tier kicker → title → body composition consistently.
- **DO** keep card borders subtle and warm — present but never heavy.
- **DO** use Deep Emerald (`#0b4839`) as the primary high-emphasis color.
- **DO** use Sand Gold (`#c4b392`) sparingly for editorial highlights and ornamental details.
- **DO** maintain the polaroid card tilt and film grain as AURA AI's distinctive tactile identity.
- **DO** make buttons feel physically pressable with scale animations.
- **DO** keep the loading screen atmospheric and branded with ABNA identity colors.
- **DO** maintain the editorial magazine feel in result card layouts.
- **DO** ensure all text on ivory has sufficient contrast (WCAG AA minimum).
- **DO** use warm-toned shadows (never pure black shadows).

### ❌ DON'T

- **DON'T** make it look like a generic luxury perfume website. ABNA has a specific warm, earthy, Indonesian character.
- **DON'T** turn it into a SaaS dashboard or tech product. No data tables, no metric dashboards, no cold gray panels.
- **DON'T** make it overly corporate. No stiff grid systems, no corporate blue, no stock photo banners.
- **DON'T** make it overly futuristic. No neon glows, no dark-mode-by-default, no cyberpunk gradients.
- **DON'T** make it overly decorative. No ornamental gold filigree, no baroque borders, no embossed patterns.
- **DON'T** use excessive gold. Sand Gold is an accent, not a fill. If everything is gold, nothing is gold.
- **DON'T** use overly rounded corners (pill shapes on cards, bubble containers). Maximum radius: `24px` for hero cards, `16px` for standard cards.
- **DON'T** use heavy glassmorphism. Subtle backdrop-blur on sticky navigation is acceptable. Frosted glass cards, blurred surfaces as primary containers — not acceptable.
- **DON'T** use pure black (`#000000`) for text or backgrounds. Always use warm charcoal/ink with warm undertone.
- **DON'T** place primary content on dark backgrounds. Dark surfaces (Deep Emerald header bars) are accent containers, not default surfaces.
- **DON'T** copy the previous ABNA website's page layout or e-commerce information architecture. AURA AI has its own product flow (quiz → loading → results). The website is only a visual style reference.
- **DON'T** disconnect the visual identity from ABNA. If a screen could belong to any perfume brand, it's not specific enough.
- **DON'T** use navy blue (`#1B2A4A`) as primary color. The original design.md specified navy — this is overridden by the official ABNA Signature guideline which uses Deep Emerald `#0b4839`.
- **DON'T** use bright yellow gold (`#F2B705`) as accent. The original design.md specified this — it is overridden by the official ABNA Signature sand gold `#c4b392`, which is more muted and earthy.

---

## 8. Animation and Motion

| Principle                  | Implementation                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Smooth and physical**    | All transitions use spring physics or ease-out curves. Nothing linear. Nothing instant.                                                                       |
| **Subtle by default**      | Hover: `scale(1.02)`. Tap: `scale(0.98)`. Shadow lift on hover. These are small, tactile, physical.                                                           |
| **Purposeful transitions** | Page phase transitions (quiz step → next step, quiz → loading → results) use `AnimatePresence` with fade + slight vertical slide. Duration: `300–500ms`.      |
| **Loading as ceremony**    | The loading/scoring screen is a deliberate atmospheric pause. Rotating rings, pulsing orb, cycling status text. This is AURA AI's signature moment — keep it. |
| **No flashy effects**      | No particle systems, no confetti, no bouncing logos, no shimmer effects on text, no parallax scrolling.                                                       |
| **Performance-first**      | Animations must use `transform` and `opacity` only (GPU-composited). No layout-triggering animations.                                                         |

---

## 9. Iconography

| Guideline        | Detail                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Style**        | Simple, outlined, stroke-weight 1.5–2px. Match Inter's geometric character.                                                |
| **Size**         | `16–20px` inline with text. `24px` in buttons. `32px` standalone.                                                          |
| **Color**        | Inherit text color. Never multicolor icons.                                                                                |
| **Usage**        | Trailing in buttons (arrow →, cart 🛒). Standalone for navigation actions (search, close). Avoid decorative icon clusters. |
| **Brand symbol** | The ✦ diamond/star symbol is used as AURA AI's editorial separator. Use in kicker labels and metadata dividers.            |

---

## 10. Image Treatment

| Context                   | Treatment                                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Quiz option images**    | High-quality, atmospheric photography. Cropped to fill card frame. Subtle bottom vignette for text legibility. Natural, warm-toned color grading.          |
| **Product bottle images** | Clean packshot on neutral/transparent background. Sized proportionally within result cards. No heavy styling or filters.                                   |
| **Hero imagery**          | Editorial lifestyle photography with natural botanical elements (flowers, citrus, stones) — as seen in the previous ABNA website hero. Warm color grading. |
| **Never**                 | No stock photo clichés (woman spraying perfume, generic luxury flat-lays). No heavy filters, no duotone overlays, no synthetic 3D renders.                 |

---

## Appendix A: Color Quick Reference

```
ABNA SIGNATURE PRIMARY PALETTE
──────────────────────────────
Deep Emerald    #0b4839    Primary / Brand hero
Sand Gold       #c4b392    Accent / Editorial highlight
Warm Ivory      #fffcf5    Canvas / Background
Terracotta      #cc6035    CTA / Warm accent

ABNA PARFUM PARENT PALETTE (reference only)
──────────────────────────────────────────
Steel Blue      #2e5c80    Parent brand primary
Light Blue      #92c1d9    Parent brand secondary
Muted Gold      #d7c689    Parent brand gold
Deep Gold       #d7ae5f    Parent brand deep gold

LOGO COLORS (from ABNA-Logo.png)
──────────────────────────────────────────
Logo Red        ~#E31E24   ABNA wordmark + icon top element
Logo Navy       ~#1B2848   "PARFUMATIQUE" text + icon navy element
Logo Gold/Yellow ~#F5C518  Icon golden crescent element
```

## Appendix B: Font Loading Reference

```html
<!-- Current implementation fonts (web-safe alternatives to ABNA guideline fonts) -->
<link
  href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

| ABNA Guideline Font  | Web Implementation | CSS Variable     |
| -------------------- | ------------------ | ---------------- |
| Basis Grotesque      | Inter              | `--font-body`    |
| Futura / Barber Chop | Archivo Black      | `--font-display` |
| PP Editorial         | Cormorant Garamond | `--font-serif`   |

## Appendix C: Conflict Resolution Log

| Item          | Original design.md            | ABNA Guideline                                              | Resolution                                                                                                                                                                           |
| ------------- | ----------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Primary color | Navy `#1B2A4A`                | Deep Emerald `#0b4839` (Signature)                          | **Use ABNA Signature Deep Emerald.** Navy was a placeholder; the official Signature sub-brand uses emerald.                                                                          |
| Accent color  | Bright Gold `#F2B705`         | Sand Gold `#c4b392` (Signature)                             | **Use ABNA Signature Sand Gold.** Bright yellow-gold is from the logo icon, not from the Signature product line palette.                                                             |
| Background    | Ivory `#FAF8F3`               | Ivory `#fffcf5`                                             | **Use official `#fffcf5`.** Very close — the guideline value is slightly warmer and is shared across both ABNA lines.                                                                |
| Heading font  | Playfair Display              | Futura / Barber Chop → Archivo Black                        | **Use Archivo Black.** Current implementation already uses Archivo Black, which is closer to the guideline's geometric display intent than Playfair Display (a high-contrast serif). |
| Body font     | Inter                         | Basis Grotesque → Inter                                     | **Use Inter.** No conflict — Inter is already the correct web alternative.                                                                                                           |
| Border radius | 12px (fixed)                  | Not specified                                               | **Use a scale: 8px buttons, 12–16px cards, 24px max.** A single fixed radius is too rigid; a scale provides better compositional flexibility.                                        |
| Shadows       | "Soft. Never heavy."          | Not specified                                               | **Retained and refined.** Multi-layered warm shadows specified in detail.                                                                                                            |
| Button style  | "Rounded. Gold only for CTA." | Red/Terracotta CTA in website, Emerald in Signature palette | **Use Deep Emerald or Terracotta for CTAs. No gold fill buttons.** Gold fills look generic; brand-correct colors are emerald and terracotta.                                         |
