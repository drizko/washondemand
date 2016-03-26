angular.module('wod.custSI', []).controller('custSICtrl', custSICtrl);

custSICtrl.$injesct = ['authFactory', 'locFactory'];

function custSICtrl(authFactory, locFactory) {
  var vm = this;
  vm.customer = {
    email: '',
    password: '',
    error: ''
  };

  vm.signin = function() {
    //call factory
    var emailCopy = vm.customer.email;
    authFactory.handleAuth(vm.customer, 'customer', 'signin');
    locFactory.getLoc('customer', emailCopy).then(locFactory.sendLocToServer);
  };
}
