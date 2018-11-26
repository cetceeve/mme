/* eslint-env browser */
var Daily = Daily || {};

Daily.DataProvider = function() {
  "use strict";

  const BASE_MENU_URL =
    "https://regensburger-forscher.de:9001/mensa/uni/{{day}}",
    WEEKDAYS_SHORT = ["mo", "di", "mi", "do", "fr"],
    WEEKDAYS_LONG = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  var that = new EventTarget(),
    menu = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };

  function update() {
    let updateRequests = [];

    for (let i = 0; i < WEEKDAYS_SHORT.length; i++) {
      let url = BASE_MENU_URL.replace("{{day}}", WEEKDAYS_SHORT[i]);
      updateRequests.push(fetch(url));
    }

    Promise.all(updateRequests)
      .then(onApiResponsesAvailable)
      .then(parseResponsesToJSON)
      .then(updateMenu);
  }

  function onApiResponsesAvailable(responses) {
    return responses;
  }

  function parseResponsesToJSON(responses) {
    return Promise.all(responses.map(function(response) {
      return response.json();
    }));
  }

  function updateMenu(currentMenu) {
    for (let i = 0; i < currentMenu.length; i++) {
      let dailymenu = translateMenuEntries(currentMenu[i]);
      menu[dailymenu[0].day] = dailymenu;
    }
    let event = new Event("onMenuUpdate");
    that.dispatchEvent(event);
  }

  function translateMenuEntries(menu) {
    for (let i = 0; i < menu.length; i++) {
      let entry = menu[i];
      entry.day = getLongWeekday(entry.day);
      if (entry.category.startsWith("S")) {
        entry.category = "soup";
      }
      if (entry.category.startsWith("HG")) {
        entry.category = "main";
      }
      if (entry.category.startsWith("B")) {
        entry.category = "sides";
      }
      if (entry.category.startsWith("N")) {
        entry.category = "dessert";
      }
    }
    return menu;
  }

  function getLongWeekday(shortWeekday) {
    let index = WEEKDAYS_SHORT.indexOf(shortWeekday.toLowerCase());
    return WEEKDAYS_LONG[index];
  }

  function getDailyMenuFor(day) {
    return menu[day];
  }

  that.update = update;
  that.getDailyMenuFor = getDailyMenuFor;
  return that;
};