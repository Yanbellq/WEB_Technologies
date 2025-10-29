// Task - 1
console.log("Task - 1\n\n");

function fib(n) {
    let a = 0;
    let b = 1;

    let i = 0;
    while (i != n) {
        let c = a + b;
        a = b;
        b = c;
        ++i;
    }

    return c;
}

console.log(fib(11));


// Task - 2
console.log("\n\nTask - 2\n\n");

const sum = (n) => {
    let result = 0;
    for (let i = 0; i < n; i++)
        result += n
    
    return result;
}

console.log(sum(5));
