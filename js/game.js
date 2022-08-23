const grid = document.querySelector(".grid");

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
            alert("Parabens");
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
        event.target.parentNode.classList.add("reveal_card");
        firstCard = event.target.parentNode;
    } else if (secondCard === "") {
        event.target.parentNode.classList.add("reveal_card");
        secondCard = event.target.parentNode;

        checkCards();
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

loadGame();
