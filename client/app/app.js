angular.module('WashOnDemand', [
	'ui.router',
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('customerSignin', {
      url: '/customerSignin',
      templateUrl: 'app/auth/customerAuth/signin.html',
      controller: 'custSICtrl',
      authenticate: false
    })
		.state('customerSignup', {
      url: '/customerSignup',
      templateUrl: 'app/auth/customerAuth/signup.html',
      controller: 'custSUCtrl',
      authenticate: false
    })
		.state('providerSignin', {
      url: '/providerSignin',
      templateUrl: 'app/auth/providerAuth/signin.html',
      controller: 'provSICtrl',
      authenticate: false
    })
    .state('providerSignup', {
      url: '/providerSignup',
      templateUrl: 'app/auth/providerAuth/signup.html',
      controller: 'provSUCtrl',
      authenticate: false
    })
    .state('customerView', {
      url: '/customerProfile',
      templateUrl: 'app/customer/customer.html',
      controller: 'customer',
      authenticate: true
    })
    .state('providerView', {
      url: '/providerProfile',
      templateUrl: 'app/provider/provider.html',
      controller: 'provider',
      authenticate: true
    });
});
