import { Book, User } from './models';
import { Library } from './library';

import { StorageService } from './storage';

export namespace LibraryService {
    const booksLibrary = new Library<Book>();
    const usersLibrary = new Library<User>();
    const booksStorage = new StorageService<Book[]>('books');
    const usersStorage = new StorageService<User[]>('users');

    let userIdCounter = 1;

    export function generateUserId(): string {
        const users = getAllUsers();
        if (users.length === 0) {
            userIdCounter = 1;
        } else {
            // Знайти максимальний числовий ID
            const maxId = users.reduce((max, user) => {
                const numId = parseInt(user.id);
                return isNaN(numId) ? max : Math.max(max, numId);
            }, 0);
            userIdCounter = maxId + 1;
        }
        return userIdCounter.toString();
    }

    export function initializeData(): void {
        const savedBooks = booksStorage.load();
        const savedUsers = usersStorage.load();

        if (savedBooks) {
            savedBooks.forEach(bookData => {
                const book = new Book(
                    bookData.id,
                    bookData.title,
                    bookData.author,
                    bookData.year,
                    bookData.isBorrowed,
                    bookData.borrowedBy
                );
                booksLibrary.add(book);
            });
        }

        if (savedUsers) {
            savedUsers.forEach(userData => {
                const user = new User(userData.id, userData.name, userData.email);
                user.borrowedBooks = userData.borrowedBooks || [];
                usersLibrary.add(user);
            });
        }
    }

    export function addBook(book: Book): void {
        booksLibrary.add(book);
        saveBooks();
    }

    export function removeBook(id: string): Book | undefined {
        const book = booksLibrary.remove(id);
        if (book) {
            saveBooks();
        }
        return book;
    }

    export function getBook(id: string): Book | undefined {
        return booksLibrary.findById(id);
    }

    export function getAllBooks(): Book[] {
        return booksLibrary.findAll();
    }

    export function addUser(user: User): void {
        usersLibrary.add(user);
        saveUsers();
    }

    export function removeUser(id: string): User | undefined {
        const user = usersLibrary.remove(id);
        if (user) {
            saveUsers();
        }
        return user;
    }

    export function getUser(id: string): User | undefined {
        return usersLibrary.findById(id);
    }

    export function getAllUsers(): User[] {
        return usersLibrary.findAll();
    }

    export function borrowBook(
        bookId: string,
        userId: string
    ): { success: boolean; message: string } {
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

    export function returnBook(bookId: string): { success: boolean; message: string } {
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

    export function searchBooks(query: string): Book[] {
        const lowerQuery = query.toLowerCase();
        return getAllBooks().filter(
            book =>
                book.title.toLowerCase().includes(lowerQuery) ||
                book.author.toLowerCase().includes(lowerQuery)
        );
    }

    function saveBooks(): void {
        booksStorage.save(booksLibrary.findAll());
    }

    function saveUsers(): void {
        usersStorage.save(usersLibrary.findAll());
    }
}
