/* eslint-env browser */

var SimonSays = SimonSays || {};

SimonSays.GameManager = function() {
  "use strict";

  const COLORS = ["red", "green", "yellow", "blue"],
    PATTERN_LENGTH = 4,
    COMMAND_DEMO_INTERVALL = 1000,
    RECORDING_THRESHOLD = 5000;

  var that = new EventTarget(),
    currentPattern,
    demoPattern,
    recordedPattern,
    patternDemoIntervall;

  function startRound() {
    currentPattern = createRandomPattern();
    demoPattern = createDemoPattern(currentPattern);
    patternDemoIntervall = setInterval(broadcastPattern, COMMAND_DEMO_INTERVALL);
    that.dispatchEvent(new Event("gameStarted"));
  }

  function recordCommand(color) {
    recordedPattern.push(color);
    if (recordedPattern.length === currentPattern.length) {
      stopInputRecording();
      checkPattern();
    }
  }

  function createRandomPattern() {
    let pattern = [];
    for (let i = 0; i < PATTERN_LENGTH; i++) {
      let color = COLORS[Math.floor(Math.random() * COLORS.length)];
      pattern.push(color);
    }
    return pattern;
  }

  function createDemoPattern(pattern) {
    let demoPattern = [];
    demoPattern.step = 0;
    for (let i = 0; i < pattern.length; i++) {
      demoPattern.push(pattern[i]);
      demoPattern.push("blank");
    }
    return demoPattern;
  }

  function broadcastPattern() {
    let event = new Event("commandSend");
    event.color = demoPattern[demoPattern.step];
    event.remainingSteps = demoPattern.length - demoPattern.step;
    demoPattern.step++;
    that.dispatchEvent(event);
    if (demoPattern.step === demoPattern.length) {
      clearInterval(patternDemoIntervall);
      setTimeout(startInputRecording, COMMAND_DEMO_INTERVALL);
    }
  }

  function startInputRecording() {
    let event = new Event("recodingStarted");
    recordedPattern = [];
    recordedPattern.startedAt = event.timeStamp;
    that.dispatchEvent(event);
  }

  function stopInputRecording() {
    let event = new Event("recodingStoped");
    that.dispatchEvent(event);
  }

  function checkPattern() {
    let isEqual = true,
      event = new Event("gameEnded"),
      recordingDuration = event.timeStamp - recordedPattern.startedAt;
    for (let i = 0; i < currentPattern.length; i++) {
      if (currentPattern[i] !== recordedPattern[i]) {
        isEqual = false;
        break;
      }
    }
    event.won = isEqual && (recordingDuration <= RECORDING_THRESHOLD);
    that.dispatchEvent(event);
  }

  that.restart = startRound;
  that.recordCommand = recordCommand;
  return that;
};