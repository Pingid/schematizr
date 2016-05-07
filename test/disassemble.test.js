import _ from 'ramda';
import { expect, should } from 'chai';
import { disassemble } from '../lib/schema'

const testData = [
  { endpoints: [{ name: "cool", $id: 2 }, { name: "two", $id: 3 } ], other: [{ text: 'haha', $id: 4 }], $id: 1 },
  { endpoints: [{ name: "cool", $id: 6 }], $id: 5 }
];

describe('disassemble', () => {
  it('Removes $id key to each object', () => {
    const actual = disassemble(testData)
    const expected = [
      { endpoints: [{ name: 'cool' }, { name: 'two' }], other: [{ text: 'haha' }] },
      { endpoints: [{ name: 'cool' }] }
    ];
    expect(actual).deep.equal(expected);
  });
});
