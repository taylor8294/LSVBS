// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_fails":"node_modules/core-js/modules/_fails.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js"}],"node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"node_modules/core-js/modules/_core.js","./_global":"node_modules/core-js/modules/_global.js","./_library":"node_modules/core-js/modules/_library.js"}],"node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"node_modules/core-js/modules/_shared.js"}],"node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_has":"node_modules/core-js/modules/_has.js","./_uid":"node_modules/core-js/modules/_uid.js","./_function-to-string":"node_modules/core-js/modules/_function-to-string.js","./_core":"node_modules/core-js/modules/_core.js"}],"node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_ctx":"node_modules/core-js/modules/_ctx.js"}],"node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js"}],"node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js"}],"node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"node_modules/core-js/modules/_shared.js","./_uid":"node_modules/core-js/modules/_uid.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js","./_hide":"node_modules/core-js/modules/_hide.js"}],"node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-copy-within":"node_modules/core-js/modules/_array-copy-within.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_array-fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_is-array":"node_modules/core-js/modules/_is-array.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"node_modules/core-js/modules/_array-species-constructor.js"}],"node_modules/core-js/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_array-species-create":"node_modules/core-js/modules/_array-species-create.js"}],"node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"node_modules/core-js/modules/_iterators.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js"}],"node_modules/core-js/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"node_modules/core-js/modules/_cof.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"node_modules/core-js/modules/_classof.js","./_wks":"node_modules/core-js/modules/_wks.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_core":"node_modules/core-js/modules/_core.js"}],"node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_iter-call":"node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_create-property":"node_modules/core-js/modules/_create-property.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js"}],"node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"node_modules/core-js/modules/_iobject.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js"}],"node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"node_modules/core-js/modules/_shared.js","./_uid":"node_modules/core-js/modules/_uid.js"}],"node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"node_modules/core-js/modules/_has.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js"}],"node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js"}],"node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-dps":"node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js","./_html":"node_modules/core-js/modules/_html.js"}],"node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_has":"node_modules/core-js/modules/_has.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"node_modules/core-js/modules/_object-create.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"node_modules/core-js/modules/_hide.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"node_modules/core-js/modules/_has.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js"}],"node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"node_modules/core-js/modules/_library.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_hide":"node_modules/core-js/modules/_hide.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_iter-create":"node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"node_modules/core-js/modules/_iter-step.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js"}],"node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_create-property":"node_modules/core-js/modules/_create-property.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/_date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js"}],"node_modules/core-js/modules/es6.date.to-primitive.js":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"node_modules/core-js/modules/_wks.js","./_hide":"node_modules/core-js/modules/_hide.js","./_date-to-primitive":"node_modules/core-js/modules/_date-to-primitive.js"}],"node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_wks":"node_modules/core-js/modules/_wks.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js"}],"node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"node_modules/core-js/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_iter-call":"node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js"}],"node_modules/core-js/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"node_modules/core-js/modules/_uid.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_has":"node_modules/core-js/modules/_has.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js","./_iter-step":"node_modules/core-js/modules/_iter-step.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_meta":"node_modules/core-js/modules/_meta.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js"}],"node_modules/core-js/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_has":"node_modules/core-js/modules/_has.js","./_ie8-dom-define":"node_modules/core-js/modules/_ie8-dom-define.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_set-proto.js":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js"}],"node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_set-proto":"node_modules/core-js/modules/_set-proto.js"}],"node_modules/core-js/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_meta":"node_modules/core-js/modules/_meta.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js"}],"node_modules/core-js/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-log1p":"node_modules/core-js/modules/_math-log1p.js"}],"node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_math-sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js"}],"node_modules/core-js/modules/_math-fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-fround":"node_modules/core-js/modules/_math-fround.js"}],"node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-log1p":"node_modules/core-js/modules/_math-log1p.js"}],"node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js"}],"node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js"}],"node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"node_modules/core-js/modules/_export.js","./_defined":"node_modules/core-js/modules/_defined.js","./_fails":"node_modules/core-js/modules/_fails.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"node_modules/core-js/modules/_global.js","./_has":"node_modules/core-js/modules/_has.js","./_cof":"node_modules/core-js/modules/_cof.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_fails":"node_modules/core-js/modules/_fails.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_is-integer":"node_modules/core-js/modules/_is-integer.js"}],"node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_is-integer":"node_modules/core-js/modules/_is-integer.js"}],"node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"node_modules/core-js/modules/_global.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-float":"node_modules/core-js/modules/_parse-float.js"}],"node_modules/core-js/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"node_modules/core-js/modules/_global.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-int":"node_modules/core-js/modules/_parse-int.js"}],"node_modules/core-js/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"node_modules/core-js/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-assign":"node_modules/core-js/modules/_object-assign.js"}],"node_modules/core-js/modules/_object-forced-pam.js":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"node_modules/core-js/modules/_library.js","./_fails":"node_modules/core-js/modules/_fails.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es7.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es7.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports) {
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js"}],"node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-to-array":"node_modules/core-js/modules/_object-to-array.js"}],"node_modules/core-js/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"node_modules/core-js/modules/_export.js","./_core":"node_modules/core-js/modules/_core.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_own-keys":"node_modules/core-js/modules/_own-keys.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_create-property":"node_modules/core-js/modules/_create-property.js"}],"node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js"}],"node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"node_modules/core-js/modules/_object-sap.js","./_object-gopn-ext":"node_modules/core-js/modules/_object-gopn-ext.js"}],"node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/_same-value.js":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_same-value":"node_modules/core-js/modules/_same-value.js"}],"node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-to-array":"node_modules/core-js/modules/_object-to-array.js"}],"node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_invoke":"node_modules/core-js/modules/_invoke.js","./_html":"node_modules/core-js/modules/_html.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js","./_global":"node_modules/core-js/modules/_global.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_task":"node_modules/core-js/modules/_task.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"node_modules/core-js/modules/_new-promise-capability.js"}],"node_modules/core-js/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"node_modules/core-js/modules/_library.js","./_global":"node_modules/core-js/modules/_global.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_classof":"node_modules/core-js/modules/_classof.js","./_export":"node_modules/core-js/modules/_export.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_task":"node_modules/core-js/modules/_task.js","./_microtask":"node_modules/core-js/modules/_microtask.js","./_new-promise-capability":"node_modules/core-js/modules/_new-promise-capability.js","./_perform":"node_modules/core-js/modules/_perform.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js","./_promise-resolve":"node_modules/core-js/modules/_promise-resolve.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_core":"node_modules/core-js/modules/_core.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js"}],"node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"node_modules/core-js/modules/_export.js","./_core":"node_modules/core-js/modules/_core.js","./_global":"node_modules/core-js/modules/_global.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"node_modules/core-js/modules/_promise-resolve.js"}],"node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_global":"node_modules/core-js/modules/_global.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_invoke":"node_modules/core-js/modules/_invoke.js"}],"node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_bind":"node_modules/core-js/modules/_bind.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_has":"node_modules/core-js/modules/_has.js","./_export":"node_modules/core-js/modules/_export.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_own-keys":"node_modules/core-js/modules/_own-keys.js"}],"node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_has":"node_modules/core-js/modules/_has.js","./_export":"node_modules/core-js/modules/_export.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_set-proto":"node_modules/core-js/modules/_set-proto.js"}],"node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_cof":"node_modules/core-js/modules/_cof.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_flags.js":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"node_modules/core-js/modules/_global.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_flags":"node_modules/core-js/modules/_flags.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_fails":"node_modules/core-js/modules/_fails.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_flags":"node_modules/core-js/modules/_flags.js"}],"node_modules/core-js/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_advance-string-index.js":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"node_modules/core-js/modules/_string-at.js"}],"node_modules/core-js/modules/_regexp-exec-abstract.js":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"node_modules/core-js/modules/_classof.js"}],"node_modules/core-js/modules/_regexp-exec.js":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"node_modules/core-js/modules/_flags.js"}],"node_modules/core-js/modules/es6.regexp.exec.js":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js","./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"node_modules/core-js/modules/es6.regexp.exec.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_hide":"node_modules/core-js/modules/_hide.js","./_fails":"node_modules/core-js/modules/_fails.js","./_defined":"node_modules/core-js/modules/_defined.js","./_wks":"node_modules/core-js/modules/_wks.js","./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js"}],"node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js","./_fails":"node_modules/core-js/modules/_fails.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_same-value":"node_modules/core-js/modules/_same-value.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"node_modules/core-js/modules/es6.regexp.flags.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_flags":"node_modules/core-js/modules/_flags.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.set.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_library":"node_modules/core-js/modules/_library.js","./_wks-ext":"node_modules/core-js/modules/_wks-ext.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js"}],"node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js"}],"node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"node_modules/core-js/modules/_global.js","./_has":"node_modules/core-js/modules/_has.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_meta":"node_modules/core-js/modules/_meta.js","./_fails":"node_modules/core-js/modules/_fails.js","./_shared":"node_modules/core-js/modules/_shared.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_uid":"node_modules/core-js/modules/_uid.js","./_wks":"node_modules/core-js/modules/_wks.js","./_wks-ext":"node_modules/core-js/modules/_wks-ext.js","./_wks-define":"node_modules/core-js/modules/_wks-define.js","./_enum-keys":"node_modules/core-js/modules/_enum-keys.js","./_is-array":"node_modules/core-js/modules/_is-array.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_object-gopn-ext":"node_modules/core-js/modules/_object-gopn-ext.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_library":"node_modules/core-js/modules/_library.js","./_hide":"node_modules/core-js/modules/_hide.js"}],"node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"node_modules/core-js/modules/_wks-define.js"}],"node_modules/core-js/modules/_string-html.js":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"node_modules/core-js/modules/_export.js","./_fails":"node_modules/core-js/modules/_fails.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-at":"node_modules/core-js/modules/_string-at.js"}],"node_modules/core-js/modules/_string-context.js":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js"}],"node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"node_modules/core-js/modules/_string-at.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js"}],"node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-repeat":"node_modules/core-js/modules/_string-repeat.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-pad":"node_modules/core-js/modules/_string-pad.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-pad":"node_modules/core-js/modules/_string-pad.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-repeat":"node_modules/core-js/modules/_string-repeat.js"}],"node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/_typed.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_uid":"node_modules/core-js/modules/_uid.js"}],"node_modules/core-js/modules/_to-index.js":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"node_modules/core-js/modules/_global.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_library":"node_modules/core-js/modules/_library.js","./_typed":"node_modules/core-js/modules/_typed.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_fails":"node_modules/core-js/modules/_fails.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-index":"node_modules/core-js/modules/_to-index.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js"}],"node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"node_modules/core-js/modules/_export.js","./_typed":"node_modules/core-js/modules/_typed.js","./_typed-buffer":"node_modules/core-js/modules/_typed-buffer.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_global":"node_modules/core-js/modules/_global.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_fails":"node_modules/core-js/modules/_fails.js","./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/_typed-array.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_library":"node_modules/core-js/modules/_library.js","./_global":"node_modules/core-js/modules/_global.js","./_fails":"node_modules/core-js/modules/_fails.js","./_export":"node_modules/core-js/modules/_export.js","./_typed":"node_modules/core-js/modules/_typed.js","./_typed-buffer":"node_modules/core-js/modules/_typed-buffer.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-index":"node_modules/core-js/modules/_to-index.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_has":"node_modules/core-js/modules/_has.js","./_classof":"node_modules/core-js/modules/_classof.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js","./_uid":"node_modules/core-js/modules/_uid.js","./_wks":"node_modules/core-js/modules/_wks.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_array-copy-within":"node_modules/core-js/modules/_array-copy-within.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js"}],"node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_meta":"node_modules/core-js/modules/_meta.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_has":"node_modules/core-js/modules/_has.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js"}],"node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"node_modules/core-js/modules/_global.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-assign":"node_modules/core-js/modules/_object-assign.js","./_collection-weak":"node_modules/core-js/modules/_collection-weak.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"node_modules/core-js/modules/_collection-weak.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"node_modules/core-js/modules/_is-array.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"node_modules/core-js/modules/_export.js","./_flatten-into-array":"node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_array-species-create":"node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"node_modules/core-js/modules/_global.js","./_export":"node_modules/core-js/modules/_export.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_task":"node_modules/core-js/modules/_task.js"}],"node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);

},{}],"scripts/utils.js":[function(require,module,exports) {
// Prototype additions
String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

Date.prototype.toFormattedString = function (addTh) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var day = this.getDate(),
      monthIndex = this.getMonth(),
      year = this.getFullYear();
  var th = 'th';
  if (day == 1 || day == 21 || day == 31) th = 'st';else if (day == 2 || day == 22) th = 'nd';else if (day == 3 || day == 23) th = 'rd';
  return day + (addTh ? th : '') + ' ' + months[monthIndex] + ' ' + year;
};

if (Number.isFinite === undefined) Number.isFinite = function (value) {
  return typeof value === 'number' && isFinite(value);
};

Number.prototype.toFixedCommas = function (num) {
  if (num === undefined) num = this != 0 && Math.abs(this) < 1 ? 2 : 0;
  if (num == 0) return this.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");else return (Math.floor(this) + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (this - Math.floor(this)).toFixed(num).replace('0.', '.');
};

$('#panelBodyPNL_BENSTAT_ANIM [role="button"]').each(function (i, btn) {
  btn.addEventListener('keydown', function (evt) {
    if (evt.keyCode == 13 || evt.keyCode == 32) {
      evt.preventDefault();
      btn.click();
    }
  });
});
},{}],"scripts/k.js":[function(require,module,exports) {
window.VBS = window.VBS || {};
window["\x56\x42\x53"]["\x4B\x31"] = "\x41\x49\x7A\x61\x53\x79\x44\x41\x65";
window["\x56\x42\x53"]["\x4B\x32"] = "\x78\x66\x49\x58\x63\x57\x30\x4F\x36\x44";
window["\x56\x42\x53"]["\x4B\x33"] = "\x57\x70\x55\x6D\x33\x46\x33\x52\x58\x6F\x48\x36\x71\x6D\x32\x73";
},{}],"scripts/matomoSetup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matomoSetup = matomoSetup;

