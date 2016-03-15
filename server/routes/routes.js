var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = require('../server.js');
var helpers = require('../utils/helpers.js');
var methodOverride  = require('method-override');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Allow-Control-Allow-Origin,x-access-token');
  next();
};

module.exports = function(app, express) {
  // Define Routes by using the template below:
  var customerRouter = express.Router();
  var providerRouter = express.Router();
  var requestRouter = express.Router();

  //
  app.use(methodOverride());
  app.use(allowCrossDomain);

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('./client'));
  app.use('/node_modules', express.static('./node_modules'));

  // Define router middleware using the template below:
  app.use('/api/customer', customerRouter);
  app.use('/api/provider', providerRouter);
  app.use('/api/request', requestRouter);

  // inject our routers into their respective route files
  require('./customerRoutes.js')(customerRouter);
  require('./providerRoutes.js')(providerRouter);
  require('./requestRoutes.js')(requestRouter);
};
