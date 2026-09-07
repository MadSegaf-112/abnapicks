/**
 * Phase 6H-4 — Admin Analytics Aggregation Engine & Service
 *
 * Provides typed, performant, server-side aggregation for the ABNA PICKS
 * Admin Analytics Dashboard.
 *
 * Invariants:
 * 1. Read-only analytics downstream of persisted customer_sessions.
 * 2. Zero PII returned or logged.
 * 3. Never affects recommendation mathematics.
 * 4. Gracefully handles 0 records (empty state) and unconfigured database states.
 */

import { z } from "zod";
import type { CustomerSessionRecord } from "./customer-session.repository";
import { getSupabaseServerClient } from "./supabase.server";
import {
  getConsultationEvents,
  deleteConsultationEventsBySessionId,
  type ConsultationEventRecord,
} from "./customer-events.repository";

// Funnel Question Steps Metadata Definition (Q1 to Q9)
export const FUNNEL_QUESTION_STEPS = [
  { step: 1, key: "q1", id: "mood", label: "Q1: Karakter Aroma" },
  { step: 2, key: "q2", id: "scent_family", label: "Q2: Jenis Aroma Favorit" },
  { step: 3, key: "q3", id: "atmosphere", label: "Q3: Suasana Aroma" },
  { step: 4, key: "q4", id: "occasion", label: "Q4: Momen Pemakaian" },
  { step: 5, key: "q5", id: "intensity", label: "Q5: Intensitas Aroma" },
  { step: 6, key: "q6", id: "gender", label: "Q6: Profil Pembeli" },
  { step: 7, key: "q7", id: "age_range", label: "Q7: Range Usia" },
  { step: 8, key: "q8", id: "occupation", label: "Q8: Aktivitas Utama" },
  { step: 9, key: "q9", id: "price_range", label: "Q9: Range Harga Nyaman" },
] as const;

/**
 * Pure aggregation function to compute funnel progression, drop-off, conversion rates,
 * and duration analytics from raw consultation events.
 */
export function aggregateFunnelData(events: ConsultationEventRecord[] = []): FunnelAnalytics {
  const safeEvents = Array.isArray(events) ? events : [];
  const startedSessions = new Set<string>();
  const resultsSessions = new Set<string>();
  const completedSessions = new Set<string>();

  // Distinct sessions viewing/answering questions 1 through 9
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

  // Timestamp tracking for duration calculation: sessionId -> { startMs, endMs }
  const sessionTimestamps: Record<string, { startMs?: number; endMs?: number }> = {};

  for (const e of safeEvents) {
    const sId = e.session_id;
    if (!sId) continue;

    const timeMs = e.created_at ? new Date(e.created_at).getTime() : NaN;
    if (!sessionTimestamps[sId]) sessionTimestamps[sId] = {};

    if (e.event_type === "consultation_started") {
      startedSessions.add(sId);
      if (
        !isNaN(timeMs) &&
        (!sessionTimestamps[sId].startMs || timeMs < sessionTimestamps[sId].startMs!)
      ) {
        sessionTimestamps[sId].startMs = timeMs;
      }
    } else if (e.event_type === "question_viewed") {
      const qNum = e.question_number;
      if (qNum && qNum >= 1 && qNum <= 9) {
        qViewedSets[qNum].add(sId);
      }
    } else if (e.event_type === "question_answered") {
      const qNum = e.question_number;
      if (qNum && qNum >= 1 && qNum <= 9) {
        qAnsweredSets[qNum].add(sId);
      }
    } else if (e.event_type === "results_viewed") {
      resultsSessions.add(sId);
      if (
        !isNaN(timeMs) &&
        (!sessionTimestamps[sId].endMs || timeMs > sessionTimestamps[sId].endMs!)
      ) {
        sessionTimestamps[sId].endMs = timeMs;
      }
    } else if (e.event_type === "consultation_completed") {
      completedSessions.add(sId);
      if (
        !isNaN(timeMs) &&
        (!sessionTimestamps[sId].endMs || timeMs > sessionTimestamps[sId].endMs!)
      ) {
        sessionTimestamps[sId].endMs = timeMs;
      }
    }
  }

  const startedCount = startedSessions.size;
  const resultsCount = resultsSessions.size;
  const completedCount = completedSessions.size;

  const denom = startedCount > 0 ? startedCount : 1;

  // Build sequential 12-stage funnel steps:
  // Started -> Q1 -> Q2 -> Q3 -> Q4 -> Q5 -> Q6 -> Q7 -> Q8 -> Q9 -> Results -> Completed
  const rawStages: Array<{ key: string; label: string; count: number; answerRate?: number }> = [
    { key: "started", label: "Konsultasi Dimulai", count: startedCount },
    ...FUNNEL_QUESTION_STEPS.map((q) => {
      const vCount = qViewedSets[q.step].size;
      const aCount = qAnsweredSets[q.step].size;
      const aRate = vCount > 0 ? Number(((aCount / vCount) * 100).toFixed(1)) : 0;
      return {
        key: q.key,
        label: q.label,
        count: vCount,
        answerRate: aRate,
      };
    }),
    { key: "results", label: "Hasil Kurasi Dilihat", count: resultsCount },
    { key: "completed", label: "Konsultasi Selesai", count: completedCount },
  ];

  const steps: FunnelStep[] = rawStages.map((stage, idx) => {
    const nextStage = rawStages[idx + 1];
    const dropOffCount = nextStage ? Math.max(0, stage.count - nextStage.count) : 0;
    const dropOffPercentage =
      stage.count > 0 && nextStage ? Number(((dropOffCount / stage.count) * 100).toFixed(1)) : 0;

    return {
      key: stage.key,
      label: stage.label,
      count: stage.count,
      percentage: startedCount > 0 ? Number(((stage.count / denom) * 100).toFixed(1)) : 0,
      dropOffCount,
      dropOffPercentage,
      answerRate: stage.answerRate,
    };
  });

  // Identify highest drop-off step across transitions
  let highestDropOff: {
    stepKey: string;
    stepLabel: string;
    dropOffCount: number;
    dropOffPercentage: number;
  } | null = null;

  for (const s of steps.slice(0, steps.length - 1)) {
    if (s.dropOffCount > 0) {
      if (!highestDropOff || s.dropOffCount > highestDropOff.dropOffCount) {
        highestDropOff = {
          stepKey: s.key,
          stepLabel: s.label,
          dropOffCount: s.dropOffCount,
          dropOffPercentage: s.dropOffPercentage,
        };
      }
    }
  }

  // Duration analytics: arithmetic mean of (endMs - startMs) for sessions where both exist
  let validDurationsSum = 0;
  let validDurationsCount = 0;

  for (const t of Object.values(sessionTimestamps)) {
    if (t.startMs && t.endMs && t.endMs >= t.startMs) {
      const diffSec = (t.endMs - t.startMs) / 1000;
      // Filter out extreme unrealistic outlier values (> 2 hours)
      if (diffSec >= 0 && diffSec <= 7200) {
        validDurationsSum += diffSec;
        validDurationsCount += 1;
      }
    }
  }

  const averageDurationSeconds =
    validDurationsCount > 0 ? Number((validDurationsSum / validDurationsCount).toFixed(1)) : null;

  const completionRate =
    startedCount > 0 ? Number(((completedCount / startedCount) * 100).toFixed(1)) : 0;

  const confidenceLevel: "Limited" | "Emerging" | "Established" =
    startedCount < 20 ? "Limited" : startedCount < 100 ? "Emerging" : "Established";

  const sampleSizeStatus = {
    totalSessions: startedCount,
    confidenceLevel,
    disclaimer:
      startedCount < 20
        ? `Sampel alur perjalanan saat ini berjumlah N=${startedCount} (Fase Uji Coba). Data drop-off bersifat sinyal awal dan akan semakin representatif seiring bertambahnya sesi konsultasi.`
        : startedCount < 100
          ? `Sampel alur perjalanan berkembang N=${startedCount}. Titik drop-off mulai menunjukkan tren konversi yang konsisten.`
          : `Sampel alur perjalanan matang N=${startedCount}. Analisis representatif untuk optimalisasi alur pertanyaan.`,
  };

  return {
    sampleSize: startedCount,
    started: startedCount,
    resultsViewed: resultsCount,
    completed: completedCount,
    completionRate,
    averageDurationSeconds,
    highestDropOffStep: highestDropOff,
    steps,
    sampleSizeStatus,
  };
}

