angular.module('wod.provSI', []).controller('provSICtrl', provSICtrl);

function provSICtrl(authFactory) {
  var vm = this;
  vm.provider = {
    email: '',
    password: ''
  };

  vm.signin = function() {
    console.log(vm.provider);
    //call factory
    authFactory.clearForm(vm.provider);
  };
}
