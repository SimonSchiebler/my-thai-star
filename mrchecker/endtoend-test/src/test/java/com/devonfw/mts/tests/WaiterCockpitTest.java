package com.devonfw.mts.tests;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.capgemini.mrchecker.test.core.BaseTest;
import com.devonfw.mts.common.data.User;
import com.devonfw.mts.common.mapper.UserMapper;
import com.devonfw.mts.pages.ThaiHomePage;
import com.devonfw.mts.pages.ThaiLoginPage;

import junitparams.FileParameters;
import junitparams.JUnitParamsRunner;

@RunWith(JUnitParamsRunner.class)
public class WaiterCockpitTest extends BaseTest {

  /** My thai star home page object */
  private ThaiHomePage myThaiStarHome = new ThaiHomePage();

  /**
   * {@inheritDoc}
   */
  @Override
  public void setUp() {

    this.myThaiStarHome.load();
    logOut();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void tearDown() {

  }

  /**
   * Test
   *
   * @param user. An instance of the class User.
   */
  @Test
  @FileParameters(value = "src/test/resources/datadriven/test_waiters.csv", mapper = UserMapper.class)
  public void Test_Admin_loginAndLogOut(User user) {

    login(user);

    logOut();
  }

  /** Login with and user in "My thai star" */
  private void login(User user) {

    ThaiLoginPage loginPage = this.myThaiStarHome.clickLogInButton();
    loginPage.enterCredentials(user.getUsername(), user.getPassword());
    Assert.assertTrue("User " + user.getUsername() + " not logged",
        this.myThaiStarHome.isUserLogged(user.getUsername()));
  }

  /** Logout from the "My thai star" application */
  private void logOut() {

    if (this.myThaiStarHome.isUserLogged()) {
      this.myThaiStarHome.clickLogOutButton();
    }
    Assert.assertFalse("Some user logged", this.myThaiStarHome.isUserLogged());
  }

}
