import curry from './curry';
import deepMap from './deepMap';

import filter from './internal/filter';

/*
  Passes every value of JSON literal to the passed in filter function
  only keeping the values which the filter function returns true on
*/
// deepFilter :: (j -> Bool) -> j -> j
const deepFilter = curry((f, json) => {
  console.log(filter(f, json));
  return deepMap(value => typeof value === 'object' ? filter(f, value) : value,  filter(f, json))
})

export default deepFilter;
