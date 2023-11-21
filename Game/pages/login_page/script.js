const input = document.getElementById('txt_user');
const form = document.getElementById('login_form');

const tratarEnvio = (event) => {
    event.preventDefault();
    
    if (input.value.length > 2){
        localStorage.setItem('user', input.value);
        window.location = '../home_page/index.html'
        var nomeUsuario = localStorage.getItem('user');

        if (!localStorage.getItem(nomeUsuario)) {
            localStorage.setItem(nomeUsuario, '00');
        }
    } else {
        alert('O usuário deve ter pelo menos 3 caracteres.')
    }
}

form.addEventListener('submit', tratarEnvio);