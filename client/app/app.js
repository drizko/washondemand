angular.module('WashOnDemand', [
	'ui.router',
	'wod.home',
	'wod.nav',
	'wod.team'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
		.state('nav', {
			url:'/',
			templateUrl: 'app/nav/nav.template.html',
			controller: 'navCtrl',
			abstract: true
		})
		.state('nav.home', {
			url: '',
      templateUrl: 'app/home/home.template.html',
			controller: 'homeCtrl'
		})
		.state('nav.team', {
			url: 'team',
      templateUrl: 'app/team/team.template.html',
			controller: 'teamCtrl'
		});

  $urlRouterProvider.otherwise('/');
});
