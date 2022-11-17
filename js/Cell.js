import { LayerControl } from './LayerControl.js';

export const CELL_STATE = {
  HIDDEN: 'hidden',
  BOMB: 'bomb',
  REVEALED: 'revealed',
  FLAGGED: 'flagged',
};

export class Cell extends LayerControl {
  cellElement = null;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  generateCells() {
    this.cellElement = document.createElement('div');
    this.cellElement.classList.add('cell');
    this.cellElement.setAttribute('data-cell-state', CELL_STATE.HIDDEN);
    this.cellElement.dataset.x = this.x;
    this.cellElement.dataset.y = this.y;
    this.cellElement.dataset.bomb = false;
    this.cellElement.addEventListener('click', this.handleCellLeftClick);
    this.cellElement.addEventListener('contextmenu', this.handleCellRightClick);

    return this.cellElement;
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
  get cellState() {
    return this.cellElement.dataset.cellState;
  }
  set cellState(value) {
    this.cellElement.dataset.cellState = value;
  }
}
