/* eslint-env node */
"use strict";

const fs = require("fs"),
  path = require("path"),
  crypto = require("crypto"),
  DATA_PATH = "./data";

function File(id, content) {
  this.id = id;
  this.content = content;
}

function checkFile(id) {
  let filePath = path.join(DATA_PATH, id);
  return fs.existsSync(filePath);
}

function loadFile(id) {
  let filePath = path.join(DATA_PATH, id),
    file = fs.readFileSync(filePath);
  return file;
}

function createFile() {
  let id = crypto.randomBytes(16).toString("hex"),
    filePath = path.join(DATA_PATH, id);
  fs.writeFileSync(filePath, "");
  return id;
}

function getFile(id) {
  let fileExist = checkFile(id),
    file = new File(id);
  if (fileExist) {
    file.content = loadFile(id).toString();
  } else {
    file.id = createFile();
    file.content = loadFile(file.id).toString();
  }
  return file;
}

function saveFile(id, content) {
  let filePath = path.join(DATA_PATH, id),
    file = new File(id, content);
  fs.writeFileSync(filePath, content);
  return file;
}

module.exports = {
  create: getFile.bind(this, "new"),
  load: getFile,
  save: saveFile,
};