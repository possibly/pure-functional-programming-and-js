/*
* Pure functional programming hopes only to access the copies of data provided by
* the data structures and build new data structures with that data. Below is how
* arrays and data interact, and how copies of the data can be accessed in JavaScript.
*/

function test1(){
  console.log("test1 - Array's add a copy of a variable to themselves.");
  var array = [];
  var local = 1;
  array.push(local);
  local++;
  console.log('variable value: '+local);
  console.log('variable in array value: '+array);
}

function test2(){
  console.log("test2 - Array's express a copy of their data into a variable.")
  var array = [];
  array[0] = 1;
  console.log('variable in array value: '+array);

  var local = array[0];
  local++;
  console.log('variable gotten from the array value: '+local);
}

test1();
test2();