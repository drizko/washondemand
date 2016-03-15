var customerController = require('../controllers/customerController.js');

module.exports = function(app) {

	app.post('/signin', customerController.signin);
	app.post('/signup', customerController.signup);
	app.post('/customerProfile/getWashers', customerController.getWashers);
	app.post('/customerProfile/requestWash', customerController.requestWash);
	// app.get('/', customerController.checkAuth);
};
