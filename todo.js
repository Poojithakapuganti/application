let head = document.createElement("h1");
head.textContent = "Todos";
head.style.textAlign = "center";
document.body.appendChild(head);
let para = document.createElement("p");
let sp = document.createElement("span");
sp.textContent = "Create ";
sp.style.fontWeight = "500";
document.body.appendChild(sp);
para.textContent = "task";
document.body.appendChild(para);
let input = document.createElement("input");
input.type = "text";
input.id = "inputid";
input.placeholder = "What needs to be done?";
document.body.appendChild(input);
let addbtn = document.createElement("button");
addbtn.classList.add("btn", "btn-primary");
addbtn.textContent = "Add";
document.body.appendChild(addbtn);
let br = document.createElement("br");
document.body.appendChild(br);
let par = document.createElement("p");
let s = document.createElement("span");
s.textContent = "My ";
s.style.fontWeight = "500";
document.body.appendChild(s);
par.textContent = "tasks";
document.body.appendChild(par);


let todolist = [];
let count = todolist.length;
//console.log(count);
let userkey = "store";

function getlocalarray() {
    let array = localStorage.getItem(userkey);
    if (array === "") {
        return [];
    } else {
        return JSON.parse(array);
    }
}

todolist = getlocalarray();


function add(todo) {

    let checkcontain = document.createElement("div");
    checkcontain.classList.add("d-flex", "flex-row", "checkcon");
    let check = document.createElement("input");
    check.type = "checkbox";
    check.id = todo.text + todo.id;
    check.classList.add("check1");
    checkcontain.appendChild(check);
    check.checked = todo.ischecked;
    let labelcon = document.createElement("div");
    labelcon.classList.add("container", "d-flex", "flex-row", "justify-content-between");
    let label = document.createElement("label");
    label.textContent = todo.text;
    label.setAttribute("for", todo.text + todo.id);
    labelcon.appendChild(label);
    if (todo.ischecked === true) {
        label.classList.add("checked");
    }

    let icon = document.createElement("i");
    icon.classList.add("far", "fa-trash-alt", "del");
    icon.id = todo.text + todo.id;
    labelcon.appendChild(icon);

    checkcontain.appendChild(labelcon);
    document.body.appendChild(checkcontain);
    check.onclick = function() {
        label.classList.toggle("checked");
        if (todo.ischecked === false) {
            todo.ischecked = true;
        } else {
            todo.ischecked = false;
        }
    }

    icon.onclick = function() {
        document.body.removeChild(checkcontain);
        let x = document.getElementById(icon.id);
        let index = todolist.findIndex(function(eachitem) {
            if (x === eachitem.text + eachitem.id) {
                return true;
            } else {
                return false;
            }
        });
        todolist.splice(index, 1);
    }
}
addbtn.onclick = function() {
    let k = document.getElementById("inputid");
    count = count + 1;
    let newnode = {
        text: k.value,
        id: count,
        ischecked: false,
    }
    add(newnode);
    todolist.push(newnode);
    k.value = "";
}
for (let a of todolist) {
    add(a);
}
let savebtn = document.createElement("button");
savebtn.classList.add("btn", "btn-primary", "save");
savebtn.textContent = "Save";
document.body.appendChild(savebtn);
savebtn.onclick = function() {
    localStorage.setItem(userkey, JSON.stringify(todolist));
}