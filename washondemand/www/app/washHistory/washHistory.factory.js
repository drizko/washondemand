angular.module('wod.washHistFactory', [])
  .factory('washHistFactory', washHistFactory);

washHistFactory.$inject = ['$http'];

function washHistFactory($http) {

  return {
    formatTime: formatTime,
    formatFeedback: formatFeedback,
    formatRating: formatRating,
    calcStats: calcStats,
    getHistory: getHistory
  };

  function formatTime(time) {
    var timestamp = moment(time, 'x').format('M/D/YY h:mm a');
    return timestamp;
  }

  function formatRating(rating) {
    if (rating > 0) {
      var stars = '';
      for (i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars += '<i class="icon ion-ios-star"></i>';
        } else {
          stars += '<i class="icon ion-ios-star-outline"></i>';
        }
      }
      return stars;
    }
    return '</span>no rating given</span>';
  }

  function formatFeedback(feedback) {
    if (feedback) {
      return '"' + feedback + '"';
    }
    return 'no comment given';
  }

  function calcStats(history) {
    var ratingCount = 0;
    var sum = 0;
    var ratingSum = 0;

    history.forEach(function(item) {
      sum += item.cost;
      if (item.provider_rating > 0) {
        ratingCount++;
        ratingSum += item.provider_rating;
      }
    });

    var avg = ratingSum / ratingCount;
    avg = Math.round(avg * 10) / 10;
    avg = avg.toFixed(1);

    return {
      sum: sum,
      avg: avg
    };
  }

  function getHistory() {
    return $http({
      method: 'POST',
      url: masterURL + '/api/history/show-history'
    })
    .then(function(results) {
      return results.data.reverse();
    });
  }
};
