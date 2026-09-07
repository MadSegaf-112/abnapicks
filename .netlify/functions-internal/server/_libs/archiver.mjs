import require$$0$1 from "fs";
import { r as requireReaddirGlob } from "./readdir-glob.mjs";
import { r as require$$2 } from "./async.mjs";
import require$$1 from "path";
import { r as requireArchiverUtils } from "./archiver-utils.mjs";
import require$$0 from "util";
import { r as requireReadable } from "./readable-stream.mjs";
import { r as requireZipStream } from "./zip-stream.mjs";
import require$$0$2 from "zlib";
import { r as requireTarStream } from "./tar-stream.mjs";
import { r as requireBufferCrc32 } from "./buffer-crc32.mjs";
var error = { exports: {} };
var hasRequiredError;
function requireError() {
  if (hasRequiredError) return error.exports;
  hasRequiredError = 1;
  (function(module, exports) {
    var util = require$$0;
    const ERROR_CODES = {
      "ABORTED": "archive was aborted",
      "DIRECTORYDIRPATHREQUIRED": "diretory dirpath argument must be a non-empty string value",
      "DIRECTORYFUNCTIONINVALIDDATA": "invalid data returned by directory custom data function",
      "ENTRYNAMEREQUIRED": "entry name must be a non-empty string value",
      "FILEFILEPATHREQUIRED": "file filepath argument must be a non-empty string value",
      "FINALIZING": "archive already finalizing",
      "QUEUECLOSED": "queue closed",
      "NOENDMETHOD": "no suitable finalize/end method defined by module",
      "DIRECTORYNOTSUPPORTED": "support for directory entries not defined by module",
      "FORMATSET": "archive format already set",
      "INPUTSTEAMBUFFERREQUIRED": "input source must be valid Stream or Buffer instance",
      "MODULESET": "module already set",
      "SYMLINKNOTSUPPORTED": "support for symlink entries not defined by module",
      "SYMLINKFILEPATHREQUIRED": "symlink filepath argument must be a non-empty string value",
      "SYMLINKTARGETREQUIRED": "symlink target argument must be a non-empty string value",
      "ENTRYNOTSUPPORTED": "entry not supported"
    };
    function ArchiverError(code, data) {
      Error.captureStackTrace(this, this.constructor);
      this.message = ERROR_CODES[code] || code;
      this.code = code;
      this.data = data;
    }
    util.inherits(ArchiverError, Error);
    module.exports = ArchiverError;
  })(error);
  return error.exports;
}
var core;
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core;
  hasRequiredCore = 1;
  var fs = require$$0$1;
  var glob = requireReaddirGlob();
  var async = require$$2;
  var path = require$$1;
  var util = requireArchiverUtils();
  var inherits = require$$0.inherits;
  var ArchiverError = requireError();
  var Transform = requireReadable().Transform;
  var win32 = process.platform === "win32";
  var Archiver = function(format, options) {
    if (!(this instanceof Archiver)) {
      return new Archiver(format, options);
    }
    if (typeof format !== "string") {
      options = format;
      format = "zip";
    }
    options = this.options = util.defaults(options, {
      highWaterMark: 1024 * 1024,
      statConcurrency: 4
    });
    Transform.call(this, options);
    this._format = false;
    this._module = false;
    this._pending = 0;
    this._pointer = 0;
    this._entriesCount = 0;
    this._entriesProcessedCount = 0;
    this._fsEntriesTotalBytes = 0;
    this._fsEntriesProcessedBytes = 0;
    this._queue = async.queue(this._onQueueTask.bind(this), 1);
    this._queue.drain(this._onQueueDrain.bind(this));
    this._statQueue = async.queue(this._onStatQueueTask.bind(this), options.statConcurrency);
    this._statQueue.drain(this._onQueueDrain.bind(this));
    this._state = {
      aborted: false,
      finalize: false,
      finalizing: false,
      finalized: false,
      modulePiped: false
    };
    this._streams = [];
  };
  inherits(Archiver, Transform);
  Archiver.prototype._abort = function() {
    this._state.aborted = true;
    this._queue.kill();
    this._statQueue.kill();
    if (this._queue.idle()) {
      this._shutdown();
    }
  };
  Archiver.prototype._append = function(filepath, data) {
    data = data || {};
    var task = {
      source: null,
      filepath
    };
    if (!data.name) {
      data.name = filepath;
    }
    data.sourcePath = filepath;
    task.data = data;
    this._entriesCount++;
    if (data.stats && data.stats instanceof fs.Stats) {
      task = this._updateQueueTaskWithStats(task, data.stats);
      if (task) {
        if (data.stats.size) {
          this._fsEntriesTotalBytes += data.stats.size;
        }
        this._queue.push(task);
      }
    } else {
      this._statQueue.push(task);
    }
  };
  Archiver.prototype._finalize = function() {
    if (this._state.finalizing || this._state.finalized || this._state.aborted) {
      return;
    }
    this._state.finalizing = true;
    this._moduleFinalize();
    this._state.finalizing = false;
    this._state.finalized = true;
  };
  Archiver.prototype._maybeFinalize = function() {
    if (this._state.finalizing || this._state.finalized || this._state.aborted) {
      return false;
    }
    if (this._state.finalize && this._pending === 0 && this._queue.idle() && this._statQueue.idle()) {
      this._finalize();
      return true;
    }
    return false;
  };
  Archiver.prototype._moduleAppend = function(source, data, callback) {
    if (this._state.aborted) {
      callback();
      return;
    }
    this._module.append(source, data, (function(err) {
      this._task = null;
      if (this._state.aborted) {
        this._shutdown();
        return;
      }
      if (err) {
        this.emit("error", err);
        setImmediate(callback);
        return;
      }
      this.emit("entry", data);
      this._entriesProcessedCount++;
      if (data.stats && data.stats.size) {
        this._fsEntriesProcessedBytes += data.stats.size;
      }
      this.emit("progress", {
        entries: {
          total: this._entriesCount,
          processed: this._entriesProcessedCount
        },
        fs: {
          totalBytes: this._fsEntriesTotalBytes,
          processedBytes: this._fsEntriesProcessedBytes
        }
      });
      setImmediate(callback);
    }).bind(this));
  };
  Archiver.prototype._moduleFinalize = function() {
    if (typeof this._module.finalize === "function") {
      this._module.finalize();
    } else if (typeof this._module.end === "function") {
      this._module.end();
    } else {
      this.emit("error", new ArchiverError("NOENDMETHOD"));
    }
  };
  Archiver.prototype._modulePipe = function() {
    this._module.on("error", this._onModuleError.bind(this));
    this._module.pipe(this);
    this._state.modulePiped = true;
  };
  Archiver.prototype._moduleSupports = function(key) {
    if (!this._module.supports || !this._module.supports[key]) {
      return false;
    }
    return this._module.supports[key];
  };
  Archiver.prototype._moduleUnpipe = function() {
    this._module.unpipe(this);
    this._state.modulePiped = false;
  };
  Archiver.prototype._normalizeEntryData = function(data, stats) {
    data = util.defaults(data, {
      type: "file",
      name: null,
      date: null,
      mode: null,
      prefix: null,
      sourcePath: null,
      stats: false
    });
    if (stats && data.stats === false) {
      data.stats = stats;
    }
    var isDir = data.type === "directory";
    if (data.name) {
      if (typeof data.prefix === "string" && "" !== data.prefix) {
        data.name = data.prefix + "/" + data.name;
        data.prefix = null;
      }
      data.name = util.sanitizePath(data.name);
      if (data.type !== "symlink" && data.name.slice(-1) === "/") {
        isDir = true;
        data.type = "directory";
      } else if (isDir) {
        data.name += "/";
      }
    }
    if (typeof data.mode === "number") {
      if (win32) {
        data.mode &= 511;
      } else {
        data.mode &= 4095;
      }
    } else if (data.stats && data.mode === null) {
      if (win32) {
        data.mode = data.stats.mode & 511;
      } else {
        data.mode = data.stats.mode & 4095;
      }
      if (win32 && isDir) {
        data.mode = 493;
      }
    } else if (data.mode === null) {
      data.mode = isDir ? 493 : 420;
    }
    if (data.stats && data.date === null) {
      data.date = data.stats.mtime;
    } else {
      data.date = util.dateify(data.date);
    }
    return data;
  };
  Archiver.prototype._onModuleError = function(err) {
    this.emit("error", err);
  };
  Archiver.prototype._onQueueDrain = function() {
    if (this._state.finalizing || this._state.finalized || this._state.aborted) {
      return;
    }
    if (this._state.finalize && this._pending === 0 && this._queue.idle() && this._statQueue.idle()) {
      this._finalize();
    }
  };
  Archiver.prototype._onQueueTask = function(task, callback) {
    var fullCallback = () => {
      if (task.data.callback) {
        task.data.callback();
      }
      callback();
    };
    if (this._state.finalizing || this._state.finalized || this._state.aborted) {
      fullCallback();
      return;
    }
    this._task = task;
    this._moduleAppend(task.source, task.data, fullCallback);
  };
  Archiver.prototype._onStatQueueTask = function(task, callback) {
    if (this._state.finalizing || this._state.finalized || this._state.aborted) {
      callback();
      return;
    }
    fs.lstat(task.filepath, (function(err, stats) {
      if (this._state.aborted) {
        setImmediate(callback);
        return;
      }
      if (err) {
        this._entriesCount--;
        this.emit("warning", err);
        setImmediate(callback);
        return;
      }
      task = this._updateQueueTaskWithStats(task, stats);
      if (task) {
        if (stats.size) {
          this._fsEntriesTotalBytes += stats.size;
        }
        this._queue.push(task);
      }
      setImmediate(callback);
    }).bind(this));
  };
  Archiver.prototype._shutdown = function() {
    this._moduleUnpipe();
    this.end();
  };
  Archiver.prototype._transform = function(chunk, encoding, callback) {
    if (chunk) {
      this._pointer += chunk.length;
    }
    callback(null, chunk);
  };
  Archiver.prototype._updateQueueTaskWithStats = function(task, stats) {
    if (stats.isFile()) {
      task.data.type = "file";
      task.data.sourceType = "stream";
      task.source = util.lazyReadStream(task.filepath);
    } else if (stats.isDirectory() && this._moduleSupports("directory")) {
      task.data.name = util.trailingSlashIt(task.data.name);
      task.data.type = "directory";
      task.data.sourcePath = util.trailingSlashIt(task.filepath);
      task.data.sourceType = "buffer";
      task.source = Buffer.concat([]);
    } else if (stats.isSymbolicLink() && this._moduleSupports("symlink")) {
      var linkPath = fs.readlinkSync(task.filepath);
      var dirName = path.dirname(task.filepath);
      task.data.type = "symlink";
      task.data.linkname = path.relative(dirName, path.resolve(dirName, linkPath));
      task.data.sourceType = "buffer";
      task.source = Buffer.concat([]);
    } else {
      if (stats.isDirectory()) {
        this.emit("warning", new ArchiverError("DIRECTORYNOTSUPPORTED", task.data));
      } else if (stats.isSymbolicLink()) {
        this.emit("warning", new ArchiverError("SYMLINKNOTSUPPORTED", task.data));
      } else {
        this.emit("warning", new ArchiverError("ENTRYNOTSUPPORTED", task.data));
      }
      return null;
    }
    task.data = this._normalizeEntryData(task.data, stats);
    return task;
  };
  Archiver.prototype.abort = function() {
    if (this._state.aborted || this._state.finalized) {
      return this;
    }
    this._abort();
    return this;
  };
  Archiver.prototype.append = function(source, data) {
    if (this._state.finalize || this._state.aborted) {
      this.emit("error", new ArchiverError("QUEUECLOSED"));
      return this;
    }
    data = this._normalizeEntryData(data);
    if (typeof data.name !== "string" || data.name.length === 0) {
      this.emit("error", new ArchiverError("ENTRYNAMEREQUIRED"));
      return this;
    }
    if (data.type === "directory" && !this._moduleSupports("directory")) {
      this.emit("error", new ArchiverError("DIRECTORYNOTSUPPORTED", { name: data.name }));
      return this;
    }
    source = util.normalizeInputSource(source);
    if (Buffer.isBuffer(source)) {
      data.sourceType = "buffer";
    } else if (util.isStream(source)) {
      data.sourceType = "stream";
    } else {
      this.emit("error", new ArchiverError("INPUTSTEAMBUFFERREQUIRED", { name: data.name }));
      return this;
    }
    this._entriesCount++;
    this._queue.push({
      data,
      source
    });
    return this;
  };
  Archiver.prototype.directory = function(dirpath, destpath, data) {
    if (this._state.finalize || this._state.aborted) {
      this.emit("error", new ArchiverError("QUEUECLOSED"));
      return this;
    }
    if (typeof dirpath !== "string" || dirpath.length === 0) {
      this.emit("error", new ArchiverError("DIRECTORYDIRPATHREQUIRED"));
      return this;
    }
    this._pending++;
    if (destpath === false) {
      destpath = "";
    } else if (typeof destpath !== "string") {
      destpath = dirpath;
    }
    var dataFunction = false;
    if (typeof data === "function") {
      dataFunction = data;
      data = {};
    } else if (typeof data !== "object") {
      data = {};
    }
    var globOptions = {
      stat: true,
      dot: true
    };
    function onGlobEnd() {
      this._pending--;
      this._maybeFinalize();
    }
    function onGlobError(err) {
      this.emit("error", err);
    }
    function onGlobMatch(match) {
      globber.pause();
      var ignoreMatch = false;
      var entryData = Object.assign({}, data);
      entryData.name = match.relative;
      entryData.prefix = destpath;
      entryData.stats = match.stat;
      entryData.callback = globber.resume.bind(globber);
      try {
        if (dataFunction) {
          entryData = dataFunction(entryData);
          if (entryData === false) {
            ignoreMatch = true;
          } else if (typeof entryData !== "object") {
            throw new ArchiverError("DIRECTORYFUNCTIONINVALIDDATA", { dirpath });
          }
        }
      } catch (e) {
        this.emit("error", e);
        return;
      }
      if (ignoreMatch) {
        globber.resume();
        return;
      }
      this._append(match.absolute, entryData);
    }
    var globber = glob(dirpath, globOptions);
    globber.on("error", onGlobError.bind(this));
    globber.on("match", onGlobMatch.bind(this));
    globber.on("end", onGlobEnd.bind(this));
    return this;
  };
  Archiver.prototype.file = function(filepath, data) {
    if (this._state.finalize || this._state.aborted) {
      this.emit("error", new ArchiverError("QUEUECLOSED"));
      return this;
    }
    if (typeof filepath !== "string" || filepath.length === 0) {
      this.emit("error", new ArchiverError("FILEFILEPATHREQUIRED"));
      return this;
    }
    this._append(filepath, data);
    return this;
  };
  Archiver.prototype.glob = function(pattern, options, data) {
    this._pending++;
    options = util.defaults(options, {
      stat: true,
      pattern
    });
    function onGlobEnd() {
      this._pending--;
      this._maybeFinalize();
    }
    function onGlobError(err) {
      this.emit("error", err);
    }
    function onGlobMatch(match) {
      globber.pause();
      var entryData = Object.assign({}, data);
      entryData.callback = globber.resume.bind(globber);
      entryData.stats = match.stat;
      entryData.name = match.relative;
      this._append(match.absolute, entryData);
    }
    var globber = glob(options.cwd || ".", options);
    globber.on("error", onGlobError.bind(this));
    globber.on("match", onGlobMatch.bind(this));
    globber.on("end", onGlobEnd.bind(this));
    return this;
  };
  Archiver.prototype.finalize = function() {
    if (this._state.aborted) {
      var abortedError = new ArchiverError("ABORTED");
      this.emit("error", abortedError);
      return Promise.reject(abortedError);
    }
    if (this._state.finalize) {
      var finalizingError = new ArchiverError("FINALIZING");
      this.emit("error", finalizingError);
      return Promise.reject(finalizingError);
    }
    this._state.finalize = true;
    if (this._pending === 0 && this._queue.idle() && this._statQueue.idle()) {
      this._finalize();
    }
    var self = this;
    return new Promise(function(resolve, reject) {
      var errored;
      self._module.on("end", function() {
        if (!errored) {
          resolve();
        }
      });
      self._module.on("error", function(err) {
        errored = true;
        reject(err);
      });
    });
  };
  Archiver.prototype.setFormat = function(format) {
    if (this._format) {
      this.emit("error", new ArchiverError("FORMATSET"));
      return this;
    }
    this._format = format;
    return this;
  };
  Archiver.prototype.setModule = function(module) {
    if (this._state.aborted) {
      this.emit("error", new ArchiverError("ABORTED"));
      return this;
    }
    if (this._state.module) {
      this.emit("error", new ArchiverError("MODULESET"));
      return this;
    }
    this._module = module;
    this._modulePipe();
    return this;
  };
  Archiver.prototype.symlink = function(filepath, target, mode) {
    if (this._state.finalize || this._state.aborted) {
      this.emit("error", new ArchiverError("QUEUECLOSED"));
      return this;
    }
    if (typeof filepath !== "string" || filepath.length === 0) {
      this.emit("error", new ArchiverError("SYMLINKFILEPATHREQUIRED"));
      return this;
    }
    if (typeof target !== "string" || target.length === 0) {
      this.emit("error", new ArchiverError("SYMLINKTARGETREQUIRED", { filepath }));
      return this;
    }
    if (!this._moduleSupports("symlink")) {
      this.emit("error", new ArchiverError("SYMLINKNOTSUPPORTED", { filepath }));
      return this;
    }
    var data = {};
    data.type = "symlink";
    data.name = filepath.replace(/\\/g, "/");
    data.linkname = target.replace(/\\/g, "/");
    data.sourceType = "buffer";
    if (typeof mode === "number") {
      data.mode = mode;
    }
    this._entriesCount++;
    this._queue.push({
      data,
      source: Buffer.concat([])
    });
    return this;
  };
  Archiver.prototype.pointer = function() {
    return this._pointer;
  };
  Archiver.prototype.use = function(plugin) {
    this._streams.push(plugin);
    return this;
  };
  core = Archiver;
  return core;
}
var zip;
var hasRequiredZip;
function requireZip() {
  if (hasRequiredZip) return zip;
  hasRequiredZip = 1;
  var engine = requireZipStream();
  var util = requireArchiverUtils();
  var Zip = function(options) {
    if (!(this instanceof Zip)) {
      return new Zip(options);
    }
    options = this.options = util.defaults(options, {
      comment: "",
      forceUTC: false,
      namePrependSlash: false,
      store: false
    });
    this.supports = {
      directory: true,
      symlink: true
    };
    this.engine = new engine(options);
  };
  Zip.prototype.append = function(source, data, callback) {
    this.engine.entry(source, data, callback);
  };
  Zip.prototype.finalize = function() {
    this.engine.finalize();
  };
  Zip.prototype.on = function() {
    return this.engine.on.apply(this.engine, arguments);
  };
  Zip.prototype.pipe = function() {
    return this.engine.pipe.apply(this.engine, arguments);
  };
  Zip.prototype.unpipe = function() {
    return this.engine.unpipe.apply(this.engine, arguments);
  };
  zip = Zip;
  return zip;
}
var tar;
var hasRequiredTar;
function requireTar() {
  if (hasRequiredTar) return tar;
  hasRequiredTar = 1;
  var zlib = require$$0$2;
  var engine = requireTarStream();
  var util = requireArchiverUtils();
  var Tar = function(options) {
    if (!(this instanceof Tar)) {
      return new Tar(options);
    }
    options = this.options = util.defaults(options, {
      gzip: false
    });
    if (typeof options.gzipOptions !== "object") {
      options.gzipOptions = {};
    }
    this.supports = {
      directory: true,
      symlink: true
    };
    this.engine = engine.pack(options);
    this.compressor = false;
    if (options.gzip) {
      this.compressor = zlib.createGzip(options.gzipOptions);
      this.compressor.on("error", this._onCompressorError.bind(this));
    }
  };
  Tar.prototype._onCompressorError = function(err) {
    this.engine.emit("error", err);
  };
  Tar.prototype.append = function(source, data, callback) {
    var self = this;
    data.mtime = data.date;
    function append(err, sourceBuffer) {
      if (err) {
        callback(err);
        return;
      }
      self.engine.entry(data, sourceBuffer, function(err2) {
        callback(err2, data);
      });
    }
    if (data.sourceType === "buffer") {
      append(null, source);
    } else if (data.sourceType === "stream" && data.stats) {
      data.size = data.stats.size;
      var entry = self.engine.entry(data, function(err) {
        callback(err, data);
      });
      source.pipe(entry);
    } else if (data.sourceType === "stream") {
      util.collectStream(source, append);
    }
  };
  Tar.prototype.finalize = function() {
    this.engine.finalize();
  };
  Tar.prototype.on = function() {
    return this.engine.on.apply(this.engine, arguments);
  };
  Tar.prototype.pipe = function(destination, options) {
    if (this.compressor) {
      return this.engine.pipe.apply(this.engine, [this.compressor]).pipe(destination, options);
    } else {
      return this.engine.pipe.apply(this.engine, arguments);
    }
  };
  Tar.prototype.unpipe = function() {
    if (this.compressor) {
      return this.compressor.unpipe.apply(this.compressor, arguments);
    } else {
      return this.engine.unpipe.apply(this.engine, arguments);
    }
  };
  tar = Tar;
  return tar;
}
var json;
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json;
  hasRequiredJson = 1;
  var inherits = require$$0.inherits;
  var Transform = requireReadable().Transform;
  var crc32 = requireBufferCrc32();
  var util = requireArchiverUtils();
  var Json = function(options) {
    if (!(this instanceof Json)) {
      return new Json(options);
    }
    options = this.options = util.defaults(options, {});
    Transform.call(this, options);
    this.supports = {
      directory: true,
      symlink: true
    };
    this.files = [];
  };
  inherits(Json, Transform);
  Json.prototype._transform = function(chunk, encoding, callback) {
    callback(null, chunk);
  };
  Json.prototype._writeStringified = function() {
    var fileString = JSON.stringify(this.files);
    this.write(fileString);
  };
  Json.prototype.append = function(source, data, callback) {
    var self = this;
    data.crc32 = 0;
    function onend(err, sourceBuffer) {
      if (err) {
        callback(err);
        return;
      }
      data.size = sourceBuffer.length || 0;
      data.crc32 = crc32.unsigned(sourceBuffer);
      self.files.push(data);
      callback(null, data);
    }
    if (data.sourceType === "buffer") {
      onend(null, source);
    } else if (data.sourceType === "stream") {
      util.collectStream(source, onend);
    }
  };
  Json.prototype.finalize = function() {
    this._writeStringified();
    this.end();
  };
  json = Json;
  return json;
}
var archiver;
var hasRequiredArchiver;
function requireArchiver() {
  if (hasRequiredArchiver) return archiver;
  hasRequiredArchiver = 1;
  var Archiver = requireCore();
  var formats = {};
  var vending = function(format, options) {
    return vending.create(format, options);
  };
  vending.create = function(format, options) {
    if (formats[format]) {
      var instance = new Archiver(format, options);
      instance.setFormat(format);
      instance.setModule(new formats[format](options));
      return instance;
    } else {
      throw new Error("create(" + format + "): format not registered");
    }
  };
  vending.registerFormat = function(format, module) {
    if (formats[format]) {
      throw new Error("register(" + format + "): format already registered");
    }
    if (typeof module !== "function") {
      throw new Error("register(" + format + "): format module invalid");
    }
    if (typeof module.prototype.append !== "function" || typeof module.prototype.finalize !== "function") {
      throw new Error("register(" + format + "): format module missing methods");
    }
    formats[format] = module;
  };
  vending.isRegisteredFormat = function(format) {
    if (formats[format]) {
      return true;
    }
    return false;
  };
  vending.registerFormat("zip", requireZip());
  vending.registerFormat("tar", requireTar());
  vending.registerFormat("json", requireJson());
  archiver = vending;
  return archiver;
}
export {
  requireArchiver as r
};
