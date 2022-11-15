import { LayerControl } from './LayerControl.js';
import { Cell } from './Cell.js';

const GAME_SCREEN_ID = 'js-game-screen';
const TILE_STATE = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
};

class GameBoard extends LayerControl {
  difficulties = {
    beginner: {
      rows: 8,
      cols: 8,
      mines: 10,
    },
    intermediate: {
      rows: 16,
      cols: 16,
      mines: 40,
    },
    expert: {
      rows: 16,
      cols: 30,
      mines: 99,
    },
  };

  boardArray = [];
  colsCount = null;
  rowsCount = null;
  minesCount = null;

  constructor() {
    super(GAME_SCREEN_ID);
    this.initializeGameBoard();
  }

  initializeGameBoard() {
    this.startNewGame();
  }

  startNewGame(
    rows = this.difficulties.beginner.rows,
    cols = this.difficulties.beginner.cols,
    mines = this.difficulties.beginner.mines
  ) {
    this.rowsCount = rows;
    this.colsCount = cols;
    this.minesCount = mines;

    this.generateBoard();
  }

  generateBoard() {
    const gameBoard = this.bindElementById('js-game-board');
    gameBoard.innerHTML = '';
    this.boardArray.length = 0;
    for (let x = 0; x < this.rowsCount; x++) {
      const row = [];
      for (let y = 0; y < this.colsCount; y++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.status = TILE_STATE.HIDDEN;
        cellElement.dataset.x = x;
        cellElement.dataset.y = y;
        cellElement.dataset.mine = false;
        cellElement.addEventListener('click', this.handleCellClick);
        row.push(new Cell(x, y, cellElement));
      }
      this.boardArray.push(row);
    }
    // console.log(this.boardArray);
    this.boardArray.flat().forEach((cell) => {
      // console.log(cell.cellElement);
      gameBoard.appendChild(cell.cellElement);
    });

    // Change the size of the game board
    gameBoard.style.setProperty('--rows', this.rowsCount);
    gameBoard.style.setProperty('--cols', this.colsCount);
  }

  handleCellClick = (e) => {
    console.log(e.target.dataset);
    if (e.target.classList.contains('cell--bomb')) {
      e.target.classList.remove('cell--bomb');
    } else {
      e.target.classList.add('cell--bomb');
    }
  };
}

export const gameBoard = new GameBoard();
