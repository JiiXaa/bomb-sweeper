import {
  LayerControl,
  CLASS_HIDDEN,
  SCREEN_VISIBLE,
  SCREEN_HIDDEN,
} from './LayerControl.js';
import { gameBoard } from './GameBoard.js';
import { gameRules } from './GameRules.js';
import { gameSettings } from './GameSettings.js';
import { timer } from './Timer.js';

const MAIN_MENU_ID = 'main-menu-js';
const PLAY_GAME_BUTTON_ID = 'play-btn-js';
const GAME_RULES_BUTTON_ID = 'rules-btn-js';
const GAME_SETTINGS_BUTTON_ID = 'settings-btn-js';

class MainMenu extends LayerControl {
  constructor() {
    super(MAIN_MENU_ID);
    this.bindMenuElements();
  }

  bindMenuElements() {
    const playButton = this.bindElementById(PLAY_GAME_BUTTON_ID);
    const rulesButton = this.bindElementById(GAME_RULES_BUTTON_ID);
    const settingsButton = this.bindElementById(GAME_SETTINGS_BUTTON_ID);

    playButton.addEventListener('click', () => this.loadGameScreen());
    rulesButton.addEventListener('click', () => this.loadRulesScreen());
    settingsButton.addEventListener('click', () => this.loadSettingsScreen());
  }

  loadGameScreen() {
    console.log('loading game screen');
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(gameBoard.elementById, SCREEN_VISIBLE);
    // Have to reset the timer when loading the game screen, to make sure it starts from 0
    timer.resetTimer();
  }

  loadRulesScreen() {
    console.log('loading game rules screen');
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(gameRules.elementById, SCREEN_VISIBLE);
  }

  loadSettingsScreen() {
    console.log('loading game settings screen');
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(gameSettings.elementById, SCREEN_VISIBLE);
  }
}

export const mainMenu = new MainMenu();
