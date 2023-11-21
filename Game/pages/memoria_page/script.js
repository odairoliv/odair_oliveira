const grid = document.querySelector('.grid-game');
const divUser = document.querySelector('.name');
const divScore = document.querySelector('.score');
const userName = localStorage.getItem('user');
var scoreAtual = parseInt(localStorage.getItem(userName));

const imagens = [
    'C',
    'C_ch',
    'C++',
    'html',
    'Java',
    'javascript',
    'php',
    'Python',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if(disableCards.length == 16){
        alert('Parabéns, você venceu! Ganhou +2 pontos!');
        scoreAtual += 2;
        localStorage.setItem(userName, scoreAtual.toString());
        divScore.innerHTML = scoreAtual;
    }
}

const checkCard = () => {
    const firstImage = firstCard.getAttribute('data-imagem');
    const secondImage = secondCard.getAttribute('data-imagem');

    if (firstImage == secondImage){
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        setTimeout(() => {
            checkEndGame();
        }, 500);

    } else {

        setTimeout(() => {
            firstCard.classList.remove('card-reveal');
            secondCard.classList.remove('card-reveal');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({target}) => {

    if(target.parentNode.className.includes('card-reveal')){
        return;
    }

    if (firstCard == ''){
        target.parentNode.classList.add('card-reveal');
        firstCard = target.parentNode;
    } else if (secondCard == ''){
        target.parentNode.classList.add('card-reveal');
        secondCard = target.parentNode;

        checkCard();
    }
}

const createCard = (imagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../../assets/img/cards/${imagem}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-imagem', imagem);

    return card;
}

const loadGame = () => {

    const duplicarImagem = [ ... imagens, ... imagens];

    const embaralharImagens = duplicarImagem.sort( () =>  Math.random() - 0.5);

    embaralharImagens.forEach((imagem) =>{
        const card = createCard(imagem);
        grid.appendChild(card);
    });
}

window.onload = () => {
    loadGame();

    divUser.innerHTML = userName;
    divScore.innerHTML = scoreAtual;
}