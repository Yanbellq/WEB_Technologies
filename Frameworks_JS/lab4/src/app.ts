import { Book, User } from './models';
import { LibraryService } from './services';
import { Validator } from './validation';
import { Modal } from './modal';

class LibraryApp {
    private modal: Modal;
    private currentPage = { books: 1, users: 1 };
    private itemsPerPage = 5;
    private searchQuery = '';

    constructor() {
        this.modal = new Modal();
        LibraryService.initializeData();
        this.initializeEventListeners();
        this.render();
    }

    private initializeEventListeners(): void {
        // Форма додавання книги
        const bookForm = document.getElementById('bookForm') as HTMLFormElement;
        bookForm.addEventListener('submit', e => {
            e.preventDefault();
            this.handleAddBook();
        });

        // Форма додавання користувача
        const userForm = document.getElementById('userForm') as HTMLFormElement;
        userForm.addEventListener('submit', e => {
            e.preventDefault();
            this.handleAddUser();
        });

        // Пошук
        const searchBtn = document.getElementById('searchBtn');
        searchBtn?.addEventListener('click', () => this.handleSearch());

        const clearSearchBtn = document.getElementById('clearSearchBtn');
        clearSearchBtn?.addEventListener('click', () => this.handleClearSearch());

        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        searchInput?.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    private handleAddBook(): void {
        const titleInput = document.getElementById('bookTitle') as HTMLInputElement;
        const authorInput = document.getElementById('bookAuthor') as HTMLInputElement;
        const yearInput = document.getElementById('bookYear') as HTMLInputElement;

        const validation = Validator.validateBook(
            titleInput.value,
            authorInput.value,
            yearInput.value
        );

        this.clearErrors(['bookTitle', 'bookAuthor', 'bookYear']);

        if (!validation.isValid) {
            this.showErrors({
                bookTitle: validation.errors.title,
                bookAuthor: validation.errors.author,
                bookYear: validation.errors.year,
            });
            return;
        }

        const book = new Book(
            Date.now().toString(),
            titleInput.value.trim(),
            authorInput.value.trim(),
            parseInt(yearInput.value)
        );

        LibraryService.addBook(book);
        this.modal.showAlert('Книга успішно додана!');

        titleInput.value = '';
        authorInput.value = '';
        yearInput.value = '';

        this.render();
    }

    private handleAddUser(): void {
        // ВИДАЛЕНО idInput
        const nameInput = document.getElementById('userName') as HTMLInputElement;
        const emailInput = document.getElementById('userEmail') as HTMLInputElement;

        // ОНОВЛЕНА ВАЛІДАЦІЯ (без ID)
        const validation = Validator.validateUser(nameInput.value, emailInput.value);

        // ОНОВЛЕНИЙ clearErrors (без userId)
        this.clearErrors(['userName', 'userEmail']);

        if (!validation.isValid) {
            this.showErrors({
                userName: validation.errors.name,
                userEmail: validation.errors.email,
            });
            return;
        }

        // АВТОМАТИЧНА ГЕНЕРАЦІЯ ID
        const userId = LibraryService.generateUserId();

        const user = new User(
            userId, // АВТОМАТИЧНО ЗГЕНЕРОВАНИЙ ID
            nameInput.value.trim(),
            emailInput.value.trim()
        );

        LibraryService.addUser(user);
        this.modal.showAlert('Користувача успішно додано!');

        // ВИДАЛЕНО idInput.value = '';
        nameInput.value = '';
        emailInput.value = '';

        this.render();
    }

    private handleBorrowBook(bookId: string): void {
        const book = LibraryService.getBook(bookId);
        if (!book) return;

        this.modal.showBorrowModal(book.getInfo(), userId => {
            const result = LibraryService.borrowBook(bookId, userId);
            this.modal.showAlert(result.message);
            if (result.success) {
                this.render();
            }
        });
    }

    private handleReturnBook(bookId: string): void {
        const result = LibraryService.returnBook(bookId);
        this.modal.showAlert(result.message);
        if (result.success) {
            this.render();
        }
    }

    private handleDeleteBook(bookId: string): void {
        const book = LibraryService.getBook(bookId);
        if (!book) return;

        this.modal.showConfirm(`Ви впевнені, що хочете видалити книгу "${book.title}"?`, () => {
            LibraryService.removeBook(bookId);
            this.modal.showAlert('Книга видалена!');
            this.render();
        });
    }

    private handleDeleteUser(userId: string): void {
        const user = LibraryService.getUser(userId);
        if (!user) return;

        if (user.borrowedBooks.length > 0) {
            this.modal.showAlert('Неможливо видалити користувача, який має позичені книги!');
            return;
        }

        this.modal.showConfirm(
            `Ви впевнені, що хочете видалити користувача "${user.name}"?`,
            () => {
                LibraryService.removeUser(userId);
                this.modal.showAlert('Користувача видалено!');
                this.render();
            }
        );
    }

    private handleSearch(): void {
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        this.searchQuery = searchInput.value.trim();
        this.currentPage.books = 1;
        this.render();
    }

    private handleClearSearch(): void {
        this.searchQuery = '';
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        searchInput.value = '';
        this.currentPage.books = 1;
        this.render();
    }

    private showErrors(errors: { [key: string]: string }): void {
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

    private clearErrors(fields: string[]): void {
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

    private render(): void {
        this.renderBooks();
        this.renderUsers();
    }

    private renderBooks(): void {
        const booksList = document.getElementById('booksList');
        if (!booksList) return;

        const books = this.searchQuery
            ? LibraryService.searchBooks(this.searchQuery)
            : LibraryService.getAllBooks();

        const totalPages = Math.ceil(books.length / this.itemsPerPage);
        const startIndex = (this.currentPage.books - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedBooks = books.slice(startIndex, endIndex);

        if (paginatedBooks.length === 0) {
            booksList.innerHTML = '<p class="text-gray-500 text-center">Книг не знайдено</p>';
        } else {
            booksList.innerHTML = paginatedBooks
                .map(
                    book => `
                <div class="border rounded-lg p-4 ${book.isBorrowed ? 'bg-yellow-50' : 'bg-white'} flex items-center justify-between">
                    <p class="font-semibold text-gray-800">${book.getFullInfo()}</p>
                    <div class="mt-3 flex gap-2">
                        ${
                            book.isBorrowed
                                ? `<button 
                                    onclick="window.app.returnBook('${book.id}')"
                                    class="bg-yellow-500 hover:bg-yellow-700 text-black text-sm font-bold py-1 px-3 rounded transition-colors duration-50">
                                    Повернути
                                </button>`
                                : `<button 
                                    onclick="window.app.borrowBook('${book.id}')"
                                    class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50">
                                    Позичити
                                </button>`
                        }
                        <button 
                            onclick="window.app.deleteBook('${book.id}')"
                            class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50">
                            Видалити
                        </button>
                    </div>
                </div>
            `
                )
                .join('');
        }

        this.renderPagination('booksPagination', totalPages, this.currentPage.books, page => {
            this.currentPage.books = page;
            this.render();
        });
    }

    private renderUsers(): void {
        const usersList = document.getElementById('usersList');
        if (!usersList) return;

        const users = LibraryService.getAllUsers();
        const totalPages = Math.ceil(users.length / this.itemsPerPage);
        const startIndex = (this.currentPage.users - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedUsers = users.slice(startIndex, endIndex);

        if (paginatedUsers.length === 0) {
            usersList.innerHTML =
                '<p class="text-gray-500 text-center">Користувачів не знайдено</p>';
        } else {
            usersList.innerHTML = paginatedUsers
                .map(
                    user => `
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
            `
                )
                .join('');
        }

        this.renderPagination('usersPagination', totalPages, this.currentPage.users, page => {
            this.currentPage.users = page;
            this.render();
        });
    }

    private renderPagination(
        elementId: string,
        totalPages: number,
        currentPage: number,
        _onPageChange: (page: number) => void
    ): void {
        const pagination = document.getElementById(elementId);
        if (!pagination || totalPages <= 1) {
            if (pagination) pagination.innerHTML = '';
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
            } else {
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

    // Публічні методи для викликів з HTML
    public borrowBook(bookId: string): void {
        this.handleBorrowBook(bookId);
    }

    public returnBook(bookId: string): void {
        this.handleReturnBook(bookId);
    }

    public deleteBook(bookId: string): void {
        this.handleDeleteBook(bookId);
    }

    public deleteUser(userId: string): void {
        this.handleDeleteUser(userId);
    }

    public changePage(paginationType: string, page: number): void {
        if (paginationType === 'booksPagination') {
            this.currentPage.books = page;
        } else {
            this.currentPage.users = page;
        }
        this.render();
    }
}

// Ініціалізація додатку
declare global {
    interface Window {
        app: LibraryApp;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new LibraryApp();
});
