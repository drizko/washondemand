angular.module('wod.providerCtrl', []).controller('providerCtrl', providerCtrl);

function providerCtrl(socket, providerFactory, $ionicHistory, $state, $ionicLoading) {
  var vm = this;
  vm.requests = [];
  vm.locData = providerFactory.locData;

  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });

  function onConfirm(idx) {
    console.log('button ' + idx + ' pressed');
  }

  socket.on('removeList', function(data) {
    for (var i = 0; i < vm.requests.length; i++) {
      if (vm.requests[i]._id === data._id) {
        vm.requests[i].display = true;
      }
    }
  });

  socket.on('refreshList', function(data) {
    for (var i = 0; i < vm.requests.length; i++) {
      if (vm.requests[i]._id === data._id) {
        vm.requests[i].display = true;
      }
    }
  });

  socket.on('addList', function(data) {
    vm.requests.push(data);
  });

  providerFactory.getRequest()
    .then(function(data) {
      data.forEach(function(item) {
        item.accepted = false;
      });
      vm.requests = data;
      $ionicLoading.hide();
    });

  vm.acceptWash = function(request) {
    vm.accepted = true;
    providerFactory.acceptRequest(request)
      .then(function() {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('providernav.providerWashView', {request: request});
      });
  };

};
