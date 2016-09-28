import curry from './curry';
import compose from './compose';

import map from './internal/map';

/*
  Recursive function which takes a function and nested json and iterates over
  the json mapping over every value
*/
// map :: (j -> j) -> j -> j
const deepMap = curry((func, json) => {
  const recurse = curry((f, value) =>
    typeof value === 'object' ? map(compose(recurse(f), f), value) : value
  );
  return recurse(func, { json }).json
})

// const deepMap = curry((func, value) => {
//   return typeof value === 'object' ? map(deepMap(func), func(value)) : func(value);
// })

export default deepMap;
