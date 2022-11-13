import { LayerControl } from './LayerControl.js';
import { Cell } from './Cell.js';

const GAME_BOARD_ID = 'js-game-screen';

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
        row.push(new Cell(x, y));
      }
      this.board.push(row);
    }
    console.log(this.board);
  }
}

export const gameBoard = new GameBoard();
