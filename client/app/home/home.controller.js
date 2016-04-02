angular.module('wod.home', []).controller('homeCtrl', homeCtrl);

function homeCtrl($scope, $location, $anchorScroll) {
  //$(document).ready(function () {
  var vm = this;

  $('.navbar-nav li a').click(function(event) {
    $('.navbar-collapse').collapse('hide');
  });
}
