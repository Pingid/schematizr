'use strict';

var _ = require('ramda');
var expect = require('chai').expect;
var should = require('chai').should();

var schematizr = require('../lib/schema'),
    assemble = schematizr.assemble,
    disassemble = schematizr.disassemble,
    findById = schematizr.findById,
    find = schematizr.find,
    filter = schematizr.filter;

// Dummy data
var data = {
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

// Testing data
var schema = assemble(data)

var foundWithId = findById((object) => {
  return Object.assign({}, object, {
    text: '10k run'
  })
}, schema, 3)

var found = find((value) => {
  return '5k run'
}, foundWithId, '10k run')

var disassembled = disassemble(found)

var filtered = filter((x) => x !== '5k run', data)

// Loging
// console.log(JSON.stringify(schema, null, 2));
// console.log(JSON.stringify(disassembled, null, 2));
// console.log(JSON.stringify(foundWithId, null, 2));
// console.log(JSON.stringify(found, null, 2));
// console.log(JSON.stringify(filtered, null, 2));

// Testing using chai
describe('schematizr', function() {

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
  describe('findById', function() {
    it('Replaced text 2 deep in JSON nest with 10k run', function() {
      expect(foundWithId.todoList[0].subList[0].text).to.equal('10k run')
    })
  })
  describe('find', function() {
    it('Replace 10k run with 5k run the original value', function() {
      expect(found).deep.equal(schema)
    })
  })
  describe('disassemble', function() {
    it('Disassembled is equal to original', function(){
      expect(disassembled).deep.equal(data)
    })
  })
  describe('filter', function() {
    it('Remove 5k run from JSON', function() {
      expect(filtered.todoList[0].subList.length).to.equal(1)
    })
  })
})
