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

  userFirstClick = true;
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
    let bombsToAllocate = this.bombsCount;
    while (bombsToAllocate > 0) {
      const x = this.getRandomInt(0, this.rowsCount - 1);
      const y = this.getRandomInt(0, this.colsCount - 1);
      if (this.cells[x][y].cellElement.dataset.bomb === 'true') {
        continue;
      }
      // bomb location test
      console.log(this.cells[x][y]);
      this.cells[x][y].cellElement.dataset.bomb = 'true';
      bombsToAllocate--;
    }
  }

  addCellsListeners() {
    this.cells.flat().forEach(({ cellElement }) => {
      cellElement.addEventListener('click', this.handleCellLeftClick);
      cellElement.addEventListener('contextmenu', this.handleCellRightClick);
    });
  }

  removeCellsListeners() {
    this.cells.flat().forEach(({ cellElement }) => {
      cellElement.removeEventListener('click', this.handleCellLeftClick);
      cellElement.removeEventListener('contextmenu', this.handleCellRightClick);
    });
  }

  handleCellLeftClick = (e) => {
    this.revealCell(e.target);
  };

  handleCellRightClick = (e) => {
    e.preventDefault();
    this.markCell(e.target);
  };

  revealCell(cell) {
    // Check user's first click and if it is a bomb. If it is a bomb, relocate it.
    if (this.userFirstClick) {
      if (cell.dataset.bomb === 'true') {
        this.relocateBomb(cell);
      }
      this.userFirstClick = false;
    }

    // If the cell is already revealed, do nothing
    if (cell.dataset.cellState !== CELL_STATE.HIDDEN) {
      return;
    }

    // If the cell is a bomb, reveal all bombs and end the game
    if (cell.dataset.bomb === 'true') {
      this.revealAllBombs();
      cell.dataset.cellState = CELL_STATE.BOMB_EXPLODED;
      this.removeCellsListeners();
      return;
    }

    cell.dataset.cellState = CELL_STATE.REVEALED;
    const adjacentCells = this.cellsAround(cell);
    console.log('adjacentCells ', adjacentCells);
    const adjacentBombs = adjacentCells.filter(
      (cell) => cell.dataset.bomb === 'true'
    );
    console.log('adjacentBombs ', adjacentBombs);

    if (adjacentBombs.length === 0) {
      adjacentCells.forEach((cell) => this.revealCell(cell));
    } else {
      cell.textContent = adjacentBombs.length;
      cell.classList.add(`cell-color-${adjacentBombs.length}`);
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

  relocateBomb(cell) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    cell.dataset.bomb = 'false';
    let newX = x;
    let newY = y;
    // Relocate the bomb to a random cell that is not the same as the first click, and not a bomb already
    while (
      (newX === x && newY === y) ||
      this.cells[newX][newY].cellElement.dataset.bomb === 'true'
    ) {
      newX = this.getRandomInt(0, this.rowsCount - 1);
      newY = this.getRandomInt(0, this.colsCount - 1);
    }
    this.cells[newX][newY].cellElement.dataset.bomb = 'true';
    console.log('relocated bomb', this.cells[newX][newY]);
  }

  revealAllBombs() {
    this.cells.flat().forEach(({ cellElement }) => {
      if (
        cellElement.dataset.bomb === 'true' &&
        cellElement.dataset.cellState === CELL_STATE.FLAGGED
      ) {
        cellElement.dataset.cellState = CELL_STATE.BOMB_MARKED;
      } else if (cellElement.dataset.bomb === 'true') {
        cellElement.dataset.cellState = CELL_STATE.BOMB;
      }
    });
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
