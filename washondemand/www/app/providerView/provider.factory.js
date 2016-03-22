angular.module('wod.providerFactory', [])
.factory('providerFactory', providerFactory);

function providerFactory($http, $window, $location) {

  function getRequest(providerLoc) {
    console.log('From provider!!!!!!!!!!!!!');
    return $http({
      method: 'POST',
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/provider/get-requests',
      url: 'http://localhost:8000/api/request/get-requests',
      data: providerLoc
    })
    .then(function(results) {
      console.log(results.data);
      return results.data;
    });
  };

  function acceptRequest(request) {
    return $http({
      method: 'POST',
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/accept-requests',
      url: 'http://localhost:8000/api/request/accept-request',
      data: request
    });
  };

  return {
    getRequest: getRequest,
<<<<<<< 3cb7f82fa3783c56f4cd53c76b2ce9d26ddda374
    acceptRequest: acceptRequest,
    jobBegan: jobBegan,
    jobFinished:jobFinished
=======
    acceptRequest: acceptRequest
>>>>>>> [refactor]pulls current wash info from db
  };
}
