import { LayerControl, SCREEN_HIDDEN, SCREEN_VISIBLE } from './LayerControl.js';
import { mainMenu } from './MainMenu.js';

const GAME_LEADERBOARD_ID = 'leaderboard-screen-js';
const SCORES_BACK_BUTTON_ID = 'scores-menu-btn-js';
const MAX_HIGH_SCORES = 5;
const USER_NAME = 'User';

class GameLeaderboard extends LayerControl {
  difficulty = 'beginner';
  backToMenu = this.bindElementById(SCORES_BACK_BUTTON_ID);

  constructor() {
    super(GAME_LEADERBOARD_ID);
    // Listener for back to menu button. When clicked, hide the leaderboard screen and show the main menu.
    this.backToMenu.addEventListener('click', () => {
      this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
      this.visibilityToggle(mainMenu.elementById, SCREEN_VISIBLE);
    });
    // Listener for escape key to return to main menu. When pressed, hide the leaderboard screen and show the main menu.
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        // If the leaderboard screen is hidden, return.
        if (this.elementById.classList.contains('hidden')) {
          return;
        }
        // If the leaderboard screen is visible, hide it and show the main menu
        this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
        this.visibilityToggle(mainMenu.elementById, SCREEN_VISIBLE);
      }
    });
  }

  // Load high scores from local storage, or return an empty array if none exist
  getScoresLS() {
    let highScores = localStorage.getItem(this.difficulty);
    if (highScores) {
      highScores = JSON.parse(highScores);
    } else {
      highScores = [];
    }
    return highScores;
  }

  // Method to return specific game difficulty scores from local storage.
  getSpecificScoresLS(difficulty) {
    this.difficulty = difficulty;
    const scores = this.getScoresLS();
    return scores;
  }

  // Method displays all three difficulty scores in the leaderboard screen in separate lists.
  displayAllScores() {
    const beginnerList = this.bindElementById('scores-beginner-js');
    const intermediateList = this.bindElementById('scores-intermediate-js');
    const expertList = this.bindElementById('scores-expert-js');

    const beginnerScores = this.getSpecificScoresLS('beginner');
    const intermediateScores = this.getSpecificScoresLS('intermediate');
    const expertScores = this.getSpecificScoresLS('expert');

    // If there are no beginner scores, display a message to the user in the beginner list.
    if (beginnerScores.length === 0 || beginnerScores === null) {
      beginnerList.innerHTML = `<li>No scores yet</li>`;
    } else {
      beginnerList.innerHTML = this.renderScoresList(beginnerScores);
    }

    // If there are no intermediate scores, display a message to the user in the intermediate list.
    if (intermediateScores.length === 0 || intermediateScores === null) {
      intermediateList.innerHTML = `<li>No scores yet</li>`;
    } else {
      intermediateList.innerHTML = this.renderScoresList(intermediateScores);
    }

    // If there are no expert scores, display a message to the user in the expert list.
    if (expertScores.length === 0 || expertScores === null) {
      expertList.innerHTML = `<li>No scores yet</li>`;
    } else {
      expertList.innerHTML = this.renderScoresList(expertScores);
    }
  }

  // Method maps trough the scores array and returns a list item for each score for the specific difficulty. The list items are then joined into a string and returned.
  renderScoresList(difficulty) {
    const highScoresList = difficulty
      .map((score) => {
        return `<li><span>${score.user}:</span> ${score.moves} moves, ${score.time} seconds</li>`;
      })
      .join('');
    return highScoresList;
  }

  // Method adds a new high score to the local storage. If there are already 5 scores, the lowest score is removed.
  addHighScoreLS({ moves, time, user = USER_NAME }) {
    const highScores = this.getScoresLS();
    const newHighScore = {
      moves,
      time,
      user,
    };
    highScores.push(newHighScore);
    // Sort the high scores and remove the lowest score if there are more than 5 scores.
    let sortedHighScores = this.sortHighScore(highScores);
    localStorage.setItem(this.difficulty, JSON.stringify(sortedHighScores));
  }

  // Method sorts the high scores array by the number based on user moves.
  sortHighScore(highScores) {
    highScores.sort((a, b) => a.moves - b.moves);
    highScores.splice(MAX_HIGH_SCORES);
    return highScores;
  }

  // Method resets the game and returns to the main menu.
  backToMenu() {
    this.visibilityToggle(this.elementById, SCREEN_HIDDEN);
    this.visibilityToggle(mainMenu.elementById, SCREEN_VISIBLE);
    this.startNewGame();
    timer.resetTimer();
    endGameModal.closeModal();
  }
}

export const leaderboard = new GameLeaderboard();
