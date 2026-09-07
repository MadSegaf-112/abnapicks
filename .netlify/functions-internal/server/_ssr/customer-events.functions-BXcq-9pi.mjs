import { c as createServerRpc } from "./createServerRpc-zuO7hwAA.mjs";
import { a as createServerFn } from "./server-BpnMBpJF.mjs";
import { C as ConsultationEventInputSchema, s as saveConsultationEvent } from "./customer-events.repository-CIBRJUOG.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "../_libs/zod.mjs";
const trackConsultationEvent_createServerFn_handler = createServerRpc({
  id: "30c190ef9ba4d73cb9412f4305354b2eef1c26118dc554d5704919a7a740c085",
  name: "trackConsultationEvent",
  filename: "src/lib/customer-events.functions.ts"
}, (opts) => trackConsultationEvent.__executeServer(opts));
const trackConsultationEvent = createServerFn({
  method: "POST"
}).validator((data) => ConsultationEventInputSchema.parse(data)).handler(trackConsultationEvent_createServerFn_handler, async ({
  data
}) => {
  return await saveConsultationEvent(data);
});
export {
  trackConsultationEvent_createServerFn_handler
};
