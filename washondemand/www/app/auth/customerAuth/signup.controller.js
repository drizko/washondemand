angular.module('wod.custSU', []).controller('custSUCtrl', custSUCtrl);

custSUCtrl.$inject = ['authFactory', 'locFactory'];

function custSUCtrl(authFactory, locFactory) {
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
    //call factory
    var emailCopy = vm.customer.email;
    authFactory.handleAuth(vm.customer, 'customer', 'signup');
    locFactory.getLoc('customer', emailCopy).then(locFactory.sendLocToServer);
  };
}
