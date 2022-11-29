import { LayerControl } from './LayerControl.js';
import { Cell, CELL_STATE } from './Cell.js';
import { endGameModal } from './EndGameModal.js';
import { timer } from './Timer.js';

const GAME_SCREEN_ID = 'game-screen-js';
const GAME_BOARD_ID = 'game-board-js';
const GAME_SIDEMENU_ID = 'game-sidemenu-js';
const USED_MOVES_ID = 'revealed-count-js';
const FLAGS_LEFT_ID = 'flags-left-js';

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
  usedMovesScreen = this.bindElementById(USED_MOVES_ID);
  usedMoves = 0;
  flagsLeftScreen = this.bindElementById(FLAGS_LEFT_ID);
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
    this.generateBombsLocation();
    this.flagsLeftToPlace = this.bombsCount;
    this.usedMoves = 0;
    this.usedMovesScreen.textContent = this.usedMoves;
    console.log(this.cells);
  }

  // Check if the user won the game and if so, it opens the End Game Modal with the win message and the time it took to win the game and the number of moves it took to win the game.
  endGame(isWin, cell) {
    if (!isWin) {
      timer.stopTimer();
      this.revealAllBombs();
      cell.dataset.cellState = CELL_STATE.BOMB_EXPLODED;
      this.removeCellsListeners();
      endGameModal.showModalEndGame();

      // TODO: Seconds it took to lose, used for the end game modal
      console.log('seconds from endGame: ', timer.timeInSeconds);
    }
  }

  // Create a new Cell object and pushes it to the cells array with the coordinates of the cell and the cell state
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

  // Generate the game board from the cells array and and appends it to the game screen
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

  // Allocate the bombs randomly on the game board
  generateBombsLocation() {
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

  // Method sets event listeners to the cells for the left and right click
  addCellsListeners() {
    this.cells.flat().forEach(({ cellElement }) => {
      cellElement.addEventListener('click', this.handleCellLeftClick);
      cellElement.addEventListener('contextmenu', this.handleCellRightClick);
    });
  }

  // Method removes event listeners to the cells for the left and right click
  removeCellsListeners() {
    this.cells.flat().forEach(({ cellElement }) => {
      cellElement.removeEventListener('click', this.handleCellLeftClick);
      cellElement.removeEventListener('contextmenu', this.handleCellRightClick);
    });
  }

  // Difficulty buttons event listeners
  addButtonsListeners() {
    this.buttons.beginner.addEventListener('click', () => {
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

  // New game buttons method, resets the game and starts a new one depending on the difficulty chosen by the user (beginner, intermediate, expert)
  handleNewGameClick(
    rows = this.rowsCount,
    cols = this.colsCount,
    bombs = this.bombsCount
  ) {
    endGameModal.closeModal();
    this.startNewGame(rows, cols, bombs);
    this.userFirstClick = true;
  }

  // left click on cell event handler
  handleCellLeftClick = (e) => {
    this.countUsedMoves(e.target);
    this.revealCell(e.target);
  };

  // right click on cell event handler
  handleCellRightClick = (e) => {
    e.preventDefault();
    this.markCell(e.target);
  };

  // Left click on cell method
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
      this.endGame(false, cell);
      return;
    }

    cell.dataset.cellState = CELL_STATE.REVEALED;

    // Check how many bombs are around the cell
    const adjacentCells = this.cellsAround(cell);
    console.log('adjacentCells ', adjacentCells);
    const adjacentBombs = adjacentCells.filter(
      (cell) => cell.dataset.bomb === 'true'
    );
    console.log('adjacentBombs ', adjacentBombs);
    // if there are no bombs around the cell, reveal all adjacent cells recursively until there are bombs around
    if (adjacentBombs.length === 0) {
      adjacentCells.forEach((cell) => this.revealCell(cell));
    } else {
      cell.textContent = adjacentBombs.length;
      cell.classList.add(`cell-color-${adjacentBombs.length}`);
    }
  }

  // Right click on a cell method
  markCell(cell) {
    if (
      cell.dataset.cellState !== CELL_STATE.HIDDEN &&
      cell.dataset.cellState !== CELL_STATE.FLAGGED
    ) {
      return;
    }
    if (cell.dataset.cellState === CELL_STATE.FLAGGED) {
      cell.dataset.cellState = CELL_STATE.HIDDEN;
      // Flags left to place logic when removing a flag
      ++this.flagsLeftToPlace;
      this.flagsLeftScreen.textContent = this.flagsLeftToPlace;
    } else {
      if (this.flagsLeftToPlace === 0) {
        return;
      }
      cell.dataset.cellState = CELL_STATE.FLAGGED;
      // Flags left to place logic when placing a flag
      --this.flagsLeftToPlace;
      this.flagsLeftScreen.textContent = this.flagsLeftToPlace;
    }
  }

  // Check how many cells are around the cell
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

  // Relocate the bomb to a random cell that is not the same as the first click, and not a bomb already
  relocateBomb(cell) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    cell.dataset.bomb = 'false';
    let newX = x;
    let newY = y;
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

  // Reveal all bombs when the game ends
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

  // Track the number of moves the user has made
  countUsedMoves(cell) {
    if (cell.dataset.cellState === CELL_STATE.REVEALED) {
      return;
    }
    ++this.usedMoves;
    this.usedMovesScreen.textContent = this.usedMoves;
    console.log('usedMoves ', this.usedMoves);
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
