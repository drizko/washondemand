var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = require('../server.js');
var helpers = require('../utils/helpers.js');
var methodOverride  = require('method-override');
var favicon = require('serve-favicon');
var cors = require('cors');

module.exports = function(app, express) {
  corsOptions = {
    "origin": 'http://localhost:8100',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true
  }

  app.use(cors(corsOptions));
  app.use(methodOverride());

  // Define Routes by using the template below:
  var customerRouter = express.Router();
  var providerRouter = express.Router();
  var requestRouter = express.Router();
  var historyRouter = express.Router();

  //

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('./washondemand/www'));
  app.use('/node_modules', express.static('./node_modules'));
  app.use(favicon('./client/images/favicon.ico'));

  // Define router middleware using the template below:
  app.use('/api/customer', customerRouter);
  app.use('/api/provider', providerRouter);
  app.use('/api/request', requestRouter);
  app.use('/api/history', historyRouter);

  // inject our routers into their respective route files
  require('./customerRoutes.js')(customerRouter);
  require('./providerRoutes.js')(providerRouter);
  require('./requestRoutes.js')(requestRouter);
  require('./historyRoutes.js')(historyRouter);
};