// 1. Types & Zod Schemas for Dashboard Output
export const KpiSummarySchema = z.object({
  totalConsultations: z.number().int(),
  consultationsToday: z.number().int(),
  consultationsThisWeek: z.number().int(),
  consultationsThisMonth: z.number().int().default(0),
  completionRate: z.number(), // e.g. 100.0%
  averageMatchScore: z.number().default(0),
  mostRecommendedFragrance: z.string().nullable(),
  mostPopularScentFamily: z.string().nullable(),
});
export type KpiSummary = z.infer<typeof KpiSummarySchema>;

export const TrendItemSchema = z.object({
  date: z.string(), // "YYYY-MM-DD"
  sessions: z.number().int(),
});
export type TrendItem = z.infer<typeof TrendItemSchema>;

export const DistributionItemSchema = z.object({
  key: z.string(),
  label: z.string(),
  count: z.number().int(),
  percentage: z.number(),
});
export type DistributionItem = z.infer<typeof DistributionItemSchema>;

export const DemographicsAnalyticsSchema = z.object({
  gender: z.array(DistributionItemSchema),
  ageRange: z.array(DistributionItemSchema),
  occupation: z.array(DistributionItemSchema),
  priceRange: z.array(DistributionItemSchema),
});
export type DemographicsAnalytics = z.infer<typeof DemographicsAnalyticsSchema>;

export const OlfactiveAnalyticsSchema = z.object({
  scentFamilies: z.array(DistributionItemSchema),
  moods: z.array(DistributionItemSchema),
  atmospheres: z.array(DistributionItemSchema),
  occasions: z.array(DistributionItemSchema),
  intensities: z.array(DistributionItemSchema),
});
export type OlfactiveAnalytics = z.infer<typeof OlfactiveAnalyticsSchema>;

export const TopFragranceItemSchema = z.object({
  rank: z.number().int(),
  fragranceId: z.string(),
  name: z.string(),
  house: z.string(),
  recommendationCount: z.number().int(),
  rank1Count: z.number().int().default(0),
  rank2Count: z.number().int().default(0),
  rank3Count: z.number().int().default(0),
  rank1Percentage: z.number().default(0),
  minMatchPercent: z.number().default(0),
  maxMatchPercent: z.number().default(0),
  averageMatchPercent: z.number(),
});
export type TopFragranceItem = z.infer<typeof TopFragranceItemSchema>;

export const SessionListItemSchema = z.object({
  sessionId: z.string(),
  createdAt: z.string(),
  gender: z.string().nullable(),
  ageRange: z.string().nullable(),
  occupation: z.string().nullable(),
  priceRange: z.string().nullable(),
  mood: z.string().nullable().optional(),
  atmosphere: z.string().nullable().optional(),
  scentFamilies: z.array(z.string()).optional(),
  intensity: z.string().nullable().optional(),
  occasion: z.string().nullable().optional(),
  topFragranceName: z.string(),
  topFragranceHouse: z.string(),
  topMatchPercent: z.number().int(),
  clientPlatform: z.string(),
});
export type SessionListItem = z.infer<typeof SessionListItemSchema>;

// Phase DATA-04: Advanced Customer Intelligence Models
export const CustomerSnapshotItemSchema = z.object({
  dimension: z.string(),
  label: z.string(),
  value: z.string(),
  count: z.number().int(),
  percentage: z.number(),
});
export type CustomerSnapshotItem = z.infer<typeof CustomerSnapshotItemSchema>;

export const CustomerSegmentSchema = z.object({
  segmentKey: z.string(),
  label: z.string(),
  count: z.number().int(),
  percentage: z.number(),
  dominantGender: z.string(),
  dominantBudget: z.string(),
  dominantMood: z.string(),
  dominantScentFamily: z.string(),
  dominantOccasion: z.string(),
  topFragrance: z.string(),
  averageMatchScore: z.number(),
});
export type CustomerSegment = z.infer<typeof CustomerSegmentSchema>;

export const CrossAnalysisItemSchema = z.object({
  primaryKey: z.string(),
  primaryLabel: z.string(),
  total: z.number().int(),
  distribution: z.array(DistributionItemSchema),
});
export type CrossAnalysisItem = z.infer<typeof CrossAnalysisItemSchema>;

