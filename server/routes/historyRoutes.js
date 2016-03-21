var historyController = require('../controllers/historyController.js');

module.exports = function(app) {
	app.post('/get-prov-history', historyController.getProvHistory);

};
