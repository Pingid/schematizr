# schematizr
Schematisr is a functional library which converts deeply nested JSON to a schema which is easily editable.

## Installation

```
npm install --save schematizr
```

Schematisr takes deeply nested JSON and adds an id to each object. It also comes with functions such as find and findById which can be used to add, delete or modify sections of the JSON. The `findById` and `find` are both curried meaning you can partial apply the functions.

## Assembling and disassembling the JSON

## Usage

```javascript
import { assemble, disassemble, findById, find } from 'schematizr';
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
//         { text: '5krun run' },
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
  return
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
