var n = 121;
let temp = n;
let sum = 0;

while (n > 0) {
    let r = n % 10;
    sum = sum * 10 + r;
    n = Math.floor(n / 10);
}

console.log("Palindrome Number:" + temp);
if (sum == temp) {
    console.log("Yes! It is a Palindrome Number");
} else {
    console.log("No! It is not a Palindrome Number");
}