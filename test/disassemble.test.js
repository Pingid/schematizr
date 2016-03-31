import _ from 'ramda';
import { expect, should } from 'chai';
import { disassemble } from '../lib/schema'

const testData = [
  { endpoints: [{ name: "cool", __id: 2 }, { name: "two", __id: 3 } ], __id: 1 },
  { endpoints: [{ name: "cool", __id: 5 }], __id: 4 }
];

describe('disassemble', () => {
  it('Removes __id key to each object', () => {
    const actual = disassemble(testData)
    const expected = [
      { endpoints: [{ name: 'cool' }, { name: 'two' }] },
      { endpoints: [{ name: 'cool' }] }
    ]
    expect(actual).deep.equal(expected);
  });
});
