/* eslint-env browser */
/* global TaskList, TaskView */

var taskList,
    taskView;

function init() {
    "use strict";
    let taskListEl = document.querySelector("#tasks");
    taskList = new TaskList();
    taskList.setNewTaskListener(onNewTaskCreated);
    taskList.setTaskStatusChangedListener(onTaskStatusChanged);
    taskView = new TaskView(taskListEl);
    taskView.setTaskClickedListener(onTaskItemClicked);
    taskView.setNewTaskDescriptionCreatedListener(onNewTaskDescriptionCreated);
}

function onNewTaskCreated(task) {
    "use strict";
    taskView.addTask(task);
}

function onTaskStatusChanged(task) {
    "use strict";
    taskView.renderTaskStatus(task);
}

function onTaskItemClicked(taskID) {
    "use strict";
    let task = taskList.getTaskById(taskID);
    task.toggleStatus();
}

function onNewTaskDescriptionCreated(taskDescription) {
    "use strict";
    taskList.createNewTask(taskDescription);
}

init();