import { LayerControl } from './LayerControl.js';

const GAME_LEADERBOARD_ID = 'leaderboard-screen-js';

class GameLeaderboard extends LayerControl {
  constructor() {
    super(GAME_LEADERBOARD_ID);
  }
}

export const gameLeaderboard = new GameLeaderboard();
