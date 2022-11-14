import { LayerControl } from './LayerControl.js';
import { Cell } from './Cell.js';

const GAME_BOARD_ID = 'js-game-screen';
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

  board = [];
  colsCount = null;
  rowsCount = null;
  minesCount = null;

  constructor() {
    super(GAME_BOARD_ID);
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
    this.board.length = 0;
    for (let x = 0; x < this.rowsCount; x++) {
      const row = [];
      for (let y = 0; y < this.colsCount; y++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.status = TILE_STATE.HIDDEN;
        cellElement.dataset.x = x;
        cellElement.dataset.y = y;
        cellElement.addEventListener('click', this.handleCellClick);
        row.push(new Cell(x, y, cellElement));
      }
      this.board.push(row);
    }
    // console.log(this.board);
    this.board.flat().forEach((cell) => {
      // console.log(cell.cellElement);
      this.elementById.appendChild(cell.cellElement);
    });
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
