angular.module('wod.home', []).controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['authFactory'];

function homeCtrl(authFactory) {
  var vm = this;

  vm.logoutTest = function() {
    authFactory.signout();
  };
}
