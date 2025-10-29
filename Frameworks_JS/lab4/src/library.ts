// src/library.ts


export class Library<T extends { id: string } = { id: string }> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(id: string): T | undefined {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    }

    findById(id: string): T | undefined {
        return this.items.find(item => item.id === id);
    }

    findAll(): T[] {
        return this.items;
    }

    clear(): void {
        this.items = [];
    }

    setAll(items: T[]): void {
        this.items = items;
    }
}
