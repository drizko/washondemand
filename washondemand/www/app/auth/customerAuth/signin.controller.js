angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

custSICtrl.$injesct = ['authFactory', '$scope', '$cordovaFile', '$cordovaDevice', 'locFactory', '$window', '$state'];

function custSICtrl(authFactory, $scope, $cordovaFile, $cordovaDevice, locFactory, $window, $state) {
  var vm = this;
  vm.customer = {
    email: '',
    password: '',
    error: ''
  };

  if (ionic.Platform.isIOS()) {
    $cordovaFile.readAsText(cordova.file.dataDirectory, 'cust')
      .then( function(result) {
        if(result === 'true'){
          $state.go('customernav.customer');
        } else {
          $state.go('customerSignin');
        }
      });
  }

  vm.signin = function() {
    if (ionic.Platform.isIOS()) {
      $cordovaFile.writeFile(cordova.file.dataDirectory, 'cust', 'true', true)
        .then( function(result) {
          console.log("Wrote file");
        });
    };

    var emailCopy = vm.customer.email;
    authFactory.handleAuth(vm.customer, 'customer', 'signin');
    locFactory.getLoc('customer', emailCopy).then(locFactory.sendLocToServer);
  };
}
