angular.module('wod.custSU', []).controller('custSUCtrl', custSUCtrl);

function custSUCtrl(authFactory, $window, $location) {
  var vm = this;
  vm.customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  vm.signup = function() {
    console.log(vm.customer);
    //call factory
    authFactory.custSignup(vm.customer)
    .then(function(token) {
      authFactory.clearForm(vm.customer);
      $window.localStorage.setItem('com.wod', token);
      $location.path('/customerProfile');
    })
    .catch(function(error) {
      console.error(error);
    });
  };
}
