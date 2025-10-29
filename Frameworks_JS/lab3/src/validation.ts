export namespace Validator {
    export interface ValidationResult {
        isValid: boolean;
        errors: { [key: string]: string };
    }

    export function validateBook(title: string, author: string, year: string): ValidationResult {
        const errors: { [key: string]: string } = {};

        if (!title.trim()) {
            errors.title = 'Це поле є обов\'язковим';
        }

        if (!author.trim()) {
            errors.author = 'Це поле є обов\'язковим';
        }

        if (!year.trim()) {
            errors.year = 'Це поле є обов\'язковим';
        } else if (!/^\d{4}$/.test(year)) {
            errors.year = 'Рік має бути у форматі РРРР (наприклад, 2024)';
        } else {
            const yearNum = parseInt(year);
            const currentYear = new Date().getFullYear();
            if (yearNum < 1000 || yearNum > currentYear) {
                errors.year = `Рік має бути між 1000 та ${currentYear}`;
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    export function validateUser(name: string, email: string): ValidationResult {
        const errors: { [key: string]: string } = {};

        // ВИДАЛЕНА ВАЛІДАЦІЯ ID

        if (!name.trim()) {
            errors.name = 'Це поле є обов\'язковим';
        }

        if (!email.trim()) {
            errors.email = 'Це поле є обов\'язковим';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Невірний формат email';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

}
