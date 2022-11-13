import { LayerControl } from './LayerControl.js';

export class Cell extends LayerControl {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.mine = false;
  }
}
