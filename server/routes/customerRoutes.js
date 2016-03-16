var customerController = require('../controllers/customerController.js');

module.exports = function(app) {

	app.post('/signin', customerController.signin);
	app.post('/signup', customerController.signup);
	app.post('/get-washers', customerController.getWashers);
	app.post('/request-wash', customerController.requestWash);
	app.post('/updateLocation', customerController.updateLocation);
	// app.get('/', customerController.checkAuth);
};
