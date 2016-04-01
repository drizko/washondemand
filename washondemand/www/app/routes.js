angular.module('wod.routes', [])

.config(routesConfigFunc)
.factory('AttachTokens', AttachTokens)
.run(wodRoutesRunFunc);

routesConfigFunc.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function routesConfigFunc($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('home', {
      url: '/',
			templateUrl: 'app/home/home.template.html',
			controller: 'homeCtrl as home',
			authenticate: false
		})
		.state('customernav', {
      url: '/nav1',
			templateUrl: 'app/nav/customernav.template.html',
			controller: 'navCtrl as navCtrl',
      authenticate: true,
      abstract: true,
      cache: false
		})
    .state('providernav', {
      url: '/nav2',
      templateUrl: 'app/nav/providernav.template.html',
      controller: 'navCtrl as navCtrl',
      authenticate: true,
      abstract: true,
      cache: false
    })
    .state('customernav.customer', {
      url: '/customerProfile',
      authenticate: true,
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/mainViews/customerView/customer.template.html',
          controller: 'customerCtrl as customerCtrl'
        }
      },
    })
    .state('providernav.provider', {
      url: '/providerProfile',
      authenticate: true,
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/mainViews/providerView/provider.template.html',
          controller: 'providerCtrl as providerCtrl'
        }
      }
    })
    .state('customernav.customerWashes', {
      url: '/customerWashes',
      authenticate: true,
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/washHistory/custHistory/custWashHistory.template.html',
          controller: 'custWashHistCtrl as custWashHistCtrl'
        }
      }
    })
    .state('customernav.customerRequestView', {
      url: '/request-info',
      params: {
        request: null
      },
      authenticate: true,
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/currentWashViews/customerRequestView/customerRequestView.template.html',
          controller: 'custReqInfoCtrl as custReqInfoCtrl'
        }
      }
    })
    .state('providernav.providerWashes', {
      url: '/providerWashes',
      authenticate: true,
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/washHistory/provHistory/provWashHistory.template.html',
          controller: 'provWashHistCtrl as provWashHistCtrl'
        }
      }
    })
    .state('providernav.providerWashView', {
      url: '/wash-info',
      params: {
        request: null
      },
      authenticate: true,
      cache: false,
      views: {
        'nav-view': {
          templateUrl: 'app/currentWashViews/providerWashView/providerWashView.template.html',
          controller: 'provWashInfoCtrl as provWashInfoCtrl'
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
}

AttachTokens.$inject = ['$window'];

function AttachTokens($window) {

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
}

wodRoutesRunFunc.$inject = ['$rootScope', '$state', 'authFactory', '$window', 'jwtDecoder'];

function wodRoutesRunFunc($rootScope, $state, authFactory, $window, jwtDecoder) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !authFactory.isAuth()) {
      // User isn’t authenticated
      $state.go('home');
      event.preventDefault();
    }
  });
}
