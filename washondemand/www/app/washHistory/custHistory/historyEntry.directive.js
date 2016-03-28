angular.module('wod.custWashHistCtrl').directive('wodHistoryEntry', wodHistoryEntry);

wodHistoryEntry.$inject = ['washHistFactory'];

function wodHistoryEntry(washHistFactory) {
  var directive = {
    restrict: 'EA',
    replace: 'true',
    templateUrl: './app/washHistory/custHistory/historyEntry.html',
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
  }

  function ctrl() {
    var vm = this;
  }

  return directive;
};
