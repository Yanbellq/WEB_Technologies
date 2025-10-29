"use strict";
// Оновлений код з union типом
class Employee {
    name;
    age;
    salary;
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    getName() { return this.name; }
    getAge() { return this.age; }
    getSalary() { return this.salary; }
}
class Developer extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.1;
    }
    pay() {
        console.log(`Developer ${this.name} отримав зарплату: ${this.salary} грн + бонус: ${this.getAnnualBonus()} грн`);
    }
}
class Manager extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
    }
    getAnnualBonus() {
        return this.salary * 0.2;
    }
    pay() {
        console.log(`Manager ${this.name} отримав зарплату: ${this.salary} грн + бонус: ${this.getAnnualBonus()} грн`);
    }
}
// Оновлений масив з union типом
const employees = [
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
