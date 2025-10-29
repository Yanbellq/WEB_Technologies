"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
class StorageService {
    key;
    constructor(key) {
        this.key = key;
    }
    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
    load() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }
    remove() {
        localStorage.removeItem(this.key);
    }
    clear() {
        localStorage.clear();
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.js.map