angular.module('wod.provWashInfoCtrl', []).controller('provWashInfoCtrl', provWashInfoCtrl);

function provWashInfoCtrl($stateParams, providerFactory, providerViewFactory, locFactory, $state, $ionicHistory) {
  var vm = this;
  vm.request;
  vm.jobStarted = false;
  vm.jobComplete = false;
  vm.availability = locFactory.availability;

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
    console.log("This is endWash");
    vm.jobStarted = false;
    vm.jobComplete = true;
    providerViewFactory.endJob(vm.request);
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('providernav.provider', {accepted: false});
  };

};
