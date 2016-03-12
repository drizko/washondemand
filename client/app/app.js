angular.module('WashOnDemand', [
	'ui.router',
	// 'wod.custSI',
	// 'wod.custSU',
	// 'wod.provSI',
	// 'wod.provSU',
	'wod.authMaster',
	'wod.customer',
	'wod.provider',
	'wod.home',
	//'wod.authFactory'
	'wod.nav',
	'ngMap'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
			controller: 'homeCtrl',
  		authenticate: false
		})
		.state('nav', {
			url:'/customernav',
			templateUrl: 'app/nav/nav.html',
			controller: 'navCtrl',
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
      authenticate: true // for now
    })
    .state('providerView', {
      url: '/providerProfile',
      templateUrl: 'app/provider/provider.html',
      controller: 'provider',
      authenticate: true // for now
    });

  $urlRouterProvider.otherwise('/');
  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function($window) {

  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.wod');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function($rootScope, $state, authFactory) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !authFactory.isAuth()) {
      // User isn’t authenticated
      $state.transitionTo('home');
      event.preventDefault();
    }
  });
});
