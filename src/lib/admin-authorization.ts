import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getSupabaseServerClient } from "./supabase.server";
import { getSupabaseBrowserClient } from "./supabase-browser";
import { hasAdminClaim } from "./admin-policy";

export const adminAuthorization = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const client = getSupabaseBrowserClient();
    const session = client ? (await client.auth.getSession()).data.session : null;
    return next({ headers: session ? { Authorization: `Bearer ${session.access_token}` } : {} });
  })
  .server(async ({ next }) => {
    const authorization = getRequestHeader("authorization");
    const token = authorization?.match(/^Bearer (.+)$/i)?.[1];
    if (!token) throw new Error("Unauthorized");
    const client = getSupabaseServerClient();
    if (!client) throw new Error("Admin authentication unavailable");
    const { data, error } = await client.auth.getUser(token);
    if (error || !data.user) throw new Error("Unauthorized");
    if (!hasAdminClaim(data.user.app_metadata)) throw new Error("Forbidden");
    return next();
  });
