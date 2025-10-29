// Інтерфейси
export interface IBook {
    id: string;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
    borrowedBy?: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    borrowedBooks: string[];
}

// Класи
export class Book implements IBook {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public year: number,
        public isBorrowed: boolean = false,
        public borrowedBy?: string
    ) {}

    getInfo(): string {
        return `${this.title} by ${this.author} (${this.year})`;
    }

    getFullInfo(): string {
        return `<span class="text-gray-400 text-sm">${this.id}: </span> ${this.title} by ${this.author} (${this.year})`;
    }

    borrow(userId: string): void {
        this.isBorrowed = true;
        this.borrowedBy = userId;
    }

    returnBook(): void {
        this.isBorrowed = false;
        this.borrowedBy = undefined;
    }
}

export class User implements IUser {
    public borrowedBooks: string[] = [];

    constructor(
        public id: string,
        public name: string,
        public email: string
    ) {}

    getInfo(): string {
        return `<span class="text-gray-400 text-sm">${this.id}: </span> ${this.name} (${this.email})`;
    }

    canBorrowMore(): boolean {
        return this.borrowedBooks.length < 3;
    }

    borrowBook(bookId: string): void {
        if (this.canBorrowMore()) {
            this.borrowedBooks.push(bookId);
        }
    }

    returnBook(bookId: string): void {
        this.borrowedBooks = this.borrowedBooks.filter(id => id !== bookId);
    }
}
