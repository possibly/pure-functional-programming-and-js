# Pure functional programming and not modifying arrays in JavaScript.
Pure functional programming hopes only to access copies of data provided by the data structures. With that data, new data structures can be built. The purpose of this is to have 'pure functions,' or functions with no side effects. A side effect is data or a data structure that is outside a functions scope, but is modified by the function. If a function is pure and has no side effects it becomes much easier to test because it does not depend on outside state (side effects) in order to 'work properly,' among other benefits. 

Below is a survey of arrays in JavaScript and their relationship to pure functional programming. Much of what is done with arrays applies to JavaScript object's as well.

## Arrays
### Arrays copy variables as data into themselves.
```javascript
var array = [];
var local = 1;
array.push(local);  // The value of local, 1, is passed in to the array.
                    // The reference to the variable local, however, is not passed in to the array.
local++;
console.log(local); // 2
                    // The variable local has been mutated. 

console.log(array); // 1
                    // array[0] = 1, not array[0] = local = 1.
}
```

### Arrays provide copies of data to variables.
```javascript
var array = [1];      //array[0] = 1

var local = array[0]; // copy!
                      // local = 1, not local = array[0] = 1.

local++;              // local = 2.
console.log(array);   // array[0] = 1 still.
```

### Functions are passed copies of array values.
```javascript
function fun(x){    // no reference to array in here!
  x = x + 1;
  return x;
}

var array = [1];    // array[0] = 1.
fun(array[0]);      // outputs 2.
                    // fun( 1 ) not fun( array[0] = 1 ).
console.log(array); // array[0] = 1 still.
```

### Utilizing these copies, it's very easy to make functions that modify only data and not data structures!
```javascript
function simplerMap(array, fun){
  var newArray = [];
  newArray.push( fun(array[0]) ); //mutate only a local array by adding a new value.
                                  //remember: array[0] gives it's value, 1, to the function.
                                  //array[0] does not pass array[0] = 1 to the function, so array remains unmodified.
  return newArray;
}

var oldArray = [1];
var myNewArray = simplerMap( oldArray, function(x){ return x+1; } ); // pass an array and a function to "simplerMap", get a new array.
                                                                     // oldArray remains unchanged.
```

## Side effects, pure and impure functions.

A pure function is one that does not modify or even look at anything other than the input it was given. For example, this is not a pure function:
```javascript
var sideEffect = 0;

function modifySideEffect(){
  return sideEffect += 1;
}

modifySideEffect() // returns sideEffect = 1.
                   // var sideEffect now equals 1 as well.
```

The output of the function `modifySideEffect` now depends on some global state, `sideEffect`. Imagine 5 more functions that all modify `sideEffect`. Following your program would become a nightmare since you would never know what function would output what! Unless you followed EXACTLY what the value of `sideEffect` was at any given moment, any one of these functions could output...anything. Now imagine following a program that has 5 side effects and 5 functions that modify each side effect. Chaos.

A quick fix can completely prevent this nightmare:
```javascript
var sideEffect = 0;

function modifySideEffect(input){
  return input += 1;
}

var output = modifySideEffect(sideEffect) // returns 1, not sideEffect = 1.
                                          // output = 1. sideEffect = 0.
```

Now modifySideEffect only depends on its input and not the state of sideEffect explicitly, just the value of its input. Testing modifySideEffect() is much simpler now since it doesn't depend on some side effect that the test has to additionally account for. One still has to worry about what `sideEffect` equals, since it is the input of modifySideEffect, but one does not have to worry about whether modifySideEffect works like it's supposed to.

## The difference between `forEach`, a necessarily impure function, and `map`, a pure function.

`forEach` necessarily does something to modify side effects. The side effect is often the array it was called on it self, or else it is some other side effect.
```javascript
function addOne(valueFromArray, index, sideEffectArray){ 
  return valueInArray + 1; // returns 1 + 1, for example, but forEach does not produce a new array to capture this value.
                           // 1 + 1 is simply not saved anywhere.
                           // What would happen if instead of just returning 1 + 1, we created a new array and returned that array?
}

function sideEffectAddOne(valueFromArray, index, sideEffectArray){ 
  return sideEffectArray[index] += 1; // 1 + 1 is saved inside the array that .forEach was called on.
}

var array = [1,2,3];
array.forEach( addOne );          // array is still [1,2,3].
array.forEach( sideEffectAddOne ) // array has been mutated to [2,3,4].
```

`forEach` is like a method of an object that is intended to modify that objects state.

`map`, on the other hand, does not necessarily modify any side effects, and just produces a new array.
```javascript
function addOne(value){
  return value+1;
}

var array = [1,2,3];
var newArray = array.map( addOne ); // outputs a new array.
console.log(array);                 // array still equals [1,2,3].
console.log(newArray);              // newArray equals [2,3,4].
                                    // All of the data in newArray has no relationship to array.
```