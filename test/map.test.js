import _ from 'ramda';
import { expect, should } from 'chai';
import { map } from '../lib/schema'

const testData = [
  { one: '1', two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
  { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
];

describe('map', () => {
  it('map object in nest', () => {
    const actual = map((x) => _.type(x) === 'Number' ? x + 1 : x, testData)
    const expected = [
      { one: '1', two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
      { one: 2, two: 3, three: [{ four: 5, five: [{ six: 7 }] }] }
    ];
    expect(actual).deep.equal(expected);
  });
  describe('mapping over', () => {
    [
      { name: 'null', input: null },
      { name: 'plainObject', input: {} },
      { name: 'array', input: [] },
      { name: 'string', input: '' },
      { name: 'number', input: 0 },
      { name: 'method', input: x => x }
    ].forEach((input) => {
      it(input.name + ' should return original ' + input.name, () => {
        expect(map((x) => x, input.input)).deep.equal(input.input)
      })
    })
  })
});
