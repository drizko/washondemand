angular.module('wod.routes', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('home', {
      url: '/',
			templateUrl: 'app/home/home.template.html',
			controller: 'homeCtrl as home',
			authenticate: false
		})
		.state('customernav', {
			url:'/nav1',
			templateUrl: 'app/nav/customernav.template.html',
			controller: 'navCtrl as navCtrl',
      abstract: true,
		})
    .state('providernav', {
			url:'/nav2',
			templateUrl: 'app/nav/providernav.template.html',
			controller: 'navCtrl as navCtrl',
      abstract: true,
		})
    .state('customernav.customer', {
      url: '/customerProfile',
      // authenticate: false, // for now
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/customerView/customer.template.html',
          controller: 'customerCtrl as customerCtrl'
        }
      },
      // resolve: {
      //   // controller will not be loaded until $waitForAuth resolves
      //   // Auth refers to our $firebaseAuth wrapper in the example above
      //   "currentAuth": ["Auth", function(Auth) {
      //     // $waitForAuth returns a promise so the resolve waits for it to complete
      //     return Auth.auth.$requireAuth();
      //   }]
      // }
    })
    .state('providernav.provider', {
      url: '/providerProfile',
      // authenticate: false // for now
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/providerView/provider.template.html',
          controller: 'providerCtrl as providerCtrl'
        }
      }
    })
    .state('customernav.customerWashes', {
      url: '/customerWashes',
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/washHistory/washHistory.template.html',
          controller: 'washHistCtrl as washHistCtrl'
        }
      }
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
