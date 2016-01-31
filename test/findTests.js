// Different inputs to test
import testInputs from './inputs'

// Test replaceing parent
const testPrim = () => {
  return testInputs.simple.map((input) => {
    return {
      name: 'find and replace root of ' + input.name,
      inputData: input.input,
      inputValue: input.input,
      method: (value) => 'changed',
      outputData: 'changed'
    }
  })
}

// Test replacing nested
const findDeep = [
  { name: 'find and replace nested value within object',
    inputData: testInputs.nestedObject,
    inputValue: '30min stretch',
    method: (value) => 'changed',
    outputData: {
      todoList: [
        {  text: 'Exercise',
          subList: [
            { text: '5k run' },
            { test: 'changed' }
          ]
        },
        { text: 'Trim nose hairs' }
      ]
    }
  },
  { name: 'find and replace nested value within array',
    inputData: testInputs.nestedObject.todoList,
    inputValue: '30min stretch',
    method: (value) => 'changed',
    outputData: [
      { text: 'Exercise',
        subList: [
          { text: '5k run' },
          { test: 'changed' }
        ]
      },
      { text: 'Trim nose hairs' }
    ]
  },
  { name: 'find and replace nested value within nested array',
    inputData: testInputs.nestedArray,
    inputValue: 'beans',
    method: (value) => 'changed',
    outputData: [ 'cool',[ 'cheap', ['changed']]]
  },

]
// Export an array of all the tests
export default {
  equalities: [].concat(testPrim(), findDeep)
}
