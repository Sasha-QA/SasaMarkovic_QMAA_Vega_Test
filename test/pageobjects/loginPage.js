import { fields, buttons } from "../selectors/loginSelectors.js";
import { homepageButtons } from "../selectors/homepageSelectors.js";

class LoginPage {
  constructor() {
    this.fields = fields; 
    this.buttons = buttons;
    this.homepageButtons = homepageButtons;
  }

  async login(usernameCredential, passwordCredential) {
    await browser.url("https://www.saucedemo.com/v1/index.html");

    const username = await $(fields.username);
    const password = await $(fields.password);

    await expect(username).toBeClickable();
    await username.click();
    await username.setValue(usernameCredential);

    await expect(password).toBeClickable();
    await password.click();
    await password.setValue(passwordCredential);

    const loginButton = await $(buttons.login);

    await expect(loginButton).toBeClickable();
    await loginButton.click();
  }

  async logout() {
    const navigationMenuTab = await $(homepageButtons.navigationMenu);

    await expect(navigationMenuTab).toBeClickable();
    await navigationMenuTab.click();

    const logOutButton = await $(homepageButtons.logOut);

    await expect(logOutButton).toBeClickable();
    await logOutButton.click();
  }
}

export default LoginPage;
