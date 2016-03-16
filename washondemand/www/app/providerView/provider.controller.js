angular.module('wod.providerCtrl', []).controller('providerCtrl', providerCtrl);

function providerCtrl($scope, providerFactory, locFactory) {
  var vm = this;
  vm.request = {data: []};
  vm.locData = locFactory.locData;

  vm.getRequests = function() {
    providerFactory.getRequest(locFactory.locData)
    .then(function(data) {
      console.log('inside controller getRequest');
      console.log(data.results)
      vm.requests = data.results;
    });
  };

  vm.acceptWash = function() {
    providerFactory.acceptRequest(vm.request);
  };
};
