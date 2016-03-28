angular.module('wod.provSI', []).controller('provSICtrl', provSICtrl);

provSICtrl.$inject = ['authFactory', '$cordovaFile', 'locFactory', '$window', '$state'];

function provSICtrl(authFactory, $cordovaFile, locFactory, $window, $state) {
  var vm = this;
  vm.provider = {
    email: '',
    password: '',
    error: ''
  };

  vm.signin = function() {

    var emailCopy = vm.provider.email;
    authFactory.handleAuth(vm.provider, 'provider', 'signin');
    locFactory.getLoc('provider', emailCopy).then(locFactory.sendLocToServer);
  };
}
