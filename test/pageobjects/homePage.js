import { dropdown, homepageButtons, elements} from "../selectors/homepageSelectors.js";

class HomePage {
  constructor() {
    this.dropdown = dropdown;
    this.homepageButtons = homepageButtons;
    this.elements = elements;
  }
}
export default HomePage;
