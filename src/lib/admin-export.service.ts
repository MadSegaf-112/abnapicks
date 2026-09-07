/**
 * Phase DATA-EXPORT-UX-01 — Professional Admin Export & Reporting Service
 *
 * Provides enterprise-grade Excel (.xlsx) multi-sheet workbook generation,
 * sanitized consultation & event transformations, JSON developer export,
 * and deterministic Executive Business Intelligence reports.
 *
 * Invariants:
 * 1. Zero PII: Excludes customer names, emails, phones, IPs, device IDs, tokens.
 * 2. Secrets Isolated: Never exposes database credentials, API keys, or service role keys.
 * 3. Structured Multi-Sheet Workbook: 7 dedicated worksheets with ABNA brand formatting.
 * 4. Data Consistency: Uses identical aggregation math as admin dashboard.
 * 5. Deterministic Intelligence: Pure rule-based insights without external AI API calls.
 */

import { z } from "zod";
import ExcelJS from "exceljs";
import type { CustomerSessionRecord } from "./customer-session.repository";
import type { ConsultationEventRecord } from "./customer-events.repository";
import {
  GENDER_LABELS,
  AGE_LABELS,
  OCCUPATION_LABELS,
  PRICE_LABELS,
  MOOD_LABELS,
  ATMOSPHERE_LABELS,
  OCCASION_LABELS,
  INTENSITY_LABELS,
  SCENT_FAMILY_LABELS,
  type DashboardData,
  type FunnelAnalytics,
} from "./admin-analytics.service";
import { RAW_FRAGRANCES } from "../data/fragrances/fragrances";

// 1. Zod Filter Schemas for Export & Reporting
export const ExportFilterSchema = z.object({
  dateRange: z.string().optional().default("all"), // "today" | "7d" | "30d" | "all"
  gender: z.string().optional(),
  ageRange: z.string().optional(),
  occupation: z.string().optional(),
  priceRange: z.string().optional(),
  mood: z.string().optional(),
  atmosphere: z.string().optional(),
  intensity: z.string().optional(),
  occasion: z.string().optional(),
  scentFamily: z.string().optional(),
  clientPlatform: z.string().optional(),
  topFragrance: z.string().optional(),
  authToken: z.string().optional(),
});
export type ExportFilter = z.infer<typeof ExportFilterSchema>;

// 2. Sanitized Consultation Export Row Contract (Sheet 2)
export interface SanitizedConsultationRow {
  session_id: string;
  created_at: string;
  completed: string; // "Yes" | "No"
  client_platform: string;
  gender: string;
  age_range: string;
  occupation: string;
  price_range: string;
  mood: string;
  atmosphere: string;
  scent_families: string;
  intensity: string;
  occasion: string;
  top_fragrance_id: string;
  top_fragrance_name: string;
  top_fragrance_house: string;
  top_match_percent: number; // 0..100 or 0..1
  recommendation_1: string;
  recommendation_1_match: number | string;
  recommendation_2: string;
  recommendation_2_match: number | string;
  recommendation_3: string;
  recommendation_3_match: number | string;
}

// 3. Sanitized Funnel Stage Row Contract (Sheet 3)
export interface SanitizedFunnelStageRow {
  stage: string;
  stage_id: string;
  sessions_reached: number;
  conversion_rate: number; // 0..1
  drop_off_count: number;
  drop_off_rate: number; // 0..1
  answer_rate: number; // 0..1
  average_duration: string;
}

// 4. Sanitized Fragrance Performance Row Contract (Sheet 4)
export interface SanitizedFragrancePerformanceRow {
  rank: number;
  fragrance_id: string;
  fragrance_name: string;
  house: string;
  total_recommendations: number;
  rank_1_count: number;
  rank_2_count: number;
  rank_3_count: number;
  rank_1_percentage: number; // 0..1
  average_match_score: number; // 0..1
  minimum_match_score: number; // 0..1
  maximum_match_score: number; // 0..1
  scent_family: string;
}

// 5. Sanitized Recommendation Detail Row Contract (Sheet 7)
export interface SanitizedRecommendationDetailRow {
  session_id: string;
  session_created_at: string;
  recommendation_rank: number;
  fragrance_id: string;
  fragrance_name: string;
  house: string;
  category: string;
  match_percentage: number; // 0..1
  description: string;
  why_match: string;
  aura: string;
}

// 6. Sanitized Funnel Event Row Contract (Raw Stream)
export interface SanitizedFunnelRow {
  session_id: string;
  event_type: string;
  question_number: number | string;
  step_id: string;
  client_platform: string;
  created_at: string;
}

/**
 * Escapes values for safe CSV rendering (Backward Compatibility).
 */
export function escapeCsvValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Serializes an array of objects to UTF-8 CSV string (Backward Compatibility).
 */
export function serializeToCsv<T extends object>(
  data: T[],
  headers: Array<{ key: keyof T; label: string }>,
): string {
  if (!data || data.length === 0) {
    return headers.map((h) => escapeCsvValue(h.label)).join(",") + "\r\n";
  }

  const headerLine = headers.map((h) => escapeCsvValue(h.label)).join(",");
  const rows = data.map((row) =>
    headers.map((h) => escapeCsvValue((row as Record<string, unknown>)[h.key as string])).join(","),
  );

  return [headerLine, ...rows].join("\r\n");
}

/**
 * Maps raw CustomerSessionRecord array into sanitized flat consultation rows.
 * Formats dates, labels, multi-select scent families, and replaces nulls with "Belum diisi".
 */
export function sanitizeConsultationRecords(
  records: CustomerSessionRecord[],
): SanitizedConsultationRow[] {
  return records.map((r) => {
    const recs = Array.isArray(r.recommendations) ? r.recommendations : [];
    const r1 = recs[0];
    const r2 = recs[1];
    const r3 = recs[2];

    const families = Array.isArray(r.scent_families)
      ? r.scent_families.map((f) => SCENT_FAMILY_LABELS[f] || f).join(", ")
      : "";

    const rawCreatedAt = (r as unknown as { created_at?: string }).created_at;
    let formattedDate = "Belum diisi";
    if (rawCreatedAt) {
      try {
        const d = new Date(rawCreatedAt);
        formattedDate = !isNaN(d.getTime())
          ? d.toISOString().replace("T", " ").substring(0, 19)
          : rawCreatedAt;
      } catch {
        formattedDate = rawCreatedAt;
      }
    }

    return {
      session_id: r.session_id || "Belum diisi",
      created_at: formattedDate,
      completed: r.completed !== false ? "Yes" : "No",
      client_platform: r.client_platform || "kiosk_web",
      gender: r.gender ? GENDER_LABELS[r.gender] || r.gender : "Belum diisi",
      age_range: r.age_range ? AGE_LABELS[r.age_range] || r.age_range : "Belum diisi",
      occupation: r.occupation ? OCCUPATION_LABELS[r.occupation] || r.occupation : "Belum diisi",
      price_range: r.price_range ? PRICE_LABELS[r.price_range] || r.price_range : "Belum diisi",
      mood: r.mood ? MOOD_LABELS[r.mood] || r.mood : "Belum diisi",
      atmosphere: r.atmosphere ? ATMOSPHERE_LABELS[r.atmosphere] || r.atmosphere : "Belum diisi",
      scent_families: families || "Belum diisi",
      intensity: r.intensity ? INTENSITY_LABELS[r.intensity] || r.intensity : "Belum diisi",
      occasion: r.occasion ? OCCASION_LABELS[r.occasion] || r.occasion : "Belum diisi",
      top_fragrance_id: r.top_fragrance_id || (r1?.id ?? "Belum diisi"),
      top_fragrance_name: r.top_fragrance_name || (r1?.name ?? "Belum diisi"),
      top_fragrance_house: r.top_fragrance_house || (r1?.house ?? "Belum diisi"),
      top_match_percent: r.top_match_percent ?? r1?.match_percent ?? 0,
      recommendation_1: r1 ? `${r1.name} (${r1.house})` : "Belum diisi",
      recommendation_1_match: r1 ? `${r1.match_percent}%` : "Belum diisi",
      recommendation_2: r2 ? `${r2.name} (${r2.house})` : "Belum diisi",
      recommendation_2_match: r2 ? `${r2.match_percent}%` : "Belum diisi",
      recommendation_3: r3 ? `${r3.name} (${r3.house})` : "Belum diisi",
      recommendation_3_match: r3 ? `${r3.match_percent}%` : "Belum diisi",
    };
  });
}

