angular.module('wod.providerCtrl', []).controller('providerCtrl', providerCtrl);

function providerCtrl($scope, providerFactory) {
  var vm = this;
  vm.request = {data: []};

  providerFactory.getRequest(vm.userLoc)
  .then(function(data) {
    vm.availableProviders = data;
  });

  vm.acceptWash = function() {
    providerFactory.acceptRequest(vm.request);
  };
};
