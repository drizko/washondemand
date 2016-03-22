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

	moveToHistory: function(jobID) {
		Request.find({ _id: jobID }).then(function(job){
			History.collection.dropIndexes();
			History.create(job).then(function(data){
				Request.remove({ _id: jobID }).then(function(){
				})
				.catch(function(err){
				  console.error(err);
				})
			})
			.catch(function(error){
			  console.error(error);
			})
		})
	},

	showHistory: function (req, res, next) {
		var token = req.headers['x-access-token'];
		var user = jwt.decode(token, config.tokenSecret);
		var email;
		if(user.company_name) {
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
	}	
}
