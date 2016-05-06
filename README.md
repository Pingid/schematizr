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
      sublist: [
        { text: '5k run' },
        { text: '30min stretch' }
      ]
    },
    { text: 'Trim nose hairs' }
  ]
}
```

Adds a unique value to every object:

### `assemble(nestedJson, key = '_$id')`

```javascript
const schemarised = assemble(data);

// {
//   todoList: [
//    { text: 'Exercise',
//      sublist: [
//        { text: '5k run', $id: 3 },
//        { text: '30min stretch', $id: 4 }
//      ],
//      $id: 2
//    },
//    { text: 'Trim nose hairs', $id: 5 }
//   ],
//   $id: 1
// }
```
Disassemble removes chosen key from all objects:

### `disassemble(nestedJson, key = '$id')`

```javascript
const deSchemarised = disassemble(schemarised);

// {
//   todoList: [
//     {  text: 'Exercise',
//       sublist: [
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
//       sublist: [
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
const increasedRun = findObjWith((object) => {
  return Object.assign({}, object, {
    text: '100k run'
  });
}, { $id: 2 }, schemarised);

// { todoList: [
//     { $id: 1,
//       text: 'Exercise',
//       sublist: [
//         { $id: 2,
//           text: '100k run' },
//         { $id: 3,
//           text: '30min stretch' }
//       ]
//     },
//     { $id: 4,
//       text: 'Trim nose hairs' }
//   ]
// }
```

Find accepts a value and returns a matching value or object:

### `find(callback, value, nestedObject)`

```javascript
const increasedStretch = find(function(object) {
  return '60min stretch';
}, '30min stretch' , data);

// { todoList: [
//     { text: 'Exercise',
//       sublist: [
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
//       sublist: [
//         { text: '30min stretch' }
//       ]
//     },
//     { text: 'Trim nose hairs' }
//   ]
// }
```

Curried Example:

```javascript
const removeSublists = map((value) => {
  if (value && value.sublist) {
    delete value['sublist']
    return value;
  }
  return value;
})

const removed = removeSublists(data)

// {
//   todoList: [
//    { text: 'Exercise' },
//    { text: 'Trim nose hairs' }
//   ]
// }

```
