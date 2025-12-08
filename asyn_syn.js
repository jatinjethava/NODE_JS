let a = "jatin";
let b = "dineshbhai";
let c = "jethava";

// console.log(a); //1

// setTimeout(() => {
//     console.log(b);
// }, 1000); //4

// console.log(c); //2

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("hellow");
    }, 2000);
});

p.then((message) => {
    console.log(message + " " + a);
}); //5

// console.log("End of File"); //3