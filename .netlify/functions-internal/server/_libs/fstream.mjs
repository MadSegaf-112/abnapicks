import require$$0 from "stream";
import { r as requireInherits } from "./inherits.mjs";
import { r as requireGracefulFs } from "./graceful-fs.mjs";
import require$$1 from "path";
import require$$5 from "assert";
import { r as requireRimraf } from "./rimraf.mjs";
import { r as requireSrc } from "./mkdirp.mjs";
import require$$0$1 from "fs";
var fstream = {};
var abstract;
var hasRequiredAbstract;
function requireAbstract() {
  if (hasRequiredAbstract) return abstract;
  hasRequiredAbstract = 1;
  abstract = Abstract;
  var Stream = require$$0.Stream;
  var inherits = requireInherits();
  function Abstract() {
    Stream.call(this);
  }
  inherits(Abstract, Stream);
  Abstract.prototype.on = function(ev, fn) {
    if (ev === "ready" && this.ready) {
      process.nextTick(fn.bind(this));
    } else {
      Stream.prototype.on.call(this, ev, fn);
    }
    return this;
  };
  Abstract.prototype.abort = function() {
    this._aborted = true;
    this.emit("abort");
  };
  Abstract.prototype.destroy = function() {
  };
  Abstract.prototype.warn = function(msg, code) {
    var self = this;
    var er = decorate(msg, code, self);
    if (!self.listeners("warn")) {
      console.error(
        "%s %s\npath = %s\nsyscall = %s\nfstream_type = %s\nfstream_path = %s\nfstream_unc_path = %s\nfstream_class = %s\nfstream_stack =\n%s\n",
        code || "UNKNOWN",
        er.stack,
        er.path,
        er.syscall,
        er.fstream_type,
        er.fstream_path,
        er.fstream_unc_path,
        er.fstream_class,
        er.fstream_stack.join("\n")
      );
    } else {
      self.emit("warn", er);
    }
  };
  Abstract.prototype.info = function(msg, code) {
    this.emit("info", msg, code);
  };
  Abstract.prototype.error = function(msg, code, th) {
    var er = decorate(msg, code, this);
    if (th) throw er;
    else this.emit("error", er);
  };
  function decorate(er, code, self) {
    if (!(er instanceof Error)) er = new Error(er);
    er.code = er.code || code;
    er.path = er.path || self.path;
    er.fstream_type = er.fstream_type || self.type;
    er.fstream_path = er.fstream_path || self.path;
    if (self._path !== self.path) {
      er.fstream_unc_path = er.fstream_unc_path || self._path;
    }
    if (self.linkpath) {
      er.fstream_linkpath = er.fstream_linkpath || self.linkpath;
    }
    er.fstream_class = er.fstream_class || self.constructor.name;
    er.fstream_stack = er.fstream_stack || new Error().stack.split(/\n/).slice(3).map(function(s) {
      return s.replace(/^ {4}at /, "");
    });
    return er;
  }
  return abstract;
}
var getType_1;
var hasRequiredGetType;
function requireGetType() {
  if (hasRequiredGetType) return getType_1;
  hasRequiredGetType = 1;
  getType_1 = getType;
  function getType(st) {
    var types = [
      "Directory",
      "File",
      "SymbolicLink",
      "Link",
      // special for hardlinks from tarballs
      "BlockDevice",
      "CharacterDevice",
      "FIFO",
      "Socket"
    ];
    var type;
    if (st.type && types.indexOf(st.type) !== -1) {
      st[st.type] = true;
      return st.type;
    }
    for (var i = 0, l = types.length; i < l; i++) {
      type = types[i];
      var is = st[type] || st["is" + type];
      if (typeof is === "function") is = is.call(st);
      if (is) {
        st[type] = true;
        st.type = type;
        return type;
      }
    }
    return null;
  }
  return getType_1;
}
var linkReader;
var hasRequiredLinkReader;
function requireLinkReader() {
  if (hasRequiredLinkReader) return linkReader;
  hasRequiredLinkReader = 1;
  linkReader = LinkReader;
  var fs = requireGracefulFs();
  var inherits = requireInherits();
  var Reader = requireReader();
  inherits(LinkReader, Reader);
  function LinkReader(props) {
    var self = this;
    if (!(self instanceof LinkReader)) {
      throw new Error("LinkReader must be called as constructor.");
    }
    if (!(props.type === "Link" && props.Link || props.type === "SymbolicLink" && props.SymbolicLink)) {
      throw new Error("Non-link type " + props.type);
    }
    Reader.call(self, props);
  }
  LinkReader.prototype._stat = function(currentStat) {
    var self = this;
    fs.readlink(self._path, function(er, linkpath) {
      if (er) return self.error(er);
      self.linkpath = self.props.linkpath = linkpath;
      self.emit("linkpath", linkpath);
      Reader.prototype._stat.call(self, currentStat);
    });
  };
  LinkReader.prototype._read = function() {
    var self = this;
    if (self._paused) return;
    if (!self._ended) {
      self.emit("end");
      self.emit("close");
      self._ended = true;
    }
  };
  return linkReader;
}
var dirReader;
var hasRequiredDirReader;
function requireDirReader() {
  if (hasRequiredDirReader) return dirReader;
  hasRequiredDirReader = 1;
  dirReader = DirReader;
  var fs = requireGracefulFs();
  var inherits = requireInherits();
  var path = require$$1;
  var Reader = requireReader();
  var assert = require$$5.ok;
  inherits(DirReader, Reader);
  function DirReader(props) {
    var self = this;
    if (!(self instanceof DirReader)) {
      throw new Error("DirReader must be called as constructor.");
    }
    if (props.type !== "Directory" || !props.Directory) {
      throw new Error("Non-directory type " + props.type);
    }
    self.entries = null;
    self._index = -1;
    self._paused = false;
    self._length = -1;
    if (props.sort) {
      this.sort = props.sort;
    }
    Reader.call(this, props);
  }
  DirReader.prototype._getEntries = function() {
    var self = this;
    if (self._gotEntries) return;
    self._gotEntries = true;
    fs.readdir(self._path, function(er, entries) {
      if (er) return self.error(er);
      self.entries = entries;
      self.emit("entries", entries);
      if (self._paused) self.once("resume", processEntries);
      else processEntries();
      function processEntries() {
        self._length = self.entries.length;
        if (typeof self.sort === "function") {
          self.entries = self.entries.sort(self.sort.bind(self));
        }
        self._read();
      }
    });
  };
  DirReader.prototype._read = function() {
    var self = this;
    if (!self.entries) return self._getEntries();
    if (self._paused || self._currentEntry || self._aborted) {
      return;
    }
    self._index++;
    if (self._index >= self.entries.length) {
      if (!self._ended) {
        self._ended = true;
        self.emit("end");
        self.emit("close");
      }
      return;
    }
    var p = path.resolve(self._path, self.entries[self._index]);
    assert(p !== self._path);
    assert(self.entries[self._index]);
    self._currentEntry = p;
    fs[self.props.follow ? "stat" : "lstat"](p, function(er, stat) {
      if (er) return self.error(er);
      var who = self._proxy || self;
      stat.path = p;
      stat.basename = path.basename(p);
      stat.dirname = path.dirname(p);
      var childProps = self.getChildProps.call(who, stat);
      childProps.path = p;
      childProps.basename = path.basename(p);
      childProps.dirname = path.dirname(p);
      var entry = Reader(childProps, stat);
      self._currentEntry = entry;
      entry.on("pause", function(who2) {
        if (!self._paused && !entry._disowned) {
          self.pause(who2);
        }
      });
      entry.on("resume", function(who2) {
        if (self._paused && !entry._disowned) {
          self.resume(who2);
        }
      });
      entry.on("stat", function(props) {
        self.emit("_entryStat", entry, props);
        if (entry._aborted) return;
        if (entry._paused) {
          entry.once("resume", function() {
            self.emit("entryStat", entry, props);
          });
        } else self.emit("entryStat", entry, props);
      });
      entry.on("ready", function EMITCHILD() {
        if (self._paused) {
          entry.pause(self);
          return self.once("resume", EMITCHILD);
        }
        if (entry.type === "Socket") {
          self.emit("socket", entry);
        } else {
          self.emitEntry(entry);
        }
      });
      var ended = false;
      entry.on("close", onend);
      entry.on("disown", onend);
      function onend() {
        if (ended) return;
        ended = true;
        self.emit("childEnd", entry);
        self.emit("entryEnd", entry);
        self._currentEntry = null;
        if (!self._paused) {
          self._read();
        }
      }
      entry.on("error", function(er2) {
        if (entry._swallowErrors) {
          self.warn(er2);
          entry.emit("end");
          entry.emit("close");
        } else {
          self.emit("error", er2);
        }
      });
      [
        "child",
        "childEnd",
        "warn"
      ].forEach(function(ev) {
        entry.on(ev, self.emit.bind(self, ev));
      });
    });
  };
  DirReader.prototype.disown = function(entry) {
    entry.emit("beforeDisown");
    entry._disowned = true;
    entry.parent = entry.root = null;
    if (entry === this._currentEntry) {
      this._currentEntry = null;
    }
    entry.emit("disown");
  };
  DirReader.prototype.getChildProps = function() {
    return {
      depth: this.depth + 1,
      root: this.root || this,
      parent: this,
      follow: this.follow,
      filter: this.filter,
      sort: this.props.sort,
      hardlinks: this.props.hardlinks
    };
  };
  DirReader.prototype.pause = function(who) {
    var self = this;
    if (self._paused) return;
    who = who || self;
    self._paused = true;
    if (self._currentEntry && self._currentEntry.pause) {
      self._currentEntry.pause(who);
    }
    self.emit("pause", who);
  };
  DirReader.prototype.resume = function(who) {
    var self = this;
    if (!self._paused) return;
    who = who || self;
    self._paused = false;
    self.emit("resume", who);
    if (self._paused) {
      return;
    }
    if (self._currentEntry) {
      if (self._currentEntry.resume) self._currentEntry.resume(who);
    } else self._read();
  };
  DirReader.prototype.emitEntry = function(entry) {
    this.emit("entry", entry);
    this.emit("child", entry);
  };
  return dirReader;
}
var fileReader;
var hasRequiredFileReader;
function requireFileReader() {
  if (hasRequiredFileReader) return fileReader;
  hasRequiredFileReader = 1;
  fileReader = FileReader;
  var fs = requireGracefulFs();
  var inherits = requireInherits();
  var Reader = requireReader();
  var EOF = { EOF: true };
  var CLOSE = { CLOSE: true };
  inherits(FileReader, Reader);
  function FileReader(props) {
    var self = this;
    if (!(self instanceof FileReader)) {
      throw new Error("FileReader must be called as constructor.");
    }
    if (!(props.type === "Link" && props.Link || props.type === "File" && props.File)) {
      throw new Error("Non-file type " + props.type);
    }
    self._buffer = [];
    self._bytesEmitted = 0;
    Reader.call(self, props);
  }
  FileReader.prototype._getStream = function() {
    var self = this;
    var stream = self._stream = fs.createReadStream(self._path, self.props);
    if (self.props.blksize) {
      stream.bufferSize = self.props.blksize;
    }
    stream.on("open", self.emit.bind(self, "open"));
    stream.on("data", function(c) {
      self._bytesEmitted += c.length;
      if (!c.length) {
        return;
      } else if (self._paused || self._buffer.length) {
        self._buffer.push(c);
        self._read();
      } else self.emit("data", c);
    });
    stream.on("end", function() {
      if (self._paused || self._buffer.length) {
        self._buffer.push(EOF);
        self._read();
      } else {
        self.emit("end");
      }
      if (self._bytesEmitted !== self.props.size) {
        self.error("Didn't get expected byte count\nexpect: " + self.props.size + "\nactual: " + self._bytesEmitted);
      }
    });
    stream.on("close", function() {
      if (self._paused || self._buffer.length) {
        self._buffer.push(CLOSE);
        self._read();
      } else {
        self.emit("close");
      }
    });
    stream.on("error", function(e) {
      self.emit("error", e);
    });
    self._read();
  };
  FileReader.prototype._read = function() {
    var self = this;
    if (self._paused) {
      return;
    }
    if (!self._stream) {
      return self._getStream();
    }
    if (self._buffer.length) {
      var buf = self._buffer;
      for (var i = 0, l = buf.length; i < l; i++) {
        var c = buf[i];
        if (c === EOF) {
          self.emit("end");
        } else if (c === CLOSE) {
          self.emit("close");
        } else {
          self.emit("data", c);
        }
        if (self._paused) {
          self._buffer = buf.slice(i);
          return;
        }
      }
      self._buffer.length = 0;
    }
  };
  FileReader.prototype.pause = function(who) {
    var self = this;
    if (self._paused) return;
    who = who || self;
    self._paused = true;
    if (self._stream) self._stream.pause();
    self.emit("pause", who);
  };
  FileReader.prototype.resume = function(who) {
    var self = this;
    if (!self._paused) return;
    who = who || self;
    self.emit("resume", who);
    self._paused = false;
    if (self._stream) self._stream.resume();
    self._read();
  };
  return fileReader;
}
var socketReader;
var hasRequiredSocketReader;
function requireSocketReader() {
  if (hasRequiredSocketReader) return socketReader;
  hasRequiredSocketReader = 1;
  socketReader = SocketReader;
  var inherits = requireInherits();
  var Reader = requireReader();
  inherits(SocketReader, Reader);
  function SocketReader(props) {
    var self = this;
    if (!(self instanceof SocketReader)) {
      throw new Error("SocketReader must be called as constructor.");
    }
    if (!(props.type === "Socket" && props.Socket)) {
      throw new Error("Non-socket type " + props.type);
    }
    Reader.call(self, props);
  }
  SocketReader.prototype._read = function() {
    var self = this;
    if (self._paused) return;
    if (!self._ended) {
      self.emit("end");
      self.emit("close");
      self._ended = true;
    }
  };
  return socketReader;
}
var proxyReader;
var hasRequiredProxyReader;
function requireProxyReader() {
  if (hasRequiredProxyReader) return proxyReader;
  hasRequiredProxyReader = 1;
  proxyReader = ProxyReader;
  var Reader = requireReader();
  var getType = requireGetType();
  var inherits = requireInherits();
  var fs = requireGracefulFs();
  inherits(ProxyReader, Reader);
  function ProxyReader(props) {
    var self = this;
    if (!(self instanceof ProxyReader)) {
      throw new Error("ProxyReader must be called as constructor.");
    }
    self.props = props;
    self._buffer = [];
    self.ready = false;
    Reader.call(self, props);
  }
  ProxyReader.prototype._stat = function() {
    var self = this;
    var props = self.props;
    var stat = props.follow ? "stat" : "lstat";
    fs[stat](props.path, function(er, current) {
      var type;
      if (er || !current) {
        type = "File";
      } else {
        type = getType(current);
      }
      props[type] = true;
      props.type = self.type = type;
      self._old = current;
      self._addProxy(Reader(props, current));
    });
  };
  ProxyReader.prototype._addProxy = function(proxy) {
    var self = this;
    if (self._proxyTarget) {
      return self.error("proxy already set");
    }
    self._proxyTarget = proxy;
    proxy._proxy = self;
    [
      "error",
      "data",
      "end",
      "close",
      "linkpath",
      "entry",
      "entryEnd",
      "child",
      "childEnd",
      "warn",
      "stat"
    ].forEach(function(ev) {
      proxy.on(ev, self.emit.bind(self, ev));
    });
    self.emit("proxy", proxy);
    proxy.on("ready", function() {
      self.ready = true;
      self.emit("ready");
    });
    var calls = self._buffer;
    self._buffer.length = 0;
    calls.forEach(function(c) {
      proxy[c[0]].apply(proxy, c[1]);
    });
  };
  ProxyReader.prototype.pause = function() {
    return this._proxyTarget ? this._proxyTarget.pause() : false;
  };
  ProxyReader.prototype.resume = function() {
    return this._proxyTarget ? this._proxyTarget.resume() : false;
  };
  return proxyReader;
}
var reader;
var hasRequiredReader;
function requireReader() {
  if (hasRequiredReader) return reader;
  hasRequiredReader = 1;
  reader = Reader;
  var fs = requireGracefulFs();
  var Stream = require$$0.Stream;
  var inherits = requireInherits();
  var path = require$$1;
  var getType = requireGetType();
  var hardLinks = Reader.hardLinks = {};
  var Abstract = requireAbstract();
  inherits(Reader, Abstract);
  var LinkReader = requireLinkReader();
  function Reader(props, currentStat) {
    var self = this;
    if (!(self instanceof Reader)) return new Reader(props, currentStat);
    if (typeof props === "string") {
      props = { path: props };
    }
    var type;
    var ClassType;
    if (props.type && typeof props.type === "function") {
      type = props.type;
      ClassType = type;
    } else {
      type = getType(props);
      ClassType = Reader;
    }
    if (currentStat && !type) {
      type = getType(currentStat);
      props[type] = true;
      props.type = type;
    }
    switch (type) {
      case "Directory":
        ClassType = requireDirReader();
        break;
      case "Link":
      // XXX hard links are just files.
      // However, it would be good to keep track of files' dev+inode
      // and nlink values, and create a HardLinkReader that emits
      // a linkpath value of the original copy, so that the tar
      // writer can preserve them.
      // ClassType = HardLinkReader
      // break
      case "File":
        ClassType = requireFileReader();
        break;
      case "SymbolicLink":
        ClassType = LinkReader;
        break;
      case "Socket":
        ClassType = requireSocketReader();
        break;
      case null:
        ClassType = requireProxyReader();
        break;
    }
    if (!(self instanceof ClassType)) {
      return new ClassType(props);
    }
    Abstract.call(self);
    if (!props.path) {
      self.error("Must provide a path", null, true);
    }
    self.readable = true;
    self.writable = false;
    self.type = type;
    self.props = props;
    self.depth = props.depth = props.depth || 0;
    self.parent = props.parent || null;
    self.root = props.root || props.parent && props.parent.root || self;
    self._path = self.path = path.resolve(props.path);
    if (process.platform === "win32") {
      self.path = self._path = self.path.replace(/\?/g, "_");
      if (self._path.length >= 260) {
        self._swallowErrors = true;
        self._path = "\\\\?\\" + self.path.replace(/\//g, "\\");
      }
    }
    self.basename = props.basename = path.basename(self.path);
    self.dirname = props.dirname = path.dirname(self.path);
    props.parent = props.root = null;
    self.size = props.size;
    self.filter = typeof props.filter === "function" ? props.filter : null;
    if (props.sort === "alpha") props.sort = alphasort;
    self._stat(currentStat);
  }
  function alphasort(a, b) {
    return a === b ? 0 : a.toLowerCase() > b.toLowerCase() ? 1 : a.toLowerCase() < b.toLowerCase() ? -1 : a > b ? 1 : -1;
  }
  Reader.prototype._stat = function(currentStat) {
    var self = this;
    var props = self.props;
    var stat = props.follow ? "stat" : "lstat";
    if (currentStat) process.nextTick(statCb.bind(null, null, currentStat));
    else fs[stat](self._path, statCb);
    function statCb(er, props_) {
      if (er) return self.error(er);
      Object.keys(props_).forEach(function(k2) {
        props[k2] = props_[k2];
      });
      if (void 0 !== self.size && props.size !== self.size) {
        return self.error("incorrect size");
      }
      self.size = props.size;
      var type = getType(props);
      var handleHardlinks = props.hardlinks !== false;
      if (handleHardlinks && type !== "Directory" && props.nlink && props.nlink > 1) {
        var k = props.dev + ":" + props.ino;
        if (hardLinks[k] === self._path || !hardLinks[k]) {
          hardLinks[k] = self._path;
        } else {
          type = self.type = self.props.type = "Link";
          self.Link = self.props.Link = true;
          self.linkpath = self.props.linkpath = hardLinks[k];
          self._stat = self._read = LinkReader.prototype._read;
        }
      }
      if (self.type && self.type !== type) {
        self.error("Unexpected type: " + type);
      }
      if (self.filter) {
        var who = self._proxy || self;
        if (!self.filter.call(who, who, props)) {
          if (!self._disowned) {
            self.abort();
            self.emit("end");
            self.emit("close");
          }
          return;
        }
      }
      var events = ["_stat", "stat", "ready"];
      var e = 0;
      (function go() {
        if (self._aborted) {
          self.emit("end");
          self.emit("close");
          return;
        }
        if (self._paused && self.type !== "Directory") {
          self.once("resume", go);
          return;
        }
        var ev = events[e++];
        if (!ev) {
          return self._read();
        }
        self.emit(ev, props);
        go();
      })();
    }
  };
  Reader.prototype.pipe = function(dest) {
    var self = this;
    if (typeof dest.add === "function") {
      self.on("entry", function(entry) {
        var ret = dest.add(entry);
        if (ret === false) {
          self.pause();
        }
      });
    }
    return Stream.prototype.pipe.apply(this, arguments);
  };
  Reader.prototype.pause = function(who) {
    this._paused = true;
    who = who || this;
    this.emit("pause", who);
    if (this._stream) this._stream.pause(who);
  };
  Reader.prototype.resume = function(who) {
    this._paused = false;
    who = who || this;
    this.emit("resume", who);
    if (this._stream) this._stream.resume(who);
    this._read();
  };
  Reader.prototype._read = function() {
    this.error("Cannot read unknown type: " + this.type);
  };
  return reader;
}
var collect_1;
var hasRequiredCollect;
function requireCollect() {
  if (hasRequiredCollect) return collect_1;
  hasRequiredCollect = 1;
  collect_1 = collect;
  function collect(stream) {
    if (stream._collected) return;
    if (stream._paused) return stream.on("resume", collect.bind(null, stream));
    stream._collected = true;
    stream.pause();
    stream.on("data", save);
    stream.on("end", save);
    var buf = [];
    function save(b) {
      if (typeof b === "string") b = new Buffer(b);
      if (Buffer.isBuffer(b) && !b.length) return;
      buf.push(b);
    }
    stream.on("entry", saveEntry);
    var entryBuffer = [];
    function saveEntry(e) {
      collect(e);
      entryBuffer.push(e);
    }
    stream.on("proxy", proxyPause);
    function proxyPause(p) {
      p.pause();
    }
    stream.pipe = /* @__PURE__ */ (function(orig) {
      return function(dest) {
        var e = 0;
        (function unblockEntry() {
          var entry = entryBuffer[e++];
          if (!entry) return resume();
          entry.on("end", unblockEntry);
          if (dest) dest.add(entry);
          else stream.emit("entry", entry);
        })();
        function resume() {
          stream.removeListener("entry", saveEntry);
          stream.removeListener("data", save);
          stream.removeListener("end", save);
          stream.pipe = orig;
          if (dest) stream.pipe(dest);
          buf.forEach(function(b) {
            if (b) stream.emit("data", b);
            else stream.emit("end");
          });
          stream.resume();
        }
        return dest;
      };
    })(stream.pipe);
  }
  return collect_1;
}
var dirWriter;
var hasRequiredDirWriter;
function requireDirWriter() {
  if (hasRequiredDirWriter) return dirWriter;
  hasRequiredDirWriter = 1;
  dirWriter = DirWriter;
  var Writer = requireWriter();
  var inherits = requireInherits();
  var mkdir = requireSrc();
  var path = require$$1;
  var collect = requireCollect();
  inherits(DirWriter, Writer);
  function DirWriter(props) {
    var self = this;
    if (!(self instanceof DirWriter)) {
      self.error("DirWriter must be called as constructor.", null, true);
    }
    if (props.type !== "Directory" || !props.Directory) {
      self.error("Non-directory type " + props.type + " " + JSON.stringify(props), null, true);
    }
    Writer.call(this, props);
  }
  DirWriter.prototype._create = function() {
    var self = this;
    mkdir(self._path, Writer.dirmode, function(er) {
      if (er) return self.error(er);
      self.ready = true;
      self.emit("ready");
      self._process();
    });
  };
  DirWriter.prototype.write = function() {
    return true;
  };
  DirWriter.prototype.end = function() {
    this._ended = true;
    this._process();
  };
  DirWriter.prototype.add = function(entry) {
    var self = this;
    collect(entry);
    if (!self.ready || self._currentEntry) {
      self._buffer.push(entry);
      return false;
    }
    if (self._ended) {
      return self.error("add after end");
    }
    self._buffer.push(entry);
    self._process();
    return this._buffer.length === 0;
  };
  DirWriter.prototype._process = function() {
    var self = this;
    if (self._processing) return;
    var entry = self._buffer.shift();
    if (!entry) {
      self.emit("drain");
      if (self._ended) self._finish();
      return;
    }
    self._processing = true;
    self.emit("entry", entry);
    var p = entry;
    var pp;
    do {
      pp = p._path || p.path;
      if (pp === self.root._path || pp === self._path || pp && pp.indexOf(self._path) === 0) {
        self._processing = false;
        if (entry._collected) entry.pipe();
        return self._process();
      }
      p = p.parent;
    } while (p);
    var props = {
      parent: self,
      root: self.root || self,
      type: entry.type,
      depth: self.depth + 1
    };
    pp = entry._path || entry.path || entry.props.path;
    if (entry.parent) {
      pp = pp.substr(entry.parent._path.length + 1);
    }
    props.path = path.join(self.path, path.join("/", pp));
    props.filter = self.filter;
    Object.keys(entry.props).forEach(function(k) {
      if (!props.hasOwnProperty(k)) {
        props[k] = entry.props[k];
      }
    });
    var child = self._currentChild = new Writer(props);
    child.on("ready", function() {
      entry.pipe(child);
      entry.resume();
    });
    child.on("error", function(er) {
      if (child._swallowErrors) {
        self.warn(er);
        child.emit("end");
        child.emit("close");
      } else {
        self.emit("error", er);
      }
    });
    child.on("close", onend);
    var ended = false;
    function onend() {
      if (ended) return;
      ended = true;
      self._currentChild = null;
      self._processing = false;
      self._process();
    }
  };
  return dirWriter;
}
var linkWriter;
var hasRequiredLinkWriter;
function requireLinkWriter() {
  if (hasRequiredLinkWriter) return linkWriter;
  hasRequiredLinkWriter = 1;
  linkWriter = LinkWriter;
  var fs = requireGracefulFs();
  var Writer = requireWriter();
  var inherits = requireInherits();
  var path = require$$1;
  var rimraf = requireRimraf();
  inherits(LinkWriter, Writer);
  function LinkWriter(props) {
    var self = this;
    if (!(self instanceof LinkWriter)) {
      throw new Error("LinkWriter must be called as constructor.");
    }
    if (!(props.type === "Link" && props.Link || props.type === "SymbolicLink" && props.SymbolicLink)) {
      throw new Error("Non-link type " + props.type);
    }
    if (props.linkpath === "") props.linkpath = ".";
    if (!props.linkpath) {
      self.error("Need linkpath property to create " + props.type);
    }
    Writer.call(this, props);
  }
  LinkWriter.prototype._create = function() {
    var self = this;
    var hard = self.type === "Link" || process.platform === "win32";
    var link = hard ? "link" : "symlink";
    var lp = hard ? path.resolve(self.dirname, self.linkpath) : self.linkpath;
    if (hard) return clobber(self, lp, link);
    fs.readlink(self._path, function(er, p) {
      if (p && p === lp) return finish(self);
      clobber(self, lp, link);
    });
  };
  function clobber(self, lp, link) {
    rimraf(self._path, function(er) {
      if (er) return self.error(er);
      create(self, lp, link);
    });
  }
  function create(self, lp, link) {
    fs[link](lp, self._path, function(er) {
      if (er) {
        if ((er.code === "ENOENT" || er.code === "EACCES" || er.code === "EPERM") && process.platform === "win32") {
          self.ready = true;
          self.emit("ready");
          self.emit("end");
          self.emit("close");
          self.end = self._finish = function() {
          };
        } else return self.error(er);
      }
      finish(self);
    });
  }
  function finish(self) {
    self.ready = true;
    self.emit("ready");
    if (self._ended && !self._finished) self._finish();
  }
  LinkWriter.prototype.end = function() {
    this._ended = true;
    if (this.ready) {
      this._finished = true;
      this._finish();
    }
  };
  return linkWriter;
}
var fileWriter;
var hasRequiredFileWriter;
function requireFileWriter() {
  if (hasRequiredFileWriter) return fileWriter;
  hasRequiredFileWriter = 1;
  fileWriter = FileWriter;
  var fs = requireGracefulFs();
  var Writer = requireWriter();
  var inherits = requireInherits();
  var EOF = {};
  inherits(FileWriter, Writer);
  function FileWriter(props) {
    var self = this;
    if (!(self instanceof FileWriter)) {
      throw new Error("FileWriter must be called as constructor.");
    }
    if (props.type !== "File" || !props.File) {
      throw new Error("Non-file type " + props.type);
    }
    self._buffer = [];
    self._bytesWritten = 0;
    Writer.call(this, props);
  }
  FileWriter.prototype._create = function() {
    var self = this;
    if (self._stream) return;
    var so = {};
    if (self.props.flags) so.flags = self.props.flags;
    so.mode = Writer.filemode;
    if (self._old && self._old.blksize) so.bufferSize = self._old.blksize;
    self._stream = fs.createWriteStream(self._path, so);
    self._stream.on("open", function() {
      self.ready = true;
      self._buffer.forEach(function(c) {
        if (c === EOF) self._stream.end();
        else self._stream.write(c);
      });
      self.emit("ready");
      self.emit("drain");
    });
    self._stream.on("error", function(er) {
      self.emit("error", er);
    });
    self._stream.on("drain", function() {
      self.emit("drain");
    });
    self._stream.on("close", function() {
      self._finish();
    });
  };
  FileWriter.prototype.write = function(c) {
    var self = this;
    self._bytesWritten += c.length;
    if (!self.ready) {
      if (!Buffer.isBuffer(c) && typeof c !== "string") {
        throw new Error("invalid write data");
      }
      self._buffer.push(c);
      return false;
    }
    var ret = self._stream.write(c);
    if (ret === false && self._stream._queue) {
      return self._stream._queue.length <= 2;
    } else {
      return ret;
    }
  };
  FileWriter.prototype.end = function(c) {
    var self = this;
    if (c) self.write(c);
    if (!self.ready) {
      self._buffer.push(EOF);
      return false;
    }
    return self._stream.end();
  };
  FileWriter.prototype._finish = function() {
    var self = this;
    if (typeof self.size === "number" && self._bytesWritten !== self.size) {
      self.error(
        "Did not get expected byte count.\nexpect: " + self.size + "\nactual: " + self._bytesWritten
      );
    }
    Writer.prototype._finish.call(self);
  };
  return fileWriter;
}
var proxyWriter;
var hasRequiredProxyWriter;
function requireProxyWriter() {
  if (hasRequiredProxyWriter) return proxyWriter;
  hasRequiredProxyWriter = 1;
  proxyWriter = ProxyWriter;
  var Writer = requireWriter();
  var getType = requireGetType();
  var inherits = requireInherits();
  var collect = requireCollect();
  var fs = require$$0$1;
  inherits(ProxyWriter, Writer);
  function ProxyWriter(props) {
    var self = this;
    if (!(self instanceof ProxyWriter)) {
      throw new Error("ProxyWriter must be called as constructor.");
    }
    self.props = props;
    self._needDrain = false;
    Writer.call(self, props);
  }
  ProxyWriter.prototype._stat = function() {
    var self = this;
    var props = self.props;
    var stat = props.follow ? "stat" : "lstat";
    fs[stat](props.path, function(er, current) {
      var type;
      if (er || !current) {
        type = "File";
      } else {
        type = getType(current);
      }
      props[type] = true;
      props.type = self.type = type;
      self._old = current;
      self._addProxy(Writer(props, current));
    });
  };
  ProxyWriter.prototype._addProxy = function(proxy) {
    var self = this;
    if (self._proxy) {
      return self.error("proxy already set");
    }
    self._proxy = proxy;
    [
      "ready",
      "error",
      "close",
      "pipe",
      "drain",
      "warn"
    ].forEach(function(ev) {
      proxy.on(ev, self.emit.bind(self, ev));
    });
    self.emit("proxy", proxy);
    var calls = self._buffer;
    calls.forEach(function(c) {
      proxy[c[0]].apply(proxy, c[1]);
    });
    self._buffer.length = 0;
    if (self._needsDrain) self.emit("drain");
  };
  ProxyWriter.prototype.add = function(entry) {
    collect(entry);
    if (!this._proxy) {
      this._buffer.push(["add", [entry]]);
      this._needDrain = true;
      return false;
    }
    return this._proxy.add(entry);
  };
  ProxyWriter.prototype.write = function(c) {
    if (!this._proxy) {
      this._buffer.push(["write", [c]]);
      this._needDrain = true;
      return false;
    }
    return this._proxy.write(c);
  };
  ProxyWriter.prototype.end = function(c) {
    if (!this._proxy) {
      this._buffer.push(["end", [c]]);
      return false;
    }
    return this._proxy.end(c);
  };
  return proxyWriter;
}
var writer;
var hasRequiredWriter;
function requireWriter() {
  if (hasRequiredWriter) return writer;
  hasRequiredWriter = 1;
  writer = Writer;
  var fs = requireGracefulFs();
  var inherits = requireInherits();
  var rimraf = requireRimraf();
  var mkdir = requireSrc();
  var path = require$$1;
  var umask = process.platform === "win32" ? 0 : process.umask();
  var getType = requireGetType();
  var Abstract = requireAbstract();
  inherits(Writer, Abstract);
  Writer.dirmode = parseInt("0777", 8) & ~umask;
  Writer.filemode = parseInt("0666", 8) & ~umask;
  var DirWriter = requireDirWriter();
  var LinkWriter = requireLinkWriter();
  var FileWriter = requireFileWriter();
  var ProxyWriter = requireProxyWriter();
  function Writer(props, current) {
    var self = this;
    if (typeof props === "string") {
      props = { path: props };
    }
    var type = getType(props);
    var ClassType = Writer;
    switch (type) {
      case "Directory":
        ClassType = DirWriter;
        break;
      case "File":
        ClassType = FileWriter;
        break;
      case "Link":
      case "SymbolicLink":
        ClassType = LinkWriter;
        break;
      case null:
      default:
        ClassType = ProxyWriter;
        break;
    }
    if (!(self instanceof ClassType)) return new ClassType(props);
    Abstract.call(self);
    if (!props.path) self.error("Must provide a path", null, true);
    self.type = props.type;
    self.props = props;
    self.depth = props.depth || 0;
    self.clobber = props.clobber === false ? props.clobber : true;
    self.parent = props.parent || null;
    self.root = props.root || props.parent && props.parent.root || self;
    self._path = self.path = path.resolve(props.path);
    if (process.platform === "win32") {
      self.path = self._path = self.path.replace(/\?/g, "_");
      if (self._path.length >= 260) {
        self._swallowErrors = true;
        self._path = "\\\\?\\" + self.path.replace(/\//g, "\\");
      }
    }
    self.basename = path.basename(props.path);
    self.dirname = path.dirname(props.path);
    self.linkpath = props.linkpath || null;
    props.parent = props.root = null;
    self.size = props.size;
    if (typeof props.mode === "string") {
      props.mode = parseInt(props.mode, 8);
    }
    self.readable = false;
    self.writable = true;
    self._buffer = [];
    self.ready = false;
    self.filter = typeof props.filter === "function" ? props.filter : null;
    self._stat(current);
  }
  Writer.prototype._create = function() {
    var self = this;
    fs[self.props.follow ? "stat" : "lstat"](self._path, function(er) {
      if (er) {
        return self.warn("Cannot create " + self._path + "\nUnsupported type: " + self.type, "ENOTSUP");
      }
      self._finish();
    });
  };
  Writer.prototype._stat = function(current) {
    var self = this;
    var props = self.props;
    var stat = props.follow ? "stat" : "lstat";
    var who = self._proxy || self;
    if (current) statCb(null, current);
    else fs[stat](self._path, statCb);
    function statCb(er, current2) {
      if (self.filter && !self.filter.call(who, who, current2)) {
        self._aborted = true;
        self.emit("end");
        self.emit("close");
        return;
      }
      if (er || !current2) {
        return create(self);
      }
      self._old = current2;
      var currentType = getType(current2);
      if (currentType !== self.type || self.type === "File" && current2.nlink > 1) {
        return rimraf(self._path, function(er2) {
          if (er2) return self.error(er2);
          self._old = null;
          create(self);
        });
      }
      create(self);
    }
  };
  function create(self) {
    mkdir(path.dirname(self._path), Writer.dirmode, function(er, made) {
      if (er) return self.error(er);
      self._madeDir = made;
      return self._create();
    });
  }
  function endChmod(self, want, current, path2, cb) {
    var wantMode = want.mode;
    var chmod = want.follow || self.type !== "SymbolicLink" ? "chmod" : "lchmod";
    if (!fs[chmod]) return cb();
    if (typeof wantMode !== "number") return cb();
    var curMode = current.mode & parseInt("0777", 8);
    wantMode = wantMode & parseInt("0777", 8);
    if (wantMode === curMode) return cb();
    fs[chmod](path2, wantMode, cb);
  }
  function endChown(self, want, current, path2, cb) {
    if (process.platform === "win32") return cb();
    if (!process.getuid || process.getuid() !== 0) return cb();
    if (typeof want.uid !== "number" && typeof want.gid !== "number") return cb();
    if (current.uid === want.uid && current.gid === want.gid) return cb();
    var chown = self.props.follow || self.type !== "SymbolicLink" ? "chown" : "lchown";
    if (!fs[chown]) return cb();
    if (typeof want.uid !== "number") want.uid = current.uid;
    if (typeof want.gid !== "number") want.gid = current.gid;
    fs[chown](path2, want.uid, want.gid, cb);
  }
  function endUtimes(self, want, current, path2, cb) {
    if (!fs.utimes || process.platform === "win32") return cb();
    var utimes = want.follow || self.type !== "SymbolicLink" ? "utimes" : "lutimes";
    if (utimes === "lutimes" && !fs[utimes]) {
      utimes = "utimes";
    }
    if (!fs[utimes]) return cb();
    var curA = current.atime;
    var curM = current.mtime;
    var meA = want.atime;
    var meM = want.mtime;
    if (meA === void 0) meA = curA;
    if (meM === void 0) meM = curM;
    if (!isDate(meA)) meA = new Date(meA);
    if (!isDate(meM)) meA = new Date(meM);
    if (meA.getTime() === curA.getTime() && meM.getTime() === curM.getTime()) return cb();
    fs[utimes](path2, meA, meM, cb);
  }
  Writer.prototype._finish = function() {
    var self = this;
    if (self._finishing) return;
    self._finishing = true;
    var todo = 0;
    var errState = null;
    var done = false;
    if (self._old) {
      self._old.atime = /* @__PURE__ */ new Date(0);
      self._old.mtime = /* @__PURE__ */ new Date(0);
      setProps(self._old);
    } else {
      var stat = self.props.follow ? "stat" : "lstat";
      fs[stat](self._path, function(er, current) {
        if (er) {
          if (er.code === "ENOENT" && (self.type === "Link" || self.type === "SymbolicLink") && process.platform === "win32") {
            self.ready = true;
            self.emit("ready");
            self.emit("end");
            self.emit("close");
            self.end = self._finish = function() {
            };
            return;
          } else return self.error(er);
        }
        setProps(self._old = current);
      });
    }
    return;
    function setProps(current) {
      todo += 3;
      endChmod(self, self.props, current, self._path, next("chmod"));
      endChown(self, self.props, current, self._path, next("chown"));
      endUtimes(self, self.props, current, self._path, next("utimes"));
    }
    function next(what) {
      return function(er) {
        if (errState) return;
        if (er) {
          er.fstream_finish_call = what;
          return self.error(errState = er);
        }
        if (--todo > 0) return;
        if (done) return;
        done = true;
        if (!self._madeDir) return end();
        else endMadeDir(self, self._path, end);
        function end(er2) {
          if (er2) {
            er2.fstream_finish_call = "setupMadeDir";
            return self.error(er2);
          }
          self.emit("end");
          self.emit("close");
        }
      };
    }
  };
  function endMadeDir(self, p, cb) {
    var made = self._madeDir;
    var d = path.dirname(p);
    endMadeDir_(self, d, function(er) {
      if (er) return cb(er);
      if (d === made) {
        return cb();
      }
      endMadeDir(self, d, cb);
    });
  }
  function endMadeDir_(self, p, cb) {
    var dirProps = {};
    Object.keys(self.props).forEach(function(k) {
      dirProps[k] = self.props[k];
      if (k === "mode" && self.type !== "Directory") {
        dirProps[k] = dirProps[k] | parseInt("0111", 8);
      }
    });
    var todo = 3;
    var errState = null;
    fs.stat(p, function(er, current) {
      if (er) return cb(errState = er);
      endChmod(self, dirProps, current, p, next);
      endChown(self, dirProps, current, p, next);
      endUtimes(self, dirProps, current, p, next);
    });
    function next(er) {
      if (errState) return;
      if (er) return cb(errState = er);
      if (--todo === 0) return cb();
    }
  }
  Writer.prototype.pipe = function() {
    this.error("Can't pipe from writable stream");
  };
  Writer.prototype.add = function() {
    this.error("Can't add to non-Directory type");
  };
  Writer.prototype.write = function() {
    return true;
  };
  function objectToString(d) {
    return Object.prototype.toString.call(d);
  }
  function isDate(d) {
    return typeof d === "object" && objectToString(d) === "[object Date]";
  }
  return writer;
}
var hasRequiredFstream;
function requireFstream() {
  if (hasRequiredFstream) return fstream;
  hasRequiredFstream = 1;
  (function(exports) {
    exports.Abstract = requireAbstract();
    exports.Reader = requireReader();
    exports.Writer = requireWriter();
    exports.File = {
      Reader: requireFileReader(),
      Writer: requireFileWriter()
    };
    exports.Dir = {
      Reader: requireDirReader(),
      Writer: requireDirWriter()
    };
    exports.Link = {
      Reader: requireLinkReader(),
      Writer: requireLinkWriter()
    };
    exports.Proxy = {
      Reader: requireProxyReader(),
      Writer: requireProxyWriter()
    };
    exports.Reader.Dir = exports.DirReader = exports.Dir.Reader;
    exports.Reader.File = exports.FileReader = exports.File.Reader;
    exports.Reader.Link = exports.LinkReader = exports.Link.Reader;
    exports.Reader.Proxy = exports.ProxyReader = exports.Proxy.Reader;
    exports.Writer.Dir = exports.DirWriter = exports.Dir.Writer;
    exports.Writer.File = exports.FileWriter = exports.File.Writer;
    exports.Writer.Link = exports.LinkWriter = exports.Link.Writer;
    exports.Writer.Proxy = exports.ProxyWriter = exports.Proxy.Writer;
    exports.collect = requireCollect();
  })(fstream);
  return fstream;
}
export {
  requireFstream as r
};
