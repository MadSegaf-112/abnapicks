import require$$0$1 from "fs";
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from "./react.mjs";
import require$$0 from "crypto";
import { r as requireLib } from "./jszip.mjs";
import { r as requireReadable } from "./readable-stream.mjs";
import require$$2 from "events";
import require$$0$2 from "buffer";
import { r as requireSaxes } from "./saxes.mjs";
import { r as requireDist } from "./uuid.mjs";
import { r as requireSrc } from "./fast-csv.mjs";
import { r as requireCustomParseFormat, a as requireUtc, b as requireDayjs_min } from "./dayjs.mjs";
import { r as requireArchiver } from "./archiver.mjs";
import require$$0$3 from "stream";
import { r as requireUnzip } from "./unzipper.mjs";
import { r as requireTmp } from "./tmp.mjs";
var underDash;
var hasRequiredUnderDash;
function requireUnderDash() {
  if (hasRequiredUnderDash) return underDash;
  hasRequiredUnderDash = 1;
  const { toString } = Object.prototype;
  const escapeHtmlRegex = /["&<>]/;
  const _ = {
    each: function each(obj, cb) {
      if (obj) {
        if (Array.isArray(obj)) {
          obj.forEach(cb);
        } else {
          Object.keys(obj).forEach((key) => {
            cb(obj[key], key);
          });
        }
      }
    },
    some: function some(obj, cb) {
      if (obj) {
        if (Array.isArray(obj)) {
          return obj.some(cb);
        }
        return Object.keys(obj).some((key) => cb(obj[key], key));
      }
      return false;
    },
    every: function every(obj, cb) {
      if (obj) {
        if (Array.isArray(obj)) {
          return obj.every(cb);
        }
        return Object.keys(obj).every((key) => cb(obj[key], key));
      }
      return true;
    },
    map: function map(obj, cb) {
      if (obj) {
        if (Array.isArray(obj)) {
          return obj.map(cb);
        }
        return Object.keys(obj).map((key) => cb(obj[key], key));
      }
      return [];
    },
    keyBy(a, p) {
      return a.reduce((o, v) => {
        o[v[p]] = v;
        return o;
      }, {});
    },
    isEqual: function isEqual(a, b) {
      const aType = typeof a;
      const bType = typeof b;
      const aArray = Array.isArray(a);
      const bArray = Array.isArray(b);
      let keys;
      if (aType !== bType) {
        return false;
      }
      switch (typeof a) {
        case "object":
          if (aArray || bArray) {
            if (aArray && bArray) {
              return a.length === b.length && a.every((aValue, index) => {
                const bValue = b[index];
                return _.isEqual(aValue, bValue);
              });
            }
            return false;
          }
          if (a === null || b === null) {
            return a === b;
          }
          keys = Object.keys(a);
          if (Object.keys(b).length !== keys.length) {
            return false;
          }
          for (const key of keys) {
            if (!b.hasOwnProperty(key)) {
              return false;
            }
          }
          return _.every(a, (aValue, key) => {
            const bValue = b[key];
            return _.isEqual(aValue, bValue);
          });
        default:
          return a === b;
      }
    },
    escapeHtml(html) {
      const regexResult = escapeHtmlRegex.exec(html);
      if (!regexResult) return html;
      let result = "";
      let escape = "";
      let lastIndex = 0;
      let i = regexResult.index;
      for (; i < html.length; i++) {
        switch (html.charAt(i)) {
          case '"':
            escape = "&quot;";
            break;
          case "&":
            escape = "&amp;";
            break;
          case "'":
            escape = "&apos;";
            break;
          case "<":
            escape = "&lt;";
            break;
          case ">":
            escape = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== i) result += html.substring(lastIndex, i);
        lastIndex = i + 1;
        result += escape;
      }
      if (lastIndex !== i) return result + html.substring(lastIndex, i);
      return result;
    },
    strcmp(a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
    isUndefined(val) {
      return toString.call(val) === "[object Undefined]";
    },
    isObject(val) {
      return toString.call(val) === "[object Object]";
    },
    deepMerge() {
      const target = arguments[0] || {};
      const { length } = arguments;
      let src, clone, copyIsArray;
      function assignValue(val, key) {
        src = target[key];
        copyIsArray = Array.isArray(val);
        if (_.isObject(val) || copyIsArray) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && _.isObject(src) ? src : {};
          }
          target[key] = _.deepMerge(clone, val);
        } else if (!_.isUndefined(val)) {
          target[key] = val;
        }
      }
      for (let i = 0; i < length; i++) {
        _.each(arguments[i], assignValue);
      }
      return target;
    }
  };
  underDash = _;
  return underDash;
}
var colCache_1;
var hasRequiredColCache;
function requireColCache() {
  if (hasRequiredColCache) return colCache_1;
  hasRequiredColCache = 1;
  const addressRegex = /^[A-Z]+\d+$/;
  const colCache = {
    _dictionary: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    _l2nFill: 0,
    _l2n: {},
    _n2l: [],
    _level(n) {
      if (n <= 26) {
        return 1;
      }
      if (n <= 26 * 26) {
        return 2;
      }
      return 3;
    },
    _fill(level) {
      let c;
      let v;
      let l1;
      let l2;
      let l3;
      let n = 1;
      if (level >= 4) {
        throw new Error("Out of bounds. Excel supports columns from 1 to 16384");
      }
      if (this._l2nFill < 1 && level >= 1) {
        while (n <= 26) {
          c = this._dictionary[n - 1];
          this._n2l[n] = c;
          this._l2n[c] = n;
          n++;
        }
        this._l2nFill = 1;
      }
      if (this._l2nFill < 2 && level >= 2) {
        n = 27;
        while (n <= 26 + 26 * 26) {
          v = n - (26 + 1);
          l1 = v % 26;
          l2 = Math.floor(v / 26);
          c = this._dictionary[l2] + this._dictionary[l1];
          this._n2l[n] = c;
          this._l2n[c] = n;
          n++;
        }
        this._l2nFill = 2;
      }
      if (this._l2nFill < 3 && level >= 3) {
        n = 26 + 26 * 26 + 1;
        while (n <= 16384) {
          v = n - (26 * 26 + 26 + 1);
          l1 = v % 26;
          l2 = Math.floor(v / 26) % 26;
          l3 = Math.floor(v / (26 * 26));
          c = this._dictionary[l3] + this._dictionary[l2] + this._dictionary[l1];
          this._n2l[n] = c;
          this._l2n[c] = n;
          n++;
        }
        this._l2nFill = 3;
      }
    },
    l2n(l) {
      if (!this._l2n[l]) {
        this._fill(l.length);
      }
      if (!this._l2n[l]) {
        throw new Error(`Out of bounds. Invalid column letter: ${l}`);
      }
      return this._l2n[l];
    },
    n2l(n) {
      if (n < 1 || n > 16384) {
        throw new Error(`${n} is out of bounds. Excel supports columns from 1 to 16384`);
      }
      if (!this._n2l[n]) {
        this._fill(this._level(n));
      }
      return this._n2l[n];
    },
    // =========================================================================
    // Address processing
    _hash: {},
    // check if value looks like an address
    validateAddress(value) {
      if (!addressRegex.test(value)) {
        throw new Error(`Invalid Address: ${value}`);
      }
      return true;
    },
    // convert address string into structure
    decodeAddress(value) {
      const addr = value.length < 5 && this._hash[value];
      if (addr) {
        return addr;
      }
      let hasCol = false;
      let col = "";
      let colNumber = 0;
      let hasRow = false;
      let row2 = "";
      let rowNumber = 0;
      for (let i = 0, char; i < value.length; i++) {
        char = value.charCodeAt(i);
        if (!hasRow && char >= 65 && char <= 90) {
          hasCol = true;
          col += value[i];
          colNumber = colNumber * 26 + char - 64;
        } else if (char >= 48 && char <= 57) {
          hasRow = true;
          row2 += value[i];
          rowNumber = rowNumber * 10 + char - 48;
        } else if (hasRow && hasCol && char !== 36) {
          break;
        }
      }
      if (!hasCol) {
        colNumber = void 0;
      } else if (colNumber > 16384) {
        throw new Error(`Out of bounds. Invalid column letter: ${col}`);
      }
      if (!hasRow) {
        rowNumber = void 0;
      }
      value = col + row2;
      const address = {
        address: value,
        col: colNumber,
        row: rowNumber,
        $col$row: `$${col}$${row2}`
      };
      if (colNumber <= 100 && rowNumber <= 100) {
        this._hash[value] = address;
        this._hash[address.$col$row] = address;
      }
      return address;
    },
    // convert r,c into structure (if only 1 arg, assume r is address string)
    getAddress(r, c) {
      if (c) {
        const address = this.n2l(c) + r;
        return this.decodeAddress(address);
      }
      return this.decodeAddress(r);
    },
    // convert [address], [tl:br] into address structures
    decode(value) {
      const parts = value.split(":");
      if (parts.length === 2) {
        const tl = this.decodeAddress(parts[0]);
        const br = this.decodeAddress(parts[1]);
        const result = {
          top: Math.min(tl.row, br.row),
          left: Math.min(tl.col, br.col),
          bottom: Math.max(tl.row, br.row),
          right: Math.max(tl.col, br.col)
        };
        result.tl = this.n2l(result.left) + result.top;
        result.br = this.n2l(result.right) + result.bottom;
        result.dimensions = `${result.tl}:${result.br}`;
        return result;
      }
      return this.decodeAddress(value);
    },
    // convert [sheetName!][$]col[$]row[[$]col[$]row] into address or range structures
    decodeEx(value) {
      const groups = value.match(/(?:(?:(?:'((?:[^']|'')*)')|([^'^ !]*))!)?(.*)/);
      const sheetName = groups[1] || groups[2];
      const reference = groups[3];
      const parts = reference.split(":");
      if (parts.length > 1) {
        let tl = this.decodeAddress(parts[0]);
        let br = this.decodeAddress(parts[1]);
        const top = Math.min(tl.row, br.row);
        const left = Math.min(tl.col, br.col);
        const bottom = Math.max(tl.row, br.row);
        const right = Math.max(tl.col, br.col);
        tl = this.n2l(left) + top;
        br = this.n2l(right) + bottom;
        return {
          top,
          left,
          bottom,
          right,
          sheetName,
          tl: { address: tl, col: left, row: top, $col$row: `$${this.n2l(left)}$${top}`, sheetName },
          br: {
            address: br,
            col: right,
            row: bottom,
            $col$row: `$${this.n2l(right)}$${bottom}`,
            sheetName
          },
          dimensions: `${tl}:${br}`
        };
      }
      if (reference.startsWith("#")) {
        return sheetName ? { sheetName, error: reference } : { error: reference };
      }
      const address = this.decodeAddress(reference);
      return sheetName ? { sheetName, ...address } : address;
    },
    // convert row,col into address string
    encodeAddress(row2, col) {
      return colCache.n2l(col) + row2;
    },
    // convert row,col into string address or t,l,b,r into range
    encode() {
      switch (arguments.length) {
        case 2:
          return colCache.encodeAddress(arguments[0], arguments[1]);
        case 4:
          return `${colCache.encodeAddress(arguments[0], arguments[1])}:${colCache.encodeAddress(
            arguments[2],
            arguments[3]
          )}`;
        default:
          throw new Error("Can only encode with 2 or 4 arguments");
      }
    },
    // return true if address is contained within range
    inRange(range2, address) {
      const [left, top, , right, bottom] = range2;
      const [col, row2] = address;
      return col >= left && col <= right && row2 >= top && row2 <= bottom;
    }
  };
  colCache_1 = colCache;
  return colCache_1;
}
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  const colCache = requireColCache();
  class Range {
    constructor() {
      this.decode(arguments);
    }
    setTLBR(t, l, b, r, s) {
      if (arguments.length < 4) {
        const tl = colCache.decodeAddress(t);
        const br = colCache.decodeAddress(l);
        this.model = {
          top: Math.min(tl.row, br.row),
          left: Math.min(tl.col, br.col),
          bottom: Math.max(tl.row, br.row),
          right: Math.max(tl.col, br.col),
          sheetName: b
        };
        this.setTLBR(tl.row, tl.col, br.row, br.col, s);
      } else {
        this.model = {
          top: Math.min(t, b),
          left: Math.min(l, r),
          bottom: Math.max(t, b),
          right: Math.max(l, r),
          sheetName: s
        };
      }
    }
    decode(argv) {
      switch (argv.length) {
        case 5:
          this.setTLBR(argv[0], argv[1], argv[2], argv[3], argv[4]);
          break;
        case 4:
          this.setTLBR(argv[0], argv[1], argv[2], argv[3]);
          break;
        case 3:
          this.setTLBR(argv[0], argv[1], argv[2]);
          break;
        case 2:
          this.setTLBR(argv[0], argv[1]);
          break;
        case 1: {
          const value = argv[0];
          if (value instanceof Range) {
            this.model = {
              top: value.model.top,
              left: value.model.left,
              bottom: value.model.bottom,
              right: value.model.right,
              sheetName: value.sheetName
            };
          } else if (value instanceof Array) {
            this.decode(value);
          } else if (value.top && value.left && value.bottom && value.right) {
            this.model = {
              top: value.top,
              left: value.left,
              bottom: value.bottom,
              right: value.right,
              sheetName: value.sheetName
            };
          } else {
            const tlbr = colCache.decodeEx(value);
            if (tlbr.top) {
              this.model = {
                top: tlbr.top,
                left: tlbr.left,
                bottom: tlbr.bottom,
                right: tlbr.right,
                sheetName: tlbr.sheetName
              };
            } else {
              this.model = {
                top: tlbr.row,
                left: tlbr.col,
                bottom: tlbr.row,
                right: tlbr.col,
                sheetName: tlbr.sheetName
              };
            }
          }
          break;
        }
        case 0:
          this.model = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          };
          break;
        default:
          throw new Error(`Invalid number of arguments to _getDimensions() - ${argv.length}`);
      }
    }
    get top() {
      return this.model.top || 1;
    }
    set top(value) {
      this.model.top = value;
    }
    get left() {
      return this.model.left || 1;
    }
    set left(value) {
      this.model.left = value;
    }
    get bottom() {
      return this.model.bottom || 1;
    }
    set bottom(value) {
      this.model.bottom = value;
    }
    get right() {
      return this.model.right || 1;
    }
    set right(value) {
      this.model.right = value;
    }
    get sheetName() {
      return this.model.sheetName;
    }
    set sheetName(value) {
      this.model.sheetName = value;
    }
    get _serialisedSheetName() {
      const { sheetName } = this.model;
      if (sheetName) {
        if (/^[a-zA-Z0-9]*$/.test(sheetName)) {
          return `${sheetName}!`;
        }
        return `'${sheetName}'!`;
      }
      return "";
    }
    expand(top, left, bottom, right) {
      if (!this.model.top || top < this.top) this.top = top;
      if (!this.model.left || left < this.left) this.left = left;
      if (!this.model.bottom || bottom > this.bottom) this.bottom = bottom;
      if (!this.model.right || right > this.right) this.right = right;
    }
    expandRow(row2) {
      if (row2) {
        const { dimensions, number } = row2;
        if (dimensions) {
          this.expand(number, dimensions.min, number, dimensions.max);
        }
      }
    }
    expandToAddress(addressStr) {
      const address = colCache.decodeEx(addressStr);
      this.expand(address.row, address.col, address.row, address.col);
    }
    get tl() {
      return colCache.n2l(this.left) + this.top;
    }
    get $t$l() {
      return `$${colCache.n2l(this.left)}$${this.top}`;
    }
    get br() {
      return colCache.n2l(this.right) + this.bottom;
    }
    get $b$r() {
      return `$${colCache.n2l(this.right)}$${this.bottom}`;
    }
    get range() {
      return `${this._serialisedSheetName + this.tl}:${this.br}`;
    }
    get $range() {
      return `${this._serialisedSheetName + this.$t$l}:${this.$b$r}`;
    }
    get shortRange() {
      return this.count > 1 ? this.range : this._serialisedSheetName + this.tl;
    }
    get $shortRange() {
      return this.count > 1 ? this.$range : this._serialisedSheetName + this.$t$l;
    }
    get count() {
      return (1 + this.bottom - this.top) * (1 + this.right - this.left);
    }
    toString() {
      return this.range;
    }
    intersects(other) {
      if (other.sheetName && this.sheetName && other.sheetName !== this.sheetName) return false;
      if (other.bottom < this.top) return false;
      if (other.top > this.bottom) return false;
      if (other.right < this.left) return false;
      if (other.left > this.right) return false;
      return true;
    }
    contains(addressStr) {
      const address = colCache.decodeEx(addressStr);
      return this.containsEx(address);
    }
    containsEx(address) {
      if (address.sheetName && this.sheetName && address.sheetName !== this.sheetName) return false;
      return address.row >= this.top && address.row <= this.bottom && address.col >= this.left && address.col <= this.right;
    }
    forEachAddress(cb) {
      for (let col = this.left; col <= this.right; col++) {
        for (let row2 = this.top; row2 <= this.bottom; row2++) {
          cb(colCache.encodeAddress(row2, col), row2, col);
        }
      }
    }
  }
  range = Range;
  return range;
}
var enums;
var hasRequiredEnums;
function requireEnums() {
  if (hasRequiredEnums) return enums;
  hasRequiredEnums = 1;
  enums = {
    ValueType: {
      Null: 0,
      Merge: 1,
      Number: 2,
      String: 3,
      Date: 4,
      Hyperlink: 5,
      Formula: 6,
      SharedString: 7,
      RichText: 8,
      Boolean: 9,
      Error: 10
    },
    FormulaType: {
      None: 0,
      Master: 1,
      Shared: 2
    },
    RelationshipType: {
      None: 0,
      OfficeDocument: 1,
      Worksheet: 2,
      CalcChain: 3,
      SharedStrings: 4,
      Styles: 5,
      Theme: 6,
      Hyperlink: 7
    },
    DocumentType: {
      Xlsx: 1
    },
    ReadingOrder: {
      LeftToRight: 1,
      RightToLeft: 2
    },
    ErrorValue: {
      NotApplicable: "#N/A",
      Ref: "#REF!",
      Name: "#NAME?",
      DivZero: "#DIV/0!",
      Null: "#NULL!",
      Value: "#VALUE!",
      Num: "#NUM!"
    }
  };
  return enums;
}
var sharedFormula;
var hasRequiredSharedFormula;
function requireSharedFormula() {
  if (hasRequiredSharedFormula) return sharedFormula;
  hasRequiredSharedFormula = 1;
  const colCache = requireColCache();
  const replacementCandidateRx = /(([a-z_\-0-9]*)!)?([a-z0-9_$]{2,})([(])?/gi;
  const CRrx = /^([$])?([a-z]+)([$])?([1-9][0-9]*)$/i;
  function slideFormula(formula, fromCell, toCell) {
    const offset = colCache.decode(fromCell);
    const to = colCache.decode(toCell);
    return formula.replace(
      replacementCandidateRx,
      (refMatch, sheet, sheetMaybe, addrPart, trailingParen) => {
        if (trailingParen) {
          return refMatch;
        }
        const match = CRrx.exec(addrPart);
        if (match) {
          const colDollar = match[1];
          const colStr = match[2].toUpperCase();
          const rowDollar = match[3];
          const rowStr = match[4];
          if (colStr.length > 3 || colStr.length === 3 && colStr > "XFD") {
            return refMatch;
          }
          let col = colCache.l2n(colStr);
          let row2 = parseInt(rowStr, 10);
          if (!colDollar) {
            col += to.col - offset.col;
          }
          if (!rowDollar) {
            row2 += to.row - offset.row;
          }
          const res = (sheet || "") + (colDollar || "") + colCache.n2l(col) + (rowDollar || "") + row2;
          return res;
        }
        return refMatch;
      }
    );
  }
  sharedFormula = {
    slideFormula
  };
  return sharedFormula;
}
var note;
var hasRequiredNote;
function requireNote() {
  if (hasRequiredNote) return note;
  hasRequiredNote = 1;
  const _ = requireUnderDash();
  class Note {
    constructor(note2) {
      this.note = note2;
    }
    get model() {
      let value = null;
      switch (typeof this.note) {
        case "string":
          value = {
            type: "note",
            note: {
              texts: [
                {
                  text: this.note
                }
              ]
            }
          };
          break;
        default:
          value = {
            type: "note",
            note: this.note
          };
          break;
      }
      return _.deepMerge({}, Note.DEFAULT_CONFIGS, value);
    }
    set model(value) {
      const { note: note2 } = value;
      const { texts } = note2;
      if (texts.length === 1 && Object.keys(texts[0]).length === 1) {
        this.note = texts[0].text;
      } else {
        this.note = note2;
      }
    }
    static fromModel(model) {
      const note2 = new Note();
      note2.model = model;
      return note2;
    }
  }
  Note.DEFAULT_CONFIGS = {
    note: {
      margins: {
        insetmode: "auto",
        inset: [0.13, 0.13, 0.25, 0.25]
      },
      protection: {
        locked: "True",
        lockText: "True"
      },
      editAs: "absolute"
    }
  };
  note = Note;
  return note;
}
var cell;
var hasRequiredCell;
function requireCell() {
  if (hasRequiredCell) return cell;
  hasRequiredCell = 1;
  const colCache = requireColCache();
  const _ = requireUnderDash();
  const Enums = requireEnums();
  const { slideFormula } = requireSharedFormula();
  const Note = requireNote();
  class Cell {
    constructor(row2, column2, address) {
      if (!row2 || !column2) {
        throw new Error("A Cell needs a Row");
      }
      this._row = row2;
      this._column = column2;
      colCache.validateAddress(address);
      this._address = address;
      this._value = Value.create(Cell.Types.Null, this);
      this.style = this._mergeStyle(row2.style, column2.style, {});
      this._mergeCount = 0;
    }
    get worksheet() {
      return this._row.worksheet;
    }
    get workbook() {
      return this._row.worksheet.workbook;
    }
    // help GC by removing cyclic (and other) references
    destroy() {
      delete this.style;
      delete this._value;
      delete this._row;
      delete this._column;
      delete this._address;
    }
    // =========================================================================
    // Styles stuff
    get numFmt() {
      return this.style.numFmt;
    }
    set numFmt(value) {
      this.style.numFmt = value;
    }
    get font() {
      return this.style.font;
    }
    set font(value) {
      this.style.font = value;
    }
    get alignment() {
      return this.style.alignment;
    }
    set alignment(value) {
      this.style.alignment = value;
    }
    get border() {
      return this.style.border;
    }
    set border(value) {
      this.style.border = value;
    }
    get fill() {
      return this.style.fill;
    }
    set fill(value) {
      this.style.fill = value;
    }
    get protection() {
      return this.style.protection;
    }
    set protection(value) {
      this.style.protection = value;
    }
    _mergeStyle(rowStyle, colStyle, style) {
      const numFmt = rowStyle && rowStyle.numFmt || colStyle && colStyle.numFmt;
      if (numFmt) style.numFmt = numFmt;
      const font = rowStyle && rowStyle.font || colStyle && colStyle.font;
      if (font) style.font = font;
      const alignment = rowStyle && rowStyle.alignment || colStyle && colStyle.alignment;
      if (alignment) style.alignment = alignment;
      const border = rowStyle && rowStyle.border || colStyle && colStyle.border;
      if (border) style.border = border;
      const fill = rowStyle && rowStyle.fill || colStyle && colStyle.fill;
      if (fill) style.fill = fill;
      const protection = rowStyle && rowStyle.protection || colStyle && colStyle.protection;
      if (protection) style.protection = protection;
      return style;
    }
    // =========================================================================
    // return the address for this cell
    get address() {
      return this._address;
    }
    get row() {
      return this._row.number;
    }
    get col() {
      return this._column.number;
    }
    get $col$row() {
      return `$${this._column.letter}$${this.row}`;
    }
    // =========================================================================
    // Value stuff
    get type() {
      return this._value.type;
    }
    get effectiveType() {
      return this._value.effectiveType;
    }
    toCsvString() {
      return this._value.toCsvString();
    }
    // =========================================================================
    // Merge stuff
    addMergeRef() {
      this._mergeCount++;
    }
    releaseMergeRef() {
      this._mergeCount--;
    }
    get isMerged() {
      return this._mergeCount > 0 || this.type === Cell.Types.Merge;
    }
    merge(master, ignoreStyle) {
      this._value.release();
      this._value = Value.create(Cell.Types.Merge, this, master);
      if (!ignoreStyle) {
        this.style = master.style;
      }
    }
    unmerge() {
      if (this.type === Cell.Types.Merge) {
        this._value.release();
        this._value = Value.create(Cell.Types.Null, this);
        this.style = this._mergeStyle(this._row.style, this._column.style, {});
      }
    }
    isMergedTo(master) {
      if (this._value.type !== Cell.Types.Merge) return false;
      return this._value.isMergedTo(master);
    }
    get master() {
      if (this.type === Cell.Types.Merge) {
        return this._value.master;
      }
      return this;
    }
    get isHyperlink() {
      return this._value.type === Cell.Types.Hyperlink;
    }
    get hyperlink() {
      return this._value.hyperlink;
    }
    // return the value
    get value() {
      return this._value.value;
    }
    // set the value - can be number, string or raw
    set value(v) {
      if (this.type === Cell.Types.Merge) {
        this._value.master.value = v;
        return;
      }
      this._value.release();
      this._value = Value.create(Value.getType(v), this, v);
    }
    get note() {
      return this._comment && this._comment.note;
    }
    set note(note2) {
      this._comment = new Note(note2);
    }
    get text() {
      return this._value.toString();
    }
    get html() {
      return _.escapeHtml(this.text);
    }
    toString() {
      return this.text;
    }
    _upgradeToHyperlink(hyperlink) {
      if (this.type === Cell.Types.String) {
        this._value = Value.create(Cell.Types.Hyperlink, this, {
          text: this._value.value,
          hyperlink
        });
      }
    }
    // =========================================================================
    // Formula stuff
    get formula() {
      return this._value.formula;
    }
    get result() {
      return this._value.result;
    }
    get formulaType() {
      return this._value.formulaType;
    }
    // =========================================================================
    // Name stuff
    get fullAddress() {
      const { worksheet: worksheet2 } = this._row;
      return {
        sheetName: worksheet2.name,
        address: this.address,
        row: this.row,
        col: this.col
      };
    }
    get name() {
      return this.names[0];
    }
    set name(value) {
      this.names = [value];
    }
    get names() {
      return this.workbook.definedNames.getNamesEx(this.fullAddress);
    }
    set names(value) {
      const { definedNames: definedNames2 } = this.workbook;
      definedNames2.removeAllNames(this.fullAddress);
      value.forEach((name) => {
        definedNames2.addEx(this.fullAddress, name);
      });
    }
    addName(name) {
      this.workbook.definedNames.addEx(this.fullAddress, name);
    }
    removeName(name) {
      this.workbook.definedNames.removeEx(this.fullAddress, name);
    }
    removeAllNames() {
      this.workbook.definedNames.removeAllNames(this.fullAddress);
    }
    // =========================================================================
    // Data Validation stuff
    get _dataValidations() {
      return this.worksheet.dataValidations;
    }
    get dataValidation() {
      return this._dataValidations.find(this.address);
    }
    set dataValidation(value) {
      this._dataValidations.add(this.address, value);
    }
    // =========================================================================
    // Model stuff
    get model() {
      const { model } = this._value;
      model.style = this.style;
      if (this._comment) {
        model.comment = this._comment.model;
      }
      return model;
    }
    set model(value) {
      this._value.release();
      this._value = Value.create(value.type, this);
      this._value.model = value;
      if (value.comment) {
        switch (value.comment.type) {
          case "note":
            this._comment = Note.fromModel(value.comment);
            break;
        }
      }
      if (value.style) {
        this.style = value.style;
      } else {
        this.style = {};
      }
    }
  }
  Cell.Types = Enums.ValueType;
  class NullValue {
    constructor(cell2) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.Null
      };
    }
    get value() {
      return null;
    }
    set value(value) {
    }
    get type() {
      return Cell.Types.Null;
    }
    get effectiveType() {
      return Cell.Types.Null;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return "";
    }
    release() {
    }
    toString() {
      return "";
    }
  }
  class NumberValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.Number,
        value
      };
    }
    get value() {
      return this.model.value;
    }
    set value(value) {
      this.model.value = value;
    }
    get type() {
      return Cell.Types.Number;
    }
    get effectiveType() {
      return Cell.Types.Number;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return this.model.value.toString();
    }
    release() {
    }
    toString() {
      return this.model.value.toString();
    }
  }
  class StringValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.String,
        value
      };
    }
    get value() {
      return this.model.value;
    }
    set value(value) {
      this.model.value = value;
    }
    get type() {
      return Cell.Types.String;
    }
    get effectiveType() {
      return Cell.Types.String;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return `"${this.model.value.replace(/"/g, '""')}"`;
    }
    release() {
    }
    toString() {
      return this.model.value;
    }
  }
  class RichTextValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.String,
        value
      };
    }
    get value() {
      return this.model.value;
    }
    set value(value) {
      this.model.value = value;
    }
    toString() {
      return this.model.value.richText.map((t) => t.text).join("");
    }
    get type() {
      return Cell.Types.RichText;
    }
    get effectiveType() {
      return Cell.Types.RichText;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return `"${this.text.replace(/"/g, '""')}"`;
    }
    release() {
    }
  }
  class DateValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.Date,
        value
      };
    }
    get value() {
      return this.model.value;
    }
    set value(value) {
      this.model.value = value;
    }
    get type() {
      return Cell.Types.Date;
    }
    get effectiveType() {
      return Cell.Types.Date;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return this.model.value.toISOString();
    }
    release() {
    }
    toString() {
      return this.model.value.toString();
    }
  }
  class HyperlinkValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.Hyperlink,
        text: value ? value.text : void 0,
        hyperlink: value ? value.hyperlink : void 0
      };
      if (value && value.tooltip) {
        this.model.tooltip = value.tooltip;
      }
    }
    get value() {
      const v = {
        text: this.model.text,
        hyperlink: this.model.hyperlink
      };
      if (this.model.tooltip) {
        v.tooltip = this.model.tooltip;
      }
      return v;
    }
    set value(value) {
      this.model = {
        text: value.text,
        hyperlink: value.hyperlink
      };
      if (value.tooltip) {
        this.model.tooltip = value.tooltip;
      }
    }
    get text() {
      return this.model.text;
    }
    set text(value) {
      this.model.text = value;
    }
    /*
    	  get tooltip() {
    	    return this.model.tooltip;
    	  }
    
    	  set tooltip(value) {
    	    this.model.tooltip = value;
    	  } */
    get hyperlink() {
      return this.model.hyperlink;
    }
    set hyperlink(value) {
      this.model.hyperlink = value;
    }
    get type() {
      return Cell.Types.Hyperlink;
    }
    get effectiveType() {
      return Cell.Types.Hyperlink;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return this.model.hyperlink;
    }
    release() {
    }
    toString() {
      return this.model.text;
    }
  }
  class MergeValue {
    constructor(cell2, master) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.Merge,
        master: master ? master.address : void 0
      };
      this._master = master;
      if (master) {
        master.addMergeRef();
      }
    }
    get value() {
      return this._master.value;
    }
    set value(value) {
      if (value instanceof Cell) {
        if (this._master) {
          this._master.releaseMergeRef();
        }
        value.addMergeRef();
        this._master = value;
      } else {
        this._master.value = value;
      }
    }
    isMergedTo(master) {
      return master === this._master;
    }
    get master() {
      return this._master;
    }
    get type() {
      return Cell.Types.Merge;
    }
    get effectiveType() {
      return this._master.effectiveType;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return "";
    }
    release() {
      this._master.releaseMergeRef();
    }
    toString() {
      return this.value.toString();
    }
  }
  class FormulaValue {
    constructor(cell2, value) {
      this.cell = cell2;
      this.model = {
        address: cell2.address,
        type: Cell.Types.Formula,
        shareType: value ? value.shareType : void 0,
        ref: value ? value.ref : void 0,
        formula: value ? value.formula : void 0,
        sharedFormula: value ? value.sharedFormula : void 0,
        result: value ? value.result : void 0
      };
    }
    _copyModel(model) {
      const copy = {};
      const cp = (name) => {
        const value = model[name];
        if (value) {
          copy[name] = value;
        }
      };
      cp("formula");
      cp("result");
      cp("ref");
      cp("shareType");
      cp("sharedFormula");
      return copy;
    }
    get value() {
      return this._copyModel(this.model);
    }
    set value(value) {
      this.model = this._copyModel(value);
    }
    validate(value) {
      switch (Value.getType(value)) {
        case Cell.Types.Null:
        case Cell.Types.String:
        case Cell.Types.Number:
        case Cell.Types.Date:
          break;
        case Cell.Types.Hyperlink:
        case Cell.Types.Formula:
        default:
          throw new Error("Cannot process that type of result value");
      }
    }
    get dependencies() {
      const ranges = this.formula.match(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}:[A-Z]{1,3}\d{1,4}/g);
      const cells = this.formula.replace(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}:[A-Z]{1,3}\d{1,4}/g, "").match(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}/g);
      return {
        ranges,
        cells
      };
    }
    get formula() {
      return this.model.formula || this._getTranslatedFormula();
    }
    set formula(value) {
      this.model.formula = value;
    }
    get formulaType() {
      if (this.model.formula) {
        return Enums.FormulaType.Master;
      }
      if (this.model.sharedFormula) {
        return Enums.FormulaType.Shared;
      }
      return Enums.FormulaType.None;
    }
    get result() {
      return this.model.result;
    }
    set result(value) {
      this.model.result = value;
    }
    get type() {
      return Cell.Types.Formula;
    }
    get effectiveType() {
      const v = this.model.result;
      if (v === null || v === void 0) {
        return Enums.ValueType.Null;
      }
      if (v instanceof String || typeof v === "string") {
        return Enums.ValueType.String;
      }
      if (typeof v === "number") {
        return Enums.ValueType.Number;
      }
      if (v instanceof Date) {
        return Enums.ValueType.Date;
      }
      if (v.text && v.hyperlink) {
        return Enums.ValueType.Hyperlink;
      }
      if (v.formula) {
        return Enums.ValueType.Formula;
      }
      return Enums.ValueType.Null;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    _getTranslatedFormula() {
      if (!this._translatedFormula && this.model.sharedFormula) {
        const { worksheet: worksheet2 } = this.cell;
        const master = worksheet2.findCell(this.model.sharedFormula);
        this._translatedFormula = master && slideFormula(master.formula, master.address, this.model.address);
      }
      return this._translatedFormula;
    }
    toCsvString() {
      return `${this.model.result || ""}`;
    }
    release() {
    }
    toString() {
      return this.model.result ? this.model.result.toString() : "";
    }
  }
  class SharedStringValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.SharedString,
        value
      };
    }
    get value() {
      return this.model.value;
    }
    set value(value) {
      this.model.value = value;
    }
    get type() {
      return Cell.Types.SharedString;
    }
    get effectiveType() {
      return Cell.Types.SharedString;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return this.model.value.toString();
    }
    release() {
    }
    toString() {
      return this.model.value.toString();
    }
  }
  class BooleanValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.Boolean,
        value
      };
    }
    get value() {
      return this.model.value;
    }
    set value(value) {
      this.model.value = value;
    }
    get type() {
      return Cell.Types.Boolean;
    }
    get effectiveType() {
      return Cell.Types.Boolean;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return this.model.value ? 1 : 0;
    }
    release() {
    }
    toString() {
      return this.model.value.toString();
    }
  }
  class ErrorValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.Error,
        value
      };
    }
    get value() {
      return this.model.value;
    }
    set value(value) {
      this.model.value = value;
    }
    get type() {
      return Cell.Types.Error;
    }
    get effectiveType() {
      return Cell.Types.Error;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return this.toString();
    }
    release() {
    }
    toString() {
      return this.model.value.error.toString();
    }
  }
  class JSONValue {
    constructor(cell2, value) {
      this.model = {
        address: cell2.address,
        type: Cell.Types.String,
        value: JSON.stringify(value),
        rawValue: value
      };
    }
    get value() {
      return this.model.rawValue;
    }
    set value(value) {
      this.model.rawValue = value;
      this.model.value = JSON.stringify(value);
    }
    get type() {
      return Cell.Types.String;
    }
    get effectiveType() {
      return Cell.Types.String;
    }
    get address() {
      return this.model.address;
    }
    set address(value) {
      this.model.address = value;
    }
    toCsvString() {
      return this.model.value;
    }
    release() {
    }
    toString() {
      return this.model.value;
    }
  }
  const Value = {
    getType(value) {
      if (value === null || value === void 0) {
        return Cell.Types.Null;
      }
      if (value instanceof String || typeof value === "string") {
        return Cell.Types.String;
      }
      if (typeof value === "number") {
        return Cell.Types.Number;
      }
      if (typeof value === "boolean") {
        return Cell.Types.Boolean;
      }
      if (value instanceof Date) {
        return Cell.Types.Date;
      }
      if (value.text && value.hyperlink) {
        return Cell.Types.Hyperlink;
      }
      if (value.formula || value.sharedFormula) {
        return Cell.Types.Formula;
      }
      if (value.richText) {
        return Cell.Types.RichText;
      }
      if (value.sharedString) {
        return Cell.Types.SharedString;
      }
      if (value.error) {
        return Cell.Types.Error;
      }
      return Cell.Types.JSON;
    },
    // map valueType to constructor
    types: [
      { t: Cell.Types.Null, f: NullValue },
      { t: Cell.Types.Number, f: NumberValue },
      { t: Cell.Types.String, f: StringValue },
      { t: Cell.Types.Date, f: DateValue },
      { t: Cell.Types.Hyperlink, f: HyperlinkValue },
      { t: Cell.Types.Formula, f: FormulaValue },
      { t: Cell.Types.Merge, f: MergeValue },
      { t: Cell.Types.JSON, f: JSONValue },
      { t: Cell.Types.SharedString, f: SharedStringValue },
      { t: Cell.Types.RichText, f: RichTextValue },
      { t: Cell.Types.Boolean, f: BooleanValue },
      { t: Cell.Types.Error, f: ErrorValue }
    ].reduce((p, t) => {
      p[t.t] = t.f;
      return p;
    }, []),
    create(type, cell2, value) {
      const T = this.types[type];
      if (!T) {
        throw new Error(`Could not create Value of type ${type}`);
      }
      return new T(cell2, value);
    }
  };
  cell = Cell;
  return cell;
}
var row;
var hasRequiredRow;
function requireRow() {
  if (hasRequiredRow) return row;
  hasRequiredRow = 1;
  const _ = requireUnderDash();
  const Enums = requireEnums();
  const colCache = requireColCache();
  const Cell = requireCell();
  class Row {
    constructor(worksheet2, number) {
      this._worksheet = worksheet2;
      this._number = number;
      this._cells = [];
      this.style = {};
      this.outlineLevel = 0;
    }
    // return the row number
    get number() {
      return this._number;
    }
    get worksheet() {
      return this._worksheet;
    }
    // Inform Streaming Writer that this row (and all rows before it) are complete
    // and ready to write. Has no effect on Worksheet document
    commit() {
      this._worksheet._commitRow(this);
    }
    // helps GC by breaking cyclic references
    destroy() {
      delete this._worksheet;
      delete this._cells;
      delete this.style;
    }
    findCell(colNumber) {
      return this._cells[colNumber - 1];
    }
    // given {address, row, col}, find or create new cell
    getCellEx(address) {
      let cell2 = this._cells[address.col - 1];
      if (!cell2) {
        const column2 = this._worksheet.getColumn(address.col);
        cell2 = new Cell(this, column2, address.address);
        this._cells[address.col - 1] = cell2;
      }
      return cell2;
    }
    // get cell by key, letter or column number
    getCell(col) {
      if (typeof col === "string") {
        const column2 = this._worksheet.getColumnKey(col);
        if (column2) {
          col = column2.number;
        } else {
          col = colCache.l2n(col);
        }
      }
      return this._cells[col - 1] || this.getCellEx({
        address: colCache.encodeAddress(this._number, col),
        row: this._number,
        col
      });
    }
    // remove cell(s) and shift all higher cells down by count
    splice(start, count, ...inserts) {
      const nKeep = start + count;
      const nExpand = inserts.length - count;
      const nEnd = this._cells.length;
      let i;
      let cSrc;
      let cDst;
      if (nExpand < 0) {
        for (i = start + inserts.length; i <= nEnd; i++) {
          cDst = this._cells[i - 1];
          cSrc = this._cells[i - nExpand - 1];
          if (cSrc) {
            cDst = this.getCell(i);
            cDst.value = cSrc.value;
            cDst.style = cSrc.style;
            cDst._comment = cSrc._comment;
          } else if (cDst) {
            cDst.value = null;
            cDst.style = {};
            cDst._comment = void 0;
          }
        }
      } else if (nExpand > 0) {
        for (i = nEnd; i >= nKeep; i--) {
          cSrc = this._cells[i - 1];
          if (cSrc) {
            cDst = this.getCell(i + nExpand);
            cDst.value = cSrc.value;
            cDst.style = cSrc.style;
            cDst._comment = cSrc._comment;
          } else {
            this._cells[i + nExpand - 1] = void 0;
          }
        }
      }
      for (i = 0; i < inserts.length; i++) {
        cDst = this.getCell(start + i);
        cDst.value = inserts[i];
        cDst.style = {};
        cDst._comment = void 0;
      }
    }
    // Iterate over all non-null cells in this row
    eachCell(options, iteratee) {
      if (!iteratee) {
        iteratee = options;
        options = null;
      }
      if (options && options.includeEmpty) {
        const n = this._cells.length;
        for (let i = 1; i <= n; i++) {
          iteratee(this.getCell(i), i);
        }
      } else {
        this._cells.forEach((cell2, index) => {
          if (cell2 && cell2.type !== Enums.ValueType.Null) {
            iteratee(cell2, index + 1);
          }
        });
      }
    }
    // ===========================================================================
    // Page Breaks
    addPageBreak(lft, rght) {
      const ws = this._worksheet;
      const left = Math.max(0, lft - 1) || 0;
      const right = Math.max(0, rght - 1) || 16838;
      const pb = {
        id: this._number,
        max: right,
        man: 1
      };
      if (left) pb.min = left;
      ws.rowBreaks.push(pb);
    }
    // return a sparse array of cell values
    get values() {
      const values = [];
      this._cells.forEach((cell2) => {
        if (cell2 && cell2.type !== Enums.ValueType.Null) {
          values[cell2.col] = cell2.value;
        }
      });
      return values;
    }
    // set the values by contiguous or sparse array, or by key'd object literal
    set values(value) {
      this._cells = [];
      if (!value) ;
      else if (value instanceof Array) {
        let offset = 0;
        if (value.hasOwnProperty("0")) {
          offset = 1;
        }
        value.forEach((item, index) => {
          if (item !== void 0) {
            this.getCellEx({
              address: colCache.encodeAddress(this._number, index + offset),
              row: this._number,
              col: index + offset
            }).value = item;
          }
        });
      } else {
        this._worksheet.eachColumnKey((column2, key) => {
          if (value[key] !== void 0) {
            this.getCellEx({
              address: colCache.encodeAddress(this._number, column2.number),
              row: this._number,
              col: column2.number
            }).value = value[key];
          }
        });
      }
    }
    // returns true if the row includes at least one cell with a value
    get hasValues() {
      return _.some(this._cells, (cell2) => cell2 && cell2.type !== Enums.ValueType.Null);
    }
    get cellCount() {
      return this._cells.length;
    }
    get actualCellCount() {
      let count = 0;
      this.eachCell(() => {
        count++;
      });
      return count;
    }
    // get the min and max column number for the non-null cells in this row or null
    get dimensions() {
      let min = 0;
      let max = 0;
      this._cells.forEach((cell2) => {
        if (cell2 && cell2.type !== Enums.ValueType.Null) {
          if (!min || min > cell2.col) {
            min = cell2.col;
          }
          if (max < cell2.col) {
            max = cell2.col;
          }
        }
      });
      return min > 0 ? {
        min,
        max
      } : null;
    }
    // =========================================================================
    // styles
    _applyStyle(name, value) {
      this.style[name] = value;
      this._cells.forEach((cell2) => {
        if (cell2) {
          cell2[name] = value;
        }
      });
      return value;
    }
    get numFmt() {
      return this.style.numFmt;
    }
    set numFmt(value) {
      this._applyStyle("numFmt", value);
    }
    get font() {
      return this.style.font;
    }
    set font(value) {
      this._applyStyle("font", value);
    }
    get alignment() {
      return this.style.alignment;
    }
    set alignment(value) {
      this._applyStyle("alignment", value);
    }
    get protection() {
      return this.style.protection;
    }
    set protection(value) {
      this._applyStyle("protection", value);
    }
    get border() {
      return this.style.border;
    }
    set border(value) {
      this._applyStyle("border", value);
    }
    get fill() {
      return this.style.fill;
    }
    set fill(value) {
      this._applyStyle("fill", value);
    }
    get hidden() {
      return !!this._hidden;
    }
    set hidden(value) {
      this._hidden = value;
    }
    get outlineLevel() {
      return this._outlineLevel || 0;
    }
    set outlineLevel(value) {
      this._outlineLevel = value;
    }
    get collapsed() {
      return !!(this._outlineLevel && this._outlineLevel >= this._worksheet.properties.outlineLevelRow);
    }
    // =========================================================================
    get model() {
      const cells = [];
      let min = 0;
      let max = 0;
      this._cells.forEach((cell2) => {
        if (cell2) {
          const cellModel = cell2.model;
          if (cellModel) {
            if (!min || min > cell2.col) {
              min = cell2.col;
            }
            if (max < cell2.col) {
              max = cell2.col;
            }
            cells.push(cellModel);
          }
        }
      });
      return this.height || cells.length ? {
        cells,
        number: this.number,
        min,
        max,
        height: this.height,
        style: this.style,
        hidden: this.hidden,
        outlineLevel: this.outlineLevel,
        collapsed: this.collapsed
      } : null;
    }
    set model(value) {
      if (value.number !== this._number) {
        throw new Error("Invalid row number in model");
      }
      this._cells = [];
      let previousAddress;
      value.cells.forEach((cellModel) => {
        switch (cellModel.type) {
          case Cell.Types.Merge:
            break;
          default: {
            let address;
            if (cellModel.address) {
              address = colCache.decodeAddress(cellModel.address);
            } else if (previousAddress) {
              const { row: row2 } = previousAddress;
              const col = previousAddress.col + 1;
              address = {
                row: row2,
                col,
                address: colCache.encodeAddress(row2, col),
                $col$row: `$${colCache.n2l(col)}$${row2}`
              };
            }
            previousAddress = address;
            const cell2 = this.getCellEx(address);
            cell2.model = cellModel;
            break;
          }
        }
      });
      if (value.height) {
        this.height = value.height;
      } else {
        delete this.height;
      }
      this.hidden = value.hidden;
      this.outlineLevel = value.outlineLevel || 0;
      this.style = value.style && JSON.parse(JSON.stringify(value.style)) || {};
    }
  }
  row = Row;
  return row;
}
var column;
var hasRequiredColumn;
function requireColumn() {
  if (hasRequiredColumn) return column;
  hasRequiredColumn = 1;
  const _ = requireUnderDash();
  const Enums = requireEnums();
  const colCache = requireColCache();
  const DEFAULT_COLUMN_WIDTH = 9;
  class Column {
    constructor(worksheet2, number, defn) {
      this._worksheet = worksheet2;
      this._number = number;
      if (defn !== false) {
        this.defn = defn;
      }
    }
    get number() {
      return this._number;
    }
    get worksheet() {
      return this._worksheet;
    }
    get letter() {
      return colCache.n2l(this._number);
    }
    get isCustomWidth() {
      return this.width !== void 0 && this.width !== DEFAULT_COLUMN_WIDTH;
    }
    get defn() {
      return {
        header: this._header,
        key: this.key,
        width: this.width,
        style: this.style,
        hidden: this.hidden,
        outlineLevel: this.outlineLevel
      };
    }
    set defn(value) {
      if (value) {
        this.key = value.key;
        this.width = value.width !== void 0 ? value.width : DEFAULT_COLUMN_WIDTH;
        this.outlineLevel = value.outlineLevel;
        if (value.style) {
          this.style = value.style;
        } else {
          this.style = {};
        }
        this.header = value.header;
        this._hidden = !!value.hidden;
      } else {
        delete this._header;
        delete this._key;
        delete this.width;
        this.style = {};
        this.outlineLevel = 0;
      }
    }
    get headers() {
      return this._header && this._header instanceof Array ? this._header : [this._header];
    }
    get header() {
      return this._header;
    }
    set header(value) {
      if (value !== void 0) {
        this._header = value;
        this.headers.forEach((text, index) => {
          this._worksheet.getCell(index + 1, this.number).value = text;
        });
      } else {
        this._header = void 0;
      }
    }
    get key() {
      return this._key;
    }
    set key(value) {
      const column2 = this._key && this._worksheet.getColumnKey(this._key);
      if (column2 === this) {
        this._worksheet.deleteColumnKey(this._key);
      }
      this._key = value;
      if (value) {
        this._worksheet.setColumnKey(this._key, this);
      }
    }
    get hidden() {
      return !!this._hidden;
    }
    set hidden(value) {
      this._hidden = value;
    }
    get outlineLevel() {
      return this._outlineLevel || 0;
    }
    set outlineLevel(value) {
      this._outlineLevel = value;
    }
    get collapsed() {
      return !!(this._outlineLevel && this._outlineLevel >= this._worksheet.properties.outlineLevelCol);
    }
    toString() {
      return JSON.stringify({
        key: this.key,
        width: this.width,
        headers: this.headers.length ? this.headers : void 0
      });
    }
    equivalentTo(other) {
      return this.width === other.width && this.hidden === other.hidden && this.outlineLevel === other.outlineLevel && _.isEqual(this.style, other.style);
    }
    get isDefault() {
      if (this.isCustomWidth) {
        return false;
      }
      if (this.hidden) {
        return false;
      }
      if (this.outlineLevel) {
        return false;
      }
      const s = this.style;
      if (s && (s.font || s.numFmt || s.alignment || s.border || s.fill || s.protection)) {
        return false;
      }
      return true;
    }
    get headerCount() {
      return this.headers.length;
    }
    eachCell(options, iteratee) {
      const colNumber = this.number;
      if (!iteratee) {
        iteratee = options;
        options = null;
      }
      this._worksheet.eachRow(options, (row2, rowNumber) => {
        iteratee(row2.getCell(colNumber), rowNumber);
      });
    }
    get values() {
      const v = [];
      this.eachCell((cell2, rowNumber) => {
        if (cell2 && cell2.type !== Enums.ValueType.Null) {
          v[rowNumber] = cell2.value;
        }
      });
      return v;
    }
    set values(v) {
      if (!v) {
        return;
      }
      const colNumber = this.number;
      let offset = 0;
      if (v.hasOwnProperty("0")) {
        offset = 1;
      }
      v.forEach((value, index) => {
        this._worksheet.getCell(index + offset, colNumber).value = value;
      });
    }
    // =========================================================================
    // styles
    _applyStyle(name, value) {
      this.style[name] = value;
      this.eachCell((cell2) => {
        cell2[name] = value;
      });
      return value;
    }
    get numFmt() {
      return this.style.numFmt;
    }
    set numFmt(value) {
      this._applyStyle("numFmt", value);
    }
    get font() {
      return this.style.font;
    }
    set font(value) {
      this._applyStyle("font", value);
    }
    get alignment() {
      return this.style.alignment;
    }
    set alignment(value) {
      this._applyStyle("alignment", value);
    }
    get protection() {
      return this.style.protection;
    }
    set protection(value) {
      this._applyStyle("protection", value);
    }
    get border() {
      return this.style.border;
    }
    set border(value) {
      this._applyStyle("border", value);
    }
    get fill() {
      return this.style.fill;
    }
    set fill(value) {
      this._applyStyle("fill", value);
    }
    // =============================================================================
    // static functions
    static toModel(columns) {
      const cols = [];
      let col = null;
      if (columns) {
        columns.forEach((column2, index) => {
          if (column2.isDefault) {
            if (col) {
              col = null;
            }
          } else if (!col || !column2.equivalentTo(col)) {
            col = {
              min: index + 1,
              max: index + 1,
              width: column2.width !== void 0 ? column2.width : DEFAULT_COLUMN_WIDTH,
              style: column2.style,
              isCustomWidth: column2.isCustomWidth,
              hidden: column2.hidden,
              outlineLevel: column2.outlineLevel,
              collapsed: column2.collapsed
            };
            cols.push(col);
          } else {
            col.max = index + 1;
          }
        });
      }
      return cols.length ? cols : void 0;
    }
    static fromModel(worksheet2, cols) {
      cols = cols || [];
      const columns = [];
      let count = 1;
      let index = 0;
      cols = cols.sort(function(pre, next) {
        return pre.min - next.min;
      });
      while (index < cols.length) {
        const col = cols[index++];
        while (count < col.min) {
          columns.push(new Column(worksheet2, count++));
        }
        while (count <= col.max) {
          columns.push(new Column(worksheet2, count++, col));
        }
      }
      return columns.length ? columns : null;
    }
  }
  column = Column;
  return column;
}
var anchor;
var hasRequiredAnchor;
function requireAnchor() {
  if (hasRequiredAnchor) return anchor;
  hasRequiredAnchor = 1;
  const colCache = requireColCache();
  class Anchor {
    constructor(worksheet2, address, offset = 0) {
      this.worksheet = worksheet2;
      if (!address) {
        this.nativeCol = 0;
        this.nativeColOff = 0;
        this.nativeRow = 0;
        this.nativeRowOff = 0;
      } else if (typeof address === "string") {
        const decoded = colCache.decodeAddress(address);
        this.nativeCol = decoded.col + offset;
        this.nativeColOff = 0;
        this.nativeRow = decoded.row + offset;
        this.nativeRowOff = 0;
      } else if (address.nativeCol !== void 0) {
        this.nativeCol = address.nativeCol || 0;
        this.nativeColOff = address.nativeColOff || 0;
        this.nativeRow = address.nativeRow || 0;
        this.nativeRowOff = address.nativeRowOff || 0;
      } else if (address.col !== void 0) {
        this.col = address.col + offset;
        this.row = address.row + offset;
      } else {
        this.nativeCol = 0;
        this.nativeColOff = 0;
        this.nativeRow = 0;
        this.nativeRowOff = 0;
      }
    }
    static asInstance(model) {
      return model instanceof Anchor || model == null ? model : new Anchor(model);
    }
    get col() {
      return this.nativeCol + Math.min(this.colWidth - 1, this.nativeColOff) / this.colWidth;
    }
    set col(v) {
      this.nativeCol = Math.floor(v);
      this.nativeColOff = Math.floor((v - this.nativeCol) * this.colWidth);
    }
    get row() {
      return this.nativeRow + Math.min(this.rowHeight - 1, this.nativeRowOff) / this.rowHeight;
    }
    set row(v) {
      this.nativeRow = Math.floor(v);
      this.nativeRowOff = Math.floor((v - this.nativeRow) * this.rowHeight);
    }
    get colWidth() {
      return this.worksheet && this.worksheet.getColumn(this.nativeCol + 1) && this.worksheet.getColumn(this.nativeCol + 1).isCustomWidth ? Math.floor(this.worksheet.getColumn(this.nativeCol + 1).width * 1e4) : 64e4;
    }
    get rowHeight() {
      return this.worksheet && this.worksheet.getRow(this.nativeRow + 1) && this.worksheet.getRow(this.nativeRow + 1).height ? Math.floor(this.worksheet.getRow(this.nativeRow + 1).height * 1e4) : 18e4;
    }
    get model() {
      return {
        nativeCol: this.nativeCol,
        nativeColOff: this.nativeColOff,
        nativeRow: this.nativeRow,
        nativeRowOff: this.nativeRowOff
      };
    }
    set model(value) {
      this.nativeCol = value.nativeCol;
      this.nativeColOff = value.nativeColOff;
      this.nativeRow = value.nativeRow;
      this.nativeRowOff = value.nativeRowOff;
    }
  }
  anchor = Anchor;
  return anchor;
}
var image;
var hasRequiredImage;
function requireImage() {
  if (hasRequiredImage) return image;
  hasRequiredImage = 1;
  const colCache = requireColCache();
  const Anchor = requireAnchor();
  class Image {
    constructor(worksheet2, model) {
      this.worksheet = worksheet2;
      this.model = model;
    }
    get model() {
      switch (this.type) {
        case "background":
          return {
            type: this.type,
            imageId: this.imageId
          };
        case "image":
          return {
            type: this.type,
            imageId: this.imageId,
            hyperlinks: this.range.hyperlinks,
            range: {
              tl: this.range.tl.model,
              br: this.range.br && this.range.br.model,
              ext: this.range.ext,
              editAs: this.range.editAs
            }
          };
        default:
          throw new Error("Invalid Image Type");
      }
    }
    set model({ type, imageId, range: range2, hyperlinks }) {
      this.type = type;
      this.imageId = imageId;
      if (type === "image") {
        if (typeof range2 === "string") {
          const decoded = colCache.decode(range2);
          this.range = {
            tl: new Anchor(this.worksheet, { col: decoded.left, row: decoded.top }, -1),
            br: new Anchor(this.worksheet, { col: decoded.right, row: decoded.bottom }, 0),
            editAs: "oneCell"
          };
        } else {
          this.range = {
            tl: new Anchor(this.worksheet, range2.tl, 0),
            br: range2.br && new Anchor(this.worksheet, range2.br, 0),
            ext: range2.ext,
            editAs: range2.editAs,
            hyperlinks: hyperlinks || range2.hyperlinks
          };
        }
      }
    }
  }
  image = Image;
  return image;
}
var table;
var hasRequiredTable;
function requireTable() {
  if (hasRequiredTable) return table;
  hasRequiredTable = 1;
  const colCache = requireColCache();
  class Column {
    // wrapper around column model, allowing access and manipulation
    constructor(table2, column2, index) {
      this.table = table2;
      this.column = column2;
      this.index = index;
    }
    _set(name, value) {
      this.table.cacheState();
      this.column[name] = value;
    }
    /* eslint-disable lines-between-class-members */
    get name() {
      return this.column.name;
    }
    set name(value) {
      this._set("name", value);
    }
    get filterButton() {
      return this.column.filterButton;
    }
    set filterButton(value) {
      this.column.filterButton = value;
    }
    get style() {
      return this.column.style;
    }
    set style(value) {
      this.column.style = value;
    }
    get totalsRowLabel() {
      return this.column.totalsRowLabel;
    }
    set totalsRowLabel(value) {
      this._set("totalsRowLabel", value);
    }
    get totalsRowFunction() {
      return this.column.totalsRowFunction;
    }
    set totalsRowFunction(value) {
      this._set("totalsRowFunction", value);
    }
    get totalsRowResult() {
      return this.column.totalsRowResult;
    }
    set totalsRowResult(value) {
      this._set("totalsRowResult", value);
    }
    get totalsRowFormula() {
      return this.column.totalsRowFormula;
    }
    set totalsRowFormula(value) {
      this._set("totalsRowFormula", value);
    }
    /* eslint-enable lines-between-class-members */
  }
  class Table {
    constructor(worksheet2, table2) {
      this.worksheet = worksheet2;
      if (table2) {
        this.table = table2;
        this.validate();
        this.store();
      }
    }
    getFormula(column2) {
      switch (column2.totalsRowFunction) {
        case "none":
          return null;
        case "average":
          return `SUBTOTAL(101,${this.table.name}[${column2.name}])`;
        case "countNums":
          return `SUBTOTAL(102,${this.table.name}[${column2.name}])`;
        case "count":
          return `SUBTOTAL(103,${this.table.name}[${column2.name}])`;
        case "max":
          return `SUBTOTAL(104,${this.table.name}[${column2.name}])`;
        case "min":
          return `SUBTOTAL(105,${this.table.name}[${column2.name}])`;
        case "stdDev":
          return `SUBTOTAL(106,${this.table.name}[${column2.name}])`;
        case "var":
          return `SUBTOTAL(107,${this.table.name}[${column2.name}])`;
        case "sum":
          return `SUBTOTAL(109,${this.table.name}[${column2.name}])`;
        case "custom":
          return column2.totalsRowFormula;
        default:
          throw new Error(`Invalid Totals Row Function: ${column2.totalsRowFunction}`);
      }
    }
    get width() {
      return this.table.columns.length;
    }
    get height() {
      return this.table.rows.length;
    }
    get filterHeight() {
      return this.height + (this.table.headerRow ? 1 : 0);
    }
    get tableHeight() {
      return this.filterHeight + (this.table.totalsRow ? 1 : 0);
    }
    validate() {
      const { table: table2 } = this;
      const assign = (o, name, dflt) => {
        if (o[name] === void 0) {
          o[name] = dflt;
        }
      };
      assign(table2, "headerRow", true);
      assign(table2, "totalsRow", false);
      assign(table2, "style", {});
      assign(table2.style, "theme", "TableStyleMedium2");
      assign(table2.style, "showFirstColumn", false);
      assign(table2.style, "showLastColumn", false);
      assign(table2.style, "showRowStripes", false);
      assign(table2.style, "showColumnStripes", false);
      const assert = (test, message) => {
        if (!test) {
          throw new Error(message);
        }
      };
      assert(table2.ref, "Table must have ref");
      assert(table2.columns, "Table must have column definitions");
      assert(table2.rows, "Table must have row definitions");
      table2.tl = colCache.decodeAddress(table2.ref);
      const { row: row2, col } = table2.tl;
      assert(row2 > 0, "Table must be on valid row");
      assert(col > 0, "Table must be on valid col");
      const { width, filterHeight, tableHeight } = this;
      table2.autoFilterRef = colCache.encode(row2, col, row2 + filterHeight - 1, col + width - 1);
      table2.tableRef = colCache.encode(row2, col, row2 + tableHeight - 1, col + width - 1);
      table2.columns.forEach((column2, i) => {
        assert(column2.name, `Column ${i} must have a name`);
        if (i === 0) {
          assign(column2, "totalsRowLabel", "Total");
        } else {
          assign(column2, "totalsRowFunction", "none");
          column2.totalsRowFormula = this.getFormula(column2);
        }
      });
    }
    store() {
      const assignStyle = (cell2, style) => {
        if (style) {
          Object.keys(style).forEach((key) => {
            cell2[key] = style[key];
          });
        }
      };
      const { worksheet: worksheet2, table: table2 } = this;
      const { row: row2, col } = table2.tl;
      let count = 0;
      if (table2.headerRow) {
        const r = worksheet2.getRow(row2 + count++);
        table2.columns.forEach((column2, j) => {
          const { style, name } = column2;
          const cell2 = r.getCell(col + j);
          cell2.value = name;
          assignStyle(cell2, style);
        });
      }
      table2.rows.forEach((data) => {
        const r = worksheet2.getRow(row2 + count++);
        data.forEach((value, j) => {
          const cell2 = r.getCell(col + j);
          cell2.value = value;
          assignStyle(cell2, table2.columns[j].style);
        });
      });
      if (table2.totalsRow) {
        const r = worksheet2.getRow(row2 + count++);
        table2.columns.forEach((column2, j) => {
          const cell2 = r.getCell(col + j);
          if (j === 0) {
            cell2.value = column2.totalsRowLabel;
          } else {
            const formula = this.getFormula(column2);
            if (formula) {
              cell2.value = {
                formula: column2.totalsRowFormula,
                result: column2.totalsRowResult
              };
            } else {
              cell2.value = null;
            }
          }
          assignStyle(cell2, column2.style);
        });
      }
    }
    load(worksheet2) {
      const { table: table2 } = this;
      const { row: row2, col } = table2.tl;
      let count = 0;
      if (table2.headerRow) {
        const r = worksheet2.getRow(row2 + count++);
        table2.columns.forEach((column2, j) => {
          const cell2 = r.getCell(col + j);
          cell2.value = column2.name;
        });
      }
      table2.rows.forEach((data) => {
        const r = worksheet2.getRow(row2 + count++);
        data.forEach((value, j) => {
          const cell2 = r.getCell(col + j);
          cell2.value = value;
        });
      });
      if (table2.totalsRow) {
        const r = worksheet2.getRow(row2 + count++);
        table2.columns.forEach((column2, j) => {
          const cell2 = r.getCell(col + j);
          if (j === 0) {
            cell2.value = column2.totalsRowLabel;
          } else {
            const formula = this.getFormula(column2);
            if (formula) {
              cell2.value = {
                formula: column2.totalsRowFormula,
                result: column2.totalsRowResult
              };
            }
          }
        });
      }
    }
    get model() {
      return this.table;
    }
    set model(value) {
      this.table = value;
    }
    // ================================================================
    // TODO: Mutating methods
    cacheState() {
      if (!this._cache) {
        this._cache = {
          ref: this.ref,
          width: this.width,
          tableHeight: this.tableHeight
        };
      }
    }
    commit() {
      if (!this._cache) {
        return;
      }
      this.validate();
      const ref = colCache.decodeAddress(this._cache.ref);
      if (this.ref !== this._cache.ref) {
        for (let i = 0; i < this._cache.tableHeight; i++) {
          const row2 = this.worksheet.getRow(ref.row + i);
          for (let j = 0; j < this._cache.width; j++) {
            const cell2 = row2.getCell(ref.col + j);
            cell2.value = null;
          }
        }
      } else {
        for (let i = this.tableHeight; i < this._cache.tableHeight; i++) {
          const row2 = this.worksheet.getRow(ref.row + i);
          for (let j = 0; j < this._cache.width; j++) {
            const cell2 = row2.getCell(ref.col + j);
            cell2.value = null;
          }
        }
        for (let i = 0; i < this.tableHeight; i++) {
          const row2 = this.worksheet.getRow(ref.row + i);
          for (let j = this.width; j < this._cache.width; j++) {
            const cell2 = row2.getCell(ref.col + j);
            cell2.value = null;
          }
        }
      }
      this.store();
    }
    addRow(values, rowNumber) {
      this.cacheState();
      if (rowNumber === void 0) {
        this.table.rows.push(values);
      } else {
        this.table.rows.splice(rowNumber, 0, values);
      }
    }
    removeRows(rowIndex, count = 1) {
      this.cacheState();
      this.table.rows.splice(rowIndex, count);
    }
    getColumn(colIndex) {
      const column2 = this.table.columns[colIndex];
      return new Column(this, column2, colIndex);
    }
    addColumn(column2, values, colIndex) {
      this.cacheState();
      if (colIndex === void 0) {
        this.table.columns.push(column2);
        this.table.rows.forEach((row2, i) => {
          row2.push(values[i]);
        });
      } else {
        this.table.columns.splice(colIndex, 0, column2);
        this.table.rows.forEach((row2, i) => {
          row2.splice(colIndex, 0, values[i]);
        });
      }
    }
    removeColumns(colIndex, count = 1) {
      this.cacheState();
      this.table.columns.splice(colIndex, count);
      this.table.rows.forEach((row2) => {
        row2.splice(colIndex, count);
      });
    }
    _assign(target, prop, value) {
      this.cacheState();
      target[prop] = value;
    }
    /* eslint-disable lines-between-class-members */
    get ref() {
      return this.table.ref;
    }
    set ref(value) {
      this._assign(this.table, "ref", value);
    }
    get name() {
      return this.table.name;
    }
    set name(value) {
      this.table.name = value;
    }
    get displayName() {
      return this.table.displyName || this.table.name;
    }
    set displayNamename(value) {
      this.table.displayName = value;
    }
    get headerRow() {
      return this.table.headerRow;
    }
    set headerRow(value) {
      this._assign(this.table, "headerRow", value);
    }
    get totalsRow() {
      return this.table.totalsRow;
    }
    set totalsRow(value) {
      this._assign(this.table, "totalsRow", value);
    }
    get theme() {
      return this.table.style.name;
    }
    set theme(value) {
      this.table.style.name = value;
    }
    get showFirstColumn() {
      return this.table.style.showFirstColumn;
    }
    set showFirstColumn(value) {
      this.table.style.showFirstColumn = value;
    }
    get showLastColumn() {
      return this.table.style.showLastColumn;
    }
    set showLastColumn(value) {
      this.table.style.showLastColumn = value;
    }
    get showRowStripes() {
      return this.table.style.showRowStripes;
    }
    set showRowStripes(value) {
      this.table.style.showRowStripes = value;
    }
    get showColumnStripes() {
      return this.table.style.showColumnStripes;
    }
    set showColumnStripes(value) {
      this.table.style.showColumnStripes = value;
    }
    /* eslint-enable lines-between-class-members */
  }
  table = Table;
  return table;
}
var dataValidations;
var hasRequiredDataValidations;
function requireDataValidations() {
  if (hasRequiredDataValidations) return dataValidations;
  hasRequiredDataValidations = 1;
  class DataValidations {
    constructor(model) {
      this.model = model || {};
    }
    add(address, validation) {
      return this.model[address] = validation;
    }
    find(address) {
      return this.model[address];
    }
    remove(address) {
      this.model[address] = void 0;
    }
  }
  dataValidations = DataValidations;
  return dataValidations;
}
var encryptor;
var hasRequiredEncryptor;
function requireEncryptor() {
  if (hasRequiredEncryptor) return encryptor;
  hasRequiredEncryptor = 1;
  const crypto = require$$0;
  const Encryptor = {
    /**
     * Calculate a hash of the concatenated buffers with the given algorithm.
     * @param {string} algorithm - The hash algorithm.
     * @returns {Buffer} The hash
     */
    hash(algorithm, ...buffers) {
      const hash = crypto.createHash(algorithm);
      hash.update(Buffer.concat(buffers));
      return hash.digest();
    },
    /**
     * Convert a password into an encryption key
     * @param {string} password - The password
     * @param {string} hashAlgorithm - The hash algoritm
     * @param {string} saltValue - The salt value
     * @param {number} spinCount - The spin count
     * @param {number} keyBits - The length of the key in bits
     * @param {Buffer} blockKey - The block key
     * @returns {Buffer} The encryption key
     */
    convertPasswordToHash(password, hashAlgorithm, saltValue, spinCount) {
      hashAlgorithm = hashAlgorithm.toLowerCase();
      const hashes = crypto.getHashes();
      if (hashes.indexOf(hashAlgorithm) < 0) {
        throw new Error(`Hash algorithm '${hashAlgorithm}' not supported!`);
      }
      const passwordBuffer = Buffer.from(password, "utf16le");
      let key = this.hash(hashAlgorithm, Buffer.from(saltValue, "base64"), passwordBuffer);
      for (let i = 0; i < spinCount; i++) {
        const iterator = Buffer.alloc(4);
        iterator.writeUInt32LE(i, 0);
        key = this.hash(hashAlgorithm, key, iterator);
      }
      return key.toString("base64");
    },
    /**
     * Generates cryptographically strong pseudo-random data.
     * @param size The size argument is a number indicating the number of bytes to generate.
     */
    randomBytes(size) {
      return crypto.randomBytes(size);
    }
  };
  encryptor = Encryptor;
  return encryptor;
}
var copyStyle = {};
var hasRequiredCopyStyle;
function requireCopyStyle() {
  if (hasRequiredCopyStyle) return copyStyle;
  hasRequiredCopyStyle = 1;
  const oneDepthCopy = (obj, nestKeys) => ({
    ...obj,
    ...nestKeys.reduce((memo, key) => {
      if (obj[key]) memo[key] = { ...obj[key] };
      return memo;
    }, {})
  });
  const setIfExists = (src, dst, key, nestKeys = []) => {
    if (src[key]) dst[key] = oneDepthCopy(src[key], nestKeys);
  };
  const isEmptyObj = (obj) => Object.keys(obj).length === 0;
  const copyStyle$1 = (style) => {
    if (!style) return style;
    if (isEmptyObj(style)) return {};
    const copied = { ...style };
    setIfExists(style, copied, "font", ["color"]);
    setIfExists(style, copied, "alignment");
    setIfExists(style, copied, "protection");
    if (style.border) {
      setIfExists(style, copied, "border");
      setIfExists(style.border, copied.border, "top", ["color"]);
      setIfExists(style.border, copied.border, "left", ["color"]);
      setIfExists(style.border, copied.border, "bottom", ["color"]);
      setIfExists(style.border, copied.border, "right", ["color"]);
      setIfExists(style.border, copied.border, "diagonal", ["color"]);
    }
    if (style.fill) {
      setIfExists(style, copied, "fill", ["fgColor", "bgColor", "center"]);
      if (style.fill.stops) {
        copied.fill.stops = style.fill.stops.map((s) => oneDepthCopy(s, ["color"]));
      }
    }
    return copied;
  };
  copyStyle.copyStyle = copyStyle$1;
  return copyStyle;
}
var worksheet;
var hasRequiredWorksheet;
function requireWorksheet() {
  if (hasRequiredWorksheet) return worksheet;
  hasRequiredWorksheet = 1;
  const _ = requireUnderDash();
  const colCache = requireColCache();
  const Range = requireRange();
  const Row = requireRow();
  const Column = requireColumn();
  const Enums = requireEnums();
  const Image = requireImage();
  const Table = requireTable();
  const DataValidations = requireDataValidations();
  const Encryptor = requireEncryptor();
  const { copyStyle: copyStyle2 } = requireCopyStyle();
  class Worksheet {
    constructor(options) {
      options = options || {};
      this._workbook = options.workbook;
      this.id = options.id;
      this.orderNo = options.orderNo;
      this.name = options.name;
      this.state = options.state || "visible";
      this._rows = [];
      this._columns = null;
      this._keys = {};
      this._merges = {};
      this.rowBreaks = [];
      this.properties = Object.assign(
        {},
        {
          defaultRowHeight: 15,
          dyDescent: 55,
          outlineLevelCol: 0,
          outlineLevelRow: 0
        },
        options.properties
      );
      this.pageSetup = Object.assign(
        {},
        {
          margins: { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 },
          orientation: "portrait",
          horizontalDpi: 4294967295,
          verticalDpi: 4294967295,
          fitToPage: !!(options.pageSetup && (options.pageSetup.fitToWidth || options.pageSetup.fitToHeight) && !options.pageSetup.scale),
          pageOrder: "downThenOver",
          blackAndWhite: false,
          draft: false,
          cellComments: "None",
          errors: "displayed",
          scale: 100,
          fitToWidth: 1,
          fitToHeight: 1,
          paperSize: void 0,
          showRowColHeaders: false,
          showGridLines: false,
          firstPageNumber: void 0,
          horizontalCentered: false,
          verticalCentered: false,
          rowBreaks: null,
          colBreaks: null
        },
        options.pageSetup
      );
      this.headerFooter = Object.assign(
        {},
        {
          differentFirst: false,
          differentOddEven: false,
          oddHeader: null,
          oddFooter: null,
          evenHeader: null,
          evenFooter: null,
          firstHeader: null,
          firstFooter: null
        },
        options.headerFooter
      );
      this.dataValidations = new DataValidations();
      this.views = options.views || [];
      this.autoFilter = options.autoFilter || null;
      this._media = [];
      this.sheetProtection = null;
      this.tables = {};
      this.conditionalFormattings = [];
    }
    get name() {
      return this._name;
    }
    set name(name) {
      if (name === void 0) {
        name = `sheet${this.id}`;
      }
      if (this._name === name) return;
      if (typeof name !== "string") {
        throw new Error("The name has to be a string.");
      }
      if (name === "") {
        throw new Error("The name can't be empty.");
      }
      if (name === "History") {
        throw new Error('The name "History" is protected. Please use a different name.');
      }
      if (/[*?:/\\[\]]/.test(name)) {
        throw new Error(`Worksheet name ${name} cannot include any of the following characters: * ? : \\ / [ ]`);
      }
      if (/(^')|('$)/.test(name)) {
        throw new Error(`The first or last character of worksheet name cannot be a single quotation mark: ${name}`);
      }
      if (name && name.length > 31) {
        console.warn(`Worksheet name ${name} exceeds 31 chars. This will be truncated`);
        name = name.substring(0, 31);
      }
      if (this._workbook._worksheets.find((ws) => ws && ws.name.toLowerCase() === name.toLowerCase())) {
        throw new Error(`Worksheet name already exists: ${name}`);
      }
      this._name = name;
    }
    get workbook() {
      return this._workbook;
    }
    // when you're done with this worksheet, call this to remove from workbook
    destroy() {
      this._workbook.removeWorksheetEx(this);
    }
    // Get the bounding range of the cells in this worksheet
    get dimensions() {
      const dimensions = new Range();
      this._rows.forEach((row2) => {
        if (row2) {
          const rowDims = row2.dimensions;
          if (rowDims) {
            dimensions.expand(row2.number, rowDims.min, row2.number, rowDims.max);
          }
        }
      });
      return dimensions;
    }
    // =========================================================================
    // Columns
    // get the current columns array.
    get columns() {
      return this._columns;
    }
    // set the columns from an array of column definitions.
    // Note: any headers defined will overwrite existing values.
    set columns(value) {
      this._headerRowCount = value.reduce((pv, cv) => {
        const headerCount = cv.header && 1 || cv.headers && cv.headers.length || 0;
        return Math.max(pv, headerCount);
      }, 0);
      let count = 1;
      const columns = this._columns = [];
      value.forEach((defn) => {
        const column2 = new Column(this, count++, false);
        columns.push(column2);
        column2.defn = defn;
      });
    }
    getColumnKey(key) {
      return this._keys[key];
    }
    setColumnKey(key, value) {
      this._keys[key] = value;
    }
    deleteColumnKey(key) {
      delete this._keys[key];
    }
    eachColumnKey(f) {
      _.each(this._keys, f);
    }
    // get a single column by col number. If it doesn't exist, create it and any gaps before it
    getColumn(c) {
      if (typeof c === "string") {
        const col = this._keys[c];
        if (col) return col;
        c = colCache.l2n(c);
      }
      if (!this._columns) {
        this._columns = [];
      }
      if (c > this._columns.length) {
        let n = this._columns.length + 1;
        while (n <= c) {
          this._columns.push(new Column(this, n++));
        }
      }
      return this._columns[c - 1];
    }
    spliceColumns(start, count, ...inserts) {
      const rows = this._rows;
      const nRows = rows.length;
      if (inserts.length > 0) {
        for (let i = 0; i < nRows; i++) {
          const rowArguments = [start, count];
          inserts.forEach((insert) => {
            rowArguments.push(insert[i] || null);
          });
          const row2 = this.getRow(i + 1);
          row2.splice.apply(row2, rowArguments);
        }
      } else {
        this._rows.forEach((r) => {
          if (r) {
            r.splice(start, count);
          }
        });
      }
      const nExpand = inserts.length - count;
      const nKeep = start + count;
      const nEnd = this._columns.length;
      if (nExpand < 0) {
        for (let i = start + inserts.length; i <= nEnd; i++) {
          this.getColumn(i).defn = this.getColumn(i - nExpand).defn;
        }
      } else if (nExpand > 0) {
        for (let i = nEnd; i >= nKeep; i--) {
          this.getColumn(i + nExpand).defn = this.getColumn(i).defn;
        }
      }
      for (let i = start; i < start + inserts.length; i++) {
        this.getColumn(i).defn = null;
      }
      this.workbook.definedNames.spliceColumns(this.name, start, count, inserts.length);
    }
    get lastColumn() {
      return this.getColumn(this.columnCount);
    }
    get columnCount() {
      let maxCount = 0;
      this.eachRow((row2) => {
        maxCount = Math.max(maxCount, row2.cellCount);
      });
      return maxCount;
    }
    get actualColumnCount() {
      const counts = [];
      let count = 0;
      this.eachRow((row2) => {
        row2.eachCell(({ col }) => {
          if (!counts[col]) {
            counts[col] = true;
            count++;
          }
        });
      });
      return count;
    }
    // =========================================================================
    // Rows
    _commitRow() {
    }
    get _lastRowNumber() {
      const rows = this._rows;
      let n = rows.length;
      while (n > 0 && rows[n - 1] === void 0) {
        n--;
      }
      return n;
    }
    get _nextRow() {
      return this._lastRowNumber + 1;
    }
    get lastRow() {
      if (this._rows.length) {
        return this._rows[this._rows.length - 1];
      }
      return void 0;
    }
    // find a row (if exists) by row number
    findRow(r) {
      return this._rows[r - 1];
    }
    // find multiple rows (if exists) by row number
    findRows(start, length) {
      return this._rows.slice(start - 1, start - 1 + length);
    }
    get rowCount() {
      return this._lastRowNumber;
    }
    get actualRowCount() {
      let count = 0;
      this.eachRow(() => {
        count++;
      });
      return count;
    }
    // get a row by row number.
    getRow(r) {
      let row2 = this._rows[r - 1];
      if (!row2) {
        row2 = this._rows[r - 1] = new Row(this, r);
      }
      return row2;
    }
    // get multiple rows by row number.
    getRows(start, length) {
      if (length < 1) return void 0;
      const rows = [];
      for (let i = start; i < start + length; i++) {
        rows.push(this.getRow(i));
      }
      return rows;
    }
    addRow(value, style = "n") {
      const rowNo = this._nextRow;
      const row2 = this.getRow(rowNo);
      row2.values = value;
      this._setStyleOption(rowNo, style[0] === "i" ? style : "n");
      return row2;
    }
    addRows(value, style = "n") {
      const rows = [];
      value.forEach((row2) => {
        rows.push(this.addRow(row2, style));
      });
      return rows;
    }
    insertRow(pos, value, style = "n") {
      this.spliceRows(pos, 0, value);
      this._setStyleOption(pos, style);
      return this.getRow(pos);
    }
    insertRows(pos, values, style = "n") {
      this.spliceRows(pos, 0, ...values);
      if (style !== "n") {
        for (let i = 0; i < values.length; i++) {
          if (style[0] === "o" && this.findRow(values.length + pos + i) !== void 0) {
            this._copyStyle(values.length + pos + i, pos + i, style[1] === "+");
          } else if (style[0] === "i" && this.findRow(pos - 1) !== void 0) {
            this._copyStyle(pos - 1, pos + i, style[1] === "+");
          }
        }
      }
      return this.getRows(pos, values.length);
    }
    // set row at position to same style as of either pervious row (option 'i') or next row (option 'o')
    _setStyleOption(pos, style = "n") {
      if (style[0] === "o" && this.findRow(pos + 1) !== void 0) {
        this._copyStyle(pos + 1, pos, style[1] === "+");
      } else if (style[0] === "i" && this.findRow(pos - 1) !== void 0) {
        this._copyStyle(pos - 1, pos, style[1] === "+");
      }
    }
    _copyStyle(src, dest, styleEmpty = false) {
      const rSrc = this.getRow(src);
      const rDst = this.getRow(dest);
      rDst.style = copyStyle2(rSrc.style);
      rSrc.eachCell({ includeEmpty: styleEmpty }, (cell2, colNumber) => {
        rDst.getCell(colNumber).style = copyStyle2(cell2.style);
      });
      rDst.height = rSrc.height;
    }
    duplicateRow(rowNum, count, insert = false) {
      const rSrc = this._rows[rowNum - 1];
      const inserts = new Array(count).fill(rSrc.values);
      this.spliceRows(rowNum + 1, insert ? 0 : count, ...inserts);
      for (let i = 0; i < count; i++) {
        const rDst = this._rows[rowNum + i];
        rDst.style = rSrc.style;
        rDst.height = rSrc.height;
        rSrc.eachCell({ includeEmpty: true }, (cell2, colNumber) => {
          rDst.getCell(colNumber).style = cell2.style;
        });
      }
    }
    spliceRows(start, count, ...inserts) {
      const nKeep = start + count;
      const nInserts = inserts.length;
      const nExpand = nInserts - count;
      const nEnd = this._rows.length;
      let i;
      let rSrc;
      if (nExpand < 0) {
        if (start === nEnd) {
          this._rows[nEnd - 1] = void 0;
        }
        for (i = nKeep; i <= nEnd; i++) {
          rSrc = this._rows[i - 1];
          if (rSrc) {
            const rDst = this.getRow(i + nExpand);
            rDst.values = rSrc.values;
            rDst.style = rSrc.style;
            rDst.height = rSrc.height;
            rSrc.eachCell({ includeEmpty: true }, (cell2, colNumber) => {
              rDst.getCell(colNumber).style = cell2.style;
            });
            this._rows[i - 1] = void 0;
          } else {
            this._rows[i + nExpand - 1] = void 0;
          }
        }
      } else if (nExpand > 0) {
        for (i = nEnd; i >= nKeep; i--) {
          rSrc = this._rows[i - 1];
          if (rSrc) {
            const rDst = this.getRow(i + nExpand);
            rDst.values = rSrc.values;
            rDst.style = rSrc.style;
            rDst.height = rSrc.height;
            rSrc.eachCell({ includeEmpty: true }, (cell2, colNumber) => {
              rDst.getCell(colNumber).style = cell2.style;
              if (cell2._value.constructor.name === "MergeValue") {
                const cellToBeMerged = this.getRow(cell2._row._number + nInserts).getCell(colNumber);
                const prevMaster = cell2._value._master;
                const newMaster = this.getRow(prevMaster._row._number + nInserts).getCell(prevMaster._column._number);
                cellToBeMerged.merge(newMaster);
              }
            });
          } else {
            this._rows[i + nExpand - 1] = void 0;
          }
        }
      }
      for (i = 0; i < nInserts; i++) {
        const rDst = this.getRow(start + i);
        rDst.style = {};
        rDst.values = inserts[i];
      }
      this.workbook.definedNames.spliceRows(this.name, start, count, nInserts);
    }
    // iterate over every row in the worksheet, including maybe empty rows
    eachRow(options, iteratee) {
      if (!iteratee) {
        iteratee = options;
        options = void 0;
      }
      if (options && options.includeEmpty) {
        const n = this._rows.length;
        for (let i = 1; i <= n; i++) {
          iteratee(this.getRow(i), i);
        }
      } else {
        this._rows.forEach((row2) => {
          if (row2 && row2.hasValues) {
            iteratee(row2, row2.number);
          }
        });
      }
    }
    // return all rows as sparse array
    getSheetValues() {
      const rows = [];
      this._rows.forEach((row2) => {
        if (row2) {
          rows[row2.number] = row2.values;
        }
      });
      return rows;
    }
    // =========================================================================
    // Cells
    // returns the cell at [r,c] or address given by r. If not found, return undefined
    findCell(r, c) {
      const address = colCache.getAddress(r, c);
      const row2 = this._rows[address.row - 1];
      return row2 ? row2.findCell(address.col) : void 0;
    }
    // return the cell at [r,c] or address given by r. If not found, create a new one.
    getCell(r, c) {
      const address = colCache.getAddress(r, c);
      const row2 = this.getRow(address.row);
      return row2.getCellEx(address);
    }
    // =========================================================================
    // Merge
    // convert the range defined by ['tl:br'], [tl,br] or [t,l,b,r] into a single 'merged' cell
    mergeCells(...cells) {
      const dimensions = new Range(cells);
      this._mergeCellsInternal(dimensions);
    }
    mergeCellsWithoutStyle(...cells) {
      const dimensions = new Range(cells);
      this._mergeCellsInternal(dimensions, true);
    }
    _mergeCellsInternal(dimensions, ignoreStyle) {
      _.each(this._merges, (merge) => {
        if (merge.intersects(dimensions)) {
          throw new Error("Cannot merge already merged cells");
        }
      });
      const master = this.getCell(dimensions.top, dimensions.left);
      for (let i = dimensions.top; i <= dimensions.bottom; i++) {
        for (let j = dimensions.left; j <= dimensions.right; j++) {
          if (i > dimensions.top || j > dimensions.left) {
            this.getCell(i, j).merge(master, ignoreStyle);
          }
        }
      }
      this._merges[master.address] = dimensions;
    }
    _unMergeMaster(master) {
      const merge = this._merges[master.address];
      if (merge) {
        for (let i = merge.top; i <= merge.bottom; i++) {
          for (let j = merge.left; j <= merge.right; j++) {
            this.getCell(i, j).unmerge();
          }
        }
        delete this._merges[master.address];
      }
    }
    get hasMerges() {
      return _.some(this._merges, Boolean);
    }
    // scan the range defined by ['tl:br'], [tl,br] or [t,l,b,r] and if any cell is part of a merge,
    // un-merge the group. Note this function can affect multiple merges and merge-blocks are
    // atomic - either they're all merged or all un-merged.
    unMergeCells(...cells) {
      const dimensions = new Range(cells);
      for (let i = dimensions.top; i <= dimensions.bottom; i++) {
        for (let j = dimensions.left; j <= dimensions.right; j++) {
          const cell2 = this.findCell(i, j);
          if (cell2) {
            if (cell2.type === Enums.ValueType.Merge) {
              this._unMergeMaster(cell2.master);
            } else if (this._merges[cell2.address]) {
              this._unMergeMaster(cell2);
            }
          }
        }
      }
    }
    // ===========================================================================
    // Shared/Array Formula
    fillFormula(range2, formula, results, shareType = "shared") {
      const decoded = colCache.decode(range2);
      const { top, left, bottom, right } = decoded;
      const width = right - left + 1;
      const masterAddress = colCache.encodeAddress(top, left);
      const isShared = shareType === "shared";
      let getResult;
      if (typeof results === "function") {
        getResult = results;
      } else if (Array.isArray(results)) {
        if (Array.isArray(results[0])) {
          getResult = (row2, col) => results[row2 - top][col - left];
        } else {
          getResult = (row2, col) => results[(row2 - top) * width + (col - left)];
        }
      } else {
        getResult = () => void 0;
      }
      let first = true;
      for (let r = top; r <= bottom; r++) {
        for (let c = left; c <= right; c++) {
          if (first) {
            this.getCell(r, c).value = {
              shareType,
              formula,
              ref: range2,
              result: getResult(r, c)
            };
            first = false;
          } else {
            this.getCell(r, c).value = isShared ? {
              sharedFormula: masterAddress,
              result: getResult(r, c)
            } : getResult(r, c);
          }
        }
      }
    }
    // =========================================================================
    // Images
    addImage(imageId, range2) {
      const model = {
        type: "image",
        imageId,
        range: range2
      };
      this._media.push(new Image(this, model));
    }
    getImages() {
      return this._media.filter((m) => m.type === "image");
    }
    addBackgroundImage(imageId) {
      const model = {
        type: "background",
        imageId
      };
      this._media.push(new Image(this, model));
    }
    getBackgroundImageId() {
      const image2 = this._media.find((m) => m.type === "background");
      return image2 && image2.imageId;
    }
    // =========================================================================
    // Worksheet Protection
    protect(password, options) {
      return new Promise((resolve) => {
        this.sheetProtection = {
          sheet: true
        };
        if (options && "spinCount" in options) {
          options.spinCount = Number.isFinite(options.spinCount) ? Math.round(Math.max(0, options.spinCount)) : 1e5;
        }
        if (password) {
          this.sheetProtection.algorithmName = "SHA-512";
          this.sheetProtection.saltValue = Encryptor.randomBytes(16).toString("base64");
          this.sheetProtection.spinCount = options && "spinCount" in options ? options.spinCount : 1e5;
          this.sheetProtection.hashValue = Encryptor.convertPasswordToHash(
            password,
            "SHA512",
            this.sheetProtection.saltValue,
            this.sheetProtection.spinCount
          );
        }
        if (options) {
          this.sheetProtection = Object.assign(this.sheetProtection, options);
          if (!password && "spinCount" in options) {
            delete this.sheetProtection.spinCount;
          }
        }
        resolve();
      });
    }
    unprotect() {
      this.sheetProtection = null;
    }
    // =========================================================================
    // Tables
    addTable(model) {
      const table2 = new Table(this, model);
      this.tables[model.name] = table2;
      return table2;
    }
    getTable(name) {
      return this.tables[name];
    }
    removeTable(name) {
      delete this.tables[name];
    }
    getTables() {
      return Object.values(this.tables);
    }
    // ===========================================================================
    // Conditional Formatting
    addConditionalFormatting(cf) {
      this.conditionalFormattings.push(cf);
    }
    removeConditionalFormatting(filter) {
      if (typeof filter === "number") {
        this.conditionalFormattings.splice(filter, 1);
      } else if (filter instanceof Function) {
        this.conditionalFormattings = this.conditionalFormattings.filter(filter);
      } else {
        this.conditionalFormattings = [];
      }
    }
    // ===========================================================================
    // Deprecated
    get tabColor() {
      console.trace("worksheet.tabColor property is now deprecated. Please use worksheet.properties.tabColor");
      return this.properties.tabColor;
    }
    set tabColor(value) {
      console.trace("worksheet.tabColor property is now deprecated. Please use worksheet.properties.tabColor");
      this.properties.tabColor = value;
    }
    // ===========================================================================
    // Model
    get model() {
      const model = {
        id: this.id,
        name: this.name,
        dataValidations: this.dataValidations.model,
        properties: this.properties,
        state: this.state,
        pageSetup: this.pageSetup,
        headerFooter: this.headerFooter,
        rowBreaks: this.rowBreaks,
        views: this.views,
        autoFilter: this.autoFilter,
        media: this._media.map((medium) => medium.model),
        sheetProtection: this.sheetProtection,
        tables: Object.values(this.tables).map((table2) => table2.model),
        conditionalFormattings: this.conditionalFormattings
      };
      model.cols = Column.toModel(this.columns);
      const rows = model.rows = [];
      const dimensions = model.dimensions = new Range();
      this._rows.forEach((row2) => {
        const rowModel = row2 && row2.model;
        if (rowModel) {
          dimensions.expand(rowModel.number, rowModel.min, rowModel.number, rowModel.max);
          rows.push(rowModel);
        }
      });
      model.merges = [];
      _.each(this._merges, (merge) => {
        model.merges.push(merge.range);
      });
      return model;
    }
    _parseRows(model) {
      this._rows = [];
      model.rows.forEach((rowModel) => {
        const row2 = new Row(this, rowModel.number);
        this._rows[row2.number - 1] = row2;
        row2.model = rowModel;
      });
    }
    _parseMergeCells(model) {
      _.each(model.mergeCells, (merge) => {
        this.mergeCellsWithoutStyle(merge);
      });
    }
    set model(value) {
      this.name = value.name;
      this._columns = Column.fromModel(this, value.cols);
      this._parseRows(value);
      this._parseMergeCells(value);
      this.dataValidations = new DataValidations(value.dataValidations);
      this.properties = value.properties;
      this.pageSetup = value.pageSetup;
      this.headerFooter = value.headerFooter;
      this.views = value.views;
      this.autoFilter = value.autoFilter;
      this._media = value.media.map((medium) => new Image(this, medium));
      this.sheetProtection = value.sheetProtection;
      this.tables = value.tables.reduce((tables, table2) => {
        const t = new Table();
        t.model = table2;
        tables[table2.name] = t;
        return tables;
      }, {});
      this.conditionalFormattings = value.conditionalFormattings;
    }
  }
  worksheet = Worksheet;
  return worksheet;
}
var cellMatrix;
var hasRequiredCellMatrix;
function requireCellMatrix() {
  if (hasRequiredCellMatrix) return cellMatrix;
  hasRequiredCellMatrix = 1;
  const _ = requireUnderDash();
  const colCache = requireColCache();
  class CellMatrix {
    constructor(template) {
      this.template = template;
      this.sheets = {};
    }
    addCell(addressStr) {
      this.addCellEx(colCache.decodeEx(addressStr));
    }
    getCell(addressStr) {
      return this.findCellEx(colCache.decodeEx(addressStr), true);
    }
    findCell(addressStr) {
      return this.findCellEx(colCache.decodeEx(addressStr), false);
    }
    findCellAt(sheetName, rowNumber, colNumber) {
      const sheet = this.sheets[sheetName];
      const row2 = sheet && sheet[rowNumber];
      return row2 && row2[colNumber];
    }
    addCellEx(address) {
      if (address.top) {
        for (let row2 = address.top; row2 <= address.bottom; row2++) {
          for (let col = address.left; col <= address.right; col++) {
            this.getCellAt(address.sheetName, row2, col);
          }
        }
      } else {
        this.findCellEx(address, true);
      }
    }
    getCellEx(address) {
      return this.findCellEx(address, true);
    }
    findCellEx(address, create) {
      const sheet = this.findSheet(address, create);
      const row2 = this.findSheetRow(sheet, address, create);
      return this.findRowCell(row2, address, create);
    }
    getCellAt(sheetName, rowNumber, colNumber) {
      const sheet = this.sheets[sheetName] || (this.sheets[sheetName] = []);
      const row2 = sheet[rowNumber] || (sheet[rowNumber] = []);
      const cell2 = row2[colNumber] || (row2[colNumber] = {
        sheetName,
        address: colCache.n2l(colNumber) + rowNumber,
        row: rowNumber,
        col: colNumber
      });
      return cell2;
    }
    removeCellEx(address) {
      const sheet = this.findSheet(address);
      if (!sheet) {
        return;
      }
      const row2 = this.findSheetRow(sheet, address);
      if (!row2) {
        return;
      }
      delete row2[address.col];
    }
    forEachInSheet(sheetName, callback) {
      const sheet = this.sheets[sheetName];
      if (sheet) {
        sheet.forEach((row2, rowNumber) => {
          if (row2) {
            row2.forEach((cell2, colNumber) => {
              if (cell2) {
                callback(cell2, rowNumber, colNumber);
              }
            });
          }
        });
      }
    }
    forEach(callback) {
      _.each(this.sheets, (sheet, sheetName) => {
        this.forEachInSheet(sheetName, callback);
      });
    }
    map(callback) {
      const results = [];
      this.forEach((cell2) => {
        results.push(callback(cell2));
      });
      return results;
    }
    findSheet(address, create) {
      const name = address.sheetName;
      if (this.sheets[name]) {
        return this.sheets[name];
      }
      if (create) {
        return this.sheets[name] = [];
      }
      return void 0;
    }
    findSheetRow(sheet, address, create) {
      const { row: row2 } = address;
      if (sheet && sheet[row2]) {
        return sheet[row2];
      }
      if (create) {
        return sheet[row2] = [];
      }
      return void 0;
    }
    findRowCell(row2, address, create) {
      const { col } = address;
      if (row2 && row2[col]) {
        return row2[col];
      }
      if (create) {
        return row2[col] = this.template ? Object.assign(address, JSON.parse(JSON.stringify(this.template))) : address;
      }
      return void 0;
    }
    spliceRows(sheetName, start, numDelete, numInsert) {
      const sheet = this.sheets[sheetName];
      if (sheet) {
        const inserts = [];
        for (let i = 0; i < numInsert; i++) {
          inserts.push([]);
        }
        sheet.splice(start, numDelete, ...inserts);
      }
    }
    spliceColumns(sheetName, start, numDelete, numInsert) {
      const sheet = this.sheets[sheetName];
      if (sheet) {
        const inserts = [];
        for (let i = 0; i < numInsert; i++) {
          inserts.push(null);
        }
        _.each(sheet, (row2) => {
          row2.splice(start, numDelete, ...inserts);
        });
      }
    }
  }
  cellMatrix = CellMatrix;
  return cellMatrix;
}
var definedNames;
var hasRequiredDefinedNames;
function requireDefinedNames() {
  if (hasRequiredDefinedNames) return definedNames;
  hasRequiredDefinedNames = 1;
  const _ = requireUnderDash();
  const colCache = requireColCache();
  const CellMatrix = requireCellMatrix();
  const Range = requireRange();
  const rangeRegexp = /[$](\w+)[$](\d+)(:[$](\w+)[$](\d+))?/;
  class DefinedNames {
    constructor() {
      this.matrixMap = {};
    }
    getMatrix(name) {
      const matrix = this.matrixMap[name] || (this.matrixMap[name] = new CellMatrix());
      return matrix;
    }
    // add a name to a cell. locStr in the form SheetName!$col$row or SheetName!$c1$r1:$c2:$r2
    add(locStr, name) {
      const location = colCache.decodeEx(locStr);
      this.addEx(location, name);
    }
    addEx(location, name) {
      const matrix = this.getMatrix(name);
      if (location.top) {
        for (let col = location.left; col <= location.right; col++) {
          for (let row2 = location.top; row2 <= location.bottom; row2++) {
            const address = {
              sheetName: location.sheetName,
              address: colCache.n2l(col) + row2,
              row: row2,
              col
            };
            matrix.addCellEx(address);
          }
        }
      } else {
        matrix.addCellEx(location);
      }
    }
    remove(locStr, name) {
      const location = colCache.decodeEx(locStr);
      this.removeEx(location, name);
    }
    removeEx(location, name) {
      const matrix = this.getMatrix(name);
      matrix.removeCellEx(location);
    }
    removeAllNames(location) {
      _.each(this.matrixMap, (matrix) => {
        matrix.removeCellEx(location);
      });
    }
    forEach(callback) {
      _.each(this.matrixMap, (matrix, name) => {
        matrix.forEach((cell2) => {
          callback(name, cell2);
        });
      });
    }
    // get all the names of a cell
    getNames(addressStr) {
      return this.getNamesEx(colCache.decodeEx(addressStr));
    }
    getNamesEx(address) {
      return _.map(this.matrixMap, (matrix, name) => matrix.findCellEx(address) && name).filter(
        Boolean
      );
    }
    _explore(matrix, cell2) {
      cell2.mark = false;
      const { sheetName } = cell2;
      const range2 = new Range(cell2.row, cell2.col, cell2.row, cell2.col, sheetName);
      let x;
      let y;
      function vGrow(yy, edge) {
        const c = matrix.findCellAt(sheetName, yy, cell2.col);
        if (!c || !c.mark) {
          return false;
        }
        range2[edge] = yy;
        c.mark = false;
        return true;
      }
      for (y = cell2.row - 1; vGrow(y, "top"); y--) ;
      for (y = cell2.row + 1; vGrow(y, "bottom"); y++) ;
      function hGrow(xx, edge) {
        const cells = [];
        for (y = range2.top; y <= range2.bottom; y++) {
          const c = matrix.findCellAt(sheetName, y, xx);
          if (c && c.mark) {
            cells.push(c);
          } else {
            return false;
          }
        }
        range2[edge] = xx;
        for (let i = 0; i < cells.length; i++) {
          cells[i].mark = false;
        }
        return true;
      }
      for (x = cell2.col - 1; hGrow(x, "left"); x--) ;
      for (x = cell2.col + 1; hGrow(x, "right"); x++) ;
      return range2;
    }
    getRanges(name, matrix) {
      matrix = matrix || this.matrixMap[name];
      if (!matrix) {
        return { name, ranges: [] };
      }
      matrix.forEach((cell2) => {
        cell2.mark = true;
      });
      const ranges = matrix.map((cell2) => cell2.mark && this._explore(matrix, cell2)).filter(Boolean).map((range2) => range2.$shortRange);
      return {
        name,
        ranges
      };
    }
    normaliseMatrix(matrix, sheetName) {
      matrix.forEachInSheet(sheetName, (cell2, row2, col) => {
        if (cell2) {
          if (cell2.row !== row2 || cell2.col !== col) {
            cell2.row = row2;
            cell2.col = col;
            cell2.address = colCache.n2l(col) + row2;
          }
        }
      });
    }
    spliceRows(sheetName, start, numDelete, numInsert) {
      _.each(this.matrixMap, (matrix) => {
        matrix.spliceRows(sheetName, start, numDelete, numInsert);
        this.normaliseMatrix(matrix, sheetName);
      });
    }
    spliceColumns(sheetName, start, numDelete, numInsert) {
      _.each(this.matrixMap, (matrix) => {
        matrix.spliceColumns(sheetName, start, numDelete, numInsert);
        this.normaliseMatrix(matrix, sheetName);
      });
    }
    get model() {
      return _.map(this.matrixMap, (matrix, name) => this.getRanges(name, matrix)).filter(
        (definedName) => definedName.ranges.length
      );
    }
    set model(value) {
      const matrixMap = this.matrixMap = {};
      value.forEach((definedName) => {
        const matrix = matrixMap[definedName.name] = new CellMatrix();
        definedName.ranges.forEach((rangeStr) => {
          if (rangeRegexp.test(rangeStr.split("!").pop() || "")) {
            matrix.addCell(rangeStr);
          }
        });
      });
    }
  }
  definedNames = DefinedNames;
  return definedNames;
}
var utils_1;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils_1;
  hasRequiredUtils = 1;
  const fs = require$$0$1;
  const inherits = function(cls, superCtor, statics, prototype) {
    cls.super_ = superCtor;
    if (!prototype) {
      prototype = statics;
      statics = null;
    }
    if (statics) {
      Object.keys(statics).forEach((i) => {
        Object.defineProperty(cls, i, Object.getOwnPropertyDescriptor(statics, i));
      });
    }
    const properties = {
      constructor: {
        value: cls,
        enumerable: false,
        writable: false,
        configurable: true
      }
    };
    if (prototype) {
      Object.keys(prototype).forEach((i) => {
        properties[i] = Object.getOwnPropertyDescriptor(prototype, i);
      });
    }
    cls.prototype = Object.create(superCtor.prototype, properties);
  };
  const xmlDecodeRegex = /[<>&'"\x7F\x00-\x08\x0B-\x0C\x0E-\x1F]/;
  const utils = {
    nop() {
    },
    promiseImmediate(value) {
      return new Promise((resolve) => {
        if (commonjsGlobal.setImmediate) {
          setImmediate(() => {
            resolve(value);
          });
        } else {
          setTimeout(() => {
            resolve(value);
          }, 1);
        }
      });
    },
    inherits,
    dateToExcel(d, date1904) {
      return 25569 + d.getTime() / (24 * 3600 * 1e3) - (date1904 ? 1462 : 0);
    },
    excelToDate(v, date1904) {
      const millisecondSinceEpoch = Math.round((v - 25569 + (date1904 ? 1462 : 0)) * 24 * 3600 * 1e3);
      return new Date(millisecondSinceEpoch);
    },
    parsePath(filepath) {
      const last = filepath.lastIndexOf("/");
      return {
        path: filepath.substring(0, last),
        name: filepath.substring(last + 1)
      };
    },
    getRelsPath(filepath) {
      const path = utils.parsePath(filepath);
      return `${path.path}/_rels/${path.name}.rels`;
    },
    xmlEncode(text) {
      const regexResult = xmlDecodeRegex.exec(text);
      if (!regexResult) return text;
      let result = "";
      let escape = "";
      let lastIndex = 0;
      let i = regexResult.index;
      for (; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        switch (charCode) {
          case 34:
            escape = "&quot;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 39:
            escape = "&apos;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          case 127:
            escape = "";
            break;
          default: {
            if (charCode <= 31 && (charCode <= 8 || charCode >= 11 && charCode !== 13)) {
              escape = "";
              break;
            }
            continue;
          }
        }
        if (lastIndex !== i) result += text.substring(lastIndex, i);
        lastIndex = i + 1;
        if (escape) result += escape;
      }
      if (lastIndex !== i) return result + text.substring(lastIndex, i);
      return result;
    },
    xmlDecode(text) {
      return text.replace(/&([a-z]*);/g, (c) => {
        switch (c) {
          case "&lt;":
            return "<";
          case "&gt;":
            return ">";
          case "&amp;":
            return "&";
          case "&apos;":
            return "'";
          case "&quot;":
            return '"';
          default:
            return c;
        }
      });
    },
    validInt(value) {
      const i = parseInt(value, 10);
      return !Number.isNaN(i) ? i : 0;
    },
    isDateFmt(fmt) {
      if (!fmt) {
        return false;
      }
      fmt = fmt.replace(/\[[^\]]*]/g, "");
      fmt = fmt.replace(/"[^"]*"/g, "");
      const result = fmt.match(/[ymdhMsb]+/) !== null;
      return result;
    },
    fs: {
      exists(path) {
        return new Promise((resolve) => {
          fs.access(path, fs.constants.F_OK, (err) => {
            resolve(!err);
          });
        });
      }
    },
    toIsoDateString(dt) {
      return dt.toIsoString().subsstr(0, 10);
    },
    parseBoolean(value) {
      return value === true || value === "true" || value === 1 || value === "1";
    }
  };
  utils_1 = utils;
  return utils_1;
}
var stringBuf;
var hasRequiredStringBuf;
function requireStringBuf() {
  if (hasRequiredStringBuf) return stringBuf;
  hasRequiredStringBuf = 1;
  class StringBuf {
    constructor(options) {
      this._buf = Buffer.alloc(options && options.size || 16384);
      this._encoding = options && options.encoding || "utf8";
      this._inPos = 0;
      this._buffer = void 0;
    }
    get length() {
      return this._inPos;
    }
    get capacity() {
      return this._buf.length;
    }
    get buffer() {
      return this._buf;
    }
    toBuffer() {
      if (!this._buffer) {
        this._buffer = Buffer.alloc(this.length);
        this._buf.copy(this._buffer, 0, 0, this.length);
      }
      return this._buffer;
    }
    reset(position) {
      position = position || 0;
      this._buffer = void 0;
      this._inPos = position;
    }
    _grow(min) {
      let size = this._buf.length * 2;
      while (size < min) {
        size *= 2;
      }
      const buf = Buffer.alloc(size);
      this._buf.copy(buf, 0);
      this._buf = buf;
    }
    addText(text) {
      this._buffer = void 0;
      let inPos = this._inPos + this._buf.write(text, this._inPos, this._encoding);
      while (inPos >= this._buf.length - 4) {
        this._grow(this._inPos + text.length);
        inPos = this._inPos + this._buf.write(text, this._inPos, this._encoding);
      }
      this._inPos = inPos;
    }
    addStringBuf(inBuf) {
      if (inBuf.length) {
        this._buffer = void 0;
        if (this.length + inBuf.length > this.capacity) {
          this._grow(this.length + inBuf.length);
        }
        inBuf._buf.copy(this._buf, this._inPos, 0, inBuf.length);
        this._inPos += inBuf.length;
      }
    }
  }
  stringBuf = StringBuf;
  return stringBuf;
}
var streamBuf;
var hasRequiredStreamBuf;
function requireStreamBuf() {
  if (hasRequiredStreamBuf) return streamBuf;
  hasRequiredStreamBuf = 1;
  const Stream = requireReadable();
  const utils = requireUtils();
  const StringBuf = requireStringBuf();
  class StringChunk {
    constructor(data, encoding) {
      this._data = data;
      this._encoding = encoding;
    }
    get length() {
      return this.toBuffer().length;
    }
    // copy to target buffer
    copy(target, targetOffset, offset, length) {
      return this.toBuffer().copy(target, targetOffset, offset, length);
    }
    toBuffer() {
      if (!this._buffer) {
        this._buffer = Buffer.from(this._data, this._encoding);
      }
      return this._buffer;
    }
  }
  class StringBufChunk {
    constructor(data) {
      this._data = data;
    }
    get length() {
      return this._data.length;
    }
    // copy to target buffer
    copy(target, targetOffset, offset, length) {
      return this._data._buf.copy(target, targetOffset, offset, length);
    }
    toBuffer() {
      return this._data.toBuffer();
    }
  }
  class BufferChunk {
    constructor(data) {
      this._data = data;
    }
    get length() {
      return this._data.length;
    }
    // copy to target buffer
    copy(target, targetOffset, offset, length) {
      this._data.copy(target, targetOffset, offset, length);
    }
    toBuffer() {
      return this._data;
    }
  }
  class ReadWriteBuf {
    constructor(size) {
      this.size = size;
      this.buffer = Buffer.alloc(size);
      this.iRead = 0;
      this.iWrite = 0;
    }
    toBuffer() {
      if (this.iRead === 0 && this.iWrite === this.size) {
        return this.buffer;
      }
      const buf = Buffer.alloc(this.iWrite - this.iRead);
      this.buffer.copy(buf, 0, this.iRead, this.iWrite);
      return buf;
    }
    get length() {
      return this.iWrite - this.iRead;
    }
    get eod() {
      return this.iRead === this.iWrite;
    }
    get full() {
      return this.iWrite === this.size;
    }
    read(size) {
      let buf;
      if (size === 0) {
        return null;
      }
      if (size === void 0 || size >= this.length) {
        buf = this.toBuffer();
        this.iRead = this.iWrite;
        return buf;
      }
      buf = Buffer.alloc(size);
      this.buffer.copy(buf, 0, this.iRead, size);
      this.iRead += size;
      return buf;
    }
    write(chunk, offset, length) {
      const size = Math.min(length, this.size - this.iWrite);
      chunk.copy(this.buffer, this.iWrite, offset, offset + size);
      this.iWrite += size;
      return size;
    }
  }
  const StreamBuf = function(options) {
    options = options || {};
    this.bufSize = options.bufSize || 1024 * 1024;
    this.buffers = [];
    this.batch = options.batch || false;
    this.corked = false;
    this.inPos = 0;
    this.outPos = 0;
    this.pipes = [];
    this.paused = false;
    this.encoding = null;
  };
  utils.inherits(StreamBuf, Stream.Duplex, {
    toBuffer() {
      switch (this.buffers.length) {
        case 0:
          return null;
        case 1:
          return this.buffers[0].toBuffer();
        default:
          return Buffer.concat(this.buffers.map((rwBuf) => rwBuf.toBuffer()));
      }
    },
    // writable
    // event drain - if write returns false (which it won't), indicates when safe to write again.
    // finish - end() has been called
    // pipe(src) - pipe() has been called on readable
    // unpipe(src) - unpipe() has been called on readable
    // error - duh
    _getWritableBuffer() {
      if (this.buffers.length) {
        const last = this.buffers[this.buffers.length - 1];
        if (!last.full) {
          return last;
        }
      }
      const buf = new ReadWriteBuf(this.bufSize);
      this.buffers.push(buf);
      return buf;
    },
    async _pipe(chunk) {
      const write = function(pipe) {
        return new Promise((resolve) => {
          pipe.write(chunk.toBuffer(), () => {
            resolve();
          });
        });
      };
      await Promise.all(this.pipes.map(write));
    },
    _writeToBuffers(chunk) {
      let inPos = 0;
      const inLen = chunk.length;
      while (inPos < inLen) {
        const buffer = this._getWritableBuffer();
        inPos += buffer.write(chunk, inPos, inLen - inPos);
      }
    },
    async write(data, encoding, callback) {
      if (encoding instanceof Function) {
        callback = encoding;
        encoding = "utf8";
      }
      callback = callback || utils.nop;
      let chunk;
      if (data instanceof StringBuf) {
        chunk = new StringBufChunk(data);
      } else if (data instanceof Buffer) {
        chunk = new BufferChunk(data);
      } else if (typeof data === "string" || data instanceof String || data instanceof ArrayBuffer) {
        chunk = new StringChunk(data, encoding);
      } else {
        throw new Error("Chunk must be one of type String, Buffer or StringBuf.");
      }
      if (this.pipes.length) {
        if (this.batch) {
          this._writeToBuffers(chunk);
          while (!this.corked && this.buffers.length > 1) {
            this._pipe(this.buffers.shift());
          }
        } else if (!this.corked) {
          await this._pipe(chunk);
          callback();
        } else {
          this._writeToBuffers(chunk);
          process.nextTick(callback);
        }
      } else {
        if (!this.paused) {
          this.emit("data", chunk.toBuffer());
        }
        this._writeToBuffers(chunk);
        this.emit("readable");
      }
      return true;
    },
    cork() {
      this.corked = true;
    },
    _flush() {
      if (this.pipes.length) {
        while (this.buffers.length) {
          this._pipe(this.buffers.shift());
        }
      }
    },
    uncork() {
      this.corked = false;
      this._flush();
    },
    end(chunk, encoding, callback) {
      const writeComplete = (error) => {
        if (error) {
          callback(error);
        } else {
          this._flush();
          this.pipes.forEach((pipe) => {
            pipe.end();
          });
          this.emit("finish");
        }
      };
      if (chunk) {
        this.write(chunk, encoding, writeComplete);
      } else {
        writeComplete();
      }
    },
    // readable
    // event readable - some data is now available
    // event data - switch to flowing mode - feeds chunks to handler
    // event end - no more data
    // event close - optional, indicates upstream close
    // event error - duh
    read(size) {
      let buffers;
      if (size) {
        buffers = [];
        while (size && this.buffers.length && !this.buffers[0].eod) {
          const first = this.buffers[0];
          const buffer = first.read(size);
          size -= buffer.length;
          buffers.push(buffer);
          if (first.eod && first.full) {
            this.buffers.shift();
          }
        }
        return Buffer.concat(buffers);
      }
      buffers = this.buffers.map((buf) => buf.toBuffer()).filter(Boolean);
      this.buffers = [];
      return Buffer.concat(buffers);
    },
    setEncoding(encoding) {
      this.encoding = encoding;
    },
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    },
    isPaused() {
      return !!this.paused;
    },
    pipe(destination) {
      this.pipes.push(destination);
      if (!this.paused && this.buffers.length) {
        this.end();
      }
    },
    unpipe(destination) {
      this.pipes = this.pipes.filter((pipe) => pipe !== destination);
    },
    unshift() {
      throw new Error("Not Implemented");
    },
    wrap() {
      throw new Error("Not Implemented");
    }
  });
  streamBuf = StreamBuf;
  return streamBuf;
}
var browserBufferEncode = {};
var hasRequiredBrowserBufferEncode;
function requireBrowserBufferEncode() {
  if (hasRequiredBrowserBufferEncode) return browserBufferEncode;
  hasRequiredBrowserBufferEncode = 1;
  const textEncoder = typeof TextEncoder === "undefined" ? null : new TextEncoder("utf-8");
  const { Buffer: Buffer2 } = require$$0$2;
  function stringToBuffer(str) {
    if (typeof str !== "string") {
      return str;
    }
    if (textEncoder) {
      return Buffer2.from(textEncoder.encode(str).buffer);
    }
    return Buffer2.from(str);
  }
  browserBufferEncode.stringToBuffer = stringToBuffer;
  return browserBufferEncode;
}
var zipStream;
var hasRequiredZipStream;
function requireZipStream() {
  if (hasRequiredZipStream) return zipStream;
  hasRequiredZipStream = 1;
  const events = require$$2;
  const JSZip = requireLib();
  const StreamBuf = requireStreamBuf();
  const { stringToBuffer } = requireBrowserBufferEncode();
  class ZipWriter extends events.EventEmitter {
    constructor(options) {
      super();
      this.options = Object.assign(
        {
          type: "nodebuffer",
          compression: "DEFLATE"
        },
        options
      );
      this.zip = new JSZip();
      this.stream = new StreamBuf();
    }
    append(data, options) {
      if (options.hasOwnProperty("base64") && options.base64) {
        this.zip.file(options.name, data, { base64: true });
      } else {
        if (process.browser && typeof data === "string") {
          data = stringToBuffer(data);
        }
        this.zip.file(options.name, data);
      }
    }
    async finalize() {
      const content = await this.zip.generateAsync(this.options);
      this.stream.end(content);
      this.emit("finish");
    }
    // ==========================================================================
    // Stream.Readable interface
    read(size) {
      return this.stream.read(size);
    }
    setEncoding(encoding) {
      return this.stream.setEncoding(encoding);
    }
    pause() {
      return this.stream.pause();
    }
    resume() {
      return this.stream.resume();
    }
    isPaused() {
      return this.stream.isPaused();
    }
    pipe(destination, options) {
      return this.stream.pipe(destination, options);
    }
    unpipe(destination) {
      return this.stream.unpipe(destination);
    }
    unshift(chunk) {
      return this.stream.unshift(chunk);
    }
    wrap(stream) {
      return this.stream.wrap(stream);
    }
  }
  zipStream = {
    ZipWriter
  };
  return zipStream;
}
var xmlStream;
var hasRequiredXmlStream;
function requireXmlStream() {
  if (hasRequiredXmlStream) return xmlStream;
  hasRequiredXmlStream = 1;
  const _ = requireUnderDash();
  const utils = requireUtils();
  const OPEN_ANGLE = "<";
  const CLOSE_ANGLE = ">";
  const OPEN_ANGLE_SLASH = "</";
  const CLOSE_SLASH_ANGLE = "/>";
  function pushAttribute(xml, name, value) {
    xml.push(` ${name}="${utils.xmlEncode(value.toString())}"`);
  }
  function pushAttributes(xml, attributes) {
    if (attributes) {
      const tmp = [];
      _.each(attributes, (value, name) => {
        if (value !== void 0) {
          pushAttribute(tmp, name, value);
        }
      });
      xml.push(tmp.join(""));
    }
  }
  class XmlStream {
    constructor() {
      this._xml = [];
      this._stack = [];
      this._rollbacks = [];
    }
    get tos() {
      return this._stack.length ? this._stack[this._stack.length - 1] : void 0;
    }
    get cursor() {
      return this._xml.length;
    }
    openXml(docAttributes) {
      const xml = this._xml;
      xml.push("<?xml");
      pushAttributes(xml, docAttributes);
      xml.push("?>\n");
    }
    openNode(name, attributes) {
      const parent = this.tos;
      const xml = this._xml;
      if (parent && this.open) {
        xml.push(CLOSE_ANGLE);
      }
      this._stack.push(name);
      xml.push(OPEN_ANGLE);
      xml.push(name);
      pushAttributes(xml, attributes);
      this.leaf = true;
      this.open = true;
    }
    addAttribute(name, value) {
      if (!this.open) {
        throw new Error("Cannot write attributes to node if it is not open");
      }
      if (value !== void 0) {
        pushAttribute(this._xml, name, value);
      }
    }
    addAttributes(attrs) {
      if (!this.open) {
        throw new Error("Cannot write attributes to node if it is not open");
      }
      pushAttributes(this._xml, attrs);
    }
    writeText(text) {
      const xml = this._xml;
      if (this.open) {
        xml.push(CLOSE_ANGLE);
        this.open = false;
      }
      this.leaf = false;
      xml.push(utils.xmlEncode(text.toString()));
    }
    writeXml(xml) {
      if (this.open) {
        this._xml.push(CLOSE_ANGLE);
        this.open = false;
      }
      this.leaf = false;
      this._xml.push(xml);
    }
    closeNode() {
      const node = this._stack.pop();
      const xml = this._xml;
      if (this.leaf) {
        xml.push(CLOSE_SLASH_ANGLE);
      } else {
        xml.push(OPEN_ANGLE_SLASH);
        xml.push(node);
        xml.push(CLOSE_ANGLE);
      }
      this.open = false;
      this.leaf = false;
    }
    leafNode(name, attributes, text) {
      this.openNode(name, attributes);
      if (text !== void 0) {
        this.writeText(text);
      }
      this.closeNode();
    }
    closeAll() {
      while (this._stack.length) {
        this.closeNode();
      }
    }
    addRollback() {
      this._rollbacks.push({
        xml: this._xml.length,
        stack: this._stack.length,
        leaf: this.leaf,
        open: this.open
      });
      return this.cursor;
    }
    commit() {
      this._rollbacks.pop();
    }
    rollback() {
      const r = this._rollbacks.pop();
      if (this._xml.length > r.xml) {
        this._xml.splice(r.xml, this._xml.length - r.xml);
      }
      if (this._stack.length > r.stack) {
        this._stack.splice(r.stack, this._stack.length - r.stack);
      }
      this.leaf = r.leaf;
      this.open = r.open;
    }
    get xml() {
      this.closeAll();
      return this._xml.join("");
    }
  }
  XmlStream.StdDocAttributes = {
    version: "1.0",
    encoding: "UTF-8",
    standalone: "yes"
  };
  xmlStream = XmlStream;
  return xmlStream;
}
var browserBufferDecode = {};
var hasRequiredBrowserBufferDecode;
function requireBrowserBufferDecode() {
  if (hasRequiredBrowserBufferDecode) return browserBufferDecode;
  hasRequiredBrowserBufferDecode = 1;
  const textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8");
  function bufferToString(chunk) {
    if (typeof chunk === "string") {
      return chunk;
    }
    if (textDecoder) {
      return textDecoder.decode(chunk);
    }
    return chunk.toString();
  }
  browserBufferDecode.bufferToString = bufferToString;
  return browserBufferDecode;
}
var parseSax;
var hasRequiredParseSax;
function requireParseSax() {
  if (hasRequiredParseSax) return parseSax;
  hasRequiredParseSax = 1;
  const { SaxesParser } = requireSaxes();
  const { PassThrough } = requireReadable();
  const { bufferToString } = requireBrowserBufferDecode();
  parseSax = async function* (iterable) {
    if (iterable.pipe && !iterable[Symbol.asyncIterator]) {
      iterable = iterable.pipe(new PassThrough());
    }
    const saxesParser = new SaxesParser();
    let error;
    saxesParser.on("error", (err) => {
      error = err;
    });
    let events = [];
    saxesParser.on("opentag", (value) => events.push({ eventType: "opentag", value }));
    saxesParser.on("text", (value) => events.push({ eventType: "text", value }));
    saxesParser.on("closetag", (value) => events.push({ eventType: "closetag", value }));
    for await (const chunk of iterable) {
      saxesParser.write(bufferToString(chunk));
      if (error) throw error;
      yield events;
      events = [];
    }
  };
  return parseSax;
}
var baseXform;
var hasRequiredBaseXform;
function requireBaseXform() {
  if (hasRequiredBaseXform) return baseXform;
  hasRequiredBaseXform = 1;
  const parseSax2 = requireParseSax();
  const XmlStream = requireXmlStream();
  class BaseXform {
    // constructor(/* model, name */) {}
    // ============================================================
    // Virtual Interface
    prepare() {
    }
    render() {
    }
    parseOpen(node) {
    }
    parseText(text) {
    }
    parseClose(name) {
    }
    reconcile(model, options) {
    }
    // ============================================================
    reset() {
      this.model = null;
      if (this.map) {
        Object.values(this.map).forEach((xform) => {
          if (xform instanceof BaseXform) {
            xform.reset();
          } else if (xform.xform) {
            xform.xform.reset();
          }
        });
      }
    }
    mergeModel(obj) {
      this.model = Object.assign(this.model || {}, obj);
    }
    async parse(saxParser) {
      for await (const events of saxParser) {
        for (const { eventType, value } of events) {
          if (eventType === "opentag") {
            this.parseOpen(value);
          } else if (eventType === "text") {
            this.parseText(value);
          } else if (eventType === "closetag") {
            if (!this.parseClose(value.name)) {
              return this.model;
            }
          }
        }
      }
      return this.model;
    }
    async parseStream(stream) {
      return this.parse(parseSax2(stream));
    }
    get xml() {
      return this.toXml(this.model);
    }
    toXml(model) {
      const xmlStream2 = new XmlStream();
      this.render(xmlStream2, model);
      return xmlStream2.xml;
    }
    // ============================================================
    // Useful Utilities
    static toAttribute(value, dflt, always = false) {
      if (value === void 0) {
        if (always) {
          return dflt;
        }
      } else if (always || value !== dflt) {
        return value.toString();
      }
      return void 0;
    }
    static toStringAttribute(value, dflt, always = false) {
      return BaseXform.toAttribute(value, dflt, always);
    }
    static toStringValue(attr, dflt) {
      return attr === void 0 ? dflt : attr;
    }
    static toBoolAttribute(value, dflt, always = false) {
      if (value === void 0) {
        if (always) {
          return dflt;
        }
      } else if (always || value !== dflt) {
        return value ? "1" : "0";
      }
      return void 0;
    }
    static toBoolValue(attr, dflt) {
      return attr === void 0 ? dflt : attr === "1";
    }
    static toIntAttribute(value, dflt, always = false) {
      return BaseXform.toAttribute(value, dflt, always);
    }
    static toIntValue(attr, dflt) {
      return attr === void 0 ? dflt : parseInt(attr, 10);
    }
    static toFloatAttribute(value, dflt, always = false) {
      return BaseXform.toAttribute(value, dflt, always);
    }
    static toFloatValue(attr, dflt) {
      return attr === void 0 ? dflt : parseFloat(attr);
    }
  }
  baseXform = BaseXform;
  return baseXform;
}
var staticXform;
var hasRequiredStaticXform;
function requireStaticXform() {
  if (hasRequiredStaticXform) return staticXform;
  hasRequiredStaticXform = 1;
  const BaseXform = requireBaseXform();
  const XmlStream = requireXmlStream();
  function build(xmlStream2, model) {
    xmlStream2.openNode(model.tag, model.$);
    if (model.c) {
      model.c.forEach((child) => {
        build(xmlStream2, child);
      });
    }
    if (model.t) {
      xmlStream2.writeText(model.t);
    }
    xmlStream2.closeNode();
  }
  class StaticXform extends BaseXform {
    constructor(model) {
      super();
      this._model = model;
    }
    render(xmlStream2) {
      if (!this._xml) {
        const stream = new XmlStream();
        build(stream, this._model);
        this._xml = stream.xml;
      }
      xmlStream2.writeXml(this._xml);
    }
    parseOpen() {
      return true;
    }
    parseText() {
    }
    parseClose(name) {
      switch (name) {
        case this._model.tag:
          return false;
        default:
          return true;
      }
    }
  }
  staticXform = StaticXform;
  return staticXform;
}
var listXform;
var hasRequiredListXform;
function requireListXform() {
  if (hasRequiredListXform) return listXform;
  hasRequiredListXform = 1;
  const BaseXform = requireBaseXform();
  class ListXform extends BaseXform {
    constructor(options) {
      super();
      this.tag = options.tag;
      this.always = !!options.always;
      this.count = options.count;
      this.empty = options.empty;
      this.$count = options.$count || "count";
      this.$ = options.$;
      this.childXform = options.childXform;
      this.maxItems = options.maxItems;
    }
    prepare(model, options) {
      const { childXform } = this;
      if (model) {
        model.forEach((childModel, index) => {
          options.index = index;
          childXform.prepare(childModel, options);
        });
      }
    }
    render(xmlStream2, model) {
      if (this.always || model && model.length) {
        xmlStream2.openNode(this.tag, this.$);
        if (this.count) {
          xmlStream2.addAttribute(this.$count, model && model.length || 0);
        }
        const { childXform } = this;
        (model || []).forEach((childModel, index) => {
          childXform.render(xmlStream2, childModel, index);
        });
        xmlStream2.closeNode();
      } else if (this.empty) {
        xmlStream2.leafNode(this.tag);
      }
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.model = [];
          return true;
        default:
          if (this.childXform.parseOpen(node)) {
            this.parser = this.childXform;
            return true;
          }
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.push(this.parser.model);
          this.parser = void 0;
          if (this.maxItems && this.model.length > this.maxItems) {
            throw new Error(`Max ${this.childXform.tag} count (${this.maxItems}) exceeded`);
          }
        }
        return true;
      }
      return false;
    }
    reconcile(model, options) {
      if (model) {
        const { childXform } = this;
        model.forEach((childModel) => {
          childXform.reconcile(childModel, options);
        });
      }
    }
  }
  listXform = ListXform;
  return listXform;
}
var colorXform;
var hasRequiredColorXform;
function requireColorXform() {
  if (hasRequiredColorXform) return colorXform;
  hasRequiredColorXform = 1;
  const BaseXform = requireBaseXform();
  class ColorXform extends BaseXform {
    constructor(name) {
      super();
      this.name = name || "color";
    }
    get tag() {
      return this.name;
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.openNode(this.name);
        if (model.argb) {
          xmlStream2.addAttribute("rgb", model.argb);
        } else if (model.theme !== void 0) {
          xmlStream2.addAttribute("theme", model.theme);
          if (model.tint !== void 0) {
            xmlStream2.addAttribute("tint", model.tint);
          }
        } else if (model.indexed !== void 0) {
          xmlStream2.addAttribute("indexed", model.indexed);
        } else {
          xmlStream2.addAttribute("auto", "1");
        }
        xmlStream2.closeNode();
        return true;
      }
      return false;
    }
    parseOpen(node) {
      if (node.name === this.name) {
        if (node.attributes.rgb) {
          this.model = { argb: node.attributes.rgb };
        } else if (node.attributes.theme) {
          this.model = { theme: parseInt(node.attributes.theme, 10) };
          if (node.attributes.tint) {
            this.model.tint = parseFloat(node.attributes.tint);
          }
        } else if (node.attributes.indexed) {
          this.model = { indexed: parseInt(node.attributes.indexed, 10) };
        } else {
          this.model = void 0;
        }
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  colorXform = ColorXform;
  return colorXform;
}
var booleanXform;
var hasRequiredBooleanXform;
function requireBooleanXform() {
  if (hasRequiredBooleanXform) return booleanXform;
  hasRequiredBooleanXform = 1;
  const BaseXform = requireBaseXform();
  class BooleanXform extends BaseXform {
    constructor(options) {
      super();
      this.tag = options.tag;
      this.attr = options.attr;
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.openNode(this.tag);
        xmlStream2.closeNode();
      }
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        this.model = true;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  booleanXform = BooleanXform;
  return booleanXform;
}
var integerXform;
var hasRequiredIntegerXform;
function requireIntegerXform() {
  if (hasRequiredIntegerXform) return integerXform;
  hasRequiredIntegerXform = 1;
  const BaseXform = requireBaseXform();
  class IntegerXform extends BaseXform {
    constructor(options) {
      super();
      this.tag = options.tag;
      this.attr = options.attr;
      this.attrs = options.attrs;
      this.zero = options.zero;
    }
    render(xmlStream2, model) {
      if (model || this.zero) {
        xmlStream2.openNode(this.tag);
        if (this.attrs) {
          xmlStream2.addAttributes(this.attrs);
        }
        if (this.attr) {
          xmlStream2.addAttribute(this.attr, model);
        } else {
          xmlStream2.writeText(model);
        }
        xmlStream2.closeNode();
      }
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        if (this.attr) {
          this.model = parseInt(node.attributes[this.attr], 10);
        } else {
          this.text = [];
        }
        return true;
      }
      return false;
    }
    parseText(text) {
      if (!this.attr) {
        this.text.push(text);
      }
    }
    parseClose() {
      if (!this.attr) {
        this.model = parseInt(this.text.join("") || 0, 10);
      }
      return false;
    }
  }
  integerXform = IntegerXform;
  return integerXform;
}
var stringXform;
var hasRequiredStringXform;
function requireStringXform() {
  if (hasRequiredStringXform) return stringXform;
  hasRequiredStringXform = 1;
  const BaseXform = requireBaseXform();
  class StringXform extends BaseXform {
    constructor(options) {
      super();
      this.tag = options.tag;
      this.attr = options.attr;
      this.attrs = options.attrs;
    }
    render(xmlStream2, model) {
      if (model !== void 0) {
        xmlStream2.openNode(this.tag);
        if (this.attrs) {
          xmlStream2.addAttributes(this.attrs);
        }
        if (this.attr) {
          xmlStream2.addAttribute(this.attr, model);
        } else {
          xmlStream2.writeText(model);
        }
        xmlStream2.closeNode();
      }
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        if (this.attr) {
          this.model = node.attributes[this.attr];
        } else {
          this.text = [];
        }
      }
    }
    parseText(text) {
      if (!this.attr) {
        this.text.push(text);
      }
    }
    parseClose() {
      if (!this.attr) {
        this.model = this.text.join("");
      }
      return false;
    }
  }
  stringXform = StringXform;
  return stringXform;
}
var underlineXform;
var hasRequiredUnderlineXform;
function requireUnderlineXform() {
  if (hasRequiredUnderlineXform) return underlineXform;
  hasRequiredUnderlineXform = 1;
  const BaseXform = requireBaseXform();
  class UnderlineXform extends BaseXform {
    constructor(model) {
      super();
      this.model = model;
    }
    get tag() {
      return "u";
    }
    render(xmlStream2, model) {
      model = model || this.model;
      if (model === true) {
        xmlStream2.leafNode("u");
      } else {
        const attr = UnderlineXform.Attributes[model];
        if (attr) {
          xmlStream2.leafNode("u", attr);
        }
      }
    }
    parseOpen(node) {
      if (node.name === "u") {
        this.model = node.attributes.val || true;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  UnderlineXform.Attributes = {
    single: {},
    double: { val: "double" },
    singleAccounting: { val: "singleAccounting" },
    doubleAccounting: { val: "doubleAccounting" }
  };
  underlineXform = UnderlineXform;
  return underlineXform;
}
var fontXform;
var hasRequiredFontXform;
function requireFontXform() {
  if (hasRequiredFontXform) return fontXform;
  hasRequiredFontXform = 1;
  const ColorXform = requireColorXform();
  const BooleanXform = requireBooleanXform();
  const IntegerXform = requireIntegerXform();
  const StringXform = requireStringXform();
  const UnderlineXform = requireUnderlineXform();
  const _ = requireUnderDash();
  const BaseXform = requireBaseXform();
  class FontXform extends BaseXform {
    constructor(options) {
      super();
      this.options = options || FontXform.OPTIONS;
      this.map = {
        b: { prop: "bold", xform: new BooleanXform({ tag: "b", attr: "val" }) },
        i: { prop: "italic", xform: new BooleanXform({ tag: "i", attr: "val" }) },
        u: { prop: "underline", xform: new UnderlineXform() },
        charset: { prop: "charset", xform: new IntegerXform({ tag: "charset", attr: "val" }) },
        color: { prop: "color", xform: new ColorXform() },
        condense: { prop: "condense", xform: new BooleanXform({ tag: "condense", attr: "val" }) },
        extend: { prop: "extend", xform: new BooleanXform({ tag: "extend", attr: "val" }) },
        family: { prop: "family", xform: new IntegerXform({ tag: "family", attr: "val" }) },
        outline: { prop: "outline", xform: new BooleanXform({ tag: "outline", attr: "val" }) },
        vertAlign: { prop: "vertAlign", xform: new StringXform({ tag: "vertAlign", attr: "val" }) },
        scheme: { prop: "scheme", xform: new StringXform({ tag: "scheme", attr: "val" }) },
        shadow: { prop: "shadow", xform: new BooleanXform({ tag: "shadow", attr: "val" }) },
        strike: { prop: "strike", xform: new BooleanXform({ tag: "strike", attr: "val" }) },
        sz: { prop: "size", xform: new IntegerXform({ tag: "sz", attr: "val" }) }
      };
      this.map[this.options.fontNameTag] = {
        prop: "name",
        xform: new StringXform({ tag: this.options.fontNameTag, attr: "val" })
      };
    }
    get tag() {
      return this.options.tagName;
    }
    render(xmlStream2, model) {
      const { map } = this;
      xmlStream2.openNode(this.options.tagName);
      _.each(this.map, (defn, tag) => {
        map[tag].xform.render(xmlStream2, model[defn.prop]);
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (this.map[node.name]) {
        this.parser = this.map[node.name].xform;
        return this.parser.parseOpen(node);
      }
      switch (node.name) {
        case this.options.tagName:
          this.model = {};
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser && !this.parser.parseClose(name)) {
        const item = this.map[name];
        if (this.parser.model) {
          this.model[item.prop] = this.parser.model;
        }
        this.parser = void 0;
        return true;
      }
      switch (name) {
        case this.options.tagName:
          return false;
        default:
          return true;
      }
    }
  }
  FontXform.OPTIONS = {
    tagName: "font",
    fontNameTag: "name"
  };
  fontXform = FontXform;
  return fontXform;
}
var fillXform;
var hasRequiredFillXform;
function requireFillXform() {
  if (hasRequiredFillXform) return fillXform;
  hasRequiredFillXform = 1;
  const BaseXform = requireBaseXform();
  const ColorXform = requireColorXform();
  class StopXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        color: new ColorXform()
      };
    }
    get tag() {
      return "stop";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("stop");
      xmlStream2.addAttribute("position", model.position);
      this.map.color.render(xmlStream2, model.color);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "stop":
          this.model = {
            position: parseFloat(node.attributes.position)
          };
          return true;
        case "color":
          this.parser = this.map.color;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.color = this.parser.model;
          this.parser = void 0;
        }
        return true;
      }
      return false;
    }
  }
  class PatternFillXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        fgColor: new ColorXform("fgColor"),
        bgColor: new ColorXform("bgColor")
      };
    }
    get name() {
      return "pattern";
    }
    get tag() {
      return "patternFill";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("patternFill");
      xmlStream2.addAttribute("patternType", model.pattern);
      if (model.fgColor) {
        this.map.fgColor.render(xmlStream2, model.fgColor);
      }
      if (model.bgColor) {
        this.map.bgColor.render(xmlStream2, model.bgColor);
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "patternFill":
          this.model = {
            type: "pattern",
            pattern: node.attributes.patternType
          };
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
            return true;
          }
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          if (this.parser.model) {
            this.model[name] = this.parser.model;
          }
          this.parser = void 0;
        }
        return true;
      }
      return false;
    }
  }
  class GradientFillXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        stop: new StopXform()
      };
    }
    get name() {
      return "gradient";
    }
    get tag() {
      return "gradientFill";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("gradientFill");
      switch (model.gradient) {
        case "angle":
          xmlStream2.addAttribute("degree", model.degree);
          break;
        case "path":
          xmlStream2.addAttribute("type", "path");
          if (model.center.left) {
            xmlStream2.addAttribute("left", model.center.left);
            if (model.center.right === void 0) {
              xmlStream2.addAttribute("right", model.center.left);
            }
          }
          if (model.center.right) {
            xmlStream2.addAttribute("right", model.center.right);
          }
          if (model.center.top) {
            xmlStream2.addAttribute("top", model.center.top);
            if (model.center.bottom === void 0) {
              xmlStream2.addAttribute("bottom", model.center.top);
            }
          }
          if (model.center.bottom) {
            xmlStream2.addAttribute("bottom", model.center.bottom);
          }
          break;
      }
      const stopXform = this.map.stop;
      model.stops.forEach((stopModel) => {
        stopXform.render(xmlStream2, stopModel);
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "gradientFill": {
          const model = this.model = {
            stops: []
          };
          if (node.attributes.degree) {
            model.gradient = "angle";
            model.degree = parseInt(node.attributes.degree, 10);
          } else if (node.attributes.type === "path") {
            model.gradient = "path";
            model.center = {
              left: node.attributes.left ? parseFloat(node.attributes.left) : 0,
              top: node.attributes.top ? parseFloat(node.attributes.top) : 0
            };
            if (node.attributes.right !== node.attributes.left) {
              model.center.right = node.attributes.right ? parseFloat(node.attributes.right) : 0;
            }
            if (node.attributes.bottom !== node.attributes.top) {
              model.center.bottom = node.attributes.bottom ? parseFloat(node.attributes.bottom) : 0;
            }
          }
          return true;
        }
        case "stop":
          this.parser = this.map.stop;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.stops.push(this.parser.model);
          this.parser = void 0;
        }
        return true;
      }
      return false;
    }
  }
  class FillXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        patternFill: new PatternFillXform(),
        gradientFill: new GradientFillXform()
      };
    }
    get tag() {
      return "fill";
    }
    render(xmlStream2, model) {
      xmlStream2.addRollback();
      xmlStream2.openNode("fill");
      switch (model.type) {
        case "pattern":
          this.map.patternFill.render(xmlStream2, model);
          break;
        case "gradient":
          this.map.gradientFill.render(xmlStream2, model);
          break;
        default:
          xmlStream2.rollback();
          return;
      }
      xmlStream2.closeNode();
      xmlStream2.commit();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "fill":
          this.model = {};
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
            return true;
          }
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model = this.parser.model;
          this.model.type = this.parser.name;
          this.parser = void 0;
        }
        return true;
      }
      return false;
    }
    validStyle(value) {
      return FillXform.validPatternValues[value];
    }
  }
  FillXform.validPatternValues = [
    "none",
    "solid",
    "darkVertical",
    "darkGray",
    "mediumGray",
    "lightGray",
    "gray125",
    "gray0625",
    "darkHorizontal",
    "darkVertical",
    "darkDown",
    "darkUp",
    "darkGrid",
    "darkTrellis",
    "lightHorizontal",
    "lightVertical",
    "lightDown",
    "lightUp",
    "lightGrid",
    "lightTrellis",
    "lightGrid"
  ].reduce((p, v) => {
    p[v] = true;
    return p;
  }, {});
  FillXform.StopXform = StopXform;
  FillXform.PatternFillXform = PatternFillXform;
  FillXform.GradientFillXform = GradientFillXform;
  fillXform = FillXform;
  return fillXform;
}
var borderXform;
var hasRequiredBorderXform;
function requireBorderXform() {
  if (hasRequiredBorderXform) return borderXform;
  hasRequiredBorderXform = 1;
  const BaseXform = requireBaseXform();
  const utils = requireUtils();
  const ColorXform = requireColorXform();
  class EdgeXform extends BaseXform {
    constructor(name) {
      super();
      this.name = name;
      this.map = {
        color: new ColorXform()
      };
    }
    get tag() {
      return this.name;
    }
    render(xmlStream2, model, defaultColor) {
      const color = model && model.color || defaultColor || this.defaultColor;
      xmlStream2.openNode(this.name);
      if (model && model.style) {
        xmlStream2.addAttribute("style", model.style);
        if (color) {
          this.map.color.render(xmlStream2, color);
        }
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.name: {
          const { style } = node.attributes;
          if (style) {
            this.model = {
              style
            };
          } else {
            this.model = void 0;
          }
          return true;
        }
        case "color":
          this.parser = this.map.color;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      if (name === this.name) {
        if (this.map.color.model) {
          if (!this.model) {
            this.model = {};
          }
          this.model.color = this.map.color.model;
        }
      }
      return false;
    }
    validStyle(value) {
      return EdgeXform.validStyleValues[value];
    }
  }
  EdgeXform.validStyleValues = [
    "thin",
    "dashed",
    "dotted",
    "dashDot",
    "hair",
    "dashDotDot",
    "slantDashDot",
    "mediumDashed",
    "mediumDashDotDot",
    "mediumDashDot",
    "medium",
    "double",
    "thick"
  ].reduce((p, v) => {
    p[v] = true;
    return p;
  }, {});
  class BorderXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        top: new EdgeXform("top"),
        left: new EdgeXform("left"),
        bottom: new EdgeXform("bottom"),
        right: new EdgeXform("right"),
        diagonal: new EdgeXform("diagonal")
      };
    }
    render(xmlStream2, model) {
      const { color } = model;
      xmlStream2.openNode("border");
      if (model.diagonal && model.diagonal.style) {
        if (model.diagonal.up) {
          xmlStream2.addAttribute("diagonalUp", "1");
        }
        if (model.diagonal.down) {
          xmlStream2.addAttribute("diagonalDown", "1");
        }
      }
      function add(edgeModel, edgeXform) {
        if (edgeModel && !edgeModel.color && model.color) {
          edgeModel = {
            ...edgeModel,
            color: model.color
          };
        }
        edgeXform.render(xmlStream2, edgeModel, color);
      }
      add(model.left, this.map.left);
      add(model.right, this.map.right);
      add(model.top, this.map.top);
      add(model.bottom, this.map.bottom);
      add(model.diagonal, this.map.diagonal);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "border":
          this.reset();
          this.diagonalUp = utils.parseBoolean(node.attributes.diagonalUp);
          this.diagonalDown = utils.parseBoolean(node.attributes.diagonalDown);
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
            return true;
          }
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      if (name === "border") {
        const model = this.model = {};
        const add = function(key, edgeModel, extensions) {
          if (edgeModel) {
            if (extensions) {
              Object.assign(edgeModel, extensions);
            }
            model[key] = edgeModel;
          }
        };
        add("left", this.map.left.model);
        add("right", this.map.right.model);
        add("top", this.map.top.model);
        add("bottom", this.map.bottom.model);
        add("diagonal", this.map.diagonal.model, { up: this.diagonalUp, down: this.diagonalDown });
      }
      return false;
    }
  }
  borderXform = BorderXform;
  return borderXform;
}
var defaultnumformats;
var hasRequiredDefaultnumformats;
function requireDefaultnumformats() {
  if (hasRequiredDefaultnumformats) return defaultnumformats;
  hasRequiredDefaultnumformats = 1;
  defaultnumformats = {
    0: { f: "General" },
    1: { f: "0" },
    2: { f: "0.00" },
    3: { f: "#,##0" },
    4: { f: "#,##0.00" },
    9: { f: "0%" },
    10: { f: "0.00%" },
    11: { f: "0.00E+00" },
    12: { f: "# ?/?" },
    13: { f: "# ??/??" },
    14: { f: "mm-dd-yy" },
    15: { f: "d-mmm-yy" },
    16: { f: "d-mmm" },
    17: { f: "mmm-yy" },
    18: { f: "h:mm AM/PM" },
    19: { f: "h:mm:ss AM/PM" },
    20: { f: "h:mm" },
    21: { f: "h:mm:ss" },
    22: { f: 'm/d/yy "h":mm' },
    27: {
      "zh-tw": "[$-404]e/m/d",
      "zh-cn": 'yyyy"年"m"月"',
      "ja-jp": "[$-411]ge.m.d",
      "ko-kr": 'yyyy"年" mm"月" dd"日"'
    },
    28: {
      "zh-tw": '[$-404]e"年"m"月"d"日"',
      "zh-cn": 'm"月"d"日"',
      "ja-jp": '[$-411]ggge"年"m"月"d"日"',
      "ko-kr": "mm-dd"
    },
    29: {
      "zh-tw": '[$-404]e"年"m"月"d"日"',
      "zh-cn": 'm"月"d"日"',
      "ja-jp": '[$-411]ggge"年"m"月"d"日"',
      "ko-kr": "mm-dd"
    },
    30: { "zh-tw": "m/d/yy ", "zh-cn": "m-d-yy", "ja-jp": "m/d/yy", "ko-kr": "mm-dd-yy" },
    31: {
      "zh-tw": 'yyyy"年"m"月"d"日"',
      "zh-cn": 'yyyy"年"m"月"d"日"',
      "ja-jp": 'yyyy"年"m"月"d"日"',
      "ko-kr": 'yyyy"년" mm"월" dd"일"'
    },
    32: {
      "zh-tw": 'hh"時"mm"分"',
      "zh-cn": 'h"时"mm"分"',
      "ja-jp": 'h"時"mm"分"',
      "ko-kr": 'h"시" mm"분"'
    },
    33: {
      "zh-tw": 'hh"時"mm"分"ss"秒"',
      "zh-cn": 'h"时"mm"分"ss"秒"',
      "ja-jp": 'h"時"mm"分"ss"秒"',
      "ko-kr": 'h"시" mm"분" ss"초"'
    },
    34: {
      "zh-tw": '上午/下午 hh"時"mm"分"',
      "zh-cn": '上午/下午 h"时"mm"分"',
      "ja-jp": 'yyyy"年"m"月"',
      "ko-kr": "yyyy-mm-dd"
    },
    35: {
      "zh-tw": '上午/下午 hh"時"mm"分"ss"秒"',
      "zh-cn": '上午/下午 h"时"mm"分"ss"秒"',
      "ja-jp": 'm"月"d"日"',
      "ko-kr": "yyyy-mm-dd"
    },
    36: {
      "zh-tw": "[$-404]e/m/d",
      "zh-cn": 'yyyy"年"m"月"',
      "ja-jp": "[$-411]ge.m.d",
      "ko-kr": 'yyyy"年" mm"月" dd"日"'
    },
    37: { f: "#,##0 ;(#,##0)" },
    38: { f: "#,##0 ;[Red](#,##0)" },
    39: { f: "#,##0.00 ;(#,##0.00)" },
    40: { f: "#,##0.00 ;[Red](#,##0.00)" },
    45: { f: "mm:ss" },
    46: { f: "[h]:mm:ss" },
    47: { f: "mmss.0" },
    48: { f: "##0.0E+0" },
    49: { f: "@" },
    50: {
      "zh-tw": "[$-404]e/m/d",
      "zh-cn": 'yyyy"年"m"月"',
      "ja-jp": "[$-411]ge.m.d",
      "ko-kr": 'yyyy"年" mm"月" dd"日"'
    },
    51: {
      "zh-tw": '[$-404]e"年"m"月"d"日"',
      "zh-cn": 'm"月"d"日"',
      "ja-jp": '[$-411]ggge"年"m"月"d"日"',
      "ko-kr": "mm-dd"
    },
    52: {
      "zh-tw": '上午/下午 hh"時"mm"分"',
      "zh-cn": 'yyyy"年"m"月"',
      "ja-jp": 'yyyy"年"m"月"',
      "ko-kr": "yyyy-mm-dd"
    },
    53: {
      "zh-tw": '上午/下午 hh"時"mm"分"ss"秒"',
      "zh-cn": 'm"月"d"日"',
      "ja-jp": 'm"月"d"日"',
      "ko-kr": "yyyy-mm-dd"
    },
    54: {
      "zh-tw": '[$-404]e"年"m"月"d"日"',
      "zh-cn": 'm"月"d"日"',
      "ja-jp": '[$-411]ggge"年"m"月"d"日"',
      "ko-kr": "mm-dd"
    },
    55: {
      "zh-tw": '上午/下午 hh"時"mm"分"',
      "zh-cn": '上午/下午 h"时"mm"分"',
      "ja-jp": 'yyyy"年"m"月"',
      "ko-kr": "yyyy-mm-dd"
    },
    56: {
      "zh-tw": '上午/下午 hh"時"mm"分"ss"秒"',
      "zh-cn": '上午/下午 h"时"mm"分"ss"秒"',
      "ja-jp": 'm"月"d"日"',
      "ko-kr": "yyyy-mm-dd"
    },
    57: {
      "zh-tw": "[$-404]e/m/d",
      "zh-cn": 'yyyy"年"m"月"',
      "ja-jp": "[$-411]ge.m.d",
      "ko-kr": 'yyyy"年" mm"月" dd"日"'
    },
    58: {
      "zh-tw": '[$-404]e"年"m"月"d"日"',
      "zh-cn": 'm"月"d"日"',
      "ja-jp": '[$-411]ggge"年"m"月"d"日"',
      "ko-kr": "mm-dd"
    },
    59: { "th-th": "t0" },
    60: { "th-th": "t0.00" },
    61: { "th-th": "t#,##0" },
    62: { "th-th": "t#,##0.00" },
    67: { "th-th": "t0%" },
    68: { "th-th": "t0.00%" },
    69: { "th-th": "t# ?/?" },
    70: { "th-th": "t# ??/??" },
    81: { "th-th": "d/m/bb" }
  };
  return defaultnumformats;
}
var numfmtXform;
var hasRequiredNumfmtXform;
function requireNumfmtXform() {
  if (hasRequiredNumfmtXform) return numfmtXform;
  hasRequiredNumfmtXform = 1;
  const _ = requireUnderDash();
  const defaultNumFormats = requireDefaultnumformats();
  const BaseXform = requireBaseXform();
  function hashDefaultFormats() {
    const hash = {};
    _.each(defaultNumFormats, (dnf, id) => {
      if (dnf.f) {
        hash[dnf.f] = parseInt(id, 10);
      }
    });
    return hash;
  }
  const defaultFmtHash = hashDefaultFormats();
  class NumFmtXform extends BaseXform {
    constructor(id, formatCode) {
      super();
      this.id = id;
      this.formatCode = formatCode;
    }
    get tag() {
      return "numFmt";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode("numFmt", { numFmtId: model.id, formatCode: model.formatCode });
    }
    parseOpen(node) {
      switch (node.name) {
        case "numFmt":
          this.model = {
            id: parseInt(node.attributes.numFmtId, 10),
            formatCode: node.attributes.formatCode.replace(/[\\](.)/g, "$1")
          };
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  NumFmtXform.getDefaultFmtId = function getDefaultFmtId(formatCode) {
    return defaultFmtHash[formatCode];
  };
  NumFmtXform.getDefaultFmtCode = function getDefaultFmtCode(numFmtId) {
    return defaultNumFormats[numFmtId] && defaultNumFormats[numFmtId].f;
  };
  numfmtXform = NumFmtXform;
  return numfmtXform;
}
var alignmentXform;
var hasRequiredAlignmentXform;
function requireAlignmentXform() {
  if (hasRequiredAlignmentXform) return alignmentXform;
  hasRequiredAlignmentXform = 1;
  const Enums = requireEnums();
  const utils = requireUtils();
  const BaseXform = requireBaseXform();
  const validation = {
    horizontalValues: [
      "left",
      "center",
      "right",
      "fill",
      "centerContinuous",
      "distributed",
      "justify"
    ].reduce((p, v) => {
      p[v] = true;
      return p;
    }, {}),
    horizontal(value) {
      return this.horizontalValues[value] ? value : void 0;
    },
    verticalValues: ["top", "middle", "bottom", "distributed", "justify"].reduce((p, v) => {
      p[v] = true;
      return p;
    }, {}),
    vertical(value) {
      if (value === "middle") return "center";
      return this.verticalValues[value] ? value : void 0;
    },
    wrapText(value) {
      return value ? true : void 0;
    },
    shrinkToFit(value) {
      return value ? true : void 0;
    },
    textRotation(value) {
      switch (value) {
        case "vertical":
          return value;
        default:
          value = utils.validInt(value);
          return value >= -90 && value <= 90 ? value : void 0;
      }
    },
    indent(value) {
      value = utils.validInt(value);
      return Math.max(0, value);
    },
    readingOrder(value) {
      switch (value) {
        case "ltr":
          return Enums.ReadingOrder.LeftToRight;
        case "rtl":
          return Enums.ReadingOrder.RightToLeft;
        default:
          return void 0;
      }
    }
  };
  const textRotationXform = {
    toXml(textRotation) {
      textRotation = validation.textRotation(textRotation);
      if (textRotation) {
        if (textRotation === "vertical") {
          return 255;
        }
        const tr = Math.round(textRotation);
        if (tr >= 0 && tr <= 90) {
          return tr;
        }
        if (tr < 0 && tr >= -90) {
          return 90 - tr;
        }
      }
      return void 0;
    },
    toModel(textRotation) {
      const tr = utils.validInt(textRotation);
      if (tr !== void 0) {
        if (tr === 255) {
          return "vertical";
        }
        if (tr >= 0 && tr <= 90) {
          return tr;
        }
        if (tr > 90 && tr <= 180) {
          return 90 - tr;
        }
      }
      return void 0;
    }
  };
  class AlignmentXform extends BaseXform {
    get tag() {
      return "alignment";
    }
    render(xmlStream2, model) {
      xmlStream2.addRollback();
      xmlStream2.openNode("alignment");
      let isValid = false;
      function add(name, value) {
        if (value) {
          xmlStream2.addAttribute(name, value);
          isValid = true;
        }
      }
      add("horizontal", validation.horizontal(model.horizontal));
      add("vertical", validation.vertical(model.vertical));
      add("wrapText", validation.wrapText(model.wrapText) ? "1" : false);
      add("shrinkToFit", validation.shrinkToFit(model.shrinkToFit) ? "1" : false);
      add("indent", validation.indent(model.indent));
      add("textRotation", textRotationXform.toXml(model.textRotation));
      add("readingOrder", validation.readingOrder(model.readingOrder));
      xmlStream2.closeNode();
      if (isValid) {
        xmlStream2.commit();
      } else {
        xmlStream2.rollback();
      }
    }
    parseOpen(node) {
      const model = {};
      let valid = false;
      function add(truthy, name, value) {
        if (truthy) {
          model[name] = value;
          valid = true;
        }
      }
      add(node.attributes.horizontal, "horizontal", node.attributes.horizontal);
      add(
        node.attributes.vertical,
        "vertical",
        node.attributes.vertical === "center" ? "middle" : node.attributes.vertical
      );
      add(node.attributes.wrapText, "wrapText", utils.parseBoolean(node.attributes.wrapText));
      add(node.attributes.shrinkToFit, "shrinkToFit", utils.parseBoolean(node.attributes.shrinkToFit));
      add(node.attributes.indent, "indent", parseInt(node.attributes.indent, 10));
      add(
        node.attributes.textRotation,
        "textRotation",
        textRotationXform.toModel(node.attributes.textRotation)
      );
      add(
        node.attributes.readingOrder,
        "readingOrder",
        node.attributes.readingOrder === "2" ? "rtl" : "ltr"
      );
      this.model = valid ? model : null;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  alignmentXform = AlignmentXform;
  return alignmentXform;
}
var protectionXform;
var hasRequiredProtectionXform;
function requireProtectionXform() {
  if (hasRequiredProtectionXform) return protectionXform;
  hasRequiredProtectionXform = 1;
  const BaseXform = requireBaseXform();
  const validation = {
    boolean(value, dflt) {
      if (value === void 0) {
        return dflt;
      }
      return value;
    }
  };
  class ProtectionXform extends BaseXform {
    get tag() {
      return "protection";
    }
    render(xmlStream2, model) {
      xmlStream2.addRollback();
      xmlStream2.openNode("protection");
      let isValid = false;
      function add(name, value) {
        if (value !== void 0) {
          xmlStream2.addAttribute(name, value);
          isValid = true;
        }
      }
      add("locked", validation.boolean(model.locked, true) ? void 0 : "0");
      add("hidden", validation.boolean(model.hidden, false) ? "1" : void 0);
      xmlStream2.closeNode();
      if (isValid) {
        xmlStream2.commit();
      } else {
        xmlStream2.rollback();
      }
    }
    parseOpen(node) {
      const model = {
        locked: !(node.attributes.locked === "0"),
        hidden: node.attributes.hidden === "1"
      };
      const isSignificant = !model.locked || model.hidden;
      this.model = isSignificant ? model : null;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  protectionXform = ProtectionXform;
  return protectionXform;
}
var styleXform;
var hasRequiredStyleXform;
function requireStyleXform() {
  if (hasRequiredStyleXform) return styleXform;
  hasRequiredStyleXform = 1;
  const BaseXform = requireBaseXform();
  const AlignmentXform = requireAlignmentXform();
  const ProtectionXform = requireProtectionXform();
  class StyleXform extends BaseXform {
    constructor(options) {
      super();
      this.xfId = !!(options && options.xfId);
      this.map = {
        alignment: new AlignmentXform(),
        protection: new ProtectionXform()
      };
    }
    get tag() {
      return "xf";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("xf", {
        numFmtId: model.numFmtId || 0,
        fontId: model.fontId || 0,
        fillId: model.fillId || 0,
        borderId: model.borderId || 0
      });
      if (this.xfId) {
        xmlStream2.addAttribute("xfId", model.xfId || 0);
      }
      if (model.numFmtId) {
        xmlStream2.addAttribute("applyNumberFormat", "1");
      }
      if (model.fontId) {
        xmlStream2.addAttribute("applyFont", "1");
      }
      if (model.fillId) {
        xmlStream2.addAttribute("applyFill", "1");
      }
      if (model.borderId) {
        xmlStream2.addAttribute("applyBorder", "1");
      }
      if (model.alignment) {
        xmlStream2.addAttribute("applyAlignment", "1");
      }
      if (model.protection) {
        xmlStream2.addAttribute("applyProtection", "1");
      }
      if (model.alignment) {
        this.map.alignment.render(xmlStream2, model.alignment);
      }
      if (model.protection) {
        this.map.protection.render(xmlStream2, model.protection);
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "xf":
          this.model = {
            numFmtId: parseInt(node.attributes.numFmtId, 10),
            fontId: parseInt(node.attributes.fontId, 10),
            fillId: parseInt(node.attributes.fillId, 10),
            borderId: parseInt(node.attributes.borderId, 10)
          };
          if (this.xfId) {
            this.model.xfId = parseInt(node.attributes.xfId, 10);
          }
          return true;
        case "alignment":
          this.parser = this.map.alignment;
          this.parser.parseOpen(node);
          return true;
        case "protection":
          this.parser = this.map.protection;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          if (this.map.protection === this.parser) {
            this.model.protection = this.parser.model;
          } else {
            this.model.alignment = this.parser.model;
          }
          this.parser = void 0;
        }
        return true;
      }
      return name !== "xf";
    }
  }
  styleXform = StyleXform;
  return styleXform;
}
var dxfXform;
var hasRequiredDxfXform;
function requireDxfXform() {
  if (hasRequiredDxfXform) return dxfXform;
  hasRequiredDxfXform = 1;
  const BaseXform = requireBaseXform();
  const AlignmentXform = requireAlignmentXform();
  const BorderXform = requireBorderXform();
  const FillXform = requireFillXform();
  const FontXform = requireFontXform();
  const NumFmtXform = requireNumfmtXform();
  const ProtectionXform = requireProtectionXform();
  class DxfXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        alignment: new AlignmentXform(),
        border: new BorderXform(),
        fill: new FillXform(),
        font: new FontXform(),
        numFmt: new NumFmtXform(),
        protection: new ProtectionXform()
      };
    }
    get tag() {
      return "dxf";
    }
    // how do we generate dxfid?
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      if (model.font) {
        this.map.font.render(xmlStream2, model.font);
      }
      if (model.numFmt && model.numFmtId) {
        const numFmtModel = { id: model.numFmtId, formatCode: model.numFmt };
        this.map.numFmt.render(xmlStream2, numFmtModel);
      }
      if (model.fill) {
        this.map.fill.render(xmlStream2, model.fill);
      }
      if (model.alignment) {
        this.map.alignment.render(xmlStream2, model.alignment);
      }
      if (model.border) {
        this.map.border.render(xmlStream2, model.border);
      }
      if (model.protection) {
        this.map.protection.render(xmlStream2, model.protection);
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          return true;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      if (name === this.tag) {
        this.model = {
          alignment: this.map.alignment.model,
          border: this.map.border.model,
          fill: this.map.fill.model,
          font: this.map.font.model,
          numFmt: this.map.numFmt.model,
          protection: this.map.protection.model
        };
        return false;
      }
      return true;
    }
  }
  dxfXform = DxfXform;
  return dxfXform;
}
var stylesXform;
var hasRequiredStylesXform;
function requireStylesXform() {
  if (hasRequiredStylesXform) return stylesXform;
  hasRequiredStylesXform = 1;
  const Enums = requireEnums();
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const StaticXform = requireStaticXform();
  const ListXform = requireListXform();
  const FontXform = requireFontXform();
  const FillXform = requireFillXform();
  const BorderXform = requireBorderXform();
  const NumFmtXform = requireNumfmtXform();
  const StyleXform = requireStyleXform();
  const DxfXform = requireDxfXform();
  const NUMFMT_BASE = 164;
  class StylesXform extends BaseXform {
    constructor(initialise) {
      super();
      this.map = {
        numFmts: new ListXform({ tag: "numFmts", count: true, childXform: new NumFmtXform() }),
        fonts: new ListXform({
          tag: "fonts",
          count: true,
          childXform: new FontXform(),
          $: { "x14ac:knownFonts": 1 }
        }),
        fills: new ListXform({ tag: "fills", count: true, childXform: new FillXform() }),
        borders: new ListXform({ tag: "borders", count: true, childXform: new BorderXform() }),
        cellStyleXfs: new ListXform({ tag: "cellStyleXfs", count: true, childXform: new StyleXform() }),
        cellXfs: new ListXform({
          tag: "cellXfs",
          count: true,
          childXform: new StyleXform({ xfId: true })
        }),
        dxfs: new ListXform({ tag: "dxfs", always: true, count: true, childXform: new DxfXform() }),
        // for style manager
        numFmt: new NumFmtXform(),
        font: new FontXform(),
        fill: new FillXform(),
        border: new BorderXform(),
        style: new StyleXform({ xfId: true }),
        cellStyles: StylesXform.STATIC_XFORMS.cellStyles,
        tableStyles: StylesXform.STATIC_XFORMS.tableStyles,
        extLst: StylesXform.STATIC_XFORMS.extLst
      };
      if (initialise) {
        this.init();
      }
    }
    initIndex() {
      this.index = {
        style: {},
        numFmt: {},
        numFmtNextId: 164,
        // start custom format ids here
        font: {},
        border: {},
        fill: {}
      };
    }
    init() {
      this.model = {
        styles: [],
        numFmts: [],
        fonts: [],
        borders: [],
        fills: [],
        dxfs: []
      };
      this.initIndex();
      this._addBorder({});
      this._addStyle({ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0, xfId: 0 });
      this._addFill({ type: "pattern", pattern: "none" });
      this._addFill({ type: "pattern", pattern: "gray125" });
      this.weakMap = /* @__PURE__ */ new WeakMap();
    }
    render(xmlStream2, model) {
      model = model || this.model;
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("styleSheet", StylesXform.STYLESHEET_ATTRIBUTES);
      if (this.index) {
        if (model.numFmts && model.numFmts.length) {
          xmlStream2.openNode("numFmts", { count: model.numFmts.length });
          model.numFmts.forEach((numFmtXml) => {
            xmlStream2.writeXml(numFmtXml);
          });
          xmlStream2.closeNode();
        }
        if (!model.fonts.length) {
          this._addFont({ size: 11, color: { theme: 1 }, name: "Calibri", family: 2, scheme: "minor" });
        }
        xmlStream2.openNode("fonts", { count: model.fonts.length, "x14ac:knownFonts": 1 });
        model.fonts.forEach((fontXml) => {
          xmlStream2.writeXml(fontXml);
        });
        xmlStream2.closeNode();
        xmlStream2.openNode("fills", { count: model.fills.length });
        model.fills.forEach((fillXml) => {
          xmlStream2.writeXml(fillXml);
        });
        xmlStream2.closeNode();
        xmlStream2.openNode("borders", { count: model.borders.length });
        model.borders.forEach((borderXml) => {
          xmlStream2.writeXml(borderXml);
        });
        xmlStream2.closeNode();
        this.map.cellStyleXfs.render(xmlStream2, [{ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0, xfId: 0 }]);
        xmlStream2.openNode("cellXfs", { count: model.styles.length });
        model.styles.forEach((styleXml) => {
          xmlStream2.writeXml(styleXml);
        });
        xmlStream2.closeNode();
      } else {
        this.map.numFmts.render(xmlStream2, model.numFmts);
        this.map.fonts.render(xmlStream2, model.fonts);
        this.map.fills.render(xmlStream2, model.fills);
        this.map.borders.render(xmlStream2, model.borders);
        this.map.cellStyleXfs.render(xmlStream2, [{ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0, xfId: 0 }]);
        this.map.cellXfs.render(xmlStream2, model.styles);
      }
      StylesXform.STATIC_XFORMS.cellStyles.render(xmlStream2);
      this.map.dxfs.render(xmlStream2, model.dxfs);
      StylesXform.STATIC_XFORMS.tableStyles.render(xmlStream2);
      StylesXform.STATIC_XFORMS.extLst.render(xmlStream2);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "styleSheet":
          this.initIndex();
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          return true;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case "styleSheet": {
          this.model = {};
          const add = (propName, xform) => {
            if (xform.model && xform.model.length) {
              this.model[propName] = xform.model;
            }
          };
          add("numFmts", this.map.numFmts);
          add("fonts", this.map.fonts);
          add("fills", this.map.fills);
          add("borders", this.map.borders);
          add("styles", this.map.cellXfs);
          add("dxfs", this.map.dxfs);
          this.index = {
            model: [],
            numFmt: []
          };
          if (this.model.numFmts) {
            const numFmtIndex = this.index.numFmt;
            this.model.numFmts.forEach((numFmt) => {
              numFmtIndex[numFmt.id] = numFmt.formatCode;
            });
          }
          return false;
        }
        default:
          return true;
      }
    }
    // add a cell's style model to the collection
    // each style property is processed and cross-referenced, etc.
    // the styleId is returned. Note: cellType is used when numFmt not defined
    addStyleModel(model, cellType) {
      if (!model) {
        return 0;
      }
      if (!this.model.fonts.length) {
        this._addFont({ size: 11, color: { theme: 1 }, name: "Calibri", family: 2, scheme: "minor" });
      }
      if (this.weakMap && this.weakMap.has(model)) {
        return this.weakMap.get(model);
      }
      const style = {};
      cellType = cellType || Enums.ValueType.Number;
      if (model.numFmt) {
        style.numFmtId = this._addNumFmtStr(model.numFmt);
      } else {
        switch (cellType) {
          case Enums.ValueType.Number:
            style.numFmtId = this._addNumFmtStr("General");
            break;
          case Enums.ValueType.Date:
            style.numFmtId = this._addNumFmtStr("mm-dd-yy");
            break;
        }
      }
      if (model.font) {
        style.fontId = this._addFont(model.font);
      }
      if (model.border) {
        style.borderId = this._addBorder(model.border);
      }
      if (model.fill) {
        style.fillId = this._addFill(model.fill);
      }
      if (model.alignment) {
        style.alignment = model.alignment;
      }
      if (model.protection) {
        style.protection = model.protection;
      }
      const styleId = this._addStyle(style);
      if (this.weakMap) {
        this.weakMap.set(model, styleId);
      }
      return styleId;
    }
    // given a styleId (i.e. s="n"), get the cell's style model
    // objects are shared where possible.
    getStyleModel(id) {
      const style = this.model.styles[id];
      if (!style) return null;
      let model = this.index.model[id];
      if (model) return model;
      model = this.index.model[id] = {};
      if (style.numFmtId) {
        const numFmt = this.index.numFmt[style.numFmtId] || NumFmtXform.getDefaultFmtCode(style.numFmtId);
        if (numFmt) {
          model.numFmt = numFmt;
        }
      }
      function addStyle(name, group, styleId) {
        if (styleId || styleId === 0) {
          const part = group[styleId];
          if (part) {
            model[name] = part;
          }
        }
      }
      addStyle("font", this.model.fonts, style.fontId);
      addStyle("border", this.model.borders, style.borderId);
      addStyle("fill", this.model.fills, style.fillId);
      if (style.alignment) {
        model.alignment = style.alignment;
      }
      if (style.protection) {
        model.protection = style.protection;
      }
      return model;
    }
    addDxfStyle(style) {
      if (style.numFmt) {
        style.numFmtId = this._addNumFmtStr(style.numFmt);
      }
      this.model.dxfs.push(style);
      return this.model.dxfs.length - 1;
    }
    getDxfStyle(id) {
      return this.model.dxfs[id];
    }
    // =========================================================================
    // Private Interface
    _addStyle(style) {
      const xml = this.map.style.toXml(style);
      let index = this.index.style[xml];
      if (index === void 0) {
        index = this.index.style[xml] = this.model.styles.length;
        this.model.styles.push(xml);
      }
      return index;
    }
    // =========================================================================
    // Number Formats
    _addNumFmtStr(formatCode) {
      let index = NumFmtXform.getDefaultFmtId(formatCode);
      if (index !== void 0) return index;
      index = this.index.numFmt[formatCode];
      if (index !== void 0) return index;
      index = this.index.numFmt[formatCode] = NUMFMT_BASE + this.model.numFmts.length;
      const xml = this.map.numFmt.toXml({ id: index, formatCode });
      this.model.numFmts.push(xml);
      return index;
    }
    // =========================================================================
    // Fonts
    _addFont(font) {
      const xml = this.map.font.toXml(font);
      let index = this.index.font[xml];
      if (index === void 0) {
        index = this.index.font[xml] = this.model.fonts.length;
        this.model.fonts.push(xml);
      }
      return index;
    }
    // =========================================================================
    // Borders
    _addBorder(border) {
      const xml = this.map.border.toXml(border);
      let index = this.index.border[xml];
      if (index === void 0) {
        index = this.index.border[xml] = this.model.borders.length;
        this.model.borders.push(xml);
      }
      return index;
    }
    // =========================================================================
    // Fills
    _addFill(fill) {
      const xml = this.map.fill.toXml(fill);
      let index = this.index.fill[xml];
      if (index === void 0) {
        index = this.index.fill[xml] = this.model.fills.length;
        this.model.fills.push(xml);
      }
      return index;
    }
    // =========================================================================
  }
  StylesXform.STYLESHEET_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
    "mc:Ignorable": "x14ac x16r2",
    "xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",
    "xmlns:x16r2": "http://schemas.microsoft.com/office/spreadsheetml/2015/02/main"
  };
  StylesXform.STATIC_XFORMS = {
    cellStyles: new StaticXform({
      tag: "cellStyles",
      $: { count: 1 },
      c: [{ tag: "cellStyle", $: { name: "Normal", xfId: 0, builtinId: 0 } }]
    }),
    dxfs: new StaticXform({ tag: "dxfs", $: { count: 0 } }),
    tableStyles: new StaticXform({
      tag: "tableStyles",
      $: { count: 0, defaultTableStyle: "TableStyleMedium2", defaultPivotStyle: "PivotStyleLight16" }
    }),
    extLst: new StaticXform({
      tag: "extLst",
      c: [
        {
          tag: "ext",
          $: {
            uri: "{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}",
            "xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
          },
          c: [{ tag: "x14:slicerStyles", $: { defaultSlicerStyle: "SlicerStyleLight1" } }]
        },
        {
          tag: "ext",
          $: {
            uri: "{9260A510-F301-46a8-8635-F512D64BE5F5}",
            "xmlns:x15": "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
          },
          c: [{ tag: "x15:timelineStyles", $: { defaultTimelineStyle: "TimeSlicerStyleLight1" } }]
        }
      ]
    })
  };
  class StylesXformMock extends StylesXform {
    constructor() {
      super();
      this.model = {
        styles: [{ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0, xfId: 0 }],
        numFmts: [],
        fonts: [{ size: 11, color: { theme: 1 }, name: "Calibri", family: 2, scheme: "minor" }],
        borders: [{}],
        fills: [
          { type: "pattern", pattern: "none" },
          { type: "pattern", pattern: "gray125" }
        ]
      };
    }
    // =========================================================================
    // Style Manager Interface
    // override normal behaviour - consume and dispose
    parseStream(stream) {
      stream.autodrain();
      return Promise.resolve();
    }
    // add a cell's style model to the collection
    // each style property is processed and cross-referenced, etc.
    // the styleId is returned. Note: cellType is used when numFmt not defined
    addStyleModel(model, cellType) {
      switch (cellType) {
        case Enums.ValueType.Date:
          return this.dateStyleId;
        default:
          return 0;
      }
    }
    get dateStyleId() {
      if (!this._dateStyleId) {
        const dateStyle = {
          numFmtId: NumFmtXform.getDefaultFmtId("mm-dd-yy")
        };
        this._dateStyleId = this.model.styles.length;
        this.model.styles.push(dateStyle);
      }
      return this._dateStyleId;
    }
    // given a styleId (i.e. s="n"), get the cell's style model
    // objects are shared where possible.
    getStyleModel() {
      return {};
    }
  }
  StylesXform.Mock = StylesXformMock;
  stylesXform = StylesXform;
  return stylesXform;
}
var dateXform;
var hasRequiredDateXform;
function requireDateXform() {
  if (hasRequiredDateXform) return dateXform;
  hasRequiredDateXform = 1;
  const BaseXform = requireBaseXform();
  class DateXform extends BaseXform {
    constructor(options) {
      super();
      this.tag = options.tag;
      this.attr = options.attr;
      this.attrs = options.attrs;
      this._format = options.format || function(dt) {
        try {
          if (Number.isNaN(dt.getTime())) return "";
          return dt.toISOString();
        } catch (e) {
          return "";
        }
      };
      this._parse = options.parse || function(str) {
        return new Date(str);
      };
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.openNode(this.tag);
        if (this.attrs) {
          xmlStream2.addAttributes(this.attrs);
        }
        if (this.attr) {
          xmlStream2.addAttribute(this.attr, this._format(model));
        } else {
          xmlStream2.writeText(this._format(model));
        }
        xmlStream2.closeNode();
      }
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        if (this.attr) {
          this.model = this._parse(node.attributes[this.attr]);
        } else {
          this.text = [];
        }
      }
    }
    parseText(text) {
      if (!this.attr) {
        this.text.push(text);
      }
    }
    parseClose() {
      if (!this.attr) {
        this.model = this._parse(this.text.join(""));
      }
      return false;
    }
  }
  dateXform = DateXform;
  return dateXform;
}
var coreXform;
var hasRequiredCoreXform;
function requireCoreXform() {
  if (hasRequiredCoreXform) return coreXform;
  hasRequiredCoreXform = 1;
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const DateXform = requireDateXform();
  const StringXform = requireStringXform();
  const IntegerXform = requireIntegerXform();
  class CoreXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "dc:creator": new StringXform({ tag: "dc:creator" }),
        "dc:title": new StringXform({ tag: "dc:title" }),
        "dc:subject": new StringXform({ tag: "dc:subject" }),
        "dc:description": new StringXform({ tag: "dc:description" }),
        "dc:identifier": new StringXform({ tag: "dc:identifier" }),
        "dc:language": new StringXform({ tag: "dc:language" }),
        "cp:keywords": new StringXform({ tag: "cp:keywords" }),
        "cp:category": new StringXform({ tag: "cp:category" }),
        "cp:lastModifiedBy": new StringXform({ tag: "cp:lastModifiedBy" }),
        "cp:lastPrinted": new DateXform({ tag: "cp:lastPrinted", format: CoreXform.DateFormat }),
        "cp:revision": new IntegerXform({ tag: "cp:revision" }),
        "cp:version": new StringXform({ tag: "cp:version" }),
        "cp:contentStatus": new StringXform({ tag: "cp:contentStatus" }),
        "cp:contentType": new StringXform({ tag: "cp:contentType" }),
        "dcterms:created": new DateXform({
          tag: "dcterms:created",
          attrs: CoreXform.DateAttrs,
          format: CoreXform.DateFormat
        }),
        "dcterms:modified": new DateXform({
          tag: "dcterms:modified",
          attrs: CoreXform.DateAttrs,
          format: CoreXform.DateFormat
        })
      };
    }
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("cp:coreProperties", CoreXform.CORE_PROPERTY_ATTRIBUTES);
      this.map["dc:creator"].render(xmlStream2, model.creator);
      this.map["dc:title"].render(xmlStream2, model.title);
      this.map["dc:subject"].render(xmlStream2, model.subject);
      this.map["dc:description"].render(xmlStream2, model.description);
      this.map["dc:identifier"].render(xmlStream2, model.identifier);
      this.map["dc:language"].render(xmlStream2, model.language);
      this.map["cp:keywords"].render(xmlStream2, model.keywords);
      this.map["cp:category"].render(xmlStream2, model.category);
      this.map["cp:lastModifiedBy"].render(xmlStream2, model.lastModifiedBy);
      this.map["cp:lastPrinted"].render(xmlStream2, model.lastPrinted);
      this.map["cp:revision"].render(xmlStream2, model.revision);
      this.map["cp:version"].render(xmlStream2, model.version);
      this.map["cp:contentStatus"].render(xmlStream2, model.contentStatus);
      this.map["cp:contentType"].render(xmlStream2, model.contentType);
      this.map["dcterms:created"].render(xmlStream2, model.created);
      this.map["dcterms:modified"].render(xmlStream2, model.modified);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "cp:coreProperties":
        case "coreProperties":
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
            return true;
          }
          throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case "cp:coreProperties":
        case "coreProperties":
          this.model = {
            creator: this.map["dc:creator"].model,
            title: this.map["dc:title"].model,
            subject: this.map["dc:subject"].model,
            description: this.map["dc:description"].model,
            identifier: this.map["dc:identifier"].model,
            language: this.map["dc:language"].model,
            keywords: this.map["cp:keywords"].model,
            category: this.map["cp:category"].model,
            lastModifiedBy: this.map["cp:lastModifiedBy"].model,
            lastPrinted: this.map["cp:lastPrinted"].model,
            revision: this.map["cp:revision"].model,
            contentStatus: this.map["cp:contentStatus"].model,
            contentType: this.map["cp:contentType"].model,
            created: this.map["dcterms:created"].model,
            modified: this.map["dcterms:modified"].model
          };
          return false;
        default:
          throw new Error(`Unexpected xml node in parseClose: ${name}`);
      }
    }
  }
  CoreXform.DateFormat = function(dt) {
    return dt.toISOString().replace(/[.]\d{3}/, "");
  };
  CoreXform.DateAttrs = { "xsi:type": "dcterms:W3CDTF" };
  CoreXform.CORE_PROPERTY_ATTRIBUTES = {
    "xmlns:cp": "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
    "xmlns:dcterms": "http://purl.org/dc/terms/",
    "xmlns:dcmitype": "http://purl.org/dc/dcmitype/",
    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
  };
  coreXform = CoreXform;
  return coreXform;
}
var textXform;
var hasRequiredTextXform;
function requireTextXform() {
  if (hasRequiredTextXform) return textXform;
  hasRequiredTextXform = 1;
  const BaseXform = requireBaseXform();
  class TextXform extends BaseXform {
    get tag() {
      return "t";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("t");
      if (/^\s|\n|\s$/.test(model)) {
        xmlStream2.addAttribute("xml:space", "preserve");
      }
      xmlStream2.writeText(model);
      xmlStream2.closeNode();
    }
    get model() {
      return this._text.join("").replace(/_x([0-9A-F]{4})_/g, ($0, $1) => String.fromCharCode(parseInt($1, 16)));
    }
    parseOpen(node) {
      switch (node.name) {
        case "t":
          this._text = [];
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      this._text.push(text);
    }
    parseClose() {
      return false;
    }
  }
  textXform = TextXform;
  return textXform;
}
var richTextXform;
var hasRequiredRichTextXform;
function requireRichTextXform() {
  if (hasRequiredRichTextXform) return richTextXform;
  hasRequiredRichTextXform = 1;
  const TextXform = requireTextXform();
  const FontXform = requireFontXform();
  const BaseXform = requireBaseXform();
  class RichTextXform extends BaseXform {
    constructor(model) {
      super();
      this.model = model;
    }
    get tag() {
      return "r";
    }
    get textXform() {
      return this._textXform || (this._textXform = new TextXform());
    }
    get fontXform() {
      return this._fontXform || (this._fontXform = new FontXform(RichTextXform.FONT_OPTIONS));
    }
    render(xmlStream2, model) {
      model = model || this.model;
      xmlStream2.openNode("r");
      if (model.font) {
        this.fontXform.render(xmlStream2, model.font);
      }
      this.textXform.render(xmlStream2, model.text);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "r":
          this.model = {};
          return true;
        case "t":
          this.parser = this.textXform;
          this.parser.parseOpen(node);
          return true;
        case "rPr":
          this.parser = this.fontXform;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      switch (name) {
        case "r":
          return false;
        case "t":
          this.model.text = this.parser.model;
          this.parser = void 0;
          return true;
        case "rPr":
          this.model.font = this.parser.model;
          this.parser = void 0;
          return true;
        default:
          if (this.parser) {
            this.parser.parseClose(name);
          }
          return true;
      }
    }
  }
  RichTextXform.FONT_OPTIONS = {
    tagName: "rPr",
    fontNameTag: "rFont"
  };
  richTextXform = RichTextXform;
  return richTextXform;
}
var phoneticTextXform;
var hasRequiredPhoneticTextXform;
function requirePhoneticTextXform() {
  if (hasRequiredPhoneticTextXform) return phoneticTextXform;
  hasRequiredPhoneticTextXform = 1;
  const TextXform = requireTextXform();
  const RichTextXform = requireRichTextXform();
  const BaseXform = requireBaseXform();
  class PhoneticTextXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        r: new RichTextXform(),
        t: new TextXform()
      };
    }
    get tag() {
      return "rPh";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        sb: model.sb || 0,
        eb: model.eb || 0
      });
      if (model && model.hasOwnProperty("richText") && model.richText) {
        const { r } = this.map;
        model.richText.forEach((text) => {
          r.render(xmlStream2, text);
        });
      } else if (model) {
        this.map.t.render(xmlStream2, model.text);
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      const { name } = node;
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (name === this.tag) {
        this.model = {
          sb: parseInt(node.attributes.sb, 10),
          eb: parseInt(node.attributes.eb, 10)
        };
        return true;
      }
      this.parser = this.map[name];
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      return false;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          switch (name) {
            case "r": {
              let rt = this.model.richText;
              if (!rt) {
                rt = this.model.richText = [];
              }
              rt.push(this.parser.model);
              break;
            }
            case "t":
              this.model.text = this.parser.model;
              break;
          }
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }
  phoneticTextXform = PhoneticTextXform;
  return phoneticTextXform;
}
var sharedStringXform;
var hasRequiredSharedStringXform;
function requireSharedStringXform() {
  if (hasRequiredSharedStringXform) return sharedStringXform;
  hasRequiredSharedStringXform = 1;
  const TextXform = requireTextXform();
  const RichTextXform = requireRichTextXform();
  const PhoneticTextXform = requirePhoneticTextXform();
  const BaseXform = requireBaseXform();
  class SharedStringXform extends BaseXform {
    constructor(model) {
      super();
      this.model = model;
      this.map = {
        r: new RichTextXform(),
        t: new TextXform(),
        rPh: new PhoneticTextXform()
      };
    }
    get tag() {
      return "si";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      if (model && model.hasOwnProperty("richText") && model.richText) {
        if (model.richText.length) {
          model.richText.forEach((text) => {
            this.map.r.render(xmlStream2, text);
          });
        } else {
          this.map.t.render(xmlStream2, "");
        }
      } else if (model !== void 0 && model !== null) {
        this.map.t.render(xmlStream2, model);
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      const { name } = node;
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (name === this.tag) {
        this.model = {};
        return true;
      }
      this.parser = this.map[name];
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      return false;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          switch (name) {
            case "r": {
              let rt = this.model.richText;
              if (!rt) {
                rt = this.model.richText = [];
              }
              rt.push(this.parser.model);
              break;
            }
            case "t":
              this.model = this.parser.model;
              break;
          }
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }
  sharedStringXform = SharedStringXform;
  return sharedStringXform;
}
var sharedStringsXform;
var hasRequiredSharedStringsXform;
function requireSharedStringsXform() {
  if (hasRequiredSharedStringsXform) return sharedStringsXform;
  hasRequiredSharedStringsXform = 1;
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const SharedStringXform = requireSharedStringXform();
  class SharedStringsXform extends BaseXform {
    constructor(model) {
      super();
      this.model = model || {
        values: [],
        count: 0
      };
      this.hash = /* @__PURE__ */ Object.create(null);
      this.rich = /* @__PURE__ */ Object.create(null);
    }
    get sharedStringXform() {
      return this._sharedStringXform || (this._sharedStringXform = new SharedStringXform());
    }
    get values() {
      return this.model.values;
    }
    get uniqueCount() {
      return this.model.values.length;
    }
    get count() {
      return this.model.count;
    }
    getString(index) {
      return this.model.values[index];
    }
    add(value) {
      return value.richText ? this.addRichText(value) : this.addText(value);
    }
    addText(value) {
      let index = this.hash[value];
      if (index === void 0) {
        index = this.hash[value] = this.model.values.length;
        this.model.values.push(value);
      }
      this.model.count++;
      return index;
    }
    addRichText(value) {
      const xml = this.sharedStringXform.toXml(value);
      let index = this.rich[xml];
      if (index === void 0) {
        index = this.rich[xml] = this.model.values.length;
        this.model.values.push(value);
      }
      this.model.count++;
      return index;
    }
    // <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    // <sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="<%=totalRefs%>" uniqueCount="<%=count%>">
    //   <si><t><%=text%></t></si>
    //   <si><r><rPr></rPr><t></t></r></si>
    // </sst>
    render(xmlStream2, model) {
      model = model || this._values;
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("sst", {
        xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
        count: model.count,
        uniqueCount: model.values.length
      });
      const sx = this.sharedStringXform;
      model.values.forEach((sharedString) => {
        sx.render(xmlStream2, sharedString);
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "sst":
          return true;
        case "si":
          this.parser = this.sharedStringXform;
          this.parser.parseOpen(node);
          return true;
        default:
          throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.values.push(this.parser.model);
          this.model.count++;
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case "sst":
          return false;
        default:
          throw new Error(`Unexpected xml node in parseClose: ${name}`);
      }
    }
  }
  sharedStringsXform = SharedStringsXform;
  return sharedStringsXform;
}
var relationshipXform;
var hasRequiredRelationshipXform;
function requireRelationshipXform() {
  if (hasRequiredRelationshipXform) return relationshipXform;
  hasRequiredRelationshipXform = 1;
  const BaseXform = requireBaseXform();
  class RelationshipXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.leafNode("Relationship", model);
    }
    parseOpen(node) {
      switch (node.name) {
        case "Relationship":
          this.model = node.attributes;
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  relationshipXform = RelationshipXform;
  return relationshipXform;
}
var relationshipsXform;
var hasRequiredRelationshipsXform;
function requireRelationshipsXform() {
  if (hasRequiredRelationshipsXform) return relationshipsXform;
  hasRequiredRelationshipsXform = 1;
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const RelationshipXform = requireRelationshipXform();
  class RelationshipsXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        Relationship: new RelationshipXform()
      };
    }
    render(xmlStream2, model) {
      model = model || this._values;
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("Relationships", RelationshipsXform.RELATIONSHIPS_ATTRIBUTES);
      model.forEach((relationship) => {
        this.map.Relationship.render(xmlStream2, relationship);
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "Relationships":
          this.model = [];
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
            return true;
          }
          throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.push(this.parser.model);
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case "Relationships":
          return false;
        default:
          throw new Error(`Unexpected xml node in parseClose: ${name}`);
      }
    }
  }
  RelationshipsXform.RELATIONSHIPS_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
  };
  relationshipsXform = RelationshipsXform;
  return relationshipsXform;
}
var contentTypesXform;
var hasRequiredContentTypesXform;
function requireContentTypesXform() {
  if (hasRequiredContentTypesXform) return contentTypesXform;
  hasRequiredContentTypesXform = 1;
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  class ContentTypesXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("Types", ContentTypesXform.PROPERTY_ATTRIBUTES);
      const mediaHash = {};
      (model.media || []).forEach((medium) => {
        if (medium.type === "image") {
          const imageType = medium.extension;
          if (!mediaHash[imageType]) {
            mediaHash[imageType] = true;
            xmlStream2.leafNode("Default", { Extension: imageType, ContentType: `image/${imageType}` });
          }
        }
      });
      xmlStream2.leafNode("Default", {
        Extension: "rels",
        ContentType: "application/vnd.openxmlformats-package.relationships+xml"
      });
      xmlStream2.leafNode("Default", { Extension: "xml", ContentType: "application/xml" });
      xmlStream2.leafNode("Override", {
        PartName: "/xl/workbook.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
      });
      model.worksheets.forEach((worksheet2) => {
        const name = `/xl/worksheets/sheet${worksheet2.id}.xml`;
        xmlStream2.leafNode("Override", {
          PartName: name,
          ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"
        });
      });
      xmlStream2.leafNode("Override", {
        PartName: "/xl/theme/theme1.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.theme+xml"
      });
      xmlStream2.leafNode("Override", {
        PartName: "/xl/styles.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"
      });
      const hasSharedStrings = model.sharedStrings && model.sharedStrings.count;
      if (hasSharedStrings) {
        xmlStream2.leafNode("Override", {
          PartName: "/xl/sharedStrings.xml",
          ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"
        });
      }
      if (model.tables) {
        model.tables.forEach((table2) => {
          xmlStream2.leafNode("Override", {
            PartName: `/xl/tables/${table2.target}`,
            ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"
          });
        });
      }
      if (model.drawings) {
        model.drawings.forEach((drawing) => {
          xmlStream2.leafNode("Override", {
            PartName: `/xl/drawings/${drawing.name}.xml`,
            ContentType: "application/vnd.openxmlformats-officedocument.drawing+xml"
          });
        });
      }
      if (model.commentRefs) {
        xmlStream2.leafNode("Default", {
          Extension: "vml",
          ContentType: "application/vnd.openxmlformats-officedocument.vmlDrawing"
        });
        model.commentRefs.forEach(({ commentName }) => {
          xmlStream2.leafNode("Override", {
            PartName: `/xl/${commentName}.xml`,
            ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml"
          });
        });
      }
      xmlStream2.leafNode("Override", {
        PartName: "/docProps/core.xml",
        ContentType: "application/vnd.openxmlformats-package.core-properties+xml"
      });
      xmlStream2.leafNode("Override", {
        PartName: "/docProps/app.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.extended-properties+xml"
      });
      xmlStream2.closeNode();
    }
    parseOpen() {
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  ContentTypesXform.PROPERTY_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/package/2006/content-types"
  };
  contentTypesXform = ContentTypesXform;
  return contentTypesXform;
}
var appHeadingPairsXform;
var hasRequiredAppHeadingPairsXform;
function requireAppHeadingPairsXform() {
  if (hasRequiredAppHeadingPairsXform) return appHeadingPairsXform;
  hasRequiredAppHeadingPairsXform = 1;
  const BaseXform = requireBaseXform();
  class AppHeadingPairsXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.openNode("HeadingPairs");
      xmlStream2.openNode("vt:vector", { size: 2, baseType: "variant" });
      xmlStream2.openNode("vt:variant");
      xmlStream2.leafNode("vt:lpstr", void 0, "Worksheets");
      xmlStream2.closeNode();
      xmlStream2.openNode("vt:variant");
      xmlStream2.leafNode("vt:i4", void 0, model.length);
      xmlStream2.closeNode();
      xmlStream2.closeNode();
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      return node.name === "HeadingPairs";
    }
    parseText() {
    }
    parseClose(name) {
      return name !== "HeadingPairs";
    }
  }
  appHeadingPairsXform = AppHeadingPairsXform;
  return appHeadingPairsXform;
}
var appTitlesOfPartsXform;
var hasRequiredAppTitlesOfPartsXform;
function requireAppTitlesOfPartsXform() {
  if (hasRequiredAppTitlesOfPartsXform) return appTitlesOfPartsXform;
  hasRequiredAppTitlesOfPartsXform = 1;
  const BaseXform = requireBaseXform();
  class AppTitlesOfPartsXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.openNode("TitlesOfParts");
      xmlStream2.openNode("vt:vector", { size: model.length, baseType: "lpstr" });
      model.forEach((sheet) => {
        xmlStream2.leafNode("vt:lpstr", void 0, sheet.name);
      });
      xmlStream2.closeNode();
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      return node.name === "TitlesOfParts";
    }
    parseText() {
    }
    parseClose(name) {
      return name !== "TitlesOfParts";
    }
  }
  appTitlesOfPartsXform = AppTitlesOfPartsXform;
  return appTitlesOfPartsXform;
}
var appXform;
var hasRequiredAppXform;
function requireAppXform() {
  if (hasRequiredAppXform) return appXform;
  hasRequiredAppXform = 1;
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const StringXform = requireStringXform();
  const AppHeadingPairsXform = requireAppHeadingPairsXform();
  const AppTitleOfPartsXform = requireAppTitlesOfPartsXform();
  class AppXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        Company: new StringXform({ tag: "Company" }),
        Manager: new StringXform({ tag: "Manager" }),
        HeadingPairs: new AppHeadingPairsXform(),
        TitleOfParts: new AppTitleOfPartsXform()
      };
    }
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("Properties", AppXform.PROPERTY_ATTRIBUTES);
      xmlStream2.leafNode("Application", void 0, "Microsoft Excel");
      xmlStream2.leafNode("DocSecurity", void 0, "0");
      xmlStream2.leafNode("ScaleCrop", void 0, "false");
      this.map.HeadingPairs.render(xmlStream2, model.worksheets);
      this.map.TitleOfParts.render(xmlStream2, model.worksheets);
      this.map.Company.render(xmlStream2, model.company || "");
      this.map.Manager.render(xmlStream2, model.manager);
      xmlStream2.leafNode("LinksUpToDate", void 0, "false");
      xmlStream2.leafNode("SharedDoc", void 0, "false");
      xmlStream2.leafNode("HyperlinksChanged", void 0, "false");
      xmlStream2.leafNode("AppVersion", void 0, "16.0300");
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "Properties":
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
            return true;
          }
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case "Properties":
          this.model = {
            worksheets: this.map.TitleOfParts.model,
            company: this.map.Company.model,
            manager: this.map.Manager.model
          };
          return false;
        default:
          return true;
      }
    }
  }
  AppXform.DateFormat = function(dt) {
    return dt.toISOString().replace(/[.]\d{3,6}/, "");
  };
  AppXform.DateAttrs = { "xsi:type": "dcterms:W3CDTF" };
  AppXform.PROPERTY_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    "xmlns:vt": "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
  };
  appXform = AppXform;
  return appXform;
}
var definedNameXform;
var hasRequiredDefinedNameXform;
function requireDefinedNameXform() {
  if (hasRequiredDefinedNameXform) return definedNameXform;
  hasRequiredDefinedNameXform = 1;
  const BaseXform = requireBaseXform();
  const colCache = requireColCache();
  class DefinedNamesXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.openNode("definedName", {
        name: model.name,
        localSheetId: model.localSheetId
      });
      xmlStream2.writeText(model.ranges.join(","));
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      switch (node.name) {
        case "definedName":
          this._parsedName = node.attributes.name;
          this._parsedLocalSheetId = node.attributes.localSheetId;
          this._parsedText = [];
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      this._parsedText.push(text);
    }
    parseClose() {
      this.model = {
        name: this._parsedName,
        ranges: extractRanges(this._parsedText.join(""))
      };
      if (this._parsedLocalSheetId !== void 0) {
        this.model.localSheetId = parseInt(this._parsedLocalSheetId, 10);
      }
      return false;
    }
  }
  function isValidRange(range2) {
    try {
      colCache.decodeEx(range2);
      return true;
    } catch (err) {
      return false;
    }
  }
  function extractRanges(parsedText) {
    const ranges = [];
    let quotesOpened = false;
    let last = "";
    parsedText.split(",").forEach((item) => {
      if (!item) {
        return;
      }
      const quotes = (item.match(/'/g) || []).length;
      if (!quotes) {
        if (quotesOpened) {
          last += `${item},`;
        } else if (isValidRange(item)) {
          ranges.push(item);
        }
        return;
      }
      const quotesEven = quotes % 2 === 0;
      if (!quotesOpened && quotesEven && isValidRange(item)) {
        ranges.push(item);
      } else if (quotesOpened && !quotesEven) {
        quotesOpened = false;
        if (isValidRange(last + item)) {
          ranges.push(last + item);
        }
        last = "";
      } else {
        quotesOpened = true;
        last += `${item},`;
      }
    });
    return ranges;
  }
  definedNameXform = DefinedNamesXform;
  return definedNameXform;
}
var sheetXform;
var hasRequiredSheetXform;
function requireSheetXform() {
  if (hasRequiredSheetXform) return sheetXform;
  hasRequiredSheetXform = 1;
  const utils = requireUtils();
  const BaseXform = requireBaseXform();
  class WorksheetXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.leafNode("sheet", {
        sheetId: model.id,
        name: model.name,
        state: model.state,
        "r:id": model.rId
      });
    }
    parseOpen(node) {
      if (node.name === "sheet") {
        this.model = {
          name: utils.xmlDecode(node.attributes.name),
          id: parseInt(node.attributes.sheetId, 10),
          state: node.attributes.state,
          rId: node.attributes["r:id"]
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  sheetXform = WorksheetXform;
  return sheetXform;
}
var workbookViewXform;
var hasRequiredWorkbookViewXform;
function requireWorkbookViewXform() {
  if (hasRequiredWorkbookViewXform) return workbookViewXform;
  hasRequiredWorkbookViewXform = 1;
  const BaseXform = requireBaseXform();
  class WorkbookViewXform extends BaseXform {
    render(xmlStream2, model) {
      const attributes = {
        xWindow: model.x || 0,
        yWindow: model.y || 0,
        windowWidth: model.width || 12e3,
        windowHeight: model.height || 24e3,
        firstSheet: model.firstSheet,
        activeTab: model.activeTab
      };
      if (model.visibility && model.visibility !== "visible") {
        attributes.visibility = model.visibility;
      }
      xmlStream2.leafNode("workbookView", attributes);
    }
    parseOpen(node) {
      if (node.name === "workbookView") {
        const model = this.model = {};
        const addS = function(name, value, dflt) {
          const s = value !== void 0 ? model[name] = value : dflt;
          if (s !== void 0) {
            model[name] = s;
          }
        };
        const addN = function(name, value, dflt) {
          const n = value !== void 0 ? model[name] = parseInt(value, 10) : dflt;
          if (n !== void 0) {
            model[name] = n;
          }
        };
        addN("x", node.attributes.xWindow, 0);
        addN("y", node.attributes.yWindow, 0);
        addN("width", node.attributes.windowWidth, 25e3);
        addN("height", node.attributes.windowHeight, 1e4);
        addS("visibility", node.attributes.visibility, "visible");
        addN("activeTab", node.attributes.activeTab, void 0);
        addN("firstSheet", node.attributes.firstSheet, void 0);
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  workbookViewXform = WorkbookViewXform;
  return workbookViewXform;
}
var workbookPropertiesXform;
var hasRequiredWorkbookPropertiesXform;
function requireWorkbookPropertiesXform() {
  if (hasRequiredWorkbookPropertiesXform) return workbookPropertiesXform;
  hasRequiredWorkbookPropertiesXform = 1;
  const BaseXform = requireBaseXform();
  class WorksheetPropertiesXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.leafNode("workbookPr", {
        date1904: model.date1904 ? 1 : void 0,
        defaultThemeVersion: 164011,
        filterPrivacy: 1
      });
    }
    parseOpen(node) {
      if (node.name === "workbookPr") {
        this.model = {
          date1904: node.attributes.date1904 === "1"
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  workbookPropertiesXform = WorksheetPropertiesXform;
  return workbookPropertiesXform;
}
var workbookCalcPropertiesXform;
var hasRequiredWorkbookCalcPropertiesXform;
function requireWorkbookCalcPropertiesXform() {
  if (hasRequiredWorkbookCalcPropertiesXform) return workbookCalcPropertiesXform;
  hasRequiredWorkbookCalcPropertiesXform = 1;
  const BaseXform = requireBaseXform();
  class WorkbookCalcPropertiesXform extends BaseXform {
    render(xmlStream2, model) {
      xmlStream2.leafNode("calcPr", {
        calcId: 171027,
        fullCalcOnLoad: model.fullCalcOnLoad ? 1 : void 0
      });
    }
    parseOpen(node) {
      if (node.name === "calcPr") {
        this.model = {};
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  workbookCalcPropertiesXform = WorkbookCalcPropertiesXform;
  return workbookCalcPropertiesXform;
}
var workbookXform;
var hasRequiredWorkbookXform;
function requireWorkbookXform() {
  if (hasRequiredWorkbookXform) return workbookXform;
  hasRequiredWorkbookXform = 1;
  const _ = requireUnderDash();
  const colCache = requireColCache();
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const StaticXform = requireStaticXform();
  const ListXform = requireListXform();
  const DefinedNameXform = requireDefinedNameXform();
  const SheetXform = requireSheetXform();
  const WorkbookViewXform = requireWorkbookViewXform();
  const WorkbookPropertiesXform = requireWorkbookPropertiesXform();
  const WorkbookCalcPropertiesXform = requireWorkbookCalcPropertiesXform();
  class WorkbookXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        fileVersion: WorkbookXform.STATIC_XFORMS.fileVersion,
        workbookPr: new WorkbookPropertiesXform(),
        bookViews: new ListXform({
          tag: "bookViews",
          count: false,
          childXform: new WorkbookViewXform()
        }),
        sheets: new ListXform({ tag: "sheets", count: false, childXform: new SheetXform() }),
        definedNames: new ListXform({
          tag: "definedNames",
          count: false,
          childXform: new DefinedNameXform()
        }),
        calcPr: new WorkbookCalcPropertiesXform()
      };
    }
    prepare(model) {
      model.sheets = model.worksheets;
      const printAreas = [];
      let index = 0;
      model.sheets.forEach((sheet) => {
        if (sheet.pageSetup && sheet.pageSetup.printArea) {
          sheet.pageSetup.printArea.split("&&").forEach((printArea) => {
            const printAreaComponents = printArea.split(":");
            const definedName = {
              name: "_xlnm.Print_Area",
              ranges: [`'${sheet.name}'!$${printAreaComponents[0]}:$${printAreaComponents[1]}`],
              localSheetId: index
            };
            printAreas.push(definedName);
          });
        }
        if (sheet.pageSetup && (sheet.pageSetup.printTitlesRow || sheet.pageSetup.printTitlesColumn)) {
          const ranges = [];
          if (sheet.pageSetup.printTitlesColumn) {
            const titlesColumns = sheet.pageSetup.printTitlesColumn.split(":");
            ranges.push(`'${sheet.name}'!$${titlesColumns[0]}:$${titlesColumns[1]}`);
          }
          if (sheet.pageSetup.printTitlesRow) {
            const titlesRows = sheet.pageSetup.printTitlesRow.split(":");
            ranges.push(`'${sheet.name}'!$${titlesRows[0]}:$${titlesRows[1]}`);
          }
          const definedName = {
            name: "_xlnm.Print_Titles",
            ranges,
            localSheetId: index
          };
          printAreas.push(definedName);
        }
        index++;
      });
      if (printAreas.length) {
        model.definedNames = model.definedNames.concat(printAreas);
      }
      (model.media || []).forEach((medium, i) => {
        medium.name = medium.type + (i + 1);
      });
    }
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("workbook", WorkbookXform.WORKBOOK_ATTRIBUTES);
      this.map.fileVersion.render(xmlStream2);
      this.map.workbookPr.render(xmlStream2, model.properties);
      this.map.bookViews.render(xmlStream2, model.views);
      this.map.sheets.render(xmlStream2, model.sheets);
      this.map.definedNames.render(xmlStream2, model.definedNames);
      this.map.calcPr.render(xmlStream2, model.calcProperties);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "workbook":
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          return true;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case "workbook":
          this.model = {
            sheets: this.map.sheets.model,
            properties: this.map.workbookPr.model || {},
            views: this.map.bookViews.model,
            calcProperties: {}
          };
          if (this.map.definedNames.model) {
            this.model.definedNames = this.map.definedNames.model;
          }
          return false;
        default:
          return true;
      }
    }
    reconcile(model) {
      const rels = (model.workbookRels || []).reduce((map, rel) => {
        map[rel.Id] = rel;
        return map;
      }, {});
      const worksheets = [];
      let worksheet2;
      let index = 0;
      (model.sheets || []).forEach((sheet) => {
        const rel = rels[sheet.rId];
        if (!rel) {
          return;
        }
        worksheet2 = model.worksheetHash[`xl/${rel.Target.replace(/^(\s|\/xl\/)+/, "")}`];
        if (worksheet2) {
          worksheet2.name = sheet.name;
          worksheet2.id = sheet.id;
          worksheet2.state = sheet.state;
          worksheets[index++] = worksheet2;
        }
      });
      const definedNames2 = [];
      _.each(model.definedNames, (definedName) => {
        if (definedName.name === "_xlnm.Print_Area") {
          worksheet2 = worksheets[definedName.localSheetId];
          if (worksheet2) {
            if (!worksheet2.pageSetup) {
              worksheet2.pageSetup = {};
            }
            const range2 = colCache.decodeEx(definedName.ranges[0]);
            worksheet2.pageSetup.printArea = worksheet2.pageSetup.printArea ? `${worksheet2.pageSetup.printArea}&&${range2.dimensions}` : range2.dimensions;
          }
        } else if (definedName.name === "_xlnm.Print_Titles") {
          worksheet2 = worksheets[definedName.localSheetId];
          if (worksheet2) {
            if (!worksheet2.pageSetup) {
              worksheet2.pageSetup = {};
            }
            const rangeString = definedName.ranges.join(",");
            const dollarRegex = /\$/g;
            const rowRangeRegex = /\$\d+:\$\d+/;
            const rowRangeMatches = rangeString.match(rowRangeRegex);
            if (rowRangeMatches && rowRangeMatches.length) {
              const range2 = rowRangeMatches[0];
              worksheet2.pageSetup.printTitlesRow = range2.replace(dollarRegex, "");
            }
            const columnRangeRegex = /\$[A-Z]+:\$[A-Z]+/;
            const columnRangeMatches = rangeString.match(columnRangeRegex);
            if (columnRangeMatches && columnRangeMatches.length) {
              const range2 = columnRangeMatches[0];
              worksheet2.pageSetup.printTitlesColumn = range2.replace(dollarRegex, "");
            }
          }
        } else {
          definedNames2.push(definedName);
        }
      });
      model.definedNames = definedNames2;
      model.media.forEach((media, i) => {
        media.index = i;
      });
    }
  }
  WorkbookXform.WORKBOOK_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
    "mc:Ignorable": "x15",
    "xmlns:x15": "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
  };
  WorkbookXform.STATIC_XFORMS = {
    fileVersion: new StaticXform({
      tag: "fileVersion",
      $: { appName: "xl", lastEdited: 5, lowestEdited: 5, rupBuild: 9303 }
    })
  };
  workbookXform = WorkbookXform;
  return workbookXform;
}
var relType;
var hasRequiredRelType;
function requireRelType() {
  if (hasRequiredRelType) return relType;
  hasRequiredRelType = 1;
  relType = {
    OfficeDocument: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    Worksheet: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    CalcChain: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/calcChain",
    SharedStrings: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
    Styles: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
    Theme: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
    Hyperlink: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
    Image: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
    CoreProperties: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
    ExtenderProperties: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
    Comments: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
    VmlDrawing: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
    Table: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table"
  };
  return relType;
}
var merges;
var hasRequiredMerges;
function requireMerges() {
  if (hasRequiredMerges) return merges;
  hasRequiredMerges = 1;
  const _ = requireUnderDash();
  const Range = requireRange();
  const colCache = requireColCache();
  const Enums = requireEnums();
  class Merges {
    constructor() {
      this.merges = {};
    }
    add(merge) {
      if (this.merges[merge.master]) {
        this.merges[merge.master].expandToAddress(merge.address);
      } else {
        const range2 = `${merge.master}:${merge.address}`;
        this.merges[merge.master] = new Range(range2);
      }
    }
    get mergeCells() {
      return _.map(this.merges, (merge) => merge.range);
    }
    reconcile(mergeCells, rows) {
      _.each(mergeCells, (merge) => {
        const dimensions = colCache.decode(merge);
        for (let i = dimensions.top; i <= dimensions.bottom; i++) {
          const row2 = rows[i - 1];
          for (let j = dimensions.left; j <= dimensions.right; j++) {
            const cell2 = row2.cells[j - 1];
            if (!cell2) {
              row2.cells[j] = {
                type: Enums.ValueType.Null,
                address: colCache.encodeAddress(i, j)
              };
            } else if (cell2.type === Enums.ValueType.Merge) {
              cell2.master = dimensions.tl;
            }
          }
        }
      });
    }
    getMasterAddress(address) {
      const range2 = this.hash[address];
      return range2 && range2.tl;
    }
  }
  merges = Merges;
  return merges;
}
var cellXform;
var hasRequiredCellXform;
function requireCellXform() {
  if (hasRequiredCellXform) return cellXform;
  hasRequiredCellXform = 1;
  const utils = requireUtils();
  const BaseXform = requireBaseXform();
  const Range = requireRange();
  const Enums = requireEnums();
  const RichTextXform = requireRichTextXform();
  function getValueType(v) {
    if (v === null || v === void 0) {
      return Enums.ValueType.Null;
    }
    if (v instanceof String || typeof v === "string") {
      return Enums.ValueType.String;
    }
    if (typeof v === "number") {
      return Enums.ValueType.Number;
    }
    if (typeof v === "boolean") {
      return Enums.ValueType.Boolean;
    }
    if (v instanceof Date) {
      return Enums.ValueType.Date;
    }
    if (v.text && v.hyperlink) {
      return Enums.ValueType.Hyperlink;
    }
    if (v.formula) {
      return Enums.ValueType.Formula;
    }
    if (v.error) {
      return Enums.ValueType.Error;
    }
    throw new Error("I could not understand type of value");
  }
  function getEffectiveCellType(cell2) {
    switch (cell2.type) {
      case Enums.ValueType.Formula:
        return getValueType(cell2.result);
      default:
        return cell2.type;
    }
  }
  class CellXform extends BaseXform {
    constructor() {
      super();
      this.richTextXForm = new RichTextXform();
    }
    get tag() {
      return "c";
    }
    prepare(model, options) {
      const styleId = options.styles.addStyleModel(model.style || {}, getEffectiveCellType(model));
      if (styleId) {
        model.styleId = styleId;
      }
      if (model.comment) {
        options.comments.push({ ...model.comment, ref: model.address });
      }
      switch (model.type) {
        case Enums.ValueType.String:
        case Enums.ValueType.RichText:
          if (options.sharedStrings) {
            model.ssId = options.sharedStrings.add(model.value);
          }
          break;
        case Enums.ValueType.Date:
          if (options.date1904) {
            model.date1904 = true;
          }
          break;
        case Enums.ValueType.Hyperlink:
          if (options.sharedStrings && model.text !== void 0 && model.text !== null) {
            model.ssId = options.sharedStrings.add(model.text);
          }
          options.hyperlinks.push({
            address: model.address,
            target: model.hyperlink,
            tooltip: model.tooltip
          });
          break;
        case Enums.ValueType.Merge:
          options.merges.add(model);
          break;
        case Enums.ValueType.Formula:
          if (options.date1904) {
            model.date1904 = true;
          }
          if (model.shareType === "shared") {
            model.si = options.siFormulae++;
          }
          if (model.formula) {
            options.formulae[model.address] = model;
          } else if (model.sharedFormula) {
            const master = options.formulae[model.sharedFormula];
            if (!master) {
              throw new Error(
                `Shared Formula master must exist above and or left of clone for cell ${model.address}`
              );
            }
            if (master.si === void 0) {
              master.shareType = "shared";
              master.si = options.siFormulae++;
              master.range = new Range(master.address, model.address);
            } else if (master.range) {
              master.range.expandToAddress(model.address);
            }
            model.si = master.si;
          }
          break;
      }
    }
    renderFormula(xmlStream2, model) {
      let attrs = null;
      switch (model.shareType) {
        case "shared":
          attrs = {
            t: "shared",
            ref: model.ref || model.range.range,
            si: model.si
          };
          break;
        case "array":
          attrs = {
            t: "array",
            ref: model.ref
          };
          break;
        default:
          if (model.si !== void 0) {
            attrs = {
              t: "shared",
              si: model.si
            };
          }
          break;
      }
      switch (getValueType(model.result)) {
        case Enums.ValueType.Null:
          xmlStream2.leafNode("f", attrs, model.formula);
          break;
        case Enums.ValueType.String:
          xmlStream2.addAttribute("t", "str");
          xmlStream2.leafNode("f", attrs, model.formula);
          xmlStream2.leafNode("v", null, model.result);
          break;
        case Enums.ValueType.Number:
          xmlStream2.leafNode("f", attrs, model.formula);
          xmlStream2.leafNode("v", null, model.result);
          break;
        case Enums.ValueType.Boolean:
          xmlStream2.addAttribute("t", "b");
          xmlStream2.leafNode("f", attrs, model.formula);
          xmlStream2.leafNode("v", null, model.result ? 1 : 0);
          break;
        case Enums.ValueType.Error:
          xmlStream2.addAttribute("t", "e");
          xmlStream2.leafNode("f", attrs, model.formula);
          xmlStream2.leafNode("v", null, model.result.error);
          break;
        case Enums.ValueType.Date:
          xmlStream2.leafNode("f", attrs, model.formula);
          xmlStream2.leafNode("v", null, utils.dateToExcel(model.result, model.date1904));
          break;
        // case Enums.ValueType.Hyperlink: // ??
        // case Enums.ValueType.Formula:
        default:
          throw new Error("I could not understand type of value");
      }
    }
    render(xmlStream2, model) {
      if (model.type === Enums.ValueType.Null && !model.styleId) {
        return;
      }
      xmlStream2.openNode("c");
      xmlStream2.addAttribute("r", model.address);
      if (model.styleId) {
        xmlStream2.addAttribute("s", model.styleId);
      }
      switch (model.type) {
        case Enums.ValueType.Null:
          break;
        case Enums.ValueType.Number:
          xmlStream2.leafNode("v", null, model.value);
          break;
        case Enums.ValueType.Boolean:
          xmlStream2.addAttribute("t", "b");
          xmlStream2.leafNode("v", null, model.value ? "1" : "0");
          break;
        case Enums.ValueType.Error:
          xmlStream2.addAttribute("t", "e");
          xmlStream2.leafNode("v", null, model.value.error);
          break;
        case Enums.ValueType.String:
        case Enums.ValueType.RichText:
          if (model.ssId !== void 0) {
            xmlStream2.addAttribute("t", "s");
            xmlStream2.leafNode("v", null, model.ssId);
          } else if (model.value && model.value.richText) {
            xmlStream2.addAttribute("t", "inlineStr");
            xmlStream2.openNode("is");
            model.value.richText.forEach((text) => {
              this.richTextXForm.render(xmlStream2, text);
            });
            xmlStream2.closeNode("is");
          } else {
            xmlStream2.addAttribute("t", "str");
            xmlStream2.leafNode("v", null, model.value);
          }
          break;
        case Enums.ValueType.Date:
          xmlStream2.leafNode("v", null, utils.dateToExcel(model.value, model.date1904));
          break;
        case Enums.ValueType.Hyperlink:
          if (model.ssId !== void 0) {
            xmlStream2.addAttribute("t", "s");
            xmlStream2.leafNode("v", null, model.ssId);
          } else {
            xmlStream2.addAttribute("t", "str");
            xmlStream2.leafNode("v", null, model.text);
          }
          break;
        case Enums.ValueType.Formula:
          this.renderFormula(xmlStream2, model);
          break;
        case Enums.ValueType.Merge:
          break;
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "c":
          this.model = {
            address: node.attributes.r
          };
          this.t = node.attributes.t;
          if (node.attributes.s) {
            this.model.styleId = parseInt(node.attributes.s, 10);
          }
          return true;
        case "f":
          this.currentNode = "f";
          this.model.si = node.attributes.si;
          this.model.shareType = node.attributes.t;
          this.model.ref = node.attributes.ref;
          return true;
        case "v":
          this.currentNode = "v";
          return true;
        case "t":
          this.currentNode = "t";
          return true;
        case "r":
          this.parser = this.richTextXForm;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
        return;
      }
      switch (this.currentNode) {
        case "f":
          this.model.formula = this.model.formula ? this.model.formula + text : text;
          break;
        case "v":
        case "t":
          if (this.model.value && this.model.value.richText) {
            this.model.value.richText.text = this.model.value.richText.text ? this.model.value.richText.text + text : text;
          } else {
            this.model.value = this.model.value ? this.model.value + text : text;
          }
          break;
      }
    }
    parseClose(name) {
      switch (name) {
        case "c": {
          const { model } = this;
          if (model.formula || model.shareType) {
            model.type = Enums.ValueType.Formula;
            if (model.value) {
              if (this.t === "str") {
                model.result = utils.xmlDecode(model.value);
              } else if (this.t === "b") {
                model.result = parseInt(model.value, 10) !== 0;
              } else if (this.t === "e") {
                model.result = { error: model.value };
              } else {
                model.result = parseFloat(model.value);
              }
              model.value = void 0;
            }
          } else if (model.value !== void 0) {
            switch (this.t) {
              case "s":
                model.type = Enums.ValueType.String;
                model.value = parseInt(model.value, 10);
                break;
              case "str":
                model.type = Enums.ValueType.String;
                model.value = utils.xmlDecode(model.value);
                break;
              case "inlineStr":
                model.type = Enums.ValueType.String;
                break;
              case "b":
                model.type = Enums.ValueType.Boolean;
                model.value = parseInt(model.value, 10) !== 0;
                break;
              case "e":
                model.type = Enums.ValueType.Error;
                model.value = { error: model.value };
                break;
              default:
                model.type = Enums.ValueType.Number;
                model.value = parseFloat(model.value);
                break;
            }
          } else if (model.styleId) {
            model.type = Enums.ValueType.Null;
          } else {
            model.type = Enums.ValueType.Merge;
          }
          return false;
        }
        case "f":
        case "v":
        case "is":
          this.currentNode = void 0;
          return true;
        case "t":
          if (this.parser) {
            this.parser.parseClose(name);
            return true;
          }
          this.currentNode = void 0;
          return true;
        case "r":
          this.model.value = this.model.value || {};
          this.model.value.richText = this.model.value.richText || [];
          this.model.value.richText.push(this.parser.model);
          this.parser = void 0;
          this.currentNode = void 0;
          return true;
        default:
          if (this.parser) {
            this.parser.parseClose(name);
            return true;
          }
          return false;
      }
    }
    reconcile(model, options) {
      const style = model.styleId && options.styles && options.styles.getStyleModel(model.styleId);
      if (style) {
        model.style = style;
      }
      if (model.styleId !== void 0) {
        model.styleId = void 0;
      }
      switch (model.type) {
        case Enums.ValueType.String:
          if (typeof model.value === "number") {
            if (options.sharedStrings) {
              model.value = options.sharedStrings.getString(model.value);
            }
          }
          if (model.value.richText) {
            model.type = Enums.ValueType.RichText;
          }
          break;
        case Enums.ValueType.Number:
          if (style && utils.isDateFmt(style.numFmt)) {
            model.type = Enums.ValueType.Date;
            model.value = utils.excelToDate(model.value, options.date1904);
          }
          break;
        case Enums.ValueType.Formula:
          if (model.result !== void 0 && style && utils.isDateFmt(style.numFmt)) {
            model.result = utils.excelToDate(model.result, options.date1904);
          }
          if (model.shareType === "shared") {
            if (model.ref) {
              options.formulae[model.si] = model.address;
            } else {
              model.sharedFormula = options.formulae[model.si];
              delete model.shareType;
            }
            delete model.si;
          }
          break;
      }
      const hyperlink = options.hyperlinkMap[model.address];
      if (hyperlink) {
        if (model.type === Enums.ValueType.Formula) {
          model.text = model.result;
          model.result = void 0;
        } else {
          model.text = model.value;
          model.value = void 0;
        }
        model.type = Enums.ValueType.Hyperlink;
        model.hyperlink = hyperlink;
      }
      const comment = options.commentsMap && options.commentsMap[model.address];
      if (comment) {
        model.comment = comment;
      }
    }
  }
  cellXform = CellXform;
  return cellXform;
}
var rowXform;
var hasRequiredRowXform;
function requireRowXform() {
  if (hasRequiredRowXform) return rowXform;
  hasRequiredRowXform = 1;
  const BaseXform = requireBaseXform();
  const utils = requireUtils();
  const CellXform = requireCellXform();
  class RowXform extends BaseXform {
    constructor(options) {
      super();
      this.maxItems = options && options.maxItems;
      this.map = {
        c: new CellXform()
      };
    }
    get tag() {
      return "row";
    }
    prepare(model, options) {
      const styleId = options.styles.addStyleModel(model.style);
      if (styleId) {
        model.styleId = styleId;
      }
      const cellXform2 = this.map.c;
      model.cells.forEach((cellModel) => {
        cellXform2.prepare(cellModel, options);
      });
    }
    render(xmlStream2, model, options) {
      xmlStream2.openNode("row");
      xmlStream2.addAttribute("r", model.number);
      if (model.height) {
        xmlStream2.addAttribute("ht", model.height);
        xmlStream2.addAttribute("customHeight", "1");
      }
      if (model.hidden) {
        xmlStream2.addAttribute("hidden", "1");
      }
      if (model.min > 0 && model.max > 0 && model.min <= model.max) {
        xmlStream2.addAttribute("spans", `${model.min}:${model.max}`);
      }
      if (model.styleId) {
        xmlStream2.addAttribute("s", model.styleId);
        xmlStream2.addAttribute("customFormat", "1");
      }
      xmlStream2.addAttribute("x14ac:dyDescent", "0.25");
      if (model.outlineLevel) {
        xmlStream2.addAttribute("outlineLevel", model.outlineLevel);
      }
      if (model.collapsed) {
        xmlStream2.addAttribute("collapsed", "1");
      }
      const cellXform2 = this.map.c;
      model.cells.forEach((cellModel) => {
        cellXform2.render(xmlStream2, cellModel, options);
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (node.name === "row") {
        this.numRowsSeen += 1;
        const spans = node.attributes.spans ? node.attributes.spans.split(":").map((span) => parseInt(span, 10)) : [void 0, void 0];
        const model = this.model = {
          number: parseInt(node.attributes.r, 10),
          min: spans[0],
          max: spans[1],
          cells: []
        };
        if (node.attributes.s) {
          model.styleId = parseInt(node.attributes.s, 10);
        }
        if (utils.parseBoolean(node.attributes.hidden)) {
          model.hidden = true;
        }
        if (utils.parseBoolean(node.attributes.bestFit)) {
          model.bestFit = true;
        }
        if (node.attributes.ht) {
          model.height = parseFloat(node.attributes.ht);
        }
        if (node.attributes.outlineLevel) {
          model.outlineLevel = parseInt(node.attributes.outlineLevel, 10);
        }
        if (utils.parseBoolean(node.attributes.collapsed)) {
          model.collapsed = true;
        }
        return true;
      }
      this.parser = this.map[node.name];
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      return false;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.cells.push(this.parser.model);
          if (this.maxItems && this.model.cells.length > this.maxItems) {
            throw new Error(`Max column count (${this.maxItems}) exceeded`);
          }
          this.parser = void 0;
        }
        return true;
      }
      return false;
    }
    reconcile(model, options) {
      model.style = model.styleId ? options.styles.getStyleModel(model.styleId) : {};
      if (model.styleId !== void 0) {
        model.styleId = void 0;
      }
      const cellXform2 = this.map.c;
      model.cells.forEach((cellModel) => {
        cellXform2.reconcile(cellModel, options);
      });
    }
  }
  rowXform = RowXform;
  return rowXform;
}
var colXform;
var hasRequiredColXform;
function requireColXform() {
  if (hasRequiredColXform) return colXform;
  hasRequiredColXform = 1;
  const utils = requireUtils();
  const BaseXform = requireBaseXform();
  class ColXform extends BaseXform {
    get tag() {
      return "col";
    }
    prepare(model, options) {
      const styleId = options.styles.addStyleModel(model.style || {});
      if (styleId) {
        model.styleId = styleId;
      }
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("col");
      xmlStream2.addAttribute("min", model.min);
      xmlStream2.addAttribute("max", model.max);
      if (model.width) {
        xmlStream2.addAttribute("width", model.width);
      }
      if (model.styleId) {
        xmlStream2.addAttribute("style", model.styleId);
      }
      if (model.hidden) {
        xmlStream2.addAttribute("hidden", "1");
      }
      if (model.bestFit) {
        xmlStream2.addAttribute("bestFit", "1");
      }
      if (model.outlineLevel) {
        xmlStream2.addAttribute("outlineLevel", model.outlineLevel);
      }
      if (model.collapsed) {
        xmlStream2.addAttribute("collapsed", "1");
      }
      xmlStream2.addAttribute("customWidth", "1");
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (node.name === "col") {
        const model = this.model = {
          min: parseInt(node.attributes.min || "0", 10),
          max: parseInt(node.attributes.max || "0", 10),
          width: node.attributes.width === void 0 ? void 0 : parseFloat(node.attributes.width || "0")
        };
        if (node.attributes.style) {
          model.styleId = parseInt(node.attributes.style, 10);
        }
        if (utils.parseBoolean(node.attributes.hidden)) {
          model.hidden = true;
        }
        if (utils.parseBoolean(node.attributes.bestFit)) {
          model.bestFit = true;
        }
        if (node.attributes.outlineLevel) {
          model.outlineLevel = parseInt(node.attributes.outlineLevel, 10);
        }
        if (utils.parseBoolean(node.attributes.collapsed)) {
          model.collapsed = true;
        }
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
    reconcile(model, options) {
      if (model.styleId) {
        model.style = options.styles.getStyleModel(model.styleId);
      }
    }
  }
  colXform = ColXform;
  return colXform;
}
var dimensionXform;
var hasRequiredDimensionXform;
function requireDimensionXform() {
  if (hasRequiredDimensionXform) return dimensionXform;
  hasRequiredDimensionXform = 1;
  const BaseXform = requireBaseXform();
  class DimensionXform extends BaseXform {
    get tag() {
      return "dimension";
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.leafNode("dimension", { ref: model });
      }
    }
    parseOpen(node) {
      if (node.name === "dimension") {
        this.model = node.attributes.ref;
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  dimensionXform = DimensionXform;
  return dimensionXform;
}
var hyperlinkXform;
var hasRequiredHyperlinkXform;
function requireHyperlinkXform() {
  if (hasRequiredHyperlinkXform) return hyperlinkXform;
  hasRequiredHyperlinkXform = 1;
  const BaseXform = requireBaseXform();
  class HyperlinkXform extends BaseXform {
    get tag() {
      return "hyperlink";
    }
    render(xmlStream2, model) {
      if (this.isInternalLink(model)) {
        xmlStream2.leafNode("hyperlink", {
          ref: model.address,
          "r:id": model.rId,
          tooltip: model.tooltip,
          location: model.target
        });
      } else {
        xmlStream2.leafNode("hyperlink", {
          ref: model.address,
          "r:id": model.rId,
          tooltip: model.tooltip
        });
      }
    }
    parseOpen(node) {
      if (node.name === "hyperlink") {
        this.model = {
          address: node.attributes.ref,
          rId: node.attributes["r:id"],
          tooltip: node.attributes.tooltip
        };
        if (node.attributes.location) {
          this.model.target = node.attributes.location;
        }
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
    isInternalLink(model) {
      return model.target && /^[^!]+![a-zA-Z]+[\d]+$/.test(model.target);
    }
  }
  hyperlinkXform = HyperlinkXform;
  return hyperlinkXform;
}
var mergeCellXform;
var hasRequiredMergeCellXform;
function requireMergeCellXform() {
  if (hasRequiredMergeCellXform) return mergeCellXform;
  hasRequiredMergeCellXform = 1;
  const BaseXform = requireBaseXform();
  class MergeCellXform extends BaseXform {
    get tag() {
      return "mergeCell";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode("mergeCell", { ref: model });
    }
    parseOpen(node) {
      if (node.name === "mergeCell") {
        this.model = node.attributes.ref;
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  mergeCellXform = MergeCellXform;
  return mergeCellXform;
}
var dataValidationsXform;
var hasRequiredDataValidationsXform;
function requireDataValidationsXform() {
  if (hasRequiredDataValidationsXform) return dataValidationsXform;
  hasRequiredDataValidationsXform = 1;
  const _ = requireUnderDash();
  const utils = requireUtils();
  const colCache = requireColCache();
  const BaseXform = requireBaseXform();
  const Range = requireRange();
  function assign(definedName, attributes, name, defaultValue) {
    const value = attributes[name];
    if (value !== void 0) {
      definedName[name] = value;
    } else if (defaultValue !== void 0) {
      definedName[name] = defaultValue;
    }
  }
  function assignBool(definedName, attributes, name, defaultValue) {
    const value = attributes[name];
    if (value !== void 0) {
      definedName[name] = utils.parseBoolean(value);
    }
  }
  function optimiseDataValidations(model) {
    const dvList = _.map(model, (dataValidation, address) => ({
      address,
      dataValidation,
      marked: false
    })).sort((a, b) => _.strcmp(a.address, b.address));
    const dvMap = _.keyBy(dvList, "address");
    const matchCol = (addr, height, col) => {
      for (let i = 0; i < height; i++) {
        const otherAddress = colCache.encodeAddress(addr.row + i, col);
        if (!model[otherAddress] || !_.isEqual(model[addr.address], model[otherAddress])) {
          return false;
        }
      }
      return true;
    };
    return dvList.map((dv) => {
      if (!dv.marked) {
        const addr = colCache.decodeEx(dv.address);
        if (addr.dimensions) {
          dvMap[addr.dimensions].marked = true;
          return {
            ...dv.dataValidation,
            sqref: dv.address
          };
        }
        let height = 1;
        let otherAddress = colCache.encodeAddress(addr.row + height, addr.col);
        while (model[otherAddress] && _.isEqual(dv.dataValidation, model[otherAddress])) {
          height++;
          otherAddress = colCache.encodeAddress(addr.row + height, addr.col);
        }
        let width = 1;
        while (matchCol(addr, height, addr.col + width)) {
          width++;
        }
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            otherAddress = colCache.encodeAddress(addr.row + i, addr.col + j);
            dvMap[otherAddress].marked = true;
          }
        }
        if (height > 1 || width > 1) {
          const bottom = addr.row + (height - 1);
          const right = addr.col + (width - 1);
          return {
            ...dv.dataValidation,
            sqref: `${dv.address}:${colCache.encodeAddress(bottom, right)}`
          };
        }
        return {
          ...dv.dataValidation,
          sqref: dv.address
        };
      }
      return null;
    }).filter(Boolean);
  }
  class DataValidationsXform extends BaseXform {
    get tag() {
      return "dataValidations";
    }
    render(xmlStream2, model) {
      const optimizedModel = optimiseDataValidations(model);
      if (optimizedModel.length) {
        xmlStream2.openNode("dataValidations", { count: optimizedModel.length });
        optimizedModel.forEach((value) => {
          xmlStream2.openNode("dataValidation");
          if (value.type !== "any") {
            xmlStream2.addAttribute("type", value.type);
            if (value.operator && value.type !== "list" && value.operator !== "between") {
              xmlStream2.addAttribute("operator", value.operator);
            }
            if (value.allowBlank) {
              xmlStream2.addAttribute("allowBlank", "1");
            }
          }
          if (value.showInputMessage) {
            xmlStream2.addAttribute("showInputMessage", "1");
          }
          if (value.promptTitle) {
            xmlStream2.addAttribute("promptTitle", value.promptTitle);
          }
          if (value.prompt) {
            xmlStream2.addAttribute("prompt", value.prompt);
          }
          if (value.showErrorMessage) {
            xmlStream2.addAttribute("showErrorMessage", "1");
          }
          if (value.errorStyle) {
            xmlStream2.addAttribute("errorStyle", value.errorStyle);
          }
          if (value.errorTitle) {
            xmlStream2.addAttribute("errorTitle", value.errorTitle);
          }
          if (value.error) {
            xmlStream2.addAttribute("error", value.error);
          }
          xmlStream2.addAttribute("sqref", value.sqref);
          (value.formulae || []).forEach((formula, index) => {
            xmlStream2.openNode(`formula${index + 1}`);
            if (value.type === "date") {
              xmlStream2.writeText(utils.dateToExcel(new Date(formula)));
            } else {
              xmlStream2.writeText(formula);
            }
            xmlStream2.closeNode();
          });
          xmlStream2.closeNode();
        });
        xmlStream2.closeNode();
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case "dataValidations":
          this.model = {};
          return true;
        case "dataValidation": {
          this._address = node.attributes.sqref;
          const dataValidation = { type: node.attributes.type || "any", formulae: [] };
          if (node.attributes.type) {
            assignBool(dataValidation, node.attributes, "allowBlank");
          }
          assignBool(dataValidation, node.attributes, "showInputMessage");
          assignBool(dataValidation, node.attributes, "showErrorMessage");
          switch (dataValidation.type) {
            case "any":
            case "list":
            case "custom":
              break;
            default:
              assign(dataValidation, node.attributes, "operator", "between");
              break;
          }
          assign(dataValidation, node.attributes, "promptTitle");
          assign(dataValidation, node.attributes, "prompt");
          assign(dataValidation, node.attributes, "errorStyle");
          assign(dataValidation, node.attributes, "errorTitle");
          assign(dataValidation, node.attributes, "error");
          this._dataValidation = dataValidation;
          return true;
        }
        case "formula1":
        case "formula2":
          this._formula = [];
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this._formula) {
        this._formula.push(text);
      }
    }
    parseClose(name) {
      switch (name) {
        case "dataValidations":
          return false;
        case "dataValidation": {
          if (!this._dataValidation.formulae || !this._dataValidation.formulae.length) {
            delete this._dataValidation.formulae;
            delete this._dataValidation.operator;
          }
          const list = this._address.split(/\s+/g) || [];
          list.forEach((addr) => {
            if (addr.includes(":")) {
              const range2 = new Range(addr);
              range2.forEachAddress((address) => {
                this.model[address] = this._dataValidation;
              });
            } else {
              this.model[addr] = this._dataValidation;
            }
          });
          return true;
        }
        case "formula1":
        case "formula2": {
          let formula = this._formula.join("");
          switch (this._dataValidation.type) {
            case "whole":
            case "textLength":
              formula = parseInt(formula, 10);
              break;
            case "decimal":
              formula = parseFloat(formula);
              break;
            case "date":
              formula = utils.excelToDate(parseFloat(formula));
              break;
          }
          this._dataValidation.formulae.push(formula);
          this._formula = void 0;
          return true;
        }
        default:
          return true;
      }
    }
  }
  dataValidationsXform = DataValidationsXform;
  return dataValidationsXform;
}
var pageSetupPropertiesXform;
var hasRequiredPageSetupPropertiesXform;
function requirePageSetupPropertiesXform() {
  if (hasRequiredPageSetupPropertiesXform) return pageSetupPropertiesXform;
  hasRequiredPageSetupPropertiesXform = 1;
  const BaseXform = requireBaseXform();
  class PageSetupPropertiesXform extends BaseXform {
    get tag() {
      return "pageSetUpPr";
    }
    render(xmlStream2, model) {
      if (model && model.fitToPage) {
        xmlStream2.leafNode(this.tag, {
          fitToPage: model.fitToPage ? "1" : void 0
        });
        return true;
      }
      return false;
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        this.model = {
          fitToPage: node.attributes.fitToPage === "1"
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  pageSetupPropertiesXform = PageSetupPropertiesXform;
  return pageSetupPropertiesXform;
}
var outlinePropertiesXform;
var hasRequiredOutlinePropertiesXform;
function requireOutlinePropertiesXform() {
  if (hasRequiredOutlinePropertiesXform) return outlinePropertiesXform;
  hasRequiredOutlinePropertiesXform = 1;
  const BaseXform = requireBaseXform();
  const isDefined = (attr) => typeof attr !== "undefined";
  class OutlinePropertiesXform extends BaseXform {
    get tag() {
      return "outlinePr";
    }
    render(xmlStream2, model) {
      if (model && (isDefined(model.summaryBelow) || isDefined(model.summaryRight))) {
        xmlStream2.leafNode(this.tag, {
          summaryBelow: isDefined(model.summaryBelow) ? Number(model.summaryBelow) : void 0,
          summaryRight: isDefined(model.summaryRight) ? Number(model.summaryRight) : void 0
        });
        return true;
      }
      return false;
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        this.model = {
          summaryBelow: isDefined(node.attributes.summaryBelow) ? Boolean(Number(node.attributes.summaryBelow)) : void 0,
          summaryRight: isDefined(node.attributes.summaryRight) ? Boolean(Number(node.attributes.summaryRight)) : void 0
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  outlinePropertiesXform = OutlinePropertiesXform;
  return outlinePropertiesXform;
}
var sheetPropertiesXform;
var hasRequiredSheetPropertiesXform;
function requireSheetPropertiesXform() {
  if (hasRequiredSheetPropertiesXform) return sheetPropertiesXform;
  hasRequiredSheetPropertiesXform = 1;
  const BaseXform = requireBaseXform();
  const ColorXform = requireColorXform();
  const PageSetupPropertiesXform = requirePageSetupPropertiesXform();
  const OutlinePropertiesXform = requireOutlinePropertiesXform();
  class SheetPropertiesXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        tabColor: new ColorXform("tabColor"),
        pageSetUpPr: new PageSetupPropertiesXform(),
        outlinePr: new OutlinePropertiesXform()
      };
    }
    get tag() {
      return "sheetPr";
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.addRollback();
        xmlStream2.openNode("sheetPr");
        let inner = false;
        inner = this.map.tabColor.render(xmlStream2, model.tabColor) || inner;
        inner = this.map.pageSetUpPr.render(xmlStream2, model.pageSetup) || inner;
        inner = this.map.outlinePr.render(xmlStream2, model.outlineProperties) || inner;
        if (inner) {
          xmlStream2.closeNode();
          xmlStream2.commit();
        } else {
          xmlStream2.rollback();
        }
      }
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (node.name === this.tag) {
        this.reset();
        return true;
      }
      if (this.map[node.name]) {
        this.parser = this.map[node.name];
        this.parser.parseOpen(node);
        return true;
      }
      return false;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
        return true;
      }
      return false;
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      if (this.map.tabColor.model || this.map.pageSetUpPr.model || this.map.outlinePr.model) {
        this.model = {};
        if (this.map.tabColor.model) {
          this.model.tabColor = this.map.tabColor.model;
        }
        if (this.map.pageSetUpPr.model) {
          this.model.pageSetup = this.map.pageSetUpPr.model;
        }
        if (this.map.outlinePr.model) {
          this.model.outlineProperties = this.map.outlinePr.model;
        }
      } else {
        this.model = null;
      }
      return false;
    }
  }
  sheetPropertiesXform = SheetPropertiesXform;
  return sheetPropertiesXform;
}
var sheetFormatPropertiesXform;
var hasRequiredSheetFormatPropertiesXform;
function requireSheetFormatPropertiesXform() {
  if (hasRequiredSheetFormatPropertiesXform) return sheetFormatPropertiesXform;
  hasRequiredSheetFormatPropertiesXform = 1;
  const _ = requireUnderDash();
  const BaseXform = requireBaseXform();
  class SheetFormatPropertiesXform extends BaseXform {
    get tag() {
      return "sheetFormatPr";
    }
    render(xmlStream2, model) {
      if (model) {
        const attributes = {
          defaultRowHeight: model.defaultRowHeight,
          outlineLevelRow: model.outlineLevelRow,
          outlineLevelCol: model.outlineLevelCol,
          "x14ac:dyDescent": model.dyDescent
        };
        if (model.defaultColWidth) {
          attributes.defaultColWidth = model.defaultColWidth;
        }
        if (!model.defaultRowHeight || model.defaultRowHeight !== 15) {
          attributes.customHeight = "1";
        }
        if (_.some(attributes, (value) => value !== void 0)) {
          xmlStream2.leafNode("sheetFormatPr", attributes);
        }
      }
    }
    parseOpen(node) {
      if (node.name === "sheetFormatPr") {
        this.model = {
          defaultRowHeight: parseFloat(node.attributes.defaultRowHeight || "0"),
          dyDescent: parseFloat(node.attributes["x14ac:dyDescent"] || "0"),
          outlineLevelRow: parseInt(node.attributes.outlineLevelRow || "0", 10),
          outlineLevelCol: parseInt(node.attributes.outlineLevelCol || "0", 10)
        };
        if (node.attributes.defaultColWidth) {
          this.model.defaultColWidth = parseFloat(node.attributes.defaultColWidth);
        }
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  sheetFormatPropertiesXform = SheetFormatPropertiesXform;
  return sheetFormatPropertiesXform;
}
var sheetViewXform;
var hasRequiredSheetViewXform;
function requireSheetViewXform() {
  if (hasRequiredSheetViewXform) return sheetViewXform;
  hasRequiredSheetViewXform = 1;
  const colCache = requireColCache();
  const BaseXform = requireBaseXform();
  const VIEW_STATES = {
    frozen: "frozen",
    frozenSplit: "frozen",
    split: "split"
  };
  class SheetViewXform extends BaseXform {
    get tag() {
      return "sheetView";
    }
    prepare(model) {
      switch (model.state) {
        case "frozen":
        case "split":
          break;
        default:
          model.state = "normal";
          break;
      }
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("sheetView", {
        workbookViewId: model.workbookViewId || 0
      });
      const add = function(name, value, included) {
        if (included) {
          xmlStream2.addAttribute(name, value);
        }
      };
      add("rightToLeft", "1", model.rightToLeft === true);
      add("tabSelected", "1", model.tabSelected);
      add("showRuler", "0", model.showRuler === false);
      add("showRowColHeaders", "0", model.showRowColHeaders === false);
      add("showGridLines", "0", model.showGridLines === false);
      add("zoomScale", model.zoomScale, model.zoomScale);
      add("zoomScaleNormal", model.zoomScaleNormal, model.zoomScaleNormal);
      add("view", model.style, model.style);
      let topLeftCell;
      let xSplit;
      let ySplit;
      let activePane;
      switch (model.state) {
        case "frozen":
          xSplit = model.xSplit || 0;
          ySplit = model.ySplit || 0;
          topLeftCell = model.topLeftCell || colCache.getAddress(ySplit + 1, xSplit + 1).address;
          activePane = model.xSplit && model.ySplit && "bottomRight" || model.xSplit && "topRight" || "bottomLeft";
          xmlStream2.leafNode("pane", {
            xSplit: model.xSplit || void 0,
            ySplit: model.ySplit || void 0,
            topLeftCell,
            activePane,
            state: "frozen"
          });
          xmlStream2.leafNode("selection", {
            pane: activePane,
            activeCell: model.activeCell,
            sqref: model.activeCell
          });
          break;
        case "split":
          if (model.activePane === "topLeft") {
            model.activePane = void 0;
          }
          xmlStream2.leafNode("pane", {
            xSplit: model.xSplit || void 0,
            ySplit: model.ySplit || void 0,
            topLeftCell: model.topLeftCell,
            activePane: model.activePane
          });
          xmlStream2.leafNode("selection", {
            pane: model.activePane,
            activeCell: model.activeCell,
            sqref: model.activeCell
          });
          break;
        case "normal":
          if (model.activeCell) {
            xmlStream2.leafNode("selection", {
              activeCell: model.activeCell,
              sqref: model.activeCell
            });
          }
          break;
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      switch (node.name) {
        case "sheetView":
          this.sheetView = {
            workbookViewId: parseInt(node.attributes.workbookViewId, 10),
            rightToLeft: node.attributes.rightToLeft === "1",
            tabSelected: node.attributes.tabSelected === "1",
            showRuler: !(node.attributes.showRuler === "0"),
            showRowColHeaders: !(node.attributes.showRowColHeaders === "0"),
            showGridLines: !(node.attributes.showGridLines === "0"),
            zoomScale: parseInt(node.attributes.zoomScale || "100", 10),
            zoomScaleNormal: parseInt(node.attributes.zoomScaleNormal || "100", 10),
            style: node.attributes.view
          };
          this.pane = void 0;
          this.selections = {};
          return true;
        case "pane":
          this.pane = {
            xSplit: parseInt(node.attributes.xSplit || "0", 10),
            ySplit: parseInt(node.attributes.ySplit || "0", 10),
            topLeftCell: node.attributes.topLeftCell,
            activePane: node.attributes.activePane || "topLeft",
            state: node.attributes.state
          };
          return true;
        case "selection": {
          const name = node.attributes.pane || "topLeft";
          this.selections[name] = {
            pane: name,
            activeCell: node.attributes.activeCell
          };
          return true;
        }
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose(name) {
      let model;
      let selection;
      switch (name) {
        case "sheetView":
          if (this.sheetView && this.pane) {
            model = this.model = {
              workbookViewId: this.sheetView.workbookViewId,
              rightToLeft: this.sheetView.rightToLeft,
              state: VIEW_STATES[this.pane.state] || "split",
              // split is default
              xSplit: this.pane.xSplit,
              ySplit: this.pane.ySplit,
              topLeftCell: this.pane.topLeftCell,
              showRuler: this.sheetView.showRuler,
              showRowColHeaders: this.sheetView.showRowColHeaders,
              showGridLines: this.sheetView.showGridLines,
              zoomScale: this.sheetView.zoomScale,
              zoomScaleNormal: this.sheetView.zoomScaleNormal
            };
            if (this.model.state === "split") {
              model.activePane = this.pane.activePane;
            }
            selection = this.selections[this.pane.activePane];
            if (selection && selection.activeCell) {
              model.activeCell = selection.activeCell;
            }
            if (this.sheetView.style) {
              model.style = this.sheetView.style;
            }
          } else {
            model = this.model = {
              workbookViewId: this.sheetView.workbookViewId,
              rightToLeft: this.sheetView.rightToLeft,
              state: "normal",
              showRuler: this.sheetView.showRuler,
              showRowColHeaders: this.sheetView.showRowColHeaders,
              showGridLines: this.sheetView.showGridLines,
              zoomScale: this.sheetView.zoomScale,
              zoomScaleNormal: this.sheetView.zoomScaleNormal
            };
            selection = this.selections.topLeft;
            if (selection && selection.activeCell) {
              model.activeCell = selection.activeCell;
            }
            if (this.sheetView.style) {
              model.style = this.sheetView.style;
            }
          }
          return false;
        default:
          return true;
      }
    }
    reconcile() {
    }
  }
  sheetViewXform = SheetViewXform;
  return sheetViewXform;
}
var sheetProtectionXform;
var hasRequiredSheetProtectionXform;
function requireSheetProtectionXform() {
  if (hasRequiredSheetProtectionXform) return sheetProtectionXform;
  hasRequiredSheetProtectionXform = 1;
  const _ = requireUnderDash();
  const BaseXform = requireBaseXform();
  function booleanToXml(model, value) {
    return model ? value : void 0;
  }
  function xmlToBoolean(value, equals) {
    return value === equals ? true : void 0;
  }
  class SheetProtectionXform extends BaseXform {
    get tag() {
      return "sheetProtection";
    }
    render(xmlStream2, model) {
      if (model) {
        const attributes = {
          sheet: booleanToXml(model.sheet, "1"),
          selectLockedCells: model.selectLockedCells === false ? "1" : void 0,
          selectUnlockedCells: model.selectUnlockedCells === false ? "1" : void 0,
          formatCells: booleanToXml(model.formatCells, "0"),
          formatColumns: booleanToXml(model.formatColumns, "0"),
          formatRows: booleanToXml(model.formatRows, "0"),
          insertColumns: booleanToXml(model.insertColumns, "0"),
          insertRows: booleanToXml(model.insertRows, "0"),
          insertHyperlinks: booleanToXml(model.insertHyperlinks, "0"),
          deleteColumns: booleanToXml(model.deleteColumns, "0"),
          deleteRows: booleanToXml(model.deleteRows, "0"),
          sort: booleanToXml(model.sort, "0"),
          autoFilter: booleanToXml(model.autoFilter, "0"),
          pivotTables: booleanToXml(model.pivotTables, "0")
        };
        if (model.sheet) {
          attributes.algorithmName = model.algorithmName;
          attributes.hashValue = model.hashValue;
          attributes.saltValue = model.saltValue;
          attributes.spinCount = model.spinCount;
          attributes.objects = booleanToXml(model.objects === false, "1");
          attributes.scenarios = booleanToXml(model.scenarios === false, "1");
        }
        if (_.some(attributes, (value) => value !== void 0)) {
          xmlStream2.leafNode(this.tag, attributes);
        }
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            sheet: xmlToBoolean(node.attributes.sheet, "1"),
            objects: node.attributes.objects === "1" ? false : void 0,
            scenarios: node.attributes.scenarios === "1" ? false : void 0,
            selectLockedCells: node.attributes.selectLockedCells === "1" ? false : void 0,
            selectUnlockedCells: node.attributes.selectUnlockedCells === "1" ? false : void 0,
            formatCells: xmlToBoolean(node.attributes.formatCells, "0"),
            formatColumns: xmlToBoolean(node.attributes.formatColumns, "0"),
            formatRows: xmlToBoolean(node.attributes.formatRows, "0"),
            insertColumns: xmlToBoolean(node.attributes.insertColumns, "0"),
            insertRows: xmlToBoolean(node.attributes.insertRows, "0"),
            insertHyperlinks: xmlToBoolean(node.attributes.insertHyperlinks, "0"),
            deleteColumns: xmlToBoolean(node.attributes.deleteColumns, "0"),
            deleteRows: xmlToBoolean(node.attributes.deleteRows, "0"),
            sort: xmlToBoolean(node.attributes.sort, "0"),
            autoFilter: xmlToBoolean(node.attributes.autoFilter, "0"),
            pivotTables: xmlToBoolean(node.attributes.pivotTables, "0")
          };
          if (node.attributes.algorithmName) {
            this.model.algorithmName = node.attributes.algorithmName;
            this.model.hashValue = node.attributes.hashValue;
            this.model.saltValue = node.attributes.saltValue;
            this.model.spinCount = parseInt(node.attributes.spinCount, 10);
          }
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  sheetProtectionXform = SheetProtectionXform;
  return sheetProtectionXform;
}
var pageMarginsXform;
var hasRequiredPageMarginsXform;
function requirePageMarginsXform() {
  if (hasRequiredPageMarginsXform) return pageMarginsXform;
  hasRequiredPageMarginsXform = 1;
  const _ = requireUnderDash();
  const BaseXform = requireBaseXform();
  class PageMarginsXform extends BaseXform {
    get tag() {
      return "pageMargins";
    }
    render(xmlStream2, model) {
      if (model) {
        const attributes = {
          left: model.left,
          right: model.right,
          top: model.top,
          bottom: model.bottom,
          header: model.header,
          footer: model.footer
        };
        if (_.some(attributes, (value) => value !== void 0)) {
          xmlStream2.leafNode(this.tag, attributes);
        }
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            left: parseFloat(node.attributes.left || 0.7),
            right: parseFloat(node.attributes.right || 0.7),
            top: parseFloat(node.attributes.top || 0.75),
            bottom: parseFloat(node.attributes.bottom || 0.75),
            header: parseFloat(node.attributes.header || 0.3),
            footer: parseFloat(node.attributes.footer || 0.3)
          };
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  pageMarginsXform = PageMarginsXform;
  return pageMarginsXform;
}
var pageSetupXform;
var hasRequiredPageSetupXform;
function requirePageSetupXform() {
  if (hasRequiredPageSetupXform) return pageSetupXform;
  hasRequiredPageSetupXform = 1;
  const _ = requireUnderDash();
  const BaseXform = requireBaseXform();
  function booleanToXml(model) {
    return model ? "1" : void 0;
  }
  function pageOrderToXml(model) {
    switch (model) {
      case "overThenDown":
        return model;
      default:
        return void 0;
    }
  }
  function cellCommentsToXml(model) {
    switch (model) {
      case "atEnd":
      case "asDisplyed":
        return model;
      default:
        return void 0;
    }
  }
  function errorsToXml(model) {
    switch (model) {
      case "dash":
      case "blank":
      case "NA":
        return model;
      default:
        return void 0;
    }
  }
  function pageSizeToModel(value) {
    return value !== void 0 ? parseInt(value, 10) : void 0;
  }
  class PageSetupXform extends BaseXform {
    get tag() {
      return "pageSetup";
    }
    render(xmlStream2, model) {
      if (model) {
        const attributes = {
          paperSize: model.paperSize,
          orientation: model.orientation,
          horizontalDpi: model.horizontalDpi,
          verticalDpi: model.verticalDpi,
          pageOrder: pageOrderToXml(model.pageOrder),
          blackAndWhite: booleanToXml(model.blackAndWhite),
          draft: booleanToXml(model.draft),
          cellComments: cellCommentsToXml(model.cellComments),
          errors: errorsToXml(model.errors),
          scale: model.scale,
          fitToWidth: model.fitToWidth,
          fitToHeight: model.fitToHeight,
          firstPageNumber: model.firstPageNumber,
          useFirstPageNumber: booleanToXml(model.firstPageNumber),
          usePrinterDefaults: booleanToXml(model.usePrinterDefaults),
          copies: model.copies
        };
        if (_.some(attributes, (value) => value !== void 0)) {
          xmlStream2.leafNode(this.tag, attributes);
        }
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            paperSize: pageSizeToModel(node.attributes.paperSize),
            orientation: node.attributes.orientation || "portrait",
            horizontalDpi: parseInt(node.attributes.horizontalDpi || "4294967295", 10),
            verticalDpi: parseInt(node.attributes.verticalDpi || "4294967295", 10),
            pageOrder: node.attributes.pageOrder || "downThenOver",
            blackAndWhite: node.attributes.blackAndWhite === "1",
            draft: node.attributes.draft === "1",
            cellComments: node.attributes.cellComments || "None",
            errors: node.attributes.errors || "displayed",
            scale: parseInt(node.attributes.scale || "100", 10),
            fitToWidth: parseInt(node.attributes.fitToWidth || "1", 10),
            fitToHeight: parseInt(node.attributes.fitToHeight || "1", 10),
            firstPageNumber: parseInt(node.attributes.firstPageNumber || "1", 10),
            useFirstPageNumber: node.attributes.useFirstPageNumber === "1",
            usePrinterDefaults: node.attributes.usePrinterDefaults === "1",
            copies: parseInt(node.attributes.copies || "1", 10)
          };
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  pageSetupXform = PageSetupXform;
  return pageSetupXform;
}
var printOptionsXform;
var hasRequiredPrintOptionsXform;
function requirePrintOptionsXform() {
  if (hasRequiredPrintOptionsXform) return printOptionsXform;
  hasRequiredPrintOptionsXform = 1;
  const _ = requireUnderDash();
  const BaseXform = requireBaseXform();
  function booleanToXml(model) {
    return model ? "1" : void 0;
  }
  class PrintOptionsXform extends BaseXform {
    get tag() {
      return "printOptions";
    }
    render(xmlStream2, model) {
      if (model) {
        const attributes = {
          headings: booleanToXml(model.showRowColHeaders),
          gridLines: booleanToXml(model.showGridLines),
          horizontalCentered: booleanToXml(model.horizontalCentered),
          verticalCentered: booleanToXml(model.verticalCentered)
        };
        if (_.some(attributes, (value) => value !== void 0)) {
          xmlStream2.leafNode(this.tag, attributes);
        }
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            showRowColHeaders: node.attributes.headings === "1",
            showGridLines: node.attributes.gridLines === "1",
            horizontalCentered: node.attributes.horizontalCentered === "1",
            verticalCentered: node.attributes.verticalCentered === "1"
          };
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  printOptionsXform = PrintOptionsXform;
  return printOptionsXform;
}
var autoFilterXform$1;
var hasRequiredAutoFilterXform$1;
function requireAutoFilterXform$1() {
  if (hasRequiredAutoFilterXform$1) return autoFilterXform$1;
  hasRequiredAutoFilterXform$1 = 1;
  const colCache = requireColCache();
  const BaseXform = requireBaseXform();
  class AutoFilterXform extends BaseXform {
    get tag() {
      return "autoFilter";
    }
    render(xmlStream2, model) {
      if (model) {
        if (typeof model === "string") {
          xmlStream2.leafNode("autoFilter", { ref: model });
        } else {
          const getAddress = function(addr) {
            if (typeof addr === "string") {
              return addr;
            }
            return colCache.getAddress(addr.row, addr.column).address;
          };
          const firstAddress = getAddress(model.from);
          const secondAddress = getAddress(model.to);
          if (firstAddress && secondAddress) {
            xmlStream2.leafNode("autoFilter", { ref: `${firstAddress}:${secondAddress}` });
          }
        }
      }
    }
    parseOpen(node) {
      if (node.name === "autoFilter") {
        this.model = node.attributes.ref;
      }
    }
  }
  autoFilterXform$1 = AutoFilterXform;
  return autoFilterXform$1;
}
var pictureXform;
var hasRequiredPictureXform;
function requirePictureXform() {
  if (hasRequiredPictureXform) return pictureXform;
  hasRequiredPictureXform = 1;
  const BaseXform = requireBaseXform();
  class PictureXform extends BaseXform {
    get tag() {
      return "picture";
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.leafNode(this.tag, { "r:id": model.rId });
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            rId: node.attributes["r:id"]
          };
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  pictureXform = PictureXform;
  return pictureXform;
}
var drawingXform$1;
var hasRequiredDrawingXform$1;
function requireDrawingXform$1() {
  if (hasRequiredDrawingXform$1) return drawingXform$1;
  hasRequiredDrawingXform$1 = 1;
  const BaseXform = requireBaseXform();
  class DrawingXform extends BaseXform {
    get tag() {
      return "drawing";
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.leafNode(this.tag, { "r:id": model.rId });
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            rId: node.attributes["r:id"]
          };
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  drawingXform$1 = DrawingXform;
  return drawingXform$1;
}
var tablePartXform;
var hasRequiredTablePartXform;
function requireTablePartXform() {
  if (hasRequiredTablePartXform) return tablePartXform;
  hasRequiredTablePartXform = 1;
  const BaseXform = requireBaseXform();
  class TablePartXform extends BaseXform {
    get tag() {
      return "tablePart";
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.leafNode(this.tag, { "r:id": model.rId });
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            rId: node.attributes["r:id"]
          };
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  tablePartXform = TablePartXform;
  return tablePartXform;
}
var pageBreaksXform;
var hasRequiredPageBreaksXform;
function requirePageBreaksXform() {
  if (hasRequiredPageBreaksXform) return pageBreaksXform;
  hasRequiredPageBreaksXform = 1;
  const BaseXform = requireBaseXform();
  class PageBreaksXform extends BaseXform {
    get tag() {
      return "brk";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode("brk", model);
    }
    parseOpen(node) {
      if (node.name === "brk") {
        this.model = node.attributes.ref;
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  pageBreaksXform = PageBreaksXform;
  return pageBreaksXform;
}
var rowBreaksXform;
var hasRequiredRowBreaksXform;
function requireRowBreaksXform() {
  if (hasRequiredRowBreaksXform) return rowBreaksXform;
  hasRequiredRowBreaksXform = 1;
  const PageBreaksXform = requirePageBreaksXform();
  const ListXform = requireListXform();
  class RowBreaksXform extends ListXform {
    constructor() {
      const options = {
        tag: "rowBreaks",
        count: true,
        childXform: new PageBreaksXform()
      };
      super(options);
    }
    // get tag() { return 'rowBreaks'; }
    render(xmlStream2, model) {
      if (model && model.length) {
        xmlStream2.openNode(this.tag, this.$);
        if (this.count) {
          xmlStream2.addAttribute(this.$count, model.length);
          xmlStream2.addAttribute("manualBreakCount", model.length);
        }
        const { childXform } = this;
        model.forEach((childModel) => {
          childXform.render(xmlStream2, childModel);
        });
        xmlStream2.closeNode();
      } else if (this.empty) {
        xmlStream2.leafNode(this.tag);
      }
    }
  }
  rowBreaksXform = RowBreaksXform;
  return rowBreaksXform;
}
var headerFooterXform;
var hasRequiredHeaderFooterXform;
function requireHeaderFooterXform() {
  if (hasRequiredHeaderFooterXform) return headerFooterXform;
  hasRequiredHeaderFooterXform = 1;
  const BaseXform = requireBaseXform();
  class HeaderFooterXform extends BaseXform {
    get tag() {
      return "headerFooter";
    }
    render(xmlStream2, model) {
      if (model) {
        xmlStream2.addRollback();
        let createTag = false;
        xmlStream2.openNode("headerFooter");
        if (model.differentFirst) {
          xmlStream2.addAttribute("differentFirst", "1");
          createTag = true;
        }
        if (model.differentOddEven) {
          xmlStream2.addAttribute("differentOddEven", "1");
          createTag = true;
        }
        if (model.oddHeader && typeof model.oddHeader === "string") {
          xmlStream2.leafNode("oddHeader", null, model.oddHeader);
          createTag = true;
        }
        if (model.oddFooter && typeof model.oddFooter === "string") {
          xmlStream2.leafNode("oddFooter", null, model.oddFooter);
          createTag = true;
        }
        if (model.evenHeader && typeof model.evenHeader === "string") {
          xmlStream2.leafNode("evenHeader", null, model.evenHeader);
          createTag = true;
        }
        if (model.evenFooter && typeof model.evenFooter === "string") {
          xmlStream2.leafNode("evenFooter", null, model.evenFooter);
          createTag = true;
        }
        if (model.firstHeader && typeof model.firstHeader === "string") {
          xmlStream2.leafNode("firstHeader", null, model.firstHeader);
          createTag = true;
        }
        if (model.firstFooter && typeof model.firstFooter === "string") {
          xmlStream2.leafNode("firstFooter", null, model.firstFooter);
          createTag = true;
        }
        if (createTag) {
          xmlStream2.closeNode();
          xmlStream2.commit();
        } else {
          xmlStream2.rollback();
        }
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case "headerFooter":
          this.model = {};
          if (node.attributes.differentFirst) {
            this.model.differentFirst = parseInt(node.attributes.differentFirst, 0) === 1;
          }
          if (node.attributes.differentOddEven) {
            this.model.differentOddEven = parseInt(node.attributes.differentOddEven, 0) === 1;
          }
          return true;
        case "oddHeader":
          this.currentNode = "oddHeader";
          return true;
        case "oddFooter":
          this.currentNode = "oddFooter";
          return true;
        case "evenHeader":
          this.currentNode = "evenHeader";
          return true;
        case "evenFooter":
          this.currentNode = "evenFooter";
          return true;
        case "firstHeader":
          this.currentNode = "firstHeader";
          return true;
        case "firstFooter":
          this.currentNode = "firstFooter";
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      switch (this.currentNode) {
        case "oddHeader":
          this.model.oddHeader = text;
          break;
        case "oddFooter":
          this.model.oddFooter = text;
          break;
        case "evenHeader":
          this.model.evenHeader = text;
          break;
        case "evenFooter":
          this.model.evenFooter = text;
          break;
        case "firstHeader":
          this.model.firstHeader = text;
          break;
        case "firstFooter":
          this.model.firstFooter = text;
          break;
      }
    }
    parseClose() {
      switch (this.currentNode) {
        case "oddHeader":
        case "oddFooter":
        case "evenHeader":
        case "evenFooter":
        case "firstHeader":
        case "firstFooter":
          this.currentNode = void 0;
          return true;
        default:
          return false;
      }
    }
  }
  headerFooterXform = HeaderFooterXform;
  return headerFooterXform;
}
var compositeXform;
var hasRequiredCompositeXform;
function requireCompositeXform() {
  if (hasRequiredCompositeXform) return compositeXform;
  hasRequiredCompositeXform = 1;
  const BaseXform = requireBaseXform();
  class CompositeXform extends BaseXform {
    createNewModel(node) {
      return {};
    }
    parseOpen(node) {
      this.parser = this.parser || this.map[node.name];
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (node.name === this.tag) {
        this.model = this.createNewModel(node);
        return true;
      }
      return false;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    onParserClose(name, parser) {
      this.model[name] = parser.model;
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.onParserClose(name, this.parser);
          this.parser = void 0;
        }
        return true;
      }
      return name !== this.tag;
    }
  }
  compositeXform = CompositeXform;
  return compositeXform;
}
var cfvoXform;
var hasRequiredCfvoXform;
function requireCfvoXform() {
  if (hasRequiredCfvoXform) return cfvoXform;
  hasRequiredCfvoXform = 1;
  const BaseXform = requireBaseXform();
  class CfvoXform extends BaseXform {
    get tag() {
      return "cfvo";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        type: model.type,
        val: model.value
      });
    }
    parseOpen(node) {
      this.model = {
        type: node.attributes.type,
        value: BaseXform.toFloatValue(node.attributes.val)
      };
    }
    parseClose(name) {
      return name !== this.tag;
    }
  }
  cfvoXform = CfvoXform;
  return cfvoXform;
}
var databarXform;
var hasRequiredDatabarXform;
function requireDatabarXform() {
  if (hasRequiredDatabarXform) return databarXform;
  hasRequiredDatabarXform = 1;
  const CompositeXform = requireCompositeXform();
  const ColorXform = requireColorXform();
  const CfvoXform = requireCfvoXform();
  class DatabarXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        cfvo: this.cfvoXform = new CfvoXform(),
        color: this.colorXform = new ColorXform()
      };
    }
    get tag() {
      return "dataBar";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      model.cfvo.forEach((cfvo) => {
        this.cfvoXform.render(xmlStream2, cfvo);
      });
      this.colorXform.render(xmlStream2, model.color);
      xmlStream2.closeNode();
    }
    createNewModel() {
      return {
        cfvo: []
      };
    }
    onParserClose(name, parser) {
      switch (name) {
        case "cfvo":
          this.model.cfvo.push(parser.model);
          break;
        case "color":
          this.model.color = parser.model;
          break;
      }
    }
  }
  databarXform = DatabarXform;
  return databarXform;
}
var extLstRefXform;
var hasRequiredExtLstRefXform;
function requireExtLstRefXform() {
  if (hasRequiredExtLstRefXform) return extLstRefXform;
  hasRequiredExtLstRefXform = 1;
  const BaseXform = requireBaseXform();
  const CompositeXform = requireCompositeXform();
  class X14IdXform extends BaseXform {
    get tag() {
      return "x14:id";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, null, model);
    }
    parseOpen() {
      this.model = "";
    }
    parseText(text) {
      this.model += text;
    }
    parseClose(name) {
      return name !== this.tag;
    }
  }
  class ExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "x14:id": this.idXform = new X14IdXform()
      };
    }
    get tag() {
      return "ext";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        uri: "{B025F937-C7B1-47D3-B67F-A62EFF666E3E}",
        "xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
      });
      this.idXform.render(xmlStream2, model.x14Id);
      xmlStream2.closeNode();
    }
    createNewModel() {
      return {};
    }
    onParserClose(name, parser) {
      this.model.x14Id = parser.model;
    }
  }
  class ExtLstRefXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        ext: new ExtXform()
      };
    }
    get tag() {
      return "extLst";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      this.map.ext.render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    createNewModel() {
      return {};
    }
    onParserClose(name, parser) {
      Object.assign(this.model, parser.model);
    }
  }
  extLstRefXform = ExtLstRefXform;
  return extLstRefXform;
}
var formulaXform;
var hasRequiredFormulaXform;
function requireFormulaXform() {
  if (hasRequiredFormulaXform) return formulaXform;
  hasRequiredFormulaXform = 1;
  const BaseXform = requireBaseXform();
  class FormulaXform extends BaseXform {
    get tag() {
      return "formula";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, null, model);
    }
    parseOpen() {
      this.model = "";
    }
    parseText(text) {
      this.model += text;
    }
    parseClose(name) {
      return name !== this.tag;
    }
  }
  formulaXform = FormulaXform;
  return formulaXform;
}
var colorScaleXform;
var hasRequiredColorScaleXform;
function requireColorScaleXform() {
  if (hasRequiredColorScaleXform) return colorScaleXform;
  hasRequiredColorScaleXform = 1;
  const CompositeXform = requireCompositeXform();
  const ColorXform = requireColorXform();
  const CfvoXform = requireCfvoXform();
  class ColorScaleXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        cfvo: this.cfvoXform = new CfvoXform(),
        color: this.colorXform = new ColorXform()
      };
    }
    get tag() {
      return "colorScale";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      model.cfvo.forEach((cfvo) => {
        this.cfvoXform.render(xmlStream2, cfvo);
      });
      model.color.forEach((color) => {
        this.colorXform.render(xmlStream2, color);
      });
      xmlStream2.closeNode();
    }
    createNewModel(node) {
      return {
        cfvo: [],
        color: []
      };
    }
    onParserClose(name, parser) {
      this.model[name].push(parser.model);
    }
  }
  colorScaleXform = ColorScaleXform;
  return colorScaleXform;
}
var iconSetXform;
var hasRequiredIconSetXform;
function requireIconSetXform() {
  if (hasRequiredIconSetXform) return iconSetXform;
  hasRequiredIconSetXform = 1;
  const BaseXform = requireBaseXform();
  const CompositeXform = requireCompositeXform();
  const CfvoXform = requireCfvoXform();
  class IconSetXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        cfvo: this.cfvoXform = new CfvoXform()
      };
    }
    get tag() {
      return "iconSet";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        iconSet: BaseXform.toStringAttribute(model.iconSet, "3TrafficLights"),
        reverse: BaseXform.toBoolAttribute(model.reverse, false),
        showValue: BaseXform.toBoolAttribute(model.showValue, true)
      });
      model.cfvo.forEach((cfvo) => {
        this.cfvoXform.render(xmlStream2, cfvo);
      });
      xmlStream2.closeNode();
    }
    createNewModel({ attributes }) {
      return {
        iconSet: BaseXform.toStringValue(attributes.iconSet, "3TrafficLights"),
        reverse: BaseXform.toBoolValue(attributes.reverse),
        showValue: BaseXform.toBoolValue(attributes.showValue),
        cfvo: []
      };
    }
    onParserClose(name, parser) {
      this.model[name].push(parser.model);
    }
  }
  iconSetXform = IconSetXform;
  return iconSetXform;
}
var cfRuleXform;
var hasRequiredCfRuleXform;
function requireCfRuleXform() {
  if (hasRequiredCfRuleXform) return cfRuleXform;
  hasRequiredCfRuleXform = 1;
  const BaseXform = requireBaseXform();
  const CompositeXform = requireCompositeXform();
  const Range = requireRange();
  const DatabarXform = requireDatabarXform();
  const ExtLstRefXform = requireExtLstRefXform();
  const FormulaXform = requireFormulaXform();
  const ColorScaleXform = requireColorScaleXform();
  const IconSetXform = requireIconSetXform();
  const extIcons = {
    "3Triangles": true,
    "3Stars": true,
    "5Boxes": true
  };
  const getTextFormula = (model) => {
    if (model.formulae && model.formulae[0]) {
      return model.formulae[0];
    }
    const range2 = new Range(model.ref);
    const { tl } = range2;
    switch (model.operator) {
      case "containsText":
        return `NOT(ISERROR(SEARCH("${model.text}",${tl})))`;
      case "containsBlanks":
        return `LEN(TRIM(${tl}))=0`;
      case "notContainsBlanks":
        return `LEN(TRIM(${tl}))>0`;
      case "containsErrors":
        return `ISERROR(${tl})`;
      case "notContainsErrors":
        return `NOT(ISERROR(${tl}))`;
      default:
        return void 0;
    }
  };
  const getTimePeriodFormula = (model) => {
    if (model.formulae && model.formulae[0]) {
      return model.formulae[0];
    }
    const range2 = new Range(model.ref);
    const { tl } = range2;
    switch (model.timePeriod) {
      case "thisWeek":
        return `AND(TODAY()-ROUNDDOWN(${tl},0)<=WEEKDAY(TODAY())-1,ROUNDDOWN(${tl},0)-TODAY()<=7-WEEKDAY(TODAY()))`;
      case "lastWeek":
        return `AND(TODAY()-ROUNDDOWN(${tl},0)>=(WEEKDAY(TODAY())),TODAY()-ROUNDDOWN(${tl},0)<(WEEKDAY(TODAY())+7))`;
      case "nextWeek":
        return `AND(ROUNDDOWN(${tl},0)-TODAY()>(7-WEEKDAY(TODAY())),ROUNDDOWN(${tl},0)-TODAY()<(15-WEEKDAY(TODAY())))`;
      case "yesterday":
        return `FLOOR(${tl},1)=TODAY()-1`;
      case "today":
        return `FLOOR(${tl},1)=TODAY()`;
      case "tomorrow":
        return `FLOOR(${tl},1)=TODAY()+1`;
      case "last7Days":
        return `AND(TODAY()-FLOOR(${tl},1)<=6,FLOOR(${tl},1)<=TODAY())`;
      case "lastMonth":
        return `AND(MONTH(${tl})=MONTH(EDATE(TODAY(),0-1)),YEAR(${tl})=YEAR(EDATE(TODAY(),0-1)))`;
      case "thisMonth":
        return `AND(MONTH(${tl})=MONTH(TODAY()),YEAR(${tl})=YEAR(TODAY()))`;
      case "nextMonth":
        return `AND(MONTH(${tl})=MONTH(EDATE(TODAY(),0+1)),YEAR(${tl})=YEAR(EDATE(TODAY(),0+1)))`;
      default:
        return void 0;
    }
  };
  const opType = (attributes) => {
    const { type, operator } = attributes;
    switch (type) {
      case "containsText":
      case "containsBlanks":
      case "notContainsBlanks":
      case "containsErrors":
      case "notContainsErrors":
        return {
          type: "containsText",
          operator: type
        };
      default:
        return { type, operator };
    }
  };
  class CfRuleXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        dataBar: this.databarXform = new DatabarXform(),
        extLst: this.extLstRefXform = new ExtLstRefXform(),
        formula: this.formulaXform = new FormulaXform(),
        colorScale: this.colorScaleXform = new ColorScaleXform(),
        iconSet: this.iconSetXform = new IconSetXform()
      };
    }
    get tag() {
      return "cfRule";
    }
    static isPrimitive(rule) {
      if (rule.type === "iconSet") {
        if (rule.custom || extIcons[rule.iconSet]) {
          return false;
        }
      }
      return true;
    }
    render(xmlStream2, model) {
      switch (model.type) {
        case "expression":
          this.renderExpression(xmlStream2, model);
          break;
        case "cellIs":
          this.renderCellIs(xmlStream2, model);
          break;
        case "top10":
          this.renderTop10(xmlStream2, model);
          break;
        case "aboveAverage":
          this.renderAboveAverage(xmlStream2, model);
          break;
        case "dataBar":
          this.renderDataBar(xmlStream2, model);
          break;
        case "colorScale":
          this.renderColorScale(xmlStream2, model);
          break;
        case "iconSet":
          this.renderIconSet(xmlStream2, model);
          break;
        case "containsText":
          this.renderText(xmlStream2, model);
          break;
        case "timePeriod":
          this.renderTimePeriod(xmlStream2, model);
          break;
      }
    }
    renderExpression(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: "expression",
        dxfId: model.dxfId,
        priority: model.priority
      });
      this.formulaXform.render(xmlStream2, model.formulae[0]);
      xmlStream2.closeNode();
    }
    renderCellIs(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: "cellIs",
        dxfId: model.dxfId,
        priority: model.priority,
        operator: model.operator
      });
      model.formulae.forEach((formula) => {
        this.formulaXform.render(xmlStream2, formula);
      });
      xmlStream2.closeNode();
    }
    renderTop10(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        type: "top10",
        dxfId: model.dxfId,
        priority: model.priority,
        percent: BaseXform.toBoolAttribute(model.percent, false),
        bottom: BaseXform.toBoolAttribute(model.bottom, false),
        rank: BaseXform.toIntValue(model.rank, 10, true)
      });
    }
    renderAboveAverage(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        type: "aboveAverage",
        dxfId: model.dxfId,
        priority: model.priority,
        aboveAverage: BaseXform.toBoolAttribute(model.aboveAverage, true)
      });
    }
    renderDataBar(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: "dataBar",
        priority: model.priority
      });
      this.databarXform.render(xmlStream2, model);
      this.extLstRefXform.render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    renderColorScale(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: "colorScale",
        priority: model.priority
      });
      this.colorScaleXform.render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    renderIconSet(xmlStream2, model) {
      if (!CfRuleXform.isPrimitive(model)) {
        return;
      }
      xmlStream2.openNode(this.tag, {
        type: "iconSet",
        priority: model.priority
      });
      this.iconSetXform.render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    renderText(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: model.operator,
        dxfId: model.dxfId,
        priority: model.priority,
        operator: BaseXform.toStringAttribute(model.operator, "containsText")
      });
      const formula = getTextFormula(model);
      if (formula) {
        this.formulaXform.render(xmlStream2, formula);
      }
      xmlStream2.closeNode();
    }
    renderTimePeriod(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: "timePeriod",
        dxfId: model.dxfId,
        priority: model.priority,
        timePeriod: model.timePeriod
      });
      const formula = getTimePeriodFormula(model);
      if (formula) {
        this.formulaXform.render(xmlStream2, formula);
      }
      xmlStream2.closeNode();
    }
    createNewModel({ attributes }) {
      return {
        ...opType(attributes),
        dxfId: BaseXform.toIntValue(attributes.dxfId),
        priority: BaseXform.toIntValue(attributes.priority),
        timePeriod: attributes.timePeriod,
        percent: BaseXform.toBoolValue(attributes.percent),
        bottom: BaseXform.toBoolValue(attributes.bottom),
        rank: BaseXform.toIntValue(attributes.rank),
        aboveAverage: BaseXform.toBoolValue(attributes.aboveAverage)
      };
    }
    onParserClose(name, parser) {
      switch (name) {
        case "dataBar":
        case "extLst":
        case "colorScale":
        case "iconSet":
          Object.assign(this.model, parser.model);
          break;
        case "formula":
          this.model.formulae = this.model.formulae || [];
          this.model.formulae.push(parser.model);
          break;
      }
    }
  }
  cfRuleXform = CfRuleXform;
  return cfRuleXform;
}
var conditionalFormattingXform;
var hasRequiredConditionalFormattingXform;
function requireConditionalFormattingXform() {
  if (hasRequiredConditionalFormattingXform) return conditionalFormattingXform;
  hasRequiredConditionalFormattingXform = 1;
  const CompositeXform = requireCompositeXform();
  const CfRuleXform = requireCfRuleXform();
  class ConditionalFormattingXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        cfRule: new CfRuleXform()
      };
    }
    get tag() {
      return "conditionalFormatting";
    }
    render(xmlStream2, model) {
      if (!model.rules.some(CfRuleXform.isPrimitive)) {
        return;
      }
      xmlStream2.openNode(this.tag, { sqref: model.ref });
      model.rules.forEach((rule) => {
        if (CfRuleXform.isPrimitive(rule)) {
          rule.ref = model.ref;
          this.map.cfRule.render(xmlStream2, rule);
        }
      });
      xmlStream2.closeNode();
    }
    createNewModel({ attributes }) {
      return {
        ref: attributes.sqref,
        rules: []
      };
    }
    onParserClose(name, parser) {
      this.model.rules.push(parser.model);
    }
  }
  conditionalFormattingXform = ConditionalFormattingXform;
  return conditionalFormattingXform;
}
var conditionalFormattingsXform;
var hasRequiredConditionalFormattingsXform;
function requireConditionalFormattingsXform() {
  if (hasRequiredConditionalFormattingsXform) return conditionalFormattingsXform;
  hasRequiredConditionalFormattingsXform = 1;
  const BaseXform = requireBaseXform();
  const ConditionalFormattingXform = requireConditionalFormattingXform();
  class ConditionalFormattingsXform extends BaseXform {
    constructor() {
      super();
      this.cfXform = new ConditionalFormattingXform();
    }
    get tag() {
      return "conditionalFormatting";
    }
    reset() {
      this.model = [];
    }
    prepare(model, options) {
      let nextPriority = model.reduce(
        (p, cf) => Math.max(p, ...cf.rules.map((rule) => rule.priority || 0)),
        1
      );
      model.forEach((cf) => {
        cf.rules.forEach((rule) => {
          if (!rule.priority) {
            rule.priority = nextPriority++;
          }
          if (rule.style) {
            rule.dxfId = options.styles.addDxfStyle(rule.style);
          }
        });
      });
    }
    render(xmlStream2, model) {
      model.forEach((cf) => {
        this.cfXform.render(xmlStream2, cf);
      });
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "conditionalFormatting":
          this.parser = this.cfXform;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.push(this.parser.model);
          this.parser = void 0;
          return false;
        }
        return true;
      }
      return false;
    }
    reconcile(model, options) {
      model.forEach((cf) => {
        cf.rules.forEach((rule) => {
          if (rule.dxfId !== void 0) {
            rule.style = options.styles.getDxfStyle(rule.dxfId);
            delete rule.dxfId;
          }
        });
      });
    }
  }
  conditionalFormattingsXform = ConditionalFormattingsXform;
  return conditionalFormattingsXform;
}
var fExtXform;
var hasRequiredFExtXform;
function requireFExtXform() {
  if (hasRequiredFExtXform) return fExtXform;
  hasRequiredFExtXform = 1;
  const BaseXform = requireBaseXform();
  class FExtXform extends BaseXform {
    get tag() {
      return "xm:f";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, null, model);
    }
    parseOpen() {
      this.model = "";
    }
    parseText(text) {
      this.model += text;
    }
    parseClose(name) {
      return name !== this.tag;
    }
  }
  fExtXform = FExtXform;
  return fExtXform;
}
var cfvoExtXform;
var hasRequiredCfvoExtXform;
function requireCfvoExtXform() {
  if (hasRequiredCfvoExtXform) return cfvoExtXform;
  hasRequiredCfvoExtXform = 1;
  const CompositeXform = requireCompositeXform();
  const FExtXform = requireFExtXform();
  class CfvoExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "xm:f": this.fExtXform = new FExtXform()
      };
    }
    get tag() {
      return "x14:cfvo";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: model.type
      });
      if (model.value !== void 0) {
        this.fExtXform.render(xmlStream2, model.value);
      }
      xmlStream2.closeNode();
    }
    createNewModel(node) {
      return {
        type: node.attributes.type
      };
    }
    onParserClose(name, parser) {
      switch (name) {
        case "xm:f":
          this.model.value = parser.model ? parseFloat(parser.model) : 0;
          break;
      }
    }
  }
  cfvoExtXform = CfvoExtXform;
  return cfvoExtXform;
}
var databarExtXform;
var hasRequiredDatabarExtXform;
function requireDatabarExtXform() {
  if (hasRequiredDatabarExtXform) return databarExtXform;
  hasRequiredDatabarExtXform = 1;
  const BaseXform = requireBaseXform();
  const CompositeXform = requireCompositeXform();
  const ColorXform = requireColorXform();
  const CfvoExtXform = requireCfvoExtXform();
  class DatabarExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "x14:cfvo": this.cfvoXform = new CfvoExtXform(),
        "x14:borderColor": this.borderColorXform = new ColorXform("x14:borderColor"),
        "x14:negativeBorderColor": this.negativeBorderColorXform = new ColorXform(
          "x14:negativeBorderColor"
        ),
        "x14:negativeFillColor": this.negativeFillColorXform = new ColorXform(
          "x14:negativeFillColor"
        ),
        "x14:axisColor": this.axisColorXform = new ColorXform("x14:axisColor")
      };
    }
    static isExt(rule) {
      return !rule.gradient;
    }
    get tag() {
      return "x14:dataBar";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        minLength: BaseXform.toIntAttribute(model.minLength, 0, true),
        maxLength: BaseXform.toIntAttribute(model.maxLength, 100, true),
        border: BaseXform.toBoolAttribute(model.border, false),
        gradient: BaseXform.toBoolAttribute(model.gradient, true),
        negativeBarColorSameAsPositive: BaseXform.toBoolAttribute(
          model.negativeBarColorSameAsPositive,
          true
        ),
        negativeBarBorderColorSameAsPositive: BaseXform.toBoolAttribute(
          model.negativeBarBorderColorSameAsPositive,
          true
        ),
        axisPosition: BaseXform.toAttribute(model.axisPosition, "auto"),
        direction: BaseXform.toAttribute(model.direction, "leftToRight")
      });
      model.cfvo.forEach((cfvo) => {
        this.cfvoXform.render(xmlStream2, cfvo);
      });
      this.borderColorXform.render(xmlStream2, model.borderColor);
      this.negativeBorderColorXform.render(xmlStream2, model.negativeBorderColor);
      this.negativeFillColorXform.render(xmlStream2, model.negativeFillColor);
      this.axisColorXform.render(xmlStream2, model.axisColor);
      xmlStream2.closeNode();
    }
    createNewModel({ attributes }) {
      return {
        cfvo: [],
        minLength: BaseXform.toIntValue(attributes.minLength, 0),
        maxLength: BaseXform.toIntValue(attributes.maxLength, 100),
        border: BaseXform.toBoolValue(attributes.border, false),
        gradient: BaseXform.toBoolValue(attributes.gradient, true),
        negativeBarColorSameAsPositive: BaseXform.toBoolValue(
          attributes.negativeBarColorSameAsPositive,
          true
        ),
        negativeBarBorderColorSameAsPositive: BaseXform.toBoolValue(
          attributes.negativeBarBorderColorSameAsPositive,
          true
        ),
        axisPosition: BaseXform.toStringValue(attributes.axisPosition, "auto"),
        direction: BaseXform.toStringValue(attributes.direction, "leftToRight")
      };
    }
    onParserClose(name, parser) {
      const [, prop] = name.split(":");
      switch (prop) {
        case "cfvo":
          this.model.cfvo.push(parser.model);
          break;
        default:
          this.model[prop] = parser.model;
          break;
      }
    }
  }
  databarExtXform = DatabarExtXform;
  return databarExtXform;
}
var cfIconExtXform;
var hasRequiredCfIconExtXform;
function requireCfIconExtXform() {
  if (hasRequiredCfIconExtXform) return cfIconExtXform;
  hasRequiredCfIconExtXform = 1;
  const BaseXform = requireBaseXform();
  class CfIconExtXform extends BaseXform {
    get tag() {
      return "x14:cfIcon";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        iconSet: model.iconSet,
        iconId: model.iconId
      });
    }
    parseOpen({ attributes }) {
      this.model = {
        iconSet: attributes.iconSet,
        iconId: BaseXform.toIntValue(attributes.iconId)
      };
    }
    parseClose(name) {
      return name !== this.tag;
    }
  }
  cfIconExtXform = CfIconExtXform;
  return cfIconExtXform;
}
var iconSetExtXform;
var hasRequiredIconSetExtXform;
function requireIconSetExtXform() {
  if (hasRequiredIconSetExtXform) return iconSetExtXform;
  hasRequiredIconSetExtXform = 1;
  const BaseXform = requireBaseXform();
  const CompositeXform = requireCompositeXform();
  const CfvoExtXform = requireCfvoExtXform();
  const CfIconExtXform = requireCfIconExtXform();
  class IconSetExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "x14:cfvo": this.cfvoXform = new CfvoExtXform(),
        "x14:cfIcon": this.cfIconXform = new CfIconExtXform()
      };
    }
    get tag() {
      return "x14:iconSet";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        iconSet: BaseXform.toStringAttribute(model.iconSet),
        reverse: BaseXform.toBoolAttribute(model.reverse, false),
        showValue: BaseXform.toBoolAttribute(model.showValue, true),
        custom: BaseXform.toBoolAttribute(model.icons, false)
      });
      model.cfvo.forEach((cfvo) => {
        this.cfvoXform.render(xmlStream2, cfvo);
      });
      if (model.icons) {
        model.icons.forEach((icon, i) => {
          icon.iconId = i;
          this.cfIconXform.render(xmlStream2, icon);
        });
      }
      xmlStream2.closeNode();
    }
    createNewModel({ attributes }) {
      return {
        cfvo: [],
        iconSet: BaseXform.toStringValue(attributes.iconSet, "3TrafficLights"),
        reverse: BaseXform.toBoolValue(attributes.reverse, false),
        showValue: BaseXform.toBoolValue(attributes.showValue, true)
      };
    }
    onParserClose(name, parser) {
      const [, prop] = name.split(":");
      switch (prop) {
        case "cfvo":
          this.model.cfvo.push(parser.model);
          break;
        case "cfIcon":
          if (!this.model.icons) {
            this.model.icons = [];
          }
          this.model.icons.push(parser.model);
          break;
        default:
          this.model[prop] = parser.model;
          break;
      }
    }
  }
  iconSetExtXform = IconSetExtXform;
  return iconSetExtXform;
}
var cfRuleExtXform;
var hasRequiredCfRuleExtXform;
function requireCfRuleExtXform() {
  if (hasRequiredCfRuleExtXform) return cfRuleExtXform;
  hasRequiredCfRuleExtXform = 1;
  const { v4: uuidv4 } = /* @__PURE__ */ requireDist();
  const BaseXform = requireBaseXform();
  const CompositeXform = requireCompositeXform();
  const DatabarExtXform = requireDatabarExtXform();
  const IconSetExtXform = requireIconSetExtXform();
  const extIcons = {
    "3Triangles": true,
    "3Stars": true,
    "5Boxes": true
  };
  class CfRuleExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "x14:dataBar": this.databarXform = new DatabarExtXform(),
        "x14:iconSet": this.iconSetXform = new IconSetExtXform()
      };
    }
    get tag() {
      return "x14:cfRule";
    }
    static isExt(rule) {
      if (rule.type === "dataBar") {
        return DatabarExtXform.isExt(rule);
      }
      if (rule.type === "iconSet") {
        if (rule.custom || extIcons[rule.iconSet]) {
          return true;
        }
      }
      return false;
    }
    prepare(model) {
      if (CfRuleExtXform.isExt(model)) {
        model.x14Id = `{${uuidv4()}}`.toUpperCase();
      }
    }
    render(xmlStream2, model) {
      if (!CfRuleExtXform.isExt(model)) {
        return;
      }
      switch (model.type) {
        case "dataBar":
          this.renderDataBar(xmlStream2, model);
          break;
        case "iconSet":
          this.renderIconSet(xmlStream2, model);
          break;
      }
    }
    renderDataBar(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: "dataBar",
        id: model.x14Id
      });
      this.databarXform.render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    renderIconSet(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        type: "iconSet",
        priority: model.priority,
        id: model.x14Id || `{${uuidv4()}}`
      });
      this.iconSetXform.render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    createNewModel({ attributes }) {
      return {
        type: attributes.type,
        x14Id: attributes.id,
        priority: BaseXform.toIntValue(attributes.priority)
      };
    }
    onParserClose(name, parser) {
      Object.assign(this.model, parser.model);
    }
  }
  cfRuleExtXform = CfRuleExtXform;
  return cfRuleExtXform;
}
var sqrefExtXform;
var hasRequiredSqrefExtXform;
function requireSqrefExtXform() {
  if (hasRequiredSqrefExtXform) return sqrefExtXform;
  hasRequiredSqrefExtXform = 1;
  const BaseXform = requireBaseXform();
  class SqrefExtXform extends BaseXform {
    get tag() {
      return "xm:sqref";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, null, model);
    }
    parseOpen() {
      this.model = "";
    }
    parseText(text) {
      this.model += text;
    }
    parseClose(name) {
      return name !== this.tag;
    }
  }
  sqrefExtXform = SqrefExtXform;
  return sqrefExtXform;
}
var conditionalFormattingExtXform;
var hasRequiredConditionalFormattingExtXform;
function requireConditionalFormattingExtXform() {
  if (hasRequiredConditionalFormattingExtXform) return conditionalFormattingExtXform;
  hasRequiredConditionalFormattingExtXform = 1;
  const CompositeXform = requireCompositeXform();
  const SqRefExtXform = requireSqrefExtXform();
  const CfRuleExtXform = requireCfRuleExtXform();
  class ConditionalFormattingExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "xm:sqref": this.sqRef = new SqRefExtXform(),
        "x14:cfRule": this.cfRule = new CfRuleExtXform()
      };
    }
    get tag() {
      return "x14:conditionalFormatting";
    }
    prepare(model, options) {
      model.rules.forEach((rule) => {
        this.cfRule.prepare(rule, options);
      });
    }
    render(xmlStream2, model) {
      if (!model.rules.some(CfRuleExtXform.isExt)) {
        return;
      }
      xmlStream2.openNode(this.tag, {
        "xmlns:xm": "http://schemas.microsoft.com/office/excel/2006/main"
      });
      model.rules.filter(CfRuleExtXform.isExt).forEach((rule) => this.cfRule.render(xmlStream2, rule));
      this.sqRef.render(xmlStream2, model.ref);
      xmlStream2.closeNode();
    }
    createNewModel() {
      return {
        rules: []
      };
    }
    onParserClose(name, parser) {
      switch (name) {
        case "xm:sqref":
          this.model.ref = parser.model;
          break;
        case "x14:cfRule":
          this.model.rules.push(parser.model);
          break;
      }
    }
  }
  conditionalFormattingExtXform = ConditionalFormattingExtXform;
  return conditionalFormattingExtXform;
}
var conditionalFormattingsExtXform;
var hasRequiredConditionalFormattingsExtXform;
function requireConditionalFormattingsExtXform() {
  if (hasRequiredConditionalFormattingsExtXform) return conditionalFormattingsExtXform;
  hasRequiredConditionalFormattingsExtXform = 1;
  const CompositeXform = requireCompositeXform();
  const CfRuleExtXform = requireCfRuleExtXform();
  const ConditionalFormattingExtXform = requireConditionalFormattingExtXform();
  class ConditionalFormattingsExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "x14:conditionalFormatting": this.cfXform = new ConditionalFormattingExtXform()
      };
    }
    get tag() {
      return "x14:conditionalFormattings";
    }
    hasContent(model) {
      if (model.hasExtContent === void 0) {
        model.hasExtContent = model.some((cf) => cf.rules.some(CfRuleExtXform.isExt));
      }
      return model.hasExtContent;
    }
    prepare(model, options) {
      model.forEach((cf) => {
        this.cfXform.prepare(cf, options);
      });
    }
    render(xmlStream2, model) {
      if (this.hasContent(model)) {
        xmlStream2.openNode(this.tag);
        model.forEach((cf) => this.cfXform.render(xmlStream2, cf));
        xmlStream2.closeNode();
      }
    }
    createNewModel() {
      return [];
    }
    onParserClose(name, parser) {
      this.model.push(parser.model);
    }
  }
  conditionalFormattingsExtXform = ConditionalFormattingsExtXform;
  return conditionalFormattingsExtXform;
}
var extLstXform$1;
var hasRequiredExtLstXform$1;
function requireExtLstXform$1() {
  if (hasRequiredExtLstXform$1) return extLstXform$1;
  hasRequiredExtLstXform$1 = 1;
  const CompositeXform = requireCompositeXform();
  const ConditionalFormattingsExt = requireConditionalFormattingsExtXform();
  class ExtXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        "x14:conditionalFormattings": this.conditionalFormattings = new ConditionalFormattingsExt()
      };
    }
    get tag() {
      return "ext";
    }
    hasContent(model) {
      return this.conditionalFormattings.hasContent(model.conditionalFormattings);
    }
    prepare(model, options) {
      this.conditionalFormattings.prepare(model.conditionalFormattings, options);
    }
    render(xmlStream2, model) {
      xmlStream2.openNode("ext", {
        uri: "{78C0D931-6437-407d-A8EE-F0AAD7539E65}",
        "xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
      });
      this.conditionalFormattings.render(xmlStream2, model.conditionalFormattings);
      xmlStream2.closeNode();
    }
    createNewModel() {
      return {};
    }
    onParserClose(name, parser) {
      this.model[name] = parser.model;
    }
  }
  class ExtLstXform extends CompositeXform {
    constructor() {
      super();
      this.map = {
        ext: this.ext = new ExtXform()
      };
    }
    get tag() {
      return "extLst";
    }
    prepare(model, options) {
      this.ext.prepare(model, options);
    }
    hasContent(model) {
      return this.ext.hasContent(model);
    }
    render(xmlStream2, model) {
      if (!this.hasContent(model)) {
        return;
      }
      xmlStream2.openNode("extLst");
      this.ext.render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    createNewModel() {
      return {};
    }
    onParserClose(name, parser) {
      Object.assign(this.model, parser.model);
    }
  }
  extLstXform$1 = ExtLstXform;
  return extLstXform$1;
}
var worksheetXform;
var hasRequiredWorksheetXform;
function requireWorksheetXform() {
  if (hasRequiredWorksheetXform) return worksheetXform;
  hasRequiredWorksheetXform = 1;
  const _ = requireUnderDash();
  const colCache = requireColCache();
  const XmlStream = requireXmlStream();
  const RelType = requireRelType();
  const Merges = requireMerges();
  const BaseXform = requireBaseXform();
  const ListXform = requireListXform();
  const RowXform = requireRowXform();
  const ColXform = requireColXform();
  const DimensionXform = requireDimensionXform();
  const HyperlinkXform = requireHyperlinkXform();
  const MergeCellXform = requireMergeCellXform();
  const DataValidationsXform = requireDataValidationsXform();
  const SheetPropertiesXform = requireSheetPropertiesXform();
  const SheetFormatPropertiesXform = requireSheetFormatPropertiesXform();
  const SheetViewXform = requireSheetViewXform();
  const SheetProtectionXform = requireSheetProtectionXform();
  const PageMarginsXform = requirePageMarginsXform();
  const PageSetupXform = requirePageSetupXform();
  const PrintOptionsXform = requirePrintOptionsXform();
  const AutoFilterXform = requireAutoFilterXform$1();
  const PictureXform = requirePictureXform();
  const DrawingXform = requireDrawingXform$1();
  const TablePartXform = requireTablePartXform();
  const RowBreaksXform = requireRowBreaksXform();
  const HeaderFooterXform = requireHeaderFooterXform();
  const ConditionalFormattingsXform = requireConditionalFormattingsXform();
  const ExtListXform = requireExtLstXform$1();
  const mergeRule = (rule, extRule) => {
    Object.keys(extRule).forEach((key) => {
      const value = rule[key];
      const extValue = extRule[key];
      if (value === void 0 && extValue !== void 0) {
        rule[key] = extValue;
      }
    });
  };
  const mergeConditionalFormattings = (model, extModel) => {
    if (!extModel || !extModel.length) {
      return model;
    }
    if (!model || !model.length) {
      return extModel;
    }
    const cfMap = {};
    const ruleMap = {};
    model.forEach((cf) => {
      cfMap[cf.ref] = cf;
      cf.rules.forEach((rule) => {
        const { x14Id } = rule;
        if (x14Id) {
          ruleMap[x14Id] = rule;
        }
      });
    });
    extModel.forEach((extCf) => {
      extCf.rules.forEach((extRule) => {
        const rule = ruleMap[extRule.x14Id];
        if (rule) {
          mergeRule(rule, extRule);
        } else if (cfMap[extCf.ref]) {
          cfMap[extCf.ref].rules.push(extRule);
        } else {
          model.push({
            ref: extCf.ref,
            rules: [extRule]
          });
        }
      });
    });
    return model;
  };
  class WorkSheetXform extends BaseXform {
    constructor(options) {
      super();
      const { maxRows, maxCols, ignoreNodes } = options || {};
      this.ignoreNodes = ignoreNodes || [];
      this.map = {
        sheetPr: new SheetPropertiesXform(),
        dimension: new DimensionXform(),
        sheetViews: new ListXform({
          tag: "sheetViews",
          count: false,
          childXform: new SheetViewXform()
        }),
        sheetFormatPr: new SheetFormatPropertiesXform(),
        cols: new ListXform({ tag: "cols", count: false, childXform: new ColXform() }),
        sheetData: new ListXform({
          tag: "sheetData",
          count: false,
          empty: true,
          childXform: new RowXform({ maxItems: maxCols }),
          maxItems: maxRows
        }),
        autoFilter: new AutoFilterXform(),
        mergeCells: new ListXform({ tag: "mergeCells", count: true, childXform: new MergeCellXform() }),
        rowBreaks: new RowBreaksXform(),
        hyperlinks: new ListXform({
          tag: "hyperlinks",
          count: false,
          childXform: new HyperlinkXform()
        }),
        pageMargins: new PageMarginsXform(),
        dataValidations: new DataValidationsXform(),
        pageSetup: new PageSetupXform(),
        headerFooter: new HeaderFooterXform(),
        printOptions: new PrintOptionsXform(),
        picture: new PictureXform(),
        drawing: new DrawingXform(),
        sheetProtection: new SheetProtectionXform(),
        tableParts: new ListXform({ tag: "tableParts", count: true, childXform: new TablePartXform() }),
        conditionalFormatting: new ConditionalFormattingsXform(),
        extLst: new ExtListXform()
      };
    }
    prepare(model, options) {
      options.merges = new Merges();
      model.hyperlinks = options.hyperlinks = [];
      model.comments = options.comments = [];
      options.formulae = {};
      options.siFormulae = 0;
      this.map.cols.prepare(model.cols, options);
      this.map.sheetData.prepare(model.rows, options);
      this.map.conditionalFormatting.prepare(model.conditionalFormattings, options);
      model.mergeCells = options.merges.mergeCells;
      const rels = model.rels = [];
      function nextRid(r) {
        return `rId${r.length + 1}`;
      }
      model.hyperlinks.forEach((hyperlink) => {
        const rId = nextRid(rels);
        hyperlink.rId = rId;
        rels.push({
          Id: rId,
          Type: RelType.Hyperlink,
          Target: hyperlink.target,
          TargetMode: "External"
        });
      });
      if (model.comments.length > 0) {
        const comment = {
          Id: nextRid(rels),
          Type: RelType.Comments,
          Target: `../comments${model.id}.xml`
        };
        rels.push(comment);
        const vmlDrawing = {
          Id: nextRid(rels),
          Type: RelType.VmlDrawing,
          Target: `../drawings/vmlDrawing${model.id}.vml`
        };
        rels.push(vmlDrawing);
        model.comments.forEach((item) => {
          item.refAddress = colCache.decodeAddress(item.ref);
        });
        options.commentRefs.push({
          commentName: `comments${model.id}`,
          vmlDrawing: `vmlDrawing${model.id}`
        });
      }
      const drawingRelsHash = [];
      let bookImage;
      model.media.forEach((medium) => {
        if (medium.type === "background") {
          const rId = nextRid(rels);
          bookImage = options.media[medium.imageId];
          rels.push({
            Id: rId,
            Type: RelType.Image,
            Target: `../media/${bookImage.name}.${bookImage.extension}`
          });
          model.background = {
            rId
          };
          model.image = options.media[medium.imageId];
        } else if (medium.type === "image") {
          let { drawing } = model;
          bookImage = options.media[medium.imageId];
          if (!drawing) {
            drawing = model.drawing = {
              rId: nextRid(rels),
              name: `drawing${++options.drawingsCount}`,
              anchors: [],
              rels: []
            };
            options.drawings.push(drawing);
            rels.push({
              Id: drawing.rId,
              Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
              Target: `../drawings/${drawing.name}.xml`
            });
          }
          let rIdImage = this.preImageId === medium.imageId ? drawingRelsHash[medium.imageId] : drawingRelsHash[drawing.rels.length];
          if (!rIdImage) {
            rIdImage = nextRid(drawing.rels);
            drawingRelsHash[drawing.rels.length] = rIdImage;
            drawing.rels.push({
              Id: rIdImage,
              Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
              Target: `../media/${bookImage.name}.${bookImage.extension}`
            });
          }
          const anchor2 = {
            picture: {
              rId: rIdImage
            },
            range: medium.range
          };
          if (medium.hyperlinks && medium.hyperlinks.hyperlink) {
            const rIdHyperLink = nextRid(drawing.rels);
            drawingRelsHash[drawing.rels.length] = rIdHyperLink;
            anchor2.picture.hyperlinks = {
              tooltip: medium.hyperlinks.tooltip,
              rId: rIdHyperLink
            };
            drawing.rels.push({
              Id: rIdHyperLink,
              Type: RelType.Hyperlink,
              Target: medium.hyperlinks.hyperlink,
              TargetMode: "External"
            });
          }
          this.preImageId = medium.imageId;
          drawing.anchors.push(anchor2);
        }
      });
      model.tables.forEach((table2) => {
        const rId = nextRid(rels);
        table2.rId = rId;
        rels.push({
          Id: rId,
          Type: RelType.Table,
          Target: `../tables/${table2.target}`
        });
        table2.columns.forEach((column2) => {
          const { style } = column2;
          if (style) {
            column2.dxfId = options.styles.addDxfStyle(style);
          }
        });
      });
      this.map.extLst.prepare(model, options);
    }
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode("worksheet", WorkSheetXform.WORKSHEET_ATTRIBUTES);
      const sheetFormatPropertiesModel = model.properties ? {
        defaultRowHeight: model.properties.defaultRowHeight,
        dyDescent: model.properties.dyDescent,
        outlineLevelCol: model.properties.outlineLevelCol,
        outlineLevelRow: model.properties.outlineLevelRow
      } : void 0;
      if (model.properties && model.properties.defaultColWidth) {
        sheetFormatPropertiesModel.defaultColWidth = model.properties.defaultColWidth;
      }
      const sheetPropertiesModel = {
        outlineProperties: model.properties && model.properties.outlineProperties,
        tabColor: model.properties && model.properties.tabColor,
        pageSetup: model.pageSetup && model.pageSetup.fitToPage ? {
          fitToPage: model.pageSetup.fitToPage
        } : void 0
      };
      const pageMarginsModel = model.pageSetup && model.pageSetup.margins;
      const printOptionsModel = {
        showRowColHeaders: model.pageSetup && model.pageSetup.showRowColHeaders,
        showGridLines: model.pageSetup && model.pageSetup.showGridLines,
        horizontalCentered: model.pageSetup && model.pageSetup.horizontalCentered,
        verticalCentered: model.pageSetup && model.pageSetup.verticalCentered
      };
      const sheetProtectionModel = model.sheetProtection;
      this.map.sheetPr.render(xmlStream2, sheetPropertiesModel);
      this.map.dimension.render(xmlStream2, model.dimensions);
      this.map.sheetViews.render(xmlStream2, model.views);
      this.map.sheetFormatPr.render(xmlStream2, sheetFormatPropertiesModel);
      this.map.cols.render(xmlStream2, model.cols);
      this.map.sheetData.render(xmlStream2, model.rows);
      this.map.sheetProtection.render(xmlStream2, sheetProtectionModel);
      this.map.autoFilter.render(xmlStream2, model.autoFilter);
      this.map.mergeCells.render(xmlStream2, model.mergeCells);
      this.map.conditionalFormatting.render(xmlStream2, model.conditionalFormattings);
      this.map.dataValidations.render(xmlStream2, model.dataValidations);
      this.map.hyperlinks.render(xmlStream2, model.hyperlinks);
      this.map.printOptions.render(xmlStream2, printOptionsModel);
      this.map.pageMargins.render(xmlStream2, pageMarginsModel);
      this.map.pageSetup.render(xmlStream2, model.pageSetup);
      this.map.headerFooter.render(xmlStream2, model.headerFooter);
      this.map.rowBreaks.render(xmlStream2, model.rowBreaks);
      this.map.drawing.render(xmlStream2, model.drawing);
      this.map.picture.render(xmlStream2, model.background);
      this.map.tableParts.render(xmlStream2, model.tables);
      this.map.extLst.render(xmlStream2, model);
      if (model.rels) {
        model.rels.forEach((rel) => {
          if (rel.Type === RelType.VmlDrawing) {
            xmlStream2.leafNode("legacyDrawing", { "r:id": rel.Id });
          }
        });
      }
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (node.name === "worksheet") {
        _.each(this.map, (xform) => {
          xform.reset();
        });
        return true;
      }
      if (this.map[node.name] && !this.ignoreNodes.includes(node.name)) {
        this.parser = this.map[node.name];
        this.parser.parseOpen(node);
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case "worksheet": {
          const properties = this.map.sheetFormatPr.model || {};
          if (this.map.sheetPr.model && this.map.sheetPr.model.tabColor) {
            properties.tabColor = this.map.sheetPr.model.tabColor;
          }
          if (this.map.sheetPr.model && this.map.sheetPr.model.outlineProperties) {
            properties.outlineProperties = this.map.sheetPr.model.outlineProperties;
          }
          const sheetProperties = {
            fitToPage: this.map.sheetPr.model && this.map.sheetPr.model.pageSetup && this.map.sheetPr.model.pageSetup.fitToPage || false,
            margins: this.map.pageMargins.model
          };
          const pageSetup = Object.assign(sheetProperties, this.map.pageSetup.model, this.map.printOptions.model);
          const conditionalFormattings = mergeConditionalFormattings(
            this.map.conditionalFormatting.model,
            this.map.extLst.model && this.map.extLst.model["x14:conditionalFormattings"]
          );
          this.model = {
            dimensions: this.map.dimension.model,
            cols: this.map.cols.model,
            rows: this.map.sheetData.model,
            mergeCells: this.map.mergeCells.model,
            hyperlinks: this.map.hyperlinks.model,
            dataValidations: this.map.dataValidations.model,
            properties,
            views: this.map.sheetViews.model,
            pageSetup,
            headerFooter: this.map.headerFooter.model,
            background: this.map.picture.model,
            drawing: this.map.drawing.model,
            tables: this.map.tableParts.model,
            conditionalFormattings
          };
          if (this.map.autoFilter.model) {
            this.model.autoFilter = this.map.autoFilter.model;
          }
          if (this.map.sheetProtection.model) {
            this.model.sheetProtection = this.map.sheetProtection.model;
          }
          return false;
        }
        default:
          return true;
      }
    }
    reconcile(model, options) {
      const rels = (model.relationships || []).reduce((h, rel) => {
        h[rel.Id] = rel;
        if (rel.Type === RelType.Comments) {
          model.comments = options.comments[rel.Target].comments;
        }
        if (rel.Type === RelType.VmlDrawing && model.comments && model.comments.length) {
          const vmlComment = options.vmlDrawings[rel.Target].comments;
          model.comments.forEach((comment, index) => {
            comment.note = Object.assign({}, comment.note, vmlComment[index]);
          });
        }
        return h;
      }, {});
      options.commentsMap = (model.comments || []).reduce((h, comment) => {
        if (comment.ref) {
          h[comment.ref] = comment;
        }
        return h;
      }, {});
      options.hyperlinkMap = (model.hyperlinks || []).reduce((h, hyperlink) => {
        if (hyperlink.rId) {
          h[hyperlink.address] = rels[hyperlink.rId].Target;
        }
        return h;
      }, {});
      options.formulae = {};
      model.rows = model.rows && model.rows.filter(Boolean) || [];
      model.rows.forEach((row2) => {
        row2.cells = row2.cells && row2.cells.filter(Boolean) || [];
      });
      this.map.cols.reconcile(model.cols, options);
      this.map.sheetData.reconcile(model.rows, options);
      this.map.conditionalFormatting.reconcile(model.conditionalFormattings, options);
      model.media = [];
      if (model.drawing) {
        const drawingRel = rels[model.drawing.rId];
        const match = drawingRel.Target.match(/\/drawings\/([a-zA-Z0-9]+)[.][a-zA-Z]{3,4}$/);
        if (match) {
          const drawingName = match[1];
          const drawing = options.drawings[drawingName];
          drawing.anchors.forEach((anchor2) => {
            if (anchor2.medium) {
              const image2 = {
                type: "image",
                imageId: anchor2.medium.index,
                range: anchor2.range,
                hyperlinks: anchor2.picture.hyperlinks
              };
              model.media.push(image2);
            }
          });
        }
      }
      const backgroundRel = model.background && rels[model.background.rId];
      if (backgroundRel) {
        const target = backgroundRel.Target.split("/media/")[1];
        const imageId = options.mediaIndex && options.mediaIndex[target];
        if (imageId !== void 0) {
          model.media.push({
            type: "background",
            imageId
          });
        }
      }
      model.tables = (model.tables || []).map((tablePart) => {
        const rel = rels[tablePart.rId];
        return options.tables[rel.Target];
      });
      delete model.relationships;
      delete model.hyperlinks;
      delete model.comments;
    }
  }
  WorkSheetXform.WORKSHEET_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
    "mc:Ignorable": "x14ac",
    "xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
  };
  worksheetXform = WorkSheetXform;
  return worksheetXform;
}
var baseCellAnchorXform;
var hasRequiredBaseCellAnchorXform;
function requireBaseCellAnchorXform() {
  if (hasRequiredBaseCellAnchorXform) return baseCellAnchorXform;
  hasRequiredBaseCellAnchorXform = 1;
  const BaseXform = requireBaseXform();
  class BaseCellAnchorXform extends BaseXform {
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          this.model = {
            range: {
              editAs: node.attributes.editAs || "oneCell"
            }
          };
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    reconcilePicture(model, options) {
      if (model && model.rId) {
        const rel = options.rels[model.rId];
        const match = rel.Target.match(/.*\/media\/(.+[.][a-zA-Z]{3,4})/);
        if (match) {
          const name = match[1];
          const mediaId = options.mediaIndex[name];
          return options.media[mediaId];
        }
      }
      return void 0;
    }
  }
  baseCellAnchorXform = BaseCellAnchorXform;
  return baseCellAnchorXform;
}
var cellPositionXform;
var hasRequiredCellPositionXform;
function requireCellPositionXform() {
  if (hasRequiredCellPositionXform) return cellPositionXform;
  hasRequiredCellPositionXform = 1;
  const BaseXform = requireBaseXform();
  const IntegerXform = requireIntegerXform();
  class CellPositionXform extends BaseXform {
    constructor(options) {
      super();
      this.tag = options.tag;
      this.map = {
        "xdr:col": new IntegerXform({ tag: "xdr:col", zero: true }),
        "xdr:colOff": new IntegerXform({ tag: "xdr:colOff", zero: true }),
        "xdr:row": new IntegerXform({ tag: "xdr:row", zero: true }),
        "xdr:rowOff": new IntegerXform({ tag: "xdr:rowOff", zero: true })
      };
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      this.map["xdr:col"].render(xmlStream2, model.nativeCol);
      this.map["xdr:colOff"].render(xmlStream2, model.nativeColOff);
      this.map["xdr:row"].render(xmlStream2, model.nativeRow);
      this.map["xdr:rowOff"].render(xmlStream2, model.nativeRowOff);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model = {
            nativeCol: this.map["xdr:col"].model,
            nativeColOff: this.map["xdr:colOff"].model,
            nativeRow: this.map["xdr:row"].model,
            nativeRowOff: this.map["xdr:rowOff"].model
          };
          return false;
        default:
          return true;
      }
    }
  }
  cellPositionXform = CellPositionXform;
  return cellPositionXform;
}
var blipXform;
var hasRequiredBlipXform;
function requireBlipXform() {
  if (hasRequiredBlipXform) return blipXform;
  hasRequiredBlipXform = 1;
  const BaseXform = requireBaseXform();
  class BlipXform extends BaseXform {
    get tag() {
      return "a:blip";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        "r:embed": model.rId,
        cstate: "print"
      });
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            rId: node.attributes["r:embed"]
          };
          return true;
        default:
          return true;
      }
    }
    parseText() {
    }
    parseClose(name) {
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }
  blipXform = BlipXform;
  return blipXform;
}
var blipFillXform;
var hasRequiredBlipFillXform;
function requireBlipFillXform() {
  if (hasRequiredBlipFillXform) return blipFillXform;
  hasRequiredBlipFillXform = 1;
  const BaseXform = requireBaseXform();
  const BlipXform = requireBlipXform();
  class BlipFillXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "a:blip": new BlipXform()
      };
    }
    get tag() {
      return "xdr:blipFill";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      this.map["a:blip"].render(xmlStream2, model);
      xmlStream2.openNode("a:stretch");
      xmlStream2.leafNode("a:fillRect");
      xmlStream2.closeNode();
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText() {
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model = this.map["a:blip"].model;
          return false;
        default:
          return true;
      }
    }
  }
  blipFillXform = BlipFillXform;
  return blipFillXform;
}
var hlinkClickXform;
var hasRequiredHlinkClickXform;
function requireHlinkClickXform() {
  if (hasRequiredHlinkClickXform) return hlinkClickXform;
  hasRequiredHlinkClickXform = 1;
  const BaseXform = requireBaseXform();
  class HLinkClickXform extends BaseXform {
    get tag() {
      return "a:hlinkClick";
    }
    render(xmlStream2, model) {
      if (!(model.hyperlinks && model.hyperlinks.rId)) {
        return;
      }
      xmlStream2.leafNode(this.tag, {
        "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        "r:id": model.hyperlinks.rId,
        tooltip: model.hyperlinks.tooltip
      });
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            hyperlinks: {
              rId: node.attributes["r:id"],
              tooltip: node.attributes.tooltip
            }
          };
          return true;
        default:
          return true;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  hlinkClickXform = HLinkClickXform;
  return hlinkClickXform;
}
var extLstXform;
var hasRequiredExtLstXform;
function requireExtLstXform() {
  if (hasRequiredExtLstXform) return extLstXform;
  hasRequiredExtLstXform = 1;
  const BaseXform = requireBaseXform();
  class ExtLstXform extends BaseXform {
    get tag() {
      return "a:extLst";
    }
    render(xmlStream2) {
      xmlStream2.openNode(this.tag);
      xmlStream2.openNode("a:ext", {
        uri: "{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}"
      });
      xmlStream2.leafNode("a16:creationId", {
        "xmlns:a16": "http://schemas.microsoft.com/office/drawing/2014/main",
        id: "{00000000-0008-0000-0000-000002000000}"
      });
      xmlStream2.closeNode();
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          return true;
        default:
          return true;
      }
    }
    parseText() {
    }
    parseClose(name) {
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }
  extLstXform = ExtLstXform;
  return extLstXform;
}
var cNvPrXform;
var hasRequiredCNvPrXform;
function requireCNvPrXform() {
  if (hasRequiredCNvPrXform) return cNvPrXform;
  hasRequiredCNvPrXform = 1;
  const BaseXform = requireBaseXform();
  const HlickClickXform = requireHlinkClickXform();
  const ExtLstXform = requireExtLstXform();
  class CNvPrXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "a:hlinkClick": new HlickClickXform(),
        "a:extLst": new ExtLstXform()
      };
    }
    get tag() {
      return "xdr:cNvPr";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, {
        id: model.index,
        name: `Picture ${model.index}`
      });
      this.map["a:hlinkClick"].render(xmlStream2, model);
      this.map["a:extLst"].render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText() {
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model = this.map["a:hlinkClick"].model;
          return false;
        default:
          return true;
      }
    }
  }
  cNvPrXform = CNvPrXform;
  return cNvPrXform;
}
var cNvPicPrXform;
var hasRequiredCNvPicPrXform;
function requireCNvPicPrXform() {
  if (hasRequiredCNvPicPrXform) return cNvPicPrXform;
  hasRequiredCNvPicPrXform = 1;
  const BaseXform = requireBaseXform();
  class CNvPicPrXform extends BaseXform {
    get tag() {
      return "xdr:cNvPicPr";
    }
    render(xmlStream2) {
      xmlStream2.openNode(this.tag);
      xmlStream2.leafNode("a:picLocks", {
        noChangeAspect: "1"
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          return true;
        default:
          return true;
      }
    }
    parseText() {
    }
    parseClose(name) {
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }
  cNvPicPrXform = CNvPicPrXform;
  return cNvPicPrXform;
}
var nvPicPrXform;
var hasRequiredNvPicPrXform;
function requireNvPicPrXform() {
  if (hasRequiredNvPicPrXform) return nvPicPrXform;
  hasRequiredNvPicPrXform = 1;
  const BaseXform = requireBaseXform();
  const CNvPrXform = requireCNvPrXform();
  const CNvPicPrXform = requireCNvPicPrXform();
  class NvPicPrXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "xdr:cNvPr": new CNvPrXform(),
        "xdr:cNvPicPr": new CNvPicPrXform()
      };
    }
    get tag() {
      return "xdr:nvPicPr";
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      this.map["xdr:cNvPr"].render(xmlStream2, model);
      this.map["xdr:cNvPicPr"].render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText() {
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model = this.map["xdr:cNvPr"].model;
          return false;
        default:
          return true;
      }
    }
  }
  nvPicPrXform = NvPicPrXform;
  return nvPicPrXform;
}
var spPr;
var hasRequiredSpPr;
function requireSpPr() {
  if (hasRequiredSpPr) return spPr;
  hasRequiredSpPr = 1;
  spPr = {
    tag: "xdr:spPr",
    c: [
      {
        tag: "a:xfrm",
        c: [
          { tag: "a:off", $: { x: "0", y: "0" } },
          { tag: "a:ext", $: { cx: "0", cy: "0" } }
        ]
      },
      {
        tag: "a:prstGeom",
        $: { prst: "rect" },
        c: [{ tag: "a:avLst" }]
      }
    ]
  };
  return spPr;
}
var picXform;
var hasRequiredPicXform;
function requirePicXform() {
  if (hasRequiredPicXform) return picXform;
  hasRequiredPicXform = 1;
  const BaseXform = requireBaseXform();
  const StaticXform = requireStaticXform();
  const BlipFillXform = requireBlipFillXform();
  const NvPicPrXform = requireNvPicPrXform();
  const spPrJSON = requireSpPr();
  class PicXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "xdr:nvPicPr": new NvPicPrXform(),
        "xdr:blipFill": new BlipFillXform(),
        "xdr:spPr": new StaticXform(spPrJSON)
      };
    }
    get tag() {
      return "xdr:pic";
    }
    prepare(model, options) {
      model.index = options.index + 1;
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      this.map["xdr:nvPicPr"].render(xmlStream2, model);
      this.map["xdr:blipFill"].render(xmlStream2, model);
      this.map["xdr:spPr"].render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText() {
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.mergeModel(this.parser.model);
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }
  picXform = PicXform;
  return picXform;
}
var twoCellAnchorXform;
var hasRequiredTwoCellAnchorXform;
function requireTwoCellAnchorXform() {
  if (hasRequiredTwoCellAnchorXform) return twoCellAnchorXform;
  hasRequiredTwoCellAnchorXform = 1;
  const BaseCellAnchorXform = requireBaseCellAnchorXform();
  const StaticXform = requireStaticXform();
  const CellPositionXform = requireCellPositionXform();
  const PicXform = requirePicXform();
  class TwoCellAnchorXform extends BaseCellAnchorXform {
    constructor() {
      super();
      this.map = {
        "xdr:from": new CellPositionXform({ tag: "xdr:from" }),
        "xdr:to": new CellPositionXform({ tag: "xdr:to" }),
        "xdr:pic": new PicXform(),
        "xdr:clientData": new StaticXform({ tag: "xdr:clientData" })
      };
    }
    get tag() {
      return "xdr:twoCellAnchor";
    }
    prepare(model, options) {
      this.map["xdr:pic"].prepare(model.picture, options);
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, { editAs: model.range.editAs || "oneCell" });
      this.map["xdr:from"].render(xmlStream2, model.range.tl);
      this.map["xdr:to"].render(xmlStream2, model.range.br);
      this.map["xdr:pic"].render(xmlStream2, model.picture);
      this.map["xdr:clientData"].render(xmlStream2, {});
      xmlStream2.closeNode();
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model.range.tl = this.map["xdr:from"].model;
          this.model.range.br = this.map["xdr:to"].model;
          this.model.picture = this.map["xdr:pic"].model;
          return false;
        default:
          return true;
      }
    }
    reconcile(model, options) {
      model.medium = this.reconcilePicture(model.picture, options);
    }
  }
  twoCellAnchorXform = TwoCellAnchorXform;
  return twoCellAnchorXform;
}
var extXform;
var hasRequiredExtXform;
function requireExtXform() {
  if (hasRequiredExtXform) return extXform;
  hasRequiredExtXform = 1;
  const BaseXform = requireBaseXform();
  const EMU_PER_PIXEL_AT_96_DPI = 9525;
  class ExtXform extends BaseXform {
    constructor(options) {
      super();
      this.tag = options.tag;
      this.map = {};
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag);
      const width = Math.floor(model.width * EMU_PER_PIXEL_AT_96_DPI);
      const height = Math.floor(model.height * EMU_PER_PIXEL_AT_96_DPI);
      xmlStream2.addAttribute("cx", width);
      xmlStream2.addAttribute("cy", height);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        this.model = {
          width: parseInt(node.attributes.cx || "0", 10) / EMU_PER_PIXEL_AT_96_DPI,
          height: parseInt(node.attributes.cy || "0", 10) / EMU_PER_PIXEL_AT_96_DPI
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  extXform = ExtXform;
  return extXform;
}
var oneCellAnchorXform;
var hasRequiredOneCellAnchorXform;
function requireOneCellAnchorXform() {
  if (hasRequiredOneCellAnchorXform) return oneCellAnchorXform;
  hasRequiredOneCellAnchorXform = 1;
  const BaseCellAnchorXform = requireBaseCellAnchorXform();
  const StaticXform = requireStaticXform();
  const CellPositionXform = requireCellPositionXform();
  const ExtXform = requireExtXform();
  const PicXform = requirePicXform();
  class OneCellAnchorXform extends BaseCellAnchorXform {
    constructor() {
      super();
      this.map = {
        "xdr:from": new CellPositionXform({ tag: "xdr:from" }),
        "xdr:ext": new ExtXform({ tag: "xdr:ext" }),
        "xdr:pic": new PicXform(),
        "xdr:clientData": new StaticXform({ tag: "xdr:clientData" })
      };
    }
    get tag() {
      return "xdr:oneCellAnchor";
    }
    prepare(model, options) {
      this.map["xdr:pic"].prepare(model.picture, options);
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, { editAs: model.range.editAs || "oneCell" });
      this.map["xdr:from"].render(xmlStream2, model.range.tl);
      this.map["xdr:ext"].render(xmlStream2, model.range.ext);
      this.map["xdr:pic"].render(xmlStream2, model.picture);
      this.map["xdr:clientData"].render(xmlStream2, {});
      xmlStream2.closeNode();
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model.range.tl = this.map["xdr:from"].model;
          this.model.range.ext = this.map["xdr:ext"].model;
          this.model.picture = this.map["xdr:pic"].model;
          return false;
        default:
          return true;
      }
    }
    reconcile(model, options) {
      model.medium = this.reconcilePicture(model.picture, options);
    }
  }
  oneCellAnchorXform = OneCellAnchorXform;
  return oneCellAnchorXform;
}
var drawingXform;
var hasRequiredDrawingXform;
function requireDrawingXform() {
  if (hasRequiredDrawingXform) return drawingXform;
  hasRequiredDrawingXform = 1;
  const colCache = requireColCache();
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const TwoCellAnchorXform = requireTwoCellAnchorXform();
  const OneCellAnchorXform = requireOneCellAnchorXform();
  function getAnchorType(model) {
    const range2 = typeof model.range === "string" ? colCache.decode(model.range) : model.range;
    return range2.br ? "xdr:twoCellAnchor" : "xdr:oneCellAnchor";
  }
  class DrawingXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "xdr:twoCellAnchor": new TwoCellAnchorXform(),
        "xdr:oneCellAnchor": new OneCellAnchorXform()
      };
    }
    prepare(model) {
      model.anchors.forEach((item, index) => {
        item.anchorType = getAnchorType(item);
        const anchor2 = this.map[item.anchorType];
        anchor2.prepare(item, { index });
      });
    }
    get tag() {
      return "xdr:wsDr";
    }
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode(this.tag, DrawingXform.DRAWING_ATTRIBUTES);
      model.anchors.forEach((item) => {
        const anchor2 = this.map[item.anchorType];
        anchor2.render(xmlStream2, item);
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          this.model = {
            anchors: []
          };
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.anchors.push(this.parser.model);
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
    reconcile(model, options) {
      model.anchors.forEach((anchor2) => {
        if (anchor2.br) {
          this.map["xdr:twoCellAnchor"].reconcile(anchor2, options);
        } else {
          this.map["xdr:oneCellAnchor"].reconcile(anchor2, options);
        }
      });
    }
  }
  DrawingXform.DRAWING_ATTRIBUTES = {
    "xmlns:xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
    "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main"
  };
  drawingXform = DrawingXform;
  return drawingXform;
}
var customFilterXform;
var hasRequiredCustomFilterXform;
function requireCustomFilterXform() {
  if (hasRequiredCustomFilterXform) return customFilterXform;
  hasRequiredCustomFilterXform = 1;
  const BaseXform = requireBaseXform();
  class CustomFilterXform extends BaseXform {
    get tag() {
      return "customFilter";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        val: model.val,
        operator: model.operator
      });
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        this.model = {
          val: node.attributes.val,
          operator: node.attributes.operator
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  customFilterXform = CustomFilterXform;
  return customFilterXform;
}
var filterXform;
var hasRequiredFilterXform;
function requireFilterXform() {
  if (hasRequiredFilterXform) return filterXform;
  hasRequiredFilterXform = 1;
  const BaseXform = requireBaseXform();
  class FilterXform extends BaseXform {
    get tag() {
      return "filter";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        val: model.val
      });
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        this.model = {
          val: node.attributes.val
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  filterXform = FilterXform;
  return filterXform;
}
var filterColumnXform;
var hasRequiredFilterColumnXform;
function requireFilterColumnXform() {
  if (hasRequiredFilterColumnXform) return filterColumnXform;
  hasRequiredFilterColumnXform = 1;
  const BaseXform = requireBaseXform();
  const ListXform = requireListXform();
  const CustomFilterXform = requireCustomFilterXform();
  const FilterXform = requireFilterXform();
  class FilterColumnXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        customFilters: new ListXform({
          tag: "customFilters",
          count: false,
          empty: true,
          childXform: new CustomFilterXform()
        }),
        filters: new ListXform({
          tag: "filters",
          count: false,
          empty: true,
          childXform: new FilterXform()
        })
      };
    }
    get tag() {
      return "filterColumn";
    }
    prepare(model, options) {
      model.colId = options.index.toString();
    }
    render(xmlStream2, model) {
      if (model.customFilters) {
        xmlStream2.openNode(this.tag, {
          colId: model.colId,
          hiddenButton: model.filterButton ? "0" : "1"
        });
        this.map.customFilters.render(xmlStream2, model.customFilters);
        xmlStream2.closeNode();
        return true;
      }
      xmlStream2.leafNode(this.tag, {
        colId: model.colId,
        hiddenButton: model.filterButton ? "0" : "1"
      });
      return true;
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      const { attributes } = node;
      switch (node.name) {
        case this.tag:
          this.model = {
            filterButton: attributes.hiddenButton === "0"
          };
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parseOpen(node);
            return true;
          }
          throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
      }
    }
    parseText() {
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model.customFilters = this.map.customFilters.model;
          return false;
        default:
          return true;
      }
    }
  }
  filterColumnXform = FilterColumnXform;
  return filterColumnXform;
}
var autoFilterXform;
var hasRequiredAutoFilterXform;
function requireAutoFilterXform() {
  if (hasRequiredAutoFilterXform) return autoFilterXform;
  hasRequiredAutoFilterXform = 1;
  const BaseXform = requireBaseXform();
  const FilterColumnXform = requireFilterColumnXform();
  class AutoFilterXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        filterColumn: new FilterColumnXform()
      };
    }
    get tag() {
      return "autoFilter";
    }
    prepare(model) {
      model.columns.forEach((column2, index) => {
        this.map.filterColumn.prepare(column2, { index });
      });
    }
    render(xmlStream2, model) {
      xmlStream2.openNode(this.tag, { ref: model.autoFilterRef });
      model.columns.forEach((column2) => {
        this.map.filterColumn.render(xmlStream2, column2);
      });
      xmlStream2.closeNode();
      return true;
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.model = {
            autoFilterRef: node.attributes.ref,
            columns: []
          };
          return true;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parseOpen(node);
            return true;
          }
          throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
      }
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.columns.push(this.parser.model);
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          return false;
        default:
          throw new Error(`Unexpected xml node in parseClose: ${name}`);
      }
    }
  }
  autoFilterXform = AutoFilterXform;
  return autoFilterXform;
}
var tableColumnXform;
var hasRequiredTableColumnXform;
function requireTableColumnXform() {
  if (hasRequiredTableColumnXform) return tableColumnXform;
  hasRequiredTableColumnXform = 1;
  const BaseXform = requireBaseXform();
  class TableColumnXform extends BaseXform {
    get tag() {
      return "tableColumn";
    }
    prepare(model, options) {
      model.id = options.index + 1;
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        id: model.id.toString(),
        name: model.name,
        totalsRowLabel: model.totalsRowLabel,
        totalsRowFunction: model.totalsRowFunction,
        dxfId: model.dxfId
      });
      return true;
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        const { attributes } = node;
        this.model = {
          name: attributes.name,
          totalsRowLabel: attributes.totalsRowLabel,
          totalsRowFunction: attributes.totalsRowFunction,
          dxfId: attributes.dxfId
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  tableColumnXform = TableColumnXform;
  return tableColumnXform;
}
var tableStyleInfoXform;
var hasRequiredTableStyleInfoXform;
function requireTableStyleInfoXform() {
  if (hasRequiredTableStyleInfoXform) return tableStyleInfoXform;
  hasRequiredTableStyleInfoXform = 1;
  const BaseXform = requireBaseXform();
  class TableStyleInfoXform extends BaseXform {
    get tag() {
      return "tableStyleInfo";
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, {
        name: model.theme ? model.theme : void 0,
        showFirstColumn: model.showFirstColumn ? "1" : "0",
        showLastColumn: model.showLastColumn ? "1" : "0",
        showRowStripes: model.showRowStripes ? "1" : "0",
        showColumnStripes: model.showColumnStripes ? "1" : "0"
      });
      return true;
    }
    parseOpen(node) {
      if (node.name === this.tag) {
        const { attributes } = node;
        this.model = {
          theme: attributes.name ? attributes.name : null,
          showFirstColumn: attributes.showFirstColumn === "1",
          showLastColumn: attributes.showLastColumn === "1",
          showRowStripes: attributes.showRowStripes === "1",
          showColumnStripes: attributes.showColumnStripes === "1"
        };
        return true;
      }
      return false;
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  tableStyleInfoXform = TableStyleInfoXform;
  return tableStyleInfoXform;
}
var tableXform;
var hasRequiredTableXform;
function requireTableXform() {
  if (hasRequiredTableXform) return tableXform;
  hasRequiredTableXform = 1;
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const ListXform = requireListXform();
  const AutoFilterXform = requireAutoFilterXform();
  const TableColumnXform = requireTableColumnXform();
  const TableStyleInfoXform = requireTableStyleInfoXform();
  class TableXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        autoFilter: new AutoFilterXform(),
        tableColumns: new ListXform({
          tag: "tableColumns",
          count: true,
          empty: true,
          childXform: new TableColumnXform()
        }),
        tableStyleInfo: new TableStyleInfoXform()
      };
    }
    prepare(model, options) {
      this.map.autoFilter.prepare(model);
      this.map.tableColumns.prepare(model.columns, options);
    }
    get tag() {
      return "table";
    }
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode(this.tag, {
        ...TableXform.TABLE_ATTRIBUTES,
        id: model.id,
        name: model.name,
        displayName: model.displayName || model.name,
        ref: model.tableRef,
        totalsRowCount: model.totalsRow ? "1" : void 0,
        totalsRowShown: model.totalsRow ? void 0 : "1",
        headerRowCount: model.headerRow ? "1" : "0"
      });
      this.map.autoFilter.render(xmlStream2, model);
      this.map.tableColumns.render(xmlStream2, model.columns);
      this.map.tableStyleInfo.render(xmlStream2, model.style);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      const { name, attributes } = node;
      switch (name) {
        case this.tag:
          this.reset();
          this.model = {
            name: attributes.name,
            displayName: attributes.displayName || attributes.name,
            tableRef: attributes.ref,
            totalsRow: attributes.totalsRowCount === "1",
            headerRow: attributes.headerRowCount === "1"
          };
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model.columns = this.map.tableColumns.model;
          if (this.map.autoFilter.model) {
            this.model.autoFilterRef = this.map.autoFilter.model.autoFilterRef;
            this.map.autoFilter.model.columns.forEach((column2, index) => {
              this.model.columns[index].filterButton = column2.filterButton;
            });
          }
          this.model.style = this.map.tableStyleInfo.model;
          return false;
        default:
          return true;
      }
    }
    reconcile(model, options) {
      model.columns.forEach((column2) => {
        if (column2.dxfId !== void 0) {
          column2.style = options.styles.getDxfStyle(column2.dxfId);
        }
      });
    }
  }
  TableXform.TABLE_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
    "mc:Ignorable": "xr xr3",
    "xmlns:xr": "http://schemas.microsoft.com/office/spreadsheetml/2014/revision",
    "xmlns:xr3": "http://schemas.microsoft.com/office/spreadsheetml/2016/revision3"
    // 'xr:uid': '{00000000-000C-0000-FFFF-FFFF00000000}',
  };
  tableXform = TableXform;
  return tableXform;
}
var commentsXform = { exports: {} };
var commentXform = { exports: {} };
var hasRequiredCommentXform;
function requireCommentXform() {
  if (hasRequiredCommentXform) return commentXform.exports;
  hasRequiredCommentXform = 1;
  const RichTextXform = requireRichTextXform();
  const utils = requireUtils();
  const BaseXform = requireBaseXform();
  const CommentXform = commentXform.exports = function(model) {
    this.model = model;
  };
  utils.inherits(CommentXform, BaseXform, {
    get tag() {
      return "r";
    },
    get richTextXform() {
      if (!this._richTextXform) {
        this._richTextXform = new RichTextXform();
      }
      return this._richTextXform;
    },
    render(xmlStream2, model) {
      model = model || this.model;
      xmlStream2.openNode("comment", {
        ref: model.ref,
        authorId: 0
      });
      xmlStream2.openNode("text");
      if (model && model.note && model.note.texts) {
        model.note.texts.forEach((text) => {
          this.richTextXform.render(xmlStream2, text);
        });
      }
      xmlStream2.closeNode();
      xmlStream2.closeNode();
    },
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case "comment":
          this.model = {
            type: "note",
            note: {
              texts: []
            },
            ...node.attributes
          };
          return true;
        case "r":
          this.parser = this.richTextXform;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    },
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    },
    parseClose(name) {
      switch (name) {
        case "comment":
          return false;
        case "r":
          this.model.note.texts.push(this.parser.model);
          this.parser = void 0;
          return true;
        default:
          if (this.parser) {
            this.parser.parseClose(name);
          }
          return true;
      }
    }
  });
  return commentXform.exports;
}
var hasRequiredCommentsXform;
function requireCommentsXform() {
  if (hasRequiredCommentsXform) return commentsXform.exports;
  hasRequiredCommentsXform = 1;
  const XmlStream = requireXmlStream();
  const utils = requireUtils();
  const BaseXform = requireBaseXform();
  const CommentXform = requireCommentXform();
  const CommentsXform = commentsXform.exports = function() {
    this.map = {
      comment: new CommentXform()
    };
  };
  utils.inherits(
    CommentsXform,
    BaseXform,
    {
      COMMENTS_ATTRIBUTES: {
        xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
      }
    },
    {
      render(xmlStream2, model) {
        model = model || this.model;
        xmlStream2.openXml(XmlStream.StdDocAttributes);
        xmlStream2.openNode("comments", CommentsXform.COMMENTS_ATTRIBUTES);
        xmlStream2.openNode("authors");
        xmlStream2.leafNode("author", null, "Author");
        xmlStream2.closeNode();
        xmlStream2.openNode("commentList");
        model.comments.forEach((comment) => {
          this.map.comment.render(xmlStream2, comment);
        });
        xmlStream2.closeNode();
        xmlStream2.closeNode();
      },
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case "commentList":
            this.model = {
              comments: []
            };
            return true;
          case "comment":
            this.parser = this.map.comment;
            this.parser.parseOpen(node);
            return true;
          default:
            return false;
        }
      },
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      },
      parseClose(name) {
        switch (name) {
          case "commentList":
            return false;
          case "comment":
            this.model.comments.push(this.parser.model);
            this.parser = void 0;
            return true;
          default:
            if (this.parser) {
              this.parser.parseClose(name);
            }
            return true;
        }
      }
    }
  );
  return commentsXform.exports;
}
var vmlTextboxXform;
var hasRequiredVmlTextboxXform;
function requireVmlTextboxXform() {
  if (hasRequiredVmlTextboxXform) return vmlTextboxXform;
  hasRequiredVmlTextboxXform = 1;
  const BaseXform = requireBaseXform();
  class VmlTextboxXform extends BaseXform {
    get tag() {
      return "v:textbox";
    }
    conversionUnit(value, multiple, unit) {
      return `${parseFloat(value) * multiple.toFixed(2)}${unit}`;
    }
    reverseConversionUnit(inset) {
      return (inset || "").split(",").map((margin) => {
        return Number(parseFloat(this.conversionUnit(parseFloat(margin), 0.1, "")).toFixed(2));
      });
    }
    render(xmlStream2, model) {
      const attributes = {
        style: "mso-direction-alt:auto"
      };
      if (model && model.note) {
        let { inset } = model.note && model.note.margins;
        if (Array.isArray(inset)) {
          inset = inset.map((margin) => {
            return this.conversionUnit(margin, 10, "mm");
          }).join(",");
        }
        if (inset) {
          attributes.inset = inset;
        }
      }
      xmlStream2.openNode("v:textbox", attributes);
      xmlStream2.leafNode("div", { style: "text-align:left" });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {
            inset: this.reverseConversionUnit(node.attributes.inset)
          };
          return true;
        default:
          return true;
      }
    }
    parseText() {
    }
    parseClose(name) {
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }
  vmlTextboxXform = VmlTextboxXform;
  return vmlTextboxXform;
}
var vmlAnchorXform;
var hasRequiredVmlAnchorXform;
function requireVmlAnchorXform() {
  if (hasRequiredVmlAnchorXform) return vmlAnchorXform;
  hasRequiredVmlAnchorXform = 1;
  const BaseXform = requireBaseXform();
  class VmlAnchorXform extends BaseXform {
    get tag() {
      return "x:Anchor";
    }
    getAnchorRect(anchor2) {
      const l = Math.floor(anchor2.left);
      const lf = Math.floor((anchor2.left - l) * 68);
      const t = Math.floor(anchor2.top);
      const tf = Math.floor((anchor2.top - t) * 18);
      const r = Math.floor(anchor2.right);
      const rf = Math.floor((anchor2.right - r) * 68);
      const b = Math.floor(anchor2.bottom);
      const bf = Math.floor((anchor2.bottom - b) * 18);
      return [l, lf, t, tf, r, rf, b, bf];
    }
    getDefaultRect(ref) {
      const l = ref.col;
      const lf = 6;
      const t = Math.max(ref.row - 2, 0);
      const tf = 14;
      const r = l + 2;
      const rf = 2;
      const b = t + 4;
      const bf = 16;
      return [l, lf, t, tf, r, rf, b, bf];
    }
    render(xmlStream2, model) {
      const rect = model.anchor ? this.getAnchorRect(model.anchor) : this.getDefaultRect(model.refAddress);
      xmlStream2.leafNode("x:Anchor", null, rect.join(", "));
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.text = "";
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      this.text = text;
    }
    parseClose() {
      return false;
    }
  }
  vmlAnchorXform = VmlAnchorXform;
  return vmlAnchorXform;
}
var vmlProtectionXform;
var hasRequiredVmlProtectionXform;
function requireVmlProtectionXform() {
  if (hasRequiredVmlProtectionXform) return vmlProtectionXform;
  hasRequiredVmlProtectionXform = 1;
  const BaseXform = requireBaseXform();
  class VmlProtectionXform extends BaseXform {
    constructor(model) {
      super();
      this._model = model;
    }
    get tag() {
      return this._model && this._model.tag;
    }
    render(xmlStream2, model) {
      xmlStream2.leafNode(this.tag, null, model);
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.text = "";
          return true;
        default:
          return false;
      }
    }
    parseText(text) {
      this.text = text;
    }
    parseClose() {
      return false;
    }
  }
  vmlProtectionXform = VmlProtectionXform;
  return vmlProtectionXform;
}
var vmlPositionXform;
var hasRequiredVmlPositionXform;
function requireVmlPositionXform() {
  if (hasRequiredVmlPositionXform) return vmlPositionXform;
  hasRequiredVmlPositionXform = 1;
  const BaseXform = requireBaseXform();
  class VmlPositionXform extends BaseXform {
    constructor(model) {
      super();
      this._model = model;
    }
    get tag() {
      return this._model && this._model.tag;
    }
    render(xmlStream2, model, type) {
      if (model === type[2]) {
        xmlStream2.leafNode(this.tag);
      } else if (this.tag === "x:SizeWithCells" && model === type[1]) {
        xmlStream2.leafNode(this.tag);
      }
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.model = {};
          this.model[this.tag] = true;
          return true;
        default:
          return false;
      }
    }
    parseText() {
    }
    parseClose() {
      return false;
    }
  }
  vmlPositionXform = VmlPositionXform;
  return vmlPositionXform;
}
var vmlClientDataXform;
var hasRequiredVmlClientDataXform;
function requireVmlClientDataXform() {
  if (hasRequiredVmlClientDataXform) return vmlClientDataXform;
  hasRequiredVmlClientDataXform = 1;
  const BaseXform = requireBaseXform();
  const VmlAnchorXform = requireVmlAnchorXform();
  const VmlProtectionXform = requireVmlProtectionXform();
  const VmlPositionXform = requireVmlPositionXform();
  const POSITION_TYPE = ["twoCells", "oneCells", "absolute"];
  class VmlClientDataXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "x:Anchor": new VmlAnchorXform(),
        "x:Locked": new VmlProtectionXform({ tag: "x:Locked" }),
        "x:LockText": new VmlProtectionXform({ tag: "x:LockText" }),
        "x:SizeWithCells": new VmlPositionXform({ tag: "x:SizeWithCells" }),
        "x:MoveWithCells": new VmlPositionXform({ tag: "x:MoveWithCells" })
      };
    }
    get tag() {
      return "x:ClientData";
    }
    render(xmlStream2, model) {
      const { protection, editAs } = model.note;
      xmlStream2.openNode(this.tag, { ObjectType: "Note" });
      this.map["x:MoveWithCells"].render(xmlStream2, editAs, POSITION_TYPE);
      this.map["x:SizeWithCells"].render(xmlStream2, editAs, POSITION_TYPE);
      this.map["x:Anchor"].render(xmlStream2, model);
      this.map["x:Locked"].render(xmlStream2, protection.locked);
      xmlStream2.leafNode("x:AutoFill", null, "False");
      this.map["x:LockText"].render(xmlStream2, protection.lockText);
      xmlStream2.leafNode("x:Row", null, model.refAddress.row - 1);
      xmlStream2.leafNode("x:Column", null, model.refAddress.col - 1);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      switch (node.name) {
        case this.tag:
          this.reset();
          this.model = {
            anchor: [],
            protection: {},
            editAs: ""
          };
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.normalizeModel();
          return false;
        default:
          return true;
      }
    }
    normalizeModel() {
      const position = Object.assign(
        {},
        this.map["x:MoveWithCells"].model,
        this.map["x:SizeWithCells"].model
      );
      const len = Object.keys(position).length;
      this.model.editAs = POSITION_TYPE[len];
      this.model.anchor = this.map["x:Anchor"].text;
      this.model.protection.locked = this.map["x:Locked"].text;
      this.model.protection.lockText = this.map["x:LockText"].text;
    }
  }
  vmlClientDataXform = VmlClientDataXform;
  return vmlClientDataXform;
}
var vmlShapeXform;
var hasRequiredVmlShapeXform;
function requireVmlShapeXform() {
  if (hasRequiredVmlShapeXform) return vmlShapeXform;
  hasRequiredVmlShapeXform = 1;
  const BaseXform = requireBaseXform();
  const VmlTextboxXform = requireVmlTextboxXform();
  const VmlClientDataXform = requireVmlClientDataXform();
  class VmlShapeXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "v:textbox": new VmlTextboxXform(),
        "x:ClientData": new VmlClientDataXform()
      };
    }
    get tag() {
      return "v:shape";
    }
    render(xmlStream2, model, index) {
      xmlStream2.openNode("v:shape", VmlShapeXform.V_SHAPE_ATTRIBUTES(model, index));
      xmlStream2.leafNode("v:fill", { color2: "infoBackground [80]" });
      xmlStream2.leafNode("v:shadow", { color: "none [81]", obscured: "t" });
      xmlStream2.leafNode("v:path", { "o:connecttype": "none" });
      this.map["v:textbox"].render(xmlStream2, model);
      this.map["x:ClientData"].render(xmlStream2, model);
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          this.model = {
            margins: {
              insetmode: node.attributes["o:insetmode"]
            },
            anchor: "",
            editAs: "",
            protection: {}
          };
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          this.model.margins.inset = this.map["v:textbox"].model && this.map["v:textbox"].model.inset;
          this.model.protection = this.map["x:ClientData"].model && this.map["x:ClientData"].model.protection;
          this.model.anchor = this.map["x:ClientData"].model && this.map["x:ClientData"].model.anchor;
          this.model.editAs = this.map["x:ClientData"].model && this.map["x:ClientData"].model.editAs;
          return false;
        default:
          return true;
      }
    }
  }
  VmlShapeXform.V_SHAPE_ATTRIBUTES = (model, index) => ({
    id: `_x0000_s${1025 + index}`,
    type: "#_x0000_t202",
    style: "position:absolute; margin-left:105.3pt;margin-top:10.5pt;width:97.8pt;height:59.1pt;z-index:1;visibility:hidden",
    fillcolor: "infoBackground [80]",
    strokecolor: "none [81]",
    "o:insetmode": model.note.margins && model.note.margins.insetmode
  });
  vmlShapeXform = VmlShapeXform;
  return vmlShapeXform;
}
var vmlNotesXform;
var hasRequiredVmlNotesXform;
function requireVmlNotesXform() {
  if (hasRequiredVmlNotesXform) return vmlNotesXform;
  hasRequiredVmlNotesXform = 1;
  const XmlStream = requireXmlStream();
  const BaseXform = requireBaseXform();
  const VmlShapeXform = requireVmlShapeXform();
  class VmlNotesXform extends BaseXform {
    constructor() {
      super();
      this.map = {
        "v:shape": new VmlShapeXform()
      };
    }
    get tag() {
      return "xml";
    }
    render(xmlStream2, model) {
      xmlStream2.openXml(XmlStream.StdDocAttributes);
      xmlStream2.openNode(this.tag, VmlNotesXform.DRAWING_ATTRIBUTES);
      xmlStream2.openNode("o:shapelayout", { "v:ext": "edit" });
      xmlStream2.leafNode("o:idmap", { "v:ext": "edit", data: 1 });
      xmlStream2.closeNode();
      xmlStream2.openNode("v:shapetype", {
        id: "_x0000_t202",
        coordsize: "21600,21600",
        "o:spt": 202,
        path: "m,l,21600r21600,l21600,xe"
      });
      xmlStream2.leafNode("v:stroke", { joinstyle: "miter" });
      xmlStream2.leafNode("v:path", { gradientshapeok: "t", "o:connecttype": "rect" });
      xmlStream2.closeNode();
      model.comments.forEach((item, index) => {
        this.map["v:shape"].render(xmlStream2, item, index);
      });
      xmlStream2.closeNode();
    }
    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case this.tag:
          this.reset();
          this.model = {
            comments: []
          };
          break;
        default:
          this.parser = this.map[node.name];
          if (this.parser) {
            this.parser.parseOpen(node);
          }
          break;
      }
      return true;
    }
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
    parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.comments.push(this.parser.model);
          this.parser = void 0;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
    reconcile(model, options) {
      model.anchors.forEach((anchor2) => {
        if (anchor2.br) {
          this.map["xdr:twoCellAnchor"].reconcile(anchor2, options);
        } else {
          this.map["xdr:oneCellAnchor"].reconcile(anchor2, options);
        }
      });
    }
  }
  VmlNotesXform.DRAWING_ATTRIBUTES = {
    "xmlns:v": "urn:schemas-microsoft-com:vml",
    "xmlns:o": "urn:schemas-microsoft-com:office:office",
    "xmlns:x": "urn:schemas-microsoft-com:office:excel"
  };
  vmlNotesXform = VmlNotesXform;
  return vmlNotesXform;
}
var theme1;
var hasRequiredTheme1;
function requireTheme1() {
  if (hasRequiredTheme1) return theme1;
  hasRequiredTheme1 = 1;
  theme1 = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"> <a:themeElements> <a:clrScheme name="Office"> <a:dk1> <a:sysClr val="windowText" lastClr="000000"/> </a:dk1> <a:lt1> <a:sysClr val="window" lastClr="FFFFFF"/> </a:lt1> <a:dk2> <a:srgbClr val="1F497D"/> </a:dk2> <a:lt2> <a:srgbClr val="EEECE1"/> </a:lt2> <a:accent1> <a:srgbClr val="4F81BD"/> </a:accent1> <a:accent2> <a:srgbClr val="C0504D"/> </a:accent2> <a:accent3> <a:srgbClr val="9BBB59"/> </a:accent3> <a:accent4> <a:srgbClr val="8064A2"/> </a:accent4> <a:accent5> <a:srgbClr val="4BACC6"/> </a:accent5> <a:accent6> <a:srgbClr val="F79646"/> </a:accent6> <a:hlink> <a:srgbClr val="0000FF"/> </a:hlink> <a:folHlink> <a:srgbClr val="800080"/> </a:folHlink> </a:clrScheme> <a:fontScheme name="Office"> <a:majorFont> <a:latin typeface="Cambria"/> <a:ea typeface=""/> <a:cs typeface=""/> <a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/> <a:font script="Hang" typeface="맑은 고딕"/> <a:font script="Hans" typeface="宋体"/> <a:font script="Hant" typeface="新細明體"/> <a:font script="Arab" typeface="Times New Roman"/> <a:font script="Hebr" typeface="Times New Roman"/> <a:font script="Thai" typeface="Tahoma"/> <a:font script="Ethi" typeface="Nyala"/> <a:font script="Beng" typeface="Vrinda"/> <a:font script="Gujr" typeface="Shruti"/> <a:font script="Khmr" typeface="MoolBoran"/> <a:font script="Knda" typeface="Tunga"/> <a:font script="Guru" typeface="Raavi"/> <a:font script="Cans" typeface="Euphemia"/> <a:font script="Cher" typeface="Plantagenet Cherokee"/> <a:font script="Yiii" typeface="Microsoft Yi Baiti"/> <a:font script="Tibt" typeface="Microsoft Himalaya"/> <a:font script="Thaa" typeface="MV Boli"/> <a:font script="Deva" typeface="Mangal"/> <a:font script="Telu" typeface="Gautami"/> <a:font script="Taml" typeface="Latha"/> <a:font script="Syrc" typeface="Estrangelo Edessa"/> <a:font script="Orya" typeface="Kalinga"/> <a:font script="Mlym" typeface="Kartika"/> <a:font script="Laoo" typeface="DokChampa"/> <a:font script="Sinh" typeface="Iskoola Pota"/> <a:font script="Mong" typeface="Mongolian Baiti"/> <a:font script="Viet" typeface="Times New Roman"/> <a:font script="Uigh" typeface="Microsoft Uighur"/> <a:font script="Geor" typeface="Sylfaen"/> </a:majorFont> <a:minorFont> <a:latin typeface="Calibri"/> <a:ea typeface=""/> <a:cs typeface=""/> <a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/> <a:font script="Hang" typeface="맑은 고딕"/> <a:font script="Hans" typeface="宋体"/> <a:font script="Hant" typeface="新細明體"/> <a:font script="Arab" typeface="Arial"/> <a:font script="Hebr" typeface="Arial"/> <a:font script="Thai" typeface="Tahoma"/> <a:font script="Ethi" typeface="Nyala"/> <a:font script="Beng" typeface="Vrinda"/> <a:font script="Gujr" typeface="Shruti"/> <a:font script="Khmr" typeface="DaunPenh"/> <a:font script="Knda" typeface="Tunga"/> <a:font script="Guru" typeface="Raavi"/> <a:font script="Cans" typeface="Euphemia"/> <a:font script="Cher" typeface="Plantagenet Cherokee"/> <a:font script="Yiii" typeface="Microsoft Yi Baiti"/> <a:font script="Tibt" typeface="Microsoft Himalaya"/> <a:font script="Thaa" typeface="MV Boli"/> <a:font script="Deva" typeface="Mangal"/> <a:font script="Telu" typeface="Gautami"/> <a:font script="Taml" typeface="Latha"/> <a:font script="Syrc" typeface="Estrangelo Edessa"/> <a:font script="Orya" typeface="Kalinga"/> <a:font script="Mlym" typeface="Kartika"/> <a:font script="Laoo" typeface="DokChampa"/> <a:font script="Sinh" typeface="Iskoola Pota"/> <a:font script="Mong" typeface="Mongolian Baiti"/> <a:font script="Viet" typeface="Arial"/> <a:font script="Uigh" typeface="Microsoft Uighur"/> <a:font script="Geor" typeface="Sylfaen"/> </a:minorFont> </a:fontScheme> <a:fmtScheme name="Office"> <a:fillStyleLst> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="50000"/> <a:satMod val="300000"/> </a:schemeClr> </a:gs> <a:gs pos="35000"> <a:schemeClr val="phClr"> <a:tint val="37000"/> <a:satMod val="300000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:tint val="15000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:lin ang="16200000" scaled="1"/> </a:gradFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="100000"/> <a:shade val="100000"/> <a:satMod val="130000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:tint val="50000"/> <a:shade val="100000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:lin ang="16200000" scaled="0"/> </a:gradFill> </a:fillStyleLst> <a:lnStyleLst> <a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"> <a:solidFill> <a:schemeClr val="phClr"> <a:shade val="95000"/> <a:satMod val="105000"/> </a:schemeClr> </a:solidFill> <a:prstDash val="solid"/> </a:ln> <a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:prstDash val="solid"/> </a:ln> <a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:prstDash val="solid"/> </a:ln> </a:lnStyleLst> <a:effectStyleLst> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"> <a:srgbClr val="000000"> <a:alpha val="38000"/> </a:srgbClr> </a:outerShdw> </a:effectLst> </a:effectStyle> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"> <a:srgbClr val="000000"> <a:alpha val="35000"/> </a:srgbClr> </a:outerShdw> </a:effectLst> </a:effectStyle> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"> <a:srgbClr val="000000"> <a:alpha val="35000"/> </a:srgbClr> </a:outerShdw> </a:effectLst> <a:scene3d> <a:camera prst="orthographicFront"> <a:rot lat="0" lon="0" rev="0"/> </a:camera> <a:lightRig rig="threePt" dir="t"> <a:rot lat="0" lon="0" rev="1200000"/> </a:lightRig> </a:scene3d> <a:sp3d> <a:bevelT w="63500" h="25400"/> </a:sp3d> </a:effectStyle> </a:effectStyleLst> <a:bgFillStyleLst> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="40000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> <a:gs pos="40000"> <a:schemeClr val="phClr"> <a:tint val="45000"/> <a:shade val="99000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:shade val="20000"/> <a:satMod val="255000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:path path="circle"> <a:fillToRect l="50000" t="-80000" r="50000" b="180000"/> </a:path> </a:gradFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="80000"/> <a:satMod val="300000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:shade val="30000"/> <a:satMod val="200000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:path path="circle"> <a:fillToRect l="50000" t="50000" r="50000" b="50000"/> </a:path> </a:gradFill> </a:bgFillStyleLst> </a:fmtScheme> </a:themeElements> <a:objectDefaults> <a:spDef> <a:spPr/> <a:bodyPr/> <a:lstStyle/> <a:style> <a:lnRef idx="1"> <a:schemeClr val="accent1"/> </a:lnRef> <a:fillRef idx="3"> <a:schemeClr val="accent1"/> </a:fillRef> <a:effectRef idx="2"> <a:schemeClr val="accent1"/> </a:effectRef> <a:fontRef idx="minor"> <a:schemeClr val="lt1"/> </a:fontRef> </a:style> </a:spDef> <a:lnDef> <a:spPr/> <a:bodyPr/> <a:lstStyle/> <a:style> <a:lnRef idx="2"> <a:schemeClr val="accent1"/> </a:lnRef> <a:fillRef idx="0"> <a:schemeClr val="accent1"/> </a:fillRef> <a:effectRef idx="1"> <a:schemeClr val="accent1"/> </a:effectRef> <a:fontRef idx="minor"> <a:schemeClr val="tx1"/> </a:fontRef> </a:style> </a:lnDef> </a:objectDefaults> <a:extraClrSchemeLst/> </a:theme>';
  return theme1;
}
var xlsx;
var hasRequiredXlsx;
function requireXlsx() {
  if (hasRequiredXlsx) return xlsx;
  hasRequiredXlsx = 1;
  const fs = require$$0$1;
  const JSZip = requireLib();
  const { PassThrough } = requireReadable();
  const ZipStream = requireZipStream();
  const StreamBuf = requireStreamBuf();
  const utils = requireUtils();
  const XmlStream = requireXmlStream();
  const { bufferToString } = requireBrowserBufferDecode();
  const StylesXform = requireStylesXform();
  const CoreXform = requireCoreXform();
  const SharedStringsXform = requireSharedStringsXform();
  const RelationshipsXform = requireRelationshipsXform();
  const ContentTypesXform = requireContentTypesXform();
  const AppXform = requireAppXform();
  const WorkbookXform = requireWorkbookXform();
  const WorksheetXform = requireWorksheetXform();
  const DrawingXform = requireDrawingXform();
  const TableXform = requireTableXform();
  const CommentsXform = requireCommentsXform();
  const VmlNotesXform = requireVmlNotesXform();
  const theme1Xml = requireTheme1();
  function fsReadFileAsync(filename, options) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, options, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  class XLSX {
    constructor(workbook2) {
      this.workbook = workbook2;
    }
    // ===============================================================================
    // Workbook
    // =========================================================================
    // Read
    async readFile(filename, options) {
      if (!await utils.fs.exists(filename)) {
        throw new Error(`File not found: ${filename}`);
      }
      const stream = fs.createReadStream(filename);
      try {
        const workbook2 = await this.read(stream, options);
        stream.close();
        return workbook2;
      } catch (error) {
        stream.close();
        throw error;
      }
    }
    parseRels(stream) {
      const xform = new RelationshipsXform();
      return xform.parseStream(stream);
    }
    parseWorkbook(stream) {
      const xform = new WorkbookXform();
      return xform.parseStream(stream);
    }
    parseSharedStrings(stream) {
      const xform = new SharedStringsXform();
      return xform.parseStream(stream);
    }
    reconcile(model, options) {
      const workbookXform2 = new WorkbookXform();
      const worksheetXform2 = new WorksheetXform(options);
      const drawingXform2 = new DrawingXform();
      const tableXform2 = new TableXform();
      workbookXform2.reconcile(model);
      const drawingOptions = {
        media: model.media,
        mediaIndex: model.mediaIndex
      };
      Object.keys(model.drawings).forEach((name) => {
        const drawing = model.drawings[name];
        const drawingRel = model.drawingRels[name];
        if (drawingRel) {
          drawingOptions.rels = drawingRel.reduce((o, rel) => {
            o[rel.Id] = rel;
            return o;
          }, {});
          (drawing.anchors || []).forEach((anchor2) => {
            const hyperlinks = anchor2.picture && anchor2.picture.hyperlinks;
            if (hyperlinks && drawingOptions.rels[hyperlinks.rId]) {
              hyperlinks.hyperlink = drawingOptions.rels[hyperlinks.rId].Target;
              delete hyperlinks.rId;
            }
          });
          drawingXform2.reconcile(drawing, drawingOptions);
        }
      });
      const tableOptions = {
        styles: model.styles
      };
      Object.values(model.tables).forEach((table2) => {
        tableXform2.reconcile(table2, tableOptions);
      });
      const sheetOptions = {
        styles: model.styles,
        sharedStrings: model.sharedStrings,
        media: model.media,
        mediaIndex: model.mediaIndex,
        date1904: model.properties && model.properties.date1904,
        drawings: model.drawings,
        comments: model.comments,
        tables: model.tables,
        vmlDrawings: model.vmlDrawings
      };
      model.worksheets.forEach((worksheet2) => {
        worksheet2.relationships = model.worksheetRels[worksheet2.sheetNo];
        worksheetXform2.reconcile(worksheet2, sheetOptions);
      });
      delete model.worksheetHash;
      delete model.worksheetRels;
      delete model.globalRels;
      delete model.sharedStrings;
      delete model.workbookRels;
      delete model.sheetDefs;
      delete model.styles;
      delete model.mediaIndex;
      delete model.drawings;
      delete model.drawingRels;
      delete model.vmlDrawings;
    }
    async _processWorksheetEntry(stream, model, sheetNo, options, path) {
      const xform = new WorksheetXform(options);
      const worksheet2 = await xform.parseStream(stream);
      worksheet2.sheetNo = sheetNo;
      model.worksheetHash[path] = worksheet2;
      model.worksheets.push(worksheet2);
    }
    async _processCommentEntry(stream, model, name) {
      const xform = new CommentsXform();
      const comments = await xform.parseStream(stream);
      model.comments[`../${name}.xml`] = comments;
    }
    async _processTableEntry(stream, model, name) {
      const xform = new TableXform();
      const table2 = await xform.parseStream(stream);
      model.tables[`../tables/${name}.xml`] = table2;
    }
    async _processWorksheetRelsEntry(stream, model, sheetNo) {
      const xform = new RelationshipsXform();
      const relationships = await xform.parseStream(stream);
      model.worksheetRels[sheetNo] = relationships;
    }
    async _processMediaEntry(entry, model, filename) {
      const lastDot = filename.lastIndexOf(".");
      if (lastDot >= 1) {
        const extension = filename.substr(lastDot + 1);
        const name = filename.substr(0, lastDot);
        await new Promise((resolve, reject) => {
          const streamBuf2 = new StreamBuf();
          streamBuf2.on("finish", () => {
            model.mediaIndex[filename] = model.media.length;
            model.mediaIndex[name] = model.media.length;
            const medium = {
              type: "image",
              name,
              extension,
              buffer: streamBuf2.toBuffer()
            };
            model.media.push(medium);
            resolve();
          });
          entry.on("error", (error) => {
            reject(error);
          });
          entry.pipe(streamBuf2);
        });
      }
    }
    async _processDrawingEntry(entry, model, name) {
      const xform = new DrawingXform();
      const drawing = await xform.parseStream(entry);
      model.drawings[name] = drawing;
    }
    async _processDrawingRelsEntry(entry, model, name) {
      const xform = new RelationshipsXform();
      const relationships = await xform.parseStream(entry);
      model.drawingRels[name] = relationships;
    }
    async _processVmlDrawingEntry(entry, model, name) {
      const xform = new VmlNotesXform();
      const vmlDrawing = await xform.parseStream(entry);
      model.vmlDrawings[`../drawings/${name}.vml`] = vmlDrawing;
    }
    async _processThemeEntry(entry, model, name) {
      await new Promise((resolve, reject) => {
        const stream = new StreamBuf();
        entry.on("error", reject);
        stream.on("error", reject);
        stream.on("finish", () => {
          model.themes[name] = stream.read().toString();
          resolve();
        });
        entry.pipe(stream);
      });
    }
    /**
     * @deprecated since version 4.0. You should use `#read` instead. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md
     */
    createInputStream() {
      throw new Error(
        "`XLSX#createInputStream` is deprecated. You should use `XLSX#read` instead. This method will be removed in version 5.0. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md"
      );
    }
    async read(stream, options) {
      if (!stream[Symbol.asyncIterator] && stream.pipe) {
        stream = stream.pipe(new PassThrough());
      }
      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      return this.load(Buffer.concat(chunks), options);
    }
    async load(data, options) {
      let buffer;
      if (options && options.base64) {
        buffer = Buffer.from(data.toString(), "base64");
      } else {
        buffer = data;
      }
      const model = {
        worksheets: [],
        worksheetHash: {},
        worksheetRels: [],
        themes: {},
        media: [],
        mediaIndex: {},
        drawings: {},
        drawingRels: {},
        comments: {},
        tables: {},
        vmlDrawings: {}
      };
      const zip = await JSZip.loadAsync(buffer);
      for (const entry of Object.values(zip.files)) {
        if (!entry.dir) {
          let entryName = entry.name;
          if (entryName[0] === "/") {
            entryName = entryName.substr(1);
          }
          let stream;
          if (entryName.match(/xl\/media\//) || // themes are not parsed as stream
          entryName.match(/xl\/theme\/([a-zA-Z0-9]+)[.]xml/)) {
            stream = new PassThrough();
            stream.write(await entry.async("nodebuffer"));
          } else {
            stream = new PassThrough({
              writableObjectMode: true,
              readableObjectMode: true
            });
            let content;
            if (process.browser) {
              content = bufferToString(await entry.async("nodebuffer"));
            } else {
              content = await entry.async("string");
            }
            const chunkSize = 16 * 1024;
            for (let i = 0; i < content.length; i += chunkSize) {
              stream.write(content.substring(i, i + chunkSize));
            }
          }
          stream.end();
          switch (entryName) {
            case "_rels/.rels":
              model.globalRels = await this.parseRels(stream);
              break;
            case "xl/workbook.xml": {
              const workbook2 = await this.parseWorkbook(stream);
              model.sheets = workbook2.sheets;
              model.definedNames = workbook2.definedNames;
              model.views = workbook2.views;
              model.properties = workbook2.properties;
              model.calcProperties = workbook2.calcProperties;
              break;
            }
            case "xl/_rels/workbook.xml.rels":
              model.workbookRels = await this.parseRels(stream);
              break;
            case "xl/sharedStrings.xml":
              model.sharedStrings = new SharedStringsXform();
              await model.sharedStrings.parseStream(stream);
              break;
            case "xl/styles.xml":
              model.styles = new StylesXform();
              await model.styles.parseStream(stream);
              break;
            case "docProps/app.xml": {
              const appXform2 = new AppXform();
              const appProperties = await appXform2.parseStream(stream);
              model.company = appProperties.company;
              model.manager = appProperties.manager;
              break;
            }
            case "docProps/core.xml": {
              const coreXform2 = new CoreXform();
              const coreProperties = await coreXform2.parseStream(stream);
              Object.assign(model, coreProperties);
              break;
            }
            default: {
              let match = entryName.match(/xl\/worksheets\/sheet(\d+)[.]xml/);
              if (match) {
                await this._processWorksheetEntry(stream, model, match[1], options, entryName);
                break;
              }
              match = entryName.match(/xl\/worksheets\/_rels\/sheet(\d+)[.]xml.rels/);
              if (match) {
                await this._processWorksheetRelsEntry(stream, model, match[1]);
                break;
              }
              match = entryName.match(/xl\/theme\/([a-zA-Z0-9]+)[.]xml/);
              if (match) {
                await this._processThemeEntry(stream, model, match[1]);
                break;
              }
              match = entryName.match(/xl\/media\/([a-zA-Z0-9]+[.][a-zA-Z0-9]{3,4})$/);
              if (match) {
                await this._processMediaEntry(stream, model, match[1]);
                break;
              }
              match = entryName.match(/xl\/drawings\/([a-zA-Z0-9]+)[.]xml/);
              if (match) {
                await this._processDrawingEntry(stream, model, match[1]);
                break;
              }
              match = entryName.match(/xl\/(comments\d+)[.]xml/);
              if (match) {
                await this._processCommentEntry(stream, model, match[1]);
                break;
              }
              match = entryName.match(/xl\/tables\/(table\d+)[.]xml/);
              if (match) {
                await this._processTableEntry(stream, model, match[1]);
                break;
              }
              match = entryName.match(/xl\/drawings\/_rels\/([a-zA-Z0-9]+)[.]xml[.]rels/);
              if (match) {
                await this._processDrawingRelsEntry(stream, model, match[1]);
                break;
              }
              match = entryName.match(/xl\/drawings\/(vmlDrawing\d+)[.]vml/);
              if (match) {
                await this._processVmlDrawingEntry(stream, model, match[1]);
                break;
              }
            }
          }
        }
      }
      this.reconcile(model, options);
      this.workbook.model = model;
      return this.workbook;
    }
    // =========================================================================
    // Write
    async addMedia(zip, model) {
      await Promise.all(
        model.media.map(async (medium) => {
          if (medium.type === "image") {
            const filename = `xl/media/${medium.name}.${medium.extension}`;
            if (medium.filename) {
              const data = await fsReadFileAsync(medium.filename);
              return zip.append(data, { name: filename });
            }
            if (medium.buffer) {
              return zip.append(medium.buffer, { name: filename });
            }
            if (medium.base64) {
              const dataimg64 = medium.base64;
              const content = dataimg64.substring(dataimg64.indexOf(",") + 1);
              return zip.append(content, { name: filename, base64: true });
            }
          }
          throw new Error("Unsupported media");
        })
      );
    }
    addDrawings(zip, model) {
      const drawingXform2 = new DrawingXform();
      const relsXform = new RelationshipsXform();
      model.worksheets.forEach((worksheet2) => {
        const { drawing } = worksheet2;
        if (drawing) {
          drawingXform2.prepare(drawing, {});
          let xml = drawingXform2.toXml(drawing);
          zip.append(xml, { name: `xl/drawings/${drawing.name}.xml` });
          xml = relsXform.toXml(drawing.rels);
          zip.append(xml, { name: `xl/drawings/_rels/${drawing.name}.xml.rels` });
        }
      });
    }
    addTables(zip, model) {
      const tableXform2 = new TableXform();
      model.worksheets.forEach((worksheet2) => {
        const { tables } = worksheet2;
        tables.forEach((table2) => {
          tableXform2.prepare(table2, {});
          const tableXml = tableXform2.toXml(table2);
          zip.append(tableXml, { name: `xl/tables/${table2.target}` });
        });
      });
    }
    async addContentTypes(zip, model) {
      const xform = new ContentTypesXform();
      const xml = xform.toXml(model);
      zip.append(xml, { name: "[Content_Types].xml" });
    }
    async addApp(zip, model) {
      const xform = new AppXform();
      const xml = xform.toXml(model);
      zip.append(xml, { name: "docProps/app.xml" });
    }
    async addCore(zip, model) {
      const coreXform2 = new CoreXform();
      zip.append(coreXform2.toXml(model), { name: "docProps/core.xml" });
    }
    async addThemes(zip, model) {
      const themes = model.themes || { theme1: theme1Xml };
      Object.keys(themes).forEach((name) => {
        const xml = themes[name];
        const path = `xl/theme/${name}.xml`;
        zip.append(xml, { name: path });
      });
    }
    async addOfficeRels(zip) {
      const xform = new RelationshipsXform();
      const xml = xform.toXml([
        { Id: "rId1", Type: XLSX.RelType.OfficeDocument, Target: "xl/workbook.xml" },
        { Id: "rId2", Type: XLSX.RelType.CoreProperties, Target: "docProps/core.xml" },
        { Id: "rId3", Type: XLSX.RelType.ExtenderProperties, Target: "docProps/app.xml" }
      ]);
      zip.append(xml, { name: "_rels/.rels" });
    }
    async addWorkbookRels(zip, model) {
      let count = 1;
      const relationships = [
        { Id: `rId${count++}`, Type: XLSX.RelType.Styles, Target: "styles.xml" },
        { Id: `rId${count++}`, Type: XLSX.RelType.Theme, Target: "theme/theme1.xml" }
      ];
      if (model.sharedStrings.count) {
        relationships.push({
          Id: `rId${count++}`,
          Type: XLSX.RelType.SharedStrings,
          Target: "sharedStrings.xml"
        });
      }
      model.worksheets.forEach((worksheet2) => {
        worksheet2.rId = `rId${count++}`;
        relationships.push({
          Id: worksheet2.rId,
          Type: XLSX.RelType.Worksheet,
          Target: `worksheets/sheet${worksheet2.id}.xml`
        });
      });
      const xform = new RelationshipsXform();
      const xml = xform.toXml(relationships);
      zip.append(xml, { name: "xl/_rels/workbook.xml.rels" });
    }
    async addSharedStrings(zip, model) {
      if (model.sharedStrings && model.sharedStrings.count) {
        zip.append(model.sharedStrings.xml, { name: "xl/sharedStrings.xml" });
      }
    }
    async addStyles(zip, model) {
      const { xml } = model.styles;
      if (xml) {
        zip.append(xml, { name: "xl/styles.xml" });
      }
    }
    async addWorkbook(zip, model) {
      const xform = new WorkbookXform();
      zip.append(xform.toXml(model), { name: "xl/workbook.xml" });
    }
    async addWorksheets(zip, model) {
      const worksheetXform2 = new WorksheetXform();
      const relationshipsXform2 = new RelationshipsXform();
      const commentsXform2 = new CommentsXform();
      const vmlNotesXform2 = new VmlNotesXform();
      model.worksheets.forEach((worksheet2) => {
        let xmlStream2 = new XmlStream();
        worksheetXform2.render(xmlStream2, worksheet2);
        zip.append(xmlStream2.xml, { name: `xl/worksheets/sheet${worksheet2.id}.xml` });
        if (worksheet2.rels && worksheet2.rels.length) {
          xmlStream2 = new XmlStream();
          relationshipsXform2.render(xmlStream2, worksheet2.rels);
          zip.append(xmlStream2.xml, { name: `xl/worksheets/_rels/sheet${worksheet2.id}.xml.rels` });
        }
        if (worksheet2.comments.length > 0) {
          xmlStream2 = new XmlStream();
          commentsXform2.render(xmlStream2, worksheet2);
          zip.append(xmlStream2.xml, { name: `xl/comments${worksheet2.id}.xml` });
          xmlStream2 = new XmlStream();
          vmlNotesXform2.render(xmlStream2, worksheet2);
          zip.append(xmlStream2.xml, { name: `xl/drawings/vmlDrawing${worksheet2.id}.vml` });
        }
      });
    }
    _finalize(zip) {
      return new Promise((resolve, reject) => {
        zip.on("finish", () => {
          resolve(this);
        });
        zip.on("error", reject);
        zip.finalize();
      });
    }
    prepareModel(model, options) {
      model.creator = model.creator || "ExcelJS";
      model.lastModifiedBy = model.lastModifiedBy || "ExcelJS";
      model.created = model.created || /* @__PURE__ */ new Date();
      model.modified = model.modified || /* @__PURE__ */ new Date();
      model.useSharedStrings = options.useSharedStrings !== void 0 ? options.useSharedStrings : true;
      model.useStyles = options.useStyles !== void 0 ? options.useStyles : true;
      model.sharedStrings = new SharedStringsXform();
      model.styles = model.useStyles ? new StylesXform(true) : new StylesXform.Mock();
      const workbookXform2 = new WorkbookXform();
      const worksheetXform2 = new WorksheetXform();
      workbookXform2.prepare(model);
      const worksheetOptions = {
        sharedStrings: model.sharedStrings,
        styles: model.styles,
        date1904: model.properties.date1904,
        drawingsCount: 0,
        media: model.media
      };
      worksheetOptions.drawings = model.drawings = [];
      worksheetOptions.commentRefs = model.commentRefs = [];
      let tableCount = 0;
      model.tables = [];
      model.worksheets.forEach((worksheet2) => {
        worksheet2.tables.forEach((table2) => {
          tableCount++;
          table2.target = `table${tableCount}.xml`;
          table2.id = tableCount;
          model.tables.push(table2);
        });
        worksheetXform2.prepare(worksheet2, worksheetOptions);
      });
    }
    async write(stream, options) {
      options = options || {};
      const { model } = this.workbook;
      const zip = new ZipStream.ZipWriter(options.zip);
      zip.pipe(stream);
      this.prepareModel(model, options);
      await this.addContentTypes(zip, model);
      await this.addOfficeRels(zip, model);
      await this.addWorkbookRels(zip, model);
      await this.addWorksheets(zip, model);
      await this.addSharedStrings(zip, model);
      await this.addDrawings(zip, model);
      await this.addTables(zip, model);
      await Promise.all([this.addThemes(zip, model), this.addStyles(zip, model)]);
      await this.addMedia(zip, model);
      await Promise.all([this.addApp(zip, model), this.addCore(zip, model)]);
      await this.addWorkbook(zip, model);
      return this._finalize(zip);
    }
    writeFile(filename, options) {
      const stream = fs.createWriteStream(filename);
      return new Promise((resolve, reject) => {
        stream.on("finish", () => {
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
        this.write(stream, options).then(() => {
          stream.end();
        }).catch((err) => {
          reject(err);
        });
      });
    }
    async writeBuffer(options) {
      const stream = new StreamBuf();
      await this.write(stream, options);
      return stream.read();
    }
  }
  XLSX.RelType = requireRelType();
  xlsx = XLSX;
  return xlsx;
}
var csv;
var hasRequiredCsv;
function requireCsv() {
  if (hasRequiredCsv) return csv;
  hasRequiredCsv = 1;
  const fs = require$$0$1;
  const fastCsv = requireSrc();
  const customParseFormat = requireCustomParseFormat();
  const utc = requireUtc();
  const dayjs = requireDayjs_min().extend(customParseFormat).extend(utc);
  const StreamBuf = requireStreamBuf();
  const {
    fs: { exists }
  } = requireUtils();
  const SpecialValues = {
    true: true,
    false: false,
    "#N/A": { error: "#N/A" },
    "#REF!": { error: "#REF!" },
    "#NAME?": { error: "#NAME?" },
    "#DIV/0!": { error: "#DIV/0!" },
    "#NULL!": { error: "#NULL!" },
    "#VALUE!": { error: "#VALUE!" },
    "#NUM!": { error: "#NUM!" }
  };
  class CSV {
    constructor(workbook2) {
      this.workbook = workbook2;
      this.worksheet = null;
    }
    async readFile(filename, options) {
      options = options || {};
      if (!await exists(filename)) {
        throw new Error(`File not found: ${filename}`);
      }
      const stream = fs.createReadStream(filename);
      const worksheet2 = await this.read(stream, options);
      stream.close();
      return worksheet2;
    }
    read(stream, options) {
      options = options || {};
      return new Promise((resolve, reject) => {
        const worksheet2 = this.workbook.addWorksheet(options.sheetName);
        const dateFormats = options.dateFormats || [
          "YYYY-MM-DD[T]HH:mm:ssZ",
          "YYYY-MM-DD[T]HH:mm:ss",
          "MM-DD-YYYY",
          "YYYY-MM-DD"
        ];
        const map = options.map || function(datum) {
          if (datum === "") {
            return null;
          }
          const datumNumber = Number(datum);
          if (!Number.isNaN(datumNumber) && datumNumber !== Infinity) {
            return datumNumber;
          }
          const dt = dateFormats.reduce((matchingDate, currentDateFormat) => {
            if (matchingDate) {
              return matchingDate;
            }
            const dayjsObj = dayjs(datum, currentDateFormat, true);
            if (dayjsObj.isValid()) {
              return dayjsObj;
            }
            return null;
          }, null);
          if (dt) {
            return new Date(dt.valueOf());
          }
          const special = SpecialValues[datum];
          if (special !== void 0) {
            return special;
          }
          return datum;
        };
        const csvStream = fastCsv.parse(options.parserOptions).on("data", (data) => {
          worksheet2.addRow(data.map(map));
        }).on("end", () => {
          csvStream.emit("worksheet", worksheet2);
        });
        csvStream.on("worksheet", resolve).on("error", reject);
        stream.pipe(csvStream);
      });
    }
    /**
     * @deprecated since version 4.0. You should use `CSV#read` instead. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md
     */
    createInputStream() {
      throw new Error(
        "`CSV#createInputStream` is deprecated. You should use `CSV#read` instead. This method will be removed in version 5.0. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md"
      );
    }
    write(stream, options) {
      return new Promise((resolve, reject) => {
        options = options || {};
        const worksheet2 = this.workbook.getWorksheet(options.sheetName || options.sheetId);
        const csvStream = fastCsv.format(options.formatterOptions);
        stream.on("finish", () => {
          resolve();
        });
        csvStream.on("error", reject);
        csvStream.pipe(stream);
        const { dateFormat, dateUTC } = options;
        const map = options.map || ((value) => {
          if (value) {
            if (value.text || value.hyperlink) {
              return value.hyperlink || value.text || "";
            }
            if (value.formula || value.result) {
              return value.result || "";
            }
            if (value instanceof Date) {
              if (dateFormat) {
                return dateUTC ? dayjs.utc(value).format(dateFormat) : dayjs(value).format(dateFormat);
              }
              return dateUTC ? dayjs.utc(value).format() : dayjs(value).format();
            }
            if (value.error) {
              return value.error;
            }
            if (typeof value === "object") {
              return JSON.stringify(value);
            }
          }
          return value;
        });
        const includeEmptyRows = options.includeEmptyRows === void 0 || options.includeEmptyRows;
        let lastRow = 1;
        if (worksheet2) {
          worksheet2.eachRow((row2, rowNumber) => {
            if (includeEmptyRows) {
              while (lastRow++ < rowNumber - 1) {
                csvStream.write([]);
              }
            }
            const { values } = row2;
            values.shift();
            csvStream.write(values.map(map));
            lastRow = rowNumber;
          });
        }
        csvStream.end();
      });
    }
    writeFile(filename, options) {
      options = options || {};
      const streamOptions = {
        encoding: options.encoding || "utf8"
      };
      const stream = fs.createWriteStream(filename, streamOptions);
      return this.write(stream, options);
    }
    async writeBuffer(options) {
      const stream = new StreamBuf();
      await this.write(stream, options);
      return stream.read();
    }
  }
  csv = CSV;
  return csv;
}
var workbook;
var hasRequiredWorkbook;
function requireWorkbook() {
  if (hasRequiredWorkbook) return workbook;
  hasRequiredWorkbook = 1;
  const Worksheet = requireWorksheet();
  const DefinedNames = requireDefinedNames();
  const XLSX = requireXlsx();
  const CSV = requireCsv();
  class Workbook {
    constructor() {
      this.category = "";
      this.company = "";
      this.created = /* @__PURE__ */ new Date();
      this.description = "";
      this.keywords = "";
      this.manager = "";
      this.modified = this.created;
      this.properties = {};
      this.calcProperties = {};
      this._worksheets = [];
      this.subject = "";
      this.title = "";
      this.views = [];
      this.media = [];
      this._definedNames = new DefinedNames();
    }
    get xlsx() {
      if (!this._xlsx) this._xlsx = new XLSX(this);
      return this._xlsx;
    }
    get csv() {
      if (!this._csv) this._csv = new CSV(this);
      return this._csv;
    }
    get nextId() {
      for (let i = 1; i < this._worksheets.length; i++) {
        if (!this._worksheets[i]) {
          return i;
        }
      }
      return this._worksheets.length || 1;
    }
    addWorksheet(name, options) {
      const id = this.nextId;
      if (options) {
        if (typeof options === "string") {
          console.trace(
            'tabColor argument is now deprecated. Please use workbook.addWorksheet(name, {properties: { tabColor: { argb: "rbg value" } }'
          );
          options = {
            properties: {
              tabColor: { argb: options }
            }
          };
        } else if (options.argb || options.theme || options.indexed) {
          console.trace(
            "tabColor argument is now deprecated. Please use workbook.addWorksheet(name, {properties: { tabColor: { ... } }"
          );
          options = {
            properties: {
              tabColor: options
            }
          };
        }
      }
      const lastOrderNo = this._worksheets.reduce((acc, ws) => (ws && ws.orderNo) > acc ? ws.orderNo : acc, 0);
      const worksheetOptions = Object.assign({}, options, {
        id,
        name,
        orderNo: lastOrderNo + 1,
        workbook: this
      });
      const worksheet2 = new Worksheet(worksheetOptions);
      this._worksheets[id] = worksheet2;
      return worksheet2;
    }
    removeWorksheetEx(worksheet2) {
      delete this._worksheets[worksheet2.id];
    }
    removeWorksheet(id) {
      const worksheet2 = this.getWorksheet(id);
      if (worksheet2) {
        worksheet2.destroy();
      }
    }
    getWorksheet(id) {
      if (id === void 0) {
        return this._worksheets.find(Boolean);
      }
      if (typeof id === "number") {
        return this._worksheets[id];
      }
      if (typeof id === "string") {
        return this._worksheets.find((worksheet2) => worksheet2 && worksheet2.name === id);
      }
      return void 0;
    }
    get worksheets() {
      return this._worksheets.slice(1).sort((a, b) => a.orderNo - b.orderNo).filter(Boolean);
    }
    eachSheet(iteratee) {
      this.worksheets.forEach((sheet) => {
        iteratee(sheet, sheet.id);
      });
    }
    get definedNames() {
      return this._definedNames;
    }
    clearThemes() {
      this._themes = void 0;
    }
    addImage(image2) {
      const id = this.media.length;
      this.media.push(Object.assign({}, image2, { type: "image" }));
      return id;
    }
    getImage(id) {
      return this.media[id];
    }
    get model() {
      return {
        creator: this.creator || "Unknown",
        lastModifiedBy: this.lastModifiedBy || "Unknown",
        lastPrinted: this.lastPrinted,
        created: this.created,
        modified: this.modified,
        properties: this.properties,
        worksheets: this.worksheets.map((worksheet2) => worksheet2.model),
        sheets: this.worksheets.map((ws) => ws.model).filter(Boolean),
        definedNames: this._definedNames.model,
        views: this.views,
        company: this.company,
        manager: this.manager,
        title: this.title,
        subject: this.subject,
        keywords: this.keywords,
        category: this.category,
        description: this.description,
        language: this.language,
        revision: this.revision,
        contentStatus: this.contentStatus,
        themes: this._themes,
        media: this.media,
        calcProperties: this.calcProperties
      };
    }
    set model(value) {
      this.creator = value.creator;
      this.lastModifiedBy = value.lastModifiedBy;
      this.lastPrinted = value.lastPrinted;
      this.created = value.created;
      this.modified = value.modified;
      this.company = value.company;
      this.manager = value.manager;
      this.title = value.title;
      this.subject = value.subject;
      this.keywords = value.keywords;
      this.category = value.category;
      this.description = value.description;
      this.language = value.language;
      this.revision = value.revision;
      this.contentStatus = value.contentStatus;
      this.properties = value.properties;
      this.calcProperties = value.calcProperties;
      this._worksheets = [];
      value.worksheets.forEach((worksheetModel) => {
        const { id, name, state } = worksheetModel;
        const orderNo = value.sheets && value.sheets.findIndex((ws) => ws.id === id);
        const worksheet2 = this._worksheets[id] = new Worksheet({
          id,
          name,
          orderNo,
          state,
          workbook: this
        });
        worksheet2.model = worksheetModel;
      });
      this._definedNames.model = value.definedNames;
      this.views = value.views;
      this._themes = value.themes;
      this.media = value.media || [];
    }
  }
  workbook = Workbook;
  return workbook;
}
var modelcontainer;
var hasRequiredModelcontainer;
function requireModelcontainer() {
  if (hasRequiredModelcontainer) return modelcontainer;
  hasRequiredModelcontainer = 1;
  const XLSX = requireXlsx();
  class ModelContainer {
    constructor(model) {
      this.model = model;
    }
    get xlsx() {
      if (!this._xlsx) {
        this._xlsx = new XLSX(this);
      }
      return this._xlsx;
    }
  }
  modelcontainer = ModelContainer;
  return modelcontainer;
}
var sharedStrings;
var hasRequiredSharedStrings;
function requireSharedStrings() {
  if (hasRequiredSharedStrings) return sharedStrings;
  hasRequiredSharedStrings = 1;
  class SharedStrings {
    constructor() {
      this._values = [];
      this._totalRefs = 0;
      this._hash = /* @__PURE__ */ Object.create(null);
    }
    get count() {
      return this._values.length;
    }
    get values() {
      return this._values;
    }
    get totalRefs() {
      return this._totalRefs;
    }
    getString(index) {
      return this._values[index];
    }
    add(value) {
      let index = this._hash[value];
      if (index === void 0) {
        index = this._hash[value] = this._values.length;
        this._values.push(value);
      }
      this._totalRefs++;
      return index;
    }
  }
  sharedStrings = SharedStrings;
  return sharedStrings;
}
var sheetRelsWriter;
var hasRequiredSheetRelsWriter;
function requireSheetRelsWriter() {
  if (hasRequiredSheetRelsWriter) return sheetRelsWriter;
  hasRequiredSheetRelsWriter = 1;
  const utils = requireUtils();
  const RelType = requireRelType();
  class HyperlinksProxy {
    constructor(sheetRelsWriter2) {
      this.writer = sheetRelsWriter2;
    }
    push(hyperlink) {
      this.writer.addHyperlink(hyperlink);
    }
  }
  class SheetRelsWriter {
    constructor(options) {
      this.id = options.id;
      this.count = 0;
      this._hyperlinks = [];
      this._workbook = options.workbook;
    }
    get stream() {
      if (!this._stream) {
        this._stream = this._workbook._openStream(`/xl/worksheets/_rels/sheet${this.id}.xml.rels`);
      }
      return this._stream;
    }
    get length() {
      return this._hyperlinks.length;
    }
    each(fn) {
      return this._hyperlinks.forEach(fn);
    }
    get hyperlinksProxy() {
      return this._hyperlinksProxy || (this._hyperlinksProxy = new HyperlinksProxy(this));
    }
    addHyperlink(hyperlink) {
      const relationship = {
        Target: hyperlink.target,
        Type: RelType.Hyperlink,
        TargetMode: "External"
      };
      const rId = this._writeRelationship(relationship);
      this._hyperlinks.push({
        rId,
        address: hyperlink.address
      });
    }
    addMedia(media) {
      return this._writeRelationship(media);
    }
    addRelationship(rel) {
      return this._writeRelationship(rel);
    }
    commit() {
      if (this.count) {
        this._writeClose();
        this.stream.end();
      }
    }
    // ================================================================================
    _writeOpen() {
      this.stream.write(
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
       <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`
      );
    }
    _writeRelationship(relationship) {
      if (!this.count) {
        this._writeOpen();
      }
      const rId = `rId${++this.count}`;
      if (relationship.TargetMode) {
        this.stream.write(
          `<Relationship Id="${rId}" Type="${relationship.Type}" Target="${utils.xmlEncode(relationship.Target)}" TargetMode="${relationship.TargetMode}"/>`
        );
      } else {
        this.stream.write(
          `<Relationship Id="${rId}" Type="${relationship.Type}" Target="${relationship.Target}"/>`
        );
      }
      return rId;
    }
    _writeClose() {
      this.stream.write("</Relationships>");
    }
  }
  sheetRelsWriter = SheetRelsWriter;
  return sheetRelsWriter;
}
var sheetCommentsWriter;
var hasRequiredSheetCommentsWriter;
function requireSheetCommentsWriter() {
  if (hasRequiredSheetCommentsWriter) return sheetCommentsWriter;
  hasRequiredSheetCommentsWriter = 1;
  const XmlStream = requireXmlStream();
  const RelType = requireRelType();
  const colCache = requireColCache();
  const CommentXform = requireCommentXform();
  const VmlShapeXform = requireVmlShapeXform();
  class SheetCommentsWriter {
    constructor(worksheet2, sheetRelsWriter2, options) {
      this.id = options.id;
      this.count = 0;
      this._worksheet = worksheet2;
      this._workbook = options.workbook;
      this._sheetRelsWriter = sheetRelsWriter2;
    }
    get commentsStream() {
      if (!this._commentsStream) {
        this._commentsStream = this._workbook._openStream(`/xl/comments${this.id}.xml`);
      }
      return this._commentsStream;
    }
    get vmlStream() {
      if (!this._vmlStream) {
        this._vmlStream = this._workbook._openStream(`xl/drawings/vmlDrawing${this.id}.vml`);
      }
      return this._vmlStream;
    }
    _addRelationships() {
      const commentRel = {
        Type: RelType.Comments,
        Target: `../comments${this.id}.xml`
      };
      this._sheetRelsWriter.addRelationship(commentRel);
      const vmlDrawingRel = {
        Type: RelType.VmlDrawing,
        Target: `../drawings/vmlDrawing${this.id}.vml`
      };
      this.vmlRelId = this._sheetRelsWriter.addRelationship(vmlDrawingRel);
    }
    _addCommentRefs() {
      this._workbook.commentRefs.push({
        commentName: `comments${this.id}`,
        vmlDrawing: `vmlDrawing${this.id}`
      });
    }
    _writeOpen() {
      this.commentsStream.write(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><comments xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><authors><author>Author</author></authors><commentList>'
      );
      this.vmlStream.write(
        '<?xml version="1.0" encoding="UTF-8"?><xml xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:x="urn:schemas-microsoft-com:office:excel"><o:shapelayout v:ext="edit"><o:idmap v:ext="edit" data="1" /></o:shapelayout><v:shapetype id="_x0000_t202" coordsize="21600,21600" o:spt="202" path="m,l,21600r21600,l21600,xe"><v:stroke joinstyle="miter" /><v:path gradientshapeok="t" o:connecttype="rect" /></v:shapetype>'
      );
    }
    _writeComment(comment, index) {
      const commentXform2 = new CommentXform();
      const commentsXmlStream = new XmlStream();
      commentXform2.render(commentsXmlStream, comment);
      this.commentsStream.write(commentsXmlStream.xml);
      const vmlShapeXform2 = new VmlShapeXform();
      const vmlXmlStream = new XmlStream();
      vmlShapeXform2.render(vmlXmlStream, comment, index);
      this.vmlStream.write(vmlXmlStream.xml);
    }
    _writeClose() {
      this.commentsStream.write("</commentList></comments>");
      this.vmlStream.write("</xml>");
    }
    addComments(comments) {
      if (comments && comments.length) {
        if (!this.startedData) {
          this._worksheet.comments = [];
          this._writeOpen();
          this._addRelationships();
          this._addCommentRefs();
          this.startedData = true;
        }
        comments.forEach((item) => {
          item.refAddress = colCache.decodeAddress(item.ref);
        });
        comments.forEach((comment) => {
          this._writeComment(comment, this.count);
          this.count += 1;
        });
      }
    }
    commit() {
      if (this.count) {
        this._writeClose();
        this.commentsStream.end();
        this.vmlStream.end();
      }
    }
  }
  sheetCommentsWriter = SheetCommentsWriter;
  return sheetCommentsWriter;
}
var worksheetWriter;
var hasRequiredWorksheetWriter;
function requireWorksheetWriter() {
  if (hasRequiredWorksheetWriter) return worksheetWriter;
  hasRequiredWorksheetWriter = 1;
  const _ = requireUnderDash();
  const RelType = requireRelType();
  const colCache = requireColCache();
  const Encryptor = requireEncryptor();
  const Dimensions = requireRange();
  const StringBuf = requireStringBuf();
  const Row = requireRow();
  const Column = requireColumn();
  const SheetRelsWriter = requireSheetRelsWriter();
  const SheetCommentsWriter = requireSheetCommentsWriter();
  const DataValidations = requireDataValidations();
  const xmlBuffer = new StringBuf();
  const ListXform = requireListXform();
  const DataValidationsXform = requireDataValidationsXform();
  const SheetPropertiesXform = requireSheetPropertiesXform();
  const SheetFormatPropertiesXform = requireSheetFormatPropertiesXform();
  const ColXform = requireColXform();
  const RowXform = requireRowXform();
  const HyperlinkXform = requireHyperlinkXform();
  const SheetViewXform = requireSheetViewXform();
  const SheetProtectionXform = requireSheetProtectionXform();
  const PageMarginsXform = requirePageMarginsXform();
  const PageSetupXform = requirePageSetupXform();
  const AutoFilterXform = requireAutoFilterXform$1();
  const PictureXform = requirePictureXform();
  const ConditionalFormattingsXform = requireConditionalFormattingsXform();
  const HeaderFooterXform = requireHeaderFooterXform();
  const RowBreaksXform = requireRowBreaksXform();
  const xform = {
    dataValidations: new DataValidationsXform(),
    sheetProperties: new SheetPropertiesXform(),
    sheetFormatProperties: new SheetFormatPropertiesXform(),
    columns: new ListXform({ tag: "cols", length: false, childXform: new ColXform() }),
    row: new RowXform(),
    hyperlinks: new ListXform({ tag: "hyperlinks", length: false, childXform: new HyperlinkXform() }),
    sheetViews: new ListXform({ tag: "sheetViews", length: false, childXform: new SheetViewXform() }),
    sheetProtection: new SheetProtectionXform(),
    pageMargins: new PageMarginsXform(),
    pageSeteup: new PageSetupXform(),
    autoFilter: new AutoFilterXform(),
    picture: new PictureXform(),
    conditionalFormattings: new ConditionalFormattingsXform(),
    headerFooter: new HeaderFooterXform(),
    rowBreaks: new RowBreaksXform()
  };
  class WorksheetWriter {
    constructor(options) {
      this.id = options.id;
      this.name = options.name || `Sheet${this.id}`;
      this.state = options.state || "visible";
      this._rows = [];
      this._columns = null;
      this._keys = {};
      this._merges = [];
      this._merges.add = function() {
      };
      this._sheetRelsWriter = new SheetRelsWriter(options);
      this._sheetCommentsWriter = new SheetCommentsWriter(this, this._sheetRelsWriter, options);
      this._dimensions = new Dimensions();
      this._rowZero = 1;
      this.committed = false;
      this.dataValidations = new DataValidations();
      this._formulae = {};
      this._siFormulae = 0;
      this.conditionalFormatting = [];
      this.rowBreaks = [];
      this.properties = Object.assign(
        {},
        {
          defaultRowHeight: 15,
          dyDescent: 55,
          outlineLevelCol: 0,
          outlineLevelRow: 0
        },
        options.properties
      );
      this.headerFooter = Object.assign(
        {},
        {
          differentFirst: false,
          differentOddEven: false,
          oddHeader: null,
          oddFooter: null,
          evenHeader: null,
          evenFooter: null,
          firstHeader: null,
          firstFooter: null
        },
        options.headerFooter
      );
      this.pageSetup = Object.assign(
        {},
        {
          margins: { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 },
          orientation: "portrait",
          horizontalDpi: 4294967295,
          verticalDpi: 4294967295,
          fitToPage: !!(options.pageSetup && (options.pageSetup.fitToWidth || options.pageSetup.fitToHeight) && !options.pageSetup.scale),
          pageOrder: "downThenOver",
          blackAndWhite: false,
          draft: false,
          cellComments: "None",
          errors: "displayed",
          scale: 100,
          fitToWidth: 1,
          fitToHeight: 1,
          paperSize: void 0,
          showRowColHeaders: false,
          showGridLines: false,
          horizontalCentered: false,
          verticalCentered: false,
          rowBreaks: null,
          colBreaks: null
        },
        options.pageSetup
      );
      this.useSharedStrings = options.useSharedStrings || false;
      this._workbook = options.workbook;
      this.hasComments = false;
      this._views = options.views || [];
      this.autoFilter = options.autoFilter || null;
      this._media = [];
      this.sheetProtection = null;
      this._writeOpenWorksheet();
      this.startedData = false;
    }
    get workbook() {
      return this._workbook;
    }
    get stream() {
      if (!this._stream) {
        this._stream = this._workbook._openStream(`/xl/worksheets/sheet${this.id}.xml`);
        this._stream.pause();
      }
      return this._stream;
    }
    // destroy - not a valid operation for a streaming writer
    // even though some streamers might be able to, it's a bad idea.
    destroy() {
      throw new Error("Invalid Operation: destroy");
    }
    commit() {
      if (this.committed) {
        return;
      }
      this._rows.forEach((cRow) => {
        if (cRow) {
          this._writeRow(cRow);
        }
      });
      this._rows = null;
      if (!this.startedData) {
        this._writeOpenSheetData();
      }
      this._writeCloseSheetData();
      this._writeAutoFilter();
      this._writeMergeCells();
      this._writeHyperlinks();
      this._writeConditionalFormatting();
      this._writeDataValidations();
      this._writeSheetProtection();
      this._writePageMargins();
      this._writePageSetup();
      this._writeBackground();
      this._writeHeaderFooter();
      this._writeRowBreaks();
      this._writeLegacyData();
      this._writeCloseWorksheet();
      this.stream.end();
      this._sheetCommentsWriter.commit();
      this._sheetRelsWriter.commit();
      this.committed = true;
    }
    // return the current dimensions of the writer
    get dimensions() {
      return this._dimensions;
    }
    get views() {
      return this._views;
    }
    // =========================================================================
    // Columns
    // get the current columns array.
    get columns() {
      return this._columns;
    }
    // set the columns from an array of column definitions.
    // Note: any headers defined will overwrite existing values.
    set columns(value) {
      this._headerRowCount = value.reduce((pv, cv) => {
        const headerCount = cv.header && 1 || cv.headers && cv.headers.length || 0;
        return Math.max(pv, headerCount);
      }, 0);
      let count = 1;
      const columns = this._columns = [];
      value.forEach((defn) => {
        const column2 = new Column(this, count++, false);
        columns.push(column2);
        column2.defn = defn;
      });
    }
    getColumnKey(key) {
      return this._keys[key];
    }
    setColumnKey(key, value) {
      this._keys[key] = value;
    }
    deleteColumnKey(key) {
      delete this._keys[key];
    }
    eachColumnKey(f) {
      _.each(this._keys, f);
    }
    // get a single column by col number. If it doesn't exist, it and any gaps before it
    // are created.
    getColumn(c) {
      if (typeof c === "string") {
        const col = this._keys[c];
        if (col) return col;
        c = colCache.l2n(c);
      }
      if (!this._columns) {
        this._columns = [];
      }
      if (c > this._columns.length) {
        let n = this._columns.length + 1;
        while (n <= c) {
          this._columns.push(new Column(this, n++));
        }
      }
      return this._columns[c - 1];
    }
    // =========================================================================
    // Rows
    get _nextRow() {
      return this._rowZero + this._rows.length;
    }
    // iterate over every uncommitted row in the worksheet, including maybe empty rows
    eachRow(options, iteratee) {
      if (!iteratee) {
        iteratee = options;
        options = void 0;
      }
      if (options && options.includeEmpty) {
        const n = this._nextRow;
        for (let i = this._rowZero; i < n; i++) {
          iteratee(this.getRow(i), i);
        }
      } else {
        this._rows.forEach((row2) => {
          if (row2.hasValues) {
            iteratee(row2, row2.number);
          }
        });
      }
    }
    _commitRow(cRow) {
      let found = false;
      while (this._rows.length && !found) {
        const row2 = this._rows.shift();
        this._rowZero++;
        if (row2) {
          this._writeRow(row2);
          found = row2.number === cRow.number;
          this._rowZero = row2.number + 1;
        }
      }
    }
    get lastRow() {
      if (this._rows.length) {
        return this._rows[this._rows.length - 1];
      }
      return void 0;
    }
    // find a row (if exists) by row number
    findRow(rowNumber) {
      const index = rowNumber - this._rowZero;
      return this._rows[index];
    }
    getRow(rowNumber) {
      const index = rowNumber - this._rowZero;
      if (index < 0) {
        throw new Error("Out of bounds: this row has been committed");
      }
      let row2 = this._rows[index];
      if (!row2) {
        this._rows[index] = row2 = new Row(this, rowNumber);
      }
      return row2;
    }
    addRow(value) {
      const row2 = new Row(this, this._nextRow);
      this._rows[row2.number - this._rowZero] = row2;
      row2.values = value;
      return row2;
    }
    // ================================================================================
    // Cells
    // returns the cell at [r,c] or address given by r. If not found, return undefined
    findCell(r, c) {
      const address = colCache.getAddress(r, c);
      const row2 = this.findRow(address.row);
      return row2 ? row2.findCell(address.column) : void 0;
    }
    // return the cell at [r,c] or address given by r. If not found, create a new one.
    getCell(r, c) {
      const address = colCache.getAddress(r, c);
      const row2 = this.getRow(address.row);
      return row2.getCellEx(address);
    }
    mergeCells(...cells) {
      const dimensions = new Dimensions(cells);
      this._merges.forEach((merge) => {
        if (merge.intersects(dimensions)) {
          throw new Error("Cannot merge already merged cells");
        }
      });
      const master = this.getCell(dimensions.top, dimensions.left);
      for (let i = dimensions.top; i <= dimensions.bottom; i++) {
        for (let j = dimensions.left; j <= dimensions.right; j++) {
          if (i > dimensions.top || j > dimensions.left) {
            this.getCell(i, j).merge(master);
          }
        }
      }
      this._merges.push(dimensions);
    }
    // ===========================================================================
    // Conditional Formatting
    addConditionalFormatting(cf) {
      this.conditionalFormatting.push(cf);
    }
    removeConditionalFormatting(filter) {
      if (typeof filter === "number") {
        this.conditionalFormatting.splice(filter, 1);
      } else if (filter instanceof Function) {
        this.conditionalFormatting = this.conditionalFormatting.filter(filter);
      } else {
        this.conditionalFormatting = [];
      }
    }
    // =========================================================================
    addBackgroundImage(imageId) {
      this._background = {
        imageId
      };
    }
    getBackgroundImageId() {
      return this._background && this._background.imageId;
    }
    // =========================================================================
    // Worksheet Protection
    protect(password, options) {
      return new Promise((resolve) => {
        this.sheetProtection = {
          sheet: true
        };
        if (options && "spinCount" in options) {
          options.spinCount = Number.isFinite(options.spinCount) ? Math.round(Math.max(0, options.spinCount)) : 1e5;
        }
        if (password) {
          this.sheetProtection.algorithmName = "SHA-512";
          this.sheetProtection.saltValue = Encryptor.randomBytes(16).toString("base64");
          this.sheetProtection.spinCount = options && "spinCount" in options ? options.spinCount : 1e5;
          this.sheetProtection.hashValue = Encryptor.convertPasswordToHash(
            password,
            "SHA512",
            this.sheetProtection.saltValue,
            this.sheetProtection.spinCount
          );
        }
        if (options) {
          this.sheetProtection = Object.assign(this.sheetProtection, options);
          if (!password && "spinCount" in options) {
            delete this.sheetProtection.spinCount;
          }
        }
        resolve();
      });
    }
    unprotect() {
      this.sheetProtection = null;
    }
    // ================================================================================
    _write(text) {
      xmlBuffer.reset();
      xmlBuffer.addText(text);
      this.stream.write(xmlBuffer);
    }
    _writeSheetProperties(xmlBuf, properties, pageSetup) {
      const sheetPropertiesModel = {
        outlineProperties: properties && properties.outlineProperties,
        tabColor: properties && properties.tabColor,
        pageSetup: pageSetup && pageSetup.fitToPage ? {
          fitToPage: pageSetup.fitToPage
        } : void 0
      };
      xmlBuf.addText(xform.sheetProperties.toXml(sheetPropertiesModel));
    }
    _writeSheetFormatProperties(xmlBuf, properties) {
      const sheetFormatPropertiesModel = properties ? {
        defaultRowHeight: properties.defaultRowHeight,
        dyDescent: properties.dyDescent,
        outlineLevelCol: properties.outlineLevelCol,
        outlineLevelRow: properties.outlineLevelRow
      } : void 0;
      if (properties.defaultColWidth) {
        sheetFormatPropertiesModel.defaultColWidth = properties.defaultColWidth;
      }
      xmlBuf.addText(xform.sheetFormatProperties.toXml(sheetFormatPropertiesModel));
    }
    _writeOpenWorksheet() {
      xmlBuffer.reset();
      xmlBuffer.addText('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
      xmlBuffer.addText(
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'
      );
      this._writeSheetProperties(xmlBuffer, this.properties, this.pageSetup);
      xmlBuffer.addText(xform.sheetViews.toXml(this.views));
      this._writeSheetFormatProperties(xmlBuffer, this.properties);
      this.stream.write(xmlBuffer);
    }
    _writeColumns() {
      const cols = Column.toModel(this.columns);
      if (cols) {
        xform.columns.prepare(cols, { styles: this._workbook.styles });
        this.stream.write(xform.columns.toXml(cols));
      }
    }
    _writeOpenSheetData() {
      this._write("<sheetData>");
    }
    _writeRow(row2) {
      if (!this.startedData) {
        this._writeColumns();
        this._writeOpenSheetData();
        this.startedData = true;
      }
      if (row2.hasValues || row2.height) {
        const { model } = row2;
        const options = {
          styles: this._workbook.styles,
          sharedStrings: this.useSharedStrings ? this._workbook.sharedStrings : void 0,
          hyperlinks: this._sheetRelsWriter.hyperlinksProxy,
          merges: this._merges,
          formulae: this._formulae,
          siFormulae: this._siFormulae,
          comments: []
        };
        xform.row.prepare(model, options);
        this.stream.write(xform.row.toXml(model));
        if (options.comments.length) {
          this.hasComments = true;
          this._sheetCommentsWriter.addComments(options.comments);
        }
      }
    }
    _writeCloseSheetData() {
      this._write("</sheetData>");
    }
    _writeMergeCells() {
      if (this._merges.length) {
        xmlBuffer.reset();
        xmlBuffer.addText(`<mergeCells count="${this._merges.length}">`);
        this._merges.forEach((merge) => {
          xmlBuffer.addText(`<mergeCell ref="${merge}"/>`);
        });
        xmlBuffer.addText("</mergeCells>");
        this.stream.write(xmlBuffer);
      }
    }
    _writeHyperlinks() {
      this.stream.write(xform.hyperlinks.toXml(this._sheetRelsWriter._hyperlinks));
    }
    _writeConditionalFormatting() {
      const options = {
        styles: this._workbook.styles
      };
      xform.conditionalFormattings.prepare(this.conditionalFormatting, options);
      this.stream.write(xform.conditionalFormattings.toXml(this.conditionalFormatting));
    }
    _writeRowBreaks() {
      this.stream.write(xform.rowBreaks.toXml(this.rowBreaks));
    }
    _writeDataValidations() {
      this.stream.write(xform.dataValidations.toXml(this.dataValidations.model));
    }
    _writeSheetProtection() {
      this.stream.write(xform.sheetProtection.toXml(this.sheetProtection));
    }
    _writePageMargins() {
      this.stream.write(xform.pageMargins.toXml(this.pageSetup.margins));
    }
    _writePageSetup() {
      this.stream.write(xform.pageSeteup.toXml(this.pageSetup));
    }
    _writeHeaderFooter() {
      this.stream.write(xform.headerFooter.toXml(this.headerFooter));
    }
    _writeAutoFilter() {
      this.stream.write(xform.autoFilter.toXml(this.autoFilter));
    }
    _writeBackground() {
      if (this._background) {
        if (this._background.imageId !== void 0) {
          const image2 = this._workbook.getImage(this._background.imageId);
          const pictureId = this._sheetRelsWriter.addMedia({
            Target: `../media/${image2.name}`,
            Type: RelType.Image
          });
          this._background = {
            ...this._background,
            rId: pictureId
          };
        }
        this.stream.write(xform.picture.toXml({ rId: this._background.rId }));
      }
    }
    _writeLegacyData() {
      if (this.hasComments) {
        xmlBuffer.reset();
        xmlBuffer.addText(`<legacyDrawing r:id="${this._sheetCommentsWriter.vmlRelId}"/>`);
        this.stream.write(xmlBuffer);
      }
    }
    _writeDimensions() {
    }
    _writeCloseWorksheet() {
      this._write("</worksheet>");
    }
  }
  worksheetWriter = WorksheetWriter;
  return worksheetWriter;
}
var workbookWriter;
var hasRequiredWorkbookWriter;
function requireWorkbookWriter() {
  if (hasRequiredWorkbookWriter) return workbookWriter;
  hasRequiredWorkbookWriter = 1;
  const fs = require$$0$1;
  const Archiver = requireArchiver();
  const StreamBuf = requireStreamBuf();
  const RelType = requireRelType();
  const StylesXform = requireStylesXform();
  const SharedStrings = requireSharedStrings();
  const DefinedNames = requireDefinedNames();
  const CoreXform = requireCoreXform();
  const RelationshipsXform = requireRelationshipsXform();
  const ContentTypesXform = requireContentTypesXform();
  const AppXform = requireAppXform();
  const WorkbookXform = requireWorkbookXform();
  const SharedStringsXform = requireSharedStringsXform();
  const WorksheetWriter = requireWorksheetWriter();
  const theme1Xml = requireTheme1();
  class WorkbookWriter {
    constructor(options) {
      options = options || {};
      this.created = options.created || /* @__PURE__ */ new Date();
      this.modified = options.modified || this.created;
      this.creator = options.creator || "ExcelJS";
      this.lastModifiedBy = options.lastModifiedBy || "ExcelJS";
      this.lastPrinted = options.lastPrinted;
      this.useSharedStrings = options.useSharedStrings || false;
      this.sharedStrings = new SharedStrings();
      this.styles = options.useStyles ? new StylesXform(true) : new StylesXform.Mock(true);
      this._definedNames = new DefinedNames();
      this._worksheets = [];
      this.views = [];
      this.zipOptions = options.zip;
      this.media = [];
      this.commentRefs = [];
      this.zip = Archiver("zip", this.zipOptions);
      if (options.stream) {
        this.stream = options.stream;
      } else if (options.filename) {
        this.stream = fs.createWriteStream(options.filename);
      } else {
        this.stream = new StreamBuf();
      }
      this.zip.pipe(this.stream);
      this.promise = Promise.all([this.addThemes(), this.addOfficeRels()]);
    }
    get definedNames() {
      return this._definedNames;
    }
    _openStream(path) {
      const stream = new StreamBuf({ bufSize: 65536, batch: true });
      this.zip.append(stream, { name: path });
      stream.on("finish", () => {
        stream.emit("zipped");
      });
      return stream;
    }
    _commitWorksheets() {
      const commitWorksheet = function(worksheet2) {
        if (!worksheet2.committed) {
          return new Promise((resolve) => {
            worksheet2.stream.on("zipped", () => {
              resolve();
            });
            worksheet2.commit();
          });
        }
        return Promise.resolve();
      };
      const promises = this._worksheets.map(commitWorksheet);
      if (promises.length) {
        return Promise.all(promises);
      }
      return Promise.resolve();
    }
    async commit() {
      await this.promise;
      await this.addMedia();
      await this._commitWorksheets();
      await Promise.all([
        this.addContentTypes(),
        this.addApp(),
        this.addCore(),
        this.addSharedStrings(),
        this.addStyles(),
        this.addWorkbookRels()
      ]);
      await this.addWorkbook();
      return this._finalize();
    }
    get nextId() {
      let i;
      for (i = 1; i < this._worksheets.length; i++) {
        if (!this._worksheets[i]) {
          return i;
        }
      }
      return this._worksheets.length || 1;
    }
    addImage(image2) {
      const id = this.media.length;
      const medium = Object.assign({}, image2, { type: "image", name: `image${id}.${image2.extension}` });
      this.media.push(medium);
      return id;
    }
    getImage(id) {
      return this.media[id];
    }
    addWorksheet(name, options) {
      options = options || {};
      const useSharedStrings = options.useSharedStrings !== void 0 ? options.useSharedStrings : this.useSharedStrings;
      if (options.tabColor) {
        console.trace("tabColor option has moved to { properties: tabColor: {...} }");
        options.properties = Object.assign(
          {
            tabColor: options.tabColor
          },
          options.properties
        );
      }
      const id = this.nextId;
      name = name || `sheet${id}`;
      const worksheet2 = new WorksheetWriter({
        id,
        name,
        workbook: this,
        useSharedStrings,
        properties: options.properties,
        state: options.state,
        pageSetup: options.pageSetup,
        views: options.views,
        autoFilter: options.autoFilter,
        headerFooter: options.headerFooter
      });
      this._worksheets[id] = worksheet2;
      return worksheet2;
    }
    getWorksheet(id) {
      if (id === void 0) {
        return this._worksheets.find(() => true);
      }
      if (typeof id === "number") {
        return this._worksheets[id];
      }
      if (typeof id === "string") {
        return this._worksheets.find((worksheet2) => worksheet2 && worksheet2.name === id);
      }
      return void 0;
    }
    addStyles() {
      return new Promise((resolve) => {
        this.zip.append(this.styles.xml, { name: "xl/styles.xml" });
        resolve();
      });
    }
    addThemes() {
      return new Promise((resolve) => {
        this.zip.append(theme1Xml, { name: "xl/theme/theme1.xml" });
        resolve();
      });
    }
    addOfficeRels() {
      return new Promise((resolve) => {
        const xform = new RelationshipsXform();
        const xml = xform.toXml([
          { Id: "rId1", Type: RelType.OfficeDocument, Target: "xl/workbook.xml" },
          { Id: "rId2", Type: RelType.CoreProperties, Target: "docProps/core.xml" },
          { Id: "rId3", Type: RelType.ExtenderProperties, Target: "docProps/app.xml" }
        ]);
        this.zip.append(xml, { name: "/_rels/.rels" });
        resolve();
      });
    }
    addContentTypes() {
      return new Promise((resolve) => {
        const model = {
          worksheets: this._worksheets.filter(Boolean),
          sharedStrings: this.sharedStrings,
          commentRefs: this.commentRefs,
          media: this.media
        };
        const xform = new ContentTypesXform();
        const xml = xform.toXml(model);
        this.zip.append(xml, { name: "[Content_Types].xml" });
        resolve();
      });
    }
    addMedia() {
      return Promise.all(
        this.media.map((medium) => {
          if (medium.type === "image") {
            const filename = `xl/media/${medium.name}`;
            if (medium.filename) {
              return this.zip.file(medium.filename, { name: filename });
            }
            if (medium.buffer) {
              return this.zip.append(medium.buffer, { name: filename });
            }
            if (medium.base64) {
              const dataimg64 = medium.base64;
              const content = dataimg64.substring(dataimg64.indexOf(",") + 1);
              return this.zip.append(content, { name: filename, base64: true });
            }
          }
          throw new Error("Unsupported media");
        })
      );
    }
    addApp() {
      return new Promise((resolve) => {
        const model = {
          worksheets: this._worksheets.filter(Boolean)
        };
        const xform = new AppXform();
        const xml = xform.toXml(model);
        this.zip.append(xml, { name: "docProps/app.xml" });
        resolve();
      });
    }
    addCore() {
      return new Promise((resolve) => {
        const coreXform2 = new CoreXform();
        const xml = coreXform2.toXml(this);
        this.zip.append(xml, { name: "docProps/core.xml" });
        resolve();
      });
    }
    addSharedStrings() {
      if (this.sharedStrings.count) {
        return new Promise((resolve) => {
          const sharedStringsXform2 = new SharedStringsXform();
          const xml = sharedStringsXform2.toXml(this.sharedStrings);
          this.zip.append(xml, { name: "/xl/sharedStrings.xml" });
          resolve();
        });
      }
      return Promise.resolve();
    }
    addWorkbookRels() {
      let count = 1;
      const relationships = [
        { Id: `rId${count++}`, Type: RelType.Styles, Target: "styles.xml" },
        { Id: `rId${count++}`, Type: RelType.Theme, Target: "theme/theme1.xml" }
      ];
      if (this.sharedStrings.count) {
        relationships.push({
          Id: `rId${count++}`,
          Type: RelType.SharedStrings,
          Target: "sharedStrings.xml"
        });
      }
      this._worksheets.forEach((worksheet2) => {
        if (worksheet2) {
          worksheet2.rId = `rId${count++}`;
          relationships.push({
            Id: worksheet2.rId,
            Type: RelType.Worksheet,
            Target: `worksheets/sheet${worksheet2.id}.xml`
          });
        }
      });
      return new Promise((resolve) => {
        const xform = new RelationshipsXform();
        const xml = xform.toXml(relationships);
        this.zip.append(xml, { name: "/xl/_rels/workbook.xml.rels" });
        resolve();
      });
    }
    addWorkbook() {
      const { zip } = this;
      const model = {
        worksheets: this._worksheets.filter(Boolean),
        definedNames: this._definedNames.model,
        views: this.views,
        properties: {},
        calcProperties: {}
      };
      return new Promise((resolve) => {
        const xform = new WorkbookXform();
        xform.prepare(model);
        zip.append(xform.toXml(model), { name: "/xl/workbook.xml" });
        resolve();
      });
    }
    _finalize() {
      return new Promise((resolve, reject) => {
        this.stream.on("error", reject);
        this.stream.on("finish", () => {
          resolve(this);
        });
        this.zip.on("error", reject);
        this.zip.finalize();
      });
    }
  }
  workbookWriter = WorkbookWriter;
  return workbookWriter;
}
var iterateStream;
var hasRequiredIterateStream;
function requireIterateStream() {
  if (hasRequiredIterateStream) return iterateStream;
  hasRequiredIterateStream = 1;
  iterateStream = async function* iterateStream2(stream) {
    const contents = [];
    stream.on("data", (data) => contents.push(data));
    let resolveStreamEndedPromise;
    const streamEndedPromise = new Promise((resolve) => resolveStreamEndedPromise = resolve);
    let ended = false;
    stream.on("end", () => {
      ended = true;
      resolveStreamEndedPromise();
    });
    let error = false;
    stream.on("error", (err) => {
      error = err;
      resolveStreamEndedPromise();
    });
    while (!ended || contents.length > 0) {
      if (contents.length === 0) {
        stream.resume();
        await Promise.race([once(stream, "data"), streamEndedPromise]);
      } else {
        stream.pause();
        const data = contents.shift();
        yield data;
      }
      if (error) throw error;
    }
    resolveStreamEndedPromise();
  };
  function once(eventEmitter, type) {
    return new Promise((resolve) => {
      let fired = false;
      const handler = () => {
        if (!fired) {
          fired = true;
          eventEmitter.removeListener(type, handler);
          resolve();
        }
      };
      eventEmitter.addListener(type, handler);
    });
  }
  return iterateStream;
}
var worksheetReader;
var hasRequiredWorksheetReader;
function requireWorksheetReader() {
  if (hasRequiredWorksheetReader) return worksheetReader;
  hasRequiredWorksheetReader = 1;
  const { EventEmitter } = require$$2;
  const parseSax2 = requireParseSax();
  const _ = requireUnderDash();
  const utils = requireUtils();
  const colCache = requireColCache();
  const Dimensions = requireRange();
  const Row = requireRow();
  const Column = requireColumn();
  class WorksheetReader extends EventEmitter {
    constructor({ workbook: workbook2, id, iterator, options }) {
      super();
      this.workbook = workbook2;
      this.id = id;
      this.iterator = iterator;
      this.options = options || {};
      this.name = `Sheet${this.id}`;
      this._columns = null;
      this._keys = {};
      this._dimensions = new Dimensions();
    }
    // destroy - not a valid operation for a streaming writer
    // even though some streamers might be able to, it's a bad idea.
    destroy() {
      throw new Error("Invalid Operation: destroy");
    }
    // return the current dimensions of the writer
    get dimensions() {
      return this._dimensions;
    }
    // =========================================================================
    // Columns
    // get the current columns array.
    get columns() {
      return this._columns;
    }
    // get a single column by col number. If it doesn't exist, it and any gaps before it
    // are created.
    getColumn(c) {
      if (typeof c === "string") {
        const col = this._keys[c];
        if (col) {
          return col;
        }
        c = colCache.l2n(c);
      }
      if (!this._columns) {
        this._columns = [];
      }
      if (c > this._columns.length) {
        let n = this._columns.length + 1;
        while (n <= c) {
          this._columns.push(new Column(this, n++));
        }
      }
      return this._columns[c - 1];
    }
    getColumnKey(key) {
      return this._keys[key];
    }
    setColumnKey(key, value) {
      this._keys[key] = value;
    }
    deleteColumnKey(key) {
      delete this._keys[key];
    }
    eachColumnKey(f) {
      _.each(this._keys, f);
    }
    async read() {
      try {
        for await (const events of this.parse()) {
          for (const { eventType, value } of events) {
            this.emit(eventType, value);
          }
        }
        this.emit("finished");
      } catch (error) {
        this.emit("error", error);
      }
    }
    async *[Symbol.asyncIterator]() {
      for await (const events of this.parse()) {
        for (const { eventType, value } of events) {
          if (eventType === "row") {
            yield value;
          }
        }
      }
    }
    async *parse() {
      const { iterator, options } = this;
      let emitSheet = false;
      let emitHyperlinks = false;
      let hyperlinks = null;
      switch (options.worksheets) {
        case "emit":
          emitSheet = true;
          break;
      }
      switch (options.hyperlinks) {
        case "emit":
          emitHyperlinks = true;
          break;
        case "cache":
          this.hyperlinks = hyperlinks = {};
          break;
      }
      if (!emitSheet && !emitHyperlinks && !hyperlinks) {
        return;
      }
      const { sharedStrings: sharedStrings2, styles, properties } = this.workbook;
      let inCols = false;
      let inRows = false;
      let inHyperlinks = false;
      let cols = null;
      let row2 = null;
      let c = null;
      let current = null;
      for await (const events of parseSax2(iterator)) {
        const worksheetEvents = [];
        for (const { eventType, value } of events) {
          if (eventType === "opentag") {
            const node = value;
            if (emitSheet) {
              switch (node.name) {
                case "cols":
                  inCols = true;
                  cols = [];
                  break;
                case "sheetData":
                  inRows = true;
                  break;
                case "col":
                  if (inCols) {
                    cols.push({
                      min: parseInt(node.attributes.min, 10),
                      max: parseInt(node.attributes.max, 10),
                      width: parseFloat(node.attributes.width),
                      styleId: parseInt(node.attributes.style || "0", 10)
                    });
                  }
                  break;
                case "row":
                  if (inRows) {
                    const r = parseInt(node.attributes.r, 10);
                    row2 = new Row(this, r);
                    if (node.attributes.ht) {
                      row2.height = parseFloat(node.attributes.ht);
                    }
                    if (node.attributes.s) {
                      const styleId = parseInt(node.attributes.s, 10);
                      const style = styles.getStyleModel(styleId);
                      if (style) {
                        row2.style = style;
                      }
                    }
                  }
                  break;
                case "c":
                  if (row2) {
                    c = {
                      ref: node.attributes.r,
                      s: parseInt(node.attributes.s, 10),
                      t: node.attributes.t
                    };
                  }
                  break;
                case "f":
                  if (c) {
                    current = c.f = { text: "" };
                  }
                  break;
                case "v":
                  if (c) {
                    current = c.v = { text: "" };
                  }
                  break;
                case "is":
                case "t":
                  if (c) {
                    current = c.v = { text: "" };
                  }
                  break;
              }
            }
            if (emitHyperlinks || hyperlinks) {
              switch (node.name) {
                case "hyperlinks":
                  inHyperlinks = true;
                  break;
                case "hyperlink":
                  if (inHyperlinks) {
                    const hyperlink = {
                      ref: node.attributes.ref,
                      rId: node.attributes["r:id"]
                    };
                    if (emitHyperlinks) {
                      worksheetEvents.push({ eventType: "hyperlink", value: hyperlink });
                    } else {
                      hyperlinks[hyperlink.ref] = hyperlink;
                    }
                  }
                  break;
              }
            }
          } else if (eventType === "text") {
            if (emitSheet) {
              if (current) {
                current.text += value;
              }
            }
          } else if (eventType === "closetag") {
            const node = value;
            if (emitSheet) {
              switch (node.name) {
                case "cols":
                  inCols = false;
                  this._columns = Column.fromModel(cols);
                  break;
                case "sheetData":
                  inRows = false;
                  break;
                case "row":
                  this._dimensions.expandRow(row2);
                  worksheetEvents.push({ eventType: "row", value: row2 });
                  row2 = null;
                  break;
                case "c":
                  if (row2 && c) {
                    const address = colCache.decodeAddress(c.ref);
                    const cell2 = row2.getCell(address.col);
                    if (c.s) {
                      const style = styles.getStyleModel(c.s);
                      if (style) {
                        cell2.style = style;
                      }
                    }
                    if (c.f) {
                      const cellValue = {
                        formula: c.f.text
                      };
                      if (c.v) {
                        if (c.t === "str") {
                          cellValue.result = utils.xmlDecode(c.v.text);
                        } else {
                          cellValue.result = parseFloat(c.v.text);
                        }
                      }
                      cell2.value = cellValue;
                    } else if (c.v) {
                      switch (c.t) {
                        case "s": {
                          const index = parseInt(c.v.text, 10);
                          if (sharedStrings2) {
                            cell2.value = sharedStrings2[index];
                          } else {
                            cell2.value = {
                              sharedString: index
                            };
                          }
                          break;
                        }
                        case "inlineStr":
                        case "str":
                          cell2.value = utils.xmlDecode(c.v.text);
                          break;
                        case "e":
                          cell2.value = { error: c.v.text };
                          break;
                        case "b":
                          cell2.value = parseInt(c.v.text, 10) !== 0;
                          break;
                        default:
                          if (utils.isDateFmt(cell2.numFmt)) {
                            cell2.value = utils.excelToDate(
                              parseFloat(c.v.text),
                              properties.model && properties.model.date1904
                            );
                          } else {
                            cell2.value = parseFloat(c.v.text);
                          }
                          break;
                      }
                    }
                    if (hyperlinks) {
                      const hyperlink = hyperlinks[c.ref];
                      if (hyperlink) {
                        cell2.text = cell2.value;
                        cell2.value = void 0;
                        cell2.hyperlink = hyperlink;
                      }
                    }
                    c = null;
                  }
                  break;
              }
            }
            if (emitHyperlinks || hyperlinks) {
              switch (node.name) {
                case "hyperlinks":
                  inHyperlinks = false;
                  break;
              }
            }
          }
        }
        if (worksheetEvents.length > 0) {
          yield worksheetEvents;
        }
      }
    }
  }
  worksheetReader = WorksheetReader;
  return worksheetReader;
}
var hyperlinkReader;
var hasRequiredHyperlinkReader;
function requireHyperlinkReader() {
  if (hasRequiredHyperlinkReader) return hyperlinkReader;
  hasRequiredHyperlinkReader = 1;
  const { EventEmitter } = require$$2;
  const parseSax2 = requireParseSax();
  const Enums = requireEnums();
  const RelType = requireRelType();
  class HyperlinkReader extends EventEmitter {
    constructor({ workbook: workbook2, id, iterator, options }) {
      super();
      this.workbook = workbook2;
      this.id = id;
      this.iterator = iterator;
      this.options = options;
    }
    get count() {
      return this.hyperlinks && this.hyperlinks.length || 0;
    }
    each(fn) {
      return this.hyperlinks.forEach(fn);
    }
    async read() {
      const { iterator, options } = this;
      let emitHyperlinks = false;
      let hyperlinks = null;
      switch (options.hyperlinks) {
        case "emit":
          emitHyperlinks = true;
          break;
        case "cache":
          this.hyperlinks = hyperlinks = {};
          break;
      }
      if (!emitHyperlinks && !hyperlinks) {
        this.emit("finished");
        return;
      }
      try {
        for await (const events of parseSax2(iterator)) {
          for (const { eventType, value } of events) {
            if (eventType === "opentag") {
              const node = value;
              if (node.name === "Relationship") {
                const rId = node.attributes.Id;
                switch (node.attributes.Type) {
                  case RelType.Hyperlink:
                    {
                      const relationship = {
                        type: Enums.RelationshipType.Styles,
                        rId,
                        target: node.attributes.Target,
                        targetMode: node.attributes.TargetMode
                      };
                      if (emitHyperlinks) {
                        this.emit("hyperlink", relationship);
                      } else {
                        hyperlinks[relationship.rId] = relationship;
                      }
                    }
                    break;
                  default:
                    break;
                }
              }
            }
          }
        }
        this.emit("finished");
      } catch (error) {
        this.emit("error", error);
      }
    }
  }
  hyperlinkReader = HyperlinkReader;
  return hyperlinkReader;
}
var workbookReader;
var hasRequiredWorkbookReader;
function requireWorkbookReader() {
  if (hasRequiredWorkbookReader) return workbookReader;
  hasRequiredWorkbookReader = 1;
  const fs = require$$0$1;
  const { EventEmitter } = require$$2;
  const { PassThrough, Readable } = requireReadable();
  const nodeStream = require$$0$3;
  const unzip = requireUnzip();
  const tmp = requireTmp();
  const iterateStream2 = requireIterateStream();
  const parseSax2 = requireParseSax();
  const StyleManager = requireStylesXform();
  const WorkbookXform = requireWorkbookXform();
  const RelationshipsXform = requireRelationshipsXform();
  const WorksheetReader = requireWorksheetReader();
  const HyperlinkReader = requireHyperlinkReader();
  tmp.setGracefulCleanup();
  class WorkbookReader extends EventEmitter {
    constructor(input, options = {}) {
      super();
      this.input = input;
      this.options = {
        worksheets: "emit",
        sharedStrings: "cache",
        hyperlinks: "ignore",
        styles: "ignore",
        entries: "ignore",
        ...options
      };
      this.styles = new StyleManager();
      this.styles.init();
    }
    _getStream(input) {
      if (input instanceof nodeStream.Readable || input instanceof Readable) {
        return input;
      }
      if (typeof input === "string") {
        return fs.createReadStream(input);
      }
      throw new Error(`Could not recognise input: ${input}`);
    }
    async read(input, options) {
      try {
        for await (const { eventType, value } of this.parse(input, options)) {
          switch (eventType) {
            case "shared-strings":
              this.emit(eventType, value);
              break;
            case "worksheet":
              this.emit(eventType, value);
              await value.read();
              break;
            case "hyperlinks":
              this.emit(eventType, value);
              break;
          }
        }
        this.emit("end");
        this.emit("finished");
      } catch (error) {
        this.emit("error", error);
      }
    }
    async *[Symbol.asyncIterator]() {
      for await (const { eventType, value } of this.parse()) {
        if (eventType === "worksheet") {
          yield value;
        }
      }
    }
    async *parse(input, options) {
      if (options) this.options = options;
      const stream = this.stream = this._getStream(input || this.input);
      const zip = unzip.Parse({ forceStream: true });
      stream.pipe(zip);
      const waitingWorkSheets = [];
      for await (const entry of iterateStream2(zip)) {
        let match;
        let sheetNo;
        switch (entry.path) {
          case "_rels/.rels":
            break;
          case "xl/_rels/workbook.xml.rels":
            await this._parseRels(entry);
            break;
          case "xl/workbook.xml":
            await this._parseWorkbook(entry);
            break;
          case "xl/sharedStrings.xml":
            yield* this._parseSharedStrings(entry);
            break;
          case "xl/styles.xml":
            await this._parseStyles(entry);
            break;
          default:
            if (entry.path.match(/xl\/worksheets\/sheet\d+[.]xml/)) {
              match = entry.path.match(/xl\/worksheets\/sheet(\d+)[.]xml/);
              sheetNo = match[1];
              if (this.sharedStrings && this.workbookRels) {
                yield* this._parseWorksheet(iterateStream2(entry), sheetNo);
              } else {
                await new Promise((resolve, reject) => {
                  tmp.file((err, path, fd, tempFileCleanupCallback) => {
                    if (err) {
                      return reject(err);
                    }
                    waitingWorkSheets.push({ sheetNo, path, tempFileCleanupCallback });
                    const tempStream = fs.createWriteStream(path);
                    tempStream.on("error", reject);
                    entry.pipe(tempStream);
                    return tempStream.on("finish", () => {
                      return resolve();
                    });
                  });
                });
              }
            } else if (entry.path.match(/xl\/worksheets\/_rels\/sheet\d+[.]xml.rels/)) {
              match = entry.path.match(/xl\/worksheets\/_rels\/sheet(\d+)[.]xml.rels/);
              sheetNo = match[1];
              yield* this._parseHyperlinks(iterateStream2(entry), sheetNo);
            }
            break;
        }
        entry.autodrain();
      }
      for (const { sheetNo, path, tempFileCleanupCallback } of waitingWorkSheets) {
        let fileStream = fs.createReadStream(path);
        if (!fileStream[Symbol.asyncIterator]) {
          fileStream = fileStream.pipe(new PassThrough());
        }
        yield* this._parseWorksheet(fileStream, sheetNo);
        tempFileCleanupCallback();
      }
    }
    _emitEntry(payload) {
      if (this.options.entries === "emit") {
        this.emit("entry", payload);
      }
    }
    async _parseRels(entry) {
      const xform = new RelationshipsXform();
      this.workbookRels = await xform.parseStream(iterateStream2(entry));
    }
    async _parseWorkbook(entry) {
      this._emitEntry({ type: "workbook" });
      const workbook2 = new WorkbookXform();
      await workbook2.parseStream(iterateStream2(entry));
      this.properties = workbook2.map.workbookPr;
      this.model = workbook2.model;
    }
    async *_parseSharedStrings(entry) {
      this._emitEntry({ type: "shared-strings" });
      switch (this.options.sharedStrings) {
        case "cache":
          this.sharedStrings = [];
          break;
        case "emit":
          break;
        default:
          return;
      }
      let text = null;
      let richText = [];
      let index = 0;
      let font = null;
      for await (const events of parseSax2(iterateStream2(entry))) {
        for (const { eventType, value } of events) {
          if (eventType === "opentag") {
            const node = value;
            switch (node.name) {
              case "b":
                font = font || {};
                font.bold = true;
                break;
              case "charset":
                font = font || {};
                font.charset = parseInt(node.attributes.charset, 10);
                break;
              case "color":
                font = font || {};
                font.color = {};
                if (node.attributes.rgb) {
                  font.color.argb = node.attributes.argb;
                }
                if (node.attributes.val) {
                  font.color.argb = node.attributes.val;
                }
                if (node.attributes.theme) {
                  font.color.theme = node.attributes.theme;
                }
                break;
              case "family":
                font = font || {};
                font.family = parseInt(node.attributes.val, 10);
                break;
              case "i":
                font = font || {};
                font.italic = true;
                break;
              case "outline":
                font = font || {};
                font.outline = true;
                break;
              case "rFont":
                font = font || {};
                font.name = node.value;
                break;
              case "si":
                font = null;
                richText = [];
                text = null;
                break;
              case "sz":
                font = font || {};
                font.size = parseInt(node.attributes.val, 10);
                break;
              case "strike":
                break;
              case "t":
                text = null;
                break;
              case "u":
                font = font || {};
                font.underline = true;
                break;
              case "vertAlign":
                font = font || {};
                font.vertAlign = node.attributes.val;
                break;
            }
          } else if (eventType === "text") {
            text = text ? text + value : value;
          } else if (eventType === "closetag") {
            const node = value;
            switch (node.name) {
              case "r":
                richText.push({
                  font,
                  text
                });
                font = null;
                text = null;
                break;
              case "si":
                if (this.options.sharedStrings === "cache") {
                  this.sharedStrings.push(richText.length ? { richText } : text);
                } else if (this.options.sharedStrings === "emit") {
                  yield { index: index++, text: richText.length ? { richText } : text };
                }
                richText = [];
                font = null;
                text = null;
                break;
            }
          }
        }
      }
    }
    async _parseStyles(entry) {
      this._emitEntry({ type: "styles" });
      if (this.options.styles === "cache") {
        this.styles = new StyleManager();
        await this.styles.parseStream(iterateStream2(entry));
      }
    }
    *_parseWorksheet(iterator, sheetNo) {
      this._emitEntry({ type: "worksheet", id: sheetNo });
      const worksheetReader2 = new WorksheetReader({
        workbook: this,
        id: sheetNo,
        iterator,
        options: this.options
      });
      const matchingRel = (this.workbookRels || []).find((rel) => rel.Target === `worksheets/sheet${sheetNo}.xml`);
      const matchingSheet = matchingRel && (this.model.sheets || []).find((sheet) => sheet.rId === matchingRel.Id);
      if (matchingSheet) {
        worksheetReader2.id = matchingSheet.id;
        worksheetReader2.name = matchingSheet.name;
        worksheetReader2.state = matchingSheet.state;
      }
      if (this.options.worksheets === "emit") {
        yield { eventType: "worksheet", value: worksheetReader2 };
      }
    }
    *_parseHyperlinks(iterator, sheetNo) {
      this._emitEntry({ type: "hyperlinks", id: sheetNo });
      const hyperlinksReader = new HyperlinkReader({
        workbook: this,
        id: sheetNo,
        iterator,
        options: this.options
      });
      if (this.options.hyperlinks === "emit") {
        yield { eventType: "hyperlinks", value: hyperlinksReader };
      }
    }
  }
  WorkbookReader.Options = {
    worksheets: ["emit", "ignore"],
    sharedStrings: ["cache", "emit", "ignore"],
    hyperlinks: ["cache", "emit", "ignore"],
    styles: ["cache", "ignore"],
    entries: ["emit", "ignore"]
  };
  workbookReader = WorkbookReader;
  return workbookReader;
}
var exceljs_nodejs;
var hasRequiredExceljs_nodejs;
function requireExceljs_nodejs() {
  if (hasRequiredExceljs_nodejs) return exceljs_nodejs;
  hasRequiredExceljs_nodejs = 1;
  const ExcelJS2 = {
    Workbook: requireWorkbook(),
    ModelContainer: requireModelcontainer(),
    stream: {
      xlsx: {
        WorkbookWriter: requireWorkbookWriter(),
        WorkbookReader: requireWorkbookReader()
      }
    }
  };
  Object.assign(ExcelJS2, requireEnums());
  exceljs_nodejs = ExcelJS2;
  return exceljs_nodejs;
}
var excel;
var hasRequiredExcel;
function requireExcel() {
  if (hasRequiredExcel) return excel;
  hasRequiredExcel = 1;
  if (parseInt(process.versions.node.split(".")[0], 10) < 10) {
    throw new Error(
      "For node versions older than 10, please use the ES5 Import: https://github.com/exceljs/exceljs#es5-imports"
    );
  }
  excel = requireExceljs_nodejs();
  return excel;
}
var excelExports = requireExcel();
const ExcelJS = /* @__PURE__ */ getDefaultExportFromCjs(excelExports);
export {
  ExcelJS as E
};