function matomoSetup() {
  window.VBS = window.VBS || {}; //mock analytics object until loaded so no exceptions cause on early play

  VBS.tracker = {
    play: function play() {},
    pause: function pause() {},
    finish: function finish() {},
    setMediaProgressInSeconds: function setMediaProgressInSeconds() {},
    setMediaTotalLengthInSeconds: function setMediaTotalLengthInSeconds() {},
    setWidth: function setWidth() {},
    setHeight: function setHeight() {},
    update: function update() {},
    seekStart: function seekStart() {},
    seekFinish: function seekFinish() {},
    trackUpdate: function trackUpdate() {},
    trackEvent: function trackEvent() {}
  };

  window.piwikMediaAnalyticsAsyncInit = function () {
    var MA = Piwik.MediaAnalytics;

    function VBSPlayer(node, mediaType) {
      if (node.hasPlayerInstance) {
        // prevent creating multiple trackers for the same media
        // when scanning for media multiple times
        return;
      }

      node.hasPlayerInstance = true;
      window.VBS.tracker = new MA.MediaTracker('VBSTracker', mediaType, document.location.href);
      VBS.tracker.setMediaTitle('Video Statement 2019');
      VBS.tracker.setFullscreen(false);
      VBS.tracker.trackUpdate(); // Submit events that would have been missed if already playing

      if (VBS.timeline.isActive()) {
        VBS.tracker.setMediaTotalLengthInSeconds(VBS.timeline.duration());
        VBS.tracker.play();
      }
    }

    VBSPlayer.scanForMedia = function (documentOrElement) {
      if (!documentOrElement) documentOrElement = document; // find all medias for your player

      var vbsPanel = documentOrElement.getElementById('panelBodyPNL_BENSTAT_ANIM');

      if (vbsPanel) {
        // for each of the medias found, create an instance of your player
        new VBSPlayer(vbsPanel, MA.mediaType.VIDEO);
      }
    }; // adding the newly created player to the Media Analytics tracker


    MA.addPlayer('VBSPlayer', VBSPlayer);
  };

  if (window.Piwik && Piwik.MediaAnalytics) window.piwikMediaAnalyticsAsyncInit();
}
},{}],"scripts/pixiSetup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pixiSetup = pixiSetup;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function pixiSetup() {
  /*********
   * Setup *
   *********/
  // Aliases
  var _PIXI = PIXI,
      Application = _PIXI.Application,
      resources = _PIXI.resources,
      Sprite = _PIXI.Sprite,
      Grapghics = _PIXI.Grapghics; // Vars

  window.VBS = window.VBS || {};
  window.VBS.pixi = {};
  var app, stage, loader, WIDTH, HEIGHT, SCALE, MARGIN, life, sight, wtw, arrow, jar, interactive;
  WIDTH = window.VBS.pixi.WIDTH = 512;
  HEIGHT = window.VBS.pixi.HEIGHT = 640;
  SCALE = window.VBS.pixi.SCALE = 40;
  MARGIN = window.VBS.pixi.MARGIN = 0.1;
  loader = PIXI.Loader.shared;
  window.VBS.pixi.assetsLoaded = false; // Create a Pixi Application

  function isIE() {
    var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object

    var msie = ua.indexOf('MSIE '); // IE 10 or older

    var trident = ua.indexOf('Trident/'); //IE 11

    return msie > 0 || trident > 0;
  }

  app = window.VBS.pixi.app = new Application({
    width: WIDTH,
    height: HEIGHT,
    antialias: true,
    transparent: true //backgroundColor: 0xffffff,
    //forceCanvas: isIE()

  });
  stage = app.stage;
  var baseTextStyle = VBS.pixi.baseTextStyle = new PIXI.TextStyle({
    fontFamily: ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'],
    fontSize: 36,
    fill: 0x575756,
    align: 'left'
  });

  if (app.renderer.type !== PIXI.RENDERER_TYPE.WEBGL) {
    app.renderer.context.mozImageSmoothingEnabled = false;
    app.renderer.context.webkitImageSmoothingEnabled = false;
  } // Fix for iOS GPU issues


  app.view.style['transform'] = 'translatez(0)'; // Allow scroll on canvas when not preventing default

  app.view.style['touch-action'] = 'auto';
  app.renderer.plugins.interaction.autoPreventDefault = false; // Add the canvas that Pixi automatically created to the HTML document and disable context menu

  VBS.$el.find('.anim-canvas-wrap').append(app.view);
  app.view.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });
  VBS.tracker.setWidth(app.view.clientWidth);
  VBS.tracker.setHeight(app.view.clientHeight); // Load assets

  loader.add('life', './static/LIF/vbs/img/life.png').add('sight', './static/LIF/vbs/img/sight.png').add('wtw', './static/LIF/vbs/img/wtw.png').add('freq', './static/LIF/vbs/audio/freq.json').add('jar', './static/LIF/vbs/img/jar.png').add('interactive', './static/LIF/vbs/img/interactive.png').load(onAssetsLoaded);
  /*loader.onProgress.add((loader,res)=>{
      console.log(loader.progress+"%")
  })*/

  loader.onError.add(function (err, loader, res) {
    console.error(res.name + " failed to load!");
    window.VBS.ABORT = true;
  });

  function onAssetsLoaded() {
    window.VBS.pixi.assetsLoaded = true;
    life = window.VBS.pixi.life = new PIXI.Sprite(PIXI.Loader.shared.resources['life'].texture);
    var ratio = 290 / 512,
        sfac = WIDTH / 2 / 512,
        // Scale to half pixi width
    x = WIDTH / 4,
        y = HEIGHT / 2 - ratio * (WIDTH / 4);
    life.scale.set(sfac, sfac);
    life.position.set(x, y);
    stage.addChild(life);
    var lifeMask = new PIXI.Graphics();
    lifeMask.position.x = 0;
    lifeMask.position.y = 0;
    lifeMask.beginFill(0xffffff);
    lifeMask.drawRect(0, 0, WIDTH / 4 + 230 / 512 * (WIDTH / 2), HEIGHT);
    lifeMask.cacheAsBitmap = true;
    stage.addChild(lifeMask);
    life.mask = lifeMask;
    sight = window.VBS.pixi.sight = new PIXI.Sprite(PIXI.Loader.shared.resources['sight'].texture);
    sight.scale.set(sfac, sfac);
    sight.position.set(x, y);
    stage.addChild(sight);
    var sightMask = new PIXI.Graphics();
    sightMask.position.x = 0;
    sightMask.position.y = 0;
    sightMask.beginFill(0xffffff);
    sightMask.drawRect(WIDTH / 4 + 230 / 512 * (WIDTH / 2), 0, WIDTH, HEIGHT);
    sightMask.cacheAsBitmap = true;
    stage.addChild(sightMask);
    sight.mask = sightMask;
    wtw = window.VBS.pixi.wtw = new PIXI.Sprite(PIXI.Loader.shared.resources['wtw'].texture);
    wtw.scale.set(sfac, sfac);
    wtw.position.set(x, y);
    stage.addChild(wtw); // arrow = window.VBS.pixi.arrow = new PIXI.Sprite(PIXI.Loader.shared.resources['arrow'].texture)
    // //ratio = PIXI.Loader.shared.resources['arrow'].data.naturalHeight/PIXI.Loader.shared.resources['arrow'].data.naturalWidth
    // sfac = (WIDTH/2)/PIXI.Loader.shared.resources['arrow'].data.naturalWidth // Scale to half width
    // arrow.scale.set(sfac,sfac)
    // arrow.position.set(WIDTH/4,-HEIGHT/2)
    // arrow.rotation = 60*Math.PI/180
    // //arrow.visible = false
    // stage.addChild(arrow)

    var pointer = window.VBS.pixi.pointer = new PIXI.Graphics();
    var pointerLength = 3 * Math.min(WIDTH, HEIGHT) / 4,
        pointerWidth = 45;
    pointer.beginFill(0x009fd2);
    pointer.drawRect(0, 20, pointerWidth, pointerLength - 20);
    pointer.moveTo(0, 20);
    pointer.lineTo(pointerWidth / 2, 0);
    pointer.lineTo(pointerWidth, 20);
    pointer.endFill();
    pointer.pivot.set(pointerWidth / 2, pointerLength / 2);
    pointer.position.set(WIDTH / 2, HEIGHT / 2);
    pointer.alpha = 0;
    stage.addChild(pointer);
    window.VBS.pixi.freq = PIXI.Loader.shared.resources['freq'].data;
    jar = window.VBS.pixi.jar = new PIXI.Sprite(PIXI.Loader.shared.resources['jar'].texture);
    sfac = 10 / (PIXI.Loader.shared.resources['jar'].data.naturalWidth / SCALE); // Scale to pixel size = ~10m wide in b2World

    jar.scale.set(sfac, sfac);
    jar.position.set(56, 80); //TODO avoid hardcoding?

    jar.visible = false;
    stage.addChildAt(jar, 0);
    interactive = window.VBS.pixi.interactive = new PIXI.Sprite(PIXI.Loader.shared.resources['interactive'].texture); //ratio = PIXI.Loader.shared.resources['interactive'].data.naturalHeight/PIXI.Loader.shared.resources['interactive'].data.naturalWidth

    sfac = WIDTH / 8 / PIXI.Loader.shared.resources['interactive'].data.naturalWidth; // Scale to 8th width

    interactive.scale.set(sfac, sfac);
    interactive.position.set(WIDTH / 8, HEIGHT - interactive.height * 2);
    interactive.rotation = 30 * Math.PI / 180;
    interactive.alpha = 0; //interactive.visible = false

    stage.addChild(interactive); // Interactive text

    var textStyle = baseTextStyle.clone();
    textStyle.fontSize = 16;
    var interactiveString = 'Interactive!';
    var textMetrics = PIXI.TextMetrics.measureText(interactiveString, textStyle);
    var interactiveText = VBS.pixi.interactiveText = new PIXI.Text(interactiveString, textStyle);
    interactiveText.position.set(WIDTH / 8 - textMetrics.width / 2, HEIGHT - interactive.height / 2);
    interactiveText.alpha = 0;
    stage.addChild(interactiveText);
    /*report pages
    VBS.pixi.reportPages = []
    VBS.pixi.reportPages.push(new PIXI.Sprite(PIXI.Loader.shared.resources['report'].texture))
    VBS.pixi.reportPages.push(new PIXI.Sprite(PIXI.Loader.shared.resources['report'].texture))
    VBS.pixi.reportPages.push(new PIXI.Sprite(PIXI.Loader.shared.resources['report'].texture))
    VBS.pixi.reportPages[0].scale.set(0.4, 0.4)
    VBS.pixi.reportPages[1].scale.set(0.4, 0.4)
    VBS.pixi.reportPages[2].scale.set(0.4, 0.4)
    VBS.pixi.reportPages[0].anchor.set(0.5)
    VBS.pixi.reportPages[1].anchor.set(0.5)
    VBS.pixi.reportPages[2].anchor.set(0.5)
    VBS.pixi.reportPages[0].rotation = 6*Math.PI/180
    VBS.pixi.reportPages[1].rotation = 2*Math.PI/180
    VBS.pixi.reportPages[2].rotation = -2*Math.PI/180
    VBS.pixi.reportPages[0].position.set(-WIDTH/2-VBS.pixi.reportPages[0].width/2, HEIGHT/2-VBS.pixi.reportPages[0].height/2)
    VBS.pixi.reportPages[1].position.set(3*WIDTH/2-VBS.pixi.reportPages[1].width/2, HEIGHT/2-VBS.pixi.reportPages[1].height/2)
    VBS.pixi.reportPages[2].position.set(-WIDTH/2-VBS.pixi.reportPages[2].width/2, HEIGHT/2-VBS.pixi.reportPages[2].height/2)
    stage.addChild(VBS.pixi.reportPages[0],VBS.pixi.reportPages[1],VBS.pixi.reportPages[2])*/
  }
  /*******************
   * Create elements *
   *******************/
  // Create ongoing balance figure


  VBS.pixi.balanceFigureStyle = baseTextStyle.clone();
  VBS.pixi.balanceFigureStyle.fontSize = 48;
  VBS.pixi.balanceFigureStyle.fontWeight = '400';
  VBS.pixi.balanceFigureStyle.align = 'center';
  var balanceFigureTextMetrics = PIXI.TextMetrics.measureText('£0', VBS.pixi.balanceFigureStyle);
  VBS.pixi.balanceFigure = new PIXI.Text('£0', VBS.pixi.balanceFigureStyle);
  VBS.pixi.balanceFigure.anchor.set(0.5);
  VBS.pixi.balanceFigure.position.set(WIDTH / 2, balanceFigureTextMetrics.height); //VBS.pixi.balanceFigure.pivot = {x: balanceFigureTextMetrics.width/2, y: balanceFigureTextMetrics.height/2}

  VBS.pixi.balanceFigure.alpha = 0;
  stage.addChild(VBS.pixi.balanceFigure); // Create tooltip

  var tooltip = VBS.pixi.tooltip = new PIXI.Container(),
      tooltipBg = new PIXI.Graphics(),
      tooltipTextSize = 18,
      tooltipTextStyle = new PIXI.TextStyle({
    fontFamily: ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'],
    fontSize: tooltipTextSize,
    fill: 0x333333,
    align: 'left'
  }),
      tooltipTextString = "Contributions",
      tooltipTextMetrics = PIXI.TextMetrics.measureText(tooltipTextString, tooltipTextStyle),
      tooltipH = tooltipTextMetrics.height * 1.5,
      tooltipW = tooltipTextMetrics.width + 30,
      tooltipText = new PIXI.Text(tooltipTextString, tooltipTextStyle);
  tooltipBg.beginFill(0xFFFFFF, 0.8);
  tooltipBg.lineStyle(1.5, 0x999999);
  tooltipBg.drawRect(0, 0, tooltipW, tooltipH);
  tooltipBg.endFill(); //tooltipBg.cacheAsBitmap = true

  tooltipText.position.set(15, tooltipTextMetrics.height * 0.25);
  tooltip.addChild(tooltipBg, tooltipText);
  tooltip.position.set(150, 150);
  tooltip.alpha = 0;
  stage.addChild(tooltip);

  VBS.pixi.setTooltip = function (text) {
    tooltipTextMetrics = PIXI.TextMetrics.measureText(text, tooltipTextStyle);
    VBS.pixi.tooltip.children[1].text = text;
    VBS.pixi.tooltip.width = VBS.pixi.tooltip.children[0].width = tooltipTextMetrics.width + 30;
  };

  VBS.pixi.tooltipIn = function (duration) {
    duration = duration || 0.1;
    TweenMax.to(VBS.pixi.tooltip, duration, {
      pixi: {
        alpha: 1
      }
    });
  };

  VBS.pixi.tooltipOut = function (duration) {
    duration = duration || 0.1;
    TweenMax.to(VBS.pixi.tooltip, duration, {
      pixi: {
        alpha: 0
      }
    });
  };
  /***********************
   * Convenience methods *
   ***********************/
  // Set the ongoing balance figure


  VBS.pixi.setBalanceFigure = function (num) {
    var fig = Math.abs(num);
    VBS.pixi.balanceFigure.text = (num < 0 ? '-' : '') + '£' + fig.toFixedCommas(); //VBS.pixi.balanceFigure.position.set(WIDTH/2, VBS.pixi.balanceFigure.y)
  }; // Convenience methods to make the figure and subtitles for each scene


  VBS.pixi.makeFigure = function (num) {
    var fig = Math.abs(num) < 1 ? Math.abs(num) : Math.round(Math.abs(num));
    var txt = (num < 0 ? '–' : '') + '£' + fig.toFixedCommas();
    var figureStyle = baseTextStyle.clone();
    figureStyle.fontSize = 48;
    figureStyle.fontWeight = '400';
    figureStyle.align = 'center';
    var textMetrics = PIXI.TextMetrics.measureText(txt, figureStyle);
    var figure = new PIXI.Text(txt, figureStyle);
    figure.position.set(WIDTH / 2 - textMetrics.width / 2, textMetrics.height / 2);
    return figure;
  };

  VBS.pixi.makeSubtitle = function (txt) {
    var subtitleStyle = baseTextStyle.clone();
    subtitleStyle.fontSize = 24;
    subtitleStyle.fontWeight = '400';
    subtitleStyle.align = 'center';
    var textMetrics = PIXI.TextMetrics.measureText(txt, subtitleStyle);
    var subtitle = new PIXI.Text(txt, subtitleStyle);
    subtitle.position.set(WIDTH / 2 - textMetrics.width / 2, 3 * textMetrics.height);
    return subtitle;
  }; // Convenience method to get a given number of squares from the top of the jar


  VBS.pixi.gimme = function (n, isReturn) {
    var result = [],
        tmp;

    if (!isReturn) {
      tmp = VBS.pots.return.filter(function (actor) {
        return actor.alpha > 0.5;
      }).sort(function (a, b) {
        return a.y > b.y ? 1 : a.y < b.y ? -1 : 0;
      });

      for (var i = 0; result.length < n && i < tmp.length; i++) {
        result.push(tmp[i]);
      }
    }

    if (result.length < n) {
      tmp = VBS.pots.start.filter(function (actor) {
        return actor.alpha > 0.5;
      }).sort(function (a, b) {
        return a.y > b.y ? 1 : a.y < b.y ? -1 : 0;
      });

      for (var _i = 0; result.length < n && _i < tmp.length; _i++) {
        result.push(tmp[_i]);
      }

      if (result.length < n) {
        tmp = VBS.pots.transfers.filter(function (actor) {
          return actor.alpha > 0.5;
        }).sort(function (a, b) {
          return a.y > b.y ? 1 : a.y < b.y ? -1 : 0;
        });

        for (var _i2 = 0; result.length < n && _i2 < tmp.length; _i2++) {
          result.push(tmp[_i2]);
        }

        if (result.length < n) {
          tmp = VBS.pots.contsEr.filter(function (actor) {
            return actor.alpha > 0.5;
          }).sort(function (a, b) {
            return a.y > b.y ? 1 : a.y < b.y ? -1 : 0;
          });

          for (var _i3 = 0; result.length < n && _i3 < tmp.length; _i3++) {
            result.push(tmp[_i3]);
          }

          if (result.length < n) {
            tmp = VBS.pots.contsEe.filter(function (actor) {
              return actor.alpha > 0.5;
            }).sort(function (a, b) {
              return a.y > b.y ? 1 : a.y < b.y ? -1 : 0;
            });

            for (var _i4 = 0; result.length < n && _i4 < tmp.length; _i4++) {
              result.push(tmp[_i4]);
            }
          }
        }
      }
    }

    return result;
  };
  /***********************
   * Add actor functions *
   ***********************/


  var addCircle = window.VBS.pixi.addCircle = function (x, y, r, fill, b2) {
    var props;
    if (_typeof(x) === 'object') props = x;else props = {
      x: x || 0,
      y: y || 0,
      r: r || 1,
      fill: fill || 0x000000
    };
    if (b2 === undefined) b2 = true;
    var graphics = new PIXI.Graphics();
    graphics.beginFill(props.fill);
    graphics.drawCircle(0, 0, props.r * SCALE * (1 - MARGIN));
    graphics.endFill();
    graphics.x = props.x * SCALE;
    graphics.y = props.y * SCALE;
    if (b2) graphics.body = window.VBS.b2.addCircle(props.x, props.y, props.r); //graphics.cacheAsBitmap = true;

    stage.addChild(graphics);
    return graphics;
  };

  var addEllipse = window.VBS.pixi.addEllipse = function (x, y, a, b, fill, b2) {
    var props;
    if (_typeof(x) === 'object') props = x;else props = {
      x: x || 0,
      y: y || 0,
      a: a || 1,
      b: b || 1,
      fillStyle: fill || 0x000000
    };
    if (props.w && !props.a) props.a = props.w / 2;
    if (props.h && !props.b) props.b = props.h / 2;
    if (b2 === undefined) b2 = true;
    var graphics = new PIXI.Graphics();
    graphics.beginFill(props.fillStyle);
    graphics.drawEllipse(0, 0, props.a * SCALE * (1 - MARGIN), props.b * SCALE * (1 - MARGIN));
    graphics.endFill();
    graphics.x = props.x * SCALE;
    graphics.y = props.y * SCALE;
    if (b2) graphics.body = window.VBS.b2.addEllipse(props.x, props.y, props.a, props.b); //graphics.cacheAsBitmap = true;

    stage.addChild(graphics);
    return graphics;
  };

  var addRect = window.VBS.pixi.addRect = function (x, y, w, h, fill, r, zIndex) {
    var props;
    if (_typeof(x) === 'object') props = x;else props = {
      x: x || 0,
      y: y || 0,
      w: w,
      h: h,
      fillStyle: fill || 0x000000,
      r: r
    };

    if (props.w === undefined && props.h === undefined) {
      props.h = props.w = props.s ? props.s : 1;
    } else {
      if (props.w === undefined && props.h) props.w = props.h;else if (props.h === undefined && props.w) props.h = props.w;
    }

    var graphics = new PIXI.Graphics();
    graphics.beginFill(props.fillStyle);
    if (props.r > 1E-4) graphics.drawRoundedRect(-1 * props.w / 2 * props.w / 2, -1 * props.h / 2 * props.h / 2, props.w, props.h, props.r);else graphics.drawRect(-1 * props.w / 2, -1 * props.h / 2, props.w, props.h);
    graphics.endFill();
    graphics.position.set(props.x, props.y); //graphics.cacheAsBitmap = true;

    if (zIndex !== undefined) stage.addChildAt(graphics, zIndex);else stage.addChild(graphics);
    return graphics;
  };

  var addB2Rect = window.VBS.pixi.addB2Rect = function (x, y, w, h, fill, r, zIndex, group) {
    var props;
    if (_typeof(x) === 'object') props = x;else props = {
      x: x || 0,
      y: y || 0,
      w: w,
      h: h,
      fillStyle: fill || 0x000000,
      r: r
    };

    if (props.w === undefined && props.h === undefined) {
      props.h = props.w = props.s ? props.s : 1;
    } else {
      if (props.w === undefined && props.h) props.w = props.h;else if (props.h === undefined && props.w) props.h = props.w;
    }

    var graphics = new PIXI.Graphics();
    graphics.beginFill(props.fillStyle);
    if (props.r > 1E-4) graphics.drawRoundedRect(-1 * SCALE * props.w / 2 + (1 - MARGIN) * props.w / 2, -1 * SCALE * props.h / 2 + (1 - MARGIN) * props.h / 2, SCALE * props.w * (1 - MARGIN), SCALE * props.h * (1 - MARGIN), SCALE * props.r);else graphics.drawRect(-1 * SCALE * props.w / 2, -1 * SCALE * props.h / 2, SCALE * props.w * (1 - MARGIN), SCALE * props.h * (1 - MARGIN));
    graphics.endFill();
    graphics.position.set(props.x * SCALE, props.y * SCALE);
    graphics.body = window.VBS.b2.addRect(props.x, props.y, props.w, props.h);
    if (group) graphics['_group'] = group;else graphics['_group'] = 'default';
    graphics.interactive = true;
    graphics.on('pointerover', function (e) {
      if (VBS.pixi.jar.alpha < 1) return;
      VBS.pixi.setTooltip(this['_group']);
      if (this.position.x < WIDTH / 2) VBS.pixi.tooltip.position.set(this.position.x + 8, this.position.y + 8);else VBS.pixi.tooltip.position.set(this.position.x - VBS.pixi.tooltip.width - 2, this.position.y + 2);
      VBS.pixi.tooltipIn();
    });
    graphics.on('pointerout', function (e) {
      if (VBS.pixi.jar.alpha < 1) return;else VBS.pixi.tooltipOut();
    });
    if (zIndex !== undefined) stage.addChildAt(graphics, zIndex);else stage.addChild(graphics);
    return graphics;
  };
  /**************
   * Remove Fns *
   **************/


  var remove = window.VBS.pixi.remove = function (graphics) {
    if (graphics.body) window.VBS.b2.world.DestroyBody(graphics.body);
    stage.removeChild(graphics);
    return 1;
  };

  var removeAll = window.VBS.pixi.removeAll = function (all) {
    var n = 0;

    for (var i = stage.children.length - 1; i >= 0; i--) {
      var c = stage.children[i];
      if (c.body) window.VBS.b2.world.DestroyBody(c.body);else if (!all) continue;
      n++;
      stage.removeChild(c);
    }

    return n;
  };
}
},{}],"scripts/b2Setup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2Setup = b2Setup;

function b2Setup() {
  /*********
   * Setup *
   *********/
  // Aliases
  var b2Vec2 = Box2D.Common.Math.b2Vec2,
      b2BodyDef = Box2D.Dynamics.b2BodyDef,
      b2Body = Box2D.Dynamics.b2Body,
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
      b2Fixture = Box2D.Dynamics.b2Fixture,
      b2World = Box2D.Dynamics.b2World,
      b2MassData = Box2D.Collision.Shapes.b2MassData,
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw; // Vars

  window.VBS = window.VBS || {};
  window.VBS.b2 = {};
  var world,
      boundary,
      jar,
      lid,
      bodyDef,
      fixDef,
      SCALE = window.VBS.pixi && window.VBS.pixi.SCALE || 30,
      WIDTH = window.VBS.b2.WIDTH = (window.VBS.pixi && window.VBS.pixi.WIDTH || 512) / SCALE,
      HEIGHT = window.VBS.b2.HEIGHT = (window.VBS.pixi && window.VBS.pixi.HEIGHT || 512) / SCALE;
  window.VBS.b2.mouseJoint = null; // create world

  var gravity = new b2Vec2(0, 15);
  var doSleep = true;
  world = window.VBS.b2.world = new b2World(gravity, doSleep); // init boundary

  bodyDef = new b2BodyDef();
  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.x = WIDTH / 2;
  bodyDef.position.y = HEIGHT / 2;
  boundary = window.VBS.b2.boundary = world.CreateBody(bodyDef);
  fixDef = new b2FixtureDef();
  fixDef.shape = new b2PolygonShape();
  fixDef.density = 1;
  fixDef.friction = 0.1;
  fixDef.restitution = 0.5;
  var borderSize = 4; // bottom

  fixDef.shape.SetAsOrientedBox(WIDTH / 2 + borderSize * 2, borderSize / 2, new b2Vec2(0, HEIGHT / 2 + borderSize / 2));
  boundary.CreateFixture(fixDef); // left

  fixDef.shape.SetAsOrientedBox(borderSize / 2, HEIGHT + borderSize / 2, new b2Vec2(-1 * WIDTH / 2 - borderSize / 2, -HEIGHT / 2 + borderSize / 2));
  boundary.CreateFixture(fixDef); // right

  fixDef.shape.SetAsOrientedBox(borderSize / 2, HEIGHT + borderSize / 2, new b2Vec2(WIDTH / 2 + borderSize / 2, -HEIGHT / 2 + borderSize / 2));
  boundary.CreateFixture(fixDef); // reset friction

  fixDef.friction = 0.5; // Jar body

  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.x = WIDTH / 2;
  bodyDef.position.y = HEIGHT - 5.1;
  jar = window.VBS.b2.jar = world.CreateBody(bodyDef);
  fixDef.shape = new b2PolygonShape(); // Jar body vertices

  fixDef.shape.SetAsArray([new b2Vec2(-4.399415515363216, -8.424119424819946), new b2Vec2(-3.9431654661893845, -8.78661937713623), new b2Vec2(-3.50566565990448, -8.849119615554809), new b2Vec2(-3.5244128108024597, -8.48662085533142), new b2Vec2(-4.018162712454796, -8.174120259284972)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-4.018162712454796, -8.174120259284972), new b2Vec2(-4.3869128450751305, -7.705370259284973), new b2Vec2(-4.799416046589613, -7.792869281768799), new b2Vec2(-4.399415515363216, -8.424119424819946)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-4.3869128450751305, -7.705370259284973), new b2Vec2(-4.5806631073355675, -7.217869830131531), new b2Vec2(-4.905665805563331, -7.4491191625595095), new b2Vec2(-4.799416046589613, -7.792869281768799)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-4.5806631073355675, -7.217869830131531), new b2Vec2(-4.5619141682982445, 0.21963157057762128), new b2Vec2(-4.9056661035865545, 0.29463075399398786), new b2Vec2(-4.905665805563331, -7.4491191625595095)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-4.5619141682982445, 0.21963157057762128), new b2Vec2(-4.224414154887199, 0.8008816868066786), new b2Vec2(-4.593166075646877, 1.0446306347846983), new b2Vec2(-4.830666463822126, 0.6071307539939879), new b2Vec2(-4.9056661035865545, 0.29463075399398786)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-4.224414154887199, 0.8008816868066786), new b2Vec2(-3.893164023756981, 1.0383816093206404), new b2Vec2(-4.143165871500969, 1.3883807167410849), new b2Vec2(-4.593166075646877, 1.0446306347846983)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-3.893164023756981, 1.0383816093206404), new b2Vec2(-3.605663627386093, 1.1571316450834273), new b2Vec2(-3.8369161635637283, 1.5008807770907877), new b2Vec2(-4.143165871500969, 1.3883807167410849)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-3.605663627386093, 1.1571316450834273), new b2Vec2(-2.255663573741913, 1.2446317479014395), new b2Vec2(-2.09941565990448, 1.613380818814039), new b2Vec2(-3.0681660771369934, 1.5508808784186838), new b2Vec2(-3.8369161635637283, 1.5008807770907877)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-2.255663573741913, 1.2446317479014395), new b2Vec2(-0.768163800239563, 1.3196317508816717), new b2Vec2(-0.35566598176956177, 1.67588076852262), new b2Vec2(-2.09941565990448, 1.613380818814039)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(-0.768163800239563, 1.3196317508816717), new b2Vec2(1.2068367004394531, 1.3321318507194517), new b2Vec2(1.3068348169326782, 1.688380905613303), new b2Vec2(-0.35566598176956177, 1.67588076852262)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(1.2068367004394531, 1.3321318507194517), new b2Vec2(3.594335913658142, 1.1883819505572317), new b2Vec2(3.3818358182907104, 1.5696305625140665), new b2Vec2(1.3068348169326782, 1.688380905613303)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(3.594335913658142, 1.1883819505572317), new b2Vec2(4.119336009025574, 0.9446319967508314), new b2Vec2(4.413085579872131, 1.257130841910839), new b2Vec2(4.000585675239563, 1.4696307882666586), new b2Vec2(3.3818358182907104, 1.5696305625140665)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(4.119336009025574, 0.9446319967508314), new b2Vec2(4.431836009025574, 0.5946320325136183), new b2Vec2(4.725585579872131, 0.9321306675672529), new b2Vec2(4.413085579872131, 1.257130841910839)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(4.431836009025574, 0.5946320325136183), new b2Vec2(4.575585722923279, 0.050881731510162176), new b2Vec2(4.894335865974426, 0.307130444049835), new b2Vec2(4.725585579872131, 0.9321306675672529)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(4.575585722923279, 0.050881731510162176), new b2Vec2(4.581835865974426, -7.117868137359619), new b2Vec2(4.900585412979126, -7.192869257926941), new b2Vec2(4.894335865974426, 0.307130444049835)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(4.581835865974426, -7.117868137359619), new b2Vec2(4.269335865974426, -7.767868113517761), new b2Vec2(4.550585746765137, -8.067867827415466), new b2Vec2(4.8255854845047, -7.561618161201477), new b2Vec2(4.900585412979126, -7.192869257926941)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(4.269335865974426, -7.767868113517761), new b2Vec2(3.9255857467651367, -8.130368065834045), new b2Vec2(4.075585603713989, -8.586618375778198), new b2Vec2(4.550585746765137, -8.067867827415466)]);
  jar.CreateFixture(fixDef);
  fixDef.shape.SetAsArray([new b2Vec2(3.9255857467651367, -8.130368065834045), new b2Vec2(3.4193360805511475, -8.436618518829345), new b2Vec2(3.4443360567092896, -8.817868900299072), new b2Vec2(4.075585603713989, -8.586618375778198)]);
  jar.CreateFixture(fixDef);
  /* Degub info
  let data = new b2MassData
  console.log('jarBody',jar)
  console.log('GetLocalCenter',jar.GetLocalCenter())
  jar.GetMassData(data)
  console.log('GetMassData',data)
  console.log('GetPosition',jar.GetPosition())
  console.log('GetTransform',jar.GetTransform())
  console.log('GetType',jar.GetType())
  console.log('GetUserData',jar.GetUserData())
  console.log('GetWorldCenter',jar.GetWorldCenter())
  let fixtures = [jar.GetFixtureList()]
  while(fixtures[fixtures.length] = fixtures[fixtures.length-1].GetNext());
  let bodyAabb = fixtures.reduce((sofar,fixt,i,arr)=>{
      if(!fixt) return sofar
      return {
          lowerBound: {x:Math.min(sofar.lowerBound.x,fixt.GetAABB().lowerBound.x),y:Math.min(sofar.lowerBound.y,fixt.GetAABB().lowerBound.y)},
          upperBound: {x:Math.max(sofar.upperBound.x,fixt.GetAABB().upperBound.x),y:Math.max(sofar.upperBound.y,fixt.GetAABB().upperBound.y)}
      }
  },{lowerBound:{x:Infinity,y:Infinity},upperBound:{x:-Infinity,y:-Infinity}})
  console.log('bodyAabb',bodyAabb)*/
  //Reset

  bodyDef.position.x = 0;
  bodyDef.position.y = 0; // Lid body

  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.x = WIDTH / 2;
  bodyDef.position.y = 2;
  lid = window.VBS.b2.lid = world.CreateBody(bodyDef);
  fixDef.shape = new b2PolygonShape();
  fixDef.shape.SetAsBox(WIDTH / 4, 0.2);
  lid.CreateFixture(fixDef);
  VBS.b2.lidFixture = lid.GetFixtureList();
  var listener = new Box2D.Dynamics.b2ContactListener();

  listener.BeginContact = function (contact) {
    //check if one of the fixtures is the lid
    var lidFixture, otherFixture;

    if (contact.GetFixtureA() === VBS.b2.lidFixture) {
      lidFixture = contact.GetFixtureA();
      otherFixture = contact.GetFixtureB();
    } else if (contact.GetFixtureB() === VBS.b2.lidFixture) {
      lidFixture = contact.GetFixtureB();
      otherFixture = contact.GetFixtureA();
    }

    if (!lidFixture) return;
    var lidBody = lidFixture.GetBody(),
        otherBody = otherFixture.GetBody(),
        numPoints = contact.GetManifold().m_pointCount,
        worldManifold = new Box2D.Collision.b2WorldManifold();
    contact.GetWorldManifold(worldManifold); //check if contact points are moving downward

    for (var i = 0; i < numPoints; i++) {
      var pointVel = otherBody.GetLinearVelocityFromWorldPoint(worldManifold.m_points[i]);
      if (pointVel.y < 0) return; //point is moving up, leave contact solid and exit
    } //no points are moving upward, contact should not be solid


    contact.SetEnabled(false);
  };

  listener.EndContact = function (contact) {
    //reset the default state of the contact in case it comes back for more
    contact.SetEnabled(true);
  }; // Empty implementations for unused methods.
  // listener.PreSolve = function(contact, oldManifold) { console.log('PreSolve',arguments) };
  // listener.PostSolve = function(contact, impulse) { console.log('PostSolve',arguments) };


  world.SetContactListener(listener);
  /**********************
   * Add body functions *
   **********************/

  var setUpJoint = window.VBS.b2.setUpJoint = function (body, _force) {
    var bodyPos = body.GetPosition();
    var jointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
    jointDef.bodyA = world.GetGroundBody();
    jointDef.bodyB = body;
    jointDef.target.SetV(bodyPos);
    jointDef.maxForce = _force ? _force : 400;
    var joint = world.CreateJoint(jointDef);
    body.SetAwake(true);
    return joint;
  };

  var addCircle = window.VBS.b2.addCircle = function (x, y, r) {
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.shape = new b2CircleShape(r);
    var circle = world.CreateBody(bodyDef);
    circle.CreateFixture(fixDef); //Reset

    bodyDef.position.x = 0;
    bodyDef.position.y = 0;
    return circle;
  };

  var addEllipse = window.VBS.b2.addEllipse = function (x, y, a, b) {
    var verts = [];
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    var ellipse = world.CreateBody(bodyDef);

    var thetaToX = function thetaToX(t, minus) {
      return (minus ? -1 : 1) * a * b / Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2) * Math.pow(Math.tan(t), 2));
    };

    var radStep = Math.PI / (2 * (q + 1));
    verts.push(new b2Vec2(0, -b));

    for (var t = -1 * Math.PI / 2 + radStep; t < -1E-4; t += radStep) {
      var _x = thetaToX(t);

      verts.push(new b2Vec2(_x, _x * Math.tan(t)));
    }

    verts.push(new b2Vec2(a, 0));

    for (var _t = radStep; _t < Math.PI / 2 - 1E-4; _t += radStep) {
      var _x2 = thetaToX(_t);

      verts.push(new b2Vec2(_x2, _x2 * Math.tan(_t)));
    }

    verts.push(new b2Vec2(0, b));

    for (var _t2 = Math.PI / 2 + radStep; _t2 < Math.PI - 1E-4; _t2 += radStep) {
      var _x3 = thetaToX(_t2, true);

      verts.push(new b2Vec2(_x3, _x3 * Math.tan(_t2)));
    }

    verts.push(new b2Vec2(-a, 0));

    for (var _t3 = -1 * Math.PI + radStep; _t3 < -1 * Math.PI / 2 - 1E-4; _t3 += radStep) {
      var _x4 = thetaToX(_t3, true);

      verts.push(new b2Vec2(_x4, _x4 * Math.tan(_t3)));
    }

    fixDef.shape = new b2PolygonShape();
    var cutVerts = cutIntoPieSlicesOfMaxVerts(verts);
    cutVerts.forEach(function (vts, i, arr) {
      fixDef.shape.SetAsArray(vts);
      ellipse.CreateFixture(fixDef);
    }); //Reset

    bodyDef.position.x = 0;
    bodyDef.position.y = 0;
    return ellipse;
  };

  function cutIntoPieSlicesOfMaxVerts(vertices, max) {
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        cutVerts = [];
    max = max || 8;

    if (vertices.length > max) {
      var cut = [new b2Vec2(0, 0)],
          idx = 0,
          cutsNeeded = Math.ceil(vertices.length / (max - 2)),
          r = (vertices.length + cutsNeeded * 2) % max;
      r = r || max;

      while (cutVerts.length < cutsNeeded) {
        var numInCut = void 0;
        if (cutVerts.length == cutsNeeded - 2) numInCut = Math.ceil((max + r) / 2);else if (cutVerts.length == cutsNeeded - 1) numInCut = Math.floor((max + r) / 2);else numInCut = max;

        while (cut.length < numInCut && idx < vertices.length) {
          cut.push(vertices[idx++]);
        }

        if (idx >= vertices.length) cut.push(vertices[0]);
        cutVerts.push(cut);
        cut = [new b2Vec2(0, 0)];
        idx--;
      }
    } else cutVerts = [vertices];

    return cutVerts;
  }

  var addRect = window.VBS.b2.addRect = function (x, y, w, h) {
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(w / 2, h / 2);
    var rect = world.CreateBody(bodyDef);
    rect.CreateFixture(fixDef); //Reset

    bodyDef.position.x = 0;
    bodyDef.position.y = 0;
    return rect;
  };
  /*************************
   * Query world functions *
   *************************/


  var getBodyAt = window.VBS.b2.getBodyAt = function (x, y) {
    if (x === undefined) return false;

    if (y === undefined) {
      if (x.x === undefined || x.y === undefined) return false;else {
        y = x.y;
        x = x.x;
      }
    }

    var pos = new Box2D.Common.Math.b2Vec2(x, y);
    var aabb = new Box2D.Collision.b2AABB();
    var epsilon = 5 / (window.VBS.pixi && window.VBS.pixi.SCALE || 30); // Allow 5px either side

    aabb.lowerBound.Set(x - epsilon, y - epsilon);
    aabb.upperBound.Set(x + epsilon, y + epsilon);
    var body;
    world.QueryAABB(function (fixture) {
      if (fixture.GetBody().GetType() != Box2D.Dynamics.b2BodyDef.b2_staticBody) {
        if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), pos)) {
          body = fixture.GetBody();
          return false; // Can stop now
        }
      }

      return true; // Keep going
    }, aabb);
    return body;
  };
  /**************
   * Debug Draw *
   **************/


  if (window.VBS.DEBUG) {
    var debugView = document.createElement('canvas');
    debugView.setAttribute('width', window.VBS.pixi && window.VBS.pixi.WIDTH || 512);
    debugView.setAttribute('height', window.VBS.pixi && window.VBS.pixi.HEIGHT || 512);
    VBS.$el.find('.anim-canvas-wrap').append(debugView);
    debugView.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      return false;
    });
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(debugView.getContext("2d"));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
  }
}
},{}],"scripts/mouseSetup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mouseSetup = mouseSetup;

