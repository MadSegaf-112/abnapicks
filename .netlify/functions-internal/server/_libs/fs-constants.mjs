import require$$0 from "fs";
import require$$0$1 from "constants";
var fsConstants;
var hasRequiredFsConstants;
function requireFsConstants() {
  if (hasRequiredFsConstants) return fsConstants;
  hasRequiredFsConstants = 1;
  fsConstants = require$$0.constants || require$$0$1;
  return fsConstants;
}
export {
  requireFsConstants as r
};
