# schematizr
Schematizr is a lightweight library built to modify deeply nested JSON. It has been designed for easy function composition via currying and so has an intentionally small API. This means that instead of a large number of out of the box "use once" methods, schematizr only has enough to enable you to quickly build the functionality you need for your project and can stay small as a result.

## Installation

```
npm install --save schematizr
```

## API
Function | Paramters | Description
-------------|-----------------------|--------------------------------------------------
**assemble** | (JSON, key='$id') | Takes an JSON literal and a key which defaults to $id and adds it, along with a value which is an unique number to each object.
**disassemble** | (JSON, key='$id') | Takes an JSON literal and a key which defaults to $id and removes the key from each object.
**map** | (Function, JSON) | Takes a callback which receives all the values in the JSON literal and returns a new value.
**find** | (Function, Value, JSON) | Takes a callback and a value. The callback receives any values which match the given value and returns a new value.
**findObjWith** | (Function, Shape,JSON) | Takes a callback and a shape. The shape is an object with key, value pairs. The callback receives any objects which contain the key, value pairs specified in the shape and returns a new object. 
**filter** | (Function, JSON) | Takes a callback which receives all the values from the JSON literal and returns a boolean.

## Usage

```javascript
import { assemble, disassemble, map, findObjWith, find, filter } from 'schematizr';

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

### `assemble(nestedJson, key = '_$id')`
---
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

### `disassemble(nestedJson, key = '$id')`
---
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

### `map(callback, nestedJson)`
---
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

### `findObjWith(callback, object, nestedJson)`
---
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

### `find(callback, value, nestedObject)`
---
```javascript
const increasedStretch = find(function(value) {
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

### `filter(callback, nestedObject)`
---
```javascript
const removeRun = filter(function(value) {
  return value !== '5k run';
}, data);
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

#### Curried Example:
---
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
