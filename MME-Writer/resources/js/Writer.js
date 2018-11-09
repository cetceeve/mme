/* eslint-env browser */

var Writer = Writer || {};

Writer.App = (function() {
  "use strict";

  var that = {},
    storage,
    stats,
    editor;

  function init() {
    initView();
    initController();
    initStorage();
  }

  function initView() {
    let statsEl = document.querySelector("#stats");
    stats = Writer.StatsView().init(statsEl);
  }

  function initController() {
    let editorEl = document.querySelector("#editor");
    editor = Writer.EditorController().init(editorEl);
    editor.addEventListener("textChanged", onTextChanged);
  }

  function initStorage() {
    storage = Writer.Storage();
    editor.setText(storage.load());
  }

  function onTextChanged(event) {
    stats.updateStats(event.stats);
    storage.save(editor.getText());
  }

  that.init = init;
  return that;
}());

Writer.App.init();