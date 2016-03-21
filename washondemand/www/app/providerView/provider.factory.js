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

  function jobBegan(request) {
    console.log("+++INSIDE JOBBEGAN FACTORY: ", request);
    return $http({
      method: POST,
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/job-started',
      url: 'http://localhost:8000/api/request/job-started',
      data: request
    })
  };

  function jobFinished(request) {
    console.log("+++INSIDE JOBFINISHED FACTORY: ", request);
    return $http({
      method: 'POST',
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/job-done',
      url: 'http://localhost:8000/api/request/job-done',
      data: request
    });
  };

  return {
    getRequest: getRequest,
    acceptRequest: acceptRequest,
    jobFinished:jobFinished
  };
}
