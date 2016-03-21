angular.module('wod.providerViewFactory', [])
.factory('providerViewFactory', providerViewFactory);

function providerViewFactory($http) {

  var LOCALURL = 'http://localhost:8000/';
  var AWSURL = 'http://washondemand.us-west-2.elasticbeanstalk.com/';

  function beginJob(request) {
    console.log("+++INSIDE JOBBEGAN FACTORY: ", request);
    return $http({
      method: POST,
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
    endJob: endJob
  }

};
