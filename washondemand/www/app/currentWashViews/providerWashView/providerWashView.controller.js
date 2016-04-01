angular.module('wod.provWashInfoCtrl', []).controller('provWashInfoCtrl', provWashInfoCtrl);

provWashInfoCtrl.$inject = ['socket', 'currentWashFactory', '$ionicHistory', '$ionicLoading'];

function provWashInfoCtrl(socket, currentWashFactory, $ionicHistory, $ionicLoading) {
  var vm = this;
  vm.jobStarted = false;
  vm.jobComplete = false;
  vm.locData = currentWashFactory.locData;

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $ionicLoading.show({
    template: '<ion-spinner class="spinner-energized" icon="ripple"></ion-spinner>'
  });

  ionic.Platform.ready(function() {
    vm.isIOS = ionic.Platform.isIOS();
    vm.isAndroid = ionic.Platform.isAndroid();
    vm.currentPlatform = ionic.Platform.platform();
  });

  currentWashFactory.getAccepted()
  .then(function(result) {
    vm.request = result;
    $ionicLoading.hide();
  });

  vm.startWash = function() {
    socket.emit('startWash', vm.request);
    currentWashFactory.beginJob(vm.request)
    .then(function() {
      vm.jobStarted = true;
    });
  };

  vm.endWash = function() {
    vm.jobStarted = false;
    vm.jobComplete = true;
    socket.emit('endWash', vm.request);
    currentWashFactory.endJob(vm.request);
  };

  vm.formatTime = function(time) {
    var timestamp = moment(time, 'x').format('M/D/YY h:mm a');
    return timestamp;
  };

  vm.getDirection = function() {
    var reqLat = vm.request.user_location.lat;
    var reqLng = vm.request.user_location.lng;
    var url;

    console.log('Inside getDirection');
    if (vm.isIOS) {
      url = 'maps://?daddr=' + reqLat + ',' + reqLng + '&dirflg=d&t=m';
    };

    if (vm.isAndroid) {
      url = 'geo://?q=' + reqLat + ',' + reqLng + '&mode=d';
    };

    window.location.href = url;
  };
};
