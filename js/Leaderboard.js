import { LayerControl } from './LayerControl.js';

const LEADERBOARD_ID = 'leaderboard-screen-js';
const MAX_HIGH_SCORES = 5;

class Leaderboard extends LayerControl {
  constructor() {
    super(LEADERBOARD_ID);
  }

  difficulty = 'beginner';

  // saveScoreLS(score) {
  //   const scores = this.getScoresLS();
  //   scores.push(score);
  //   localStorage.setItem('highScores', JSON.stringify(scores));
  // }

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

  getBeginnerScoresLS() {
    this.difficulty = 'beginner';
    const beginner = this.getScoresLS();
    return beginner;
  }

  getIntermediateScoresLS() {
    this.difficulty = 'intermediate';
    const intermediate = this.getScoresLS();
    return intermediate;
  }

  getExpertScoresLS() {
    this.difficulty = 'expert';
    const expert = this.getScoresLS();
    return expert;
  }

  getAllScoresLS() {
    const beginnerScores = this.getBeginnerScoresLS();
    const intermediateScores = this.getIntermediateScoresLS();
    const expertScores = this.getExpertScoresLS();

    console.log(
      'beginner: ',
      beginnerScores,
      'inter',
      intermediateScores,
      'exp',
      expertScores
    );

    return { beginnerScores, intermediateScores, expertScores };
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
    localStorage.setItem(this.difficulty, JSON.stringify(highScores));
  }
}

export const leaderboard = new Leaderboard();
