angular.module('wod.providerCtrl', []).controller('providerCtrl', providerCtrl);

function providerCtrl($scope, socket, providerFactory, locFactory) {
  var vm = this;
  vm.request = {data: []};
  vm.locData = locFactory.locData;

  socket.on('refreshList', function(data) {
    for(var i = 0; i < vm.requests.length; i++){
      if(vm.requests[i]._id === data._id){
        vm.requests[i].accepted = true;
      }
    }
  });

  vm.getRequests = function() {
    providerFactory.getRequest(locFactory.locData)
      .then(function(data) {
        data.results.forEach(function(item){
          item.accepted = false;
        })
        vm.requests = data.results;
      });
  };

  vm.acceptWash = function(request) {
    request.accepted = true;
    socket.emit('accepted', request);
    providerFactory.acceptRequest(request);
  };

  vm.jobStarted = function(request) {
    console.log("+++INSIDE JOBSTARTED CTRL: ", request)
  }

  vm.jobDone = function(request) {
    console.log("+++INSIDE JOBDONE CTRL: ", request);
    providerFactory.jobFinished(request);
  }
};
