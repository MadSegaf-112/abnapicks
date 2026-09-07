import { r as requireGracefulFs } from "./graceful-fs.mjs";
import require$$1 from "path";
import "util";
import { r as requireLazystream } from "./lazystream.mjs";
import { r as requireNormalizePath } from "./normalize-path.mjs";
import { r as requireLodash_defaults } from "./lodash.defaults.mjs";
import require$$0 from "stream";
import { b as requireReadable, r as requireReadable$1 } from "./readable-stream.mjs";
import { r as requireLodash_flatten } from "./lodash.flatten.mjs";
import { r as requireLodash_difference } from "./lodash.difference.mjs";
import { r as requireLodash_union } from "./lodash.union.mjs";
import { r as requireLodash_isplainobject } from "./lodash.isplainobject.mjs";
import { r as requireGlob } from "./glob.mjs";
var archiverUtils$1 = { exports: {} };
var file$1 = { exports: {} };
var hasRequiredFile$1;
function requireFile$1() {
  if (hasRequiredFile$1) return file$1.exports;
  hasRequiredFile$1 = 1;
  var fs = requireGracefulFs();
  var path = require$$1;
  var flatten = requireLodash_flatten();
  var difference = requireLodash_difference();
  var union = requireLodash_union();
  var isPlainObject = requireLodash_isplainobject();
  var glob = requireGlob();
  var file2 = file$1.exports = {};
  var pathSeparatorRe = /[\/\\]/g;
  var processPatterns = function(patterns, fn) {
    var result = [];
    flatten(patterns).forEach(function(pattern) {
      var exclusion = pattern.indexOf("!") === 0;
      if (exclusion) {
        pattern = pattern.slice(1);
      }
      var matches = fn(pattern);
      if (exclusion) {
        result = difference(result, matches);
      } else {
        result = union(result, matches);
      }
    });
    return result;
  };
  file2.exists = function() {
    var filepath = path.join.apply(path, arguments);
    return fs.existsSync(filepath);
  };
  file2.expand = function(...args) {
    var options = isPlainObject(args[0]) ? args.shift() : {};
    var patterns = Array.isArray(args[0]) ? args[0] : args;
    if (patterns.length === 0) {
      return [];
    }
    var matches = processPatterns(patterns, function(pattern) {
      return glob.sync(pattern, options);
    });
    if (options.filter) {
      matches = matches.filter(function(filepath) {
        filepath = path.join(options.cwd || "", filepath);
        try {
          if (typeof options.filter === "function") {
            return options.filter(filepath);
          } else {
            return fs.statSync(filepath)[options.filter]();
          }
        } catch (e) {
          return false;
        }
      });
    }
    return matches;
  };
  file2.expandMapping = function(patterns, destBase, options) {
    options = Object.assign({
      rename: function(destBase2, destPath) {
        return path.join(destBase2 || "", destPath);
      }
    }, options);
    var files = [];
    var fileByDest = {};
    file2.expand(options, patterns).forEach(function(src) {
      var destPath = src;
      if (options.flatten) {
        destPath = path.basename(destPath);
      }
      if (options.ext) {
        destPath = destPath.replace(/(\.[^\/]*)?$/, options.ext);
      }
      var dest = options.rename(destBase, destPath, options);
      if (options.cwd) {
        src = path.join(options.cwd, src);
      }
      dest = dest.replace(pathSeparatorRe, "/");
      src = src.replace(pathSeparatorRe, "/");
      if (fileByDest[dest]) {
        fileByDest[dest].src.push(src);
      } else {
        files.push({
          src: [src],
          dest
        });
        fileByDest[dest] = files[files.length - 1];
      }
    });
    return files;
  };
  file2.normalizeFilesArray = function(data) {
    var files = [];
    data.forEach(function(obj) {
      if ("src" in obj || "dest" in obj) {
        files.push(obj);
      }
    });
    if (files.length === 0) {
      return [];
    }
    files = _(files).chain().forEach(function(obj) {
      if (!("src" in obj) || !obj.src) {
        return;
      }
      if (Array.isArray(obj.src)) {
        obj.src = flatten(obj.src);
      } else {
        obj.src = [obj.src];
      }
    }).map(function(obj) {
      var expandOptions = Object.assign({}, obj);
      delete expandOptions.src;
      delete expandOptions.dest;
      if (obj.expand) {
        return file2.expandMapping(obj.src, obj.dest, expandOptions).map(function(mapObj) {
          var result2 = Object.assign({}, obj);
          result2.orig = Object.assign({}, obj);
          result2.src = mapObj.src;
          result2.dest = mapObj.dest;
          ["expand", "cwd", "flatten", "rename", "ext"].forEach(function(prop) {
            delete result2[prop];
          });
          return result2;
        });
      }
      var result = Object.assign({}, obj);
      result.orig = Object.assign({}, obj);
      if ("src" in result) {
        Object.defineProperty(result, "src", {
          enumerable: true,
          get: function fn() {
            var src;
            if (!("result" in fn)) {
              src = obj.src;
              src = Array.isArray(src) ? flatten(src) : [src];
              fn.result = file2.expand(expandOptions, src);
            }
            return fn.result;
          }
        });
      }
      if ("dest" in result) {
        result.dest = obj.dest;
      }
      return result;
    }).flatten().value();
    return files;
  };
  return file$1.exports;
}
var hasRequiredArchiverUtils$1;
function requireArchiverUtils$1() {
  if (hasRequiredArchiverUtils$1) return archiverUtils$1.exports;
  hasRequiredArchiverUtils$1 = 1;
  var fs = requireGracefulFs();
  var path = require$$1;
  var lazystream = requireLazystream();
  var normalizePath = requireNormalizePath();
  var defaults = requireLodash_defaults();
  var Stream = require$$0.Stream;
  var PassThrough = requireReadable().PassThrough;
  var utils = archiverUtils$1.exports = {};
  utils.file = requireFile$1();
  utils.collectStream = function(source, callback) {
    var collection = [];
    var size = 0;
    source.on("error", callback);
    source.on("data", function(chunk) {
      collection.push(chunk);
      size += chunk.length;
    });
    source.on("end", function() {
      var buf = new Buffer(size);
      var offset = 0;
      collection.forEach(function(data) {
        data.copy(buf, offset);
        offset += data.length;
      });
      callback(null, buf);
    });
  };
  utils.dateify = function(dateish) {
    dateish = dateish || /* @__PURE__ */ new Date();
    if (dateish instanceof Date) {
      dateish = dateish;
    } else if (typeof dateish === "string") {
      dateish = new Date(dateish);
    } else {
      dateish = /* @__PURE__ */ new Date();
    }
    return dateish;
  };
  utils.defaults = function(object, source, guard) {
    var args = arguments;
    args[0] = args[0] || {};
    return defaults(...args);
  };
  utils.isStream = function(source) {
    return source instanceof Stream;
  };
  utils.lazyReadStream = function(filepath) {
    return new lazystream.Readable(function() {
      return fs.createReadStream(filepath);
    });
  };
  utils.normalizeInputSource = function(source) {
    if (source === null) {
      return new Buffer(0);
    } else if (typeof source === "string") {
      return new Buffer(source);
    } else if (utils.isStream(source) && !source._readableState) {
      var normalized = new PassThrough();
      source.pipe(normalized);
      return normalized;
    }
    return source;
  };
  utils.sanitizePath = function(filepath) {
    return normalizePath(filepath, false).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
  };
  utils.trailingSlashIt = function(str) {
    return str.slice(-1) !== "/" ? str + "/" : str;
  };
  utils.unixifyPath = function(filepath) {
    return normalizePath(filepath, false).replace(/^\w+:/, "");
  };
  utils.walkdir = function(dirpath, base, callback) {
    var results = [];
    if (typeof base === "function") {
      callback = base;
      base = dirpath;
    }
    fs.readdir(dirpath, function(err, list) {
      var i = 0;
      var file2;
      var filepath;
      if (err) {
        return callback(err);
      }
      (function next() {
        file2 = list[i++];
        if (!file2) {
          return callback(null, results);
        }
        filepath = path.join(dirpath, file2);
        fs.stat(filepath, function(err2, stats) {
          results.push({
            path: filepath,
            relative: path.relative(base, filepath).replace(/\\/g, "/"),
            stats
          });
          if (stats && stats.isDirectory()) {
            utils.walkdir(filepath, base, function(err3, res) {
              res.forEach(function(dirEntry) {
                results.push(dirEntry);
              });
              next();
            });
          } else {
            next();
          }
        });
      })();
    });
  };
  return archiverUtils$1.exports;
}
var archiverUtils = { exports: {} };
var file = { exports: {} };
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file.exports;
  hasRequiredFile = 1;
  var fs = requireGracefulFs();
  var path = require$$1;
  var flatten = requireLodash_flatten();
  var difference = requireLodash_difference();
  var union = requireLodash_union();
  var isPlainObject = requireLodash_isplainobject();
  var glob = requireGlob();
  var file$12 = file.exports = {};
  var pathSeparatorRe = /[\/\\]/g;
  var processPatterns = function(patterns, fn) {
    var result = [];
    flatten(patterns).forEach(function(pattern) {
      var exclusion = pattern.indexOf("!") === 0;
      if (exclusion) {
        pattern = pattern.slice(1);
      }
      var matches = fn(pattern);
      if (exclusion) {
        result = difference(result, matches);
      } else {
        result = union(result, matches);
      }
    });
    return result;
  };
  file$12.exists = function() {
    var filepath = path.join.apply(path, arguments);
    return fs.existsSync(filepath);
  };
  file$12.expand = function(...args) {
    var options = isPlainObject(args[0]) ? args.shift() : {};
    var patterns = Array.isArray(args[0]) ? args[0] : args;
    if (patterns.length === 0) {
      return [];
    }
    var matches = processPatterns(patterns, function(pattern) {
      return glob.sync(pattern, options);
    });
    if (options.filter) {
      matches = matches.filter(function(filepath) {
        filepath = path.join(options.cwd || "", filepath);
        try {
          if (typeof options.filter === "function") {
            return options.filter(filepath);
          } else {
            return fs.statSync(filepath)[options.filter]();
          }
        } catch (e) {
          return false;
        }
      });
    }
    return matches;
  };
  file$12.expandMapping = function(patterns, destBase, options) {
    options = Object.assign({
      rename: function(destBase2, destPath) {
        return path.join(destBase2 || "", destPath);
      }
    }, options);
    var files = [];
    var fileByDest = {};
    file$12.expand(options, patterns).forEach(function(src) {
      var destPath = src;
      if (options.flatten) {
        destPath = path.basename(destPath);
      }
      if (options.ext) {
        destPath = destPath.replace(/(\.[^\/]*)?$/, options.ext);
      }
      var dest = options.rename(destBase, destPath, options);
      if (options.cwd) {
        src = path.join(options.cwd, src);
      }
      dest = dest.replace(pathSeparatorRe, "/");
      src = src.replace(pathSeparatorRe, "/");
      if (fileByDest[dest]) {
        fileByDest[dest].src.push(src);
      } else {
        files.push({
          src: [src],
          dest
        });
        fileByDest[dest] = files[files.length - 1];
      }
    });
    return files;
  };
  file$12.normalizeFilesArray = function(data) {
    var files = [];
    data.forEach(function(obj) {
      if ("src" in obj || "dest" in obj) {
        files.push(obj);
      }
    });
    if (files.length === 0) {
      return [];
    }
    files = _(files).chain().forEach(function(obj) {
      if (!("src" in obj) || !obj.src) {
        return;
      }
      if (Array.isArray(obj.src)) {
        obj.src = flatten(obj.src);
      } else {
        obj.src = [obj.src];
      }
    }).map(function(obj) {
      var expandOptions = Object.assign({}, obj);
      delete expandOptions.src;
      delete expandOptions.dest;
      if (obj.expand) {
        return file$12.expandMapping(obj.src, obj.dest, expandOptions).map(function(mapObj) {
          var result2 = Object.assign({}, obj);
          result2.orig = Object.assign({}, obj);
          result2.src = mapObj.src;
          result2.dest = mapObj.dest;
          ["expand", "cwd", "flatten", "rename", "ext"].forEach(function(prop) {
            delete result2[prop];
          });
          return result2;
        });
      }
      var result = Object.assign({}, obj);
      result.orig = Object.assign({}, obj);
      if ("src" in result) {
        Object.defineProperty(result, "src", {
          enumerable: true,
          get: function fn() {
            var src;
            if (!("result" in fn)) {
              src = obj.src;
              src = Array.isArray(src) ? flatten(src) : [src];
              fn.result = file$12.expand(expandOptions, src);
            }
            return fn.result;
          }
        });
      }
      if ("dest" in result) {
        result.dest = obj.dest;
      }
      return result;
    }).flatten().value();
    return files;
  };
  return file.exports;
}
var hasRequiredArchiverUtils;
function requireArchiverUtils() {
  if (hasRequiredArchiverUtils) return archiverUtils.exports;
  hasRequiredArchiverUtils = 1;
  var fs = requireGracefulFs();
  var path = require$$1;
  var lazystream = requireLazystream();
  var normalizePath = requireNormalizePath();
  var defaults = requireLodash_defaults();
  var Stream = require$$0.Stream;
  var PassThrough = requireReadable$1().PassThrough;
  var utils = archiverUtils.exports = {};
  utils.file = requireFile();
  utils.collectStream = function(source, callback) {
    var collection = [];
    var size = 0;
    source.on("error", callback);
    source.on("data", function(chunk) {
      collection.push(chunk);
      size += chunk.length;
    });
    source.on("end", function() {
      var buf = Buffer.alloc(size);
      var offset = 0;
      collection.forEach(function(data) {
        data.copy(buf, offset);
        offset += data.length;
      });
      callback(null, buf);
    });
  };
  utils.dateify = function(dateish) {
    dateish = dateish || /* @__PURE__ */ new Date();
    if (dateish instanceof Date) {
      dateish = dateish;
    } else if (typeof dateish === "string") {
      dateish = new Date(dateish);
    } else {
      dateish = /* @__PURE__ */ new Date();
    }
    return dateish;
  };
  utils.defaults = function(object, source, guard) {
    var args = arguments;
    args[0] = args[0] || {};
    return defaults(...args);
  };
  utils.isStream = function(source) {
    return source instanceof Stream;
  };
  utils.lazyReadStream = function(filepath) {
    return new lazystream.Readable(function() {
      return fs.createReadStream(filepath);
    });
  };
  utils.normalizeInputSource = function(source) {
    if (source === null) {
      return Buffer.alloc(0);
    } else if (typeof source === "string") {
      return Buffer.from(source);
    } else if (utils.isStream(source)) {
      return source.pipe(new PassThrough());
    }
    return source;
  };
  utils.sanitizePath = function(filepath) {
    return normalizePath(filepath, false).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
  };
  utils.trailingSlashIt = function(str) {
    return str.slice(-1) !== "/" ? str + "/" : str;
  };
  utils.unixifyPath = function(filepath) {
    return normalizePath(filepath, false).replace(/^\w+:/, "");
  };
  utils.walkdir = function(dirpath, base, callback) {
    var results = [];
    if (typeof base === "function") {
      callback = base;
      base = dirpath;
    }
    fs.readdir(dirpath, function(err, list) {
      var i = 0;
      var file2;
      var filepath;
      if (err) {
        return callback(err);
      }
      (function next() {
        file2 = list[i++];
        if (!file2) {
          return callback(null, results);
        }
        filepath = path.join(dirpath, file2);
        fs.stat(filepath, function(err2, stats) {
          results.push({
            path: filepath,
            relative: path.relative(base, filepath).replace(/\\/g, "/"),
            stats
          });
          if (stats && stats.isDirectory()) {
            utils.walkdir(filepath, base, function(err3, res) {
              res.forEach(function(dirEntry) {
                results.push(dirEntry);
              });
              next();
            });
          } else {
            next();
          }
        });
      })();
    });
  };
  return archiverUtils.exports;
}
export {
  requireArchiverUtils as a,
  requireArchiverUtils$1 as r
};
