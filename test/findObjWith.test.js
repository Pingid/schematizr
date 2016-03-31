import _ from 'ramda';
import { expect, should } from 'chai';
import { findObjWith } from '../lib/schema'

const testData = [
  { one: '1', two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
  { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
];

describe('findObjWith', () => {
  it('Replace object in nest', () => {
    const actual = findObjWith((x) => 'cool', { four: '4' }, testData)
    const expected = [
      { one: '1', two: '2', three: ['cool'] },
      { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
    ];
    expect(actual).deep.equal(expected);
  });
});
