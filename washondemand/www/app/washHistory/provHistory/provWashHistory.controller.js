angular.module('wod.provWashHistCtrl', []).controller('provWashHistCtrl', provWashHistCtrl);

function provWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.numEntries = 10;
  vm.history = [];
  vm.total = 0;
  vm.sum = 0;
  vm.ratingAvg = 0;

  vm.toggleExpand = function(wash) {
    wash.expanded = !wash.expanded;
  };

  vm.formatTime = function(time) {
    var timestamp = moment(time, 'x').format('M/D/YY h:mm a');
    return timestamp;
  };

  vm.formatRating = function(rating) {
    if (rating > 0) {
      return rating + '/5';
    }
    return 'no rating given';
  };

  vm.formatFeedback = function(feedback) {
    if (feedback) {
      return '"' + feedback + '"';
    }
    return 'no comment given';
  };

  vm.displayMoreEntries = function() {
    if (vm.numEntries < vm.history.length) {
      vm.numEntries += 10;
    }
  };

  var init = function() {
    washHistFactory.getHistory()
    .then(function(history) {

      vm.total = history.length;

      var ratingCount = 0;
      history.forEach(function(item) {
        vm.sum += item.cost;
        if (item.provider_rating > 0) {
          ratingCount++;
          vm.ratingAvg += item.provider_rating;
        }
      });
      vm.ratingAvg /= ratingCount;

      vm.history = history.reverse();
    });
  };
  init();
};
