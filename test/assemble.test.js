import _ from 'ramda';
import { expect, should } from 'chai';
import S, { assemble, uniq } from '../lib/schema'

const testData = [
  { endpoints: [{ name: 'cool' }, { name: 'two' }], other: [{ text: 'haha' }] },
  { endpoints: [{ name: 'cool' }] }
];

describe('assemble', () => {
  it('Adds $id key to each object', () => {
    const actual = assemble(testData)
    const expected = [
      { endpoints: [{ name: "cool", $id: 2 }, { name: "two", $id: 3 } ], other: [{ text: 'haha', $id: 4 }], $id: 1 },
      { endpoints: [{ name: "cool", $id: 6 }], $id: 5 }
    ]
    expect(actual).deep.equal(expected);
  });
  it('Should keep values equal to null', () => {
    const actual = assemble({ one: null, two: [null, { three: null }]})
    const expected = { one: null, $id: 1, two: [null, { three: null, $id: 2 }] };
    expect(actual).deep.equal(expected);
  })
  it('Should keep values equal to undefined', () => {
    const actual = assemble({ one: undefined, two: [undefined, { three: undefined }]})
    const expected = { one: undefined, $id: 1, two: [undefined, { three: undefined, $id: 2 }] };
    expect(actual).deep.equal(expected);
  })
  it('Should replace any ids already exsisting', () => {
    const actual = assemble([
      { endpoints: [{ name: "cool", $id: 20 }, { name: "two", $id: 30 } ], other: [{ text: 'haha', $id: 40 }], $id: 10 },
      { endpoints: [{ name: "cool", $id: 60 }], $id: 50 }
    ])
    const expected = [
      { endpoints: [{ name: "cool", $id: 2 }, { name: "two", $id: 3 } ], other: [{ text: 'haha', $id: 4 }], $id: 1 },
      { endpoints: [{ name: "cool", $id: 6 }], $id: 5 }
    ];
    expect(actual).deep.equal(expected);
  })
  // it('Ignore objects with key "other"', () => {
  //   const actual = assemble(testData, ['other'])
  //   const expected = [
  //     { endpoints: [{ name: "cool", $id: 2 }, { name: "two", $id: 3 } ], other: [{ text: 'haha' }], $id: 1 },
  //     { endpoints: [{ name: "cool", $id: 5 }], $id: 4 }
  //   ]
  //   expect(actual).deep.equal(expected);
  // })
});
