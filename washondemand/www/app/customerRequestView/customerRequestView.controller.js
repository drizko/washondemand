angular.module('wod.custReqInfoCtrl', []).controller('custReqInfoCtrl', custReqInfoCtrl);

function custReqInfoCtrl($stateParams, customerViewFactory, socket, $state) {
  var vm = this;

  customerViewFactory.getRequest()
    .then(function(request){
      vm.currentRequest = request[0];
    });

  socket.on('refreshList', function(requestInfo){
    console.log(vm.currentRequest);
    vm.currentRequest.job_accepted = vm.currentRequest.job_accepted || "Accepted";
    vm.providerInfo = requestInfo.provider;

    console.log("+++PROVIDER INFO: ", vm.providerInfo);
    console.log(vm.currentRequest);
  });

  vm.cancelRequest = function() {
    socket.emit('canceled', vm.currentRequest);
    customerViewFactory.cancelRequest();
    $state.go('customernav.customer');
  }

};
