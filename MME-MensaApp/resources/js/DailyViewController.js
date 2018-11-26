/* eslint-env browser */
var Daily = Daily || {};

Daily.ViewController = function() {
  "use strict";

  var that = new EventTarget(),
    selectorEl,
    menuEl;

  function init(selector, menu) {
    selectorEl = selector;
    menuEl = menu;
    selectorEl.addEventListener("click", onMenuClicked);
    return that;
  }

  function onMenuClicked(event) {
    var el = event.target;
    if (el.classList.contains("button")) {
      if (el.classList.contains("selected")) {
        return;
      }
      let event = new Event("daySelected");
      event.day = el.getAttribute("data-day");
      that.dispatchEvent(event);
    }
  }

  function renderMenu(day, menu) {
    var dayEl = selectorEl.querySelector("[data-day='" + day + "']"),
      animationOffset = 0;
    clearView();
    dayEl.classList.add("selected");
    for (let i = 0; i < menu.length; i++) {
      let entryEl = new Daily.EntryView(menu[i]),
        categoryEl = menuEl.querySelector("[data-category='" + menu[i].category +
          "']");
      entryEl.appendTo(categoryEl);
      setTimeout(function() {
        entryEl.show();
      }, animationOffset);
      animationOffset += 100;
    }
  }

  function clearView() {
    let currentlySelectedDay = selectorEl.querySelector(".selected"),
      entries = menuEl.querySelectorAll(".entry");
    if (currentlySelectedDay) {
      currentlySelectedDay.classList.remove("selected");
    }
    for (let i = 0; i < entries.length; i++) {
      entries[i].parentNode.removeChild(entries[i]);
    }
  }

  that.init = init;
  that.renderMenu = renderMenu;
  return that;
};