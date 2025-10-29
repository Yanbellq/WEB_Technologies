"use strict";
class Rectangle {
    shape_name;
    factor;
    params;
    constructor(shape_name, factor, params) {
        this.shape_name = shape_name;
        this.factor = factor;
        this.params = params;
    }
    scale(factor) {
        this.params.side_a *= factor;
        this.params.side_b *= factor;
    }
    getArea() {
        return this.params.side_a * this.params.side_b;
    }
    getPerimeter() {
        return 2 * (this.params.side_a + this.params.side_b);
    }
    getAll() {
        return `Shape name: ${this.shape_name}, side a: ${this.params.side_a}, side b: ${this.params.side_b}`;
    }
    getAllResults() {
        return `${this.getAll()}, area: ${this.getArea()}, perimeter: ${this.getPerimeter()}`;
    }
}
let rectangle = new Rectangle("rectangle", 1, { side_a: 2, side_b: 3 });
console.log(rectangle.getArea());
console.log(rectangle.getPerimeter());
console.log(rectangle.getAll());
console.log(rectangle.getAllResults());
rectangle.scale(2);
console.log(rectangle.getAllResults());
class Triangle {
    shape_name;
    factor;
    params;
    constructor(shape_name, factor, params) {
        this.shape_name = shape_name;
        this.factor = factor;
        this.params = params;
    }
    scale(factor) {
        this.params.side_a *= factor;
        this.params.side_b *= factor;
        this.params.side_c *= factor;
    }
    getArea() {
        return this.params.side_a * this.params.side_b / 2;
    }
    getPerimeter() {
        return this.params.side_a + this.params.side_b + this.params.side_c;
    }
    getAll() {
        return `Shape name: ${this.shape_name}, side a: ${this.params.side_a}, side b: ${this.params.side_b}, side c: ${this.params.side_c}`;
    }
    getAllResults() {
        return `${this.getAll()}, area: ${this.getArea()}, perimeter: ${this.getPerimeter()}`;
    }
}
let triangle = new Triangle("triangle", 1, { side_a: 2, side_b: 3, side_c: 4 });
console.log(triangle.getArea());
console.log(triangle.getPerimeter());
console.log(triangle.getAll());
console.log(triangle.getAllResults());
triangle.scale(2);
console.log(triangle.getAllResults());
class Circle {
    shape_name;
    factor;
    params;
    constructor(shape_name, factor, params) {
        this.shape_name = shape_name;
        this.factor = factor;
        this.params = params;
    }
    scale(factor) {
        this.params.radius *= factor;
    }
    getArea() {
        return this.params.num_pi * this.params.radius ** 2;
    }
    getPerimeter() {
        return 2 * this.params.num_pi * this.params.radius;
    }
    getAll() {
        return `Shape name: ${this.shape_name}, num pi: ${this.params.num_pi}, radius: ${this.params.radius}`;
    }
    getAllResults() {
        return `${this.getAll()}, area: ${this.getArea()}, perimeter: ${this.getPerimeter()}`;
    }
}
let circle = new Circle("circle", 1, { num_pi: 3.14, radius: 2 });
console.log(circle.getArea());
console.log(circle.getPerimeter());
console.log(circle.getAll());
console.log(circle.getAllResults());
circle.scale(2);
console.log(circle.getAllResults());
// Створення масиву фігур
const shapes = [
    new Rectangle("rectangle", 1, { side_a: 2, side_b: 3 }),
    new Triangle("triangle", 1, { side_a: 2, side_b: 3, side_c: 4 }),
    new Circle("circle", 1, { num_pi: 3.14, radius: 2 })
];
// Обчислення загальної площі та периметра
const totalArea = shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
const totalPerimeter = shapes.reduce((sum, shape) => sum + shape.getPerimeter(), 0);
console.log(`Загальна площа: ${totalArea.toFixed(2)}`);
console.log(`Загальний периметр: ${totalPerimeter.toFixed(2)}`);
