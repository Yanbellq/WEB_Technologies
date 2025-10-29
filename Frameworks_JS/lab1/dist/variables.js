"use strict";
const printFunc = (args) => {
    console.log(args);
};
const str = 'some text';
const num = 15;
const bool = true;
printFunc(str);
printFunc(num);
printFunc(bool);
// Arrays
const arrNum = [1, 2, 3, 4, 5];
const arrStr = ['a', 'b', 'c', 'd', 'e'];
printFunc(arrNum);
printFunc(arrStr);
const userData = ['123', 'Yanbellq | Max', true];
printFunc(userData);
function exampleFunction(text, num = 10) {
    console.log(`Text: ${text}, Number: ${num}`);
}
exampleFunction('Hello, world!');
exampleFunction('Hello, world!', 20);
function calculateIceCreamCost() {
    var _a, _b;
    const sizePrices = {
        small: 10,
        large: 25
    };
    const toppingPrices = {
        chocolate: 5,
        caramel: 6,
        berries: 10
    };
    const marshmallowPrice = 5;
    const sizeInput = (_a = prompt("Enter ice cream size (small or large):")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!sizeInput || !(sizeInput in sizePrices)) {
        console.log("Invalid size selected.");
        return;
    }
    const toppingsInput = prompt("Enter toppings separated by commas (chocolate, caramel, berries):");
    if (!toppingsInput) {
        console.log("At least one topping must be selected.");
        return;
    }
    const toppings = toppingsInput.toLowerCase().split(",").map(t => t.trim()).filter(t => t in toppingPrices);
    if (toppings.length === 0) {
        console.log("At least one valid topping must be selected.");
        return;
    }
    const marshmallowInput = (_b = prompt("Add marshmallow? (yes or no):")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    const addMarshmallow = marshmallowInput === "yes";
    let totalCost = sizePrices[sizeInput];
    for (const topping of toppings) {
        totalCost += toppingPrices[topping];
    }
    if (addMarshmallow) {
        totalCost += marshmallowPrice;
    }
    console.log(`Total ice cream cost: ${totalCost} UAH`);
}
// Example call
calculateIceCreamCost();
