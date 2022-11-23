import { LayerControl } from './LayerControl.js';

const GAME_SETTINGS_ID = 'settings-screen-js';

class GameSettings extends LayerControl {
  constructor() {
    super(GAME_SETTINGS_ID);
  }
}

export const gameSettings = new GameSettings();
