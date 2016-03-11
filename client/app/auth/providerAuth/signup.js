angular.module('wod.provSU', []).controller('provSUCtrl', provSUCtrl);

function provSUCtrl(authFactory) {
  var vm = this;
  vm.provider = {
    companyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  vm.signup = function() {
    console.log(vm.provider);
    //call factory
    authFactory.clearForm(vm.provider);
  };
}
