const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    name: String,
    password: String,
    created: {type: Date, default: Date.now()}
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, null, null, function (err, hashedPassword) {
        if (err) {
            return next(err);
        }
        user.password = hashedPassword;
        next();
    });
});

UserSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);