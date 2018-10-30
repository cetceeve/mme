function TaskView(el) {
  "use strict";
  this.taskListEl = el.querySelector("#task-list");
  this.inputField = el.querySelector("[name=new-task]");
  this.inputField.addEventListener("keyup", this.onKeyUpInInputField.bind(this));
}

TaskView.prototype.createTaskContainer = function(task) {
  "use strict";
  let newTaskEl = document.createElement("li"),
    firstTaskInCurrentList = this.taskListEl.querySelector("li");
  newTaskEl.innerHTML = task.getDescription();
  newTaskEl.setAttribute("data-id", task.getID());
  newTaskEl.addEventListener("click", this.onTaskClicked.bind(this));
  this.taskListEl.insertBefore(newTaskEl, firstTaskInCurrentList);
};

TaskView.prototype.addTask = function(task) {
  "use strict";
  this.createTaskContainer(task);
};

TaskView.prototype.renderTaskStatus = function(task) {
  "use strict";
  let taskEl = this.taskListEl.querySelector("[data-id='" + task.getID() +
    "']");
  if (task.isCompleted()) {
    taskEl.classList.add("completed");
    this.moveElToBottom(taskEl);
  } else {
    taskEl.classList.remove("completed");
    this.moveElToTop(taskEl);
  }
};

TaskView.prototype.moveElToTop = function(taskEl) {
	"use strict";
    let firstTaskInCurrentList = this.taskListEl.querySelector("li");
    this.taskListEl.insertBefore(taskEl, firstTaskInCurrentList);
};

TaskView.prototype.moveElToBottom = function(taskEl) {
	"use strict";
    let firstCompletedTaskInCurrentList = this.taskListEl.querySelectorAll("li.completed")[1];
    if (firstCompletedTaskInCurrentList) {
        this.taskListEl.insertBefore(taskEl, firstCompletedTaskInCurrentList);
    } else {
        this.taskListEl.appendChild(taskEl);
    }
};

TaskView.prototype.setTaskClickedListener = function(callback) {
  "use strict";
  this.taskClickedListener = callback;
};

TaskView.prototype.setNewTaskDescriptionCreatedListener = function(callback) {
  "use strict";
  this.newTaskDescriptionCreatedListener = callback;
};

TaskView.prototype.onKeyUpInInputField = function(event) {
  "use strict";
  if (event.keyCode === 13) {
    if (this.newTaskDescriptionCreatedListener) {
      this.newTaskDescriptionCreatedListener(this.inputField.value);
      this.inputField.value = "";
    }
  }
};

TaskView.prototype.onTaskClicked = function(event) {
  "use strict";
  let taskID = event.target.getAttribute("data-id");
  if (this.taskClickedListener) {
    this.taskClickedListener(taskID);
  }
};