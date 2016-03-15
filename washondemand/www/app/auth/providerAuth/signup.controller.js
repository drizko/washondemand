angular.module('wod.provSU', []).controller('provSUCtrl', provSUCtrl);

function provSUCtrl(authFactory, $window, $state) {
  var vm = this;
  vm.provider = {
    companyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    error: ''
  };

  vm.signup = function() {
    console.log(vm.provider);
    //call factory
    authFactory.handleAuth(vm.provider, 'provider', 'signup');
  };
}
