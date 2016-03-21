angular.module('wod.provWashInfoCtrl', []).controller('provWashInfoCtrl', provWashInfoCtrl);

function provWashInfoCtrl($stateParams, providerViewFactory) {
  var vm = this;
  vm.request = $stateParams.request;

  vm.startJob = function() {

  }
};
