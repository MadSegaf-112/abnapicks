/**
 * Phase DATA-EXPORT-UX-01 — Admin Server Functions
 *
 * Provides typed TanStack Start server functions for the Admin Dashboard,
 * Multi-Sheet Excel (.xlsx) Generation, Developer JSON Export, and Executive Intelligence Reports.
 *
 * Invariants:
 * 1. Executes strictly server-side.
 * 2. Authenticated admin verification & Zod filter validation.
 * 3. Never exposes service role key, raw DB credentials, or PII.
 * 4. Authoritative source of metrics is the unified analytics engine.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  getDashboardAnalytics,
  getSessionDetail,
  deleteCustomerSession,
  aggregateSessionsData,
  DashboardDataSchema,
} from "./admin-analytics.service";
import {
  CustomerSessionRecordSchema,
  type CustomerSessionRecord,
} from "./customer-session.repository";
import {
  ExportFilterSchema,
  sanitizeConsultationRecords,
  sanitizeFunnelRecords,
  serializeToCsv,
  generateAdminAnalyticsWorkbook,
  generateBusinessReportMarkdown,
  computeFragrancePerformanceRows,
  sanitizeRecommendationDetails,
  buildFunnelStageRows,
  type SanitizedConsultationRow,
  type SanitizedFunnelRow,
} from "./admin-export.service";
import { getConsultationEvents, type ConsultationEventRecord } from "./customer-events.repository";
import { getSupabaseServerClient } from "./supabase.server";

const AnalyticsFilterSchema = z.object({
  gender: z.string().optional(),
  ageRange: z.string().optional(),
  occupation: z.string().optional(),
  priceRange: z.string().optional(),
  topFragrance: z.string().optional(),
  dateRange: z.string().optional(),
});

export const getAdminDashboardData = createServerFn({ method: "POST" })
  .validator((data: unknown) => AnalyticsFilterSchema.parse(data || {}))
  .handler(async ({ data }) => {
    const dashboardData = await getDashboardAnalytics(data);
    return DashboardDataSchema.parse(dashboardData);
  });

export const getAdminSessionDetail = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ sessionId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const session = await getSessionDetail(data.sessionId);
    if (!session) return null;
    return CustomerSessionRecordSchema.parse(session);
  });

export const deleteAdminSession = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ sessionId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    return await deleteCustomerSession(data.sessionId);
  });

/**
 * Server Function: PRIMARY EXPORT FORMAT — Multi-Sheet Professional Excel Report (.xlsx)
 */
export const exportAdminAnalyticsXlsxServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        filters: ExportFilterSchema,
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    let records: CustomerSessionRecord[] = [];

    let startDate: string | undefined;
    if (data.filters.dateRange && data.filters.dateRange !== "all") {
      const now = new Date();
      if (data.filters.dateRange === "today") {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      } else if (data.filters.dateRange === "7d") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      } else if (data.filters.dateRange === "30d") {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      }
    }

    if (supabase) {
      try {
        let query = supabase
          .from("customer_sessions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5000);

        if (data.filters.gender) query = query.eq("gender", data.filters.gender);
        if (data.filters.ageRange) query = query.eq("age_range", data.filters.ageRange);
        if (data.filters.occupation) query = query.eq("occupation", data.filters.occupation);
        if (data.filters.priceRange) query = query.eq("price_range", data.filters.priceRange);
        if (data.filters.topFragrance)
          query = query.ilike("top_fragrance_name", `%${data.filters.topFragrance}%`);

        if (startDate) {
          query = query.gte("created_at", startDate);
        }

        const { data: dbData, error } = await query;
        if (!error && Array.isArray(dbData)) {
          records = dbData as CustomerSessionRecord[];
        }
      } catch (err) {
        console.warn("[AdminExportXlsx] Supabase fetch error:", err);
      }
    }

    const events: ConsultationEventRecord[] = await getConsultationEvents(
      startDate ? { startDate } : undefined,
    );
    const dashboardData = aggregateSessionsData(records, events);

    const dateLabelMap: Record<string, string> = {
      today: "Hari Ini (24 Jam Terakhir)",
      "7d": "7 Hari Terakhir",
      "30d": "30 Hari Terakhir",
      all: "Semua Waktu (All Time)",
    };
    const dateLabel = dateLabelMap[data.filters.dateRange || "all"] || "Semua Waktu";

    const workbook = await generateAdminAnalyticsWorkbook(
      dashboardData,
      records,
      events,
      data.filters,
      dateLabel,
    );

    const dateKey = new Date().toISOString().split("T")[0];
    let filename = `ABNA_PICKS_Analytics_Report_${dateKey}.xlsx`;
    if (data.filters.dateRange && data.filters.dateRange !== "all") {
      filename = `ABNA_PICKS_Analytics_${data.filters.dateRange}_${dateKey}.xlsx`;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return {
      success: true,
      filename,
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      base64,
      sampleSize: records.length,
      dateLabel,
    };
  });

