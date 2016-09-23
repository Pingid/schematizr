import curry from '../curry';
import objectType from './objectType';

const objectReduce = curry((f, i, o) => {
  let result = i;
  for (let key in o) { result = f(result, o[key], key, o); }
  return result
})
const arrayReduce = curry((f, i, a) => {
  let result = i;
  for (let i = 0; i < a.length; i++) { result = f(result, a[i], i, a) }
  return result
})

const reduce = curry((func, intitialValue, object) => {
  return objectType(objectReduce(func, intitialValue), arrayReduce(func, intitialValue), object);
})

export default reduce;
