var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8000;
var server = app.listen(port)
var io = require('socket.io')(server);

if(process.env.SALT_FACTOR === undefined){
  var config = require('./config.js');
} else {
  var config = process.env
}

mongoose.connect(config.mongoUrl);

io.on('connection', function(socket){
  console.log("Connected from server");
  socket.on('accepted', function(request){
    io.emit('refreshList', request);
  });

  // socket.on('canceled', function(request){
  //   io.emit('refreshList', request);
  // })
});

require('./routes/routes.js')(app, express);
console.log('Express server listening on %d in %s mode', port, app.settings.env);

module.exports = app;
