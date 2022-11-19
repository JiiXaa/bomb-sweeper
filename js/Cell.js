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

    return this.cellElement;
  }

  get cellState() {
    return this.cellElement.dataset.cellState;
  }
  set cellState(value) {
    this.cellElement.dataset.cellState = value;
  }
}
