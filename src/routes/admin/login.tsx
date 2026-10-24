import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Sparkles, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal · ABNA PICKS Analytics" },
      { name: "description", content: "Portal login khusus administrator ABNA Parfum." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to /admin safely with timeout protection
  useEffect(() => {
    let isMounted = true;
    const checkExistingAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session && isMounted) {
            navigate({ to: "/admin", replace: true });
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        throw new Error("Supabase Auth belum terkonfigurasi. Periksa koneksi backend.");
      }

      const {
        data: { session },
        error: authError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      // Verify Admin Role Authorization (app_metadata.role === "admin")
      const user = session?.user;
      const isAdmin = user?.app_metadata?.role === "admin" || user?.app_metadata?.is_admin === true;

      if (!isAdmin) {
        await supabase.auth.signOut();
        throw new Error("Akun ini tidak memiliki akses administrator.");
      }

      navigate({ to: "/admin" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal masuk. Periksa email dan password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#fffcf5] px-4 text-[#020806] selection:bg-[var(--emerald-sig)] selection:text-white">
      {/* Subtle warm atmospheric diffuse ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-[var(--emerald-sig)]/8 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[var(--sand-gold)]/15 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-2xl border border-[var(--sand-gold)]/40 bg-white/85 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl"
      >
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--sand-gold)]/50 bg-[var(--emerald-sig)] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/15">
            <Sparkles className="h-5 w-5 text-[var(--sand-gold)]" />
          </div>
          <p className="mt-4 font-body text-[11px] font-bold tracking-[0.24em] text-[var(--sand-deep)] uppercase">
            ABNA PICKS INTELLIGENCE
          </p>
          <h1 className="font-display mt-1 text-2xl font-black tracking-tight text-[#020806]">
            ABNA PICKS Intelligence Dashboard
          </h1>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Masuk untuk memantau data konsultasi & analitik aroma gerai
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <div className="leading-relaxed font-medium">{error}</div>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[var(--sand-deep)] uppercase">
              Email Administrator
            </label>
            <div className="relative mt-1.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@abna.id"
                className="w-full rounded-xl border border-stone-200 bg-[#fffcf5] px-4 py-3 pl-10 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-[var(--emerald-sig)] focus:bg-white focus:ring-2 focus:ring-[var(--emerald-sig)]/15 focus:outline-none"
              />
              <Mail className="absolute top-3.5 left-3.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[var(--sand-deep)] uppercase">
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-stone-200 bg-[#fffcf5] px-4 py-3 pl-10 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-[var(--emerald-sig)] focus:bg-white focus:ring-2 focus:ring-[var(--emerald-sig)]/15 focus:outline-none"
              />
              <Lock className="absolute top-3.5 left-3.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--emerald-sig)] py-3 text-xs font-bold tracking-[0.14em] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/20 transition-all hover:bg-[var(--emerald-deep)] hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[var(--sand-gold)]" />
                <span>MEMVERIFIKASI...</span>
              </>
            ) : (
              <span>MASUK DASHBOARD</span>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke ABNA PICKS</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
