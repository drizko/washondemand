/*
  install:
    npm install -g protractor
    webdriver-manager update
  running the tests:
    protractor filepath/e2e-tests.conf.js
*/

exports.config = {
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--disable-web-security']
    }
  },
  baseUrl: 'http://localhost:8100',
  specs: [
    'e2e.js'
  ],
  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all',
      displaySuccessfulSpec: true,
      displayFailedSpec: true,
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      },
    }));
  },
  jasmineNodeOpts: {
    print: function() {}
  }
};
