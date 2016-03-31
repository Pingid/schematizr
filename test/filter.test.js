import _ from 'ramda';
import { expect, should } from 'chai';
import { filter } from '../lib/schema'

const testData = [
  { one: '1', two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
  { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
];

describe('filter', () => {
  it('filter object in nest', () => {
    const actual = filter((x) => x !== '1', testData)
    const expected = [
      { two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
      { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
    ];
    expect(actual).deep.equal(expected);
  });

});
