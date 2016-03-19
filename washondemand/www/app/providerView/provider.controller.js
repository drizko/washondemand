angular.module('wod.providerCtrl', []).controller('providerCtrl', providerCtrl);

function providerCtrl($scope, socket, providerFactory, $window, locFactory, jwtDecoder, GeoAlert) {
  var vm = this;
  vm.request = {data: []};
  vm.locData = locFactory.locData;
  vm.requests = [];

  //Begin the service
  //hard coded 'target'
  function onConfirm(idx) {
    console.log('button '+idx+' pressed');
  }

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

  vm.moveMarkers = function(request) {
    var user = jwtDecoder.decoder($window.localStorage['com.wod']);
    request.user_location.lat += 0.01;
    request.user_location.lng += 0.01;
    console.log(request);

    console.log("moveMarkers", user);
    GeoAlert.begin(request.user_location.lat, request.user_location.lng, function() {
      console.log('TARGET');
      GeoAlert.end();
      navigator.notification.confirm(
        'You are near your customer!',
        onConfirm,
        'Target!',
        ['Cancel','View']
      );
    });
  }


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
