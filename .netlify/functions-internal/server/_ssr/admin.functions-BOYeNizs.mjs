import { c as createServerRpc } from "./createServerRpc-zuO7hwAA.mjs";
import { a as createServerFn } from "./server-BpnMBpJF.mjs";
import { g as getDashboardAnalytics, D as DashboardDataSchema, a as getSessionDetail, d as deleteCustomerSession, E as ExportFilterSchema, b as aggregateSessionsData, c as generateAdminAnalyticsWorkbook, s as sanitizeConsultationRecords, e as computeFragrancePerformanceRows, f as sanitizeRecommendationDetails, h as buildFunnelStageRows, i as serializeToCsv, j as sanitizeFunnelRecords, k as generateBusinessReportMarkdown } from "./admin-export.service-Bd5WNCvk.mjs";
import { C as CustomerSessionRecordSchema } from "./customer-session.repository-5y5vqMvQ.mjs";
import { g as getConsultationEvents } from "./customer-events.repository-CIBRJUOG.mjs";
import { g as getSupabaseServerClient } from "./supabase.server-B40vTsTo.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/exceljs.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./fragrances-LdP9CCTC.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:process";
import "fs";
import "../_libs/jszip.mjs";
import "../_libs/readable-stream.mjs";
import "events";
import "node:string_decoder";
import "../_libs/process-nextick-args.mjs";
import "../_libs/isarray.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/core-util-is.mjs";
import "../_libs/inherits.mjs";
import "../_libs/util-deprecate.mjs";
import "../_libs/lie.mjs";
import "../_libs/immediate.mjs";
import "../_libs/setimmediate.mjs";
import "../_libs/pako.mjs";
import "../_libs/saxes.mjs";
import "../_libs/xmlchars.mjs";
import "../_libs/uuid.mjs";
import "../_libs/fast-csv.mjs";
import "../_libs/fast-csv__format.mjs";
import "../_libs/lodash.isfunction.mjs";
import "../_libs/lodash.isequal.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isnil.mjs";
import "../_libs/lodash.escaperegexp.mjs";
import "../_libs/@fast-csv/parse.mjs";
import "string_decoder";
import "../_libs/lodash.isundefined.mjs";
import "../_libs/lodash.uniq.mjs";
import "../_libs/lodash.groupby.mjs";
import "../_libs/dayjs.mjs";
import "../_libs/archiver.mjs";
import "../_libs/readdir-glob.mjs";
import "path";
import "../_libs/minimatch.mjs";
import "../_libs/brace-expansion.mjs";
import "../_libs/balanced-match.mjs";
import "../_libs/async.mjs";
import "../_libs/archiver-utils.mjs";
import "../_libs/graceful-fs.mjs";
import "constants";
import "assert";
import "../_libs/lazystream.mjs";
import "../_libs/normalize-path.mjs";
import "../_libs/lodash.defaults.mjs";
import "../_libs/lodash.flatten.mjs";
import "../_libs/lodash.difference.mjs";
import "../_libs/lodash.union.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/glob.mjs";
import "../_libs/fs.realpath.mjs";
import "../_libs/path-is-absolute.mjs";
import "../_libs/inflight.mjs";
import "../_libs/wrappy.mjs";
import "../_libs/once.mjs";
import "../_libs/zip-stream.mjs";
import "../_libs/compress-commons.mjs";
import "../_libs/buffer-crc32.mjs";
import "../_libs/crc32-stream.mjs";
import "zlib";
import "../_libs/crc-32.mjs";
import "../_libs/tar-stream.mjs";
import "../_libs/bl.mjs";
import "../_libs/fs-constants.mjs";
import "../_libs/end-of-stream.mjs";
import "../_libs/unzipper.mjs";
import "../_libs/listenercount.mjs";
import "../_libs/buffer-indexof-polyfill.mjs";
import "../_libs/binary.mjs";
import "../_libs/chainsaw.mjs";
import "../_libs/traverse.mjs";
import "../_libs/buffers.mjs";
import "../_libs/bluebird.mjs";
import "../_libs/duplexer2.mjs";
import "../_libs/fstream.mjs";
import "../_libs/rimraf.mjs";
import "../_libs/mkdirp.mjs";
import "../_libs/big-integer.mjs";
import "../_libs/tmp.mjs";
import "os";
const AnalyticsFilterSchema = objectType({
  gender: stringType().optional(),
  ageRange: stringType().optional(),
  occupation: stringType().optional(),
  priceRange: stringType().optional(),
  topFragrance: stringType().optional(),
  dateRange: stringType().optional()
});
const getAdminDashboardData_createServerFn_handler = createServerRpc({
  id: "be4649669fe84ea5ff2eab0f330d13abd1f2ea3811da3fcc423aaa0e798b456e",
  name: "getAdminDashboardData",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminDashboardData.__executeServer(opts));
const getAdminDashboardData = createServerFn({
  method: "POST"
}).validator((data) => AnalyticsFilterSchema.parse(data || {})).handler(getAdminDashboardData_createServerFn_handler, async ({
  data
}) => {
  const dashboardData = await getDashboardAnalytics(data);
  return DashboardDataSchema.parse(dashboardData);
});
const getAdminSessionDetail_createServerFn_handler = createServerRpc({
  id: "48740b1d48793d3e7c67d22b4c2be026ad1c745bd4afbe4d80df93cecf5ce23c",
  name: "getAdminSessionDetail",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminSessionDetail.__executeServer(opts));
const getAdminSessionDetail = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  sessionId: stringType()
}).parse(data)).handler(getAdminSessionDetail_createServerFn_handler, async ({
  data
}) => {
  const session = await getSessionDetail(data.sessionId);
  if (!session) return null;
  return CustomerSessionRecordSchema.parse(session);
});
const deleteAdminSession_createServerFn_handler = createServerRpc({
  id: "daeff076fbf58c2babd7613ba7a1d596ce239567bbce7726daed52a8460de4d9",
  name: "deleteAdminSession",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteAdminSession.__executeServer(opts));
const deleteAdminSession = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  sessionId: stringType()
}).parse(data)).handler(deleteAdminSession_createServerFn_handler, async ({
  data
}) => {
  return await deleteCustomerSession(data.sessionId);
});
const exportAdminAnalyticsXlsxServerFn_createServerFn_handler = createServerRpc({
  id: "b339fdc7f3e61851444e53e6cb79795baca8afdd3733d95a9189e3df7c93ea91",
  name: "exportAdminAnalyticsXlsxServerFn",
  filename: "src/lib/admin.functions.ts"
}, (opts) => exportAdminAnalyticsXlsxServerFn.__executeServer(opts));
const exportAdminAnalyticsXlsxServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(exportAdminAnalyticsXlsxServerFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  let records = [];
  let startDate;
  if (data.filters.dateRange && data.filters.dateRange !== "all") {
    const now = /* @__PURE__ */ new Date();
    if (data.filters.dateRange === "today") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    } else if (data.filters.dateRange === "7d") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3).toISOString();
    } else if (data.filters.dateRange === "30d") {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3).toISOString();
    }
  }
  if (supabase) {
    try {
      let query = supabase.from("customer_sessions").select("*").order("created_at", {
        ascending: false
      }).limit(5e3);
      if (data.filters.gender) query = query.eq("gender", data.filters.gender);
      if (data.filters.ageRange) query = query.eq("age_range", data.filters.ageRange);
      if (data.filters.occupation) query = query.eq("occupation", data.filters.occupation);
      if (data.filters.priceRange) query = query.eq("price_range", data.filters.priceRange);
      if (data.filters.topFragrance) query = query.ilike("top_fragrance_name", `%${data.filters.topFragrance}%`);
      if (startDate) {
        query = query.gte("created_at", startDate);
      }
      const {
        data: dbData,
        error
      } = await query;
      if (!error && Array.isArray(dbData)) {
        records = dbData;
      }
    } catch (err) {
      console.warn("[AdminExportXlsx] Supabase fetch error:", err);
    }
  }
  const events = await getConsultationEvents(startDate ? {
    startDate
  } : void 0);
  const dashboardData = aggregateSessionsData(records, events);
  const dateLabelMap = {
    today: "Hari Ini (24 Jam Terakhir)",
    "7d": "7 Hari Terakhir",
    "30d": "30 Hari Terakhir",
    all: "Semua Waktu (All Time)"
  };
  const dateLabel = dateLabelMap[data.filters.dateRange || "all"] || "Semua Waktu";
  const workbook = await generateAdminAnalyticsWorkbook(dashboardData, records, events, data.filters, dateLabel);
  const dateKey = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
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
    dateLabel
  };
});
const exportAdminAnalyticsJsonServerFn_createServerFn_handler = createServerRpc({
  id: "da9d7c81de0f2257f62e6ef2119faa9f07da9f06150fd26444e0a917fbee234e",
  name: "exportAdminAnalyticsJsonServerFn",
  filename: "src/lib/admin.functions.ts"
}, (opts) => exportAdminAnalyticsJsonServerFn.__executeServer(opts));
const exportAdminAnalyticsJsonServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(exportAdminAnalyticsJsonServerFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  let records = [];
  let startDate;
  if (data.filters.dateRange && data.filters.dateRange !== "all") {
    const now = /* @__PURE__ */ new Date();
    if (data.filters.dateRange === "today") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    } else if (data.filters.dateRange === "7d") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3).toISOString();
    } else if (data.filters.dateRange === "30d") {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3).toISOString();
    }
  }
  if (supabase) {
    try {
      let query = supabase.from("customer_sessions").select("*").order("created_at", {
        ascending: false
      }).limit(5e3);
      if (data.filters.gender) query = query.eq("gender", data.filters.gender);
      if (data.filters.ageRange) query = query.eq("age_range", data.filters.ageRange);
      if (data.filters.occupation) query = query.eq("occupation", data.filters.occupation);
      if (data.filters.priceRange) query = query.eq("price_range", data.filters.priceRange);
      if (data.filters.topFragrance) query = query.ilike("top_fragrance_name", `%${data.filters.topFragrance}%`);
      if (startDate) {
        query = query.gte("created_at", startDate);
      }
      const {
        data: dbData,
        error
      } = await query;
      if (!error && Array.isArray(dbData)) {
        records = dbData;
      }
    } catch (err) {
      console.warn("[AdminExportJson] Supabase fetch error:", err);
    }
  }
  const events = await getConsultationEvents(startDate ? {
    startDate
  } : void 0);
  const dashboardData = aggregateSessionsData(records, events);
  const sanitizedSessions = sanitizeConsultationRecords(records);
  const fragrancePerformance = computeFragrancePerformanceRows(records);
  const recommendationDetails = sanitizeRecommendationDetails(records);
  const funnelStages = buildFunnelStageRows(events, dashboardData.funnel);
  const dateKey = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const filename = `ABNA_PICKS_Developer_Data_${data.filters.dateRange || "all"}_${dateKey}.json`;
  const payload = {
    system: "ABNA PICKS Intelligence Engine",
    report_title: "ABNA PICKS Developer & System Intelligence Dataset",
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
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
    consultation_sessions: sanitizedSessions
  };
  return {
    success: true,
    filename,
    mimeType: "application/json",
    content: JSON.stringify(payload, null, 2),
    sampleSize: records.length
  };
});
const exportConsultationsServerFn_createServerFn_handler = createServerRpc({
  id: "a1806020a294edecced0787ce7d0013345d596b5ec2d5de68fa7d009f0281409",
  name: "exportConsultationsServerFn",
  filename: "src/lib/admin.functions.ts"
}, (opts) => exportConsultationsServerFn.__executeServer(opts));
const exportConsultationsServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  format: enumType(["csv", "json"]),
  filters: ExportFilterSchema
}).parse(data)).handler(exportConsultationsServerFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  let records = [];
  if (supabase) {
    try {
      let query = supabase.from("customer_sessions").select("*").order("created_at", {
        ascending: false
      }).limit(5e3);
      if (data.filters.gender) query = query.eq("gender", data.filters.gender);
      if (data.filters.ageRange) query = query.eq("age_range", data.filters.ageRange);
      if (data.filters.occupation) query = query.eq("occupation", data.filters.occupation);
      if (data.filters.priceRange) query = query.eq("price_range", data.filters.priceRange);
      if (data.filters.topFragrance) query = query.ilike("top_fragrance_name", `%${data.filters.topFragrance}%`);
      if (data.filters.dateRange && data.filters.dateRange !== "all") {
        const now = /* @__PURE__ */ new Date();
        if (data.filters.dateRange === "today") {
          const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
          query = query.gte("created_at", startOfToday);
        } else if (data.filters.dateRange === "7d") {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3).toISOString();
          query = query.gte("created_at", sevenDaysAgo);
        } else if (data.filters.dateRange === "30d") {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3).toISOString();
          query = query.gte("created_at", thirtyDaysAgo);
        }
      }
      const {
        data: dbData,
        error
      } = await query;
      if (!error && Array.isArray(dbData)) {
        records = dbData;
      }
    } catch (err) {
      console.warn("[AdminExport] Supabase fetch error:", err);
    }
  }
  const sanitized = sanitizeConsultationRecords(records);
  if (data.format === "json") {
    return {
      success: true,
      filename: `abna-consultations-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`,
      mimeType: "application/json",
      content: JSON.stringify({
        generated_at: (/* @__PURE__ */ new Date()).toISOString(),
        period: data.filters.dateRange || "all",
        filters: data.filters,
        sample_size: sanitized.length,
        data: sanitized
      }, null, 2)
    };
  }
  const csvHeaders = [{
    key: "session_id",
    label: "Session ID"
  }, {
    key: "created_at",
    label: "Waktu Konsultasi"
  }, {
    key: "client_platform",
    label: "Platform"
  }, {
    key: "gender",
    label: "Gender"
  }, {
    key: "age_range",
    label: "Range Usia"
  }, {
    key: "occupation",
    label: "Aktivitas / Pekerjaan"
  }, {
    key: "price_range",
    label: "Budget 30ml"
  }, {
    key: "mood",
    label: "Karakter Aroma"
  }, {
    key: "atmosphere",
    label: "Suasana Aroma"
  }, {
    key: "scent_families",
    label: "Keluarga Aroma"
  }, {
    key: "intensity",
    label: "Intensitas"
  }, {
    key: "occasion",
    label: "Momen Penggunaan"
  }, {
    key: "top_fragrance_name",
    label: "Parfum Pilihan Teratas"
  }, {
    key: "top_fragrance_house",
    label: "Brand / House"
  }, {
    key: "top_match_percent",
    label: "Match Score (%)"
  }, {
    key: "recommendation_1",
    label: "Rekomendasi 1"
  }, {
    key: "recommendation_1_match",
    label: "Match 1"
  }, {
    key: "recommendation_2",
    label: "Rekomendasi 2"
  }, {
    key: "recommendation_2_match",
    label: "Match 2"
  }, {
    key: "recommendation_3",
    label: "Rekomendasi 3"
  }, {
    key: "recommendation_3_match",
    label: "Match 3"
  }];
  const csvContent = serializeToCsv(sanitized, csvHeaders);
  return {
    success: true,
    filename: `abna-consultations-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`,
    mimeType: "text/csv;charset=utf-8;",
    content: csvContent
  };
});
const exportFunnelEventsServerFn_createServerFn_handler = createServerRpc({
  id: "4da573d203adc90690a6768972803e2ad028cb051021602a4e144d738806f5cd",
  name: "exportFunnelEventsServerFn",
  filename: "src/lib/admin.functions.ts"
}, (opts) => exportFunnelEventsServerFn.__executeServer(opts));
const exportFunnelEventsServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(exportFunnelEventsServerFn_createServerFn_handler, async ({
  data
}) => {
  let startDate;
  if (data.filters.dateRange && data.filters.dateRange !== "all") {
    const now = /* @__PURE__ */ new Date();
    if (data.filters.dateRange === "today") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    } else if (data.filters.dateRange === "7d") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3).toISOString();
    } else if (data.filters.dateRange === "30d") {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3).toISOString();
    }
  }
  const events = await getConsultationEvents(startDate ? {
    startDate
  } : void 0);
  const sanitized = sanitizeFunnelRecords(events);
  const headers = [{
    key: "session_id",
    label: "Session ID"
  }, {
    key: "event_type",
    label: "Event Type"
  }, {
    key: "question_number",
    label: "Question Number"
  }, {
    key: "step_id",
    label: "Step ID"
  }, {
    key: "client_platform",
    label: "Platform"
  }, {
    key: "created_at",
    label: "Timestamp"
  }];
  const csvContent = serializeToCsv(sanitized, headers);
  return {
    success: true,
    filename: `abna-funnel-events-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`,
    mimeType: "text/csv;charset=utf-8;",
    content: csvContent
  };
});
const generateBusinessReportServerFn_createServerFn_handler = createServerRpc({
  id: "06199dc5d26e2aca9d65f4accdef6d88ed16ee3f1f88219c165967aca0ac6c41",
  name: "generateBusinessReportServerFn",
  filename: "src/lib/admin.functions.ts"
}, (opts) => generateBusinessReportServerFn.__executeServer(opts));
const generateBusinessReportServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(generateBusinessReportServerFn_createServerFn_handler, async ({
  data
}) => {
  const dashboardData = await getDashboardAnalytics(data.filters);
  const dateLabelMap = {
    today: "Hari Ini (24 Jam Terakhir)",
    "7d": "7 Hari Terakhir",
    "30d": "30 Hari Terakhir",
    all: "Semua Waktu (All Time)"
  };
  const dateLabel = dateLabelMap[data.filters.dateRange || "all"] || "Semua Waktu";
  const reportMarkdown = generateBusinessReportMarkdown(dashboardData, data.filters, dateLabel);
  return {
    success: true,
    filename: `ABNA_PICKS_Intelligence_Report_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.md`,
    dateLabel,
    reportMarkdown,
    sampleSize: dashboardData.totalCount
  };
});
export {
  deleteAdminSession_createServerFn_handler,
  exportAdminAnalyticsJsonServerFn_createServerFn_handler,
  exportAdminAnalyticsXlsxServerFn_createServerFn_handler,
  exportConsultationsServerFn_createServerFn_handler,
  exportFunnelEventsServerFn_createServerFn_handler,
  generateBusinessReportServerFn_createServerFn_handler,
  getAdminDashboardData_createServerFn_handler,
  getAdminSessionDetail_createServerFn_handler
};
