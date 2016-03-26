angular.module('wod.provSU', []).controller('provSUCtrl', provSUCtrl);

provSUCtrl.$inject = ['authFactory', 'locFactory'];

function provSUCtrl(authFactory, locFactory) {
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
