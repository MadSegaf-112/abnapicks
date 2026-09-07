import { r as requireChainsaw } from "./chainsaw.mjs";
import require$$2 from "events";
import { r as requireBuffers } from "./buffers.mjs";
import require$$0 from "stream";
var binary = { exports: {} };
var vars;
var hasRequiredVars;
function requireVars() {
  if (hasRequiredVars) return vars;
  hasRequiredVars = 1;
  vars = function(store) {
    function getset(name, value) {
      var node = vars2.store;
      var keys = name.split(".");
      keys.slice(0, -1).forEach(function(k) {
        if (node[k] === void 0) node[k] = {};
        node = node[k];
      });
      var key = keys[keys.length - 1];
      if (arguments.length == 1) {
        return node[key];
      } else {
        return node[key] = value;
      }
    }
    var vars2 = {
      get: function(name) {
        return getset(name);
      },
      set: function(name, value) {
        return getset(name, value);
      },
      store: store || {}
    };
    return vars2;
  };
  return vars;
}
var hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary) return binary.exports;
  hasRequiredBinary = 1;
  (function(module, exports) {
    var Chainsaw = requireChainsaw();
    var EventEmitter = require$$2.EventEmitter;
    var Buffers = requireBuffers();
    var Vars = requireVars();
    var Stream = require$$0.Stream;
    exports = module.exports = function(bufOrEm, eventName) {
      if (Buffer.isBuffer(bufOrEm)) {
        return exports.parse(bufOrEm);
      }
      var s = exports.stream();
      if (bufOrEm && bufOrEm.pipe) {
        bufOrEm.pipe(s);
      } else if (bufOrEm) {
        bufOrEm.on(eventName || "data", function(buf) {
          s.write(buf);
        });
        bufOrEm.on("end", function() {
          s.end();
        });
      }
      return s;
    };
    exports.stream = function(input) {
      if (input) return exports.apply(null, arguments);
      var pending = null;
      function getBytes(bytes, cb, skip) {
        pending = {
          bytes,
          skip,
          cb: function(buf) {
            pending = null;
            cb(buf);
          }
        };
        dispatch();
      }
      var offset = null;
      function dispatch() {
        if (!pending) {
          if (caughtEnd) done = true;
          return;
        }
        if (typeof pending === "function") {
          pending();
        } else {
          var bytes = offset + pending.bytes;
          if (buffers.length >= bytes) {
            var buf;
            if (offset == null) {
              buf = buffers.splice(0, bytes);
              if (!pending.skip) {
                buf = buf.slice();
              }
            } else {
              if (!pending.skip) {
                buf = buffers.slice(offset, bytes);
              }
              offset = bytes;
            }
            if (pending.skip) {
              pending.cb();
            } else {
              pending.cb(buf);
            }
          }
        }
      }
      function builder(saw) {
        function next() {
          if (!done) saw.next();
        }
        var self = words(function(bytes, cb) {
          return function(name) {
            getBytes(bytes, function(buf) {
              vars2.set(name, cb(buf));
              next();
            });
          };
        });
        self.tap = function(cb) {
          saw.nest(cb, vars2.store);
        };
        self.into = function(key, cb) {
          if (!vars2.get(key)) vars2.set(key, {});
          var parent = vars2;
          vars2 = Vars(parent.get(key));
          saw.nest(function() {
            cb.apply(this, arguments);
            this.tap(function() {
              vars2 = parent;
            });
          }, vars2.store);
        };
        self.flush = function() {
          vars2.store = {};
          next();
        };
        self.loop = function(cb) {
          var end = false;
          saw.nest(false, function loop() {
            this.vars = vars2.store;
            cb.call(this, function() {
              end = true;
              next();
            }, vars2.store);
            this.tap((function() {
              if (end) saw.next();
              else loop.call(this);
            }).bind(this));
          }, vars2.store);
        };
        self.buffer = function(name, bytes) {
          if (typeof bytes === "string") {
            bytes = vars2.get(bytes);
          }
          getBytes(bytes, function(buf) {
            vars2.set(name, buf);
            next();
          });
        };
        self.skip = function(bytes) {
          if (typeof bytes === "string") {
            bytes = vars2.get(bytes);
          }
          getBytes(bytes, function() {
            next();
          });
        };
        self.scan = function find(name, search) {
          if (typeof search === "string") {
            search = new Buffer(search);
          } else if (!Buffer.isBuffer(search)) {
            throw new Error("search must be a Buffer or a string");
          }
          var taken = 0;
          pending = function() {
            var pos = buffers.indexOf(search, offset + taken);
            var i = pos - offset - taken;
            if (pos !== -1) {
              pending = null;
              if (offset != null) {
                vars2.set(
                  name,
                  buffers.slice(offset, offset + taken + i)
                );
                offset += taken + i + search.length;
              } else {
                vars2.set(
                  name,
                  buffers.slice(0, taken + i)
                );
                buffers.splice(0, taken + i + search.length);
              }
              next();
              dispatch();
            } else {
              i = Math.max(buffers.length - search.length - offset - taken, 0);
            }
            taken += i;
          };
          dispatch();
        };
        self.peek = function(cb) {
          offset = 0;
          saw.nest(function() {
            cb.call(this, vars2.store);
            this.tap(function() {
              offset = null;
            });
          });
        };
        return self;
      }
      var stream = Chainsaw.light(builder);
      stream.writable = true;
      var buffers = Buffers();
      stream.write = function(buf) {
        buffers.push(buf);
        dispatch();
      };
      var vars2 = Vars();
      var done = false, caughtEnd = false;
      stream.end = function() {
        caughtEnd = true;
      };
      stream.pipe = Stream.prototype.pipe;
      Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function(name) {
        stream[name] = EventEmitter.prototype[name];
      });
      return stream;
    };
    exports.parse = function parse(buffer) {
      var self = words(function(bytes, cb) {
        return function(name) {
          if (offset + bytes <= buffer.length) {
            var buf = buffer.slice(offset, offset + bytes);
            offset += bytes;
            vars2.set(name, cb(buf));
          } else {
            vars2.set(name, null);
          }
          return self;
        };
      });
      var offset = 0;
      var vars2 = Vars();
      self.vars = vars2.store;
      self.tap = function(cb) {
        cb.call(self, vars2.store);
        return self;
      };
      self.into = function(key, cb) {
        if (!vars2.get(key)) {
          vars2.set(key, {});
        }
        var parent = vars2;
        vars2 = Vars(parent.get(key));
        cb.call(self, vars2.store);
        vars2 = parent;
        return self;
      };
      self.loop = function(cb) {
        var end = false;
        var ender = function() {
          end = true;
        };
        while (end === false) {
          cb.call(self, ender, vars2.store);
        }
        return self;
      };
      self.buffer = function(name, size) {
        if (typeof size === "string") {
          size = vars2.get(size);
        }
        var buf = buffer.slice(offset, Math.min(buffer.length, offset + size));
        offset += size;
        vars2.set(name, buf);
        return self;
      };
      self.skip = function(bytes) {
        if (typeof bytes === "string") {
          bytes = vars2.get(bytes);
        }
        offset += bytes;
        return self;
      };
      self.scan = function(name, search) {
        if (typeof search === "string") {
          search = new Buffer(search);
        } else if (!Buffer.isBuffer(search)) {
          throw new Error("search must be a Buffer or a string");
        }
        vars2.set(name, null);
        for (var i = 0; i + offset <= buffer.length - search.length + 1; i++) {
          for (var j = 0; j < search.length && buffer[offset + i + j] === search[j]; j++) ;
          if (j === search.length) break;
        }
        vars2.set(name, buffer.slice(offset, offset + i));
        offset += i + search.length;
        return self;
      };
      self.peek = function(cb) {
        var was = offset;
        cb.call(self, vars2.store);
        offset = was;
        return self;
      };
      self.flush = function() {
        vars2.store = {};
        return self;
      };
      self.eof = function() {
        return offset >= buffer.length;
      };
      return self;
    };
    function decodeLEu(bytes) {
      var acc = 0;
      for (var i = 0; i < bytes.length; i++) {
        acc += Math.pow(256, i) * bytes[i];
      }
      return acc;
    }
    function decodeBEu(bytes) {
      var acc = 0;
      for (var i = 0; i < bytes.length; i++) {
        acc += Math.pow(256, bytes.length - i - 1) * bytes[i];
      }
      return acc;
    }
    function decodeBEs(bytes) {
      var val = decodeBEu(bytes);
      if ((bytes[0] & 128) == 128) {
        val -= Math.pow(256, bytes.length);
      }
      return val;
    }
    function decodeLEs(bytes) {
      var val = decodeLEu(bytes);
      if ((bytes[bytes.length - 1] & 128) == 128) {
        val -= Math.pow(256, bytes.length);
      }
      return val;
    }
    function words(decode) {
      var self = {};
      [1, 2, 4, 8].forEach(function(bytes) {
        var bits = bytes * 8;
        self["word" + bits + "le"] = self["word" + bits + "lu"] = decode(bytes, decodeLEu);
        self["word" + bits + "ls"] = decode(bytes, decodeLEs);
        self["word" + bits + "be"] = self["word" + bits + "bu"] = decode(bytes, decodeBEu);
        self["word" + bits + "bs"] = decode(bytes, decodeBEs);
      });
      self.word8 = self.word8u = self.word8be;
      self.word8s = self.word8bs;
      return self;
    }
  })(binary, binary.exports);
  return binary.exports;
}
export {
  requireBinary as r
};
