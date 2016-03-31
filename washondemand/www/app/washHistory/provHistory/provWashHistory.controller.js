angular.module('wod.provWashHistCtrl', []).controller('provWashHistCtrl', provWashHistCtrl);

provWashHistCtrl.$inject = ['washHistFactory', '$ionicLoading'];

function provWashHistCtrl(washHistFactory, $ionicLoading) {
  var vm = this;

  vm.numEntries = 10;
  vm.history;
  vm.total;
  vm.sum;
  vm.ratingAvg;

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

      var stats = washHistFactory.calcStats(history);

      vm.total = history.length;
      vm.sum = stats.sum;
      vm.ratingAvg = stats.avg;
      vm.history = history;
      $ionicLoading.hide();
    });
  };

  init();

};
