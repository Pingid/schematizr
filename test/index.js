import _ from 'ramda'
import { expect, should } from 'chai'
import findTests from './findTests'
import assembleTests from './assembleTests'

const schematizr = require('../lib/schema'),
    assemble = schematizr.assemble,
    disassemble = schematizr.disassemble,
    findById = schematizr.findById,
    find = schematizr.find,
    filter = schematizr.filter;

// Testing using chai
describe('schematizr', () => {
  describe('assemble', () =>  {
    assembleTests.equalities.forEach((test) => {
      console.log(test.inputData, assemble(test.inputData));
      it(test.name, () => {
        expect(assemble(test.inputData)).deep.equal(test.outputData)
      })
    })
    assembleTests.satisfy.forEach((test) => {
      it(test.name, () => {
        expect(assemble(test.inputData)).to.satisfy(test.method)
      })
    })
  })
  describe('findById', () => {
  })
  describe('find', () => {
    findTests.equalities.forEach((test) => {
      it(test.name, () => {
        expect(find(test.method, test.inputData, test.inputValue)).
          deep.equal(test.outputData)
      })
    })
    findTests
  })
  describe('disassemble', () => {
  })
  describe('filter', () => {
  })
})
