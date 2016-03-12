var providerController = require('../controllers/providerController.js');

module.exports = function(app) {

	app.post('/signin', providerController.signin);
	app.post('/signup', providerController.signup);
	// app.get('/', providerController.checkAuth);
};
