angular.module('wod.customerFactory', [])
.factory('customerFactory', customerFactory);

function customerFactory($http, $window, $location, locFactory) {

  var LOCALURL = 'http://localhost:8000/';
  var AWSURL = 'http://washondemand.us-west-2.elasticbeanstalk.com/';

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

  var washOptions = {
    1: {info: '100% hand wash exterior & wheels', price: 5},
    2: {info: 'Towel dry', price: 5},
    3: {info: 'Windows cleaned', price: 5},
    4: {info: 'Seats & carpets vaccuumed', price: 5},
    5: {info: 'Dash wipedown', price: 5},
    6: {info: 'Tire dressing', price: 5},
    7: {info: 'Carnauba wax', price: 5},
    8: {info: 'Door jambs cleaned', price: 5},
    9: {info: 'Interior surface cleaned', price: 5},
    10: {info: 'Choice of air freshener', price: 5},
    11: {info: 'Meguiar\'s\xAE interior protectant', price: 5},
    12: {info: 'Rain-X\xAE windshield treatment', price: 5},
    13: {info: 'Pet hair removal', price: 5},
    14: {info: 'High pressure air blowout of vents', price: 5},
    15: {info: 'Exterior plastic dressing', price: 5},
    16: {info: 'Upholstery vaccuumed & shampooed', price: 5},
    17: {info: 'Meguiar\'s\xAE leather protectant', price: 5},
    18: {info: 'extra virgin olive oil', price: 5},
    19: {info: 'balsamic vinegar', price: 5},
    20: {info: 'baguette bread', price: 5},
  };

  var data = {
    basic: {
      price: 25,
      info: [
        washOptions[1],
        washOptions[2],
        washOptions[3],
        washOptions[4],
        washOptions[5],
        washOptions[6]
      ]
    },
    deluxe: {
      price: 45,
      info: [
        washOptions[1],
        washOptions[2],
        washOptions[3],
        washOptions[4],
        washOptions[5],
        washOptions[6],
        washOptions[7],
        washOptions[8],
        washOptions[9],
        washOptions[10],
        washOptions[11],
        washOptions[12]
      ]
    },
    premium: {
      price: 75,
      info: [
        washOptions[1],
        washOptions[2],
        washOptions[3],
        washOptions[4],
        washOptions[5],
        washOptions[6],
        washOptions[7],
        washOptions[8],
        washOptions[9],
        washOptions[10],
        washOptions[11],
        washOptions[12],
        washOptions[13],
        washOptions[14],
        washOptions[15],
        washOptions[16],
        washOptions[17]
      ]
    },
    custom: {
      price: 100,
      info: [
        washOptions[18],
        washOptions[19],
        washOptions[20]
      ]
    },
  };

  return {
    sendRequest: sendRequest,
    getProviders: getProviders,
    data: data
  };
}
