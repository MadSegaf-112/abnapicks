import require$$2 from "events";
var listenercount;
var hasRequiredListenercount;
function requireListenercount() {
  if (hasRequiredListenercount) return listenercount;
  hasRequiredListenercount = 1;
  var listenerCount = require$$2.listenerCount;
  listenerCount = listenerCount || function(ee, event) {
    var listeners = ee && ee._events && ee._events[event];
    if (Array.isArray(listeners)) {
      return listeners.length;
    } else if (typeof listeners === "function") {
      return 1;
    } else {
      return 0;
    }
  };
  listenercount = listenerCount;
  return listenercount;
}
export {
  requireListenercount as r
};
