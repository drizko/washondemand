var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var providerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone_nmuber: {type: Number, required: true},
  company_name: String,
  approved: Boolean,
  geolocation: {lat: Number, lng: Number},
  available: Boolean
});

providerSchema.methods.comparePasswords = function (attemptedPassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(attemptedPassword, savedPassword, function (err, match) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(match);
    }
  });
  return defer.promise;
};

providerSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

var Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;