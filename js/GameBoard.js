import { LayerControl } from './LayerControl.js';

const GAME_BOARD_ID = 'js-game-screen';

class GameBoard extends LayerControl {
  constructor() {
    super(GAME_BOARD_ID);
  }
}

export const gameBoard = new GameBoard();
