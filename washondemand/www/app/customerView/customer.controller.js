angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, NgMap, customerFactory, $state, $location, $rootScope) {
  var vm = this;
  // $rootScope.$state = $state;
  // $rootScope.$location = $location;
  vm.request = {
    vehicleType: 'SUV',
    washType: 'Basic'
  };

  vm.sendRequest = function() {
    customerFactory.sendRequest(vm.request);
  };
  vm.selectVehicle = function(vehicle) {
    vm.request.vehicleType = vehicle;
  };
  vm.selectWash = function(wash) {
    vm.request.washType = wash;
    console.log(vm.request.washType);
    if (wash === 'basic') {
      vm.washInfo = customerFactory.data.basic;
    }
    if (wash === 'deluxe') {
      vm.washInfo = customerFactory.data.deluxe;
    }
    if (wash === 'premium') {
      vm.washInfo = customerFactory.data.premium;
    }
    console.log(vm.washInfo);
    // $state.go('customernav.customer.' + wash);
  };
}
