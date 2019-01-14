/* eslint-env browser */

var Writer = Writer || {};

Writer.NotificationView = function(el) {
  "use strict";
  
  var that = {};

  function setText(text) {
    el.innerHTML = text;
  }

  function show() {
    el.classList.remove("hidden");
  }

  function hide() {
    el.classList.add("hidden");
  }

  that.setText = setText;
  that.show = show;
  that.hide = hide;
  return that;
};