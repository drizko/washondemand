var providerController = require('../controllers/providerController.js');

module.exports = function(app) {

	app.post('/signin', providerController.signin);
	app.post('/signup', providerController.signup);
	app.post('/get-requests', providerController.getRequests);
	app.post('/accept-request', providerController.acceptRequest);
	// app.get('/', providerController.checkAuth);
};
