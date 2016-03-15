angular.module('wod.nav', []).controller('navCtrl', nav);

function nav($scope, $ionicHistory) {
  var vm = this;

  $scope.$root.GoBack = function() {
    // if($ionicHistory.backTitle() === "Favorites List"){
      $ionicHistory.goBack();
    // } else {
    //   Data.getRecentUpdate(function(data) {
    //     $ionicHistory.goBack();
    //   });
    // }
  };
};
