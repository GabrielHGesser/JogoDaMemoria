// Pegando o Input e o Button
const input = document.querySelector(".login_input");
const button = document.querySelector(".login_button");
const form = document.querySelector(".login_form");

// Criando função para validar o Input
const validateInput = (event) => {
    // Se possuir mais de 4 digitos removo o atributo DISABLED
    if (event.target.value.length > 4) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "");
    }
};

/*  
    Adicionando um evento no input para que sempre
    que a pessoa digitar algo chame o evento        
*/
input.addEventListener("input", validateInput);

const handleSubmit = (event) => {
    // Previnindo que o submit recarregue a página
    event.preventDefault();

    // Salvando o name no localStorage do seu navegador
    localStorage.setItem("player", input.value);

    window.location = "pages/game.html";
};

// Adicionando evento no form para quando houver o submit eu salvar o name
form.addEventListener("submit", handleSubmit);
