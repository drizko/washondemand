angular.module('wod.providerViewFactory', [])
.factory('providerViewFactory', providerViewFactory);

function providerViewFactory($http, $window, jwtDecoder) {

  var request;
  var LOCALURL = 'http://localhost:8000/';
  var AWSURL = 'http://washondemand.us-west-2.elasticbeanstalk.com/';

  function getAccepted(data) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/request/get-accepted',
      data: data
    }).then(function(result) {
      return result.data.results[0];
    });
  }

  function getCurrentWash(data) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/request/get-current',
      data: data
    }).then(function(results) {
      console.log(results)
      return results.data.results;
    });
  };

  function beginJob(request) {
    console.log("+++INSIDE JOBBEGAN FACTORY: ", request);
    return $http({
      method: 'POST',
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/job-started',
      url: 'http://localhost:8000/api/request/job-started',
      data: request
    })
  };

  function endJob(request) {
    console.log("+++INSIDE JOBFINISHED FACTORY: ", request);
    return $http({
      method: 'POST',
      // url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/job-done',
      url: 'http://localhost:8000/api/request/job-done',
      data: request
    });
  };

  return {
    beginJob: beginJob,
    endJob: endJob,
    getAccepted: getAccepted
  }

};
