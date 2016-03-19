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

  var getProviders = function() {

    customerFactory.getProviders()
    .then(function(data) {
      vm.washers = data.results;
    });
  };

  vm.sendRequest = function() {
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

  vm.showRequestButton = function() {
    return vm.request.vehicleType && vm.request.washType;
  };

  var init = function() {
    getProviders();
  };
  init();
}
