import _ from 'ramda';
import { expect, should } from 'chai';
import { assemble } from '../lib/schema'

const testData = [
  { endpoints: [{ name: 'cool' }, { name: 'two' }] },
  { endpoints: [{ name: 'cool' }] }
];

describe('assemble', () => {
  it('Adds __id key to each object', () => {
    const actual = assemble(testData)
    const expected = [
      { endpoints: [{ name: "cool", __id: 2 }, { name: "two", __id: 3 } ], __id: 1 },
      { endpoints: [{ name: "cool", __id: 5 }], __id: 4 }
    ]
    expect(actual).deep.equal(expected);
  });
});
