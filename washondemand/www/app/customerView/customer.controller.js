angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, NgMap, customerFactory, locFactory) {

  var vm = this;

  vm.request = {
    vehicleType: '',
    washType: '',
    washInfo: {}
  };

  vm.locData = locFactory.locData;

  customerFactory.getProviders(locFactory.locData)
    .then(function(data) {
      console.log('inside controller getRequest');
      console.log(data.results);
      vm.washers = data.results;
    });

  vm.sendRequest = function() {
    vm.request.price = vm.washInfo.price;
    customerFactory.sendRequest(vm.request);
  };
  vm.selectVehicle = function(vehicle) {
    vm.request.vehicleType = vehicle;
  };
  vm.selectWash = function(wash) {
    vm.request.washType = wash;
    if (wash === 'basic') {
      vm.washInfo = customerFactory.data.basic;
      vm.request.washInfo = vm.washInfo;
    }
    if (wash === 'deluxe') {
      vm.washInfo = customerFactory.data.deluxe;
      vm.request.washInfo = vm.washInfo;
    }
    if (wash === 'premium') {
      vm.washInfo = customerFactory.data.premium;
      vm.request.washInfo = vm.washInfo;
    }
  };

  var init = function() {
    vm.selectWash('basic');
    vm.selectVehicle('car');
  };
  init();
}
