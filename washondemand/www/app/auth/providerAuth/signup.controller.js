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
    //call factory
    var emailCopy = vm.provider.email;
    authFactory.handleAuth(vm.provider, 'provider', 'signup');
    locFactory.getLoc('provider', emailCopy).then(locFactory.sendLocToServer);
  };
}
