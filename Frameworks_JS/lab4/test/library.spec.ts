import { assert } from 'chai';
import { Library } from '../src/library';

interface TestItem {
    id: string;
    name: string;
}

describe('Library Tests', () => {
    let library: Library<TestItem>; // ВАЖЛИВО: let з явним типом

    beforeEach(() => {
        library = new Library<TestItem>();
    });

    describe('add method', () => {
        it('should add item to library', () => {
            const item: TestItem = { id: '1', name: 'Test Item' };
            library.add(item);
            assert.equal(library.findAll().length, 1);
            assert.deepEqual(library.findById('1'), item);
        });
    });

    describe('remove method', () => {
        it('should remove item by id', () => {
            const item: TestItem = { id: '1', name: 'Test Item' };
            library.add(item);
            const removed = library.remove('1');
            assert.deepEqual(removed, item);
            assert.equal(library.findAll().length, 0);
        });

        it('should return undefined if item not found', () => {
            const result = library.remove('nonexistent');
            assert.isUndefined(result);
        });
    });

    describe('findById method', () => {
        it('should find item by id', () => {
            const item: TestItem = { id: '1', name: 'Test Item' };
            library.add(item);
            const found = library.findById('1');
            assert.deepEqual(found, item);
        });

        it('should return undefined for non-existent id', () => {
            const result = library.findById('nonexistent');
            assert.isUndefined(result);
        });
    });

    describe('findAll method', () => {
        it('should return all items', () => {
            const item1: TestItem = { id: '1', name: 'Item 1' };
            const item2: TestItem = { id: '2', name: 'Item 2' };
            library.add(item1);
            library.add(item2);
            const all = library.findAll();
            assert.equal(all.length, 2);
            assert.deepEqual(all, [item1, item2]);
        });
    });

    describe('clear method', () => {
        it('should clear all items', () => {
            library.add({ id: '1', name: 'Item 1' });
            library.add({ id: '2', name: 'Item 2' });
            library.clear();
            assert.equal(library.findAll().length, 0);
        });
    });

    describe('setAll method', () => {
        it('should replace all items', () => {
            const item1: TestItem = { id: '1', name: 'Item 1' };
            const item2: TestItem = { id: '2', name: 'Item 2' };
            library.setAll([item1, item2]);
            assert.equal(library.findAll().length, 2);
            assert.deepEqual(library.findAll(), [item1, item2]);
        });
    });
});
