interface IAnimal {
    name: string;
    move_type: string;
    is_cute?: boolean;
    makeSound: () => string;
}

class Cat implements IAnimal {
    name: string;
    move_type: string;
    is_cute?: boolean;

    constructor(name: string, move_type: string, is_cute?: boolean) {
        this.name = name;
        this.move_type = move_type;
        this.is_cute = is_cute;
    }

    makeSound(): string {
        return "Meow";
    }
}

class Bird implements IAnimal {
    name: string;
    move_type: string;
    is_cute?: boolean;

    constructor(name: string, move_type: string, is_cute?: boolean) {
        this.name = name;
        this.move_type = move_type;
        this.is_cute = is_cute;
    }

    makeSound(): string {
        return "Chirp";
    }
}

class Fish implements IAnimal {
    name: string;
    move_type: string;
    is_cute?: boolean;

    constructor(name: string, move_type: string, is_cute?: boolean) {
        this.name = name;
        this.move_type = move_type;
        this.is_cute = is_cute;
    }

    makeSound(): string {
        return "Blub";
    }
}