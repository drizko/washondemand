angular.module('wod.provSU', []).controller('provSUCtrl', provSUCtrl);

function provSUCtrl(authFactory, $window, $location) {
  var vm = this;
  vm.provider = {
    companyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  vm.signup = function() {
    console.log(vm.provider);
    //call factory
    authFactory.provSignup(vm.provider)
    .then(function(token) {
      $window.localStorage.setItem('com.wod', token);
      $location.path('/providerProfile');
    })
    .catch(function(error) {
      console.error(error);
    });
    authFactory.clearForm(vm.provider);
  };
}
