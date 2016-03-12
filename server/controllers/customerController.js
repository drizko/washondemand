var Customer = require('../models/customerModel.js');
var Request = require('../models/requestModel.js');
var Q = require('q');
var helpers = require('../utils/helpers')
var jwt = require('jwt-simple');
var _ = require('lodash');
var config = require('../config.js');

module.exports = {
  signin: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var findUser = Q.nbind(Customer.findOne, Customer);
    findUser({email: email})
      .then(function (customer) {
        if (!customer) {
          next(new Error('Customer does not exist'));
        } else {
          return Customer.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(customer, config.tokenSecret);
                res.json({token: token});
              } else {
                return next(new Error('No customer'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
    var create;
    var newUser;

    var findOne = Q.nbind(Customer.findOne, Customer);

    // check to see if customer already exists
    findOne({email: email})
      .then(function(customer) {
        if (customer) {
          next(new Error('Customer already exist!'));
        } else {
          // make a new customer if not one
          create = Q.nbind(Customer.create, Customer);
          newUser = {
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
            phone_number: phone
          };
          return create(newUser);
        }
      })
      .then(function (customer) {
        // create token to send back for auth
        var token = jwt.encode(customer, config.tokenSecret);
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var customer = jwt.decode(token, config.tokenSecret);
      var findUser = Q.nbind(Customer.findOne, Customer);
      findUser({email: customer.email})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};


var washers = [
  {
    name: "Kyle",
    working: true,
    location: {lat: 34.1194159, lng: -118.49426410000201}
  },
  {
    name: "Danny",
    working: false,
    location: {lat: 34.1495159, lng: -118.39426410000301}
  },
  {
    name: "Bobby",
    working: true,
    location: {lat: 34.0596159, lng: -118.49426410000401}
  },
  {
    name: "Kaz",
    working: true,
    location: {lat: 34.0897159, lng: -118.49926410000501}
  },
  {
    name: "Rando",
    working: true,
    location: {lat: 34.5497159, lng: -118.59926410000501}
  }
];

function getWashers(req, res){
  var userLocation = {lat: 34.0192159, lng: -118.49426410000201};
  
  var result = _.filter(washers, function(item){
    return item.working && distance(userLocation, item.location) < 5
  });

  return result;
}

getWashers()

function requestWash(req, res){
  var token = req.headers['x-access-token'];

  var user = jwt.decode(token, config.tokenSecret);

  return result;
}

function distance(userLocation, washerLocation) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((washerLocation.lat - userLocation.lat) * p)/2 +
  c(userLocation.lat * p) * c(washerLocation.lat * p) *
  (1 - c((washerLocation.lng - userLocation.lng) * p))/2;
  // returns distance in miles
  return Math.round(12742 * Math.asin(Math.sqrt(a))/1.60932*10)/10;
}
