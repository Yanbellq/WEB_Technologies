"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    items = [];
    add(item) {
        this.items.push(item);
    }
    remove(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    }
    findById(id) {
        return this.items.find(item => item.id === id);
    }
    findAll() {
        return this.items;
    }
    clear() {
        this.items = [];
    }
    setAll(items) {
        this.items = items;
    }
}
exports.Library = Library;
//# sourceMappingURL=library.js.map