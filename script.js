const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask (){
    if(inputBox.value === ''){
        alert("Escreva algo!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName = "SPAN"){
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

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();