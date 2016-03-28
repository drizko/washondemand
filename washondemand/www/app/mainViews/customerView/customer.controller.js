angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl(requests, $ionicHistory, $ionicLoading, customerFactory) {

  var vm = this;
  vm.request = customerFactory.request;
  vm.btnMsg = 'Select a vehicle and wash type';
  vm.locData = customerFactory.locData;

  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });

  customerFactory.getProviders()
  .then(function(data) {
    vm.washers = data.results;
    $ionicLoading.hide();
  });

  vm.showInfo = function() {
    return vm.request.vehicleType.price > 0 && vm.request.washType;
  };

  vm.sendRequest = function() {
    requests.getCustRequests()
    .then(function(data) {
      customerFactory.sendRequest(vm.request);
    });
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
    var price = vm.request.vehicleType.price || 0;
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
    if (vm.request.vehicleType.price > 0 && vm.request.washType) {
      if (vm.getPrice() < 25) {
        vm.btnMsg = 'Minimum Wash price is 25$';
        return false;
      }
      return true;
    }
  };

}
