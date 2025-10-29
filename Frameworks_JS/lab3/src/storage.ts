export class StorageService<T> {
    constructor(private key: string) {}

    save(data: T): void {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    load(): T | null {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }

    remove(): void {
        localStorage.removeItem(this.key);
    }

    clear(): void {
        localStorage.clear();
    }
}