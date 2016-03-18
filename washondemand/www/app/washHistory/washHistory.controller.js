angular.module('wod.washHistCtrl', []).controller('washHistCtrl', washHistCtrl);

function washHistCtrl(washHistFactory, locFactory) {
  var vm = this;

  washHistFactory.getCurrentWash(locFactory.locData)
    .then(function(request) {
      vm.current = request[0];
      console.log(vm.current);
    });
};
