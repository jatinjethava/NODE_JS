var n = 153;
let temp = n;
let sum = 0;

while (n > 0) {
    let r = n % 10;
    sum = sum + r * r * r;
    n = Math.floor(n / 10);
}

console.log("Armstrong Number:" + temp);
if (sum == temp) {
    console.log("Yes! It is a Armstrong Number");
} else {
    console.log("No! It is not a Armstrong Number");
}