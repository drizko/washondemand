var Customer = require('../models/customerModel.js');
var Request = require('../models/requestModel.js');
var Provider = require('../models/providerModel.js');
var History = require('../models/historyModel.js');
var HistoryCtrl = require('./historyController.js');
var Q = require('q');
var helpers = require('../utils/helpers');
var jwt = require('jwt-simple');
var _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');
var https = require('https');

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

    module.exports.geoDecode(req.body.locData.lat, req.body.locData.lng, function(address){
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
        address: address.results[0]['formatted_address'],
        wash_info: req.body.requestInfo.washInfo
      };

      findRequest({user_email: user.email}).then(function(request) {
        if (request) {
          res.status(401).send();
        }
        create(newRequest)
        .then(function(data) {
          Customer.findOneAndUpdate({email: user.email}, {'locked': true}, options, function() {
          });
          res.json({data: data});
        })
        .catch(function(err){
          console.log(err);
        })
      })
      .fail(function(error) {
        next(error);
      });
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
            results.push(request);
          }
        });
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
        provider_email: provider.email,
        provider_phone: provider.phone_number
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
      .then(function(item) {
        res.json(item[0]);
      })
      .catch(function(err) {
        console.error(err);
      });
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

    var query = {
      '_id': jobId
    };

    var update = {
      'job_ended': currDate
    };

    var options = {
      upsert: false,
      new: true
    };

    Request.findOneAndUpdate(query, update, options, function(err, requestInfo) {
      if (err) {
        console.log(error);
      }
      else {
        HistoryCtrl.moveToHistory(requestInfo, function(newHistory) {
          Request.remove({_id: jobId}, function(err) {
            if (err) {
              console.log('error');
            }
            else {
              res.status(200).send();
            }
          });
        });
      }
    });
  },

  cancelRequest: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, config.tokenSecret);
    var reqId = req.body._id;

    Request
      .remove({user_email: user.email})
      .then(function(){
        res.status(200).send();
      })
      .catch(function(err) {
        console.error(err);
      })
  },

  geoDecode: function(lat, lng, callback) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + config.MAPS_API_KEY

    console.log("Geodecode");
    https.get(url, function(response){
      var data = '';
      response.on('data', function(chunk) {
        data += chunk;
      });

      response.on('end', function() {
        callback(JSON.parse(data));
      })
    });
  }
}