/**
 * Server Function: SECONDARY EXPORT FORMAT — Developer / System JSON Data
 */
export const exportAdminAnalyticsJsonServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        filters: ExportFilterSchema,
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    let records: CustomerSessionRecord[] = [];

    let startDate: string | undefined;
    if (data.filters.dateRange && data.filters.dateRange !== "all") {
      const now = new Date();
      if (data.filters.dateRange === "today") {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      } else if (data.filters.dateRange === "7d") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      } else if (data.filters.dateRange === "30d") {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      }
    }

    if (supabase) {
      try {
        let query = supabase
          .from("customer_sessions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5000);

        if (data.filters.gender) query = query.eq("gender", data.filters.gender);
        if (data.filters.ageRange) query = query.eq("age_range", data.filters.ageRange);
        if (data.filters.occupation) query = query.eq("occupation", data.filters.occupation);
        if (data.filters.priceRange) query = query.eq("price_range", data.filters.priceRange);
        if (data.filters.topFragrance)
          query = query.ilike("top_fragrance_name", `%${data.filters.topFragrance}%`);

        if (startDate) {
          query = query.gte("created_at", startDate);
        }

        const { data: dbData, error } = await query;
        if (!error && Array.isArray(dbData)) {
          records = dbData as CustomerSessionRecord[];
        }
      } catch (err) {
        console.warn("[AdminExportJson] Supabase fetch error:", err);
      }
    }

    const events = await getConsultationEvents(startDate ? { startDate } : undefined);
    const dashboardData = aggregateSessionsData(records, events);
    const sanitizedSessions = sanitizeConsultationRecords(records);
    const fragrancePerformance = computeFragrancePerformanceRows(records);
    const recommendationDetails = sanitizeRecommendationDetails(records);
    const funnelStages = buildFunnelStageRows(events, dashboardData.funnel);

    const dateKey = new Date().toISOString().split("T")[0];
    const filename = `ABNA_PICKS_Developer_Data_${data.filters.dateRange || "all"}_${dateKey}.json`;

    const payload = {
      system: "ABNA PICKS Intelligence Engine",
      report_title: "ABNA PICKS Developer & System Intelligence Dataset",
      generated_at: new Date().toISOString(),
      period: data.filters.dateRange || "all",
      filters: data.filters,
      sample_size: records.length,
      evidence_level: dashboardData.intelligence?.sampleSizeStatus.confidenceLevel || "Limited",
      kpis: dashboardData.kpis,
      persona_snapshot: dashboardData.intelligence?.snapshot || [],
      customer_segments: dashboardData.intelligence?.segments || [],
      cross_analysis: dashboardData.intelligence?.crossAnalysis,
      funnel_summary: dashboardData.funnel,
      funnel_stages: funnelStages,
      fragrance_performance: fragrancePerformance,
      recommendation_details: recommendationDetails,
      consultation_sessions: sanitizedSessions,
    };

    return {
      success: true,
      filename,
      mimeType: "application/json",
      content: JSON.stringify(payload, null, 2),
      sampleSize: records.length,
    };
  });

/**
 * Server Function: Export Consultation Sessions (CSV or JSON - Backward Compatibility)
 */
