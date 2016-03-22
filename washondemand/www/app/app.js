angular.module('WashOnDemand', [
  'ionic',
	'ui.router',
  'wod.routes',
  'wod.services',
  'wod.authMaster',
	'wod.customerCtrl',
  'wod.custReqInfoCtrl',
  'wod.customerViewFactory',
  'wod.customerFactory',
	'wod.providerCtrl',
  'wod.providerFactory',
  'wod.washHistFactory',
  'wod.custWashHistCtrl',
  'wod.provWashHistCtrl',
  'wod.provWashInfoCtrl',
  'wod.providerViewFactory',
	'wod.home',
	'wod.nav',
	'ngMap',
  'ion-sticky',
  'angular-jwt'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
