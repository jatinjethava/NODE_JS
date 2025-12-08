let a = 0;
let b = 1;
let n = 8;

console.log("Fibbonacci Series:");
console.log(a);
console.log(b);
for (let i = 2; i < n; i++) {
    let c = a + b;
    console.log(c);
    a = b;
    b = c;
}
