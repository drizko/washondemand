angular.module('wod.home', []).controller('homeCtrl', homeCtrl);

function homeCtrl(authFactory) {
  var vm = this;

  vm.logoutTest = function() {
    authFactory.signout();
  };
}
