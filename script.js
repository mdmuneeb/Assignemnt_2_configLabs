let todoArray = [];
let doneArray = [];
let getTodoTask;
let loader; 
let MajorTag = document.getElementById("Main");
let MajorTag2 = document.getElementById("Main2");
let todoLength = document.getElementById("todoLength");
let doneLength = document.getElementById("doneLength");



let onSubmit=()=>{
    let input = document.getElementById("inputTask");
    if(input.value !== ''){
        todoArray.push(input.value);
        input.value = '';
        setTodoLocal(todoArray);
        // setDoneLocal(doneArray);
        getTodoLocal()
    }
    else{
        alert("Kindly Enter text first...")
    }
    
}


let setTodoLocal = (list) =>{
    let todoTask = JSON.stringify(list);
    localStorage.setItem("todoTask", todoTask);
}

let setDoneLocal = (list) => {
    let doneTask = JSON.stringify(list);
    localStorage.setItem("doneTask", doneTask)
}

let getTodoLocal = () =>{
    getTodoTask = localStorage.getItem("todoTask");
    getTodoTask = JSON.parse(getTodoTask);
    if(getTodoTask !== null){
        todoArray = getTodoTask;
        MajorTag.innerHTML = "";
        todoLength.textContent = getTodoTask.length;
        getTodoTask.map((v,i)=>{
            createTodoHTML(v, getTodoTask);
        })
    }
}

let getDoneLocal = () =>{
    let getDoneTask = localStorage.getItem("doneTask");
    getDoneTask = JSON.parse(getDoneTask);
    if(getDoneTask !== null){
        doneArray = getDoneTask
        MajorTag2.innerHTML = "";
        doneLength.textContent= getDoneTask.length
        getDoneTask.map((v,i)=>{
            createDoneHTML(v);
        })
    }
}

let createTodoHTML = (data, List) =>{
    let mainTag1 = document.createElement("div");
    let mainPTag = document.createElement("p");
    let mainTag2 = document.createElement("div");
    let iTag1 = document.createElement("i");
    let iTag2 = document.createElement("i");
    let iTag3 = document.createElement("i");

    mainTag1.classList.add("p-3", "pt-4", "mb-2", "d-flex", "justify-content-between", "align-items-center", "fs-5");
    mainTag1.style.color = "#9E78CF";
    mainTag1.style.backgroundColor = "#15101C";
    
    mainPTag.classList.add("fw-bold");
    
    mainTag2.classList.add("d-flex", "justify-content-around", "gap-4", "fs-4");
    
    iTag1.classList.add("fa-sharp", "fa-solid", "fa-check");
    iTag2.classList.add("fa-solid", "fa-trash");
    iTag3.classList.add("fa-solid", "fa-pencil")

    iTag1.addEventListener("click", ()=>{
        moveToDoneTask(data)
    })

    iTag2.addEventListener("click", ()=>{
        Delete(data, List)
    })

    iTag3.addEventListener("click", ()=>{
        editTodoTask(data)
    })
    
    mainTag1.appendChild(mainPTag);
    mainTag1.appendChild(mainTag2);
    
    mainTag2.appendChild(iTag3);
    mainTag2.appendChild(iTag2);
    mainTag2.appendChild(iTag1);
    
    mainPTag.textContent = data;
    
    MajorTag.appendChild(mainTag1);
}

let createDoneHTML = (data) =>{
    let mainTag1 = document.createElement("div");
    let mainPTag = document.createElement("p");

    mainTag1.classList.add("p-3", "pt-4", "mb-2", "d-flex", "justify-content-between", "align-items-center", "fs-5", "text-decoration-line-through");
    mainTag1.style.color = "#78CFB0";
    mainTag1.style.backgroundColor = "#15101C";
    
    mainPTag.classList.add("fw-bold");
    
    // mainTag2.classList.add("d-flex", "justify-content-around", "gap-4", "fs-4");
    
    // iTag1.classList.add("fa-duotone", "fa-solid", "fa-check");
    // iTag2.classList.add("fa-solid", "fa-trash");


    
    mainTag1.appendChild(mainPTag);
    // mainTag1.appendChild(mainTag2);
    
    // mainTag2.appendChild(iTag1);
    // mainTag2.appendChild(iTag2);
    
    mainPTag.textContent = data;
    
    MajorTag2.appendChild(mainTag1);
}

let Delete = (item, list) =>{
    let newList = list.filter((val)=> {
        return val !== item
    })
    setTodoLocal(newList);
    getTodoLocal()
}

let moveToDoneTask = (data) => {
    // debugger;
    doneArray.push(data);
    let newList2 = todoArray.filter((val)=> {return val !== data})
    let newList = doneArray
    setDoneLocal(newList);
    setTodoLocal(newList2);
    getTodoLocal();
    getDoneLocal();
}

let editTodoTask = (task) =>{
    let editInputUser = prompt("Enter: ")
    let editTask = todoArray.map((v,i)=>{
        if(v === task){
            return v = editInputUser
        }
    })
    setTodoLocal(editTask);
    getTodoLocal();
}


getTodoLocal()
getDoneLocal()
