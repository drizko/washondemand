var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  user_location: {lat: Number, lng: Number},
  user_firstname: String,
  user_email: {type: String, unique: true, required: true},
  user_phone: Number,
  number_of_vehicles: Number,
  wash_type: String,
  vehicle_type: String,
  request_filled: String,
  job_accepted: String,
  job_started: String,
  job_ended: String,
  cost: Number,
  distance: Number
});

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;
