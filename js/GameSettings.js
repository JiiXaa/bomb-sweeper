import { LayerControl } from './LayerControl.js';

const GAME_SETTINGS_ID = 'js-settings-screen';

class GameSettings extends LayerControl {
  constructor() {
    super(GAME_SETTINGS_ID);
  }
}

export const gameSettings = new GameSettings();
