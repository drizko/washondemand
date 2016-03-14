angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

function custSICtrl(authFactory, $window, $state) {
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
      authFactory.clearForm(vm.customer);
      $window.localStorage.setItem('com.wod', token);
      $state.go('customernav.customer');
    })
    .catch(function(error) {
      console.error(error);
    });
  };
}
