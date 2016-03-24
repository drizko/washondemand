angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, customerViewFactory, $ionicHistory, NgMap, $ionicPopup, customerFactory, $state, locFactory, $window, jwtDecoder) {

  var vm = this;

  vm.request = {
    vehicleType: {name: 'Please Pick a Vehicle Type', price: 0},
    washType: '',
    price: 0,
    washInfo: customerFactory.washOptions
  };

  vm.btnMsg = 'Select a vehicle and wash type';

  vm.locData = locFactory.locData;

  vm.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Request Pending',
      template: 'You already have a request pending\nWould you like to go to that page?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $state.go("customernav.customerRequestView")
      } else {
        console.log("fine...");
      }
    });
  };

  var getProviders = function() {
    customerFactory.getProviders()
    .then(function(data) {
      vm.washers = data.results;
    });
  };

  vm.sendRequest = function() {
    customerViewFactory.getRequest()
      .then(function(item){
        if(item[0] !== undefined){
          console.log(item);
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          vm.showConfirm();
        } else {
          customerFactory.sendRequest(vm.request)
          .then(function(){
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('customernav.customerRequestView');
          });
        }
      })
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
