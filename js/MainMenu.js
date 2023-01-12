import {
  LayerControl,
  CLASS_HIDDEN,
  SCREEN_VISIBLE,
  SCREEN_HIDDEN,
} from './LayerControl.js';
import { gameBoard } from './GameBoard.js';
import { gameRules } from './GameRules.js';
import { leaderboard } from './GameLeaderboard.js';

const MAIN_MENU_ID = 'main-menu-js';
const PLAY_GAME_BUTTON_ID = 'play-btn-js';
const GAME_RULES_BUTTON_ID = 'rules-btn-js';
const GAME_LEADERBOARD_BUTTON_ID = 'leaderboard-btn-js';

class MainMenu extends LayerControl {
  constructor() {
    super(MAIN_MENU_ID);
    this.bindMenuElements();
  }

  // Bind the menu buttons to their respective functions.
  bindMenuElements() {
    const playButton = this.bindElementById(PLAY_GAME_BUTTON_ID);
    const rulesButton = this.bindElementById(GAME_RULES_BUTTON_ID);
    const leaderboardButton = this.bindElementById(GAME_LEADERBOARD_BUTTON_ID);

    playButton.addEventListener('click', () => this.loadGameScreen());
    rulesButton.addEventListener('click', () => this.loadRulesScreen());
    leaderboardButton.addEventListener('click', () =>
      this.loadLeaderboardScreen()
    );
  }

  // Load the game screen and hide the main menu.
  loadGameScreen() {
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(gameBoard.elementById, SCREEN_VISIBLE);
    gameBoard.difficulty = 'beginner';
  }

  // Load the rules screen and hide the main menu.
  loadRulesScreen() {
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(gameRules.elementById, SCREEN_VISIBLE);
  }

  // Load the leaderboard screen and hide the main menu.
  loadLeaderboardScreen() {
    leaderboard.displayAllScores();
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(leaderboard.elementById, SCREEN_VISIBLE);
  }
}

export const mainMenu = new MainMenu();
