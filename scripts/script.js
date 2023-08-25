window.onload = function () {

    const funcId = (id)=> {
        const res = window.document.getElementById(id);
        return res;
    }

    let fullName = document.getElementById('name');
    fullName.onkeydown = (e) => {
        if (!isNaN(parseInt(e.key))) {
            return false;
        }
    }

    let userName = funcId('username');
    userName.onkeydown = (e) => {
        if (e.key === '.' || e.key === ',') {
            return false;
        }
    }

    let agree = funcId('agree');

    agree.addEventListener('change', () => {
        if (agree.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен');
        }
    })

    function login() {
        document.getElementsByClassName('main_title')[0].innerText = 'Log in to the system';
        funcId('label_name').remove();
        funcId('label_email').remove();
        funcId('label_repeat').remove();
        funcId('label_agree').remove();
        funcId('submit_btn').innerText = 'Sign In';
        funcId('already_account').remove();
        funcId('submit_btn').onclick = null;
        funcId('submit_btn').onclick = () => {


            if (!userName.value) {
                alert('Заполните поле Username');
                return;
            }

            if (!password.value) {
                alert('Заполните поле Password');
                return;
            }
            if (password.value.length < 8) {
                alert('Длинна пароль должна быть больше 8 символов')
                return;
            }

            alert(`Добро пожаловать, ${document.getElementById('username').value}!`);

            clear();
        };

    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value); }

    function validateEmail () {
        if (isEmailValid(email.value)) {
            return true;
    }
    }

    function clear() {
        document.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
    }


    function popup() {
        funcId('submit_btn').onclick = () => {
            funcId('popup').style.display = 'flex';
        }
    }

    let email = funcId('email');
    let password = funcId('password');
    let repeatPassword = funcId('repeat_password');

    funcId('submit_btn').onclick = () => {
        if (!fullName.value) {
            alert('Заполните поле Full Name');
            return;
        }

        if (!userName.value) {
            alert('Заполните поле Username');
            return;
        }

        if (!email.value) {
            alert('Заполните поле E-mail');
            return;
        }
        if (!validateEmail()) {
            alert('Заполните поле E-mail в правильном формате');
            return;
        }

        if (!password.value) {
            alert('Заполните поле Password');
            return;
        }

        if (!repeatPassword.value) {
            alert('Заполните поле Repeat Password');
            return;
        }

        if (password.value.length < 8) {
            alert('Длинна пароль должна быть больше 8 символов');
            return;
        }

        if (password.value !== repeatPassword.value) {
            alert('Введенные пароли не совпадают')
            return;
        }

        if (agree.checked !== true) {
            alert('Подтвердите пользовательское соглашение')
            return;
        }

        popup();

        funcId('popup_button').onclick = () => {
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

    funcId('already_account').onclick = () => {
        login();
    }
}

console.log("Hello, world!")