/**
 * Maps raw ConsultationEventRecord array into sanitized funnel export rows.
 */
export function sanitizeFunnelRecords(events: ConsultationEventRecord[]): SanitizedFunnelRow[] {
  return events.map((e) => ({
    session_id: e.session_id,
    event_type: e.event_type,
    question_number: e.question_number ?? "-",
    step_id: e.step_id ?? "-",
    client_platform: e.client_platform || "kiosk_web",
    created_at: e.created_at || "",
  }));
}

/**
 * Unnests Top 3 recommendations from customer sessions into 1 row per recommendation candidate.
 * (Session A + Rank 1 = Row 1, Session A + Rank 2 = Row 2, Session A + Rank 3 = Row 3).
 */
export function sanitizeRecommendationDetails(
  records: CustomerSessionRecord[],
): SanitizedRecommendationDetailRow[] {
  const rows: SanitizedRecommendationDetailRow[] = [];

  for (const r of records) {
    const rawCreatedAt = (r as unknown as { created_at?: string }).created_at;
    let formattedDate = "Belum diisi";
    if (rawCreatedAt) {
      try {
        const d = new Date(rawCreatedAt);
        formattedDate = !isNaN(d.getTime())
          ? d.toISOString().replace("T", " ").substring(0, 19)
          : rawCreatedAt;
      } catch {
        formattedDate = rawCreatedAt;
      }
    }

    const recs = Array.isArray(r.recommendations) ? r.recommendations : [];
    if (recs.length > 0) {
      for (const rec of recs) {
        rows.push({
          session_id: r.session_id,
          session_created_at: formattedDate,
          recommendation_rank: rec.rank || 1,
          fragrance_id: rec.id || rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          fragrance_name: rec.name,
          house: rec.house || "ABNA",
          category: rec.category || "Unisex",
          match_percentage: (rec.match_percent || 0) / 100,
          description: rec.description || "Belum diisi",
          why_match: rec.why_match || "Belum diisi",
          aura: rec.aura || "Belum diisi",
        });
      }
    } else if (r.top_fragrance_name) {
      rows.push({
        session_id: r.session_id,
        session_created_at: formattedDate,
        recommendation_rank: 1,
        fragrance_id:
          r.top_fragrance_id || r.top_fragrance_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        fragrance_name: r.top_fragrance_name,
        house: r.top_fragrance_house || "ABNA",
        category: "Unisex",
        match_percentage: (r.top_match_percent || 0) / 100,
        description: "Belum diisi",
        why_match: "Belum diisi",
        aura: "Belum diisi",
      });
    }
  }

  return rows;
}

/**
 * Computes complete fragrance performance table across all sessions & recommendations.
 * Sorted by Total Recommendations DESC, Average Match Score DESC.
 */
export function computeFragrancePerformanceRows(
  records: CustomerSessionRecord[],
): SanitizedFragrancePerformanceRow[] {
  // Scent family catalog lookup map
  const catalogFamilyMap = new Map<string, string>();
  for (const f of RAW_FRAGRANCES) {
    if (f.id) catalogFamilyMap.set(f.id.toLowerCase(), f.fragranceFamily || "Woody Aromatic");
    if (f.name) catalogFamilyMap.set(f.name.toLowerCase(), f.fragranceFamily || "Woody Aromatic");
  }

  const statsMap: Record<
    string,
    {
      name: string;
      house: string;
      total: number;
      rank1: number;
      rank2: number;
      rank3: number;
      minMatch: number;
      maxMatch: number;
      sumMatch: number;
      scentFamily: string;
    }
  > = {};

  for (const r of records) {
    const recs = Array.isArray(r.recommendations) ? r.recommendations : [];
    if (recs.length > 0) {
      for (const rec of recs) {
        if (!rec || !rec.name) continue;
        const fid = rec.id || rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        if (!statsMap[fid]) {
          const family =
            catalogFamilyMap.get(fid.toLowerCase()) ||
            catalogFamilyMap.get(rec.name.toLowerCase()) ||
            (rec.category ? `Category: ${rec.category}` : "ABNA Signature");

          statsMap[fid] = {
            name: rec.name,
            house: rec.house || "ABNA",
            total: 0,
            rank1: 0,
            rank2: 0,
            rank3: 0,
            minMatch: rec.match_percent || 85,
            maxMatch: rec.match_percent || 85,
            sumMatch: 0,
            scentFamily: family,
          };
        }

        const s = statsMap[fid];
        s.total += 1;
        if (rec.rank === 1) s.rank1 += 1;
        else if (rec.rank === 2) s.rank2 += 1;
        else if (rec.rank === 3) s.rank3 += 1;

        const match = rec.match_percent || 85;
        s.minMatch = Math.min(s.minMatch, match);
        s.maxMatch = Math.max(s.maxMatch, match);
        s.sumMatch += match;
      }
    } else if (r.top_fragrance_name) {
      const fid =
        r.top_fragrance_id || r.top_fragrance_name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const match = r.top_match_percent || 90;
      if (!statsMap[fid]) {
        const family =
          catalogFamilyMap.get(fid.toLowerCase()) ||
          catalogFamilyMap.get(r.top_fragrance_name.toLowerCase()) ||
          "ABNA Signature";

        statsMap[fid] = {
          name: r.top_fragrance_name,
          house: r.top_fragrance_house || "ABNA",
          total: 0,
          rank1: 0,
          rank2: 0,
          rank3: 0,
          minMatch: match,
          maxMatch: match,
          sumMatch: 0,
          scentFamily: family,
        };
      }
      const s = statsMap[fid];
      s.total += 1;
      s.rank1 += 1;
      s.minMatch = Math.min(s.minMatch, match);
      s.maxMatch = Math.max(s.maxMatch, match);
      s.sumMatch += match;
    }
  }

  const list: SanitizedFragrancePerformanceRow[] = Object.entries(statsMap)
    .map(([fid, stat]) => ({
      rank: 0,
      fragrance_id: fid,
      fragrance_name: stat.name,
      house: stat.house,
      total_recommendations: stat.total,
      rank_1_count: stat.rank1,
      rank_2_count: stat.rank2,
      rank_3_count: stat.rank3,
      rank_1_percentage: stat.total > 0 ? stat.rank1 / stat.total : 0,
      average_match_score: stat.total > 0 ? stat.sumMatch / stat.total / 100 : 0,
      minimum_match_score: stat.minMatch / 100,
      maximum_match_score: stat.maxMatch / 100,
      scent_family: stat.scentFamily,
    }))
    .sort(
      (a, b) =>
        b.total_recommendations - a.total_recommendations ||
        b.average_match_score - a.average_match_score,
    )
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  return list;
}

