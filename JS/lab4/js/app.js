let array;

const task1 = (array) => { 
    console.log(array.toString().concat(' - Початковий масив'));

    array.pop()
    console.log(array.toString().concat(' - Без останнього елемента'));

    array.unshift("ананас");
    console.log(array.toString().concat(' - З новим першим елементом'));

    array.sort().reverse();
    console.log(array.toString().concat(' - У зворотньому алфавітному порядку'));

    console.log(array.indexOf("яблуко").toString().concat(' - Індекс яблука'));
}

console.log('Task - 1\n\n');
task1(array = ["яблуко", "банан", "апельсин", "груша", "виноград"]);

// --------------------------------------------------------------------------------------------

const task2 = (array) => { 
    console.log(array.toString().concat(' - Початковий масив'));

    let longest = array.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = array.reduce((a, b) => a.length < b.length ? a : b);
    console.log(longest.concat(' - Найдовший елемент'));
    console.log(shortest.concat(' - Найкоротший елемент'));

    let array1 = array.filter(item => item.includes("синій"));
    console.log(array1.toString().concat(' - Тільки з елементами, що містять "синій"'));

    let joinedString = array.join(', ');
    console.log(joinedString.concat(' - Об\'єднаний рядок'));
}

console.log('\nTask - 2\n\n');
task2(array = ["червоний", "синій", "зелений", "жовтий", "фіолетовий", "блакитний", "оранжевий", "рожевий", "білий", "синій"]);

// --------------------------------------------------------------------------------------------

const task3 = () => {
    let employees = [
        { name: "Олександр", age: 30, position: "розробник" },
        { name: "Марія", age: 25, position: "дизайнер" },
        { name: "Іван", age: 35, position: "тестувальник" },
        { name: "Олена", age: 28, position: "розробник" },
        { name: "Петро", age: 40, position: "менеджер" }
    ];

    console.log(employees.map(e => e.name).toString().concat(' - Початковий масив'));

    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log(employees.map(e => e.name).toString().concat(' - Відсортований масив'));

    let developers = employees.filter(employee => employee.position === "розробник");
    console.log(developers.map(e => e.name).toString().concat(' - Розробники'));

    employees = employees.filter(employee => employee.age < 40);
    console.log(employees.map(e => e.name).toString().concat(' - Без працівників старше 40 років'));

    employees.push({ name: "Андрій", age: 22, position: "стажер" });
    console.log(employees.map(e => e.name).toString().concat(' - Оновлений масив'));
}

console.log('\nTask - 3\n\n');
task3();

// --------------------------------------------------------------------------------------------

const task4 = () => { 
    let students = [
        { name: "Олександр", age: 24, course: 6 },
        { name: "Максим", age: 19, course: 2 },
        { name: "Ольга", age: 17, course: 1 },
        { name: "Владислав", age: 20, course: 3 },
        { name: "Данило", age: 19, course: 2 },
        { name: "Олексій", age: 21, course: 4 }
    ];

    console.log(students.map(e => e.name).toString().concat(' - Початковий масив'));

    students = students.filter(student => student.name !== "Олексій");
    console.log(students.map(e => e.name).toString().concat(' - Без Олексія'));

    students.push({ name: "Олексій", age: 21, course: 4 });
    console.log(students.map(e => e.name).toString().concat(' - Оновлений масив'));

    students.sort((a, b) => b.age - a.age);
    console.log(students.map(e => e.name).toString().concat(' - Відсортовані за віком від найстаршого до наймолодшого'));

    let filtOfThriedCourse = students.filter(student => student.course === 3);
    console.log(filtOfThriedCourse.map(e => e.name).toString().concat(' - Студенти третього курсу'));
}

console.log('\nTask - 4\n\n');
task4();

// --------------------------------------------------------------------------------------------

const task5 = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log(numbers.toString().concat(' - Початковий масив'));

    let squaredNumbers = numbers.map(num => num * num);
    console.log(squaredNumbers.toString().concat(' - Квадрати чисел'));

    let evenNumbers = squaredNumbers.filter(num => num % 2 === 0);
    console.log(evenNumbers.toString().concat(' - Парні числа'));

    let sumOfNumbers = evenNumbers.reduce((acc, num) => acc + num, 0);
    console.log(sumOfNumbers.toString().concat(' - Сума парних чисел'));

    let additionalNumbers = [11, 12, 13, 14, 15];
    numbers = numbers.concat(additionalNumbers);
    console.log(numbers.toString().concat(' - Оновлений масив з додатковими числами'));

    numbers.splice(0, 3);
    console.log(numbers.toString().concat(' - Масив без перших трьох елементів'));
}

console.log('\nTask - 5\n\n');
task5();

// --------------------------------------------------------------------------------------------

const libraryManagement = () => {
    let books = [
        { title: "Книга 1", author: "Автор 1", genre: "Жанр 1", pages: 200, isAvailable: true },
        { title: "Книга 2", author: "Автор 2", genre: "Жанр 2", pages: 150, isAvailable: false },
        { title: "Книга 3", author: "Автор 1", genre: "Жанр 3", pages: 300, isAvailable: true }
    ];

    const addBook = (title, author, genre, pages) => {
        books.push({ title, author, genre, pages, isAvailable: true });
    };

    const removeBook = (title) => {
        books = books.filter(book => book.title !== title);
    };

    const findBooksByAuthor = (author) => {
        return books.filter(book => book.author === author);
    };

    const toggleBookAvailability = (title, isBorrowed) => {
        let book = books.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    };

    const sortBooksByPages = () => {
        books.sort((a, b) => a.pages - b.pages);
    };

    const getBooksStatistics = () => {
        let totalBooks = books.length;
        let availableBooks = books.filter(book => book.isAvailable).length;
        let borrowedBooks = totalBooks - availableBooks;
        let averagePages = books.reduce((acc, book) => acc + book.pages, 0) / totalBooks;

        return `Кількість книжок: ${totalBooks}\nВ наявності: ${availableBooks}\nВзяті: ${borrowedBooks}\nСередня кількість сторінок у книзі: ${averagePages.toFixed(2)}`;
    };

    return {
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics
    };
};

console.log('\nTask - 6\n\n');
const library = libraryManagement();

library.addBook("Книга 4", "Автор 3", "Жанр 4", 250);
library.removeBook("Книга 2");
console.log(library.findBooksByAuthor("Автор 1").map(book => book.title).toString().concat(' - Книги автора 1'));

library.toggleBookAvailability("Книга 1", true);
library.sortBooksByPages();
console.log(library.getBooksStatistics());

// --------------------------------------------------------------------------------------------

const task7 = () => {
    let student = {
        name: "Іван",
        age: 20,
        course: 3
    };

    student.subjects = ["Математика", "Фізика", "Інформатика"];
    delete student.age;

    console.log(`${student.name}, ${student.age}, ${student.course}\n${student.subjects}`);
};

console.log('\nTask - 7\n\n');
task7();