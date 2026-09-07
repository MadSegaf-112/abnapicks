import require$$0 from "util";
import { r as requireBl } from "./bl.mjs";
import { r as requireReadable } from "./readable-stream.mjs";
import { r as requireFsConstants } from "./fs-constants.mjs";
import { r as requireEndOfStream } from "./end-of-stream.mjs";
import { r as requireInherits } from "./inherits.mjs";
import require$$0$1 from "string_decoder";
var tarStream = {};
var headers = {};
var hasRequiredHeaders;
function requireHeaders() {
  if (hasRequiredHeaders) return headers;
  hasRequiredHeaders = 1;
  var alloc = Buffer.alloc;
  var ZEROS = "0000000000000000000";
  var SEVENS = "7777777777777777777";
  var ZERO_OFFSET = "0".charCodeAt(0);
  var USTAR_MAGIC = Buffer.from("ustar\0", "binary");
  var USTAR_VER = Buffer.from("00", "binary");
  var GNU_MAGIC = Buffer.from("ustar ", "binary");
  var GNU_VER = Buffer.from(" \0", "binary");
  var MASK = parseInt("7777", 8);
  var MAGIC_OFFSET = 257;
  var VERSION_OFFSET = 263;
  var clamp = function(index, len, defaultValue) {
    if (typeof index !== "number") return defaultValue;
    index = ~~index;
    if (index >= len) return len;
    if (index >= 0) return index;
    index += len;
    if (index >= 0) return index;
    return 0;
  };
  var toType = function(flag) {
    switch (flag) {
      case 0:
        return "file";
      case 1:
        return "link";
      case 2:
        return "symlink";
      case 3:
        return "character-device";
      case 4:
        return "block-device";
      case 5:
        return "directory";
      case 6:
        return "fifo";
      case 7:
        return "contiguous-file";
      case 72:
        return "pax-header";
      case 55:
        return "pax-global-header";
      case 27:
        return "gnu-long-link-path";
      case 28:
      case 30:
        return "gnu-long-path";
    }
    return null;
  };
  var toTypeflag = function(flag) {
    switch (flag) {
      case "file":
        return 0;
      case "link":
        return 1;
      case "symlink":
        return 2;
      case "character-device":
        return 3;
      case "block-device":
        return 4;
      case "directory":
        return 5;
      case "fifo":
        return 6;
      case "contiguous-file":
        return 7;
      case "pax-header":
        return 72;
    }
    return 0;
  };
  var indexOf = function(block, num, offset, end) {
    for (; offset < end; offset++) {
      if (block[offset] === num) return offset;
    }
    return end;
  };
  var cksum = function(block) {
    var sum = 8 * 32;
    for (var i = 0; i < 148; i++) sum += block[i];
    for (var j = 156; j < 512; j++) sum += block[j];
    return sum;
  };
  var encodeOct = function(val, n) {
    val = val.toString(8);
    if (val.length > n) return SEVENS.slice(0, n) + " ";
    else return ZEROS.slice(0, n - val.length) + val + " ";
  };
  function parse256(buf) {
    var positive;
    if (buf[0] === 128) positive = true;
    else if (buf[0] === 255) positive = false;
    else return null;
    var tuple = [];
    for (var i = buf.length - 1; i > 0; i--) {
      var byte = buf[i];
      if (positive) tuple.push(byte);
      else tuple.push(255 - byte);
    }
    var sum = 0;
    var l = tuple.length;
    for (i = 0; i < l; i++) {
      sum += tuple[i] * Math.pow(256, i);
    }
    return positive ? sum : -1 * sum;
  }
  var decodeOct = function(val, offset, length) {
    val = val.slice(offset, offset + length);
    offset = 0;
    if (val[offset] & 128) {
      return parse256(val);
    } else {
      while (offset < val.length && val[offset] === 32) offset++;
      var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
      while (offset < end && val[offset] === 0) offset++;
      if (end === offset) return 0;
      return parseInt(val.slice(offset, end).toString(), 8);
    }
  };
  var decodeStr = function(val, offset, length, encoding) {
    return val.slice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding);
  };
  var addLength = function(str) {
    var len = Buffer.byteLength(str);
    var digits = Math.floor(Math.log(len) / Math.log(10)) + 1;
    if (len + digits >= Math.pow(10, digits)) digits++;
    return len + digits + str;
  };
  headers.decodeLongPath = function(buf, encoding) {
    return decodeStr(buf, 0, buf.length, encoding);
  };
  headers.encodePax = function(opts) {
    var result = "";
    if (opts.name) result += addLength(" path=" + opts.name + "\n");
    if (opts.linkname) result += addLength(" linkpath=" + opts.linkname + "\n");
    var pax = opts.pax;
    if (pax) {
      for (var key in pax) {
        result += addLength(" " + key + "=" + pax[key] + "\n");
      }
    }
    return Buffer.from(result);
  };
  headers.decodePax = function(buf) {
    var result = {};
    while (buf.length) {
      var i = 0;
      while (i < buf.length && buf[i] !== 32) i++;
      var len = parseInt(buf.slice(0, i).toString(), 10);
      if (!len) return result;
      var b = buf.slice(i + 1, len - 1).toString();
      var keyIndex = b.indexOf("=");
      if (keyIndex === -1) return result;
      result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1);
      buf = buf.slice(len);
    }
    return result;
  };
  headers.encode = function(opts) {
    var buf = alloc(512);
    var name = opts.name;
    var prefix = "";
    if (opts.typeflag === 5 && name[name.length - 1] !== "/") name += "/";
    if (Buffer.byteLength(name) !== name.length) return null;
    while (Buffer.byteLength(name) > 100) {
      var i = name.indexOf("/");
      if (i === -1) return null;
      prefix += prefix ? "/" + name.slice(0, i) : name.slice(0, i);
      name = name.slice(i + 1);
    }
    if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) return null;
    if (opts.linkname && Buffer.byteLength(opts.linkname) > 100) return null;
    buf.write(name);
    buf.write(encodeOct(opts.mode & MASK, 6), 100);
    buf.write(encodeOct(opts.uid, 6), 108);
    buf.write(encodeOct(opts.gid, 6), 116);
    buf.write(encodeOct(opts.size, 11), 124);
    buf.write(encodeOct(opts.mtime.getTime() / 1e3 | 0, 11), 136);
    buf[156] = ZERO_OFFSET + toTypeflag(opts.type);
    if (opts.linkname) buf.write(opts.linkname, 157);
    USTAR_MAGIC.copy(buf, MAGIC_OFFSET);
    USTAR_VER.copy(buf, VERSION_OFFSET);
    if (opts.uname) buf.write(opts.uname, 265);
    if (opts.gname) buf.write(opts.gname, 297);
    buf.write(encodeOct(opts.devmajor || 0, 6), 329);
    buf.write(encodeOct(opts.devminor || 0, 6), 337);
    if (prefix) buf.write(prefix, 345);
    buf.write(encodeOct(cksum(buf), 6), 148);
    return buf;
  };
  headers.decode = function(buf, filenameEncoding, allowUnknownFormat) {
    var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;
    var name = decodeStr(buf, 0, 100, filenameEncoding);
    var mode = decodeOct(buf, 100, 8);
    var uid = decodeOct(buf, 108, 8);
    var gid = decodeOct(buf, 116, 8);
    var size = decodeOct(buf, 124, 12);
    var mtime = decodeOct(buf, 136, 12);
    var type = toType(typeflag);
    var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
    var uname = decodeStr(buf, 265, 32);
    var gname = decodeStr(buf, 297, 32);
    var devmajor = decodeOct(buf, 329, 8);
    var devminor = decodeOct(buf, 337, 8);
    var c = cksum(buf);
    if (c === 8 * 32) return null;
    if (c !== decodeOct(buf, 148, 8)) throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
    if (USTAR_MAGIC.compare(buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0) {
      if (buf[345]) name = decodeStr(buf, 345, 155, filenameEncoding) + "/" + name;
    } else if (GNU_MAGIC.compare(buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0 && GNU_VER.compare(buf, VERSION_OFFSET, VERSION_OFFSET + 2) === 0) ;
    else {
      if (!allowUnknownFormat) {
        throw new Error("Invalid tar header: unknown format.");
      }
    }
    if (typeflag === 0 && name && name[name.length - 1] === "/") typeflag = 5;
    return {
      name,
      mode,
      uid,
      gid,
      size,
      mtime: new Date(1e3 * mtime),
      type,
      linkname,
      uname,
      gname,
      devmajor,
      devminor
    };
  };
  return headers;
}
var extract;
var hasRequiredExtract;
function requireExtract() {
  if (hasRequiredExtract) return extract;
  hasRequiredExtract = 1;
  var util = require$$0;
  var bl = requireBl();
  var headers2 = requireHeaders();
  var Writable = requireReadable().Writable;
  var PassThrough = requireReadable().PassThrough;
  var noop = function() {
  };
  var overflow = function(size) {
    size &= 511;
    return size && 512 - size;
  };
  var emptyStream = function(self, offset) {
    var s = new Source(self, offset);
    s.end();
    return s;
  };
  var mixinPax = function(header, pax) {
    if (pax.path) header.name = pax.path;
    if (pax.linkpath) header.linkname = pax.linkpath;
    if (pax.size) header.size = parseInt(pax.size, 10);
    header.pax = pax;
    return header;
  };
  var Source = function(self, offset) {
    this._parent = self;
    this.offset = offset;
    PassThrough.call(this, { autoDestroy: false });
  };
  util.inherits(Source, PassThrough);
  Source.prototype.destroy = function(err) {
    this._parent.destroy(err);
  };
  var Extract = function(opts) {
    if (!(this instanceof Extract)) return new Extract(opts);
    Writable.call(this, opts);
    opts = opts || {};
    this._offset = 0;
    this._buffer = bl();
    this._missing = 0;
    this._partial = false;
    this._onparse = noop;
    this._header = null;
    this._stream = null;
    this._overflow = null;
    this._cb = null;
    this._locked = false;
    this._destroyed = false;
    this._pax = null;
    this._paxGlobal = null;
    this._gnuLongPath = null;
    this._gnuLongLinkPath = null;
    var self = this;
    var b = self._buffer;
    var oncontinue = function() {
      self._continue();
    };
    var onunlock = function(err) {
      self._locked = false;
      if (err) return self.destroy(err);
      if (!self._stream) oncontinue();
    };
    var onstreamend = function() {
      self._stream = null;
      var drain = overflow(self._header.size);
      if (drain) self._parse(drain, ondrain);
      else self._parse(512, onheader);
      if (!self._locked) oncontinue();
    };
    var ondrain = function() {
      self._buffer.consume(overflow(self._header.size));
      self._parse(512, onheader);
      oncontinue();
    };
    var onpaxglobalheader = function() {
      var size = self._header.size;
      self._paxGlobal = headers2.decodePax(b.slice(0, size));
      b.consume(size);
      onstreamend();
    };
    var onpaxheader = function() {
      var size = self._header.size;
      self._pax = headers2.decodePax(b.slice(0, size));
      if (self._paxGlobal) self._pax = Object.assign({}, self._paxGlobal, self._pax);
      b.consume(size);
      onstreamend();
    };
    var ongnulongpath = function() {
      var size = self._header.size;
      this._gnuLongPath = headers2.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
      b.consume(size);
      onstreamend();
    };
    var ongnulonglinkpath = function() {
      var size = self._header.size;
      this._gnuLongLinkPath = headers2.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
      b.consume(size);
      onstreamend();
    };
    var onheader = function() {
      var offset = self._offset;
      var header;
      try {
        header = self._header = headers2.decode(b.slice(0, 512), opts.filenameEncoding, opts.allowUnknownFormat);
      } catch (err) {
        self.emit("error", err);
      }
      b.consume(512);
      if (!header) {
        self._parse(512, onheader);
        oncontinue();
        return;
      }
      if (header.type === "gnu-long-path") {
        self._parse(header.size, ongnulongpath);
        oncontinue();
        return;
      }
      if (header.type === "gnu-long-link-path") {
        self._parse(header.size, ongnulonglinkpath);
        oncontinue();
        return;
      }
      if (header.type === "pax-global-header") {
        self._parse(header.size, onpaxglobalheader);
        oncontinue();
        return;
      }
      if (header.type === "pax-header") {
        self._parse(header.size, onpaxheader);
        oncontinue();
        return;
      }
      if (self._gnuLongPath) {
        header.name = self._gnuLongPath;
        self._gnuLongPath = null;
      }
      if (self._gnuLongLinkPath) {
        header.linkname = self._gnuLongLinkPath;
        self._gnuLongLinkPath = null;
      }
      if (self._pax) {
        self._header = header = mixinPax(header, self._pax);
        self._pax = null;
      }
      self._locked = true;
      if (!header.size || header.type === "directory") {
        self._parse(512, onheader);
        self.emit("entry", header, emptyStream(self, offset), onunlock);
        return;
      }
      self._stream = new Source(self, offset);
      self.emit("entry", header, self._stream, onunlock);
      self._parse(header.size, onstreamend);
      oncontinue();
    };
    this._onheader = onheader;
    this._parse(512, onheader);
  };
  util.inherits(Extract, Writable);
  Extract.prototype.destroy = function(err) {
    if (this._destroyed) return;
    this._destroyed = true;
    if (err) this.emit("error", err);
    this.emit("close");
    if (this._stream) this._stream.emit("close");
  };
  Extract.prototype._parse = function(size, onparse) {
    if (this._destroyed) return;
    this._offset += size;
    this._missing = size;
    if (onparse === this._onheader) this._partial = false;
    this._onparse = onparse;
  };
  Extract.prototype._continue = function() {
    if (this._destroyed) return;
    var cb = this._cb;
    this._cb = noop;
    if (this._overflow) this._write(this._overflow, void 0, cb);
    else cb();
  };
  Extract.prototype._write = function(data, enc, cb) {
    if (this._destroyed) return;
    var s = this._stream;
    var b = this._buffer;
    var missing = this._missing;
    if (data.length) this._partial = true;
    if (data.length < missing) {
      this._missing -= data.length;
      this._overflow = null;
      if (s) return s.write(data, cb);
      b.append(data);
      return cb();
    }
    this._cb = cb;
    this._missing = 0;
    var overflow2 = null;
    if (data.length > missing) {
      overflow2 = data.slice(missing);
      data = data.slice(0, missing);
    }
    if (s) s.end(data);
    else b.append(data);
    this._overflow = overflow2;
    this._onparse();
  };
  Extract.prototype._final = function(cb) {
    if (this._partial) return this.destroy(new Error("Unexpected end of data"));
    cb();
  };
  extract = Extract;
  return extract;
}
var pack;
var hasRequiredPack;
function requirePack() {
  if (hasRequiredPack) return pack;
  hasRequiredPack = 1;
  var constants = requireFsConstants();
  var eos = requireEndOfStream();
  var inherits = requireInherits();
  var alloc = Buffer.alloc;
  var Readable = requireReadable().Readable;
  var Writable = requireReadable().Writable;
  var StringDecoder = require$$0$1.StringDecoder;
  var headers2 = requireHeaders();
  var DMODE = parseInt("755", 8);
  var FMODE = parseInt("644", 8);
  var END_OF_TAR = alloc(1024);
  var noop = function() {
  };
  var overflow = function(self, size) {
    size &= 511;
    if (size) self.push(END_OF_TAR.slice(0, 512 - size));
  };
  function modeToType(mode) {
    switch (mode & constants.S_IFMT) {
      case constants.S_IFBLK:
        return "block-device";
      case constants.S_IFCHR:
        return "character-device";
      case constants.S_IFDIR:
        return "directory";
      case constants.S_IFIFO:
        return "fifo";
      case constants.S_IFLNK:
        return "symlink";
    }
    return "file";
  }
  var Sink = function(to) {
    Writable.call(this);
    this.written = 0;
    this._to = to;
    this._destroyed = false;
  };
  inherits(Sink, Writable);
  Sink.prototype._write = function(data, enc, cb) {
    this.written += data.length;
    if (this._to.push(data)) return cb();
    this._to._drain = cb;
  };
  Sink.prototype.destroy = function() {
    if (this._destroyed) return;
    this._destroyed = true;
    this.emit("close");
  };
  var LinkSink = function() {
    Writable.call(this);
    this.linkname = "";
    this._decoder = new StringDecoder("utf-8");
    this._destroyed = false;
  };
  inherits(LinkSink, Writable);
  LinkSink.prototype._write = function(data, enc, cb) {
    this.linkname += this._decoder.write(data);
    cb();
  };
  LinkSink.prototype.destroy = function() {
    if (this._destroyed) return;
    this._destroyed = true;
    this.emit("close");
  };
  var Void = function() {
    Writable.call(this);
    this._destroyed = false;
  };
  inherits(Void, Writable);
  Void.prototype._write = function(data, enc, cb) {
    cb(new Error("No body allowed for this entry"));
  };
  Void.prototype.destroy = function() {
    if (this._destroyed) return;
    this._destroyed = true;
    this.emit("close");
  };
  var Pack = function(opts) {
    if (!(this instanceof Pack)) return new Pack(opts);
    Readable.call(this, opts);
    this._drain = noop;
    this._finalized = false;
    this._finalizing = false;
    this._destroyed = false;
    this._stream = null;
  };
  inherits(Pack, Readable);
  Pack.prototype.entry = function(header, buffer, callback) {
    if (this._stream) throw new Error("already piping an entry");
    if (this._finalized || this._destroyed) return;
    if (typeof buffer === "function") {
      callback = buffer;
      buffer = null;
    }
    if (!callback) callback = noop;
    var self = this;
    if (!header.size || header.type === "symlink") header.size = 0;
    if (!header.type) header.type = modeToType(header.mode);
    if (!header.mode) header.mode = header.type === "directory" ? DMODE : FMODE;
    if (!header.uid) header.uid = 0;
    if (!header.gid) header.gid = 0;
    if (!header.mtime) header.mtime = /* @__PURE__ */ new Date();
    if (typeof buffer === "string") buffer = Buffer.from(buffer);
    if (Buffer.isBuffer(buffer)) {
      header.size = buffer.length;
      this._encode(header);
      var ok = this.push(buffer);
      overflow(self, header.size);
      if (ok) process.nextTick(callback);
      else this._drain = callback;
      return new Void();
    }
    if (header.type === "symlink" && !header.linkname) {
      var linkSink = new LinkSink();
      eos(linkSink, function(err) {
        if (err) {
          self.destroy();
          return callback(err);
        }
        header.linkname = linkSink.linkname;
        self._encode(header);
        callback();
      });
      return linkSink;
    }
    this._encode(header);
    if (header.type !== "file" && header.type !== "contiguous-file") {
      process.nextTick(callback);
      return new Void();
    }
    var sink = new Sink(this);
    this._stream = sink;
    eos(sink, function(err) {
      self._stream = null;
      if (err) {
        self.destroy();
        return callback(err);
      }
      if (sink.written !== header.size) {
        self.destroy();
        return callback(new Error("size mismatch"));
      }
      overflow(self, header.size);
      if (self._finalizing) self.finalize();
      callback();
    });
    return sink;
  };
  Pack.prototype.finalize = function() {
    if (this._stream) {
      this._finalizing = true;
      return;
    }
    if (this._finalized) return;
    this._finalized = true;
    this.push(END_OF_TAR);
    this.push(null);
  };
  Pack.prototype.destroy = function(err) {
    if (this._destroyed) return;
    this._destroyed = true;
    if (err) this.emit("error", err);
    this.emit("close");
    if (this._stream && this._stream.destroy) this._stream.destroy();
  };
  Pack.prototype._encode = function(header) {
    if (!header.pax) {
      var buf = headers2.encode(header);
      if (buf) {
        this.push(buf);
        return;
      }
    }
    this._encodePax(header);
  };
  Pack.prototype._encodePax = function(header) {
    var paxHeader = headers2.encodePax({
      name: header.name,
      linkname: header.linkname,
      pax: header.pax
    });
    var newHeader = {
      name: "PaxHeader",
      mode: header.mode,
      uid: header.uid,
      gid: header.gid,
      size: paxHeader.length,
      mtime: header.mtime,
      type: "pax-header",
      linkname: header.linkname && "PaxHeader",
      uname: header.uname,
      gname: header.gname,
      devmajor: header.devmajor,
      devminor: header.devminor
    };
    this.push(headers2.encode(newHeader));
    this.push(paxHeader);
    overflow(this, paxHeader.length);
    newHeader.size = header.size;
    newHeader.type = header.type;
    this.push(headers2.encode(newHeader));
  };
  Pack.prototype._read = function(n) {
    var drain = this._drain;
    this._drain = noop;
    drain();
  };
  pack = Pack;
  return pack;
}
var hasRequiredTarStream;
function requireTarStream() {
  if (hasRequiredTarStream) return tarStream;
  hasRequiredTarStream = 1;
  tarStream.extract = requireExtract();
  tarStream.pack = requirePack();
  return tarStream;
}
export {
  requireTarStream as r
};
