/* eslint-env browser */

var SimonSays = SimonSays || {};

SimonSays.App = (function() {
  "use strict";

  const RESTART_DELAY = 3000,
  GAME_MESSAGES = {
    won: "Gewonnen!",
    lost: "Verloren!",
    go: "Los!",
  };

  var that = {},
    game,
    board,
    message;

  function init() {
    initMessageView();
    initGame();
    initBoardView();
    game.restart();
  }

  function initMessageView() {
    let messageEl = document.querySelector("#message");
    message = SimonSays.MessageView().init(messageEl);
  }

  function initGame() {
    game = SimonSays.GameManager();
    game.addEventListener("gameStarted", onGameStarted);
    game.addEventListener("gameEnded", onGameEnded);
    game.addEventListener("commandSend", onCommandSend);
    game.addEventListener("recodingStarted", onRecordingStarted);
    game.addEventListener("recodingStoped", onRecordingStoped);
  }

  function initBoardView() {
    let boardEl = document.querySelector("#board");
    board = SimonSays.BoardViewController().init(boardEl);
    board.addEventListener("segmentClicked", onSegmentClicked);
  }

  function onGameStarted() {
    message.hide();
    board.clearActiveSegment();
    board.disableInput();
  }

  function onGameEnded(event) {
    if (event.won === true) {
      message.setText(GAME_MESSAGES.won);
    } else {
      message.setText(GAME_MESSAGES.lost);
    }
    message.show();
    setTimeout(game.restart, RESTART_DELAY);
  }

  function onCommandSend(event) {
    board.setActiveSegment(event.color);
    if (event.remainingSteps % 2 === 0) {
      board.setCountdown(event.remainingSteps / 2);
    }
  }

  function onRecordingStarted() {
    message.setText(GAME_MESSAGES.go);
    message.show();
    board.setCountdown("");
    board.clearActiveSegment();
    board.enableInput();
  }

  function onRecordingStoped() {
    board.disableInput();
  }

  function onSegmentClicked(event) {
    message.hide();
    game.recordCommand(event.color);
  }

  that.init = init;
  return that;
}());

SimonSays.App.init();