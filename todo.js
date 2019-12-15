const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

//const toDos = [];
let toDos = [];

function deleteToDo(event) {
  //console.log(event.target);
  //console.dir(event.target); button의 parent가 누구인지 알 수 있음 -> li
  //console.log(event.target.parentNode);
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  const cleanToDos = toDos.filter(function(toDo) {
    console.log(toDo.id, li.id); //string인지 number인지 확인하기 위해
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  //localStorage에 저장
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //js object -> string
}

function paintToDo(text) {
  //console.log(text);
  const li = document.createElement("li"); //새로운 list생성하고 싶을 때
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "X"; //innerHTML은 tag 추가, innerText는 text만 추가
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span); //list에 span과 button 추가
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //submit 이후에 다시 빈칸으로 나오게 하려고
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    //console.log(parsedToDos);
    parsedToDos.forEach(function(toDo) {
      //console.log(toDo.text);
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit); //handleSubmit() 으로 하면 안 됨
}

init();
