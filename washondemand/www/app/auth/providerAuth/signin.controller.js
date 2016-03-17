angular.module('wod.provSI', []).controller('provSICtrl', provSICtrl);

function provSICtrl(authFactory, locFactory, $window, $state) {
  var vm = this;
  vm.provider = {
    email: '',
    password: '',
    error: ''
  };

  vm.signin = function() {
    //call factory
    var emailCopy = vm.provider.email;
    authFactory.handleAuth(vm.provider, 'provider', 'signin');
    locFactory.getLoc('provider', emailCopy).then(locFactory.sendLocToServer);
  };
}
