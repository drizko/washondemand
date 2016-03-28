angular.module('wod.provWashHistCtrl').directive('wodProvHistoryEntry', wodProvHistoryEntry);

wodProvHistoryEntry.$inject = ['washHistFactory'];

function wodProvHistoryEntry(washHistFactory) {
  var directive = {
    restrict: 'EA',
    replace: 'true',
    templateUrl: './app/washHistory/provHistory/provHistoryEntry.template.html',
    scope: {
      wash: '='
    },
    link: linkFunc,
    controller: ctrl,
    controllerAs: 'ctrl',
    bindToController: true
  };

  function linkFunc(scope, el, attrs, vm) {
    vm.formatTime = function(time) {
      return washHistFactory.formatTime(time);
    };

    vm.formatRating = function(rating) {
      return washHistFactory.formatRating(rating);
    };

    vm.toggleExpand = function(wash) {
      wash.expanded = !wash.expanded;
    };

    vm.formatFeedback = function(feedback) {
      return washHistFactory.formatFeedback(feedback);
    };
  }

  function ctrl() {
    var vm = this;
  }

  return directive;
};
