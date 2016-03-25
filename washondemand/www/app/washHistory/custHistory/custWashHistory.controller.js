angular.module('wod.custWashHistCtrl', []).controller('custWashHistCtrl', custWashHistCtrl);

function custWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.numEntries = 10;
  vm.history = [];

  vm.toggleExpand = function(wash) {
    wash.expanded = !wash.expanded;
  };

  vm.formatTime = function(time) {
    var timestamp = moment(time, 'x').format('M/D/YY h:mm a');
    return timestamp;
  };

  vm.formatRating = function(rating) {
    if (rating > 0) {
      var stars = '';
      for (i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars += '<i class="icon ion-ios-star"></i>';
        }
        else {
          stars += '<i class="icon ion-ios-star-outline"></i>';
        }
      }
      return stars;
    }
    return '</span>no rating given</span>';
  };

  vm.displayMoreEntries = function() {
    if (vm.numEntries < vm.history.length) {
      vm.numEntries += 10;
    }
  };

  var init = function() {
    washHistFactory.getHistory()
    .then(function(history) {
      vm.history = history.reverse();
    });
  };
  init();

};
