import _ from 'ramda'
import testInputs from './inputs'

const testForIds = (json) => {
  let outCome = true;
  const iterate = (object) => {
    if(_.type(object) === 'Object') {
      if (!object._id) {
        outCome = false
        return object
      }
      return _.mapObjIndexed(iterate, object)
    } else if (_.type(object) === 'Array') {
      return _.map(iterate, object)
    }
    return object
  }
  iterate(json);
  return outCome
}

const testPrim = () => {
  return testInputs.simple.map((test) => {
    return {
      name: 'assemble ' + test.name,
      inputData: test.input,
      outputData: test.input
    }
  })
}

const hasIds = () => {
  return testInputs.nested.map((test) => {
    return {
      name: 'nested ' + test.name + ' has id on each object',
      inputData: test.input,
      method: testForIds
    }
  })
}
export default {
  equalities: testPrim(),
  satisfy: hasIds()
}
