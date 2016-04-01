import _ from 'ramda';
import { expect, should } from 'chai';
import { find } from '../lib/schema'

const testData = [
  { _id: '1', endpoints: [{ name: 'cool' }, { name: 'two' }] },
  { _id: '2', endpoints: [{ name: 'cool' }] }
];

describe('find', () => {
  it('Replace value in nest', () => {
    const actual = find((x) => '', 'two', testData)
    const expected = [
      { _id: '1', endpoints: [{ name: 'cool' }, { name: '' }] },
      { _id: '2', endpoints: [{ name: 'cool' }] }
    ];
    expect(actual).deep.equal(expected);
  });

});
