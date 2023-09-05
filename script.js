const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Escreva algo!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = listContainer.querySelectorAll("li");
    if (tasks.length > 0) {
        localStorage.setItem("data", listContainer.innerHTML);
    } else {
        localStorage.removeItem("data");
    }
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    } else {
        // Se o localStorage estiver vazio, adicione as tarefas padrão com a opção de exclusão
        listContainer.innerHTML = `
            <li>Documento de Identificação <span class="delete">&#x00D7;</span></li>
            <li>Comprovante de residência (prazo de 90 dias)<br> ou conforme descrito no fluid <span class="delete">&#x00D7;</span></li>
            <li>Comprovante de renda (prazo de 60 dias) ou presumida/informada<span class="delete">&#x00D7;</span></li>
            <li>Capital social padrão (20,00) ou conforme socilitado<span class="delete">&#x00D7;</span></li>
            <li>Conferência de dados, valores de crédito e <br> cheque antes de efetivação<span class="delete">&#x00D7;</span></li>
            <li>Imposto de renda - somente sendo referente a 2022/2023<span class="delete">&#x00D7;</span></li>
            <li>Conferir se a conta está na agência correta<span class="delete">&#x00D7;</span></li>
            <li>Conferir se há cheque especial, conta salário ou débito automático<span class="delete">&#x00D7;</span></li>
        `;

        // Adicione eventos de clique para exclusão às tarefas padrão
        const deleteButtons = listContainer.querySelectorAll(".delete");
        deleteButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                button.parentElement.remove();
                saveData();
            });
        });
    }
}

// Chame a função showTask() após a definição dos eventos
showTask();