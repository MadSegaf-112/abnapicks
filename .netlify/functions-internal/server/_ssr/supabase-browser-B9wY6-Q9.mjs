import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
let clientInstance = null;
function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    return null;
  }
  const url = "https://ieiuxqlihcasnxcgcrms.supabase.co";
  const publicKey = "sb_publishable_SYUOCLKmvVrueQHS5WdPLA_7PMn6h9I";
  if (!clientInstance) {
    clientInstance = createClient(url, publicKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  }
  return clientInstance;
}
export {
  getSupabaseBrowserClient as g
};
