import require$$0$2 from "util";
import require$$0 from "stream";
import require$$0$1 from "fs";
import { r as requireLodash_isfunction } from "./lodash.isfunction.mjs";
import { r as requireLodash_isequal } from "./lodash.isequal.mjs";
import { r as requireLodash_isboolean } from "./lodash.isboolean.mjs";
import { r as requireLodash_isnil } from "./lodash.isnil.mjs";
import { r as requireLodash_escaperegexp } from "./lodash.escaperegexp.mjs";
var src = {};
var FormatterOptions = {};
var hasRequiredFormatterOptions;
function requireFormatterOptions() {
  if (hasRequiredFormatterOptions) return FormatterOptions;
  hasRequiredFormatterOptions = 1;
  Object.defineProperty(FormatterOptions, "__esModule", { value: true });
  FormatterOptions.FormatterOptions = void 0;
  let FormatterOptions$1 = class FormatterOptions {
    constructor(opts = {}) {
      var _a;
      this.objectMode = true;
      this.delimiter = ",";
      this.rowDelimiter = "\n";
      this.quote = '"';
      this.escape = this.quote;
      this.quoteColumns = false;
      this.quoteHeaders = this.quoteColumns;
      this.headers = null;
      this.includeEndRowDelimiter = false;
      this.writeBOM = false;
      this.BOM = "\uFEFF";
      this.alwaysWriteHeaders = false;
      Object.assign(this, opts || {});
      if (typeof (opts === null || opts === void 0 ? void 0 : opts.quoteHeaders) === "undefined") {
        this.quoteHeaders = this.quoteColumns;
      }
      if ((opts === null || opts === void 0 ? void 0 : opts.quote) === true) {
        this.quote = '"';
      } else if ((opts === null || opts === void 0 ? void 0 : opts.quote) === false) {
        this.quote = "";
      }
      if (typeof (opts === null || opts === void 0 ? void 0 : opts.escape) !== "string") {
        this.escape = this.quote;
      }
      this.shouldWriteHeaders = !!this.headers && ((_a = opts.writeHeaders) !== null && _a !== void 0 ? _a : true);
      this.headers = Array.isArray(this.headers) ? this.headers : null;
      this.escapedQuote = `${this.escape}${this.quote}`;
    }
  };
  FormatterOptions.FormatterOptions = FormatterOptions$1;
  return FormatterOptions;
}
var CsvFormatterStream = {};
var formatter = {};
var RowFormatter = {};
var FieldFormatter = {};
var hasRequiredFieldFormatter;
function requireFieldFormatter() {
  if (hasRequiredFieldFormatter) return FieldFormatter;
  hasRequiredFieldFormatter = 1;
  var __importDefault = FieldFormatter && FieldFormatter.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(FieldFormatter, "__esModule", { value: true });
  FieldFormatter.FieldFormatter = void 0;
  const lodash_isboolean_1 = __importDefault(requireLodash_isboolean());
  const lodash_isnil_1 = __importDefault(requireLodash_isnil());
  const lodash_escaperegexp_1 = __importDefault(requireLodash_escaperegexp());
  let FieldFormatter$1 = class FieldFormatter {
    constructor(formatterOptions) {
      this._headers = null;
      this.formatterOptions = formatterOptions;
      if (formatterOptions.headers !== null) {
        this.headers = formatterOptions.headers;
      }
      this.REPLACE_REGEXP = new RegExp(formatterOptions.quote, "g");
      const escapePattern = `[${formatterOptions.delimiter}${lodash_escaperegexp_1.default(formatterOptions.rowDelimiter)}|\r|
]`;
      this.ESCAPE_REGEXP = new RegExp(escapePattern);
    }
    set headers(headers) {
      this._headers = headers;
    }
    shouldQuote(fieldIndex, isHeader) {
      const quoteConfig = isHeader ? this.formatterOptions.quoteHeaders : this.formatterOptions.quoteColumns;
      if (lodash_isboolean_1.default(quoteConfig)) {
        return quoteConfig;
      }
      if (Array.isArray(quoteConfig)) {
        return quoteConfig[fieldIndex];
      }
      if (this._headers !== null) {
        return quoteConfig[this._headers[fieldIndex]];
      }
      return false;
    }
    format(field, fieldIndex, isHeader) {
      const preparedField = `${lodash_isnil_1.default(field) ? "" : field}`.replace(/\0/g, "");
      const { formatterOptions } = this;
      if (formatterOptions.quote !== "") {
        const shouldEscape = preparedField.indexOf(formatterOptions.quote) !== -1;
        if (shouldEscape) {
          return this.quoteField(preparedField.replace(this.REPLACE_REGEXP, formatterOptions.escapedQuote));
        }
      }
      const hasEscapeCharacters = preparedField.search(this.ESCAPE_REGEXP) !== -1;
      if (hasEscapeCharacters || this.shouldQuote(fieldIndex, isHeader)) {
        return this.quoteField(preparedField);
      }
      return preparedField;
    }
    quoteField(field) {
      const { quote } = this.formatterOptions;
      return `${quote}${field}${quote}`;
    }
  };
  FieldFormatter.FieldFormatter = FieldFormatter$1;
  return FieldFormatter;
}
var types = {};
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  Object.defineProperty(types, "__esModule", { value: true });
  types.isSyncTransform = void 0;
  types.isSyncTransform = (transform) => transform.length === 1;
  return types;
}
var hasRequiredRowFormatter;
function requireRowFormatter() {
  if (hasRequiredRowFormatter) return RowFormatter;
  hasRequiredRowFormatter = 1;
  var __importDefault = RowFormatter && RowFormatter.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(RowFormatter, "__esModule", { value: true });
  RowFormatter.RowFormatter = void 0;
  const lodash_isfunction_1 = __importDefault(requireLodash_isfunction());
  const lodash_isequal_1 = __importDefault(requireLodash_isequal());
  const FieldFormatter_1 = requireFieldFormatter();
  const types_1 = requireTypes();
  let RowFormatter$1 = class RowFormatter2 {
    constructor(formatterOptions) {
      this.rowCount = 0;
      this.formatterOptions = formatterOptions;
      this.fieldFormatter = new FieldFormatter_1.FieldFormatter(formatterOptions);
      this.headers = formatterOptions.headers;
      this.shouldWriteHeaders = formatterOptions.shouldWriteHeaders;
      this.hasWrittenHeaders = false;
      if (this.headers !== null) {
        this.fieldFormatter.headers = this.headers;
      }
      if (formatterOptions.transform) {
        this.rowTransform = formatterOptions.transform;
      }
    }
    static isRowHashArray(row) {
      if (Array.isArray(row)) {
        return Array.isArray(row[0]) && row[0].length === 2;
      }
      return false;
    }
    static isRowArray(row) {
      return Array.isArray(row) && !this.isRowHashArray(row);
    }
    // get headers from a row item
    static gatherHeaders(row) {
      if (RowFormatter2.isRowHashArray(row)) {
        return row.map((it) => it[0]);
      }
      if (Array.isArray(row)) {
        return row;
      }
      return Object.keys(row);
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static createTransform(transformFunction) {
      if (types_1.isSyncTransform(transformFunction)) {
        return (row, cb) => {
          let transformedRow = null;
          try {
            transformedRow = transformFunction(row);
          } catch (e) {
            return cb(e);
          }
          return cb(null, transformedRow);
        };
      }
      return (row, cb) => {
        transformFunction(row, cb);
      };
    }
    set rowTransform(transformFunction) {
      if (!lodash_isfunction_1.default(transformFunction)) {
        throw new TypeError("The transform should be a function");
      }
      this._rowTransform = RowFormatter2.createTransform(transformFunction);
    }
    format(row, cb) {
      this.callTransformer(row, (err, transformedRow) => {
        if (err) {
          return cb(err);
        }
        if (!row) {
          return cb(null);
        }
        const rows = [];
        if (transformedRow) {
          const { shouldFormatColumns, headers } = this.checkHeaders(transformedRow);
          if (this.shouldWriteHeaders && headers && !this.hasWrittenHeaders) {
            rows.push(this.formatColumns(headers, true));
            this.hasWrittenHeaders = true;
          }
          if (shouldFormatColumns) {
            const columns = this.gatherColumns(transformedRow);
            rows.push(this.formatColumns(columns, false));
          }
        }
        return cb(null, rows);
      });
    }
    finish(cb) {
      const rows = [];
      if (this.formatterOptions.alwaysWriteHeaders && this.rowCount === 0) {
        if (!this.headers) {
          return cb(new Error("`alwaysWriteHeaders` option is set to true but `headers` option not provided."));
        }
        rows.push(this.formatColumns(this.headers, true));
      }
      if (this.formatterOptions.includeEndRowDelimiter) {
        rows.push(this.formatterOptions.rowDelimiter);
      }
      return cb(null, rows);
    }
    // check if we need to write header return true if we should also write a row
    // could be false if headers is true and the header row(first item) is passed in
    checkHeaders(row) {
      if (this.headers) {
        return { shouldFormatColumns: true, headers: this.headers };
      }
      const headers = RowFormatter2.gatherHeaders(row);
      this.headers = headers;
      this.fieldFormatter.headers = headers;
      if (!this.shouldWriteHeaders) {
        return { shouldFormatColumns: true, headers: null };
      }
      return { shouldFormatColumns: !lodash_isequal_1.default(headers, row), headers };
    }
    // todo change this method to unknown[]
    gatherColumns(row) {
      if (this.headers === null) {
        throw new Error("Headers is currently null");
      }
      if (!Array.isArray(row)) {
        return this.headers.map((header) => row[header]);
      }
      if (RowFormatter2.isRowHashArray(row)) {
        return this.headers.map((header, i) => {
          const col = row[i];
          if (col) {
            return col[1];
          }
          return "";
        });
      }
      if (RowFormatter2.isRowArray(row) && !this.shouldWriteHeaders) {
        return row;
      }
      return this.headers.map((header, i) => row[i]);
    }
    callTransformer(row, cb) {
      if (!this._rowTransform) {
        return cb(null, row);
      }
      return this._rowTransform(row, cb);
    }
    formatColumns(columns, isHeadersRow) {
      const formattedCols = columns.map((field, i) => this.fieldFormatter.format(field, i, isHeadersRow)).join(this.formatterOptions.delimiter);
      const { rowCount } = this;
      this.rowCount += 1;
      if (rowCount) {
        return [this.formatterOptions.rowDelimiter, formattedCols].join("");
      }
      return formattedCols;
    }
  };
  RowFormatter.RowFormatter = RowFormatter$1;
  return RowFormatter;
}
var hasRequiredFormatter;
function requireFormatter() {
  if (hasRequiredFormatter) return formatter;
  hasRequiredFormatter = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FieldFormatter = exports.RowFormatter = void 0;
    var RowFormatter_1 = requireRowFormatter();
    Object.defineProperty(exports, "RowFormatter", { enumerable: true, get: function() {
      return RowFormatter_1.RowFormatter;
    } });
    var FieldFormatter_1 = requireFieldFormatter();
    Object.defineProperty(exports, "FieldFormatter", { enumerable: true, get: function() {
      return FieldFormatter_1.FieldFormatter;
    } });
  })(formatter);
  return formatter;
}
var hasRequiredCsvFormatterStream;
function requireCsvFormatterStream() {
  if (hasRequiredCsvFormatterStream) return CsvFormatterStream;
  hasRequiredCsvFormatterStream = 1;
  Object.defineProperty(CsvFormatterStream, "__esModule", { value: true });
  CsvFormatterStream.CsvFormatterStream = void 0;
  const stream_1 = require$$0;
  const formatter_1 = requireFormatter();
  let CsvFormatterStream$1 = class CsvFormatterStream extends stream_1.Transform {
    constructor(formatterOptions) {
      super({ writableObjectMode: formatterOptions.objectMode });
      this.hasWrittenBOM = false;
      this.formatterOptions = formatterOptions;
      this.rowFormatter = new formatter_1.RowFormatter(formatterOptions);
      this.hasWrittenBOM = !formatterOptions.writeBOM;
    }
    transform(transformFunction) {
      this.rowFormatter.rowTransform = transformFunction;
      return this;
    }
    _transform(row, encoding, cb) {
      let cbCalled = false;
      try {
        if (!this.hasWrittenBOM) {
          this.push(this.formatterOptions.BOM);
          this.hasWrittenBOM = true;
        }
        this.rowFormatter.format(row, (err, rows) => {
          if (err) {
            cbCalled = true;
            return cb(err);
          }
          if (rows) {
            rows.forEach((r) => {
              this.push(Buffer.from(r, "utf8"));
            });
          }
          cbCalled = true;
          return cb();
        });
      } catch (e) {
        if (cbCalled) {
          throw e;
        }
        cb(e);
      }
    }
    _flush(cb) {
      this.rowFormatter.finish((err, rows) => {
        if (err) {
          return cb(err);
        }
        if (rows) {
          rows.forEach((r) => {
            this.push(Buffer.from(r, "utf8"));
          });
        }
        return cb();
      });
    }
  };
  CsvFormatterStream.CsvFormatterStream = CsvFormatterStream$1;
  return CsvFormatterStream;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    var __createBinding = src && src.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = src && src.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = src && src.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = src && src.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.writeToPath = exports.writeToString = exports.writeToBuffer = exports.writeToStream = exports.write = exports.format = exports.FormatterOptions = exports.CsvFormatterStream = void 0;
    const util_1 = require$$0$2;
    const stream_1 = require$$0;
    const fs = __importStar(require$$0$1);
    const FormatterOptions_1 = requireFormatterOptions();
    const CsvFormatterStream_1 = requireCsvFormatterStream();
    __exportStar(requireTypes(), exports);
    var CsvFormatterStream_2 = requireCsvFormatterStream();
    Object.defineProperty(exports, "CsvFormatterStream", { enumerable: true, get: function() {
      return CsvFormatterStream_2.CsvFormatterStream;
    } });
    var FormatterOptions_2 = requireFormatterOptions();
    Object.defineProperty(exports, "FormatterOptions", { enumerable: true, get: function() {
      return FormatterOptions_2.FormatterOptions;
    } });
    exports.format = (options) => new CsvFormatterStream_1.CsvFormatterStream(new FormatterOptions_1.FormatterOptions(options));
    exports.write = (rows, options) => {
      const csvStream = exports.format(options);
      const promiseWrite = util_1.promisify((row, cb) => {
        csvStream.write(row, void 0, cb);
      });
      rows.reduce((prev, row) => prev.then(() => promiseWrite(row)), Promise.resolve()).then(() => csvStream.end()).catch((err) => {
        csvStream.emit("error", err);
      });
      return csvStream;
    };
    exports.writeToStream = (ws, rows, options) => exports.write(rows, options).pipe(ws);
    exports.writeToBuffer = (rows, opts = {}) => {
      const buffers = [];
      const ws = new stream_1.Writable({
        write(data, enc, writeCb) {
          buffers.push(data);
          writeCb();
        }
      });
      return new Promise((res, rej) => {
        ws.on("error", rej).on("finish", () => res(Buffer.concat(buffers)));
        exports.write(rows, opts).pipe(ws);
      });
    };
    exports.writeToString = (rows, options) => exports.writeToBuffer(rows, options).then((buffer) => buffer.toString());
    exports.writeToPath = (path, rows, options) => {
      const stream = fs.createWriteStream(path, { encoding: "utf8" });
      return exports.write(rows, options).pipe(stream);
    };
  })(src);
  return src;
}
export {
  requireSrc as r
};
