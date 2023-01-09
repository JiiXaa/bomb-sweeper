import { LayerControl, SCREEN_HIDDEN, SCREEN_VISIBLE } from './LayerControl.js';
import { Cell, CELL_STATE } from './Cell.js';
import { endGameModal } from './EndGameModal.js';
import { timer } from './Timer.js';
import { leaderboard } from './GameLeaderboard.js';
import { mainMenu } from './MainMenu.js';
import { developerMode } from './DeveloperMode.js';
import { DEV_MODE } from './DeveloperMode.js';

const GAME_SCREEN_ID = 'game-screen-js';
const GAME_BOARD_ID = 'game-board-js';
const GAME_SIDEMENU_ID = 'game-sidemenu-js';
const USED_MOVES_ID = 'revealed-count-js';
const FLAGS_LEFT_ID = 'flags-left-js';
const DIFFICULTY_SCREEN_ID = 'info-difficulty-js';
const MENU_MODAL_ID = 'to-menu-modal-js';

// Buttons
const BEGINNER_BTN_ID = 'beginner-btn-js';
const INTERMEDIATE_BTN_ID = 'intermediate-btn-js';
const EXPERT_BTN_ID = 'expert-btn-js';
const MENU_BTN_ID = 'menu-btn-js';
const toMenuAccept = 'to-menu-yes-js';
const toMenuCancel = 'to-menu-no-js';

