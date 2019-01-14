/* eslint-env browser */
/* global request */

var Writer = Writer || {};

Writer.DocumentStorage = function() {
  "use strict";

  const NEW_FILE_URL = "/file/new",
    LOAD_FILE_URL = "/file/{{ID}}",
    SAVE_FILE_URL = "/file/{{ID}}/{{content}}";

  var that = new EventTarget(),
    currentFile;

  function create() {
    request({
      url: NEW_FILE_URL,
      method: "PUT",
      success: onResponse.bind(this, "fileLoaded"),
      error: onError,
    });
  }

  function load(id) {
    let url = LOAD_FILE_URL.replace("{{ID}}", id);
    request({
      url: url,
      success: onResponse.bind(this, "fileLoaded"),
      cache: "no-cache",
      error: onError,
    });
  }

  function save(content) {
    let url = SAVE_FILE_URL.replace("{{ID}}", currentFile.id).replace("{{content}}",
      encodeURIComponent(content));
    request({
      url: url,
      method: "POST",
      success: onResponse.bind(this, "fileSaved"),
      error: onError,
    });
  }

  function onError(error) {
    console.log(error);
  }

  function onResponse(requestType, file) {
    let event = new Event(requestType);
    currentFile = JSON.parse(file);
    event.id = currentFile.id;
    event.content = currentFile.content;
    that.dispatchEvent(event);
  }

  that.create = create;
  that.load = load;
  that.save = save;
  return that;
};