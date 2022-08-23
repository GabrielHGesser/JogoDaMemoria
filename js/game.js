const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
    "Capitão_America",
    "deadpool",
    "Doutor_Estranho",
    "Gavião_Arqueiro",
    "Homem_aranha",
    "Homem_de_Ferro",
    "hulk",
    "Pantera_Negra",
    "thor",
    "Wolverine",
];

const createElement = (tag, classNameGive) => {
    const element = document.createElement(tag);
    element.className = classNameGive;
    return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled_card");

    setTimeout(() => {
        if (disabledCards.length >= 20) {
            clearInterval(this.loop);
            alert(`Parabéns, ${localStorage.getItem("player")}! Seu Tempo foi de: ${timer.innerHTML}`);
        }
    }, 200);
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add("disabled_card");
        secondCard.firstChild.classList.add("disabled_card");

        firstCard = "";
        secondCard = "";

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal_card");
            secondCard.classList.remove("reveal_card");

            firstCard = "";
            secondCard = "";
        }, 500);
    }
};

const revealCard = (event) => {
    if (event.target.parentNode.className.includes("reveal_card")) {
        return;
    }

    if (firstCard === "") {
        if (event.target.parentNode.className.includes("card")) {
            event.target.parentNode.classList.add("reveal_card");
            firstCard = event.target.parentNode;
        }
    } else if (secondCard === "") {
        if (event.target.parentNode.className.includes("card")) {
            event.target.parentNode.classList.add("reveal_card");
            secondCard = event.target.parentNode;

            checkCards();
        }
    }
};

// Função para criar carta
const createCard = (character) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");
    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;

        timer.innerHTML = currentTime + 1;
    }, 1000);
};

// Quando a janela tiver carregada executa isso aqui
window.onload = () => {
    spanPlayer.innerHTML = `Name: ${localStorage.getItem("player")}`;
    startTimer();
    loadGame();
};
