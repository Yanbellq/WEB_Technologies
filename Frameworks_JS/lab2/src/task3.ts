type TypeBrand = "Mercedes-Benz" | "Audi" | "BMW";
type TypeChanges = {
    is_crashed: boolean;
    is_repaired: boolean;
    is_painted: boolean;
}
type TypeWorks = {
    name: string;
    type: 'repair' | 'painting' | 'tuning';
    price: number;
    is_done: boolean;
}

interface ICar {
    brand: TypeBrand;
    name: string;
    year: number;
    age: number;
    max_speed: number;
    color: string;
    changes?: TypeChanges;
    works?: TypeWorks[];

    show: () => string;
}
    
abstract class Car implements ICar {
    brand: TypeBrand;
    name: string;
    year: number;
    age: number;
    max_speed: number;
    color: string;
    changes?: TypeChanges;
    works?: TypeWorks[];

    constructor(brand: TypeBrand, name: string, year: number, age: number, max_speed: number, color: string, changes?: TypeChanges, works?: TypeWorks[]) {
        this.brand = brand;
        this.name = name;
        this.year = year;
        this.age = age;
        this.max_speed = max_speed;
        this.color = color;
        this.changes = changes;
        this.works = works;
    }

    show(): string {
        let changes_info = "";
        if (this.changes) {
            changes_info = `{\n\tIs crashed: ${this.changes.is_crashed}, \n\tIs repaired: ${this.changes.is_repaired}, \n\tIs painted: ${this.changes.is_painted}\n},`;
        }

        let works_info = "";
        if (this.works) {
            for (let work of this.works) {
                works_info += `\n\t  {\n\t     Name: ${work.name}, \n\t     Type: ${work.type}, \n\t     Price: ${work.price}, \n\t     Is_done: ${work.is_done}\n\t  },\n`;
            }
        }

        return `Brand: ${this.brand}, \nName: ${this.name}, \nYear: ${this.year}, \nAge: ${this.age}, \nMax speed: ${this.max_speed}, \nColor: ${this.color}, \nChanges: ${changes_info}, \nWorks: [${works_info}]\n\n`
    }
}

class Mercedes extends Car {
    constructor(name: string, year: number, age: number, max_speed: number, color: string, changes?: TypeChanges, works?: TypeWorks[]) {
        super("Mercedes-Benz", name, year, age, max_speed, color, changes, works);
    }
}

class Audi extends Car {
    constructor(name: string, year: number, age: number, max_speed: number, color: string, changes?: TypeChanges, works?: TypeWorks[]) {
        super("Audi", name, year, age, max_speed, color, changes, works);
    }
}

class BMW extends Car {
    constructor(name: string, year: number, age: number, max_speed: number, color: string, changes?: TypeChanges, works?: TypeWorks[]) {
        super("BMW", name, year, age, max_speed, color, changes, works);
    }
}

const c_class = new Mercedes(
    "C-Class", 
    2020, 
    5, 
    200, 
    "black", 
    {
        is_crashed: false, 
        is_repaired: true, 
        is_painted: false
    }, 
    [
        {
            name: "Engine repair", 
            type: "repair", 
            price: 1000, 
            is_done: false
        },
        {
            name: 'UFO light effect',
            type: 'tuning',
            price: 120,
            is_done: true
        }
    ]
);
console.log(c_class.show());


const e_class = new Mercedes(
    "E-Class", 
    2022, 
    3, 
    240, 
    "red", 
    {
        is_crashed: true, 
        is_repaired: true, 
        is_painted: true
    }, 
    [
        {
            name: "Body repair", 
            type: "repair", 
            price: 1000, 
            is_done: true
        },
        {
            name: 'Body repaint',
            type: 'painting',
            price: 500,
            is_done: true
        }
    ]
);
console.log(e_class.show());


const a4 = new Audi(
    "A4", 
    2021, 
    4, 
    220, 
    "white", 
    {
        is_crashed: true, 
        is_repaired: false, 
        is_painted: false
    }, 
    []
);
console.log(a4.show());


const rs7 = new Audi(
    "RS7", 
    2021, 
    4, 
    220, 
    "white", 
    {
        is_crashed: true, 
        is_repaired: false, 
        is_painted: true
    }, 
    [
        {
            name: "Body repaint", 
            type: "painting", 
            price: 1500, 
            is_done: false
        }
    ]
);
console.log(rs7.show());


const m3_touring = new BMW(
    "M3 Touring", 
    2022, 
    3, 
    250, 
    "red", 
    {
        is_crashed: false, 
        is_repaired: true, 
        is_painted: false
    }, 
    [
        {
            name: "Gearbox repair", 
            type: "repair", 
            price: 2000, 
            is_done: true
        }
    ]
);
console.log(m3_touring.show());


const x5 = new BMW(
    "X5", 
    2022, 
    3, 
    250, 
    "red", 
    {
        is_crashed: false, 
        is_repaired: true, 
        is_painted: false
    }, 
    [
        {
            name: "ECU change", 
            type: "repair", 
            price: 2000, 
            is_done: true
        }
    ]
);
console.log(x5.show());
