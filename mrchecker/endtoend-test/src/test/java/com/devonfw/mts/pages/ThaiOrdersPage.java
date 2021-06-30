package com.devonfw.mts.pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;
import com.devonfw.mts.common.utils.Utils;

public class ThaiOrdersPage extends BasePage {

  /** Reservations table search criteria */
  private static final By reservationsTableSearch = By.xpath("//tbody[@class='td-data-table-body']/tr");

  /** Search bar search criteria */
  private static final By searchBarFilter = By.className("mat-expansion-panel-header");

  /** Email input search criteria */
  private static final By emailInputSearch = By.xpath("//div[@class='formDesktopRow']//input[@name=\"email\"]");

  /** Email input search criteria */
  private static final By bookingTokenSearch = By.xpath("//div[@class='formDesktopRow']//input[@name='bookingToken']");

  /** submit data button search criteria */
  private static final By applyFiltersButtonSearch = By.xpath("//button[@type='submit']");

  /** submit data button search criteria */
  private static final By tableRowsSearch = By.xpath("//tbody/tr");

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isLoaded() {

    getDriver().waitForPageLoaded();

    return getDriver().getCurrentUrl().contains("orders");
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void load() {

    BFLogger.logError("MyThaiStar order page was not loaded.");
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String pageTitle() {

    return "";
  }

  public void setFilters(String email, String reservationToken) {

    for (int i = 0; i <= 9; i++) {
      try {
        getDriver().findElementDynamic(searchBarFilter).click();
        break;
      } catch (Exception e) {

      }
    }

    if (email != null)
      Utils.sendKeysWithCheck(email, emailInputSearch, getDriver(), getWebDriverWait());
    if (reservationToken != null)
      Utils.sendKeysWithCheck(reservationToken, bookingTokenSearch, getDriver(), getWebDriverWait());
    getDriver().findElementDynamic(applyFiltersButtonSearch).click();
  }

  public boolean isOnlyOneOrderDisplayed() {

    for (int i = 0; i <= 9; i++) {
      List<WebElement> asd = getDriver().findElements(tableRowsSearch);
      if (asd.size() == 1)
        return true;
      new WebDriverWait(getDriver(), 1);
    }
    return false;
  }

}
