angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

function custSICtrl(authFactory, $window, $state) {
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
  };
}
