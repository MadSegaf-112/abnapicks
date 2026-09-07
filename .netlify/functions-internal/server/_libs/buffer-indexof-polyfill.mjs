var bufferIndexofPolyfill = {};
var initBuffer;
var hasRequiredInitBuffer;
function requireInitBuffer() {
  if (hasRequiredInitBuffer) return initBuffer;
  hasRequiredInitBuffer = 1;
  initBuffer = function initBuffer2(val) {
    var nodeVersion = process && process.version ? process.version : "v5.0.0";
    var major = nodeVersion.split(".")[0].replace("v", "");
    return major < 6 ? new Buffer(val) : Buffer.from(val);
  };
  return initBuffer;
}
var hasRequiredBufferIndexofPolyfill;
function requireBufferIndexofPolyfill() {
  if (hasRequiredBufferIndexofPolyfill) return bufferIndexofPolyfill;
  hasRequiredBufferIndexofPolyfill = 1;
  var initBuffer2 = requireInitBuffer();
  if (!Buffer.prototype.indexOf) {
    Buffer.prototype.indexOf = function(value, offset) {
      offset = offset || 0;
      if (typeof value === "string" || value instanceof String) {
        value = initBuffer2(value);
      } else if (typeof value === "number" || value instanceof Number) {
        value = initBuffer2([value]);
      }
      var len = value.length;
      for (var i = offset; i <= this.length - len; i++) {
        var mismatch = false;
        for (var j = 0; j < len; j++) {
          if (this[i + j] != value[j]) {
            mismatch = true;
            break;
          }
        }
        if (!mismatch) {
          return i;
        }
      }
      return -1;
    };
  }
  function bufferLastIndexOf(value, offset) {
    if (typeof value === "string" || value instanceof String) {
      value = initBuffer2(value);
    } else if (typeof value === "number" || value instanceof Number) {
      value = initBuffer2([value]);
    }
    var len = value.length;
    offset = offset || this.length - len;
    for (var i = offset; i >= 0; i--) {
      var mismatch = false;
      for (var j = 0; j < len; j++) {
        if (this[i + j] != value[j]) {
          mismatch = true;
          break;
        }
      }
      if (!mismatch) {
        return i;
      }
    }
    return -1;
  }
  if (Buffer.prototype.lastIndexOf) {
    if (initBuffer2("ABC").lastIndexOf("ABC") === -1)
      Buffer.prototype.lastIndexOf = bufferLastIndexOf;
  } else {
    Buffer.prototype.lastIndexOf = bufferLastIndexOf;
  }
  return bufferIndexofPolyfill;
}
export {
  requireBufferIndexofPolyfill as r
};
