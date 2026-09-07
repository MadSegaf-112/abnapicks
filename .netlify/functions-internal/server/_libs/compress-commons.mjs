import require$$0 from "util";
import { r as requireNormalizePath } from "./normalize-path.mjs";
import { r as requireReadable } from "./readable-stream.mjs";
import require$$0$1 from "stream";
import { r as requireBufferCrc32 } from "./buffer-crc32.mjs";
import { r as requireLib } from "./crc32-stream.mjs";
var archiveEntry = { exports: {} };
var hasRequiredArchiveEntry;
function requireArchiveEntry() {
  if (hasRequiredArchiveEntry) return archiveEntry.exports;
  hasRequiredArchiveEntry = 1;
  var ArchiveEntry = archiveEntry.exports = function() {
  };
  ArchiveEntry.prototype.getName = function() {
  };
  ArchiveEntry.prototype.getSize = function() {
  };
  ArchiveEntry.prototype.getLastModifiedDate = function() {
  };
  ArchiveEntry.prototype.isDirectory = function() {
  };
  return archiveEntry.exports;
}
var zipArchiveEntry = { exports: {} };
var generalPurposeBit = { exports: {} };
var util$1 = { exports: {} };
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1) return util$1.exports;
  hasRequiredUtil$1 = 1;
  var util2 = util$1.exports = {};
  util2.dateToDos = function(d, forceLocalTime) {
    forceLocalTime = forceLocalTime || false;
    var year = forceLocalTime ? d.getFullYear() : d.getUTCFullYear();
    if (year < 1980) {
      return 2162688;
    } else if (year >= 2044) {
      return 2141175677;
    }
    var val = {
      year,
      month: forceLocalTime ? d.getMonth() : d.getUTCMonth(),
      date: forceLocalTime ? d.getDate() : d.getUTCDate(),
      hours: forceLocalTime ? d.getHours() : d.getUTCHours(),
      minutes: forceLocalTime ? d.getMinutes() : d.getUTCMinutes(),
      seconds: forceLocalTime ? d.getSeconds() : d.getUTCSeconds()
    };
    return val.year - 1980 << 25 | val.month + 1 << 21 | val.date << 16 | val.hours << 11 | val.minutes << 5 | val.seconds / 2;
  };
  util2.dosToDate = function(dos) {
    return new Date((dos >> 25 & 127) + 1980, (dos >> 21 & 15) - 1, dos >> 16 & 31, dos >> 11 & 31, dos >> 5 & 63, (dos & 31) << 1);
  };
  util2.fromDosTime = function(buf) {
    return util2.dosToDate(buf.readUInt32LE(0));
  };
  util2.getEightBytes = function(v) {
    var buf = Buffer.alloc(8);
    buf.writeUInt32LE(v % 4294967296, 0);
    buf.writeUInt32LE(v / 4294967296 | 0, 4);
    return buf;
  };
  util2.getShortBytes = function(v) {
    var buf = Buffer.alloc(2);
    buf.writeUInt16LE((v & 65535) >>> 0, 0);
    return buf;
  };
  util2.getShortBytesValue = function(buf, offset) {
    return buf.readUInt16LE(offset);
  };
  util2.getLongBytes = function(v) {
    var buf = Buffer.alloc(4);
    buf.writeUInt32LE((v & 4294967295) >>> 0, 0);
    return buf;
  };
  util2.getLongBytesValue = function(buf, offset) {
    return buf.readUInt32LE(offset);
  };
  util2.toDosTime = function(d) {
    return util2.getLongBytes(util2.dateToDos(d));
  };
  return util$1.exports;
}
var hasRequiredGeneralPurposeBit;
function requireGeneralPurposeBit() {
  if (hasRequiredGeneralPurposeBit) return generalPurposeBit.exports;
  hasRequiredGeneralPurposeBit = 1;
  var zipUtil = requireUtil$1();
  var DATA_DESCRIPTOR_FLAG = 1 << 3;
  var ENCRYPTION_FLAG = 1 << 0;
  var NUMBER_OF_SHANNON_FANO_TREES_FLAG = 1 << 2;
  var SLIDING_DICTIONARY_SIZE_FLAG = 1 << 1;
  var STRONG_ENCRYPTION_FLAG = 1 << 6;
  var UFT8_NAMES_FLAG = 1 << 11;
  var GeneralPurposeBit = generalPurposeBit.exports = function() {
    if (!(this instanceof GeneralPurposeBit)) {
      return new GeneralPurposeBit();
    }
    this.descriptor = false;
    this.encryption = false;
    this.utf8 = false;
    this.numberOfShannonFanoTrees = 0;
    this.strongEncryption = false;
    this.slidingDictionarySize = 0;
    return this;
  };
  GeneralPurposeBit.prototype.encode = function() {
    return zipUtil.getShortBytes(
      (this.descriptor ? DATA_DESCRIPTOR_FLAG : 0) | (this.utf8 ? UFT8_NAMES_FLAG : 0) | (this.encryption ? ENCRYPTION_FLAG : 0) | (this.strongEncryption ? STRONG_ENCRYPTION_FLAG : 0)
    );
  };
  GeneralPurposeBit.prototype.parse = function(buf, offset) {
    var flag = zipUtil.getShortBytesValue(buf, offset);
    var gbp = new GeneralPurposeBit();
    gbp.useDataDescriptor((flag & DATA_DESCRIPTOR_FLAG) !== 0);
    gbp.useUTF8ForNames((flag & UFT8_NAMES_FLAG) !== 0);
    gbp.useStrongEncryption((flag & STRONG_ENCRYPTION_FLAG) !== 0);
    gbp.useEncryption((flag & ENCRYPTION_FLAG) !== 0);
    gbp.setSlidingDictionarySize((flag & SLIDING_DICTIONARY_SIZE_FLAG) !== 0 ? 8192 : 4096);
    gbp.setNumberOfShannonFanoTrees((flag & NUMBER_OF_SHANNON_FANO_TREES_FLAG) !== 0 ? 3 : 2);
    return gbp;
  };
  GeneralPurposeBit.prototype.setNumberOfShannonFanoTrees = function(n) {
    this.numberOfShannonFanoTrees = n;
  };
  GeneralPurposeBit.prototype.getNumberOfShannonFanoTrees = function() {
    return this.numberOfShannonFanoTrees;
  };
  GeneralPurposeBit.prototype.setSlidingDictionarySize = function(n) {
    this.slidingDictionarySize = n;
  };
  GeneralPurposeBit.prototype.getSlidingDictionarySize = function() {
    return this.slidingDictionarySize;
  };
  GeneralPurposeBit.prototype.useDataDescriptor = function(b) {
    this.descriptor = b;
  };
  GeneralPurposeBit.prototype.usesDataDescriptor = function() {
    return this.descriptor;
  };
  GeneralPurposeBit.prototype.useEncryption = function(b) {
    this.encryption = b;
  };
  GeneralPurposeBit.prototype.usesEncryption = function() {
    return this.encryption;
  };
  GeneralPurposeBit.prototype.useStrongEncryption = function(b) {
    this.strongEncryption = b;
  };
  GeneralPurposeBit.prototype.usesStrongEncryption = function() {
    return this.strongEncryption;
  };
  GeneralPurposeBit.prototype.useUTF8ForNames = function(b) {
    this.utf8 = b;
  };
  GeneralPurposeBit.prototype.usesUTF8ForNames = function() {
    return this.utf8;
  };
  return generalPurposeBit.exports;
}
var unixStat;
var hasRequiredUnixStat;
function requireUnixStat() {
  if (hasRequiredUnixStat) return unixStat;
  hasRequiredUnixStat = 1;
  unixStat = {
    /**
     * Bits used for permissions (and sticky bit)
     */
    PERM_MASK: 4095,
    // 07777
    /**
     * Bits used to indicate the filesystem object type.
     */
    FILE_TYPE_FLAG: 61440,
    // 0170000
    /**
     * Indicates symbolic links.
     */
    LINK_FLAG: 40960,
    // 0120000
    /**
     * Indicates plain files.
     */
    FILE_FLAG: 32768,
    // 0100000
    /**
     * Indicates directories.
     */
    DIR_FLAG: 16384,
    // 040000
    // ----------------------------------------------------------
    // somewhat arbitrary choices that are quite common for shared
    // installations
    // -----------------------------------------------------------
    /**
     * Default permissions for symbolic links.
     */
    DEFAULT_LINK_PERM: 511,
    // 0777
    /**
     * Default permissions for directories.
     */
    DEFAULT_DIR_PERM: 493,
    // 0755
    /**
     * Default permissions for plain files.
     */
    DEFAULT_FILE_PERM: 420
    // 0644
  };
  return unixStat;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  constants = {
    WORD: 4,
    DWORD: 8,
    EMPTY: Buffer.alloc(0),
    SHORT: 2,
    SHORT_MASK: 65535,
    SHORT_SHIFT: 16,
    SHORT_ZERO: Buffer.from(Array(2)),
    LONG: 4,
    LONG_ZERO: Buffer.from(Array(4)),
    MIN_VERSION_INITIAL: 10,
    MIN_VERSION_DATA_DESCRIPTOR: 20,
    MIN_VERSION_ZIP64: 45,
    VERSION_MADEBY: 45,
    METHOD_STORED: 0,
    METHOD_DEFLATED: 8,
    PLATFORM_UNIX: 3,
    PLATFORM_FAT: 0,
    SIG_LFH: 67324752,
    SIG_DD: 134695760,
    SIG_CFH: 33639248,
    SIG_EOCD: 101010256,
    SIG_ZIP64_EOCD: 101075792,
    SIG_ZIP64_EOCD_LOC: 117853008,
    ZIP64_MAGIC_SHORT: 65535,
    ZIP64_MAGIC: 4294967295,
    ZIP64_EXTRA_ID: 1,
    ZLIB_NO_COMPRESSION: 0,
    ZLIB_BEST_SPEED: 1,
    ZLIB_BEST_COMPRESSION: 9,
    ZLIB_DEFAULT_COMPRESSION: -1,
    MODE_MASK: 4095,
    DEFAULT_FILE_MODE: 33188,
    // 010644 = -rw-r--r-- = S_IFREG | S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH
    DEFAULT_DIR_MODE: 16877,
    // 040755 = drwxr-xr-x = S_IFDIR | S_IRWXU | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH
    EXT_FILE_ATTR_DIR: 1106051088,
    // 010173200020 = drwxr-xr-x = (((S_IFDIR | 0755) << 16) | S_DOS_D)
    EXT_FILE_ATTR_FILE: 2175008800,
    // 020151000040 = -rw-r--r-- = (((S_IFREG | 0644) << 16) | S_DOS_A) >>> 0
    // Unix file types
    S_IFMT: 61440,
    // 0170000 type of file mask
    S_IFIFO: 4096,
    // 010000 named pipe (fifo)
    S_IFCHR: 8192,
    // 020000 character special
    S_IFDIR: 16384,
    // 040000 directory
    S_IFBLK: 24576,
    // 060000 block special
    S_IFREG: 32768,
    // 0100000 regular
    S_IFLNK: 40960,
    // 0120000 symbolic link
    S_IFSOCK: 49152,
    // 0140000 socket
    // DOS file type flags
    S_DOS_A: 32,
    // 040 Archive
    S_DOS_D: 16,
    // 020 Directory
    S_DOS_V: 8,
    // 010 Volume
    S_DOS_S: 4,
    // 04 System
    S_DOS_H: 2,
    // 02 Hidden
    S_DOS_R: 1
    // 01 Read Only
  };
  return constants;
}
var hasRequiredZipArchiveEntry;
function requireZipArchiveEntry() {
  if (hasRequiredZipArchiveEntry) return zipArchiveEntry.exports;
  hasRequiredZipArchiveEntry = 1;
  var inherits = require$$0.inherits;
  var normalizePath = requireNormalizePath();
  var ArchiveEntry = requireArchiveEntry();
  var GeneralPurposeBit = requireGeneralPurposeBit();
  var UnixStat = requireUnixStat();
  var constants2 = requireConstants();
  var zipUtil = requireUtil$1();
  var ZipArchiveEntry = zipArchiveEntry.exports = function(name) {
    if (!(this instanceof ZipArchiveEntry)) {
      return new ZipArchiveEntry(name);
    }
    ArchiveEntry.call(this);
    this.platform = constants2.PLATFORM_FAT;
    this.method = -1;
    this.name = null;
    this.size = 0;
    this.csize = 0;
    this.gpb = new GeneralPurposeBit();
    this.crc = 0;
    this.time = -1;
    this.minver = constants2.MIN_VERSION_INITIAL;
    this.mode = -1;
    this.extra = null;
    this.exattr = 0;
    this.inattr = 0;
    this.comment = null;
    if (name) {
      this.setName(name);
    }
  };
  inherits(ZipArchiveEntry, ArchiveEntry);
  ZipArchiveEntry.prototype.getCentralDirectoryExtra = function() {
    return this.getExtra();
  };
  ZipArchiveEntry.prototype.getComment = function() {
    return this.comment !== null ? this.comment : "";
  };
  ZipArchiveEntry.prototype.getCompressedSize = function() {
    return this.csize;
  };
  ZipArchiveEntry.prototype.getCrc = function() {
    return this.crc;
  };
  ZipArchiveEntry.prototype.getExternalAttributes = function() {
    return this.exattr;
  };
  ZipArchiveEntry.prototype.getExtra = function() {
    return this.extra !== null ? this.extra : constants2.EMPTY;
  };
  ZipArchiveEntry.prototype.getGeneralPurposeBit = function() {
    return this.gpb;
  };
  ZipArchiveEntry.prototype.getInternalAttributes = function() {
    return this.inattr;
  };
  ZipArchiveEntry.prototype.getLastModifiedDate = function() {
    return this.getTime();
  };
  ZipArchiveEntry.prototype.getLocalFileDataExtra = function() {
    return this.getExtra();
  };
  ZipArchiveEntry.prototype.getMethod = function() {
    return this.method;
  };
  ZipArchiveEntry.prototype.getName = function() {
    return this.name;
  };
  ZipArchiveEntry.prototype.getPlatform = function() {
    return this.platform;
  };
  ZipArchiveEntry.prototype.getSize = function() {
    return this.size;
  };
  ZipArchiveEntry.prototype.getTime = function() {
    return this.time !== -1 ? zipUtil.dosToDate(this.time) : -1;
  };
  ZipArchiveEntry.prototype.getTimeDos = function() {
    return this.time !== -1 ? this.time : 0;
  };
  ZipArchiveEntry.prototype.getUnixMode = function() {
    return this.platform !== constants2.PLATFORM_UNIX ? 0 : this.getExternalAttributes() >> constants2.SHORT_SHIFT & constants2.SHORT_MASK;
  };
  ZipArchiveEntry.prototype.getVersionNeededToExtract = function() {
    return this.minver;
  };
  ZipArchiveEntry.prototype.setComment = function(comment) {
    if (Buffer.byteLength(comment) !== comment.length) {
      this.getGeneralPurposeBit().useUTF8ForNames(true);
    }
    this.comment = comment;
  };
  ZipArchiveEntry.prototype.setCompressedSize = function(size) {
    if (size < 0) {
      throw new Error("invalid entry compressed size");
    }
    this.csize = size;
  };
  ZipArchiveEntry.prototype.setCrc = function(crc) {
    if (crc < 0) {
      throw new Error("invalid entry crc32");
    }
    this.crc = crc;
  };
  ZipArchiveEntry.prototype.setExternalAttributes = function(attr) {
    this.exattr = attr >>> 0;
  };
  ZipArchiveEntry.prototype.setExtra = function(extra) {
    this.extra = extra;
  };
  ZipArchiveEntry.prototype.setGeneralPurposeBit = function(gpb) {
    if (!(gpb instanceof GeneralPurposeBit)) {
      throw new Error("invalid entry GeneralPurposeBit");
    }
    this.gpb = gpb;
  };
  ZipArchiveEntry.prototype.setInternalAttributes = function(attr) {
    this.inattr = attr;
  };
  ZipArchiveEntry.prototype.setMethod = function(method) {
    if (method < 0) {
      throw new Error("invalid entry compression method");
    }
    this.method = method;
  };
  ZipArchiveEntry.prototype.setName = function(name, prependSlash = false) {
    name = normalizePath(name, false).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
    if (prependSlash) {
      name = `/${name}`;
    }
    if (Buffer.byteLength(name) !== name.length) {
      this.getGeneralPurposeBit().useUTF8ForNames(true);
    }
    this.name = name;
  };
  ZipArchiveEntry.prototype.setPlatform = function(platform) {
    this.platform = platform;
  };
  ZipArchiveEntry.prototype.setSize = function(size) {
    if (size < 0) {
      throw new Error("invalid entry size");
    }
    this.size = size;
  };
  ZipArchiveEntry.prototype.setTime = function(time, forceLocalTime) {
    if (!(time instanceof Date)) {
      throw new Error("invalid entry time");
    }
    this.time = zipUtil.dateToDos(time, forceLocalTime);
  };
  ZipArchiveEntry.prototype.setUnixMode = function(mode) {
    mode |= this.isDirectory() ? constants2.S_IFDIR : constants2.S_IFREG;
    var extattr = 0;
    extattr |= mode << constants2.SHORT_SHIFT | (this.isDirectory() ? constants2.S_DOS_D : constants2.S_DOS_A);
    this.setExternalAttributes(extattr);
    this.mode = mode & constants2.MODE_MASK;
    this.platform = constants2.PLATFORM_UNIX;
  };
  ZipArchiveEntry.prototype.setVersionNeededToExtract = function(minver) {
    this.minver = minver;
  };
  ZipArchiveEntry.prototype.isDirectory = function() {
    return this.getName().slice(-1) === "/";
  };
  ZipArchiveEntry.prototype.isUnixSymlink = function() {
    return (this.getUnixMode() & UnixStat.FILE_TYPE_FLAG) === UnixStat.LINK_FLAG;
  };
  ZipArchiveEntry.prototype.isZip64 = function() {
    return this.csize > constants2.ZIP64_MAGIC || this.size > constants2.ZIP64_MAGIC;
  };
  return zipArchiveEntry.exports;
}
var archiveOutputStream = { exports: {} };
var util = { exports: {} };
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util.exports;
  hasRequiredUtil = 1;
  var Stream = require$$0$1.Stream;
  var PassThrough = requireReadable().PassThrough;
  var util$12 = util.exports = {};
  util$12.isStream = function(source) {
    return source instanceof Stream;
  };
  util$12.normalizeInputSource = function(source) {
    if (source === null) {
      return Buffer.alloc(0);
    } else if (typeof source === "string") {
      return Buffer.from(source);
    } else if (util$12.isStream(source) && !source._readableState) {
      var normalized = new PassThrough();
      source.pipe(normalized);
      return normalized;
    }
    return source;
  };
  return util.exports;
}
var hasRequiredArchiveOutputStream;
function requireArchiveOutputStream() {
  if (hasRequiredArchiveOutputStream) return archiveOutputStream.exports;
  hasRequiredArchiveOutputStream = 1;
  var inherits = require$$0.inherits;
  var Transform = requireReadable().Transform;
  var ArchiveEntry = requireArchiveEntry();
  var util2 = requireUtil();
  var ArchiveOutputStream = archiveOutputStream.exports = function(options) {
    if (!(this instanceof ArchiveOutputStream)) {
      return new ArchiveOutputStream(options);
    }
    Transform.call(this, options);
    this.offset = 0;
    this._archive = {
      finish: false,
      finished: false,
      processing: false
    };
  };
  inherits(ArchiveOutputStream, Transform);
  ArchiveOutputStream.prototype._appendBuffer = function(zae, source, callback) {
  };
  ArchiveOutputStream.prototype._appendStream = function(zae, source, callback) {
  };
  ArchiveOutputStream.prototype._emitErrorCallback = function(err) {
    if (err) {
      this.emit("error", err);
    }
  };
  ArchiveOutputStream.prototype._finish = function(ae) {
  };
  ArchiveOutputStream.prototype._normalizeEntry = function(ae) {
  };
  ArchiveOutputStream.prototype._transform = function(chunk, encoding, callback) {
    callback(null, chunk);
  };
  ArchiveOutputStream.prototype.entry = function(ae, source, callback) {
    source = source || null;
    if (typeof callback !== "function") {
      callback = this._emitErrorCallback.bind(this);
    }
    if (!(ae instanceof ArchiveEntry)) {
      callback(new Error("not a valid instance of ArchiveEntry"));
      return;
    }
    if (this._archive.finish || this._archive.finished) {
      callback(new Error("unacceptable entry after finish"));
      return;
    }
    if (this._archive.processing) {
      callback(new Error("already processing an entry"));
      return;
    }
    this._archive.processing = true;
    this._normalizeEntry(ae);
    this._entry = ae;
    source = util2.normalizeInputSource(source);
    if (Buffer.isBuffer(source)) {
      this._appendBuffer(ae, source, callback);
    } else if (util2.isStream(source)) {
      this._appendStream(ae, source, callback);
    } else {
      this._archive.processing = false;
      callback(new Error("input source must be valid Stream or Buffer instance"));
      return;
    }
    return this;
  };
  ArchiveOutputStream.prototype.finish = function() {
    if (this._archive.processing) {
      this._archive.finish = true;
      return;
    }
    this._finish();
  };
  ArchiveOutputStream.prototype.getBytesWritten = function() {
    return this.offset;
  };
  ArchiveOutputStream.prototype.write = function(chunk, cb) {
    if (chunk) {
      this.offset += chunk.length;
    }
    return Transform.prototype.write.call(this, chunk, cb);
  };
  return archiveOutputStream.exports;
}
var zipArchiveOutputStream = { exports: {} };
var hasRequiredZipArchiveOutputStream;
function requireZipArchiveOutputStream() {
  if (hasRequiredZipArchiveOutputStream) return zipArchiveOutputStream.exports;
  hasRequiredZipArchiveOutputStream = 1;
  var inherits = require$$0.inherits;
  var crc32 = requireBufferCrc32();
  var { CRC32Stream } = requireLib();
  var { DeflateCRC32Stream } = requireLib();
  var ArchiveOutputStream = requireArchiveOutputStream();
  requireZipArchiveEntry();
  requireGeneralPurposeBit();
  var constants2 = requireConstants();
  requireUtil();
  var zipUtil = requireUtil$1();
  var ZipArchiveOutputStream = zipArchiveOutputStream.exports = function(options) {
    if (!(this instanceof ZipArchiveOutputStream)) {
      return new ZipArchiveOutputStream(options);
    }
    options = this.options = this._defaults(options);
    ArchiveOutputStream.call(this, options);
    this._entry = null;
    this._entries = [];
    this._archive = {
      centralLength: 0,
      centralOffset: 0,
      comment: "",
      finish: false,
      finished: false,
      processing: false,
      forceZip64: options.forceZip64,
      forceLocalTime: options.forceLocalTime
    };
  };
  inherits(ZipArchiveOutputStream, ArchiveOutputStream);
  ZipArchiveOutputStream.prototype._afterAppend = function(ae) {
    this._entries.push(ae);
    if (ae.getGeneralPurposeBit().usesDataDescriptor()) {
      this._writeDataDescriptor(ae);
    }
    this._archive.processing = false;
    this._entry = null;
    if (this._archive.finish && !this._archive.finished) {
      this._finish();
    }
  };
  ZipArchiveOutputStream.prototype._appendBuffer = function(ae, source, callback) {
    if (source.length === 0) {
      ae.setMethod(constants2.METHOD_STORED);
    }
    var method = ae.getMethod();
    if (method === constants2.METHOD_STORED) {
      ae.setSize(source.length);
      ae.setCompressedSize(source.length);
      ae.setCrc(crc32.unsigned(source));
    }
    this._writeLocalFileHeader(ae);
    if (method === constants2.METHOD_STORED) {
      this.write(source);
      this._afterAppend(ae);
      callback(null, ae);
      return;
    } else if (method === constants2.METHOD_DEFLATED) {
      this._smartStream(ae, callback).end(source);
      return;
    } else {
      callback(new Error("compression method " + method + " not implemented"));
      return;
    }
  };
  ZipArchiveOutputStream.prototype._appendStream = function(ae, source, callback) {
    ae.getGeneralPurposeBit().useDataDescriptor(true);
    ae.setVersionNeededToExtract(constants2.MIN_VERSION_DATA_DESCRIPTOR);
    this._writeLocalFileHeader(ae);
    var smart = this._smartStream(ae, callback);
    source.once("error", function(err) {
      smart.emit("error", err);
      smart.end();
    });
    source.pipe(smart);
  };
  ZipArchiveOutputStream.prototype._defaults = function(o) {
    if (typeof o !== "object") {
      o = {};
    }
    if (typeof o.zlib !== "object") {
      o.zlib = {};
    }
    if (typeof o.zlib.level !== "number") {
      o.zlib.level = constants2.ZLIB_BEST_SPEED;
    }
    o.forceZip64 = !!o.forceZip64;
    o.forceLocalTime = !!o.forceLocalTime;
    return o;
  };
  ZipArchiveOutputStream.prototype._finish = function() {
    this._archive.centralOffset = this.offset;
    this._entries.forEach((function(ae) {
      this._writeCentralFileHeader(ae);
    }).bind(this));
    this._archive.centralLength = this.offset - this._archive.centralOffset;
    if (this.isZip64()) {
      this._writeCentralDirectoryZip64();
    }
    this._writeCentralDirectoryEnd();
    this._archive.processing = false;
    this._archive.finish = true;
    this._archive.finished = true;
    this.end();
  };
  ZipArchiveOutputStream.prototype._normalizeEntry = function(ae) {
    if (ae.getMethod() === -1) {
      ae.setMethod(constants2.METHOD_DEFLATED);
    }
    if (ae.getMethod() === constants2.METHOD_DEFLATED) {
      ae.getGeneralPurposeBit().useDataDescriptor(true);
      ae.setVersionNeededToExtract(constants2.MIN_VERSION_DATA_DESCRIPTOR);
    }
    if (ae.getTime() === -1) {
      ae.setTime(/* @__PURE__ */ new Date(), this._archive.forceLocalTime);
    }
    ae._offsets = {
      file: 0,
      data: 0,
      contents: 0
    };
  };
  ZipArchiveOutputStream.prototype._smartStream = function(ae, callback) {
    var deflate = ae.getMethod() === constants2.METHOD_DEFLATED;
    var process = deflate ? new DeflateCRC32Stream(this.options.zlib) : new CRC32Stream();
    var error = null;
    function handleStuff() {
      var digest = process.digest().readUInt32BE(0);
      ae.setCrc(digest);
      ae.setSize(process.size());
      ae.setCompressedSize(process.size(true));
      this._afterAppend(ae);
      callback(error, ae);
    }
    process.once("end", handleStuff.bind(this));
    process.once("error", function(err) {
      error = err;
    });
    process.pipe(this, { end: false });
    return process;
  };
  ZipArchiveOutputStream.prototype._writeCentralDirectoryEnd = function() {
    var records = this._entries.length;
    var size = this._archive.centralLength;
    var offset = this._archive.centralOffset;
    if (this.isZip64()) {
      records = constants2.ZIP64_MAGIC_SHORT;
      size = constants2.ZIP64_MAGIC;
      offset = constants2.ZIP64_MAGIC;
    }
    this.write(zipUtil.getLongBytes(constants2.SIG_EOCD));
    this.write(constants2.SHORT_ZERO);
    this.write(constants2.SHORT_ZERO);
    this.write(zipUtil.getShortBytes(records));
    this.write(zipUtil.getShortBytes(records));
    this.write(zipUtil.getLongBytes(size));
    this.write(zipUtil.getLongBytes(offset));
    var comment = this.getComment();
    var commentLength = Buffer.byteLength(comment);
    this.write(zipUtil.getShortBytes(commentLength));
    this.write(comment);
  };
  ZipArchiveOutputStream.prototype._writeCentralDirectoryZip64 = function() {
    this.write(zipUtil.getLongBytes(constants2.SIG_ZIP64_EOCD));
    this.write(zipUtil.getEightBytes(44));
    this.write(zipUtil.getShortBytes(constants2.MIN_VERSION_ZIP64));
    this.write(zipUtil.getShortBytes(constants2.MIN_VERSION_ZIP64));
    this.write(constants2.LONG_ZERO);
    this.write(constants2.LONG_ZERO);
    this.write(zipUtil.getEightBytes(this._entries.length));
    this.write(zipUtil.getEightBytes(this._entries.length));
    this.write(zipUtil.getEightBytes(this._archive.centralLength));
    this.write(zipUtil.getEightBytes(this._archive.centralOffset));
    this.write(zipUtil.getLongBytes(constants2.SIG_ZIP64_EOCD_LOC));
    this.write(constants2.LONG_ZERO);
    this.write(zipUtil.getEightBytes(this._archive.centralOffset + this._archive.centralLength));
    this.write(zipUtil.getLongBytes(1));
  };
  ZipArchiveOutputStream.prototype._writeCentralFileHeader = function(ae) {
    var gpb = ae.getGeneralPurposeBit();
    var method = ae.getMethod();
    var offsets = ae._offsets;
    var size = ae.getSize();
    var compressedSize = ae.getCompressedSize();
    if (ae.isZip64() || offsets.file > constants2.ZIP64_MAGIC) {
      size = constants2.ZIP64_MAGIC;
      compressedSize = constants2.ZIP64_MAGIC;
      ae.setVersionNeededToExtract(constants2.MIN_VERSION_ZIP64);
      var extraBuf = Buffer.concat([
        zipUtil.getShortBytes(constants2.ZIP64_EXTRA_ID),
        zipUtil.getShortBytes(24),
        zipUtil.getEightBytes(ae.getSize()),
        zipUtil.getEightBytes(ae.getCompressedSize()),
        zipUtil.getEightBytes(offsets.file)
      ], 28);
      ae.setExtra(extraBuf);
    }
    this.write(zipUtil.getLongBytes(constants2.SIG_CFH));
    this.write(zipUtil.getShortBytes(ae.getPlatform() << 8 | constants2.VERSION_MADEBY));
    this.write(zipUtil.getShortBytes(ae.getVersionNeededToExtract()));
    this.write(gpb.encode());
    this.write(zipUtil.getShortBytes(method));
    this.write(zipUtil.getLongBytes(ae.getTimeDos()));
    this.write(zipUtil.getLongBytes(ae.getCrc()));
    this.write(zipUtil.getLongBytes(compressedSize));
    this.write(zipUtil.getLongBytes(size));
    var name = ae.getName();
    var comment = ae.getComment();
    var extra = ae.getCentralDirectoryExtra();
    if (gpb.usesUTF8ForNames()) {
      name = Buffer.from(name);
      comment = Buffer.from(comment);
    }
    this.write(zipUtil.getShortBytes(name.length));
    this.write(zipUtil.getShortBytes(extra.length));
    this.write(zipUtil.getShortBytes(comment.length));
    this.write(constants2.SHORT_ZERO);
    this.write(zipUtil.getShortBytes(ae.getInternalAttributes()));
    this.write(zipUtil.getLongBytes(ae.getExternalAttributes()));
    if (offsets.file > constants2.ZIP64_MAGIC) {
      this.write(zipUtil.getLongBytes(constants2.ZIP64_MAGIC));
    } else {
      this.write(zipUtil.getLongBytes(offsets.file));
    }
    this.write(name);
    this.write(extra);
    this.write(comment);
  };
  ZipArchiveOutputStream.prototype._writeDataDescriptor = function(ae) {
    this.write(zipUtil.getLongBytes(constants2.SIG_DD));
    this.write(zipUtil.getLongBytes(ae.getCrc()));
    if (ae.isZip64()) {
      this.write(zipUtil.getEightBytes(ae.getCompressedSize()));
      this.write(zipUtil.getEightBytes(ae.getSize()));
    } else {
      this.write(zipUtil.getLongBytes(ae.getCompressedSize()));
      this.write(zipUtil.getLongBytes(ae.getSize()));
    }
  };
  ZipArchiveOutputStream.prototype._writeLocalFileHeader = function(ae) {
    var gpb = ae.getGeneralPurposeBit();
    var method = ae.getMethod();
    var name = ae.getName();
    var extra = ae.getLocalFileDataExtra();
    if (ae.isZip64()) {
      gpb.useDataDescriptor(true);
      ae.setVersionNeededToExtract(constants2.MIN_VERSION_ZIP64);
    }
    if (gpb.usesUTF8ForNames()) {
      name = Buffer.from(name);
    }
    ae._offsets.file = this.offset;
    this.write(zipUtil.getLongBytes(constants2.SIG_LFH));
    this.write(zipUtil.getShortBytes(ae.getVersionNeededToExtract()));
    this.write(gpb.encode());
    this.write(zipUtil.getShortBytes(method));
    this.write(zipUtil.getLongBytes(ae.getTimeDos()));
    ae._offsets.data = this.offset;
    if (gpb.usesDataDescriptor()) {
      this.write(constants2.LONG_ZERO);
      this.write(constants2.LONG_ZERO);
      this.write(constants2.LONG_ZERO);
    } else {
      this.write(zipUtil.getLongBytes(ae.getCrc()));
      this.write(zipUtil.getLongBytes(ae.getCompressedSize()));
      this.write(zipUtil.getLongBytes(ae.getSize()));
    }
    this.write(zipUtil.getShortBytes(name.length));
    this.write(zipUtil.getShortBytes(extra.length));
    this.write(name);
    this.write(extra);
    ae._offsets.contents = this.offset;
  };
  ZipArchiveOutputStream.prototype.getComment = function(comment) {
    return this._archive.comment !== null ? this._archive.comment : "";
  };
  ZipArchiveOutputStream.prototype.isZip64 = function() {
    return this._archive.forceZip64 || this._entries.length > constants2.ZIP64_MAGIC_SHORT || this._archive.centralLength > constants2.ZIP64_MAGIC || this._archive.centralOffset > constants2.ZIP64_MAGIC;
  };
  ZipArchiveOutputStream.prototype.setComment = function(comment) {
    this._archive.comment = comment;
  };
  return zipArchiveOutputStream.exports;
}
var compressCommons;
var hasRequiredCompressCommons;
function requireCompressCommons() {
  if (hasRequiredCompressCommons) return compressCommons;
  hasRequiredCompressCommons = 1;
  compressCommons = {
    ArchiveEntry: requireArchiveEntry(),
    ZipArchiveEntry: requireZipArchiveEntry(),
    ArchiveOutputStream: requireArchiveOutputStream(),
    ZipArchiveOutputStream: requireZipArchiveOutputStream()
  };
  return compressCommons;
}
export {
  requireCompressCommons as r
};
