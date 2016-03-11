angular.module('WashOnDemand', [
	'ui.router',
	'wod.custSI',
	'wod.custSU',
	'wod.provSI',
	'wod.provSU',
	'wod.customer',
	'wod.provider',
	'wod.home'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/home/home.html',
			controller: 'homeCtrl',
			authenticate: false
		})
		.state('customerSignin', {
      url: '/customerSignin',
      templateUrl: 'app/auth/customerAuth/signin.html',
      controller: 'custSICtrl as csi',
      authenticate: false
    })
		.state('customerSignup', {
      url: '/customerSignup',
      templateUrl: 'app/auth/customerAuth/signup.html',
      controller: 'custSUCtrl as csu',
      authenticate: false
    })
		.state('providerSignin', {
      url: '/providerSignin',
      templateUrl: 'app/auth/providerAuth/signin.html',
      controller: 'provSICtrl as psi',
      authenticate: false
    })
    .state('providerSignup', {
      url: '/providerSignup',
      templateUrl: 'app/auth/providerAuth/signup.html',
      controller: 'provSUCtrl as psu',
      authenticate: false
    })
    .state('customerView', {
      url: '/customerProfile',
      templateUrl: 'app/customer/customer.html',
      controller: 'customer',
      authenticate: false // for now
    })
    .state('providerView', {
      url: '/providerProfile',
      templateUrl: 'app/provider/provider.html',
      controller: 'provider',
      authenticate: false // for now
    });

  $urlRouterProvider.otherwise('/');
});
