/* eslint-env browser */

var SimonSays = SimonSays || {};

SimonSays.MessageView = function() {
  "use strict";

  var that = {},
    el;

  function init(messageEl) {
    el = messageEl;
    return that;
  }

  function setVisibility(visibility) {
    if (visibility === true) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }

  function setText(text) {
    el.innerHTML = text;
  }

  that.init = init;
  that.hide = setVisibility.bind(this, false);
  that.show = setVisibility.bind(this, true);
  that.setText = setText;
  return that;
};