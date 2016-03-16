var path = require('path');
var fs = require('fs');
var jwt  = require('jwt-simple');

if(process.env.SALT_FACTOR === undefined){
  var config = require('../config.js');
} else {
  var config = process.env
}

module.exports = {

  errorLogger: function(error, req, res, next) {
    // log the error then send it to the next middleware in
    // middleware.js
    console.error(error.stack);
    next(error);
  },

  errorHandler: function(error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.status(500).send({error: error.message});
  },

  decode: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user;
    console.log(config.tokenSecret);

    if (!token) {
      return res.status(403).send(); // send forbidden if a token is not provided
    }
    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, config.tokenSecret);
      req.user = user;
      next(user);
    } catch (error) {
      return next(error);
    }
  }
};
