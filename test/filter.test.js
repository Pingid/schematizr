import _ from 'ramda';
import { expect, should } from 'chai';
import { filter, map } from '../lib/schema'

const testData = [
  { one: '1', two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
  { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
];

const data = {
  todoList: [
    {  text: 'Exercise',
      sublist: [
        { text: '5k run' },
        { text: '30min stretch' }
      ]
    },
    { text: 'Trim nose hairs' }
  ]
}

describe('filter', () => {
  it('filter object in nest', () => {
    const actual = filter((x) => x !== '1', testData)
    const expected = [
      { two: '2', three: [{ four: '4', five: [{ six: '6' }] }] },
      { one: 1, two: 2, three: [{ four: 4, five: [{ six: 6 }] }] }
    ];
    expect(actual).deep.equal(expected);
  });
  it('should remove empty objects and arrays if they are items in an array', () => {
    const actual = filter((x) => x !== 100, { two: [{}]});
    const expected = { two: [] };
    expect(actual).deep.equal(expected);
  })
  it('should not remove empty objects or arrays if they are values in an object', () => {
    const actual = filter((x) => x !== 100, { one: {}, two: [] });
    const expected = { one: {}, two: [] };
    expect(actual).deep.equal(expected);
  })
  it('Shoule throw Error if inproper arguments are give', () => {
    const throwsMadArgumenterror = () => filter(testData, {})
    expect(throwsMadArgumenterror).to.throw('filter expected (Function) instead received (Array)')
  })
});
