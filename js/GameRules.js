import { LayerControl } from './LayerControl.js';

const GAME_RULES_ID = 'rules-screen-js';

class GameRules extends LayerControl {
  constructor() {
    super(GAME_RULES_ID);
  }
}

export const gameRules = new GameRules();
