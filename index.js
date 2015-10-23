/*
* Pure functional programming hopes only to access the copies of data provided by
* the data structures and build new data structures with that data. Below is how
* arrays and data interact, and how copies of the data can be accessed in JavaScript.
*/

function test1(){
  console.log("test1 - Array's add a copy of a variable to themselves.");
  var array = [];
  var local = 1;
  array.push(local); // copy! [1]
  local++; // 2
  console.log('variable value: '+local); // 2
  console.log('variable in array value: '+array); // 1
}

function test2(){
  console.log("test2 - Array's express a copy of their data into a variable.")
  var array = [];
  array[0] = 1; // [1]
  console.log('variable in array value: '+array); // 1

  var local = array[0]; // copy! 1
  local++; // 2
  console.log('variable gotten from the array value: '+local); // 2
}

function simpleMap(array, fun){
  console.log("example 1 - A higher order function will use both test1 and test2 to it's advantage!");
  var newArray = [];
  var local = array[0]; // copy! 1
  var functionValue = fun(local) // no copy is made.
  newArray.push(functionValue) // copy!
  console.log('The wholly new array that also includes new data: '+newArray);
  console.log('The old array, with its unmodified data: '+array);
}

test1();
test2();
simpleMap([1], function(x){ return x+1; })