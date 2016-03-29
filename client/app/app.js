angular.module('WashOnDemand', [
	'ui.router',
	'wod.home',
	'wod.nav'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('nav.home', {
			url: '/',
      templateUrl: 'app/home/home.html',
			controller: 'homeCtrl',
  		authenticate: false
		})
		.state('nav', {
			url:'/nav',
			templateUrl: 'app/nav/nav.html',
			controller: 'navCtrl',
			authenticate: false,
			abstract: true
		});

  $urlRouterProvider.otherwise('/');
});
