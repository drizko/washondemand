angular.module('wod.customerViewFactory', [])
.factory('customerViewFactory', customerViewFactory);

function customerViewFactory($http) {

  var currentRequest = {
    request: {}
  }

  var LOCALURL = 'http://localhost:8000/';
  var AWSURL = 'http://washondemand.us-west-2.elasticbeanstalk.com/';

  function cancelRequest() {
    return $http({
      method: 'POST',
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/cancel-request',
      url: 'http://localhost:8000/api/request/cancel-request'
    })
  };

  function getRequest() {
    return $http({
      method: 'POST',
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/cancel-request',
      url: 'http://localhost:8000/api/request/get-current'
    })
    .then(function(results){
      return results.data
    })
  };

  return {
    cancelRequest: cancelRequest,
    getRequest: getRequest,
    currentRequest: currentRequest
  }

};
