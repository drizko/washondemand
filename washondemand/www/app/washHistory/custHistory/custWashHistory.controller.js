angular.module('wod.custWashHistCtrl', []).controller('custWashHistCtrl', custWashHistCtrl);

function custWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.numEntries = 10;
  vm.history = [];

  vm.toggleExpand = function(wash) {
    wash.expanded = !wash.expanded;
  };

  vm.formatTime = function(time) {
    return washHistFactory.formatTime(time);
  };

  vm.formatRating = function(rating) {
    return washHistFactory.formatRating(rating);
  };

  vm.displayMoreEntries = function() {
    if (vm.numEntries < vm.history.length) {
      vm.numEntries += 10;
    }
  };

  var init = function() {
    washHistFactory.getHistory()
    .then(function(history) {
      vm.history = history;
    });
  };
  init();

};
