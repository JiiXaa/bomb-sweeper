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
  bombsLocation = [];

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
    this.addCellsListeners();
    this.findBombsLocation();
    console.log(this.cells);
    // setter tests
    // this.cells[0][0].cellState = CELL_STATE.BOMB;
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

  findBombsLocation() {
    let bombsToRelocate = this.bombsCount;
    while (bombsToRelocate > 0) {
      const x = this.getRandomInt(0, this.rowsCount - 1);
      const y = this.getRandomInt(0, this.colsCount - 1);
      if (this.cells[x][y].cellElement.dataset.bomb === 'true') {
        continue;
      }
      // bomb location test
      console.log(this.cells[x][y]);
      this.cells[x][y].cellElement.dataset.bomb = 'true';
      bombsToRelocate--;
    }
  }

  cellsAround(cell) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    const cells = [];
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i < 0 || i >= this.rowsCount || j < 0 || j >= this.colsCount) {
          continue;
        }
        cells.push(this.cells[i][j].cellElement);
      }
    }
    return cells;
  }

  addCellsListeners() {
    this.cells.flat().forEach(({ cellElement }) => {
      cellElement.addEventListener('click', this.handleCellLeftClick);
      cellElement.addEventListener('contextmenu', this.handleCellRightClick);
    });
  }

  handleCellLeftClick = (e) => {
    // console.log(e.target.getAttribute('data-x'));
    // console.log(e.target.getAttribute('data-y'));
    this.revealCell(e.target);
  };

  handleCellRightClick = (e) => {
    e.preventDefault();
    this.markCell(e.target);
  };

  revealCell(cell) {
    if (cell.dataset.cellState !== CELL_STATE.HIDDEN) {
      return;
    }

    if (cell.dataset.bomb === 'true') {
      cell.dataset.cellState = CELL_STATE.BOMB;
      return;
    }

    cell.dataset.cellState = CELL_STATE.REVEALED;
    const adjacentCells = this.cellsAround(cell);
    // console.log(adjacentCells);
    const adjacentBombs = adjacentCells.filter(
      (cell) => cell.dataset.bomb === 'true'
    );
    console.log(adjacentBombs);
  }

  markCell(cell) {
    if (
      cell.dataset.cellState !== CELL_STATE.HIDDEN &&
      cell.dataset.cellState !== CELL_STATE.FLAGGED
    ) {
      return;
    }

    if (cell.dataset.cellState === CELL_STATE.FLAGGED) {
      cell.dataset.cellState = CELL_STATE.HIDDEN;
    } else {
      cell.dataset.cellState = CELL_STATE.FLAGGED;
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export const gameBoard = new GameBoard();
