angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, NgMap, customerFactory, $state, locFactory, $window, jwtDecoder) {

  var vm = this;

  vm.request = {
    vehicleType: {name: 'Please Pick a Vehicle Type', price: 0},
    washType: '',
    price: 0,
    washInfo: customerFactory.washOptions
  };

  vm.btnMsg = 'Select a vehicle and wash type';

  vm.locData = locFactory.locData;

  var getProviders = function() {
    customerFactory.getProviders()
    .then(function(data) {
      vm.washers = data.results;
    });
  };

  vm.sendRequest = function() {
    customerFactory.sendRequest(vm.request)
      .then(function(){
        $state.go('customernav.customerRequestView');
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
    if (vm.request.vehicleType.price > 0 && vm.request.washType) {
      if (vm.getPrice() < 25) {
        vm.btnMsg = 'Minimum Wash price is 25$';
        return false;
      }
      return true;
    }
  };

  vm.showInfo = function() {
    return vm.request.vehicleType.price > 0 && vm.request.washType;
  };

  var init = function() {
    var token = $window.localStorage['com.wod'];
    var user = jwtDecoder.decoder(token);
    getProviders();
    locFactory.getLoc('customer', user.email).then(locFactory.sendLocToServer);
  };
  init();
}
