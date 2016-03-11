angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

function custSICtrl(authFactory) {
  var vm = this;
  vm.customer = {
    email: '',
    password: ''
  };

  vm.signin = function() {
    console.log(vm.customer);
    //call factory
    authFactory.clearForm(vm.customer);
  };
}
