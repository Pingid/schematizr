import curry from './curry';
import objectType from './internal/objectType';

const arrayEquals = (a, b) => {
  let result = true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!b[i]) { result = false; }
    else if (typeof a[i] === 'object') { result = deepEquals(a[i], b[i]) }
    else if (a[i] !== b[i]) { result = false; }
  }
  return result;
}

const objectEquals = (a, b) => {
  let result = true;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (let key in a) {
    if (!b[key]) { result = false; }
    else if (typeof a[key] === 'object') { result = deepEquals(a[key], b[key]) }
    else if (b[key] !== a[key]) { result = false; }
  }
  return result;
}

const deepEquals = (a, b) => {
  if (typeof a !== 'object' && a === b) return true;
  else if (a.constructor === Array && b.constructor === Array) return arrayEquals(a, b)
  else if (a.constructor === Object && b.constructor === Object) return objectEquals(a, b)
  return false;
}

export default deepEquals;
