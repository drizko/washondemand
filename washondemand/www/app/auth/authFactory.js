//stylize
//form validation (phone convenience)
//geolocation

angular.module('wod.authFactory', []).factory('authFactory', authFactory);

function authFactory($http, $window, $state, locFactory) {

  var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  var currentUserEmail = '';

  return {
    currentUserEmail: currentUserEmail,
    handleAuth: handleAuth,
    isAuth: isAuth,
    signout: signout
  };

  function handleAuth(accountInfo, userType, method) {

    if (!checkFormFilled(accountInfo)) {
      return;
    }

    if (method === 'signup' && !validateSignupInput(accountInfo)) {
      return;
    }

    authApiCall(accountInfo, userType + '/' + method)
    .then(function(token) {
      //clear input forms
      clearForm(accountInfo);
      //set jwt
      $window.localStorage.setItem('com.wod', token);
      //redirect to user page
      $state.go(userType + 'nav.' + userType);
    })
    .catch(function(error) {
      if (method === 'signup') {
        accountInfo.error = 'user already exists';
      }
      else if (method === 'signin') {
        accountInfo.error = 'incorrect email/password';
      }
      else {
        accountInfo.error = 'some other error';
        console.error(error);
      }
    });
  }

  function checkFormFilled(formData) {
    for (var k in formData) {
      if (!formData[k] && k !== 'error' && k !== 'lat' && k !== 'lng') {
        formData.error = 'please fill all forms';
        return false;
      }
    }
    return true;
  }

  function validateSignupInput(signupInfo) {
    //check matching passwords
    if (emailRegex.exec(signupInfo.email) === null) {
      signupInfo.error = 'invalid email';
      return false;
    }
    if (signupInfo.phone.length !== 10 || isNaN(signupInfo.phone)) {
      signupInfo.error = 'invalid phone number';
      return false;
    }
    if (!comparePasswords(signupInfo)) {
      signupInfo.error = 'passwords don\'t match';
      return false;
    }
    //check email
    //check phone
    return true;
  }

  function clearForm(formData) {
    for (var k in formData) {
      formData[k] = '';
    }
  }

  function isAuth() {
    return !!$window.localStorage.getItem('com.wod');
  }

  function signout() {
    locFactory.resetLocData();
    $window.localStorage.removeItem('com.wod');
    $state.go('home');
  }

  function comparePasswords(signupInfo) {
    if (signupInfo.confirmPassword !== undefined) {
      if (signupInfo.password === signupInfo.confirmPassword) {
        return true;
      }
    }
    return false;
  }

  function authApiCall(accountInfo, url) {

    return $http({
      method: 'POST',
      url: masterURL + '/api/' + url,
      data: accountInfo
    })
    .then(function(results) {
      return results.data.token;
    });
  }
}
