angular.module('wod.nav', []).controller('navCtrl', navCtrl);

function navCtrl($scope, $ionicHistory, $state, authFactory) {
  var vm = this;

  vm.providerLogout = function() {
    authFactory.signout();
    $state.go('home');
  };
  vm.customerLogout = function() {
    authFactory.signout();
    $state.go('customerSignin');
  };
};
