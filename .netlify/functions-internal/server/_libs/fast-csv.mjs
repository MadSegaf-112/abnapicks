import { r as requireSrc$1 } from "./fast-csv__format.mjs";
import { r as requireSrc$2 } from "./@fast-csv/parse.mjs";
var src = {};
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CsvParserStream = exports.ParserOptions = exports.parseFile = exports.parseStream = exports.parseString = exports.parse = exports.FormatterOptions = exports.CsvFormatterStream = exports.writeToPath = exports.writeToString = exports.writeToBuffer = exports.writeToStream = exports.write = exports.format = void 0;
    var format_1 = requireSrc$1();
    Object.defineProperty(exports, "format", { enumerable: true, get: function() {
      return format_1.format;
    } });
    Object.defineProperty(exports, "write", { enumerable: true, get: function() {
      return format_1.write;
    } });
    Object.defineProperty(exports, "writeToStream", { enumerable: true, get: function() {
      return format_1.writeToStream;
    } });
    Object.defineProperty(exports, "writeToBuffer", { enumerable: true, get: function() {
      return format_1.writeToBuffer;
    } });
    Object.defineProperty(exports, "writeToString", { enumerable: true, get: function() {
      return format_1.writeToString;
    } });
    Object.defineProperty(exports, "writeToPath", { enumerable: true, get: function() {
      return format_1.writeToPath;
    } });
    Object.defineProperty(exports, "CsvFormatterStream", { enumerable: true, get: function() {
      return format_1.CsvFormatterStream;
    } });
    Object.defineProperty(exports, "FormatterOptions", { enumerable: true, get: function() {
      return format_1.FormatterOptions;
    } });
    var parse_1 = requireSrc$2();
    Object.defineProperty(exports, "parse", { enumerable: true, get: function() {
      return parse_1.parse;
    } });
    Object.defineProperty(exports, "parseString", { enumerable: true, get: function() {
      return parse_1.parseString;
    } });
    Object.defineProperty(exports, "parseStream", { enumerable: true, get: function() {
      return parse_1.parseStream;
    } });
    Object.defineProperty(exports, "parseFile", { enumerable: true, get: function() {
      return parse_1.parseFile;
    } });
    Object.defineProperty(exports, "ParserOptions", { enumerable: true, get: function() {
      return parse_1.ParserOptions;
    } });
    Object.defineProperty(exports, "CsvParserStream", { enumerable: true, get: function() {
      return parse_1.CsvParserStream;
    } });
  })(src);
  return src;
}
export {
  requireSrc as r
};
