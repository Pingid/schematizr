import deepMap from './deepMap';
import deepEquals from './deepEquals';
import curry from './curry';

const objectContains = (a, b) => Object.keys(a)
    .map(key => b[key] && deepEquals(b[key], a[key]))
    .reduce((c, d) => !d ? d : c, true);

const arrayContains = (a, b) => a
  .map(item => b.filter(x => deepEquals(x, item)).length > 0)
  .reduce((c, d) => !d ? d : c, true);


const deepConcat = curry((find, add, json) => {
  return deepMap((item) => {
    if (typeof item === 'object') {
      if (
        item.constructor === Object &&
        find.constructor === Object &&
        add.constructor === Object &&
        objectContains(find, item)) return Object.assign({}, item, add);
      else if (
        item.constructor === Array &&
        find.constructor === Array &&
        add.constructor === Array &&
        arrayContains(find, item)) return [].concat(item, add);
      return item;
    } else if (typeof find !== 'object' && find === item) return add;
    return item;
  }, json);
});

export default deepConcat;
