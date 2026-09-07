import { E as ExcelJS } from "../_libs/exceljs.mjs";
import { g as getSupabaseServerClient } from "./supabase.server-B40vTsTo.mjs";
import { g as getConsultationEvents, d as deleteConsultationEventsBySessionId } from "./customer-events.repository-CIBRJUOG.mjs";
import { R as RAW_FRAGRANCES } from "./fragrances-LdP9CCTC.mjs";
import { o as objectType, n as numberType, a as arrayType, s as stringType, e as enumType } from "../_libs/zod.mjs";
const FUNNEL_QUESTION_STEPS = [
  { step: 1, key: "q1", id: "mood", label: "Q1: Karakter Aroma" },
  { step: 2, key: "q2", id: "scent_family", label: "Q2: Jenis Aroma Favorit" },
  { step: 3, key: "q3", id: "atmosphere", label: "Q3: Suasana Aroma" },
  { step: 4, key: "q4", id: "occasion", label: "Q4: Momen Pemakaian" },
  { step: 5, key: "q5", id: "intensity", label: "Q5: Intensitas Aroma" },
  { step: 6, key: "q6", id: "gender", label: "Q6: Profil Pembeli" },
  { step: 7, key: "q7", id: "age_range", label: "Q7: Range Usia" },
  { step: 8, key: "q8", id: "occupation", label: "Q8: Aktivitas Utama" },
  { step: 9, key: "q9", id: "price_range", label: "Q9: Range Harga Nyaman" }
];
function aggregateFunnelData(events = []) {
  const safeEvents = Array.isArray(events) ? events : [];
  const startedSessions = /* @__PURE__ */ new Set();
  const resultsSessions = /* @__PURE__ */ new Set();
  const completedSessions = /* @__PURE__ */ new Set();
  const qViewedSets = {
    1: /* @__PURE__ */ new Set(),
    2: /* @__PURE__ */ new Set(),
    3: /* @__PURE__ */ new Set(),
    4: /* @__PURE__ */ new Set(),
    5: /* @__PURE__ */ new Set(),
    6: /* @__PURE__ */ new Set(),
    7: /* @__PURE__ */ new Set(),
    8: /* @__PURE__ */ new Set(),
    9: /* @__PURE__ */ new Set()
  };
  const qAnsweredSets = {
    1: /* @__PURE__ */ new Set(),
    2: /* @__PURE__ */ new Set(),
    3: /* @__PURE__ */ new Set(),
    4: /* @__PURE__ */ new Set(),
    5: /* @__PURE__ */ new Set(),
    6: /* @__PURE__ */ new Set(),
    7: /* @__PURE__ */ new Set(),
    8: /* @__PURE__ */ new Set(),
    9: /* @__PURE__ */ new Set()
  };
  const sessionTimestamps = {};
  for (const e of safeEvents) {
    const sId = e.session_id;
    if (!sId) continue;
    const timeMs = e.created_at ? new Date(e.created_at).getTime() : NaN;
    if (!sessionTimestamps[sId]) sessionTimestamps[sId] = {};
    if (e.event_type === "consultation_started") {
      startedSessions.add(sId);
      if (!isNaN(timeMs) && (!sessionTimestamps[sId].startMs || timeMs < sessionTimestamps[sId].startMs)) {
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
      if (!isNaN(timeMs) && (!sessionTimestamps[sId].endMs || timeMs > sessionTimestamps[sId].endMs)) {
        sessionTimestamps[sId].endMs = timeMs;
      }
    } else if (e.event_type === "consultation_completed") {
      completedSessions.add(sId);
      if (!isNaN(timeMs) && (!sessionTimestamps[sId].endMs || timeMs > sessionTimestamps[sId].endMs)) {
        sessionTimestamps[sId].endMs = timeMs;
      }
    }
  }
  const startedCount = startedSessions.size;
  const resultsCount = resultsSessions.size;
  const completedCount = completedSessions.size;
  const denom = startedCount > 0 ? startedCount : 1;
  const rawStages = [
    { key: "started", label: "Konsultasi Dimulai", count: startedCount },
    ...FUNNEL_QUESTION_STEPS.map((q) => {
      const vCount = qViewedSets[q.step].size;
      const aCount = qAnsweredSets[q.step].size;
      const aRate = vCount > 0 ? Number((aCount / vCount * 100).toFixed(1)) : 0;
      return {
        key: q.key,
        label: q.label,
        count: vCount,
        answerRate: aRate
      };
    }),
    { key: "results", label: "Hasil Kurasi Dilihat", count: resultsCount },
    { key: "completed", label: "Konsultasi Selesai", count: completedCount }
  ];
  const steps = rawStages.map((stage, idx) => {
    const nextStage = rawStages[idx + 1];
    const dropOffCount = nextStage ? Math.max(0, stage.count - nextStage.count) : 0;
    const dropOffPercentage = stage.count > 0 && nextStage ? Number((dropOffCount / stage.count * 100).toFixed(1)) : 0;
    return {
      key: stage.key,
      label: stage.label,
      count: stage.count,
      percentage: startedCount > 0 ? Number((stage.count / denom * 100).toFixed(1)) : 0,
      dropOffCount,
      dropOffPercentage,
      answerRate: stage.answerRate
    };
  });
  let highestDropOff = null;
  for (const s of steps.slice(0, steps.length - 1)) {
    if (s.dropOffCount > 0) {
      if (!highestDropOff || s.dropOffCount > highestDropOff.dropOffCount) {
        highestDropOff = {
          stepKey: s.key,
          stepLabel: s.label,
          dropOffCount: s.dropOffCount,
          dropOffPercentage: s.dropOffPercentage
        };
      }
    }
  }
  let validDurationsSum = 0;
  let validDurationsCount = 0;
  for (const t of Object.values(sessionTimestamps)) {
    if (t.startMs && t.endMs && t.endMs >= t.startMs) {
      const diffSec = (t.endMs - t.startMs) / 1e3;
      if (diffSec >= 0 && diffSec <= 7200) {
        validDurationsSum += diffSec;
        validDurationsCount += 1;
      }
    }
  }
  const averageDurationSeconds = validDurationsCount > 0 ? Number((validDurationsSum / validDurationsCount).toFixed(1)) : null;
  const completionRate = startedCount > 0 ? Number((completedCount / startedCount * 100).toFixed(1)) : 0;
  const confidenceLevel = startedCount < 20 ? "Limited" : startedCount < 100 ? "Emerging" : "Established";
  const sampleSizeStatus = {
    totalSessions: startedCount,
    confidenceLevel,
    disclaimer: startedCount < 20 ? `Sampel alur perjalanan saat ini berjumlah N=${startedCount} (Fase Uji Coba). Data drop-off bersifat sinyal awal dan akan semakin representatif seiring bertambahnya sesi konsultasi.` : startedCount < 100 ? `Sampel alur perjalanan berkembang N=${startedCount}. Titik drop-off mulai menunjukkan tren konversi yang konsisten.` : `Sampel alur perjalanan matang N=${startedCount}. Analisis representatif untuk optimalisasi alur pertanyaan.`
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
    sampleSizeStatus
  };
}
const KpiSummarySchema = objectType({
  totalConsultations: numberType().int(),
  consultationsToday: numberType().int(),
  consultationsThisWeek: numberType().int(),
  consultationsThisMonth: numberType().int().default(0),
  completionRate: numberType(),
  // e.g. 100.0%
  averageMatchScore: numberType().default(0),
  mostRecommendedFragrance: stringType().nullable(),
  mostPopularScentFamily: stringType().nullable()
});
const TrendItemSchema = objectType({
  date: stringType(),
  // "YYYY-MM-DD"
  sessions: numberType().int()
});
const DistributionItemSchema = objectType({
  key: stringType(),
  label: stringType(),
  count: numberType().int(),
  percentage: numberType()
});
const DemographicsAnalyticsSchema = objectType({
  gender: arrayType(DistributionItemSchema),
  ageRange: arrayType(DistributionItemSchema),
  occupation: arrayType(DistributionItemSchema),
  priceRange: arrayType(DistributionItemSchema)
});
const OlfactiveAnalyticsSchema = objectType({
  scentFamilies: arrayType(DistributionItemSchema),
  moods: arrayType(DistributionItemSchema),
  atmospheres: arrayType(DistributionItemSchema),
  occasions: arrayType(DistributionItemSchema),
  intensities: arrayType(DistributionItemSchema)
});
const TopFragranceItemSchema = objectType({
  rank: numberType().int(),
  fragranceId: stringType(),
  name: stringType(),
  house: stringType(),
  recommendationCount: numberType().int(),
  rank1Count: numberType().int().default(0),
  rank2Count: numberType().int().default(0),
  rank3Count: numberType().int().default(0),
  rank1Percentage: numberType().default(0),
  minMatchPercent: numberType().default(0),
  maxMatchPercent: numberType().default(0),
  averageMatchPercent: numberType()
});
const SessionListItemSchema = objectType({
  sessionId: stringType(),
  createdAt: stringType(),
  gender: stringType().nullable(),
  ageRange: stringType().nullable(),
  occupation: stringType().nullable(),
  priceRange: stringType().nullable(),
  mood: stringType().nullable().optional(),
  atmosphere: stringType().nullable().optional(),
  scentFamilies: arrayType(stringType()).optional(),
  intensity: stringType().nullable().optional(),
  occasion: stringType().nullable().optional(),
  topFragranceName: stringType(),
  topFragranceHouse: stringType(),
  topMatchPercent: numberType().int(),
  clientPlatform: stringType()
});
const CustomerSnapshotItemSchema = objectType({
  dimension: stringType(),
  label: stringType(),
  value: stringType(),
  count: numberType().int(),
  percentage: numberType()
});
const CustomerSegmentSchema = objectType({
  segmentKey: stringType(),
  label: stringType(),
  count: numberType().int(),
  percentage: numberType(),
  dominantGender: stringType(),
  dominantBudget: stringType(),
  dominantMood: stringType(),
  dominantScentFamily: stringType(),
  dominantOccasion: stringType(),
  topFragrance: stringType(),
  averageMatchScore: numberType()
});
const CrossAnalysisItemSchema = objectType({
  primaryKey: stringType(),
  primaryLabel: stringType(),
  total: numberType().int(),
  distribution: arrayType(DistributionItemSchema)
});
const CrossAnalysisSchema = objectType({
  ageByScent: arrayType(CrossAnalysisItemSchema),
  occupationByBudget: arrayType(CrossAnalysisItemSchema),
  moodByScent: arrayType(CrossAnalysisItemSchema),
  occasionByScent: arrayType(CrossAnalysisItemSchema),
  budgetByFragrance: arrayType(CrossAnalysisItemSchema)
});
const RecommendationQualitySchema = objectType({
  overallAverageMatch: numberType(),
  highestPerformingFragrance: objectType({
    name: stringType(),
    house: stringType(),
    averageMatch: numberType(),
    count: numberType().int()
  }).nullable(),
  mostFrequentFragrance: objectType({
    name: stringType(),
    house: stringType(),
    count: numberType().int(),
    averageMatch: numberType()
  }).nullable(),
  bestBalancedFragrance: objectType({
    name: stringType(),
    house: stringType(),
    score: numberType(),
    count: numberType().int(),
    averageMatch: numberType()
  }).nullable(),
  averageMatchByScent: arrayType(DistributionItemSchema),
  averageMatchByBudget: arrayType(DistributionItemSchema)
});
const BusinessInsightSchema = objectType({
  id: stringType(),
  type: enumType([
    "scent_preference",
    "customer_segment",
    "fragrance_performer",
    "budget_affinity",
    "quality_signal"
  ]),
  title: stringType(),
  description: stringType(),
  supportingMetric: stringType(),
  sampleSize: numberType().int(),
  confidenceLevel: enumType(["Limited", "Emerging", "Established"])
});
const IntelligenceDataSchema = objectType({
  snapshot: arrayType(CustomerSnapshotItemSchema),
  segments: arrayType(CustomerSegmentSchema),
  crossAnalysis: CrossAnalysisSchema,
  recommendationQuality: RecommendationQualitySchema,
  insights: arrayType(BusinessInsightSchema),
  sampleSizeStatus: objectType({
    totalSessions: numberType().int(),
    confidenceLevel: enumType(["Limited", "Emerging", "Established"]),
    disclaimer: stringType()
  })
});
const FunnelStepSchema = objectType({
  key: stringType(),
  label: stringType(),
  count: numberType().int(),
  percentage: numberType(),
  // % of total started
  dropOffCount: numberType().int(),
  dropOffPercentage: numberType(),
  answerRate: numberType().optional()
});
const FunnelAnalyticsSchema = objectType({
  sampleSize: numberType().int(),
  started: numberType().int(),
  resultsViewed: numberType().int(),
  completed: numberType().int(),
  completionRate: numberType(),
  averageDurationSeconds: numberType().nullable(),
  highestDropOffStep: objectType({
    stepKey: stringType(),
    stepLabel: stringType(),
    dropOffCount: numberType().int(),
    dropOffPercentage: numberType()
  }).nullable(),
  steps: arrayType(FunnelStepSchema),
  sampleSizeStatus: objectType({
    totalSessions: numberType().int(),
    confidenceLevel: enumType(["Limited", "Emerging", "Established"]),
    disclaimer: stringType()
  })
});
const DashboardDataSchema = objectType({
  kpis: KpiSummarySchema,
  demographics: DemographicsAnalyticsSchema,
  olfactive: OlfactiveAnalyticsSchema,
  topFragrances: arrayType(TopFragranceItemSchema),
  recentSessions: arrayType(SessionListItemSchema),
  trend: arrayType(TrendItemSchema).default([]),
  intelligence: IntelligenceDataSchema.optional(),
  funnel: FunnelAnalyticsSchema.optional(),
  totalCount: numberType().int()
});
const GENDER_LABELS = {
  female: "Wanita (Feminine)",
  male: "Pria (Masculine)",
  unisex: "Unisex / Fleksibel",
  skip: "Dilewati",
  unspecified: "Tidak Ditentukan"
};
const AGE_LABELS = {
  under_18: "Di bawah 18",
  "18_24": "18–24 tahun",
  "25_34": "25–34 tahun",
  "35_44": "35–44 tahun",
  "45_plus": "45 tahun ke atas",
  skip: "Dilewati"
};
const OCCUPATION_LABELS = {
  student: "Pelajar / Mahasiswa",
  corporate: "Karyawan Swasta / BUMN",
  government: "PNS / ASN / Publik",
  entrepreneur: "Wirausaha / Bisnis",
  creative_freelance: "Kreatif / Freelancer",
  health_educator: "Medis / Edukasi",
  homemaker: "Ibu Rumah Tangga",
  other: "Lainnya",
  skip: "Dilewati"
};
const PRICE_LABELS = {
  under_50k: "< Rp50.000",
  "50k_100k": "Rp50.000 – 100.000",
  "100k_150k": "Rp100.000 – 150.000",
  "150k_200k": "Rp150.000 – 200.000",
  "200k_300k": "Rp200.000 – 300.000",
  above_300k: "> Rp300.000",
  depends_on_scent: "Fleksibel (Tergantung)",
  skip: "Dilewati"
};
const SCENT_FAMILY_LABELS = {
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
  aquatic: "Segar Akuatik"
};
const MOOD_LABELS = {
  mysterious: "Mysterious (Hangat & Memikat)",
  radiant: "Radiant (Segar Berenergi)",
  serene: "Serene (Tenang & Rileks)",
  empowered: "Empowered (Tegas & Percaya Diri)"
};
const OCCASION_LABELS = {
  daily: "Harian / Kerja",
  casual: "Santai / Hangout",
  romance: "Kencan / Spesial",
  night: "Malam / Formal",
  outdoor: "Outdoor / Olahraga",
  family: "Keluarga",
  special_event: "Momen Spesial"
};
const INTENSITY_LABELS = {
  lembut: "Lembut (Dekat Tubuh)",
  seimbang: "Seimbang (Radius 1-2m)",
  semerbak: "Semerbak (Jejak Kuat)"
};
const ATMOSPHERE_LABELS = {
  clean_morning: "Pagi Segar / Bersih",
  rainy_city: "Kota Seusai Hujan",
  flower_garden: "Taman Bunga",
  shady_forest: "Hutan Teduh",
  cozy_cafe: "Kafe Hangat",
  sunset_golden_hour: "Senja Keemasan"
};
function aggregateSessionsData(records, eventsOrNow = [], nowParam = /* @__PURE__ */ new Date()) {
  const actualEvents = Array.isArray(eventsOrNow) ? eventsOrNow : [];
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
        mostPopularScentFamily: null
      },
      demographics: {
        gender: [],
        ageRange: [],
        occupation: [],
        priceRange: []
      },
      olfactive: {
        scentFamilies: [],
        moods: [],
        atmospheres: [],
        occasions: [],
        intensities: []
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
            percentage: 0
          },
          {
            dimension: "occupation",
            label: "Pekerjaan Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0
          },
          {
            dimension: "gender",
            label: "Gender Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0
          },
          {
            dimension: "price",
            label: "Budget 30ml Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0
          },
          {
            dimension: "scent",
            label: "Keluarga Aroma Teratas",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0
          },
          {
            dimension: "mood",
            label: "Mood / Karakter Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0
          },
          {
            dimension: "occasion",
            label: "Momen Pemakaian Dominan",
            value: "Belum Ada Data",
            count: 0,
            percentage: 0
          }
        ],
        segments: [],
        crossAnalysis: {
          ageByScent: [],
          occupationByBudget: [],
          moodByScent: [],
          occasionByScent: [],
          budgetByFragrance: []
        },
        recommendationQuality: {
          overallAverageMatch: 0,
          highestPerformingFragrance: null,
          mostFrequentFragrance: null,
          bestBalancedFragrance: null,
          averageMatchByScent: [],
          averageMatchByBudget: []
        },
        insights: [],
        sampleSizeStatus: {
          totalSessions: 0,
          confidenceLevel: "Limited",
          disclaimer: "Belum ada sesi konsultasi yang tercatat di database."
        }
      },
      funnel,
      totalCount: 0
    };
  }
  const nowMs = now.getTime();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const sevenDaysAgo = nowMs - 7 * 24 * 60 * 60 * 1e3;
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;
  let totalMatchSum = 0;
  const genderCounts = {};
  const ageCounts = {};
  const occCounts = {};
  const priceCounts = {};
  const scentCounts = {};
  const moodCounts = {};
  const atmCounts = {};
  const occaCounts = {};
  const intCounts = {};
  const trendMap = {};
  const fragranceStats = {};
  for (const r of records) {
    const recordTime = r.created_at ? new Date(r.created_at) : now;
    const createdAtTime = recordTime.getTime();
    if (createdAtTime >= startOfToday) todayCount++;
    if (createdAtTime >= sevenDaysAgo) weekCount++;
    if (createdAtTime >= startOfMonth) monthCount++;
    totalMatchSum += r.top_match_percent || 0;
    const dateKey = recordTime.toISOString().split("T")[0];
    trendMap[dateKey] = (trendMap[dateKey] || 0) + 1;
    const g = r.gender || "skip";
    genderCounts[g] = (genderCounts[g] || 0) + 1;
    const a = r.age_range || "skip";
    ageCounts[a] = (ageCounts[a] || 0) + 1;
    const occ = r.occupation || "skip";
    occCounts[occ] = (occCounts[occ] || 0) + 1;
    const pr = r.price_range || "skip";
    priceCounts[pr] = (priceCounts[pr] || 0) + 1;
    if (r.mood) moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
    if (r.atmosphere) atmCounts[r.atmosphere] = (atmCounts[r.atmosphere] || 0) + 1;
    if (r.occasion) occaCounts[r.occasion] = (occaCounts[r.occasion] || 0) + 1;
    if (r.intensity) intCounts[r.intensity] = (intCounts[r.intensity] || 0) + 1;
    if (Array.isArray(r.scent_families)) {
      for (const sf of r.scent_families) {
        if (sf && typeof sf === "string") {
          scentCounts[sf] = (scentCounts[sf] || 0) + 1;
        }
      }
    }
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
              totalMatch: 0
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
      const fid = r.top_fragrance_id || r.top_fragrance_name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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
          totalMatch: 0
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
  const buildDist = (counts, labelDict, denominator = totalCount) => {
    const denom = denominator > 0 ? denominator : 1;
    return Object.entries(counts).map(([key, count]) => ({
      key,
      label: labelDict[key] || key.replace(/_/g, " "),
      count,
      percentage: Number((count / denom * 100).toFixed(1))
    })).sort((a, b) => b.count - a.count);
  };
  const totalScentSelections = Object.values(scentCounts).reduce((acc, curr) => acc + curr, 0);
  const scentDist = buildDist(scentCounts, SCENT_FAMILY_LABELS, totalScentSelections || totalCount);
  const mostPopScent = scentDist[0]?.label || null;
  const topFragranceList = Object.entries(fragranceStats).map(([fid, stat]) => ({
    rank: 0,
    fragranceId: fid,
    name: stat.name,
    house: stat.house,
    recommendationCount: stat.count,
    rank1Count: stat.rank1Count,
    rank2Count: stat.rank2Count,
    rank3Count: stat.rank3Count,
    rank1Percentage: stat.count > 0 ? Number((stat.rank1Count / stat.count * 100).toFixed(1)) : 0,
    minMatchPercent: stat.minMatch,
    maxMatchPercent: stat.maxMatch,
    averageMatchPercent: Number((stat.totalMatch / (stat.count || 1)).toFixed(1))
  })).sort(
    (a, b) => b.recommendationCount - a.recommendationCount || b.averageMatchPercent - a.averageMatchPercent
  ).slice(0, 10).map((item, idx) => ({ ...item, rank: idx + 1 }));
  const mostRecFragrance = topFragranceList[0]?.name || null;
  const averageMatchScore = totalCount > 0 ? Number((totalMatchSum / totalCount).toFixed(1)) : 0;
  const trendList = Object.entries(trendMap).map(([date, sessions]) => ({ date, sessions })).sort((a, b) => a.date.localeCompare(b.date));
  const recentSessions = records.slice(0, 50).map((r) => ({
    sessionId: r.session_id,
    createdAt: r.created_at || (/* @__PURE__ */ new Date()).toISOString(),
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
    clientPlatform: r.client_platform || "kiosk_web"
  }));
  const getDominant = (dist, dimension, label) => {
    const valid = dist.filter((d) => d.key !== "skip" && d.key !== "unspecified");
    const top = valid[0] || dist[0] || { label: "Belum Ada Data", count: 0, percentage: 0 };
    return {
      dimension,
      label,
      value: top.label,
      count: top.count,
      percentage: top.percentage
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
  const snapshot = [
    getDominant(ageDist, "age", "Kelompok Usia Dominan"),
    getDominant(occDist, "occupation", "Pekerjaan Dominan"),
    getDominant(genderDist, "gender", "Gender Dominan"),
    getDominant(priceDist, "price", "Budget 30ml Dominan"),
    getDominant(scentDist, "scent", "Keluarga Aroma Teratas"),
    getDominant(moodDist, "mood", "Mood / Karakter Dominan"),
    getDominant(occaDist, "occasion", "Momen Pemakaian Dominan")
  ];
  const segmentBuckets = {};
  for (const r of records) {
    const age = r.age_range || "skip";
    const occ = r.occupation || "skip";
    const segKey = `${age}__${occ}`;
    const ageLabel = AGE_LABELS[age] || age;
    const occLabel = OCCUPATION_LABELS[occ] || occ;
    if (!segmentBuckets[segKey]) {
      segmentBuckets[segKey] = {
        label: `${occLabel} (${ageLabel})`,
        sessions: []
      };
    }
    segmentBuckets[segKey].sessions.push(r);
  }
  const segments = Object.entries(segmentBuckets).filter(([key]) => !key.includes("skip")).map(([segKey, b]) => {
    const segCount = b.sessions.length;
    const segPct = totalCount > 0 ? Number((segCount / totalCount * 100).toFixed(1)) : 0;
    const sGender = {};
    const sBudget = {};
    const sMood = {};
    const sScent = {};
    const sOccasion = {};
    const sFrag = {};
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
    const topKey = (dict, labelDict) => {
      const sorted = Object.entries(dict).sort((a, b2) => b2[1] - a[1]);
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
      topFragrance: Object.entries(sFrag).sort((a, b2) => b2[1] - a[1])[0]?.[0] || "Belum ada",
      averageMatchScore: segCount > 0 ? Number((sMatchSum / segCount).toFixed(1)) : 0
    };
  }).sort((a, b) => b.count - a.count).slice(0, 6);
  const buildCross = (primaryField, primaryLabels, secondaryField, secondaryLabels) => {
    const matrix = {};
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
    return Object.entries(matrix).map(([pKey, m]) => ({
      primaryKey: pKey,
      primaryLabel: primaryLabels[pKey] || pKey,
      total: m.total,
      distribution: Object.entries(m.counts).map(([sKey, cnt]) => ({
        key: sKey,
        label: secondaryLabels[sKey] || sKey,
        count: cnt,
        percentage: m.total > 0 ? Number((cnt / m.total * 100).toFixed(1)) : 0
      })).sort((a, b) => b.count - a.count)
    })).sort((a, b) => b.total - a.total);
  };
  const crossAnalysis = {
    ageByScent: buildCross("age_range", AGE_LABELS, "scent_families", SCENT_FAMILY_LABELS),
    occupationByBudget: buildCross("occupation", OCCUPATION_LABELS, "price_range", PRICE_LABELS),
    moodByScent: buildCross("mood", MOOD_LABELS, "scent_families", SCENT_FAMILY_LABELS),
    occasionByScent: buildCross("occasion", OCCASION_LABELS, "scent_families", SCENT_FAMILY_LABELS),
    budgetByFragrance: buildCross("price_range", PRICE_LABELS, "top_fragrance_name", {})
  };
  const scentMatchMap = {};
  const budgetMatchMap = {};
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
  const buildAvgDist = (map, labelMap) => {
    return Object.entries(map).map(([k, stat]) => ({
      key: k,
      label: labelMap[k] || k,
      count: stat.count,
      percentage: stat.count > 0 ? Number((stat.sum / stat.count).toFixed(1)) : 0
    })).sort((a, b) => b.percentage - a.percentage);
  };
  const validFragStats = topFragranceList.filter((f) => f.recommendationCount >= 1);
  const highestPerforming = validFragStats.slice().sort((a, b) => b.averageMatchPercent - a.averageMatchPercent)[0] || null;
  const mostFrequent = validFragStats.slice().sort((a, b) => b.recommendationCount - a.recommendationCount)[0] || null;
  const bestBalanced = validFragStats.slice().sort(
    (a, b) => b.recommendationCount * b.averageMatchPercent - a.recommendationCount * a.averageMatchPercent
  )[0] || null;
  const recommendationQuality = {
    overallAverageMatch: averageMatchScore,
    highestPerformingFragrance: highestPerforming ? {
      name: highestPerforming.name,
      house: highestPerforming.house,
      averageMatch: highestPerforming.averageMatchPercent,
      count: highestPerforming.recommendationCount
    } : null,
    mostFrequentFragrance: mostFrequent ? {
      name: mostFrequent.name,
      house: mostFrequent.house,
      count: mostFrequent.recommendationCount,
      averageMatch: mostFrequent.averageMatchPercent
    } : null,
    bestBalancedFragrance: bestBalanced ? {
      name: bestBalanced.name,
      house: bestBalanced.house,
      score: Number(
        (bestBalanced.recommendationCount * (bestBalanced.averageMatchPercent / 100)).toFixed(
          1
        )
      ),
      count: bestBalanced.recommendationCount,
      averageMatch: bestBalanced.averageMatchPercent
    } : null,
    averageMatchByScent: buildAvgDist(scentMatchMap, SCENT_FAMILY_LABELS),
    averageMatchByBudget: buildAvgDist(budgetMatchMap, PRICE_LABELS)
  };
  const insights = [];
  const confidenceLevel = totalCount < 20 ? "Limited" : totalCount < 100 ? "Emerging" : "Established";
  if (scentDist.length > 0 && scentDist[0].count > 0) {
    const topS = scentDist[0];
    insights.push({
      id: "insight_scent_pref",
      type: "scent_preference",
      title: `${topS.label} Menjadi Preferensi Teratas`,
      description: `Aroma ${topS.label} menempati ${topS.percentage}% dari total pemilihan aroma pelanggan.`,
      supportingMetric: `${topS.percentage}% (${topS.count} pilihan)`,
      sampleSize: totalCount,
      confidenceLevel
    });
  }
  if (segments.length > 0) {
    const topSeg = segments[0];
    insights.push({
      id: "insight_customer_seg",
      type: "customer_segment",
      title: `Segmen Utama: ${topSeg.label}`,
      description: `Konsultasi saat ini terkonsentrasi pada segmen ${topSeg.label} dengan preferensi aroma ${topSeg.dominantScentFamily} dan budget ${topSeg.dominantBudget}.`,
      supportingMetric: `${topSeg.percentage}% dari total sesi`,
      sampleSize: topSeg.count,
      confidenceLevel
    });
  }
  if (topFragranceList.length > 0) {
    const topF = topFragranceList[0];
    insights.push({
      id: "insight_frag_perf",
      type: "fragrance_performer",
      title: `${topF.name} Memimpin Rekomendasi`,
      description: `${topF.name} (${topF.house}) paling sering direkomendasikan dengan rata-rata kecocokan ${topF.averageMatchPercent}%.`,
      supportingMetric: `${topF.recommendationCount} kali (${topF.averageMatchPercent}% match)`,
      sampleSize: totalCount,
      confidenceLevel
    });
  }
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
        confidenceLevel
      });
    }
  }
  if (totalCount > 0) {
    insights.push({
      id: "insight_quality",
      type: "quality_signal",
      title: `Akurasi Formula Match Rata-Rata ${averageMatchScore}%`,
      description: `Sistem rekomendasi 10D menghasilkan tingkat kecocokan rata-rata yang stabil across seluruh preferensi profil.`,
      supportingMetric: `${averageMatchScore}% Rata-Rata`,
      sampleSize: totalCount,
      confidenceLevel
    });
  }
  const sampleSizeStatus = {
    totalSessions: totalCount,
    confidenceLevel,
    disclaimer: totalCount < 20 ? `Sampel data saat ini berjumlah N=${totalCount} (Fase Uji Coba & Pengembangan). Wawasan analitik merupakan sinyal awal dan akan semakin representatif seiring bertambahnya sesi konsultasi gerai.` : totalCount < 100 ? `Sampel data berkembang N=${totalCount}. Pola preferensi mulai menunjukkan tren yang stabil.` : `Sampel data matang N=${totalCount}. Analisis representatif untuk pengambilan keputusan ritel.`
  };
  const intelligence = {
    snapshot,
    segments,
    crossAnalysis,
    recommendationQuality,
    insights,
    sampleSizeStatus
  };
  return {
    kpis: {
      totalConsultations: totalCount,
      consultationsToday: todayCount,
      consultationsThisWeek: weekCount,
      consultationsThisMonth: monthCount,
      completionRate: 100,
      averageMatchScore,
      mostRecommendedFragrance: mostRecFragrance,
      mostPopularScentFamily: mostPopScent
    },
    demographics: {
      gender: genderDist,
      ageRange: ageDist,
      occupation: occDist,
      priceRange: priceDist
    },
    olfactive: {
      scentFamilies: scentDist,
      moods: moodDist,
      atmospheres: atmDist,
      occasions: occaDist,
      intensities: intDist
    },
    topFragrances: topFragranceList,
    recentSessions,
    trend: trendList,
    intelligence,
    funnel,
    totalCount
  };
}
async function getDashboardAnalytics(filters) {
  const supabase = getSupabaseServerClient();
  const events = await getConsultationEvents();
  if (!supabase) {
    return aggregateSessionsData([], events);
  }
  try {
    let query = supabase.from("customer_sessions").select("*").order("created_at", { ascending: false }).limit(1e3);
    if (filters?.gender) query = query.eq("gender", filters.gender);
    if (filters?.ageRange) query = query.eq("age_range", filters.ageRange);
    if (filters?.occupation) query = query.eq("occupation", filters.occupation);
    if (filters?.priceRange) query = query.eq("price_range", filters.priceRange);
    if (filters?.topFragrance)
      query = query.ilike("top_fragrance_name", `%${filters.topFragrance}%`);
    if (filters?.dateRange && filters.dateRange !== "all") {
      const now = /* @__PURE__ */ new Date();
      if (filters.dateRange === "today") {
        const startOfToday = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ).toISOString();
        query = query.gte("created_at", startOfToday);
      } else if (filters.dateRange === "7d") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3).toISOString();
        query = query.gte("created_at", sevenDaysAgo);
      } else if (filters.dateRange === "30d") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3).toISOString();
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
async function getSessionDetail(sessionId) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from("customer_sessions").select("*").eq("session_id", sessionId).maybeSingle();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}
async function deleteCustomerSession(sessionId) {
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
    await deleteConsultationEventsBySessionId(sessionId);
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unexpected deletion error";
    console.warn("[AdminAnalytics] Unexpected delete error:", msg);
    return { success: false, error: msg };
  }
}
const ExportFilterSchema = objectType({
  dateRange: stringType().optional().default("all"),
  // "today" | "7d" | "30d" | "all"
  gender: stringType().optional(),
  ageRange: stringType().optional(),
  occupation: stringType().optional(),
  priceRange: stringType().optional(),
  mood: stringType().optional(),
  atmosphere: stringType().optional(),
  intensity: stringType().optional(),
  occasion: stringType().optional(),
  scentFamily: stringType().optional(),
  clientPlatform: stringType().optional(),
  topFragrance: stringType().optional(),
  authToken: stringType().optional()
});
function escapeCsvValue(val) {
  if (val === null || val === void 0) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function serializeToCsv(data, headers) {
  if (!data || data.length === 0) {
    return headers.map((h) => escapeCsvValue(h.label)).join(",") + "\r\n";
  }
  const headerLine = headers.map((h) => escapeCsvValue(h.label)).join(",");
  const rows = data.map(
    (row) => headers.map((h) => escapeCsvValue(row[h.key])).join(",")
  );
  return [headerLine, ...rows].join("\r\n");
}
function sanitizeConsultationRecords(records) {
  return records.map((r) => {
    const recs = Array.isArray(r.recommendations) ? r.recommendations : [];
    const r1 = recs[0];
    const r2 = recs[1];
    const r3 = recs[2];
    const families = Array.isArray(r.scent_families) ? r.scent_families.map((f) => SCENT_FAMILY_LABELS[f] || f).join(", ") : "";
    const rawCreatedAt = r.created_at;
    let formattedDate = "Belum diisi";
    if (rawCreatedAt) {
      try {
        const d = new Date(rawCreatedAt);
        formattedDate = !isNaN(d.getTime()) ? d.toISOString().replace("T", " ").substring(0, 19) : rawCreatedAt;
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
      recommendation_3_match: r3 ? `${r3.match_percent}%` : "Belum diisi"
    };
  });
}
function sanitizeFunnelRecords(events) {
  return events.map((e) => ({
    session_id: e.session_id,
    event_type: e.event_type,
    question_number: e.question_number ?? "-",
    step_id: e.step_id ?? "-",
    client_platform: e.client_platform || "kiosk_web",
    created_at: e.created_at || ""
  }));
}
function sanitizeRecommendationDetails(records) {
  const rows = [];
  for (const r of records) {
    const rawCreatedAt = r.created_at;
    let formattedDate = "Belum diisi";
    if (rawCreatedAt) {
      try {
        const d = new Date(rawCreatedAt);
        formattedDate = !isNaN(d.getTime()) ? d.toISOString().replace("T", " ").substring(0, 19) : rawCreatedAt;
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
          aura: rec.aura || "Belum diisi"
        });
      }
    } else if (r.top_fragrance_name) {
      rows.push({
        session_id: r.session_id,
        session_created_at: formattedDate,
        recommendation_rank: 1,
        fragrance_id: r.top_fragrance_id || r.top_fragrance_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        fragrance_name: r.top_fragrance_name,
        house: r.top_fragrance_house || "ABNA",
        category: "Unisex",
        match_percentage: (r.top_match_percent || 0) / 100,
        description: "Belum diisi",
        why_match: "Belum diisi",
        aura: "Belum diisi"
      });
    }
  }
  return rows;
}
function computeFragrancePerformanceRows(records) {
  const catalogFamilyMap = /* @__PURE__ */ new Map();
  for (const f of RAW_FRAGRANCES) {
    if (f.id) catalogFamilyMap.set(f.id.toLowerCase(), f.fragranceFamily || "Woody Aromatic");
    if (f.name) catalogFamilyMap.set(f.name.toLowerCase(), f.fragranceFamily || "Woody Aromatic");
  }
  const statsMap = {};
  for (const r of records) {
    const recs = Array.isArray(r.recommendations) ? r.recommendations : [];
    if (recs.length > 0) {
      for (const rec of recs) {
        if (!rec || !rec.name) continue;
        const fid = rec.id || rec.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        if (!statsMap[fid]) {
          const family = catalogFamilyMap.get(fid.toLowerCase()) || catalogFamilyMap.get(rec.name.toLowerCase()) || (rec.category ? `Category: ${rec.category}` : "ABNA Signature");
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
            scentFamily: family
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
      const fid = r.top_fragrance_id || r.top_fragrance_name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const match = r.top_match_percent || 90;
      if (!statsMap[fid]) {
        const family = catalogFamilyMap.get(fid.toLowerCase()) || catalogFamilyMap.get(r.top_fragrance_name.toLowerCase()) || "ABNA Signature";
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
          scentFamily: family
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
  const list = Object.entries(statsMap).map(([fid, stat]) => ({
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
    scent_family: stat.scentFamily
  })).sort(
    (a, b) => b.total_recommendations - a.total_recommendations || b.average_match_score - a.average_match_score
  ).map((item, idx) => ({ ...item, rank: idx + 1 }));
  return list;
}
function buildFunnelStageRows(events, funnelAnalytics) {
  const startedSessions = /* @__PURE__ */ new Set();
  const resultsSessions = /* @__PURE__ */ new Set();
  const completedSessions = /* @__PURE__ */ new Set();
  const qViewedSets = {
    1: /* @__PURE__ */ new Set(),
    2: /* @__PURE__ */ new Set(),
    3: /* @__PURE__ */ new Set(),
    4: /* @__PURE__ */ new Set(),
    5: /* @__PURE__ */ new Set(),
    6: /* @__PURE__ */ new Set(),
    7: /* @__PURE__ */ new Set(),
    8: /* @__PURE__ */ new Set(),
    9: /* @__PURE__ */ new Set()
  };
  const qAnsweredSets = {
    1: /* @__PURE__ */ new Set(),
    2: /* @__PURE__ */ new Set(),
    3: /* @__PURE__ */ new Set(),
    4: /* @__PURE__ */ new Set(),
    5: /* @__PURE__ */ new Set(),
    6: /* @__PURE__ */ new Set(),
    7: /* @__PURE__ */ new Set(),
    8: /* @__PURE__ */ new Set(),
    9: /* @__PURE__ */ new Set()
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
  const avgDurStr = funnelAnalytics?.averageDurationSeconds ? `${Math.floor(funnelAnalytics.averageDurationSeconds / 60)}m ${Math.round(funnelAnalytics.averageDurationSeconds % 60)}s` : "N/A";
  const questionMeta = [
    { num: 1, label: "Karakter Aroma (Mood)" },
    { num: 2, label: "Jenis Aroma Favorit (Scent Family)" },
    { num: 3, label: "Suasana Aroma (Atmosphere)" },
    { num: 4, label: "Momen Pemakaian (Occasion)" },
    { num: 5, label: "Intensitas Aroma (Intensity)" },
    { num: 6, label: "Profil Pembeli (Gender)" },
    { num: 7, label: "Range Usia (Age Range)" },
    { num: 8, label: "Aktivitas Utama (Occupation)" },
    { num: 9, label: "Range Harga Nyaman (Price Range)" }
  ];
  const rawSequence = [{ stage: "Consultation Started", stage_id: "started", reached: started }];
  for (const q of questionMeta) {
    const vCount = qViewedSets[q.num].size;
    const aCount = qAnsweredSets[q.num].size;
    const aRate = vCount > 0 ? aCount / vCount : 0;
    rawSequence.push({
      stage: `Q${q.num} Viewed (${q.label})`,
      stage_id: `q${q.num}_viewed`,
      reached: vCount,
      answerRate: aRate
    });
    rawSequence.push({
      stage: `Q${q.num} Answered (${q.label})`,
      stage_id: `q${q.num}_answered`,
      reached: aCount,
      answerRate: 1
    });
  }
  rawSequence.push({
    stage: "Results Viewed",
    stage_id: "results_viewed",
    reached: resultsSessions.size
  });
  rawSequence.push({
    stage: "Consultation Completed",
    stage_id: "completed",
    reached: completedSessions.size
  });
  const rows = rawSequence.map((item, idx) => {
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
      answer_rate: item.answerRate ?? 1,
      average_duration: avgDurStr
    };
  });
  return rows;
}
const BRAND_COLORS = {
  deepEmerald: "FF064E3B",
  sandGold: "FFC5A059",
  sandGoldDark: "FF9A7B38",
  sandGoldLight: "FFFEF9EE",
  warmIvory: "FFFFFCF5",
  darkText: "FF020806",
  whiteText: "FFFFFFFF",
  borderLight: "FFE2E8F0",
  borderGold: "FFD4AF37"
};
async function generateAdminAnalyticsWorkbook(dashboard, records, events, filters, dateLabel) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ABNA PICKS Intelligence Engine";
  workbook.lastModifiedBy = "ABNA Admin Workspace";
  workbook.created = /* @__PURE__ */ new Date();
  workbook.modified = /* @__PURE__ */ new Date();
  workbook.properties.date1904 = false;
  const sanitizedConsultations = sanitizeConsultationRecords(records);
  const fragrancePerformanceList = computeFragrancePerformanceRows(records);
  const recommendationDetailsList = sanitizeRecommendationDetails(records);
  const funnelStagesList = buildFunnelStageRows(events, dashboard.funnel);
  const styleHeaderRow = (row, bgColor = BRAND_COLORS.deepEmerald, textColor = BRAND_COLORS.whiteText) => {
    row.height = 26;
    row.eachCell({ includeEmpty: false }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: bgColor }
      };
      cell.font = {
        name: "Segoe UI",
        size: 10,
        bold: true,
        color: { argb: textColor }
      };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = {
        top: { style: "thin", color: { argb: BRAND_COLORS.borderGold } },
        bottom: { style: "medium", color: { argb: BRAND_COLORS.borderGold } },
        left: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        right: { style: "thin", color: { argb: BRAND_COLORS.borderLight } }
      };
    });
  };
  const styleDataRow = (row, isEven = false) => {
    row.height = 20;
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = {
        name: "Segoe UI",
        size: 9.5,
        color: { argb: BRAND_COLORS.darkText }
      };
      if (isEven) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFBF9F5" }
        };
      }
      cell.border = {
        top: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        bottom: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        left: { style: "thin", color: { argb: BRAND_COLORS.borderLight } },
        right: { style: "thin", color: { argb: BRAND_COLORS.borderLight } }
      };
    });
  };
  const wsExec = workbook.addWorksheet("Executive Summary", {
    views: [{ showGridLines: true }],
    properties: { tabColor: { argb: BRAND_COLORS.sandGold } }
  });
  wsExec.mergeCells("A1:D1");
  const titleCell = wsExec.getCell("A1");
  titleCell.value = "ABNA PICKS · Customer & Fragrance Intelligence Report";
  titleCell.font = {
    name: "Segoe UI",
    size: 15,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText }
  };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.deepEmerald }
  };
  titleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(1).height = 36;
  wsExec.mergeCells("A2:D2");
  const subTitleCell = wsExec.getCell("A2");
  subTitleCell.value = `Periode Laporan: ${dateLabel} | Generated At: ${(/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19)} UTC`;
  subTitleCell.font = {
    name: "Segoe UI",
    size: 10,
    italic: true,
    color: { argb: BRAND_COLORS.sandGoldDark }
  };
  subTitleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.warmIvory }
  };
  subTitleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(2).height = 22;
  wsExec.getCell("A4").value = "EXECUTIVE METRIC";
  wsExec.getCell("B4").value = "NILAI";
  wsExec.getCell("C4").value = "SATUAN / FORMAT";
  wsExec.getCell("D4").value = "KETERANGAN";
  styleHeaderRow(wsExec.getRow(4));
  const kpis = dashboard.kpis;
  const avgDurText = dashboard.funnel?.averageDurationSeconds ? `${Math.floor(dashboard.funnel.averageDurationSeconds / 60)}m ${Math.round(dashboard.funnel.averageDurationSeconds % 60)}s` : "N/A";
  const kpiDataRows = [
    [
      "Total Consultations",
      kpis.totalConsultations,
      "Integer",
      "Total sesi konsultasi yang tercatat",
      "#,##0"
    ],
    [
      "Consultations Today",
      kpis.consultationsToday,
      "Integer",
      "Volume konsultasi 24 jam terakhir",
      "#,##0"
    ],
    [
      "Consultations This Week",
      kpis.consultationsThisWeek,
      "Integer",
      "Volume konsultasi 7 hari terakhir",
      "#,##0"
    ],
    [
      "Consultations This Month",
      kpis.consultationsThisMonth || 0,
      "Integer",
      "Volume konsultasi bulan berjalan",
      "#,##0"
    ],
    [
      "Completion Rate",
      (kpis.completionRate || 100) / 100,
      "Percentage",
      "Tingkat penyelesaian kuesioner",
      "0.0%"
    ],
    [
      "Average Match Score",
      (kpis.averageMatchScore || 0) / 100,
      "Percentage",
      "Rata-rata kecocokan formula 10D",
      "0.0%"
    ],
    [
      "Most Recommended Fragrance",
      kpis.mostRecommendedFragrance || "Belum ada data",
      "Text",
      "Parfum paling sering menempati Top 1",
      "@"
    ],
    [
      "Most Popular Scent Family",
      kpis.mostPopularScentFamily || "Belum ada data",
      "Text",
      "Keluarga aroma paling banyak dipilih",
      "@"
    ],
    [
      "Average Consultation Duration",
      avgDurText,
      "Duration",
      "Rata-rata waktu pengerjaan dari start hingga selesai",
      "@"
    ]
  ];
  let curRow = 5;
  for (const [metric, val, unit, desc, numFmt] of kpiDataRows) {
    const r = wsExec.getRow(curRow);
    r.getCell(1).value = metric;
    r.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
    r.getCell(2).value = val;
    r.getCell(2).alignment = {
      horizontal: typeof val === "number" ? "right" : "left",
      vertical: "middle"
    };
    if (numFmt && typeof val === "number") r.getCell(2).numFmt = numFmt;
    r.getCell(3).value = unit;
    r.getCell(3).alignment = { horizontal: "center", vertical: "middle" };
    r.getCell(4).value = desc;
    r.getCell(4).alignment = { horizontal: "left", vertical: "middle" };
    styleDataRow(r, curRow % 2 === 0);
    curRow++;
  }
  curRow += 2;
  wsExec.mergeCells(`A${curRow}:D${curRow}`);
  const insightHeader = wsExec.getCell(`A${curRow}`);
  insightHeader.value = "KEY BUSINESS INSIGHTS (DETERMINISTIC INTELLIGENCE ENGINE)";
  insightHeader.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText }
  };
  insightHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGold }
  };
  insightHeader.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(curRow).height = 28;
  curRow++;
  const sampleStatus = dashboard.intelligence?.sampleSizeStatus || {
    totalSessions: dashboard.totalCount,
    confidenceLevel: dashboard.totalCount < 20 ? "Limited" : dashboard.totalCount < 100 ? "Emerging" : "Established",
    disclaimer: dashboard.totalCount < 20 ? "Data masih dalam tahap pengembangan dan belum dapat digunakan untuk generalisasi pasar secara luas." : "Data representatif untuk evaluasi bisnis ritel."
  };
  wsExec.mergeCells(`A${curRow}:D${curRow}`);
  const sampleMeta = wsExec.getCell(`A${curRow}`);
  sampleMeta.value = `Sample Size: N = ${sampleStatus.totalSessions} | Evidence Level: ${sampleStatus.confidenceLevel} | Catatan: ${sampleStatus.disclaimer}`;
  sampleMeta.font = {
    name: "Segoe UI",
    size: 9.5,
    bold: true,
    color: { argb: BRAND_COLORS.darkText }
  };
  sampleMeta.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGoldLight }
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
  const wsSessions = workbook.addWorksheet("Consultation Sessions", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }]
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
    { key: "top_match_percent", header: "Top Match Score", width: 16 }
  ];
  wsSessions.columns = sessionCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width
  }));
  styleHeaderRow(wsSessions.getRow(1));
  wsSessions.autoFilter = { from: "A1", to: `Q${Math.max(2, sanitizedConsultations.length + 1)}` };
  sanitizedConsultations.forEach((row, idx) => {
    const r = wsSessions.addRow({
      ...row,
      top_match_percent: (row.top_match_percent || 0) / 100
    });
    styleDataRow(r, idx % 2 === 0);
    r.getCell("top_match_percent").numFmt = "0.0%";
    r.getCell("top_match_percent").alignment = { horizontal: "right", vertical: "middle" };
    r.getCell("completed").alignment = { horizontal: "center", vertical: "middle" };
  });
  const wsFunnel = workbook.addWorksheet("Funnel Analytics", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }]
  });
  const funnelCols = [
    { key: "stage", header: "Stage", width: 38 },
    { key: "stage_id", header: "Stage ID", width: 18 },
    { key: "sessions_reached", header: "Sessions Reached", width: 18 },
    { key: "conversion_rate", header: "Conversion Rate", width: 18 },
    { key: "drop_off_count", header: "Drop-off Count", width: 16 },
    { key: "drop_off_rate", header: "Drop-off Rate", width: 16 },
    { key: "answer_rate", header: "Answer Rate", width: 16 },
    { key: "average_duration", header: "Average Duration", width: 20 }
  ];
  wsFunnel.columns = funnelCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width
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
  const fnSummaryRowStart = funnelStagesList.length + 3;
  wsFunnel.mergeCells(`A${fnSummaryRowStart}:D${fnSummaryRowStart}`);
  const fnSummaryHeader = wsFunnel.getCell(`A${fnSummaryRowStart}`);
  fnSummaryHeader.value = "FUNNEL PERFORMANCE SUMMARY";
  fnSummaryHeader.font = {
    name: "Segoe UI",
    size: 11,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText }
  };
  fnSummaryHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGold }
  };
  fnSummaryHeader.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsFunnel.getRow(fnSummaryRowStart).height = 24;
  const fObj = dashboard.funnel;
  const funnelSummaryData = [
    ["Total Started", fObj?.started ?? 0, "#,##0"],
    ["Results Viewed", fObj?.resultsViewed ?? 0, "#,##0"],
    ["Completed", fObj?.completed ?? 0, "#,##0"],
    ["Overall Completion Rate", (fObj?.completionRate ?? 100) / 100, "0.0%"],
    [
      "Largest Drop-off Point",
      fObj?.highestDropOffStep ? `${fObj.highestDropOffStep.stepLabel} (-${fObj.highestDropOffStep.dropOffCount} sesi, ${fObj.highestDropOffStep.dropOffPercentage}%)` : "Tidak terdeteksi drop-off signifikan",
      "@"
    ],
    ["Average Consultation Duration", avgDurText, "@"]
  ];
  let fnRow = fnSummaryRowStart + 1;
  for (const [metric, val, numFmt] of funnelSummaryData) {
    const r = wsFunnel.getRow(fnRow);
    r.getCell(1).value = metric;
    r.getCell(2).value = val;
    if (numFmt && typeof val === "number") r.getCell(2).numFmt = numFmt;
    r.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
    r.getCell(2).alignment = {
      horizontal: typeof val === "number" ? "right" : "left",
      vertical: "middle"
    };
    styleDataRow(r, fnRow % 2 === 0);
    fnRow++;
  }
  const wsFrag = workbook.addWorksheet("Fragrance Performance", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }]
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
    { key: "scent_family", header: "Scent Family", width: 24 }
  ];
  wsFrag.columns = fragCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width
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
  const fragSumRowStart = fragrancePerformanceList.length + 3;
  wsFrag.mergeCells(`A${fragSumRowStart}:E${fragSumRowStart}`);
  const fragSumHead = wsFrag.getCell(`A${fragSumRowStart}`);
  fragSumHead.value = "FRAGRANCE PERFORMANCE HIGHLIGHTS";
  fragSumHead.font = {
    name: "Segoe UI",
    size: 11,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText }
  };
  fragSumHead.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.sandGold }
  };
  fragSumHead.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsFrag.getRow(fragSumRowStart).height = 24;
  const recQ = dashboard.intelligence?.recommendationQuality;
  const fragHighlights = [
    [
      "Highest Performing Fragrance",
      recQ?.highestPerformingFragrance ? `${recQ.highestPerformingFragrance.name} (${recQ.highestPerformingFragrance.house})` : "-",
      recQ?.highestPerformingFragrance ? `${recQ.highestPerformingFragrance.averageMatch}% average match` : "-"
    ],
    [
      "Most Frequent Fragrance",
      recQ?.mostFrequentFragrance ? `${recQ.mostFrequentFragrance.name} (${recQ.mostFrequentFragrance.house})` : "-",
      recQ?.mostFrequentFragrance ? `${recQ.mostFrequentFragrance.count} kali rekomendasi` : "-"
    ],
    [
      "Best Balanced Performer",
      recQ?.bestBalancedFragrance ? `${recQ.bestBalancedFragrance.name} (${recQ.bestBalancedFragrance.house})` : "-",
      recQ?.bestBalancedFragrance ? `Skor Keseimbangan ${recQ.bestBalancedFragrance.score}` : "-"
    ],
    ["Overall Average Match Score", "-", `${dashboard.kpis.averageMatchScore}%`]
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
  const wsPrefs = workbook.addWorksheet("Customer Preferences", {
    views: [{ showGridLines: true }]
  });
  wsPrefs.columns = [
    { key: "section", width: 24 },
    { key: "category", width: 34 },
    { key: "count", width: 16 },
    { key: "percentage", width: 16 }
  ];
  wsPrefs.mergeCells("A1:D1");
  const pTitle = wsPrefs.getCell("A1");
  pTitle.value = "ABNA PICKS · AGGREGATED CUSTOMER PREFERENCES";
  pTitle.font = { name: "Segoe UI", size: 14, bold: true, color: { argb: BRAND_COLORS.whiteText } };
  pTitle.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_COLORS.deepEmerald } };
  pTitle.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsPrefs.getRow(1).height = 32;
  let prefCurRow = 3;
  const prefSections = [
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
      note: "Multi-select: Setiap pilihan keluarga aroma dihitung secara independen."
    }
  ];
  for (const sec of prefSections) {
    wsPrefs.mergeCells(`A${prefCurRow}:D${prefCurRow}`);
    const secCell = wsPrefs.getCell(`A${prefCurRow}`);
    secCell.value = sec.note ? `${sec.title} (${sec.note})` : sec.title;
    secCell.font = {
      name: "Segoe UI",
      size: 11,
      bold: true,
      color: { argb: BRAND_COLORS.whiteText }
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
    prefCurRow++;
  }
  const wsBi = workbook.addWorksheet("Business Intelligence", {
    views: [{ showGridLines: true }]
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
    { key: "col9", width: 18 }
  ];
  let biRow = 1;
  wsBi.mergeCells(`A${biRow}:D${biRow}`);
  const snapTitle = wsBi.getCell(`A${biRow}`);
  snapTitle.value = "1. PERSONA SNAPSHOT (DOMINANT ATTRIBUTES)";
  snapTitle.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText }
  };
  snapTitle.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.deepEmerald }
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
  biRow += 2;
  wsBi.mergeCells(`A${biRow}:I${biRow}`);
  const segTitle = wsBi.getCell(`A${biRow}`);
  segTitle.value = "2. CUSTOMER SEGMENTS (AGE & OCCUPATION CLUSTERS)";
  segTitle.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText }
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
    "Average Match Score"
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
  biRow += 2;
  wsBi.mergeCells(`A${biRow}:D${biRow}`);
  const crossTitle = wsBi.getCell(`A${biRow}`);
  crossTitle.value = "3. CROSS-ANALYSIS MATRICES";
  crossTitle.font = {
    name: "Segoe UI",
    size: 12,
    bold: true,
    color: { argb: BRAND_COLORS.whiteText }
  };
  crossTitle.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: BRAND_COLORS.deepEmerald }
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
      sHead: "Scent Family"
    },
    {
      title: "Occupation × Budget",
      data: cross?.occupationByBudget,
      pHead: "Occupation",
      sHead: "Budget Range"
    },
    {
      title: "Mood × Scent Family",
      data: cross?.moodByScent,
      pHead: "Mood Character",
      sHead: "Scent Family"
    },
    {
      title: "Occasion × Scent Family",
      data: cross?.occasionByScent,
      pHead: "Occasion",
      sHead: "Scent Family"
    },
    {
      title: "Budget × Top Fragrance",
      data: cross?.budgetByFragrance,
      pHead: "Budget Range",
      sHead: "Top Fragrance Name"
    }
  ];
  for (const ct of crossTables) {
    wsBi.mergeCells(`A${biRow}:D${biRow}`);
    const tCell = wsBi.getCell(`A${biRow}`);
    tCell.value = `Matrix: ${ct.title}`;
    tCell.font = {
      name: "Segoe UI",
      size: 10.5,
      bold: true,
      color: { argb: BRAND_COLORS.darkText }
    };
    tCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: BRAND_COLORS.sandGoldLight }
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
  const wsRecDetails = workbook.addWorksheet("Recommendation Details", {
    views: [{ state: "frozen", ySplit: 1, showGridLines: true }]
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
    { key: "aura", header: "Aura", width: 28 }
  ];
  wsRecDetails.columns = recDetailCols.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width
  }));
  styleHeaderRow(wsRecDetails.getRow(1));
  wsRecDetails.autoFilter = {
    from: "A1",
    to: `K${Math.max(2, recommendationDetailsList.length + 1)}`
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
function generateBusinessReportMarkdown(dashboard, filters, dateLabel) {
  const k = dashboard.kpis;
  const intel = dashboard.intelligence;
  const f = dashboard.funnel;
  const sampleStatus = intel?.sampleSizeStatus || {
    totalSessions: dashboard.totalCount,
    confidenceLevel: dashboard.totalCount < 20 ? "Limited" : dashboard.totalCount < 100 ? "Emerging" : "Established",
    disclaimer: dashboard.totalCount < 20 ? "Data masih dalam tahap pengembangan dan belum dapat digunakan untuk generalisasi pasar secara luas." : "Data representatif untuk evaluasi bisnis ritel."
  };
  const lines = [
    `# ABNA PICKS · Customer & Fragrance Intelligence Report`,
    `**Generated At:** ${(/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19)} UTC`,
    `**Date Range:** ${dateLabel}`,
    `**Sample Size:** N = ${dashboard.totalCount} Sesi Konsultasi`,
    `**Evidence Level:** ${sampleStatus.confidenceLevel}`,
    `
---
`,
    `## 1. EXECUTIVE KPIS`,
    `- **Total Consultations:** ${k.totalConsultations} sesi`,
    `- **Consultations Today:** ${k.consultationsToday} sesi`,
    `- **Consultations This Week:** ${k.consultationsThisWeek} sesi`,
    `- **Consultations This Month:** ${k.consultationsThisMonth || 0} sesi`,
    `- **Completion Rate:** ${k.completionRate}%`,
    `- **Average Match Score:** ${k.averageMatchScore}%`,
    `- **Most Recommended Fragrance:** ${k.mostRecommendedFragrance || "Belum ada data"}`,
    `- **Most Popular Scent Family:** ${k.mostPopularScentFamily || "Belum ada data"}`,
    `- **Average Consultation Duration:** ${f?.averageDurationSeconds ? `${Math.floor(f.averageDurationSeconds / 60)}m ${Math.round(f.averageDurationSeconds % 60)}s` : "N/A"}`,
    `
---
`,
    `## 2. CUSTOMER PROFILE (DOMINANT PERSONA SNAPSHOT)`
  ];
  if (intel?.snapshot) {
    intel.snapshot.forEach((s) => {
      lines.push(`- **${s.label}:** ${s.value} (${s.count} sesi, ${s.percentage}%)`);
    });
  }
  lines.push(`
---
## 3. FRAGRANCE PERFORMANCE`);
  if (intel?.recommendationQuality) {
    const q = intel.recommendationQuality;
    lines.push(
      `- **Highest Performing Fragrance:** ${q.highestPerformingFragrance ? `${q.highestPerformingFragrance.name} (${q.highestPerformingFragrance.house}) — ${q.highestPerformingFragrance.averageMatch}% average match` : "-"}`
    );
    lines.push(
      `- **Most Frequent Fragrance:** ${q.mostFrequentFragrance ? `${q.mostFrequentFragrance.name} (${q.mostFrequentFragrance.house}) — ${q.mostFrequentFragrance.count} kali rekomendasi` : "-"}`
    );
    lines.push(
      `- **Best Balanced Performer:** ${q.bestBalancedFragrance ? `${q.bestBalancedFragrance.name} (${q.bestBalancedFragrance.house}) — Skor Keseimbangan ${q.bestBalancedFragrance.score}` : "-"}`
    );
    lines.push(`- **Overall Average Match Score:** ${k.averageMatchScore}%`);
  }
  lines.push(`
---
## 4. FUNNEL PERFORMANCE`);
  if (f) {
    lines.push(`- **Total Started:** ${f.started} sesi`);
    lines.push(`- **Results Viewed:** ${f.resultsViewed} sesi`);
    lines.push(`- **Completed:** ${f.completed} sesi`);
    lines.push(`- **Overall Completion Rate:** ${f.completionRate}%`);
    if (f.highestDropOffStep) {
      lines.push(
        `- **Largest Drop-off Point:** ${f.highestDropOffStep.stepLabel} (-${f.highestDropOffStep.dropOffCount} sesi, ${f.highestDropOffStep.dropOffPercentage}%)`
      );
    }
  }
  lines.push(`
---
## 5. BUSINESS INTELLIGENCE & KEY FINDINGS`);
  if (intel?.insights && intel.insights.length > 0) {
    intel.insights.forEach((ins, idx) => {
      lines.push(`### ${idx + 1}. ${ins.title}`);
      lines.push(`${ins.description}`);
      lines.push(
        `*Metrik Pendukung: ${ins.supportingMetric} (Level Bukti: ${ins.confidenceLevel})*
`
      );
    });
  } else {
    lines.push(`Belum ada temuan analitik signifikan yang tercatat.
`);
  }
  lines.push(`---
## 6. DATA LIMITATIONS`);
  lines.push(
    `- **Status Sampel:** N = ${sampleStatus.totalSessions} (${sampleStatus.confidenceLevel})`
  );
  lines.push(`- **Catatan Metodologi:** ${sampleStatus.disclaimer}`);
  lines.push(`- **Kepatuhan Privasi:** Nol PII (Zero Personally Identifiable Information).`);
  lines.push(
    `
---
*Laporan ini dihasilkan secara deterministik oleh ABNA PICKS Intelligence Engine.*`
  );
  return lines.join("\n");
}
export {
  DashboardDataSchema as D,
  ExportFilterSchema as E,
  getSessionDetail as a,
  aggregateSessionsData as b,
  generateAdminAnalyticsWorkbook as c,
  deleteCustomerSession as d,
  computeFragrancePerformanceRows as e,
  sanitizeRecommendationDetails as f,
  getDashboardAnalytics as g,
  buildFunnelStageRows as h,
  serializeToCsv as i,
  sanitizeFunnelRecords as j,
  generateBusinessReportMarkdown as k,
  sanitizeConsultationRecords as s
};
