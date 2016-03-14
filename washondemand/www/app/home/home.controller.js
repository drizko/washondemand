angular.module('wod.home', []).controller('homeCtrl', homeCtrl);

function homeCtrl(authFactory) {
  var vm = this;

  vm.logoutTest = function() {
    console.log('before logout', localStorage);
    authFactory.signout();
    console.log('after logout', localStorage);
  };
}
