import { LayerControl, SCREEN_HIDDEN, SCREEN_VISIBLE } from './LayerControl.js';
import { mainMenu } from './MainMenu.js';

const GAME_RULES_ID = 'rules-screen-js';
const RULES_BACK_BUTTON_ID = 'rules-menu-btn-js';

class GameRules extends LayerControl {
  backToMenu = this.bindElementById(RULES_BACK_BUTTON_ID);

  constructor() {
    super(GAME_RULES_ID);
    this.backToMenu.addEventListener('click', () => {
      this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
      this.visibilityToggle(mainMenu.elementById, SCREEN_VISIBLE);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        // If the rules screen is hidden, return
        if (this.elementById.classList.contains('hidden')) {
          return;
        }
        // If the rules screen is visible, hide it and show the main menu
        this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
        this.visibilityToggle(mainMenu.elementById, SCREEN_VISIBLE);
      }
    });
  }
}

export const gameRules = new GameRules();
