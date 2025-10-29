document.addEventListener('DOMContentLoaded', function () {
    // Ініціалізація міст за країнами
    const citiesByCountry = {
        'ua': ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'],
        'pl': ['Варшава', 'Краків', 'Гданськ', 'Вроцлав', 'Познань'],
        'de': ['Берлін', 'Мюнхен', 'Гамбург', 'Кельн', 'Франкфурт']
    };

    // Обробник зміни країни
    document.getElementById('country').addEventListener('change', function () {
        const country = this.value;
        const citySelect = document.getElementById('city');

        citySelect.innerHTML = '<option value="">-- Select City --</option>';
        citySelect.disabled = !country;

        if (country) {
            citiesByCountry[country].forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase().replace(' ', '-');
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
        validateField(this, validateCountry);
    });

    // Обробники подій для форм
    document.getElementById('login').addEventListener('submit', handleLoginSubmit);
    document.getElementById('register').addEventListener('submit', handleRegisterSubmit);

    // Масив усіх полів для перевірки з валідаторами
    const fieldsToValidate = [
        { id: 'login-username', validator: validateUsername },
        { id: 'login-password', validator: validatePassword },
        { id: 'first-name', validator: validateName },
        { id: 'last-name', validator: validateName },
        { id: 'email', validator: validateEmail },
        { id: 'password', validator: validatePassword },
        { id: 'confirm-password', validator: validateConfirmPassword },
        { id: 'phone', validator: validatePhone },
        { id: 'birth-date', validator: validateBirthDate },
        { id: 'country', validator: validateCountry },
        { id: 'city', validator: validateCity }
    ];

    // Додаємо динамічну перевірку для всіх полів
    fieldsToValidate.forEach(fieldObj => {
        const field = document.getElementById(fieldObj.id);
        if (!field) return;
        // Для input/textarea - перевірка на input, для select - на change
        if (field.tagName === 'SELECT') {
            field.addEventListener('change', function () {
                validateField(this, fieldObj.validator);
            });
        } else {
            field.addEventListener('input', function () {
                validateField(this, fieldObj.validator);
            });
            // Також перевірка при втраті фокусу (для показу помилки якщо поле залишили порожнім)
            field.addEventListener('blur', function () {
                validateField(this, fieldObj.validator);
            });
        }
    });

    // Радіо кнопки для статі
    document.querySelectorAll('input[name="sex"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const errorElement = document.getElementById('sex-error');
            if (this.checked) {
                errorElement.style.display = 'none';
            }
        });
    });

    // Динамічна перевірка для країни та міста (на випадок якщо вони не потрапили в масив)
    document.getElementById('country').addEventListener('change', function () {
        validateField(this, validateCountry);
    });

    document.getElementById('city').addEventListener('change', function () {
        validateField(this, validateCity);
    });
});

// Функція для переключення вкладок
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-container');

    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active'));

    if (tabName === 'login') {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('register-form').classList.add('active');
    }
}

// Функція для переключення видимості пароля
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
}

// Валідація поля
function validateField(field, validator) {
    const errorElement = document.getElementById(`${field.id}-error`);
    const { isValid, message } = validator(field.value);

    if (isValid) {
        field.classList.add('valid');
        field.classList.remove('invalid');
        if (errorElement) errorElement.style.display = 'none';
    } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    return isValid;
}

// Валідатори
function validateUsername(value) {
    if (!value) {
        return { isValid: false, message: 'Username is required' };
    }
    return { isValid: true, message: '' };
}

