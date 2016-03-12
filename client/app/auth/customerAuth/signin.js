angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

function custSICtrl(authFactory, $window, $location) {
  var vm = this;
  vm.customer = {
    email: '',
    password: ''
  };

  vm.signin = function() {
    console.log(vm.customer);
    //call factory
    authFactory.custSignin(vm.customer)
    .then(function(token) {
      console.log(token);
      $window.localStorage.setItem('com.wod', token);
      $location.path('/customerProfile');
    })
    .catch(function(error) {
      console.error(error);
    });
    authFactory.clearForm(vm.customer);
  };
}
