angular.module('wod.home', []).controller('homeCtrl', homeCtrl);

function homeCtrl() {
  //$(document).ready(function () {
  $('.navbar-nav li a').click(function(event) {
    $('.navbar-collapse').collapse('hide');
  });
}
