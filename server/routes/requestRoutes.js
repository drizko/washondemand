var requestController = require('../controllers/requestController.js');
var providerController = require('../controllers/providerController.js');
var customerModel = require('../controllers/customerController.js');

module.exports = function(app) {
  app.post('/create-request', requestController.makeRequest);
  app.post('/accept-request', providerController.acceptRequest);
};
