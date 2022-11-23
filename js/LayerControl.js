// State
export const CLASS_HIDDEN = 'hidden';
export const SCREEN_VISIBLE = true;
export const SCREEN_HIDDEN = false;

export class LayerControl {
  constructor(elementId) {
    if (typeof elementId === 'undefined') {
      return;
    }
    this.elementById = this.bindElementById(elementId);
  }

  // method for assigning elements to a variable with simple validation.
  bindElementById(findElementById) {
    const element = document.getElementById(findElementById);

    if (!element) {
      throw new Error(`Could not find an element with ${findElementById} id.`);
    }
    return element;
  }

  visibilityToggle(element, option) {
    option == SCREEN_VISIBLE
      ? element.classList.remove(CLASS_HIDDEN)
      : element.classList.add(CLASS_HIDDEN);
  }

  opacityToggle(element, option) {
    option == SCREEN_VISIBLE
      ? (element.style.opacity = 1)
      : (element.style.opacity = 0);
  }
}
