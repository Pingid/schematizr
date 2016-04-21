import _ from 'ramda';
import { expect, should } from 'chai';
import S, { assemble } from '../lib/schema'

const testData = [
  { endpoints: [{ name: 'cool' }, { name: 'two' }] },
  { endpoints: [{ name: 'cool' }] }
];

describe('assemble', () => {
  it('Adds $id key to each object', () => {
    const actual = assemble(testData)
    const expected = [
      { endpoints: [{ name: "cool", $id: 2 }, { name: "two", $id: 3 } ], $id: 1 },
      { endpoints: [{ name: "cool", $id: 5 }], $id: 4 }
    ]
    expect(actual).deep.equal(expected);
  });
});
