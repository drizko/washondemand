angular.module('wod.custWashHistCtrl').directive('wodCustHistoryEntry', wodCustHistoryEntry);

wodCustHistoryEntry.$inject = ['washHistFactory'];

function wodCustHistoryEntry(washHistFactory) {
  var directive = {
    restrict: 'EA',
    replace: 'true',
    templateUrl: './app/washHistory/custHistory/custHistoryEntry.template.html',
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
    
  }

  function ctrl() {
    var vm = this;
  }

  return directive;
};
