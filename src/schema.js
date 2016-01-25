import _ from 'ramda';

// utils -----------------------------------------------------------------------
let idCounter = 1;
const uniqueId = () => { return idCounter++ }

const objectType = _.curry((objFunc, arrFunc, json) => {
  arrFunc = arrFunc || objFunc
  if(_.isArrayLike(json)) return arrFunc(json);
  else if (_.is(Object, json)) return objFunc(json);
  return json;
})

const iterator = _.curry((func, json) => {
  const recurse = _.compose(iterator(func), func);
  const iter = objectType(_.mapObjIndexed(recurse), _.map(recurse));
  return iter(json)
})

const filterer = (filter, json) => {
  const filtered = iterator(x => objectType(filter, filter, x))
  return filtered(json)
}

const removeNull = (json) => {
  const filter = _.filter(x => x ? true : false);
  return filterer(filter, json)
}

const removeEmpty = (json) => {
  const filter = _.filter(x => !_.isEmpty(x))
  return filterer(filter, json)
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
