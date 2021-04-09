// Referencias al DOM
const loginForm = document.querySelector('#login__formulario');
const loginEmail = document.querySelector('#login__email');
const loginPassword = document.querySelector('#login__password');
const loginBtn = document.querySelector('#login__btn');

addEventListeners();
function addEventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    loginEmail.addEventListener('blur', validarCampo);
    loginPassword.addEventListener('blur', validarCampo);
}

function iniciarApp() {
    loginBtn.disabled = true;
    loginBtn.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarCampo(e) {
    if ( e.target.value.length > 0 ) {
        this.classList.remove('is-invalid');
        e.target.parentElement.classList.remove('login__input--error');
    }else {
        this.classList.add('is-invalid');
        e.target.parentElement.classList.add('login__input--error');
        iniciarApp();
    }

    if ( loginEmail.value && loginPassword.value ) {
        loginBtn.disabled = false;
        loginBtn.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function enviarFormulario() {

}
