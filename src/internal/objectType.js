import curry from '../curry';

const objectType = curry((objFunc, arrFunc, value) => {
  if (value && value.constructor === Object) return objFunc(value);
  else if (value && value.constructor === Array) return arrFunc(value);
  return value;
})

export default objectType;
