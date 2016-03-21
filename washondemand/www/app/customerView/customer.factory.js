angular.module('wod.customerFactory', [])
.factory('customerFactory', customerFactory);

function customerFactory($http, $window, $location, locFactory) {

  var LOCALURL = 'http://localhost:8000/';
  var AWSURL = 'http://washondemand.us-west-2.elasticbeanstalk.com/';

  var vehicleOptions = {
    car: {name: 'car', price: 1},
    suv: {name: 'suv', price: 2},
    motorcycle: {name: 'motorcycle', price: 3}
  };

  var washOptions = {
    1: {info: '100% hand wash exterior & wheels', price: 5, active: false},
    2: {info: 'Towel dry', price: 5, active: false},
    3: {info: 'Windows cleaned', price: 5, active: false},
    4: {info: 'Seats & carpets vaccuumed', price: 5, active: false},
    5: {info: 'Dash wipedown', price: 5, active: false},
    6: {info: 'Tire dressing', price: 5, active: false},
    7: {info: 'Carnauba wax', price: 5, active: false},
    8: {info: 'Door jambs cleaned', price: 5, active: false},
    9: {info: 'Interior surface cleaned', price: 5, active: false},
    10: {info: 'Choice of air freshener', price: 5, active: false},
    11: {info: 'Meguiar\'s\xAE interior protectant', price: 5, active: false},
    12: {info: 'Rain-X\xAE windshield treatment', price: 5, active: false},
    13: {info: 'Pet hair removal', price: 5, active: false},
    14: {info: 'High pressure air blowout of vents', price: 5, active: false},
    15: {info: 'Exterior plastic dressing', price: 5, active: false},
    16: {info: 'Upholstery vaccuumed & shampooed', price: 5, active: false},
    17: {info: 'Meguiar\'s\xAE leather protectant', price: 5, active: false},
    18: {info: 'extra virgin olive oil', price: 5, active: false},
    19: {info: 'balsamic vinegar', price: 5, active: false},
    20: {info: 'baguette bread', price: 5, active: false},
  };

  var washTypeOptions = {
    basic: {name: 'basic', options: [
      1, 2, 3, 4, 5, 6
    ]},
    deluxe: {name: 'deluxe', options: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ]},
    premium: {name: 'premium', options: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
    ]},
  };

  function restoreOptions() {
    for (var k in washOptions) {
      washOptions[k].active = false;
    }
  }

  function sendRequest(details) {
    console.log('From customerFactory!!!!!!!!!!!!!');
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/request/create-request',
      data: {
        requestInfo: details,
        locData: locFactory.locData
      }
    })
    .then(function(results) {
      return results.data;
    });
  };

  function getProviders() {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/provider/get-providers',
      data: locFactory.locData
    })
    .then(function(results) {
      return results.data;
    });
  };

  return {
    sendRequest: sendRequest,
    getProviders: getProviders,
    restoreOptions: restoreOptions,
    vehicleOptions: vehicleOptions,
    washOptions: washOptions,
    washTypeOptions: washTypeOptions
  };
}
