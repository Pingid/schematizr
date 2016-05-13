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
  it('Should keep values equal to null', () => {
    const actual = disassemble({ one: null, $id: 1, two: [null, { three: null, $id: 2 }] });
    const expected = { one: null, two: [null, { three: null }]};
    expect(expected).deep.equal(actual);
  });
  it('Should keep values equal to undefined', () => {
    const actual = disassemble({ one: undefined, $id: 1, two: [undefined, { three: undefined, $id: 2 }] });
    const expected = { one: undefined, two: [undefined, { three: undefined }]};
    expect(actual).deep.equal(expected);
  });
});
