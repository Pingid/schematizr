import _ from 'ramda';

/*
 Type notations
  j -> JSON literal
  s -> JSON schema
  {x} -> plain object
  [x] -> array
*/

////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////

/*
  Blobal variable for the unique id's and function which returns in incremented
*/
let idCounter = 1;
const uniqueId = () => { return idCounter++ }

/*
  Checks wether the item handed to it is an array plain object or other
  returns the item wrapped in either an array callback, object callback or just the item
*/
// objectType :: ({a} -> {a}) -> ([a] -> [a]) -> j -> j
const objectType = _.curry((objFunc, arrFunc, json) => {
  if (_.type(json) === 'Object') return objFunc(json);
  else if (_.type(json) === 'Array') return arrFunc(json);
  return json;
})

/*
  Recursive function which takes a function and nested json and iterates over
  the json running every value through the function
*/
// iterator :: (j -> j) -> j -> j
const iterator = _.curry((func, json) => {
  const recursive = _.curry((cb, value) => {
    const recurse = _.compose(recursive(cb), cb);
    return objectType(_.mapObjIndexed(recurse), _.map(recurse))(value)
  })
  return recursive(func, { json }).json
})

/*
  Takes a filter function which must return a boolean and some nested json
  it iterates over the json running each value through the filter
  filterer :: (a -> Bool) ->
*/
// filterer :: (j -> Bool) -> j -> j
const filterer = (filter, json) => {
  const filtered = iterator(x => objectType(filter, filter, x))
  return filtered(json)
}

/*
  Remove any nulls undifines or false booleans
*/
// removeNull :: j -> j
const removeNull = (json) => {
  const filter = _.filter(x => x ? true : false);
  return filterer(_.filter(x => x ? true : false), json)
}

/*
  Remove any empty objects or arrays
*/
// removeEmpty :: j -> j
const removeEmpty = (json) => {
  return filterer(_.filter(x => !_.isEmpty(x)), json)
}

////////////////////////////////////////////////////////////////////////////////
// API
////////////////////////////////////////////////////////////////////////////////

/*
  Adds a unique id to every plain object
*/
// assemble :: j -> j
export const assemble = (json, key="_id") => {
  const addId = objectType((obj) => {
    if(obj && obj[key] || _.isEmpty(obj)) return obj;
    else return _.assoc(key, uniqueId(), obj)
  }, x => x)
  return _.compose(removeNull, iterator)(addId, json)
}

/*
  Removes all _id keys from JSON literal
*/
// disassemble :: s -> j
export const disassemble = (json, key='_id') => {
  const removeId = objectType((obj) => _.dissoc(key, obj), x => x)
  return _.compose(removeEmpty, removeNull, iterator)(removeId, json)
}

/*
  Returns JSON literal with callback wrapped around object containing chosen id
*/
// findById :: (j -> j) -> s -> Int -> s
export const findById = _.curry((cb, json, id) => {
  const replaced = (object) => {
    if (object && object._id && object._id === id) return cb(object)
    else return object;
  }
  if(_.isArrayLike(json) && json[0] && json[0]._id) {
    return _.compose(assemble, removeNull, iterator)(replaced, json)}
  return _.compose(assemble, removeNull, iterator)(replaced, json)
})

/*
  Returns JSON literal with callback wrapped around the object or value that
  matches the object or value searched for
*/
// find :: (j -> j) -> j -> j -> j
export const find = _.curry((cb, json, shape) => {
const replaced = (x) => _.equals(x, shape) ? cb(x) : x;
  if(_.isArrayLike(json) && json[0] && json[0]._id) {
    return _.compose(removeNull, iterator)(replaced, json)}
  return _.compose(removeNull, iterator)(replaced, json);
})

/*
  Returns JSON literal with every value or object wrapped in the filter
*/
// filter :: (j -> Bool) -> j -> j
export const filter = (cb, json) => {
  return removeEmpty(filterer(_.filter(cb), json))
}
