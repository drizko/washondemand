var Customer = require('../models/customerModel.js');
var Request = require('../models/requestModel.js');
var Q = require('q');
var helpers = require('../utils/helpers')
var jwt = require('jwt-simple');
var _ = require('lodash');
var config = require('../config.js');
var bcrypt = require('bcrypt-nodejs');

var methods = {
  makeRequest: function(req, res, next){
    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, config.tokenSecret);

    var findRequest = Q.nbind(Request.findOne, Request);
    var create = Q.nbind(Request.create, Request);

    findRequest({user_email: user.email})
      .then(function(request){
        if(request){
          res.sendStatus(401);
        } else {
          var washRequest = {
            user_email: user.email,
            user_location: user.location,
            user_phone: user.phone_number,
            vehicle_type: req.body.vehicle_type,
            request_filled: '',
            job_accepted: '',
            job_started: '',
            job_ended: '',
            cost: req.body.cost
          };
          create(washRequest)
            .then(function(){
              res.sendStatus(201);
            })
        }
      })
      .fail(function(err){
        next(err);
      })
  }
};

module.exports = methods
