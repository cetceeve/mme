/* eslint-env browser */

function Task(taskDescription) {
	"use strict";
	this.description = taskDescription;
	this.id = Date.now().toString();
	this.completed = false;
}

Task.prototype.setStatusListener = function(callback) {
	"use strict";
	this.statusListener = callback;
};

Task.prototype.getID = function() {
	"use strict";
	return this.id;
};

Task.prototype.getDescription = function() {
	"use strict";
	return this.description;
};

Task.prototype.isCompleted = function() {
	"use strict";
	return this.completed;
};

Task.prototype.toggleStatus = function() {
	"use strict";
	this.completed = !this.completed;
	if(this.statusListener) {
		this.statusListener(this);
	}
	return this.completed;
};