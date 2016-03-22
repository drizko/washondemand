angular.module('wod.provWashInfoCtrl', []).controller('provWashInfoCtrl', provWashInfoCtrl);

function provWashInfoCtrl($stateParams, providerFactory, providerViewFactory) {
  var vm = this;
  vm.request
  ;
  console.log('inside wash info ctrl')
  providerViewFactory.getAccepted(locFactory.locData)
  .then(function(result) {
    vm.request = result;
    console.log(result);
  })

};
