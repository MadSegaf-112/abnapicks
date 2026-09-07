/**
 * Phase 6H-3 — Supabase Client Provider (Server-Side)
 *
 * Provides typed Supabase client instances for server-side persistence.
 * Safe for server environments and isolates secrets from the client.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getServerConfig } from "./config.server";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient | null {
  const config = getServerConfig();
  const url = config.supabaseUrl;
  // Use service role key if available for server-side admin access, otherwise anon key
  const key = config.supabaseServiceRoleKey || config.supabaseAnonKey;

  if (!url || !key) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return cachedClient;
}
