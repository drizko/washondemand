angular.module('wod.team', []).controller('teamCtrl', teamCtrl);

function teamCtrl() {
  var vm = this;

  $(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
      $(".navbar-collapse").collapse('hide');
    });
  });
};