/**
 * Builds structured funnel stages table (Viewed & Answered breakdown).
 */
export function buildFunnelStageRows(
  events: ConsultationEventRecord[],
  funnelAnalytics?: FunnelAnalytics,
): SanitizedFunnelStageRow[] {
  const startedSessions = new Set<string>();
  const resultsSessions = new Set<string>();
  const completedSessions = new Set<string>();

  const qViewedSets: Record<number, Set<string>> = {
    1: new Set(),
    2: new Set(),
    3: new Set(),
    4: new Set(),
    5: new Set(),
    6: new Set(),
    7: new Set(),
    8: new Set(),
    9: new Set(),
  };
  const qAnsweredSets: Record<number, Set<string>> = {
    1: new Set(),
    2: new Set(),
    3: new Set(),
    4: new Set(),
    5: new Set(),
    6: new Set(),
    7: new Set(),
    8: new Set(),
    9: new Set(),
  };

  for (const e of events) {
    const sId = e.session_id;
    if (!sId) continue;
    if (e.event_type === "consultation_started") startedSessions.add(sId);
    else if (e.event_type === "question_viewed") {
      if (e.question_number && e.question_number >= 1 && e.question_number <= 9) {
        qViewedSets[e.question_number].add(sId);
      }
    } else if (e.event_type === "question_answered") {
      if (e.question_number && e.question_number >= 1 && e.question_number <= 9) {
        qAnsweredSets[e.question_number].add(sId);
      }
    } else if (e.event_type === "results_viewed") resultsSessions.add(sId);
    else if (e.event_type === "consultation_completed") completedSessions.add(sId);
  }

  const started = startedSessions.size;
  const denom = started > 0 ? started : 1;
  const avgDurStr = funnelAnalytics?.averageDurationSeconds
    ? `${Math.floor(funnelAnalytics.averageDurationSeconds / 60)}m ${Math.round(funnelAnalytics.averageDurationSeconds % 60)}s`
    : "N/A";

  const questionMeta = [
    { num: 1, label: "Karakter Aroma (Mood)" },
    { num: 2, label: "Jenis Aroma Favorit (Scent Family)" },
    { num: 3, label: "Suasana Aroma (Atmosphere)" },
    { num: 4, label: "Momen Pemakaian (Occasion)" },
    { num: 5, label: "Intensitas Aroma (Intensity)" },
    { num: 6, label: "Profil Pembeli (Gender)" },
    { num: 7, label: "Range Usia (Age Range)" },
    { num: 8, label: "Aktivitas Utama (Occupation)" },
    { num: 9, label: "Range Harga Nyaman (Price Range)" },
  ];

  const rawSequence: Array<{
    stage: string;
    stage_id: string;
    reached: number;
    answerRate?: number;
  }> = [{ stage: "Consultation Started", stage_id: "started", reached: started }];

  for (const q of questionMeta) {
    const vCount = qViewedSets[q.num].size;
    const aCount = qAnsweredSets[q.num].size;
    const aRate = vCount > 0 ? aCount / vCount : 0;

    rawSequence.push({
      stage: `Q${q.num} Viewed (${q.label})`,
      stage_id: `q${q.num}_viewed`,
      reached: vCount,
      answerRate: aRate,
    });
    rawSequence.push({
      stage: `Q${q.num} Answered (${q.label})`,
      stage_id: `q${q.num}_answered`,
      reached: aCount,
      answerRate: 1.0,
    });
  }

  rawSequence.push({
    stage: "Results Viewed",
    stage_id: "results_viewed",
    reached: resultsSessions.size,
  });
  rawSequence.push({
    stage: "Consultation Completed",
    stage_id: "completed",
    reached: completedSessions.size,
  });

  const rows: SanitizedFunnelStageRow[] = rawSequence.map((item, idx) => {
    const nextItem = rawSequence[idx + 1];
    const dropOffCount = nextItem ? Math.max(0, item.reached - nextItem.reached) : 0;
    const dropOffRate = item.reached > 0 && nextItem ? dropOffCount / item.reached : 0;
    const convRate = started > 0 ? item.reached / denom : 0;

    return {
      stage: item.stage,
      stage_id: item.stage_id,
      sessions_reached: item.reached,
      conversion_rate: convRate,
      drop_off_count: dropOffCount,
      drop_off_rate: dropOffRate,
      answer_rate: item.answerRate ?? 1.0,
      average_duration: avgDurStr,
    };
  });

  return rows;
}

// ─────────────────────────────────────────────────────────────────────────────
// ABNA PICKS BRAND STYLING CONSTANTS (ExcelJS ARGB Color Palette)
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_COLORS = {
  deepEmerald: "FF064E3B",
  emeraldDark: "FF022C22",
  emeraldLight: "FFECFDF5",
  sandGold: "FFC5A059",
  sandGoldDark: "FF9A7B38",
  sandGoldLight: "FFFEF9EE",
  warmIvory: "FFFFFCF5",
  darkText: "FF020806",
  whiteText: "FFFFFFFF",
  mutedText: "FF64748B",
  borderLight: "FFE2E8F0",
  borderGold: "FFD4AF37",
  cardBg: "FFFDFBF7",
};

/**
 * Creates and formats the complete professional multi-sheet XLSX Workbook.
 */
