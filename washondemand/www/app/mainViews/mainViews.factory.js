angular.module('wod.mainViewFactory', [])
.factory('mainViewFactory', mainViewFactory);

mainViewFactory.$inject = ['$http', '$window', 'locFactory', 'jwtDecoder', '$state', '$ionicPopup', '$ionicHistory', 'socket', 'GeoAlert'];

function mainViewFactory($http, $window, locFactory, jwtDecoder, $state, $ionicPopup, $ionicHistory, socket, GeoAlert) {

  var user = jwtDecoder.decoder($window.localStorage['com.wod']);
  var locData = locFactory.locData;

  var vehicleOptions = {
    Car: {name: 'Car', price: 5},
    SUV: {name: 'SUV', price: 10},
    Motorcycle: {name: 'Motorcycle', price: 5}
  };

  var washOptions = {
    1: {info: '100% Hand Wash Exterior and Wheels', price: 10, active: false},
    2: {info: 'Seats and Carpets Vaccuumed', price: 5, active: false},
    3: {info: 'Full interior wipedown', price: 5, active: false},
    4: {info: 'Tire dressing', price: 5, active: false},
    5: {info: 'Door jambs cleaned', price: 5, active: false},
    6: {info: 'Choice of air freshener', price: 5, active: false},
    7: {info: 'Interior protectant', price: 5, active: false},
    8: {info: 'Windshield Treatment', price: 3, active: false},
    9: {info: 'Pet hair removal', price: 5, active: false},
    10: {info: 'High Pressure Air Blowout of Vents', price: 5, active: false},
    11: {info: 'Exterior plastic dressing', price: 5, active: false},
    12: {info: 'Leather Protectant', price: 10, active: false},
    13: {info: 'Upholstery Shampooed', price: 20, active: false},
    14: {info: 'Wax', price: 40, active: false}
  };

  var washTypeOptions = {
    Basic: {name: 'Basic', options: [
      1, 2, 3
    ]},
    Deluxe: {name: 'Deluxe', options: [
      1, 2, 3, 4, 5, 6, 7
    ]},
    Premium: {name: 'Premium', options: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
    ]},
  };

  var request = {
    vehicleType: {name: 'Please Pick a Vehicle Type', price: 0},
    washType: '',
    price: 0,
    washInfo: washOptions
  };

  function restoreOptions() {
    for (var k in washOptions) {
      washOptions[k].active = false;
    }
  }

  function sendRequest(details) {
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/create-request',
      data: {
        requestInfo: details,
        locData: locFactory.locData
      }
    })
    .then(function(results) {
      var userLoc = results.data.data.user_location;

      results.data.data.distance = GeoAlert.getDistanceInMi(userLoc.lat, userLoc.lng, locData.lat, locData.lng);
      socket.emit('requested', results.data.data);
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('customernav.customerRequestView');
    })
    .catch(function(error) {
      showConfirm();
    });
  };

  function distance(userLocation, washerLocation) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((washerLocation.lat - userLocation.lat) * p) / 2 +
    c(userLocation.lat * p) * c(washerLocation.lat * p) *
    (1 - c((washerLocation.lng - userLocation.lng) * p)) / 2;
    // returns distance in miles
    return Math.round(12742 * Math.asin(Math.sqrt(a)) / 1.60932 * 10) / 10;
  }

  function getProviders() {
    locFactory.getLoc('customer', user.email).then(locFactory.sendLocToServer);

    return $http({
      method: 'POST',
      url: masterURL + '/api/provider/get-providers',
      data: locFactory.locData
    })
    .then(function(results) {
      return results.data;
    });
  };

  function showConfirm() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Request Pending',
      template: 'You already have a request pending\nWould you like to go to that page?'
    });

    confirmPopup.then(function(res) {
      if (res) {
        $state.go('customernav.customerRequestView');
      }
    });
  };

  function getRequest() {
    locFactory.getLoc('provider', user.email).then(locFactory.sendLocToServer);
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/get-requests',
      data: locData
    })
    .then(function(results) {
      return results.data.results;
    });
  };

  function acceptRequest(request) {
    request.provider = user;
    request.job_accepted = new Date();
    socket.emit('accepted', request);
    return $http({
      method: 'POST',
      url: masterURL + '/api/request/accept-request',
      data: request
    })
    .then(function() {
      GeoAlert.begin(request.user_location.lat, request.user_location.lng, function() {
        GeoAlert.end();
        navigator.notification.confirm(
          'You are near your customer!',
          onConfirm,
          'Target!',
          ['Cancel','View']
        );
      });

    });
  };

  return {
    showConfirm: showConfirm,
    sendRequest: sendRequest,
    getProviders: getProviders,
    restoreOptions: restoreOptions,
    vehicleOptions: vehicleOptions,
    washOptions: washOptions,
    washTypeOptions: washTypeOptions,
    request: request,
    getRequest: getRequest,
    acceptRequest: acceptRequest,
    locData: locData
  };
};
