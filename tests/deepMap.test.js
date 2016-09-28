import { expect, should } from 'chai';
import { deepMap } from '../lib/deepj'

const testData = [
  { one: null, two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
  { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
];

describe('deepMap', () => {
  it('deep map iterates every value in nest', () => {
    let actual = [];
    deepMap((x) => { actual.push(x); return x; }, testData[0]);
    const expected = [
      { one: null, two:'2', three:[ { four:'4', five:[ { six:'6' } ] } ] },
      null,
      '2',
      [ { four:'4', five:[ { six:'6' } ] } ],
      { four:'4', five:[ { six:'6' } ] },
      '4',
      { six:'6' },
      '6',
      [ { six:'6' } ]
    ]
    expect(actual).deep.equal(expected);
  });
  describe('deepMapping over', () => {
    [
      { name: 'null', input: null },
      { name: 'plainObject', input: {} },
      { name: 'array', input: [] },
      { name: 'string', input: '' },
      { name: 'number', input: 0 },
      { name: 'method', input: x => x }
    ].forEach((input) => {
      it(input.name + ' should return original ' + input.name, () => {
        expect(deepMap((x) => x, input.input)).deep.equal(input.input)
      })
    })
  })
});
