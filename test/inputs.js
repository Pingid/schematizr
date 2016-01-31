export default {
  simple: [
    { name: 'null', input: null },
    { name: 'plainObject', input: {} },
    { name: 'array', input: [] },
    { name: 'string', input: '' },
    { name: 'number', input: 0 },
    { name: 'method', input: x => x }
  ],
  nested: [
    { name: 'plainObjects',
      input: {
        text: 'cool', more: { test: 'beans' }
      }
    },
    { name: 'arrays',
      input: [ 'cool',[ 'cheap', ['beans']]]
    },
    { name: 'arrays with nested object',
      input: [ 'cool',[ 'cheap', { text: 'beans' }]]
    }
  ],
  nestedObject: {
    todoList: [
      {  text: 'Exercise',
        subList: [
          { text: '5k run' },
          { test: '30min stretch' }
        ]
      },
      { text: 'Trim nose hairs' }
    ]
  },
  nestedArray: [ 'cool',[ 'cheap', ['beans']]]
}
