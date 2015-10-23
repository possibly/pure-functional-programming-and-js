# How copies are retrieved from data structures in JavaScript.
Pure functional programming hopes only to access copies of data provided by the data structures. With that data, new data structures can be built. 

Below is how copies of the data are handled by arrays in JavaScript.

## Arrays
### Arrays copy variables as data into themselves.
```javascript
function test1(){
  var array = [];
  var local = 1;
  array.push(local); // copy! [1]
  local++; // 2
  console.log('variable value: '+local); // 2
  console.log('variable in array value: '+array); // 1
}
```

### Arrays provide copies of data to variables.
```javascript
function test2(){
  var array = [];
  array[0] = 1; // [1]
  console.log('variable in array value: '+array); // 1

  var local = array[0]; // copy! 1
  local++; // 2
  console.log('variable gotten from the array value: '+local); // 2
}
```

### Utilizing these copies, higher order functions can be made!
```javascript
function simpleMap(array, fun){
  var newArray = [];
  var local = array[0]; // copy! local = 1
  var functionValue = fun(local) // copy of local is made.
  console.log('local: '+local); // local is not modified. local = 1
  newArray.push(functionValue) // copy! newArray = [2]
  console.log('The wholly new array that also includes new data: '+newArray); // 2
  console.log('The old array, with its unmodified data: '+array); // still 1
  console.log('we could still modify local: '+(local+1)+', and still not modify array: '+array);
}

simpleMap([1], function(x){ return x+1; });
```

Of course, this could be condensed to:
```javascript
function simplerMap(array, fun){
  console.log( fun(array[0]) ); // 2
  console.log("array's values are not modified: "+array); // array = [1];
}

simplerMap([1], function(x){ return x+1; });
```