/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/library.ts":
/*!************************!*\
  !*** ./src/library.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Library: () => (/* binding */ Library)
/* harmony export */ });
var Library = (function () {
    function Library() {
        this.items = [];
    }
    Library.prototype.add = function (item) {
        this.items.push(item);
    };
    Library.prototype.remove = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    };
    Library.prototype.findById = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    Library.prototype.findAll = function () {
        return this.items;
    };
    Library.prototype.clear = function () {
        this.items = [];
    };
    Library.prototype.setAll = function (items) {
        this.items = items;
    };
    return Library;
}());



/***/ }),

/***/ "./src/modal.ts":
/*!**********************!*\
  !*** ./src/modal.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal)
/* harmony export */ });
var Modal = (function () {
    function Modal() {
        this.modal = document.getElementById('modal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalContent = document.getElementById('modalContent');
        this.modalActions = document.getElementById('modalActions');
    }
    Modal.prototype.show = function (title, content, actions) {
        var _this = this;
        this.modalTitle.textContent = title;
        this.modalContent.innerHTML = content;
        this.modalActions.innerHTML = '';
        actions.forEach(function (action) {
            var button = document.createElement('button');
            button.textContent = action.text;
            button.className = action.className || 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
            button.onclick = function () {
                action.onClick();
                _this.hide();
            };
            _this.modalActions.appendChild(button);
        });
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
    };
    Modal.prototype.hide = function () {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('flex');
    };
    Modal.prototype.showBorrowModal = function (bookTitle, onBorrow) {
        var content = "\n            <label class=\"block text-gray-700 text-sm font-bold mb-2\">\n                \u0412\u0432\u0435\u0434\u0456\u0442\u044C ID \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0434\u043B\u044F \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u043D\u044F \u043A\u043D\u0438\u0433\u0438:\n            </label>\n            <input \n                class=\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500\" \n                id=\"borrowUserId\" \n                type=\"text\" \n                placeholder=\"ID\">\n        ";
        this.show("\u041F\u043E\u0437\u0438\u0447\u0438\u0442\u0438 \u043A\u043D\u0438\u0433\u0443: ".concat(bookTitle), content, [
            {
                text: 'Скасувати',
                onClick: function () { },
                className: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
            },
            {
                text: 'Зберегти',
                onClick: function () {
                    var input = document.getElementById('borrowUserId');
                    if (input && input.value.trim()) {
                        onBorrow(input.value.trim());
                    }
                },
                className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            }
        ]);
    };
    Modal.prototype.showAlert = function (message) {
        this.show('Повідомлення', "<p class=\"text-gray-700\">".concat(message, "</p>"), [
            {
                text: 'Зрозуміло!',
                onClick: function () { },
                className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            }
        ]);
    };
    Modal.prototype.showConfirm = function (message, onConfirm) {
        this.show('Підтвердження', "<p class=\"text-gray-700\">".concat(message, "</p>"), [
            {
                text: 'Скасувати',
                onClick: function () { },
                className: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
            },
            {
                text: 'Підтвердити',
                onClick: onConfirm,
                className: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            }
        ]);
    };
    return Modal;
}());



/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Book: () => (/* binding */ Book),
/* harmony export */   User: () => (/* binding */ User)
/* harmony export */ });
var Book = (function () {
    function Book(id, title, author, year, isBorrowed, borrowedBy) {
        if (isBorrowed === void 0) { isBorrowed = false; }
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = isBorrowed;
        this.borrowedBy = borrowedBy;
    }
    Book.prototype.getInfo = function () {
        return "".concat(this.title, " by ").concat(this.author, " (").concat(this.year, ")");
    };
    Book.prototype.getFullInfo = function () {
        return "<span class=\"text-gray-400 text-sm\">".concat(this.id, ": </span> ").concat(this.title, " by ").concat(this.author, " (").concat(this.year, ")");
    };
    Book.prototype.borrow = function (userId) {
        this.isBorrowed = true;
        this.borrowedBy = userId;
    };
    Book.prototype.returnBook = function () {
        this.isBorrowed = false;
        this.borrowedBy = undefined;
    };
    return Book;
}());