function mouseSetup() {
  /*********
   * Setup *
   *********/
  // Vars
  window.VBS = window.VBS || {};
  var app = window.VBS.pixi.app; // Event listeners

  function onMoveTouching(event) {
    var rect = app.view.getBoundingClientRect();

    if (event["changedTouches"]) {
      var touch = event["changedTouches"][0];
      window.VBS.touchX = (touch.clientX - rect.left) / rect.width * (window.VBS.b2 && window.VBS.b2.WIDTH || 512 / 30);
      window.VBS.touchY = (touch.clientY - rect.top) / rect.height * (window.VBS.b2 && window.VBS.b2.HEIGHT || 640 / 30);
    } else {
      window.VBS.touchX = (event.clientX - rect.left) / rect.width * (window.VBS.b2 && window.VBS.b2.WIDTH || 512 / 30);
      window.VBS.touchY = (event.clientY - rect.top) / rect.height * (window.VBS.b2 && window.VBS.b2.HEIGHT || 640 / 30);
    }
  }

  document.addEventListener("mousedown", function (event) {
    window.VBS.isPointerDown = true;
    onMoveTouching(event);
    document.addEventListener("mousemove", onMoveTouching, true);
  }, true);
  document.addEventListener("mouseup", function (event) {
    document.removeEventListener("mousemove", onMoveTouching, true);
    window.VBS.isPointerDown = false;
    window.VBS.touchX = undefined;
    window.VBS.touchY = undefined;
  }, true);
  document.addEventListener("touchstart", function (event) {
    window.VBS.isPointerDown = true;
    onMoveTouching(event);
    document.addEventListener("touchmove", onMoveTouching, true);
  }, true);
  document.addEventListener("touchend", function (event) {
    document.removeEventListener("touchmove", onMoveTouching, true);
    window.VBS.isPointerDown = false;
    window.VBS.touchX = undefined;
    window.VBS.touchY = undefined;
  }, true);
}
},{}],"scripts/howlSetup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.howlSetup = howlSetup;

// Howl.prototype.initPlayingEvent = function(intervalTime) {
//   intervalTime = intervalTime ? intervalTime : 1000/60
//   var self = this;
//   self._onplaying = [];
//   self.on('play', function (soundId) {
//     self._onplayingInterval = setInterval(function () {
//       self._emit('playing', soundId, [self.seek(soundId),self.duration(soundId)]);
//     }, intervalTime);
//   });
//   self.on('end', function(){
//     clearInterval(self._onplayingInterval);
//   });
//   self.on('pause', function(){
//     clearInterval(self._onplayingInterval);
//   });
//   self.on('stop', function(){
//     clearInterval(self._onplayingInterval);
//   });
// }
Howl.prototype.hasNext = function () {
  return this._next ? true : false;
};

Howl.prototype.getNext = function (n) {
  if (n === undefined || Number.isNaN(+n) || n < 1) n = 1;
  var result = false;

  if (this.hasNext()) {
    result = this._next, n--;

    while (n > 0 && result.hasNext()) {
      result = result._next;
      n--;
    }
  }

  return result;
};

Howl.prototype.hasPrev = function () {
  return this._prev ? true : false;
};

Howl.prototype.getPrev = function (n) {
  if (n === undefined || Number.isNaN(+n) || n < 1) n = 1;
  var result = false;

  if (this.hasPrev()) {
    result = this._prev, n--;

    while (n > 0 && result.hasPrev()) {
      result = result._prev;
      n--;
    }
  }

  return result;
};

Howl.prototype.getLast = function (n) {
  if (!this.hasNext()) return this;else return this.getNext(Infinity);
};

Howl.prototype.getFirst = function (n) {
  if (!this.hasPrev()) return this;else return this.getPrev(Infinity);
};

Howl.prototype.getIndex = function () {
  return this._index;
}; // Needed since
// desktop => use html5 for better preload
// mobile => iOS volume breaks if html5, don't use


function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

function howlSetup() {
  window.VBS = window.VBS || {};
  window.VBS.speech = window.VBS.speech || {};
  window.VBS.music = new Howl({
    src: "./static/LIF/vbs/audio/music.mp3",
    // "//music.wixstatic.com/mp3/b29e13_181d749818af4a46b35d5db7ef245112.mp3",
    //"//music.wixstatic.com/mp3/b29e13_cfc1f0ad6c044412a30f728ddc687656.mp3",
    //"https://www.bensound.org/bensound-music/bensound-inspire.mp3",
    volume: 0.04,
    html5: !isMobile(),
    preload: true
  }); // window.VBS.music.initPlayingEvent()
  // window.VBS.music.on('playing', function(soundId, data){
  //   console.log('playing')
  // });
}
},{}],"scripts/loop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRenderLoop = startRenderLoop;

function startRenderLoop() {
  // rAF polyfill - https://gist.github.com/paulirish/1579671
  (function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  })();

  var frameTimes = [];

  VBS.b2.doWorldStep = function (time) {
    if (!time) time = new Date().getTime();
    var lastFrameTime = frameTimes.length ? frameTimes[frameTimes.length - 1] : time - 1000 / 60;
    var dt = Math.max(Math.min((time - lastFrameTime) / 1000, 1 / 30), 1 / 60); //VBS.b2.world.Step(dt, 12, 12);

    VBS.b2.world.Step(dt / 2, 6, 6);
    VBS.b2.world.Step(dt / 2, 6, 6);
    if (window.VBS.DEBUG) VBS.b2.world.DrawDebugData();
    VBS.b2.world.ClearForces();
  };

  function update(time) {
    //Aliases
    var world = window.VBS.b2.world,
        stage = window.VBS.pixi.app.stage,
        MARGIN = window.VBS.pixi.MARGIN,
        SCALE = window.VBS.pixi.SCALE;
    if (!time) time = new Date().getTime(); // Check if mouse needs updating

    if (VBS.pixi.jar.alpha > 0.5 && window.VBS.isPointerDown && !window.VBS.b2.mouseJoint) {
      var dragBody = window.VBS.b2.getBodyAt(window.VBS.touchX, window.VBS.touchY);

      if (dragBody) {
        dragBody.SetAwake(true);
        var jointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
        jointDef.bodyA = world.GetGroundBody();
        jointDef.bodyB = dragBody;
        jointDef.target.Set(window.VBS.touchX, window.VBS.touchY);
        jointDef.collideConnected = true;
        jointDef.maxForce = 1000;
        window.VBS.b2.mouseJoint = world.CreateJoint(jointDef);
      }
    }

    if (window.VBS.b2.mouseJoint) {
      if (VBS.pixi.jar.alpha > 0.5 && window.VBS.isPointerDown) window.VBS.b2.mouseJoint.SetTarget(new Box2D.Common.Math.b2Vec2(window.VBS.touchX, window.VBS.touchY));else {
        world.DestroyJoint(window.VBS.b2.mouseJoint);
        window.VBS.b2.mouseJoint = null;
      }
    }

    if (!window.VBS.STOP) {
      // Update world
      VBS.b2.doWorldStep(time);
    } //Update graphics


    for (var i = 0; i < stage.children.length; i++) {
      var actor = stage.children[i];
      if (!actor.body) continue;
      var bodyPos = actor.body.GetPosition();
      actor.rotation = actor.body.GetAngle();
      var marginOffsetX = actor.geometry.graphicsData[0].shape.type !== PIXI.SHAPES.RECT ? 0 : MARGIN / 2 / (1 - MARGIN) * actor.geometry.graphicsData[0].shape.width;
      var marginOffsetY = actor.geometry.graphicsData[0].shape.type !== PIXI.SHAPES.RECT ? 0 : MARGIN / 2 / (1 - MARGIN) * actor.geometry.graphicsData[0].shape.height;
      actor.position.set(bodyPos.x * SCALE + (marginOffsetX * Math.cos(actor.rotation) - marginOffsetY * Math.sin(actor.rotation)), bodyPos.y * SCALE + (marginOffsetX * Math.sin(actor.rotation) + marginOffsetY * Math.cos(actor.rotation)));
    }

    if (window.VBS.ABORT) {
      //document.getElementById('fps').innerHTML = "-- FPS"
      window.VBS.timeline.progress(0);
      VBS.$el.find('.anim-loading').hide();
      VBS.$el.find('.anim-play').show();
      VBS.music.stop();
      VBS.musicWasPlaying = false;
      if (window.VBS.speech.currentlyPlaying) window.VBS.speech.currentlyPlaying.stop();
      window.VBS.speech.currentlyPlayingId = null;
      window.VBS.speech.currentlyPlaying = null;
    } else {
      /* FPS counter
      frameTimes.push(time)
      let gtOneSec
      while(time - frameTimes[0] > 1000)
          gtOneSec = frameTimes.shift();
      if(gtOneSec)
          frameTimes.unshift(gtOneSec)
      if(frameTimes.length > 1)
          document.getElementById('fps').innerHTML = Math.round(1000*frameTimes.length/(frameTimes[frameTimes.length-1]-frameTimes[0]))+" FPS"*/
      // Loop
      window.requestAnimationFrame(update);
    }
  }

  window.requestAnimationFrame(update);
}
},{}],"scripts/scenes/intro.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intro = intro;

function intro() {
  // Init vars
  var tl = new TimelineLite({
    id: "intro"
  }),
      stage = window.VBS.pixi.app.stage,
      //arrow = window.VBS.pixi.arrow,
  WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT;
  tl.audios = [VBS.speech.getById('intro0'), VBS.speech.getById('intro1'), VBS.speech.getById('intro2')];
  /* Mini sqs
  let miniSqs = [],
    colors=[0xffb81c,0xc010a0,0x00a0d2,0x702082],
    r = Math.sqrt(Math.pow(WIDTH/2,2)+Math.pow(HEIGHT/2,2))+30,
    sqSize = 35,
    sqDuration = [1,2],
    upToTime = 10;
  for(let i=0;i<200;i++){
    let a = Math.random()*2*Math.PI,
      endx = WIDTH/2 + Math.cos(a)*r,
      endy = HEIGHT/2 + Math.sin(a)*r,
      col = colors[Math.floor(Math.random()*colors.length)],
      sqr = window.VBS.pixi.addRect(endx, endy, sqSize, sqSize, col, 0, 0);
    miniSqs.push(sqr)
    sqr.pivot.set(0.5);
    let t = Math.random() * upToTime,
      dur = sqDuration[0]+Math.random()*(sqDuration[1]-sqDuration[0])
    tl.from(sqr, dur, {
      x: WIDTH/2,
      y: HEIGHT/2,
      pixi: {
        scale: 0,
        rotation: 720
      },
      ease: Power2.easeInOut
    }, t) //t=0 to 7
  }
    // Eyes
  VBS.pixi.eyes = new PIXI.Graphics()
  VBS.pixi.eyeState = {w:0,h:0.05,alpha:0,angle:30}
  
  VBS.pixi.drawEyes = function(state){
    VBS.pixi.eyes.clear()
    VBS.pixi.eyes.beginFill(0xffffff);
    VBS.pixi.eyes.drawEllipse(5*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    VBS.pixi.eyes.drawEllipse(11*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    VBS.pixi.eyes.endFill();
    VBS.pixi.eyes.lineStyle(4, 0x666666);
    VBS.pixi.eyes.drawEllipse(5*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    VBS.pixi.eyes.drawEllipse(11*VBS.pixi.WIDTH/16, VBS.pixi.HEIGHT/2, state.w, state.h);
    if(state.alpha > 0){
      VBS.pixi.eyes.beginFill(0x666666,state.alpha);
      let r = state.w*0.6,
          x = r * Math.cos(state.angle*Math.PI/180), y = r * Math.sin(state.angle*Math.PI/180)
      VBS.pixi.eyes.drawCircle(5*VBS.pixi.WIDTH/16 + x, VBS.pixi.HEIGHT/2 + y, state.w*0.2);
      VBS.pixi.eyes.drawCircle(11*VBS.pixi.WIDTH/16 + x, VBS.pixi.HEIGHT/2 + y, state.w*0.2);
      VBS.pixi.eyes.endFill();
    }
  }
  VBS.pixi.drawEyes(VBS.pixi.eyeState)
  stage.addChild(VBS.pixi.eyes)*/
  // Build clock

  var minuteHand = VBS.pixi.minuteHand = new PIXI.Graphics(),
      hourHand = VBS.pixi.hourHand = new PIXI.Graphics(),
      fullLength = 7 * Math.min(WIDTH, HEIGHT) / 8,
      minuteHandLength = Math.min(WIDTH, HEIGHT) / 2 - 20,
      hourHandLength = minuteHandLength / 2,
      handWidth = 45;

  var drawArrow = function drawArrow(graphics, length, fill) {
    graphics.clear();
    graphics.beginFill(fill || 0x009fd2);
    graphics.drawRect(0, 20, handWidth, length - 20);
    graphics.moveTo(0, 20);
    graphics.lineTo(handWidth / 2, 0);
    graphics.lineTo(handWidth, 20);
    graphics.endFill();
  };

  drawArrow(minuteHand, fullLength);
  minuteHand.pivot.set(handWidth / 2, fullLength / 2);
  minuteHand.position.set(WIDTH / 2, HEIGHT / 2);
  minuteHand.rotation = -90 * Math.PI / 180;
  minuteHand.alpha = 0;
  drawArrow(hourHand, hourHandLength);
  hourHand.pivot.set(handWidth / 2, hourHandLength);
  hourHand.position.set(WIDTH / 2, HEIGHT / 2);
  hourHand.alpha = 0;
  stage.addChild(minuteHand, hourHand); // Build audio bars

  var numBars = Math.max.apply(null, window.VBS.pixi.freq.map(function (heights) {
    return heights.length;
  })),
      freqBars = [],
      fullW = 6 * WIDTH / 8 / numBars,
      maxBarHeight = HEIGHT / 8,
      w = 0.9 * fullW,
      space = 0.1 * w;

  for (i = 0; i < numBars; i++) {
    var h = maxBarHeight - i * (maxBarHeight / numBars);
    var x = WIDTH / 8 + i * fullW + space;
    var y = 15 * HEIGHT / 16 - h / 2;
    var bar = window.VBS.pixi.addRect(x, y, w, h, 0x666666);
    bar.alpha = 0;
    freqBars.push(bar);
  } // Build bullets text
  // let bulletStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: 26, fontWeight: '400', fill : 0x575756, align : 'left'}),
  //     bulletTexts = []
  // bulletTexts.push(new PIXI.Text(VBS.user['StartDate'].toFormattedString()+' \u2014 '+VBS.user['EndDate'].toFormattedString(), bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Transfers & Withdrawals', bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Contributions', bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Investment return & charges', bulletStyle));
  // bulletTexts.push(new PIXI.Text('   \u2022  Your LifeSight Age', bulletStyle));
  // bulletTexts.forEach((actor,i) => {
  //     actor.position.set(0, (i+1)*HEIGHT/8)
  //     actor.alpha = 0
  //     VBS.pixi.app.stage.addChild(actor) 
  // });
  // Build text


  var subtitleStyle = VBS.pixi.baseTextStyle.clone();
  subtitleStyle.fontSize = 28;
  subtitleStyle.fontWeight = '400';
  subtitleStyle.align = 'center';
  var subtitleText = 'This is your LifeSight Dashboard',
      textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle);
  var subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5);
  subtitle.position.set(WIDTH / 2, 3 * textMetrics.height);
  subtitle.scale.set(0);
  stage.addChild(subtitle); // Arrow in
  // tl.to(arrow, 9, { x: 3*WIDTH/4, ease: Power2.easeInOut }) //(t=0)
  // tl.to(arrow, 4, { y:4*HEIGHT/5, ease: Power2.easeOut }, "-=9") //(t=0)
  // tl.to(arrow, 4, { y:-HEIGHT/2, ease: Power2.easeIn }, "-=4") //(t=5)
  // tl.to(arrow, 9, { pixi: {rotation: -240}, ease: Power0.easeNone }, "-=9") //(t=0)

  /*Eyes open
  tl.to(VBS.pixi.eyeState, 0.8, {
    w: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },0) //t=0
  tl.to(VBS.pixi.eyeState, 1, {
    h: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },0.8) //t=0.8
  tl.to(VBS.pixi.eyeState, 0.5, {
    pixi: {alpha: 1},
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },1.3) //t=1.3
    // Look around
  tl.to(VBS.pixi.eyeState, 1, {
    angle: 200,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },1.8) //t=1.8
  tl.to(VBS.pixi.eyeState, 1.5, {
    angle: -30,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },3.8) //t=3.8
  tl.to(VBS.pixi.eyeState, 0.5, {
    angle: 30,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  },5.3) //t=5.3
  tl.to({a:1}, 1, {
    a:0,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      VBS.pixi.eyes.alpha = tween.target.a
    },
    onUpdateParams: ['{self}']
  },7) //t=7*/
  //Bring in arrow

  tl.to(minuteHand, 2, {
    pixi: {
      alpha: 1
    },
    ease: Power1.easeOut,
    onStart: function onStart() {
      drawArrow(minuteHand, fullLength);
    }
  }); //t=

  tl.to(minuteHand, 8, {
    pixi: {
      rotation: 360
    },
    ease: Power1.easeOut
  }, "-=2"); //t=

  tl.to(subtitle, 4, {
    pixi: {
      scale: 1.33
    },
    ease: Power0.easeNone
  }, '-=6'); //t=

  tl.to(subtitle, 2, {
    pixi: {
      alpha: 0
    },
    ease: Power1.easeOut
  }, '-=4'); //t=

  tl.to(hourHand, 0.1, {
    pixi: {
      alpha: 1
    },
    ease: Power0.easeNone
  }, "-=0.1"); //t=

  tl.to({
    l: fullLength
  }, 1, {
    l: minuteHandLength,
    ease: Power1.easeOut,
    onUpdate: function onUpdate(tween) {
      drawArrow(minuteHand, tween.target.l);
    },
    onUpdateParams: ['{self}']
  }); //t=
  //Audio freq

  tl.to({
    time: 0
  }, 8, {
    time: 8,
    ease: Power0.easeNone,
    onUpdate: function onUpdate(tween) {
      var idx = tween.ratio === 1 ? window.VBS.pixi.freq.length - 1 : Math.floor(tween.ratio * window.VBS.pixi.freq.length);
      var freqs = window.VBS.pixi.freq[idx];
      freqBars.forEach(function (bar, i, arr) {
        var level = i < freqs.length ? freqs[i] : 0;
        var h = level / 255 * maxBarHeight;
        var y = 15 * HEIGHT / 16 - h / 2;
        freqBars[i].height = h;
        freqBars[i].position.y = y;
      });
      if (parseFloat($('.anim-dimmer').css('opacity')) == 1 && !$('.anim-dimmer').is(':animated')) VBS.dimOut();
    },
    onUpdateParams: ['{self}']
  }, 2); //(t=2)

  tl.to(freqBars, 1, {
    pixi: {
      alpha: 0.8
    }
  }, 2); //(t=2)

  tl.to(freqBars, 1, {
    pixi: {
      alpha: 0
    }
  }, 7); //(t=7)
  // Bullets in
  // tl.staggerTo(bulletTexts, 1, {
  //   x: WIDTH/8,
  //   pixi: {alpha: 1},
  //   ease: Power2.easeOut
  // },1.5) //(t=12)
  // Bullets out
  // tl.to(bulletTexts, 1, {
  //   pixi: {alpha: 0},
  //   ease: Power2.easeOut
  // },"+=3") //(t=20)

  return tl;
}
},{}],"scripts/scenes/tableStart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableStart = tableStart;

function tableStart() {
  // Init vars
  var tl = new TimelineLite({
    id: "tableStart"
  }),
      stage = window.VBS.pixi.app.stage,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT;
  tl.audios = [VBS.speech.getById('tableStart')]; // Build contents table

  var blackTextStyle = new PIXI.TextStyle({
    fontFamily: ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'],
    fontSize: 20,
    fontWeight: '400',
    fill: 0x575756,
    align: 'left'
  }),
      whiteTextStyle = blackTextStyle.clone(),
      rowTexts = [],
      rowRects = [];
  whiteTextStyle.fill = 0xffffff;
  rowTexts.push(new PIXI.Text('My balance at ' + VBS.user['StartDate'].toFormattedString(), whiteTextStyle));
  if (VBS.user['Transfers'] > 0) rowTexts.push(new PIXI.Text('My Transfers', blackTextStyle));
  rowTexts.push(new PIXI.Text('My Contributions', blackTextStyle));
  rowTexts.push(new PIXI.Text('My Investments', blackTextStyle));
  rowTexts.push(new PIXI.Text('Charges & Fees', blackTextStyle));
  rowTexts.push(new PIXI.Text('My balance at ' + VBS.user['EndDate'].toFormattedString(), whiteTextStyle));
  var fullRowHeight = 6 * HEIGHT / 8 / rowTexts.length,
      rowHeight = fullRowHeight * 0.8;
  rowTexts.forEach(function (actor, i) {
    if (i == 0 || i == rowTexts.length - 1) rowRects.push(VBS.pixi.addRect(WIDTH / 2, HEIGHT / 8 + i * fullRowHeight + fullRowHeight / 2, 30 * WIDTH / 32, rowHeight, 0xf68121));else rowRects.push(VBS.pixi.addRect(WIDTH / 2, HEIGHT / 8 + i * fullRowHeight + fullRowHeight / 2, 30 * WIDTH / 32, rowHeight, 0xeeeeee));
    actor.position.set(WIDTH / 16, HEIGHT / 8 + i * fullRowHeight + fullRowHeight / 2 - actor.height / 2);
    VBS.pixi.app.stage.addChild(actor);
  });
  VBS.pixi.table = {
    blackTextStyle: blackTextStyle,
    whiteTextStyle: whiteTextStyle,
    rowRects: rowRects,
    rowTexts: rowTexts // Build text

  };
  var subtitleStyle = VBS.pixi.baseTextStyle.clone();
  subtitleStyle.fontSize = 28;
  subtitleStyle.fontWeight = '400';
  subtitleStyle.align = 'center';
  var subtitleText = 'Let\'s take a look back...',
      textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle);
  var subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5);
  subtitle.position.set(WIDTH / 2, 2 * textMetrics.height);
  subtitle.scale.set(0);
  stage.addChild(subtitle); //Rewind hands

  var minuteHand = VBS.pixi.minuteHand,
      hourHand = VBS.pixi.hourHand;
  tl.to(subtitle, 4, {
    pixi: {
      scale: 1.5
    },
    ease: Power0.easeNone
  }); //t=

  tl.to(subtitle, 2, {
    pixi: {
      alpha: 0
    },
    ease: Power1.easeOut
  }, '-=2'); //t=

  tl.to(minuteHand, 5, {
    pixi: {
      rotation: -480
    },
    ease: Power2.easeIn
  }, '-=3'); //t=

  tl.to(hourHand, 5, {
    pixi: {
      rotation: -70
    },
    ease: Power2.easeIn
  }, "-=5"); //t=
  // Fade out hands

  tl.to(minuteHand, 2, {
    pixi: {
      rotation: -2000,
      alpha: 0
    },
    ease: Power0.easeNone,
    onStart: function onStart() {
      VBS.dimIn(2000);
    }
  }); //t=

  tl.to(hourHand, 2, {
    pixi: {
      rotation: -197,
      alpha: 0
    },
    ease: Power0.easeNone
  }, "-=2"); //t=
  // Contents table in

  tl.add("tableIn");
  tl.from(rowRects[0], 1, {
    x: -WIDTH / 2
  }, "tableIn");
  tl.from(rowTexts[0], 1, {
    x: -15 * WIDTH / 16
  }, "tableIn");
  tl.from(rowRects[rowRects.length - 1], 1, {
    x: 3 * WIDTH / 2
  }, "tableIn");
  tl.from(rowTexts[rowTexts.length - 1], 1, {
    x: WIDTH + WIDTH / 16
  }, "tableIn");
  var greyRects = rowRects.slice(1, rowRects.length - 1),
      greyTexts = rowTexts.slice(1, rowTexts.length - 1);
  tl.staggerFrom(greyTexts, 1, {
    x: -15 * WIDTH / 16,
    ease: Power2.easeOut
  }, 0.5, "tableIn+=1"); //(t=12)

  tl.staggerFrom(greyRects, 1, {
    x: -WIDTH / 2,
    ease: Power2.easeOut
  }, 0.5, "tableIn+=1"); //(t=12)
  // Contents table out

  tl.to(rowRects.concat(rowTexts), 1, {
    pixi: {
      alpha: 0
    },
    ease: Power2.easeOut
  }, "+=3");
  return tl;
}
},{}],"scripts/scenes/jarIn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jarIn = jarIn;

