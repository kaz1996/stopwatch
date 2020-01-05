'use strict';
import './index.scss';

const stopwatchTime = document.querySelector('#js-stopwatch-time');
const startButon = document.querySelector('#js-start');
const pauseButton = document.querySelector('#js-pause');
const resetButton = document.querySelector('#js-reset');
let startTime;
let pauseTime = 0;
let timer;

const adjustTime = (plainTime) => {
  return plainTime < 10 ? `0${plainTime}` : plainTime;
}

const displayTime = (elapsed) => {
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const miliSeconds = Math.floor((elapsed % 1000) / 10);
  const adjustedMinutes = adjustTime(minutes);
  const adjustedSeconds = adjustTime(seconds);
  const adjustedMiliSeconds = adjustTime(miliSeconds);

  const miliSecondsHtml = `<span class="stopwatch__time--small">${adjustedMiliSeconds}</span>`;
  stopwatchTime.innerHTML = `${adjustedMinutes}:${adjustedSeconds}${miliSecondsHtml}`
}

const toggleDisabled = (isStarted) => {
  if (isStarted) {
    startButon.setAttribute('disabled', true);
    pauseButton.removeAttribute('disabled');
  } else {
    startButon.removeAttribute('disabled');
    pauseButton.setAttribute('disabled', true);
  }
}

const startStopwatch = () => {
  startTime = Date.now();
  stopwatch();
}

const pauseStopwatch = () => {
  clearInterval(timer);
  pauseTime += Date.now() - startTime;
}

const resetStopwatch = () => {
  clearInterval(timer);
  startTime = 0;
  pauseTime = 0;
  displayTime(0);
}

const stopwatch = () => {
  timer = setInterval(() => {
    const elapsed = Date.now() - startTime + pauseTime;
    displayTime(elapsed);
  });
}

startButon.addEventListener('click', () => {
  toggleDisabled(true);
  startStopwatch();
});

pauseButton.addEventListener('click', () => {
  toggleDisabled(false);
  pauseStopwatch();
});

resetButton.addEventListener('click', ()=> {
  toggleDisabled(false);
  resetStopwatch();
});