export async function generateAdminAnalyticsWorkbook(
  dashboard: DashboardData,
  records: CustomerSessionRecord[],
  events: ConsultationEventRecord[],
  filters: ExportFilter,
  dateLabel: string,
): Promise<ExcelJS.Workbook> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ABNA PICKS Intelligence Engine";
  workbook.lastModifiedBy = "ABNA Admin Workspace";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.properties.date1904 = false;

  const sanitizedConsultations = sanitizeConsultationRecords(records);
  const fragrancePerformanceList = computeFragrancePerformanceRows(records);
  const recommendationDetailsList = sanitizeRecommendationDetails(records);
  const funnelStagesList = buildFunnelStageRows(events, dashboard.funnel);

  // Helper: Apply standard table header styling
  const styleHeaderRow = (
    row: ExcelJS.Row,
    bgColor = BRAND_COLORS.deepEmerald,
    textColor = BRAND_COLORS.whiteText,
  ) => {
    row.height = 26;
    row.eachCell({ includeEmpty: false }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: bgColor },
      };
      cell.font = {
        name: "Segoe UI",
        size: 10,
        bold: true,
        color: { argb: textColor },
      };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = {
        top: { style: "thin", color: { argb: BRAND_COLORS.borderGold } },
        bottom: { style: "medium", color: { argb: BRAND_COLORS.borderGold } },
        left: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        right: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
      };
    });
  };

  // Helper: Apply standard data cell borders & fonts
  const styleDataRow = (row: ExcelJS.Row, isEven = false) => {
    row.height = 20;
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = {
        name: "Segoe UI",
        size: 9.5,
        color: { argb: BRAND_COLORS.darkText },
      };
      if (isEven) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFBF9F5" },
        };
      }
      cell.border = {
        top: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        bottom: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        left: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        right: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
      };
    });
  };

  // ===========================================================================
  // SHEET 1: EXECUTIVE SUMMARY
  // ===========================================================================
  const wsExec = workbook.addWorksheet("Executive Summary", {
    views: [{ showGridLines: true }],
    properties: { tabColor: { argb: BRAND_COLORS.sandGold } },
  });

  // Title Banner
  wsExec.mergeCells("A1:D1");
  const titleCell = wsExec.getCell("A1");
  titleCell.value = "ABNA PICKS · Customer & Fragrance Intelligence Report";
  titleCell.font = {
    name: "Segoe UI",
    size: 15,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText },
  };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.deepEmerald },
  };
  titleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(1).height = 36;

  wsExec.mergeCells("A2:D2");
  const subTitleCell = wsExec.getCell("A2");
  subTitleCell.value = `Periode Laporan: ${dateLabel} | Generated At: ${new Date().toISOString().replace("T", " ").substring(0, 19)} UTC`;
  subTitleCell.font = {
    name: "Segoe UI",
    size: 10,
    italic: true,
    color: { argb: BRAND_COLORS.sandGoldDark },
  };
  subTitleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.warmIvory },
  };
  subTitleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(2).height = 22;

  // Metadata / KPI Table
  wsExec.getCell("A4").value = "EXECUTIVE METRIC";
  wsExec.getCell("B4").value = "NILAI";
  wsExec.getCell("C4").value = "SATUAN / FORMAT";
  wsExec.getCell("D4").value = "KETERANGAN";
  styleHeaderRow(wsExec.getRow(4));

  const kpis = dashboard.kpis;
  const avgDurText = dashboard.funnel?.averageDurationSeconds
    ? `${Math.floor(dashboard.funnel.averageDurationSeconds / 60)}m ${Math.round(dashboard.funnel.averageDurationSeconds % 60)}s`
    : "N/A";

  const kpiDataRows: Array<[string, unknown, string, string, string?]> = [
    [
      "Total Consultations",
      kpis.totalConsultations,
      "Integer",
      "Total sesi konsultasi yang tercatat",
      "#,##0",
    ],
    [
      "Consultations Today",
      kpis.consultationsToday,
      "Integer",
      "Volume konsultasi 24 jam terakhir",
      "#,##0",
    ],
    [
      "Consultations This Week",
      kpis.consultationsThisWeek,
      "Integer",
      "Volume konsultasi 7 hari terakhir",
      "#,##0",
    ],
    [
      "Consultations This Month",
      kpis.consultationsThisMonth || 0,
      "Integer",
      "Volume konsultasi bulan berjalan",
      "#,##0",
    ],
    [
      "Completion Rate",
      (kpis.completionRate || 100) / 100,
      "Percentage",
      "Tingkat penyelesaian kuesioner",
      "0.0%",
    ],
    [
      "Average Match Score",
      (kpis.averageMatchScore || 0) / 100,
      "Percentage",
      "Rata-rata kecocokan formula 10D",
      "0.0%",
    ],
    [
      "Most Recommended Fragrance",
      kpis.mostRecommendedFragrance || "Belum ada data",
      "Text",
      "Parfum paling sering menempati Top 1",
      "@",
    ],
    [
      "Most Popular Scent Family",
      kpis.mostPopularScentFamily || "Belum ada data",
      "Text",
      "Keluarga aroma paling banyak dipilih",
      "@",
    ],
    [
      "Average Consultation Duration",
      avgDurText,
      "Duration",
      "Rata-rata waktu pengerjaan dari start hingga selesai",
      "@",
    ],
  ];

  let curRow = 5;
  for (const [metric, val, unit, desc, numFmt] of kpiDataRows) {
    const r = wsExec.getRow(curRow);
    r.getCell(1).value = metric;
    r.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
    r.getCell(2).value = val as ExcelJS.CellValue;
    r.getCell(2).alignment = {
      horizontal: typeof val === "number" ? "right" : "left",
      vertical: "middle",
    };
    if (numFmt && typeof val === "number") r.getCell(2).numFmt = numFmt;
    r.getCell(3).value = unit;
    r.getCell(3).alignment = { horizontal: "center", vertical: "middle" };
    r.getCell(4).value = desc;
    r.getCell(4).alignment = { horizontal: "left", vertical: "middle" };
    styleDataRow(r, curRow % 2 === 0);
    curRow++;
  }

  // Key Business Insights Section
  curRow += 2;
  wsExec.mergeCells(`A${curRow}:D${curRow}`);
  const insightHeader = wsExec.getCell(`A${curRow}`);
  insightHeader.value = "KEY BUSINESS INSIGHTS (DETERMINISTIC INTELLIGENCE ENGINE)";
  insightHeader.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText },
  };
  insightHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGold },
  };
  insightHeader.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(curRow).height = 28;

  curRow++;
  const sampleStatus = dashboard.intelligence?.sampleSizeStatus || {
    totalSessions: dashboard.totalCount,
    confidenceLevel:
      dashboard.totalCount < 20
        ? "Limited"
        : dashboard.totalCount < 100
          ? "Emerging"
          : "Established",
    disclaimer:
      dashboard.totalCount < 20
        ? "Data masih dalam tahap pengembangan dan belum dapat digunakan untuk generalisasi pasar secara luas."
        : "Data representatif untuk evaluasi bisnis ritel.",
  };

  wsExec.mergeCells(`A${curRow}:D${curRow}`);
  const sampleMeta = wsExec.getCell(`A${curRow}`);
  sampleMeta.value = `Sample Size: N = ${sampleStatus.totalSessions} | Evidence Level: ${sampleStatus.confidenceLevel} | Catatan: ${sampleStatus.disclaimer}`;
  sampleMeta.font = {
    name: "Segoe UI",
    size: 9.5,
    bold: true,
    color: { argb: BRAND_COLORS.darkText },
  };
  sampleMeta.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGoldLight },
  };
  sampleMeta.alignment = { vertical: "middle", horizontal: "left", indent: 1, wrapText: true };
  wsExec.getRow(curRow).height = 24;

  curRow++;
  wsExec.getCell(`A${curRow}`).value = "DIMENSI / KATEGORI";
  wsExec.getCell(`B${curRow}`).value = "TEMUAN UTAMA (INSIGHT)";
  wsExec.getCell(`C${curRow}`).value = "DESKRIPSI NARATIF";
  wsExec.getCell(`D${curRow}`).value = "METRIK PENDUKUNG";
  styleHeaderRow(wsExec.getRow(curRow), BRAND_COLORS.deepEmerald);

  curRow++;
  const insightsList = dashboard.intelligence?.insights || [];
  if (insightsList.length > 0) {
    for (const ins of insightsList) {
      const r = wsExec.getRow(curRow);
      r.getCell(1).value = ins.type.toUpperCase().replace(/_/g, " ");
      r.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
      r.getCell(2).value = ins.title;
      r.getCell(2).alignment = { horizontal: "left", vertical: "middle" };
      r.getCell(3).value = ins.description;
      r.getCell(3).alignment = { horizontal: "left", vertical: "middle", wrapText: true };
      r.getCell(4).value = ins.supportingMetric;
      r.getCell(4).alignment = { horizontal: "center", vertical: "middle" };
      styleDataRow(r, curRow % 2 === 0);
      r.height = 30;
      curRow++;
    }
  } else {
    const r = wsExec.getRow(curRow);
    r.getCell(1).value = "-";
    r.getCell(2).value = "Belum ada wawasan bisnis";
    r.getCell(3).value = "Belum ada data sesi konsultasi yang tersimpan.";
    r.getCell(4).value = "N = 0";
    styleDataRow(r);
    curRow++;
  }

  wsExec.getColumn(1).width = 30;
  wsExec.getColumn(2).width = 36;
  wsExec.getColumn(3).width = 46;
  wsExec.getColumn(4).width = 32;

  // ===========================================================================
  // SHEET 2: CONSULTATION SESSIONS
  // ===========================================================================
  const wsSessions = workbook.addWorksheet("Consultation Sessions", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }],
  });

  const sessionCols = [
    { key: "session_id", header: "Session ID", width: 26 },
    { key: "created_at", header: "Created At", width: 20 },
    { key: "completed", header: "Completed", width: 14 },
    { key: "client_platform", header: "Client Platform", width: 18 },
    { key: "gender", header: "Gender", width: 22 },
    { key: "age_range", header: "Age Range", width: 18 },
    { key: "occupation", header: "Occupation", width: 26 },
    { key: "price_range", header: "Price Range", width: 22 },
    { key: "mood", header: "Mood", width: 26 },
    { key: "atmosphere", header: "Atmosphere", width: 26 },
    { key: "scent_families", header: "Scent Families", width: 34 },
    { key: "intensity", header: "Intensity", width: 22 },
    { key: "occasion", header: "Occasion", width: 22 },
    { key: "top_fragrance_id", header: "Top Fragrance ID", width: 22 },
    { key: "top_fragrance_name", header: "Top Fragrance Name", width: 26 },
    { key: "top_fragrance_house", header: "Top Fragrance House", width: 22 },
    { key: "top_match_percent", header: "Top Match Score", width: 16 },
  ];

  wsSessions.columns = sessionCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width,
  }));
  styleHeaderRow(wsSessions.getRow(1));
  wsSessions.autoFilter = { from: "A1", to: `Q${Math.max(2, sanitizedConsultations.length + 1)}` };

  sanitizedConsultations.forEach((row, idx) => {
    const r = wsSessions.addRow({
      ...row,
      top_match_percent: (row.top_match_percent || 0) / 100,
    });
    styleDataRow(r, idx % 2 === 0);
    r.getCell("top_match_percent").numFmt = "0.0%";
    r.getCell("top_match_percent").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("completed").alignment = { horizontal: "center", vertical: "middle" };
  });

  // ===========================================================================
  // SHEET 3: FUNNEL ANALYTICS
  // ===========================================================================
  const wsFunnel = workbook.addWorksheet("Funnel Analytics", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }],
  });

  const funnelCols = [
    { key: "stage", header: "Stage", width: 38 },
    { key: "stage_id", header: "Stage ID", width: 18 },
    { key: "sessions_reached", header: "Sessions Reached", width: 18 },
    { key: "conversion_rate", header: "Conversion Rate", width: 18 },
    { key: "drop_off_count", header: "Drop-off Count", width: 16 },
    { key: "drop_off_rate", header: "Drop-off Rate", width: 16 },
    { key: "answer_rate", header: "Answer Rate", width: 16 },
    { key: "average_duration", header: "Average Duration", width: 20 },
  ];

  wsFunnel.columns = funnelCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width,
  }));
  styleHeaderRow(wsFunnel.getRow(1));
  wsFunnel.autoFilter = { from: "A1", to: `H${Math.max(2, funnelStagesList.length + 1)}` };

  funnelStagesList.forEach((row, idx) => {
    const r = wsFunnel.addRow(row);
    styleDataRow(r, idx % 2 === 0);
    r.getCell("sessions_reached").numFmt = "#,##0";
    r.getCell("conversion_rate").numFmt = "0.0%";
    r.getCell("drop_off_count").numFmt = "#,##0";
    r.getCell("drop_off_rate").numFmt = "0.0%";
    r.getCell("answer_rate").numFmt = "0.0%";
    r.getCell("sessions_reached").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("conversion_rate").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("drop_off_count").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("drop_off_rate").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("answer_rate").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("average_duration").alignment = { horizontal: "center", vertical: "middle" };
  });

  // Funnel Summary Section
  const fnSummaryRowStart = funnelStagesList.length + 3;
  wsFunnel.mergeCells(`A${fnSummaryRowStart}:D${fnSummaryRowStart}`);
  const fnSummaryHeader = wsFunnel.getCell(`A${fnSummaryRowStart}`);
  fnSummaryHeader.value = "FUNNEL PERFORMANCE SUMMARY";
  fnSummaryHeader.font = {
    name: "Segoe UI",
    size: 11,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText },
  };
  fnSummaryHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGold },
  };
  fnSummaryHeader.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsFunnel.getRow(fnSummaryRowStart).height = 24;

  const fObj = dashboard.funnel;
  const funnelSummaryData: Array<[string, unknown, string?]> = [
    ["Total Started", fObj?.started ?? 0, "#,##0"],
    ["Results Viewed", fObj?.resultsViewed ?? 0, "#,##0"],
    ["Completed", fObj?.completed ?? 0, "#,##0"],
    ["Overall Completion Rate", (fObj?.completionRate ?? 100) / 100, "0.0%"],
    [
      "Largest Drop-off Point",
      fObj?.highestDropOffStep
        ? `${fObj.highestDropOffStep.stepLabel} (-${fObj.highestDropOffStep.dropOffCount} sesi, ${fObj.highestDropOffStep.dropOffPercentage}%)`
        : "Tidak terdeteksi drop-off signifikan",
      "@",
    ],
    ["Average Consultation Duration", avgDurText, "@"],
  ];

  let fnRow = fnSummaryRowStart + 1;
  for (const [metric, val, numFmt] of funnelSummaryData) {
    const r = wsFunnel.getRow(fnRow);
    r.getCell(1).value = metric;
    r.getCell(2).value = val as ExcelJS.CellValue;
    if (numFmt && typeof val === "number") r.getCell(2).numFmt = numFmt;
    r.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
    r.getCell(2).alignment = {
      horizontal: typeof val === "number" ? "right" : "left",
      vertical: "middle",
    };
    styleDataRow(r, fnRow % 2 === 0);
    fnRow++;
  }

  // ===========================================================================
  // SHEET 4: FRAGRANCE PERFORMANCE
  // ===========================================================================
  const wsFrag = workbook.addWorksheet("Fragrance Performance", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }],
  });

  const fragCols = [
    { key: "rank", header: "Rank", width: 10 },
    { key: "fragrance_id", header: "Fragrance ID", width: 24 },
    { key: "fragrance_name", header: "Fragrance Name", width: 28 },
    { key: "house", header: "House", width: 22 },
    { key: "total_recommendations", header: "Total Recommendations", width: 22 },
    { key: "rank_1_count", header: "Rank 1 Count", width: 16 },
    { key: "rank_2_count", header: "Rank 2 Count", width: 16 },
    { key: "rank_3_count", header: "Rank 3 Count", width: 16 },
    { key: "rank_1_percentage", header: "Rank 1 Percentage", width: 18 },
    { key: "average_match_score", header: "Average Match Score", width: 20 },
    { key: "minimum_match_score", header: "Minimum Match Score", width: 20 },
    { key: "maximum_match_score", header: "Maximum Match Score", width: 20 },
    { key: "scent_family", header: "Scent Family", width: 24 },
  ];

  wsFrag.columns = fragCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width,
  }));
  styleHeaderRow(wsFrag.getRow(1));
  wsFrag.autoFilter = { from: "A1", to: `M${Math.max(2, fragrancePerformanceList.length + 1)}` };

  fragrancePerformanceList.forEach((row, idx) => {
    const r = wsFrag.addRow(row);
    styleDataRow(r, idx % 2 === 0);
    r.getCell("rank").alignment = { horizontal: "center", vertical: "middle" };
    r.getCell("total_recommendations").numFmt = "#,##0";
    r.getCell("rank_1_count").numFmt = "#,##0";
    r.getCell("rank_2_count").numFmt = "#,##0";
    r.getCell("rank_3_count").numFmt = "#,##0";
    r.getCell("rank_1_percentage").numFmt = "0.0%";
    r.getCell("average_match_score").numFmt = "0.0%";
    r.getCell("minimum_match_score").numFmt = "0.0%";
    r.getCell("maximum_match_score").numFmt = "0.0%";
  });

  // Fragrance Summary Section
  const fragSumRowStart = fragrancePerformanceList.length + 3;
  wsFrag.mergeCells(`A${fragSumRowStart}:E${fragSumRowStart}`);
  const fragSumHead = wsFrag.getCell(`A${fragSumRowStart}`);
  fragSumHead.value = "FRAGRANCE PERFORMANCE HIGHLIGHTS";
  fragSumHead.font = {
    name: "Segoe UI",
    size: 11,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText },
  };
  fragSumHead.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGold },
  };
  fragSumHead.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsFrag.getRow(fragSumRowStart).height = 24;

  const recQ = dashboard.intelligence?.recommendationQuality;
  const fragHighlights: Array<[string, string, string]> = [
    [
      "Highest Performing Fragrance",
      recQ?.highestPerformingFragrance
        ? `${recQ.highestPerformingFragrance.name} (${recQ.highestPerformingFragrance.house})`
        : "-",
      recQ?.highestPerformingFragrance
        ? `${recQ.highestPerformingFragrance.averageMatch}% average match`
        : "-",
    ],
    [
      "Most Frequent Fragrance",
      recQ?.mostFrequentFragrance
        ? `${recQ.mostFrequentFragrance.name} (${recQ.mostFrequentFragrance.house})`
        : "-",
      recQ?.mostFrequentFragrance ? `${recQ.mostFrequentFragrance.count} kali rekomendasi` : "-",
    ],
    [
      "Best Balanced Performer",
      recQ?.bestBalancedFragrance
        ? `${recQ.bestBalancedFragrance.name} (${recQ.bestBalancedFragrance.house})`
        : "-",
      recQ?.bestBalancedFragrance ? `Skor Keseimbangan ${recQ.bestBalancedFragrance.score}` : "-",
    ],
    ["Overall Average Match Score", "-", `${dashboard.kpis.averageMatchScore}%`],
  ];

  let fRow = fragSumRowStart + 1;
  for (const [title, name, detail] of fragHighlights) {
    const r = wsFrag.getRow(fRow);
    r.getCell(1).value = title;
    r.getCell(2).value = name;
    r.getCell(3).value = detail;
    r.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
    r.getCell(2).alignment = { horizontal: "left", vertical: "middle" };
    r.getCell(3).alignment = { horizontal: "left", vertical: "middle" };
    styleDataRow(r, fRow % 2 === 0);
    fRow++;
  }

  // ===========================================================================
  // SHEET 5: CUSTOMER PREFERENCES
  // ===========================================================================
  const wsPrefs = workbook.addWorksheet("Customer Preferences", {
    views: [{ showGridLines: true }],
  });

  wsPrefs.columns = [
    { key: "section", width: 24 },
    { key: "category", width: 34 },
    { key: "count", width: 16 },
    { key: "percentage", width: 16 },
  ];

  wsPrefs.mergeCells("A1:D1");
  const pTitle = wsPrefs.getCell("A1");
  pTitle.value = "ABNA PICKS · AGGREGATED CUSTOMER PREFERENCES";
  pTitle.font = { name: "Segoe UI", size: 14, bold: true, color: { argb: BRAND_COLORS.whiteText } };
  pTitle.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_COLORS.deepEmerald } };
  pTitle.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsPrefs.getRow(1).height = 32;

  let prefCurRow = 3;

  const prefSections: Array<{
    title: string;
    items: Array<{ label: string; count: number; percentage: number }>;
    note?: string;
  }> = [
    { title: "GENDER", items: dashboard.demographics.gender },
    { title: "AGE GROUP", items: dashboard.demographics.ageRange },
    { title: "OCCUPATION", items: dashboard.demographics.occupation },
    { title: "BUDGET", items: dashboard.demographics.priceRange },
    { title: "MOOD", items: dashboard.olfactive.moods },
    { title: "ATMOSPHERE", items: dashboard.olfactive.atmospheres },
    { title: "INTENSITY", items: dashboard.olfactive.intensities },
    { title: "OCCASION", items: dashboard.olfactive.occasions },
    {
      title: "SCENT FAMILY",
      items: dashboard.olfactive.scentFamilies,
      note: "Multi-select: Setiap pilihan keluarga aroma dihitung secara independen.",
    },
  ];

  for (const sec of prefSections) {
    wsPrefs.mergeCells(`A${prefCurRow}:D${prefCurRow}`);
    const secCell = wsPrefs.getCell(`A${prefCurRow}`);
    secCell.value = sec.note ? `${sec.title} (${sec.note})` : sec.title;
    secCell.font = {
      name: "Segoe UI",
      size: 11,
      bold: true,
      color: { argb: BRAND_COLORS.whiteText },
    };
    secCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_COLORS.sandGold } };
    secCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
    wsPrefs.getRow(prefCurRow).height = 24;
    prefCurRow++;

    wsPrefs.getCell(`A${prefCurRow}`).value = "SECTION";
    wsPrefs.getCell(`B${prefCurRow}`).value = "CATEGORY";
    wsPrefs.getCell(`C${prefCurRow}`).value = "COUNT";
    wsPrefs.getCell(`D${prefCurRow}`).value = "PERCENTAGE";
    styleHeaderRow(wsPrefs.getRow(prefCurRow), BRAND_COLORS.deepEmerald);
    prefCurRow++;

    if (sec.items.length > 0) {
      for (const it of sec.items) {
        const r = wsPrefs.getRow(prefCurRow);
        r.getCell(1).value = sec.title;
        r.getCell(2).value = it.label;
        r.getCell(3).value = it.count;
        r.getCell(4).value = it.percentage / 100;
        r.getCell(3).numFmt = "#,##0";
        r.getCell(4).numFmt = "0.0%";
        r.getCell(3).alignment = { horizontal: "right", vertical: "middle" };
        r.getCell(4).alignment = { horizontal: "right", vertical: "middle" };
        styleDataRow(r, prefCurRow % 2 === 0);
        prefCurRow++;
      }
    } else {
      const r = wsPrefs.getRow(prefCurRow);
      r.getCell(1).value = sec.title;
      r.getCell(2).value = "Belum ada data";
      r.getCell(3).value = 0;
      r.getCell(4).value = 0;
      styleDataRow(r);
      prefCurRow++;
    }

    prefCurRow++; // Empty gap row
  }

  // ===========================================================================
  // SHEET 6: BUSINESS INTELLIGENCE
  // ===========================================================================
  const wsBi = workbook.addWorksheet("Business Intelligence", {
    views: [{ showGridLines: true }],
  });

  wsBi.columns = [
    { key: "col1", width: 28 },
    { key: "col2", width: 34 },
    { key: "col3", width: 16 },
    { key: "col4", width: 16 },
    { key: "col5", width: 24 },
    { key: "col6", width: 24 },
    { key: "col7", width: 24 },
    { key: "col8", width: 26 },
    { key: "col9", width: 18 },
  ];

  let biRow = 1;

  // 1. PERSONA SNAPSHOT
  wsBi.mergeCells(`A${biRow}:D${biRow}`);
  const snapTitle = wsBi.getCell(`A${biRow}`);
  snapTitle.value = "1. PERSONA SNAPSHOT (DOMINANT ATTRIBUTES)";
  snapTitle.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText },
  };
  snapTitle.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.deepEmerald },
  };
  snapTitle.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsBi.getRow(biRow).height = 28;
  biRow++;

  wsBi.getCell(`A${biRow}`).value = "DIMENSION";
  wsBi.getCell(`B${biRow}`).value = "DOMINANT VALUE";
  wsBi.getCell(`C${biRow}`).value = "COUNT";
  wsBi.getCell(`D${biRow}`).value = "PERCENTAGE";
  styleHeaderRow(wsBi.getRow(biRow));
  biRow++;

  const snapshots = dashboard.intelligence?.snapshot || [];
  for (const s of snapshots) {
    const r = wsBi.getRow(biRow);
    r.getCell(1).value = s.label;
    r.getCell(2).value = s.value;
    r.getCell(3).value = s.count;
    r.getCell(4).value = s.percentage / 100;
    r.getCell(3).numFmt = "#,##0";
    r.getCell(4).numFmt = "0.0%";
    r.getCell(3).alignment = { horizontal: "right", vertical: "middle" };
    r.getCell(4).alignment = { horizontal: "right", vertical: "middle" };
    styleDataRow(r, biRow % 2 === 0);
    biRow++;
  }

  // 2. CUSTOMER SEGMENTS
  biRow += 2;
  wsBi.mergeCells(`A${biRow}:I${biRow}`);
  const segTitle = wsBi.getCell(`A${biRow}`);
  segTitle.value = "2. CUSTOMER SEGMENTS (AGE & OCCUPATION CLUSTERS)";
  segTitle.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText },
  };
  segTitle.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_COLORS.sandGold } };
  segTitle.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsBi.getRow(biRow).height = 28;
  biRow++;

  const segHeaders = [
    "Segment",
    "Customer Count",
    "Percentage",
    "Dominant Scent Family",
    "Dominant Budget",
    "Dominant Mood",
    "Dominant Occasion",
    "Top Recommended Fragrance",
    "Average Match Score",
  ];
  segHeaders.forEach((h, i) => {
    wsBi.getCell(biRow, i + 1).value = h;
  });
  styleHeaderRow(wsBi.getRow(biRow), BRAND_COLORS.deepEmerald);
  biRow++;

  const segments = dashboard.intelligence?.segments || [];
  if (segments.length > 0) {
    for (const seg of segments) {
      const r = wsBi.getRow(biRow);
      r.getCell(1).value = seg.label;
      r.getCell(2).value = seg.count;
      r.getCell(3).value = seg.percentage / 100;
      r.getCell(4).value = seg.dominantScentFamily;
      r.getCell(5).value = seg.dominantBudget;
      r.getCell(6).value = seg.dominantMood;
      r.getCell(7).value = seg.dominantOccasion;
      r.getCell(8).value = seg.topFragrance;
      r.getCell(9).value = seg.averageMatchScore / 100;
      r.getCell(2).numFmt = "#,##0";
      r.getCell(3).numFmt = "0.0%";
      r.getCell(9).numFmt = "0.0%";
      r.getCell(2).alignment = { horizontal: "right", vertical: "middle" };
      r.getCell(3).alignment = { horizontal: "right", vertical: "middle" };
      r.getCell(9).alignment = { horizontal: "right", vertical: "middle" };
      styleDataRow(r, biRow % 2 === 0);
      biRow++;
    }
  } else {
    const r = wsBi.getRow(biRow);
    r.getCell(1).value = "Belum ada segmen";
    styleDataRow(r);
    biRow++;
  }

  // 3. CROSS ANALYSIS MATRICES
  biRow += 2;
  wsBi.mergeCells(`A${biRow}:D${biRow}`);
  const crossTitle = wsBi.getCell(`A${biRow}`);
  crossTitle.value = "3. CROSS-ANALYSIS MATRICES";
  crossTitle.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText },
  };
  crossTitle.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.deepEmerald },
  };
  crossTitle.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsBi.getRow(biRow).height = 28;
  biRow++;

  const cross = dashboard.intelligence?.crossAnalysis;
  const crossTables = [
    {
      title: "Age × Scent Family",
      data: cross?.ageByScent,
      pHead: "Age Group",
      sHead: "Scent Family",
    },
    {
      title: "Occupation × Budget",
      data: cross?.occupationByBudget,
      pHead: "Occupation",
      sHead: "Budget Range",
    },
    {
      title: "Mood × Scent Family",
      data: cross?.moodByScent,
      pHead: "Mood Character",
      sHead: "Scent Family",
    },
    {
      title: "Occasion × Scent Family",
      data: cross?.occasionByScent,
      pHead: "Occasion",
      sHead: "Scent Family",
    },
    {
      title: "Budget × Top Fragrance",
      data: cross?.budgetByFragrance,
      pHead: "Budget Range",
      sHead: "Top Fragrance Name",
    },
  ];

  for (const ct of crossTables) {
    wsBi.mergeCells(`A${biRow}:D${biRow}`);
    const tCell = wsBi.getCell(`A${biRow}`);
    tCell.value = `Matrix: ${ct.title}`;
    tCell.font = {
      name: "Segoe UI",
      size: 10.5,
      bold: true,
      color: { argb: BRAND_COLORS.darkText },
    };
    tCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: BRAND_COLORS.sandGoldLight },
    };
    tCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
    wsBi.getRow(biRow).height = 22;
    biRow++;

    wsBi.getCell(`A${biRow}`).value = ct.pHead;
    wsBi.getCell(`B${biRow}`).value = ct.sHead;
    wsBi.getCell(`C${biRow}`).value = "Count";
    wsBi.getCell(`D${biRow}`).value = "Share %";
    styleHeaderRow(wsBi.getRow(biRow), BRAND_COLORS.sandGoldDark);
    biRow++;

    if (ct.data && ct.data.length > 0) {
      for (const item of ct.data) {
        for (const dist of item.distribution) {
          const r = wsBi.getRow(biRow);
          r.getCell(1).value = item.primaryLabel;
          r.getCell(2).value = dist.label;
          r.getCell(3).value = dist.count;
          r.getCell(4).value = dist.percentage / 100;
          r.getCell(3).numFmt = "#,##0";
          r.getCell(4).numFmt = "0.0%";
          r.getCell(3).alignment = { horizontal: "right", vertical: "middle" };
          r.getCell(4).alignment = { horizontal: "right", vertical: "middle" };
          styleDataRow(r, biRow % 2 === 0);
          biRow++;
        }
      }
    } else {
      const r = wsBi.getRow(biRow);
      r.getCell(1).value = "-";
      r.getCell(2).value = "Belum ada data";
      r.getCell(3).value = 0;
      r.getCell(4).value = 0;
      styleDataRow(r);
      biRow++;
    }
    biRow++;
  }

  // ===========================================================================
  // SHEET 7: RECOMMENDATION DETAILS
  // ===========================================================================
  const wsRecDetails = workbook.addWorksheet("Recommendation Details", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }],
  });

  const recDetailCols = [
    { key: "session_id", header: "Session ID", width: 26 },
    { key: "session_created_at", header: "Session Created At", width: 20 },
    { key: "recommendation_rank", header: "Recommendation Rank", width: 20 },
    { key: "fragrance_id", header: "Fragrance ID", width: 24 },
    { key: "fragrance_name", header: "Fragrance Name", width: 26 },
    { key: "house", header: "House", width: 20 },
    { key: "category", header: "Category", width: 16 },
    { key: "match_percentage", header: "Match Percentage", width: 18 },
    { key: "description", header: "Description", width: 40 },
    { key: "why_match", header: "Why Match", width: 40 },
    { key: "aura", header: "Aura", width: 28 },
  ];

  wsRecDetails.columns = recDetailCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width,
  }));
  styleHeaderRow(wsRecDetails.getRow(1));
  wsRecDetails.autoFilter = {
    from: "A1",
    to: `K${Math.max(2, recommendationDetailsList.length + 1)}`,
  };

  recommendationDetailsList.forEach((row, idx) => {
    const r = wsRecDetails.addRow(row);
    styleDataRow(r, idx % 2 === 0);
    r.getCell("recommendation_rank").alignment = { horizontal: "center", vertical: "middle" };
    r.getCell("match_percentage").numFmt = "0.0%";
    r.getCell("match_percentage").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("description").alignment = { horizontal: "left", vertical: "middle", wrapText: true };
    r.getCell("why_match").alignment = { horizontal: "left", vertical: "middle", wrapText: true };
    r.getCell("aura").alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  });

  return workbook;
}

