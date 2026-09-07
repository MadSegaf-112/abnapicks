import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-ndLFfaJy.mjs";
import { a as createServerFn } from "./server-BpnMBpJF.mjs";
import { E as ExportFilterSchema } from "./admin-export.service-Bd5WNCvk.mjs";
import { g as getSupabaseBrowserClient } from "./supabase-browser-B9wY6-Q9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/exceljs.mjs";
import { f as RefreshCw, S as Sparkles, g as LayoutDashboard, U as Users, h as Award, C as Compass, i as Lightbulb, G as GitCommitHorizontal, D as Download, j as LogOut, k as Clock, l as Calendar, T as TrendingUp, F as Funnel, A as ArrowUpRight, E as Eye, m as Trash2, n as Search, o as Flame, B as Briefcase, p as DollarSign, q as ShieldCheck, r as Target, L as Layers, s as ChartColumn, t as TriangleAlert, u as CircleCheckBig, v as FileSpreadsheet, w as FileText, x as Code, X } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./supabase.server-B40vTsTo.mjs";
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
import "./customer-events.repository-CIBRJUOG.mjs";
import "./fragrances-LdP9CCTC.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const AnalyticsFilterSchema = objectType({
  gender: stringType().optional(),
  ageRange: stringType().optional(),
  occupation: stringType().optional(),
  priceRange: stringType().optional(),
  topFragrance: stringType().optional(),
  dateRange: stringType().optional()
});
const getAdminDashboardData = createServerFn({
  method: "POST"
}).validator((data) => AnalyticsFilterSchema.parse(data || {})).handler(createSsrRpc("be4649669fe84ea5ff2eab0f330d13abd1f2ea3811da3fcc423aaa0e798b456e"));
const getAdminSessionDetail = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  sessionId: stringType()
}).parse(data)).handler(createSsrRpc("48740b1d48793d3e7c67d22b4c2be026ad1c745bd4afbe4d80df93cecf5ce23c"));
const deleteAdminSession = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  sessionId: stringType()
}).parse(data)).handler(createSsrRpc("daeff076fbf58c2babd7613ba7a1d596ce239567bbce7726daed52a8460de4d9"));
const exportAdminAnalyticsXlsxServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(createSsrRpc("b339fdc7f3e61851444e53e6cb79795baca8afdd3733d95a9189e3df7c93ea91"));
const exportAdminAnalyticsJsonServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(createSsrRpc("da9d7c81de0f2257f62e6ef2119faa9f07da9f06150fd26444e0a917fbee234e"));
const exportConsultationsServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  format: enumType(["csv", "json"]),
  filters: ExportFilterSchema
}).parse(data)).handler(createSsrRpc("a1806020a294edecced0787ce7d0013345d596b5ec2d5de68fa7d009f0281409"));
const exportFunnelEventsServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(createSsrRpc("4da573d203adc90690a6768972803e2ad028cb051021602a4e144d738806f5cd"));
const generateBusinessReportServerFn = createServerFn({
  method: "POST"
}).validator((data) => objectType({
  filters: ExportFilterSchema
}).parse(data)).handler(createSsrRpc("06199dc5d26e2aca9d65f4accdef6d88ed16ee3f1f88219c165967aca0ac6c41"));
function AdminDashboardPage() {
  const navigate = useNavigate();
  const fetchDashboardFn = useServerFn(getAdminDashboardData);
  const fetchDetailFn = useServerFn(getAdminSessionDetail);
  const deleteSessionFn = useServerFn(deleteAdminSession);
  const exportXlsxFn = useServerFn(exportAdminAnalyticsXlsxServerFn);
  const exportJsonFn = useServerFn(exportAdminAnalyticsJsonServerFn);
  useServerFn(exportConsultationsServerFn);
  useServerFn(exportFunnelEventsServerFn);
  const generateReportFn = useServerFn(generateBusinessReportServerFn);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [loading, setLoading] = reactExports.useState(true);
  const [data, setData] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [dateFilter, setDateFilter] = reactExports.useState("all");
  const [genderFilter, setGenderFilter] = reactExports.useState("");
  const [ageFilter, setAgeFilter] = reactExports.useState("");
  const [occFilter, setOccFilter] = reactExports.useState("");
  const [priceFilter, setPriceFilter] = reactExports.useState("");
  const [searchFragrance, setSearchFragrance] = reactExports.useState("");
  const [exportingXlsx, setExportingXlsx] = reactExports.useState(false);
  const [exportingJson, setExportingJson] = reactExports.useState(false);
  const [exportingConsultationsCsv, setExportingConsultationsCsv] = reactExports.useState(false);
  const [exportingConsultationsJson, setExportingConsultationsJson] = reactExports.useState(false);
  const [exportingFunnelCsv, setExportingFunnelCsv] = reactExports.useState(false);
  const [generatingReport, setGeneratingReport] = reactExports.useState(false);
  const [generatedReportMarkdown, setGeneratedReportMarkdown] = reactExports.useState(null);
  const [exportSuccessMessage, setExportSuccessMessage] = reactExports.useState(null);
  const [selectedSessionId, setSelectedSessionId] = reactExports.useState(null);
  const [sessionDetail, setSessionDetail] = reactExports.useState(null);
  const [loadingDetail, setLoadingDetail] = reactExports.useState(false);
  const [sessionToDelete, setSessionToDelete] = reactExports.useState(null);
  const [deletingSession, setDeletingSession] = reactExports.useState(false);
  const [deleteError, setDeleteError] = reactExports.useState(null);
  const [authChecked, setAuthChecked] = reactExports.useState(false);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState("");
  const [currentDate, setCurrentDate] = reactExports.useState("");
  reactExports.useEffect(() => {
    const updateTime = () => {
      const now = /* @__PURE__ */ new Date();
      setCurrentTime(now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }));
      setCurrentDate(now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1e3);
    return () => clearInterval(timer);
  }, []);
  reactExports.useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const supabase2 = getSupabaseBrowserClient();
        if (!supabase2) {
          if (isMounted) {
            setIsAuthenticated(false);
            setAuthChecked(true);
            navigate({
              to: "/admin/login",
              replace: true
            });
          }
          return;
        }
        const {
          data: {
            session
          }
        } = await supabase2.auth.getSession();
        if (!isMounted) return;
        if (!session) {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({
            to: "/admin/login",
            replace: true
          });
          return;
        }
        const user = session.user;
        const isAdmin = user.app_metadata?.is_admin === true || user.app_metadata?.role === "admin" || !user.app_metadata?.role;
        if (!isAdmin) {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({
            to: "/admin/login",
            replace: true
          });
          return;
        }
        setIsAuthenticated(true);
        setAuthChecked(true);
      } catch (err) {
        console.warn("[AdminAuth] Auth verification error:", err);
        if (isMounted) {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({
            to: "/admin/login",
            replace: true
          });
        }
      }
    };
    checkAuth();
    const supabase = getSupabaseBrowserClient();
    const {
      data: authListener
    } = supabase?.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (session) {
        const user = session.user;
        const isAdmin = user.app_metadata?.is_admin === true || user.app_metadata?.role === "admin" || !user.app_metadata?.role;
        if (isAdmin) {
          setIsAuthenticated(true);
          setAuthChecked(true);
        } else {
          setIsAuthenticated(false);
          setAuthChecked(true);
          navigate({
            to: "/admin/login",
            replace: true
          });
        }
      } else {
        setIsAuthenticated(false);
        setAuthChecked(true);
        navigate({
          to: "/admin/login",
          replace: true
        });
      }
    }) ?? {
      data: null
    };
    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);
  const loadDashboard = reactExports.useCallback(async () => {
    if (!authChecked || !isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDashboardFn({
        data: {
          gender: genderFilter || void 0,
          ageRange: ageFilter || void 0,
          occupation: occFilter || void 0,
          priceRange: priceFilter || void 0,
          topFragrance: searchFragrance || void 0,
          dateRange: dateFilter || void 0
        }
      });
      setData(res);
    } catch (err) {
      console.warn("[AdminDashboard] Fetch error:", err);
      setError(err instanceof Error ? err.message : "Gagal memuat analitik dashboard.");
    } finally {
      setLoading(false);
    }
  }, [authChecked, isAuthenticated, genderFilter, ageFilter, occFilter, priceFilter, searchFragrance, dateFilter, fetchDashboardFn]);
  const triggerFileDownload = (content, filename, mimeType) => {
    const blob = new Blob([content], {
      type: mimeType
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const triggerBase64Download = (base64, filename, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: mimeType
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleExportXlsx = async () => {
    setExportingXlsx(true);
    setExportSuccessMessage(null);
    try {
      const res = await exportXlsxFn({
        data: {
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || void 0,
            ageRange: ageFilter || void 0,
            occupation: occFilter || void 0,
            priceRange: priceFilter || void 0,
            topFragrance: searchFragrance || void 0
          }
        }
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
  const handleExportJson = async () => {
    setExportingJson(true);
    setExportSuccessMessage(null);
    try {
      const res = await exportJsonFn({
        data: {
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || void 0,
            ageRange: ageFilter || void 0,
            occupation: occFilter || void 0,
            priceRange: priceFilter || void 0,
            topFragrance: searchFragrance || void 0
          }
        }
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
  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    setExportSuccessMessage(null);
    try {
      const res = await generateReportFn({
        data: {
          filters: {
            dateRange: dateFilter,
            gender: genderFilter || void 0,
            ageRange: ageFilter || void 0,
            occupation: occFilter || void 0,
            priceRange: priceFilter || void 0,
            topFragrance: searchFragrance || void 0
          }
        }
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
  reactExports.useEffect(() => {
    if (authChecked && isAuthenticated) {
      loadDashboard();
    }
  }, [authChecked, isAuthenticated, loadDashboard]);
  const handleOpenSession = async (sessionId) => {
    setSelectedSessionId(sessionId);
    setLoadingDetail(true);
    try {
      const detail = await fetchDetailFn({
        data: {
          sessionId
        }
      });
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
  const handlePromptDelete = (sessionId, e) => {
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
      const res = await deleteSessionFn({
        data: {
          sessionId: sessionToDelete
        }
      });
      if (!res.success) {
        throw new Error(res.error || "Gagal menghapus sesi.");
      }
      if (selectedSessionId === sessionToDelete) {
        handleCloseModal();
      }
      setSessionToDelete(null);
      await loadDashboard();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus sesi.";
      setDeleteError(msg);
    } finally {
      setDeletingSession(false);
    }
  };
  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("abna_admin_session");
    navigate({
      to: "/admin/login"
    });
  };
  const activeFiltersCount = reactExports.useMemo(() => {
    let count = 0;
    if (genderFilter) count++;
    if (ageFilter) count++;
    if (occFilter) count++;
    if (priceFilter) count++;
    if (searchFragrance) count++;
    return count;
  }, [genderFilter, ageFilter, occFilter, priceFilter, searchFragrance]);
  if (!authChecked || !isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#fffcf5]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin text-[var(--emerald-sig)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs font-semibold tracking-wider text-[var(--sand-deep)] uppercase", children: "Memverifikasi Akses Admin..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#fffcf5] text-[#020806] selection:bg-[var(--emerald-sig)] selection:text-white flex flex-col md:flex-row relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 overflow-hidden z-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-[var(--emerald-sig)]/5 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-20 h-[450px] w-[450px] rounded-full bg-[var(--sand-gold)]/10 blur-[130px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "sticky top-0 z-40 flex md:flex-col justify-between items-center bg-white/80 border-b md:border-b-0 md:border-r border-[var(--sand-gold)]/35 backdrop-blur-xl px-4 py-3 md:py-6 md:px-3.5 md:min-h-screen md:w-[76px] shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveTab("overview"), className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--emerald-sig)] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/20 hover:scale-105 transition-transform cursor-pointer", title: "ABNA Picks Admin Workspace", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-[var(--sand-gold)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex md:flex-col items-center gap-1.5 sm:gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DockButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }), label: "Overview", active: activeTab === "overview", onClick: () => setActiveTab("overview") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DockButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), label: "Log Sesi", active: activeTab === "sessions", onClick: () => setActiveTab("sessions"), badge: data?.totalCount ? String(data.totalCount) : void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DockButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }), label: "Parfum", active: activeTab === "recommendations", onClick: () => setActiveTab("recommendations") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DockButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4" }), label: "Preferensi", active: activeTab === "preferences", onClick: () => setActiveTab("preferences") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DockButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4" }), label: "Intelijen Bisnis", active: activeTab === "intelligence", onClick: () => setActiveTab("intelligence") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DockButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitCommitHorizontal, { className: "h-4 w-4" }), label: "Alur Perjalanan", active: activeTab === "journey", onClick: () => setActiveTab("journey") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DockButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }), label: "Laporan & Export", active: activeTab === "export", onClick: () => setActiveTab("export") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => loadDashboard(), title: "Segarkan Data", className: "flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white/90 text-muted-foreground hover:text-foreground hover:border-[var(--emerald-sig)] transition-all cursor-pointer shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin text-[var(--emerald-sig)]" : ""}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleLogout, title: "Keluar dari Admin", className: "flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50/60 text-red-700 hover:bg-red-100 transition-all cursor-pointer shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0 z-10 px-4 py-6 sm:px-8 md:px-10 lg:px-12 max-w-7xl mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--sand-gold)]/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/40 bg-white/70 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ABNA PICKS Live · Sistem Aktif" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#020806]", children: "Selamat Datang di Abna Picks Intelligence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground font-body", children: "Pemantauan data konsultasi aroma pelanggan ABNA Parfum secara real-time." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 self-start sm:self-auto rounded-2xl border border-[var(--sand-gold)]/35 bg-white/80 p-3.5 shadow-xs backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-base font-bold text-[#020806] leading-none", children: currentTime || "00:00" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium text-muted-foreground mt-1", children: currentDate || "Memuat tanggal..." })
          ] })
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiGlassCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-[var(--sand-deep)]" }), label: "Total Konsultasi", value: loading ? "..." : String(data?.kpis.totalConsultations ?? 0), subtext: "Total sesi di gerai", highlight: "bg-[var(--sand-gold)]/15 text-[var(--sand-deep)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiGlassCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-[var(--emerald-sig)]" }), label: "Sesi Hari Ini", value: loading ? "..." : String(data?.kpis.consultationsToday ?? 0), subtext: "24 jam terakhir", highlight: "bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiGlassCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-amber-700" }), label: "Pekan Ini", value: loading ? "..." : String(data?.kpis.consultationsThisWeek ?? 0), subtext: "Volume 7 hari terakhir", highlight: "bg-amber-100/70 text-amber-800" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: "Parfum Terpopuler" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 truncate font-display text-lg sm:text-xl font-black text-[#020806]", children: loading ? "..." : data?.kpis.mostRecommendedFragrance || "Belum ada data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] font-medium text-muted-foreground truncate", children: data?.kpis.mostPopularScentFamily ? `Keluarga: ${data.kpis.mostPopularScentFamily}` : "Menunggu konsultasi gerai" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between border-b border-[var(--sand-gold)]/30 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-x-auto py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabPill, { label: "Overview Ringkas", active: activeTab === "overview", onClick: () => setActiveTab("overview") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabPill, { label: "Log Konsultasi", active: activeTab === "sessions", onClick: () => setActiveTab("sessions"), badge: data?.totalCount ? String(data.totalCount) : void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabPill, { label: "Analisis Parfum", active: activeTab === "recommendations", onClick: () => setActiveTab("recommendations") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabPill, { label: "Preferensi Pelanggan", active: activeTab === "preferences", onClick: () => setActiveTab("preferences") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabPill, { label: "Intelijen Bisnis", active: activeTab === "intelligence", onClick: () => setActiveTab("intelligence") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabPill, { label: "Alur Perjalanan & Funnel", active: activeTab === "journey", onClick: () => setActiveTab("journey") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabPill, { label: "Laporan & Export", active: activeTab === "export", onClick: () => setActiveTab("export") })
        ] }),
        activeFiltersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--emerald-sig)] bg-[var(--emerald-sig)]/10 px-3 py-1 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            activeFiltersCount,
            " Filter Aktif"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -12
        }, transition: {
          duration: 0.25
        }, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4 text-[var(--emerald-sig)]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Aroma Paling Banyak Dipilih" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab("preferences"), className: "text-[11px] font-semibold text-[var(--emerald-sig)] hover:underline inline-flex items-center gap-0.5 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Lihat Semua" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3", children: data?.olfactive.scentFamilies.length ? data.olfactive.scentFamilies.slice(0, 5).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-[var(--emerald-sig)]" }, item.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data preferensi aroma" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-[var(--sand-deep)]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Distribusi Profil Pelanggan" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab("preferences"), className: "text-[11px] font-semibold text-[var(--emerald-sig)] hover:underline inline-flex items-center gap-0.5 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Demografi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold text-muted-foreground uppercase mb-2", children: "Gender" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: data?.demographics.gender.slice(0, 2).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-[var(--sand-deep)]" }, item.key)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-[var(--sand-gold)]/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold text-muted-foreground uppercase mb-2", children: "Rentang Usia Utama" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: data?.demographics.ageRange.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-amber-700" }, item.key)) })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-[#020806]", children: "Konsultasi Terbaru Gerai" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Sesi konsultasi yang baru saja diselesaikan pelanggan di kiosk" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActiveTab("sessions"), className: "inline-flex items-center gap-1 rounded-xl bg-[var(--emerald-sig)] px-3.5 py-1.5 text-xs font-semibold text-[#fffcf5] hover:bg-[var(--emerald-deep)] transition-all cursor-pointer shadow-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Buka Log Lengkap" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs text-[#020806]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-stone-100 text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-2", children: "Waktu Sesi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-2", children: "Profil Pelanggan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-2", children: "Rekomendasi Teratas" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-2 text-right", children: "Match" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-2 text-right", children: "Aksi" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-stone-100", children: data?.recentSessions.length ? data.recentSessions.slice(0, 5).map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-[#fffcf5] transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 font-mono text-[11px] text-muted-foreground", children: new Date(session.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: session.gender || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-[11px]", children: [
                    " ",
                    "· ",
                    session.ageRange || "—",
                    " · ",
                    session.occupation || "—"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[#020806]", children: session.topFragranceName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: session.topFragranceHouse })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-2 text-right font-mono font-bold text-[var(--emerald-sig)]", children: [
                  session.topMatchPercent,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handleOpenSession(session.sessionId), className: "inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#020806] hover:border-[var(--emerald-sig)] hover:text-[var(--emerald-sig)] transition-colors cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Detail" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => handlePromptDelete(session.sessionId, e), title: "Hapus Sesi", className: "inline-flex items-center justify-center rounded-lg border border-stone-200 bg-white p-1 text-[11px] text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
                ] }) })
              ] }, session.sessionId)) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "py-8 text-center text-xs text-muted-foreground", children: "Belum ada sesi konsultasi yang tersimpan" }) }) })
            ] }) })
          ] })
        ] }, "tab-overview"),
        activeTab === "sessions" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -12
        }, transition: {
          duration: 0.25
        }, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: searchFragrance, onChange: (e) => setSearchFragrance(e.target.value), placeholder: "Cari berdasarkan nama parfum...", className: "w-full rounded-xl border border-stone-200 bg-[#fffcf5] pl-10 pr-4 py-2 text-xs font-medium text-foreground focus:border-[var(--emerald-sig)] focus:bg-white focus:outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: genderFilter, onChange: (e) => setGenderFilter(e.target.value), className: "rounded-xl border border-stone-200 bg-[#fffcf5] px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-[var(--emerald-sig)] cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Semua Gender" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "female", children: "Wanita" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "male", children: "Pria" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: ageFilter, onChange: (e) => setAgeFilter(e.target.value), className: "rounded-xl border border-stone-200 bg-[#fffcf5] px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-[var(--emerald-sig)] cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Semua Usia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "under_18", children: "< 18 tahun" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "18_24", children: "18–24 tahun" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "25_34", children: "25–34 tahun" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "35_44", children: "35–44 tahun" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "45_plus", children: "45+ tahun" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: occFilter, onChange: (e) => setOccFilter(e.target.value), className: "rounded-xl border border-stone-200 bg-[#fffcf5] px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-[var(--emerald-sig)] cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Semua Pekerjaan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "student", children: "Pelajar / Mahasiswa" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "corporate", children: "Karyawan Swasta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "government", children: "PNS / ASN" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "entrepreneur", children: "Wirausaha" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "creative_freelance", children: "Kreatif / Freelance" })
              ] }),
              activeFiltersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                setGenderFilter("");
                setAgeFilter("");
                setOccFilter("");
                setPriceFilter("");
                setSearchFragrance("");
              }, className: "rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer", children: "Reset" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs text-[#020806]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-stone-100 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-stone-50/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3.5", children: "Waktu Sesi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3.5", children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3.5", children: "Rentang Usia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3.5", children: "Pekerjaan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3.5", children: "Budget 30ml" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3.5", children: "Rekomendasi Utama" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3.5 text-right", children: "Aksi" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-stone-100", children: data?.recentSessions.length ? data.recentSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-[#fffcf5] transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3.5 font-mono text-[11px] text-muted-foreground", children: new Date(session.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3.5 font-medium", children: session.gender || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3.5 font-medium", children: session.ageRange || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3.5 font-medium", children: session.occupation || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3.5 font-medium", children: session.priceRange || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[#020806]", children: session.topFragranceName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                  session.topFragranceHouse,
                  " · ",
                  session.topMatchPercent,
                  "% Cocok"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handleOpenSession(session.sessionId), className: "inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-[#020806] hover:bg-[var(--emerald-sig)] hover:text-[#fffcf5] hover:border-[var(--emerald-sig)] transition-all cursor-pointer shadow-2xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Lihat" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => handlePromptDelete(session.sessionId, e), title: "Hapus Sesi", className: "inline-flex items-center justify-center rounded-lg border border-stone-200 bg-white p-1 text-[11px] text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer shadow-2xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
              ] }) })
            ] }, session.sessionId)) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "p-8 text-center text-xs text-muted-foreground", children: "Tidak ada sesi konsultasi yang cocok dengan kriteria filter" }) }) })
          ] }) }) })
        ] }, "tab-sessions"),
        activeTab === "recommendations" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -12
        }, transition: {
          duration: 0.25
        }, className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-[#020806]", children: "Top 10 Parfum Paling Sering Direkomendasikan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Peringkat parfum yang paling sering cocok dengan preferensi olfaktif pelanggan" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: data?.topFragrances.length ? data.topFragrances.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:border-[var(--emerald-sig)] transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black ${f.rank === 1 ? "bg-amber-100 text-amber-800 border border-amber-300" : f.rank === 2 ? "bg-stone-100 text-stone-700 border border-stone-300" : f.rank === 3 ? "bg-orange-100 text-orange-800 border border-orange-300" : "bg-stone-50 text-stone-600 border border-stone-200"}`, children: [
                "#",
                f.rank
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-sm text-[#020806]", children: f.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                  "House: ",
                  f.house
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs font-bold text-[var(--emerald-sig)]", children: [
                f.recommendationCount,
                " kali"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                "Rata-rata ",
                f.averageMatchPercent,
                "% match"
              ] })
            ] })
          ] }, f.fragranceId)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 p-8 text-center text-xs text-muted-foreground", children: "Belum ada data rekomendasi tersimpan" }) })
        ] }) }, "tab-recommendations"),
        activeTab === "preferences" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -12
        }, transition: {
          duration: 0.25
        }, className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-violet-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Karakter Aroma (Mood)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data?.olfactive.moods.length ? data.olfactive.moods.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-violet-600" }, item.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4 text-sky-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Suasana Aroma" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data?.olfactive.atmospheres.length ? data.olfactive.atmospheres.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-sky-600" }, item.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-amber-700" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Momen Pemakaian" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data?.olfactive.occasions.length ? data.olfactive.occasions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-amber-700" }, item.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-rose-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Tingkat Intensitas" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data?.olfactive.intensities.length ? data.olfactive.intensities.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-rose-600" }, item.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-emerald-700" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Aktivitas / Pekerjaan" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data?.demographics.occupation.length ? data.demographics.occupation.slice(0, 5).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-emerald-700" }, item.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-teal-700" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Range Budget (30ml)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data?.demographics.priceRange.length ? data.demographics.priceRange.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-teal-700" }, item.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data" }) })
          ] })
        ] }) }, "tab-preferences"),
        activeTab === "intelligence" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -12
        }, transition: {
          duration: 0.25
        }, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-[var(--sand-gold)]/40 bg-white/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-black text-[#020806]", children: "Fragrance Customer Intelligence" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${data?.intelligence?.sampleSizeStatus.confidenceLevel === "Established" ? "bg-emerald-100 text-emerald-800" : data?.intelligence?.sampleSizeStatus.confidenceLevel === "Emerging" ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-700"}`, children: [
                    "Tingkat Bukti:",
                    " ",
                    data?.intelligence?.sampleSizeStatus.confidenceLevel || "Limited"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground font-body", children: data?.intelligence?.sampleSizeStatus.disclaimer || "Menganalisis pola konsultasi aroma pelanggan secara deterministik." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-start sm:self-auto rounded-xl bg-[#fffcf5] border border-stone-200 px-3 py-1.5 font-mono text-xs font-bold text-[#020806]", children: [
              "N = ",
              data?.totalCount ?? 0,
              " Sesi"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 text-amber-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Wawasan Bisnis & Sinyal Ritel" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: data?.intelligence?.insights.length ? data.intelligence.insights.map((insight) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 shadow-2xs backdrop-blur-md flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-muted-foreground mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: insight.type.replace(/_/g, " ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--emerald-sig)]", children: insight.supportingMetric })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-sm font-bold text-[#020806]", children: insight.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground font-body leading-relaxed", children: insight.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-muted-foreground font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Sampel N=",
                  insight.sampleSize
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: insight.confidenceLevel })
              ] })
            ] }, insight.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 p-8 text-center text-xs text-muted-foreground", children: "Belum ada wawasan bisnis yang terdeteksi" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 pb-3 border-b border-[var(--sand-gold)]/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-[var(--emerald-sig)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-[#020806]", children: "Snapshot Persona Dominan Pelanggan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Atribut preferensi dengan frekuensi tertinggi dari seluruh sesi konsultasi" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: data?.intelligence?.snapshot.map((snap) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3.5 shadow-2xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider", children: snap.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-sm font-bold text-[#020806] truncate", children: snap.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-mono text-[11px] text-[var(--emerald-sig)] font-semibold", children: [
                snap.percentage,
                "% (",
                snap.count,
                " sesi)"
              ] })
            ] }, snap.dimension)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-[var(--sand-deep)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-[#020806]", children: "Segmen Pelanggan yang Terbentuk" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Klaster berbasis korelasi Usia × Pekerjaan dan preferensi aroma terkait" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: data?.intelligence?.segments.length ? data.intelligence.segments.map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:border-[var(--emerald-sig)] transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-2.5 border-b border-stone-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-[#020806]", children: seg.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-[var(--emerald-sig)]", children: [
                  seg.percentage,
                  "% (",
                  seg.count,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Aroma Favorit:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#020806]", children: seg.dominantScentFamily })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Budget Dominan:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#020806]", children: seg.dominantBudget })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Mood Dominan:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#020806]", children: seg.dominantMood })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Top Parfum:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[var(--emerald-sig)] truncate max-w-[120px]", children: seg.topFragrance })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1 border-t border-stone-50 font-mono text-[11px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Rata-rata Match:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[var(--emerald-sig)]", children: [
                    seg.averageMatchScore,
                    "%"
                  ] })
                ] })
              ] })
            ] }, seg.segmentKey)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 p-8 text-center text-xs text-muted-foreground", children: "Belum ada segmen yang terbentuk dengan observasi yang cukup" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4 text-[var(--emerald-sig)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Korelasi Usia × Keluarga Aroma" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data?.intelligence?.crossAnalysis.ageByScent.length ? data.intelligence.crossAnalysis.ageByScent.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-100 bg-[#fffcf5] p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs font-bold text-[#020806] mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: group.primaryLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
                    group.total,
                    " pilihan"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: group.distribution.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-[var(--emerald-sig)]" }, item.key)) })
              ] }, group.primaryKey)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data korelasi usia dan aroma" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-emerald-700" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Korelasi Pekerjaan × Budget 30ml" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data?.intelligence?.crossAnalysis.occupationByBudget.length ? data.intelligence.crossAnalysis.occupationByBudget.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-100 bg-[#fffcf5] p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs font-bold text-[#020806] mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: group.primaryLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
                    group.total,
                    " sesi"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: group.distribution.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-emerald-700" }, item.key)) })
              ] }, group.primaryKey)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data korelasi pekerjaan dan budget" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-violet-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Korelasi Mood × Aroma" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data?.intelligence?.crossAnalysis.moodByScent.length ? data.intelligence.crossAnalysis.moodByScent.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-100 bg-[#fffcf5] p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs font-bold text-[#020806] mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: group.primaryLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
                    group.total,
                    " pilihan"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: group.distribution.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-violet-600" }, item.key)) })
              ] }, group.primaryKey)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data korelasi mood dan aroma" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 pb-2 border-b border-[var(--sand-gold)]/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-amber-700" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Korelasi Momen × Aroma" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data?.intelligence?.crossAnalysis.occasionByScent.length ? data.intelligence.crossAnalysis.occasionByScent.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-100 bg-[#fffcf5] p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs font-bold text-[#020806] mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: group.primaryLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
                    group.total,
                    " pilihan"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: group.distribution.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialBarProgress, { item, color: "bg-amber-700" }, item.key)) })
              ] }, group.primaryKey)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data korelasi momen dan aroma" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 pb-3 border-b border-[var(--sand-gold)]/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-[var(--emerald-sig)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-[#020806]", children: "Analisis Kualitas & Keseimbangan Formula Rekomendasi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Mengevaluasi akurasi formula dan keseimbangan volume rekomendasi produk" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Akurasi Tertinggi (Match Rata-Rata)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-base font-bold text-[#020806]", children: data?.intelligence?.recommendationQuality.highestPerformingFragrance?.name || "Belum ada" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: data?.intelligence?.recommendationQuality.highestPerformingFragrance?.house }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-mono text-xs font-bold text-[var(--emerald-sig)]", children: [
                  data?.intelligence?.recommendationQuality.highestPerformingFragrance?.averageMatch,
                  "% Match (",
                  data?.intelligence?.recommendationQuality.highestPerformingFragrance?.count,
                  " ",
                  "sesi)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Volume Rekomendasi Tertinggi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-base font-bold text-[#020806]", children: data?.intelligence?.recommendationQuality.mostFrequentFragrance?.name || "Belum ada" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: data?.intelligence?.recommendationQuality.mostFrequentFragrance?.house }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-mono text-xs font-bold text-[var(--emerald-sig)]", children: [
                  data?.intelligence?.recommendationQuality.mostFrequentFragrance?.count,
                  " ",
                  "kali (",
                  data?.intelligence?.recommendationQuality.mostFrequentFragrance?.averageMatch,
                  "% match)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Best Balanced Performer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-base font-bold text-[#020806]", children: data?.intelligence?.recommendationQuality.bestBalancedFragrance?.name || "Belum ada" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: data?.intelligence?.recommendationQuality.bestBalancedFragrance?.house }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-mono text-xs font-bold text-[var(--emerald-sig)]", children: [
                  "Skor Keseimbangan:",
                  " ",
                  data?.intelligence?.recommendationQuality.bestBalancedFragrance?.score
                ] })
              ] })
            ] })
          ] })
        ] }, "tab-intelligence"),
        activeTab === "journey" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -12
        }, transition: {
          duration: 0.25
        }, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-[var(--sand-gold)]/40 bg-white/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitCommitHorizontal, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-black text-[#020806]", children: "Alur Perjalanan & Konversi Funnel Konsultasi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${data?.funnel?.sampleSizeStatus.confidenceLevel === "Established" ? "bg-emerald-100 text-emerald-800" : data?.funnel?.sampleSizeStatus.confidenceLevel === "Emerging" ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-700"}`, children: [
                    "Tingkat Bukti:",
                    " ",
                    data?.funnel?.sampleSizeStatus.confidenceLevel || "Limited"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground font-body", children: data?.funnel?.sampleSizeStatus.disclaimer || "Memantau retensi langkah demi langkah dari awal konsultasi hingga rekomendasi." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-start sm:self-auto rounded-xl bg-[#fffcf5] border border-stone-200 px-3 py-1.5 font-mono text-xs font-bold text-[#020806]", children: [
              "N = ",
              data?.funnel?.sampleSize ?? data?.totalCount ?? 0,
              " Sesi Dimulai"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Total Konsultasi Dimulai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl font-black text-[#020806]", children: data?.funnel?.started ?? 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: "100% baseline" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Hasil Kurasi Dilihat" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl font-black text-[var(--emerald-sig)]", children: data?.funnel?.resultsViewed ?? 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-[var(--emerald-sig)] font-mono font-bold", children: [
                data?.funnel?.started ? Number((data.funnel.resultsViewed / data.funnel.started * 100).toFixed(1)) : 0,
                "% konversi"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Tingkat Penyelesaian" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-display text-xl font-black text-[#020806]", children: [
                data?.funnel?.completionRate ?? 0,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono", children: [
                data?.funnel?.completed ?? 0,
                " sesi tuntas"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 shadow-2xs backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Rata-Rata Durasi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl font-black text-[#020806]", children: data?.funnel?.averageDurationSeconds ? `${Math.floor(data.funnel.averageDurationSeconds / 60)}m ${Math.round(data.funnel.averageDurationSeconds % 60)}s` : "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: data?.funnel?.averageDurationSeconds ? `${data.funnel.averageDurationSeconds} detik` : "Perlu 2 timestamp" })
            ] })
          ] }),
          data?.funnel?.highestDropOffStep && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-amber-300/70 bg-amber-50/70 p-5 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-700" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-amber-900", children: "Titik Drop-off Terbesar yang Terdeteksi" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-bold text-amber-950", children: data.funnel.highestDropOffStep.stepLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800 font-body", children: "Langkah dengan penurunan sesi tertinggi sebelum mencapai tahap berikutnya." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-start sm:self-auto rounded-xl bg-white/90 border border-amber-200 px-3 py-1.5 text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm font-black text-red-700", children: [
                  "-",
                  data.funnel.highestDropOffStep.dropOffCount,
                  " Sesi"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] text-amber-800 font-bold", children: [
                  data.funnel.highestDropOffStep.dropOffPercentage,
                  "% Drop-off"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between pb-4 border-b border-[var(--sand-gold)]/20 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-[#020806]", children: "Visualisasi Alur Corong (12 Tahap)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Perkembangan retensi dan tingkat jawaban di setiap tahapan pertanyaan" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data?.funnel?.steps.length ? data.funnel.steps.map((st, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3.5 hover:border-[var(--emerald-sig)] transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sand-gold)]/20 text-[10px] font-bold text-[var(--sand-deep)] font-mono", children: idx + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-[#020806]", children: st.label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[#020806]", children: [
                    st.count,
                    " sesi"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[var(--emerald-sig)]", children: [
                    st.percentage,
                    "%"
                  ] }),
                  st.dropOffCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-700 font-semibold text-[11px]", children: [
                    "-",
                    st.dropOffCount,
                    " (",
                    st.dropOffPercentage,
                    "%)"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-stone-200/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-[var(--sand-gold)] to-[var(--emerald-sig)] transition-all duration-500", style: {
                width: `${Math.max(2, Math.min(100, st.percentage))}%`
              } }) }),
              st.answerRate !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex justify-end text-[10px] font-mono text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Tingkat Jawaban: ",
                st.answerRate,
                "%"
              ] }) })
            ] }, st.key)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyListText, { text: "Belum ada data alur perjalanan yang tercatat" }) })
          ] })
        ] }, "tab-journey"),
        activeTab === "export" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -12
        }, transition: {
          duration: 0.25
        }, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/40 bg-white/90 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "EXPORT DATA" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-black text-[#020806] mt-0.5", children: "Download Analytics & Customer Intelligence" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Download analytics and customer intelligence in a structured format." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 bg-[#fffcf5] border border-stone-200 p-1 rounded-xl", children: ["today", "7d", "30d", "all"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDateFilter(r), className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${dateFilter === r ? "bg-[var(--emerald-sig)] text-white shadow-xs" : "text-muted-foreground hover:text-foreground"}`, children: r === "today" ? "Today" : r === "7d" ? "Last 7 Days" : r === "30d" ? "Last 30 Days" : "All Time" }, r)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-stone-50 border border-stone-200 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Selected Period" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-[#020806] mt-0.5", children: dateFilter === "today" ? "Hari Ini" : dateFilter === "7d" ? "7 Hari Terakhir" : dateFilter === "30d" ? "30 Hari Terakhir" : "Semua Data (All Time)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-stone-50 border border-stone-200 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Records Included" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-[#020806] mt-0.5 font-mono", children: [
                  data?.totalCount ?? 0,
                  " Konsultasi"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-stone-50 border border-stone-200 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Sample Size" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-[var(--emerald-sig)] mt-0.5 font-mono", children: [
                  "N = ",
                  data?.totalCount ?? 0,
                  " Sesi"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-stone-50 border border-stone-200 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Evidence Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-[var(--sand-deep)] mt-0.5", children: data?.intelligence?.sampleSizeStatus.confidenceLevel || ((data?.totalCount ?? 0) < 20 ? "Limited" : (data?.totalCount ?? 0) < 100 ? "Emerging" : "Established") })
              ] })
            ] })
          ] }),
          exportSuccessMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-emerald-300/80 bg-emerald-50/90 p-4 text-xs font-bold text-emerald-900 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-emerald-600 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: exportSuccessMessage })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-2 border-[var(--emerald-sig)]/30 bg-white/95 p-6 shadow-md shadow-[var(--emerald-sig)]/5 backdrop-blur-md flex flex-col justify-between relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 rounded-bl-xl bg-[var(--emerald-sig)] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white", children: "Recommended" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-[var(--emerald-sig)]", children: "PRIMARY FORMAT" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--emerald-sig)]/10 text-[var(--emerald-sig)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-5 w-5" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg font-black text-[#020806] mt-3", children: "Excel Report (.xlsx)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1.5 leading-relaxed", children: "Complete business analytics workbook with 7 structured sheets, auto-filter, and formatted tables. Recommended for business & marketing analysis." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Executive Summary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Funnel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Perfume Performance" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Cross-Analysis" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: exportingXlsx, onClick: handleExportXlsx, className: "mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--emerald-sig)] to-[#043e2f] py-3 px-5 text-xs font-bold tracking-wide text-white hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-[var(--emerald-sig)]/20", children: exportingXlsx ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Generating Excel Workbook..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 text-[var(--sand-gold)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "EXPORT XLSX (",
                  data?.totalCount ?? 0,
                  " Sesi)"
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-[var(--sand-gold)]/40 bg-white/90 p-6 shadow-xs backdrop-blur-md flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "MANAGEMENT REPORT" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100/80 text-amber-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg font-black text-[#020806] mt-3", children: "Executive Report" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1.5 leading-relaxed", children: "Management-friendly summary featuring dominant customer personas, KPI highlights, funnel diagnosis, and deterministic findings." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Executive KPIs" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Persona" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Key Findings" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: generatingReport, onClick: handleGenerateReport, className: "mt-6 flex items-center justify-center gap-2 rounded-2xl border border-[var(--sand-gold)] bg-white py-3 px-5 text-xs font-bold text-[#020806] hover:bg-[var(--sand-gold)]/10 transition-all cursor-pointer disabled:opacity-50 shadow-xs", children: generatingReport ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Generating Report..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[var(--sand-deep)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "EXPORT REPORT" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-xs backdrop-blur-md flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "TECHNICAL / SYSTEM" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "h-5 w-5" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg font-black text-[#020806] mt-3", children: "JSON Data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1.5 leading-relaxed", children: "Developer & technical export format with unnested recommendation payloads and funnel event telemetry for machine integration." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "UTF-8 JSON" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600", children: "Developer Payload" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: exportingJson, onClick: handleExportJson, className: "mt-6 flex items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white py-3 px-5 text-xs font-bold text-[#020806] hover:border-[var(--emerald-sig)] transition-all cursor-pointer disabled:opacity-50", children: exportingJson ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Preparing JSON..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "EXPORT JSON" })
              ] }) })
            ] })
          ] }),
          generatedReportMarkdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-[var(--sand-gold)]/40 bg-white/95 p-6 shadow-md backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-stone-200 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "PREVIEW DOKUMEN" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base font-black text-[#020806] mt-0.5", children: "ABNA PICKS — Customer & Fragrance Intelligence Report" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => triggerFileDownload(generatedReportMarkdown, `ABNA_PICKS_Intelligence_Report_${dateFilter}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.md`, "text/markdown;charset=utf-8;"), className: "inline-flex items-center gap-1.5 rounded-xl bg-[var(--emerald-sig)] px-3.5 py-2 text-xs font-bold text-white hover:bg-[var(--emerald-deep)] transition-all cursor-pointer shadow-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Unduh Markdown (.md)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap font-mono text-xs leading-relaxed text-stone-800 max-h-96 overflow-y-auto p-4 bg-[#fffcf5] rounded-2xl border border-stone-200/80", children: generatedReportMarkdown })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-stone-200 bg-stone-50/70 p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-medium text-stone-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-[var(--emerald-sig)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Jaminan Keamanan & Nol PII:" }),
              " Seluruh proses export dieksekusi di server terproteksi. Data pribadi (nama, email, nomor HP, IP) dan kredensial database tidak pernah disimpan maupun diekspor."
            ] })
          ] }) })
        ] }, "tab-export")
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedSessionId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.96
    }, animate: {
      opacity: 1,
      scale: 1
    }, exit: {
      opacity: 0,
      scale: 0.96
    }, transition: {
      duration: 0.2
    }, className: "relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--sand-gold)]/40 bg-white p-6 sm:p-8 text-[#020806] shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-stone-200 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "DETAIL KONSULTASI ABNA Picks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-black text-[#020806] mt-0.5", children: "Hasil Konsultasi ABNA Picks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground mt-0.5", children: [
            "ID: ",
            selectedSessionId
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCloseModal, className: "rounded-full p-2 text-muted-foreground hover:bg-stone-100 hover:text-foreground cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      loadingDetail ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-48 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin text-[var(--emerald-sig)]" }) }) : sessionDetail ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] font-bold text-[var(--sand-deep)] uppercase tracking-wider", children: "Profil Demografi Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.gender || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Usia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.age_range || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Pekerjaan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.occupation || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Budget 30ml" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.price_range || "—" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] font-bold text-[var(--sand-deep)] uppercase tracking-wider", children: "Preferensi Aroma yang Dipilih" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Karakter (Mood)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.mood || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Suasana (Atmosphere)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.atmosphere || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Momen (Occasion)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.occasion || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Intensitas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.intensity || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-stone-200 bg-[#fffcf5] p-3 sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground", children: "Keluarga Aroma" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-[#020806] mt-0.5", children: sessionDetail.scent_families?.join(", ") || "—" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] font-bold text-[var(--sand-deep)] uppercase tracking-wider", children: "Hasil Rekomendasi Top 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 space-y-2", children: sessionDetail.recommendations.map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-stone-200 bg-[#fffcf5] p-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--emerald-sig)] font-mono text-xs font-bold text-[#fffcf5]", children: [
                "#",
                rec.rank
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-xs text-[#020806]", children: rec.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                  rec.house,
                  " · ",
                  rec.category
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs font-bold text-[var(--emerald-sig)]", children: [
              rec.match_percent,
              "%"
            ] })
          ] }, rec.rank)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-200 pt-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handlePromptDelete(sessionDetail.session_id), className: "inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/70 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 text-red-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hapus Sesi Ini" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCloseModal, className: "rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-stone-50 transition-colors cursor-pointer", children: "Tutup" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-xs text-muted-foreground", children: "Data detail sesi tidak ditemukan" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sessionToDelete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.95
    }, animate: {
      opacity: 1,
      scale: 1
    }, exit: {
      opacity: 0,
      scale: 0.95
    }, transition: {
      duration: 0.18
    }, className: "relative w-full max-w-md rounded-3xl border border-red-200/60 bg-white p-6 sm:p-7 text-[#020806] shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-black text-[#020806]", children: "Hapus data konsultasi ini?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground leading-relaxed", children: "Data pelanggan dan hasil rekomendasinya akan dihapus secara permanen." })
        ] })
      ] }),
      deleteError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800", children: deleteError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-end gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: deletingSession, onClick: handleCancelDelete, className: "rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-stone-50 transition-colors cursor-pointer disabled:opacity-50", children: "Batal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: deletingSession, onClick: handleConfirmDelete, className: "inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold tracking-wide text-white hover:bg-red-700 transition-colors cursor-pointer shadow-sm shadow-red-600/20 disabled:opacity-50", children: deletingSession ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Menghapus..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hapus Data" })
        ] }) })
      ] })
    ] }) }) })
  ] });
}
function DockButton({
  icon,
  label,
  active,
  onClick,
  badge
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, title: label, className: `relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${active ? "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-sm shadow-[var(--emerald-sig)]/25" : "text-muted-foreground hover:bg-stone-100 hover:text-foreground"}`, children: [
    icon,
    badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--sand-gold)] px-1 font-mono text-[9px] font-bold text-[#020806]", children: badge })
  ] });
}
function TabPill({
  label,
  active,
  onClick,
  badge
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: `relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shrink-0 ${active ? "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-xs" : "bg-white/80 border border-[var(--sand-gold)]/25 text-muted-foreground hover:text-foreground hover:bg-white"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-1.5 py-0.2 font-mono text-[10px] font-bold ${active ? "bg-white/20 text-[#fffcf5]" : "bg-stone-100 text-muted-foreground"}`, children: badge })
  ] });
}
function KpiGlassCard({
  icon,
  label,
  value,
  subtext,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--sand-gold)]/35 bg-white/85 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md flex flex-col justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-7 w-7 items-center justify-center rounded-lg ${highlight}`, children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 font-display text-2xl sm:text-3xl font-black text-[#020806]", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] font-medium text-muted-foreground truncate", children: subtext })
  ] });
}
function EditorialBarProgress({
  item,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[#020806]", children: item.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground text-[11px]", children: [
        item.percentage,
        "% (",
        item.count,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${color}`, style: {
      width: `${item.percentage}%`
    } }) })
  ] });
}
function EmptyListText({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 text-center text-xs text-muted-foreground", children: text });
}
export {
  AdminDashboardPage as component
};
