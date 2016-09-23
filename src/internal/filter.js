import curry from '../curry';
import objectType from './objectType';

const objectFilter = curry((f, o) => {
  let newObj = {};
  for (let key in o) { if (f(o[key], key, o)) { newObj[key] = o[key]; } }
  return newObj;
});

const arrayFilter = curry((f, a) => {
  let newArr = [];
  for (let i = 0; i < a.length; i++) { if (f(a[i], i, a)) { newArr[i] = a[i]; } }
  return newArr;
});

const filter = curry((func, object) => {
  return objectType(objectFilter(func), arrayFilter(func), object);
})

export default filter;
