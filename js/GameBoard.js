import { LayerControl } from './LayerControl.js';
import { Cell, CELL_STATE } from './Cell.js';

const GAME_SCREEN_ID = 'js-game-screen';

class GameBoard extends LayerControl {
  difficulties = {
    beginner: {
      rows: 8,
      cols: 8,
      bombs: 10,
    },
    intermediate: {
      rows: 16,
      cols: 16,
      bombs: 40,
    },
    expert: {
      rows: 16,
      cols: 30,
      bombs: 99,
    },
  };

  cells = [];
  colsCount = null;
  rowsCount = null;
  bombsCount = null;

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
    bombs = this.difficulties.beginner.bombs
  ) {
    this.rowsCount = rows;
    this.colsCount = cols;
    this.bombsCount = bombs;

    this.generateCells();
    this.generateBoard();
    // setter tests
    this.cells[0][0].cellState = CELL_STATE.BOMB;
  }

  generateCells() {
    this.cells.length = 0;
    for (let x = 0; x < this.rowsCount; x++) {
      const row = [];
      for (let y = 0; y < this.colsCount; y++) {
        row.push(new Cell(x, y));
      }
      this.cells.push(row);
    }
    console.log('GameBoard cells: ', this.cells);
  }

  generateBoard() {
    const gameBoard = this.bindElementById('js-game-board');
    gameBoard.innerHTML = '';
    this.cells.flat().forEach((cell) => {
      gameBoard.appendChild(cell.generateCells());
    });

    // Change the size of the game board
    gameBoard.style.setProperty('--rows', this.rowsCount);
    gameBoard.style.setProperty('--cols', this.colsCount);
  }
}

export const gameBoard = new GameBoard();
