/* eslint-env browser */
var Daily = Daily || {};

Daily.App = (function() {
  "use strict";

  var that = {},
    menu,
    view;

  function init() {
    initUI();
    initMenu();
    menu.update();
  }

  function initUI() {
    let daySelector = document.querySelector(".day-selector"),
      menuEl = document.querySelector(".daily-menu");
    view = new Daily.ViewController().init(daySelector, menuEl);
    view.addEventListener("daySelected", onDaySelected);
  }

  function initMenu() {
    menu = new Daily.DataProvider();
    menu.addEventListener("onMenuUpdate", onMenuUpdateAvailable);
  }

  function showMenuFor(day) {
    let dailyMenu = menu.getDailyMenuFor(day);
    view.renderMenu(day, dailyMenu);
  }

  function onDaySelected(event) {
    showMenuFor(event.day);
  }

  function onMenuUpdateAvailable() {
    showMenuFor("monday");
  }

  that.init = init;
  return that;
}());

Daily.App.init();