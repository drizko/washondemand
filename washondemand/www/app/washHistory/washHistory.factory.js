angular.module('wod.washHistFactory', [])
  .factory('washHistFactory', washHistFactory);

function washHistFactory($http) {

  var LOCALURL = 'http://localhost:8000/';

  return {
    getCurrentWash: getCurrentWash,
    getCustHistory: getCustHistory,
    getProvHistory: getProvHistory
  };

  function getCurrentWash(data) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/request/get-current',
      data: data
    }).then(function(results) {
      return results.data.results;
    });
  };

  function getProvHistory(data) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/history/get-prov-history',
      data: data
    })
  }

  function getCustHistory(data) {

  };
};
