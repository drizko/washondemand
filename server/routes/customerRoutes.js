var customerController = require('../controllers/customerController.js');

module.exports = function(app) {

	app.post('/signin', customerController.signin);
	app.post('/signup', customerController.signup);
	// app.get('/', customerController.checkAuth);
};
