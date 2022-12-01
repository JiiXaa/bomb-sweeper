import { LayerControl } from './LayerControl.js';

const LEADERBOARD_ID = 'leaderboard-js';
const MAX_HIGH_SCORES = 5;

class Leaderboard extends LayerControl {
  constructor() {
    super();
  }

  // saveScoreLS(score) {
  //   const scores = this.getScoresLS();
  //   scores.push(score);
  //   localStorage.setItem('highScores', JSON.stringify(scores));
  // }

  getScoresLS() {
    let highScores = localStorage.getItem('highScores');
    if (highScores) {
      highScores = JSON.parse(highScores);
    } else {
      highScores = [];
    }
    return highScores;
  }

  addHighScoreLS({ moves, time }) {
    this.sortHighScore(moves, time);
  }

  sortHighScore(moves, time, username = 'User') {
    const highScores = this.getScoresLS();
    const newHighScore = {
      username,
      moves,
      time,
    };
    highScores.push(newHighScore);
    highScores.sort((a, b) => a.moves - b.moves);
    highScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }
}

export const leaderboard = new Leaderboard();
