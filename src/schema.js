import _ from 'ramda';

// utils -----------------------------------------------------------------------
// Blobal variable for the unique id's and function which returns in incremented
let idCounter = 1;
const uniqueId = () => { return idCounter++ }

// Checks wether the item handed to it is an array plain object or other
// returns the item wrapped in either an array callback, object callback or just the item
const objectType = _.curry((objFunc, arrFunc, json) => {
  arrFunc = arrFunc || objFunc
  if(_.isArrayLike(json)) return arrFunc(json);
  else if (_.is(Object, json)) return objFunc(json);
  return json;
})

// Recursive function which takes a function and nested json and iterates over
// the json running every value through the function
const iterator = _.curry((func, json) => {
  const recursive = _.curry((cb, value) => {
    const recurse = _.compose(recursive(cb), cb);
    return objectType(_.mapObjIndexed(recurse), _.map(recurse))(value)
  })
  return recursive(func, { json }).json
})


// Takes a filter function which must return a boolean and some nested json
// it iterates over the json running each value through the filter
const filterer = (filter, json) => {
  const filtered = iterator(x => objectType(filter, filter, x))
  return filtered(json)
}

// Remove any nulls undifines or false booleans
const removeNull = (json) => {
  const filter = _.filter(x => x ? true : false);
  return filterer(_.filter(x => x ? true : false), json)
}

// Remove any empty objects or arrays
const removeEmpty = (json) => {
  return filterer(_.filter(x => !_.isEmpty(x)), json)
}

// Assemble --------------------------------------------------------------------
export const assemble = (json) => {
  const addId = objectType((obj) => _.assoc('_id', uniqueId(), obj), x => x)
  return _.compose(removeNull, iterator)(addId, json)
}

// disassemble -----------------------------------------------------------------
export const disassemble = (json) => {
  const removeId = objectType((obj) => _.dissoc('_id', obj), x => x)
  return _.compose(removeEmpty, removeNull, iterator)(removeId, json)
}

// FindById --------------------------------------------------------------------
export const findById = _.curry((cb, json, id) => {
  const replaced = (x) => x._id === id ? cb(x) : x;
  return _.compose(removeNull, iterator)(replaced, json)
})

// Find ------------------------------------------------------------------------
export const find = _.curry((cb, json, shape) => {
  const replaced = (x) => _.equals(x, shape) ? cb(x) : x;
  return _.compose(removeNull, iterator)(replaced, json);
})

// Filter ----------------------------------------------------------------------
export const filter = (cb, json) => {
  return removeEmpty(filterer(_.filter(cb), json))
}
