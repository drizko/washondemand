angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

custSICtrl.$inject = ['authFactory', '$scope', '$cordovaFile', '$cordovaDevice', 'locFactory', '$window', '$state'];

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
          $cordovaFile.readAsText(cordova.file.dataDirectory, 'com.wod')
            .then(function(result){
              $window.localStorage['com.wod'] = result;
              console.log("It worked!: ", result);
              $state.go('customernav.customer');
            })
        } else {
          $state.go('customerSignin');
        }
      });
  }

  vm.signin = function() {

    var emailCopy = vm.customer.email;
    authFactory.handleAuth(vm.customer, 'customer', 'signin');
    locFactory.getLoc('customer', emailCopy).then(locFactory.sendLocToServer);
  };
}
