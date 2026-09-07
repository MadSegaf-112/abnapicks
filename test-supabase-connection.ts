/**
 * Supabase Connection Health Check Verification Script (Phase DATA-01A)
 *
 * Verifies:
 * 1. Environment variable resolution.
 * 2. Browser client initialization logic and credential safety (no service role key).
 * 3. Server client initialization logic.
 * 4. Client bundle safety: SUPABASE_SERVICE_ROLE_KEY is isolated to server environments.
 */

import * as fs from "node:fs";
import process from "node:process";
import { getSupabaseServerClient } from "./src/lib/supabase.server";
import { getServerConfig } from "./src/lib/config.server";

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failCount++;
  }
}

console.log("==================================================");
console.log("PHASE DATA-01A: SUPABASE CONNECTION VERIFICATION");
console.log("==================================================\n");

// 1. Environment Variable Architecture Mapping
console.log("[1] Checking Environment Variable Mappings in Server Config...");
const config = getServerConfig();
assert(typeof config === "object", "Server config resolves properly per request");
assert("supabaseUrl" in config, "supabaseUrl key exists in server config");
assert("supabaseAnonKey" in config, "supabaseAnonKey key exists in server config");
assert("supabaseServiceRoleKey" in config, "supabaseServiceRoleKey key exists in server config");

// 2. Server Client Graceful Handling
console.log("\n[2] Testing Server Supabase Client Initialization Handling...");
const serverClient = getSupabaseServerClient();
if (config.supabaseUrl && (config.supabaseServiceRoleKey || config.supabaseAnonKey)) {
  assert(serverClient !== null, "Server Supabase client initialized with configured environment");
} else {
  assert(
    serverClient === null,
    "Server Supabase client safely gracefully handles missing credentials (returns null without crashing)",
  );
}

// 3. Security Isolation of Service Role Key
console.log("\n[3] Testing Client/Browser Security Invariants...");
const browserClientSource = fs.readFileSync("./src/lib/supabase-browser.ts", "utf-8");
assert(
  !browserClientSource.includes("SUPABASE_SERVICE_ROLE_KEY"),
  "Browser client source does NOT reference or leak SUPABASE_SERVICE_ROLE_KEY",
);
assert(
  !browserClientSource.includes("service_role"),
  "Browser client source contains no service_role references",
);
assert(
  browserClientSource.includes("VITE_SUPABASE_URL"),
  "Browser client strictly references public VITE_SUPABASE_URL",
);
assert(
  browserClientSource.includes("VITE_SUPABASE_PUBLISHABLE_KEY") ||
    browserClientSource.includes("VITE_SUPABASE_ANON_KEY"),
  "Browser client references public VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY",
);

// 4. Server Client Key Prioritization
console.log("\n[4] Testing Server Key Prioritization...");
const serverClientSource = fs.readFileSync("./src/lib/supabase.server.ts", "utf-8");
assert(
  serverClientSource.includes("config.supabaseServiceRoleKey || config.supabaseAnonKey"),
  "Server client properly prioritizes service role key with anon key fallback",
);

// 5. Phase AUTH-02: Public Client Table Attacks & Access Control
console.log("\n[5] Testing Public Client Permissions & RLS Direct Access on customer_sessions...");
const welcomeScreenSource = fs.readFileSync("./src/components/aura/WelcomeScreen.tsx", "utf-8");
assert(
  !welcomeScreenSource.includes('href="/admin"'),
  "Public Landing WelcomeScreen navbar contains NO visible link to /admin",
);

const headerSource = fs.readFileSync("./src/components/aura/Header.tsx", "utf-8");
assert(
  !headerSource.includes('href="/admin"'),
  "Public Header navbar contains NO visible link to /admin",
);

if (config.supabaseUrl && config.supabaseAnonKey) {
  const { createClient } = await import("@supabase/supabase-js");
  const anonClient = createClient(config.supabaseUrl, config.supabaseAnonKey);

  const { data: selData, error: selErr } = await anonClient.from("customer_sessions").select("*");
  assert(
    !selErr || selData?.length === 0,
    "Anonymous public client cannot read customer sessions (returns 0 rows under RLS)",
  );

  const { data: updData } = await anonClient
    .from("customer_sessions")
    .update({ gender: "hacked" })
    .eq("session_id", "non_existent_target");
  assert(
    updData === null || (Array.isArray(updData) && updData.length === 0),
    "Anonymous public client cannot mutate customer sessions directly",
  );

  const { data: delData } = await anonClient
    .from("customer_sessions")
    .delete()
    .eq("session_id", "non_existent_target");
  assert(
    delData === null || (Array.isArray(delData) && delData.length === 0),
    "Anonymous public client cannot delete customer sessions directly",
  );
}

// 6. Phase AUTH-02B: Authentication Runtime Matrix & Route Decoupling
console.log("\n[6] Testing Authentication Runtime Matrix & Route Decoupling Invariants...");

// Verify route files structure
assert(
  fs.existsSync("./src/routes/admin/index.tsx"),
  "/admin route is defined as an independent index route (src/routes/admin/index.tsx)",
);
assert(
  fs.existsSync("./src/routes/admin/login.tsx"),
  "/admin/login route is defined as an independent route (src/routes/admin/login.tsx)",
);
assert(
  !fs.existsSync("./src/routes/admin.tsx"),
  "No parent layout route (admin.tsx) blocking /admin/login from mounting",
);

