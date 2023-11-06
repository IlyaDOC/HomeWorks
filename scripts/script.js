window.onload = function () {

    // Функция для замены document.getElementByID
    const funcId = (id) => {
        return window.document.getElementById(id);
    }

    const fullName = funcId('name'); // переменная Full Name
    const userName = funcId('username'); // переменная UserName
    const agree = funcId('agree'); // переменная Agree
    const email = funcId('email'); // переменная Email
    const password = funcId('password'); // переменная Password
    const repeatPassword = funcId('repeat_password'); // переменная Repeat Password
    let checkFlag;
    let fullNameSpan = document.createElement('span');
    let userNameSpan = document.createElement('span');
    let emailSpan = document.createElement('span');
    let passwordSpan = document.createElement('span');
    let repeatSpan = document.createElement('span');
    let agreeSpan = document.createElement('span');

    /** Регулярные выражения */

    // Регулярное выражение для проверки email
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    // Регулярное выражение для проверки поля FullName (только буквы и пробел)
    const fullName_REGEXP = /[^a-zа-яё\s]/gi;

    // Регулярное выражение для проверки UserName (может содержать только буквы, цифры, символ подчеркивания и тире)
    const userName_REGEXP = /[^a-zа-яё0-9_\-]/gi;

    // Регулярное выражение для проверки пароля(минимум 8 символов, среди которых есть:
    // - хотя бы одна буква в верхнем регистре
    // - хотя бы одна цифра
    // - хотя бы один спецсимвол)
    const password_REGEXP = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    function validateEmail() {
        if (isEmailValid(email.value)) {
            return true;
        }
    }

    function errorStyleChange(id) { // делает поле input красным в одном месте
        funcId(id).style.borderBottomColor = 'red';
    }

    function validatedInput(id) { // изменение цвета border на стандартный при правильной валидации
        document.getElementById(id).style.borderBottomColor = '#C6C6C4'
    }


    function clear() { // Функция очистки всех полей
        document.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
    }

    function popup() { // появление popup по клику
        funcId('popup').style.display = 'flex';
    }

    function addSpan(element, text, id) { // создание текста ошибки
        element.innerText = text;
        element.classList.add('error-input');
        funcId(id).append(element);
    }

    const removeSpan = function (element) { // удаление текста ошибки
        element.remove();
    }

    fullName.onkeydown = (e) => { // проверка поля FullName на корректность
        if (fullName_REGEXP.test(fullName.value + e.key)) {
            errorStyleChange('name');
            addSpan(fullNameSpan, 'Full Name может содержать только буквы и пробел', 'label_name')
        } else {
            removeSpan(fullNameSpan);
            validatedInput('name');
        }
    }

    userName.onkeydown = (e) => { // проверка поля UserName на корректность
        if (userName_REGEXP.test(userName.value + e.key)) {
            errorStyleChange('username');
            addSpan(userNameSpan, 'Your username - может содержать только буквы, цифры, символ подчеркивания и тире', 'label_username')
        } else {
            removeSpan(userNameSpan);
            validatedInput('username');
        }
    }

    funcId('submit_btn').onclick = () => { // проверка полей начальной страницы

        if (!fullName.value) {  // Если поле Full Name пустое
            addSpan(fullNameSpan, 'Заполните поле Full Name', 'label_name')
            errorStyleChange('name');
            checkFlag = false;
        } else {
            validatedInput('name');
            removeSpan(fullNameSpan);
            checkFlag = true;
        }

        if (!userName.value) {
            addSpan(userNameSpan, 'Заполните поле Your username', 'label_username');
            errorStyleChange('username');
            checkFlag = false;
        } else {
            removeSpan(userNameSpan);
            validatedInput('username');
            checkFlag = true;
        }

        if (!validateEmail()) {
            addSpan(emailSpan, 'Заполните поле E-mail в правильном формате', 'label_email');
            errorStyleChange('email')
            checkFlag = false;
        } else {
            removeSpan(emailSpan);
            validatedInput('email')
            checkFlag = true;
        }

        if (password_REGEXP.test(password.value)) {
            removeSpan(passwordSpan);
            validatedInput('password')
            checkFlag = true;
        } else {
            addSpan(passwordSpan, 'Поле пароля должно содержать минимум 8 символов, среди которых есть:\n' +
                '- хотя бы одна буква в верхнем регистре\n' +
                '- хотя бы одна цифра\n' +
                '- хотя бы один спецсимвол', 'label_password');
            errorStyleChange('password');
            checkFlag = false;
        }

        if (repeatPassword.value !== password.value) {
            addSpan(repeatSpan, 'Password и Repeat Password должны совпадать', 'label_repeat');
            errorStyleChange('repeat_password');
            checkFlag = true;
        } else {
            removeSpan(repeatSpan);
            validatedInput('repeat_password')
            checkFlag = false;
        }

        if (!agree.checked) {
            addSpan(agreeSpan, 'Подтвердите пользовательское соглашение', 'label_agree');
            checkFlag = false;
        } else {
            removeSpan(agreeSpan);
            checkFlag = true;
        }


        if (checkFlag === true) {
            popup();
        }

        funcId('popup_button').onclick = () => {
            let fullNameValue = fullName.value.trim();
            let userNameValue = userName.value.trim();
            let emailValue = email.value.trim();
            let passwordValue = password.value.trim();
            let keyName = userNameValue;
            let clients = [];
            if (localStorage.getItem(keyName)) {
                clients = JSON.parse(localStorage.getItem(keyName));
            }
            clients.push(userNameValue, fullNameValue, emailValue, passwordValue);
            localStorage.setItem(keyName, JSON.stringify(clients));
            console.log(localStorage);
            funcId('popup').style.display = 'none';
            clear();
            funcId('agree').checked = false;
            login();
            let form = document.getElementsByClassName('form')[0];
            form.onsubmit = (e) => {
                e.preventDefault();
            }
        }

    }


    // Изменение первичной страницы для залогиненного пользователя
    function login() {
        document.getElementsByClassName('main_title')[0].innerText = 'Log in to the system';
        funcId('label_name').remove();
        funcId('label_email').remove();
        funcId('label_repeat').remove();
        funcId('label_agree').remove();
        funcId('submit_btn').innerText = 'Sign In';
        funcId('already_account').innerText = 'Registration';
        funcId('already_account').onclick = null;
        funcId('already_account').onclick = () => {
            window.location.reload();
        }
        funcId('submit_btn').onclick = null;
        funcId('submit_btn').onclick = () => {
            let checkFlag;
            // Проверки
            if (!userName.value) {
                addSpan(userNameSpan, 'Заполните поле Your username', 'label_username');
                errorStyleChange('username');
                checkFlag = false;
            } else {
                removeSpan(userNameSpan);
                validatedInput('username');
                checkFlag = true;
            }

            if (!password.value) {
                addSpan(passwordSpan, 'Введите пароль', 'label_password')
                errorStyleChange('password');
                checkFlag = false;
            } else {
                removeSpan(passwordSpan);
                validatedInput('password')
                checkFlag = true;
            }

            if (checkFlag === true) {
                let client = JSON.parse(localStorage.getItem(userName.value.trim()));
                if (client === null) {
                    addSpan(userNameSpan, 'Такой пользователь не зарегистрирован', 'label_username');
                    errorStyleChange('username');
                } else if (client[0] && password.value !== client[3]) {
                    addSpan(passwordSpan, 'Неверный пароль', 'label_password');
                    errorStyleChange('password');
                } else if (client[0] && password.value === client[3]) {
                    // Создание страницы личного кабинета
                    document.getElementsByClassName('main_title')[0].innerText = `Welcome, ${client[1]}!`;
                    funcId('submit_btn').innerText = 'Exit';
                    funcId('submit_btn').onclick = null;
                    funcId('submit_btn').onclick = () => {
                        window.location.reload();
                    }
                    funcId('label_username').remove();
                    funcId('label_password').remove();
                    funcId('already_account').remove();

                }
            }
        };

    }

    funcId('already_account').onclick = () => {
        login();
    }
}