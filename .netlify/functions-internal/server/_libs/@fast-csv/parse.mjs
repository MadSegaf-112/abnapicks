import require$$0$1 from "string_decoder";
import require$$0$2 from "fs";
import require$$0 from "stream";
import { r as requireLodash_escaperegexp } from "../lodash.escaperegexp.mjs";
import { r as requireLodash_isnil } from "../lodash.isnil.mjs";
import { r as requireLodash_isfunction } from "../lodash.isfunction.mjs";
import { r as requireLodash_isundefined } from "../lodash.isundefined.mjs";
import { r as requireLodash_uniq } from "../lodash.uniq.mjs";
import { r as requireLodash_groupby } from "../lodash.groupby.mjs";
var src = {};
var ParserOptions = {};
var hasRequiredParserOptions;
function requireParserOptions() {
  if (hasRequiredParserOptions) return ParserOptions;
  hasRequiredParserOptions = 1;
  var __importDefault = ParserOptions && ParserOptions.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(ParserOptions, "__esModule", { value: true });
  ParserOptions.ParserOptions = void 0;
  const lodash_escaperegexp_1 = __importDefault(requireLodash_escaperegexp());
  const lodash_isnil_1 = __importDefault(requireLodash_isnil());
  let ParserOptions$1 = class ParserOptions {
    constructor(opts) {
      var _a;
      this.objectMode = true;
      this.delimiter = ",";
      this.ignoreEmpty = false;
      this.quote = '"';
      this.escape = null;
      this.escapeChar = this.quote;
      this.comment = null;
      this.supportsComments = false;
      this.ltrim = false;
      this.rtrim = false;
      this.trim = false;
      this.headers = null;
      this.renameHeaders = false;
      this.strictColumnHandling = false;
      this.discardUnmappedColumns = false;
      this.carriageReturn = "\r";
      this.encoding = "utf8";
      this.limitRows = false;
      this.maxRows = 0;
      this.skipLines = 0;
      this.skipRows = 0;
      Object.assign(this, opts || {});
      if (this.delimiter.length > 1) {
        throw new Error("delimiter option must be one character long");
      }
      this.escapedDelimiter = lodash_escaperegexp_1.default(this.delimiter);
      this.escapeChar = (_a = this.escape) !== null && _a !== void 0 ? _a : this.quote;
      this.supportsComments = !lodash_isnil_1.default(this.comment);
      this.NEXT_TOKEN_REGEXP = new RegExp(`([^\\s]|\\r\\n|\\n|\\r|${this.escapedDelimiter})`);
      if (this.maxRows > 0) {
        this.limitRows = true;
      }
    }
  };
  ParserOptions.ParserOptions = ParserOptions$1;
  return ParserOptions;
}
var CsvParserStream = {};
var transforms = {};
var RowTransformerValidator = {};
var types = {};
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  Object.defineProperty(types, "__esModule", { value: true });
  types.isSyncValidate = types.isSyncTransform = void 0;
  types.isSyncTransform = (transform) => transform.length === 1;
  types.isSyncValidate = (validate) => validate.length === 1;
  return types;
}
var hasRequiredRowTransformerValidator;
function requireRowTransformerValidator() {
  if (hasRequiredRowTransformerValidator) return RowTransformerValidator;
  hasRequiredRowTransformerValidator = 1;
  var __importDefault = RowTransformerValidator && RowTransformerValidator.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(RowTransformerValidator, "__esModule", { value: true });
  RowTransformerValidator.RowTransformerValidator = void 0;
  const lodash_isfunction_1 = __importDefault(requireLodash_isfunction());
  const types_1 = requireTypes();
  let RowTransformerValidator$1 = class RowTransformerValidator2 {
    constructor() {
      this._rowTransform = null;
      this._rowValidator = null;
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static createTransform(transformFunction) {
      if (types_1.isSyncTransform(transformFunction)) {
        return (row, cb) => {
          let transformed = null;
          try {
            transformed = transformFunction(row);
          } catch (e) {
            return cb(e);
          }
          return cb(null, transformed);
        };
      }
      return transformFunction;
    }
    static createValidator(validateFunction) {
      if (types_1.isSyncValidate(validateFunction)) {
        return (row, cb) => {
          cb(null, { row, isValid: validateFunction(row) });
        };
      }
      return (row, cb) => {
        validateFunction(row, (err, isValid, reason) => {
          if (err) {
            return cb(err);
          }
          if (isValid) {
            return cb(null, { row, isValid, reason });
          }
          return cb(null, { row, isValid: false, reason });
        });
      };
    }
    set rowTransform(transformFunction) {
      if (!lodash_isfunction_1.default(transformFunction)) {
        throw new TypeError("The transform should be a function");
      }
      this._rowTransform = RowTransformerValidator2.createTransform(transformFunction);
    }
    set rowValidator(validateFunction) {
      if (!lodash_isfunction_1.default(validateFunction)) {
        throw new TypeError("The validate should be a function");
      }
      this._rowValidator = RowTransformerValidator2.createValidator(validateFunction);
    }
    transformAndValidate(row, cb) {
      return this.callTransformer(row, (transformErr, transformedRow) => {
        if (transformErr) {
          return cb(transformErr);
        }
        if (!transformedRow) {
          return cb(null, { row: null, isValid: true });
        }
        return this.callValidator(transformedRow, (validateErr, validationResult) => {
          if (validateErr) {
            return cb(validateErr);
          }
          if (validationResult && !validationResult.isValid) {
            return cb(null, { row: transformedRow, isValid: false, reason: validationResult.reason });
          }
          return cb(null, { row: transformedRow, isValid: true });
        });
      });
    }
    callTransformer(row, cb) {
      if (!this._rowTransform) {
        return cb(null, row);
      }
      return this._rowTransform(row, cb);
    }
    callValidator(row, cb) {
      if (!this._rowValidator) {
        return cb(null, { row, isValid: true });
      }
      return this._rowValidator(row, cb);
    }
  };
  RowTransformerValidator.RowTransformerValidator = RowTransformerValidator$1;
  return RowTransformerValidator;
}
var HeaderTransformer = {};
var hasRequiredHeaderTransformer;
function requireHeaderTransformer() {
  if (hasRequiredHeaderTransformer) return HeaderTransformer;
  hasRequiredHeaderTransformer = 1;
  var __importDefault = HeaderTransformer && HeaderTransformer.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(HeaderTransformer, "__esModule", { value: true });
  HeaderTransformer.HeaderTransformer = void 0;
  const lodash_isundefined_1 = __importDefault(requireLodash_isundefined());
  const lodash_isfunction_1 = __importDefault(requireLodash_isfunction());
  const lodash_uniq_1 = __importDefault(requireLodash_uniq());
  const lodash_groupby_1 = __importDefault(requireLodash_groupby());
  let HeaderTransformer$1 = class HeaderTransformer {
    constructor(parserOptions) {
      this.headers = null;
      this.receivedHeaders = false;
      this.shouldUseFirstRow = false;
      this.processedFirstRow = false;
      this.headersLength = 0;
      this.parserOptions = parserOptions;
      if (parserOptions.headers === true) {
        this.shouldUseFirstRow = true;
      } else if (Array.isArray(parserOptions.headers)) {
        this.setHeaders(parserOptions.headers);
      } else if (lodash_isfunction_1.default(parserOptions.headers)) {
        this.headersTransform = parserOptions.headers;
      }
    }
    transform(row, cb) {
      if (!this.shouldMapRow(row)) {
        return cb(null, { row: null, isValid: true });
      }
      return cb(null, this.processRow(row));
    }
    shouldMapRow(row) {
      const { parserOptions } = this;
      if (!this.headersTransform && parserOptions.renameHeaders && !this.processedFirstRow) {
        if (!this.receivedHeaders) {
          throw new Error("Error renaming headers: new headers must be provided in an array");
        }
        this.processedFirstRow = true;
        return false;
      }
      if (!this.receivedHeaders && Array.isArray(row)) {
        if (this.headersTransform) {
          this.setHeaders(this.headersTransform(row));
        } else if (this.shouldUseFirstRow) {
          this.setHeaders(row);
        } else {
          return true;
        }
        return false;
      }
      return true;
    }
    processRow(row) {
      if (!this.headers) {
        return { row, isValid: true };
      }
      const { parserOptions } = this;
      if (!parserOptions.discardUnmappedColumns && row.length > this.headersLength) {
        if (!parserOptions.strictColumnHandling) {
          throw new Error(`Unexpected Error: column header mismatch expected: ${this.headersLength} columns got: ${row.length}`);
        }
        return {
          row,
          isValid: false,
          reason: `Column header mismatch expected: ${this.headersLength} columns got: ${row.length}`
        };
      }
      if (parserOptions.strictColumnHandling && row.length < this.headersLength) {
        return {
          row,
          isValid: false,
          reason: `Column header mismatch expected: ${this.headersLength} columns got: ${row.length}`
        };
      }
      return { row: this.mapHeaders(row), isValid: true };
    }
    mapHeaders(row) {
      const rowMap = {};
      const { headers, headersLength } = this;
      for (let i = 0; i < headersLength; i += 1) {
        const header = headers[i];
        if (!lodash_isundefined_1.default(header)) {
          const val = row[i];
          if (lodash_isundefined_1.default(val)) {
            rowMap[header] = "";
          } else {
            rowMap[header] = val;
          }
        }
      }
      return rowMap;
    }
    setHeaders(headers) {
      var _a;
      const filteredHeaders = headers.filter((h) => !!h);
      if (lodash_uniq_1.default(filteredHeaders).length !== filteredHeaders.length) {
        const grouped = lodash_groupby_1.default(filteredHeaders);
        const duplicates = Object.keys(grouped).filter((dup) => grouped[dup].length > 1);
        throw new Error(`Duplicate headers found ${JSON.stringify(duplicates)}`);
      }
      this.headers = headers;
      this.receivedHeaders = true;
      this.headersLength = ((_a = this.headers) === null || _a === void 0 ? void 0 : _a.length) || 0;
    }
  };
  HeaderTransformer.HeaderTransformer = HeaderTransformer$1;
  return HeaderTransformer;
}
var hasRequiredTransforms;
function requireTransforms() {
  if (hasRequiredTransforms) return transforms;
  hasRequiredTransforms = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeaderTransformer = exports.RowTransformerValidator = void 0;
    var RowTransformerValidator_1 = requireRowTransformerValidator();
    Object.defineProperty(exports, "RowTransformerValidator", { enumerable: true, get: function() {
      return RowTransformerValidator_1.RowTransformerValidator;
    } });
    var HeaderTransformer_1 = requireHeaderTransformer();
    Object.defineProperty(exports, "HeaderTransformer", { enumerable: true, get: function() {
      return HeaderTransformer_1.HeaderTransformer;
    } });
  })(transforms);
  return transforms;
}
var parser = {};
var Parser = {};
var Scanner = {};
var Token = {};
var hasRequiredToken;
function requireToken() {
  if (hasRequiredToken) return Token;
  hasRequiredToken = 1;
  Object.defineProperty(Token, "__esModule", { value: true });
  Token.Token = void 0;
  let Token$1 = class Token {
    constructor(tokenArgs) {
      this.token = tokenArgs.token;
      this.startCursor = tokenArgs.startCursor;
      this.endCursor = tokenArgs.endCursor;
    }
    static isTokenRowDelimiter(token) {
      const content = token.token;
      return content === "\r" || content === "\n" || content === "\r\n";
    }
    static isTokenCarriageReturn(token, parserOptions) {
      return token.token === parserOptions.carriageReturn;
    }
    static isTokenComment(token, parserOptions) {
      return parserOptions.supportsComments && !!token && token.token === parserOptions.comment;
    }
    static isTokenEscapeCharacter(token, parserOptions) {
      return token.token === parserOptions.escapeChar;
    }
    static isTokenQuote(token, parserOptions) {
      return token.token === parserOptions.quote;
    }
    static isTokenDelimiter(token, parserOptions) {
      return token.token === parserOptions.delimiter;
    }
  };
  Token.Token = Token$1;
  return Token;
}
var hasRequiredScanner;
function requireScanner() {
  if (hasRequiredScanner) return Scanner;
  hasRequiredScanner = 1;
  Object.defineProperty(Scanner, "__esModule", { value: true });
  Scanner.Scanner = void 0;
  const Token_1 = requireToken();
  const ROW_DELIMITER = /((?:\r\n)|\n|\r)/;
  let Scanner$1 = class Scanner {
    constructor(args) {
      this.cursor = 0;
      this.line = args.line;
      this.lineLength = this.line.length;
      this.parserOptions = args.parserOptions;
      this.hasMoreData = args.hasMoreData;
      this.cursor = args.cursor || 0;
    }
    get hasMoreCharacters() {
      return this.lineLength > this.cursor;
    }
    get nextNonSpaceToken() {
      const { lineFromCursor } = this;
      const regex = this.parserOptions.NEXT_TOKEN_REGEXP;
      if (lineFromCursor.search(regex) === -1) {
        return null;
      }
      const match = regex.exec(lineFromCursor);
      if (match == null) {
        return null;
      }
      const token = match[1];
      const startCursor = this.cursor + (match.index || 0);
      return new Token_1.Token({
        token,
        startCursor,
        endCursor: startCursor + token.length - 1
      });
    }
    get nextCharacterToken() {
      const { cursor, lineLength } = this;
      if (lineLength <= cursor) {
        return null;
      }
      return new Token_1.Token({
        token: this.line[cursor],
        startCursor: cursor,
        endCursor: cursor
      });
    }
    get lineFromCursor() {
      return this.line.substr(this.cursor);
    }
    advancePastLine() {
      const match = ROW_DELIMITER.exec(this.lineFromCursor);
      if (!match) {
        if (this.hasMoreData) {
          return null;
        }
        this.cursor = this.lineLength;
        return this;
      }
      this.cursor += (match.index || 0) + match[0].length;
      return this;
    }
    advanceTo(cursor) {
      this.cursor = cursor;
      return this;
    }
    advanceToToken(token) {
      this.cursor = token.startCursor;
      return this;
    }
    advancePastToken(token) {
      this.cursor = token.endCursor + 1;
      return this;
    }
    truncateToCursor() {
      this.line = this.lineFromCursor;
      this.lineLength = this.line.length;
      this.cursor = 0;
      return this;
    }
  };
  Scanner.Scanner = Scanner$1;
  return Scanner;
}
var RowParser = {};
var column = {};
var ColumnParser = {};
var NonQuotedColumnParser = {};
var ColumnFormatter = {};
var hasRequiredColumnFormatter;
function requireColumnFormatter() {
  if (hasRequiredColumnFormatter) return ColumnFormatter;
  hasRequiredColumnFormatter = 1;
  Object.defineProperty(ColumnFormatter, "__esModule", { value: true });
  ColumnFormatter.ColumnFormatter = void 0;
  let ColumnFormatter$1 = class ColumnFormatter {
    constructor(parserOptions) {
      if (parserOptions.trim) {
        this.format = (col) => col.trim();
      } else if (parserOptions.ltrim) {
        this.format = (col) => col.trimLeft();
      } else if (parserOptions.rtrim) {
        this.format = (col) => col.trimRight();
      } else {
        this.format = (col) => col;
      }
    }
  };
  ColumnFormatter.ColumnFormatter = ColumnFormatter$1;
  return ColumnFormatter;
}
var hasRequiredNonQuotedColumnParser;
function requireNonQuotedColumnParser() {
  if (hasRequiredNonQuotedColumnParser) return NonQuotedColumnParser;
  hasRequiredNonQuotedColumnParser = 1;
  Object.defineProperty(NonQuotedColumnParser, "__esModule", { value: true });
  NonQuotedColumnParser.NonQuotedColumnParser = void 0;
  const ColumnFormatter_1 = requireColumnFormatter();
  const Token_1 = requireToken();
  let NonQuotedColumnParser$1 = class NonQuotedColumnParser {
    constructor(parserOptions) {
      this.parserOptions = parserOptions;
      this.columnFormatter = new ColumnFormatter_1.ColumnFormatter(parserOptions);
    }
    parse(scanner) {
      if (!scanner.hasMoreCharacters) {
        return null;
      }
      const { parserOptions } = this;
      const characters = [];
      let nextToken = scanner.nextCharacterToken;
      for (; nextToken; nextToken = scanner.nextCharacterToken) {
        if (Token_1.Token.isTokenDelimiter(nextToken, parserOptions) || Token_1.Token.isTokenRowDelimiter(nextToken)) {
          break;
        }
        characters.push(nextToken.token);
        scanner.advancePastToken(nextToken);
      }
      return this.columnFormatter.format(characters.join(""));
    }
  };
  NonQuotedColumnParser.NonQuotedColumnParser = NonQuotedColumnParser$1;
  return NonQuotedColumnParser;
}
var QuotedColumnParser = {};
var hasRequiredQuotedColumnParser;
function requireQuotedColumnParser() {
  if (hasRequiredQuotedColumnParser) return QuotedColumnParser;
  hasRequiredQuotedColumnParser = 1;
  Object.defineProperty(QuotedColumnParser, "__esModule", { value: true });
  QuotedColumnParser.QuotedColumnParser = void 0;
  const ColumnFormatter_1 = requireColumnFormatter();
  const Token_1 = requireToken();
  let QuotedColumnParser$1 = class QuotedColumnParser {
    constructor(parserOptions) {
      this.parserOptions = parserOptions;
      this.columnFormatter = new ColumnFormatter_1.ColumnFormatter(parserOptions);
    }
    parse(scanner) {
      if (!scanner.hasMoreCharacters) {
        return null;
      }
      const originalCursor = scanner.cursor;
      const { foundClosingQuote, col } = this.gatherDataBetweenQuotes(scanner);
      if (!foundClosingQuote) {
        scanner.advanceTo(originalCursor);
        if (!scanner.hasMoreData) {
          throw new Error(`Parse Error: missing closing: '${this.parserOptions.quote || ""}' in line: at '${scanner.lineFromCursor.replace(/[\r\n]/g, "\\n'")}'`);
        }
        return null;
      }
      this.checkForMalformedColumn(scanner);
      return col;
    }
    gatherDataBetweenQuotes(scanner) {
      const { parserOptions } = this;
      let foundStartingQuote = false;
      let foundClosingQuote = false;
      const characters = [];
      let nextToken = scanner.nextCharacterToken;
      for (; !foundClosingQuote && nextToken !== null; nextToken = scanner.nextCharacterToken) {
        const isQuote = Token_1.Token.isTokenQuote(nextToken, parserOptions);
        if (!foundStartingQuote && isQuote) {
          foundStartingQuote = true;
        } else if (foundStartingQuote) {
          if (Token_1.Token.isTokenEscapeCharacter(nextToken, parserOptions)) {
            scanner.advancePastToken(nextToken);
            const tokenFollowingEscape = scanner.nextCharacterToken;
            if (tokenFollowingEscape !== null && (Token_1.Token.isTokenQuote(tokenFollowingEscape, parserOptions) || Token_1.Token.isTokenEscapeCharacter(tokenFollowingEscape, parserOptions))) {
              characters.push(tokenFollowingEscape.token);
              nextToken = tokenFollowingEscape;
            } else if (isQuote) {
              foundClosingQuote = true;
            } else {
              characters.push(nextToken.token);
            }
          } else if (isQuote) {
            foundClosingQuote = true;
          } else {
            characters.push(nextToken.token);
          }
        }
        scanner.advancePastToken(nextToken);
      }
      return { col: this.columnFormatter.format(characters.join("")), foundClosingQuote };
    }
    checkForMalformedColumn(scanner) {
      const { parserOptions } = this;
      const { nextNonSpaceToken } = scanner;
      if (nextNonSpaceToken) {
        const isNextTokenADelimiter = Token_1.Token.isTokenDelimiter(nextNonSpaceToken, parserOptions);
        const isNextTokenARowDelimiter = Token_1.Token.isTokenRowDelimiter(nextNonSpaceToken);
        if (!(isNextTokenADelimiter || isNextTokenARowDelimiter)) {
          const linePreview = scanner.lineFromCursor.substr(0, 10).replace(/[\r\n]/g, "\\n'");
          throw new Error(`Parse Error: expected: '${parserOptions.escapedDelimiter}' OR new line got: '${nextNonSpaceToken.token}'. at '${linePreview}`);
        }
        scanner.advanceToToken(nextNonSpaceToken);
      } else if (!scanner.hasMoreData) {
        scanner.advancePastLine();
      }
    }
  };
  QuotedColumnParser.QuotedColumnParser = QuotedColumnParser$1;
  return QuotedColumnParser;
}
var hasRequiredColumnParser;
function requireColumnParser() {
  if (hasRequiredColumnParser) return ColumnParser;
  hasRequiredColumnParser = 1;
  Object.defineProperty(ColumnParser, "__esModule", { value: true });
  ColumnParser.ColumnParser = void 0;
  const NonQuotedColumnParser_1 = requireNonQuotedColumnParser();
  const QuotedColumnParser_1 = requireQuotedColumnParser();
  const Token_1 = requireToken();
  let ColumnParser$1 = class ColumnParser {
    constructor(parserOptions) {
      this.parserOptions = parserOptions;
      this.quotedColumnParser = new QuotedColumnParser_1.QuotedColumnParser(parserOptions);
      this.nonQuotedColumnParser = new NonQuotedColumnParser_1.NonQuotedColumnParser(parserOptions);
    }
    parse(scanner) {
      const { nextNonSpaceToken } = scanner;
      if (nextNonSpaceToken !== null && Token_1.Token.isTokenQuote(nextNonSpaceToken, this.parserOptions)) {
        scanner.advanceToToken(nextNonSpaceToken);
        return this.quotedColumnParser.parse(scanner);
      }
      return this.nonQuotedColumnParser.parse(scanner);
    }
  };
  ColumnParser.ColumnParser = ColumnParser$1;
  return ColumnParser;
}
var hasRequiredColumn;
function requireColumn() {
  if (hasRequiredColumn) return column;
  hasRequiredColumn = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColumnFormatter = exports.QuotedColumnParser = exports.NonQuotedColumnParser = exports.ColumnParser = void 0;
    var ColumnParser_1 = requireColumnParser();
    Object.defineProperty(exports, "ColumnParser", { enumerable: true, get: function() {
      return ColumnParser_1.ColumnParser;
    } });
    var NonQuotedColumnParser_1 = requireNonQuotedColumnParser();
    Object.defineProperty(exports, "NonQuotedColumnParser", { enumerable: true, get: function() {
      return NonQuotedColumnParser_1.NonQuotedColumnParser;
    } });
    var QuotedColumnParser_1 = requireQuotedColumnParser();
    Object.defineProperty(exports, "QuotedColumnParser", { enumerable: true, get: function() {
      return QuotedColumnParser_1.QuotedColumnParser;
    } });
    var ColumnFormatter_1 = requireColumnFormatter();
    Object.defineProperty(exports, "ColumnFormatter", { enumerable: true, get: function() {
      return ColumnFormatter_1.ColumnFormatter;
    } });
  })(column);
  return column;
}
var hasRequiredRowParser;
function requireRowParser() {
  if (hasRequiredRowParser) return RowParser;
  hasRequiredRowParser = 1;
  Object.defineProperty(RowParser, "__esModule", { value: true });
  RowParser.RowParser = void 0;
  const column_1 = requireColumn();
  const Token_1 = requireToken();
  const EMPTY_STRING = "";
  let RowParser$1 = class RowParser {
    constructor(parserOptions) {
      this.parserOptions = parserOptions;
      this.columnParser = new column_1.ColumnParser(parserOptions);
    }
    static isEmptyRow(row) {
      return row.join(EMPTY_STRING).replace(/\s+/g, EMPTY_STRING) === EMPTY_STRING;
    }
    parse(scanner) {
      const { parserOptions } = this;
      const { hasMoreData } = scanner;
      const currentScanner = scanner;
      const columns = [];
      let currentToken = this.getStartToken(currentScanner, columns);
      while (currentToken) {
        if (Token_1.Token.isTokenRowDelimiter(currentToken)) {
          currentScanner.advancePastToken(currentToken);
          if (!currentScanner.hasMoreCharacters && Token_1.Token.isTokenCarriageReturn(currentToken, parserOptions) && hasMoreData) {
            return null;
          }
          currentScanner.truncateToCursor();
          return columns;
        }
        if (!this.shouldSkipColumnParse(currentScanner, currentToken, columns)) {
          const item = this.columnParser.parse(currentScanner);
          if (item === null) {
            return null;
          }
          columns.push(item);
        }
        currentToken = currentScanner.nextNonSpaceToken;
      }
      if (!hasMoreData) {
        currentScanner.truncateToCursor();
        return columns;
      }
      return null;
    }
    getStartToken(scanner, columns) {
      const currentToken = scanner.nextNonSpaceToken;
      if (currentToken !== null && Token_1.Token.isTokenDelimiter(currentToken, this.parserOptions)) {
        columns.push("");
        return scanner.nextNonSpaceToken;
      }
      return currentToken;
    }
    shouldSkipColumnParse(scanner, currentToken, columns) {
      const { parserOptions } = this;
      if (Token_1.Token.isTokenDelimiter(currentToken, parserOptions)) {
        scanner.advancePastToken(currentToken);
        const nextToken = scanner.nextCharacterToken;
        if (!scanner.hasMoreCharacters || nextToken !== null && Token_1.Token.isTokenRowDelimiter(nextToken)) {
          columns.push("");
          return true;
        }
        if (nextToken !== null && Token_1.Token.isTokenDelimiter(nextToken, parserOptions)) {
          columns.push("");
          return true;
        }
      }
      return false;
    }
  };
  RowParser.RowParser = RowParser$1;
  return RowParser;
}
var hasRequiredParser$1;
function requireParser$1() {
  if (hasRequiredParser$1) return Parser;
  hasRequiredParser$1 = 1;
  Object.defineProperty(Parser, "__esModule", { value: true });
  Parser.Parser = void 0;
  const Scanner_1 = requireScanner();
  const RowParser_1 = requireRowParser();
  const Token_1 = requireToken();
  let Parser$1 = class Parser2 {
    constructor(parserOptions) {
      this.parserOptions = parserOptions;
      this.rowParser = new RowParser_1.RowParser(this.parserOptions);
    }
    static removeBOM(line) {
      if (line && line.charCodeAt(0) === 65279) {
        return line.slice(1);
      }
      return line;
    }
    parse(line, hasMoreData) {
      const scanner = new Scanner_1.Scanner({
        line: Parser2.removeBOM(line),
        parserOptions: this.parserOptions,
        hasMoreData
      });
      if (this.parserOptions.supportsComments) {
        return this.parseWithComments(scanner);
      }
      return this.parseWithoutComments(scanner);
    }
    parseWithoutComments(scanner) {
      const rows = [];
      let shouldContinue = true;
      while (shouldContinue) {
        shouldContinue = this.parseRow(scanner, rows);
      }
      return { line: scanner.line, rows };
    }
    parseWithComments(scanner) {
      const { parserOptions } = this;
      const rows = [];
      for (let nextToken = scanner.nextCharacterToken; nextToken !== null; nextToken = scanner.nextCharacterToken) {
        if (Token_1.Token.isTokenComment(nextToken, parserOptions)) {
          const cursor = scanner.advancePastLine();
          if (cursor === null) {
            return { line: scanner.lineFromCursor, rows };
          }
          if (!scanner.hasMoreCharacters) {
            return { line: scanner.lineFromCursor, rows };
          }
          scanner.truncateToCursor();
        } else if (!this.parseRow(scanner, rows)) {
          break;
        }
      }
      return { line: scanner.line, rows };
    }
    parseRow(scanner, rows) {
      const nextToken = scanner.nextNonSpaceToken;
      if (!nextToken) {
        return false;
      }
      const row = this.rowParser.parse(scanner);
      if (row === null) {
        return false;
      }
      if (this.parserOptions.ignoreEmpty && RowParser_1.RowParser.isEmptyRow(row)) {
        return true;
      }
      rows.push(row);
      return true;
    }
  };
  Parser.Parser = Parser$1;
  return Parser;
}
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QuotedColumnParser = exports.NonQuotedColumnParser = exports.ColumnParser = exports.Token = exports.Scanner = exports.RowParser = exports.Parser = void 0;
    var Parser_1 = requireParser$1();
    Object.defineProperty(exports, "Parser", { enumerable: true, get: function() {
      return Parser_1.Parser;
    } });
    var RowParser_1 = requireRowParser();
    Object.defineProperty(exports, "RowParser", { enumerable: true, get: function() {
      return RowParser_1.RowParser;
    } });
    var Scanner_1 = requireScanner();
    Object.defineProperty(exports, "Scanner", { enumerable: true, get: function() {
      return Scanner_1.Scanner;
    } });
    var Token_1 = requireToken();
    Object.defineProperty(exports, "Token", { enumerable: true, get: function() {
      return Token_1.Token;
    } });
    var column_1 = requireColumn();
    Object.defineProperty(exports, "ColumnParser", { enumerable: true, get: function() {
      return column_1.ColumnParser;
    } });
    Object.defineProperty(exports, "NonQuotedColumnParser", { enumerable: true, get: function() {
      return column_1.NonQuotedColumnParser;
    } });
    Object.defineProperty(exports, "QuotedColumnParser", { enumerable: true, get: function() {
      return column_1.QuotedColumnParser;
    } });
  })(parser);
  return parser;
}
var hasRequiredCsvParserStream;
function requireCsvParserStream() {
  if (hasRequiredCsvParserStream) return CsvParserStream;
  hasRequiredCsvParserStream = 1;
  Object.defineProperty(CsvParserStream, "__esModule", { value: true });
  CsvParserStream.CsvParserStream = void 0;
  const string_decoder_1 = require$$0$1;
  const stream_1 = require$$0;
  const transforms_1 = requireTransforms();
  const parser_1 = requireParser();
  let CsvParserStream$1 = class CsvParserStream2 extends stream_1.Transform {
    constructor(parserOptions) {
      super({ objectMode: parserOptions.objectMode });
      this.lines = "";
      this.rowCount = 0;
      this.parsedRowCount = 0;
      this.parsedLineCount = 0;
      this.endEmitted = false;
      this.headersEmitted = false;
      this.parserOptions = parserOptions;
      this.parser = new parser_1.Parser(parserOptions);
      this.headerTransformer = new transforms_1.HeaderTransformer(parserOptions);
      this.decoder = new string_decoder_1.StringDecoder(parserOptions.encoding);
      this.rowTransformerValidator = new transforms_1.RowTransformerValidator();
    }
    get hasHitRowLimit() {
      return this.parserOptions.limitRows && this.rowCount >= this.parserOptions.maxRows;
    }
    get shouldEmitRows() {
      return this.parsedRowCount > this.parserOptions.skipRows;
    }
    get shouldSkipLine() {
      return this.parsedLineCount <= this.parserOptions.skipLines;
    }
    transform(transformFunction) {
      this.rowTransformerValidator.rowTransform = transformFunction;
      return this;
    }
    validate(validateFunction) {
      this.rowTransformerValidator.rowValidator = validateFunction;
      return this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(event, ...rest) {
      if (event === "end") {
        if (!this.endEmitted) {
          this.endEmitted = true;
          super.emit("end", this.rowCount);
        }
        return false;
      }
      return super.emit(event, ...rest);
    }
    _transform(data, encoding, done) {
      if (this.hasHitRowLimit) {
        return done();
      }
      const wrappedCallback = CsvParserStream2.wrapDoneCallback(done);
      try {
        const { lines } = this;
        const newLine = lines + this.decoder.write(data);
        const rows = this.parse(newLine, true);
        return this.processRows(rows, wrappedCallback);
      } catch (e) {
        return wrappedCallback(e);
      }
    }
    _flush(done) {
      const wrappedCallback = CsvParserStream2.wrapDoneCallback(done);
      if (this.hasHitRowLimit) {
        return wrappedCallback();
      }
      try {
        const newLine = this.lines + this.decoder.end();
        const rows = this.parse(newLine, false);
        return this.processRows(rows, wrappedCallback);
      } catch (e) {
        return wrappedCallback(e);
      }
    }
    parse(data, hasMoreData) {
      if (!data) {
        return [];
      }
      const { line, rows } = this.parser.parse(data, hasMoreData);
      this.lines = line;
      return rows;
    }
    processRows(rows, cb) {
      const rowsLength = rows.length;
      const iterate = (i) => {
        const callNext = (err) => {
          if (err) {
            return cb(err);
          }
          if (i % 100 === 0) {
            setImmediate(() => iterate(i + 1));
            return void 0;
          }
          return iterate(i + 1);
        };
        this.checkAndEmitHeaders();
        if (i >= rowsLength || this.hasHitRowLimit) {
          return cb();
        }
        this.parsedLineCount += 1;
        if (this.shouldSkipLine) {
          return callNext();
        }
        const row = rows[i];
        this.rowCount += 1;
        this.parsedRowCount += 1;
        const nextRowCount = this.rowCount;
        return this.transformRow(row, (err, transformResult) => {
          if (err) {
            this.rowCount -= 1;
            return callNext(err);
          }
          if (!transformResult) {
            return callNext(new Error("expected transform result"));
          }
          if (!transformResult.isValid) {
            this.emit("data-invalid", transformResult.row, nextRowCount, transformResult.reason);
          } else if (transformResult.row) {
            return this.pushRow(transformResult.row, callNext);
          }
          return callNext();
        });
      };
      iterate(0);
    }
    transformRow(parsedRow, cb) {
      try {
        this.headerTransformer.transform(parsedRow, (err, withHeaders) => {
          if (err) {
            return cb(err);
          }
          if (!withHeaders) {
            return cb(new Error("Expected result from header transform"));
          }
          if (!withHeaders.isValid) {
            if (this.shouldEmitRows) {
              return cb(null, { isValid: false, row: parsedRow });
            }
            return this.skipRow(cb);
          }
          if (withHeaders.row) {
            if (this.shouldEmitRows) {
              return this.rowTransformerValidator.transformAndValidate(withHeaders.row, cb);
            }
            return this.skipRow(cb);
          }
          this.rowCount -= 1;
          this.parsedRowCount -= 1;
          return cb(null, { row: null, isValid: true });
        });
      } catch (e) {
        cb(e);
      }
    }
    checkAndEmitHeaders() {
      if (!this.headersEmitted && this.headerTransformer.headers) {
        this.headersEmitted = true;
        this.emit("headers", this.headerTransformer.headers);
      }
    }
    skipRow(cb) {
      this.rowCount -= 1;
      return cb(null, { row: null, isValid: true });
    }
    pushRow(row, cb) {
      try {
        if (!this.parserOptions.objectMode) {
          this.push(JSON.stringify(row));
        } else {
          this.push(row);
        }
        cb();
      } catch (e) {
        cb(e);
      }
    }
    static wrapDoneCallback(done) {
      let errorCalled = false;
      return (err, ...args) => {
        if (err) {
          if (errorCalled) {
            throw err;
          }
          errorCalled = true;
          done(err);
          return;
        }
        done(...args);
      };
    }
  };
  CsvParserStream.CsvParserStream = CsvParserStream$1;
  return CsvParserStream;
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
    exports.parseString = exports.parseFile = exports.parseStream = exports.parse = exports.ParserOptions = exports.CsvParserStream = void 0;
    const fs = __importStar(require$$0$2);
    const stream_1 = require$$0;
    const ParserOptions_1 = requireParserOptions();
    const CsvParserStream_1 = requireCsvParserStream();
    __exportStar(requireTypes(), exports);
    var CsvParserStream_2 = requireCsvParserStream();
    Object.defineProperty(exports, "CsvParserStream", { enumerable: true, get: function() {
      return CsvParserStream_2.CsvParserStream;
    } });
    var ParserOptions_2 = requireParserOptions();
    Object.defineProperty(exports, "ParserOptions", { enumerable: true, get: function() {
      return ParserOptions_2.ParserOptions;
    } });
    exports.parse = (args) => new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(args));
    exports.parseStream = (stream, options) => stream.pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
    exports.parseFile = (location, options = {}) => fs.createReadStream(location).pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
    exports.parseString = (string, options) => {
      const rs = new stream_1.Readable();
      rs.push(string);
      rs.push(null);
      return rs.pipe(new CsvParserStream_1.CsvParserStream(new ParserOptions_1.ParserOptions(options)));
    };
  })(src);
  return src;
}
export {
  requireSrc as r
};
