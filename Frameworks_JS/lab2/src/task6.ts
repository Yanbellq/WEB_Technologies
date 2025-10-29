// Інтерфейс LibraryItem
interface LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean;
    borrow(): void;
    return(): void;
    getInfo(): string;
}

// Клас Book
class Book implements LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean;
    pages: number;

    constructor(title: string, author: string, pages: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`📚 Книга "${this.title}" позичена успішно`);
        } else {
            console.log(`❌ Книга "${this.title}" вже позичена`);
        }
    }

    return(): void {
        if (this.isBorrowed) {
            this.isBorrowed = false;
            console.log(`📚 Книга "${this.title}" повернена до бібліотеки`);
        } else {
            console.log(`ℹ️ Книга "${this.title}" не була позичена`);
        }
    }

    getInfo(): string {
        const status = this.isBorrowed ? "Позичена" : "Доступна";
        return `📚 Книга: "${this.title}" | Автор: ${this.author} | Сторінки: ${this.pages} | Статус: ${status}`;
    }
}

// Клас Magazine
class Magazine implements LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean;
    issueNumber: number;
    publicationDate: string;

    constructor(title: string, author: string, issueNumber: number, publicationDate: string) {
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
        this.publicationDate = publicationDate;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`📰 Журнал "${this.title}" #${this.issueNumber} позичений успішно`);
        } else {
            console.log(`❌ Журнал "${this.title}" #${this.issueNumber} вже позичений`);
        }
    }

    return(): void {
        if (this.isBorrowed) {
            this.isBorrowed = false;
            console.log(`📰 Журнал "${this.title}" #${this.issueNumber} повернений до бібліотеки`);
        } else {
            console.log(`ℹ️ Журнал "${this.title}" #${this.issueNumber} не був позичений`);
        }
    }

    getInfo(): string {
        const status = this.isBorrowed ? "Позичений" : "Доступний";
        return `📰 Журнал: "${this.title}" | Редактор: ${this.author} | Випуск: #${this.issueNumber} | Дата: ${this.publicationDate} | Статус: ${status}`;
    }
}

// Клас DVD
class DVD implements LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean;
    duration: number;
    genre: string;

    constructor(title: string, director: string, duration: number, genre: string) {
        this.title = title;
        this.author = director;
        this.duration = duration;
        this.genre = genre;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`📀 DVD "${this.title}" позичений успішно`);
        } else {
            console.log(`❌ DVD "${this.title}" вже позичений`);
        }
    }

    return(): void {
        if (this.isBorrowed) {
            this.isBorrowed = false;
            console.log(`📀 DVD "${this.title}" повернений до бібліотеки`);
        } else {
            console.log(`ℹ️ DVD "${this.title}" не був позичений`);
        }
    }

    getInfo(): string {
        const status = this.isBorrowed ? "Позичений" : "Доступний";
        return `📀 DVD: "${this.title}" | Режисер: ${this.author} | Тривалість: ${this.duration} хв | Жанр: ${this.genre} | Статус: ${status}`;
    }
}

// Клас Library
class Library {
    private items: LibraryItem[];

    constructor() {
        this.items = [];
    }

    addItem(item: LibraryItem): void {
        const existingItem = this.findItemByName(item.title);
        if (!existingItem) {
            this.items.push(item);
            console.log(`✅ Елемент "${item.title}" додано до бібліотеки`);
        } else {
            console.log(`⚠️ Елемент "${item.title}" вже існує в бібліотеці`);
        }
    }

    findItemByName(title: string): LibraryItem | undefined {
        return this.items.find(item => 
            item.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    displayAvailableItems(): void {
        console.log("\n=== ДОСТУПНІ ЕЛЕМЕНТИ БІБЛІОТЕКИ ===");
        const availableItems = this.items.filter(item => !item.isBorrowed);
        
        if (availableItems.length === 0) {
            console.log("🚫 Немає доступних елементів");
            return;
        }

        availableItems.forEach((item, index) => {
            console.log(`${index + 1}. ${item.getInfo()}`);
        });
    }

    displayAllItems(): void {
        console.log("\n=== ВСІ ЕЛЕМЕНТИ БІБЛІОТЕКИ ===");
        
        if (this.items.length === 0) {
            console.log("📭 Бібліотека порожня");
            return;
        }

        this.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.getInfo()}`);
        });
    }

    getStatistics(): void {
        const totalItems = this.items.length;
        const borrowedItems = this.items.filter(item => item.isBorrowed).length;
        const availableItems = totalItems - borrowedItems;
        
        const books = this.items.filter(item => item instanceof Book).length;
        const magazines = this.items.filter(item => item instanceof Magazine).length;
        const dvds = this.items.filter(item => item instanceof DVD).length;

        console.log("\n=== СТАТИСТИКА БІБЛІОТЕКИ ===");
        console.log(`📊 Загальна кількість елементів: ${totalItems}`);
        console.log(`✅ Доступних елементів: ${availableItems}`);
        console.log(`📤 Позичених елементів: ${borrowedItems}`);
        console.log(`📚 Книги: ${books} | 📰 Журнали: ${magazines} | 📀 DVD: ${dvds}`);
    }
}

// Демонстраційний код
const library = new Library();

const book1 = new Book("1984", "Джордж Орвелл", 328);
const magazine1 = new Magazine("National Geographic", "Редакція NG", 245, "Березень 2024");
const dvd1 = new DVD("Інтерстеллар", "Крістофер Нолан", 169, "Наукова фантастика");

library.addItem(book1);
library.addItem(magazine1);
library.addItem(dvd1);

book1.borrow();
magazine1.borrow();

library.displayAvailableItems();
library.getStatistics();
