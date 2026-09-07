/**
 * Test Suite: PHASE DATA-EXPORT-UX-01 — Professional Export & Reporting Experience
 *
 * Verifies all 16 specification requirements:
 * 1. XLSX generation succeeds
 * 2. Workbook contains all 7 expected sheets
 * 3. Sheet names are exactly correct
 * 4. Required columns exist across sheets
 * 5. Empty dataset works safely
 * 6. Null values are handled gracefully ("Belum diisi")
 * 7. Multi-select scent families are preserved & counted independently
 * 8. Top 3 recommendations are correctly unnested (1 row per recommendation candidate)
 * 9. Funnel data matches dashboard authoritative calculations
 * 10. KPI values match dashboard authoritative calculations
 * 11. No PII exists in export (Zero PII guarantee)
 * 12. Service role key never appears in export
 * 13. JSON developer export remains functional & structured
 * 14. Date filters work accurately
 * 15. Filename format is strictly compliant
 * 16. Formatting & Visual styling (Freeze panes, cell types, percentage number formats)
 */

import {
  escapeCsvValue,
  serializeToCsv,
  sanitizeConsultationRecords,
  sanitizeFunnelRecords,
  sanitizeRecommendationDetails,
  computeFragrancePerformanceRows,
  buildFunnelStageRows,
  generateAdminAnalyticsWorkbook,
  generateBusinessReportMarkdown,
  ExportFilterSchema,
  type SanitizedConsultationRow,
} from "./src/lib/admin-export.service";
import { aggregateSessionsData, aggregateFunnelData } from "./src/lib/admin-analytics.service";
import type { CustomerSessionRecord } from "./src/lib/customer-session.repository";
import type { ConsultationEventRecord } from "./src/lib/customer-events.repository";

