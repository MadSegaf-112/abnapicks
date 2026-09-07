/**
 * Phase 6H-4 — Browser Supabase Client Provider
 *
 * Provides a browser-safe Supabase client using public environment variables.
 * Safe for client-side authentication and session management.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let clientInstance: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null;
  }

  const url = import.meta.env.VITE_SUPABASE_URL;
  const publicKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !publicKey) {
    return null;
  }

  if (!clientInstance) {
    clientInstance = createClient(url, publicKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return clientInstance;
}
