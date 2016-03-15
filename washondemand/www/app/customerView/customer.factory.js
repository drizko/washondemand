angular.module('wod.customerFactory', [])
.factory('customerFactory', customerFactory);

function customerFactory($http, $window, $location) {

  function sendRequest(details) {
    console.log("From customerFactory!!!!!!!!!!!!!");
    return $http({
      method: 'POST',
      url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/create-request',
      data: details
    })
    .then(function(results) {
      return results.data;
    });
  }

  return {
    sendRequest: sendRequest
  };
}
