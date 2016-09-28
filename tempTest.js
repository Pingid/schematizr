// import R from 'ramda';
// import { } from './src/utilityFunctions';
// import map from './src/internal/map';
// import filter from './src/internal/filter';
// import reduce from './src/internal/reduce';
// import deepMap from './src/deepMap';
// import deepFilter from './src/deepFilter';
// import deepReduce from './src/deepReduce';
import K, { compose, deepMap, deepFilter, deepReduce } from './lib/deepj.js';
import deepEquals from './src/deepEquals';
import deepConcat from './src/deepConcat';
// console.log(deepEquals({ two: 1, and: [ { three: 3, four: {five: '5'} } ] }, { two: 1, and: [ { three: 3, four: {five: '5'} } ] }));

const item = { one: 1, two: 2, three: 3 }
const find = { three: 3, two: 3 }
let test = Object.keys(find)
  .map(key => item[key] && deepEquals(item[key], find[key]))
  .reduce((a, b) => !b ? b : a, true)

const arrayContains = (a, b) => a
  .map(item => b.filter(x => deepEquals(x, item)).length > 0)
  .reduce((a, b) => !b ? b : a, true);

console.log(test);
console.log(arrayContains([ 2, 1 ], [ 1, 2 ]));
console.log(deepConcat);
console.log(deepConcat(
  { cool: 'beans' },
  [ 2 ],
  { one: 1, two: 2, three: { cool: 'beans', four: [ 1, 2 ] } }
));
// console.log(K, deepMap, deepFilter, deepReduce );
// const testData = {
//   one: 1,
//   two: 2,
//   three: [ 4, 5, { six: 6 } ]
// }

// console.log('Map', deepMap((value) => { console.log('m-value', value); return value.constructor === Array ? 'value' : value; }, testData));
// console.log('Filter', deepFilter((v, key, o) => { return v !== 5; }, testData));
// console.log('Filter', filter((v, key, o) => { return v !== 5; }, [ 1, 2, 3, 4, 8, { six: 6 }, 7]).length);
// console.log('Filter', deepFilter((x) => { console.log('f-value', x); return true }, testData));
// const objectFilter = R.curry((f, o) => {
//   let newObj = {};
//   for (let key in o) {
//     console.log(key, o[key]);
//     if (f(o[key], key, o)) { newObj[key] = o[key]; }
//   }
//   return newObj;
// });
//
// const arrayFilter = R.curry((f, a) => {
//   let newArr = [];
//   for (let i = 0; i < a.length; i++) { if (f(a[i], i, a)) { newArr[i] = a[i]; } }
//   return newArr;
// });
//
// const deepReduce = R.curry((func, intitialValue, json) => {
//   if (typeof json === 'object') {
//     return reduce((a, b, c, d) => {
//       if (typeof b === 'object') return deepReduce(func, a, b)
//       return func(a, b, c, d);
//     }, intitialValue, json);
//   }
//   return json
// });

// console.log(deepReduce(
//   (a, b, c, d) => {
//     return a + b;
//   },
//   0,
//   { one: 1, two: 1, three: { four: 1, five: [1, 1] } }
// ));

// export const compose = (...args) => (item) => args.reverse().reduce((a, b) => b(a), item);
//
// const curry = (f) => function f1(...args1) {
//   if (args1.length >= f.length) return f.apply(null, args1);
//   return function f2(...args2) { return f1.apply(null, args1.concat(args2)) }
// }
//


// console.log(objectType(() => console.log('ob'), () => console.log('arr'), 'fasd'));
// function curry(fx) {
//   var arity = fx.length;
//
//   return function f1() {
//     var args = Array.prototype.slice.call(arguments, 0);
//     if (args.length >= arity) {
//       return fx.apply(null, args);
//     }
//     else {
//       return function f2() {
//         var args2 = Array.prototype.slice.call(arguments, 0);
//         return f1.apply(null, args.concat(args2));
//       }
//     }
//   };
// }

// const curry = (func) => {
//   const recurse = (...args) => {
//     if (..args.length < func.length) return
//   }
// }

// console.log(curry((a, b, c) => a + b + c)(1, 2, 3));

// console.log(((a, b) => a + b).apply(null, [1]));

// console.log(['func1', 'func2', 'func3'].reduce((a, b) => a + b, 'func0'))
// console.log(compose(R.map(x => x.toString()), R.filter(x => x % 2 === 0))([0, 2, 3, 4]))
// console.log(reduce((a, b, c, d) => {
//   console.log('A', a);
//   console.log('B', b);
//   console.log('C', c);
//   console.log('D', d);
//   return a + b;
// }, 0, [1, 2]));
// console.log(arrayFilter(x => true, [ 1, 2, 3]));
// console.log(objectFilter(x => true, { one: 1, two: 2 }));


// console.log(
//   R.filter(
//     (a, b, c) => { console.log('A', a, 'B', b, 'C', c); return true },
//     { one: 1, two: 2 }
//   )
// );
