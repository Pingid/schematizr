import compose from './compose';
import curry from './curry';
import deepMap from './deepMap';
import deepFilter from './deepFilter';
import deepReduce from './deepReduce';

export compose from './compose';
export curry from './curry';
export deepMap from './deepMap';
export deepFilter from './deepFilter';
export deepReduce from './deepReduce';

export default {
  compose,
  curry,
  deepMap,
  deepFilter,
  deepReduce
}

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
