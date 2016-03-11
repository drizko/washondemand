var mongoose = require('mongoose');
var Schema = mongoose.schema;

var providerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone_nmuber: {type: Number, required: true},
  company_name: String,
  approved: Boolean,
  geolocation: {lat: Number, lng: Number},
  inProgress: Boolean
});

var Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;