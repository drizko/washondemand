angular.module('wod.nav', []).controller('navCtrl', navCtrl);

function navCtrl($scope, $ionicHistory, $state, authFactory) {
  var vm = this;

  vm.logout = function() {
    authFactory.signout();
    $state.go('home');
  };
};
