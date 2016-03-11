angular.module('wod.custSU', []).controller('custSUCtrl', custSUCtrl);

function custSUCtrl(authFactory) {
  var vm = this;
  vm.customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  vm.signup = function() {
    console.log(vm.customer);
    //call factory
    authFactory.clearForm(vm.customer);
  };
}
