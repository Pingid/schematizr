'use strict';

var _ = require('ramda');
var expect = require('chai').expect;
var should = require('chai').should();

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

describe('schematizr', function() {
  var schema = assemble(testData)
  var disassembled = disassemble(schema)
  var found = findById((x) => 'FOUND', schema)
  console.log(JSON.stringify(schema, null, 2));
  console.log(JSON.stringify(disassembled, null, 2));
  // console.log(JSON.stringify(found(2), null, 2));
  describe('assemble', function() {
    it('Outer object has _id key', function() {
      expect(schema).to.include.keys('_id')
    })
    it('Nested objects have _id keys', function(){
      expect(schema.todoList[0]).to.include.keys('_id')
      expect(schema.todoList[1]).to.include.keys('_id')
      expect(schema.todoList[0].subList[0]).to.include.keys('_id')
      expect(schema.todoList[0].subList[1]).to.include.keys('_id')
    })
  })

  describe('disassemble', function() {
    it('Disassembled is equal to original', function(){
      expect(disassembled).to.satisfy(_.equals(testData))
    })
  })

  // describe('findById', function() {
  //   it('Should return FOUND', function() {
  //     expect(found(2)).to.satisfy(functio(x){ return x.todoList === 'FOUND'})
  //   })
  // })
})
