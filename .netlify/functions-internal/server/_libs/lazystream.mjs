import require$$0 from "util";
import { c as requirePassthrough } from "./readable-stream.mjs";
var lazystream;
var hasRequiredLazystream;
function requireLazystream() {
  if (hasRequiredLazystream) return lazystream;
  hasRequiredLazystream = 1;
  var util = require$$0;
  var PassThrough = requirePassthrough();
  lazystream = {
    Readable,
    Writable
  };
  util.inherits(Readable, PassThrough);
  util.inherits(Writable, PassThrough);
  function beforeFirstCall(instance, method, callback) {
    instance[method] = function() {
      delete instance[method];
      callback.apply(this, arguments);
      return this[method].apply(this, arguments);
    };
  }
  function Readable(fn, options) {
    if (!(this instanceof Readable))
      return new Readable(fn, options);
    PassThrough.call(this, options);
    beforeFirstCall(this, "_read", function() {
      var source = fn.call(this, options);
      var emit = this.emit.bind(this, "error");
      source.on("error", emit);
      source.pipe(this);
    });
    this.emit("readable");
  }
  function Writable(fn, options) {
    if (!(this instanceof Writable))
      return new Writable(fn, options);
    PassThrough.call(this, options);
    beforeFirstCall(this, "_write", function() {
      var destination = fn.call(this, options);
      var emit = this.emit.bind(this, "error");
      destination.on("error", emit);
      this.pipe(destination);
    });
    this.emit("writable");
  }
  return lazystream;
}
export {
  requireLazystream as r
};