function validatePassword(value) {
    if (!value) {
        return { isValid: false, message: 'Password is required' };
    }
    if (value.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    return { isValid: true, message: '' };
}

function validateName(value) {
    if (!value) {
        return { isValid: false, message: 'This field is required' };
    }
    if (value.length < 3 || value.length > 15) {
        return { isValid: false, message: 'Must be between 3 and 15 characters' };
    }
    return { isValid: true, message: '' };
}

function validateEmail(value) {
    if (!value) {
        return { isValid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return { isValid: false, message: 'Please enter a valid email' };
    }
    return { isValid: true, message: '' };
}

function validateConfirmPassword(value) {
    const password = document.getElementById('password').value;
    if (!value) {
        return { isValid: false, message: 'Please confirm your password' };
    }
    if (value !== password) {
        return { isValid: false, message: 'Passwords do not match' };
    }
    return { isValid: true, message: '' };
}

function validatePhone(value) {
    if (!value) {
        return { isValid: false, message: 'Phone is required' };
    }
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(value)) {
        return { isValid: false, message: 'Please enter a valid Ukrainian phone number (+380XXXXXXXXX)' };
    }
    return { isValid: true, message: '' };
}

function validateBirthDate(value) {
    if (!value) {
        return { isValid: false, message: 'Date of birth is required' };
    }

    const birthDate = new Date(value);
    const today = new Date();

    if (birthDate > today) {
        return { isValid: false, message: 'Date of birth cannot be in the future' };
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 12) {
        return { isValid: false, message: 'You must be at least 12 years old to register' };
    }

    return { isValid: true, message: '' };
}

function validateCountry(value) {
    if (!value) {
        return { isValid: false, message: 'Country is required' };
    }
    return { isValid: true, message: '' };
}

function validateCity(value) {
    if (!value) {
        return { isValid: false, message: 'City is required' };
    }
    return { isValid: true, message: '' };
}

function validateSex() {
    const sexSelected = document.querySelector('input[name="sex"]:checked');
    if (!sexSelected) {
        document.getElementById('sex-error').textContent = 'Please select your sex';
        document.getElementById('sex-error').style.display = 'block';
        return false;
    }
    document.getElementById('sex-error').style.display = 'none';
    return true;
}

// Обробник події відправки форми авторизації
function handleLoginSubmit(e) {
    e.preventDefault();

    const form = e.target;
    let isValid = true;

    // Валідація полів
    isValid = validateField(document.getElementById('login-username'), validateUsername) && isValid;
    isValid = validateField(document.getElementById('login-password'), validatePassword) && isValid;

    if (isValid) {
        const formData = new FormData(form);
        // Тут буде відправка даних на сервер
        console.log('Login form data:', Object.fromEntries(formData.entries()));

        // Показуємо повідомлення про успіх
        document.getElementById('login-success').style.display = 'block';

        // Очищаємо форму
        form.reset();

        // Ховаємо повідомлення через 3 секунди
        setTimeout(() => {
            document.getElementById('login-success').style.display = 'none';
        }, 3000);
    }
}

// Обробник події відправки форми реєстрації
function handleRegisterSubmit(e) {
    e.preventDefault();

    const form = e.target;
    let isValid = true;

    // Масив усіх полів для перевірки
    const fieldsToValidate = [
        { id: 'first-name', validator: validateName },
        { id: 'last-name', validator: validateName },
        { id: 'email', validator: validateEmail },
        { id: 'password', validator: validatePassword },
        { id: 'confirm-password', validator: validateConfirmPassword },
        { id: 'phone', validator: validatePhone },
        { id: 'birth-date', validator: validateBirthDate },
        { id: 'country', validator: validateCountry },
        { id: 'city', validator: validateCity }
    ];

    // Перевіряємо всі поля і підкреслюємо всі невалідні
    fieldsToValidate.forEach(fieldObj => {
        const field = document.getElementById(fieldObj.id);
        const valid = validateField(field, fieldObj.validator);
        if (!valid) isValid = false;
    });

    // Окремо перевіряємо стать
    if (!validateSex()) isValid = false;

    if (isValid) {
        const formData = new FormData(form);
        // Тут буде відправка даних на сервер
        console.log('Register form data:', Object.fromEntries(formData.entries()));

        // Показуємо повідомлення про успіх
        document.getElementById('register-success').style.display = 'block';

        // Очищаємо форму
        form.reset();

        // Скидаємо вибір міста
        document.getElementById('city').disabled = true;
        document.getElementById('city').innerHTML = '<option value="">-- Select City --</option>';

        // Ховаємо повідомлення через 3 секунди
        setTimeout(() => {
            document.getElementById('register-success').style.display = 'none';
        }, 3000);
    }
}