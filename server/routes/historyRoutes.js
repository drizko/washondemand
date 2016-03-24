var historyController = require('../controllers/historyController.js');

module.exports = function(app) {

  app.post('/show-history', historyController.showHistory);
  app.post('/add-rating-and-feedback', historyController.addRatingAndFeedback);

};
