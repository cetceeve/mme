/* eslint-env browser */

var Writer = Writer || {};

Writer.EditorController = function(el) {
  "use strict";
  
  var that = new EventTarget(),
    textarea = el.querySelector("textarea");

  function getText() {
    return textarea.value;
  }

  function setText(text) {
    textarea.value = text;
  }

  that.getText = getText;
  that.setText = setText;
  return that;
};