// Оновлений код з union типом
abstract class Employee {
    protected name: string;
    protected age: number;
    protected salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    abstract getAnnualBonus(): number;

    getName(): string { return this.name; }
    getAge(): number { return this.age; }
    getSalary(): number { return this.salary; }
}

interface Payable {
    pay(): void;
}

class Developer extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    getAnnualBonus(): number {
        return this.salary * 0.1;
    }

    pay(): void {
        console.log(`Developer ${this.name} отримав зарплату: ${this.salary} грн + бонус: ${this.getAnnualBonus()} грн`);
    }
}

class Manager extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    getAnnualBonus(): number {
        return this.salary * 0.2;
    }

    pay(): void {
        console.log(`Manager ${this.name} отримав зарплату: ${this.salary} грн + бонус: ${this.getAnnualBonus()} грн`);
    }
}

// Створення union типу для співробітників, які реалізують Payable
type PayableEmployee = Developer | Manager;

// Оновлений масив з union типом
const employees: PayableEmployee[] = [
    new Developer("Олександр", 28, 50000),
    new Developer("Марія", 25, 45000),
    new Manager("Ігор", 35, 80000),
    new Manager("Анна", 32, 75000),
    new Developer("Петро", 30, 55000)
];

let totalAnnualBonus = 0;

console.log("=== Інформація про співробітників ===");
employees.forEach((employee, index) => {
    const bonus = employee.getAnnualBonus();
    totalAnnualBonus += bonus;
    
    console.log(`${index + 1}. ${employee.getName()} (${employee.constructor.name})`);
    console.log(`   Вік: ${employee.getAge()}, Зарплата: ${employee.getSalary()} грн`);
    console.log(`   Річний бонус: ${bonus} грн`);
    
    // Тепер TypeScript знає, що employee реалізує Payable
    employee.pay();
    console.log("---");
});

console.log(`\n=== Підсумок ===`);
console.log(`Загальна кількість співробітників: ${employees.length}`);
console.log(`Загальна річна сума бонусів: ${totalAnnualBonus} грн`);
