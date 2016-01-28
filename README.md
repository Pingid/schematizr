# schematizr
Schematisr is a lightweight library designed to help you modify deeply nested json. The api is purposely small, each function is curried making it easy to extend the library with functions more spesific to your project.

## Installation

```
npm install --save schematizr
```

## Usage

```javascript
import { assemble, disassemble, findById, find, filter } from 'schematizr';
```

Example data:

```javascript
const data = {
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
```

Convert the JSON into a the schema:

### `assemble(nestedJson)`

```javascript
const schema = assemble(data);

// { todoList: [
//     { _id: 1,
//       text: 'Exercise',
//       subList: [
//         { _id: 2,
//           text: '5k run' },
//         { _id: 3,
//           test: '30min stretch' }
//       ]
//     },
//     { _id: 4,
//       text: 'Trim nose hairs' }
//   ]
// }
```

Then we can access the different objects by using their unique id:

### `findById(callback, schema, id)`

```javascript
const increasedRun = findById(function(object) {
  return Object.assign({}, object, {
    text: '100k run'
  })
}, schema, 2)

// { todoList: [
//     { _id: 1,
//       text: 'Exercise',
//       subList: [
//         { _id: 2,
//           text: '100k run' },
//         { _id: 3,
//           test: '30min stretch' }
//       ]
//     },
//     { _id: 4,
//       text: 'Trim nose hairs' }
//   ]
// }
```
Disassemble removes id's and outputs schema to original structure:

### `disassemble(schema)`

```javascript
const out = disassemble(increasedRun)

// { todoList: [
//     { text: 'Exercise',
//       subList: [
//         { text: '100krun run' },
//         { test: '30min stretch' }
//       ]
//     },
//     { text: 'Trim nose hairs' }
//   ]
// }
```

We also have find, which works on any nested JSON and return for any value or object:

### `find(callback, nestedObject, findShape)`

```javascript
const increasedStretch = Find(function(object) {
  return { test: '60min stretch' }
}, data, { test: '30min stretch' })

// { todoList: [
//     { text: 'Exercise',
//       subList: [
//         { text: '5k run' },
//         { test: '60min stretch' }
//       ]
//     },
//     { text: 'Trim nose hairs' }
//   ]
// }
```

Filter takes a callback which gets all the values from the nested json and returns a boolean

### `filter(callback, nestedObject)`

```javascript
const removeRun = filter(function(value) {
  return value !== '5k run'
})
// { todoList: [
//     { text: 'Exercise',
//       subList: [
//         { test: '30min stretch' }
//       ]
//     },
//     { text: 'Trim nose hairs' }
//   ]
// }
```

Curried Example:

```javascript
const removeById = findById(function(object) {
  return null
}, schema)

const removedNoseTrimming = removeById(4)
// { todoList: [
//     { text: 'Exercise',
//       subList: [
//         { text: '5k run' },
//         { test: '30min stretch' }
//       ]
//     }
//   ]
// }

```
