angular.module('wod.routes', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/home/home.template.html',
			controller: 'homeCtrl',
			authenticate: false
		})
		.state('nav', {
			url:'/customernav',
			templateUrl: 'app/nav/nav.template.html',
			controller: 'navCtrl',
			authenticate: false
		})
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
      templateUrl: 'app/customerView/customer.template.html',
      controller: 'customer',
      authenticate: false // for now
    })
    .state('providerView', {
      url: '/providerProfile',
      templateUrl: 'app/providerView/provider.template.html',
      controller: 'provider',
      authenticate: false // for now
    });

  $urlRouterProvider.otherwise('/');
});
