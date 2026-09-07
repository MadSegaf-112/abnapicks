var lodash_isnil;
var hasRequiredLodash_isnil;
function requireLodash_isnil() {
  if (hasRequiredLodash_isnil) return lodash_isnil;
  hasRequiredLodash_isnil = 1;
  function isNil(value) {
    return value == null;
  }
  lodash_isnil = isNil;
  return lodash_isnil;
}
export {
  requireLodash_isnil as r
};
