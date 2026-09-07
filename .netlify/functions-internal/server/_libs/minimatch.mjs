import { r as requireBraceExpansion, a as requireBraceExpansion$1 } from "./brace-expansion.mjs";
var path;
var hasRequiredPath;
function requirePath() {
  if (hasRequiredPath) return path;
  hasRequiredPath = 1;
  const isWindows = typeof process === "object" && process && process.platform === "win32";
  path = isWindows ? { sep: "\\" } : { sep: "/" };
  return path;
}
var minimatch_1$1;
var hasRequiredMinimatch$1;
function requireMinimatch$1() {
  if (hasRequiredMinimatch$1) return minimatch_1$1;
  hasRequiredMinimatch$1 = 1;
  const minimatch = minimatch_1$1 = (p, pattern, options = {}) => {
    assertValidPattern(pattern);
    if (!options.nocomment && pattern.charAt(0) === "#") {
      return false;
    }
    return new Minimatch(pattern, options).match(p);
  };
  minimatch_1$1 = minimatch;
  const path2 = requirePath();
  minimatch.sep = path2.sep;
  const GLOBSTAR = /* @__PURE__ */ Symbol("globstar **");
  minimatch.GLOBSTAR = GLOBSTAR;
  const expand = requireBraceExpansion();
  const plTypes = {
    "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
    "?": { open: "(?:", close: ")?" },
    "+": { open: "(?:", close: ")+" },
    "*": { open: "(?:", close: ")*" },
    "@": { open: "(?:", close: ")" }
  };
  const qmark = "[^/]";
  const star = qmark + "*?";
  const twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  const twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
  const charSet = (s) => s.split("").reduce((set, c) => {
    set[c] = true;
    return set;
  }, {});
  const reSpecials = charSet("().*{}+?[]^$\\!");
  const addPatternStartSet = charSet("[.(");
  const slashSplit = /\/+/;
  minimatch.filter = (pattern, options = {}) => (p, i, list) => minimatch(p, pattern, options);
  const ext = (a, b = {}) => {
    const t = {};
    Object.keys(a).forEach((k) => t[k] = a[k]);
    Object.keys(b).forEach((k) => t[k] = b[k]);
    return t;
  };
  minimatch.defaults = (def) => {
    if (!def || typeof def !== "object" || !Object.keys(def).length) {
      return minimatch;
    }
    const orig = minimatch;
    const m = (p, pattern, options) => orig(p, pattern, ext(def, options));
    m.Minimatch = class Minimatch extends orig.Minimatch {
      constructor(pattern, options) {
        super(pattern, ext(def, options));
      }
    };
    m.Minimatch.defaults = (options) => orig.defaults(ext(def, options)).Minimatch;
    m.filter = (pattern, options) => orig.filter(pattern, ext(def, options));
    m.defaults = (options) => orig.defaults(ext(def, options));
    m.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options));
    m.braceExpand = (pattern, options) => orig.braceExpand(pattern, ext(def, options));
    m.match = (list, pattern, options) => orig.match(list, pattern, ext(def, options));
    return m;
  };
  minimatch.braceExpand = (pattern, options) => braceExpand(pattern, options);
  const braceExpand = (pattern, options = {}) => {
    assertValidPattern(pattern);
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
      return [pattern];
    }
    return expand(pattern);
  };
  const MAX_PATTERN_LENGTH = 1024 * 64;
  const assertValidPattern = (pattern) => {
    if (typeof pattern !== "string") {
      throw new TypeError("invalid pattern");
    }
    if (pattern.length > MAX_PATTERN_LENGTH) {
      throw new TypeError("pattern is too long");
    }
  };
  const SUBPARSE = /* @__PURE__ */ Symbol("subparse");
  minimatch.makeRe = (pattern, options) => new Minimatch(pattern, options || {}).makeRe();
  minimatch.match = (list, pattern, options = {}) => {
    const mm = new Minimatch(pattern, options);
    list = list.filter((f) => mm.match(f));
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  const globUnescape = (s) => s.replace(/\\(.)/g, "$1");
  const charUnescape = (s) => s.replace(/\\([^-\]])/g, "$1");
  const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const braExpEscape = (s) => s.replace(/[[\]\\]/g, "\\$&");
  class Minimatch {
    constructor(pattern, options) {
      assertValidPattern(pattern);
      if (!options) options = {};
      this.options = options;
      this.maxGlobstarRecursion = options.maxGlobstarRecursion !== void 0 ? options.maxGlobstarRecursion : 200;
      this.set = [];
      this.pattern = pattern;
      this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
      if (this.windowsPathsNoEscape) {
        this.pattern = this.pattern.replace(/\\/g, "/");
      }
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    debug() {
    }
    make() {
      const pattern = this.pattern;
      const options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      let set = this.globSet = this.braceExpand();
      if (options.debug) this.debug = (...args) => console.error(...args);
      this.debug(this.pattern, set);
      set = this.globParts = set.map((s) => s.split(slashSplit));
      this.debug(this.pattern, set);
      set = set.map((s, si, set2) => s.map(this.parse, this));
      this.debug(this.pattern, set);
      set = set.filter((s) => s.indexOf(false) === -1);
      this.debug(this.pattern, set);
      this.set = set;
    }
    parseNegate() {
      if (this.options.nonegate) return;
      const pattern = this.pattern;
      let negate = false;
      let negateOffset = 0;
      for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset) this.pattern = pattern.slice(negateOffset);
      this.negate = negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    matchOne(file, pattern, partial) {
      if (pattern.indexOf(GLOBSTAR) !== -1) {
        return this._matchGlobstar(file, pattern, partial, 0, 0);
      }
      return this._matchOne(file, pattern, partial, 0, 0);
    }
    _matchGlobstar(file, pattern, partial, fileIndex, patternIndex) {
      let firstgs = -1;
      for (let i = patternIndex; i < pattern.length; i++) {
        if (pattern[i] === GLOBSTAR) {
          firstgs = i;
          break;
        }
      }
      let lastgs = -1;
      for (let i = pattern.length - 1; i >= 0; i--) {
        if (pattern[i] === GLOBSTAR) {
          lastgs = i;
          break;
        }
      }
      const head = pattern.slice(patternIndex, firstgs);
      const body = partial ? pattern.slice(firstgs + 1) : pattern.slice(firstgs + 1, lastgs);
      const tail = partial ? [] : pattern.slice(lastgs + 1);
      if (head.length) {
        const fileHead = file.slice(fileIndex, fileIndex + head.length);
        if (!this._matchOne(fileHead, head, partial, 0, 0)) {
          return false;
        }
        fileIndex += head.length;
      }
      let fileTailMatch = 0;
      if (tail.length) {
        if (tail.length + fileIndex > file.length) return false;
        const tailStart = file.length - tail.length;
        if (this._matchOne(file, tail, partial, tailStart, 0)) {
          fileTailMatch = tail.length;
        } else {
          if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) {
            return false;
          }
          if (!this._matchOne(file, tail, partial, tailStart - 1, 0)) {
            return false;
          }
          fileTailMatch = tail.length + 1;
        }
      }
      if (!body.length) {
        let sawSome = !!fileTailMatch;
        for (let i = fileIndex; i < file.length - fileTailMatch; i++) {
          const f = String(file[i]);
          sawSome = true;
          if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
            return false;
          }
        }
        return partial || sawSome;
      }
      const bodySegments = [[[], 0]];
      let currentBody = bodySegments[0];
      let nonGsParts = 0;
      const nonGsPartsSums = [0];
      for (const b of body) {
        if (b === GLOBSTAR) {
          nonGsPartsSums.push(nonGsParts);
          currentBody = [[], 0];
          bodySegments.push(currentBody);
        } else {
          currentBody[0].push(b);
          nonGsParts++;
        }
      }
      let idx = bodySegments.length - 1;
      const fileLength = file.length - fileTailMatch;
      for (const b of bodySegments) {
        b[1] = fileLength - (nonGsPartsSums[idx--] + b[0].length);
      }
      return !!this._matchGlobStarBodySections(
        file,
        bodySegments,
        fileIndex,
        0,
        partial,
        0,
        !!fileTailMatch
      );
    }
    // return false for "nope, not matching"
    // return null for "not matching, cannot keep trying"
    _matchGlobStarBodySections(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
      const bs = bodySegments[bodyIndex];
      if (!bs) {
        for (let i = fileIndex; i < file.length; i++) {
          sawTail = true;
          const f = file[i];
          if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
            return false;
          }
        }
        return sawTail;
      }
      const [body, after] = bs;
      while (fileIndex <= after) {
        const m = this._matchOne(
          file.slice(0, fileIndex + body.length),
          body,
          partial,
          fileIndex,
          0
        );
        if (m && globStarDepth < this.maxGlobstarRecursion) {
          const sub = this._matchGlobStarBodySections(
            file,
            bodySegments,
            fileIndex + body.length,
            bodyIndex + 1,
            partial,
            globStarDepth + 1,
            sawTail
          );
          if (sub !== false) {
            return sub;
          }
        }
        const f = file[fileIndex];
        if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
          return false;
        }
        fileIndex++;
      }
      return partial || null;
    }
    _matchOne(file, pattern, partial, fileIndex, patternIndex) {
      let fi, pi, fl, pl;
      for (fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        const p = pattern[pi];
        const f = file[fi];
        this.debug(pattern, p, f);
        if (p === false || p === GLOBSTAR) return false;
        let hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit) return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    }
    braceExpand() {
      return braceExpand(this.pattern, this.options);
    }
    parse(pattern, isSub) {
      assertValidPattern(pattern);
      const options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "") return "";
      let re = "";
      let hasMagic = false;
      let escaping = false;
      const patternListStack = [];
      const negativeLists = [];
      let stateChar;
      let inClass = false;
      let reClassStart = -1;
      let classStart = -1;
      let cs;
      let pl;
      let sp;
      let dotTravAllowed = pattern.charAt(0) === ".";
      let dotFileAllowed = options.dot || dotTravAllowed;
      const patternStart = () => dotTravAllowed ? "" : dotFileAllowed ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      const subPatternStart = (p) => p.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      const clearStateChar = () => {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          this.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      };
      for (let i = 0, c; i < pattern.length && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping) {
          if (c === "/") {
            return false;
          }
          if (reSpecials[c]) {
            re += "\\";
          }
          re += c;
          escaping = false;
          continue;
        }
        switch (c) {
          /* istanbul ignore next */
          case "/": {
            return false;
          }
          case "\\":
            if (inClass && pattern.charAt(i + 1) === "-") {
              re += c;
              continue;
            }
            clearStateChar();
            escaping = true;
            continue;
          // the various stateChar values
          // for the "extglob" stuff.
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1) c = "^";
              re += c;
              continue;
            }
            if (c === "*" && stateChar === "*") continue;
            this.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext) clearStateChar();
            continue;
          case "(": {
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            const plEntry = {
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            };
            this.debug(this.pattern, "	", plEntry);
            patternListStack.push(plEntry);
            re += plEntry.open;
            if (plEntry.start === 0 && plEntry.type !== "!") {
              dotTravAllowed = true;
              re += subPatternStart(pattern.slice(i + 1));
            }
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          }
          case ")": {
            const plEntry = patternListStack[patternListStack.length - 1];
            if (inClass || !plEntry) {
              re += "\\)";
              continue;
            }
            patternListStack.pop();
            clearStateChar();
            hasMagic = true;
            pl = plEntry;
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(Object.assign(pl, { reEnd: re.length }));
            }
            continue;
          }
          case "|": {
            const plEntry = patternListStack[patternListStack.length - 1];
            if (inClass || !plEntry) {
              re += "\\|";
              continue;
            }
            clearStateChar();
            re += "|";
            if (plEntry.start === 0 && plEntry.type !== "!") {
              dotTravAllowed = true;
              re += subPatternStart(pattern.slice(i + 1));
            }
            continue;
          }
          // these are mostly the same in regexp and glob
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              continue;
            }
            cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + braExpEscape(charUnescape(cs)) + "]");
              re += c;
            } catch (er) {
              re = re.substring(0, reClassStart) + "(?:$.)";
            }
            hasMagic = true;
            inClass = false;
            continue;
          default:
            clearStateChar();
            if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
            break;
        }
      }
      if (inClass) {
        cs = pattern.slice(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substring(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        let tail;
        tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        const t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      const addPatternStart = addPatternStartSet[re.charAt(0)];
      for (let n = negativeLists.length - 1; n > -1; n--) {
        const nl = negativeLists[n];
        const nlBefore = re.slice(0, nl.reStart);
        const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        let nlAfter = re.slice(nl.reEnd);
        const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;
        const closeParensBefore = nlBefore.split(")").length;
        const openParensBefore = nlBefore.split("(").length - closeParensBefore;
        let cleanAfter = nlAfter;
        for (let i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        const dollar = nlAfter === "" && isSub !== SUBPARSE ? "(?:$|\\/)" : "";
        re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart() + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (options.nocase && !hasMagic) {
        hasMagic = pattern.toUpperCase() !== pattern.toLowerCase();
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      const flags = options.nocase ? "i" : "";
      try {
        return Object.assign(new RegExp("^" + re + "$", flags), {
          _glob: pattern,
          _src: re
        });
      } catch (er) {
        return new RegExp("$.");
      }
    }
    makeRe() {
      if (this.regexp || this.regexp === false) return this.regexp;
      const set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      const options = this.options;
      const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      const flags = options.nocase ? "i" : "";
      let re = set.map((pattern) => {
        pattern = pattern.map(
          (p) => typeof p === "string" ? regExpEscape(p) : p === GLOBSTAR ? GLOBSTAR : p._src
        ).reduce((set2, p) => {
          if (!(set2[set2.length - 1] === GLOBSTAR && p === GLOBSTAR)) {
            set2.push(p);
          }
          return set2;
        }, []);
        pattern.forEach((p, i) => {
          if (p !== GLOBSTAR || pattern[i - 1] === GLOBSTAR) {
            return;
          }
          if (i === 0) {
            if (pattern.length > 1) {
              pattern[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + pattern[i + 1];
            } else {
              pattern[i] = twoStar;
            }
          } else if (i === pattern.length - 1) {
            pattern[i - 1] += "(?:\\/|" + twoStar + ")?";
          } else {
            pattern[i - 1] += "(?:\\/|\\/" + twoStar + "\\/)" + pattern[i + 1];
            pattern[i + 1] = GLOBSTAR;
          }
        });
        return pattern.filter((p) => p !== GLOBSTAR).join("/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate) re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    match(f, partial = this.partial) {
      this.debug("match", f, this.pattern);
      if (this.comment) return false;
      if (this.empty) return f === "";
      if (f === "/" && partial) return true;
      const options = this.options;
      if (path2.sep !== "/") {
        f = f.split(path2.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      const set = this.set;
      this.debug(this.pattern, "set", set);
      let filename;
      for (let i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename) break;
      }
      for (let i = 0; i < set.length; i++) {
        const pattern = set[i];
        let file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        const hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate) return true;
          return !this.negate;
        }
      }
      if (options.flipNegate) return false;
      return this.negate;
    }
    static defaults(def) {
      return minimatch.defaults(def).Minimatch;
    }
  }
  minimatch.Minimatch = Minimatch;
  return minimatch_1$1;
}
var minimatch_1;
var hasRequiredMinimatch;
function requireMinimatch() {
  if (hasRequiredMinimatch) return minimatch_1;
  hasRequiredMinimatch = 1;
  minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch;
  var path2 = (function() {
    try {
      return require("path");
    } catch (e) {
    }
  })() || {
    sep: "/"
  };
  minimatch.sep = path2.sep;
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = requireBraceExpansion$1();
  var plTypes = {
    "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
    "?": { open: "(?:", close: ")?" },
    "+": { open: "(?:", close: ")+" },
    "*": { open: "(?:", close: ")*" },
    "@": { open: "(?:", close: ")" }
  };
  var qmark = "[^/]";
  var star = qmark + "*?";
  var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
  var reSpecials = charSet("().*{}+?[]^$\\!");
  function charSet(s) {
    return s.split("").reduce(function(set, c) {
      set[c] = true;
      return set;
    }, {});
  }
  var slashSplit = /\/+/;
  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function(p, i, list) {
      return minimatch(p, pattern, options);
    };
  }
  function ext(a, b) {
    b = b || {};
    var t = {};
    Object.keys(a).forEach(function(k) {
      t[k] = a[k];
    });
    Object.keys(b).forEach(function(k) {
      t[k] = b[k];
    });
    return t;
  }
  minimatch.defaults = function(def) {
    if (!def || typeof def !== "object" || !Object.keys(def).length) {
      return minimatch;
    }
    var orig = minimatch;
    var m = function minimatch2(p, pattern, options) {
      return orig(p, pattern, ext(def, options));
    };
    m.Minimatch = function Minimatch2(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };
    m.Minimatch.defaults = function defaults(options) {
      return orig.defaults(ext(def, options)).Minimatch;
    };
    m.filter = function filter2(pattern, options) {
      return orig.filter(pattern, ext(def, options));
    };
    m.defaults = function defaults(options) {
      return orig.defaults(ext(def, options));
    };
    m.makeRe = function makeRe2(pattern, options) {
      return orig.makeRe(pattern, ext(def, options));
    };
    m.braceExpand = function braceExpand2(pattern, options) {
      return orig.braceExpand(pattern, ext(def, options));
    };
    m.match = function(list, pattern, options) {
      return orig.match(list, pattern, ext(def, options));
    };
    return m;
  };
  Minimatch.defaults = function(def) {
    return minimatch.defaults(def).Minimatch;
  };
  function minimatch(p, pattern, options) {
    assertValidPattern(pattern);
    if (!options) options = {};
    if (!options.nocomment && pattern.charAt(0) === "#") {
      return false;
    }
    return new Minimatch(pattern, options).match(p);
  }
  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }
    assertValidPattern(pattern);
    if (!options) options = {};
    pattern = pattern.trim();
    if (!options.allowWindowsEscape && path2.sep !== "/") {
      pattern = pattern.split(path2.sep).join("/");
    }
    this.options = options;
    this.maxGlobstarRecursion = options.maxGlobstarRecursion !== void 0 ? options.maxGlobstarRecursion : 200;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.make();
  }
  Minimatch.prototype.debug = function() {
  };
  Minimatch.prototype.make = make;
  function make() {
    var pattern = this.pattern;
    var options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    var set = this.globSet = this.braceExpand();
    if (options.debug) this.debug = function debug() {
      console.error.apply(console, arguments);
    };
    this.debug(this.pattern, set);
    set = this.globParts = set.map(function(s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set);
    set = set.map(function(s, si, set2) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set);
    set = set.filter(function(s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }
  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate) return;
    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }
  minimatch.braceExpand = function(pattern, options) {
    return braceExpand(pattern, options);
  };
  Minimatch.prototype.braceExpand = braceExpand;
  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }
    pattern = typeof pattern === "undefined" ? this.pattern : pattern;
    assertValidPattern(pattern);
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
      return [pattern];
    }
    return expand(pattern);
  }
  var MAX_PATTERN_LENGTH = 1024 * 64;
  var assertValidPattern = function(pattern) {
    if (typeof pattern !== "string") {
      throw new TypeError("invalid pattern");
    }
    if (pattern.length > MAX_PATTERN_LENGTH) {
      throw new TypeError("pattern is too long");
    }
  };
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    assertValidPattern(pattern);
    var options = this.options;
    if (pattern === "**") {
      if (!options.noglobstar)
        return GLOBSTAR;
      else
        pattern = "*";
    }
    if (pattern === "") return "";
    var re = "";
    var hasMagic = !!options.nocase;
    var escaping = false;
    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
    var self = this;
    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
          case "*":
            re += star;
            hasMagic = true;
            break;
          case "?":
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += "\\" + stateChar;
            break;
        }
        self.debug("clearStateChar %j %j", stateChar, re);
        stateChar = false;
      }
    }
    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug("%s	%s %s %j", pattern, i, re, c);
      if (escaping && reSpecials[c]) {
        re += "\\" + c;
        escaping = false;
        continue;
      }
      switch (c) {
        /* istanbul ignore next */
        case "/": {
          return false;
        }
        case "\\":
          clearStateChar();
          escaping = true;
          continue;
        // the various stateChar values
        // for the "extglob" stuff.
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
          if (inClass) {
            this.debug("  in class");
            if (c === "!" && i === classStart + 1) c = "^";
            re += c;
            continue;
          }
          if (c === "*" && stateChar === "*") continue;
          self.debug("call clearStateChar %j", stateChar);
          clearStateChar();
          stateChar = c;
          if (options.noext) clearStateChar();
          continue;
        case "(":
          if (inClass) {
            re += "(";
            continue;
          }
          if (!stateChar) {
            re += "\\(";
            continue;
          }
          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
          this.debug("plType %j %j", stateChar, re);
          stateChar = false;
          continue;
        case ")":
          if (inClass || !patternListStack.length) {
            re += "\\)";
            continue;
          }
          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();
          re += pl.close;
          if (pl.type === "!") {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
          continue;
        case "|":
          if (inClass || !patternListStack.length || escaping) {
            re += "\\|";
            escaping = false;
            continue;
          }
          clearStateChar();
          re += "|";
          continue;
        // these are mostly the same in regexp and glob
        case "[":
          clearStateChar();
          if (inClass) {
            re += "\\" + c;
            continue;
          }
          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;
        case "]":
          if (i === classStart + 1 || !inClass) {
            re += "\\" + c;
            escaping = false;
            continue;
          }
          var cs = pattern.substring(classStart + 1, i);
          try {
            RegExp("[" + cs + "]");
          } catch (er) {
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue;
          }
          hasMagic = true;
          inClass = false;
          re += c;
          continue;
        default:
          clearStateChar();
          if (escaping) {
            escaping = false;
          } else if (reSpecials[c] && !(c === "^" && inClass)) {
            re += "\\";
          }
          re += c;
      }
    }
    if (inClass) {
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + "\\[" + sp[0];
      hasMagic = hasMagic || sp[1];
    }
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug("setting tail", re, pl);
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
        if (!$2) {
          $2 = "\\";
        }
        return $1 + $1 + $2 + "|";
      });
      this.debug("tail=%j\n   %s", tail, tail, pl, re);
      var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + "\\(" + tail;
    }
    clearStateChar();
    if (escaping) {
      re += "\\\\";
    }
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case "[":
      case ".":
      case "(":
        addPatternStart = true;
    }
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter;
      var openParensBefore = nlBefore.split("(").length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
      }
      nlAfter = cleanAfter;
      var dollar = "";
      if (nlAfter === "" && isSub !== SUBPARSE) {
        dollar = "$";
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }
    if (re !== "" && hasMagic) {
      re = "(?=.)" + re;
    }
    if (addPatternStart) {
      re = patternStart + re;
    }
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }
    if (!hasMagic) {
      return globUnescape(pattern);
    }
    var flags = options.nocase ? "i" : "";
    try {
      var regExp = new RegExp("^" + re + "$", flags);
    } catch (er) {
      return new RegExp("$.");
    }
    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }
  minimatch.makeRe = function(pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };
  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    var set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? "i" : "";
    var re = set.map(function(pattern) {
      return pattern.map(function(p) {
        return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
      }).join("\\/");
    }).join("|");
    re = "^(?:" + re + ")$";
    if (this.negate) re = "^(?!" + re + ").*$";
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  minimatch.match = function(list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function(f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  Minimatch.prototype.match = function match(f, partial) {
    if (typeof partial === "undefined") partial = this.partial;
    this.debug("match", f, this.pattern);
    if (this.comment) return false;
    if (this.empty) return f === "";
    if (f === "/" && partial) return true;
    var options = this.options;
    if (path2.sep !== "/") {
      f = f.split(path2.sep).join("/");
    }
    f = f.split(slashSplit);
    this.debug(this.pattern, "split", f);
    var set = this.set;
    this.debug(this.pattern, "set", set);
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break;
    }
    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) return true;
        return !this.negate;
      }
    }
    if (options.flipNegate) return false;
    return this.negate;
  };
  Minimatch.prototype.matchOne = function(file, pattern, partial) {
    if (pattern.indexOf(GLOBSTAR) !== -1) {
      return this._matchGlobstar(file, pattern, partial, 0, 0);
    }
    return this._matchOne(file, pattern, partial, 0, 0);
  };
  Minimatch.prototype._matchGlobstar = function(file, pattern, partial, fileIndex, patternIndex) {
    var i;
    var firstgs = -1;
    for (i = patternIndex; i < pattern.length; i++) {
      if (pattern[i] === GLOBSTAR) {
        firstgs = i;
        break;
      }
    }
    var lastgs = -1;
    for (i = pattern.length - 1; i >= 0; i--) {
      if (pattern[i] === GLOBSTAR) {
        lastgs = i;
        break;
      }
    }
    var head = pattern.slice(patternIndex, firstgs);
    var body = partial ? pattern.slice(firstgs + 1) : pattern.slice(firstgs + 1, lastgs);
    var tail = partial ? [] : pattern.slice(lastgs + 1);
    if (head.length) {
      var fileHead = file.slice(fileIndex, fileIndex + head.length);
      if (!this._matchOne(fileHead, head, partial, 0, 0)) {
        return false;
      }
      fileIndex += head.length;
    }
    var fileTailMatch = 0;
    if (tail.length) {
      if (tail.length + fileIndex > file.length) return false;
      var tailStart = file.length - tail.length;
      if (this._matchOne(file, tail, partial, tailStart, 0)) {
        fileTailMatch = tail.length;
      } else {
        if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) {
          return false;
        }
        tailStart--;
        if (!this._matchOne(file, tail, partial, tailStart, 0)) {
          return false;
        }
        fileTailMatch = tail.length + 1;
      }
    }
    if (!body.length) {
      var sawSome = !!fileTailMatch;
      for (i = fileIndex; i < file.length - fileTailMatch; i++) {
        var f = String(file[i]);
        sawSome = true;
        if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
          return false;
        }
      }
      return partial || sawSome;
    }
    var bodySegments = [[[], 0]];
    var currentBody = bodySegments[0];
    var nonGsParts = 0;
    var nonGsPartsSums = [0];
    for (var bi = 0; bi < body.length; bi++) {
      var b = body[bi];
      if (b === GLOBSTAR) {
        nonGsPartsSums.push(nonGsParts);
        currentBody = [[], 0];
        bodySegments.push(currentBody);
      } else {
        currentBody[0].push(b);
        nonGsParts++;
      }
    }
    var idx = bodySegments.length - 1;
    var fileLength = file.length - fileTailMatch;
    for (var si = 0; si < bodySegments.length; si++) {
      bodySegments[si][1] = fileLength - (nonGsPartsSums[idx--] + bodySegments[si][0].length);
    }
    return !!this._matchGlobStarBodySections(
      file,
      bodySegments,
      fileIndex,
      0,
      partial,
      0,
      !!fileTailMatch
    );
  };
  Minimatch.prototype._matchGlobStarBodySections = function(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
    var bs = bodySegments[bodyIndex];
    if (!bs) {
      for (var i = fileIndex; i < file.length; i++) {
        sawTail = true;
        var f = file[i];
        if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
          return false;
        }
      }
      return sawTail;
    }
    var body = bs[0];
    var after = bs[1];
    while (fileIndex <= after) {
      var m = this._matchOne(
        file.slice(0, fileIndex + body.length),
        body,
        partial,
        fileIndex,
        0
      );
      if (m && globStarDepth < this.maxGlobstarRecursion) {
        var sub = this._matchGlobStarBodySections(
          file,
          bodySegments,
          fileIndex + body.length,
          bodyIndex + 1,
          partial,
          globStarDepth + 1,
          sawTail
        );
        if (sub !== false) {
          return sub;
        }
      }
      var f = file[fileIndex];
      if (f === "." || f === ".." || !this.options.dot && f.charAt(0) === ".") {
        return false;
      }
      fileIndex++;
    }
    return partial || null;
  };
  Minimatch.prototype._matchOne = function(file, pattern, partial, fileIndex, patternIndex) {
    var fi, pi, fl, pl;
    for (fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false || p === GLOBSTAR) return false;
      var hit;
      if (typeof p === "string") {
        hit = f === p;
        this.debug("string match", p, f, hit);
      } else {
        hit = f.match(p);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit) return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      return fi === fl - 1 && file[fi] === "";
    }
    throw new Error("wtf?");
  };
  function globUnescape(s) {
    return s.replace(/\\(.)/g, "$1");
  }
  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  return minimatch_1;
}
export {
  requireMinimatch as a,
  requireMinimatch$1 as r
};
