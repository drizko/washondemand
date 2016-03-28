angular.module('wod.custReqInfoCtrl', []).controller('custReqInfoCtrl', custReqInfoCtrl);

custReqInfoCtrl.$inject = ['$ionicHistory', '$ionicLoading', 'currentWashFactory', 'socket'];

function custReqInfoCtrl($ionicHistory, $ionicLoading, currentWashFactory, socket) {
  var vm = this;

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });

  currentWashFactory.getRequest()
    .then(function(request) {
      vm.currentRequest = request;
      vm.jobStatus = 'Not Accepted';
      $ionicLoading.hide();
    });

  socket.on('refreshList', function(requestInfo) {
    if (vm.currentRequest._id === requestInfo._id) {
      vm.jobStatus = 'Job Accepted';
      vm.currentRequest.job_accepted = requestInfo.job_accepted;
      vm.currentRequest.providerInfo = requestInfo.provider;
    }
  });

  socket.on('getRating', function(request){
    if (vm.currentRequest._id === request._id) {
      currentWashFactory.popUp(vm.currentRequest);
    }
  });

  vm.cancelRequest = function() {
    socket.emit('canceled', vm.currentRequest);
    currentWashFactory.cancelRequest();
  };
};
