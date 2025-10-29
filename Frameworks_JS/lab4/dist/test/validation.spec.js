"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const validation_1 = require("../src/validation");
describe('Validator Tests', () => {
    describe('validateBook', () => {
        it('should validate correct book data', () => {
            const result = validation_1.Validator.validateBook('Title', 'Author', '2024');
            chai_1.assert.isTrue(result.isValid);
            chai_1.assert.isEmpty(result.errors);
        });
        it('should return error for empty title', () => {
            const result = validation_1.Validator.validateBook('', 'Author', '2024');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'title');
            chai_1.assert.equal(result.errors.title, "Це поле є обов'язковим");
        });
        it('should return error for empty author', () => {
            const result = validation_1.Validator.validateBook('Title', '', '2024');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'author');
        });
        it('should return error for empty year', () => {
            const result = validation_1.Validator.validateBook('Title', 'Author', '');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'year');
        });
        it('should return error for invalid year format', () => {
            const result = validation_1.Validator.validateBook('Title', 'Author', '20');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'year');
            chai_1.assert.equal(result.errors.year, 'Рік має бути у форматі РРРР (наприклад, 2024)');
        });
        it('should return error for year out of range', () => {
            const result = validation_1.Validator.validateBook('Title', 'Author', '3000');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'year');
        });
        it('should return multiple errors for invalid data', () => {
            const result = validation_1.Validator.validateBook('', '', 'invalid');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'title');
            chai_1.assert.property(result.errors, 'author');
            chai_1.assert.property(result.errors, 'year');
        });
    });
    describe('validateUser', () => {
        it('should validate correct user data', () => {
            const result = validation_1.Validator.validateUser('John Doe', 'john@example.com');
            chai_1.assert.isTrue(result.isValid);
            chai_1.assert.isEmpty(result.errors);
        });
        it('should return error for empty name', () => {
            const result = validation_1.Validator.validateUser('', 'john@example.com');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'name');
        });
        it('should return error for empty email', () => {
            const result = validation_1.Validator.validateUser('John Doe', '');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'email');
        });
        it('should return error for invalid email format', () => {
            const result = validation_1.Validator.validateUser('John Doe', 'invalid-email');
            chai_1.assert.isFalse(result.isValid);
            chai_1.assert.property(result.errors, 'email');
            chai_1.assert.equal(result.errors.email, 'Невірний формат email');
        });
        it('should validate email with subdomain', () => {
            const result = validation_1.Validator.validateUser('John Doe', 'john@mail.example.com');
            chai_1.assert.isTrue(result.isValid);
        });
    });
});
//# sourceMappingURL=validation.spec.js.map