var User = (function () {
    function User(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.borrowedBooks = [];
    }
    User.prototype.getInfo = function () {
        return "<span class=\"text-gray-400 text-sm\">".concat(this.id, ": </span> ").concat(this.name, " (").concat(this.email, ")");
    };
    User.prototype.canBorrowMore = function () {
        return this.borrowedBooks.length < 3;
    };
    User.prototype.borrowBook = function (bookId) {
        if (this.canBorrowMore()) {
            this.borrowedBooks.push(bookId);
        }
    };
    User.prototype.returnBook = function (bookId) {
        this.borrowedBooks = this.borrowedBooks.filter(function (id) { return id !== bookId; });
    };
    return User;
}());



/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LibraryService: () => (/* binding */ LibraryService)
/* harmony export */ });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ "./src/models.ts");
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./library */ "./src/library.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.ts");



var LibraryService;
(function (LibraryService) {
    var booksLibrary = new _library__WEBPACK_IMPORTED_MODULE_1__.Library();
    var usersLibrary = new _library__WEBPACK_IMPORTED_MODULE_1__.Library();
    var booksStorage = new _storage__WEBPACK_IMPORTED_MODULE_2__.StorageService('books');
    var usersStorage = new _storage__WEBPACK_IMPORTED_MODULE_2__.StorageService('users');
    var userIdCounter = 1;
    function generateUserId() {
        var users = getAllUsers();
        if (users.length === 0) {
            userIdCounter = 1;
        }
        else {
            var maxId = users.reduce(function (max, user) {
                var numId = parseInt(user.id);
                return isNaN(numId) ? max : Math.max(max, numId);
            }, 0);
            userIdCounter = maxId + 1;
        }
        return userIdCounter.toString();
    }
    LibraryService.generateUserId = generateUserId;
    function initializeData() {
        var savedBooks = booksStorage.load();
        var savedUsers = usersStorage.load();
        if (savedBooks) {
            savedBooks.forEach(function (bookData) {
                var book = new _models__WEBPACK_IMPORTED_MODULE_0__.Book(bookData.id, bookData.title, bookData.author, bookData.year, bookData.isBorrowed, bookData.borrowedBy);
                booksLibrary.add(book);
            });
        }
        if (savedUsers) {
            savedUsers.forEach(function (userData) {
                var user = new _models__WEBPACK_IMPORTED_MODULE_0__.User(userData.id, userData.name, userData.email);
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
        var book = booksLibrary.remove(id);
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
        var user = usersLibrary.remove(id);
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
        var book = getBook(bookId);
        var user = getUser(userId);
        if (!book || !user) {
            return { success: false, message: 'Книга або користувач не знайдені.' };
        }
        if (book.isBorrowed) {
            return { success: false, message: 'Книга вже позичена.' };
        }
        if (!user.canBorrowMore()) {
            return { success: false, message: 'Користувач досяг ліміту позичених книг (максимум 3).' };
        }
        book.borrow(userId);
        user.borrowBook(bookId);
        saveBooks();
        saveUsers();
        return {
            success: true,
            message: "".concat(book.getInfo(), " has been borrowed by\n").concat(user.getInfo(), ".")
        };
    }
    LibraryService.borrowBook = borrowBook;
    function returnBook(bookId) {
        var book = getBook(bookId);
        if (!book) {
            return { success: false, message: 'Книга не знайдена.' };
        }
        if (!book.isBorrowed) {
            return { success: false, message: 'Книга не позичена.' };
        }
        var userId = book.borrowedBy;
        var user = userId ? getUser(userId) : undefined;
        book.returnBook();
        if (user) {
            user.returnBook(bookId);
        }
        saveBooks();
        saveUsers();
        return {
            success: true,
            message: "".concat(book.getInfo(), " has been returned.")
        };
    }
    LibraryService.returnBook = returnBook;
    function searchBooks(query) {
        var lowerQuery = query.toLowerCase();
        return getAllBooks().filter(function (book) {
            return book.title.toLowerCase().includes(lowerQuery) ||
                book.author.toLowerCase().includes(lowerQuery);
        });
    }
    LibraryService.searchBooks = searchBooks;
    function saveBooks() {
        booksStorage.save(booksLibrary.findAll());
    }
    function saveUsers() {
        usersStorage.save(usersLibrary.findAll());
    }
})(LibraryService || (LibraryService = {}));


/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageService: () => (/* binding */ StorageService)
/* harmony export */ });
var StorageService = (function () {
    function StorageService(key) {
        this.key = key;
    }
    StorageService.prototype.save = function (data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    };
    StorageService.prototype.load = function () {
        var data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    };
    StorageService.prototype.remove = function () {
        localStorage.removeItem(this.key);
    };
    StorageService.prototype.clear = function () {
        localStorage.clear();
    };
    return StorageService;
}());



/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Validator: () => (/* binding */ Validator)
/* harmony export */ });
var Validator;
(function (Validator) {
    function validateBook(title, author, year) {
        var errors = {};
        if (!title.trim()) {
            errors.title = 'Це поле є обов\'язковим';
        }
        if (!author.trim()) {
            errors.author = 'Це поле є обов\'язковим';
        }
        if (!year.trim()) {
            errors.year = 'Це поле є обов\'язковим';
        }
        else if (!/^\d{4}$/.test(year)) {
            errors.year = 'Рік має бути у форматі РРРР (наприклад, 2024)';
        }
        else {
            var yearNum = parseInt(year);
            var currentYear = new Date().getFullYear();
            if (yearNum < 1000 || yearNum > currentYear) {
                errors.year = "\u0420\u0456\u043A \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043C\u0456\u0436 1000 \u0442\u0430 ".concat(currentYear);
            }
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    Validator.validateBook = validateBook;
    function validateUser(name, email) {
        var errors = {};
        if (!name.trim()) {
            errors.name = 'Це поле є обов\'язковим';
        }
        if (!email.trim()) {
            errors.email = 'Це поле є обов\'язковим';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Невірний формат email';
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    Validator.validateUser = validateUser;
})(Validator || (Validator = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ "./src/models.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.ts");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ "./src/validation.ts");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ "./src/modal.ts");




var LibraryApp = (function () {
    function LibraryApp() {
        this.currentPage = { books: 1, users: 1 };
        this.itemsPerPage = 5;
        this.searchQuery = '';
        this.modal = new _modal__WEBPACK_IMPORTED_MODULE_3__.Modal();
        _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.initializeData();
        this.initializeEventListeners();
        this.render();
    }
    LibraryApp.prototype.initializeEventListeners = function () {
        var _this = this;
        var bookForm = document.getElementById('bookForm');
        bookForm.addEventListener('submit', function (e) {
            e.preventDefault();
            _this.handleAddBook();
        });
        var userForm = document.getElementById('userForm');
        userForm.addEventListener('submit', function (e) {
            e.preventDefault();
            _this.handleAddUser();
        });
        var searchBtn = document.getElementById('searchBtn');
        searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener('click', function () { return _this.handleSearch(); });
        var clearSearchBtn = document.getElementById('clearSearchBtn');
        clearSearchBtn === null || clearSearchBtn === void 0 ? void 0 : clearSearchBtn.addEventListener('click', function () { return _this.handleClearSearch(); });
        var searchInput = document.getElementById('searchInput');
        searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                _this.handleSearch();
            }
        });
    };
    LibraryApp.prototype.handleAddBook = function () {
        var titleInput = document.getElementById('bookTitle');
        var authorInput = document.getElementById('bookAuthor');
        var yearInput = document.getElementById('bookYear');
        var validation = _validation__WEBPACK_IMPORTED_MODULE_2__.Validator.validateBook(titleInput.value, authorInput.value, yearInput.value);
        this.clearErrors(['bookTitle', 'bookAuthor', 'bookYear']);
        if (!validation.isValid) {
            this.showErrors({
                bookTitle: validation.errors.title,
                bookAuthor: validation.errors.author,
                bookYear: validation.errors.year
            });
            return;
        }
        var book = new _models__WEBPACK_IMPORTED_MODULE_0__.Book(Date.now().toString(), titleInput.value.trim(), authorInput.value.trim(), parseInt(yearInput.value));
        _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.addBook(book);
        this.modal.showAlert('Книга успішно додана!');
        titleInput.value = '';
        authorInput.value = '';
        yearInput.value = '';
        this.render();
    };
    LibraryApp.prototype.handleAddUser = function () {
        var nameInput = document.getElementById('userName');
        var emailInput = document.getElementById('userEmail');
        var validation = _validation__WEBPACK_IMPORTED_MODULE_2__.Validator.validateUser(nameInput.value, emailInput.value);
        this.clearErrors(['userName', 'userEmail']);
        if (!validation.isValid) {
            this.showErrors({
                userName: validation.errors.name,
                userEmail: validation.errors.email
            });
            return;
        }
        var userId = _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.generateUserId();
        var user = new _models__WEBPACK_IMPORTED_MODULE_0__.User(userId, nameInput.value.trim(), emailInput.value.trim());
        _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.addUser(user);
        this.modal.showAlert('Користувача успішно додано!');
        nameInput.value = '';
        emailInput.value = '';
        this.render();
    };
    LibraryApp.prototype.handleBorrowBook = function (bookId) {
        var _this = this;
        var book = _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.getBook(bookId);
        if (!book)
            return;
        this.modal.showBorrowModal(book.getInfo(), function (userId) {
            var result = _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.borrowBook(bookId, userId);
            _this.modal.showAlert(result.message);
            if (result.success) {
                _this.render();
            }
        });
    };
    LibraryApp.prototype.handleReturnBook = function (bookId) {
        var result = _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.returnBook(bookId);
        this.modal.showAlert(result.message);
        if (result.success) {
            this.render();
        }
    };
    LibraryApp.prototype.handleDeleteBook = function (bookId) {
        var _this = this;
        var book = _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.getBook(bookId);
        if (!book)
            return;
        this.modal.showConfirm("\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043A\u043D\u0438\u0433\u0443 \"".concat(book.title, "\"?"), function () {
            _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.removeBook(bookId);
            _this.modal.showAlert('Книга видалена!');
            _this.render();
        });
    };
    LibraryApp.prototype.handleDeleteUser = function (userId) {
        var _this = this;
        var user = _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.getUser(userId);
        if (!user)
            return;
        if (user.borrowedBooks.length > 0) {
            this.modal.showAlert('Неможливо видалити користувача, який має позичені книги!');
            return;
        }
        this.modal.showConfirm("\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \"".concat(user.name, "\"?"), function () {
            _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.removeUser(userId);
            _this.modal.showAlert('Користувача видалено!');
            _this.render();
        });
    };
    LibraryApp.prototype.handleSearch = function () {
        var searchInput = document.getElementById('searchInput');
        this.searchQuery = searchInput.value.trim();
        this.currentPage.books = 1;
        this.render();
    };
    LibraryApp.prototype.handleClearSearch = function () {
        this.searchQuery = '';
        var searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        this.currentPage.books = 1;
        this.render();
    };
    LibraryApp.prototype.showErrors = function (errors) {
        Object.keys(errors).forEach(function (key) {
            if (errors[key]) {
                var errorElement = document.getElementById("".concat(key, "Error"));
                var inputElement = document.getElementById(key);
                if (errorElement && inputElement) {
                    errorElement.textContent = errors[key];
                    errorElement.classList.remove('hidden');
                    inputElement.classList.add('border-red-500');
                }
            }
        });
    };
    LibraryApp.prototype.clearErrors = function (fields) {
        fields.forEach(function (field) {
            var errorElement = document.getElementById("".concat(field, "Error"));
            var inputElement = document.getElementById(field);
            if (errorElement && inputElement) {
                errorElement.textContent = '';
                errorElement.classList.add('hidden');
                inputElement.classList.remove('border-red-500');
            }
        });
    };
    LibraryApp.prototype.render = function () {
        this.renderBooks();
        this.renderUsers();
    };
    LibraryApp.prototype.renderBooks = function () {
        var _this = this;
        var booksList = document.getElementById('booksList');
        if (!booksList)
            return;
        var books = this.searchQuery
            ? _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.searchBooks(this.searchQuery)
            : _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.getAllBooks();
        var totalPages = Math.ceil(books.length / this.itemsPerPage);
        var startIndex = (this.currentPage.books - 1) * this.itemsPerPage;
        var endIndex = startIndex + this.itemsPerPage;
        var paginatedBooks = books.slice(startIndex, endIndex);
        if (paginatedBooks.length === 0) {
            booksList.innerHTML = '<p class="text-gray-500 text-center">Книг не знайдено</p>';
        }
        else {
            booksList.innerHTML = paginatedBooks.map(function (book) { return "\n                <div class=\"border rounded-lg p-4 ".concat(book.isBorrowed ? 'bg-yellow-50' : 'bg-white', " flex items-center justify-between\">\n                    <p class=\"font-semibold text-gray-800\">").concat(book.getFullInfo(), "</p>\n                    <div class=\"mt-3 flex gap-2\">\n                        ").concat(book.isBorrowed
                ? "<button \n                                    onclick=\"window.app.returnBook('".concat(book.id, "')\"\n                                    class=\"bg-yellow-500 hover:bg-yellow-700 text-black text-sm font-bold py-1 px-3 rounded transition-colors duration-50\">\n                                    \u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\n                                </button>")
                : "<button \n                                    onclick=\"window.app.borrowBook('".concat(book.id, "')\"\n                                    class=\"bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50\">\n                                    \u041F\u043E\u0437\u0438\u0447\u0438\u0442\u0438\n                                </button>"), "\n                        <button \n                            onclick=\"window.app.deleteBook('").concat(book.id, "')\"\n                            class=\"bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50\">\n                            \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n                        </button>\n                    </div>\n                </div>\n            "); }).join('');
        }
        this.renderPagination('booksPagination', totalPages, this.currentPage.books, function (page) {
            _this.currentPage.books = page;
            _this.render();
        });
    };
    LibraryApp.prototype.renderUsers = function () {
        var _this = this;
        var usersList = document.getElementById('usersList');
        if (!usersList)
            return;
        var users = _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService.getAllUsers();
        var totalPages = Math.ceil(users.length / this.itemsPerPage);
        var startIndex = (this.currentPage.users - 1) * this.itemsPerPage;
        var endIndex = startIndex + this.itemsPerPage;
        var paginatedUsers = users.slice(startIndex, endIndex);
        if (paginatedUsers.length === 0) {
            usersList.innerHTML = '<p class="text-gray-500 text-center">Користувачів не знайдено</p>';
        }
        else {
            usersList.innerHTML = paginatedUsers.map(function (user) { return "\n                <div class=\"border rounded-lg p-4 bg-white flex items-center justify-between\">\n                    <div>\n                        <p class=\"font-semibold text-gray-800\">".concat(user.getInfo(), "</p>\n                        <p class=\"text-sm text-gray-600 mt-1\">\u041F\u043E\u0437\u0438\u0447\u0435\u043D\u043E \u043A\u043D\u0438\u0433: ").concat(user.borrowedBooks.length, "/3</p>\n                    </div>\n                    <div class=\"mt-3\">\n                        <button \n                            onclick=\"window.app.deleteUser('").concat(user.id, "')\"\n                            class=\"bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-50\">\n                            \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n                        </button>\n                    </div>\n                </div>\n            "); }).join('');
        }
        this.renderPagination('usersPagination', totalPages, this.currentPage.users, function (page) {
            _this.currentPage.users = page;
            _this.render();
        });
    };
    LibraryApp.prototype.renderPagination = function (elementId, totalPages, currentPage, onPageChange) {
        var pagination = document.getElementById(elementId);
        if (!pagination || totalPages <= 1) {
            if (pagination)
                pagination.innerHTML = '';
            return;
        }
        var html = '';
        if (currentPage > 1) {
            html += "<button onclick=\"window.app.changePage('".concat(elementId, "', ").concat(currentPage - 1, ")\" \n                class=\"px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded\">\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044F</button>");
        }
        for (var i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                html += "<button class=\"px-3 py-1 bg-blue-500 text-white rounded\">".concat(i, "</button>");
            }
            else {
                html += "<button onclick=\"window.app.changePage('".concat(elementId, "', ").concat(i, ")\" \n                    class=\"px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded\">").concat(i, "</button>");
            }
        }
        if (currentPage < totalPages) {
            html += "<button onclick=\"window.app.changePage('".concat(elementId, "', ").concat(currentPage + 1, ")\" \n                class=\"px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded\">\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0430</button>");
        }
        pagination.innerHTML = html;
    };
    LibraryApp.prototype.borrowBook = function (bookId) {
        this.handleBorrowBook(bookId);
    };
    LibraryApp.prototype.returnBook = function (bookId) {
        this.handleReturnBook(bookId);
    };
    LibraryApp.prototype.deleteBook = function (bookId) {
        this.handleDeleteBook(bookId);
    };
    LibraryApp.prototype.deleteUser = function (userId) {
        this.handleDeleteUser(userId);
    };
    LibraryApp.prototype.changePage = function (paginationType, page) {
        if (paginationType === 'booksPagination') {
            this.currentPage.books = page;
        }
        else {
            this.currentPage.users = page;
        }
        this.render();
    };
    return LibraryApp;
}());
window.addEventListener('DOMContentLoaded', function () {
    window.app = new LibraryApp();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map