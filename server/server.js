var express = require('express');
var mongoose = require('mongoose');

if(process.env.SALT_FACTOR === undefined){
  var config = require('./config.js');
} else {
  var config = process.env
}

mongoose.connect(config.mongoUrl);

var app = express();

require('./routes/routes.js')(app, express);

module.exports = app;
