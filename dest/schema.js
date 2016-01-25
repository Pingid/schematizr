'use strict';

exports.__esModule = true;
var _temporalUndefined = {};

// utils -----------------------------------------------------------------------
var idCounter = _temporalUndefined;
var uniqueId = _temporalUndefined;

var objectType = _temporalUndefined;

var iterator = _temporalUndefined;

var filterer = _temporalUndefined;

var removeNull = _temporalUndefined;

var removeEmpty = _temporalUndefined;

// Assemble --------------------------------------------------------------------
var assemble = _temporalUndefined;

// disassemble -----------------------------------------------------------------
var disassemble = _temporalUndefined;

// FindById --------------------------------------------------------------------
var findById = _temporalUndefined;

// Find ------------------------------------------------------------------------
var find = _temporalUndefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _temporalAssertDefined(val, name, undef) { if (val === undef) { throw new ReferenceError(name + ' is not defined - temporal dead zone'); } return true; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

idCounter = 1;

uniqueId = function uniqueId() {
  return _temporalAssertDefined(idCounter, 'idCounter', _temporalUndefined), idCounter++;
};

objectType = _ramda2['default'].curry(function (objFunc, arrFunc, json) {
  arrFunc = arrFunc || objFunc;
  if (_ramda2['default'].isArrayLike(json)) return arrFunc(json);else if (_ramda2['default'].is(Object, json)) return objFunc(json);
  return json;
});
iterator = _ramda2['default'].curry(function (func, json) {
  var recurse = _temporalUndefined;
  var iter = _temporalUndefined;
  recurse = _ramda2['default'].compose((_temporalAssertDefined(iterator, 'iterator', _temporalUndefined) && iterator)(func), func);
  iter = (_temporalAssertDefined(objectType, 'objectType', _temporalUndefined) && objectType)(_ramda2['default'].mapObjIndexed(_temporalAssertDefined(recurse, 'recurse', _temporalUndefined) && recurse), _ramda2['default'].map(_temporalAssertDefined(recurse, 'recurse', _temporalUndefined) && recurse));
  return (_temporalAssertDefined(iter, 'iter', _temporalUndefined) && iter)(json);
});

filterer = function filterer(filter, json) {
  var filtered = _temporalUndefined;
  filtered = (_temporalAssertDefined(iterator, 'iterator', _temporalUndefined) && iterator)(function (x) {
    return (_temporalAssertDefined(objectType, 'objectType', _temporalUndefined) && objectType)(filter, filter, x);
  });
  return (_temporalAssertDefined(filtered, 'filtered', _temporalUndefined) && filtered)(json);
};

removeNull = function removeNull(json) {
  var filter = _temporalUndefined;
  filter = _ramda2['default'].filter(function (x) {
    return x ? true : false;
  });
  return (_temporalAssertDefined(filterer, 'filterer', _temporalUndefined) && filterer)(_temporalAssertDefined(filter, 'filter', _temporalUndefined) && filter, json);
};

removeEmpty = function removeEmpty(json) {
  var filter = _temporalUndefined;
  filter = _ramda2['default'].filter(function (x) {
    return !_ramda2['default'].isEmpty(x);
  });
  return (_temporalAssertDefined(filterer, 'filterer', _temporalUndefined) && filterer)(_temporalAssertDefined(filter, 'filter', _temporalUndefined) && filter, json);
};

exports.assemble = assemble = function assemble(json) {
  var addId = _temporalUndefined;
  addId = (_temporalAssertDefined(objectType, 'objectType', _temporalUndefined) && objectType)(function (obj) {
    return _ramda2['default'].assoc('_id', (_temporalAssertDefined(uniqueId, 'uniqueId', _temporalUndefined) && uniqueId)(), obj);
  }, function (x) {
    return x;
  });
  return _ramda2['default'].compose(_temporalAssertDefined(removeNull, 'removeNull', _temporalUndefined) && removeNull, _temporalAssertDefined(iterator, 'iterator', _temporalUndefined) && iterator)(_temporalAssertDefined(addId, 'addId', _temporalUndefined) && addId, json);
};

exports.assemble = _temporalAssertDefined(assemble, 'assemble', _temporalUndefined) && assemble;

exports.disassemble = disassemble = function disassemble(json) {
  var removeId = _temporalUndefined;
  removeId = (_temporalAssertDefined(objectType, 'objectType', _temporalUndefined) && objectType)(function (obj) {
    return _ramda2['default'].dissoc('_id', obj);
  }, function (x) {
    return x;
  });
  return _ramda2['default'].compose(_temporalAssertDefined(removeEmpty, 'removeEmpty', _temporalUndefined) && removeEmpty, _temporalAssertDefined(removeNull, 'removeNull', _temporalUndefined) && removeNull, _temporalAssertDefined(iterator, 'iterator', _temporalUndefined) && iterator)(_temporalAssertDefined(removeId, 'removeId', _temporalUndefined) && removeId, json);
};

exports.disassemble = _temporalAssertDefined(disassemble, 'disassemble', _temporalUndefined) && disassemble;
exports.findById = findById = _ramda2['default'].curry(function (cb, json, id) {
  var replaced = _temporalUndefined;

  replaced = function replaced(x) {
    return x._id === id ? cb(x) : x;
  };

  return _ramda2['default'].compose(_temporalAssertDefined(removeNull, 'removeNull', _temporalUndefined) && removeNull, _temporalAssertDefined(iterator, 'iterator', _temporalUndefined) && iterator)(_temporalAssertDefined(replaced, 'replaced', _temporalUndefined) && replaced, json);
});
exports.findById = _temporalAssertDefined(findById, 'findById', _temporalUndefined) && findById;
exports.find = find = _ramda2['default'].curry(function (cb, json, shape) {
  var replaced = _temporalUndefined;

  replaced = function replaced(x) {
    return _ramda2['default'].equals(x, shape) ? cb(x) : x;
  };

  return _ramda2['default'].compose(_temporalAssertDefined(removeNull, 'removeNull', _temporalUndefined) && removeNull, _temporalAssertDefined(iterator, 'iterator', _temporalUndefined) && iterator)(_temporalAssertDefined(replaced, 'replaced', _temporalUndefined) && replaced, json);
});
exports.find = _temporalAssertDefined(find, 'find', _temporalUndefined) && find;
