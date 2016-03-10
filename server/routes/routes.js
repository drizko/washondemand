var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = require('../server.js');
var helpers = require('../utils/helpers.js');

module.exports = function(app, express) {
  // Define Routes by using the template below:
  // var nameRouter = express.Router();

  // Define router middleware using the template below:
  // app.use('/api/name', nameRouter);

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('./client'));
  app.use("/node_modules", express.static('./node_modules'));

  // inject our routers into their respective route files
  // require('./nameRoute.js')(nameRouter);
};
