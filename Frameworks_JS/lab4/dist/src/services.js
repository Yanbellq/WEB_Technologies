"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = void 0;
const models_1 = require("./models");
const library_1 = require("./library");
const storage_1 = require("./storage");
var LibraryService;
(function (LibraryService) {
    const booksLibrary = new library_1.Library();
    const usersLibrary = new library_1.Library();
    const booksStorage = new storage_1.StorageService('books');
    const usersStorage = new storage_1.StorageService('users');
    let userIdCounter = 1;
    function generateUserId() {
        const users = getAllUsers();
        if (users.length === 0) {
            userIdCounter = 1;
        }
        else {
            const maxId = users.reduce((max, user) => {
                const numId = parseInt(user.id);
                return isNaN(numId) ? max : Math.max(max, numId);
            }, 0);
            userIdCounter = maxId + 1;
        }
        return userIdCounter.toString();
    }
    LibraryService.generateUserId = generateUserId;
    function initializeData() {
        const savedBooks = booksStorage.load();
        const savedUsers = usersStorage.load();
        if (savedBooks) {
            savedBooks.forEach(bookData => {
                const book = new models_1.Book(bookData.id, bookData.title, bookData.author, bookData.year, bookData.isBorrowed, bookData.borrowedBy);
                booksLibrary.add(book);
            });
        }
        if (savedUsers) {
            savedUsers.forEach(userData => {
                const user = new models_1.User(userData.id, userData.name, userData.email);
                user.borrowedBooks = userData.borrowedBooks || [];
                usersLibrary.add(user);
            });
        }
    }
    LibraryService.initializeData = initializeData;
    function addBook(book) {
        booksLibrary.add(book);
        saveBooks();
    }
    LibraryService.addBook = addBook;
    function removeBook(id) {
        const book = booksLibrary.remove(id);
        if (book) {
            saveBooks();
        }
        return book;
    }
    LibraryService.removeBook = removeBook;
    function getBook(id) {
        return booksLibrary.findById(id);
    }
    LibraryService.getBook = getBook;
    function getAllBooks() {
        return booksLibrary.findAll();
    }
    LibraryService.getAllBooks = getAllBooks;
    function addUser(user) {
        usersLibrary.add(user);
        saveUsers();
    }
    LibraryService.addUser = addUser;
    function removeUser(id) {
        const user = usersLibrary.remove(id);
        if (user) {
            saveUsers();
        }
        return user;
    }
    LibraryService.removeUser = removeUser;
    function getUser(id) {
        return usersLibrary.findById(id);
    }
    LibraryService.getUser = getUser;
    function getAllUsers() {
        return usersLibrary.findAll();
    }
    LibraryService.getAllUsers = getAllUsers;
    function borrowBook(bookId, userId) {
        const book = getBook(bookId);
        const user = getUser(userId);
        if (!book || !user) {
            return { success: false, message: 'Книга або користувач не знайдені.' };
        }
        if (book.isBorrowed) {
            return { success: false, message: 'Книга вже позичена.' };
        }
        if (!user.canBorrowMore()) {
            return {
                success: false,
                message: 'Користувач досяг ліміту позичених книг (максимум 3).',
            };
        }
        book.borrow(userId);
        user.borrowBook(bookId);
        saveBooks();
        saveUsers();
        return {
            success: true,
            message: `${book.getInfo()} has been borrowed by\n${user.getInfo()}.`,
        };
    }
    LibraryService.borrowBook = borrowBook;
    function returnBook(bookId) {
        const book = getBook(bookId);
        if (!book) {
            return { success: false, message: 'Книга не знайдена.' };
        }
        if (!book.isBorrowed) {
            return { success: false, message: 'Книга не позичена.' };
        }
        const userId = book.borrowedBy;
        const user = userId ? getUser(userId) : undefined;
        book.returnBook();
        if (user) {
            user.returnBook(bookId);
        }
        saveBooks();
        saveUsers();
        return {
            success: true,
            message: `${book.getInfo()} has been returned.`,
        };
    }
    LibraryService.returnBook = returnBook;
    function searchBooks(query) {
        const lowerQuery = query.toLowerCase();
        return getAllBooks().filter(book => book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery));
    }
    LibraryService.searchBooks = searchBooks;
    function saveBooks() {
        booksStorage.save(booksLibrary.findAll());
    }
    function saveUsers() {
        usersStorage.save(usersLibrary.findAll());
    }
})(LibraryService || (exports.LibraryService = LibraryService = {}));
//# sourceMappingURL=services.js.map