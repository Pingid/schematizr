import R, { curry } from 'ramda';

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
  Checks wether the item handed to it is an array plain object or other
  returns the item wrapped in either an array callback, object callback or just the item
*/
// objectType :: ({a} -> {a}) -> ([a] -> [a]) -> j -> j
export const objectType = R.curry((objFunc, arrFunc, json) => {
  if (R.type(json) === 'Object') return objFunc(json);
  else if (R.type(json) === 'Array') return arrFunc(json);
  return json;
})


/*
  Check whether the key values pairs from the first object are in the second
*/
// objContains :: Object -> Object -> Bool
export const objContains = curry((shape, obj) => {
  if (R.type(obj) === 'Object') {
    return R.keys(shape).filter((key) => obj[key] === shape[key]).length === R.keys(shape).length;
  }
  return false;
});

/*
  Takes a filter function which must return a boolean and some nested json
  it iterates over the json running each value through the filter
  filterer :: (a -> Bool) ->
*/
// filterer :: (j -> Bool) -> j -> j
export const filterer = (filter, json) => map(x => objectType(filter, filter, x), json);

/*
  Remove any empty objects or arrays when they are direct children of an array
*/
// removeEmpty :: j -> j
export const removeEmpty = (json) => {
  return map((x) => R.type(x) === 'Array' ? R.reject(h => R.isEmpty(h), x) : x, json);
}

/*
  Takes a name of a function and an array of objects with their actual
  input and expected input if the actual and expect doent match it throws an error
*/
// removeEmpty :: j -> j
const typeError = (functionName, ...args) => {
  const actual = args.map(x => R.type(x.actual));
  const expected = args.map(x => x.expected);
  if(!R.equals(actual, expected)) {
    throw new Error(`${functionName} expected (${expected.join(', ')}) instead received (${actual.join(', ')})`);
    return false;
  }
  return true;
}
////////////////////////////////////////////////////////////////////////////////
// API
////////////////////////////////////////////////////////////////////////////////

/*
  Recursive function which takes a function and nested json and iterates over
  the json mapping over every value
*/
// map :: (j -> j) -> j -> j
export const map = R.curry((func, json) => {
  typeError('map', { expected: 'Function', actual: func });
  const recursive = R.curry((f, value) => {
    const recurse = R.compose(recursive(f), f);
    return objectType(R.mapObjIndexed(recurse), R.map(recurse))(value)
  })
  return recursive(func, { json }).json
})

/*
  Adds a unique id to every plain object
*/
// assemble :: j -> j
export const assemble = R.curry((json, key="$id") => {
  let idCounter = 1;
  const addId = objectType((obj) => {
    if (R.isEmpty(obj)) return obj;
    else if (obj[key]) return Object.assign({}, obj, { [key]: idCounter++ });
    else return R.assoc(key, idCounter++, obj)
  }, x => x)
  return R.compose(removeEmpty, map)(addId, json)
})

/*
  Removes all id keys from JSON literal
*/
// disassemble :: s -> j
export const disassemble = (json, key='$id') => {
  const removeId = objectType((obj) => R.dissoc(key, obj), x => x)
  return R.compose(removeEmpty, map)(removeId, json)
}

/*
  Returns JSON literal with callback wrapped around the object or value that
  matches the object or value searched for
*/
// find :: (j -> j) -> j -> j -> j
export const find = R.curry((f, shape, json) => {
  typeError('find', { expected: 'Function', actual: f });
  return R.compose(removeEmpty, map)((x) => R.equals(x, shape) ? f(x) : x, json);
});

/*
  Returns JSON literal with callback wrapped around the object that
  contains the same key value pairs that were searched for searched for
*/
// findIn :: (j -> j) -> j -> j
export const findObjWith = curry((f, shape, json) => {
  typeError('findObjWith', { expected: 'Function', actual: f }, { expected: 'Object', actual: shape });
  return R.compose(removeEmpty, map)((x) => objContains(shape, x) ? f(x) : x, json)
});

/*
  Returns JSON literal with every value or object wrapped in the filter
*/
// filter :: (j -> Bool) -> j -> j
export const filter = (f, json) => {
  typeError('filter', { expected: 'Function', actual: f });
  return removeEmpty(filterer(R.filter(f), json))
}

export default {
  map,
  assemble,
  disassemble,
  find,
  findObjWith,
  filter
}
