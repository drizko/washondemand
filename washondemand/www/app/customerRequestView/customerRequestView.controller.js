angular.module('wod.custReqInfoCtrl', []).controller('custReqInfoCtrl', custReqInfoCtrl);

function custReqInfoCtrl($stateParams, $scope, $ionicPopup, customerViewFactory, socket, $state) {
  var vm = this;
  vm.providerInfo;
  $scope.feedback = {
    provider_rating: 0,
    provider_feedback: ''
  }


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
    if(vm.currentRequest._id === requestInfo._id){
      console.log(vm.currentRequest);
      vm.currentRequest.job_accepted = vm.currentRequest.job_accepted || "Accepted";
      vm.providerInfo = requestInfo.provider;

      console.log("+++PROVIDER INFO: ", vm.providerInfo);
      console.log(vm.currentRequest);
    }
  });

//       console.log(vm.currentRequest);
//     vm.currentRequest.job_accepted = vm.currentRequest.job_accepted || "Accepted";
//     vm.providerInfo = requestInfo.provider;
//     vm.currentRequest.providerInfo = requestInfo.provider;
// >>>>>>> [feature] Keeps real time data persistent when customer changes view


  socket.on('getRating', function(request){
    console.log("request in getRating", request, vm.currentRequest);
    if(request._id === vm.currentRequest._id){
      var showPopup = $ionicPopup.show({
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
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 2;
                customerViewFactory.sendFeedback($scope.feedback);
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 3;
                customerViewFactory.sendFeedback($scope.feedback);
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 4;
                customerViewFactory.sendFeedback($scope.feedback);
              }
            }
          },
          {text: '<i class="icon ion-ios-star"></i>',
          onTap: function(e) {
              if (e) {
                $scope.feedback._id = vm.currentRequest._id;
                $scope.feedback.provider_rating = 5;
                customerViewFactory.sendFeedback($scope.feedback);
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
