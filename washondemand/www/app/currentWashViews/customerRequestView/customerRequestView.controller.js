angular.module('wod.custReqInfoCtrl', []).controller('custReqInfoCtrl', custReqInfoCtrl);

function custReqInfoCtrl($stateParams, $ionicHistory, $scope, $ionicPopup, customerViewFactory, socket, $state) {
  var vm = this;
  $scope.feedback = {
    provider_rating: 0,
    provider_feedback: ''
  }

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  customerViewFactory.getRequest()
    .then(function(request){
      console.log(request);
      vm.currentRequest = request[0];
      if(vm.currentRequest.provider) {
        vm.currentRequest.providerInfo = {
          company_name: vm.currentRequest.provider,
          phone_number: vm.currentRequest.provider_phone
        }
      }
    });

  socket.on('refreshList', function(requestInfo){
    console.log("INSIDE REFRESH SOCKET REQINFO: ", requestInfo);
    if(vm.currentRequest._id === requestInfo._id){
      vm.currentRequest.job_accepted = vm.currentRequest.job_accepted || "Accepted";
      vm.currentRequest.providerInfo = requestInfo.provider;
    }
  });


  socket.on('getRating', function(request){
    console.log("request in getRating", request, vm.currentRequest);
    if(request._id === vm.currentRequest._id){
      $ionicPopup.show({
        title: 'Rate Your Wash!',
        template: '<textarea ng-model=feedback.provider_feedback class="feedback-text" maxlength="100" style="font-family:sans-serif;font-size:1.2em;"></textarea>',
        scope: $scope,
        buttons: [
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 1;
                customerViewFactory.sendFeedback($scope.feedback);
                $state.go('customernav.customer');
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 2;
                customerViewFactory.sendFeedback($scope.feedback);
                $state.go('customernav.customer');
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 3;
                customerViewFactory.sendFeedback($scope.feedback);
                $state.go('customernav.customer');
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 4;
                customerViewFactory.sendFeedback($scope.feedback);
                $state.go('customernav.customer');
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 5;
                customerViewFactory.sendFeedback($scope.feedback);
                $state.go('customernav.customer');
              }
            }
          }
        ]
      });
    }
  });

  vm.cancelRequest = function() {
    console.log(vm.currentRequest)
    socket.emit('canceled', vm.currentRequest);
    customerViewFactory.cancelRequest();
    $state.go('customernav.customer');
  }
};
