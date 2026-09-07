import { r as requireListenercount } from "./listenercount.mjs";
import { r as requireBufferIndexofPolyfill } from "./buffer-indexof-polyfill.mjs";
import { r as requireSetImmediate } from "./setimmediate.mjs";
import require$$0$2 from "util";
import require$$0$3 from "zlib";
import require$$0$1 from "stream";
import { r as requireBinary } from "./binary.mjs";
import { r as requireBluebird } from "./bluebird.mjs";
import require$$0 from "buffer";
import { d as requireReadable } from "./readable-stream.mjs";
import { r as requireDuplexer2 } from "./duplexer2.mjs";
import { r as requireFstream } from "./fstream.mjs";
import require$$1 from "path";
import { r as requireGracefulFs } from "./graceful-fs.mjs";
import { r as requireBigInteger } from "./big-integer.mjs";
var unzip$1 = {};
var Buffer_1;
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return Buffer_1;
  hasRequiredBuffer = 1;
  var Buffer = require$$0.Buffer;
  if (Buffer.from === void 0) {
    Buffer.from = function(a, b, c) {
      return new Buffer(a, b, c);
    };
    Buffer.alloc = Buffer.from;
  }
  Buffer_1 = Buffer;
  return Buffer_1;
}
var PullStream_1;
var hasRequiredPullStream;
function requirePullStream() {
  if (hasRequiredPullStream) return PullStream_1;
  hasRequiredPullStream = 1;
  var Stream = require$$0$1;
  var Promise2 = requireBluebird();
  var util = require$$0$2;
  var Buffer = requireBuffer();
  var strFunction = "function";
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  function PullStream() {
    if (!(this instanceof PullStream))
      return new PullStream();
    Stream.Duplex.call(this, { decodeStrings: false, objectMode: true });
    this.buffer = Buffer.from("");
    var self = this;
    self.on("finish", function() {
      self.finished = true;
      self.emit("chunk", false);
    });
  }
  util.inherits(PullStream, Stream.Duplex);
  PullStream.prototype._write = function(chunk, e, cb) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    this.cb = cb;
    this.emit("chunk");
  };
  PullStream.prototype.stream = function(eof, includeEof) {
    var p = Stream.PassThrough();
    var done, self = this;
    function cb() {
      if (typeof self.cb === strFunction) {
        var callback = self.cb;
        self.cb = void 0;
        return callback();
      }
    }
    function pull() {
      var packet;
      if (self.buffer && self.buffer.length) {
        if (typeof eof === "number") {
          packet = self.buffer.slice(0, eof);
          self.buffer = self.buffer.slice(eof);
          eof -= packet.length;
          done = !eof;
        } else {
          var match = self.buffer.indexOf(eof);
          if (match !== -1) {
            self.match = match;
            if (includeEof) match = match + eof.length;
            packet = self.buffer.slice(0, match);
            self.buffer = self.buffer.slice(match);
            done = true;
          } else {
            var len = self.buffer.length - eof.length;
            if (len <= 0) {
              cb();
            } else {
              packet = self.buffer.slice(0, len);
              self.buffer = self.buffer.slice(len);
            }
          }
        }
        if (packet) p.write(packet, function() {
          if (self.buffer.length === 0 || eof.length && self.buffer.length <= eof.length) cb();
        });
      }
      if (!done) {
        if (self.finished) {
          self.removeListener("chunk", pull);
          self.emit("error", new Error("FILE_ENDED"));
          return;
        }
      } else {
        self.removeListener("chunk", pull);
        p.end();
      }
    }
    self.on("chunk", pull);
    pull();
    return p;
  };
  PullStream.prototype.pull = function(eof, includeEof) {
    if (eof === 0) return Promise2.resolve("");
    if (!isNaN(eof) && this.buffer.length > eof) {
      var data = this.buffer.slice(0, eof);
      this.buffer = this.buffer.slice(eof);
      return Promise2.resolve(data);
    }
    var buffer = Buffer.from(""), self = this;
    var concatStream = Stream.Transform();
    concatStream._transform = function(d, e, cb) {
      buffer = Buffer.concat([buffer, d]);
      cb();
    };
    var rejectHandler;
    var pullStreamRejectHandler;
    return new Promise2(function(resolve, reject) {
      rejectHandler = reject;
      pullStreamRejectHandler = function(e) {
        self.__emittedError = e;
        reject(e);
      };
      if (self.finished)
        return reject(new Error("FILE_ENDED"));
      self.once("error", pullStreamRejectHandler);
      self.stream(eof, includeEof).on("error", reject).pipe(concatStream).on("finish", function() {
        resolve(buffer);
      }).on("error", reject);
    }).finally(function() {
      self.removeListener("error", rejectHandler);
      self.removeListener("error", pullStreamRejectHandler);
    });
  };
  PullStream.prototype._read = function() {
  };
  PullStream_1 = PullStream;
  return PullStream_1;
}
var NoopStream_1;
var hasRequiredNoopStream;
function requireNoopStream() {
  if (hasRequiredNoopStream) return NoopStream_1;
  hasRequiredNoopStream = 1;
  var Stream = require$$0$1;
  var util = require$$0$2;
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  function NoopStream() {
    if (!(this instanceof NoopStream)) {
      return new NoopStream();
    }
    Stream.Transform.call(this);
  }
  util.inherits(NoopStream, Stream.Transform);
  NoopStream.prototype._transform = function(d, e, cb) {
    cb();
  };
  NoopStream_1 = NoopStream;
  return NoopStream_1;
}
var BufferStream;
var hasRequiredBufferStream;
function requireBufferStream() {
  if (hasRequiredBufferStream) return BufferStream;
  hasRequiredBufferStream = 1;
  var Promise2 = requireBluebird();
  var Stream = require$$0$1;
  var Buffer = requireBuffer();
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  BufferStream = function(entry) {
    return new Promise2(function(resolve, reject) {
      var chunks = [];
      var bufferStream = Stream.Transform().on("finish", function() {
        resolve(Buffer.concat(chunks));
      }).on("error", reject);
      bufferStream._transform = function(d, e, cb) {
        chunks.push(d);
        cb();
      };
      entry.on("error", reject).pipe(bufferStream);
    });
  };
  return BufferStream;
}
var parseExtraField;
var hasRequiredParseExtraField;
function requireParseExtraField() {
  if (hasRequiredParseExtraField) return parseExtraField;
  hasRequiredParseExtraField = 1;
  var binary = requireBinary();
  parseExtraField = function(extraField, vars) {
    var extra;
    while (!extra && extraField && extraField.length) {
      var candidateExtra = binary.parse(extraField).word16lu("signature").word16lu("partsize").word64lu("uncompressedSize").word64lu("compressedSize").word64lu("offset").word64lu("disknum").vars;
      if (candidateExtra.signature === 1) {
        extra = candidateExtra;
      } else {
        extraField = extraField.slice(candidateExtra.partsize + 4);
      }
    }
    extra = extra || {};
    if (vars.compressedSize === 4294967295)
      vars.compressedSize = extra.compressedSize;
    if (vars.uncompressedSize === 4294967295)
      vars.uncompressedSize = extra.uncompressedSize;
    if (vars.offsetToLocalFileHeader === 4294967295)
      vars.offsetToLocalFileHeader = extra.offset;
    return extra;
  };
  return parseExtraField;
}
var parseDateTime;
var hasRequiredParseDateTime;
function requireParseDateTime() {
  if (hasRequiredParseDateTime) return parseDateTime;
  hasRequiredParseDateTime = 1;
  parseDateTime = function parseDateTime2(date, time) {
    const day = date & 31;
    const month = date >> 5 & 15;
    const year = (date >> 9 & 127) + 1980;
    const seconds = time ? (time & 31) * 2 : 0;
    const minutes = time ? time >> 5 & 63 : 0;
    const hours = time ? time >> 11 : 0;
    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
  };
  return parseDateTime;
}
var parse;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse;
  hasRequiredParse = 1;
  var util = require$$0$2;
  var zlib = require$$0$3;
  var Stream = require$$0$1;
  var binary = requireBinary();
  var Promise2 = requireBluebird();
  var PullStream = requirePullStream();
  var NoopStream = requireNoopStream();
  var BufferStream2 = requireBufferStream();
  var parseExtraField2 = requireParseExtraField();
  var Buffer = requireBuffer();
  var parseDateTime2 = requireParseDateTime();
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  var endDirectorySignature = Buffer.alloc(4);
  endDirectorySignature.writeUInt32LE(101010256, 0);
  function Parse(opts) {
    if (!(this instanceof Parse)) {
      return new Parse(opts);
    }
    var self = this;
    self._opts = opts || { verbose: false };
    PullStream.call(self, self._opts);
    self.on("finish", function() {
      self.emit("end");
      self.emit("close");
    });
    self._readRecord().catch(function(e) {
      if (!self.__emittedError || self.__emittedError !== e)
        self.emit("error", e);
    });
  }
  util.inherits(Parse, PullStream);
  Parse.prototype._readRecord = function() {
    var self = this;
    return self.pull(4).then(function(data) {
      if (data.length === 0)
        return;
      var signature = data.readUInt32LE(0);
      if (signature === 875721283) {
        return self._readCrxHeader();
      }
      if (signature === 67324752) {
        return self._readFile();
      } else if (signature === 33639248) {
        self.reachedCD = true;
        return self._readCentralDirectoryFileHeader();
      } else if (signature === 101010256) {
        return self._readEndOfCentralDirectoryRecord();
      } else if (self.reachedCD) {
        var includeEof = true;
        return self.pull(endDirectorySignature, includeEof).then(function() {
          return self._readEndOfCentralDirectoryRecord();
        });
      } else
        self.emit("error", new Error("invalid signature: 0x" + signature.toString(16)));
    });
  };
  Parse.prototype._readCrxHeader = function() {
    var self = this;
    return self.pull(12).then(function(data) {
      self.crxHeader = binary.parse(data).word32lu("version").word32lu("pubKeyLength").word32lu("signatureLength").vars;
      return self.pull(self.crxHeader.pubKeyLength + self.crxHeader.signatureLength);
    }).then(function(data) {
      self.crxHeader.publicKey = data.slice(0, self.crxHeader.pubKeyLength);
      self.crxHeader.signature = data.slice(self.crxHeader.pubKeyLength);
      self.emit("crx-header", self.crxHeader);
      return self._readRecord();
    });
  };
  Parse.prototype._readFile = function() {
    var self = this;
    return self.pull(26).then(function(data) {
      var vars = binary.parse(data).word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").vars;
      vars.lastModifiedDateTime = parseDateTime2(vars.lastModifiedDate, vars.lastModifiedTime);
      if (self.crxHeader) vars.crxHeader = self.crxHeader;
      return self.pull(vars.fileNameLength).then(function(fileNameBuffer) {
        var fileName = fileNameBuffer.toString("utf8");
        var entry = Stream.PassThrough();
        var __autodraining = false;
        entry.autodrain = function() {
          __autodraining = true;
          var draining = entry.pipe(NoopStream());
          draining.promise = function() {
            return new Promise2(function(resolve, reject) {
              draining.on("finish", resolve);
              draining.on("error", reject);
            });
          };
          return draining;
        };
        entry.buffer = function() {
          return BufferStream2(entry);
        };
        entry.path = fileName;
        entry.props = {};
        entry.props.path = fileName;
        entry.props.pathBuffer = fileNameBuffer;
        entry.props.flags = {
          "isUnicode": (vars.flags & 2048) != 0
        };
        entry.type = vars.uncompressedSize === 0 && /[\/\\]$/.test(fileName) ? "Directory" : "File";
        if (self._opts.verbose) {
          if (entry.type === "Directory") {
            console.log("   creating:", fileName);
          } else if (entry.type === "File") {
            if (vars.compressionMethod === 0) {
              console.log(" extracting:", fileName);
            } else {
              console.log("  inflating:", fileName);
            }
          }
        }
        return self.pull(vars.extraFieldLength).then(function(extraField) {
          var extra = parseExtraField2(extraField, vars);
          entry.vars = vars;
          entry.extra = extra;
          if (self._opts.forceStream) {
            self.push(entry);
          } else {
            self.emit("entry", entry);
            if (self._readableState.pipesCount || self._readableState.pipes && self._readableState.pipes.length)
              self.push(entry);
          }
          if (self._opts.verbose)
            console.log({
              filename: fileName,
              vars,
              extra
            });
          var fileSizeKnown = !(vars.flags & 8) || vars.compressedSize > 0, eof;
          entry.__autodraining = __autodraining;
          var inflater = vars.compressionMethod && !__autodraining ? zlib.createInflateRaw() : Stream.PassThrough();
          if (fileSizeKnown) {
            entry.size = vars.uncompressedSize;
            eof = vars.compressedSize;
          } else {
            eof = Buffer.alloc(4);
            eof.writeUInt32LE(134695760, 0);
          }
          return new Promise2(function(resolve, reject) {
            self.stream(eof).pipe(inflater).on("error", function(err) {
              self.emit("error", err);
            }).pipe(entry).on("finish", function() {
              return fileSizeKnown ? self._readRecord().then(resolve).catch(reject) : self._processDataDescriptor(entry).then(resolve).catch(reject);
            });
          });
        });
      });
    });
  };
  Parse.prototype._processDataDescriptor = function(entry) {
    var self = this;
    return self.pull(16).then(function(data) {
      var vars = binary.parse(data).word32lu("dataDescriptorSignature").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").vars;
      entry.size = vars.uncompressedSize;
      return self._readRecord();
    });
  };
  Parse.prototype._readCentralDirectoryFileHeader = function() {
    var self = this;
    return self.pull(42).then(function(data) {
      var vars = binary.parse(data).word16lu("versionMadeBy").word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").word16lu("fileCommentLength").word16lu("diskNumber").word16lu("internalFileAttributes").word32lu("externalFileAttributes").word32lu("offsetToLocalFileHeader").vars;
      return self.pull(vars.fileNameLength).then(function(fileName) {
        vars.fileName = fileName.toString("utf8");
        return self.pull(vars.extraFieldLength);
      }).then(function(extraField) {
        return self.pull(vars.fileCommentLength);
      }).then(function(fileComment) {
        return self._readRecord();
      });
    });
  };
  Parse.prototype._readEndOfCentralDirectoryRecord = function() {
    var self = this;
    return self.pull(18).then(function(data) {
      var vars = binary.parse(data).word16lu("diskNumber").word16lu("diskStart").word16lu("numberOfRecordsOnDisk").word16lu("numberOfRecords").word32lu("sizeOfCentralDirectory").word32lu("offsetToStartOfCentralDirectory").word16lu("commentLength").vars;
      return self.pull(vars.commentLength).then(function(comment) {
        comment = comment.toString("utf8");
        self.end();
        self.push(null);
      });
    });
  };
  Parse.prototype.promise = function() {
    var self = this;
    return new Promise2(function(resolve, reject) {
      self.on("finish", resolve);
      self.on("error", reject);
    });
  };
  parse = Parse;
  return parse;
}
var parseOne_1;
var hasRequiredParseOne;
function requireParseOne() {
  if (hasRequiredParseOne) return parseOne_1;
  hasRequiredParseOne = 1;
  var Stream = require$$0$1;
  var Parse = requireParse();
  var duplexer2 = requireDuplexer2();
  var BufferStream2 = requireBufferStream();
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  function parseOne(match, opts) {
    var inStream = Stream.PassThrough({ objectMode: true });
    var outStream = Stream.PassThrough();
    var transform = Stream.Transform({ objectMode: true });
    var re = match instanceof RegExp ? match : match && new RegExp(match);
    var found;
    transform._transform = function(entry, e, cb) {
      if (found || re && !re.exec(entry.path)) {
        entry.autodrain();
        return cb();
      } else {
        found = true;
        out.emit("entry", entry);
        entry.on("error", function(e2) {
          outStream.emit("error", e2);
        });
        entry.pipe(outStream).on("error", function(err) {
          cb(err);
        }).on("finish", function(d) {
          cb(null, d);
        });
      }
    };
    inStream.pipe(Parse(opts)).on("error", function(err) {
      outStream.emit("error", err);
    }).pipe(transform).on("error", Object).on("finish", function() {
      if (!found)
        outStream.emit("error", new Error("PATTERN_NOT_FOUND"));
      else
        outStream.end();
    });
    var out = duplexer2(inStream, outStream);
    out.buffer = function() {
      return BufferStream2(outStream);
    };
    return out;
  }
  parseOne_1 = parseOne;
  return parseOne_1;
}
var extract;
var hasRequiredExtract;
function requireExtract() {
  if (hasRequiredExtract) return extract;
  hasRequiredExtract = 1;
  extract = Extract;
  var Parse = requireParse();
  var Writer = requireFstream().Writer;
  var path = require$$1;
  var stream = require$$0$1;
  var duplexer2 = requireDuplexer2();
  var Promise2 = requireBluebird();
  function Extract(opts) {
    opts.path = path.resolve(path.normalize(opts.path));
    var parser = new Parse(opts);
    var outStream = new stream.Writable({ objectMode: true });
    outStream._write = function(entry, encoding, cb) {
      if (entry.type == "Directory") return cb();
      var extractPath = path.join(opts.path, entry.path);
      if (extractPath.indexOf(opts.path) != 0) {
        return cb();
      }
      const writer = opts.getWriter ? opts.getWriter({ path: extractPath }) : Writer({ path: extractPath });
      entry.pipe(writer).on("error", cb).on("close", cb);
    };
    var extract2 = duplexer2(parser, outStream);
    parser.once("crx-header", function(crxHeader) {
      extract2.crxHeader = crxHeader;
    });
    parser.pipe(outStream).on("finish", function() {
      extract2.emit("close");
    });
    extract2.promise = function() {
      return new Promise2(function(resolve, reject) {
        extract2.on("close", resolve);
        extract2.on("error", reject);
      });
    };
    return extract2;
  }
  return extract;
}
var Decrypt_1;
var hasRequiredDecrypt;
function requireDecrypt() {
  if (hasRequiredDecrypt) return Decrypt_1;
  hasRequiredDecrypt = 1;
  var bigInt = requireBigInteger();
  var Stream = require$$0$1;
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  var table;
  function generateTable() {
    var poly = 3988292384, c, n, k;
    table = [];
    for (n = 0; n < 256; n++) {
      c = n;
      for (k = 0; k < 8; k++)
        c = c & 1 ? poly ^ c >>> 1 : c = c >>> 1;
      table[n] = c >>> 0;
    }
  }
  function crc(ch, crc2) {
    if (!table)
      generateTable();
    if (ch.charCodeAt)
      ch = ch.charCodeAt(0);
    return bigInt(crc2).shiftRight(8).and(16777215).xor(table[bigInt(crc2).xor(ch).and(255)]).value;
  }
  function Decrypt() {
    if (!(this instanceof Decrypt))
      return new Decrypt();
    this.key0 = 305419896;
    this.key1 = 591751049;
    this.key2 = 878082192;
  }
  Decrypt.prototype.update = function(h) {
    this.key0 = crc(h, this.key0);
    this.key1 = bigInt(this.key0).and(255).and(4294967295).add(this.key1);
    this.key1 = bigInt(this.key1).multiply(134775813).add(1).and(4294967295).value;
    this.key2 = crc(bigInt(this.key1).shiftRight(24).and(255), this.key2);
  };
  Decrypt.prototype.decryptByte = function(c) {
    var k = bigInt(this.key2).or(2);
    c = c ^ bigInt(k).multiply(bigInt(k ^ 1)).shiftRight(8).and(255);
    this.update(c);
    return c;
  };
  Decrypt.prototype.stream = function() {
    var stream = Stream.Transform(), self = this;
    stream._transform = function(d, e, cb) {
      for (var i = 0; i < d.length; i++) {
        d[i] = self.decryptByte(d[i]);
      }
      this.push(d);
      cb();
    };
    return stream;
  };
  Decrypt_1 = Decrypt;
  return Decrypt_1;
}
var unzip;
var hasRequiredUnzip$1;
function requireUnzip$1() {
  if (hasRequiredUnzip$1) return unzip;
  hasRequiredUnzip$1 = 1;
  var Promise2 = requireBluebird();
  var Decrypt = requireDecrypt();
  var PullStream = requirePullStream();
  var Stream = require$$0$1;
  var binary = requireBinary();
  var zlib = require$$0$3;
  var parseExtraField2 = requireParseExtraField();
  var Buffer = requireBuffer();
  var parseDateTime2 = requireParseDateTime();
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  unzip = function unzip2(source, offset, _password, directoryVars) {
    var file = PullStream(), entry = Stream.PassThrough();
    var req = source.stream(offset);
    req.pipe(file).on("error", function(e) {
      entry.emit("error", e);
    });
    entry.vars = file.pull(30).then(function(data) {
      var vars = binary.parse(data).word32lu("signature").word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").vars;
      vars.lastModifiedDateTime = parseDateTime2(vars.lastModifiedDate, vars.lastModifiedTime);
      return file.pull(vars.fileNameLength).then(function(fileName) {
        vars.fileName = fileName.toString("utf8");
        return file.pull(vars.extraFieldLength);
      }).then(function(extraField) {
        var checkEncryption;
        vars.extra = parseExtraField2(extraField, vars);
        if (directoryVars && directoryVars.compressedSize) vars = directoryVars;
        if (vars.flags & 1) checkEncryption = file.pull(12).then(function(header) {
          if (!_password)
            throw new Error("MISSING_PASSWORD");
          var decrypt = Decrypt();
          String(_password).split("").forEach(function(d) {
            decrypt.update(d);
          });
          for (var i = 0; i < header.length; i++)
            header[i] = decrypt.decryptByte(header[i]);
          vars.decrypt = decrypt;
          vars.compressedSize -= 12;
          var check = vars.flags & 8 ? vars.lastModifiedTime >> 8 & 255 : vars.crc32 >> 24 & 255;
          if (header[11] !== check)
            throw new Error("BAD_PASSWORD");
          return vars;
        });
        return Promise2.resolve(checkEncryption).then(function() {
          entry.emit("vars", vars);
          return vars;
        });
      });
    });
    entry.vars.then(function(vars) {
      var fileSizeKnown = !(vars.flags & 8) || vars.compressedSize > 0, eof;
      var inflater = vars.compressionMethod ? zlib.createInflateRaw() : Stream.PassThrough();
      if (fileSizeKnown) {
        entry.size = vars.uncompressedSize;
        eof = vars.compressedSize;
      } else {
        eof = Buffer.alloc(4);
        eof.writeUInt32LE(134695760, 0);
      }
      var stream = file.stream(eof);
      if (vars.decrypt)
        stream = stream.pipe(vars.decrypt.stream());
      stream.pipe(inflater).on("error", function(err) {
        entry.emit("error", err);
      }).pipe(entry).on("finish", function() {
        if (req.destroy)
          req.destroy();
        else if (req.abort)
          req.abort();
        else if (req.close)
          req.close();
        else if (req.push)
          req.push();
        else
          console.log("warning - unable to close stream");
      });
    }).catch(function(e) {
      entry.emit("error", e);
    });
    return entry;
  };
  return unzip;
}
var directory;
var hasRequiredDirectory;
function requireDirectory() {
  if (hasRequiredDirectory) return directory;
  hasRequiredDirectory = 1;
  var binary = requireBinary();
  var PullStream = requirePullStream();
  var unzip2 = requireUnzip$1();
  var Promise2 = requireBluebird();
  var BufferStream2 = requireBufferStream();
  var parseExtraField2 = requireParseExtraField();
  var Buffer = requireBuffer();
  var path = require$$1;
  var Writer = requireFstream().Writer;
  var parseDateTime2 = requireParseDateTime();
  var signature = Buffer.alloc(4);
  signature.writeUInt32LE(101010256, 0);
  function getCrxHeader(source) {
    var sourceStream = source.stream(0).pipe(PullStream());
    return sourceStream.pull(4).then(function(data) {
      var signature2 = data.readUInt32LE(0);
      if (signature2 === 875721283) {
        var crxHeader;
        return sourceStream.pull(12).then(function(data2) {
          crxHeader = binary.parse(data2).word32lu("version").word32lu("pubKeyLength").word32lu("signatureLength").vars;
        }).then(function() {
          return sourceStream.pull(crxHeader.pubKeyLength + crxHeader.signatureLength);
        }).then(function(data2) {
          crxHeader.publicKey = data2.slice(0, crxHeader.pubKeyLength);
          crxHeader.signature = data2.slice(crxHeader.pubKeyLength);
          crxHeader.size = 16 + crxHeader.pubKeyLength + crxHeader.signatureLength;
          return crxHeader;
        });
      }
    });
  }
  function getZip64CentralDirectory(source, zip64CDL) {
    var d64loc = binary.parse(zip64CDL).word32lu("signature").word32lu("diskNumber").word64lu("offsetToStartOfCentralDirectory").word32lu("numberOfDisks").vars;
    if (d64loc.signature != 117853008) {
      throw new Error("invalid zip64 end of central dir locator signature (0x07064b50): 0x" + d64loc.signature.toString(16));
    }
    var dir64 = PullStream();
    source.stream(d64loc.offsetToStartOfCentralDirectory).pipe(dir64);
    return dir64.pull(56);
  }
  function parseZip64DirRecord(dir64record) {
    var vars = binary.parse(dir64record).word32lu("signature").word64lu("sizeOfCentralDirectory").word16lu("version").word16lu("versionsNeededToExtract").word32lu("diskNumber").word32lu("diskStart").word64lu("numberOfRecordsOnDisk").word64lu("numberOfRecords").word64lu("sizeOfCentralDirectory").word64lu("offsetToStartOfCentralDirectory").vars;
    if (vars.signature != 101075792) {
      throw new Error("invalid zip64 end of central dir locator signature (0x06064b50): 0x0" + vars.signature.toString(16));
    }
    return vars;
  }
  directory = function centralDirectory(source, options) {
    var endDir = PullStream(), records = PullStream(), tailSize = options && options.tailSize || 80, sourceSize, crxHeader, startOffset, vars;
    if (options && options.crx)
      crxHeader = getCrxHeader(source);
    return source.size().then(function(size) {
      sourceSize = size;
      source.stream(Math.max(0, size - tailSize)).on("error", function(error) {
        endDir.emit("error", error);
      }).pipe(endDir);
      return endDir.pull(signature);
    }).then(function() {
      return Promise2.props({ directory: endDir.pull(22), crxHeader });
    }).then(function(d) {
      var data = d.directory;
      startOffset = d.crxHeader && d.crxHeader.size || 0;
      vars = binary.parse(data).word32lu("signature").word16lu("diskNumber").word16lu("diskStart").word16lu("numberOfRecordsOnDisk").word16lu("numberOfRecords").word32lu("sizeOfCentralDirectory").word32lu("offsetToStartOfCentralDirectory").word16lu("commentLength").vars;
      if (vars.numberOfRecords == 65535 || vars.numberOfRecords == 65535 || vars.offsetToStartOfCentralDirectory == 4294967295) {
        const zip64CDLSize = 20;
        const zip64CDLOffset = sourceSize - (tailSize - endDir.match + zip64CDLSize);
        const zip64CDLStream = PullStream();
        source.stream(zip64CDLOffset).pipe(zip64CDLStream);
        return zip64CDLStream.pull(zip64CDLSize).then(function(d2) {
          return getZip64CentralDirectory(source, d2);
        }).then(function(dir64record) {
          vars = parseZip64DirRecord(dir64record);
        });
      } else {
        vars.offsetToStartOfCentralDirectory += startOffset;
      }
    }).then(function() {
      if (vars.commentLength) return endDir.pull(vars.commentLength).then(function(comment) {
        vars.comment = comment.toString("utf8");
      });
    }).then(function() {
      source.stream(vars.offsetToStartOfCentralDirectory).pipe(records);
      vars.extract = function(opts) {
        if (!opts || !opts.path) throw new Error("PATH_MISSING");
        opts.path = path.resolve(path.normalize(opts.path));
        return vars.files.then(function(files) {
          return Promise2.map(files, function(entry) {
            if (entry.type == "Directory") return;
            var extractPath = path.join(opts.path, entry.path);
            if (extractPath.indexOf(opts.path) != 0) {
              return;
            }
            var writer = opts.getWriter ? opts.getWriter({ path: extractPath }) : Writer({ path: extractPath });
            return new Promise2(function(resolve, reject) {
              entry.stream(opts.password).on("error", reject).pipe(writer).on("close", resolve).on("error", reject);
            });
          }, { concurrency: opts.concurrency > 1 ? opts.concurrency : 1 });
        });
      };
      vars.files = Promise2.mapSeries(Array(vars.numberOfRecords), function() {
        return records.pull(46).then(function(data) {
          var vars2 = binary.parse(data).word32lu("signature").word16lu("versionMadeBy").word16lu("versionsNeededToExtract").word16lu("flags").word16lu("compressionMethod").word16lu("lastModifiedTime").word16lu("lastModifiedDate").word32lu("crc32").word32lu("compressedSize").word32lu("uncompressedSize").word16lu("fileNameLength").word16lu("extraFieldLength").word16lu("fileCommentLength").word16lu("diskNumber").word16lu("internalFileAttributes").word32lu("externalFileAttributes").word32lu("offsetToLocalFileHeader").vars;
          vars2.offsetToLocalFileHeader += startOffset;
          vars2.lastModifiedDateTime = parseDateTime2(vars2.lastModifiedDate, vars2.lastModifiedTime);
          return records.pull(vars2.fileNameLength).then(function(fileNameBuffer) {
            vars2.pathBuffer = fileNameBuffer;
            vars2.path = fileNameBuffer.toString("utf8");
            vars2.isUnicode = (vars2.flags & 2048) != 0;
            return records.pull(vars2.extraFieldLength);
          }).then(function(extraField) {
            vars2.extra = parseExtraField2(extraField, vars2);
            return records.pull(vars2.fileCommentLength);
          }).then(function(comment) {
            vars2.comment = comment;
            vars2.type = vars2.uncompressedSize === 0 && /[\/\\]$/.test(vars2.path) ? "Directory" : "File";
            vars2.stream = function(_password) {
              return unzip2(source, vars2.offsetToLocalFileHeader, _password, vars2);
            };
            vars2.buffer = function(_password) {
              return BufferStream2(vars2.stream(_password));
            };
            return vars2;
          });
        });
      });
      return Promise2.props(vars);
    });
  };
  return directory;
}
var Open;
var hasRequiredOpen;
function requireOpen() {
  if (hasRequiredOpen) return Open;
  hasRequiredOpen = 1;
  var fs = requireGracefulFs();
  var Promise2 = requireBluebird();
  var directory2 = requireDirectory();
  var Stream = require$$0$1;
  if (!Stream.Writable || !Stream.Writable.prototype.destroy)
    Stream = requireReadable();
  Open = {
    buffer: function(buffer, options) {
      var source = {
        stream: function(offset, length) {
          var stream = Stream.PassThrough();
          stream.end(buffer.slice(offset, length));
          return stream;
        },
        size: function() {
          return Promise2.resolve(buffer.length);
        }
      };
      return directory2(source, options);
    },
    file: function(filename, options) {
      var source = {
        stream: function(offset, length) {
          return fs.createReadStream(filename, { start: offset, end: length && offset + length });
        },
        size: function() {
          return new Promise2(function(resolve, reject) {
            fs.stat(filename, function(err, d) {
              if (err)
                reject(err);
              else
                resolve(d.size);
            });
          });
        }
      };
      return directory2(source, options);
    },
    url: function(request, params, options) {
      if (typeof params === "string")
        params = { url: params };
      if (!params.url)
        throw "URL missing";
      params.headers = params.headers || {};
      var source = {
        stream: function(offset, length) {
          var options2 = Object.create(params);
          options2.headers = Object.create(params.headers);
          options2.headers.range = "bytes=" + offset + "-" + (length ? length : "");
          return request(options2);
        },
        size: function() {
          return new Promise2(function(resolve, reject) {
            var req = request(params);
            req.on("response", function(d) {
              req.abort();
              if (!d.headers["content-length"])
                reject(new Error("Missing content length header"));
              else
                resolve(d.headers["content-length"]);
            }).on("error", reject);
          });
        }
      };
      return directory2(source, options);
    },
    s3: function(client, params, options) {
      var source = {
        size: function() {
          return new Promise2(function(resolve, reject) {
            client.headObject(params, function(err, d) {
              if (err)
                reject(err);
              else
                resolve(d.ContentLength);
            });
          });
        },
        stream: function(offset, length) {
          var d = {};
          for (var key in params)
            d[key] = params[key];
          d.Range = "bytes=" + offset + "-" + (length ? length : "");
          return client.getObject(d).createReadStream();
        }
      };
      return directory2(source, options);
    },
    custom: function(source, options) {
      return directory2(source, options);
    }
  };
  return Open;
}
var hasRequiredUnzip;
function requireUnzip() {
  if (hasRequiredUnzip) return unzip$1;
  hasRequiredUnzip = 1;
  requireListenercount();
  requireBufferIndexofPolyfill();
  requireSetImmediate();
  unzip$1.Parse = requireParse();
  unzip$1.ParseOne = requireParseOne();
  unzip$1.Extract = requireExtract();
  unzip$1.Open = requireOpen();
  return unzip$1;
}
export {
  requireUnzip as r
};
