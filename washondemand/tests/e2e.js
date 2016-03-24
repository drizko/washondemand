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
});

describe('Requesting Wash', function() {

  var requestWashButton, selectWashType, selectVehicleType,
      email, password;


  it('should allow user to request a wash', function() {
    browser.get('/#/customerSignin');

    email = element(by.model('csi.customer.email'));
    password = element(by.model('csi.customer.password'));
    signinButton = element(by.buttonText('Sign In'));

    email.sendKeys('cust1@test.com');
    password.sendKeys('123');

    signinButton.click().then(function() {
      expect(browser.getLocationAbsUrl()).toMatch('/nav1/customerProfile');
    });

    requestWashButton = element(by.buttonText('Request A Wash'));
    selectWashType = element(by.buttonText('Basic'));
    selectVehicleType = element(by.buttonText('Car'));

    selectWashType.click();

    selectVehicleType.click();

    browser.sleep(5000);

    requestWashButton.click()
      .then(function() {
        // Need to fill in more information here.
      });

    browser.sleep(2000);
  });

  describe('Creating a new provider account', function() {
    var companyName = element(by.model('psu.provider.companyName'));
    var email = element(by.model('psu.provider.email'));
    var phone = element(by.model('psu.provider.phone'));
    var password = element(by.model('psu.provider.password'));
    var confirmPassword = element(by.model('psu.provider.confirmPassword'));
    var signupButton = element(by.buttonText('Sign Up'));
    var errormsg = element(by.model('psu.provider.error'));

    beforeEach(function() {
      browser.get('/#/providerSignup');
    });

    it('Should deny sign up for wrong input', function() {
      companyName.sendKeys('test company');
      email.sendKeys('prov1@test.com');
      phone.sendKeys('1234567');
      password.sendKeys('123');
      confirmPassword.sendKeys('123');

      signupButton.click().then(function() {
        expect(browser.getLocationAbsUrl()).toMatch('/providerSignup');
        expect(errormsg).not.toEqual('');
      });

    });

    it('Should create an account and go to provider profile page', function() {
      companyName.sendKeys('test company');
      email.sendKeys('prov24@test.com');
      phone.sendKeys('1234567890');
      password.sendKeys('123');
      confirmPassword.sendKeys('123');

      signupButton.click().then(function() {
        expect(browser.getLocationAbsUrl()).toMatch('/nav2/providerProfile');
      });
    });
  });
});
