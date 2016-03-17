var providerController = require('../controllers/providerController.js');

module.exports = function(app) {

	app.post('/signin', providerController.signin);
	app.post('/signup', providerController.signup);
	app.post('/update-location', providerController.updateLocation);
	app.post('/get-providers', providerController.sendProviders);
	// app.get('/', providerController.checkAuth);
};
