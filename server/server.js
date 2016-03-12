var express = require('express');
var mongoose = require('mongoose');
var config = require('./config.js');
mongoose.connect(config.mongoUrl);

var app = express();

require('./routes/routes.js')(app, express);

module.exports = app;