function jarIn() {
  // Init vars
  var tl = new TimelineLite({
    id: "jarIn"
  }),
      jar = window.VBS.pixi.jar,
      jarBody = window.VBS.b2.jar,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      stage = VBS.pixi.app.stage;
  tl.audios = [VBS.speech.getById('jar')]; // Text

  VBS.pixi.balanceFigure.alpha = 1;
  VBS.pixi.jarSubtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"] + ' LifeSight Account');
  VBS.pixi.jarSubtitle.position.set(VBS.pixi.jarSubtitle.position.x, 7 * pixiHEIGHT / 8);
  VBS.pixi.startSubtitle = VBS.pixi.makeSubtitle(VBS.user["StartDate"].toFormattedString());
  stage.addChild(VBS.pixi.jarSubtitle, VBS.pixi.startSubtitle); // Jar in

  tl.from(jar, 3, {
    y: -pixiHEIGHT,
    ease: Power3.easeOut
  }); //t=0

  tl.from(VBS.pixi.jarSubtitle, 3, {
    y: -pixiHEIGHT / 8 - 80,
    //TODO avoid hardcoding 80 to match jar?
    pixi: {
      alpha: 0
    },
    ease: Power3.easeOut
  }, "-=3"); //t=0
  // Text in

  tl.from([VBS.pixi.startSubtitle, VBS.pixi.balanceFigure], 2, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }, "-=1"); //t=2

  jar.visible = true;
  /*tl.to({g:0},0.5,{
    g:1/1000,
    onUpdate:(tween)=>{
      VBS.engine.world.gravity.scale = tween.target.g
    },
    onUpdateParams: ['{self}']
  })*/

  return tl;
}
},{}],"scripts/scenes/fundIn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fundIn = fundIn;

function fundIn() {
  // Init vars
  var tl = new TimelineLite({
    id: "fundIn"
  }),
      addB2Rect = window.VBS.pixi.addB2Rect,
      user = window.VBS.user,
      b2WIDTH = window.VBS.b2.WIDTH,
      b2HEIGHT = window.VBS.b2.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      stage = VBS.pixi.app.stage;
  if (user['StartBalance'] > 0) tl.audios = [VBS.speech.getById('fundIn')];else tl.audios = []; // Subtitle added in jarIn
  // Interactive icon & text added in pixiSetup

  if (user['StartBalance'] > 0) {
    // Squares In
    var numSquares = {
      num: 0
    };
    VBS.pots.start = [];
    tl.to(numSquares, 3, {
      num: Math.ceil(Math.abs(VBS.user['StartBalance']) / VBS.unit),
      ease: Power1.easeOut,
      onStart: function onStart() {
        VBS.pixi.app.renderer.plugins.interaction.autoPreventDefault = true;
      },
      onUpdate: function onUpdate(tween) {
        var shouldBe = Math.max(0, Math.round(tween.target.num));

        if (VBS.pots.start.length > shouldBe) {
          while (VBS.pots.start.length > shouldBe) {
            VBS.pixi.remove(VBS.pots.start[VBS.pots.start.length - 1]);
            VBS.pots.start.pop();
          }
        } else {
          while (VBS.pots.start.length < shouldBe) {
            var x = b2WIDTH / 2 + (Math.random() - 0.5) * b2WIDTH / 8,
                y = Math.random() * -b2HEIGHT / 4,
                s = 0.5; //+Math.pow(Math.random(),12)*0.5
            //colors = [0xf68121,0xffb81c,0xc010a0,0x009fd2,0x702082,0x00c389]

            VBS.pots.start.push(addB2Rect(x, y, s, s, 0xf68121, 0, 0, 'Starting Balance')); //colors[Math.floor(Math.random()*colors.length)]))
          }
        }

        VBS.pixi.setBalanceFigure(Math.min(shouldBe * VBS.unit, user['StartBalance']));
      },
      onUpdateParams: ['{self}']
    }, "+=2"); //t=2
    // Interactive icon

    tl.to(VBS.pixi.interactive, 1, {
      pixi: {
        alpha: 1
      }
    }, "-=3"); //t=2

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    }); //t=3

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 0.34, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    });
    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    }); //t=4

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    });
    tl.to(VBS.pixi.interactive, 0.34, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    }); //t=5

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 1, {
      pixi: {
        alpha: 0
      }
    }, "+=1.34"); //t=7

    tl.to(VBS.pixi.interactiveText, 1, {
      pixi: {
        alpha: 1
      }
    }, "-=8"); //t=0? (nope 2)

    tl.to(VBS.pixi.interactiveText, 1, {
      pixi: {
        alpha: 0
      }
    }, "-=1"); //t=7
  } //Text out


  var subtitle = VBS.pixi.startSubtitle;
  tl.to(VBS.pixi.balanceFigure, 1, {
    pixi: {
      scale: 1.2
    }
  }, user['StartBalance'] > 0 ? "-=4" : undefined); //t=4 or 0

  tl.to(VBS.pixi.balanceFigure, 1, {
    pixi: {
      scale: 1
    }
  }, user['StartBalance'] > 0 ? "-=3" : undefined); //t=5 or 1

  tl.to(subtitle, 1, {
    pixi: {
      alpha: 0
    }
  }, user['StartBalance'] > 0 ? "-=2" : undefined); //t=6 or 2

  tl.to(VBS.pixi.balanceFigure, 3, {
    y: 7 * pixiHEIGHT / 8 - VBS.pixi.balanceFigure.height / 2,
    ease: Power2.easeOut
  }, "-=1"); //t=6 or 2

  return tl;
}
},{}],"scripts/scenes/transfersIn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transfersIn = transfersIn;

function transfersIn() {
  // Init vars
  var tl = new TimelineLite({
    id: "transfersIn"
  }),
      addB2Rect = window.VBS.pixi.addB2Rect,
      user = window.VBS.user,
      b2WIDTH = window.VBS.b2.WIDTH,
      b2HEIGHT = window.VBS.b2.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      stage = VBS.pixi.app.stage;
  tl.audios = [window.VBS.speech.getById('transfers')]; // Text

  var figure = VBS.pixi.makeFigure(Math.max(user['Transfers'] - user['Withdrawals'], 0));
  stage.addChild(figure);
  var subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"] + ' Transfers');
  stage.addChild(subtitle); //Text in

  tl.from([figure, subtitle], 1, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }); //t=0
  // Squares In

  var numSquares = {
    num: 0
  };
  VBS.pots.transfers = [];
  tl.to(numSquares, 3, {
    num: Math.ceil(Math.max(VBS.user['Transfers'] - VBS.user['Withdrawals'], 0) / VBS.unit),
    ease: Power1.easeOut,
    onUpdate: function onUpdate(tween) {
      var shouldBe = Math.max(0, Math.round(tween.target.num));

      if (VBS.pots.transfers.length > shouldBe) {
        while (VBS.pots.transfers.length > shouldBe) {
          window.VBS.pixi.remove(VBS.pots.transfers[VBS.pots.transfers.length - 1]);
          VBS.pots.transfers.pop();
        }
      } else {
        while (VBS.pots.transfers.length < shouldBe) {
          var x = b2WIDTH / 2 + (Math.random() - 0.5) * b2WIDTH / 8,
              y = Math.random() * -b2HEIGHT / 4,
              s = 0.5; //+Math.pow(Math.random(),12)*0.5
          //colors = [0xf68121,0xffb81c,0xc010a0,0x009fd2,0x702082,0x00c389]

          VBS.pots.transfers.push(addB2Rect(x, y, s, s, 0xffb81c, 0, 0, 'Transfers')); //colors[Math.floor(Math.random()*colors.length)]))
        }
      }

      VBS.pixi.setBalanceFigure(user['StartBalance'] + Math.min(shouldBe * VBS.unit, Math.max(user['Transfers'] + user['Withdrawals'], 0)));
    },
    onUpdateParams: ['{self}']
  }, "+=2"); //t=3

  if (user['StartBalance'] <= 0) {
    // Interactive icon
    tl.to(VBS.pixi.interactive, 1, {
      pixi: {
        alpha: 1
      }
    }, "-=3"); //t=3

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    }); //t=4

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 0.34, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    });
    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    }); //t=5

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    });
    tl.to(VBS.pixi.interactive, 0.34, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    }); //t=6

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 1, {
      pixi: {
        alpha: 0
      }
    }, "+=0.34"); //t=7

    tl.to(VBS.pixi.interactiveText, 1, {
      pixi: {
        alpha: 1
      }
    }, "-=7"); //t=1? (nope 3)

    tl.to(VBS.pixi.interactiveText, 1, {
      pixi: {
        alpha: 0
      }
    }, "-=1"); //t=7
  } //Text out


  tl.to([figure, subtitle], 1, {
    pixi: {
      alpha: 0
    }
  }, user['StartBalance'] <= 0 ? undefined : "+=2"); //t=8

  return tl;
}
},{}],"scripts/scenes/contsEe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contsEe = contsEe;

function contsEe() {
  // Init vars
  var tl = new TimelineLite({
    id: "contsEe"
  }),
      addB2Rect = window.VBS.pixi.addB2Rect,
      user = window.VBS.user,
      b2WIDTH = window.VBS.b2.WIDTH,
      b2HEIGHT = window.VBS.b2.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      stage = window.VBS.pixi.app.stage;
  if (user['ContributionsEE'] > 0) tl.audios = [VBS.speech.getById('contsEe0'), VBS.speech.getById('contsEe1')];else tl.audios = [VBS.speech.getById('contsEe')]; // Text

  var figure = VBS.pixi.makeFigure(user['ContributionsEE']);
  stage.addChild(figure);
  var subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"] + ' Contributions');
  stage.addChild(subtitle); //Text in

  tl.from([figure, subtitle], 1, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }); //t=0
  // Squares In

  var numSquares = {
    num: 0
  };
  VBS.pots.contsEe = [];
  tl.to(numSquares, 3, {
    num: Math.ceil(VBS.user['ContributionsEE'] / VBS.unit),
    ease: Power1.easeOut,
    onUpdate: function onUpdate(tween) {
      var shouldBe = Math.max(0, Math.round(tween.target.num));

      if (VBS.pots.contsEe.length > shouldBe) {
        while (VBS.pots.contsEe.length > shouldBe) {
          window.VBS.pixi.remove(VBS.pots.contsEe[VBS.pots.contsEe.length - 1]);
          VBS.pots.contsEe.pop();
        }
      } else {
        while (VBS.pots.contsEe.length < shouldBe) {
          var x = b2WIDTH / 2 + (Math.random() - 0.5) * b2WIDTH / 8,
              y = Math.random() * -b2HEIGHT / 4,
              s = 0.5; //+Math.pow(Math.random(),12)*0.5
          //colors = [0xf68121,0xffb81c,0xc010a0,0x009fd2,0x702082,0x00c389]

          VBS.pots.contsEe.push(addB2Rect(x, y, s, s, 0x009fd2, 0, 0, VBS.user["Possessive"] + ' Contributions'));
        }
      }

      VBS.pixi.setBalanceFigure(user['StartBalance'] + user['Transfers'] + user['Withdrawals'] + Math.min(shouldBe * VBS.unit, user['ContributionsEE']));
    },
    onUpdateParams: ['{self}']
  }, "+=3"); //t=4
  //Text out

  tl.to([figure, subtitle], 1, {
    pixi: {
      alpha: 0
    }
  }, VBS.user['ContributionsEE'] > 0 ? "+=2" : "-=1"); //t=9

  return tl;
}
},{}],"scripts/scenes/contsEr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contsEr = contsEr;

function contsEr() {
  // Init vars
  var tl = new TimelineLite({
    id: "contsEr"
  }),
      addB2Rect = window.VBS.pixi.addB2Rect,
      user = window.VBS.user,
      b2WIDTH = window.VBS.b2.WIDTH,
      b2HEIGHT = window.VBS.b2.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      stage = window.VBS.pixi.app.stage,
      erPossesive = user['Employer'] + '\'' + (user['Employer'][user['Employer'].length - 1] == 's' ? '' : 's');
  tl.audios = [VBS.speech.getById('contsEr')]; // Text

  var figure = VBS.pixi.makeFigure(user['ContributionsER']);
  stage.addChild(figure);
  var subtitle = VBS.pixi.makeSubtitle(erPossesive + ' Contributions');
  stage.addChild(subtitle); //Text in

  tl.from([figure, subtitle], 1, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }); //t=0
  // Squares In

  var numSquares = {
    num: 0
  };
  VBS.pots.contsEr = [];
  tl.to(numSquares, 3, {
    num: Math.ceil(VBS.user['ContributionsER'] / VBS.unit),
    ease: Power1.easeOut,
    onUpdate: function onUpdate(tween) {
      var shouldBe = Math.max(0, Math.round(tween.target.num));

      if (VBS.pots.contsEr.length > shouldBe) {
        while (VBS.pots.contsEr.length > shouldBe) {
          window.VBS.pixi.remove(VBS.pots.contsEr[VBS.pots.contsEr.length - 1]);
          VBS.pots.contsEr.pop();
        }
      } else {
        while (VBS.pots.contsEr.length < shouldBe) {
          var x = b2WIDTH / 2 + (Math.random() - 0.5) * b2WIDTH / 8,
              y = Math.random() * -b2HEIGHT / 4,
              s = 0.5; //+Math.pow(Math.random(),12)*0.5
          //colors = [0xf68121,0xffb81c,0xc010a0,0x009fd2,0x702082,0x00c389]

          VBS.pots.contsEr.push(addB2Rect(x, y, s, s, 0x00c389, 0, 0, erPossesive + ' Contributions')); //colors[Math.floor(Math.random()*colors.length)]))
        }
      }

      VBS.pixi.setBalanceFigure(user['StartBalance'] + user['Transfers'] + user['Withdrawals'] + user['ContributionsEE'] + Math.min(shouldBe * VBS.unit, user['ContributionsER']));
    },
    onUpdateParams: ['{self}']
  }, "+=2"); //t=3

  var interactiveIconNeeded = user['StartBalance'] <= 0 && user['Transfers'] <= 0;

  if (interactiveIconNeeded) {
    // Interactive icon
    tl.to(VBS.pixi.interactive, 1, {
      pixi: {
        alpha: 1
      }
    }, "-=3"); //t=3

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    }); //t=4

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 0.34, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    });
    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    }); //t=5

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    });
    tl.to(VBS.pixi.interactive, 0.34, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x + 5,
      y: VBS.pixi.interactive.y - 5
    }); //t=6

    tl.to(VBS.pixi.interactive, 0.33, {
      x: VBS.pixi.interactive.x - 5,
      y: VBS.pixi.interactive.y + 5
    });
    tl.to(VBS.pixi.interactive, 1, {
      pixi: {
        alpha: 0
      }
    }, "+=0.34"); //t=7

    tl.to(VBS.pixi.interactiveText, 1, {
      pixi: {
        alpha: 1
      }
    }, "-=7"); //t=1? (nope 3)

    tl.to(VBS.pixi.interactiveText, 1, {
      pixi: {
        alpha: 0
      }
    }, "-=1"); //t=7
  } //Text out


  tl.to([figure, subtitle], 1, {
    pixi: {
      alpha: 0
    }
  }, interactiveIconNeeded ? undefined : "+=2"); //t=8

  return tl;
}
},{}],"scripts/scenes/returnIn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnIn = returnIn;

function returnIn() {
  // Init vars
  var tl = new TimelineLite({
    id: "returnIn"
  }),
      addB2Rect = window.VBS.pixi.addB2Rect,
      user = window.VBS.user,
      b2WIDTH = window.VBS.b2.WIDTH,
      b2HEIGHT = window.VBS.b2.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      stage = window.VBS.pixi.app.stage;
  tl.audios = [VBS.speech.getById('return')]; // Text

  var figure = VBS.pixi.makeFigure(Math.max(user['Return'], 0));
  stage.addChild(figure);
  var subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"] + ' Investments');
  stage.addChild(subtitle); //Text in

  tl.from([figure, subtitle], 1, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }); //t=0
  // Squares In

  var numSquares = {
    num: 0
  },
      afterCharges = VBS.user['Return'] + VBS.user['Charges'] > 0 ? Math.ceil((VBS.user['Return'] + VBS.user['Charges']) / VBS.unit) : 0;
  VBS.pots.return = [];
  tl.to(numSquares, 3, {
    num: afterCharges + 1,
    ease: Power1.easeOut,
    onUpdate: function onUpdate(tween) {
      var shouldBe = Math.max(0, Math.round(tween.target.num));

      if (VBS.pots.return.length > shouldBe) {
        while (VBS.pots.return.length > shouldBe) {
          window.VBS.pixi.remove(VBS.pots.return[VBS.pots.return.length - 1]);
          VBS.pots.return.pop();
        }
      } else {
        while (VBS.pots.return.length < shouldBe) {
          var x = b2WIDTH / 2 + (Math.random() - 0.5) * b2WIDTH / 8,
              y = Math.random() * -b2HEIGHT / 4,
              s = 0.5; //+Math.pow(Math.random(),12)*0.5
          //colors = [0xf68121,0xffb81c,0x009fd2,0xc010a0,0x702082,0x00c389]

          VBS.pots.return.push(addB2Rect(x, y, s, s, 0xc010a0, 0, 0, 'Investments')); //colors[Math.floor(Math.random()*colors.length)]))
        }
      }

      VBS.pixi.setBalanceFigure(user['StartBalance'] + user['Transfers'] + user['Withdrawals'] + user['ContributionsEE'] + user['ContributionsER'] + Math.min(shouldBe * VBS.unit, user['Return']));
    },
    onUpdateParams: ['{self}']
  }); //Text out

  tl.to([figure, subtitle], 1, {
    pixi: {
      alpha: 0
    }
  }, "+=2"); //t=8

  return tl;
}
},{}],"scripts/scenes/returnOut.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnOut = returnOut;

function returnOut() {
  // Init vars
  var tl = new TimelineLite({
    id: "returnOut"
  }),
      addB2Rect = window.VBS.pixi.addB2Rect,
      user = window.VBS.user,
      b2WIDTH = window.VBS.b2.WIDTH,
      b2HEIGHT = window.VBS.b2.HEIGHT,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      SCALE = window.VBS.pixi.SCALE,
      MARGIN = window.VBS.pixi.MARGIN,
      stage = window.VBS.pixi.app.stage,
      world = window.VBS.b2.world,
      setUpJoint = VBS.b2.setUpJoint,
      joints = [],
      startPos = [];
  tl.audios = [VBS.speech.getById('return0'), VBS.speech.getById('return1')]; // Text

  var figure = VBS.pixi.makeFigure(Math.min(user['Return'], 0));
  stage.addChild(figure);
  var subtitle = VBS.pixi.makeSubtitle(VBS.user["Possessive"] + ' Investments');
  stage.addChild(subtitle); // Random walk

  var randomWalk = VBS.pixi.randomWalk = new PIXI.Graphics(),
      randomWalkSteps = [10, -9, 5, -4, 8, -7, 6, 6, -10, 2, 4, 2, 1, 6, 3, -10, 2, -3, -8, -3, 6, -4, 2, 10, 9, -8, -1, -10, -4, -4, 8, -5, 9, -9, 6, 5, -9, 7, 10, 5, 6, -6, -4, 8, 3, 4, -8, -10, -2, -2, -2, 9, 8, 3, 6, 8, -10, -8, 6, 5, -9, -5, -4, -4, -9, -4, 7, -2, -10, 5, 2, -9, -7, 3, -1, -8, 2, 3, 0, 6, 8, -9, 8, -5, -2, -5, -2, -10, -2, -8, -1, 4, 3, 5, -6, 3, -6, -1, -4, -8]; //[-7.0,-2.4,6.8,2.7,-6.1,9.4,-3.3,-7.8,2.1,0.9,-0.9,2.9,-9.6,-0.2,2.1,0.4,-7.6,1.2,5.6,8.9,0.1,-2.6,-5.6,0.3,6.9,-6.6,-3.3,9.2,1.9,-5.9,-1.1,-0.9,-4.9,0.2,-8.8,-6.1,-9.1,4.9,3.9,-7.5,0.3,-4.4,3.6,5.8,-3.3,2.2,-8.5,-8.1,5.7,8.7,9.1,-7.7,4.3,-1.5,5.8,3.9,-6.1,-8.5,8.2,-6.5,-1.7,5.0,6.0,-5.0,-8.4,7.2,8.7,-3.9,4.6,-9.3,3.0,-6.2,-5.4,0.7,-3.1,-6.0,2.9,-2.1,-1.0,-8.2,0.0,-3.5,-9.9,7.0,-8.9,4.6,-7.0,5.0,-7.5,4.7,3.7,-7.6,0.6,-6.8,9.5,0.1,-7.9,-7.5,-1.7]
  // for(let i=0;i<100;i++){
  //   randomWalkSteps.push(Math.round((Math.random() < 0.45 ? 1 : -1)*Math.random()*10,1))
  // }
  // console.log(randomWalkSteps)

  var drawRandomWalk = VBS.pixi.drawRandomWalk = function (numSteps) {
    randomWalk.clear();
    randomWalk.lineStyle(4, 0x666666);
    var currPos = {
      x: -pixiWIDTH / 4,
      y: 0
    },
        step = pixiWIDTH / 2 / 100;
    randomWalk.moveTo(currPos.x, currPos.y);

    for (var i = 0; i < numSteps && i < randomWalkSteps.length; i++) {
      currPos.x += step;
      currPos.y += randomWalkSteps[i];
      randomWalk.lineTo(currPos.x, currPos.y);
    }
  };

  randomWalk.position.set(pixiWIDTH / 2, pixiHEIGHT / 3);
  stage.addChild(randomWalk); //Text in

  tl.from([figure, subtitle], 1, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }); //t=0
  // Grow shrink

  var scaleRect = window.VBS.pixi.scaleRect = function (actor, scale) {
    if (!actor.body) return;
    var fill = actor.geometry.graphicsData[0].fillStyle.color;
    var verts = actor.body.GetFixtureList().GetShape().GetVertices().reduce(function (obj, v) {
      return {
        min: {
          x: Math.min(obj.min.x, v.x),
          y: Math.min(obj.min.y, v.y)
        },
        max: {
          x: Math.max(obj.max.x, v.x),
          y: Math.max(obj.max.y, v.y)
        }
      };
    }, {
      min: {
        x: Infinity,
        y: Infinity
      },
      max: {
        x: -Infinity,
        y: -Infinity
      }
    });
    var wWas = verts.max.x - verts.min.x,
        hWas = verts.max.y - verts.min.y;
    actor.clear();
    actor.beginFill(fill);
    actor.drawRect(-1 * SCALE * wWas * scale / 2, -1 * SCALE * hWas * scale / 2, SCALE * wWas * scale * (1 - MARGIN), SCALE * hWas * scale * (1 - MARGIN));
    actor.endFill();
  };

  var obj = {
    s: 1
    /*TweenMax.to(obj,2,{
      s:1.33,
      ease: Power1.easeInOut,
      onUpdate: function(tween){
        VBS.pots.start.forEach(actor => {
          VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
        })
      },
      onUpdateParams: ['{self}'],
      onComplete: function(){
        TweenMax.to(obj,2,{
          s:0.5,
          ease: Power1.easeInOut,
          onUpdate: function(tween){
            VBS.pots.start.forEach(actor => {
              VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
            })
          },
          onUpdateParams: ['{self}'],
          onComplete: function(){
            TweenMax.to(obj,2,{
              s:1,
              ease: Power1.easeInOut,
              onUpdate: function(tween){
                VBS.pots.start.forEach(actor => {
                  VBS.pixi.scaleRect(actor,tween.target.s,tween.target.s)
                })
              },
              onUpdateParams: ['{self}']
            })
          }
        })
      }
    })*/

  };

  for (var i = 0; i < 2; i++) {
    tl.to(obj, 1, {
      s: 0.67,
      ease: Power1.easeInOut,
      onUpdate: function onUpdate(tween) {
        Object.keys(VBS.pots).forEach(function (key) {
          VBS.pots[key].forEach(function (actor) {
            VBS.pixi.scaleRect(actor, tween.target.s, tween.target.s);
          });
        });
      },
      onUpdateParams: ['{self}']
    }); //t=0-1

    tl.to(obj, 2, {
      s: 1,
      ease: Power1.easeInOut,
      onUpdate: function onUpdate(tween) {
        Object.keys(VBS.pots).forEach(function (key) {
          VBS.pots[key].forEach(function (actor) {
            VBS.pixi.scaleRect(actor, tween.target.s, tween.target.s);
          });
        });
      },
      onUpdateParams: ['{self}']
    }); //t=1-3

    tl.to(obj, 1, {
      s: 0.67,
      ease: Power1.easeInOut,
      onUpdate: function onUpdate(tween) {
        Object.keys(VBS.pots).forEach(function (key) {
          VBS.pots[key].forEach(function (actor) {
            VBS.pixi.scaleRect(actor, tween.target.s, tween.target.s);
          });
        });
      },
      onUpdateParams: ['{self}']
    }); //t=3-4

    var finalScale = 1 - Math.abs(VBS.user['Return']) / (VBS.user['EndBalance'] - VBS.user['Return']);
    tl.to(obj, 2, {
      s: finalScale,
      ease: Power1.easeInOut,
      onUpdate: function onUpdate(tween) {
        Object.keys(VBS.pots).forEach(function (key) {
          VBS.pots[key].forEach(function (actor) {
            VBS.pixi.scaleRect(actor, tween.target.s, tween.target.s);
          });
        });
      },
      onUpdateParams: ['{self}']
    }); //t=4-6
  }
  /* Squares Out - joint method
  tl.to({prog:0}, 4, {
    prog: 1,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      //if at the start
      if(tween.target.prog < 0.025){
        VBS.pots.return.forEach((actor,i) => { // destroy joints if they exists & change to dynamic bodies
          actor.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody)
          if(joints.length > i) world.DestroyJoint(joints[i])
          actor.body.SetAwake(true)
        })
        joints = []
        VBS.pots.return = [] //reset squares
        return; //do nothing else
      }
      // if at the end
      if(tween.target.prog > 0.975){
        VBS.pots.return.forEach((actor,i) => { // destroy joints if they exists & change to kinematic bodies ready for fade out
          actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody)
          actor.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0,0))
          if(joints.length > i) world.DestroyJoint(joints[i])
        })
        joints = []
        return; //do nothing else
      }
      //if in the middle
      if(!VBS.pots.return.length){ //init actors to remove if not done so already
        let numToRemove = Math.max(Math.round(Math.abs(VBS.user['Return'])/VBS.unit),1)
        VBS.pots.return = VBS.pixi.gimme(numToRemove, true)
      }
      if(!joints.length){ //if joints dont exist, create them
        startPos = []
        VBS.pots.return.forEach((actor,i) => {
          actor.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody)
          startPos.push({x:actor.body.GetPosition().x,y:actor.body.GetPosition().y})
          joints.push(setUpJoint(actor.body))
          actor.body.SetAwake(true)
        })
      }
      joints.forEach((joint,i) => { // update joint target
        let x = startPos[i].x+(tween.target.prog*(b2WIDTH/2-startPos[i].x))
        let y = startPos[i].y+(tween.target.prog*(b2HEIGHT/4-startPos[i].y))
        joint.SetTarget(new Box2D.Common.Math.b2Vec2(x, y))
        VBS.pots.return[i].body.SetAwake(true)
      })
    },
    onUpdateParams: ['{self}']
  },"-=6") //t=6
  tl.to({a:1}, 1, {
      a: 0,
      ease: Power2.easeOut,
      onUpdate: function(tween){
        if(VBS.pots.return.length && !VBS.pots.return[0].body){ //add kinematic bodies back in if they don't exist
          VBS.pots.return.forEach((actor,i) => {
            if(!actor.body){
              actor.body = window.VBS.b2.addRect(actor.x/SCALE,actor.y/SCALE,1/(1-MARGIN)*actor.width/SCALE,1/(1-MARGIN)*actor.height/SCALE)
              actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody)
            }
            VBS.pixi.app.stage.addChild(actor)
          })
        }
        VBS.pots.return.forEach((actor,i) => { // fade out kinematic bodies
          actor.alpha = tween.target.a
        })
        VBS.pixi.setBalanceFigure(user['StartBalance']+user['Transfers']+user['Withdrawals']+user['ContributionsEE']+user['ContributionsER']+Math.max((tween.target.a-1)*VBS.pots.return.length * VBS.unit, user['Return']))
        if(tween.target.a < 0.025){ // if at end, destory body from world
          VBS.pots.return.forEach((actor,i) => {
            world.DestroyBody(actor.body)
            actor.body = null
            VBS.pixi.app.stage.removeChild(actor)
          })
        }
      },
      onUpdateParams: ['{self}']
  },"-=1") //t=11*/
  // Random walk in


  tl.to({
    numSteps: 0
  }, 8, {
    numSteps: randomWalkSteps.length,
    ease: Power0.easeNone,
    onUpdate: function onUpdate(tween) {
      drawRandomWalk(tween.target.numSteps);
    },
    onUpdateParams: ['{self}']
  }, 0); //t=
  //Text out

  tl.to([figure, subtitle, randomWalk], 1, {
    pixi: {
      alpha: 0
    }
  }, "+=4"); //t=12

  return tl;
}
},{}],"scripts/scenes/chargesOut.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chargesOut = chargesOut;

