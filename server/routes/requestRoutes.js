var requestController = require('../controllers/requestController.js');
var customerModel = require('../controllers/customerController.js');

module.exports = function(app) {
  app.post('/create-request', requestController.makeRequest);
};
