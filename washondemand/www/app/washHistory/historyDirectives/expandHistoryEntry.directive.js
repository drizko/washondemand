angular.module('wod.washHistoryMaster')
.directive('wodHistoryEntryExpand', wodHistoryEntryExpand);

wodHistoryEntryExpand.$inject = ['washHistFactory'];

function wodHistoryEntryExpand(washHistFactory) {

  var directive = {
    restrict: 'EA',
    replace: 'true',
    templateUrl: './app/washHistory/historyDirectives/expandHistoryEntry.template.html',
    scope: {
      washOptions: '='
    },
    link: linkFunc,
    controller: ctrl,
    controllerAs: 'ctrl',
    bindToController: true
  };

  function linkFunc(scope, el, attrs, vm) {
    vm.expanded = false;

    vm.toggleExpand = function() {
      vm.expanded = !vm.expanded;
    };

  }

  function ctrl() {
    var vm = this;
  }

  return directive;
}
