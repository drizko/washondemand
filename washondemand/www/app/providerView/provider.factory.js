angular.module('wod.providerFactory', [])
.factory('providerFactory', providerFactory);

function providerFactory($http, $window, $location) {

  function getRequest(providerLoc) {
    console.log('From provider!!!!!!!!!!!!!');
    return $http({
      method: 'POST',
      url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/get-requests',
      data: providerLoc
    })
    .then(function() {
      return results.data;
    });
  };

  function acceptRequest(request) {
    console.log(request);
    return $http({
      method: 'POST',
      url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/accept-requests',
      data: request
    });
  };

  return {
    getRequest: getRequest,
    acceptRequest: acceptRequest
  };
}
