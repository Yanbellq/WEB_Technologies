"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const services_1 = require("./services");
const validation_1 = require("./validation");
const modal_1 = require("./modal");
class LibraryApp {
    modal;
    currentPage = { books: 1, users: 1 };
    itemsPerPage = 5;
    searchQuery = '';
    constructor() {
        this.modal = new modal_1.Modal();
        services_1.LibraryService.initializeData();
        this.initializeEventListeners();
        this.render();
    }
    initializeEventListeners() {
        const bookForm = document.getElementById('bookForm');
        bookForm.addEventListener('submit', e => {
            e.preventDefault();
            this.handleAddBook();
        });
        const userForm = document.getElementById('userForm');
        userForm.addEventListener('submit', e => {
            e.preventDefault();
            this.handleAddUser();
        });
        const searchBtn = document.getElementById('searchBtn');
        searchBtn?.addEventListener('click', () => this.handleSearch());
        const clearSearchBtn = document.getElementById('clearSearchBtn');
        clearSearchBtn?.addEventListener('click', () => this.handleClearSearch());
        const searchInput = document.getElementById('searchInput');
        searchInput?.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }
    handleAddBook() {
        const titleInput = document.getElementById('bookTitle');
        const authorInput = document.getElementById('bookAuthor');
        const yearInput = document.getElementById('bookYear');
        const validation = validation_1.Validator.validateBook(titleInput.value, authorInput.value, yearInput.value);
        this.clearErrors(['bookTitle', 'bookAuthor', 'bookYear']);
        if (!validation.isValid) {
            this.showErrors({
                bookTitle: validation.errors.title,
                bookAuthor: validation.errors.author,
                bookYear: validation.errors.year,
            });
            return;
        }
        const book = new models_1.Book(Date.now().toString(), titleInput.value.trim(), authorInput.value.trim(), parseInt(yearInput.value));
        services_1.LibraryService.addBook(book);
        this.modal.showAlert('Книга успішно додана!');
        titleInput.value = '';
        authorInput.value = '';
        yearInput.value = '';
        this.render();
    }
    handleAddUser() {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const validation = validation_1.Validator.validateUser(nameInput.value, emailInput.value);
        this.clearErrors(['userName', 'userEmail']);
        if (!validation.isValid) {
            this.showErrors({
                userName: validation.errors.name,
                userEmail: validation.errors.email,
            });
            return;
        }
        const userId = services_1.LibraryService.generateUserId();
        const user = new models_1.User(userId, nameInput.value.trim(), emailInput.value.trim());
        services_1.LibraryService.addUser(user);
        this.modal.showAlert('Користувача успішно додано!');
        nameInput.value = '';
        emailInput.value = '';
        this.render();
    }
    handleBorrowBook(bookId) {
        const book = services_1.LibraryService.getBook(bookId);
        if (!book)
            return;
        this.modal.showBorrowModal(book.getInfo(), userId => {
            const result = services_1.LibraryService.borrowBook(bookId, userId);
            this.modal.showAlert(result.message);
            if (result.success) {
                this.render();
            }
        });
    }
    handleReturnBook(bookId) {
        const result = services_1.LibraryService.returnBook(bookId);
        this.modal.showAlert(result.message);
        if (result.success) {
            this.render();
        }
    }
    handleDeleteBook(bookId) {
        const book = services_1.LibraryService.getBook(bookId);
        if (!book)
            return;
        this.modal.showConfirm(`Ви впевнені, що хочете видалити книгу "${book.title}"?`, () => {
            services_1.LibraryService.removeBook(bookId);
            this.modal.showAlert('Книга видалена!');
            this.render();
        });
    }
    handleDeleteUser(userId) {
        const user = services_1.LibraryService.getUser(userId);
        if (!user)
            return;
        if (user.borrowedBooks.length > 0) {
            this.modal.showAlert('Неможливо видалити користувача, який має позичені книги!');
            return;
        }
        this.modal.showConfirm(`Ви впевнені, що хочете видалити користувача "${user.name}"?`, () => {
            services_1.LibraryService.removeUser(userId);
            this.modal.showAlert('Користувача видалено!');
            this.render();
        });
    }
    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        this.searchQuery = searchInput.value.trim();
        this.currentPage.books = 1;
        this.render();
    }
    handleClearSearch() {
        this.searchQuery = '';
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        this.currentPage.books = 1;
        this.render();
    }
    showErrors(errors) {
        Object.keys(errors).forEach(key => {
            if (errors[key]) {
                const errorElement = document.getElementById(`${key}Error`);
                const inputElement = document.getElementById(key);
                if (errorElement && inputElement) {
                    errorElement.textContent = errors[key];
                    errorElement.classList.remove('hidden');
                    inputElement.classList.add('border-red-500');
                }
            }
        });
    }
    clearErrors(fields) {
        fields.forEach(field => {
            const errorElement = document.getElementById(`${field}Error`);
            const inputElement = document.getElementById(field);
            if (errorElement && inputElement) {
                errorElement.textContent = '';
                errorElement.classList.add('hidden');
                inputElement.classList.remove('border-red-500');
            }
        });
    }
    render() {
        this.renderBooks();
        this.renderUsers();
    }
    renderBooks() {
        const booksList = document.getElementById('booksList');
        if (!booksList)
            return;
        const books = this.searchQuery
            ? services_1.LibraryService.searchBooks(this.searchQuery)
            : services_1.LibraryService.getAllBooks();
        const totalPages = Math.ceil(books.length / this.itemsPerPage);
        const startIndex = (this.currentPage.books - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedBooks = books.slice(startIndex, endIndex);
        if (paginatedBooks.length === 0) {
            booksList.innerHTML = '<p class="text-gray-500 text-center">Книг не знайдено</p>';
        }
        else {
            booksList.innerHTML = paginatedBooks
                .map(book => `
                <div class="border rounded-lg p-4 ${book.isBorrowed ? 'bg-yellow-50' : 'bg-white'} flex items-center justify-between">
                    <p class="font-semibold text-gray-800">${book.getFullInfo()}</p>
                    <div class="mt-3 flex gap-2">
                        ${book.isBorrowed
                ? `<button 
                                    onclick="window.app.returnBook('${book.id}')"
                                    class="bg-yellow-500 hover:bg-yellow-700 text-black text-sm font-bold py-1 px-3 rounded transition-colors duration-50">
                                    Повернути
                                </button>`
                : `<button 
                                    onclick="window.app.borrowBook('${book.id}')"
                                    class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50">
                                    Позичити
                                </button>`}
                        <button 
                            onclick="window.app.deleteBook('${book.id}')"
                            class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50">
                            Видалити
                        </button>
                    </div>
                </div>
            `)
                .join('');
        }
        this.renderPagination('booksPagination', totalPages, this.currentPage.books, page => {
            this.currentPage.books = page;
            this.render();
        });
    }
    renderUsers() {
        const usersList = document.getElementById('usersList');
        if (!usersList)
            return;
        const users = services_1.LibraryService.getAllUsers();
        const totalPages = Math.ceil(users.length / this.itemsPerPage);
        const startIndex = (this.currentPage.users - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedUsers = users.slice(startIndex, endIndex);
        if (paginatedUsers.length === 0) {
            usersList.innerHTML =
                '<p class="text-gray-500 text-center">Користувачів не знайдено</p>';
        }
        else {
            usersList.innerHTML = paginatedUsers
                .map(user => `
                <div class="border rounded-lg p-4 bg-white flex items-center justify-between">
                    <div>
                        <p class="font-semibold text-gray-800">${user.getInfo()}</p>
                        <p class="text-sm text-gray-600 mt-1">Позичено книг: ${user.borrowedBooks.length}/3</p>
                    </div>
                    <div class="mt-3">
                        <button 
                            onclick="window.app.deleteUser('${user.id}')"
                            class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50">
                            Видалити
                        </button>
                    </div>
                </div>
            `)
                .join('');
        }
        this.renderPagination('usersPagination', totalPages, this.currentPage.users, page => {
            this.currentPage.users = page;
            this.render();
        });
    }
    renderPagination(elementId, totalPages, currentPage, _onPageChange) {
        const pagination = document.getElementById(elementId);
        if (!pagination || totalPages <= 1) {
            if (pagination)
                pagination.innerHTML = '';
            return;
        }
        let html = '';
        if (currentPage > 1) {
            html += `<button onclick="window.app.changePage('${elementId}', ${currentPage - 1})" 
                class="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">Попередня</button>`;
        }
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                html += `<button class="px-3 py-1 bg-blue-500 text-white rounded">${i}</button>`;
            }
            else {
                html += `<button onclick="window.app.changePage('${elementId}', ${i})" 
                    class="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">${i}</button>`;
            }
        }
        if (currentPage < totalPages) {
            html += `<button onclick="window.app.changePage('${elementId}', ${currentPage + 1})" 
                class="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">Наступна</button>`;
        }
        pagination.innerHTML = html;
    }
    borrowBook(bookId) {
        this.handleBorrowBook(bookId);
    }
    returnBook(bookId) {
        this.handleReturnBook(bookId);
    }
    deleteBook(bookId) {
        this.handleDeleteBook(bookId);
    }
    deleteUser(userId) {
        this.handleDeleteUser(userId);
    }
    changePage(paginationType, page) {
        if (paginationType === 'booksPagination') {
            this.currentPage.books = page;
        }
        else {
            this.currentPage.users = page;
        }
        this.render();
    }
}
window.addEventListener('DOMContentLoaded', () => {
    window.app = new LibraryApp();
});
//# sourceMappingURL=app.js.map