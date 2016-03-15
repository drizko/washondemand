angular.module('wod.customerFactory', [])
.factory('customerFactory', customerFactory);

function customerFactory($http, $window, $location) {

  function sendRequest(details) {
    console.log("From customerFactory!!!!!!!!!!!!!");
    return $http({
      method: 'POST',
      url: 'http://washondemand.us-west-2.elasticbeanstalk.com/api/request/create-request',
      data: details
    })
    .then(function(results) {
      return results.data;
    });
  };

  var data = {
    basic: {
      price: 25,
      info: [
        {info: '100% hand wash exterior & wheels'},
        {info: 'Towel dry'},
        {info: 'Windows cleaned'},
        {info: 'Seats & carpets vaccuumed'},
        {info: 'Dash wipedown'},
        {info: 'Tire dressing'}
      ]
    },
    deluxe: {
      price: 45,
      info: [
        {info: '100% hand wash exterior & wheels'},
        {info: 'Towel dry'},
        {info: 'Windows cleaned'},
        {info: 'Seats & carpets vaccuumed'},
        {info: 'Dash wipedown'},
        {info: 'Tire dressing'},
        {info: 'Carnauba wax'},
        {info: 'Door jambs cleaned'},
        {info: 'Intrior surface cleaned'},
        {info: 'Choice of air freshener'},
        {info: 'Meguiar\'s\xAE interior protectant'},
        {info: 'Rain-X\xAE windshield treatment'}
      ]
    },
    premium: {
      price: 75,
      info: [
        {info: '100% hand wash exterior & wheels'},
        {info: 'Towel dry'},
        {info: 'Windows cleaned'},
        {info: 'Seats & carpets vaccuumed'},
        {info: 'Dash wipedown'},
        {info: 'Tire dressing'},
        {info: 'Carnauba wax'},
        {info: 'Door jambs cleaned'},
        {info: 'Intrior surface cleaned'},
        {info: 'Choice of air freshener'},
        {info: 'Meguiar\'s\xAE interior protectant'},
        {info: 'Rain-X\xAE windshield treatment'},
        {info: 'Pet hair removal'},
        {info: 'High pressure air blowout of vents'},
        {info: 'Exterior plastic dressing'},
        {info: 'Upholstery vaccuumed & shampooed'},
        {info: 'Meguiar\'s\xAE leather protectant'}
      ]
    }
  };

  return {
    sendRequest: sendRequest,
    data: data
  };
}
