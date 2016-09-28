import { expect, should } from 'chai';
import { deepReduce } from '../lib/deepj'

const testData = [
  { one: '1', two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
  { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
];

describe('deepReduce', () => {

  // it('deepReduce merge all objects in deeply nested array', () => {
  //   const actual = deepReduce(
  //     (a, b) => R.type(b) === 'Object' ? Object.assign({}, a, b) : a,
  //     {},
  //     testData
  //   )
  //   const expected = {
  //     one: 1,
  //     two: 2,
  //     three: [ { four: 4, five: [ { six: 6 } ] } ],
  //     four: 4,
  //     five: [ { six: 6 } ],
  //     six: 6
  //   }
  //   expect(actual).deep.equal(expected);
  // });
  //
  // it('deepReduce merge all objects in deeply nested object', () => {
  //   const actual = deepReduce(
  //     (a, b) => R.type(b) === 'Object' ? Object.assign({}, a, b) : a,
  //     {},
  //     testData[0]
  //   );
  //   const expected = {
  //     one: '1',
  //     two: '2',
  //     three: [ { four: '4', five: [ { six: '6' } ] } ],
  //     four: '4',
  //     five: [ { six: '6' } ],
  //     six: '6'
  //   }
  //   expect(actual).deep.equal(expected);
  // });
  //
  // it('Should throw Error if inproper arguments are give', () => {
  //   const throwsMadArgumenterror = () => deepReduce([], '', {})
  //   expect(throwsMadArgumenterror).to.throw('deepReduce expected (Function) instead received (Array)')
  // })
});
