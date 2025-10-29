const printFunc = <T>(args: T) => {
    console.log(args);
}


const str: string = 'some text'
const num: number = 15
const bool: boolean = true


printFunc<string>(str)
printFunc<number>(num)
printFunc<boolean>(bool)



// Arrays
const arrNum: number[] = [1, 2, 3, 4, 5]
const arrStr: string[] = ['a', 'b', 'c', 'd', 'e']

printFunc<number[]>(arrNum)
printFunc<string[]>(arrStr)


type UserData = [id: string, name: string, isLogined: boolean]
const userData: UserData = ['123', 'Yanbellq | Max', true]

printFunc<UserData>(userData)


function exampleFunction(text: string, num: number = 10): void {
    console.log(`Text: ${text}, Number: ${num}`);
}

exampleFunction('Hello, world!')
exampleFunction('Hello, world!', 20)


function calculateIceCreamCost(): void {
    const sizePrices: {[key: string]: number} = {
        small: 10,
        large: 25
    };

    const toppingPrices: {[key: string]: number} = {
        chocolate: 5,
        caramel: 6,
        berries: 10
    };

    const marshmallowPrice = 5;

    const sizeInput = prompt("Enter ice cream size (small or large):")?.toLowerCase();
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

    const marshmallowInput = prompt("Add marshmallow? (yes or no):")?.toLowerCase();
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


const toStr = (a: number, b: number): string => {
    return `${a} + ${b} = ${a + b}`
}