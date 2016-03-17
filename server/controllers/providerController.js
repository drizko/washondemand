var Customer = require('../models/customerModel');
var Request = require('../models/requestModel.js');
var Provider = require('../models/providerModel.js');
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

  comparePasswords: function (attemptedPassword, savedPassword) {
    var defer = Q.defer();
    bcrypt.compare(attemptedPassword, savedPassword, function (err, match) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(match);
      }
    });
    return defer.promise;
  },

  signin: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var findUser = Q.nbind(Provider.findOne, Provider);
    findUser({email: email})
      .then(function (provider) {
        if (!provider) {
          next(new Error('Provider does not exist'));
        } else {
          module.exports.comparePasswords(password, provider.password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(provider, config.tokenSecret);
                res.json({token: token});
              } else {
                return next(new Error('No provider'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var email  = req.body.email;
    var password  = req.body.password;
    var companyName = req.body.companyName;
    var phone = req.body.phone;
    var create;
    var newUser;

    var findOne = Q.nbind(Provider.findOne, Provider);

    // check to see if provider already exists
    findOne({email: email})
      .then(function(provider) {
        if (provider) {
          next(new Error('Provider already exist!'));
        } else {
          // make a new provider if not one
          create = Q.nbind(Provider.create, Provider);
          newUser = {
            email: email,
            password: password,
            company_name: companyName,
            phone_number: phone
          };
          return create(newUser);
        }
      })
      .then(function(provider) {
        // create token to send back for auth
        var token = jwt.encode(provider, config.tokenSecret);
        res.json({token: token});
      })
      .fail(function(error) {
        next(error);
      });
  },

  checkAuth: function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var provider = jwt.decode(token, config.tokenSecret);
      var findUser = Q.nbind(Provider.findOne, Provider);
      findUser({email: provider.email})
        .then(function(foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .fail(function(error) {
          next(error);
        });
    }
  },

//**********************-LOCATION METHOD-********************
  updateLocation: function(req, res, next) {
    var userType = req.body.userType;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var email = req.body.email;

    var query = {
      email: email,
    };

    var update = {
      'geolocation': {
        lat: lat,
        lng: lng
      }
    };

    // Upsert updates instead of adding a new entry
    var options = {
      upsert: false,
      new: true
    };

    Provider.findOneAndUpdate(query, update, options, function(err, doc) {
      if (err) {
        throw err;
      }
      res.json(doc);
    });

  },

  //********************-REQUEST HANDLER-*******************

  getRequests: function(req, res, next) {
    var results = [];
    var providerLocation = req.body.provider_location;

    Request.where('job_accepted').equals('')
      .then(function(requests) {
        _.each(requests, function(request) {
          // request.distance = module.exports.distance(providerLocation, request.user_location);
          request.distance = 3.1;
          //if(request.distance < 5) {
            results.push(request);
          // }
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

  },

  distance: function(userLocation, washerLocation) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((washerLocation.lat - userLocation.lat) * p)/2 +
    c(userLocation.lat * p) * c(washerLocation.lat * p) *
    (1 - c((washerLocation.lng - userLocation.lng) * p))/2;
    // returns distance in miles
    return Math.round(12742 * Math.asin(Math.sqrt(a))/1.60932*10)/10;
  }
};
