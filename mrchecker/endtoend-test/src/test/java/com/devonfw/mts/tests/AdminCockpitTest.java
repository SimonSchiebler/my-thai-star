package com.devonfw.mts.tests;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.capgemini.mrchecker.test.core.BaseTest;
import com.devonfw.mts.common.data.User;
import com.devonfw.mts.common.mapper.UserMapper;
import com.devonfw.mts.pages.ThaiHomePage;
import com.devonfw.mts.pages.ThaiLoginPage;
import com.devonfw.mts.pages.ThaiUserAdminPage;

import junitparams.FileParameters;
import junitparams.JUnitParamsRunner;

@RunWith(JUnitParamsRunner.class)
public class AdminCockpitTest extends BaseTest {

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
   * Test login and logout.
   *
   * @param user. An instance of the class User.
   */
  @Test
  @FileParameters(value = "src/test/resources/datadriven/test_admins.csv", mapper = UserMapper.class)
  public void Test_Admin_loginAndLogOut(User user) {

    login(user);
    logOut();
  }

  /**
   * Open and Close add User Add Dialog.
   *
   * @param user. An instance of the class User.
   */
  @Test
  @FileParameters(value = "src/test/resources/datadriven/test_admins.csv", mapper = UserMapper.class)
  public void Test_Admin_OpenAndCloseAddUserDialog(User user) {

    ThaiUserAdminPage adminPage = new ThaiUserAdminPage();
    login(user);
    adminPage.clickCreateUserButton();
    Assert.assertTrue(adminPage.isAddUserDialogVisible());
    adminPage.clickCancelButtonInAddUserDialog();
    Assert.assertFalse(adminPage.isAddUserDialogVisible());
    logOut();
  }

  /**
   * Create and delete new user
   *
   * @param user. An instance of the class User.
   */
  @Test
  @FileParameters(value = "src/test/resources/datadriven/test_admins.csv", mapper = UserMapper.class)
  public void Test_Admin_CreateAndDeleteUser(User user) {

    ThaiUserAdminPage adminPage = new ThaiUserAdminPage();
    login(user);
    adminPage.clickCreateUserButton();
    Assert.assertTrue(adminPage.isAddUserDialogVisible());
    adminPage.enterCredentials("Testuser1", "Testpassword", "Waiter", "Testuser1@mail.de");
    adminPage.switchToDevices().switchToUserAdmin();
    Assert.assertTrue(adminPage.userTableContains("Testuser1"));
    logOut();
    login(new User("Testuser1", "Testpassword"));
    logOut();
    login(user);
    adminPage.clickDeleteButtonInUserTableRow("Testuser1");
    adminPage.clickDelteButtonInDeleteUserDialog();
    adminPage.switchToDevices().switchToUserAdmin();
    Assert.assertFalse(adminPage.userTableContains("Testuser1"));
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
