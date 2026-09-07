import require$$1 from "path";
import require$$0 from "fs";
var src = {};
var mkdirpManual = {};
var optsArg = {};
var hasRequiredOptsArg;
function requireOptsArg() {
  if (hasRequiredOptsArg) return optsArg;
  hasRequiredOptsArg = 1;
  Object.defineProperty(optsArg, "__esModule", { value: true });
  optsArg.optsArg = void 0;
  const fs_1 = require$$0;
  const optsArg$1 = (opts) => {
    if (!opts) {
      opts = { mode: 511 };
    } else if (typeof opts === "object") {
      opts = { mode: 511, ...opts };
    } else if (typeof opts === "number") {
      opts = { mode: opts };
    } else if (typeof opts === "string") {
      opts = { mode: parseInt(opts, 8) };
    } else {
      throw new TypeError("invalid options argument");
    }
    const resolved = opts;
    const optsFs = opts.fs || {};
    opts.mkdir = opts.mkdir || optsFs.mkdir || fs_1.mkdir;
    opts.mkdirAsync = opts.mkdirAsync ? opts.mkdirAsync : async (path, options) => {
      return new Promise((res, rej) => resolved.mkdir(path, options, (er, made) => er ? rej(er) : res(made)));
    };
    opts.stat = opts.stat || optsFs.stat || fs_1.stat;
    opts.statAsync = opts.statAsync ? opts.statAsync : async (path) => new Promise((res, rej) => resolved.stat(path, (err, stats) => err ? rej(err) : res(stats)));
    opts.statSync = opts.statSync || optsFs.statSync || fs_1.statSync;
    opts.mkdirSync = opts.mkdirSync || optsFs.mkdirSync || fs_1.mkdirSync;
    return resolved;
  };
  optsArg.optsArg = optsArg$1;
  return optsArg;
}
var hasRequiredMkdirpManual;
function requireMkdirpManual() {
  if (hasRequiredMkdirpManual) return mkdirpManual;
  hasRequiredMkdirpManual = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mkdirpManual = exports.mkdirpManualSync = void 0;
    const path_1 = require$$1;
    const opts_arg_js_1 = requireOptsArg();
    const mkdirpManualSync = (path, options, made) => {
      const parent = (0, path_1.dirname)(path);
      const opts = { ...(0, opts_arg_js_1.optsArg)(options), recursive: false };
      if (parent === path) {
        try {
          return opts.mkdirSync(path, opts);
        } catch (er) {
          const fer = er;
          if (fer && fer.code !== "EISDIR") {
            throw er;
          }
          return;
        }
      }
      try {
        opts.mkdirSync(path, opts);
        return made || path;
      } catch (er) {
        const fer = er;
        if (fer && fer.code === "ENOENT") {
          return (0, exports.mkdirpManualSync)(path, opts, (0, exports.mkdirpManualSync)(parent, opts, made));
        }
        if (fer && fer.code !== "EEXIST" && fer && fer.code !== "EROFS") {
          throw er;
        }
        try {
          if (!opts.statSync(path).isDirectory())
            throw er;
        } catch (_) {
          throw er;
        }
      }
    };
    exports.mkdirpManualSync = mkdirpManualSync;
    exports.mkdirpManual = Object.assign(async (path, options, made) => {
      const opts = (0, opts_arg_js_1.optsArg)(options);
      opts.recursive = false;
      const parent = (0, path_1.dirname)(path);
      if (parent === path) {
        return opts.mkdirAsync(path, opts).catch((er) => {
          const fer = er;
          if (fer && fer.code !== "EISDIR") {
            throw er;
          }
        });
      }
      return opts.mkdirAsync(path, opts).then(() => made || path, async (er) => {
        const fer = er;
        if (fer && fer.code === "ENOENT") {
          return (0, exports.mkdirpManual)(parent, opts).then((made2) => (0, exports.mkdirpManual)(path, opts, made2));
        }
        if (fer && fer.code !== "EEXIST" && fer.code !== "EROFS") {
          throw er;
        }
        return opts.statAsync(path).then((st) => {
          if (st.isDirectory()) {
            return made;
          } else {
            throw er;
          }
        }, () => {
          throw er;
        });
      });
    }, { sync: exports.mkdirpManualSync });
  })(mkdirpManual);
  return mkdirpManual;
}
var mkdirpNative = {};
var findMade = {};
var hasRequiredFindMade;
function requireFindMade() {
  if (hasRequiredFindMade) return findMade;
  hasRequiredFindMade = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findMadeSync = exports.findMade = void 0;
    const path_1 = require$$1;
    const findMade2 = async (opts, parent, path) => {
      if (path === parent) {
        return;
      }
      return opts.statAsync(parent).then(
        (st) => st.isDirectory() ? path : void 0,
        // will fail later
        // will fail later
        (er) => {
          const fer = er;
          return fer && fer.code === "ENOENT" ? (0, exports.findMade)(opts, (0, path_1.dirname)(parent), parent) : void 0;
        }
      );
    };
    exports.findMade = findMade2;
    const findMadeSync = (opts, parent, path) => {
      if (path === parent) {
        return void 0;
      }
      try {
        return opts.statSync(parent).isDirectory() ? path : void 0;
      } catch (er) {
        const fer = er;
        return fer && fer.code === "ENOENT" ? (0, exports.findMadeSync)(opts, (0, path_1.dirname)(parent), parent) : void 0;
      }
    };
    exports.findMadeSync = findMadeSync;
  })(findMade);
  return findMade;
}
var hasRequiredMkdirpNative;
function requireMkdirpNative() {
  if (hasRequiredMkdirpNative) return mkdirpNative;
  hasRequiredMkdirpNative = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mkdirpNative = exports.mkdirpNativeSync = void 0;
    const path_1 = require$$1;
    const find_made_js_1 = requireFindMade();
    const mkdirp_manual_js_1 = requireMkdirpManual();
    const opts_arg_js_1 = requireOptsArg();
    const mkdirpNativeSync = (path, options) => {
      const opts = (0, opts_arg_js_1.optsArg)(options);
      opts.recursive = true;
      const parent = (0, path_1.dirname)(path);
      if (parent === path) {
        return opts.mkdirSync(path, opts);
      }
      const made = (0, find_made_js_1.findMadeSync)(opts, path);
      try {
        opts.mkdirSync(path, opts);
        return made;
      } catch (er) {
        const fer = er;
        if (fer && fer.code === "ENOENT") {
          return (0, mkdirp_manual_js_1.mkdirpManualSync)(path, opts);
        } else {
          throw er;
        }
      }
    };
    exports.mkdirpNativeSync = mkdirpNativeSync;
    exports.mkdirpNative = Object.assign(async (path, options) => {
      const opts = { ...(0, opts_arg_js_1.optsArg)(options), recursive: true };
      const parent = (0, path_1.dirname)(path);
      if (parent === path) {
        return await opts.mkdirAsync(path, opts);
      }
      return (0, find_made_js_1.findMade)(opts, path).then((made) => opts.mkdirAsync(path, opts).then((m) => made || m).catch((er) => {
        const fer = er;
        if (fer && fer.code === "ENOENT") {
          return (0, mkdirp_manual_js_1.mkdirpManual)(path, opts);
        } else {
          throw er;
        }
      }));
    }, { sync: exports.mkdirpNativeSync });
  })(mkdirpNative);
  return mkdirpNative;
}
var pathArg = {};
var hasRequiredPathArg;
function requirePathArg() {
  if (hasRequiredPathArg) return pathArg;
  hasRequiredPathArg = 1;
  Object.defineProperty(pathArg, "__esModule", { value: true });
  pathArg.pathArg = void 0;
  const platform = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform;
  const path_1 = require$$1;
  const pathArg$1 = (path) => {
    if (/\0/.test(path)) {
      throw Object.assign(new TypeError("path must be a string without null bytes"), {
        path,
        code: "ERR_INVALID_ARG_VALUE"
      });
    }
    path = (0, path_1.resolve)(path);
    if (platform === "win32") {
      const badWinChars = /[*|"<>?:]/;
      const { root } = (0, path_1.parse)(path);
      if (badWinChars.test(path.substring(root.length))) {
        throw Object.assign(new Error("Illegal characters in path."), {
          path,
          code: "EINVAL"
        });
      }
    }
    return path;
  };
  pathArg.pathArg = pathArg$1;
  return pathArg;
}
var useNative = {};
var hasRequiredUseNative;
function requireUseNative() {
  if (hasRequiredUseNative) return useNative;
  hasRequiredUseNative = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNative = exports.useNativeSync = void 0;
    const fs_1 = require$$0;
    const opts_arg_js_1 = requireOptsArg();
    const version = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version;
    const versArr = version.replace(/^v/, "").split(".");
    const hasNative = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12;
    exports.useNativeSync = !hasNative ? () => false : (opts) => (0, opts_arg_js_1.optsArg)(opts).mkdirSync === fs_1.mkdirSync;
    exports.useNative = Object.assign(!hasNative ? () => false : (opts) => (0, opts_arg_js_1.optsArg)(opts).mkdir === fs_1.mkdir, {
      sync: exports.useNativeSync
    });
  })(useNative);
  return useNative;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mkdirp = exports.nativeSync = exports.native = exports.manualSync = exports.manual = exports.sync = exports.mkdirpSync = exports.useNativeSync = exports.useNative = exports.mkdirpNativeSync = exports.mkdirpNative = exports.mkdirpManualSync = exports.mkdirpManual = void 0;
    const mkdirp_manual_js_1 = requireMkdirpManual();
    const mkdirp_native_js_1 = requireMkdirpNative();
    const opts_arg_js_1 = requireOptsArg();
    const path_arg_js_1 = requirePathArg();
    const use_native_js_1 = requireUseNative();
    var mkdirp_manual_js_2 = requireMkdirpManual();
    Object.defineProperty(exports, "mkdirpManual", { enumerable: true, get: function() {
      return mkdirp_manual_js_2.mkdirpManual;
    } });
    Object.defineProperty(exports, "mkdirpManualSync", { enumerable: true, get: function() {
      return mkdirp_manual_js_2.mkdirpManualSync;
    } });
    var mkdirp_native_js_2 = requireMkdirpNative();
    Object.defineProperty(exports, "mkdirpNative", { enumerable: true, get: function() {
      return mkdirp_native_js_2.mkdirpNative;
    } });
    Object.defineProperty(exports, "mkdirpNativeSync", { enumerable: true, get: function() {
      return mkdirp_native_js_2.mkdirpNativeSync;
    } });
    var use_native_js_2 = requireUseNative();
    Object.defineProperty(exports, "useNative", { enumerable: true, get: function() {
      return use_native_js_2.useNative;
    } });
    Object.defineProperty(exports, "useNativeSync", { enumerable: true, get: function() {
      return use_native_js_2.useNativeSync;
    } });
    const mkdirpSync = (path, opts) => {
      path = (0, path_arg_js_1.pathArg)(path);
      const resolved = (0, opts_arg_js_1.optsArg)(opts);
      return (0, use_native_js_1.useNativeSync)(resolved) ? (0, mkdirp_native_js_1.mkdirpNativeSync)(path, resolved) : (0, mkdirp_manual_js_1.mkdirpManualSync)(path, resolved);
    };
    exports.mkdirpSync = mkdirpSync;
    exports.sync = exports.mkdirpSync;
    exports.manual = mkdirp_manual_js_1.mkdirpManual;
    exports.manualSync = mkdirp_manual_js_1.mkdirpManualSync;
    exports.native = mkdirp_native_js_1.mkdirpNative;
    exports.nativeSync = mkdirp_native_js_1.mkdirpNativeSync;
    exports.mkdirp = Object.assign(async (path, opts) => {
      path = (0, path_arg_js_1.pathArg)(path);
      const resolved = (0, opts_arg_js_1.optsArg)(opts);
      return (0, use_native_js_1.useNative)(resolved) ? (0, mkdirp_native_js_1.mkdirpNative)(path, resolved) : (0, mkdirp_manual_js_1.mkdirpManual)(path, resolved);
    }, {
      mkdirpSync: exports.mkdirpSync,
      mkdirpNative: mkdirp_native_js_1.mkdirpNative,
      mkdirpNativeSync: mkdirp_native_js_1.mkdirpNativeSync,
      mkdirpManual: mkdirp_manual_js_1.mkdirpManual,
      mkdirpManualSync: mkdirp_manual_js_1.mkdirpManualSync,
      sync: exports.mkdirpSync,
      native: mkdirp_native_js_1.mkdirpNative,
      nativeSync: mkdirp_native_js_1.mkdirpNativeSync,
      manual: mkdirp_manual_js_1.mkdirpManual,
      manualSync: mkdirp_manual_js_1.mkdirpManualSync,
      useNative: use_native_js_1.useNative,
      useNativeSync: use_native_js_1.useNativeSync
    });
  })(src);
  return src;
}
export {
  requireSrc as r
};
