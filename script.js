let mainFrame = document.getElementById("main-frame");
mainFrame.classList =
  "flex flex-col items-centeritems-center  m-5 p-5 gap-5 text-2xl";
let input = document.getElementById("Task");
input.classList =
  " p-3 border-2 border-gray-700 focus:border-pink-600 rounded-xl h-13 w-90";
let list = document.getElementById("list");
let btn = document.getElementById("btn");
btn.classList =
  "bg-orange-500 rounded-lg w-25 h-13 items-center shadow-lg outline outline-black/10 ";
// "rounded px-4 py-2 border-2 bg-teal-200 border-teal-700";
let tracker = 1;
let data = JSON.parse(localStorage.getItem("myTask")) || [];
let distinct = data.length > 0 ? data[data.length - 1].id + 1 : 1;
let inputId = 10;
function onload() {
  data.forEach((item) => {
    renderTask(item.task, item.id);
  });
}

function handleAddTask() {
  let val = input.value.trim();
  if (val !== "") {
    let newTask = { task: val, id: distinct };
    data.push(newTask);
    localStorage.setItem("myTask", JSON.stringify(data));
    renderTask(newTask.task, newTask.id);
    distinct++;
    input.value = "";
  } else {
    Swal.fire({
      title: "Warning!",
      text: "You left Fields Empty!",
      icon: "warning",
      iconColor: "darkorange",
      confirmButtonColor: "red",
    });
  }
}

btn.addEventListener("click", handleAddTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleAddTask();
});

function renderTask(task, id) {
  let li = document.createElement("li");
  li.classList =
    "flex flex-row justify-between  border-b-2 text-xl w-220 items-center rounded-xl bg-white p-5 shadow-lg outline outline-black/5 ";
  let title = document.createElement("h3");
  let functionbtns = document.createElement("span");
  functionbtns.classList = "flex gap-1 h-10";
  // console.log(JSON.stringify(li.classList.value));
  let delBtn = document.createElement("button");
  delBtn.classList =
    "bg-orange-600 pb-2 rounded-lg w-10 items-center shadow-lg outline outline-black/10";
  let editBtn = document.createElement("button");
  editBtn.classList =
    "bg-orange-400 p-2 rounded-lg w-20 items-center shadow-lg outline outline-black/10";
  title.classList = "pl-4 h-10 text-2xl";
  title.innerText = task;
  delBtn.innerText = "x";
  editBtn.innerText = "Edit";

  // functionbtns.setAttribute("class", "fxnBtns");
  functionbtns.append(editBtn, delBtn);
  li.append(title, functionbtns);
  list.appendChild(li);

  //------------Delete Function-------------
  delBtn.addEventListener("click", () => {
    data = data.filter((item) => item.id !== id);
    localStorage.setItem("myTask", JSON.stringify(data));
    list.removeChild(li);
  });

  //------------------Edit Function------------------
  editBtn.addEventListener("click", () => {
    editBtn.disabled = true;
    const editInput = document.createElement("input");
    editInput.classList =
      " p-3 border-2 border-gray-700 focus:border-pink-600 rounded-xl h-13 w-90";

    editInput.setAttribute("id", inputId++);
    editInput.value = title.innerText;
    li.appendChild(editInput);
    editInput.focus();

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        let newVal = editInput.value.trim();
        if (newVal !== "") {
          title.innerText = newVal;
          let item = data.find((obj) => {
            return obj.id === id;
          });
          if (item) item.task = newVal;

          localStorage.setItem("myTask", JSON.stringify(data));
        }
        li.removeChild(editInput);
        editBtn.disabled = false;
      }
    });

    editInput.addEventListener("blur", () => {
      if (li.contains(editInput)) li.removeChild(editInput);
      editBtn.disabled = false;
    });
  });
}

onload();
