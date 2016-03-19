var Customer = require('../models/customerModel');
var Request = require('../models/requestModel.js');
var Provider = require('../models/providerModel.js');
var History = require('../models/historyModel.js');


module.exports = {

	moveToHistory: function(jobID) {
		console.log("+++INSIDE HISTORY JOBID: ", jobID);
		Request.find({ _id: jobID }).then(function(job){
			console.log("+++INSIDE HISTORY JOB: ", job);
			History.create(job).then(function(){
				Request.remove({ _id: jobID }).then(function(){
					res.status(200).send();
				})
			})
		})
	},

	showHistory: function (req, res, next) {
		
	}	
}
