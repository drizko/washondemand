var Customer = require('../models/customerModel');
var Request = require('../models/requestModel.js');
var Provider = require('../models/providerModel.js');
var History = require('../models/historyModel.js');
var jwt = require('jwt-simple');

if(process.env.SALT_FACTOR === undefined){
  var config = require('../config.js');
} else {
  var config = process.env
}

module.exports = {

  moveToHistory: function(job, next) {
    var newHistory = {
      _id: job._id,
      user_location: {lng: job.user_location.lng, lat: job.user_location.lat},
      user_firstname: job.user_firstname,
      user_email: job.user_email,
      user_phone: job.user_phone,
      //num vehicles
      wash_type: job.wash_type,
      vehicle_type: job.vehicle_type,
      request_filled: job.request_filled,
      job_accepted: job.job_accepted,
      job_started: job.job_started,
      job_ended: job.job_ended,
      cost: job.cost,
      distance: job.distance,
      provider: job.provider,
      provider_email: job.provider_email,
      wash_info: job.wash_info,
    };
    History.create(newHistory, function(err, doc) {
      if(err) {
        console.log(err);
      }
      else {
        next(doc);
      }
    });
	},

  showHistory: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, config.tokenSecret);
    var email;
    if (user.company_name) {
			email = user.email;
			History.find({ provider_email: email }).then(function(provData) {
				if(!provData){
					res.status(401).send();
				}
				res.send(provData);
			})
			.catch(function(err){
				console.error(err);
			})
		} else {
			email = user.email;
			History.find({user_email: email}).then(function(custData) {
				if(!custData){
					res.status(401).send();
				}
				res.send(custData);
			})
			.catch(function(err) {
				console.error(err);
			})
		}
	},

  addRatingAndFeedback: function(req, res, next) {
    var requestId = req.body._id;
    var rating = req.body.provider_rating;
    var feedback = req.body.provider_feedback;

    var query = {
      '_id': requestId
    };

    var update = {
      'provider_rating': rating,
      'provider_feedback': feedback
    };

    var options = {
      upsert: false,
      new: true
    };

    History.findOneAndUpdate(query, update, options, function(err, requestData) {
      if (err) {
        throw err;
      }
      res.json(requestData);
    });
  }
}
