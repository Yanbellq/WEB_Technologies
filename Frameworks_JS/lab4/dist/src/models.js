"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = void 0;
class Book {
    id;
    title;
    author;
    year;
    isBorrowed;
    borrowedBy;
    constructor(id, title, author, year, isBorrowed = false, borrowedBy) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = isBorrowed;
        this.borrowedBy = borrowedBy;
    }
    getInfo() {
        return `${this.title} by ${this.author} (${this.year})`;
    }
    getFullInfo() {
        return `<span class="text-gray-400 text-sm">${this.id}: </span> ${this.title} by ${this.author} (${this.year})`;
    }
    borrow(userId) {
        this.isBorrowed = true;
        this.borrowedBy = userId;
    }
    returnBook() {
        this.isBorrowed = false;
        this.borrowedBy = undefined;
    }
}
exports.Book = Book;
class User {
    id;
    name;
    email;
    borrowedBooks = [];
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    getInfo() {
        return `<span class="text-gray-400 text-sm">${this.id}: </span> ${this.name} (${this.email})`;
    }
    canBorrowMore() {
        return this.borrowedBooks.length < 3;
    }
    borrowBook(bookId) {
        if (this.canBorrowMore()) {
            this.borrowedBooks.push(bookId);
        }
    }
    returnBook(bookId) {
        this.borrowedBooks = this.borrowedBooks.filter(id => id !== bookId);
    }
}
exports.User = User;
//# sourceMappingURL=models.js.map