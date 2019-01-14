/* eslint-env node */

"use strict";

const express = require("express"),
  PORT = 8080;

var app = express(),
  storage = require("./lib/DataStorage.js");

app.put("/file/new", function(request, response) {
  let file = storage.create();
  response.status(200).send(file);
});

app.post("/file/:id/:content", function(request, response) {
  let file = storage.save(request.params.id, request.params.content);
  response.status(200).send(file);
});

app.get("/file/:id", function(request, response) {
	let file = storage.load(request.params.id);
	if(file) {
	response.status(200).send(file);
	} else {
		response.status(404).send("File not found on server.");
	}
});

app.use(express.static("www"));

app.listen(PORT, function () {
  console.log("Writer app listening on port " + PORT + "!");
});
