angular.module('wod.nav', []).controller('navCtrl', navCtrl);

function navCtrl($scope, $ionicHistory, $state, authFactory, locFactory) {
  var vm = this;

  vm.availability = false;;

  vm.updateAvailability = function() {
    console.log('inside navCtrl', vm.availability);
    locFactory.updateAvailability(vm.availability);
  }

  vm.providerLogout = function() {
    authFactory.signout();
    $state.go('home');
  };
  vm.customerLogout = function() {
    authFactory.signout();
    $state.go('customerSignin');
  };

  vm.updateAvailability();
};
