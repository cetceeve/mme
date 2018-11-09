/* eslint-env browser */

var Writer = Writer || {};

Writer.Storage = function() {
  "use strict";

  const STORAGE_KEY = "Writer-Text-Storage";

  var that = {};

  function save(text) {
    localStorage.setItem(STORAGE_KEY, text);
  }

  function load() {
    let text = localStorage.getItem(STORAGE_KEY) || "";
    return text;
  }

  that.save = save;
  that.load = load;
  return that;
};