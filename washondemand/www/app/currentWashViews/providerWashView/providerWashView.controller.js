angular.module('wod.provWashInfoCtrl', []).controller('provWashInfoCtrl', provWashInfoCtrl);

function provWashInfoCtrl($stateParams, socket, providerFactory, providerViewFactory, locFactory, $state, $ionicHistory) {
  var vm = this;
  vm.jobStarted = false;
  vm.jobComplete = false;
  vm.deviceOS;


  $ionicPlatform.ready(function() {
    $cordovaDevice.getDevice().then(function(device) {
      if(device.platform === 'iOS') {
        vm.deviceOS = 'iOS';
      }
      if(device.platform === 'Android') {
        vm.deviceOS = 'Android';
      }
    }, function(error) {
      console.log(error);
    })
  });

  console.log('inside wash info ctrl');
  providerViewFactory.getAccepted(locFactory.locData)
  .then(function(result) {
    vm.request = result;
    console.log(result);
    vm.locData = locFactory.locData;
    console.log(vm.locData);
  });

  vm.startWash = function() {

    socket.emit('startWash', vm.request);
    providerViewFactory.beginJob(vm.request)
    .then(function() {
      vm.jobStarted = true;
    });
  };

  vm.endWash = function() {
    console.log('This is endWash');
    vm.jobStarted = false;
    vm.jobComplete = true;

    socket.emit('endWash', vm.request);
    providerViewFactory.endJob(vm.request);
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('providernav.provider', {accepted: false});
  };

  vm.formatTime = function(time) {
    var timestamp = moment(time, 'x').format('M/D/YY h:mm a');
    return timestamp;
  };

  vm.getDirection = function() {
    var reqLat = vm.request.user_location.lat;
    var reqLng = vm.request.user_location.lng;
    // saddr=Cupertino&

    if(vm.deviceOS === 'iOS') {
      $window.open('maps://?daddr=' + reqLat + ',' + reqLng + '&dirflg=d&t=h', '_system');
    };

    if(vm.deviceOS === 'Android') {
      $window.open('geo://?daddr=' + reqLat + ',' + reqLng + '&dirflg=d&t=h', '_system');
    };
    // window.location.href = url;
  };   
};
