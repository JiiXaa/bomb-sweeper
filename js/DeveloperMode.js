import { LayerControl } from './LayerControl.js';
import { gameBoard } from './GameBoard.js';
import { leaderboard } from './GameLeaderboard.js';
import { MOBILE_WIDTH } from './GameBoard.js';
import { CELL_STATE } from './Cell.js';

export let DEV_MODE = false;
class DeveloperMode extends LayerControl {
  state = {
    setTime: false,
    buffer: [],
    lastKeyTime: 0,
  };

  constructor() {
    super();
  }

  // This method is called from the Game class. It listens for key presses and if the key sequence is 'bombs' the bombs are highlighted on the board. If the key sequence is 'clear' the bombs are cleared from the board.
  addCheatsListener = (e) => {
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
      gameBoard.cells.flat().forEach((bomb) => {
        if (bomb.cellElement.dataset.bomb === 'true') {
          bomb.cellElement.style = 'background-color: var(--bomb-color)';
          if (
            window.innerWidth < MOBILE_WIDTH &&
            leaderboard.difficulty === 'expert'
          ) {
            // When the bombs are highlighted, all icons have to be rotated 90 degrees to be visible on the mobile version of the game (only for expert board).
            bomb.cellElement.style.setProperty('--rotate-number', '-90deg');
          }
        }
      });
      DEV_MODE = true;
      this.state.buffer = [];
      this.state.setTime = false;
    }

    // if the key sequence is 'clear' the bombs are cleared from the board
    if (this.state.buffer.join('') === 'clear') {
      gameBoard.cells.flat().forEach((bomb) => {
        if (bomb.cellElement.dataset.bomb === 'true') {
          bomb.cellElement.style = '';
        }
      });
      this.state.buffer = [];
      this.state.setTime = false;
      DEV_MODE = false;
    }
  };

  // This function is called from the Game class. It listens for key presses and if the key sequence is 'bombs' the bombs are highlighted on the board. If the key sequence is 'clear' the bombs are cleared from the board.
  bombsVisible() {
    document.addEventListener('keydown', this.addCheatsListener);
  }

  // Removes the event listener for key presses.
  cheatsOff() {
    document.removeEventListener('keydown', this.addCheatsListener);
  }

  // Sets the DEV_MODE state to false so that the bombs are not highlighted on the board. Used when game is restarted to hide dev mode.
  setDevModeFalse() {
    DEV_MODE = false;
  }

  hideHighlightedBombs() {
    gameBoard.cells.flat().forEach((cell) => {
      if (
        cell.cellElement.dataset.cellState === CELL_STATE.BOMB ||
        cell.cellElement.dataset.cellState === CELL_STATE.BOMB_MARKED
      ) {
        cell.cellElement.style = '';
      }
    });
    developerMode.setDevModeFalse();
  }
}

export const developerMode = new DeveloperMode();
