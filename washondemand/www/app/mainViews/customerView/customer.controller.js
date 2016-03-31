angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

customerCtrl.$inject = ['requests', '$ionicLoading', 'mainViewFactory'];

function customerCtrl(requests, $ionicLoading, mainViewFactory) {

  var vm = this;
  vm.request = mainViewFactory.request;
  vm.btnMsg = 'Select a vehicle and wash type';
  vm.locData = mainViewFactory.locData;

  $ionicLoading.show({
    template: '<ion-spinner class="spinner-energized" icon="ripple"></ion-spinner>'
  });

  mainViewFactory.getProviders()
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
      mainViewFactory.sendRequest(vm.request);
    });
  };

  vm.selectVehicle = function(vehicle) {
    vm.request.vehicleType = mainViewFactory.vehicleOptions[vehicle];
  };

  vm.selectWash = function(wash) {
    vm.request.washType = wash;
    if (wash !== 'Custom') {
      mainViewFactory.restoreOptions();
      var options = mainViewFactory.washTypeOptions[wash].options;
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
    if (vm.request.washType !== 'Custom') {
      vm.selectWash('Custom');
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
