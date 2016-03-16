angular.module('wod.custSU', []).controller('custSUCtrl', custSUCtrl);

function custSUCtrl(authFactory, locFactory, $window, $state) {
  var vm = this;
  vm.customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    error: ''
  };

  vm.signup = function() {
    console.log(vm.customer);
    //call factory
    var emailCopy = vm.customer.email;
    authFactory.handleAuth(vm.customer, 'customer', 'signup');
    locFactory.getLoc('customer', emailCopy).then(locFactory.sendLocToServer);
  };
}