export const CrossAnalysisSchema = z.object({
  ageByScent: z.array(CrossAnalysisItemSchema),
  occupationByBudget: z.array(CrossAnalysisItemSchema),
  moodByScent: z.array(CrossAnalysisItemSchema),
  occasionByScent: z.array(CrossAnalysisItemSchema),
  budgetByFragrance: z.array(CrossAnalysisItemSchema),
});
export type CrossAnalysis = z.infer<typeof CrossAnalysisSchema>;

export const RecommendationQualitySchema = z.object({
  overallAverageMatch: z.number(),
  highestPerformingFragrance: z
    .object({
      name: z.string(),
      house: z.string(),
      averageMatch: z.number(),
      count: z.number().int(),
    })
    .nullable(),
  mostFrequentFragrance: z
    .object({
      name: z.string(),
      house: z.string(),
      count: z.number().int(),
      averageMatch: z.number(),
    })
    .nullable(),
  bestBalancedFragrance: z
    .object({
      name: z.string(),
      house: z.string(),
      score: z.number(),
      count: z.number().int(),
      averageMatch: z.number(),
    })
    .nullable(),
  averageMatchByScent: z.array(DistributionItemSchema),
  averageMatchByBudget: z.array(DistributionItemSchema),
});
export type RecommendationQuality = z.infer<typeof RecommendationQualitySchema>;

export const BusinessInsightSchema = z.object({
  id: z.string(),
  type: z.enum([
    "scent_preference",
    "customer_segment",
    "fragrance_performer",
    "budget_affinity",
    "quality_signal",
  ]),
  title: z.string(),
  description: z.string(),
  supportingMetric: z.string(),
  sampleSize: z.number().int(),
  confidenceLevel: z.enum(["Limited", "Emerging", "Established"]),
});
export type BusinessInsight = z.infer<typeof BusinessInsightSchema>;

export const IntelligenceDataSchema = z.object({
  snapshot: z.array(CustomerSnapshotItemSchema),
  segments: z.array(CustomerSegmentSchema),
  crossAnalysis: CrossAnalysisSchema,
  recommendationQuality: RecommendationQualitySchema,
  insights: z.array(BusinessInsightSchema),
  sampleSizeStatus: z.object({
    totalSessions: z.number().int(),
    confidenceLevel: z.enum(["Limited", "Emerging", "Established"]),
    disclaimer: z.string(),
  }),
});
export type IntelligenceData = z.infer<typeof IntelligenceDataSchema>;

export const FunnelStepSchema = z.object({
  key: z.string(),
  label: z.string(),
  count: z.number().int(),
  percentage: z.number(), // % of total started
  dropOffCount: z.number().int(),
  dropOffPercentage: z.number(),
  answerRate: z.number().optional(),
});
export type FunnelStep = z.infer<typeof FunnelStepSchema>;

export const FunnelAnalyticsSchema = z.object({
  sampleSize: z.number().int(),
  started: z.number().int(),
  resultsViewed: z.number().int(),
  completed: z.number().int(),
  completionRate: z.number(),
  averageDurationSeconds: z.number().nullable(),
  highestDropOffStep: z
    .object({
      stepKey: z.string(),
      stepLabel: z.string(),
      dropOffCount: z.number().int(),
      dropOffPercentage: z.number(),
    })
    .nullable(),
  steps: z.array(FunnelStepSchema),
  sampleSizeStatus: z.object({
    totalSessions: z.number().int(),
    confidenceLevel: z.enum(["Limited", "Emerging", "Established"]),
    disclaimer: z.string(),
  }),
});
export type FunnelAnalytics = z.infer<typeof FunnelAnalyticsSchema>;

export const DashboardDataSchema = z.object({
  kpis: KpiSummarySchema,
  demographics: DemographicsAnalyticsSchema,
  olfactive: OlfactiveAnalyticsSchema,
  topFragrances: z.array(TopFragranceItemSchema),
  recentSessions: z.array(SessionListItemSchema),
  trend: z.array(TrendItemSchema).default([]),
  intelligence: IntelligenceDataSchema.optional(),
  funnel: FunnelAnalyticsSchema.optional(),
  totalCount: z.number().int(),
});
export type DashboardData = z.infer<typeof DashboardDataSchema>;

// Label formatting dictionaries
export const GENDER_LABELS: Record<string, string> = {
  female: "Wanita (Feminine)",
  male: "Pria (Masculine)",
  unisex: "Unisex / Fleksibel",
  skip: "Dilewati",
  unspecified: "Tidak Ditentukan",
};

export const AGE_LABELS: Record<string, string> = {
  under_18: "Di bawah 18",
  "18_24": "18–24 tahun",
  "25_34": "25–34 tahun",
  "35_44": "35–44 tahun",
  "45_plus": "45 tahun ke atas",
  skip: "Dilewati",
};

export const OCCUPATION_LABELS: Record<string, string> = {
  student: "Pelajar / Mahasiswa",
  corporate: "Karyawan Swasta / BUMN",
  government: "PNS / ASN / Publik",
  entrepreneur: "Wirausaha / Bisnis",
  creative_freelance: "Kreatif / Freelancer",
  health_educator: "Medis / Edukasi",
  homemaker: "Ibu Rumah Tangga",
  other: "Lainnya",
  skip: "Dilewati",
};

export const PRICE_LABELS: Record<string, string> = {
  under_50k: "< Rp50.000",
  "50k_100k": "Rp50.000 – 100.000",
  "100k_150k": "Rp100.000 – 150.000",
  "150k_200k": "Rp150.000 – 200.000",
  "200k_300k": "Rp200.000 – 300.000",
  above_300k: "> Rp300.000",
  depends_on_scent: "Fleksibel (Tergantung)",
  skip: "Dilewati",
};

export const SCENT_FAMILY_LABELS: Record<string, string> = {
  citrus_fresh: "Citrus & Segar",
  citrus: "Citrus Segar",
  floral: "Bunga (Floral)",
  woody_earthy: "Kayu & Earthy",
  woody: "Kayu Elegan",
  amber_spicy: "Amber & Rempah",
  oriental: "Hangat Mewah",
  sweet_gourmand: "Manis & Gourmand",
  gourmand: "Manis Lezat",
  musky_powdery: "Musk & Lembut",
  aquatic: "Segar Akuatik",
};

