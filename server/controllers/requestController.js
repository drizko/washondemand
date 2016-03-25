var Customer = require('../models/customerModel.js');
var Request = require('../models/requestModel.js');
var Provider = require('../models/providerModel.js');
var History = require('../models/historyModel.js');
var Q = require('q');
var helpers = require('../utils/helpers');
var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');

if (process.env.SALT_FACTOR === undefined) {
  var config = require('../config.js');
} else {
  var config = process.env;
}

module.exports = {

  createRequest: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, config.tokenSecret);
    // var findLocation = Q.nbind(Customer.findOne, Customer);
    var findRequest = Q.nbind(Request.findOne, Request);
    var create = Q.nbind(Request.create, Request);
    var options = {
      upsert: false
    };

    var newRequest = {
      user_location : {
        lat: req.body.locData.lat,
        lng: req.body.locData.lng
      },
      user_firstname: user.firstname,
      user_email: user.email,
      user_phone: user.phone_number,
      wash_type: req.body.requestInfo.washType,
      vehicle_type: req.body.requestInfo.vehicleType.name,
      request_filled: '',
      job_accepted: '',
      job_started: '',
      job_ended: '',
      cost: req.body.requestInfo.price,
      distance: '',
      wash_info: req.body.requestInfo.washInfo
    };
    // send a new wash request

    findRequest({user_email: user.email}).then(function(request) {
      if (request) {
        res.status(401).send();
      }
      create(newRequest)
      .then(function(data) {
        console.log('newRequest');
        console.log(data);
        Customer.findOneAndUpdate({email: user.email}, {'locked': true}, options, function() {
        });
        res.json({data: data});
      })
    })
    .fail(function(error) {
      next(error);
    });
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
          if (request.distance < 5) {
            console.log(request);
            results.push(request);
          }
        });
        console.log('line 81 request', requests)
        res.json({results: results});
      })
      .catch(function(err) {
        console.error(err);
      })
  },

  acceptRequest: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var provider = jwt.decode(token, config.tokenSecret);
    var requestId = req.body._id;
    var currDate = Date.now();
    var findRequest = Q.nbind(Request.findOne, Request);

    Request
      .where({_id: requestId})
      .update({
        job_accepted: currDate,
        provider: provider.company_name,
        provider_email: provider.email
      })
      .then(function(request) {
        console.log(request);
        res.json({results: request});
        Provider
          .where({_id: provider._id})
          .update({available: false})
          .then(function() {
            res.status(201).send();
          });
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  getCurrent: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, config.tokenSecret);

    Request.where({user_email: user.email})
      .then(function(item){
        console.log("INSIDE getCurrent: ", item);
        res.json(item);
      })
      .catch(function(err) {
        console.error(err);
      })
  },

  getAccepted: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var provider = jwt.decode(token, config.tokenSecret);
    var email = req.body.email;

    Request
      .where({provider_email: provider.email})
      .then(function(request) {
        res.json({results: request});
      });
  },

  jobStarted: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var provider = jwt.decode(token, config.tokenSecret);
    var jobId = req.body._id;
    var currDate = Date.now();

    Request
      .where({_id: jobId})
      .update({job_started: currDate})
      .then(function() {
        res.status(200).send();
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  jobDone: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var provider = jwt.decode(token, config.tokenSecret);
    var jobId = req.body._id;
    var currDate = Date.now();
    var create = Q.nbind(History.create, History);

    Request
      .where({_id: jobId})
      .update({job_ended: currDate})
      .then(function(){
        Request
          .where({provider_email: provider.email})
          .then(function(job) {
            var newHistory = {
              _id: job[0]._id,
              user_location: {lng: job[0].user_location.lng, lat: job[0].user_location.lat},
              user_firstname: job[0].user_firstname,
              user_email: job[0].user_email,
              user_phone: job[0].user_phone,
              //num vehicles
              wash_type: job[0].wash_type,
              vehicle_type: job[0].vehicle_type,
              request_filled: job[0].request_filled,
              job_accepted: job[0].job_accepted,
              job_started: job[0].job_started,
              job_ended: job[0].job_ended,
              cost: job[0].cost,
              distance: job[0].distance,
              provider: job[0].provider,
              provider_email: job[0].provider_email,
              wash_info: job[0].wash_info,
            }
            console.log("Inside create of History: ", new Date());
            create(newHistory).then(function(newDoc) {
              console.log('Successfully created supposedly');
              Request.remove({provider_email: provider.email}, function(err) {
                if(err) {
                  console.log('error')
                }
                else {
                  console.log('DELETED FROM REQUEST');
                  res.status(200).send();
                }
              });
            })
            .catch(function(err) {
              console.log(error);
            });
          })
          .catch(function(error) {
            console.log(error);
          })
      })
      .then(function(){
        // res.status(200).send;
      })
      .catch(function(error){
        console.log(error);
      })


  },

  cancelRequest: function(req, res, next){
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, config.tokenSecret);
    var reqId = req.body._id;

    Request
      .remove({user_email: user.email})
      .then(function(){
        console.log("Removed request from table...");
      })
  }
};
