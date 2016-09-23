import curry from '../curry';
import objectType from './objectType';

const objectMap = curry((f, o) => {
  let newObj = {};
  for (let key in o) { newObj[key] = f(o[key], key, o) }
  return newObj;
});

const arrayMap = curry((f, a) => {
  let newArr = [];
  for (let i = 0; i < a.length; i++) { newArr[i] = f(a[i], i, a); }
  return newArr;
});

const map = curry((func, object) => {
  return objectType(objectMap(func), arrayMap(func), object);
});

export default map;