export const exportConsultationsServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        format: z.enum(["csv", "json"]),
        filters: ExportFilterSchema,
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    let records: CustomerSessionRecord[] = [];

    if (supabase) {
      try {
        let query = supabase
          .from("customer_sessions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5000);

        if (data.filters.gender) query = query.eq("gender", data.filters.gender);
        if (data.filters.ageRange) query = query.eq("age_range", data.filters.ageRange);
        if (data.filters.occupation) query = query.eq("occupation", data.filters.occupation);
        if (data.filters.priceRange) query = query.eq("price_range", data.filters.priceRange);
        if (data.filters.topFragrance)
          query = query.ilike("top_fragrance_name", `%${data.filters.topFragrance}%`);

        if (data.filters.dateRange && data.filters.dateRange !== "all") {
          const now = new Date();
          if (data.filters.dateRange === "today") {
            const startOfToday = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
            ).toISOString();
            query = query.gte("created_at", startOfToday);
          } else if (data.filters.dateRange === "7d") {
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
            query = query.gte("created_at", sevenDaysAgo);
          } else if (data.filters.dateRange === "30d") {
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
            query = query.gte("created_at", thirtyDaysAgo);
          }
        }

        const { data: dbData, error } = await query;
        if (!error && Array.isArray(dbData)) {
          records = dbData as CustomerSessionRecord[];
        }
      } catch (err) {
        console.warn("[AdminExport] Supabase fetch error:", err);
      }
    }

    const sanitized = sanitizeConsultationRecords(records);

    if (data.format === "json") {
      return {
        success: true,
        filename: `abna-consultations-${new Date().toISOString().split("T")[0]}.json`,
        mimeType: "application/json",
        content: JSON.stringify(
          {
            generated_at: new Date().toISOString(),
            period: data.filters.dateRange || "all",
            filters: data.filters,
            sample_size: sanitized.length,
            data: sanitized,
          },
          null,
          2,
        ),
      };
    }

    const csvHeaders: Array<{ key: keyof SanitizedConsultationRow; label: string }> = [
      { key: "session_id", label: "Session ID" },
      { key: "created_at", label: "Waktu Konsultasi" },
      { key: "client_platform", label: "Platform" },
      { key: "gender", label: "Gender" },
      { key: "age_range", label: "Range Usia" },
      { key: "occupation", label: "Aktivitas / Pekerjaan" },
      { key: "price_range", label: "Budget 30ml" },
      { key: "mood", label: "Karakter Aroma" },
      { key: "atmosphere", label: "Suasana Aroma" },
      { key: "scent_families", label: "Keluarga Aroma" },
      { key: "intensity", label: "Intensitas" },
      { key: "occasion", label: "Momen Penggunaan" },
      { key: "top_fragrance_name", label: "Parfum Pilihan Teratas" },
      { key: "top_fragrance_house", label: "Brand / House" },
      { key: "top_match_percent", label: "Match Score (%)" },
      { key: "recommendation_1", label: "Rekomendasi 1" },
      { key: "recommendation_1_match", label: "Match 1" },
      { key: "recommendation_2", label: "Rekomendasi 2" },
      { key: "recommendation_2_match", label: "Match 2" },
      { key: "recommendation_3", label: "Rekomendasi 3" },
      { key: "recommendation_3_match", label: "Match 3" },
    ];

    const csvContent = serializeToCsv(sanitized, csvHeaders);
    return {
      success: true,
      filename: `abna-consultations-${new Date().toISOString().split("T")[0]}.csv`,
      mimeType: "text/csv;charset=utf-8;",
      content: csvContent,
    };
  });

/**
 * Server Function: Export Funnel Events (CSV - Backward Compatibility)
 */
export const exportFunnelEventsServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        filters: ExportFilterSchema,
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    let startDate: string | undefined;
    if (data.filters.dateRange && data.filters.dateRange !== "all") {
      const now = new Date();
      if (data.filters.dateRange === "today") {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      } else if (data.filters.dateRange === "7d") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      } else if (data.filters.dateRange === "30d") {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      }
    }

    const events = await getConsultationEvents(startDate ? { startDate } : undefined);
    const sanitized = sanitizeFunnelRecords(events);

    const headers: Array<{ key: keyof SanitizedFunnelRow; label: string }> = [
      { key: "session_id", label: "Session ID" },
      { key: "event_type", label: "Event Type" },
      { key: "question_number", label: "Question Number" },
      { key: "step_id", label: "Step ID" },
      { key: "client_platform", label: "Platform" },
      { key: "created_at", label: "Timestamp" },
    ];

    const csvContent = serializeToCsv(sanitized, headers);
    return {
      success: true,
      filename: `abna-funnel-events-${new Date().toISOString().split("T")[0]}.csv`,
      mimeType: "text/csv;charset=utf-8;",
      content: csvContent,
    };
  });

/**
 * Server Function: Generate Business Intelligence Report (Markdown & Executive Summary)
 */
export const generateBusinessReportServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        filters: ExportFilterSchema,
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const dashboardData = await getDashboardAnalytics(data.filters);
    const dateLabelMap: Record<string, string> = {
      today: "Hari Ini (24 Jam Terakhir)",
      "7d": "7 Hari Terakhir",
      "30d": "30 Hari Terakhir",
      all: "Semua Waktu (All Time)",
    };
    const dateLabel = dateLabelMap[data.filters.dateRange || "all"] || "Semua Waktu";

    const reportMarkdown = generateBusinessReportMarkdown(dashboardData, data.filters, dateLabel);

    return {
      success: true,
      filename: `ABNA_PICKS_Intelligence_Report_${new Date().toISOString().split("T")[0]}.md`,
      dateLabel,
      reportMarkdown,
      sampleSize: dashboardData.totalCount,
    };
  });
