angular.module('wod.authFactory', []).factory('authFactory', authFactory);

function authFactory($http) {
  return {
    clearForm: clearForm
  };

  function clearForm(formData) {
    for (var k in formData) {
      formData[k] = '';
    }
  }
}
