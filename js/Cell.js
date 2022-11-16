import { LayerControl } from './LayerControl.js';
import { CELL_STATE } from './GameBoard.js';

export class Cell extends LayerControl {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  generateCells() {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.setAttribute('data-cell-state', CELL_STATE.HIDDEN);
    cellElement.dataset.x = this.x;
    cellElement.dataset.y = this.y;
    cellElement.dataset.mine = false;
    cellElement.addEventListener('click', this.handleCellClick);

    return cellElement;
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
