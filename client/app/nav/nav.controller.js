angular.module('wod.nav', []).controller('navCtrl', navCtrl);

navCtrl.$inject = ['$location', '$anchorScroll'];

function navCtrl($location, $anchorScroll) {
  var vm = this;

  vm.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };
};
