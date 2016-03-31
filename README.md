# schematizr
Schematizr is a lightweight library built to modify deeply nested JSON. It has been designed for easy function composition via currying and so has an intentionally small API. This means that instead of a large number of out of the box "use once" methods, schematizr only has enough to enable you to quickly build the functionality you need for your project and can stay small as a result.

## Installation

```
npm install --save schematizr
```

## Usage

```javascript
import { assemble, disassemble, map, findObjWith, find, filter } from 'schematizr';
```

Example data:

```javascript
const data = {
  todoList: [
    {  text: 'Exercise',
      subList: [
        { text: '5k run' },
        { text: '30min stretch' }
      ]
    },
    { text: 'Trim nose hairs' }
  ]
}
```

Adds a unique value to every object:

### `assemble(nestedJson, key = '___id')`

```javascript
const schemarised = assemble(data);

// { todoList: [
//     { __id: 1,
//       text: 'Exercise',
//       subList: [
//         { __id: 2,
//           text: '5k run' },
//         { __id: 3,
//           text: '30min stretch' }
//       ]
//     },
//     { __id: 4,
//       text: 'Trim nose hairs' }
//   ]
// }
```
Disassemble removes chosen key from all objects:

### `disassemble(nestedJson, key = '__id')`

```javascript
const deSchemarised = disassemble(schemarised);

// {
//   todoList: [
//     {  text: 'Exercise',
//       subList: [
//         { text: '5k run' },
//         { text: '30min stretch' }
//       ]
//     },
//     { text: 'Trim nose hairs' }
//   ]
// }
```
Maps over every value in the nested JSON

### `map(callback, nestedJson)`

```javascript
const capitalised = map((value) => {
  return typeof value === 'string' ? value.toUpperCase() : value
}, data);


// {
//   todoList: [
//     {
//       text: "EXERCISE",
//       subList: [
//         { text: "5K RUN" },
//         { text: "30MIN STRETCH" }
//       ]
//     },
//     { text: "TRIM NOSE HAIRS" }
//   ]
// }
```

Access objects by searching for key value pairs that the object contains:

### `findObjWith(callback, object, nestedJson)`

```javascript
const increasedRun = findById((object) => {
  return Object.assign({}, object, {
    text: '100k run'
  });
}, { __id: 2 }, schemarised);

// { todoList: [
//     { __id: 1,
//       text: 'Exercise',
//       subList: [
//         { __id: 2,
//           text: '100k run' },
//         { __id: 3,
//           text: '30min stretch' }
//       ]
//     },
//     { __id: 4,
//       text: 'Trim nose hairs' }
//   ]
// }
```

Find accepts a value and returns a matching value or object:

### `find(callback, value, nestedObject)`

```javascript
const increasedStretch = Find(function(object) {
  return { text: '60min stretch' };
}, { text: '30min stretch' }, data);

// { todoList: [
//     { text: 'Exercise',
//       subList: [
//         { text: '5k run' },
//         { text: '60min stretch' }
//       ]
//     },
//     { text: 'Trim nose hairs' }
//   ]
// }
```

Filter takes a callback which receives all the values from the JSON literal and returns a boolean

### `filter(callback, nestedObject)`

```javascript
const removeRun = filter(function(value) {
  return value !== '5k run';
});
// { todoList: [
//     { text: 'Exercise',
//       subList: [
//         { text: '30min stretch' }
//       ]
//     },
//     { text: 'Trim nose hairs' }
//   ]
// }
```

Curried Example:

```javascript
const removeObjectWith = findObjWith(function(object) {
  return null
}, schemarised)

const removedNoseTrimming = removeObjectWith({ __id : 4 });
// { todoList: [
//     { __id: 1,
//       text: 'Exercise',
//       subList: [
//         { __id: 2,
//           text: '100k run' },
//         { __id: 3,
//           text: '30min stretch' }
//       ]
//     }
//   ]
// }

```
