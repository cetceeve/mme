/* eslint-env browser */

var SimonSays = SimonSays || {};

SimonSays.BoardViewController = function() {
  "use strict";

  var that = new EventTarget(),
    enabled = false,
    countdownEl,
    segments;

  function init(boardEl) {
    boardEl.addEventListener("click", onBoardClicked);
    countdownEl = boardEl.querySelector(".center");
    segments = boardEl.querySelectorAll(".segment");
    return that;
  }

  function setEnabled(value) {
    enabled = value;
  }

  function setCountdown(value) {
    countdownEl.innerHTML = value;
  }

  function setActiveSegment(color) {
    for (let el of segments) {
      el.classList.remove("highlight");
      if (el.classList.contains(color)) {
        el.classList.add("highlight");
      }
    }
  }

  function clearAllHighlights() {
    for (let el of segments) {
      el.classList.remove("highlight");
    }
  }

  function onBoardClicked(event) {
    if (!enabled) {
      return;
    }
    let clickEvent = new Event("segmentClicked");
    clickEvent.color = event.target.className.split(" ")[3];
    that.dispatchEvent(clickEvent);
  }

  that.init = init;
  that.enableInput = setEnabled.bind(this, true);
  that.disableInput = setEnabled.bind(this, false);
  that.setActiveSegment = setActiveSegment;
  that.setCountdown = setCountdown;
  that.clearActiveSegment = clearAllHighlights;
  return that;
};