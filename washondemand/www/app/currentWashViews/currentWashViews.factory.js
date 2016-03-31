angular.module('wod.currentWashFactory', [])
.factory('currentWashFactory', currentWashFactory);

currentWashFactory.$inject = ['$http', 'locFactory', '$state', '$ionicHistory', '$ionicPopup'];

function currentWashFactory($http, locFactory, $state, $ionicHistory, $ionicPopup) {

  var request;
  var locData = locFactory.locData;
  var currentRequest = {
    request: {}
  };
  var feedback = {};

  function cancelRequest() {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/cancel-request'
    })
    .then(function(data) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('customernav.customer');
    });
  };

  function getRequest() {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/get-current'
    })
    .then(function(results) {
      return results.data;
    });
  };

  function popUp(scope, currentRequest) {
    scope.feedback = {};
    $ionicPopup.show({
      title: 'Rate Your Wash!',
      template: '<textarea ng-model=feedback.provider_feedback class="feedback-text" maxlength="100" style="font-family:sans-serif;font-size:1.2em;"></textarea>',
      scope: scope,
      buttons: [
        {text: '<i class="icon ion-ios-star"></i>',
        onTap: function(e) {
            if (e) {
              scope.feedback._id = currentRequest._id;
              scope.feedback.provider_rating = 1;
              console.log(scope.feedback);
              sendFeedback(scope.feedback);
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('customernav.customer');
            }
          }
        },
        {text: '<i class="icon ion-ios-star"></i>',
        onTap: function(e) {
            if (e) {
              scope.feedback._id = currentRequest._id;
              scope.feedback.provider_rating = 2;
              sendFeedback(scope.feedback);
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('customernav.customer');
            }
          }
        },
        {text: '<i class="icon ion-ios-star"></i>',
        onTap: function(e) {
            if (e) {
              scope.feedback._id = currentRequest._id;
              scope.feedback.provider_rating = 3;
              sendFeedback(scope.feedback);
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('customernav.customer');
            }
          }
        },
        {text: '<i class="icon ion-ios-star"></i>',
        onTap: function(e) {
            if (e) {
              scope.feedback._id = currentRequest._id;
              scope.feedback.provider_rating = 4;
              sendFeedback(scope.feedback);
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('customernav.customer');
            }
          }
        },
        {text: '<i class="icon ion-ios-star"></i>',
        onTap: function(e) {
            if (e) {
              scope.feedback._id = currentRequest._id;
              scope.feedback.provider_rating = 5;
              sendFeedback(scope.feedback);
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('customernav.customer');
            }
          }
        }
      ]
    });
  }

  function sendFeedback(data) {
    return $http({
      method: 'POST',
      url: masterURL + '/api/history/add-rating-and-feedback',
      data: data
    })
    .then(function(results) {
      return results.data;
    });
  };

  function getAccepted() {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/get-accepted',
      data: locData
    }).then(function(result) {
      return result.data.results[0];
    });
  };

  function beginJob(request) {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/job-started',
      data: request
    });
  };

  function endJob(request) {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/job-done',
      data: request
    }).then(function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('providernav.provider', {accepted: false});
    });
  };

  return {
    cancelRequest: cancelRequest,
    getRequest: getRequest,
    popUp: popUp,
    beginJob: beginJob,
    endJob: endJob,
    getAccepted: getAccepted,
    locData: locData,
    feedback: feedback
  };
};
