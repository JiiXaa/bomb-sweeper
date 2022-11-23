import { LayerControl, SCREEN_HIDDEN, SCREEN_VISIBLE } from './LayerControl.js';

const END_GAME_MODAL_ID = 'endgame-modal-js';
const END_GAME_MODAL_CONTENT_ID = 'end-game-modal-content-js';

class EndGameModal extends LayerControl {
  constructor() {
    super(END_GAME_MODAL_ID);
    this.modalContent = document.getElementById(END_GAME_MODAL_CONTENT_ID);
  }

  showModalEndGame() {
    console.log('show modal end game');
    this.opacityToggle(this.elementById, SCREEN_VISIBLE);
    // this.visibilityToggle(gameBoard.elementById, SCREEN_VISIBLE);
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

export const modal = new EndGameModal();