function chargesOut() {
  // Init vars
  var tl = new TimelineLite({
    id: "chargesOut"
  }),
      world = window.VBS.b2.world,
      user = window.VBS.user,
      b2WIDTH = window.VBS.b2.WIDTH,
      b2HEIGHT = window.VBS.b2.HEIGHT,
      SCALE = window.VBS.pixi.SCALE,
      MARGIN = window.VBS.pixi.MARGIN,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      stage = window.VBS.pixi.app.stage,
      joints = [],
      startPos = [],
      setUpJoint = VBS.b2.setUpJoint;
  VBS.pots.charges = [];
  tl.audios = [VBS.speech.getById('charges')]; // Text

  var figure = VBS.pixi.makeFigure(Math.min(user['Charges'], 0));
  stage.addChild(figure);
  var subtitle = VBS.pixi.makeSubtitle('Annual Member Fee');
  stage.addChild(subtitle); //Text in

  tl.from([figure, subtitle], 1, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }); //t=0
  // Squares Out - joint method

  tl.to({
    prog: 0
  }, 2, {
    prog: 1,
    ease: Power1.easeInOut,
    onUpdate: function onUpdate(tween) {
      //if at the start
      if (tween.target.prog < 0.025) {
        VBS.pots.charges.forEach(function (actor, i) {
          // destroy joints if they exists & change to dynamic bodies
          actor.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody);
          if (joints.length > i) world.DestroyJoint(joints[i]);
          actor.body.SetAwake(true);
        });
        joints = [];
        VBS.pots.charges = []; //reset squares

        return; //do nothing else
      } // if at the end


      if (tween.target.prog > 0.975) {
        VBS.pots.charges.forEach(function (actor, i) {
          // destroy joints if they exists & change to kinematic bodies ready for fade out
          actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody);
          actor.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
          if (joints.length > i) world.DestroyJoint(joints[i]);
        });
        joints = [];
        return; //do nothing else
      } //if in the middle


      if (!VBS.pots.charges.length) {
        //init actors to remove if not done so already
        var numToRemove = Math.ceil(Math.max(Math.abs(VBS.user['Charges']), 1) / VBS.unit);
        VBS.pots.charges = VBS.pixi.gimme(numToRemove);
      }

      if (!joints.length) {
        //if joints dont exist, create them
        startPos = [];
        VBS.pots.charges.forEach(function (actor, i) {
          actor.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody);
          startPos.push({
            x: actor.body.GetPosition().x,
            y: actor.body.GetPosition().y
          });
          joints.push(setUpJoint(actor.body));
          actor.body.SetAwake(true);
        });
      }

      joints.forEach(function (joint, i) {
        // update joint target
        var x = startPos[i].x + tween.target.prog * (b2WIDTH / 2 - startPos[i].x);
        var y = startPos[i].y + tween.target.prog * (b2HEIGHT / 4 - startPos[i].y);
        joint.SetTarget(new Box2D.Common.Math.b2Vec2(x, y));
        VBS.pots.charges[i].body.SetAwake(true);
      });
    },
    onUpdateParams: ['{self}']
  });
  tl.to({
    a: 1
  }, 1, {
    a: 0,
    ease: Power2.easeOut,
    onUpdate: function onUpdate(tween) {
      if (VBS.pots.charges.length && !VBS.pots.charges[0].body) {
        //add kinematic bodies back in if they don't exist
        VBS.pots.charges.forEach(function (actor, i) {
          if (!actor.body) {
            actor.body = window.VBS.b2.addRect(actor.x / SCALE, actor.y / SCALE, 1 / (1 - MARGIN) * actor.width / SCALE, 1 / (1 - MARGIN) * actor.height / SCALE);
            actor.body.SetType(Box2D.Dynamics.b2Body.b2_kinematicBody);
          }

          VBS.pixi.app.stage.addChild(actor);
        });
      }

      VBS.pots.charges.forEach(function (actor, i) {
        // fade out kinematic bodies
        actor.alpha = tween.target.a;
      });
      VBS.pixi.setBalanceFigure(user['StartBalance'] + user['Transfers'] + user['Withdrawals'] + user['ContributionsEE'] + user['ContributionsER'] + user['Return'] + Math.max((tween.target.a - 1) * VBS.pots.charges.length * VBS.unit, user['Charges']));

      if (tween.target.a < 0.025) {
        // if at end, destory body from world
        VBS.pots.charges.forEach(function (actor, i) {
          world.DestroyBody(actor.body);
          actor.body = null;
          VBS.pixi.app.stage.removeChild(actor);
        });
      }
    },
    onUpdateParams: ['{self}']
  }, "+=0.67"); //Text out

  tl.to([figure, subtitle], 1, {
    pixi: {
      alpha: 0
    }
  }); //t=

  return tl;
}
},{}],"scripts/scenes/closingBalance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closingBalance = closingBalance;

function closingBalance() {
  // Init vars
  var tl = new TimelineLite({
    id: "endBalance"
  }),
      user = window.VBS.user,
      pixiWIDTH = window.VBS.pixi.WIDTH,
      pixiHEIGHT = window.VBS.pixi.HEIGHT,
      stage = VBS.pixi.app.stage;
  tl.audios = [VBS.speech.getById('end')]; // Text

  var subtitle = VBS.pixi.makeSubtitle(user['EndDate'].toFormattedString());
  stage.addChild(subtitle); //Text in

  var textMetrics = PIXI.TextMetrics.measureText('£0', VBS.pixi.balanceFigureStyle);
  tl.to(VBS.pixi.balanceFigure, 2, {
    x: pixiWIDTH / 2,
    y: textMetrics.height
  }); //t=0

  tl.to(VBS.pixi.jarSubtitle, 0.5, {
    pixi: {
      alpha: 0
    }
  }, "-=2"); //t=

  tl.from(subtitle, 1, {
    y: -pixiHEIGHT / 8,
    pixi: {
      alpha: 0
    }
  }, "-=1"); //t=0
  //Text out

  tl.to([subtitle, VBS.pixi.balanceFigure], 2, {
    pixi: {
      alpha: 0
    }
  }, "+=8"); //t=
  // Jar out

  tl.to({
    a: 1
  }, 2, {
    a: 0,
    onStart: function onStart() {
      VBS.pixi.tooltipOut();
      VBS.pixi.app.renderer.plugins.interaction.autoPreventDefault = false;
    },
    onUpdate: function onUpdate(tween) {
      for (var _i = 0, _Object$keys = Object.keys(VBS.pots); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = VBS.pots[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var sq = _step.value;
            sq.alpha = tween.target.a;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      VBS.pixi.jar.alpha = tween.target.a;
    },
    onUpdateParams: ['{self}']
  }, "-=2"); //t=

  return tl;
}
},{}],"scripts/scenes/tableEnd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableEnd = tableEnd;

function tableEnd() {
  // Init vars
  var tl = new TimelineLite({
    id: "tableEnd"
  }),
      stage = window.VBS.pixi.app.stage,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT;
  tl.audios = [VBS.speech.getById('tableEnd')]; //Create values

  var rowValues = VBS.pixi.table.rowValues = [],
      whiteTextStyle = VBS.pixi.table.whiteTextStyle,
      blackTextStyle = VBS.pixi.table.blackTextStyle;
  rowValues.push(new PIXI.Text('£' + VBS.user['StartBalance'].toFixedCommas(), whiteTextStyle));
  if (VBS.user['Transfers'] > 0) rowValues.push(new PIXI.Text('£' + VBS.user['Transfers'].toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text('£' + (VBS.user['ContributionsEE'] + VBS.user['ContributionsER']).toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text((VBS.user['Return'] < 0 ? '–' : '') + '£' + Math.abs(VBS.user['Return']).toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text('–£' + Math.abs(VBS.user['Charges']).toFixedCommas(), blackTextStyle));
  rowValues.push(new PIXI.Text('£' + VBS.user['EndBalance'].toFixedCommas(), whiteTextStyle));
  var fullRowHeight = 6 * HEIGHT / 8 / rowValues.length;
  rowValues.forEach(function (actor, i) {
    actor.alpha = 0;
    actor.position.set(15 * WIDTH / 16 - actor.width, HEIGHT / 8 + i * fullRowHeight + fullRowHeight / 2 - actor.height / 2);
    VBS.pixi.app.stage.addChild(actor);
  }); // Summary table in

  var tableEls = VBS.pixi.table.rowRects.concat(VBS.pixi.table.rowTexts).concat(VBS.pixi.table.rowValues);
  tl.to(tableEls, 1, {
    pixi: {
      alpha: 1
    },
    ease: Power2.easeOut
  }); // Contents table out

  tl.to(tableEls, 1, {
    pixi: {
      alpha: 0
    },
    ease: Power2.easeOut
  }, "+=5");
  return tl;
}
},{}],"scripts/scenes/today.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.today = today;

function today() {
  // Init vars
  var tl = new TimelineLite({
    id: "today"
  }),
      stage = window.VBS.pixi.app.stage,
      arrow = window.VBS.pixi.arrow,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT,
      user = VBS.user;
  if (user['Scheme'] == 5 && user['Category'] == 5001) tl.audios = [VBS.speech.getById('todayTWPS0'), VBS.speech.getById('todayTWPS1')];else tl.audios = [VBS.speech.getById('today')]; // let audioDur = 0
  // for(let i=0;i<tl.audios.length;i++){
  //     audioDur += tl.audios[i].howl.duration()
  // }

  var $headlineBalance = $('.summary-bar .column-2').eq(0);
  $headlineBalance.css({
    position: 'relative',
    zIndex: 98,
    backgroundColor: '#ededed'
  }); // Build text

  var subtitleStyle = VBS.pixi.baseTextStyle.clone();
  subtitleStyle.fontSize = 28;
  subtitleStyle.fontWeight = '400';
  subtitleStyle.align = 'center';
  var subtitleText = 'Your LifeSight Account today',
      textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle);
  var subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5);
  subtitle.position.set(WIDTH / 2, 2 * textMetrics.height);
  subtitle.scale.set(0);
  stage.addChild(subtitle); // Point to balance

  var pointer = VBS.pixi.pointer; //built in pixi setup

  tl.to(pointer, 1, {
    pixi: {
      alpha: 1,
      rotation: 0
    },
    ease: Power1.easeInOut,
    onUpdate: function onUpdate(tween) {
      if (tween.ratio < 0.25) $headlineBalance.css('zIndex', 98);else if (tween.ratio > 0.75) $headlineBalance.css('zIndex', 99);
    },
    onUpdateParams: ['{self}']
  }); //t=

  tl.to(subtitle, 4, {
    pixi: {
      scale: 1.5
    },
    ease: Power0.easeNone
  }); //t=

  tl.to(subtitle, 2, {
    pixi: {
      alpha: 0
    },
    ease: Power1.easeOut
  }, '-=2'); //t=

  tl.to(pointer, 1, {
    y: "-=40",
    yoyo: true,
    repeat: user['Scheme'] == 5 && user['Category'] == 5001 && user['Balance'] > user['EndBalance'] ? 8 : 4,
    onComplete: function onComplete() {
      $headlineBalance.css('zIndex', 98);
    }
  }, '-=4');
  return tl;
}
},{}],"scripts/scenes/lsAge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lsAge = lsAge;

function lsAge() {
  // Init vars
  var tl = new TimelineLite({
    id: "lsAge"
  }),
      stage = window.VBS.pixi.app.stage,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT,
      user = VBS.user;
  tl.audios = [VBS.speech.getById('lsAge')];
  if (isFinite(user['LSAge']) && +user['LSAge'] > 54 && +user['LSAge'] < 75) tl.audios.push(VBS.speech.getById('lsAge2')); // Create text for LifeSight Age scene
  // let lsAge = VBS.pixi.lsAge = new PIXI.Container(),
  //   lsAgeRects = new PIXI.Graphics(),
  //   lsAgeStyle = new PIXI.TextStyle({fontFamily : ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'], fontSize: 200, fill : 0xff1010, align : 'center'}),
  //   textMetrics = PIXI.TextMetrics.measureText(VBS.user['LSAge'] ? VBS.user['LSAge'] : '??', lsAgeStyle)
  // lsAgeRects.beginFill(0xffffff,0.2);
  // lsAgeRects.drawRect()
  // lsAgeRects.endFill();
  // let lsAgeText = new PIXI.Text(VBS.user['LSAge'],lsAgeStyle);
  // lsAgeText.position.set(WIDTH/2-textMetrics.width/2, HEIGHT/2-textMetrics.height/2)
  // lsAge.addChild(lsAgeRects,lsAgeText)
  // stage.addChild(lsAge)
  // let audioDur = 0
  // for(let i=0;i<tl.audios.length;i++){
  //     audioDur += tl.audios[i].howl.duration()
  // }

  var $lsAgePanelBody = $('#panelBodyPNL_MY_LIFESIGHT_AGE1'),
      $lsAgePanel = $lsAgePanelBody.parents('.panel').eq(0);
  $lsAgePanel.css('position', 'relative');
  $lsAgePanel.css('zIndex', 98); // tl.to({prog:0},audioDur+1,{
  //     prog: 1,
  //     ease: Power0.easeNone,
  //     onUpdate: function(tween){
  //         if(
  //             (tween.target.prog < 0.1 || tween.target.prog > 0.9) &&
  //             (Number.isNaN(+$lsAgePanel.css('zIndex')) || parseInt($lsAgePanel.css('zIndex')) > 98)
  //         ){
  //             $lsAgePanel.css('zIndex',98)
  //         } else if(
  //             tween.target.prog > 0.1 && tween.target.prog < 0.9 &&
  //             (Number.isNaN(+$lsAgePanel.css('zIndex')) || parseInt($lsAgePanel.css('zIndex')) < 99)
  //         ){
  //             if(!$lsAgePanelBody.hasClass('open')) $lsAgePanelBody.prev().children().eq(0).click()
  //             $lsAgePanel.css('zIndex',99)
  //         }
  //     },
  //     onUpdateParams: ['{self}']
  // })

  /*Eyes reset
  tl.to(VBS.pixi.eyeState, 0.1, {
    w:0, h:0.05, alpha:0, angle:30,
    ease: Power0.easeNone,
    onUpdate: function(tween){
      if(tween.ratio > 0.95){
        VBS.pixi.drawEyes(VBS.pixi.eyeState)
        VBS.pixi.eyes.alpha = 1
      }
    },
    onUpdateParams: ['{self}']
  }) //t=0
  //Eyes open
  tl.to(VBS.pixi.eyeState, 0.8, {
    w: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  }) //t=0.1
  tl.to(VBS.pixi.eyeState, 1, {
    h: VBS.pixi.WIDTH/8,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
      $lsAgePanel.css('zIndex',98)
    },
    onUpdateParams: ['{self}']
  }) //t=0.9
  tl.to(VBS.pixi.eyeState, 0.5, {
    pixi: {alpha: 1},
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
      if(!$lsAgePanelBody.hasClass('open')) $lsAgePanelBody.prev().children().eq(0).click()
      $lsAgePanel.css('zIndex',99)
    },
    onUpdateParams: ['{self}']
  }) //t=1.9
    // Look to ageOmeter
  tl.to(VBS.pixi.eyeState, 1, {
    angle: $(window).width() < 600 ? -90 : $(window).width() < 1200 ? 210 : 180,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      $lsAgePanel.css('zIndex',99)
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  }) //t=2.4
    if(VBS.user['Beneficiaries'] == 0){
    //wait for rest of audio and remove lsage highlight
    tl.to({prog:0}, Math.max(audioDur-2.4,1), {
      prog: 1,
      ease: Power1.easeInOut,
      onUpdate: function(tween){
        $lsAgePanel.css('zIndex',99)
        if(tween.ratio > 0.95) $lsAgePanel.css('zIndex',98)
      },
      onUpdateParams: ['{self}']
    }) //t=3.4
  } else {
    // Fade out eyes and remove lsage highlight
    tl.to({a:1}, 1, {
      a:0,
      ease: Power1.easeOut,
      onUpdate: function(tween){
        VBS.pixi.eyes.alpha = tween.target.a
        $lsAgePanel.css('zIndex',99)
        if(tween.ratio > 0.95) $lsAgePanel.css('zIndex',98)
      },
      onUpdateParams: ['{self}']
    },audioDur)
  }*/
  // Build text

  var subtitleStyle = VBS.pixi.baseTextStyle.clone();
  subtitleStyle.fontSize = 28;
  subtitleStyle.fontWeight = '400';
  subtitleStyle.align = 'center';
  var subtitleText = 'This is your LifeSight Age',
      textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle);
  var subtitle = new PIXI.Text(subtitleText, subtitleStyle);
  subtitle.anchor.set(0.5);
  subtitle.position.set(WIDTH / 2, 2 * textMetrics.height);
  subtitle.scale.set(0);
  stage.addChild(subtitle); // Point to ageOmeter

  var pointer = VBS.pixi.pointer,
      degrees = $(window).width() < 600 ? 0 : $(window).width() < 1200 ? -60 : -80,
      radians = degrees * Math.PI / 180;
  tl.to(pointer, 1, {
    pixi: {
      rotation: degrees,
      alpha: 1
    },
    ease: Power1.easeInOut,
    onUpdate: function onUpdate(tween) {
      if (tween.ratio < 0.25) $lsAgePanel.css('zIndex', 98);else if (tween.ratio > 0.75) {
        if (!$lsAgePanelBody.hasClass('open')) $lsAgePanelBody.prev().children().eq(0).click();
        $lsAgePanel.css('zIndex', 99);
      }
    },
    onUpdateParams: ['{self}']
  }); //t=

  tl.to(subtitle, 4, {
    pixi: {
      scale: 1.5
    },
    ease: Power0.easeNone
  }); //t=

  tl.to(subtitle, 2, {
    pixi: {
      alpha: 0
    },
    ease: Power1.easeOut
  }, '-=2'); //t=

  tl.to(pointer, 1, {
    x: "+=" + 40 * Math.sin(radians),
    y: "-=" + 40 * Math.cos(radians),
    yoyo: true,
    repeat: isFinite(VBS.user['LSAge']) ? 15 : 8,
    onComplete: function onComplete() {
      $lsAgePanel.css('zIndex', 98);
    }
  }, '-=4');

  if (VBS.user['Beneficiaries'] !== 0) {
    tl.to(pointer, 1, {
      pixi: {
        alpha: 0
      }
    });
  }

  return tl;
}
},{}],"scripts/scenes/bene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bene = bene;

function bene() {
  // Init vars
  var tl = new TimelineLite({
    id: "bene"
  }),
      stage = window.VBS.pixi.app.stage,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT,
      user = VBS.user;
  tl.audios = [VBS.speech.getById('bene')]; // let audioDur = 0
  // for(let i=0;i<tl.audios.length;i++){
  //     audioDur += tl.audios[i].howl.duration()
  // }

  var $tasksPanelBody = $('#panelBodyPNL_ENGJMNT_TRACKER'),
      $tasksPanel = $tasksPanelBody.parents('.panel').eq(0);
  $tasksPanel.css('position', 'relative');
  $tasksPanel.css('zIndex', 98); // tl.to({prog:0},audioDur+1,{
  //     prog: 1,
  //     ease: Power0.easeNone,
  //     onUpdate: function(tween){
  //         if(
  //             (tween.target.prog < 0.1 || tween.target.prog > 0.9) &&
  //             (Number.isNaN(+$tasksPanel.css('zIndex')) || parseInt($tasksPanel.css('zIndex')) > 98)
  //         ){
  //             $tasksPanel.css('zIndex',98)
  //         } else if(
  //             tween.target.prog > 0.1 && tween.target.prog < 0.9 &&
  //             (Number.isNaN(+$tasksPanel.css('zIndex')) || parseInt($tasksPanel.css('zIndex')) < 99)
  //         ){
  //             if(!$tasksPanelBody.hasClass('open')) $tasksPanelBody.prev().children().eq(0).click()
  //             $tasksPanel.css('zIndex',99)
  //         }
  //     },
  //     onUpdateParams: ['{self}']
  // })

  /* Look to task list
  tl.to(VBS.pixi.eyeState, 1.5, {
    angle: $(window).width() < 600 ? 90 : $(window).width() < 1200 ? 150 : 0,
    ease: Power1.easeInOut,
    onUpdate: function(tween){
      if(tween.ratio < 0.1) $tasksPanel.css('zIndex',98)
      else if(!$tasksPanelBody.hasClass('open')) $tasksPanelBody.prev().children().eq(0).click()
      else $tasksPanel.css('zIndex',99)
      if(VBS.pixi.eyes.alpha != 1) VBS.pixi.eyes.alpha = 1
      VBS.pixi.drawEyes(tween.target)
    },
    onUpdateParams: ['{self}']
  }) //t=3.4
    // Fade out eyes and remove tasks highlight
  tl.to({a:1}, 1, {
      a:0,
      ease: Power1.easeOut,
      onUpdate: function(tween){
        VBS.pixi.eyes.alpha = tween.target.a
        $tasksPanel.css('zIndex',99)
        if(tween.ratio > 0.95) $tasksPanel.css('zIndex',98)
      },
      onUpdateParams: ['{self}']
  },audioDur)*/
  // Build text

  var subtitleStyle = VBS.pixi.baseTextStyle.clone();
  subtitleStyle.fontSize = 28;
  subtitleStyle.fontWeight = '400';
  subtitleStyle.align = 'center';
  var subtitleText = 'Remember to provide details',
      textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle);
  var firstSubtitle = new PIXI.Text(subtitleText, subtitleStyle);
  firstSubtitle.anchor.set(0.5);
  firstSubtitle.position.set(WIDTH / 2, 2 * textMetrics.height);
  firstSubtitle.scale.set(0);
  subtitleText = 'of your beneficiaries';
  textMetrics = PIXI.TextMetrics.measureText(subtitleText, subtitleStyle);
  var secondSubtitle = new PIXI.Text(subtitleText, subtitleStyle);
  secondSubtitle.anchor.set(0.5);
  secondSubtitle.position.set(WIDTH / 2, 2 * textMetrics.height);
  secondSubtitle.scale.set(0);
  stage.addChild(firstSubtitle, secondSubtitle); // Point to task list

  var pointer = VBS.pixi.pointer,
      degrees = $(window).width() < 600 ? -180 : $(window).width() < 1200 ? -120 : 80,
      radians = degrees * Math.PI / 180;
  tl.to(pointer, 1, {
    pixi: {
      rotation: degrees
    },
    ease: Power1.easeInOut,
    onUpdate: function onUpdate(tween) {
      if (tween.ratio < 0.25) $tasksPanel.css('zIndex', 98);else if (tween.ratio > 0.75) {
        if (!$tasksPanelBody.hasClass('open')) $tasksPanelBody.prev().children().eq(0).click();
        $tasksPanel.css('zIndex', 99);
      }
    },
    onUpdateParams: ['{self}']
  }); //t=0

  tl.to(firstSubtitle, 4, {
    pixi: {
      scale: 1.5
    },
    ease: Power0.easeNone
  }); //t=1

  tl.to(firstSubtitle, 2, {
    pixi: {
      alpha: 0
    },
    ease: Power1.easeOut
  }, '-=2'); //t=3

  tl.to(secondSubtitle, 4, {
    pixi: {
      scale: 1.5
    },
    ease: Power0.easeNone
  }, "-=1"); //t=4

  tl.to(secondSubtitle, 2, {
    pixi: {
      alpha: 0
    },
    ease: Power1.easeOut
  }, '-=2'); //t=6

  tl.to(pointer, 1, {
    x: "+=" + 40 * Math.sin(radians),
    y: "-=" + 40 * Math.cos(radians),
    yoyo: true,
    repeat: 15
  }, '-=7'); //t=1

  tl.to(pointer, 1, {
    pixi: {
      alpha: 0
    },
    onStart: function onStart() {
      $tasksPanel.css('zIndex', 98);
    }
  }); //t=16

  return tl;
}
},{}],"scripts/scenes/end.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.end = end;

