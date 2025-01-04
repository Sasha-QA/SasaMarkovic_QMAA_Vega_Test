import Login from "../pageobjects/loginPage.js";
import Homepage from "../pageobjects/homePage.js";
import Description from "../pageobjects/descriptionPage.js";
import { credentials } from "../testData/testData.js";

const LoginActions = new Login();
const HomepageActions = new Homepage();
const DescriptionAction = new Description();

describe("Sort items by prices from highest to lowest", () => {
  it("Given I am on homepage", async () => {
    //This could be done via multiple steps, but since it is used often
    //I have created it as a separate method
    await LoginActions.login(
      credentials.standardUsername,
      credentials.standardPassword
    );
  });
  it("When I sort items by prices form highets to lowest", async () => {
    const dropdown = await $(HomepageActions.dropdown.dropdownMenu);

    await expect(dropdown).toBeClickable();
    await dropdown.click();

    await dropdown.selectByVisibleText("Price (high to low)");
  });
  it("Then items are listed from highest price to lowest", async () => {
    const elementPrice = await $$(HomepageActions.elements.price); // for selecting multiple elements

    const prices = [];
    for (let priceElement of elementPrice) {
      const priceText = await priceElement.getText();
      const price = parseFloat(priceText.replace("$", ""));
      prices.push(price);
    }

    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);

    //Additionally, log out so new test can start
    //This could be done via multiple steps, but since it is used often
    //I have created it as a separate method
    await LoginActions.logout();

    const currentUrl = await browser.getUrl();

    expect(currentUrl).toBe("https://www.saucedemo.com/v1/index.html");
  });

  describe("Add and remove items from the cart", () => {
    it("Given I am on homepage", async () => {
      await LoginActions.login(
        credentials.standardUsername,
        credentials.standardPassword
      );
    });
    it("And I add Sauce Labs Backpack to the cart", async () => {
      const addBackpack = await $(
        HomepageActions.homepageButtons.addToCartForBackpack
      );

      await expect(addBackpack).toBeClickable();
      await addBackpack.click();

      const itemInCart = await $(HomepageActions.elements.numberInCart);

      await expect(itemInCart).toHaveText("1");
    });
    it("And I add Sauce Labs onesie to the cart", async () => {
      const addOnesie = await $(
        HomepageActions.homepageButtons.addToCartForOnesie
      );

      await expect(addOnesie).toBeClickable();
      await addOnesie.click();

      const itemInCart = await $(HomepageActions.elements.numberInCart);

      await expect(itemInCart).toHaveText("2");
    });
    it("And I click on image for Sauce labs Backpack", async () => {
      const imageForBackapck = await $(HomepageActions.elements.backpackImage);

      await expect(imageForBackapck).toBeClickable();
      await imageForBackapck.click();

      await browser.pause(3000);
    });
    it("When I click on Remove button for the Sauce Labs Backpack", async () => {
      const removeButton = await $(DescriptionAction.buttons.removeBackpack);

      await expect(removeButton).toBeClickable();
      await removeButton.click();
    });
    it("Then cart number is lowered to 1", async () => {
      const itemInCart = await $(HomepageActions.elements.numberInCart);

      await expect(itemInCart).toHaveText("1");
    });
  });
});