/**
 * Formats a comprehensive Markdown Business Intelligence Report
 */
export function generateBusinessReportMarkdown(
  dashboard: DashboardData,
  filters: ExportFilter,
  dateLabel: string,
): string {
  const k = dashboard.kpis;
  const intel = dashboard.intelligence;
  const f = dashboard.funnel;

  const sampleStatus = intel?.sampleSizeStatus || {
    totalSessions: dashboard.totalCount,
    confidenceLevel:
      dashboard.totalCount < 20
        ? "Limited"
        : dashboard.totalCount < 100
          ? "Emerging"
          : "Established",
    disclaimer:
      dashboard.totalCount < 20
        ? "Data masih dalam tahap pengembangan dan belum dapat digunakan untuk generalisasi pasar secara luas."
        : "Data representatif untuk evaluasi bisnis ritel.",
  };

  const lines: string[] = [
    `# ABNA PICKS · Customer & Fragrance Intelligence Report`,
    `**Generated At:** ${new Date().toISOString().replace("T", " ").substring(0, 19)} UTC`,
    `**Date Range:** ${dateLabel}`,
    `**Sample Size:** N = ${dashboard.totalCount} Sesi Konsultasi`,
    `**Evidence Level:** ${sampleStatus.confidenceLevel}`,
    `\n---\n`,
    `## 1. EXECUTIVE KPIS`,
    `- **Total Consultations:** ${k.totalConsultations} sesi`,
    `- **Consultations Today:** ${k.consultationsToday} sesi`,
    `- **Consultations This Week:** ${k.consultationsThisWeek} sesi`,
    `- **Consultations This Month:** ${k.consultationsThisMonth || 0} sesi`,
    `- **Completion Rate:** ${k.completionRate}%`,
    `- **Average Match Score:** ${k.averageMatchScore}%`,
    `- **Most Recommended Fragrance:** ${k.mostRecommendedFragrance || "Belum ada data"}`,
    `- **Most Popular Scent Family:** ${k.mostPopularScentFamily || "Belum ada data"}`,
    `- **Average Consultation Duration:** ${
      f?.averageDurationSeconds
        ? `${Math.floor(f.averageDurationSeconds / 60)}m ${Math.round(f.averageDurationSeconds % 60)}s`
        : "N/A"
    }`,
    `\n---\n`,
    `## 2. CUSTOMER PROFILE (DOMINANT PERSONA SNAPSHOT)`,
  ];

  if (intel?.snapshot) {
    intel.snapshot.forEach((s) => {
      lines.push(`- **${s.label}:** ${s.value} (${s.count} sesi, ${s.percentage}%)`);
    });
  }

  lines.push(`\n---\n## 3. FRAGRANCE PERFORMANCE`);
  if (intel?.recommendationQuality) {
    const q = intel.recommendationQuality;
    lines.push(
      `- **Highest Performing Fragrance:** ${q.highestPerformingFragrance ? `${q.highestPerformingFragrance.name} (${q.highestPerformingFragrance.house}) — ${q.highestPerformingFragrance.averageMatch}% average match` : "-"}`,
    );
    lines.push(
      `- **Most Frequent Fragrance:** ${q.mostFrequentFragrance ? `${q.mostFrequentFragrance.name} (${q.mostFrequentFragrance.house}) — ${q.mostFrequentFragrance.count} kali rekomendasi` : "-"}`,
    );
    lines.push(
      `- **Best Balanced Performer:** ${q.bestBalancedFragrance ? `${q.bestBalancedFragrance.name} (${q.bestBalancedFragrance.house}) — Skor Keseimbangan ${q.bestBalancedFragrance.score}` : "-"}`,
    );
    lines.push(`- **Overall Average Match Score:** ${k.averageMatchScore}%`);
  }

  lines.push(`\n---\n## 4. FUNNEL PERFORMANCE`);
  if (f) {
    lines.push(`- **Total Started:** ${f.started} sesi`);
    lines.push(`- **Results Viewed:** ${f.resultsViewed} sesi`);
    lines.push(`- **Completed:** ${f.completed} sesi`);
    lines.push(`- **Overall Completion Rate:** ${f.completionRate}%`);
    if (f.highestDropOffStep) {
      lines.push(
        `- **Largest Drop-off Point:** ${f.highestDropOffStep.stepLabel} (-${f.highestDropOffStep.dropOffCount} sesi, ${f.highestDropOffStep.dropOffPercentage}%)`,
      );
    }
  }

  lines.push(`\n---\n## 5. BUSINESS INTELLIGENCE & KEY FINDINGS`);
  if (intel?.insights && intel.insights.length > 0) {
    intel.insights.forEach((ins, idx) => {
      lines.push(`### ${idx + 1}. ${ins.title}`);
      lines.push(`${ins.description}`);
      lines.push(
        `*Metrik Pendukung: ${ins.supportingMetric} (Level Bukti: ${ins.confidenceLevel})*\n`,
      );
    });
  } else {
    lines.push(`Belum ada temuan analitik signifikan yang tercatat.\n`);
  }

  lines.push(`---\n## 6. DATA LIMITATIONS`);
  lines.push(
    `- **Status Sampel:** N = ${sampleStatus.totalSessions} (${sampleStatus.confidenceLevel})`,
  );
  lines.push(`- **Catatan Metodologi:** ${sampleStatus.disclaimer}`);
  lines.push(`- **Kepatuhan Privasi:** Nol PII (Zero Personally Identifiable Information).`);
  lines.push(
    `\n---\n*Laporan ini dihasilkan secara deterministik oleh ABNA PICKS Intelligence Engine.*`,
  );

  return lines.join("\n");
}
