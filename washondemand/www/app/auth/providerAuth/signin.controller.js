angular.module('wod.provSI', []).controller('provSICtrl', provSICtrl);

provSICtrl.$inject = ['authFactory', '$cordovaFile', 'locFactory', '$window', '$state'];

function provSICtrl(authFactory, $cordovaFile, locFactory, $window, $state) {
  var vm = this;
  vm.provider = {
    email: '',
    password: '',
    error: ''
  };

  // if (ionic.Platform.isIOS()) {
  //   $cordovaFile.readAsText(cordova.file.dataDirectory, 'prov')
  //     .then( function(result) {
  //       if(result === 'true'){
  //         $cordovaFile.readAsText(cordova.file.dataDirectory, 'com.wod')
  //           .then(function(result){
  //             $window.localStorage['com.wod'] = result;
  //             console.log("It worked!: ", result);
  //             $state.go('providernav.provider');
  //           })
  //       } else {
  //         $state.go('providerSignin');
  //       }
  //     });
  // }

  vm.signin = function() {

    var emailCopy = vm.provider.email;
    authFactory.handleAuth(vm.provider, 'provider', 'signin');
    locFactory.getLoc('provider', emailCopy).then(locFactory.sendLocToServer);
  };
}
