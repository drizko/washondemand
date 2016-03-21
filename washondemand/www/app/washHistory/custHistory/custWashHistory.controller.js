angular.module('wod.custWashHistCtrl', []).controller('custWashHistCtrl', custWashHistCtrl);

function custWashHistCtrl(washHistFactory, locFactory) {
  var vm = this;

  washHistFactory.getCurrentWash(locFactory.locData)
    .then(function(request) {
      vm.current = request[0];
      console.log(vm.current);
    });
};
