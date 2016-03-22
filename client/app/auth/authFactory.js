angular.module('wod.authFactory', []).factory('authFactory', authFactory);

function authFactory($http, $window, $location) {
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
    $location.path('/');
  }

  function custSignin(cust) {
    return $http({
      method: 'POST',
      url: '/api/customer/signin',
      data: cust
    })
    .then(function(results) {
      return results.data.token;
    });
  }

  function custSignup(cust) {
    return $http({
      method: 'POST',
      url: '/api/customer/signup',
      data: cust
    })
    .then(function(results) {
      return results.data.token;
    });
  }

  function provSignin(prov) {
    return $http({
      method: 'POST',
      url: '/api/provider/signin',
      data: prov
    })
    .then(function(results) {
      return results.data.token;
    });
  }

  function provSignup(prov) {
    return $http({
      method: 'POST',
      url: '/api/provider/signup',
      data: prov
    })
    .then(function(results) {
      return results.data.token;
    });
  }
}
