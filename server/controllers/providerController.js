var Provider = require('../models/providerModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var config = require('../config.js')

module.exports = {
  signin: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var findUser = Q.nbind(Provider.findOne, Provider);
    findUser({email: email})
      .then(function (provider) {
        if (!provider) {
          next(new Error('Provider does not exist'));
        } else {
          return Provider.comparePasswords(password)
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
      .then(function (provider) {
        // create token to send back for auth
        var token = jwt.encode(provider, config.tokenSecret);
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
      var provider = jwt.decode(token, config.tokenSecret);
      var findUser = Q.nbind(Provider.findOne, Provider);
      findUser({email: provider.email})
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
