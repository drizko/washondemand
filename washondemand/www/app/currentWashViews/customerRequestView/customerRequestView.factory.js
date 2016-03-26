angular.module('wod.customerViewFactory', [])
.factory('customerViewFactory', customerViewFactory);

function customerViewFactory($http) {

  var currentRequest = {
    request: {}
  }

  function cancelRequest() {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/cancel-request'
    })
  };

  function getRequest() {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/get-current'
    })
    .then(function(results){
      return results.data
    })
  };

  function sendFeedback(data) {
    return $http({
      method: 'POST',
      url: masterURL + '/api/history/add-rating-and-feedback',
      data: data
    })
    .then(function(results){
      return results.data
    })
  };

  return {
    cancelRequest: cancelRequest,
    getRequest: getRequest,
    currentRequest: currentRequest,
    sendFeedback: sendFeedback
  }

};
