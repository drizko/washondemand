angular.module('WashOnDemand', [
  'ionic',
	'ui.router',
  'wod.routes',
  'wod.authMaster',
	'wod.customerCtrl',
  'wod.customerFactory',
	'wod.provider',
	'wod.home',
	'wod.nav',
	'ngMap',
  'ion-sticky'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
