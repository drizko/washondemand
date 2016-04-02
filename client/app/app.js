angular.module('WashOnDemand', [
	'ui.router',
	'wod.home',
	'wod.nav'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('nav', {
			url: '/',
			templateUrl: 'app/nav/nav.template.html',
			controller: 'navCtrl as navCtrl',
			abstract: true
		})
		.state('nav.home', {
			url: '',
      templateUrl: 'app/home/home.template.html',
			controller: 'homeCtrl as homeCtrl'
		});

  $urlRouterProvider.otherwise('/');
});
