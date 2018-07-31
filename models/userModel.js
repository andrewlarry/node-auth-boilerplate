const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;
const userSchema = new Schema({
  email: { 
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// Hash passwords with bcrypt before saving to Mongo
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      
      user.password = hash;
      next();
    })
  })
});

module.exports = mongoose.model('User', userSchema);
