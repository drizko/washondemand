angular.module('wod.home', []).controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['authFactory', '$cordovaDevice', '$cordovaFile', '$state', '$window'];

function homeCtrl(authFactory, $cordovaDevice, $cordovaFile, $state, $window) {
  var vm = this;

  ionic.Platform.ready(function() {
    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
      $cordovaFile.checkFile(cordova.file.dataDirectory, 'cust')
        .then(function(result) {
          console.log('Inside somewhere', result);
          $cordovaFile.readAsText(cordova.file.dataDirectory, 'cust')
          .then(function(result) {
            if (result === 'true') {
              $cordovaFile.readAsText(cordova.file.dataDirectory, 'com.wod')
              .then(function(result) {
                console.log("token", result);
                $window.localStorage.setItem('com.wod', result);
                $state.go('customernav.customer');
              });
            } else {
              console.log('Not result from cust');
            }
          });
        }, function(error) {
          console.log('Error!!!!!!!!!!!!', error);
        });

      $cordovaFile.checkFile(cordova.file.dataDirectory, 'prov')
        .then(function(result) {
          console.log('Inside somewhere', result);
          $cordovaFile.readAsText(cordova.file.dataDirectory, 'prov')
          .then(function(result) {
            if (result === 'true') {
              $cordovaFile.readAsText(cordova.file.dataDirectory, 'com.wod')
              .then(function(result) {
                console.log("token", result);
                $window.localStorage.setItem('com.wod', result);
                $state.go('providernav.provider');
              });
            } else {
              console.log('Not result');
            }
          });
        }, function(error) {
          console.log('Error!!!!!!!!!!!!', error);
        });
    }
  });

  vm.logoutTest = function() {
    authFactory.signout();
  };
}
