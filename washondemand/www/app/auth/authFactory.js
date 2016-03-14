angular.module('wod.authFactory', []).factory('authFactory', authFactory);

function authFactory($http, $window, $state) {

  var LOCALURL = 'http://localhost:8000/';

  return {
    clearForm: clearForm,
    custSignin: custSignin,
    custSignup: custSignup,
    provSignin: provSignin,
    provSignup: provSignup,
    isAuth: isAuth,
    signout: signout
  };

  function clearForm(formData) {
    for (var k in formData) {
      formData[k] = '';
    }
  }

  function isAuth() {
    return !!$window.localStorage.getItem('com.wod');
  }

  function signout() {
    $window.localStorage.removeItem('com.wod');
    $state.go('home');
  }

  function custSignin(cust) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/customer/signin',
      data: cust
    })
    .then(function(results) {
      return results.data.token;
    });
  }

  function custSignup(cust) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/customer/signup',
      data: cust
    })
    .then(function(results) {
      return results.data.token;
    });
  }

  function provSignin(prov) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/provider/signin',
      data: prov
    })
    .then(function(results) {
      return results.data.token;
    });
  }

  function provSignup(prov) {
    return $http({
      method: 'POST',
      url: LOCALURL + 'api/provider/signup',
      data: prov
    })
    .then(function(results) {
      return results.data.token;
    });
  }
}
