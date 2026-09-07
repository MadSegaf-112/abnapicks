import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import process from "node:process";
function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    supabaseUrl: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    lovableApiKey: process.env.LOVABLE_API_KEY
  };
}
let cachedClient = null;
function getSupabaseServerClient() {
  const config = getServerConfig();
  const url = config.supabaseUrl;
  const key = config.supabaseServiceRoleKey || config.supabaseAnonKey;
  if (!url || !key) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }
  return cachedClient;
}
export {
  getServerConfig as a,
  getSupabaseServerClient as g
};
