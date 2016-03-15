angular.module('wod.provSI', []).controller('provSICtrl', provSICtrl);

function provSICtrl(authFactory, $window, $state) {
  var vm = this;
  vm.provider = {
    email: '',
    password: '',
    error: ''
  };

  vm.signin = function() {
    console.log(vm.provider);
    //call factory
    authFactory.handleAuth(vm.provider, 'provider', 'signin');
  };
}