function end() {
  // Init vars
  var tl = new TimelineLite({
    id: "end"
  }),
      stage = window.VBS.pixi.app.stage,
      arrow = window.VBS.pixi.arrow,
      WIDTH = VBS.pixi.WIDTH,
      HEIGHT = VBS.pixi.HEIGHT,
      user = VBS.user;
  tl.audios = [VBS.speech.getById('finish')];
  var audioDur = 0;

  for (var i = 0; i < tl.audios.length; i++) {
    audioDur += tl.audios[i].howl.duration();
  } // Button


  var button = new PIXI.Container(),
      buttonBg = new PIXI.Graphics(),
      buttonTextSize = 30,
      buttonTextStyle = new PIXI.TextStyle({
    fontFamily: ['Franklin-Gothic-Demi', 'Franklin Gothic Demi', 'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', 'Arial', 'ArialMT', 'sans-serif'],
    fontSize: buttonTextSize,
    fill: 0xFFFFFF,
    align: 'left'
  }),
      buttonTextString = "Open my Benefit Statement",
      buttonTextMetrics = PIXI.TextMetrics.measureText(buttonTextString, buttonTextStyle),
      buttonH = buttonTextMetrics.height * 1.5,
      buttonW = buttonTextMetrics.width + 30,
      buttonText = new PIXI.Text(buttonTextString, buttonTextStyle);
  buttonBg.beginFill(0x009fd2);
  buttonBg.drawRect(0, 0, buttonW, buttonH);
  buttonBg.moveTo(buttonW, 0);
  buttonBg.lineTo(buttonW + 20, buttonH / 2);
  buttonBg.lineTo(buttonW, buttonH);
  buttonBg.endFill();
  buttonText.position.set(15, buttonTextMetrics.height * 0.25);
  button.addChild(buttonBg, buttonText);
  button.interactive = true;
  button.buttonMode = true;
  button.hitArea = new PIXI.Rectangle(0, 0, buttonW, buttonH);
  button.on('click', function (e) {
    VBS.tracker.trackEvent('click-BenStat');
    VBS.tracker.finish();
    window.open(VBS.user["BenStatLink"], '_blank');
  });
  button.on('touchend', function (e) {
    VBS.tracker.trackEvent('click-BenStat');
    VBS.tracker.finish();
    window.open(VBS.user["BenStatLink"], '_blank');
  });
  button.on('pointerover', function (e) {
    button.scale.x *= 1.05;
    button.scale.y *= 1.05;
  });
  button.on('pointerout', function (e) {
    button.scale.x *= 1 / 1.05;
    button.scale.y *= 1 / 1.05;
  });
  button.pivot.set((buttonW + 20) / 2, buttonH / 2);
  button.position.set(WIDTH / 2, 9 * HEIGHT / 8); //button.cacheAsBitmap = true

  button.alpha = 0;
  stage.addChild(button);
  /*tl.staggerTo(VBS.pixi.reportPages,1,{
      x: WIDTH/2
  },0.5)//t=0*/
  // Jar in

  tl.to({
    a: 0
  }, 2, {
    a: 1,
    onStart: function onStart() {
      VBS.pixi.app.renderer.plugins.interaction.autoPreventDefault = true;
    },
    onUpdate: function onUpdate(tween) {
      for (var _i = 0, _Object$keys = Object.keys(VBS.pots); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = VBS.pots[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var sq = _step.value;
            sq.alpha = tween.target.a;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      VBS.pixi.jar.alpha = tween.target.a;
    },
    onUpdateParams: ['{self}']
  }); //t=
  //Button in

  tl.to(button, 1, {
    y: 7 * HEIGHT / 8,
    pixi: {
      alpha: 1
    },
    ease: Power2.easeOut
  }, '+=3'); //t=5

  tl.to({
    delayEnd: 0
  }, Math.max(audioDur - 4, 2), {
    delayEnd: 1,
    ease: Power0.easeNone
  });
  return tl;
}
},{}],"scripts/build.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTimeline = buildTimeline;

var _intro = require("./scenes/intro");

var _tableStart = require("./scenes/tableStart");

var _jarIn = require("./scenes/jarIn");

var _fundIn = require("./scenes/fundIn");

var _transfersIn = require("./scenes/transfersIn");

var _contsEe = require("./scenes/contsEe");

var _contsEr = require("./scenes/contsEr");

var _returnIn = require("./scenes/returnIn");

var _returnOut = require("./scenes/returnOut");

var _chargesOut = require("./scenes/chargesOut");

var _closingBalance = require("./scenes/closingBalance");

var _tableEnd = require("./scenes/tableEnd");

var _today = require("./scenes/today");

var _lsAge = require("./scenes/lsAge");

var _bene = require("./scenes/bene");

var _end = require("./scenes/end");

var waitCount = 0;

function buildTimeline() {
  if (window.VBS.speech.speechesLoaded < window.VBS.speech.speechesToLoad && waitCount++ < 102) {
    return setTimeout(buildTimeline, 100);
  }

  var user = window.VBS.user,
      label,
      tl; // Now all assets including speech are loaded
  // build master timeline with imported scenes
  // linking audio files using "_next" within each timeline

  function linkAudios(_tl) {
    _tl.audios.forEach(function (obj, i, arr) {
      var audioBefore = 0;

      for (var j = 0; j < i; j++) {
        audioBefore += arr[j].howl.duration();
      }

      obj.startTime = obj.howl['_start'] = VBS.timeline.getLabelTime(label) + audioBefore;
      if (i !== arr.length - 1) obj.howl['_next'] = arr[i + 1].howl;
      if (i !== 0) obj.howl['_prev'] = arr[i - 1].howl;
    });
  }

  function addToBuild(newLabel, func) {
    var inTime;
    if (label) inTime = Math.max(VBS.timeline.getLabelTime(label) + tl.audios.reduce(function (dur, obj) {
      return dur + (obj.howl ? obj.howl.duration() : 0);
    }, 0), tl.endTime());
    label = newLabel;
    VBS.timeline.add(label, inTime ? inTime : undefined);
    tl = func();
    tl.eventCallback("onStart", function () {
      // Standard audio setup
      if (!VBS.scrubbingDir && tl.audios.length) {
        if (window.VBS.speech.currentlyPlaying) {
          window.VBS.speech.currentlyPlaying.stop();
          window.VBS.speech.currentlyPlayingId = null;
        }

        if (this.audios.length) {
          if (this.audios[0].howl) {
            window.VBS.speech.currentlyPlaying = this.audios[0].howl;
            window.VBS.speech.currentlyPlayingId = this.audios[0].howl.play();
          } else if (this.audios.length > 1 && this.audios[1].howl) {
            window.VBS.speech.currentlyPlaying = this.audios[1].howl;
            window.VBS.speech.currentlyPlayingId = this.audios[1].howl.play();
          }
        }
      }
    });
    VBS.timeline.add(tl, label);
    linkAudios(tl);
  }

  addToBuild("intro", _intro.intro);
  addToBuild("tableStart", _tableStart.tableStart);
  addToBuild("jarIn", _jarIn.jarIn);
  addToBuild("fundIn", _fundIn.fundIn);
  if (user['Transfers'] > 0) addToBuild("transfersIn", _transfersIn.transfersIn);
  addToBuild("contsEe", _contsEe.contsEe);
  addToBuild("contsEr", _contsEr.contsEr);
  if (VBS.user['Return'] >= 0) addToBuild("return", _returnIn.returnIn);else addToBuild("return", _returnOut.returnOut);
  addToBuild("chargesOut", _chargesOut.chargesOut);
  addToBuild("closingBalance", _closingBalance.closingBalance);
  addToBuild("tableEnd", _tableEnd.tableEnd);
  if (user['Balance'] > 0) addToBuild("today", _today.today);
  addToBuild("lsAge", _lsAge.lsAge);
  if (!Number.isNaN(user['Beneficiaries']) && user['Beneficiaries'] == 0) addToBuild("bene", _bene.bene);
  addToBuild("end", _end.end);
  VBS.tracker.setMediaTotalLengthInSeconds(VBS.timeline.duration());
  console.log('built timeline');
}
/*tl.to({g:0},0.5,{
  g:1/1000,
  onUpdate:(tween)=>{
    VBS.engine.world.gravity.scale = tween.target.g
  },
  onUpdateParams: ['{self}']
})*/
},{"./scenes/intro":"scripts/scenes/intro.js","./scenes/tableStart":"scripts/scenes/tableStart.js","./scenes/jarIn":"scripts/scenes/jarIn.js","./scenes/fundIn":"scripts/scenes/fundIn.js","./scenes/transfersIn":"scripts/scenes/transfersIn.js","./scenes/contsEe":"scripts/scenes/contsEe.js","./scenes/contsEr":"scripts/scenes/contsEr.js","./scenes/returnIn":"scripts/scenes/returnIn.js","./scenes/returnOut":"scripts/scenes/returnOut.js","./scenes/chargesOut":"scripts/scenes/chargesOut.js","./scenes/closingBalance":"scripts/scenes/closingBalance.js","./scenes/tableEnd":"scripts/scenes/tableEnd.js","./scenes/today":"scripts/scenes/today.js","./scenes/lsAge":"scripts/scenes/lsAge.js","./scenes/bene":"scripts/scenes/bene.js","./scenes/end":"scripts/scenes/end.js"}],"scripts/speechSetup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speechSetup = speechSetup;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function speechSetup() {
  window.VBS.speech.howls = window.VBS.speech.howls || [];
  var user = window.VBS.user;
  window.VBS.speech.howls.push({
    id: 'intro0',
    index: 0,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/intro0.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 0);
    }),
    ssml: '<speak>Take a look around. <break time="1000ms" /> </speak>',
    text: 'Take a look around.'
  });
  window.VBS.speech.howls.push({
    id: 'intro1',
    index: 1,
    ssml: '<speak>' + user['Forename'] + '. <break time="400ms" /> This, is your Life Sight Dashboard.</speak>',
    text: user['Forename'] + '. This is your LifeSight Dashboard'
  });
  window.VBS.speech.howls.push({
    id: 'intro2',
    index: 2,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/intro2.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 2);
    }),
    ssml: '<speak>It contains all the key information about your Life Sight account, right now. All in one place.</speak>',
    text: 'It contains all the key information about your LifeSight account right now. All in one place.'
  });
  window.VBS.speech.howls.push({
    id: 'tableStart',
    index: 3,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/tableStart.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 3);
    }),
    ssml: '<speak>However, it\'s always good to take a look back at how you got to where you are. This 2 minute video is personal to you, and will walk you through what\'s happened to your Account over the last tax year to ' + user['EndDate'].toFormattedString() + '.</speak>',
    text: 'However, it\'s always good to take a look back at how you got to where you are. This 2 minute video is personal to you, and will walk you through what\'s happened to your Account over the last tax year to ' + user['EndDate'].toFormattedString() + '.'
  });
  if (user['StartBalance'] > 0) window.VBS.speech.howls.push({
    id: 'jar',
    index: 4,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/jarIn.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 4);
    }),
    ssml: '<speak>This jar represents your Life Sight account.</speak>',
    text: 'This jar represents your LifeSight account.'
  });else window.VBS.speech.howls.push({
    id: 'jar',
    index: 4,
    // howl: new Howl({
    //   src: ['./static/LIF/vbs/audio/jar0.mp3'],
    //   volume: 0.45,
    //   preload: true
    // }).on('loaderror', function (soundId) { console.error('speech load error', 4); }),
    ssml: '<speak>This jar represents your Life Sight account. As it was at ' + user['StartDate'].toFormattedString() + '.</speak>',
    text: 'This jar represents your LifeSight account as it was at ' + user['StartDate'].toFormattedString() + '.'
  });
  if (user['StartBalance'] > 0) window.VBS.speech.howls.push({
    id: 'fundIn',
    index: 5,
    // howl: new Howl({
    //   src: ['./static/LIF/vbs/audio/fundIn.mp3'],
    //   volume: 0.45,
    //   preload: true
    // }).on('loaderror', function (soundId) { console.error('speech load error', 5); }),
    text: 'Let\'s fill it up to show your balance, as it was at ' + user['StartDate'].toFormattedString() + '.'
  });
  if (user['Transfers'] > 0) window.VBS.speech.howls.push({
    id: 'transfers',
    index: 6,
    text: 'You transferred in ' + niceRound(user['Transfers'], true) + ' during the year. Let\'s add that in now.'
  });

  if (user['ContributionsEE'] > 0) {
    window.VBS.speech.howls.push({
      id: 'contsEe0',
      index: 7,
      ssml: '<speak>Over the course of the year ' + user['Forename'] + ', you contributed ' + niceRound(user['ContributionsEE'], true) + ' to your Life Sight account.</speak>',
      text: 'Over the course of the year ' + user['Forename'] + ', you contributed ' + niceRound(user['ContributionsEE'], true) + ' to your LifeSight account.'
    });
    window.VBS.speech.howls.push({
      id: 'contsEe1',
      index: 8,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/contsEe1.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) {
        console.error('speech load error', 8);
      }),
      ssml: '<speak>Don\'t forget. Because you benefit from tax relief on your contributions, the actual cost to you is lower than this.</speak>',
      text: 'Don\'t forget, because you benefit from tax relief on your contributions, the actual cost to you is lower than this.'
    });
  } else {
    window.VBS.speech.howls.push({
      id: 'contsEe',
      index: 7,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/contsEe0.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) {
        console.error('speech load error', 8);
      }),
      ssml: '<speak>It looks like this year you didn\'t contribute anything into your Life Sight Account.</speak>',
      // You should consider if you are on track to meet your needs without any contributions from yourself. We\'ll look more at this at the end of this video.</speak>',
      text: 'It looks like this year you didn\'t contribute anything into your LifeSight Account.' // You should consider if you are on track to meet your needs without any contributions from yourself. We\'ll look more at this at the end of this video.'

    });
  }

  if (user['ContributionsER'] > 0) {
    if (user['ContributionsEE'] > 0) {
      window.VBS.speech.howls.push({
        id: 'contsEr',
        index: 9,
        text: 'On top of this, ' + user['Employer'] + ' contributed another ' + niceRound(user['ContributionsER']) + '.'
      });
    } else {
      window.VBS.speech.howls.push({
        id: 'contsEr',
        index: 9,
        ssml: '<speak>' + user['Employer'] + ' did contribute into your Life Sight Account though, adding ' + niceRound(user['ContributionsER'], true) + ' over the year.</speak>',
        text: user['Employer'] + ' did contribute into your LifeSight Account though, adding ' + niceRound(user['ContributionsER'], true) + ' over the year.'
      });
    }
  }

  if (user['Return'] > 0) window.VBS.speech.howls.push({
    id: 'return',
    index: 10,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/return.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 10);
    }),
    text: 'Positive investment returns on your savings, also added to your Account.'
  });else if (user['Return'] <= 0) {
    window.VBS.speech.howls.push({
      id: 'return0',
      index: 10,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/return0.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) {
        console.error('speech load error', 10);
      }),
      ssml: '<speak>Negative investment returns on your savings resulted in a decrease in value over the past year. <break time="300ms"/> But remember that this is just a snapshot, and pension savings are long term investments. They will go up. <emphasis level="strong">And. Down.</emphasis> Over time.',
      text: 'Negative investment returns on your savings resulted in a decrease in value over the past year. But remember that this is just a snapshot, and pension savings are long term investments. They will go up, and down, over time.'
    });
    var mySavings = Array.from(jQuery('#form-PNL_FUND_BALANCE .value').map(function (i, node) {
      return $(node).text();
    })),
        mySavingsVal = mySavings.map(function (val) {
      return val.split('').filter(function (c) {
        return !Number.isNaN(+c);
      }).join('');
    }).map(function (v) {
      return +v / 100;
    }),
        pc = -1;
    if (mySavingsVal && mySavingsVal.length > 1 && mySavingsVal[1] > 0 && mySavingsVal[0] > mySavingsVal[1]) pc = Math.round(100 * (mySavingsVal[0] / mySavingsVal[1] - 1));
    if (pc > 0 && pc < 50) window.VBS.speech.howls.push({
      id: 'return1',
      index: 11,
      ssml: '<speak>You can see in the My Savings panel below, that, overall, your savings have still grown by around ' + pc + '% since you joined LifeSight.</speak>',
      text: 'You can see in the My Savings panel below that, overall, your savings have still grown by around ' + pc + '% since you joined LifeSight.'
    });else window.VBS.speech.howls.push({
      id: 'return1',
      index: 11,
      howl: new Howl({
        src: ['./static/LIF/vbs/audio/savings.mp3'],
        volume: 0.45,
        preload: true
      }).on('loaderror', function (soundId) {
        console.error('speech load error', 11);
      }),
      ssml: '<speak>You can use the My Savings panel below, to see how the value of your savings compares to the total amount paid in.</speak>',
      text: 'You can use the My Savings panel below to see how the value of your savings compares to the total amount paid in.'
    });
  }
  window.VBS.speech.howls.push({
    id: 'charges',
    index: 12,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/charges.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 12);
    }),
    ssml: '<speak>Lastly, this represents the member fee that you paid to Life Sight to help manage your investments, and the running of your Account.</speak>',
    text: 'Lastly, this represents the member fee that you paid to LifeSight to help manage your investments, and the running of your Account.'
  });
  var closingAudio = 'Meaning the closing balance on your Account, as at ' + user['EndDate'].toFormattedString() + ', was ' + niceRound(user['EndBalance'], true) + '.';

  if (user['StartBalance'] > 0 && user['EndBalance'] - user['StartBalance'] > 900) {
    closingAudio += ' That\'s ' + niceRound(user['EndBalance'] - user['StartBalance']) + ' up on the year before.';
  }

  window.VBS.speech.howls.push({
    id: 'end',
    index: 13,
    text: closingAudio
  });
  window.VBS.speech.howls.push({
    id: 'tableEnd',
    index: 14,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/tableEnd.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 14);
    }),
    ssml: '<speak>Here\'s that information again. <break time="2000ms"/> So. What could this mean for your future?</speak>',
    text: 'Here\'s that information again. So, what could this mean for your future?'
  });

  if (user['Balance']) {
    if (user['Scheme'] == 5 && user['Category'] == 5001 && user['Balance'] > user['EndBalance']) {
      window.VBS.speech.howls.push({
        id: 'todayTWPS0',
        index: 15,
        // howl: new Howl({
        //   src: ['./static/LIF/vbs/audio/TWPS.mp3'],
        //   volume: 0.45,
        //   preload: true
        // }).on('loaderror', function (soundId) { console.error('speech load error', 15); }),
        ssml: '<speak>Well, since April the transfer of your previous pension savings from the Towers Watson Pension Scheme has been completed.</speak>',
        text: 'Well since April the transfer of your previous pension savings from the Towers Watson Pension Scheme has been completed.'
      });
      window.VBS.speech.howls.push({
        id: 'todayTWPS1',
        index: 16,
        ssml: '<speak>Bringing your Life Sight Account up to ' + niceRound(user['Balance']) + ' today.</speak>',
        text: 'Bringing your Life Sight Account up to ' + niceRound(user['Balance']) + ' today.'
      });
    } else {
      window.VBS.speech.howls.push({
        id: 'today',
        index: 15,
        ssml: '<speak>Well, today the balance of your Life Sight Account ' + (user['Balance'] - user['EndBalance'] > 999 ? 'has increased to' : 'is') + ' ' + niceRound(user['Balance']) + '.</speak>',
        text: 'Well today the balance of your Life Sight Account ' + (user['Balance'] - user['EndBalance'] > 999 ? 'has increased to' : 'is') + ' ' + niceRound(user['Balance']) + '.'
      });
    }
  }

  if (isFinite(user['LSAge']) && +user['LSAge'] > 54) {
    if (+user['LSAge'] < 75) {
      window.VBS.speech.howls.push({
        id: 'lsAge',
        index: 17,
        ssml: '<speak>From this, we think the age you may be able to afford to retire, is currently ' + user['LSAge'] + ' years old. We call this your Life Sight Age. <break time="500ms"/></speak>',
        text: 'From this we think the age you may be able to afford to retire is currently ' + user['LSAge'] + ' years old - we call this your LifeSight age.'
      });
      window.VBS.speech.howls.push({
        id: 'lsAge2',
        index: 18,
        howl: new Howl({
          src: ['./static/LIF/vbs/audio/lsAge2.mp3'],
          volume: 0.45,
          preload: true
        }).on('loaderror', function (soundId) {
          console.error('speech load error', 17);
        }),
        ssml: '<speak>How does this sound. <break time="1000ms"/> Use the Age Ometer tool to find out how you can improve your Life Sight Age. And don’t forget to check this regularly to stay on track.</speak>',
        text: 'How does this sound? Use the ageOmeter tool to find out how you can improve your LifeSight Age. And don’t forget to check this regularly to stay on track.'
      });
    } else {
      window.VBS.speech.howls.push({
        id: 'lsAge',
        index: 17,
        howl: new Howl({
          src: ['./static/LIF/vbs/audio/lsAge1.mp3'],
          volume: 0.45,
          preload: true
        }).on('loaderror', function (soundId) {
          console.error('speech load error', 16);
        }),
        ssml: '<speak>Use the Age Ometer tool to find out how to improve your Life Sight age. Ensure you have entered all other retirement savings you may have, to best understand when you may be able to afford to retire. And don\'t forget to check this regularly to stay on track.</speak>',
        text: 'Use the ageOmeter tool to find out how to improve your Life Sight age. Ensure you have entered all other retirement savings you may have to best understand when you may be able to afford to retire, and don\'t forget to check this regularly to stay on track.'
      });
    }
  } else window.VBS.speech.howls.push({
    id: 'lsAge',
    index: 17,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/lsAge0.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 16);
    }),
    ssml: '<speak>It looks like you are yet to find out your Life Sight Age. The age at which you may be able to afford to retire. Click through to the Age Ometer tool to explore how your current decisions could affect your future plans.</speak>',
    text: 'It looks like you are yet to find out your LifeSight Age - the age at which you may be able to afford to retire. Click through to the ageOmeter tool to explore how your current decisions could affect your future plans.'
  });

  if (!Number.isNaN(user['Beneficiaries']) && user['Beneficiaries'] == 0) window.VBS.speech.howls.push({
    id: 'bene',
    index: 19,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/bene.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 18);
    }),
    ssml: '<speak>Before we finish. We noticed that you\'re yet to provide us with information on who you\'d want to receive your pension savings if anything were to happen to you. This is really important and it will only take a minute to add this to your Account. You can click the empty beneficiaries bar in your tasks panel to do so.</speak>',
    // at the end of the video
    text: 'Before we finish, we noticed that you\'re yet to provide us with information on who you\'d want to receive your pension savings if anything were to happen to you. This is really important and it will only take a minute to add this to your Account. You can click the empty beneficiaries bar in your tasks panel to do so.' // at the end of the video

  });
  window.VBS.speech.howls.push({
    id: 'finish',
    index: 20,
    howl: new Howl({
      src: ['./static/LIF/vbs/audio/finish.mp3'],
      volume: 0.45,
      preload: true
    }).on('loaderror', function (soundId) {
      console.error('speech load error', 19);
    }),
    ssml: '<speak>Finally. This video is just a summary. So it\'s important to read your full statement too. You can do so, by clicking here. <break time="1000ms" /> Thanks for taking the time to catch up on your savings. We look forward to helping you save for another year.</speak>',
    text: 'Finally, this video is just a summary, so it\'s important to read your full statement too. You can do so by clicking here. Thanks for taking the time to catch up on your savings. We look forward to helping you save for another year.'
  });
  console.log('built script');

  function niceRound(num, incWord) {
    var rounded = Math.abs(num);
    if (rounded >= 995000) rounded = Math.round(rounded / 5000) * 5000;else if (rounded >= 9500) rounded = Math.round(rounded / 1000) * 1000;else if (rounded >= 950) rounded = Math.round(rounded / 100) * 100;else if (rounded >= 102.5) rounded = Math.round(rounded / 10) * 10;
    var word = '';

    if (incWord) {
      var under = ['almost ', 'nearly '];
      word = Math.abs(num) > 100 ? rounded < Math.abs(num) ? 'over ' : rounded > Math.abs(num) ? under[Math.floor(Math.random() * under.length)] : 'exactly ' : '';
    }

    return word + '£' + rounded.toFixedCommas();
  }

  window.VBS.speech.speechesToLoad = window.VBS.speech.howls.filter(function (obj) {
    return !obj.howl;
  }).length; //window.VBS.speech.speechesLoaded = -1 Moved to index

  var wavenetRequest = window.VBS.speech.wavenetRequest = function (ssml) {
    return gapi.client.request({
      'path': 'https://texttospeech.googleapis.com/v1/text:synthesize',
      'method': 'POST',
      'body': {
        input: {
          ssml: ssml
        },
        voice: {
          languageCode: "en-GB",
          name: "en-GB-Wavenet-A",
          ssmlGender: "FEMALE"
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 1,
          pitch: 0,
          volumeGainDb: 0,
          effectsProfileId: [//"handset-class-device"
          "headphone-class-device" //"small-bluetooth-speaker-class-device"
          ]
          /*,
          sampleRateHertz: number*/

        }
      }
    });
  };
  /**
   * Create Howler objects
   */


  var getWavenet = window.VBS.speech.getWavenet =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var toLoad = window.VBS.speech.howls.filter(function (obj) {
                return !obj.howl;
              });
              if (!toLoad.length) return resolve(0);
              var gapiBatch = gapi.client.newBatch();
              toLoad.forEach(function (obj) {
                if (obj.ssml) gapiBatch.add(wavenetRequest(obj.ssml), {
                  id: obj.id
                });else gapiBatch.add(wavenetRequest('<speak>' + obj.text + '</speak>'), {
                  id: obj.id
                });
              });
              gapiBatch.then(function (response) {
                var ids = Object.keys(response.result);
                ids.forEach(function (id) {
                  var idx = VBS.speech.howls.findIndex(function (obj) {
                    return obj.id === id;
                  });

                  if (idx > -1) {
                    var dataSrc = 'data:audio/mp3;base64,' + response.result[id].result.audioContent;
                    VBS.speech.howls[idx].howl = new Howl({
                      src: [dataSrc],
                      volume: 0.45,
                      preload: true
                    }).on('load', function (soundId) {
                      window.VBS.speech.speechesLoaded++;
                    }).on('loaderror', function (soundId) {
                      console.error('getWavenet howl load error', id);
                    }); // let snd      = document.createElement('audio');
                    // snd.controls = 'controls';
                    // snd.src      = src;
                    // snd.type     = 'audio/mpeg';
                    // document.body.appendChild(snd)
                  }
                });
                resolve(window.VBS.speech.speechesToLoad);
              }, function (reason) {
                console.error('TTS Error: ' + reason.result.error.message);
                reject(reason.result.error);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  var getSpeeches = window.VBS.speech.getSpeeches =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            /*if(!window.VBS.speech.gapi_loaded){
              setTimeout(function(){
                VBS.speech.getSpeeches();
              },200)
              return false
            }*/
            window.VBS.speech.speechesLoaded = 0;
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              VBS.speech.getWavenet().then(function (numLoading) {
                VBS.speech.howls = VBS.speech.howls.sort(function (a, b) {
                  return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
                }); // Add event to automatically play next track if one has been set

                VBS.speech.howls.forEach(function (obj, i, arr) {
                  arr[i].howl.on('end', function () {
                    if (this.hasNext()) {
                      window.VBS.speech.currentlyPlaying = this.getNext();
                      window.VBS.speech.currentlyPlayingId = this.getNext().play();
                    } else {
                      window.VBS.speech.currentlyPlaying = null;
                      window.VBS.speech.currentlyPlayingId = null;
                    }
                  });
                });
                resolve(numLoading);
              }).catch(function (err) {
                reject(err);
              });
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  window.VBS.speech.getById = function (id) {
    return VBS.speech.howls.find(function (obj) {
      return obj.id == id;
    });
  };

  window.VBS.speech.getIndexById = function (id) {
    return VBS.speech.howls.findIndex(function (obj) {
      return obj.id == id;
    });
  };

  window.VBS.speech.getByIndex = function (idx) {
    return VBS.speech.howls[idx];
  };

  window.VBS.speech.getHowlById = function (id) {
    return VBS.speech.howls.find(function (obj) {
      return obj.id == id;
    }).howl;
  };

  window.VBS.speech.getHowlByIndex = function (idx) {
    return VBS.speech.howls[idx].howl;
  };

  window.VBS.speech.getByTime = function (time) {
    return VBS.speech.howls.find(function (obj) {
      return obj.startTime <= time && obj.startTime + obj.howl.duration() > time;
    });
  };
}
},{}],"scripts/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeUI = makeUI;

