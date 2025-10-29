export class Modal {
    private modal: HTMLElement;
    private modalTitle: HTMLElement;
    private modalContent: HTMLElement;
    private modalActions: HTMLElement;

    constructor() {
        this.modal = document.getElementById('modal')!;
        this.modalTitle = document.getElementById('modalTitle')!;
        this.modalContent = document.getElementById('modalContent')!;
        this.modalActions = document.getElementById('modalActions')!;
    }

    show(
        title: string,
        content: string,
        actions: { text: string; onClick: () => void; className?: string }[]
    ): void {
        this.modalTitle.textContent = title;
        this.modalContent.innerHTML = content;
        this.modalActions.innerHTML = '';

        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.className =
                action.className ||
                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
            button.onclick = () => {
                action.onClick();
                this.hide();
            };
            this.modalActions.appendChild(button);
        });

        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
    }

    hide(): void {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('flex');
    }

    showBorrowModal(bookTitle: string, onBorrow: (userId: string) => void): void {
        const content = `
            <label class="block text-gray-700 text-sm font-bold mb-2">
                Введіть ID користувача для позичення книги:
            </label>
            <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                id="borrowUserId" 
                type="text" 
                placeholder="ID">
        `;

        this.show(`Позичити книгу: ${bookTitle}`, content, [
            {
                text: 'Скасувати',
                onClick: () => {},
                className: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded',
            },
            {
                text: 'Зберегти',
                onClick: () => {
                    const input = document.getElementById('borrowUserId') as HTMLInputElement;
                    if (input && input.value.trim()) {
                        onBorrow(input.value.trim());
                    }
                },
                className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            },
        ]);
    }

    showAlert(message: string): void {
        this.show('Повідомлення', `<p class="text-gray-700">${message}</p>`, [
            {
                text: 'Зрозуміло!',
                onClick: () => {},
                className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            },
        ]);
    }

    showConfirm(message: string, onConfirm: () => void): void {
        this.show('Підтвердження', `<p class="text-gray-700">${message}</p>`, [
            {
                text: 'Скасувати',
                onClick: () => {},
                className: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded',
            },
            {
                text: 'Підтвердити',
                onClick: onConfirm,
                className: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
            },
        ]);
    }
}
