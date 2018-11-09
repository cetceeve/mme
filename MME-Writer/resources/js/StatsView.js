/* eslint-env browser */

var Writer = Writer || {};

Writer.StatsView = function() {
  "use strict";

  var that = new EventTarget(),
    wordCounterEl,
    readingTimeEl;

  function init(el) {
    wordCounterEl = el.querySelector(".words");
    readingTimeEl = el.querySelector(".time");
    return that;
  }

  function updateStats(stats) {
    wordCounterEl.innerHTML = stats.words;
    readingTimeEl.innerHTML = stats.readingTimeInMinutes;
  }

  that.init = init;
  that.updateStats = updateStats;
  return that;
};