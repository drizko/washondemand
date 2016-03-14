angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, NgMap, customerFactory) {
  var vm = this;

  vm.request = {
    vehicleType: 'SUV',
    washType: 'Basic'
  };

  $scope.sendRequest = function(){
    customerFactory.sendRequest(vm.request)
  }
}
