angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

custSICtrl.$inject = ['authFactory', '$scope', '$cordovaFile', '$cordovaDevice', 'locFactory', '$window', '$state'];

function custSICtrl(authFactory, $scope, $cordovaFile, $cordovaDevice, locFactory, $window, $state) {
  var vm = this;
  vm.customer = {
    email: '',
    password: '',
    error: ''
  };

  vm.signin = function() {

    var emailCopy = vm.customer.email;
    authFactory.handleAuth(vm.customer, 'customer', 'signin');
    locFactory.getLoc('customer', emailCopy).then(locFactory.sendLocToServer);
  };
}
