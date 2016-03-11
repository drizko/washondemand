var mongoose = require('mongoose');
var Schema = mongoose.schema;

var customerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone_number: {type: Number, required: true},
  geolocation: {lat: Number, lng: Number}
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
