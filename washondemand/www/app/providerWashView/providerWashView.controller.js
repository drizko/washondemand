angular.module('wod.provWashInfoCtrl', []).controller('provWashInfoCtrl', provWashInfoCtrl);

function provWashInfoCtrl($stateParams, providerFactory, providerViewFactory) {
  var vm = this;
  vm.request;
  vm.jobStarted = false;

  console.log('inside wash info ctrl');
  providerViewFactory.getAccepted(locFactory.locData)
  .then(function(result) {
    vm.request = result;
    console.log(result);
  });

  vm.startWash = function() {
    vm.jobStarted = true;
    providerViewFactory.beginJob(vm.request);
  };

  vm.endWash = function() {
    vm.jobStarted = false;
    providerViewFactory.endJob(vm.request);
  };

};