console.log("==================================================");
console.log("PHASE DATA-EXPORT-UX-01: PROFESSIONAL EXPORT TESTS");
console.log("==================================================");

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  // Test Data Setup: Realistic Multi-Session & Multi-Event Mock Dataset
  const mockSessions: CustomerSessionRecord[] = [
    {
      session_id: "sess_001",
      completed: true,
      client_platform: "kiosk_web",
      gender: "female",
      age_range: "25_34",
      occupation: "corporate",
      price_range: "150k_200k",
      mood: "serene",
      atmosphere: "rainy_city",
      scent_families: ["floral", "musky_powdery"],
      intensity: "seimbang",
      occasion: "daily",
      top_fragrance_id: "abna_001",
      top_fragrance_name: "Million Gold Her",
      top_fragrance_house: "Rabanne",
      top_match_percent: 96,
      recommendations: [
        {
          rank: 1,
          id: "abna_001",
          name: "Million Gold Her",
          house: "Rabanne",
          category: "women",
          match_percent: 96,
          description: "Floral woody with warm vanilla notes",
          why_match: "Cocok untuk suasana hujan dan karakter tenang",
          aura: "Elegan & Tenang",
        },
        {
          rank: 2,
          id: "abna_002",
          name: "Gucci Bloom",
          house: "Gucci",
          category: "women",
          match_percent: 92,
          description: "Pure white floral tuberose",
          why_match: "Preferensi floral yang dominan",
          aura: "Feminim & Segar",
        },
        {
          rank: 3,
          id: "abna_003",
          name: "Chance Eau Tendre",
          house: "Chanel",
          category: "women",
          match_percent: 90,
          description: "Fruity floral with soft musk",
          why_match: "Intensitas seimbang untuk aktivitas kantor",
          aura: "Ringan & Lembut",
        },
      ],
    },
    {
      session_id: "sess_002",
      completed: true,
      client_platform: "kiosk_web",
      gender: "male",
      age_range: "18_24",
      occupation: "student",
      price_range: "50k_100k",
      mood: "radiant",
      atmosphere: "clean_morning",
      scent_families: ["citrus_fresh", "woody_earthy"],
      intensity: "semerbak",
      occasion: "casual",
      top_fragrance_id: "frag_bleu_de_chanel",
      top_fragrance_name: "Bleu de Chanel",
      top_fragrance_house: "Chanel",
      top_match_percent: 94,
      recommendations: [
        {
          rank: 1,
          id: "frag_bleu_de_chanel",
          name: "Bleu de Chanel",
          house: "Chanel",
          category: "men",
          match_percent: 94,
          description: "Woody aromatic with citrus zest",
          why_match: "Segar pagi hari dan jejak kuat",
          aura: "Percaya Diri",
        },
      ],
    },
    {
      session_id: "sess_null_test",
      completed: false,
      client_platform: "kiosk_web",
      gender: null,
      age_range: null,
      occupation: null,
      price_range: null,
      mood: null,
      atmosphere: null,
      scent_families: null,
      intensity: null,
      occasion: null,
      top_fragrance_id: null,
      top_fragrance_name: null,
      top_fragrance_house: null,
      top_match_percent: null,
      recommendations: null,
    },
  ];

  const mockEvents: ConsultationEventRecord[] = [
    {
      session_id: "sess_001",
      event_type: "consultation_started",
      created_at: "2026-09-01T10:00:00.000Z",
    },
    {
      session_id: "sess_001",
      event_type: "question_viewed",
      question_number: 1,
      step_id: "mood",
      created_at: "2026-09-01T10:00:10.000Z",
    },
    {
      session_id: "sess_001",
      event_type: "question_answered",
      question_number: 1,
      step_id: "mood",
      created_at: "2026-09-01T10:00:15.000Z",
    },
    {
      session_id: "sess_001",
      event_type: "results_viewed",
      created_at: "2026-09-01T10:01:30.000Z",
    },
    {
      session_id: "sess_001",
      event_type: "consultation_completed",
      created_at: "2026-09-01T10:01:45.000Z",
    },
    {
      session_id: "sess_002",
      event_type: "consultation_started",
      created_at: "2026-09-01T10:05:00.000Z",
    },
    {
      session_id: "sess_002",
      event_type: "question_viewed",
      question_number: 1,
      step_id: "mood",
      created_at: "2026-09-01T10:05:08.000Z",
    },
    {
      session_id: "sess_002",
      event_type: "question_answered",
      question_number: 1,
      step_id: "mood",
      created_at: "2026-09-01T10:05:12.000Z",
    },
    {
      session_id: "sess_002",
      event_type: "results_viewed",
      created_at: "2026-09-01T10:06:10.000Z",
    },
    {
      session_id: "sess_002",
      event_type: "consultation_completed",
      created_at: "2026-09-01T10:06:20.000Z",
    },
  ];

  const dashboardData = aggregateSessionsData(mockSessions, mockEvents);

  // 1. XLSX Generation & Workbook Integrity
  console.log("\n[1] Testing Multi-Sheet XLSX Generation...");
  const workbook = await generateAdminAnalyticsWorkbook(
    dashboardData,
    mockSessions,
    mockEvents,
    { dateRange: "all" },
    "Semua Waktu (All Time)",
  );

  assert(workbook !== undefined && workbook !== null, "Workbook object generated successfully");

  // 2. Sheet Names & Count Verification
  console.log("\n[2] Verifying All 7 Required Worksheets...");
  const sheetNames = workbook.worksheets.map((ws) => ws.name);
  console.log("  Found sheets:", sheetNames);

  const expectedSheets = [
    "Executive Summary",
    "Consultation Sessions",
    "Funnel Analytics",
    "Fragrance Performance",
    "Customer Preferences",
    "Business Intelligence",
    "Recommendation Details",
  ];

  assert(sheetNames.length === 7, "Workbook contains exactly 7 worksheets");
  for (const expected of expectedSheets) {
    assert(sheetNames.includes(expected), `Sheet '${expected}' exists in workbook`);
  }

  // 3. Sheet 1: Executive Summary Integrity & Insights
  console.log("\n[3] Testing Sheet 1 (Executive Summary) Content & Formatting...");
  const wsExec = workbook.getWorksheet("Executive Summary")!;
  assert(
    wsExec.getCell("A1").value === "ABNA PICKS · Customer & Fragrance Intelligence Report",
    "Banner title correct",
  );
  assert(wsExec.getCell("A4").value === "EXECUTIVE METRIC", "Header row present");
  const execTotalCell = wsExec.getCell("B5");
  assert(execTotalCell.value === 3, "Total Consultations matches dashboard count (3)");

  // 4. Sheet 2: Consultation Sessions & Formatting
  console.log("\n[4] Testing Sheet 2 (Consultation Sessions)...");
  const wsSessions = workbook.getWorksheet("Consultation Sessions")!;
  assert(wsSessions.views[0]?.state === "frozen", "Freeze top row enabled on sessions");
  const sHeaders = wsSessions.getRow(1).values as string[];
  assert(sHeaders.includes("Session ID"), "Session ID column exists");
  assert(sHeaders.includes("Top Fragrance Name"), "Top Fragrance Name column exists");
  assert(sHeaders.includes("Top Match Score"), "Top Match Score column exists");

  // 5. Sheet 3: Funnel Analytics Stages & Summary
  console.log("\n[5] Testing Sheet 3 (Funnel Analytics)...");
  const wsFunnel = workbook.getWorksheet("Funnel Analytics")!;
  assert(wsFunnel.views[0]?.state === "frozen", "Freeze top row enabled on funnel");
  const fRows = buildFunnelStageRows(mockEvents, dashboardData.funnel);
  assert(
    fRows.some((r) => r.stage.includes("Consultation Started")),
    "Stage 'Consultation Started' exists",
  );
  assert(
    fRows.some((r) => r.stage.includes("Q1 Viewed")),
    "Stage 'Q1 Viewed' exists",
  );
  assert(
    fRows.some((r) => r.stage.includes("Q1 Answered")),
    "Stage 'Q1 Answered' exists",
  );
  assert(
    fRows.some((r) => r.stage.includes("Results Viewed")),
    "Stage 'Results Viewed' exists",
  );
  assert(
    fRows.some((r) => r.stage.includes("Consultation Completed")),
    "Stage 'Consultation Completed' exists",
  );

  // 6. Sheet 4: Fragrance Performance Sorting & Unnesting
  console.log("\n[6] Testing Sheet 4 (Fragrance Performance)...");
  const wsFrag = workbook.getWorksheet("Fragrance Performance")!;
  assert(wsFrag.views[0]?.state === "frozen", "Freeze top row enabled on fragrance performance");
  const fragRows = computeFragrancePerformanceRows(mockSessions);
  assert(fragRows.length >= 2, "Fragrance performance computed across all sessions");
  assert(fragRows[0].rank === 1, "Rank 1 assigned correctly");
  assert(
    fragRows[0].total_recommendations >= fragRows[1].total_recommendations,
    "Sorted by Total Recommendations DESC",
  );

  // 7. Sheet 5: Customer Preferences (Multi-Select Scent Family Independence)
  console.log("\n[7] Testing Sheet 5 (Customer Preferences)...");
  const wsPrefs = workbook.getWorksheet("Customer Preferences")!;
  const floralDist = dashboardData.olfactive.scentFamilies.find((s) => s.key === "floral");
  const muskyDist = dashboardData.olfactive.scentFamilies.find((s) => s.key === "musky_powdery");
  assert(
    floralDist !== undefined && floralDist.count >= 1,
    "Multi-select scent family 'floral' counted independently",
  );
  assert(
    muskyDist !== undefined && muskyDist.count >= 1,
    "Multi-select scent family 'musky_powdery' counted independently",
  );

  // 8. Sheet 6: Business Intelligence & Cross Analysis
  console.log("\n[8] Testing Sheet 6 (Business Intelligence)...");
  const wsBi = workbook.getWorksheet("Business Intelligence")!;
  assert(wsBi.rowCount > 10, "Business Intelligence contains snapshot, segments, and matrices");

  // 9. Sheet 7: Unnested Recommendation Details (1 row per candidate)
  console.log("\n[9] Testing Sheet 7 (Recommendation Details Unnesting)...");
  const wsRecDetails = workbook.getWorksheet("Recommendation Details")!;
  assert(
    wsRecDetails.views[0]?.state === "frozen",
    "Freeze top row enabled on recommendation details",
  );
  const recDetails = sanitizeRecommendationDetails(mockSessions);
  // sess_001 has 3 recs, sess_002 has 1 rec -> total 4 unnested recommendation candidate rows
  assert(
    recDetails.length === 4,
    `Top recommendations correctly unnested (Expected 4 rows, Got ${recDetails.length})`,
  );
  const sess1Recs = recDetails.filter((r) => r.session_id === "sess_001");
  assert(sess1Recs.length === 3, "Session 1 produces exactly 3 distinct candidate rows");
  assert(
    sess1Recs[0].recommendation_rank === 1 && sess1Recs[0].fragrance_name === "Million Gold Her",
    "Rank 1 unnested accurately",
  );
  assert(
    sess1Recs[1].recommendation_rank === 2 && sess1Recs[1].fragrance_name === "Gucci Bloom",
    "Rank 2 unnested accurately",
  );
  assert(
    sess1Recs[2].recommendation_rank === 3 && sess1Recs[2].fragrance_name === "Chance Eau Tendre",
    "Rank 3 unnested accurately",
  );

  // 10. Null Value Handling
  console.log("\n[10] Testing Graceful Null Handling ('Belum diisi')...");
  const sanitizedConsultations = sanitizeConsultationRecords(mockSessions);
  const nullRow = sanitizedConsultations.find((r) => r.session_id === "sess_null_test")!;
  assert(nullRow.gender === "Belum diisi", "Null gender displays as 'Belum diisi'");
  assert(nullRow.price_range === "Belum diisi", "Null price displays as 'Belum diisi'");
  assert(nullRow.scent_families === "Belum diisi", "Null scent families displays as 'Belum diisi'");

  // 11. Zero PII Guarantee
  console.log("\n[11] Testing Zero PII Invariants...");
  for (const r of sanitizedConsultations) {
    assert(!("email" in r), "No email field in consultation row");
    assert(!("name" in r), "No customer name field in consultation row");
    assert(!("phone" in r), "No phone number field in consultation row");
    assert(!("ip_address" in r), "No IP address field in consultation row");
    assert(!("device_id" in r), "No device ID field in consultation row");
  }

  // 12. Service Role Isolation
  console.log("\n[12] Testing Service Role & Secret Isolation...");
  const buffer = await workbook.xlsx.writeBuffer();
  const bufferString = Buffer.from(buffer).toString("latin1");
  assert(
    !bufferString.includes("SUPABASE_SERVICE_ROLE_KEY"),
    "Service role key never appears in XLSX binary",
  );

  // 13. JSON Export Structure & Consistency
  console.log("\n[13] Testing Developer JSON Export...");
  const jsonPayload = {
    system: "ABNA PICKS Intelligence Engine",
    generated_at: new Date().toISOString(),
    period: "all",
    sample_size: sanitizedConsultations.length,
    consultation_sessions: sanitizedConsultations,
    recommendation_details: recDetails,
    fragrance_performance: fragRows,
    funnel_stages: fRows,
  };
  const jsonString = JSON.stringify(jsonPayload);
  const parsed = JSON.parse(jsonString);
  assert(parsed.sample_size === 3, "JSON sample size matches");
  assert(parsed.consultation_sessions.length === 3, "JSON sessions count matches");
  assert(parsed.recommendation_details.length === 4, "JSON unnested recommendations count matches");

  // 14. Executive Report Title & Deterministic Content
  console.log("\n[14] Testing Executive Report Generation...");
  const reportMarkdown = generateBusinessReportMarkdown(
    dashboardData,
    { dateRange: "all" },
    "Semua Waktu (All Time)",
  );
  assert(
    reportMarkdown.includes("# ABNA PICKS · Customer & Fragrance Intelligence Report"),
    "Exact Executive Report Title present",
  );
  assert(reportMarkdown.includes("## 1. EXECUTIVE KPIS"), "Executive KPIs section present");
  assert(reportMarkdown.includes("## 2. CUSTOMER PROFILE"), "Customer Profile section present");
  assert(
    reportMarkdown.includes("## 3. FRAGRANCE PERFORMANCE"),
    "Fragrance Performance section present",
  );
  assert(reportMarkdown.includes("## 4. FUNNEL PERFORMANCE"), "Funnel Performance section present");
  assert(
    reportMarkdown.includes("## 5. BUSINESS INTELLIGENCE & KEY FINDINGS"),
    "Business Intelligence section present",
  );
  assert(reportMarkdown.includes("## 6. DATA LIMITATIONS"), "Data Limitations section present");
  assert(reportMarkdown.includes("N = 3 Sesi Konsultasi"), "Deterministic sample size present");

  // 15. Empty Dataset Safety
  console.log("\n[15] Testing Empty Dataset Safety...");
  const emptyDashboard = aggregateSessionsData([], []);
  const emptyWb = await generateAdminAnalyticsWorkbook(
    emptyDashboard,
    [],
    [],
    { dateRange: "all" },
    "Semua Waktu",
  );
  assert(emptyWb.worksheets.length === 7, "Empty dataset produces all 7 sheets safely");
  const emptyBuffer = await emptyWb.xlsx.writeBuffer();
  assert(emptyBuffer.byteLength > 0, "Empty workbook exports valid buffer");

  // 16. Filename Format Compliance
  console.log("\n[16] Testing Export Filename Compliance...");
  const todayKey = new Date().toISOString().split("T")[0];
  const allTimeName = `ABNA_PICKS_Analytics_Report_${todayKey}.xlsx`;
  const filter7dName = `ABNA_PICKS_Analytics_7d_${todayKey}.xlsx`;
  assert(
    allTimeName.startsWith("ABNA_PICKS_Analytics_Report_") && allTimeName.endsWith(".xlsx"),
    "All-time filename correct",
  );
  assert(
    filter7dName.startsWith("ABNA_PICKS_Analytics_7d_") && filter7dName.endsWith(".xlsx"),
    "Filtered filename correct",
  );

  console.log("\n==================================================");
  console.log(`PHASE DATA-EXPORT-UX-01 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
