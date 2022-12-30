import { LayerControl } from './LayerControl.js';

const TIME_LEFT_ID = 'time-left-js';

class Timer extends LayerControl {
  maxTime = 999;
  timeInSeconds = 0;
  interval = null;
  endTime = null;

  constructor() {
    super(TIME_LEFT_ID);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.endTime = this.timeInSeconds;
  }

  restartTimer() {
    this.timeInSeconds = 0;
    this.setTimer(this.timeInSeconds);
    this.stopTimer();
    this.startTimer();
  }

  resetTimer() {
    this.stopTimer();
    this.setTimer(0);
  }

  updateTimer() {
    this.timeInSeconds++;
    this.timeInSeconds <= this.maxTime
      ? this.setTimer(this.timeInSeconds)
      : this.stopTimer();
  }

  setTimer(time) {
    // slice(-3) - get last 3 digits, padStart(3, 0) - add 0 to the beginning if less than 3 digits
    // Found this solution on StackOverflow
    // https://stackoverflow.com/questions/21029057/javascript-three-digits-counter-how-to-do
    this.elementById.textContent = ('00' + time).slice(-3);
  }
}

export const timer = new Timer();
