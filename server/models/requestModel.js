var mongoose = require('mongoose');
var Schema = mongoose.schema;

var requestSchema = new Schema({
  user_location: {lat: Number, lng: Number},
  user_email: {type: String, unique: true, required: true},
  user_phone: Number,
  number_of_vehicles: Number,
  vehicle_type: String,
  request_filled: Boolean,
  cost: Number
});

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;