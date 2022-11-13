import {
  LayerControl,
  CLASS_HIDDEN,
  SCREEN_VISIBLE,
  SCREEN_HIDDEN,
} from './LayerControl.js';
import { gameBoard } from './GameBoard.js';

const MAIN_MENU_ID = 'js-main-menu';
const PLAY_GAME_BUTTON_ID = 'js-game-start';
const GAME_RULES_BUTTON_ID = 'js-game-rules';
const GAME_SETTINGS_BUTTON_ID = 'js-game-settings';

class MainMenu extends LayerControl {
  constructor() {
    super(MAIN_MENU_ID);
    this.bindMenuElements();
  }

  bindMenuElements() {
    const playButton = this.bindElementById(PLAY_GAME_BUTTON_ID);

    playButton.addEventListener('click', () => this.loadGame());
  }

  loadGame() {
    console.log('loading game');
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(gameBoard.elementById, SCREEN_VISIBLE);
  }
}

export const mainMenu = new MainMenu();
