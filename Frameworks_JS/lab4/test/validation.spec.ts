import { assert } from 'chai';
import { Validator } from '../src/validation';

describe('Validator Tests', () => {
    describe('validateBook', () => {
        it('should validate correct book data', () => {
            const result = Validator.validateBook('Title', 'Author', '2024');
            assert.isTrue(result.isValid);
            assert.isEmpty(result.errors);
        });

        it('should return error for empty title', () => {
            const result = Validator.validateBook('', 'Author', '2024');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'title');
            assert.equal(result.errors.title, "Це поле є обов'язковим");
        });

        it('should return error for empty author', () => {
            const result = Validator.validateBook('Title', '', '2024');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'author');
        });

        it('should return error for empty year', () => {
            const result = Validator.validateBook('Title', 'Author', '');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'year');
        });

        it('should return error for invalid year format', () => {
            const result = Validator.validateBook('Title', 'Author', '20');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'year');
            assert.equal(result.errors.year, 'Рік має бути у форматі РРРР (наприклад, 2024)');
        });

        it('should return error for year out of range', () => {
            const result = Validator.validateBook('Title', 'Author', '3000');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'year');
        });

        it('should return multiple errors for invalid data', () => {
            const result = Validator.validateBook('', '', 'invalid');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'title');
            assert.property(result.errors, 'author');
            assert.property(result.errors, 'year');
        });
    });

    describe('validateUser', () => {
        it('should validate correct user data', () => {
            const result = Validator.validateUser('John Doe', 'john@example.com');
            assert.isTrue(result.isValid);
            assert.isEmpty(result.errors);
        });

        it('should return error for empty name', () => {
            const result = Validator.validateUser('', 'john@example.com');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'name');
        });

        it('should return error for empty email', () => {
            const result = Validator.validateUser('John Doe', '');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'email');
        });

        it('should return error for invalid email format', () => {
            const result = Validator.validateUser('John Doe', 'invalid-email');
            assert.isFalse(result.isValid);
            assert.property(result.errors, 'email');
            assert.equal(result.errors.email, 'Невірний формат email');
        });

        it('should validate email with subdomain', () => {
            const result = Validator.validateUser('John Doe', 'john@mail.example.com');
            assert.isTrue(result.isValid);
        });
    });
});
