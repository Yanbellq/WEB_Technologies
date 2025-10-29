document.addEventListener('DOMContentLoaded', () => {
    const bulbImage = document.getElementById('bulb');
    const toggleButton = document.getElementById('toggleButton');
    const bulbTypeSelect = document.getElementById('bulbType');
    const brightnessButton = document.getElementById('brightnessButton');
    let timeout;

    toggleButton.addEventListener('click', () => {
        bulbImage.classList.toggle('on');
        resetTimeout();
    });

    bulbTypeSelect.addEventListener('change', () => {
        const bulbType = bulbTypeSelect.value;
        bulbImage.src = `images/${bulbType}.webp`;
        resetTimeout();
    });

    brightnessButton.addEventListener('click', () => {
        const brightness = prompt("Введіть рівень яскравості (0-100):");
        if (brightness !== null && brightness >= 0 && brightness <= 100) {
            bulbImage.style.opacity = brightness / 100;
            resetTimeout();
        } else {
            alert("Некоректне значення!");
        }
    });

    function resetTimeout() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            bulbImage.classList.remove('on');
        }, 3000);
    }

    resetTimeout();
});