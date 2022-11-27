import { LayerControl } from './LayerControl.js';
import { Cell, CELL_STATE } from './Cell.js';
import { endGameModal } from './EndGameModal.js';
import { timer } from './Timer.js';

const GAME_SCREEN_ID = 'game-screen-js';
const GAME_BOARD_ID = 'game-board-js';
const GAME_SIDEMENU_ID = 'game-sidemenu-js';

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
  flagsLeftScreen = this.bindElementById('flags-left-js');
  flagsLeftToPlace = null;

  buttons = {
    beginner: this.bindElementById('beginner-btn-js'),
    intermediate: this.bindElementById('intermediate-btn-js'),
    expert: this.bindElementById('expert-btn-js'),
  };

  constructor() {
    super(GAME_SCREEN_ID);
    this.initializeGameBoard();
  }

  initializeGameBoard() {
    this.addButtonsListeners();
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
    // Timer
    timer.resetTimer();
    this.addCellsListeners();
    this.findBombsLocation();
    this.flagsLeftToPlace = this.bombsCount;
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
    const gameBoard = this.bindElementById(GAME_BOARD_ID);
    gameBoard.innerHTML = '';
    this.cells.flat().forEach((cell) => {
      gameBoard.appendChild(cell.generateCells());
    });

    // Change the size of the game board
    gameBoard.style.setProperty('--rows', this.rowsCount);
    gameBoard.style.setProperty('--cols', this.colsCount);

    // Change the size of the End Game Modal
    endGameModal.elementById.style.setProperty('--rows', this.rowsCount);

    // Change the size of the Game Side Menu
    const sidemenu = this.bindElementById(GAME_SIDEMENU_ID);
    sidemenu.style.setProperty('--rows', this.rowsCount);

    // Flags left to place
    this.flagsLeftScreen.textContent = this.bombsCount;
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

  addButtonsListeners() {
    this.buttons.beginner.addEventListener('click', () => {
      console.log('first');
      this.handleNewGameClick(
        this.difficulties.beginner.rows,
        this.difficulties.beginner.cols,
        this.difficulties.beginner.bombs
      );
    });
    this.buttons.intermediate.addEventListener('click', () => {
      this.handleNewGameClick(
        this.difficulties.intermediate.rows,
        this.difficulties.intermediate.cols,
        this.difficulties.intermediate.bombs
      );
    });
    this.buttons.expert.addEventListener('click', () => {
      this.handleNewGameClick(
        this.difficulties.expert.rows,
        this.difficulties.expert.cols,
        this.difficulties.expert.bombs
      );
    });
  }

  handleNewGameClick(
    rows = this.rowsCount,
    cols = this.colsCount,
    bombs = this.bombsCount
  ) {
    endGameModal.closeModal();
    this.startNewGame(rows, cols, bombs);
    this.userFirstClick = true;
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
      endGameModal.showModalEndGame();
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
      ++this.flagsLeftToPlace;
      this.flagsLeftScreen.textContent = this.flagsLeftToPlace;
      cell.dataset.cellState = CELL_STATE.HIDDEN;
    } else {
      if (this.flagsLeftToPlace === 0) {
        return;
      }
      --this.flagsLeftToPlace;
      this.flagsLeftScreen.textContent = this.flagsLeftToPlace;
      cell.dataset.cellState = CELL_STATE.FLAGGED;
    }
  }

  // flagsLeftToPlace() {
  //   let flagsLeft =
  //     this.bombsCount -
  //     this.cells.flat().filter((cell) => cell.cellState === CELL_STATE.FLAGGED)
  //       .length;
  //   // this.flagsLeft.textContent = flagsLeft;
  //   return flagsLeft;
  // }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export const gameBoard = new GameBoard();
