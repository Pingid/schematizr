import curry from './curry';

/*
  Passes every value of JSON literal to the passed in filter function
  only keeping the values which the filter function returns true on
*/
// deepReduce :: (j -> Bool) -> j -> j
const deepReduce = curry((func, intitialValue, value) => {
  let reduced = intitialValue;
  deepMap((value, key, ob) => { reduced = func(reduced, value, key, ob) })
  return reduced;
});

export default deepReduce;
