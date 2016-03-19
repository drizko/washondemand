var Customer = require('../models/customerModel.js');
var Request = require('../models/requestModel.js');
var Provider = require('../models/providerModel.js');
var History = require('./historyController.js');
var Q = require('q');
var helpers = require('../utils/helpers')
var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');

if(process.env.SALT_FACTOR === undefined){
  var config = require('../config.js');
} else {
  var config = process.env
}

module.exports = {

  createRequest: function(req, res, next){
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, config.tokenSecret);
    // var findLocation = Q.nbind(Customer.findOne, Customer);
    var findRequest = Q.nbind(Request.findOne, Request);
    var create = Q.nbind(Request.create, Request);
    console.log("PRICE:", req.body.requestInfo.washInfo.price);

    var newRequest = {
      user_location : {
        lat: req.body.locData.lat,
        lng: req.body.locData.lng
      },
      user_firstname: user.firstname,
      user_email: user.email,
      user_phone: user.phone_number,
      wash_type: req.body.requestInfo.washType,
      vehicle_type: req.body.requestInfo.vehicleType,
      request_filled: "",
      job_accepted: "",
      job_started: "",
      job_ended: "",
      cost: req.body.requestInfo.washInfo.price,
      distance: "",
    }
    // send a new wash request
    findRequest({user_email: user.email}).then(function(request) {
      if(request) {
        res.status(401).send();
      }
      create(newRequest).then(function(){
        res.status(200).send();
      })
    })
    .fail(function(error) {
      next(error);
    })
  },

  getRequests: function(req, res, next) {
    var results = [];
    var providerLocation = {
      lat: req.body.lat,
      lng: req.body.lng
    };

    Request.where('job_accepted').equals('')
      .then(function(requests) {
        _.each(requests, function(request) {
          request.distance = helpers.distance(providerLocation, request.user_location);
          if(request.distance < 5) {
            results.push(request);
          }
        });
        res.json({results: results});
      });
  },

  acceptRequest: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var provider = jwt.decode(token, config.tokenSecret);
    var requestId = req.body._id;
    var currDate = Date.now();
    console.log(provider);

    Request
      .where({_id: requestId})
      .update({
        job_accepted: currDate,
        provider: provider.company_name,
        provider_email: provider.email
      })
      .then(function(request){
        Provider
          .where({_id: provider._id})
          .update({available: false})
          .then(function(){
            res.status(201).send();
          })
      });
  },

  getCurrent: function(req, res, next) {
    console.log(req.body);
    var email = req.body.email;

    Request
      .where({user_email: email})
      .then(function(request) {
        if(request.job_accepted !== '') {
          res.json({results: request});
        }
      });
  },

  jobStarted: function(req, res, next){
    var token = req.headers['x-access-token'];
    var provider = jwt.decode(token, config.tokenSecret);
    var jobId = req.body._id;
    var currDate = Date.now();
    console.log("+++INSIDE JOBSTARTED PROV: ", provider);
    console.log("+++INSIDE JOBSTARTED BODY: ", req.body);
    Request
      .where({_id: jobId})
      .update({job_started: currDate})
      .then(function(){
        res.status(200).send();
      })
    .fail(function(error){
      next(error);
    })
  },

  jobDone: function(req, res, next) {
    // var token = req.headers['x-access-token'];
    // var provider = jwt.decode(token, config.tokenSecret);
    var jobId = req.body._id;
    var currDate = Date.now();
    // console.log("+++INSIDE JOBDONE PROV: ", provider);
    console.log("+++INSIDE JOBDONE BODY: ", req.body);
    console.log("+++INSIDE JOBDONE JOBID: ", jobId);
    Request
      .where({_id: jobId})
      .update({job_ended: currDate})
      .then(function() {
        res.status(200).send();
      })
      History.moveToHistory(jobId);
    // .fail(function(error){
    //   next(error);
    // })
  }
};




