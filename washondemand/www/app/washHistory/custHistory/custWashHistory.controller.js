angular.module('wod.custWashHistCtrl', []).controller('custWashHistCtrl', custWashHistCtrl);

custWashHistCtrl.$inject = ['washHistFactory'];

function custWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.numEntries = 10;
  vm.history;

  vm.displayMoreEntries = function() {
    if (vm.numEntries < vm.history.length) {
      vm.numEntries += 10;
    }
  };

  washHistFactory.getHistory()
  .then(function(history) {
    vm.history = history;
  });

};
