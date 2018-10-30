/* eslint-env browser */
/* global Task */

function TaskList() {
	"use strict";
	this.tasks = [];
}

TaskList.prototype.createNewTask = function(taskDescription) {
	"use strict";
	let newTask = new Task(taskDescription);
	newTask.setStatusListener(this.onTaskStatusChanged.bind(this));
	this.tasks.push(newTask);
	if(this.newTaskListener) {
		this.newTaskListener(newTask);
	}
};

TaskList.prototype.getTaskById = function(id) {
	"use strict";
	for(let i = 0; i < this.tasks.length; i++) {
		if(this.tasks[i].getID() === id) {
			return this.tasks[i];
		}
	}	
	return undefined;
};

TaskList.prototype.onTaskStatusChanged = function(task) {
	"use strict";
	if(this.taskStatusChangedListener) {
		this.taskStatusChangedListener(task);
	}
};

TaskList.prototype.setNewTaskListener = function(callback) {
	"use strict";
	this.newTaskListener = callback;
};

TaskList.prototype.setTaskStatusChangedListener = function(callback) {
	"use strict";
	this.taskStatusChangedListener = callback;
};
