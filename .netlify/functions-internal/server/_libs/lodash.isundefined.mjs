var lodash_isundefined;
var hasRequiredLodash_isundefined;
function requireLodash_isundefined() {
  if (hasRequiredLodash_isundefined) return lodash_isundefined;
  hasRequiredLodash_isundefined = 1;
  function isUndefined(value) {
    return value === void 0;
  }
  lodash_isundefined = isUndefined;
  return lodash_isundefined;
}
export {
  requireLodash_isundefined as r
};
