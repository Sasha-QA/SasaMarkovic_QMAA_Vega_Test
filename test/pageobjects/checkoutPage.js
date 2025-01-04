import { fields, buttons, modals } from "../selectors/checkoutSelectors";

class CheckoutPage {
  constructor() {
    this.fields = fields;
    this.buttons = buttons;
    this.modals = modals;
  }

  async inputData(name, surname, zip) {
    const userFirstName = await $(fields.firstName);
    const userLastName = await $(fields.lastName);
    const userZip = await $(fields.zipCode);

    await expect(userFirstName).toBeClickable();
    await userFirstName.click();
    await userFirstName.setValue(name);

    await expect(userLastName).toBeClickable();
    await userLastName.click();
    await userLastName.setValue(surname);

    await expect(userZip).toBeClickable();
    await userZip.click();
    await userZip.setValue(zip);
  }
}

export default CheckoutPage;
