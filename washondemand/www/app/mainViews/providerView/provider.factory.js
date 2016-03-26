angular.module('wod.providerFactory', [])
.factory('providerFactory', providerFactory);

function providerFactory($http, $window, $location) {

  function getRequest(providerLoc) {
    console.log('From provider!!!!!!!!!!!!!');
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/get-requests',
      data: providerLoc
    })
    .then(function(results) {
      console.log(results.data.results);
      return results.data.results;
    });
  };

  function acceptRequest(request) {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/accept-request',
      data: request
    });
  };

  return {
    getRequest: getRequest,
    acceptRequest: acceptRequest
  };
};
