const divUser = document.querySelector('.name');
const divScore = document.querySelector('.score');

window.onload = () => {
    const userName = localStorage.getItem('user');
    var scoreAtual = parseInt(localStorage.getItem(userName));

    divUser.innerHTML = userName;
    divScore.innerHTML = scoreAtual;
}