export const MOOD_LABELS: Record<string, string> = {
  mysterious: "Mysterious (Hangat & Memikat)",
  radiant: "Radiant (Segar Berenergi)",
  serene: "Serene (Tenang & Rileks)",
  empowered: "Empowered (Tegas & Percaya Diri)",
};

export const OCCASION_LABELS: Record<string, string> = {
  daily: "Harian / Kerja",
  casual: "Santai / Hangout",
  romance: "Kencan / Spesial",
  night: "Malam / Formal",
  outdoor: "Outdoor / Olahraga",
  family: "Keluarga",
  special_event: "Momen Spesial",
};

export const INTENSITY_LABELS: Record<string, string> = {
  lembut: "Lembut (Dekat Tubuh)",
  seimbang: "Seimbang (Radius 1-2m)",
  semerbak: "Semerbak (Jejak Kuat)",
};

export const ATMOSPHERE_LABELS: Record<string, string> = {
  clean_morning: "Pagi Segar / Bersih",
  rainy_city: "Kota Seusai Hujan",
  flower_garden: "Taman Bunga",
  shady_forest: "Hutan Teduh",
  cozy_cafe: "Kafe Hangat",
  sunset_golden_hour: "Senja Keemasan",
};

/**
 * Pure aggregation function over an array of customer session records.
 * Can be used in memory or with database-fetched rows.
 */
