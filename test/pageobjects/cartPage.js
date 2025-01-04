import { buttons, element } from "../selectors/cartSelectors.js";

class CartPage {
  constructor() {
    this.buttons = buttons;
    this.element = element;
  }
}

export default CartPage;
