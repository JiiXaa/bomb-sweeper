import { LayerControl, SCREEN_HIDDEN, SCREEN_VISIBLE } from './LayerControl.js';

const END_GAME_MODAL_ID = 'endgame-modal-js';
const END_GAME_MODAL_CONTENT_ID = 'end-game-modal-content-js';

class EndGameModal extends LayerControl {
  constructor() {
    super(END_GAME_MODAL_ID);
    this.modalContent = document.getElementById(END_GAME_MODAL_CONTENT_ID);
  }

  showModalEndGame(isWin, seconds, moves) {
    this.opacityToggle(this.elementById, SCREEN_VISIBLE);
    if (isWin) {
      this.setModalContent(`
    <h1 class="endgame-modal__header" id="endgame-modal__header-js">
      You Win!
    </h1>
    <div class="endgame-modal__info">
      <p>It took you:</p>
      <div class="endgame-modal__info-item">
        <span class="endgame-modal__info-item-value">${seconds}</span>
        <span class="endgame-modal__info-item-text">seconds,</span>
      </div>
      <div class="endgame-modal__info-item">
        <span class="endgame-modal__info-item-value">${moves}</span>
        <span class="endgame-modal__info-item-text">Moves</span>
      </div>
    </div>
    `);
    } else {
      this.setModalContent(`
      <h1 class="endgame-modal__header" id="endgame-modal__header-js">
      You Lose!
      </h1>
      `);
    }
  }

  closeModal() {
    console.log('close modal end game');
    this.opacityToggle(this.elementById, SCREEN_HIDDEN);
    // this.visibilityToggle(gameBoard.elementById, SCREEN_VISIBLE);
  }

  setModalContent(content) {
    this.modalContent.innerHTML = content;
  }
}

export const endGameModal = new EndGameModal();
