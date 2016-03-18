describe('Clicking on the signin button ', function() {
  var email, password, signinButton;

  beforeEach(function() {
    browser.get('/#/customerSignin');
    email = element(by.model('csi.customer.email'));
    password = element(by.model('csi.customer.password'));
    signinButton = element(by.buttonText('Sign In'));
  });

  it('should give an error message for a email/password mismatch', function() {
    email.sendKeys('fake@fake.com');
    password.sendKeys('fakePassword');

    signinButton.click().then(function() {
      expect(browser.getLocationAbsUrl()).toMatch('/customerSignin');
      var errormsg = element(by.model('csi.customer.error'));
      expect(errormsg).not.toEqual('');
    });
  });

  it('should validate the credentials for a successful customer signin and display the customer view', function() {
    email.sendKeys('cust1@test.com');
    password.sendKeys('123');

    signinButton.click().then(function() {
      expect(browser.getLocationAbsUrl()).toMatch('/nav1/customerProfile');
    });
  });

  // it('should display a popup for an unsuccessful login', function() {
  //   // TODO: test unsuccessful login
  // });
});
