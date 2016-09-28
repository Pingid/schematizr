(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.deepj = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  Takes arbitary number of functions and returns a function wich takes a
  value which is passed to each function from right to left
*/
// compose :: (f) -> f
var compose = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (item) {
    return args.reverse().reduce(function (a, b) {
      return b(a);
    }, item);
  };
};

exports.default = compose;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  Takes a function and returns a curried version of that function
*/
// curry: f -> f
var curry = function curry(f) {
  return function f1() {
    for (var _len = arguments.length, args1 = Array(_len), _key = 0; _key < _len; _key++) {
      args1[_key] = arguments[_key];
    }

    if (args1.length >= f.length) return f.apply(null, args1);
    return function f2() {
      for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args2[_key2] = arguments[_key2];
      }

      return f1.apply(null, args1.concat(args2));
    };
  };
};

exports.default = curry;

},{}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./curry');

var _curry2 = _interopRequireDefault(_curry);

var _deepMap = require('./deepMap');

var _deepMap2 = _interopRequireDefault(_deepMap);

var _filter = require('./internal/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Passes every value of JSON literal to the passed in filter function
  only keeping the values which the filter function returns true on
*/
// deepFilter :: (j -> Bool) -> j -> j
var deepFilter = (0, _curry2.default)(function (f, json) {
  console.log((0, _filter2.default)(f, json));
  return (0, _deepMap2.default)(function (value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? (0, _filter2.default)(f, value) : value;
  }, (0, _filter2.default)(f, json));
});

exports.default = deepFilter;

},{"./curry":2,"./deepMap":4,"./internal/filter":7}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _map = require('./internal/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Recursive function which takes a function and nested json and iterates over
  the json mapping over every value
*/
// map :: (j -> j) -> j -> j
var deepMap = (0, _curry2.default)(function (func, json) {
  var recurse = (0, _curry2.default)(function (f, value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? (0, _map2.default)((0, _compose2.default)(recurse(f), f), value) : value;
  });
  return recurse(func, { json: json }).json;
});

// const deepMap = curry((func, value) => {
//   return typeof value === 'object' ? map(deepMap(func), func(value)) : func(value);
// })

exports.default = deepMap;

},{"./compose":1,"./curry":2,"./internal/map":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Passes every value of JSON literal to the passed in filter function
  only keeping the values which the filter function returns true on
*/
// deepReduce :: (j -> Bool) -> j -> j
var deepReduce = (0, _curry2.default)(function (func, intitialValue, value) {
  var reduced = intitialValue;
  deepMap(function (value, key, ob) {
    reduced = func(reduced, value, key, ob);
  });
  return reduced;
});

exports.default = deepReduce;

},{"./curry":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepReduce = exports.deepFilter = exports.deepMap = exports.curry = exports.compose = undefined;

var _compose2 = require('./compose');

var _compose3 = _interopRequireDefault(_compose2);

var _curry2 = require('./curry');

var _curry3 = _interopRequireDefault(_curry2);

var _deepMap2 = require('./deepMap');

var _deepMap3 = _interopRequireDefault(_deepMap2);

var _deepFilter2 = require('./deepFilter');

var _deepFilter3 = _interopRequireDefault(_deepFilter2);

var _deepReduce2 = require('./deepReduce');

var _deepReduce3 = _interopRequireDefault(_deepReduce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.compose = _compose3.default;
exports.curry = _curry3.default;
exports.deepMap = _deepMap3.default;
exports.deepFilter = _deepFilter3.default;
exports.deepReduce = _deepReduce3.default;
exports.default = {
  compose: _compose3.default,
  curry: _curry3.default,
  deepMap: _deepMap3.default,
  deepFilter: _deepFilter3.default,
  deepReduce: _deepReduce3.default
};

// export default D;

/*
 Type notations
  j -> JSON literal
  s -> JSON schema
  {x} -> plain object
  [x] -> array
*/

////////////////////////////////////////////////////////////////////////////////
// API
////////////////////////////////////////////////////////////////////////////////
/*
  DeepMap(modifier: Function, json: JSON): Maps over every value in deeply nested JSON
  DeepFilter(modifier: Function, json: JSON): Maps over every value in deeply nested JSON
  DeepReduce():

  Assemble: Adds unique id to each object which desrcibes its position and dept

  DeepFind(modifier: Function, json: JSON): Searches every
  DeepFindMap():
  DeepFlatten():
*/

},{"./compose":1,"./curry":2,"./deepFilter":3,"./deepMap":4,"./deepReduce":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../curry');

var _curry2 = _interopRequireDefault(_curry);

var _objectType = require('./objectType');

var _objectType2 = _interopRequireDefault(_objectType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectFilter = (0, _curry2.default)(function (f, o) {
  var newObj = {};
  for (var key in o) {
    if (f(o[key], key, o)) {
      newObj[key] = o[key];
    }
  }
  return newObj;
});

var arrayFilter = (0, _curry2.default)(function (f, a) {
  var newArr = [];
  for (var i = 0; i < a.length; i++) {
    if (f(a[i], i, a)) {
      newArr[i] = a[i];
    }
  }
  return newArr;
});

var filter = (0, _curry2.default)(function (func, object) {
  return (0, _objectType2.default)(objectFilter(func), arrayFilter(func), object);
});

exports.default = filter;

},{"../curry":2,"./objectType":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../curry');

var _curry2 = _interopRequireDefault(_curry);

var _objectType = require('./objectType');

var _objectType2 = _interopRequireDefault(_objectType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectMap = (0, _curry2.default)(function (f, o) {
  var newObj = {};
  for (var key in o) {
    newObj[key] = f(o[key], key, o);
  }
  return newObj;
});

var arrayMap = (0, _curry2.default)(function (f, a) {
  var newArr = [];
  for (var i = 0; i < a.length; i++) {
    newArr[i] = f(a[i], i, a);
  }
  return newArr;
});

var map = (0, _curry2.default)(function (func, object) {
  return (0, _objectType2.default)(objectMap(func), arrayMap(func), object);
});

exports.default = map;

},{"../curry":2,"./objectType":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectType = (0, _curry2.default)(function (objFunc, arrFunc, value) {
  if (value && value.constructor === Object) return objFunc(value);else if (value && value.constructor === Array) return arrFunc(value);
  return value;
});

exports.default = objectType;

},{"../curry":2}]},{},[6])(6)
});