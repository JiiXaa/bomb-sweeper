import { LayerControl } from './LayerControl.js';

export class Cell extends LayerControl {
  constructor(x, y, cellElement) {
    super();
    this.cellElement = cellElement;
    this.x = x;
    this.y = y;
    this.mine = false;
  }
}
