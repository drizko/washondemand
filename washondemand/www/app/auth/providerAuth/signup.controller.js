angular.module('wod.provSU', []).controller('provSUCtrl', provSUCtrl);

function provSUCtrl(authFactory, locFactory, $window, $state) {
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
    locFactory.getLoc('provider').then(locFactory.sendLocToServer);
  };
}
