/* eslint-env browser */

var Writer = Writer || {};

Writer.EditorController = function() {
  "use strict";

  const KEY_TYPES = {
      Standard: Symbol(),
      Breaking: Symbol(),
    },
    // Code for keys: Backspace, Enter, Space, "1" (!), "?", ",", "."
    BREAKING_CHARS = [8, 13, 32, 49, 63, 188, 190],
    READABLE_WORDS_PER_MINUTE = 200;

  var that = new EventTarget(),
    textarea;

  function init(el) {
    textarea = el.querySelector("textarea");
    textarea.addEventListener("keyup", onChange);
    return that;
  }

  function getText() {
    return textarea.value;
  }

  function setText(text) {
    textarea.value = text;
    broadCastStats();
  }

  function getStats() {
    let words = textarea.value === "" ? 0 : textarea.value.replace(/[^_0-9a-zA-Z]/g, " ").trim().split(
      /\s+/).length;
    return {
      words: words,
      readingTimeInMinutes: Math.round(words / READABLE_WORDS_PER_MINUTE),
    };
  }

  function checkKeyType(keycode) {
    var type = KEY_TYPES.Standard;
    if (BREAKING_CHARS.includes(keycode)) {
      type = KEY_TYPES.Breaking;
    }
    return type;
  }

  function onChange(event) {
    let keyType = checkKeyType(event.which);
    if (keyType === KEY_TYPES.Breaking) {
      broadCastStats();
    }
  }

  function broadCastStats() {
    let event = new Event("textChanged");
    event.stats = getStats();
    that.dispatchEvent(event);
  }

  that.getText = getText;
  that.setText = setText;
  that.init = init;
  return that;
};