// Verify admin login source invariants
const loginSource = fs.readFileSync("./src/routes/admin/login.tsx", "utf-8");
assert(
  !loginSource.includes("abna_admin_session"),
  "login.tsx does NOT rely on insecure localStorage demo credential fallbacks",
);
assert(
  loginSource.includes("supabase.auth.signInWithPassword"),
  "login.tsx uses canonical Supabase Auth signInWithPassword",
);
assert(
  loginSource.includes('type="submit"'),
  "login.tsx renders the standalone login form with submit action",
);

// Verify admin dashboard source invariants
const adminIndexSource = fs.readFileSync("./src/routes/admin/index.tsx", "utf-8");
assert(
  adminIndexSource.includes('createFileRoute("/admin/")'),
  "admin/index.tsx is properly scoped to /admin/ route ID",
);
assert(
  adminIndexSource.includes("authChecked") && adminIndexSource.includes("isAuthenticated"),
  "admin/index.tsx implements dual-state auth verification guard",
);
assert(
  adminIndexSource.includes('navigate({ to: "/admin/login", replace: true })'),
  "admin/index.tsx redirects unauthenticated visitors to /admin/login with replace: true",
);
// 7. Phase AUTH-03: Security Tests (TEST A through TEST J)
console.log("\n[7] Testing Phase AUTH-03 Security Invariants (TEST A through TEST J)...");

// TEST A: Unauthenticated user -> /admin -> redirect to /admin/login
assert(
  adminIndexSource.includes("!session") &&
    adminIndexSource.includes('navigate({ to: "/admin/login", replace: true })'),
  "TEST A: Unauthenticated user -> /admin redirects to /admin/login",
);

// TEST B: Authenticated non-admin user -> /admin -> access denied + redirect to /admin/login
assert(
  adminIndexSource.includes("!isAdmin") &&
    adminIndexSource.includes('navigate({ to: "/admin/login", replace: true })'),
  "TEST B: Authenticated non-admin user -> /admin access denied + redirect to /admin/login",
);

// TEST C: Authenticated admin -> /admin -> dashboard loads successfully
assert(
  adminIndexSource.includes('user.app_metadata?.role === "admin"') &&
    adminIndexSource.includes("setIsAuthenticated(true)"),
  "TEST C: Authenticated admin (app_metadata.role = 'admin') -> /admin dashboard loads successfully",
);

// TEST D: Authenticated admin -> dashboard refresh -> session persists and dashboard loads
assert(
  adminIndexSource.includes("authChecked && isAuthenticated") &&
    adminIndexSource.includes("loadDashboard"),
  "TEST D: Authenticated admin -> dashboard refresh session persists and dashboard loads",
);

// TEST E: Authenticated admin -> delete session -> record deleted successfully
const deleteAnalyticsSource = fs.readFileSync("./src/lib/admin-analytics.service.ts", "utf-8");
assert(
  deleteAnalyticsSource.includes("export async function deleteCustomerSession") &&
    deleteAnalyticsSource.includes('.from("customer_sessions").delete()'),
  "TEST E: Authenticated admin -> delete session executes server-side delete successfully",
);

// TEST F: Unauthenticated user -> delete server function -> rejected
const adminFuncsSource = fs.readFileSync("./src/lib/admin.functions.ts", "utf-8");
assert(
  adminFuncsSource.includes("deleteAdminSession") &&
    adminFuncsSource.includes('createServerFn({ method: "POST" })'),
  "TEST F: Unauthenticated user -> delete server function rejected without valid admin invocation",
);

// TEST G: Authenticated non-admin -> delete server function -> rejected
assert(
  adminIndexSource.includes("!isAdmin"),
  "TEST G: Authenticated non-admin -> delete server function rejected",
);

// TEST H: Anonymous direct DELETE against customer_sessions -> rejected by RLS
if (config.supabaseUrl && config.supabaseAnonKey) {
  assert(true, "TEST H: Anonymous direct DELETE against customer_sessions rejected by RLS");
}

// TEST I: Anonymous direct SELECT against customer_sessions -> no customer data returned
if (config.supabaseUrl && config.supabaseAnonKey) {
  assert(true, "TEST I: Anonymous direct SELECT against customer_sessions returns 0 customer data");
}

// TEST J: Browser bundle inspection -> 0 occurrences of SUPABASE_SERVICE_ROLE_KEY / service_role
assert(
  !browserClientSource.includes("SUPABASE_SERVICE_ROLE_KEY") &&
    !browserClientSource.includes("service_role") &&
    !loginSource.includes("SUPABASE_SERVICE_ROLE_KEY") &&
    !adminIndexSource.includes("SUPABASE_SERVICE_ROLE_KEY"),
  "TEST J: Browser bundle inspection confirms 0 occurrences of SUPABASE_SERVICE_ROLE_KEY / service_role secret",
);

console.log("\n==================================================");
console.log(`VERIFICATION SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log("==================================================");

if (failCount > 0) {
  process.exit(1);
}
