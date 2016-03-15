angular.module('wod.provSI', []).controller('provSICtrl', provSICtrl);

function provSICtrl(authFactory, locFactory, $window, $state) {
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
    locFactory.getLoc('provider').then(locFactory.sendLocToServer);
  };
}
