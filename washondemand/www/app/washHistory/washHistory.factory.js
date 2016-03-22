angular.module('wod.washHistFactory', [])
  .factory('washHistFactory', washHistFactory);

function washHistFactory($http) {

  return {
    getHistory: getHistory
  };

  function getHistory() {
    return $http({
      method: 'POST',
      url: masterURL + '/api/history/show-history'
    })
    .then(function(results) {
      return results.data;
    });
  }
};
