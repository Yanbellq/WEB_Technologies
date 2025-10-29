"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const library_1 = require("../src/library");
describe('Library Tests', () => {
    let library;
    beforeEach(() => {
        library = new library_1.Library();
    });
    describe('add method', () => {
        it('should add item to library', () => {
            const item = { id: '1', name: 'Test Item' };
            library.add(item);
            chai_1.assert.equal(library.findAll().length, 1);
            chai_1.assert.deepEqual(library.findById('1'), item);
        });
    });
    describe('remove method', () => {
        it('should remove item by id', () => {
            const item = { id: '1', name: 'Test Item' };
            library.add(item);
            const removed = library.remove('1');
            chai_1.assert.deepEqual(removed, item);
            chai_1.assert.equal(library.findAll().length, 0);
        });
        it('should return undefined if item not found', () => {
            const result = library.remove('nonexistent');
            chai_1.assert.isUndefined(result);
        });
    });
    describe('findById method', () => {
        it('should find item by id', () => {
            const item = { id: '1', name: 'Test Item' };
            library.add(item);
            const found = library.findById('1');
            chai_1.assert.deepEqual(found, item);
        });
        it('should return undefined for non-existent id', () => {
            const result = library.findById('nonexistent');
            chai_1.assert.isUndefined(result);
        });
    });
    describe('findAll method', () => {
        it('should return all items', () => {
            const item1 = { id: '1', name: 'Item 1' };
            const item2 = { id: '2', name: 'Item 2' };
            library.add(item1);
            library.add(item2);
            const all = library.findAll();
            chai_1.assert.equal(all.length, 2);
            chai_1.assert.deepEqual(all, [item1, item2]);
        });
    });
    describe('clear method', () => {
        it('should clear all items', () => {
            library.add({ id: '1', name: 'Item 1' });
            library.add({ id: '2', name: 'Item 2' });
            library.clear();
            chai_1.assert.equal(library.findAll().length, 0);
        });
    });
    describe('setAll method', () => {
        it('should replace all items', () => {
            const item1 = { id: '1', name: 'Item 1' };
            const item2 = { id: '2', name: 'Item 2' };
            library.setAll([item1, item2]);
            chai_1.assert.equal(library.findAll().length, 2);
            chai_1.assert.deepEqual(library.findAll(), [item1, item2]);
        });
    });
});
//# sourceMappingURL=library.spec.js.map