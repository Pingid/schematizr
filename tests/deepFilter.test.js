import _ from 'ramda';
import { expect, should } from 'chai';
import D, { deepFilter } from '../lib/deepj.min'

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

describe('deepFilter', () => {
  it('deepFilter should iterate over every value', () => {
    let actual = [];
    deepFilter((x) => { actual.push(x); return true; }, testData[0]);
    const expected = [
      { one: '1', two:'2', three:[ { four:'4', five:[ { six:'6' } ] } ] },
      '1',
      '2',
      [ { four:'4', five:[ { six:'6' } ] } ],
      { four:'4', five:[ { six:'6' } ] },
      '4',
      [{ six:'6' }],
      '6',
      { six:'6' },
    ]
    console.log(actual);
    expect(actual).deep.equal(expected);
  });
  // it('should not remove empty objects and arrays even if they are items in an array', () => {
  //   const actual = deepFilter((x) => x !== 100, { two: [{}] });
  //   const expected = { two: [{}] };
  //   expect(actual).deep.equal(expected);
  // })
  // it('should not remove empty objects or arrays if they are values in an object', () => {
  //   const actual = deepFilter((x) => x !== 100, { one: {}, two: [] });
  //   const expected = { one: {}, two: [] };
  //   expect(actual).deep.equal(expected);
  // })
  // it('Shoule throw Error if inproper arguments are give', () => {
  //   const throwsMadArgumenterror = () => deepFilter(testData, {})
  //   expect(throwsMadArgumenterror).to.throw('filter expected (Function) instead received (Array)')
  // })
});
