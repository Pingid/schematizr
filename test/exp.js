var schematizr = require('../lib/schema'),
    assemble = schematizr.assemble,
    disassemble = schematizr.disassemble,
    findById = schematizr.findById,
    find = schematizr.find;

var testData = {
  todoList: [
    {  text: 'Exercise',
      subList: [
        { text: '5k run' },
        { test: '30min stretch' }
      ]
    },
    { text: 'Trim nose hairs' }
  ]
}

function hasUniqueIds(schema) {
  if(
    schema._id &&
    schema.todoList[0]._id &&
    schema.todoList[1]._id &&
    schema.todoList[0].subList[0]._id &&
    schema.todoList[0].subList[1]._id) {
    return true
  }
  return false
}

console.log(hasUniqueIds(assemble(testData)))
