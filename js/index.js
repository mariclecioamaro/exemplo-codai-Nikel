const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let password = document.getElementById('password-create-input1');
let passwordCheck = document.getElementById('password-create-input2');

function colorBack() {
    document.getElementById("color-back");

    document.body.style.background = "linear-gradient(120deg, #ffa500 44.9%, #ffffff 45%) no-repeat fixed";
};

passwordCheck.addEventListener('input', passwordVerif);

checkLogged();

//LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccout(email);

    if (!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    if (account) {
        if (account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);


        window.location.href = "home.html";
    }
});

//CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input1").value;

    if (email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if (password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }


    if (passwordVerif) {
        saveAccount({
            login: email,
            password: password,
            transactions: []
        });
    }

    myModal.hide();

    alert("Conta criada com sucesso.");
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccout(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return "";
}

function passwordVerif() {
    if (password.value != passwordCheck.value) {
        passwordCheck.setCustomValidity("Senhas diferentes! Digite senhas iguais.");
        passwordCheck.reportValidity();
        return false;
    } else {
        passwordCheck.setCustomValidity("");
        return true;
    }
}