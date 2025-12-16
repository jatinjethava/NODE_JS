// this is from import.js
// const data = require('./export');

// console.log(data.x);
// console.log(data.y);
// console.log(data.z());

// let arr = [1, 2, 3, 4, 5];
// let [first, second, ...rest] = arr;
// console.log(first);  // 1
// console.log(second);  // 2
// console.log(rest);    // [3, 4, 5]

// let obj = { a: 1, b: 2, c: 3 };
// let { a, ...others } = obj;
// console.log(a);
// console.log(others);  // { b: 2, c: 3 }
// module.exports = {
//     a: 1,
//     b: 2,
//     c: 3
// }
//Because Node.js uses the CommonJS module system.Node.js exports empty object by default if you do not set ( module.exports ).


// == Comparison of Regular Functions and Arrow Functions ==

// let arr = [10, 20, 30, 40, 50];
// arr.filter(function (x) {
//     return x > 25;
// }).map(function (x) {
//     return x * 2;
// }).forEach(function (x) {
//     console.log(x);
// });

// let result = arr.filter(x => x > 25)
//     .map(x => x * 2)
//     .forEach(x => console.log(x));

// console.log(result);
// Arrow functions provide a more concise syntax and lexically bind the this value.

// 1. Lexical this Binding
// function Counter() {
//     this.count = 0;
//     setInterval(() => {
//         this.count++;
//         console.log(this.count);
//     }, 1000);
// }
// let counter = new Counter();

// function Person(name) {
//     this.name = name;
// }
// Person.prototype.sayHello = function () {
//     console.log("Hello, my name is " + this.name);
// }
// let name = new Person("jatin jethava");
// name.sayHello();  // Hello, my name is Alice
// Arrow function cannot be used as constructors and will throw an error if you try to use them with the new keyword.

// ------------------------------------------------------------------------
// let Bob = (name) => {
//     this.name = name;
// }
// let bob = new Bob("Bob");  // TypeError: Bob is not a constructor
// bob.sayHello();
// ------------------------------------------------------------------------

// 2. No arguments Object
// function showArguments() {
//     console.log(arguments);
// }
// showArguments(1, 2, 3);  // [1, 2, 3]

// let showArgs = () => {
//     console.log(arguments);
// }
// showArgs(1, 2, 3);  // ReferenceError: arguments is not defined
// // Arrow functions do not have their own arguments object. If you need to access the arguments of an arrow function, you can use rest parameters instead.

// let showArgsRest = (...args) => {
//     console.log(args);
// }
// showArgsRest(1, 2, 3);  // [1, 2, 3]

// ==================================================================================
// === Comparison of Regular Functions and Arrow Functions ===
// Arrow functions do not have their own this context; they inherit it from the enclosing scope.
// Regular functions have their own this context, which can change based on how the function is called.
// Regular functions have their own arguments object, while arrow functions do not.
// Rest parameters can be used in arrow functions to access arguments.
// Regular functions can be used as constructors with the new keyword, while arrow functions cannot.
// Arrow functions cannot be used as constructors and will throw an error if you try to use them with the new keyword.
// Arrow functions provide a more concise syntax for writing functions.==================================================================================

