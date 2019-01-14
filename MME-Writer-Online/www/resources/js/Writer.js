/* eslint-env browser */

var Writer = Writer || {};

Writer.App = (function() {
  "use strict";

  const AUTO_SAVE_INTERVAL = 30000,
  NOTIFICATION_DURATION = 2000;

  var that = {},
    editor,
    storage,
    notifications,
    autosaveLoop;

  function init() {
    initNotifications();
    initController();
    initDocumentStorage();
    return that;
  }

   function start() {
    let url = window.location.href,
      id = url.split("#")[1];
    if(id) {
      storage.load(id);
    } else {
      storage.create();
    }
  }

  function initNotifications() {
    let notificationEl = document.querySelector("#notification");
    notifications = Writer.NotificationView(notificationEl);
  }

  function initController() {
    let editorEl = document.querySelector("#editor");
    editor = Writer.EditorController(editorEl);
  }

  function initDocumentStorage() {
    storage = Writer.DocumentStorage();
    storage.addEventListener("fileLoaded", onFileLoaded);
    storage.addEventListener("fileSaved", onFileSaved);
  }

  function autosave() {
    storage.save(editor.getText());
  }

  function onFileLoaded(event) {
    window.location.hash = event.id;
    editor.setText(event.content);
    autosaveLoop = setInterval(autosave, AUTO_SAVE_INTERVAL);
  }

  function onFileSaved() {
    notifications.setText("File saved!");
    notifications.show();
    setTimeout(notifications.hide, NOTIFICATION_DURATION);
  }

  that.init = init;
  that.start = start;
  return that;
}());

Writer.App.init().start();