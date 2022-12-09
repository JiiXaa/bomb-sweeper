import { LayerControl } from './LayerControl.js';

class DeveloperMode extends LayerControl {
  state = {
    setTime: false,
    buffer: [],
    lastKeyTime: 0,
  };

  constructor() {
    super();
  }

  bombsVisible(bombs) {
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      let currentTime = Date.now();
      let buffer = [];

      // Workaround for the first key press. First key press is always 0, so the time is set to the current time and the buffer is filled with the first key press (key) and the setTime is set to true so that the time is not set again.
      if (this.state.setTime === false) {
        this.state.lastKeyTime = currentTime;
        buffer = [key];
        this.state.setTime = true;
      } else if (currentTime - this.state.lastKeyTime > 1000) {
        // after 1 second the buffer (key sequence pressed) is cleared
        buffer = [key];
      } else {
        // if the time between key presses is less than 1 second, the key is added to the buffer
        buffer = [...this.state.buffer, key];
      }

      // the buffer is set to the state and the lastKeyTime is set to the current time
      this.state = {
        buffer,
        lastKeyTime: currentTime,
      };

      this.state.lastKeyTime = currentTime;

      // if the key sequence is 'bombs' the bombs are highlighted on the board
      if (this.state.buffer.join('') === 'bombs') {
        bombs.flat().forEach((bomb) => {
          if (bomb.cellElement.dataset.bomb === 'true') {
            bomb.cellElement.style =
              'background-color: rgba(211, 92, 102, 0.9)';
          }
        });
        this.state.buffer = [];
        this.state.setTime = false;
      }

      // if the key sequence is 'clear' the bombs are cleared from the board
      if (this.state.buffer.join('') === 'clear') {
        bombs.flat().forEach((bomb) => {
          if (bomb.cellElement.dataset.bomb === 'true') {
            bomb.cellElement.style = '';
          }
        });
        this.state.buffer = [];
        this.state.setTime = false;
      }
    });
  }
}

export const developerMode = new DeveloperMode();
