angular.module('wod.provWashHistCtrl', []).controller('provWashHistCtrl', provWashHistCtrl);

function provWashHistCtrl(washHistFactory, locFactory, $stateParams) {
  var vm = this;

  washHistFactory.getProvHistory(locFactory.locData)
    // .then(function(request) {
    //   vm.current = request[0];
    //   console.log(vm.current);
    // });
};
