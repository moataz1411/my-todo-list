const inputBox = document.getElementById("input-box")
const listcontainer = document.getElementById("list-container")
const openHistoryButton=document.getElementById("openhistory");
const closeHistoryButton=document.getElementById("closehistory");
const historypanel=document.getElementById("historypanel");
const historyList=document.getElementById("history-list");
inputBox.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addtask();
    }
});
function addtask(){
    console.log("clicked");
    if (inputBox.value === ''){
        alert("you must write something")
}
    else{
        let li =document.createElement ("li");
        li.innerHTML = inputBox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}
listcontainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        if(e.target.classList.contains("checked")){
            confetti({
                particleCount:100,
                spread:70,
                origin:{y:0.6},

            });
            let completedTasks=JSON.parse(localStorage.getItem("completedTasks")) || [];
            completedTasks.push(e.target.firstChild.textContent.trim());
            localStorage.setItem("completedTasks",JSON.stringify(completedTasks));
        }
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false)
function saveData(){
    localStorage.setItem("data",listcontainer.innerHTML);
}
function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showTask();

function openHistory(){
    historyList.innerHTML="";
    let completedTasks=JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.forEach(task=>{
        let li=document.createElement("li");
        li.textContent=task;
        historyList.appendChild(li);
    });
}
openHistoryButton.onclick=()=>{
    openHistory();
    historypanel.classList.add("active");
};
closeHistoryButton.onclick=()=>{
    historypanel.classList.remove("active");
};