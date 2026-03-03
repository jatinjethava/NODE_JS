let n = 6;
let num = n;
let sum = 0;

for (let i = 1; i < num; i++) {
    if (num % i === 0) {
        sum += i;
    }
}

if (num === sum) {
    console.log("Number Is Perfect.");
} else {
    console.log("Number Is Not Perfect.")
}