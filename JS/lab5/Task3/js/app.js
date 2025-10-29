// Цифровий годинник
function startClock() {
    const clockElement = document.getElementById('digital-clock');
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}
startClock();


// Таймер зворотного відліку
function startCountdown() {
    const input = document.getElementById('countdown-input').value;
    const display = document.getElementById('countdown-display');
    const targetDate = new Date(input);

    if (isNaN(targetDate)) {
        alert('Будь ласка, введіть коректну дату!');
        return;
    }

    const interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            display.textContent = 'Час вийшов!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        display.textContent = `${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`;
    }, 1000);
}

document.getElementById('start-countdown').addEventListener('click', startCountdown);

// Календар з початком тижня з понеділка
function displayCalendar() {
    const input = document.getElementById('calendar-input').value;
    const display = document.getElementById('calendar-display');

    if (!input) {
        display.textContent = 'Будь ласка, виберіть місяць!';
        return;
    }

    const [month, year] = input.split('.');
    const date = new Date(year, month - 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = (new Date(year, month - 1, 1).getDay() + 6) % 7;

    
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    let calendarHTML = `<h3>${date.toLocaleString('default', { month: 'long' })} ${year}</h3>`;
    calendarHTML += '<table>';
    calendarHTML += '<tr>' + daysOfWeek.map(day => `<th>${day}</th>`).join('') + '</tr><tr>';

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarHTML += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<td>${day}</td>`;
        if ((firstDayOfMonth + day) % 7 === 0) {
            calendarHTML += '</tr><tr>';
        }
    }

    calendarHTML += '</tr></table>';
    display.innerHTML = calendarHTML;
}

document.getElementById('calendar-input').addEventListener('change', displayCalendar);

// День народження
function calculateBirthday() {
    const input = document.getElementById('birthday-input').value;
    const display = document.getElementById('birthday-display');
    const birthday = new Date(input);
    const now = new Date();

    if (isNaN(birthday)) {
        alert('Будь ласка, введіть коректну дату!');
        return;
    }

    birthday.setFullYear(now.getFullYear());
    if (birthday < now) {
        birthday.setFullYear(now.getFullYear() + 1);
    }

    const diff = birthday - now;

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    display.textContent = `Залишилось: ${months} місяців, ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд`;
}

document.getElementById('calculate-birthday').addEventListener('click', calculateBirthday);
