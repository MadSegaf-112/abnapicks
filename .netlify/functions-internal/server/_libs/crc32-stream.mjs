import require$$0 from "zlib";
import { r as requireReadable } from "./readable-stream.mjs";
import { r as requireCrc32 } from "./crc-32.mjs";
var crc32Stream;
var hasRequiredCrc32Stream;
function requireCrc32Stream() {
  if (hasRequiredCrc32Stream) return crc32Stream;
  hasRequiredCrc32Stream = 1;
  const { Transform } = requireReadable();
  const crc32 = requireCrc32();
  class CRC32Stream extends Transform {
    constructor(options) {
      super(options);
      this.checksum = Buffer.allocUnsafe(4);
      this.checksum.writeInt32BE(0, 0);
      this.rawSize = 0;
    }
    _transform(chunk, encoding, callback) {
      if (chunk) {
        this.checksum = crc32.buf(chunk, this.checksum) >>> 0;
        this.rawSize += chunk.length;
      }
      callback(null, chunk);
    }
    digest(encoding) {
      const checksum = Buffer.allocUnsafe(4);
      checksum.writeUInt32BE(this.checksum >>> 0, 0);
      return encoding ? checksum.toString(encoding) : checksum;
    }
    hex() {
      return this.digest("hex").toUpperCase();
    }
    size() {
      return this.rawSize;
    }
  }
  crc32Stream = CRC32Stream;
  return crc32Stream;
}
var deflateCrc32Stream;
var hasRequiredDeflateCrc32Stream;
function requireDeflateCrc32Stream() {
  if (hasRequiredDeflateCrc32Stream) return deflateCrc32Stream;
  hasRequiredDeflateCrc32Stream = 1;
  const { DeflateRaw } = require$$0;
  const crc32 = requireCrc32();
  class DeflateCRC32Stream extends DeflateRaw {
    constructor(options) {
      super(options);
      this.checksum = Buffer.allocUnsafe(4);
      this.checksum.writeInt32BE(0, 0);
      this.rawSize = 0;
      this.compressedSize = 0;
    }
    push(chunk, encoding) {
      if (chunk) {
        this.compressedSize += chunk.length;
      }
      return super.push(chunk, encoding);
    }
    _transform(chunk, encoding, callback) {
      if (chunk) {
        this.checksum = crc32.buf(chunk, this.checksum) >>> 0;
        this.rawSize += chunk.length;
      }
      super._transform(chunk, encoding, callback);
    }
    digest(encoding) {
      const checksum = Buffer.allocUnsafe(4);
      checksum.writeUInt32BE(this.checksum >>> 0, 0);
      return encoding ? checksum.toString(encoding) : checksum;
    }
    hex() {
      return this.digest("hex").toUpperCase();
    }
    size(compressed = false) {
      if (compressed) {
        return this.compressedSize;
      } else {
        return this.rawSize;
      }
    }
  }
  deflateCrc32Stream = DeflateCRC32Stream;
  return deflateCrc32Stream;
}
var lib;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  lib = {
    CRC32Stream: requireCrc32Stream(),
    DeflateCRC32Stream: requireDeflateCrc32Stream()
  };
  return lib;
}
export {
  requireLib as r
};
