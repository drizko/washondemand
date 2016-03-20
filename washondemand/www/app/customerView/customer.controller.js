angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, NgMap, customerFactory, locFactory) {

  var vm = this;

  vm.request = {
    vehicleType: {name: 'Please Pick', price: 0},
    washType: '',
    price: 0,
    washInfo: customerFactory.washOptions
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
    vm.request.vehicleType = customerFactory.vehicleOptions[vehicle];
  };

  vm.selectWash = function(wash) {
    vm.request.washType = wash;
    if (wash !== 'custom') {
      customerFactory.restoreOptions();
      var options = customerFactory.washTypeOptions[wash].options;
      for (var i = 0; i < options.length; i++) {
        vm.request.washInfo[options[i]].active = true;
      }
    }
  };

  vm.getPrice = function() {
    var price = 0;
    price += vm.request.vehicleType.price || 0;
    for (var k in vm.request.washInfo) {
      if (vm.request.washInfo[k].active) {
        price += vm.request.washInfo[k].price;
      }
    }
    vm.request.price = price;
    return price;
  };

  vm.toggleOption = function(detail) {
    if (vm.request.washType !== 'custom') {
      vm.selectWash('custom');
    }
    detail.active = !detail.active;
  };

  vm.showRequestButton = function() {
    return vm.request.vehicleType.price > 0 && vm.request.washType;
  };

  vm.showInfo = function() {
    return vm.getPrice() > 0 || vm.request.washType === 'custom';
  };

  var init = function() {
    getProviders();
  };
  init();
}
