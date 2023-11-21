const divUser = document.querySelector('.name');
const divScore = document.querySelector('.score');
const divNum1 = document.querySelector('.numero1');
const divNum2 = document.querySelector('.numero2');
const divOpe = document.querySelector('.operador');
const divCard = document.querySelector('.flex2');
const input = document.getElementById('resposta');
var botao = document.getElementById("btn_resposta");
var nomeUsuario = localStorage.getItem('user');
var scoreAtual = parseInt(localStorage.getItem(nomeUsuario));


const operadores = [
    '+',
    '-',
    '/',
    '*'
];

function sugerirOperacaoAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * operadores.length);

    return operadores[indiceAleatorio];
}

function Num(){
    return Math.floor(Math.random() * 100) + 1;
}

var resultadoFinal;
var num1;
var num2;
var operador;

function criarConta() {
    return new Promise((resolve) => {
        num1 = Num();
        num2 = Num();

        if (num1 <= num2) {
            var varPass = num2;
            num2 = num1;
            num1 = varPass;
        }

        const operador = sugerirOperacaoAleatoria();

        var resultado = executarOperacao(num1, num2, operador);
        resultadoFinal = arredondarParaDuasCasasDecimais(resultado);

        editarHTML(num1, num2, operador);

        resolve({
            resultadoFinal: resultadoFinal,
            operador: operador,
            num1: num1,
            num2: num2
        });
    });
}

function editarHTML(num1, num2, operador){
    divNum1.innerHTML = num1;
    divOpe.innerHTML = operador;
    divNum2.innerHTML = num2;
}

function arredondarParaDuasCasasDecimais(resultado) {
    return parseFloat(resultado.toFixed(0));
}

function executarOperacao(num1, num2, operador) {

    switch (operador) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return NaN;
    }
}

function verificarResposta(){
    if(input.value == resultadoFinal){
        input.value = "";
        scoreAtual += 1;
        localStorage.setItem(nomeUsuario, scoreAtual.toString());
        divScore.innerHTML = scoreAtual;
        divCard.style.backgroundColor = "rgba(83, 255, 189, 0.334)";
        setTimeout(function() {
            divCard.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        }, 1000);
    }else{
        input.value = "";
        divCard.style.backgroundColor = "rgba(255, 69, 69, 0.373)";
        setTimeout(function() {
            divCard.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        }, 1000);
    }

    criarConta();
}

botao.addEventListener("click", function() {
    verificarResposta();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        botao.click();
    }
});

window.onload = () => {
    const userName = localStorage.getItem('user');

    divUser.innerHTML = userName;
    divScore.innerHTML = scoreAtual;

    criarConta();
}