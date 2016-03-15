var providerController = require('../controllers/providerController.js');

module.exports = function(app) {

	app.post('/signin', providerController.signin);
	app.post('/signup', providerController.signup);
	app.post('/providerProfile/getRequests', providerController.getRequests);
	app.post('/providerProfile/acceptRequest', providerController.acceptRequest);
	// app.get('/', providerController.checkAuth);
};
