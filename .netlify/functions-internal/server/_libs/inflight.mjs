import { r as requireWrappy } from "./wrappy.mjs";
import { r as requireOnce } from "./once.mjs";
var inflight_1;
var hasRequiredInflight;
function requireInflight() {
  if (hasRequiredInflight) return inflight_1;
  hasRequiredInflight = 1;
  var wrappy = requireWrappy();
  var reqs = /* @__PURE__ */ Object.create(null);
  var once = requireOnce();
  inflight_1 = wrappy(inflight);
  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }
  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);
      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          cbs.splice(0, len);
          process.nextTick(function() {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }
  function slice(args) {
    var length = args.length;
    var array = [];
    for (var i = 0; i < length; i++) array[i] = args[i];
    return array;
  }
  return inflight_1;
}
export {
  requireInflight as r
};
