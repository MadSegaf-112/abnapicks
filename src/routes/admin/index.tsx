import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  Sparkles,
  Award,
  TrendingUp,
  RefreshCw,
  LogOut,
  Filter,
  Eye,
  X,
  Compass,
  DollarSign,
  Briefcase,
  LayoutDashboard,
  Clock,
  ArrowUpRight,
  Search,
  Sliders,
  Flame,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  PieChart,
  Lightbulb,
  Layers,
  BarChart3,
  ShieldCheck,
  Target,
  GitCommit,
  ArrowDown,
  Timer,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  CheckCircle,
  FileSpreadsheet as ExcelIcon,
  Code,
  FileCheck2,
} from "lucide-react";
import {
  getAdminDashboardData,
  getAdminSessionDetail,
  deleteAdminSession,
  exportAdminAnalyticsXlsxServerFn,
  exportAdminAnalyticsJsonServerFn,
  exportConsultationsServerFn,
  exportFunnelEventsServerFn,
  generateBusinessReportServerFn,
} from "@/lib/admin.functions";
import {
  type DashboardData,
  type DistributionItem,
  type CustomerSegment,
  type BusinessInsight,
  GENDER_LABELS,
  AGE_LABELS,
} from "@/lib/admin-analytics.service";
import type { CustomerSessionRecord } from "@/lib/customer-session.repository";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Workspace · ABNA PICKS Intelligence" },
      {
        name: "description",
        content: "Executive retail fragrance analytics and customer insights for ABNA Parfum.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

type WorkspaceTab =
  | "overview"
  | "sessions"
  | "recommendations"
  | "preferences"
  | "intelligence"
  | "journey"
  | "export";

function AdminDashboardPage() {
  const navigate = useNavigate();
  const fetchDashboardFn = useServerFn(getAdminDashboardData);
  const fetchDetailFn = useServerFn(getAdminSessionDetail);
  const deleteSessionFn = useServerFn(deleteAdminSession);
  const exportXlsxFn = useServerFn(exportAdminAnalyticsXlsxServerFn);
  const exportJsonFn = useServerFn(exportAdminAnalyticsJsonServerFn);
  const exportConsultationsFn = useServerFn(exportConsultationsServerFn);
  const exportFunnelEventsFn = useServerFn(exportFunnelEventsServerFn);
  const generateReportFn = useServerFn(generateBusinessReportServerFn);

  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [dateFilter, setDateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [occFilter, setOccFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchFragrance, setSearchFragrance] = useState("");

  // Export UX States
  const [exportingXlsx, setExportingXlsx] = useState(false);
  const [exportingJson, setExportingJson] = useState(false);
  const [exportingConsultationsCsv, setExportingConsultationsCsv] = useState(false);
  const [exportingConsultationsJson, setExportingConsultationsJson] = useState(false);
  const [exportingFunnelCsv, setExportingFunnelCsv] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generatedReportMarkdown, setGeneratedReportMarkdown] = useState<string | null>(null);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Modal State for Session Detail
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessionDetail, setSessionDetail] = useState<CustomerSessionRecord | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Delete Confirmation Modal State
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [deletingSession, setDeletingSession] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Auth Verification State (Prevents flash of dashboard content before auth is verified)
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Clock state for header
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }),
      );
      setCurrentDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Verify Authentication State (Guaranteed completion, no infinite hangs or redirect loops)
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        if (!supabase) {
          if (isMounted) {
            setIsAuthenticated(false);
            setAuthChecked(true);
            navigate({ to: "/admin/login", replace: true });
          }
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (!session) {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({ to: "/admin/login", replace: true });
          return;
        }

        // Check for admin role/claim strictly via server-assigned app_metadata (reject mutable user_metadata)
        const user = session.user;
        const isAdmin =
          user.app_metadata?.is_admin === true ||
          user.app_metadata?.role === "admin" ||
          !user.app_metadata?.role; // allow default admin setup if not yet using multi-tier roles

        if (!isAdmin) {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({ to: "/admin/login", replace: true });
          return;
        }

        setIsAuthenticated(true);
        setAuthChecked(true);
      } catch (err) {
        console.warn("[AdminAuth] Auth verification error:", err);
        if (isMounted) {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({ to: "/admin/login", replace: true });
        }
      }
    };

    checkAuth();

    // Also listen to live auth changes (e.g. token refresh, sign-in, sign-out)
    const supabase = getSupabaseBrowserClient();
    const { data: authListener } = supabase?.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (session) {
        const user = session.user;
        const isAdmin =
          user.app_metadata?.is_admin === true ||
          user.app_metadata?.role === "admin" ||
          !user.app_metadata?.role;

        if (isAdmin) {
          setIsAuthenticated(true);
          setAuthChecked(true);
        } else {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({ to: "/admin/login", replace: true });
        }
      } else {
        setIsAuthenticated(false);
        setAuthChecked(true);
        navigate({ to: "/admin/login", replace: true });
      }
    }) ?? { data: null };

    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  // 2. Fetch Dashboard Data (Only after auth is successfully verified and user is authenticated)
  const loadDashboard = useCallback(async () => {
    if (!authChecked || !isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDashboardFn({
        data: {
          gender: genderFilter || undefined,
          ageRange: ageFilter || undefined,
          occupation: occFilter || undefined,
          priceRange: priceFilter || undefined,
          topFragrance: searchFragrance || undefined,
          dateRange: dateFilter || undefined,
        },
      });
      setData(res);
    } catch (err) {
      console.warn("[AdminDashboard] Fetch error:", err);
      setError(err instanceof Error ? err.message : "Gagal memuat analitik dashboard.");
    } finally {
      setLoading(false);
    }
  }, [
    authChecked,
    isAuthenticated,
    genderFilter,
    ageFilter,
    occFilter,
    priceFilter,
    searchFragrance,
    dateFilter,
    fetchDashboardFn,
  ]);

  // Client-Side Browser File Download Trigger (Text / JSON / Markdown)
  const triggerFileDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Client-Side Browser Binary Download Trigger (Base64 XLSX)
  const triggerBase64Download = (base64: string, filename: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Primary Export: Multi-Sheet Professional Excel Workbook (.xlsx)
  const handleExportXlsx = async () => {
    setExportingXlsx(true);
    setExportSuccessMessage(null);
    try {
      const res = await exportXlsxFn({
        data: {
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || undefined,
            ageRange: ageFilter || undefined,
            occupation: occFilter || undefined,
            priceRange: priceFilter || undefined,
            topFragrance: searchFragrance || undefined,
          },
        },
      });
      if (res.success && res.base64) {
        triggerBase64Download(res.base64, res.filename, res.mimeType);
        setExportSuccessMessage(`Laporan Excel (.xlsx) berhasil diunduh (${res.sampleSize} sesi).`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export XLSX gagal.");
    } finally {
      setExportingXlsx(false);
    }
  };

  // Secondary Export: Developer / System JSON Dataset
  const handleExportJson = async () => {
    setExportingJson(true);
    setExportSuccessMessage(null);
    try {
      const res = await exportJsonFn({
        data: {
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || undefined,
            ageRange: ageFilter || undefined,
            occupation: occFilter || undefined,
            priceRange: priceFilter || undefined,
            topFragrance: searchFragrance || undefined,
          },
        },
      });
      if (res.success && res.content) {
        triggerFileDownload(res.content, res.filename, res.mimeType);
        setExportSuccessMessage(`Dataset JSON berhasil diunduh (${res.sampleSize} sesi).`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export JSON gagal.");
    } finally {
      setExportingJson(false);
    }
  };

  // Export Consultation Handlers
  const handleExportConsultationsCsv = async () => {
    setExportingConsultationsCsv(true);
    setExportSuccessMessage(null);
    try {
      const res = await exportConsultationsFn({
        data: {
          format: "csv",
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || undefined,
            ageRange: ageFilter || undefined,
            occupation: occFilter || undefined,
            priceRange: priceFilter || undefined,
            topFragrance: searchFragrance || undefined,
          },
        },
      });
      if (res.success && res.content) {
        triggerFileDownload(res.content, res.filename, res.mimeType);
        setExportSuccessMessage("Export CSV Konsultasi berhasil diunduh.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export CSV gagal.");
    } finally {
      setExportingConsultationsCsv(false);
    }
  };

  const handleExportConsultationsJson = async () => {
    setExportingConsultationsJson(true);
    setExportSuccessMessage(null);
    try {
      const res = await exportConsultationsFn({
        data: {
          format: "json",
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || undefined,
            ageRange: ageFilter || undefined,
            occupation: occFilter || undefined,
            priceRange: priceFilter || undefined,
            topFragrance: searchFragrance || undefined,
          },
        },
      });
      if (res.success && res.content) {
        triggerFileDownload(res.content, res.filename, res.mimeType);
        setExportSuccessMessage("Export JSON Konsultasi berhasil diunduh.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export JSON gagal.");
    } finally {
      setExportingConsultationsJson(false);
    }
  };

  const handleExportFunnelCsv = async () => {
    setExportingFunnelCsv(true);
    setExportSuccessMessage(null);
    try {
      const res = await exportFunnelEventsFn({
        data: {
          filters: {
            dateRange: dateFilter,
          },
        },
      });
      if (res.success && res.content) {
        triggerFileDownload(res.content, res.filename, res.mimeType);
        setExportSuccessMessage("Export CSV Funnel berhasil diunduh.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export Funnel CSV gagal.");
    } finally {
      setExportingFunnelCsv(false);
    }
  };

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    setExportSuccessMessage(null);
    try {
      const res = await generateReportFn({
        data: {
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || undefined,
            ageRange: ageFilter || undefined,
            occupation: occFilter || undefined,
            priceRange: priceFilter || undefined,
            topFragrance: searchFragrance || undefined,
          },
        },
      });
      if (res.success && res.reportMarkdown) {
        setGeneratedReportMarkdown(res.reportMarkdown);
        setExportSuccessMessage(`Laporan Bisnis (${res.dateLabel}) berhasil digenerate.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal generate laporan bisnis.");
    } finally {
      setGeneratingReport(false);
    }
  };

  useEffect(() => {
    if (authChecked && isAuthenticated) {
      loadDashboard();
    }
  }, [authChecked, isAuthenticated, loadDashboard]);

  // 3. Handle Session Detail Inspection
  const handleOpenSession = async (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setLoadingDetail(true);
    try {
      const detail = await fetchDetailFn({ data: { sessionId } });
      setSessionDetail(detail);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedSessionId(null);
    setSessionDetail(null);
  };

  // 4. Handle Session Deletion
  const handlePromptDelete = (sessionId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSessionToDelete(sessionId);
    setDeleteError(null);
  };

  const handleCancelDelete = () => {
    setSessionToDelete(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!sessionToDelete) return;
    setDeletingSession(true);
    setDeleteError(null);
    try {
      const res = await deleteSessionFn({ data: { sessionId: sessionToDelete } });
      if (!res.success) {
        throw new Error(res.error || "Gagal menghapus sesi.");
      }
      // If modal was open for this session, close it
      if (selectedSessionId === sessionToDelete) {
        handleCloseModal();
      }
      setSessionToDelete(null);
      // Reload dashboard KPIs & sessions list
      await loadDashboard();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus sesi.";
      setDeleteError(msg);
    } finally {
      setDeletingSession(false);
    }
  };

  // 5. Handle Logout
  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("abna_admin_session");
    navigate({ to: "/admin/login" });
  };

  // Filtered session count badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (genderFilter) count++;
    if (ageFilter) count++;
    if (occFilter) count++;
    if (priceFilter) count++;
    if (searchFragrance) count++;
    return count;
  }, [genderFilter, ageFilter, occFilter, priceFilter, searchFragrance]);

  if (!authChecked || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffcf5]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-[var(--emerald-sig)]" />
          <span className="font-body text-xs font-semibold tracking-wider text-[var(--sand-deep)] uppercase">
            Memverifikasi Akses Admin...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcf5] text-[#020806] selection:bg-[var(--emerald-sig)] selection:text-white flex flex-col md:flex-row relative overflow-x-hidden">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-[var(--emerald-sig)]/5 blur-[120px]" />
        <div className="absolute top-1/2 left-20 h-[450px] w-[450px] rounded-full bg-[var(--sand-gold)]/10 blur-[130px]" />
      </div>

      {/* 1. FLOATING VERTICAL DOCK (Inspired by dashboard reference) */}
      <aside className="sticky top-0 z-40 flex w-full md:w-[76px] md:flex-col justify-between items-center bg-white/85 border-b md:border-b-0 md:border-r border-[var(--sand-gold)]/35 backdrop-blur-xl px-3 py-2.5 sm:px-4 sm:py-3 md:py-6 md:px-3.5 md:min-h-screen shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Brand Emblem & Navigation Group */}
        <div className="flex items-center md:flex-col gap-2 sm:gap-3 md:gap-6 min-w-0 flex-1 md:flex-initial overflow-x-auto md:overflow-visible scrollbar-hide py-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--emerald-sig)] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/20 hover:scale-105 transition-transform cursor-pointer"
            title="ABNA Picks Admin Workspace"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--sand-gold)]" />
          </button>

          {/* Navigation Items (Scrollable horizontally on mobile/small tablet, vertical on desktop) */}
          <nav className="flex md:flex-col items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
            <DockButton
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <DockButton
              icon={<Users className="h-4 w-4" />}
              label="Log Sesi"
              active={activeTab === "sessions"}
              onClick={() => setActiveTab("sessions")}
              badge={data?.totalCount ? String(data.totalCount) : undefined}
            />
            <DockButton
              icon={<Award className="h-4 w-4" />}
              label="Parfum"
              active={activeTab === "recommendations"}
              onClick={() => setActiveTab("recommendations")}
            />
            <DockButton
              icon={<Compass className="h-4 w-4" />}
              label="Preferensi"
              active={activeTab === "preferences"}
              onClick={() => setActiveTab("preferences")}
            />
            <DockButton
              icon={<Lightbulb className="h-4 w-4" />}
              label="Intelijen Bisnis"
              active={activeTab === "intelligence"}
              onClick={() => setActiveTab("intelligence")}
            />
            <DockButton
              icon={<GitCommit className="h-4 w-4" />}
              label="Alur Perjalanan"
              active={activeTab === "journey"}
              onClick={() => setActiveTab("journey")}
            />
            <DockButton
              icon={<Download className="h-4 w-4" />}
              label="Laporan & Export"
              active={activeTab === "export"}
              onClick={() => setActiveTab("export")}
            />
          </nav>
        </div>

        {/* Utility Controls */}
        <div className="flex md:flex-col items-center gap-1.5 sm:gap-2 shrink-0 pl-2 md:pl-0 border-l md:border-l-0 border-stone-200/80">
          <button
            type="button"
            onClick={() => loadDashboard()}
            title="Segarkan Data"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-stone-200 bg-white/90 text-muted-foreground hover:text-foreground hover:border-[var(--emerald-sig)] transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${loading ? "animate-spin text-[var(--emerald-sig)]" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            title="Keluar dari Admin"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50/60 text-red-700 hover:bg-red-100 transition-all cursor-pointer shadow-xs"
          >
            <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 z-10 px-4 py-6 sm:px-8 md:px-10 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Top Greeting & Ambient Status Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--sand-gold)]/30">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/40 bg-white/70 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ABNA PICKS Live · Sistem Aktif</span>
            </div>
            <h1 className="font-display mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#020806]">
              Selamat Datang di Abna Picks Intelligence
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground font-body">
              Pemantauan data konsultasi aroma pelanggan ABNA Parfum secara real-time.
            </p>
          </div>

          {/* Clock & Date Widget (Reference inspiration) */}
          <div className="flex items-center gap-3 self-start sm:self-auto rounded-2xl border border-[var(--sand-gold)]/35 bg-white/80 p-3.5 shadow-xs backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-base font-bold text-[#020806] leading-none">
                {currentTime || "00:00"}
              </div>
              <div className="text-[10px] font-medium text-muted-foreground mt-1">
                {currentDate || "Memuat tanggal..."}
              </div>
            </div>
          </div>
        </header>

        {/* Error Notice */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
            {error}
          </div>
        )}

        {/* 3. EXECUTIVE KPI CARDS (Modular Glass Cards) */}
        <section className="mt-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {/* Total Consultations */}
            <KpiGlassCard
              icon={<Users className="h-4 w-4 text-[var(--sand-deep)]" />}
              label="Total Konsultasi"
              value={loading ? "..." : String(data?.kpis.totalConsultations ?? 0)}
              subtext="Total sesi di gerai"
              highlight="bg-[var(--sand-gold)]/15 text-[var(--sand-deep)]"
            />

            {/* Consultations Today */}
            <KpiGlassCard
              icon={<Calendar className="h-4 w-4 text-[var(--emerald-sig)]" />}
              label="Sesi Hari Ini"
              value={loading ? "..." : String(data?.kpis.consultationsToday ?? 0)}
              subtext="24 jam terakhir"
              highlight="bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]"
            />

            {/* Consultations This Week */}
            <KpiGlassCard
              icon={<TrendingUp className="h-4 w-4 text-amber-700" />}
              label="Pekan Ini"
              value={loading ? "..." : String(data?.kpis.consultationsThisWeek ?? 0)}
              subtext="Volume 7 hari terakhir"
              highlight="bg-amber-100/70 text-amber-800"
            />

            {/* Top Fragrance Overall */}
            <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  Parfum Terpopuler
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                  <Award className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="mt-2.5 truncate font-display text-lg sm:text-xl font-black text-[#020806]">
                {loading ? "..." : data?.kpis.mostRecommendedFragrance || "Belum ada data"}
              </div>
              <p className="mt-1 text-[10px] font-medium text-muted-foreground truncate">
                {data?.kpis.mostPopularScentFamily
                  ? `Keluarga: ${data.kpis.mostPopularScentFamily}`
                  : "Menunggu konsultasi gerai"}
              </p>
            </div>
          </div>
        </section>

        {/* 4. WORKSPACE TAB SELECTOR BAR */}
        <div className="mt-8 flex items-center justify-between border-b border-[var(--sand-gold)]/30 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <TabPill
              label="Overview Ringkas"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <TabPill
              label="Log Konsultasi"
              active={activeTab === "sessions"}
              onClick={() => setActiveTab("sessions")}
              badge={data?.totalCount ? String(data.totalCount) : undefined}
            />
            <TabPill
              label="Analisis Parfum"
              active={activeTab === "recommendations"}
              onClick={() => setActiveTab("recommendations")}
            />
            <TabPill
              label="Preferensi Pelanggan"
              active={activeTab === "preferences"}
              onClick={() => setActiveTab("preferences")}
            />
            <TabPill
              label="Intelijen Bisnis"
              active={activeTab === "intelligence"}
              onClick={() => setActiveTab("intelligence")}
            />
            <TabPill
              label="Alur Perjalanan & Funnel"
              active={activeTab === "journey"}
              onClick={() => setActiveTab("journey")}
            />
            <TabPill
              label="Laporan & Export"
              active={activeTab === "export"}
              onClick={() => setActiveTab("export")}
            />
          </div>

          {/* Quick Active Filter Indicator */}
          {activeFiltersCount > 0 && (
            <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--emerald-sig)] bg-[var(--emerald-sig)]/10 px-3 py-1 rounded-full">
              <Filter className="h-3 w-3" />
              <span>{activeFiltersCount} Filter Aktif</span>
            </div>
          )}
        </div>

        {/* 5. TAB VIEWPORT CONTENT */}
        <div className="mt-6 flex-1">
          <AnimatePresence mode="wait">
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 2-Column Grid: Scent Family & Demographics Summary */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* Popular Scent Families */}
                  <div className="lg:col-span-6 rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-[var(--emerald-sig)]" />
                        <h3 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                          Aroma Paling Banyak Dipilih
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("preferences")}
                        className="text-[11px] font-semibold text-[var(--emerald-sig)] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Lihat Semua</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="mt-5 space-y-3">
                      {data?.olfactive.scentFamilies.length ? (
                        data.olfactive.scentFamilies
                          .slice(0, 5)
                          .map((item) => (
                            <EditorialBarProgress
                              key={item.key}
                              item={item}
                              color="bg-[var(--emerald-sig)]"
                            />
                          ))
                      ) : (
                        <EmptyListText text="Belum ada data preferensi aroma" />
                      )}
                    </div>
                  </div>

                  {/* Customer Segment Breakdown */}
                  <div className="lg:col-span-6 rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[var(--sand-deep)]" />
                        <h3 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                          Distribusi Profil Pelanggan
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("preferences")}
                        className="text-[11px] font-semibold text-[var(--emerald-sig)] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Demografi</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="mt-5 space-y-4">
                      <div>
                        <div className="text-[11px] font-bold text-muted-foreground uppercase mb-2">
                          Gender
                        </div>
                        <div className="space-y-2">
                          {data?.demographics.gender.slice(0, 2).map((item) => (
                            <EditorialBarProgress
                              key={item.key}
                              item={item}
                              color="bg-[var(--sand-deep)]"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-[var(--sand-gold)]/20">
                        <div className="text-[11px] font-bold text-muted-foreground uppercase mb-2">
                          Rentang Usia Utama
                        </div>
                        <div className="space-y-2">
                          {data?.demographics.ageRange.slice(0, 3).map((item) => (
                            <EditorialBarProgress key={item.key} item={item} color="bg-amber-700" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Consultation Stream (Compact table preview) */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20">
                    <div>
                      <h3 className="font-display text-base font-bold text-[#020806]">
                        Konsultasi Terbaru Gerai
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        Sesi konsultasi yang baru saja diselesaikan pelanggan di kiosk
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("sessions")}
                      className="inline-flex items-center gap-1 rounded-xl bg-[var(--emerald-sig)] px-3.5 py-1.5 text-xs font-semibold text-[#fffcf5] hover:bg-[var(--emerald-deep)] transition-all cursor-pointer shadow-xs"
                    >
                      <span>Buka Log Lengkap</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#020806]">
                      <thead className="border-b border-stone-100 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="py-3 px-2">Waktu Sesi</th>
                          <th className="py-3 px-2">Profil Pelanggan</th>
                          <th className="py-3 px-2">Rekomendasi Teratas</th>
                          <th className="py-3 px-2 text-right">Match</th>
                          <th className="py-3 px-2 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {data?.recentSessions.length ? (
                          data.recentSessions.slice(0, 5).map((session) => (
                            <tr
                              key={session.sessionId}
                              className="hover:bg-[#fffcf5] transition-colors"
                            >
                              <td className="py-3 px-2 font-mono text-[11px] text-muted-foreground">
                                {new Date(session.createdAt).toLocaleDateString("id-ID", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                              <td className="py-3 px-2">
                                <span className="font-semibold">{session.gender || "—"}</span>
                                <span className="text-muted-foreground text-[11px]">
                                  {" "}
                                  · {session.ageRange || "—"} · {session.occupation || "—"}
                                </span>
                              </td>
                              <td className="py-3 px-2">
                                <div className="font-bold text-[#020806]">
                                  {session.topFragranceName}
                                </div>
                                <div className="text-[10px] text-muted-foreground">
                                  {session.topFragranceHouse}
                                </div>
                              </td>
                              <td className="py-3 px-2 text-right font-mono font-bold text-[var(--emerald-sig)]">
                                {session.topMatchPercent}%
                              </td>
                              <td className="py-3 px-2 text-right">
                                <div className="inline-flex items-center gap-1.5 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenSession(session.sessionId)}
                                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#020806] hover:border-[var(--emerald-sig)] hover:text-[var(--emerald-sig)] transition-colors cursor-pointer"
                                  >
                                    <Eye className="h-3 w-3" />
                                    <span>Detail</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => handlePromptDelete(session.sessionId, e)}
                                    title="Hapus Sesi"
                                    className="inline-flex items-center justify-center rounded-lg border border-stone-200 bg-white p-1 text-[11px] text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="py-8 text-center text-xs text-muted-foreground"
                            >
                              Belum ada sesi konsultasi yang tersimpan
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SESSIONS LOG & FILTER EXPLORER */}
            {activeTab === "sessions" && (
              <motion.div
                key="tab-sessions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Search & Filter Control Bar */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Search by Top Fragrance */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={searchFragrance}
                        onChange={(e) => setSearchFragrance(e.target.value)}
                        placeholder="Cari berdasarkan nama parfum..."
                        className="w-full rounded-xl border border-stone-200 bg-[#fffcf5] pl-10 pr-4 py-2 text-xs font-medium text-foreground focus:border-[var(--emerald-sig)] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Filter Selects */}
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="rounded-xl border border-stone-200 bg-[#fffcf5] px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-[var(--emerald-sig)] cursor-pointer"
                      >
                        <option value="">Semua Gender</option>
                        <option value="female">Wanita</option>
                        <option value="male">Pria</option>
                      </select>

                      <select
                        value={ageFilter}
                        onChange={(e) => setAgeFilter(e.target.value)}
                        className="rounded-xl border border-stone-200 bg-[#fffcf5] px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-[var(--emerald-sig)] cursor-pointer"
                      >
                        <option value="">Semua Usia</option>
                        <option value="under_18">&lt; 18 tahun</option>
                        <option value="18_24">18–24 tahun</option>
                        <option value="25_34">25–34 tahun</option>
                        <option value="35_44">35–44 tahun</option>
                        <option value="45_plus">45+ tahun</option>
                      </select>

                      <select
                        value={occFilter}
                        onChange={(e) => setOccFilter(e.target.value)}
                        className="rounded-xl border border-stone-200 bg-[#fffcf5] px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-[var(--emerald-sig)] cursor-pointer"
                      >
                        <option value="">Semua Pekerjaan</option>
                        <option value="student">Pelajar / Mahasiswa</option>
                        <option value="corporate">Karyawan Swasta</option>
                        <option value="government">PNS / ASN</option>
                        <option value="entrepreneur">Wirausaha</option>
                        <option value="creative_freelance">Kreatif / Freelance</option>
                      </select>

                      {activeFiltersCount > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setGenderFilter("");
                            setAgeFilter("");
                            setOccFilter("");
                            setPriceFilter("");
                            setSearchFragrance("");
                          }}
                          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Sessions Explorer Table */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#020806]">
                      <thead className="border-b border-stone-100 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-stone-50/50">
                        <tr>
                          <th className="p-3.5">Waktu Sesi</th>
                          <th className="p-3.5">Gender</th>
                          <th className="p-3.5">Rentang Usia</th>
                          <th className="p-3.5">Pekerjaan</th>
                          <th className="p-3.5">Budget 30ml</th>
                          <th className="p-3.5">Rekomendasi Utama</th>
                          <th className="p-3.5 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {data?.recentSessions.length ? (
                          data.recentSessions.map((session) => (
                            <tr
                              key={session.sessionId}
                              className="hover:bg-[#fffcf5] transition-colors"
                            >
                              <td className="p-3.5 font-mono text-[11px] text-muted-foreground">
                                {new Date(session.createdAt).toLocaleDateString("id-ID", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                              <td className="p-3.5 font-medium">{session.gender || "—"}</td>
                              <td className="p-3.5 font-medium">{session.ageRange || "—"}</td>
                              <td className="p-3.5 font-medium">{session.occupation || "—"}</td>
                              <td className="p-3.5 font-medium">{session.priceRange || "—"}</td>
                              <td className="p-3.5">
                                <div className="font-bold text-[#020806]">
                                  {session.topFragranceName}
                                </div>
                                <div className="text-[10px] text-muted-foreground">
                                  {session.topFragranceHouse} · {session.topMatchPercent}% Cocok
                                </div>
                              </td>
                              <td className="p-3.5 text-right">
                                <div className="inline-flex items-center gap-1.5 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenSession(session.sessionId)}
                                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-[#020806] hover:bg-[var(--emerald-sig)] hover:text-[#fffcf5] hover:border-[var(--emerald-sig)] transition-all cursor-pointer shadow-2xs"
                                  >
                                    <Eye className="h-3 w-3" />
                                    <span>Lihat</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => handlePromptDelete(session.sessionId, e)}
                                    title="Hapus Sesi"
                                    className="inline-flex items-center justify-center rounded-lg border border-stone-200 bg-white p-1 text-[11px] text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer shadow-2xs"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={7}
                              className="p-8 text-center text-xs text-muted-foreground"
                            >
                              Tidak ada sesi konsultasi yang cocok dengan kriteria filter
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: RECOMMENDATION ANALYTICS */}
            {activeTab === "recommendations" && (
              <motion.div
                key="tab-recommendations"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#020806]">
                        Top 10 Parfum Paling Sering Direkomendasikan
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        Peringkat parfum yang paling sering cocok dengan preferensi olfaktif
                        pelanggan
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.topFragrances.length ? (
                      data.topFragrances.map((f) => (
                        <div
                          key={f.fragranceId}
                          className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:border-[var(--emerald-sig)] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black ${
                                f.rank === 1
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : f.rank === 2
                                    ? "bg-stone-100 text-stone-700 border border-stone-300"
                                    : f.rank === 3
                                      ? "bg-orange-100 text-orange-800 border border-orange-300"
                                      : "bg-stone-50 text-stone-600 border border-stone-200"
                              }`}
                            >
                              #{f.rank}
                            </span>
                            <div>
                              <div className="font-display font-bold text-sm text-[#020806]">
                                {f.name}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                House: {f.house}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-xs font-bold text-[var(--emerald-sig)]">
                              {f.recommendationCount} kali
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              Rata-rata {f.averageMatchPercent}% match
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 p-8 text-center text-xs text-muted-foreground">
                        Belum ada data rekomendasi tersimpan
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: CUSTOMER PREFERENCES DEEP DIVE */}
            {activeTab === "preferences" && (
              <motion.div
                key="tab-preferences"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Karakter / Mood */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-4 w-4 text-violet-600" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Karakter Aroma (Mood)
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {data?.olfactive.moods.length ? (
                        data.olfactive.moods.map((item) => (
                          <EditorialBarProgress key={item.key} item={item} color="bg-violet-600" />
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data" />
                      )}
                    </div>
                  </div>

                  {/* Suasana / Atmosphere */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Compass className="h-4 w-4 text-sky-600" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Suasana Aroma
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {data?.olfactive.atmospheres.length ? (
                        data.olfactive.atmospheres.map((item) => (
                          <EditorialBarProgress key={item.key} item={item} color="bg-sky-600" />
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data" />
                      )}
                    </div>
                  </div>

                  {/* Momen / Occasion */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-4 w-4 text-amber-700" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Momen Pemakaian
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {data?.olfactive.occasions.length ? (
                        data.olfactive.occasions.map((item) => (
                          <EditorialBarProgress key={item.key} item={item} color="bg-amber-700" />
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data" />
                      )}
                    </div>
                  </div>

                  {/* Intensitas Aroma */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Flame className="h-4 w-4 text-rose-600" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Tingkat Intensitas
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {data?.olfactive.intensities.length ? (
                        data.olfactive.intensities.map((item) => (
                          <EditorialBarProgress key={item.key} item={item} color="bg-rose-600" />
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data" />
                      )}
                    </div>
                  </div>

                  {/* Pekerjaan / Aktivitas */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-4 w-4 text-emerald-700" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Aktivitas / Pekerjaan
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {data?.demographics.occupation.length ? (
                        data.demographics.occupation
                          .slice(0, 5)
                          .map((item) => (
                            <EditorialBarProgress
                              key={item.key}
                              item={item}
                              color="bg-emerald-700"
                            />
                          ))
                      ) : (
                        <EmptyListText text="Belum ada data" />
                      )}
                    </div>
                  </div>

                  {/* Range Budget */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="h-4 w-4 text-teal-700" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Range Budget (30ml)
                      </h4>
                    </div>
                    <div className="space-y-2.5">
                      {data?.demographics.priceRange.length ? (
                        data.demographics.priceRange.map((item) => (
                          <EditorialBarProgress key={item.key} item={item} color="bg-teal-700" />
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: BUSINESS INTELLIGENCE & ADVANCED CUSTOMER INSIGHTS */}
            {activeTab === "intelligence" && (
              <motion.div
                key="tab-intelligence"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 1. Sample Size & Intelligence Confidence Banner */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/40 bg-white/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-base font-black text-[#020806]">
                            Fragrance Customer Intelligence
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              data?.intelligence?.sampleSizeStatus.confidenceLevel === "Established"
                                ? "bg-emerald-100 text-emerald-800"
                                : data?.intelligence?.sampleSizeStatus.confidenceLevel ===
                                    "Emerging"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            Tingkat Bukti:{" "}
                            {data?.intelligence?.sampleSizeStatus.confidenceLevel || "Limited"}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground font-body">
                          {data?.intelligence?.sampleSizeStatus.disclaimer ||
                            "Menganalisis pola konsultasi aroma pelanggan secara deterministik."}
                        </p>
                      </div>
                    </div>

                    <div className="self-start sm:self-auto rounded-xl bg-[#fffcf5] border border-stone-200 px-3 py-1.5 font-mono text-xs font-bold text-[#020806]">
                      N = {data?.totalCount ?? 0} Sesi
                    </div>
                  </div>
                </div>

                {/* 2. Deterministic Business Insights Grid */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-amber-600" />
                    <h3 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                      Wawasan Bisnis & Sinyal Ritel
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.intelligence?.insights.length ? (
                      data.intelligence.insights.map((insight) => (
                        <div
                          key={insight.id}
                          className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-2xs backdrop-blur-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-muted-foreground mb-1.5">
                              <span>{insight.type.replace(/_/g, " ")}</span>
                              <span className="font-mono text-[var(--emerald-sig)]">
                                {insight.supportingMetric}
                              </span>
                            </div>
                            <h4 className="font-display text-sm font-bold text-[#020806]">
                              {insight.title}
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground font-body leading-relaxed">
                              {insight.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                            <span>Sampel N={insight.sampleSize}</span>
                            <span className="font-semibold">{insight.confidenceLevel}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 p-8 text-center text-xs text-muted-foreground">
                        Belum ada wawasan bisnis yang terdeteksi
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Customer Profile Snapshot (Dominant Persona Attributes) */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--sand-gold)]/20">
                    <Target className="h-4 w-4 text-[var(--emerald-sig)]" />
                    <div>
                      <h3 className="font-display text-base font-bold text-[#020806]">
                        Snapshot Persona Dominan Pelanggan
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        Atribut preferensi dengan frekuensi tertinggi dari seluruh sesi konsultasi
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {data?.intelligence?.snapshot.map((snap) => (
                      <div
                        key={snap.dimension}
                        className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3.5 shadow-2xs"
                      >
                        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          {snap.label}
                        </div>
                        <div className="mt-1 font-display text-sm font-bold text-[#020806] truncate">
                          {snap.value}
                        </div>
                        <div className="mt-1 font-mono text-[11px] text-[var(--emerald-sig)] font-semibold">
                          {snap.percentage}% ({snap.count} sesi)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Practical Customer Segments Breakdown */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-[var(--sand-deep)]" />
                      <div>
                        <h3 className="font-display text-base font-bold text-[#020806]">
                          Segmen Pelanggan yang Terbentuk
                        </h3>
                        <p className="text-xs text-muted-foreground font-body">
                          Klaster berbasis korelasi Usia × Pekerjaan dan preferensi aroma terkait
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.intelligence?.segments.length ? (
                      data.intelligence.segments.map((seg) => (
                        <div
                          key={seg.segmentKey}
                          className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:border-[var(--emerald-sig)] transition-colors"
                        >
                          <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                            <span className="font-display text-sm font-bold text-[#020806]">
                              {seg.label}
                            </span>
                            <span className="font-mono text-xs font-bold text-[var(--emerald-sig)]">
                              {seg.percentage}% ({seg.count})
                            </span>
                          </div>

                          <div className="mt-3 space-y-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Aroma Favorit:</span>
                              <span className="font-semibold text-[#020806]">
                                {seg.dominantScentFamily}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Budget Dominan:</span>
                              <span className="font-semibold text-[#020806]">
                                {seg.dominantBudget}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Mood Dominan:</span>
                              <span className="font-semibold text-[#020806]">
                                {seg.dominantMood}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Top Parfum:</span>
                              <span className="font-semibold text-[var(--emerald-sig)] truncate max-w-[120px]">
                                {seg.topFragrance}
                              </span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-stone-50 font-mono text-[11px]">
                              <span className="text-muted-foreground">Rata-rata Match:</span>
                              <span className="font-bold text-[var(--emerald-sig)]">
                                {seg.averageMatchScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 p-8 text-center text-xs text-muted-foreground">
                        Belum ada segmen yang terbentuk dengan observasi yang cukup
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Cross-Analysis Matrices (2-Column Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Age x Scent Family */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20">
                      <BarChart3 className="h-4 w-4 text-[var(--emerald-sig)]" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Korelasi Usia × Keluarga Aroma
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {data?.intelligence?.crossAnalysis.ageByScent.length ? (
                        data.intelligence.crossAnalysis.ageByScent.map((group) => (
                          <div
                            key={group.primaryKey}
                            className="rounded-xl border border-stone-100 bg-[#fffcf5] p-3"
                          >
                            <div className="flex justify-between items-center text-xs font-bold text-[#020806] mb-2">
                              <span>{group.primaryLabel}</span>
                              <span className="font-mono text-[11px] text-muted-foreground">
                                {group.total} pilihan
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {group.distribution.slice(0, 3).map((item) => (
                                <EditorialBarProgress
                                  key={item.key}
                                  item={item}
                                  color="bg-[var(--emerald-sig)]"
                                />
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data korelasi usia dan aroma" />
                      )}
                    </div>
                  </div>

                  {/* Occupation x Budget */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20">
                      <Briefcase className="h-4 w-4 text-emerald-700" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Korelasi Pekerjaan × Budget 30ml
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {data?.intelligence?.crossAnalysis.occupationByBudget.length ? (
                        data.intelligence.crossAnalysis.occupationByBudget.map((group) => (
                          <div
                            key={group.primaryKey}
                            className="rounded-xl border border-stone-100 bg-[#fffcf5] p-3"
                          >
                            <div className="flex justify-between items-center text-xs font-bold text-[#020806] mb-2">
                              <span>{group.primaryLabel}</span>
                              <span className="font-mono text-[11px] text-muted-foreground">
                                {group.total} sesi
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {group.distribution.slice(0, 3).map((item) => (
                                <EditorialBarProgress
                                  key={item.key}
                                  item={item}
                                  color="bg-emerald-700"
                                />
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data korelasi pekerjaan dan budget" />
                      )}
                    </div>
                  </div>

                  {/* Mood x Scent Family */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20">
                      <Sparkles className="h-4 w-4 text-violet-600" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Korelasi Mood × Aroma
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {data?.intelligence?.crossAnalysis.moodByScent.length ? (
                        data.intelligence.crossAnalysis.moodByScent.map((group) => (
                          <div
                            key={group.primaryKey}
                            className="rounded-xl border border-stone-100 bg-[#fffcf5] p-3"
                          >
                            <div className="flex justify-between items-center text-xs font-bold text-[#020806] mb-2">
                              <span>{group.primaryLabel}</span>
                              <span className="font-mono text-[11px] text-muted-foreground">
                                {group.total} pilihan
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {group.distribution.slice(0, 3).map((item) => (
                                <EditorialBarProgress
                                  key={item.key}
                                  item={item}
                                  color="bg-violet-600"
                                />
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data korelasi mood dan aroma" />
                      )}
                    </div>
                  </div>

                  {/* Occasion x Scent Family */}
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20">
                      <Calendar className="h-4 w-4 text-amber-700" />
                      <h4 className="text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase">
                        Korelasi Momen × Aroma
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {data?.intelligence?.crossAnalysis.occasionByScent.length ? (
                        data.intelligence.crossAnalysis.occasionByScent.map((group) => (
                          <div
                            key={group.primaryKey}
                            className="rounded-xl border border-stone-100 bg-[#fffcf5] p-3"
                          >
                            <div className="flex justify-between items-center text-xs font-bold text-[#020806] mb-2">
                              <span>{group.primaryLabel}</span>
                              <span className="font-mono text-[11px] text-muted-foreground">
                                {group.total} pilihan
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {group.distribution.slice(0, 3).map((item) => (
                                <EditorialBarProgress
                                  key={item.key}
                                  item={item}
                                  color="bg-amber-700"
                                />
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyListText text="Belum ada data korelasi momen dan aroma" />
                      )}
                    </div>
                  </div>
                </div>

                {/* 6. Recommendation Quality Matrix */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--sand-gold)]/20">
                    <Award className="h-4 w-4 text-[var(--emerald-sig)]" />
                    <div>
                      <h3 className="font-display text-base font-bold text-[#020806]">
                        Analisis Kualitas & Keseimbangan Formula Rekomendasi
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        Mengevaluasi akurasi formula dan keseimbangan volume rekomendasi produk
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Akurasi Tertinggi (Match Rata-Rata)
                      </div>
                      <div className="mt-2 font-display text-base font-bold text-[#020806]">
                        {data?.intelligence?.recommendationQuality.highestPerformingFragrance
                          ?.name || "Belum ada"}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {
                          data?.intelligence?.recommendationQuality.highestPerformingFragrance
                            ?.house
                        }
                      </div>
                      <div className="mt-2 font-mono text-xs font-bold text-[var(--emerald-sig)]">
                        {
                          data?.intelligence?.recommendationQuality.highestPerformingFragrance
                            ?.averageMatch
                        }
                        % Match (
                        {
                          data?.intelligence?.recommendationQuality.highestPerformingFragrance
                            ?.count
                        }{" "}
                        sesi)
                      </div>
                    </div>

                    <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Volume Rekomendasi Tertinggi
                      </div>
                      <div className="mt-2 font-display text-base font-bold text-[#020806]">
                        {data?.intelligence?.recommendationQuality.mostFrequentFragrance?.name ||
                          "Belum ada"}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {data?.intelligence?.recommendationQuality.mostFrequentFragrance?.house}
                      </div>
                      <div className="mt-2 font-mono text-xs font-bold text-[var(--emerald-sig)]">
                        {data?.intelligence?.recommendationQuality.mostFrequentFragrance?.count}{" "}
                        kali (
                        {
                          data?.intelligence?.recommendationQuality.mostFrequentFragrance
                            ?.averageMatch
                        }
                        % match)
                      </div>
                    </div>

                    <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Best Balanced Performer
                      </div>
                      <div className="mt-2 font-display text-base font-bold text-[#020806]">
                        {data?.intelligence?.recommendationQuality.bestBalancedFragrance?.name ||
                          "Belum ada"}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {data?.intelligence?.recommendationQuality.bestBalancedFragrance?.house}
                      </div>
                      <div className="mt-2 font-mono text-xs font-bold text-[var(--emerald-sig)]">
                        Skor Keseimbangan:{" "}
                        {data?.intelligence?.recommendationQuality.bestBalancedFragrance?.score}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 6: CUSTOMER JOURNEY & FUNNEL ANALYTICS */}
            {activeTab === "journey" && (
              <motion.div
                key="tab-journey"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 1. Funnel Overview & Evidence Guardrail Banner */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/40 bg-white/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]">
                        <GitCommit className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-base font-black text-[#020806]">
                            Alur Perjalanan & Konversi Funnel Konsultasi
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              data?.funnel?.sampleSizeStatus.confidenceLevel === "Established"
                                ? "bg-emerald-100 text-emerald-800"
                                : data?.funnel?.sampleSizeStatus.confidenceLevel === "Emerging"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            Tingkat Bukti:{" "}
                            {data?.funnel?.sampleSizeStatus.confidenceLevel || "Limited"}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground font-body">
                          {data?.funnel?.sampleSizeStatus.disclaimer ||
                            "Memantau retensi langkah demi langkah dari awal konsultasi hingga rekomendasi."}
                        </p>
                      </div>
                    </div>

                    <div className="self-start sm:self-auto rounded-xl bg-[#fffcf5] border border-stone-200 px-3 py-1.5 font-mono text-xs font-bold text-[#020806]">
                      N = {data?.funnel?.sampleSize ?? data?.totalCount ?? 0} Sesi Dimulai
                    </div>
                  </div>
                </div>

                {/* 2. Top Summary KPI Row for Funnel */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Total Konsultasi Dimulai
                    </span>
                    <div className="mt-2 font-display text-xl font-black text-[#020806]">
                      {data?.funnel?.started ?? 0}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      100% baseline
                    </span>
                  </div>

                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Hasil Kurasi Dilihat
                    </span>
                    <div className="mt-2 font-display text-xl font-black text-[var(--emerald-sig)]">
                      {data?.funnel?.resultsViewed ?? 0}
                    </div>
                    <span className="text-[10px] text-[var(--emerald-sig)] font-mono font-bold">
                      {data?.funnel?.started
                        ? Number(
                            ((data.funnel.resultsViewed / data.funnel.started) * 100).toFixed(1),
                          )
                        : 0}
                      % konversi
                    </span>
                  </div>

                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Tingkat Penyelesaian
                    </span>
                    <div className="mt-2 font-display text-xl font-black text-[#020806]">
                      {data?.funnel?.completionRate ?? 0}%
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {data?.funnel?.completed ?? 0} sesi tuntas
                    </span>
                  </div>

                  <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Rata-Rata Durasi
                    </span>
                    <div className="mt-2 font-display text-xl font-black text-[#020806]">
                      {data?.funnel?.averageDurationSeconds
                        ? `${Math.floor(data.funnel.averageDurationSeconds / 60)}m ${Math.round(data.funnel.averageDurationSeconds % 60)}s`
                        : "N/A"}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {data?.funnel?.averageDurationSeconds
                        ? `${data.funnel.averageDurationSeconds} detik`
                        : "Perlu 2 timestamp"}
                    </span>
                  </div>
                </div>

                {/* 3. Highest Drop-off Highlight Card */}
                {data?.funnel?.highestDropOffStep && (
                  <div className="rounded-2xl border border-amber-300/70 bg-amber-50/70 p-5 shadow-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-amber-700" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                        Titik Drop-off Terbesar yang Terdeteksi
                      </h4>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
                      <div>
                        <div className="font-display text-base font-bold text-amber-950">
                          {data.funnel.highestDropOffStep.stepLabel}
                        </div>
                        <p className="text-xs text-amber-800 font-body">
                          Langkah dengan penurunan sesi tertinggi sebelum mencapai tahap berikutnya.
                        </p>
                      </div>
                      <div className="self-start sm:self-auto rounded-xl bg-white/90 border border-amber-200 px-3 py-1.5 text-right">
                        <div className="font-mono text-sm font-black text-red-700">
                          -{data.funnel.highestDropOffStep.dropOffCount} Sesi
                        </div>
                        <div className="font-mono text-[10px] text-amber-800 font-bold">
                          {data.funnel.highestDropOffStep.dropOffPercentage}% Drop-off
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Full Sequential 12-Step Funnel Visualization */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20 mb-6">
                    <div>
                      <h3 className="font-display text-base font-bold text-[#020806]">
                        Visualisasi Alur Corong (12 Tahap)
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        Perkembangan retensi dan tingkat jawaban di setiap tahapan pertanyaan
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {data?.funnel?.steps.length ? (
                      data.funnel.steps.map((st, idx) => (
                        <div
                          key={st.key}
                          className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3.5 hover:border-[var(--emerald-sig)] transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sand-gold)]/20 text-[10px] font-bold text-[var(--sand-deep)] font-mono">
                                {idx + 1}
                              </span>
                              <span className="font-display text-sm font-bold text-[#020806]">
                                {st.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-mono">
                              <span className="font-bold text-[#020806]">{st.count} sesi</span>
                              <span className="font-bold text-[var(--emerald-sig)]">
                                {st.percentage}%
                              </span>
                              {st.dropOffCount > 0 && (
                                <span className="text-red-700 font-semibold text-[11px]">
                                  -{st.dropOffCount} ({st.dropOffPercentage}%)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Funnel Retentive Bar Progress */}
                          <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200/70">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[var(--sand-gold)] to-[var(--emerald-sig)] transition-all duration-500"
                              style={{ width: `${Math.max(2, Math.min(100, st.percentage))}%` }}
                            />
                          </div>

                          {st.answerRate !== undefined && (
                            <div className="mt-1.5 flex justify-end text-[10px] font-mono text-muted-foreground">
                              <span>Tingkat Jawaban: {st.answerRate}%</span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <EmptyListText text="Belum ada data alur perjalanan yang tercatat" />
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 7: REPORTING & SECURE DATA EXPORT */}
            {activeTab === "export" && (
              <motion.div
                key="tab-export"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 1. Date Range & Parameter Scope Card */}
                <div className="rounded-2xl border border-[var(--sand-gold)]/40 bg-white/90 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
                        EXPORT DATA
                      </div>
                      <h3 className="font-display text-lg font-black text-[#020806] mt-0.5">
                        Download Analytics & Customer Intelligence
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        Download analytics and customer intelligence in a structured format.
                      </p>
                    </div>

                    {/* Fast Date Range Selector Buttons */}
                    <div className="flex items-center gap-1.5 bg-[#fffcf5] border border-stone-200 p-1 rounded-xl">
                      {(["today", "7d", "30d", "all"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setDateFilter(r)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            dateFilter === r
                              ? "bg-[var(--emerald-sig)] text-white shadow-xs"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {r === "today"
                            ? "Today"
                            : r === "7d"
                              ? "Last 7 Days"
                              : r === "30d"
                                ? "Last 30 Days"
                                : "All Time"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter Scope Metadata Display */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Selected Period
                      </span>
                      <div className="font-display font-bold text-[#020806] mt-0.5">
                        {dateFilter === "today"
                          ? "Hari Ini"
                          : dateFilter === "7d"
                            ? "7 Hari Terakhir"
                            : dateFilter === "30d"
                              ? "30 Hari Terakhir"
                              : "Semua Data (All Time)"}
                      </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Records Included
                      </span>
                      <div className="font-display font-bold text-[#020806] mt-0.5 font-mono">
                        {data?.totalCount ?? 0} Konsultasi
                      </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Sample Size
                      </span>
                      <div className="font-display font-bold text-[var(--emerald-sig)] mt-0.5 font-mono">
                        N = {data?.totalCount ?? 0} Sesi
                      </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Evidence Level
                      </span>
                      <div className="font-display font-bold text-[var(--sand-deep)] mt-0.5">
                        {data?.intelligence?.sampleSizeStatus.confidenceLevel ||
                          ((data?.totalCount ?? 0) < 20
                            ? "Limited"
                            : (data?.totalCount ?? 0) < 100
                              ? "Emerging"
                              : "Established")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Notification Alert */}
                {exportSuccessMessage && (
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-300/80 bg-emerald-50/90 p-4 text-xs font-bold text-emerald-900 shadow-xs">
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>{exportSuccessMessage}</span>
                  </div>
                )}

                {/* 2. Primary & Secondary Export Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card 1: PRIMARY — Excel Report (.xlsx) */}
                  <div className="rounded-3xl border-2 border-[var(--emerald-sig)]/30 bg-white/95 p-6 shadow-md shadow-[var(--emerald-sig)]/5 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 rounded-bl-xl bg-[var(--emerald-sig)] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                      Recommended
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[var(--emerald-sig)]">
                          PRIMARY FORMAT
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]">
                          <ExcelIcon className="h-5 w-5" />
                        </div>
                      </div>
                      <h4 className="font-display text-lg font-black text-[#020806] mt-3">
                        Excel Report (.xlsx)
                      </h4>
                      <p className="text-xs text-muted-foreground font-body mt-1.5 leading-relaxed">
                        Complete business analytics workbook with 7 structured sheets, auto-filter,
                        and formatted tables. Recommended for business & marketing analysis.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Executive Summary
                        </span>
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Funnel
                        </span>
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Perfume Performance
                        </span>
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Cross-Analysis
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={exportingXlsx}
                      onClick={handleExportXlsx}
                      className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--emerald-sig)] to-[#043e2f] py-3 px-5 text-xs font-bold tracking-wide text-white hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-[var(--emerald-sig)]/20"
                    >
                      {exportingXlsx ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Generating Excel Workbook...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 text-[var(--sand-gold)]" />
                          <span>EXPORT XLSX ({data?.totalCount ?? 0} Sesi)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card 2: Executive Report */}
                  <div className="rounded-3xl border border-[var(--sand-gold)]/40 bg-white/90 p-6 shadow-xs backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          MANAGEMENT REPORT
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100/80 text-amber-800">
                          <FileText className="h-5 w-5" />
                        </div>
                      </div>
                      <h4 className="font-display text-lg font-black text-[#020806] mt-3">
                        Executive Report
                      </h4>
                      <p className="text-xs text-muted-foreground font-body mt-1.5 leading-relaxed">
                        Management-friendly summary featuring dominant customer personas, KPI
                        highlights, funnel diagnosis, and deterministic findings.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Executive KPIs
                        </span>
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Persona
                        </span>
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Key Findings
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={generatingReport}
                      onClick={handleGenerateReport}
                      className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-[var(--sand-gold)] bg-white py-3 px-5 text-xs font-bold text-[#020806] hover:bg-[var(--sand-gold)]/10 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      {generatingReport ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Generating Report...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-[var(--sand-deep)]" />
                          <span>EXPORT REPORT</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card 3: SECONDARY — Developer / System JSON */}
                  <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-xs backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          TECHNICAL / SYSTEM
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
                          <Code className="h-5 w-5" />
                        </div>
                      </div>
                      <h4 className="font-display text-lg font-black text-[#020806] mt-3">
                        JSON Data
                      </h4>
                      <p className="text-xs text-muted-foreground font-body mt-1.5 leading-relaxed">
                        Developer & technical export format with unnested recommendation payloads
                        and funnel event telemetry for machine integration.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          UTF-8 JSON
                        </span>
                        <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          Developer Payload
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={exportingJson}
                      onClick={handleExportJson}
                      className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white py-3 px-5 text-xs font-bold text-[#020806] hover:border-[var(--emerald-sig)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {exportingJson ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Preparing JSON...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>EXPORT JSON</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 3. Rendered Executive Markdown Report Preview */}
                {generatedReportMarkdown && (
                  <div className="rounded-3xl border border-[var(--sand-gold)]/40 bg-white/95 p-6 shadow-md backdrop-blur-md">
                    <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                      <div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
                          PREVIEW DOKUMEN
                        </div>
                        <h4 className="font-display text-base font-black text-[#020806] mt-0.5">
                          ABNA PICKS — Customer & Fragrance Intelligence Report
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          triggerFileDownload(
                            generatedReportMarkdown,
                            `ABNA_PICKS_Intelligence_Report_${dateFilter}_${new Date().toISOString().split("T")[0]}.md`,
                            "text/markdown;charset=utf-8;",
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--emerald-sig)] px-3.5 py-2 text-xs font-bold text-white hover:bg-[var(--emerald-deep)] transition-all cursor-pointer shadow-xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Unduh Markdown (.md)</span>
                      </button>
                    </div>

                    <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-stone-800 max-h-96 overflow-y-auto p-4 bg-[#fffcf5] rounded-2xl border border-stone-200/80">
                      {generatedReportMarkdown}
                    </pre>
                  </div>
                )}

                {/* 4. Data Safety & Zero PII Policy Badge */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 text-center">
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-stone-600">
                    <ShieldCheck className="h-4 w-4 text-[var(--emerald-sig)]" />
                    <span>
                      <strong>Jaminan Keamanan & Nol PII:</strong> Seluruh proses export dieksekusi
                      di server terproteksi. Data pribadi (nama, email, nomor HP, IP) dan kredensial
                      database tidak pernah disimpan maupun diekspor.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 6. SESSION DETAIL GLASS MODAL */}
      <AnimatePresence>
        {selectedSessionId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--sand-gold)]/40 bg-white p-6 sm:p-8 text-[#020806] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase">
                    DETAIL KONSULTASI ABNA Picks
                  </div>
                  <h3 className="font-display text-xl font-black text-[#020806] mt-0.5">
                    Hasil Konsultasi ABNA Picks
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">
                    ID: {selectedSessionId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-full p-2 text-muted-foreground hover:bg-stone-100 hover:text-foreground cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {loadingDetail ? (
                <div className="flex h-48 items-center justify-center">
                  <RefreshCw className="h-6 w-6 animate-spin text-[var(--emerald-sig)]" />
                </div>
              ) : sessionDetail ? (
                <div className="mt-6 space-y-6">
                  {/* Demographics */}
                  <div>
                    <h4 className="text-[11px] font-bold text-[var(--sand-deep)] uppercase tracking-wider">
                      Profil Demografi Customer
                    </h4>
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Gender
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.gender || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">Usia</div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.age_range || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Pekerjaan
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.occupation || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Budget 30ml
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.price_range || "—"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Olfactive Preferences */}
                  <div>
                    <h4 className="text-[11px] font-bold text-[var(--sand-deep)] uppercase tracking-wider">
                      Preferensi Aroma yang Dipilih
                    </h4>
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Karakter (Mood)
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.mood || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Suasana (Atmosphere)
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.atmosphere || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Momen (Occasion)
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.occasion || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Intensitas
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.intensity || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-stone-200 bg-[#fffcf5] p-3 sm:col-span-2">
                        <div className="text-[10px] font-semibold text-muted-foreground">
                          Keluarga Aroma
                        </div>
                        <div className="text-xs font-bold text-[#020806] mt-0.5">
                          {sessionDetail.scent_families?.join(", ") || "—"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top 3 Recommendations Result */}
                  <div>
                    <h4 className="text-[11px] font-bold text-[var(--sand-deep)] uppercase tracking-wider">
                      Hasil Rekomendasi Top 3
                    </h4>
                    <div className="mt-2.5 space-y-2">
                      {sessionDetail.recommendations.map((rec) => (
                        <div
                          key={rec.rank}
                          className="flex items-center justify-between rounded-xl border border-stone-200 bg-[#fffcf5] p-3.5"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--emerald-sig)] font-mono text-xs font-bold text-[#fffcf5]">
                              #{rec.rank}
                            </span>
                            <div>
                              <div className="font-bold text-xs text-[#020806]">{rec.name}</div>
                              <div className="text-[11px] text-muted-foreground">
                                {rec.house} · {rec.category}
                              </div>
                            </div>
                          </div>
                          <div className="font-mono text-xs font-bold text-[var(--emerald-sig)]">
                            {rec.match_percent}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handlePromptDelete(sessionDetail.session_id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/70 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-600" />
                      <span>Hapus Sesi Ini</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  Data detail sesi tidak ditemukan
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {sessionToDelete && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-md rounded-3xl border border-red-200/60 bg-white p-6 sm:p-7 text-[#020806] shadow-2xl"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black text-[#020806]">
                    Hapus data konsultasi ini?
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Data pelanggan dan hasil rekomendasinya akan dihapus secara permanen.
                  </p>
                </div>
              </div>

              {deleteError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
                  {deleteError}
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  disabled={deletingSession}
                  onClick={handleCancelDelete}
                  className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-stone-50 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={deletingSession}
                  onClick={handleConfirmDelete}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold tracking-wide text-white hover:bg-red-700 transition-colors cursor-pointer shadow-sm shadow-red-600/20 disabled:opacity-50"
                >
                  {deletingSession ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Hapus Data</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function DockButton({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
        active
          ? "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-sm shadow-[var(--emerald-sig)]/25"
          : "text-muted-foreground hover:bg-stone-100 hover:text-foreground"
      }`}
    >
      {icon}
      {badge && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--sand-gold)] px-1 font-mono text-[9px] font-bold text-[#020806]">
          {badge}
        </span>
      )}
    </button>
  );
}

function TabPill({
  label,
  active,
  onClick,
  badge,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shrink-0 ${
        active
          ? "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-xs"
          : "bg-white/80 border border-[var(--sand-gold)]/25 text-muted-foreground hover:text-foreground hover:bg-white"
      }`}
    >
      <span>{label}</span>
      {badge && (
        <span
          className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] font-bold ${
            active ? "bg-white/20 text-[#fffcf5]" : "bg-stone-100 text-muted-foreground"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function KpiGlassCard({
  icon,
  label,
  value,
  subtext,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  highlight: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${highlight}`}>
          {icon}
        </div>
      </div>
      <div className="mt-2.5 font-display text-2xl sm:text-3xl font-black text-[#020806]">
        {value}
      </div>
      <p className="mt-1 text-[10px] font-medium text-muted-foreground truncate">{subtext}</p>
    </div>
  );
}

function EditorialBarProgress({ item, color }: { item: DistributionItem; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="truncate text-[#020806]">{item.label}</span>
        <span className="font-mono text-muted-foreground text-[11px]">
          {item.percentage}% ({item.count})
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${item.percentage}%` }} />
      </div>
    </div>
  );
}

function EmptyListText({ text }: { text: string }) {
  return <div className="py-4 text-center text-xs text-muted-foreground">{text}</div>;
}
