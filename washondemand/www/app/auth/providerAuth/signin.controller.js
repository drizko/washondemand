angular.module('wod.provSI', []).controller('provSICtrl', provSICtrl);

provSICtrl.$inject = ['authFactory', '$cordovaFile', 'locFactory', '$window', '$state'];

function provSICtrl(authFactory, $cordovaFile, locFactory, $window, $state) {
  var vm = this;
  vm.provider = {
    email: '',
    password: '',
    error: ''
  };

  if (ionic.Platform.isIOS()) {
    $cordovaFile.readAsText(cordova.file.dataDirectory, 'prov')
      .then( function(result) {
        if(result === 'true'){
          $state.go('providernav.provider');
        } else {
          $state.go('providerSignin');
        }
      });
  }

  vm.signin = function() {

    if (ionic.Platform.isIOS()) {
      $cordovaFile.writeFile(cordova.file.dataDirectory, 'prov', 'true', true)
        .then( function(result) {
          console.log("Wrote file");
        });
    };

    var emailCopy = vm.provider.email;
    authFactory.handleAuth(vm.provider, 'provider', 'signin');
    locFactory.getLoc('provider', emailCopy).then(locFactory.sendLocToServer);
  };
}