var _loop = require("./loop");

var _build = require("./build");

var _speechSetup = require("./speechSetup");

function makeUI() {
  /*********
   * Init  *
   *********/

  /*let slider = VBS.slider = VBS.$el.find('.anim-ctrl-slider"),
    sliderValue = { value: 0 }*/
  var $progressBarBlue = VBS.$el.find('.anim-progress-bar-blue'),
      $progressBarTime = VBS.$el.find('.anim-progress-bar span'),
      lastCheckState = 0;
  VBS.wasPlaying = false;
  var dimmer = $('<div class="anim-dimmer" style="opacity:0;display:none;"></div>');
  $('body').append(dimmer);
  VBS.$el.parents('.panel').eq(0).css({
    position: 'relative',
    zIndex: 99
  });
  /**********
   * Slider *
   **********/

  var lastSrubPosition = 0;
  /*slider.slider({
    range: false,
    min: 0,
    max: 100,
    step: .05,
    start: function (event, ui) {
      if(window.VBS.speech.speechesLoaded < 0){
        slider.slider(sliderValue);
        return false
      }
      VBS.$el.find('.anim-play").hide()
      VBS.$el.find('.anim-replay").css({visibility:'hidden'})
      VBS.timeline.pause()
      VBS.music.pause()
      if(window.VBS.speech.currentlyPlaying){
        window.VBS.speech.currentlyPlaying.stop()
        window.VBS.speech.currentlyPlaying = null
      }
      VBS.wasPlaying = false
      VBS.scrubbingDir = -1
      lastSrubPosition = ui.value
    },
    slide: function (event, ui) {
      VBS.timeline.progress(ui.value / 100);
      VBS.music.seek(VBS.timeline.time())
      VBS.scrubbingDir = Math.sign(ui.value - lastSrubPosition)
      lastSrubPosition = ui.value
      if((new Date()) - lastCheckState > 100){
        checkState()
        lastCheckState = new Date()
      }
    },
    stop: function (event, ui) {
      VBS.music.seek(VBS.timeline.time())
      let speechObj = VBS.speech.getByTime(VBS.timeline.time())
      if(speechObj){
        window.VBS.speech.currentlyPlaying = speechObj.howl
        speechObj.howl.seek(VBS.timeline.time()-speechObj.startTime).play()
      }
      VBS.timeline.play()
      VBS.dimIn()
      VBS.music.play()
      VBS.wasPlaying = true
      VBS.$el.find('.anim-pause").css({visibility:'visible'})
      VBS.scrubbingDir = 0
      lastSrubPosition = ui.value
    }
  });*/

  VBS.dimIn = function (duration) {
    duration = (duration < 10 ? duration * 1000 : duration) || 500;
    dimmer.css({
      display: 'block'
    });
    dimmer.animate({
      opacity: 1
    }, duration, function () {// Animation complete.
    });
  };

  VBS.dimOut = function (duration) {
    duration = (duration < 10 ? duration * 1000 : duration) || 500;
    dimmer.animate({
      opacity: 0
    }, duration, function () {
      // Animation complete.
      dimmer.css({
        display: 'none'
      });
    });
  };
  /********
   * Play *
   ********/


  var $play = VBS.$el.find('.anim-play');
  $play.on('click', function () {
    // Fail safe
    if (window.VBS.ABORT) {
      alert('This feature isn\'t currently available - check back soon');
      VBS.tracker.trackEvent('Play-error');
      return false;
    }

    $(this).hide(); // Fetch Google MP3 files and build rest of timeline, if not already done so

    if (window.VBS.speech.speechesLoaded < 0) {
      if ($('#LS_AGE_ACTUAL').text()) VBS.user["LSAge"] = $('#LS_AGE_ACTUAL').text();else if ($('#LS_AGE_BAR').text()) VBS.user["LSAge"] = $('#LS_AGE_BAR').text();else VBS.user["LSAge"] = $('.lifeSight-age').text().replace($('.lifeSight-age p').text() ? $('.lifeSight-age p').text() : 'years old', '').trim();
      (0, _speechSetup.speechSetup)();
      VBS.speech.getSpeeches().then(function (numLoading) {
        console.log('all speech loaded'); // Add events

        VBS.speech.howls.forEach(function (obj) {
          obj.howl.on('playerror', function (soundId) {
            console.error('play error', obj.id);
          });
        });
        (0, _build.buildTimeline)();
        (0, _loop.startRenderLoop)(); //Might as well only start this here
      }).catch(function (err) {
        console.error(JSON.stringify(err));
      });
    } // Hide/show buttons, start music and start logo animation while speech files load


    function go() {
      $replay.css({
        display: 'none'
      });
      VBS.$el.find('.anim-pause').css({
        display: 'block'
      });
      if (VBS.timeline.getLabelTime('tableStart') > 0 && VBS.timeline.time() >= VBS.timeline.getLabelTime('tableStart')) VBS.dimIn();
      VBS.music.seek(VBS.timeline.time());
      VBS.timeline.play();
      VBS.tracker.play();
      VBS.music.play();

      if (window.VBS.speech.currentlyPlaying && VBS.speech.currentlyPlayingId && (VBS.speech.currentlyPlayingTime || VBS.speech.currentlyPlayingTime === 0)) {
        window.VBS.speech.currentlyPlaying.seek(VBS.speech.currentlyPlayingTime, VBS.speech.currentlyPlayingId);
        window.VBS.speech.currentlyPlaying.play(VBS.speech.currentlyPlayingId);
      }

      VBS.wasPlaying = true;
    }

    if (VBS.music.state() == 'loaded') {
      go();
    } else {
      VBS.$el.find('.anim-loading').show();
      var waitedForMusic = 0;

      var waitForMusic = function waitForMusic() {
        if (VBS.music.state() == 'loaded') {
          VBS.$el.find('.anim-loading').hide();
          go();
        } else {
          waitedForMusic += 100;
          if (waitedForMusic < 3000) setTimeout(waitForMusic, 100);else {
            console.error('music failed to load, continuing without');
            VBS.$el.find('.anim-loading').hide();
            go();
          }
        }
      };

      waitForMusic();
    }
  });
  /******************
   * Pause & Replay *
   ******************/

  var $pause = VBS.$el.find('.anim-pause'),
      $pauseIcon = VBS.$el.find('.anim-pause-icon'),
      $replay = VBS.$el.find('.anim-replay'),
      $replayIcon = VBS.$el.find('.anim-replay-icon'),
      replayAnimating = false;

  function doPause(isBlur) {
    $pause.css({
      display: 'none'
    });

    if (!VBS.$el.find('.anim-loading').is(':visible') && VBS.timeline.isActive()) {
      VBS.$el.find('.anim-play').show();

      if (VBS.timeline.time() > 1 && !replayAnimating) {
        replayAnimating = true;
        $replay.css({
          display: 'block'
        });
        TweenMax.from($replay, 0.5, {
          autoAlpha: 0,
          scale: 2
        });
        TweenMax.from($replayIcon, 0.5, {
          rotation: '360_ccw'
        });
        setTimeout(function () {
          replayAnimating = false;
        }, 501);
      }
    }

    VBS.music.stop();
    VBS.timeline.pause();
    VBS.tracker.pause();
    VBS.dimOut();

    if (VBS.speech.currentlyPlaying) {
      VBS.speech.currentlyPlaying.pause();
      VBS.speech.currentlyPlayingTime = VBS.speech.currentlyPlaying.seek(VBS.speech.currentlyPlayingId);
    }

    if (!isBlur) VBS.wasPlaying = false;
  }

  $pause.mouseenter(function () {
    TweenLite.to($pauseIcon, 0.4, {
      scale: 1.2
    });
  }).mouseleave(function () {
    TweenLite.to($pauseIcon, 0.4, {
      scale: 1
    });
  }).click(function () {
    doPause();
  });
  $replay.mouseenter(function () {
    TweenLite.to($replayIcon, 0.4, {
      rotation: '+=360'
    });
    TweenLite.to($replay, 0.4, {
      opacity: 1
    });
  }).mouseleave(function () {
    TweenLite.to($replay, 0.4, {
      opacity: 0.65
    });
  }).click(function () {
    // Do reset
    window.VBS.pixi.removeAll();
    Object.keys(window.VBS.pots).forEach(function (key) {
      window.VBS.pots[key] = [];
    });
    VBS.pixi.jar.alpha = 1;
    /*VBS.pixi.eyeState = {w:0,h:0.05,alpha:0,angle:30}
    VBS.pixi.drawEyes(VBS.pixi.eyeState)
    VBS.pixi.eyes.alpha = 1*/

    if (VBS.pixi.drawRandomWalk) VBS.pixi.drawRandomWalk(0);
    VBS.pixi.setBalanceFigure(0);
    lastTrackedProgress = 0;
    if (window.VBS.speech.currentlyPlaying) window.VBS.speech.currentlyPlaying.stop();
    window.VBS.speech.currentlyPlaying = null;
    window.VBS.speech.currentlyPlayingId = null;
    /*if((new Date()) - lastCheckState > 100){
      checkState()
      lastCheckState = 0
    }*/

    $(this).css({
      display: 'none'
    });
    $play.hide();
    $pause.css({
      display: 'block'
    });
    VBS.timeline.restart();
    VBS.music.seek(0);
    VBS.music.play();
    VBS.tracker.trackEvent('Replay');
    VBS.tracker.seekStart();
    VBS.tracker.setMediaProgressInSeconds(0);
    VBS.tracker.setMediaTotalLengthInSeconds(VBS.timeline.duration());
    VBS.tracker.seekFinish();
    VBS.wasPlaying = true;
  });
  /*******************
   * Timeline Events *
   *******************/

  var lastTrackedProgress = 0;
  VBS.timeline.eventCallback('onUpdate', function () {
    // sliderValue.value = VBS.timeline.progress() * 100;
    // slider.slider(sliderValue);
    $progressBarBlue.css('width', Math.round(VBS.timeline.progress() * 1000) / 10 + '%');
    var m = Math.floor(VBS.timeline.time() / 60),
        s = Math.floor(VBS.timeline.time() - m * 60);
    $progressBarTime.html((m < 10 ? '0' : '') + m + ':' + ((s < 10 ? '0' : '') + s));
    VBS.tracker.setMediaProgressInSeconds(VBS.timeline.time()); //VBS.tracker.setMediaTotalLengthInSeconds(node.duration);

    VBS.tracker.update();
  });
  VBS.timeline.eventCallback('onComplete', function () {
    if (!replayAnimating) {
      replayAnimating = true;
      $pause.css({
        display: 'none'
      });
      $replay.css({
        display: 'block'
      });
      TweenMax.from($replay, 0.5, {
        autoAlpha: 0,
        scale: 2
      });
      TweenMax.from($replayIcon, 0.5, {
        rotation: '360_ccw'
      });
      setTimeout(function () {
        replayAnimating = false;
      }, 501);
    }

    if (VBS.timeline.duration() > 30) VBS.tracker.finish();
    VBS.music.stop();
    VBS.dimOut();

    if (window.VBS.speech.currentlyPlaying) {
      window.VBS.speech.currentlyPlaying.stop();
      window.VBS.speech.currentlyPlaying = null;
      window.VBS.speech.currentlyPlayingId = null;
    }

    VBS.wasPlaying = false;
  });
  /*******************
   * Window Events *
   *******************/

  window.addEventListener('blur', function () {
    doPause(); //doPause(true); if want wasPlaying to stay true - causes problem with iPhone even thought no used??
  }, false);
  /*window.addEventListener('focus', function () {
    if(VBS.wasPlaying){
      $play.hide()
      $pause.css({visibility:'visible'})
      VBS.music.seek(window.VBS.timeline.time())
      window.VBS.timeline.play()
      VBS.music.play()
      if(window.VBS.speech.currentlyPlaying)
        window.VBS.speech.currentlyPlaying.play()
    }
  }, false);*/

  /*********
   * State * TODO
   *********
  let timelines = []  
  function checkState(){
    if(VBS.scrubbingDir != -1) return
    if(!timelines.length)
      timelines = VBS.timeline.getChildren(false,false,true)
    let currentTime = VBS.timeline.time()
    //let startTime = timelines[0].startTime() //title
    //let startTime = timelines[1].startTime() //starting balance
    /*===========*
     * Transfers *
     *===========*
    //let startTime = timelines[2].startTime()
    /*=======*
     * Conts *
     *=======*
    //startTime = timelines[3].startTime()
    /*===================*
     * Investment return *
     *===================*
    //startTime = timelines[4].startTime()
    /*=========*
     * Charges *
     *=========*
    //startTime = timelines[5].startTime()
    /*================*
     * Ending balance *
     *================*
    //startTime = timelines[6].startTime()
  }*/

  /***********************************************************
   *  Turns off the track click for the given slider control *
   ***********************************************************
  function disableSliderTrack($slider) {
    let orig_md_hnd = $._data($('.ui-slider')[0], 'events').mousedown[0].handler
    $slider.off('mousedown')
    $slider.bind('mousedown', function (event) {
      if(isTouchInSliderHandle($(this), event))
        orig_md_hnd(event)
    });
    let orig_ts_hnd = $._data($('.ui-slider')[0], 'events').mousedown[0].handler
    $slider.bind('touchstart', function (event) {
      if(isTouchInSliderHandle($(this), event.originalEvent.touches[0]))
        orig_ts_hnd(event)
    });
  }
  function isTouchInSliderHandle($slider, coords) {
    let x = coords.pageX;
    let y = coords.pageY;
    let $handle = $slider.find('.ui-slider-handle');
    let left = $handle.offset().left;
    let right = (left + $handle.outerWidth());
    let top = $handle.offset().top;
    let bottom = (top + $handle.outerHeight());
    return (x >= left && x <= right && y >= top && y <= bottom);
  }
  disableSliderTrack(slider);*/
}
},{"./loop":"scripts/loop.js","./build":"scripts/build.js","./speechSetup":"scripts/speechSetup.js"}],"scripts/scenes/titleOut.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.titleOut = titleOut;

function titleOut() {
  // Init vars
  var tl = new TimelineLite({
    id: 'titleOut'
  }),
      qty = 25,
      life = window.VBS.pixi.life,
      sight = window.VBS.pixi.sight,
      wtw = window.VBS.pixi.wtw; // Generate mini squares

  var miniSqs = [],
      WIDTH = window.VBS.pixi.WIDTH,
      HEIGHT = window.VBS.pixi.HEIGHT;
  var logoRatio = 290 / 512,
      sqSize = 114.2 / 512 * WIDTH / 2;
  var four = {
    yellow: {
      center: [WIDTH / 4 + sqSize / 2, HEIGHT / 2 - logoRatio * WIDTH / 4 + sqSize / 2],
      x: [-sqSize * 3, WIDTH / 2],
      y: [-sqSize * 3, HEIGHT / 2],
      validEnd: function validEnd(x, y) {
        return x < -sqSize || y < -sqSize;
      },
      hex: 0xffb81c
    },
    pink: {
      center: [WIDTH / 4 + 3 * sqSize / 2, HEIGHT / 2 - logoRatio * WIDTH / 4 + sqSize / 2],
      x: [WIDTH / 2, WIDTH + sqSize * 3],
      y: [-sqSize * 3, HEIGHT / 2],
      validEnd: function validEnd(x, y) {
        return x > WIDTH + sqSize || y < -sqSize;
      },
      hex: 0xc010a0
    },
    blue: {
      center: [WIDTH / 4 + 3 * sqSize / 2, HEIGHT / 2 - logoRatio * WIDTH / 4 + 3 * sqSize / 2],
      x: [WIDTH / 2, WIDTH + sqSize * 3],
      y: [HEIGHT / 2, HEIGHT + sqSize * 3],
      validEnd: function validEnd(x, y) {
        return x > WIDTH + sqSize || y > HEIGHT + sqSize;
      },
      hex: 0x00a0d2
    },
    purple: {
      center: [WIDTH / 4 + sqSize / 2, HEIGHT / 2 - logoRatio * WIDTH / 4 + 3 * sqSize / 2],
      x: [-sqSize * 3, WIDTH / 2],
      y: [HEIGHT / 2, HEIGHT + sqSize * 3],
      validEnd: function validEnd(x, y) {
        return x < -sqSize || y > HEIGHT + sqSize;
      },
      hex: 0x702082
    }
  };
  Object.keys(four).forEach(function (cls, i, arr) {
    var sqProps = four[cls];

    for (var j = 0; j < qty; j++) {
      var x = WIDTH / 2,
          y = HEIGHT / 2,
          wh = sqSize / 10 + Math.pow(Math.random(), 2) * sqSize / 5;

      while (!sqProps.validEnd(x, y)) {
        x = sqProps.x[0] + Math.random() * (sqProps.x[1] - sqProps.x[0]);
        y = sqProps.y[0] + Math.random() * (sqProps.y[1] - sqProps.y[0]);
      }

      var sqr = window.VBS.pixi.addRect(sqProps.center[0], sqProps.center[1], wh, wh, sqProps.hex, 0, 0);
      miniSqs.push(sqr);
      sqr.pivot.set(0.5); // Animate mini squares

      var t = i + Math.random() * 2;
      tl.to(sqr, 2, {
        x: x,
        y: y,
        pixi: {
          rotation: 720
        },
        ease: Power2.easeInOut
      }, t);
    }
  }); // Add logo squares

  var logoSqs = [];
  Object.keys(four).forEach(function (cls, i, arr) {
    logoSqs.push(window.VBS.pixi.addRect(four[cls].center[0], four[cls].center[1], sqSize, sqSize, four[cls].hex, 0, 0));
  }); // Text out

  tl.to(life, 1, {
    x: WIDTH / 2,
    ease: Power2.easeInOut
  }, '-=5.5'); //(t~1.5)

  tl.to(sight, 1.5, {
    x: -WIDTH / 8,
    ease: Power2.easeInOut
  }, '-=5.5'); //(t~1.5)

  tl.to(wtw, 1, {
    pixi: {
      alpha: 0
    },
    ease: Power2.easeInOut
  }, '-=4'); //(t~3)

  tl.set([life, sight], {
    visible: false
  }); //(t~7)
  // Scale out rects

  tl.staggerTo(logoSqs, 1.8, {
    pixi: {
      scale: 0
    },
    ease: Power1.easeOut
  }, 0.9, '-=6.5'); //(t~1)

  tl.set(logoSqs, {
    visible: false
  }); // Check if speech files loaded by the end of this, if not pause until so (max 10 seconds)

  var waitCount = 0;

  function waitForSpeechesToLoad() {
    if (waitCount++ > 200) {
      VBS.tracker.trackEvent('error-tts');
      console.error('Waiting for speeches to load timed out (10 secs)');
    }

    if (window.VBS.speech.speechesLoaded < window.VBS.speech.speechesToLoad && waitCount < 100) {
      console.log('Waiting for speeches to load...');
      return setTimeout(waitForSpeechesToLoad, 50);
    }

    VBS.$el.find('.anim-loading').hide();
    VBS.$el.find('.anim-replay').css({
      display: 'none'
    });
    VBS.$el.find('.anim-pause').css({
      display: 'block'
    });
    VBS.$el.find('.anim-progress-bar').css({
      display: 'block'
    });
    VBS.timeline.play();
    VBS.music.seek(VBS.timeline.time());
    VBS.musicWasPlaying = true;
    VBS.music.play();
  }

  tl.eventCallback("onComplete", function () {
    if (window.VBS.speech.speechesLoaded < window.VBS.speech.speechesToLoad) {
      VBS.timeline.pause();
      VBS.music.pause();
      VBS.musicWasPlaying = false;
      VBS.$el.find('.anim-loading').show();
      setTimeout(waitForSpeechesToLoad, 100);
      return;
    } else {
      VBS.$el.find('.anim-progress-bar').css({
        display: 'block'
      });
    }
  });
  return tl;
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.array.species");

require("core-js/modules/es6.date.to-primitive");

require("core-js/modules/es6.function.has-instance");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/es6.math.acosh");

require("core-js/modules/es6.math.asinh");

require("core-js/modules/es6.math.atanh");

require("core-js/modules/es6.math.cbrt");

require("core-js/modules/es6.math.clz32");

require("core-js/modules/es6.math.cosh");

require("core-js/modules/es6.math.expm1");

require("core-js/modules/es6.math.fround");

require("core-js/modules/es6.math.hypot");

require("core-js/modules/es6.math.imul");

require("core-js/modules/es6.math.log1p");

require("core-js/modules/es6.math.log10");

require("core-js/modules/es6.math.log2");

require("core-js/modules/es6.math.sign");

require("core-js/modules/es6.math.sinh");

require("core-js/modules/es6.math.tanh");

require("core-js/modules/es6.math.trunc");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.epsilon");

require("core-js/modules/es6.number.is-finite");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.number.is-safe-integer");

require("core-js/modules/es6.number.max-safe-integer");

require("core-js/modules/es6.number.min-safe-integer");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.define-getter");

require("core-js/modules/es7.object.define-setter");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.get-own-property-descriptor");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.get-own-property-names");

require("core-js/modules/es6.object.get-prototype-of");

require("core-js/modules/es7.object.lookup-getter");

require("core-js/modules/es7.object.lookup-setter");

