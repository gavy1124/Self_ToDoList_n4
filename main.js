let filterList = [];
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let todoList = [];
let list = [];
let mode = "all";
let menus = document.querySelectorAll(".taskTabs div:not(#underLine)");

menus.forEach((key) =>
    key.addEventListener("click", (e) => {
        filter(e);
        indicator(e);
    })
);

addBtn.addEventListener("click", add);
input.addEventListener("focus", function () {
    input.value = "";
});
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        add();
    }
});

function indicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top =
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function filter(e) {
    mode = typeof e === "string" ? e : e.currentTarget.id;
    filterList = [];
    for (let i = 0; i < todoList.length; i++) {
        if (mode == "all") {
            render();
        } else if (mode == "onGoing") {
            if (todoList[i].isComplete == false) {
                filterList.push(todoList[i]);
            }
        } else if (mode == "completed") {
            if (todoList[i].isComplete == true) {
                filterList.push(todoList[i]);
            }
        }
    }
    render();
}

function add() {
    let task = {
        id: generateID(),
        content: input.value,
        isComplete: false,
    };
    todoList.push(task);
    render();
}

function render() {
    let resultHTML = ``;

    if (mode == "all") {
        list = todoList;
    } else if (mode == "onGoing" || mode == "completed") {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `
                        <div class="task">
                            <div id="done">${list[i].content}</div>
                            <div>
                                <button onclick="chk('${list[i].id}')">check</button>
                                <button onclick="del('${list[i].id}')">delete</button>
                            </div>                        
                        </div>
            `;
        } else {
            resultHTML += `
                        <div class="task">
                            <div>${list[i].content}</div>
                            <div>
                                <button onclick="chk('${list[i].id}')">check</button>
                                <button onclick="del('${list[i].id}')">delete</button>
                            </div>                        
                        </div>
            `;
        }
    }

    document.querySelector(".taskBoard").innerHTML = resultHTML;
}

function chk(id) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            todoList[i].isComplete = !todoList[i].isComplete;
            break;
        }
    }
    render();
}

function del(id) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            todoList.splice(i, 1);
            break;
        }
    }
    // render();
    filter(mode);
}

function generateID() {
    return Math.random().toString(36).substr(2, 16);
}
