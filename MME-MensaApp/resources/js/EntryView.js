/* eslint-env browser */

var Daily = Daily || {};

Daily.EntryView = (function() {
  "use strict";

  const ENTRY_VIEW_TEMPLATE = document.querySelector("#menu-entry").innerHTML
    .trim();

  function createElement(template, data) {
    let container = document.createElement("div"),
      // RegEx from: https://stackoverflow.com/questions/17056064/javascript-regex-match-all-and-replace
      elString = template.replace(/\{\{(.*?)\}\}/g, function(match, token) {
        return data[token];
      });
    container.innerHTML = elString;
    return container.firstChild;
  }

  function EntryView(entry) {
    this.entry = entry;
  }

  EntryView.prototype.appendTo = function(parent) {
    this.el = createElement(ENTRY_VIEW_TEMPLATE, this.entry);
    parent.append(this.el);
  };

  EntryView.prototype.show = function() {
    if (this.el) {
      this.el.classList.add("visible");
    }
  };

  EntryView.prototype.hide = function() {
    if (this.el) {
      this.el.classList.remove("visible");
    }
  };

  return EntryView;

}());