require("core-js/modules/es6.object.prevent-extensions");

require("core-js/modules/es6.object.is");

require("core-js/modules/es6.object.is-frozen");

require("core-js/modules/es6.object.is-sealed");

require("core-js/modules/es6.object.is-extensible");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.seal");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/es6.reflect.delete-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.reflect.get-own-property-descriptor");

require("core-js/modules/es6.reflect.get-prototype-of");

require("core-js/modules/es6.reflect.has");

require("core-js/modules/es6.reflect.is-extensible");

require("core-js/modules/es6.reflect.own-keys");

require("core-js/modules/es6.reflect.prevent-extensions");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.set-prototype-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.flags");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.anchor");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.string.blink");

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.string.fontcolor");

require("core-js/modules/es6.string.fontsize");

require("core-js/modules/es6.string.from-code-point");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.italics");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.string.link");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es6.string.raw");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.string.strike");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.string.sup");

require("core-js/modules/es6.typed.array-buffer");

require("core-js/modules/es6.typed.int8-array");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.uint8-clamped-array");

require("core-js/modules/es6.typed.int16-array");

require("core-js/modules/es6.typed.uint16-array");

require("core-js/modules/es6.typed.int32-array");

require("core-js/modules/es6.typed.uint32-array");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/es7.array.flat-map");

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

require("./scripts/utils");

require("./scripts/k");

var _matomoSetup = require("./scripts/matomoSetup");

var _pixiSetup = require("./scripts/pixiSetup");

var _b2Setup = require("./scripts/b2Setup");

var _mouseSetup = require("./scripts/mouseSetup");

var _howlSetup = require("./scripts/howlSetup");

var _ui = require("./scripts/ui");

var _titleOut = require("./scripts/scenes/titleOut");

//import { speechSetup } from './scripts/speechSetup' Moved to on play click
// Global variables
window.VBS = window.VBS || {}, window.VBS.$el = $('#panelBodyPNL_BENSTAT_ANIM .anim-wrap'), window.VBS.user = {}, window.VBS.timeline = {}, window.VBS.speech = {}, window.VBS.pots = {
  start: [],
  transfers: [],
  contsEe: [],
  contsEr: [],
  return: [],
  charges: []
}, window.VBS.scrubbingDir = 0;
window.VBS.DEBUG = document.location.href.indexOf('debug') > -1;

window.VBS.init = function () {
  /***************
   * Test inputs *
   ***************/
  var name = prompt('Name', 'Matthew'),
      scheme = prompt('Scheme Code', '0001'),
      cat = prompt('Category Code', '1001'),
      startBalance = parseFloat(prompt('Opening Balance', 21971)),
      bulkTransfers = parseFloat(prompt('Bulk Transfers', 0)),
      transfers = parseFloat(prompt('Transfers', 0)),
      contsEe = parseFloat(prompt('Conts EE', 456)),
      contsEr = parseFloat(prompt('Conts ER', 3432)),
      returns = parseFloat(prompt('Return', 1562)),
      charges = parseFloat(prompt('Charges', -119)),
      lsAge = parseInt(prompt('LifeSight Age', 66)),
      beneNeeded = confirm('Beneficiaries still needed?');
  name = name || 'Matthew';
  scheme = parseInt(scheme);
  scheme = scheme && scheme >= 0 && scheme < 9 ? scheme : 1;
  cat = parseInt(cat);
  cat = cat && cat >= 0 && cat < 9999 ? cat : 5001;
  startBalance = isFinite(startBalance) && startBalance > 0 && startBalance < 1000000 ? startBalance : 0;
  transfers = isFinite(transfers) && transfers > 0 && transfers < 1000000 ? transfers : 0;
  contsEe = isFinite(contsEe) && contsEe > 0 && contsEe < 1000000 ? contsEe : 0;
  contsEr = isFinite(contsEr) && contsEr > 0 && contsEr < 1000000 ? contsEr : 0;
  returns = isFinite(returns) && Math.abs(returns) < startBalance + transfers + contsEe + contsEr ? returns : 0;
  charges = isFinite(charges) && charges < 0 && charges > -1 * (startBalance + transfers + contsEe + contsEr + returns) ? charges : 0;
  lsAge = isFinite(lsAge) && lsAge > 54 && lsAge < 100 ? lsAge : '?';
  var endBalance = startBalance + transfers + contsEe + contsEr + returns + charges;
  $('.summary-bar h2 a[href="/my-lifesight-account/my-details/"]').eq(0).text(name);

  if (scheme == 1) {
    $('.nav .scheme0005 img').attr('src', 'http://teamue.com/wp-content/uploads/2015/11/Company-Logo-Placeholder.jpg').css('height', '75px').parent().css('padding', '0px 14px');
    $('#headerContainer .scheme0005 img').attr('src', 'http://teamue.com/wp-content/uploads/2015/11/Company-Logo-Placeholder.jpg');
  } else if (scheme != 5) {
    $('.nav .scheme0005').hide();
    $('#headerContainer .scheme0005').hide();
  }

  $('.summary-bar h2 a[href="/my-lifesight-account/"]').eq(0).text('£' + (endBalance * (1.1 + Math.random() * 0.05)).toFixedCommas(2));
  $('.summary-bar h2 a[href="/my-lifesight-account/my-lifesight-age/"]').eq(0).html('<span id="LS_AGE_BAR">' + (lsAge ? lsAge : '?') + '</span> years old');
  $('.lifeSight-age').html((lsAge ? lsAge : '?') + ' <p>years old</p>');

  if (beneNeeded && $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow') !== '0%') {
    $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow', '0%');
    $("#progress4").css('maxWidth', '0%');
  } else if ($("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow') === '0%') {
    $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow', '100%');
    $("#progress4").css('maxWidth', '100%');
  }

  [scheme, cat, name, '06/04/2018', startBalance, bulkTransfers, transfers, 0, contsEe, contsEr, returns, charges, endBalance, '05/04/2019'].forEach(function (v, i, arr) {
    window.VBS.$el.find('.anim-data-table tbody tr').eq(i).children().eq(1).find('span').html(v);
  });
  /*****************
   * Get User Info *
   *****************/

  var dataItems = Array.from(window.VBS.$el.find('.anim-data-table tr').slice(1)).map(function (n, i, arr) {
    return {
      label: $(n).children().eq(0).find('span').text(),
      data: $(n).children().eq(1).find('span').text(),
      idx: i
    };
  }),
      getDataItem = function getDataItem(label, idx) {
    var filtered = dataItems.filter(function (o, i, arr) {
      return o.label.toLowerCase() == label.toString().toLowerCase();
    });
    if (label && filtered.length) return filtered[0].data;else if (idx !== undefined) {
      filtered = dataItems.filter(function (o, i, arr) {
        return o.idx == idx;
      });
      if (filtered.length) return filtered[0].data;
    }
    return '';
  },
      schemeNum = parseInt(getDataItem('Scheme code', 0)) || 0,
      employers = ["Acme Corp", "Company Name", "Goldman Sachs", "Santander", "Aspen", "Willis Towers Watson", "Carillion", "Canada Life", "Northumbrian Water"];

  VBS.user = {
    //"RefNo": $('.refno').text() &&  $('.refno').text().split(':').length > 1 ? $('.refno').text().split(':')[1].trim() : '',
    "Forename": getDataItem('Member name', 2).trim(),
    "Scheme": schemeNum,
    "Employer": isFinite(schemeNum) && schemeNum >= 0 && schemeNum < employers.length ? employers[schemeNum] : employers[0],
    "Category": getDataItem('Category code', 1).trim(),
    "StartDate": new Date(getDataItem('Start date', 3).replace(/(\d{2})\/(\d{2})\/(\d{2,4})/, "$2/$1/$3")),
    "EndDate": new Date(getDataItem('End date', 13).replace(/(\d{2})\/(\d{2})\/(\d{2,4})/, "$2/$1/$3")),
    "StartBalance": parseFloat(getDataItem('Start balance', 4).replace(',', '')),
    "Transfers": parseFloat(getDataItem('Bulk transfers', 5).replace(',', '')) + parseFloat(getDataItem('Transfers', 6).replace(',', '')),
    "Withdrawals": parseFloat(getDataItem('Withdrawals', 7).replace(',', '')),
    "ContributionsEE": parseFloat(getDataItem('Employee contributions', 8).replace(',', '')),
    "ContributionsER": parseFloat(getDataItem('Employer contributions', 9).replace(',', '')),
    "Return": parseFloat(getDataItem('Investment return', 10).replace(',', '')),
    "Charges": parseFloat(getDataItem('Charges', 11).replace(',', '')),
    "EndBalance": parseFloat(getDataItem('End balance', 12).replace(',', '')),
    "Beneficiaries": $("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().length ? parseInt($("#panelBodyPNL_ENGJMNT_TRACKER a[href='/my-lifesight-account/my-beneficiaries/']").children().eq(0).attr('aria-valuenow')) : NaN,
    "Balance": $(".summary-bar .column-2 h2 a").length ? parseInt($(".summary-bar .column-2 h2 a").text().trim().replace(/[^\d\.]/g, '')) : NaN //VBS.user["EndBalance"] = VBS.user["StartBalance"]+VBS.user["Transfers"]+VBS.user["Withdrawals"]+VBS.user["ContributionsEE"]+VBS.user["ContributionsER"]+VBS.user["Return"]+VBS.user["Charges"]
    //VBS.user["Forename"] = VBS.user['Forename'].split(' ').map(word => word[0].toUpperCase()+word.substring(1).toLowerCase()).join('')

  };
  VBS.user["Possessive"] = VBS.user['Forename'] + '\'' + (VBS.user['Forename'][VBS.user['Forename'].length - 1] == 's' ? '' : 's');
  VBS.user["BenStatLink"] = (VBS.$el.find('.related-links a') || VBS.$el.find('a')).attr('href');
  /* Moved to on play click
  if($('#LS_AGE_ACTUAL').text())
    VBS.user["LSAge"] = $('#LS_AGE_ACTUAL').text()
  else if($('#LS_AGE_BAR').text())
    VBS.user["LSAge"] = $('#LS_AGE_BAR').text()
  else
    VBS.user["LSAge"] = $('.lifeSight-age').text().replace($('.lifeSight-age p').text() ? $('.lifeSight-age p').text() : 'years old', '').trim()*/

  if (dataItems.map(function (itm) {
    return itm.data;
  }).some(function (data) {
    return data.trim().toLowerCase() === 'none';
  })) VBS.ABORT = true;
  calcSquareUnit();
  /**************
   * Setup GSAP *
   **************/

  VBS.timeline = new TimelineMax({
    id: "Master",
    paused: true
  }); //GSDevTools.create({paused:true, id:"Master Dev"})

  /*****************
   * Setup tracker *
   *****************/

  (0, _matomoSetup.matomoSetup)();
  /******************
   * Setup Graphics *
   ******************/

  (0, _pixiSetup.pixiSetup)();
  /************************
   * Setup Physics Engine *
   ************************/

  (0, _b2Setup.b2Setup)();
  /**************
   * UI & Audio *
   **************/

  (0, _mouseSetup.mouseSetup)();
  (0, _howlSetup.howlSetup)();
  gapi.load('client', {
    callback: function callback() {
      // Handle gapi.client initialization.
      gapi.client.init({
        'apiKey': VBS['K1'] + '-' + VBS['K2'] + '_0_' + VBS['K3'] //'discoveryDocs': ['https://texttospeech.googleapis.com/$discovery/rest?version=v1']

      }).then(function () {
        VBS.speech.gapi_loaded = true;
      });
    },
    onerror: function onerror() {
      // Handle loading error.
      console.error('gapi.client failed to load!');
    },
    timeout: 5000,
    // 5 seconds.
    ontimeout: function ontimeout() {
      // Handle timeout.
      console.error('gapi.client could not load in a timely manner!');
    }
  }); //speechSetup() Moved to on play click

  window.VBS.speech = VBS.speech || {};
  window.VBS.speech.speechesLoaded = -1;
  (0, _ui.makeUI)();
  /***********************
   * Present play button *
   ***********************/

  function presentPlay() {
    if (!window.VBS.pixi.assetsLoaded) {
      setTimeout(presentPlay, 100);
      return false;
    }

    VBS.timeline.add((0, _titleOut.titleOut)()); // Show logo on screen, only scene that's pre-loaded

    VBS.$el.find('.anim-loading').hide();
    VBS.$el.find('.anim-play').show();
  }

  presentPlay(); // =============================================
  // Square size distribution
  // =============================================

  function calcSquareUnit() {
    // balance = Math.abs(balance)
    // if(Math.round(balance) == 0) return 0
    // if(balance<100) return 1
    // if(balance<250) return 2
    // if(balance<500) return 3
    // if(balance<750) return 4
    // if(balance<1000) return 5
    // return Math.round(Math.sqrt(balance)/5)
    var balance = Math.max(VBS.user['StartBalance'], VBS.user['EndBalance']);
    var sum = VBS.user['StartBalance'] + Math.max(VBS.user['Transfers'], 0) + VBS.user['ContributionsEE'] + VBS.user['ContributionsER'] + Math.max(VBS.user['Return'], 0);
    var denom = sum > 1000000 ? 180 : sum < 100000 ? 100 : Math.round(100 + (1 - (1000000 - sum) / 900000) * 80);
    VBS.unit = Math.ceil(sum / denom);
    return Math.ceil(balance / VBS.unit);
  } // Box–Muller transform


  function rand_bm(min, max, skew) {
    var u = 0,
        v = 0;
    skew = skew ? skew : 1;

    while (u === 0) {
      u = Math.random();
    } //Converting [0,1) to (0,1)


    while (v === 0) {
      v = Math.random();
    } //Since log(0) undefined


    var num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1

    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range

    num = Math.pow(num, skew); // Skew

    num *= max - min; // Stretch to fill range

    num += min; // offset to min

    return num;
  }
};

document.addEventListener("DOMContentLoaded", window.VBS.init);
},{"core-js/modules/es6.array.copy-within":"node_modules/core-js/modules/es6.array.copy-within.js","core-js/modules/es6.array.fill":"node_modules/core-js/modules/es6.array.fill.js","core-js/modules/es6.array.find":"node_modules/core-js/modules/es6.array.find.js","core-js/modules/es6.array.find-index":"node_modules/core-js/modules/es6.array.find-index.js","core-js/modules/es6.array.from":"node_modules/core-js/modules/es6.array.from.js","core-js/modules/es7.array.includes":"node_modules/core-js/modules/es7.array.includes.js","core-js/modules/es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","core-js/modules/es6.array.of":"node_modules/core-js/modules/es6.array.of.js","core-js/modules/es6.array.species":"node_modules/core-js/modules/es6.array.species.js","core-js/modules/es6.date.to-primitive":"node_modules/core-js/modules/es6.date.to-primitive.js","core-js/modules/es6.function.has-instance":"node_modules/core-js/modules/es6.function.has-instance.js","core-js/modules/es6.function.name":"node_modules/core-js/modules/es6.function.name.js","core-js/modules/es6.map":"node_modules/core-js/modules/es6.map.js","core-js/modules/es6.math.acosh":"node_modules/core-js/modules/es6.math.acosh.js","core-js/modules/es6.math.asinh":"node_modules/core-js/modules/es6.math.asinh.js","core-js/modules/es6.math.atanh":"node_modules/core-js/modules/es6.math.atanh.js","core-js/modules/es6.math.cbrt":"node_modules/core-js/modules/es6.math.cbrt.js","core-js/modules/es6.math.clz32":"node_modules/core-js/modules/es6.math.clz32.js","core-js/modules/es6.math.cosh":"node_modules/core-js/modules/es6.math.cosh.js","core-js/modules/es6.math.expm1":"node_modules/core-js/modules/es6.math.expm1.js","core-js/modules/es6.math.fround":"node_modules/core-js/modules/es6.math.fround.js","core-js/modules/es6.math.hypot":"node_modules/core-js/modules/es6.math.hypot.js","core-js/modules/es6.math.imul":"node_modules/core-js/modules/es6.math.imul.js","core-js/modules/es6.math.log1p":"node_modules/core-js/modules/es6.math.log1p.js","core-js/modules/es6.math.log10":"node_modules/core-js/modules/es6.math.log10.js","core-js/modules/es6.math.log2":"node_modules/core-js/modules/es6.math.log2.js","core-js/modules/es6.math.sign":"node_modules/core-js/modules/es6.math.sign.js","core-js/modules/es6.math.sinh":"node_modules/core-js/modules/es6.math.sinh.js","core-js/modules/es6.math.tanh":"node_modules/core-js/modules/es6.math.tanh.js","core-js/modules/es6.math.trunc":"node_modules/core-js/modules/es6.math.trunc.js","core-js/modules/es6.number.constructor":"node_modules/core-js/modules/es6.number.constructor.js","core-js/modules/es6.number.epsilon":"node_modules/core-js/modules/es6.number.epsilon.js","core-js/modules/es6.number.is-finite":"node_modules/core-js/modules/es6.number.is-finite.js","core-js/modules/es6.number.is-integer":"node_modules/core-js/modules/es6.number.is-integer.js","core-js/modules/es6.number.is-nan":"node_modules/core-js/modules/es6.number.is-nan.js","core-js/modules/es6.number.is-safe-integer":"node_modules/core-js/modules/es6.number.is-safe-integer.js","core-js/modules/es6.number.max-safe-integer":"node_modules/core-js/modules/es6.number.max-safe-integer.js","core-js/modules/es6.number.min-safe-integer":"node_modules/core-js/modules/es6.number.min-safe-integer.js","core-js/modules/es6.number.parse-float":"node_modules/core-js/modules/es6.number.parse-float.js","core-js/modules/es6.number.parse-int":"node_modules/core-js/modules/es6.number.parse-int.js","core-js/modules/es6.object.assign":"node_modules/core-js/modules/es6.object.assign.js","core-js/modules/es7.object.define-getter":"node_modules/core-js/modules/es7.object.define-getter.js","core-js/modules/es7.object.define-setter":"node_modules/core-js/modules/es7.object.define-setter.js","core-js/modules/es7.object.entries":"node_modules/core-js/modules/es7.object.entries.js","core-js/modules/es6.object.freeze":"node_modules/core-js/modules/es6.object.freeze.js","core-js/modules/es6.object.get-own-property-descriptor":"node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","core-js/modules/es7.object.get-own-property-descriptors":"node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","core-js/modules/es6.object.get-own-property-names":"node_modules/core-js/modules/es6.object.get-own-property-names.js","core-js/modules/es6.object.get-prototype-of":"node_modules/core-js/modules/es6.object.get-prototype-of.js","core-js/modules/es7.object.lookup-getter":"node_modules/core-js/modules/es7.object.lookup-getter.js","core-js/modules/es7.object.lookup-setter":"node_modules/core-js/modules/es7.object.lookup-setter.js","core-js/modules/es6.object.prevent-extensions":"node_modules/core-js/modules/es6.object.prevent-extensions.js","core-js/modules/es6.object.is":"node_modules/core-js/modules/es6.object.is.js","core-js/modules/es6.object.is-frozen":"node_modules/core-js/modules/es6.object.is-frozen.js","core-js/modules/es6.object.is-sealed":"node_modules/core-js/modules/es6.object.is-sealed.js","core-js/modules/es6.object.is-extensible":"node_modules/core-js/modules/es6.object.is-extensible.js","core-js/modules/es6.object.keys":"node_modules/core-js/modules/es6.object.keys.js","core-js/modules/es6.object.seal":"node_modules/core-js/modules/es6.object.seal.js","core-js/modules/es7.object.values":"node_modules/core-js/modules/es7.object.values.js","core-js/modules/es6.promise":"node_modules/core-js/modules/es6.promise.js","core-js/modules/es7.promise.finally":"node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es6.reflect.apply":"node_modules/core-js/modules/es6.reflect.apply.js","core-js/modules/es6.reflect.construct":"node_modules/core-js/modules/es6.reflect.construct.js","core-js/modules/es6.reflect.define-property":"node_modules/core-js/modules/es6.reflect.define-property.js","core-js/modules/es6.reflect.delete-property":"node_modules/core-js/modules/es6.reflect.delete-property.js","core-js/modules/es6.reflect.get":"node_modules/core-js/modules/es6.reflect.get.js","core-js/modules/es6.reflect.get-own-property-descriptor":"node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","core-js/modules/es6.reflect.get-prototype-of":"node_modules/core-js/modules/es6.reflect.get-prototype-of.js","core-js/modules/es6.reflect.has":"node_modules/core-js/modules/es6.reflect.has.js","core-js/modules/es6.reflect.is-extensible":"node_modules/core-js/modules/es6.reflect.is-extensible.js","core-js/modules/es6.reflect.own-keys":"node_modules/core-js/modules/es6.reflect.own-keys.js","core-js/modules/es6.reflect.prevent-extensions":"node_modules/core-js/modules/es6.reflect.prevent-extensions.js","core-js/modules/es6.reflect.set":"node_modules/core-js/modules/es6.reflect.set.js","core-js/modules/es6.reflect.set-prototype-of":"node_modules/core-js/modules/es6.reflect.set-prototype-of.js","core-js/modules/es6.regexp.constructor":"node_modules/core-js/modules/es6.regexp.constructor.js","core-js/modules/es6.regexp.flags":"node_modules/core-js/modules/es6.regexp.flags.js","core-js/modules/es6.regexp.match":"node_modules/core-js/modules/es6.regexp.match.js","core-js/modules/es6.regexp.replace":"node_modules/core-js/modules/es6.regexp.replace.js","core-js/modules/es6.regexp.split":"node_modules/core-js/modules/es6.regexp.split.js","core-js/modules/es6.regexp.search":"node_modules/core-js/modules/es6.regexp.search.js","core-js/modules/es6.regexp.to-string":"node_modules/core-js/modules/es6.regexp.to-string.js","core-js/modules/es6.set":"node_modules/core-js/modules/es6.set.js","core-js/modules/es6.symbol":"node_modules/core-js/modules/es6.symbol.js","core-js/modules/es7.symbol.async-iterator":"node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es6.string.anchor":"node_modules/core-js/modules/es6.string.anchor.js","core-js/modules/es6.string.big":"node_modules/core-js/modules/es6.string.big.js","core-js/modules/es6.string.blink":"node_modules/core-js/modules/es6.string.blink.js","core-js/modules/es6.string.bold":"node_modules/core-js/modules/es6.string.bold.js","core-js/modules/es6.string.code-point-at":"node_modules/core-js/modules/es6.string.code-point-at.js","core-js/modules/es6.string.ends-with":"node_modules/core-js/modules/es6.string.ends-with.js","core-js/modules/es6.string.fixed":"node_modules/core-js/modules/es6.string.fixed.js","core-js/modules/es6.string.fontcolor":"node_modules/core-js/modules/es6.string.fontcolor.js","core-js/modules/es6.string.fontsize":"node_modules/core-js/modules/es6.string.fontsize.js","core-js/modules/es6.string.from-code-point":"node_modules/core-js/modules/es6.string.from-code-point.js","core-js/modules/es6.string.includes":"node_modules/core-js/modules/es6.string.includes.js","core-js/modules/es6.string.italics":"node_modules/core-js/modules/es6.string.italics.js","core-js/modules/es6.string.iterator":"node_modules/core-js/modules/es6.string.iterator.js","core-js/modules/es6.string.link":"node_modules/core-js/modules/es6.string.link.js","core-js/modules/es7.string.pad-start":"node_modules/core-js/modules/es7.string.pad-start.js","core-js/modules/es7.string.pad-end":"node_modules/core-js/modules/es7.string.pad-end.js","core-js/modules/es6.string.raw":"node_modules/core-js/modules/es6.string.raw.js","core-js/modules/es6.string.repeat":"node_modules/core-js/modules/es6.string.repeat.js","core-js/modules/es6.string.small":"node_modules/core-js/modules/es6.string.small.js","core-js/modules/es6.string.starts-with":"node_modules/core-js/modules/es6.string.starts-with.js","core-js/modules/es6.string.strike":"node_modules/core-js/modules/es6.string.strike.js","core-js/modules/es6.string.sub":"node_modules/core-js/modules/es6.string.sub.js","core-js/modules/es6.string.sup":"node_modules/core-js/modules/es6.string.sup.js","core-js/modules/es6.typed.array-buffer":"node_modules/core-js/modules/es6.typed.array-buffer.js","core-js/modules/es6.typed.int8-array":"node_modules/core-js/modules/es6.typed.int8-array.js","core-js/modules/es6.typed.uint8-array":"node_modules/core-js/modules/es6.typed.uint8-array.js","core-js/modules/es6.typed.uint8-clamped-array":"node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","core-js/modules/es6.typed.int16-array":"node_modules/core-js/modules/es6.typed.int16-array.js","core-js/modules/es6.typed.uint16-array":"node_modules/core-js/modules/es6.typed.uint16-array.js","core-js/modules/es6.typed.int32-array":"node_modules/core-js/modules/es6.typed.int32-array.js","core-js/modules/es6.typed.uint32-array":"node_modules/core-js/modules/es6.typed.uint32-array.js","core-js/modules/es6.typed.float32-array":"node_modules/core-js/modules/es6.typed.float32-array.js","core-js/modules/es6.typed.float64-array":"node_modules/core-js/modules/es6.typed.float64-array.js","core-js/modules/es6.weak-map":"node_modules/core-js/modules/es6.weak-map.js","core-js/modules/es6.weak-set":"node_modules/core-js/modules/es6.weak-set.js","core-js/modules/es7.array.flat-map":"node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/web.timers":"node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate":"node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable":"node_modules/core-js/modules/web.dom.iterable.js","regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","./scripts/utils":"scripts/utils.js","./scripts/k":"scripts/k.js","./scripts/matomoSetup":"scripts/matomoSetup.js","./scripts/pixiSetup":"scripts/pixiSetup.js","./scripts/b2Setup":"scripts/b2Setup.js","./scripts/mouseSetup":"scripts/mouseSetup.js","./scripts/howlSetup":"scripts/howlSetup.js","./scripts/ui":"scripts/ui.js","./scripts/scenes/titleOut":"scripts/scenes/titleOut.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map