// Mobile
const MOBILE_WIDTH = 640;

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
  difficultyScreen = this.bindElementById(DIFFICULTY_SCREEN_ID);
  usedMovesScreen = this.bindElementById(USED_MOVES_ID);
  usedMoves = 0;
  flagsLeftScreen = this.bindElementById(FLAGS_LEFT_ID);
  flagsLeftToPlace = null;
  revealedCells = 0;
  cellsToReveal = 0;
  toMenuModal = this.bindElementById(MENU_MODAL_ID);

  sidemenu = this.bindElementById(GAME_SIDEMENU_ID);

  buttons = {
    beginner: this.bindElementById(BEGINNER_BTN_ID),
    intermediate: this.bindElementById(INTERMEDIATE_BTN_ID),
    expert: this.bindElementById(EXPERT_BTN_ID),
    menu: this.bindElementById(MENU_BTN_ID),
    toMenuAccept: this.bindElementById(toMenuAccept),
    toMenuCancel: this.bindElementById(toMenuCancel),
  };

  constructor() {
    super(GAME_SCREEN_ID);
    this.initializeGameBoard();
    // Listener for the ESC key to go back to the main menu.
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.backToMenu();
      }
    });
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

    // Calculate the number of cells to reveal to win the game
    this.cellsToReveal = this.rowsCount * this.colsCount - this.bombsCount;
    this.generateCells();
    this.generateBoard();
    this.addCellsListeners();
    this.generateBombsLocation();
    // reset count of revealed cells
    this.revealedCells = 0;
    // set the number of flags left to place
    this.flagsLeftToPlace = this.bombsCount;
    // reset the number of used moves
    this.usedMoves = 0;
    this.usedMovesScreen.textContent = this.usedMoves;
    console.log(this.cells);
    // Developer Mode - bombs visible on key sequence 'bombs' pressed
    developerMode.bombsVisible(this.cells);
    developerMode.setDevModeFalse();
    this.showActiveDifficulty();
  }

  // Check if the user won the game and if so, it opens the End Game Modal with the win message and the time it took to win the game and the number of moves it took to win the game.
  endGame(isWin, cell) {
    if (!isWin) {
      timer.stopTimer();
      this.revealAllBombs();
      // When user clicks on a highlighted bomb (developerMode), game ends and all bombs become unhighlighted.
      if (DEV_MODE) {
        this.cells.flat().forEach((cell) => {
          if (
            cell.cellElement.dataset.cellState === CELL_STATE.BOMB ||
            cell.cellElement.dataset.cellState === CELL_STATE.BOMB_MARKED
          ) {
            cell.cellElement.style = '';
          }
        });
        developerMode.setDevModeFalse();
      }
      cell.dataset.cellState = CELL_STATE.BOMB_EXPLODED;
      this.removeCellsListeners();
      endGameModal.showModalEndGame();
      // TODO: finish leaderboard functionality
      leaderboard.addHighScoreLS({
        moves: this.usedMoves,
        time: timer.endTime,
      });
      console.log(leaderboard.getScoresLS());

      // TODO: Moves and seconds it took to lose, used for the end game modal
      console.log('seconds from endGame (lose): ', timer.endTime);
    }
    if (isWin) {
      timer.stopTimer();
      this.removeCellsListeners();
      // TODO: Moves and seconds it took to win, used for the end game modal
      console.log('seconds from endGame (win): ', timer.endTime);
      endGameModal.showModalEndGame(true, timer.endTime, this.usedMoves);
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

    // Change the size and position of the game board on mobile
    // if (window.innerWidth < MOBILE_WIDTH) {
    //   gameBoard.style.setProperty('--rows', this.colsCount);
    //   gameBoard.style.setProperty('--cols', this.rowsCount);
    // }

    // Change the size of the End Game Modal
    endGameModal.elementById.style.setProperty('--rows', this.rowsCount);

    if (window.innerWidth < MOBILE_WIDTH) {
      endGameModal.elementById.style.setProperty('--cols', this.colsCount);
    }

    // Change the size of the Game Side Menu
    this.sidemenu.style.setProperty('--rows', this.rowsCount);

    // Change the size of the modals for game board on mobile
    this.mobileResize();
    this.mobileRotateExpertBoard();
    // Prevent the context menu from opening when right clicking on the game board
    this.sidemenu.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

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
      console.log('bomb', this.cells[x][y]);
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
        this.difficulties.beginner.bombs,
        'beginner'
      );
    });
    this.buttons.intermediate.addEventListener('click', () => {
      this.handleNewGameClick(
        this.difficulties.intermediate.rows,
        this.difficulties.intermediate.cols,
        this.difficulties.intermediate.bombs,
        'intermediate'
      );
    });
    this.buttons.expert.addEventListener('click', () => {
      this.handleNewGameClick(
        this.difficulties.expert.rows,
        this.difficulties.expert.cols,
        this.difficulties.expert.bombs,
        'expert'
      );
    });
    this.buttons.menu.addEventListener('click', () => {
      this.backToMenuOpenModal();
    });
  }

  // New game buttons method, resets the game and starts a new one depending on the difficulty chosen by the user (beginner, intermediate, expert)
  handleNewGameClick(
    rows = this.rowsCount,
    cols = this.colsCount,
    bombs = this.bombsCount,
    difficulty = leaderboard.difficulty
  ) {
    endGameModal.closeModal();
    this.startNewGame(rows, cols, bombs);
    leaderboard.difficulty = difficulty;
    console.log('difficulty: ', leaderboard.difficulty);
    this.userFirstClick = true;
    // Have to stop the timer when loading a new game, zero it and start it again when the user clicks on a cell
    timer.resetTimer();
    this.showActiveDifficulty();
    // Change the size of the modals for game board on mobile
    this.mobileResize();
    this.mobileRotateExpertBoard();
    if (
      (window.innerWidth < MOBILE_WIDTH &&
        leaderboard.difficulty === 'beginner') ||
      (window.innerWidth < MOBILE_WIDTH &&
        leaderboard.difficulty === 'intermediate')
    ) {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.style.setProperty('--rotate-number', '0');
      });
    }
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
      // Timer starts when the user clicks on a cell
      timer.restartTimer();
      if (cell.dataset.bomb === 'true') {
        this.relocateBomb(cell, DEV_MODE);
      }
      this.userFirstClick = false;
    }

    // If the cell is already revealed, do nothing
    if (cell.dataset.cellState !== CELL_STATE.HIDDEN) {
      return;
    }

    // If the cell is a bomb, reveal all bombs and end the game
    if (cell.dataset.bomb === 'true') {
      console.log('you lose');
      this.endGame(false, cell);
      return;
    }
    this.revealedCells++;

    if (this.revealedCells === this.cellsToReveal) {
      console.log('you win');
      this.endGame(true);
      return;
    }

    // If the cell is not a bomb, reveal it
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
  relocateBomb(cell, isDevMode) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    cell.dataset.bomb = 'false';
    // remove style from the cell in case cheats are on (red background, DeveloperMode)
    cell.style = '';
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
    // If developer mode is on, change the background of the newly located bomb
    if (isDevMode) {
      this.cells[newX][newY].cellElement.style =
        'background-color: var(--bomb-color);';
    }
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
    if (
      cell.dataset.cellState === CELL_STATE.REVEALED ||
      cell.dataset.cellState === CELL_STATE.FLAGGED
    ) {
      return;
    }
    ++this.usedMoves;
    this.usedMovesScreen.textContent = this.usedMoves;
    console.log('usedMoves ', this.usedMoves);
  }

  showActiveDifficulty() {
    if (leaderboard.difficulty === 'intermediate') {
      this.difficultyScreen.style.setProperty(
        '--difficulty-font-size',
        '.8rem'
      );
    } else {
      this.difficultyScreen.style.setProperty('--difficulty-font-size', '1rem');
    }
    this.difficultyScreen.innerHTML = `<p>${leaderboard.difficulty}</p>`;
  }

  mobileRotateExpertBoard() {
    const gameBoard = this.bindElementById(GAME_BOARD_ID);
    const cells = document.querySelectorAll('.cell');
    if (
      window.innerWidth < MOBILE_WIDTH &&
      leaderboard.difficulty === 'expert'
    ) {
      cells.forEach((cell) => {
        cell.style.setProperty('--rotate-number', '-90deg');
      });
      // Expert board rotation for mobile
      gameBoard.style.setProperty('--rotate', '90deg');
      gameBoard.style.setProperty('--expert-top', '8.7rem');
    } else {
      gameBoard.style.setProperty('--rotate', '0');
      gameBoard.style.setProperty('--expert-top', '0');
    }
  }

  mobileResize() {
    if (
      window.innerWidth < MOBILE_WIDTH &&
      leaderboard.difficulty === 'beginner'
    ) {
      this.sidemenu.style.setProperty('--cols', 8);
      endGameModal.elementById.style.setProperty('--cols', 8);
    } else {
      this.sidemenu.style.setProperty('--cols', 16);
      endGameModal.elementById.style.setProperty('--cols', 16);
    }
  }

  backToMenuOpenModal() {
    // Listener for the back to menu modal button accept.
    this.buttons.toMenuAccept.addEventListener('click', () => {
      this.backToMenu();
      this.visibilityToggle(this.toMenuModal, SCREEN_HIDDEN);
    });
    // Listener for the back to menu modal button cancel.
    this.buttons.toMenuCancel.addEventListener('click', () => {
      this.visibilityToggle(this.toMenuModal, SCREEN_HIDDEN);
    });

    this.visibilityToggle(this.toMenuModal, SCREEN_VISIBLE);
  }

  backToMenu() {
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(mainMenu.elementById, SCREEN_VISIBLE);
    timer.resetTimer();
    this.handleNewGameClick();
    endGameModal.closeModal();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export const gameBoard = new GameBoard();
