angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

function custSICtrl(authFactory, locFactory, $window, $state) {
  var vm = this;
  vm.customer = {
    email: '',
    password: '',
    error: ''
  };

  vm.signin = function() {
    console.log(vm.customer);
    //call factory
    authFactory.handleAuth(vm.customer, 'customer', 'signin');
    locFactory.getLoc('customer').then(locFactory.sendLocToServer);
  };
}