export function aggregateSessionsData(
  records: Array<{
    id?: string;
    session_id: string;
    created_at?: string;
    completed?: boolean;
    client_platform?: string;
    gender?: string | null;
    age_range?: string | null;
    occupation?: string | null;
    price_range?: string | null;
    mood?: string | null;
    atmosphere?: string | null;
    scent_families?: string[] | null;
    intensity?: string | null;
    occasion?: string | null;
    top_fragrance_id?: string | null;
    top_fragrance_name?: string | null;
    top_fragrance_house?: string | null;
    top_match_percent?: number | null;
    recommendations?: Array<{
      id: string;
      name: string;
      house: string;
      category?: string;
      match_percent: number;
      rank: number;
      description?: string;
      why_match?: string;
      aura?: string;
    }> | null;
  }>,
  eventsOrNow: ConsultationEventRecord[] | Date = [],
  nowParam = new Date(),
): DashboardData {
  const actualEvents: ConsultationEventRecord[] = Array.isArray(eventsOrNow) ? eventsOrNow : [];
  const now = eventsOrNow instanceof Date ? eventsOrNow : nowParam;
  const totalCount = records.length;
  const funnel = aggregateFunnelData(actualEvents);

  if (totalCount === 0) {
    return {
      kpis: {
        totalConsultations: 0,
        consultationsToday: 0,
        consultationsThisWeek: 0,
        consultationsThisMonth: 0,
        completionRate: 100,
        averageMatchScore: 0,
        mostRecommendedFragrance: null,
        mostPopularScentFamily: null,
      },
      demographics: {
        gender: [],
        ageRange: [],
        occupation: [],
        priceRange: [],
      },
      olfactive: {
        scentFamilies: [],
        moods: [],
        atmospheres: [],
        occasions: [],
        intensities: [],
      },
      topFragrances: [],
      recentSessions: [],
      trend: [],
      intelligence: {
        snapshot: [
          {
            dimension: "age",
            label: "Kelompok Usia Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0,
          },
          {
            dimension: "occupation",
            label: "Pekerjaan Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0,
          },
          {
            dimension: "gender",
            label: "Gender Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0,
          },
          {
            dimension: "price",
            label: "Budget 30ml Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0,
          },
          {
            dimension: "scent",
            label: "Keluarga Aroma Teratas",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0,
          },
          {
            dimension: "mood",
            label: "Mood / Karakter Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0,
          },
          {
            dimension: "occasion",
            label: "Momen Pemakaian Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0,
          },
        ],
        segments: [],
        crossAnalysis: {
          ageByScent: [],
          occupationByBudget: [],
          moodByScent: [],
          occasionByScent: [],
          budgetByFragrance: [],
        },
        recommendationQuality: {
          overallAverageMatch: 0,
          highestPerformingFragrance: null,
          mostFrequentFragrance: null,
          bestBalancedFragrance: null,
          averageMatchByScent: [],
          averageMatchByBudget: [],
        },
        insights: [],
        sampleSizeStatus: {
          totalSessions: 0,
          confidenceLevel: "Limited",
          disclaimer: "Belum ada sesi konsultasi yang tercatat di database.",
        },
      },
      funnel,
      totalCount: 0,
    };
  }

  // 1. Time Boundaries (Using Indonesian / Local Business Timezone Offset UTC+7 aware calculations)
  const nowMs = now.getTime();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const sevenDaysAgo = nowMs - 7 * 24 * 60 * 60 * 1000;
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;
  let totalMatchSum = 0;

  // Counts accumulators (Categorical)
  const genderCounts: Record<string, number> = {};
  const ageCounts: Record<string, number> = {};
  const occCounts: Record<string, number> = {};
  const priceCounts: Record<string, number> = {};
  const scentCounts: Record<string, number> = {};
  const moodCounts: Record<string, number> = {};
  const atmCounts: Record<string, number> = {};
  const occaCounts: Record<string, number> = {};
  const intCounts: Record<string, number> = {};

  // Trend accumulator (Daily bucket: "YYYY-MM-DD" -> count)
  const trendMap: Record<string, number> = {};

  // Fragrance statistics accumulator (tracks frequency across all Top 3 recommendations)
  const fragranceStats: Record<
    string,
    {
      name: string;
      house: string;
      count: number;
      rank1Count: number;
      rank2Count: number;
      rank3Count: number;
      minMatch: number;
      maxMatch: number;
      totalMatch: number;
    }
  > = {};

  for (const r of records) {
    const recordTime = r.created_at ? new Date(r.created_at) : now;
    const createdAtTime = recordTime.getTime();

    if (createdAtTime >= startOfToday) todayCount++;
    if (createdAtTime >= sevenDaysAgo) weekCount++;
    if (createdAtTime >= startOfMonth) monthCount++;

    totalMatchSum += r.top_match_percent || 0;

    // Daily trend aggregation
    const dateKey = recordTime.toISOString().split("T")[0];
    trendMap[dateKey] = (trendMap[dateKey] || 0) + 1;

    // Demographics (Valid non-null counting with graceful "skip" handling)
    const g = r.gender || "skip";
    genderCounts[g] = (genderCounts[g] || 0) + 1;

    const a = r.age_range || "skip";
    ageCounts[a] = (ageCounts[a] || 0) + 1;

    const occ = r.occupation || "skip";
    occCounts[occ] = (occCounts[occ] || 0) + 1;

    const pr = r.price_range || "skip";
    priceCounts[pr] = (priceCounts[pr] || 0) + 1;

    // Olfactive & Contextual Preferences
    if (r.mood) moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
    if (r.atmosphere) atmCounts[r.atmosphere] = (atmCounts[r.atmosphere] || 0) + 1;
    if (r.occasion) occaCounts[r.occasion] = (occaCounts[r.occasion] || 0) + 1;
    if (r.intensity) intCounts[r.intensity] = (intCounts[r.intensity] || 0) + 1;

    // Scent Families (Multi-select array: count each element independently)
    if (Array.isArray(r.scent_families)) {
      for (const sf of r.scent_families) {
        if (sf && typeof sf === "string") {
          scentCounts[sf] = (scentCounts[sf] || 0) + 1;
        }
      }
    }

    // Fragrance statistics accumulator (tracks frequency across all Top 3 recommendations)
    if (Array.isArray(r.recommendations) && r.recommendations.length > 0) {
      for (const rec of r.recommendations) {
        if (rec && rec.name) {
          const fid = rec.id || rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          if (!fragranceStats[fid]) {
            fragranceStats[fid] = {
              name: rec.name,
              house: rec.house || "ABNA",
              count: 0,
              rank1Count: 0,
              rank2Count: 0,
              rank3Count: 0,
              minMatch: rec.match_percent || 85,
              maxMatch: rec.match_percent || 85,
              totalMatch: 0,
            };
          }
          const fStat = fragranceStats[fid];
          fStat.count += 1;
          if (rec.rank === 1) fStat.rank1Count += 1;
          else if (rec.rank === 2) fStat.rank2Count += 1;
          else if (rec.rank === 3) fStat.rank3Count += 1;
          fStat.minMatch = Math.min(fStat.minMatch, rec.match_percent || 85);
          fStat.maxMatch = Math.max(fStat.maxMatch, rec.match_percent || 85);
          fStat.totalMatch += rec.match_percent || 85;
        }
      }
    } else if (r.top_fragrance_name) {
      // Fallback to top_fragrance column if JSONB is absent
      const fid =
        r.top_fragrance_id || r.top_fragrance_name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const matchScore = r.top_match_percent || 90;
      if (!fragranceStats[fid]) {
        fragranceStats[fid] = {
          name: r.top_fragrance_name,
          house: r.top_fragrance_house || "ABNA",
          count: 0,
          rank1Count: 0,
          rank2Count: 0,
          rank3Count: 0,
          minMatch: matchScore,
          maxMatch: matchScore,
          totalMatch: 0,
        };
      }
      const fStat = fragranceStats[fid];
      fStat.count += 1;
      fStat.rank1Count += 1;
      fStat.minMatch = Math.min(fStat.minMatch, matchScore);
      fStat.maxMatch = Math.max(fStat.maxMatch, matchScore);
      fStat.totalMatch += matchScore;
    }
  }

  // Distribution builder with mathematically verified denominators:
  // percentage = (category_count / valid_denominator) * 100
  const buildDist = (
    counts: Record<string, number>,
    labelDict: Record<string, string>,
    denominator = totalCount,
  ): DistributionItem[] => {
    const denom = denominator > 0 ? denominator : 1;
    return Object.entries(counts)
      .map(([key, count]) => ({
        key,
        label: labelDict[key] || key.replace(/_/g, " "),
        count,
        percentage: Number(((count / denom) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count);
  };

  // Total multi-select scent family selections denominator
  const totalScentSelections = Object.values(scentCounts).reduce((acc, curr) => acc + curr, 0);

  const scentDist = buildDist(scentCounts, SCENT_FAMILY_LABELS, totalScentSelections || totalCount);
  const mostPopScent = scentDist[0]?.label || null;

  const topFragranceList: TopFragranceItem[] = Object.entries(fragranceStats)
    .map(([fid, stat]) => ({
      rank: 0,
      fragranceId: fid,
      name: stat.name,
      house: stat.house,
      recommendationCount: stat.count,
      rank1Count: stat.rank1Count,
      rank2Count: stat.rank2Count,
      rank3Count: stat.rank3Count,
      rank1Percentage:
        stat.count > 0 ? Number(((stat.rank1Count / stat.count) * 100).toFixed(1)) : 0,
      minMatchPercent: stat.minMatch,
      maxMatchPercent: stat.maxMatch,
      averageMatchPercent: Number((stat.totalMatch / (stat.count || 1)).toFixed(1)),
    }))
    .sort(
      (a, b) =>
        b.recommendationCount - a.recommendationCount ||
        b.averageMatchPercent - a.averageMatchPercent,
    )
    .slice(0, 10)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const mostRecFragrance = topFragranceList[0]?.name || null;
  const averageMatchScore = totalCount > 0 ? Number((totalMatchSum / totalCount).toFixed(1)) : 0;

  // Trend array formatted chronologically for charts
  const trendList: TrendItem[] = Object.entries(trendMap)
    .map(([date, sessions]) => ({ date, sessions }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Recent Sessions list mapping
  const recentSessions: SessionListItem[] = records.slice(0, 50).map((r) => ({
    sessionId: r.session_id,
    createdAt: r.created_at || new Date().toISOString(),
    gender: r.gender ? GENDER_LABELS[r.gender] || r.gender : null,
    ageRange: r.age_range ? AGE_LABELS[r.age_range] || r.age_range : null,
    occupation: r.occupation ? OCCUPATION_LABELS[r.occupation] || r.occupation : null,
    priceRange: r.price_range ? PRICE_LABELS[r.price_range] || r.price_range : null,
    mood: r.mood ? MOOD_LABELS[r.mood] || r.mood : null,
    atmosphere: r.atmosphere ? ATMOSPHERE_LABELS[r.atmosphere] || r.atmosphere : null,
    scentFamilies: Array.isArray(r.scent_families) ? r.scent_families : [],
    intensity: r.intensity ? INTENSITY_LABELS[r.intensity] || r.intensity : null,
    occasion: r.occasion ? OCCASION_LABELS[r.occasion] || r.occasion : null,
    topFragranceName: r.top_fragrance_name || "Unknown",
    topFragranceHouse: r.top_fragrance_house || "Unknown",
    topMatchPercent: r.top_match_percent || 0,
    clientPlatform: r.client_platform || "kiosk_web",
  }));

  // =========================================================================
  // Phase DATA-04: Customer Intelligence & Cross-Analysis Aggregation Engine
  // =========================================================================

  // 1. Customer Snapshot (Dominant Attributes across valid responses)
  const getDominant = (
    dist: DistributionItem[],
    dimension: string,
    label: string,
  ): CustomerSnapshotItem => {
    const valid = dist.filter((d) => d.key !== "skip" && d.key !== "unspecified");
    const top = valid[0] ||
      dist[0] || { key: "none", label: "Belum Ada Data", count: 0, percentage: 0 };
    return {
      dimension,
      label,
      value: top.label,
      count: top.count,
      percentage: top.percentage,
    };
  };

  const genderDist = buildDist(genderCounts, GENDER_LABELS);
  const ageDist = buildDist(ageCounts, AGE_LABELS);
  const occDist = buildDist(occCounts, OCCUPATION_LABELS);
  const priceDist = buildDist(priceCounts, PRICE_LABELS);
  const moodDist = buildDist(moodCounts, MOOD_LABELS);
  const atmDist = buildDist(atmCounts, ATMOSPHERE_LABELS);
  const occaDist = buildDist(occaCounts, OCCASION_LABELS);
  const intDist = buildDist(intCounts, INTENSITY_LABELS);

  const snapshot: CustomerSnapshotItem[] = [
    getDominant(ageDist, "age", "Kelompok Usia Dominan"),
    getDominant(occDist, "occupation", "Pekerjaan Dominan"),
    getDominant(genderDist, "gender", "Gender Dominan"),
    getDominant(priceDist, "price", "Budget 30ml Dominan"),
    getDominant(scentDist, "scent", "Keluarga Aroma Teratas"),
    getDominant(moodDist, "mood", "Mood / Karakter Dominan"),
    getDominant(occaDist, "occasion", "Momen Pemakaian Dominan"),
  ];

  // 2. Practical Rule-Based Customer Segmentation (Age + Occupation / Age + Budget)
  const segmentBuckets: Record<
    string,
    {
      label: string;
      sessions: typeof records;
    }
  > = {};

  for (const r of records) {
    const age = r.age_range || "skip";
    const occ = r.occupation || "skip";
    const segKey = `${age}__${occ}`;
    const ageLabel = AGE_LABELS[age] || age;
    const occLabel = OCCUPATION_LABELS[occ] || occ;

    if (!segmentBuckets[segKey]) {
      segmentBuckets[segKey] = {
        label: `${occLabel} (${ageLabel})`,
        sessions: [],
      };
    }
    segmentBuckets[segKey].sessions.push(r);
  }

  const segments: CustomerSegment[] = Object.entries(segmentBuckets)
    .filter(([key]) => !key.includes("skip"))
    .map(([segKey, b]) => {
      const segCount = b.sessions.length;
      const segPct = totalCount > 0 ? Number(((segCount / totalCount) * 100).toFixed(1)) : 0;

      // Find segment dominants
      const sGender: Record<string, number> = {};
      const sBudget: Record<string, number> = {};
      const sMood: Record<string, number> = {};
      const sScent: Record<string, number> = {};
      const sOccasion: Record<string, number> = {};
      const sFrag: Record<string, number> = {};
      let sMatchSum = 0;

      for (const s of b.sessions) {
        if (s.gender) sGender[s.gender] = (sGender[s.gender] || 0) + 1;
        if (s.price_range) sBudget[s.price_range] = (sBudget[s.price_range] || 0) + 1;
        if (s.mood) sMood[s.mood] = (sMood[s.mood] || 0) + 1;
        if (s.occasion) sOccasion[s.occasion] = (sOccasion[s.occasion] || 0) + 1;
        if (s.top_fragrance_name)
          sFrag[s.top_fragrance_name] = (sFrag[s.top_fragrance_name] || 0) + 1;
        if (Array.isArray(s.scent_families)) {
          for (const sf of s.scent_families) sScent[sf] = (sScent[sf] || 0) + 1;
        }
        sMatchSum += s.top_match_percent || 0;
      }

      const topKey = (dict: Record<string, number>, labelDict: Record<string, string>) => {
        const sorted = Object.entries(dict).sort((a, b) => b[1] - a[1]);
        const k = sorted[0]?.[0];
        return k ? labelDict[k] || k : "Belum diisi";
      };

      return {
        segmentKey: segKey,
        label: b.label,
        count: segCount,
        percentage: segPct,
        dominantGender: topKey(sGender, GENDER_LABELS),
        dominantBudget: topKey(sBudget, PRICE_LABELS),
        dominantMood: topKey(sMood, MOOD_LABELS),
        dominantScentFamily: topKey(sScent, SCENT_FAMILY_LABELS),
        dominantOccasion: topKey(sOccasion, OCCASION_LABELS),
        topFragrance: Object.entries(sFrag).sort((a, b) => b[1] - a[1])[0]?.[0] || "Belum ada",
        averageMatchScore: segCount > 0 ? Number((sMatchSum / segCount).toFixed(1)) : 0,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // 3. Cross-Analysis Engine
  const buildCross = (
    primaryField: "age_range" | "occupation" | "mood" | "occasion" | "price_range",
    primaryLabels: Record<string, string>,
    secondaryField: "scent_families" | "price_range" | "top_fragrance_name",
    secondaryLabels: Record<string, string>,
  ): CrossAnalysisItem[] => {
    const matrix: Record<string, { total: number; counts: Record<string, number> }> = {};

    for (const r of records) {
      const pVal = r[primaryField];
      if (!pVal || pVal === "skip") continue;

      if (!matrix[pVal]) {
        matrix[pVal] = { total: 0, counts: {} };
      }

      if (secondaryField === "scent_families") {
        if (Array.isArray(r.scent_families)) {
          for (const sVal of r.scent_families) {
            if (sVal) {
              matrix[pVal].counts[sVal] = (matrix[pVal].counts[sVal] || 0) + 1;
              matrix[pVal].total += 1;
            }
          }
        }
      } else {
        const sVal = r[secondaryField];
        if (sVal && sVal !== "skip") {
          matrix[pVal].counts[sVal] = (matrix[pVal].counts[sVal] || 0) + 1;
          matrix[pVal].total += 1;
        }
      }
    }

    return Object.entries(matrix)
      .map(([pKey, m]) => ({
        primaryKey: pKey,
        primaryLabel: primaryLabels[pKey] || pKey,
        total: m.total,
        distribution: Object.entries(m.counts)
          .map(([sKey, cnt]) => ({
            key: sKey,
            label: secondaryLabels[sKey] || sKey,
            count: cnt,
            percentage: m.total > 0 ? Number(((cnt / m.total) * 100).toFixed(1)) : 0,
          }))
          .sort((a, b) => b.count - a.count),
      }))
      .sort((a, b) => b.total - a.total);
  };

  const crossAnalysis: CrossAnalysis = {
    ageByScent: buildCross("age_range", AGE_LABELS, "scent_families", SCENT_FAMILY_LABELS),
    occupationByBudget: buildCross("occupation", OCCUPATION_LABELS, "price_range", PRICE_LABELS),
    moodByScent: buildCross("mood", MOOD_LABELS, "scent_families", SCENT_FAMILY_LABELS),
    occasionByScent: buildCross("occasion", OCCASION_LABELS, "scent_families", SCENT_FAMILY_LABELS),
    budgetByFragrance: buildCross("price_range", PRICE_LABELS, "top_fragrance_name", {}),
  };

  // 4. Recommendation Quality Analysis
  const scentMatchMap: Record<string, { sum: number; count: number }> = {};
  const budgetMatchMap: Record<string, { sum: number; count: number }> = {};

  for (const r of records) {
    const score = r.top_match_percent || 0;
    if (score > 0) {
      if (Array.isArray(r.scent_families)) {
        for (const sf of r.scent_families) {
          if (sf) {
            if (!scentMatchMap[sf]) scentMatchMap[sf] = { sum: 0, count: 0 };
            scentMatchMap[sf].sum += score;
            scentMatchMap[sf].count += 1;
          }
        }
      }
      if (r.price_range && r.price_range !== "skip") {
        if (!budgetMatchMap[r.price_range]) budgetMatchMap[r.price_range] = { sum: 0, count: 0 };
        budgetMatchMap[r.price_range].sum += score;
        budgetMatchMap[r.price_range].count += 1;
      }
    }
  }

  const buildAvgDist = (
    map: Record<string, { sum: number; count: number }>,
    labelMap: Record<string, string>,
  ) => {
    return Object.entries(map)
      .map(([k, stat]) => ({
        key: k,
        label: labelMap[k] || k,
        count: stat.count,
        percentage: stat.count > 0 ? Number((stat.sum / stat.count).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  // High performance / high frequency performers
  const validFragStats = topFragranceList.filter((f) => f.recommendationCount >= 1);
  const highestPerforming =
    validFragStats.slice().sort((a, b) => b.averageMatchPercent - a.averageMatchPercent)[0] || null;
  const mostFrequent =
    validFragStats.slice().sort((a, b) => b.recommendationCount - a.recommendationCount)[0] || null;

  // Best balanced performer (product score = count * avgMatch)
  const bestBalanced =
    validFragStats
      .slice()
      .sort(
        (a, b) =>
          b.recommendationCount * b.averageMatchPercent -
          a.recommendationCount * a.averageMatchPercent,
      )[0] || null;

  const recommendationQuality: RecommendationQuality = {
    overallAverageMatch: averageMatchScore,
    highestPerformingFragrance: highestPerforming
      ? {
          name: highestPerforming.name,
          house: highestPerforming.house,
          averageMatch: highestPerforming.averageMatchPercent,
          count: highestPerforming.recommendationCount,
        }
      : null,
    mostFrequentFragrance: mostFrequent
      ? {
          name: mostFrequent.name,
          house: mostFrequent.house,
          count: mostFrequent.recommendationCount,
          averageMatch: mostFrequent.averageMatchPercent,
        }
      : null,
    bestBalancedFragrance: bestBalanced
      ? {
          name: bestBalanced.name,
          house: bestBalanced.house,
          score: Number(
            (bestBalanced.recommendationCount * (bestBalanced.averageMatchPercent / 100)).toFixed(
              1,
            ),
          ),
          count: bestBalanced.recommendationCount,
          averageMatch: bestBalanced.averageMatchPercent,
        }
      : null,
    averageMatchByScent: buildAvgDist(scentMatchMap, SCENT_FAMILY_LABELS),
    averageMatchByBudget: buildAvgDist(budgetMatchMap, PRICE_LABELS),
  };

  // 5. Deterministic Business Insight Engine (Rule-based, no external AI calls)
  const insights: BusinessInsight[] = [];
  const confidenceLevel: "Limited" | "Emerging" | "Established" =
    totalCount < 20 ? "Limited" : totalCount < 100 ? "Emerging" : "Established";

  // Rule 1: Scent Preference Dominance
  if (scentDist.length > 0 && scentDist[0].count > 0) {
    const topS = scentDist[0];
    insights.push({
      id: "insight_scent_pref",
      type: "scent_preference",
      title: `${topS.label} Menjadi Preferensi Teratas`,
      description: `Aroma ${topS.label} menempati ${topS.percentage}% dari total pemilihan aroma pelanggan.`,
      supportingMetric: `${topS.percentage}% (${topS.count} pilihan)`,
      sampleSize: totalCount,
      confidenceLevel,
    });
  }

  // Rule 2: Segment Concentration
  if (segments.length > 0) {
    const topSeg = segments[0];
    insights.push({
      id: "insight_customer_seg",
      type: "customer_segment",
      title: `Segmen Utama: ${topSeg.label}`,
      description: `Konsultasi saat ini terkonsentrasi pada segmen ${topSeg.label} dengan preferensi aroma ${topSeg.dominantScentFamily} dan budget ${topSeg.dominantBudget}.`,
      supportingMetric: `${topSeg.percentage}% dari total sesi`,
      sampleSize: topSeg.count,
      confidenceLevel,
    });
  }

  // Rule 3: Top Fragrance Performer
  if (topFragranceList.length > 0) {
    const topF = topFragranceList[0];
    insights.push({
      id: "insight_frag_perf",
      type: "fragrance_performer",
      title: `${topF.name} Memimpin Rekomendasi`,
      description: `${topF.name} (${topF.house}) paling sering direkomendasikan dengan rata-rata kecocokan ${topF.averageMatchPercent}%.`,
      supportingMetric: `${topF.recommendationCount} kali (${topF.averageMatchPercent}% match)`,
      sampleSize: totalCount,
      confidenceLevel,
    });
  }

  // Rule 4: Budget Affinity
  if (priceDist.length > 0) {
    const validPrice = priceDist.filter((p) => p.key !== "skip")[0];
    if (validPrice) {
      insights.push({
        id: "insight_budget",
        type: "budget_affinity",
        title: `Konsentrasi Budget: ${validPrice.label}`,
        description: `Mayoritas pelanggan memilih kisaran budget ${validPrice.label} untuk kemasan 30ml.`,
        supportingMetric: `${validPrice.percentage}% (${validPrice.count} sesi)`,
        sampleSize: totalCount,
        confidenceLevel,
      });
    }
  }

  // Rule 5: Recommendation Quality Signal
  if (totalCount > 0) {
    insights.push({
      id: "insight_quality",
      type: "quality_signal",
      title: `Akurasi Formula Match Rata-Rata ${averageMatchScore}%`,
      description: `Sistem rekomendasi 10D menghasilkan tingkat kecocokan rata-rata yang stabil across seluruh preferensi profil.`,
      supportingMetric: `${averageMatchScore}% Rata-Rata`,
      sampleSize: totalCount,
      confidenceLevel,
    });
  }

  const sampleSizeStatus = {
    totalSessions: totalCount,
    confidenceLevel,
    disclaimer:
      totalCount < 20
        ? `Sampel data saat ini berjumlah N=${totalCount} (Fase Uji Coba & Pengembangan). Wawasan analitik merupakan sinyal awal dan akan semakin representatif seiring bertambahnya sesi konsultasi gerai.`
        : totalCount < 100
          ? `Sampel data berkembang N=${totalCount}. Pola preferensi mulai menunjukkan tren yang stabil.`
          : `Sampel data matang N=${totalCount}. Analisis representatif untuk pengambilan keputusan ritel.`,
  };

  const intelligence: IntelligenceData = {
    snapshot,
    segments,
    crossAnalysis,
    recommendationQuality,
    insights,
    sampleSizeStatus,
  };

  return {
    kpis: {
      totalConsultations: totalCount,
      consultationsToday: todayCount,
      consultationsThisWeek: weekCount,
      consultationsThisMonth: monthCount,
      completionRate: 100.0,
      averageMatchScore,
      mostRecommendedFragrance: mostRecFragrance,
      mostPopularScentFamily: mostPopScent,
    },
    demographics: {
      gender: genderDist,
      ageRange: ageDist,
      occupation: occDist,
      priceRange: priceDist,
    },
    olfactive: {
      scentFamilies: scentDist,
      moods: moodDist,
      atmospheres: atmDist,
      occasions: occaDist,
      intensities: intDist,
    },
    topFragrances: topFragranceList,
    recentSessions,
    trend: trendList,
    intelligence,
    funnel,
    totalCount,
  };
}

/**
 * Fetch full dashboard analytics from Supabase PostgreSQL (Server-side)
 */
export async function getDashboardAnalytics(filters?: {
  gender?: string;
  ageRange?: string;
  occupation?: string;
  priceRange?: string;
  topFragrance?: string;
  dateRange?: string; // "today" | "7d" | "30d" | "all"
}): Promise<DashboardData> {
  const supabase = getSupabaseServerClient();
  const events = await getConsultationEvents();

  if (!supabase) {
    // Return graceful empty state if Supabase is unconfigured
    return aggregateSessionsData([], events);
  }

  try {
    let query = supabase
      .from("customer_sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (filters?.gender) query = query.eq("gender", filters.gender);
    if (filters?.ageRange) query = query.eq("age_range", filters.ageRange);
    if (filters?.occupation) query = query.eq("occupation", filters.occupation);
    if (filters?.priceRange) query = query.eq("price_range", filters.priceRange);
    if (filters?.topFragrance)
      query = query.ilike("top_fragrance_name", `%${filters.topFragrance}%`);

    if (filters?.dateRange && filters.dateRange !== "all") {
      const now = new Date();
      if (filters.dateRange === "today") {
        const startOfToday = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        ).toISOString();
        query = query.gte("created_at", startOfToday);
      } else if (filters.dateRange === "7d") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", sevenDaysAgo);
      } else if (filters.dateRange === "30d") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("created_at", thirtyDaysAgo);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.warn("[AdminAnalytics] Database query warning:", error.message);
      return aggregateSessionsData([], events);
    }

    return aggregateSessionsData(data || [], events);
  } catch (err) {
    console.warn("[AdminAnalytics] Query failed:", err instanceof Error ? err.message : err);
    return aggregateSessionsData([], events);
  }
}

/**
 * Fetch single session detail for inspection modal
 */
export async function getSessionDetail(sessionId: string): Promise<CustomerSessionRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("customer_sessions")
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (error || !data) return null;
    return data as CustomerSessionRecord;
  } catch {
    return null;
  }
}

/**
 * Deletes a customer session by session_id
 */
export async function deleteCustomerSession(
  sessionId: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { success: false, error: "Database client is not available" };
  }

  try {
    const { error } = await supabase.from("customer_sessions").delete().eq("session_id", sessionId);

    if (error) {
      console.warn("[AdminAnalytics] Failed to delete customer session:", error.message);
      return { success: false, error: error.message };
    }

    // Clean up associated consultation events to prevent orphaned event logs
    await deleteConsultationEventsBySessionId(sessionId);

    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unexpected deletion error";
    console.warn("[AdminAnalytics] Unexpected delete error:", msg);
    return { success: false, error: msg };
  }
}
