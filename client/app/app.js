angular.module('WashOnDemand', [
	'ui.router',
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('customerSignin', {
      url: '/customerSignin',
      templateUrl: 'app/auth/customerAuth/signin.html',
      controller: 'custSI',
      authenticate: false
    })
		.state('customerSignup', {
      url: '/customerSignup',
      templateUrl: 'app/auth/customerAuth/signup.html',
      controller: 'custSU',
      authenticate: false
    })
		.state('providerSignin', {
      url: '/providerSignin',
      templateUrl: 'app/auth/providerAuth/signin.html',
      controller: 'provSI',
      authenticate: false
    })
    .state('providerSignup', {
      url: '/providerSignup',
      templateUrl: 'app/auth/providerAuth/signup.html',
      controller: 'provSU',
      authenticate: false
    });
});
