
// TASK - 1

// part 1
console.log("Task - 1: \n\n");
function getMinMax(array) {
    if (array.length === 0) {
        return { min: null, max: null };
    }

    let min = array[0];
    let max = array[0];

    array.forEach((element) => {
        if (element < min) {
            min = element;
        }
        if (element > max) {
            max = element;
        }
    });

    return { min, max };
}

let array = [1, 2, 3, 4, 5];
let result = getMinMax(array);
console.log(`Min: ${result.min}, Max: ${result.max}`);


let minType = typeof result.min;
let maxType = typeof result.max;

console.log(`Type of min: ${minType}`);
console.log(`Type of max: ${maxType}`);


// part 2
function compareObjects(obj1, obj2) {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) { 
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}
let obj1 = { min: 1, max: 5 };
let obj2 = { min: 1, max: 5 };
let obj3 = { min: 2, max: 4 };

console.log(compareObjects(obj1, obj2)); 
console.log(compareObjects(obj1, obj3));


// Task - 2
// part 1
console.log("\n\nTask - 2: \n\n");
function isNumberInRange(number, range) {
    return number >= range.min && number <= range.max;
}

let range = { min: result.min, max: result.max };

console.log(isNumberInRange(0, range));
console.log(isNumberInRange(3, range));
console.log(isNumberInRange(5, range));
console.log(isNumberInRange(6, range));


// part 2
console.log("---------------------");

console.log(!isNumberInRange(0, range));
console.log(!!!!isNumberInRange(3, range));
console.log(!!isNumberInRange(5, range));
console.log(!!!isNumberInRange(6, range));

// Task - 3
console.log("\n\nTask - 3: \n\n");

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const mark = document.getElementById('mark').value;
    const month = document.getElementById('month').value.toLowerCase();

    let grade = (mark >= 1 && mark <= 3) ? `Mark: ${mark} - Незадовільно` :
                (mark >= 4 && mark <= 6) ? `Mark: ${mark} - Задовільно` :
                (mark >= 7 && mark <= 9) ? `Mark: ${mark} - Добре` :
                (mark >= 10 && mark <= 12) ? `Mark: ${mark} - Відмінно` :
                `Mark: ${mark} - Неправильна оцінка`;
    
    
    if (month == 'december' || month == 'january' || month == 'february') {
        console.log(`${grade}, Month: ${month} - Winter`);
    } else if (month == 'march' || month == 'april' || month == 'may') {
        console.log(`${grade}, Month: ${month} - Spring`);
    } else if (month == 'june' || month == 'july' || month == 'august') {
        console.log(`${grade}, Month: ${month} - Summer`);
    } else if (month == 'september' || month == 'october' || month == 'november') {
        console.log(`${grade}, Month: ${month} - Fall`);
    } else {
        console.log(`${grade}, Month: ${month} - Unknown`);
    }


});