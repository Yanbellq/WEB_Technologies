"use strict";
class Cat {
    name;
    move_type;
    is_cute;
    constructor(name, move_type, is_cute) {
        this.name = name;
        this.move_type = move_type;
        this.is_cute = is_cute;
    }
    makeSound() {
        return "Meow";
    }
}
class Bird {
    name;
    move_type;
    is_cute;
    constructor(name, move_type, is_cute) {
        this.name = name;
        this.move_type = move_type;
        this.is_cute = is_cute;
    }
    makeSound() {
        return "Chirp";
    }
}
class Fish {
    name;
    move_type;
    is_cute;
    constructor(name, move_type, is_cute) {
        this.name = name;
        this.move_type = move_type;
        this.is_cute = is_cute;
    }
    makeSound() {
        return "Blub";
    }
}
