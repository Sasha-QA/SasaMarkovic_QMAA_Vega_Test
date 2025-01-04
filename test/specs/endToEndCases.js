import Login from "../pageobjects/loginPage.js";
import Homepage from "../pageobjects/homePage.js";
import Cart from "../pageobjects/cartPage.js";
import Checkout from "../pageobjects/checkoutPage.js";
import { credentials } from "../testData/testData.js";

const LoginActions = new Login();
const HomepageActions = new Homepage();
const CartAction = new Cart();
const CheckoutAction = new Checkout();

//Additional end-to-end was to test log in/log out process,
//but since it was already done through other tests, it was not done separately here.

describe("Finish ordering process", () => {
  it("Given I am on homepage", async () => {
    //This could be done via multiple steps, but since it is used often
    //I have created it as a separate method
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
  it("And I click on cart image", async () => {
    const cartLogo = await $(HomepageActions.homepageButtons.shoppingCart);

    await expect(cartLogo).toBeClickable();
    await cartLogo.click();
  });
  it("And I continue shopping by clicking 'CHECKOUT' button", async () => {
    const shoppingItem = await $(CartAction.element.item);

    await expect(shoppingItem).toBeDisplayed();

    const checkoutButton = await $(CartAction.buttons.checkout);

    await expect(checkoutButton).toBeClickable();
    await checkoutButton.click();
  });
  it('And I enter valid credentials in "Your information" section', async () => {
    //This was also possible to create in few different steps,
    //but I wanted to showcase one more way of creating a method
    //without constantly writting every step in the actual test
    await CheckoutAction.inputData(
      credentials.firstName,
      credentials.lastName,
      credentials.zipCode
    );
  });
  it('And I continue shopping process by clicking on "CONTINUE" button', async () => {
    const continueShoppingButton = await $(CheckoutAction.buttons.continue);

    await expect(continueShoppingButton).toBeClickable();
    await continueShoppingButton.click();
  });
  it('When I click on "FINISH" after checking if the order is correct', async () => {
    const checkoutModal = await $(CheckoutAction.modals.summaryContainer);

    await expect(checkoutModal).toBeDisplayed();

    const inventoryItem = await $(CheckoutAction.modals.item);

    await expect(inventoryItem).toBeDisplayed();
    await expect(inventoryItem).toHaveText("Sauce Labs Backpack");

    const finishOrderButton = await $(CheckoutAction.buttons.finish);

    await expect(finishOrderButton).toBeClickable();
    await finishOrderButton.click();
  });
  it("Then I successfully placed an order", async () => {
    const orderFinishedModal = await $(CheckoutAction.modals.dispatchedOrder);
    const thankYouMessage = await $(CheckoutAction.modals.thankYouModal);
    const completeMessage = await $(CheckoutAction.modals.completeMessageModal);

    await expect(orderFinishedModal).toBeDisplayed();
    await expect(thankYouMessage).toBeDisplayed();
    await expect(completeMessage).toBeDisplayed();

    //Additionally, log out so new test can start
    //This could be done via multiple steps, but since it is used often
    //I have created it as a separate method
    await LoginActions.logout();
  });

  describe("Log in, add item to the cart, remove it from the cart, and log out", () => {
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
    it("And I click on cart image", async () => {
      const cartLogo = await $(HomepageActions.homepageButtons.shoppingCart);

      await expect(cartLogo).toBeClickable();
      await cartLogo.click();
    });
    it("And I remove item from the cart", async () => {
      const backpackItem = await $(CartAction.element.item);

      await expect(backpackItem).toBeDisplayed();

      const removeButton = await $(CartAction.buttons.remove);

      await expect(removeButton).toBeClickable();
      await removeButton.click();

      await expect(backpackItem).not.toBeDisplayed();

      const itemInCart = await $(HomepageActions.elements.numberInCart);

      await expect(itemInCart).not.toBeDisplayed();
    });
    it("When I logout through the Navigation menu", async () => {
      await LoginActions.logout();
    });
    it("Then I am returned to the login page for the sauce demo", async () => {
      const currentUrl = await browser.getUrl();

      expect(currentUrl).toBe("https://www.saucedemo.com/v1/index.html");
    });
  });
});
