package com.devonfw.mts.pages;

import org.openqa.selenium.By;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

public class ThaiDeviceAdminPage extends BasePage {

  /** Orders tab search criteria */
  private static final By usersTab = By.xpath("//a[@routerlink='/admin']");

  /** Reservations tab search criteria */
  private static final By devicesTab = By.xpath("//a[@routerlink='/devices']");

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
    getDriver().waitForElementVisible(By.xpath("//table"));
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
   * {@inheritDoc}
   */
  @Override
  public String pageTitle() {

    return "";
  }

}
