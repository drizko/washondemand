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
      authFactory.clearForm(vm.customer);
      $window.localStorage['com.wod'] = token;
      $location.path('/customerProfile');
    })
    .catch(function(error) {
      console.error(error);
    });
  };
}
