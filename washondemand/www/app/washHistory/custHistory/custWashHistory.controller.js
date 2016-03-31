angular.module('wod.custWashHistCtrl', []).controller('custWashHistCtrl', custWashHistCtrl);

custWashHistCtrl.$inject = ['washHistFactory', '$ionicLoading'];

function custWashHistCtrl(washHistFactory, $ionicLoading) {
  var vm = this;

  vm.numEntries = 10;
  vm.history;

  $ionicLoading.show({
    template: '<ion-spinner class="spinner-energized" icon="ripple"></ion-spinner>'
  });

  vm.displayMoreEntries = function() {
    if (vm.numEntries < vm.history.length) {
      vm.numEntries += 10;
    }
  };

  var init = function() {
    washHistFactory.getHistory()
    .then(function(history) {
      vm.history = history;
      $ionicLoading.hide();
    });
  };

  init();

};
