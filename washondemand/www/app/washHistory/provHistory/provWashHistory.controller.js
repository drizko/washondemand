angular.module('wod.provWashHistCtrl', []).controller('provWashHistCtrl', provWashHistCtrl);

function provWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.history = [];
  vm.total = 0;
  vm.sum = 0;

  vm.toggleExpand = function(wash) {
    wash.expanded = !wash.expanded;
  };

  vm.formatTime = function(time) {
    var timestamp = moment(time, 'x').format('M/D/YY h:mm a');
    return timestamp;
  };

  var init = function() {
    washHistFactory.getHistory()
    .then(function(history) {
      history.sort(function(a, b) {
        return b.job_ended - a.job_ended;
      });
      vm.history = history;
      vm.total = history.length;
      history.forEach(function(item) {
        vm.sum += item.cost;
      });
    });
  };
  init();
};
