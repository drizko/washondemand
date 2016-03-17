var Customer = require('../models/customerModel.js');
var Request = require('../models/requestModel.js');
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
    console.log("PRICE:", req.body.price);

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
      distance: ""
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
    var requestId = req.body._id;
    var currDate = Date.now();

    Request
      .where({_id: requestId})
      .update({job_accepted: currDate})
      .then(function(item){
        console.log(item);
        res.status(201).send();
      });
  }
};
