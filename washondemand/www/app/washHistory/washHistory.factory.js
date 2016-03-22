angular.module('wod.washHistFactory', [])
  .factory('washHistFactory', washHistFactory);

function washHistFactory($http) {

  var LOCALURL = 'http://localhost:8000/';

  return {
    getHistory: getHistory
  };

  function getHistory() {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/history/show-history'
    })
    .then(function(results) {
      return results.data;
    });
  }
};
