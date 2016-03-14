angular.module('wod.provSU', []).controller('provSUCtrl', provSUCtrl);

function provSUCtrl(authFactory, $window, $state) {
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
      authFactory.clearForm(vm.provider);
      $window.localStorage.setItem('com.wod', token);
      $state.go('providernav.providerView');
    })
    .catch(function(error) {
      console.error(error);
    });
  };
}
