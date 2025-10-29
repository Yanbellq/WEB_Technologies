"use strict";
// Клас OnlineCourse
class OnlineCourse {
    courseName;
    duration;
    students;
    constructor(courseName, duration) {
        this.courseName = courseName;
        this.duration = duration;
        this.students = [];
    }
    registerStudent(student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`Студент "${student}" успішно зареєстрований на курс "${this.courseName}"`);
        }
        else {
            console.log(`Студент "${student}" вже зареєстрований на курс "${this.courseName}"`);
        }
    }
    isStudentRegistered(student) {
        return this.students.includes(student);
    }
    getCourseInfo() {
        return `Курс: ${this.courseName}, Тривалість: ${this.duration} год., Студентів: ${this.students.length}`;
    }
}
// Клас CourseManager
class CourseManager {
    courses;
    constructor() {
        this.courses = [];
    }
    addCourse(course) {
        const existingCourse = this.findCourse(course.courseName);
        if (!existingCourse) {
            this.courses.push(course);
            console.log(`Курс "${course.courseName}" додано до системи`);
        }
        else {
            console.log(`Курс "${course.courseName}" вже існує в системі`);
        }
    }
    removeCourse(courseName) {
        const courseIndex = this.courses.findIndex(course => course.courseName === courseName);
        if (courseIndex !== -1) {
            this.courses.splice(courseIndex, 1);
            console.log(`Курс "${courseName}" видалено з системи`);
        }
        else {
            console.log(`Курс "${courseName}" не знайдено в системі`);
        }
    }
    findCourse(courseName) {
        return this.courses.find(course => course.courseName === courseName);
    }
    getAllCourses() {
        return this.courses;
    }
    displayAllCourses() {
        console.log("\n=== СПИСОК ВСІХ КУРСІВ ===");
        if (this.courses.length === 0) {
            console.log("Курсів поки немає");
            return;
        }
        this.courses.forEach((course, index) => {
            console.log(`\n${index + 1}. ${course.courseName}`);
            console.log(`   Тривалість: ${course.duration} годин`);
            console.log(`   Кількість студентів: ${course.students.length}`);
            if (course.students.length > 0) {
                console.log(`   Зареєстровані студенти:`);
                course.students.forEach((student, studentIndex) => {
                    console.log(`     ${studentIndex + 1}. ${student}`);
                });
            }
            else {
                console.log(`   Студентів поки немає`);
            }
        });
    }
    getStatistics() {
        const totalCourses = this.courses.length;
        const totalStudents = this.courses.reduce((total, course) => total + course.students.length, 0);
        const totalHours = this.courses.reduce((total, course) => total + course.duration, 0);
        console.log("\n=== СТАТИСТИКА ===");
        console.log(`Загальна кількість курсів: ${totalCourses}`);
        console.log(`Загальна кількість студентів: ${totalStudents}`);
        console.log(`Загальна тривалість курсів: ${totalHours} годин`);
    }
}
// Демонстраційний код
const courseManager = new CourseManager();
console.log("=== СТВОРЕННЯ КУРСІВ ===");
const jsBasics = new OnlineCourse("JavaScript Основи", 40);
const reactAdvanced = new OnlineCourse("React Advanced", 60);
const nodeJsDev = new OnlineCourse("Node.js Розробка", 80);
courseManager.addCourse(jsBasics);
courseManager.addCourse(reactAdvanced);
courseManager.addCourse(nodeJsDev);
console.log("\n=== РЕЄСТРАЦІЯ СТУДЕНТІВ ===");
jsBasics.registerStudent("Олександр Петренко");
jsBasics.registerStudent("Марія Іваненко");
reactAdvanced.registerStudent("Марія Іваненко");
reactAdvanced.registerStudent("Анна Коваленко");
nodeJsDev.registerStudent("Ігор Сидоренко");
courseManager.displayAllCourses();
courseManager.getStatistics();
