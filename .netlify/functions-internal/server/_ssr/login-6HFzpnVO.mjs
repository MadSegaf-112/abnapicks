import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { g as getSupabaseBrowserClient } from "./supabase-browser-B9wY6-Q9.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { S as Sparkles, y as CircleAlert, z as Mail, H as Lock, I as LoaderCircle, c as ArrowLeft } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    const checkExistingAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          const {
            data: {
              session
            }
          } = await supabase.auth.getSession();
          if (session && isMounted) {
            navigate({
              to: "/admin",
              replace: true
            });
            return;
          }
        }
      } catch (err) {
        console.warn("[AdminLogin] Error checking active session:", err);
      }
    };
    checkExistingAuth();
    return () => {
      isMounted = false;
    };
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        throw new Error("Supabase Auth belum terkonfigurasi. Periksa koneksi backend.");
      }
      const {
        data: {
          session
        },
        error: authError
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (authError) {
        throw authError;
      }
      const user = session?.user;
      const isAdmin = user?.app_metadata?.role === "admin" || user?.app_metadata?.is_admin === true || !user?.app_metadata?.role;
      if (!isAdmin) {
        await supabase.auth.signOut();
        throw new Error("Akun ini tidak memiliki akses administrator.");
      }
      navigate({
        to: "/admin"
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal masuk. Periksa email dan password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen flex-col items-center justify-center bg-[#fffcf5] px-4 text-[#020806] selection:bg-[var(--emerald-sig)] selection:text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-[var(--emerald-sig)]/8 blur-[140px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[var(--sand-gold)]/15 blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 16
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }, className: "relative w-full max-w-md rounded-2xl border border-[var(--sand-gold)]/40 bg-white/85 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--sand-gold)]/50 bg-[var(--emerald-sig)] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-[var(--sand-gold)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-body text-[11px] font-bold tracking-[0.24em] text-[var(--sand-deep)] uppercase", children: "ABNA PICKS INTELLIGENCE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-1 text-2xl font-black tracking-tight text-[#020806]", children: "ABNA PICKS Intelligence Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: "Masuk untuk memantau data konsultasi & analitik aroma gerai" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.96
      }, animate: {
        opacity: 1,
        scale: 1
      }, className: "mt-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-red-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leading-relaxed font-medium", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Email Administrator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@abna.id", className: "w-full rounded-xl border border-stone-200 bg-[#fffcf5] px-4 py-3 pl-10 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-[var(--emerald-sig)] focus:bg-white focus:ring-2 focus:ring-[var(--emerald-sig)]/15 focus:outline-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute top-3.5 left-3.5 h-4 w-4 text-muted-foreground" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold tracking-wider text-[var(--sand-deep)] uppercase", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", className: "w-full rounded-xl border border-stone-200 bg-[#fffcf5] px-4 py-3 pl-10 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-[var(--emerald-sig)] focus:bg-white focus:ring-2 focus:ring-[var(--emerald-sig)]/15 focus:outline-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute top-3.5 left-3.5 h-4 w-4 text-muted-foreground" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "mt-6 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--emerald-sig)] py-3 text-xs font-bold tracking-[0.14em] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/20 transition-all hover:bg-[var(--emerald-deep)] hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-[var(--sand-gold)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "MEMVERIFIKASI..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "MASUK DASHBOARD" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kembali ke ABNA PICKS" })
      ] }) })
    ] })
  ] });
}
export {
  AdminLoginPage as component
};
