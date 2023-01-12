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

  // method for assigning elements to a variable with simple validation. If the element is not found, throw an error. If the element is found, return the element. This is used to assign elements to variables in the constructor of the inheriting class.
  bindElementById(findElementById) {
    const element = document.getElementById(findElementById);

    if (!element) {
      throw new Error(`Could not find an element with ${findElementById} id.`);
    }
    return element;
  }

  // method for toggling the visibility of an element. If the option is SCREEN_VISIBLE, remove the CLASS_HIDDEN class from the element. If the option is SCREEN_HIDDEN, add the CLASS_HIDDEN class to the element.
  visibilityToggle(element, option) {
    option == SCREEN_VISIBLE
      ? element.classList.remove(CLASS_HIDDEN)
      : element.classList.add(CLASS_HIDDEN);
  }

  // method for toggling the opacity of an element. If the option is SCREEN_VISIBLE, set the opacity to 1. If the option is SCREEN_HIDDEN, set the opacity to 0.
  opacityToggle(element, option) {
    option == SCREEN_VISIBLE
      ? (element.style.opacity = 1)
      : (element.style.opacity = 0);
  }
}
