var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema ({
	user_location: {"lat": Number, "lng": Number},
	user_firstname: String,
	user_email: {type: String, unique: false},
	user_phone: Number,
	number_of_vehicles: Number,
	wash_type: String,
	vehicle_type: String,
	request_filled: String,
	job_accepted: String,
	job_started: String,
	job_ended: String,
	cost: Number,
	distance: Number,
	provider: String,
	provider_email: String,
	wash_info: Schema.Types.Mixed,
	provider_rating: Number,
	provider_feedback: String,
	customer_rating: Number,
	customer_feedback: String
});

var something = mongoose.model('History', historySchema);

module.exports = something;
