package com.devonfw.mts.pages;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;
import com.devonfw.mts.common.utils.Utils;

public class ThaiUserAdminPage extends BasePage {

  /** Orders tab search criteria */
  private static final By usersTab = By.xpath("//a[@routerlink='/admin']");

  /** Reservations tab search criteria */
  private static final By devicesTab = By.xpath("//a[@routerlink='/devices']");

  /** Add User Button search criteria */
  private static final By addUserButton = By.xpath("//button/span[text()=' Add User ']/..");

  /** Add User Dialog search criteria */
  private static final By addUserDialog = By.xpath(
      "//mat-dialog-container//mat-form-field//input[@formcontrolname='confirmPassword']/ancestor::mat-dialog-container[1]");

  /** username input in Adduser Dialog search criteria */
  private static final By usernameInCreateUserDialog = By
      .xpath("//mat-dialog-container//mat-form-field//input[@formcontrolname='username']");

  /** email input in Adduser Dialog search criteria */
  private static final By emailInCreateUserDialog = By
      .xpath("//mat-dialog-container//mat-form-field//input[@formcontrolname='email']");

  /** password input in Adduser Dialog search criteria */
  private static final By passwordInCreateUserDialog = By
      .xpath("//mat-dialog-container//mat-form-field//input[@formcontrolname='password']");

  /** confirmPassword input in Adduser Dialog search criteria */
  private static final By confirmPwInCreateUserDialog = By
      .xpath("//mat-dialog-container//mat-form-field//input[@formcontrolname='confirmPassword']");

  /** Cancel button in Adduser Dialog search criteria */
  private static final By roleInCreateUserDialog = By.xpath("//mat-dialog-container//mat-form-field//mat-select");

  /** accept button in Adduser Dialog search criteria */
  private static final By acceptButtonInCreateUserDialog = By
      .xpath("//mat-dialog-container//mat-dialog-actions//button//span[contains(text(),'Add')]/ancestor::button[1]");

  /** accept Terms in Adduser Dialog search criteria */
  private static final By acceptTermsInCreateUserDialog = By
      .xpath("//mat-dialog-container//mat-checkbox//span[contains(text(),'Accept terms')]/ancestor::mat-checkbox[1]");

  /** Cancel button in Adduser Dialog search criteria */
  private static final By cancelButtonInAddUserDialog = By
      .xpath("//mat-dialog-container//button/span[text()='Cancel']/ancestor::button[1]");

  /** User Table search criteria */
  private static final By userTable = By.xpath("//table");

  /** Delete button in Dialog search criteria */
  private static final By deleteButtonInUserDeleteDialog = By.xpath(
      "//mat-dialog-container//mat-dialog-content[contains(text(),'Confirm')]/../mat-dialog-actions//button/span[contains(text(),'Delete')]/..");

  /** Delete user Dialog search criteria */
  private static final By deleteUserDialog = By
      .xpath("//mat-dialog-container//mat-dialog-content[contains(text(),'Confirm')]/..");

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isLoaded() {

    getDriver().waitForPageLoaded();

    return getDriver().getCurrentUrl().contains("admin");
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void load() {

    BFLogger.logError("MyThaiStar waiter page was not loaded.");

  }

  /**
   * Seek for the devices tab and click on it
   *
   * @return ThaiDeviceAdminPage an object that represents the device admin page
   */
  public ThaiDeviceAdminPage switchToDevices() {

    getDriver().findElementDynamic(devicesTab).click();

    return new ThaiDeviceAdminPage();
  }

  /**
   * Seek for the users tab and click on it
   *
   * @return ThaiUserAdminPage an object representing the user admin page
   */
  public ThaiUserAdminPage switchToUserAdmin() {

    getDriver().findElementDynamic(usersTab).click();
    getDriver().waitForElementVisible(By.xpath("//table"));

    return new ThaiUserAdminPage();
  }

  /**
   *
   *
   * @return ThaiOrdersPage an object that represents the orders page
   */
  public ThaiOrdersPage clickCreateUserButton() {

    getDriver().findElementDynamic(addUserButton).click();

    return new ThaiOrdersPage();
  }

  public boolean isAddUserDialogVisible() {

    try {
      getDriver().waitForElementVisible(addUserDialog);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public void clickCancelButtonInAddUserDialog() {

    getDriver().findElementDynamic(cancelButtonInAddUserDialog).click();
    new WebDriverWait(getDriver(), 10).until(ExpectedConditions.invisibilityOfElementLocated(addUserDialog));
  }

  public void clickDelteButtonInDeleteUserDialog() {

    getDriver().findElementDynamic(deleteButtonInUserDeleteDialog).click();
    new WebDriverWait(getDriver(), 10).until(ExpectedConditions.invisibilityOfElementLocated(deleteUserDialog));
  }

  public boolean userTableContains(String username) {

    getDriver().waitForElementVisible(By.xpath("//table"));
    try {
      getDriver().findElementDynamic(By.xpath("//table//tbody//tr/td[contains(text(),'" + username + "')]/.."));
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public void clickDeleteButtonInUserTableRow(String username) {

    getDriver().waitForElementVisible(By.xpath("//table"));
    getDriver().findElementDynamic(By.xpath("//table//tbody//tr/td[contains(text(),'" + username + "')]/../td//button"))
        .click();
  }

  /**
   * Seek for username, password and role inputs and set them. Then the accept button is clicked
   *
   * @param username an username for the new user
   * @param password the password for the new user
   * @param role an role for the new user
   * @param email an email for the new user
   */
  public void enterCredentials(String username, String password, String role, String email) {

    WebElement roleSelect = getDriver().findElementDynamic(roleInCreateUserDialog);
    WebElement acceptTermsCheckbox = getDriver().findElementDynamic(acceptTermsInCreateUserDialog);
    WebElement acceptButton = getDriver().findElementDynamic(acceptButtonInCreateUserDialog);

    Assert.assertFalse(acceptButton.isEnabled());

    Utils.sendKeysWithCheck(username, usernameInCreateUserDialog, getDriver(), getWebDriverWait());
    Utils.sendKeysWithCheck(email, emailInCreateUserDialog, getDriver(), getWebDriverWait());
    Utils.sendKeysWithCheck(password, passwordInCreateUserDialog, getDriver(), getWebDriverWait());
    Utils.sendKeysWithCheck(password, confirmPwInCreateUserDialog, getDriver(), getWebDriverWait());

    acceptTermsCheckbox.click();
    roleSelect.click();

    getDriver().findElementDynamic(By.xpath("//mat-option//span[contains(text(), '" + role + "')]")).click();

    // Wait until all the password has been written
    // driverWait
    // .until((driver) -> driver.findElement(passwordSearch).getAttribute("value").length() == password.length());
    acceptButton = getDriver().findElementDynamic(acceptButtonInCreateUserDialog);

    Assert.assertTrue(acceptButton.isEnabled());
    acceptButton.click();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String pageTitle() {

    return "";
  }

}
